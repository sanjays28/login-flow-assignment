# Signup Flow — React + TypeScript

A multi-step signup flow built in React and TypeScript, translating a Figma design into a fully interactive UI with form validation, animated step transitions, loading/error states, and a polished success summary.

---

## Live Demo

> _Link will be added after deployment_

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Architecture Decisions](#architecture-decisions)
- [Component Design](#component-design)
- [State Management](#state-management)
- [Form Validation](#form-validation)
- [Interaction States](#interaction-states)
- [Design System](#design-system)
- [Getting Started](#getting-started)

---

## Overview

The application implements a five-step account creation flow:

| Step | Screen               | Description                             |
| ---- | -------------------- | --------------------------------------- |
| 1    | **Account Type**     | Choose Personal or Business account     |
| 2    | **Phone Number**     | Enter a mobile number with country code |
| 3    | **OTP Verification** | Verify via a 4-digit one-time password  |
| 4    | **Name**             | Enter first and last name               |
| 5    | **Password**         | Set a secure password with confirmation |
| —    | **Success Modal**    | Animated summary of account details     |

Each step persists its data so navigating back pre-fills previously entered values. The OTP screen shows the exact phone number the code was sent to, and includes a resend flow with a 30-second cooldown.

---

## Tech Stack

| Concern              | Library / Tool                                |
| -------------------- | --------------------------------------------- |
| UI framework         | React 19                                      |
| Language             | TypeScript 6                                  |
| Build tool           | Vite 8                                        |
| Styling              | Tailwind CSS v4                               |
| Animations           | Framer Motion                                 |
| Forms                | React Hook Form                               |
| Validation           | Zod                                           |
| Phone input          | react-international-phone + libphonenumber-js |
| Routing              | React Router v7                               |
| State machine        | XState v4 (auth session)                      |
| Linting / formatting | ESLint + Prettier + Husky                     |

---

## Project Structure

```
src/
├── assets/               # Static images (illustration, wave texture)
├── components/
│   ├── auth/             # Layout and structural auth components
│   │   ├── AccountTypeOption/   # Radio-style account type card
│   │   ├── AuthFormBody/        # Scrollable form content area
│   │   ├── AuthFormCard/        # Card shell (used on non-split pages)
│   │   ├── AuthFormFooter/      # Footer wrapper (safe area aware)
│   │   ├── AuthPageHeader/      # Page title + subtitle block
│   │   ├── AuthProgressBar/     # Animated step progress bar
│   │   ├── AuthSplitLayout/     # Two-column layout (left panel + form card)
│   │   └── AuthStepTransition/  # Framer Motion fade/slide wrapper per step
│   └── ui/               # Reusable primitives
│       ├── Button/       # Primary / outline / ghost variants with loading state
│       ├── FieldHint/    # Hint text beneath fields
│       ├── Input/        # Labelled text input with error + hint
│       ├── Loader/       # CSS spinner
│       ├── OTPInput/     # 4-digit OTP entry with paste and keyboard nav
│       └── PhoneInput/   # Country-code selector + number field
├── config/               # Route paths, API config, storage keys
├── modules/              # Low-level modules (JWT, state machine, storage)
├── pages/
│   └── Signup/
│       ├── components/   # AuthStepFooter, SuccessModal
│       ├── config/       # All copy strings and step count in one place
│       ├── schemas/      # Zod schemas per step
│       ├── steps/        # One component per form step
│       ├── types/        # SignupData aggregate type
│       └── utils/        # Phone formatting, name formatting
├── routes/               # AppRoutes and placeholder home page
├── services/             # XState machines (auth flow, startup validator)
├── styles/               # theme.css (design tokens), phone-input.css
└── utils/                # cn(), simulateDelay, phone helpers
```

---

## Architecture Decisions

### Separation of container and presentational components

Each page follows a two-file pattern:

- **`container/index.tsx`** — owns state, handlers, and async logic. This is the only place that calls `simulateDelay` (mock API) or would call a real API.
- **`container/container.com.tsx`** — purely presentational. Receives everything as props and renders. This makes the UI easy to test or swap without touching business logic.

### All copy strings in one config file

Every visible text string — headings, CTAs, hints, loading labels — lives in `src/pages/Signup/config/steps.config.ts`. This avoids scattered string literals across components, makes copy changes a single-file diff, and keeps step components logic-focused rather than content-aware.

### Zod schemas as the single source of validation truth

Each step has its own Zod schema (`schemas/*.schema.ts`). React Hook Form's `zodResolver` connects the schema to the form, so the same rules that validate in the UI could validate on the server. The schema file also exports the inferred TypeScript type, so there's no manual duplication.

### Step data persisted in parent, not local state

`SignupContainer` accumulates a `SignupData` object and passes the relevant slice back to each step as `defaultValues`. This means:

- Going back pre-fills the form exactly as the user left it.
- The success modal can display a full summary of collected data.
- No context, global store, or URL state is needed for a linear flow this short.

---

## Component Design

### `AuthSplitLayout`

The two-column shell. The left column holds the brand eyebrow, title, description, and illustration. The right column holds the progress bar (when visible) and the form card. A decorative wave texture sits behind the entire page via a CSS `::before` pseudo-element on `.auth-page`.

### `AuthStepTransition`

A thin Framer Motion wrapper that provides a consistent fade + vertical slide animation between steps. `AnimatePresence mode="wait"` in the container ensures the exiting step fully leaves before the entering step appears, preventing overlap.

### `OTPInput`

Built from scratch rather than using a library, for full control over:

- Single-character `<input>` elements per digit with programmatic focus management
- Paste handling that extracts the first four numeric characters and distributes them across cells
- Backspace on an empty cell moving focus to the previous cell
- `role="group"` with per-cell `aria-label` for screen reader accessibility

### `Button`

Supports three variants (`primary`, `outline`, `ghost`) and two sizes (`default`, `step`). When `isLoading` is true it shows an inline spinner and a configurable loading label, while `aria-busy` is set on the element. The `step` size matches the Figma's wide pill CTA buttons at the bottom of each step.

### `PhoneInput`

Wraps `react-international-phone` with a fully custom render for the country selector button so it matches the design system's border, radius, and focus styles exactly. `libphonenumber-js` validates that the entered number is valid for the selected country before the step advances.

---

## State Management

### Form state

React Hook Form manages field values, touched state, and errors within each step. Steps unmount between transitions, so state isolation is natural — the parent only holds the final submitted values per step.

### Signup progress

A `useState<number>` for the current step index and `useState<SignupData>` for accumulated data live in `SignupContainer`. The `merge` helper does a shallow merge on each step submit, keeping the implementation minimal without a reducer.

### Session / auth state

An XState v4 machine (`services/machines/auth-flow`) handles the post-signup session lifecycle (JWT storage, validation on startup). This is intentionally decoupled from the signup UI — the machine can be replaced with a different auth strategy without touching any step component.

---

## Form Validation

| Step         | Schema highlights                                                                                 |
| ------------ | ------------------------------------------------------------------------------------------------- |
| Account Type | `z.enum(['personal', 'business'])` — required                                                     |
| Phone        | `libphonenumber-js` `isPossiblePhoneNumber` + `isValidPhoneNumber` — validates format and country |
| OTP          | 4-digit string, all numeric, exactly 4 characters                                                 |
| Name         | First and last name required, min 2 characters each                                               |
| Password     | Min 8 chars, at least one uppercase letter, at least one number; confirm must match               |

Errors appear inline beneath the relevant field on submit and clear immediately on change, using `role="alert"` so screen readers announce them.

---

## Interaction States

Every interactive element has explicit styles for all states:

| State               | Implementation                                                          |
| ------------------- | ----------------------------------------------------------------------- |
| **Hover**           | Lighter border / background tint on inputs and buttons                  |
| **Focus**           | 2px `outline` offset ring using the `border-focus` design token         |
| **Active**          | `scale(0.98–0.99)` micro-press on buttons and OTP cells                 |
| **Loading**         | Inline spinner + label swap on submit buttons; `disabled` + `aria-busy` |
| **Error**           | Red border + inline error text with `role="alert"`                      |
| **Disabled**        | `opacity-50` + `cursor-not-allowed`, active scale suppressed            |
| **Resend cooldown** | 30-second countdown with sending spinner and confirmation message       |

---

## Design System

All visual constants are CSS custom properties in `src/styles/theme.css`, consumed via Tailwind v4's `@theme` block. No inline hex values appear in component files — every color reference uses a semantic token.

**Color tokens:**

| Token                      | Value     | Usage                              |
| -------------------------- | --------- | ---------------------------------- |
| `--color-primary`          | `#0054fd` | CTAs, selected states, focus rings |
| `--color-primary-hover`    | `#0046d4` | Button hover                       |
| `--color-primary-active`   | `#003db8` | Button press                       |
| `--color-background`       | `#eceef2` | Page background                    |
| `--color-surface`          | `#ffffff` | Cards, inputs                      |
| `--color-surface-muted`    | `#f9fafb` | Hover backgrounds, muted fills     |
| `--color-border`           | `#e5e7eb` | Default borders                    |
| `--color-border-input`     | `#b8cce0` | Phone and OTP input borders        |
| `--color-border-focus`     | `#0054fd` | Focus ring                         |
| `--color-text-primary`     | `#1a1f36` | Body text, headings                |
| `--color-text-secondary`   | `#6b7280` | Hints, subtitles                   |
| `--color-text-label`       | `#7a90ad` | Field labels                       |
| `--color-text-placeholder` | `#9ca3af` | Input placeholders                 |
| `--color-error`            | `#dc2626` | Validation errors                  |
| `--color-success`          | `#16a34a` | Success messages                   |

**Font:** [Rubik](https://fonts.google.com/specimen/Rubik) — loaded from Google Fonts. Chosen for its geometric warmth and legibility at small sizes, closely matching the Figma design.

---

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Type check
npx tsc --noEmit

# Build for production
npm run build
```

The dev server runs at `http://localhost:5173`. Navigate to `/signup` to start the flow.
