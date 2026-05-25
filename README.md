# Signup Flow — React + TypeScript

A multi-step account creation flow built from a Figma design. The goal was to ship pixel-accurate UI with realistic interaction states — hover, focus, active, loading, error — while keeping the code structured well enough to extend.

---

## Live Demo

> _Link will be added after deployment_

---

## Table of Contents

1. [What Was Built](#what-was-built)
2. [Tech Stack & Why](#tech-stack--why)
3. [Project Structure](#project-structure)
4. [Architecture](#architecture)
   - [Application Bootstrap](#application-bootstrap)
   - [State Machine — Signup Flow](#state-machine--signup-flow)
   - [Agent Pattern](#agent-pattern)
   - [Container / Presentational Split](#container--presentational-split)
   - [Copy Config](#copy-config)
5. [Component Design](#component-design)
6. [Form Validation](#form-validation)
7. [Interaction States](#interaction-states)
8. [Design System](#design-system)
9. [Enhancements Beyond the Brief](#enhancements-beyond-the-brief)
10. [Getting Started](#getting-started)

---

## What Was Built

A five-step account signup flow that matches the Figma spec:

| Step | Screen               | Key behaviour                                                                           |
| ---- | -------------------- | --------------------------------------------------------------------------------------- |
| 1    | **Account Type**     | Radio-style cards — Personal / Business                                                 |
| 2    | **Phone Number**     | Country-code selector + number field, validated with `libphonenumber-js`                |
| 3    | **OTP Verification** | 4-digit input with paste support, 30 s resend cooldown, shows the number it was sent to |
| 4    | **Name**             | First + last name with `autocomplete` attributes                                        |
| 5    | **Password**         | Password + confirm with show/hide toggles, validated against complexity rules           |
| —    | **Success Modal**    | Animated summary of the collected account details                                       |

Navigating back pre-fills the form with the previously entered values. Submitting any step triggers a loading state; if a step fails, an inline error banner appears and the user stays on that step.

---

## Tech Stack & Why

| Concern       | Choice                                                | Why                                                                                                                                                                                  |
| ------------- | ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| UI            | **React 19**                                          | Concurrent features, stable ecosystem                                                                                                                                                |
| Language      | **TypeScript**                                        | Catches mismatched prop types early; schemas infer their own types                                                                                                                   |
| Build         | **Vite 8**                                            | Sub-second HMR, native ESM output                                                                                                                                                    |
| Styling       | **Tailwind CSS v4**                                   | Utility-first with the new `@theme` block for design tokens — no extra CSS-in-JS runtime                                                                                             |
| Animations    | **Framer Motion**                                     | `AnimatePresence mode="wait"` ensures the exiting step fully unmounts before the next one enters (no overlap); progress bar width animates with a cubic-bezier ease via `motion.div` |
| Forms         | **React Hook Form**                                   | Uncontrolled inputs = no re-render on each keystroke; `zodResolver` links schema directly                                                                                            |
| Validation    | **Zod**                                               | Schema-first; inferred TypeScript types mean zero duplication                                                                                                                        |
| Phone input   | **react-international-phone** + **libphonenumber-js** | Library handles country list and formatting; libphonenumber validates numbers per-country                                                                                            |
| State machine | **XState v4**                                         | The signup flow has 11 named states and 2 events (`SUBMIT`, `BACK`). A machine makes every legal transition explicit and impossible states impossible                                |
| Routing       | **React Router v7**                                   | File-based routing would be overkill here; just two routes                                                                                                                           |
| Linting       | **ESLint + Prettier**                                 | Pre-commit hooks via Husky + lint-staged enforce formatting before every commit                                                                                                      |

---

## Project Structure

```
src/
├── application/
│   └── VApplication.ts          # Singleton — bootstraps the app on mount
│
├── assets/                      # Illustration PNG, wave texture PNG
│
├── components/
│   ├── auth/                    # Layout-level components (not page-specific)
│   │   ├── AccountTypeOption/   # Radio-style card with selected/hover states
│   │   ├── AuthFormCard/        # White card shell for standalone forms
│   │   ├── AuthFormBody/        # Scrollable content area inside a card
│   │   ├── AuthFormFooter/      # Footer with iOS safe-area inset padding
│   │   ├── AuthPageHeader/      # Title + subtitle block
│   │   ├── AuthProgressBar/     # Animated fraction-based progress bar
│   │   ├── AuthSplitLayout/     # Two-column page shell (illustration | form card)
│   │   └── AuthStepTransition/  # Framer Motion fade+slide wrapper per step
│   └── ui/                      # Reusable primitives
│       ├── Button/              # primary / outline / ghost; loading state
│       ├── FieldHint/           # Hint text below a field
│       ├── Input/               # Label + input + error/hint, forwarded ref
│       ├── Loader/              # CSS border-spin spinner
│       ├── OTPInput/            # 4-cell OTP with paste + keyboard nav
│       └── PhoneInput/          # Country selector + number field
│
├── config/
│   ├── api.config.ts            # API base URL (placeholder)
│   ├── route.config.ts          # ROUTES constants
│   └── storage.config.ts        # localStorage key names
│
├── modules/
│   ├── jwt-module/              # Decode + expiry check for JWTs
│   ├── state-machine-module/    # XState wrapper + shared actions + useStateMachine hook
│   └── storage-module/          # Thin localStorage wrapper
│
├── pages/
│   └── Signup/
│       ├── components/
│       │   ├── AuthStepFooter.tsx   # Back + Submit button row
│       │   └── SuccessModal.tsx     # Animated overlay with account summary
│       ├── config/
│       │   └── steps.config.ts      # All copy strings + step count (single source)
│       ├── hooks/
│       │   └── useSignupFlow.ts     # Instantiates and subscribes to the XState machine
│       ├── schemas/                 # One Zod schema per step
│       ├── steps/                   # One component per form step
│       ├── types/
│       │   └── signup.types.ts      # SignupData = union of all step form types
│       └── utils/
│           └── formatSignupSummary.ts  # Phone/email masking, name formatting
│
├── routes/
│   └── AppRoutes.tsx            # Route declarations + HomePage placeholder
│
├── services/
│   ├── agent.ts                 # Assembles plugins into a typed agent object
│   ├── index.ts                 # StartupService, AuthService, SignupFlowService
│   ├── machines/
│   │   ├── auth-flow/           # XState machine: login / signup auth + JWT storage
│   │   ├── signup-flow/         # XState machine: 5-step data collection + completion
│   │   └── startup-validator/   # XState machine: session check on app boot
│   └── plugins/
│       ├── authentication.plugin.ts   # JWT verify + expiry
│       └── session.plugin.ts          # Save / read / clear session token
│
├── styles/
│   ├── theme.css                # All design tokens (colors, typography, spacing)
│   └── phone-input.css          # Custom CSS for react-international-phone
│
└── utils/
    ├── index.ts                 # cn() (class merger) + re-exports
    ├── async/simulateDelay.ts   # Promise-based delay (mock API)
    └── phone/                   # formatPhoneDisplay, isValidInternationalPhone
```

---

## Architecture

### Application Bootstrap

`main.tsx` renders `<App />` inside React's `StrictMode`. `App` calls `VApplication.getInstance().bootstrap()` on mount, which runs the `startup-validator` XState machine. That machine checks for a stored session token and, if found, validates it. While bootstrap runs, a `StartupContainer` spinner is shown. Once done (success or error), `BrowserRouter` and `AppRoutes` mount.

```
mount
  └─ VApplication.bootstrap()
        └─ startup-validator machine
              └─ agent.session.isLoggedIn()
                    └─ StorageModule.get(ID_TOKEN)
```

This means the rest of the app always starts with a known session state — no flicker between "logged in" and "logged out".

---

### State Machine — Signup Flow

The signup flow is driven by an XState v4 machine rather than a chain of `useState` flags. The machine lives in `src/services/machines/signup-flow/`.

**Why a machine?** The flow has 11 named states and two events (`SUBMIT`, `BACK`). Without a machine, this becomes a nest of booleans: `isSubmitting`, `hasError`, `currentStep`, `isSuccess`. The machine makes every legal transition explicit:

```
role ──SUBMIT──▶ submittingRole ──done──▶ phone
     ◀──────────────────────────error──

phone ──SUBMIT──▶ submittingPhone ──done──▶ otp
      ──BACK──▶ role

otp ──SUBMIT──▶ submittingOtp ──done──▶ name
    ──BACK──▶ phone

name ──SUBMIT──▶ submittingName ──done──▶ password
     ──BACK──▶ otp

password ──SUBMIT──▶ submittingPassword ──done──▶ completing
         ──BACK──▶ name

completing ──done──▶ success (final)
```

Each `submitting*` state invokes an async service (`submitStepState`) with a simulated delay. On success, the `mergeSignupData` action shallow-merges the submitted form data into the machine's `context.signupData`. On error, `assignError` writes the message to `context.error` and the machine transitions back to the idle state for that step.

**Three utility functions** translate machine state string to UI needs (`signupFlow.utils.ts`):

```ts
getSignupDisplayStep(stateValue); // 'submittingPhone' → 1
isSignupStepSubmitting(stateValue); // 'submittingOtp'  → true
isSignupSuccess(stateValue); // 'success'        → true
```

**`useSignupFlow`** (`pages/Signup/hooks/useSignupFlow.ts`) wraps `useStateMachine`, instantiates the machine config with the `signupFlowService` processor injected into context, and returns `{ state, send }`. The container (`container/index.tsx`) reads from `state` and dispatches `send({ type: 'SUBMIT', data })` or `send({ type: 'BACK' })`.

**`completing` state** calls `SignupFlowService.completeSignup()`, which internally runs the `auth-flow` machine to generate a mock JWT and store it in `localStorage`. This keeps the post-signup auth logic completely separate from the data-collection UI.

---

### Agent Pattern

Services communicate through a typed agent object rather than calling plugins directly. The agent assembles namespaced plugin instances:

```ts
agent.session.saveSession({ token, profile });
agent.session.isLoggedIn();
agent.auth.verify({ jwt });
agent.auth.isExpired({ jwt });
```

**Layers:**

```
StorageModule / JwtModule   (raw primitives)
        ↓
SessionPlugin / AuthenticationPlugin   (domain logic)
        ↓
agent   (single entry point for services and machines)
```

This means any service or state machine only ever imports `getAgent()` — it never touches `localStorage` directly. Swapping storage from `localStorage` to `IndexedDB`, or replacing mock JWT logic with a real SDK, is a one-file change.

---

### Container / Presentational Split

Every page follows a two-file pattern:

**`container/index.tsx`** — owns _all_ side effects and state subscriptions. It connects to the XState machine, extracts the values the UI needs (`step`, `isSubmitting`, `signupData`, `flowError`, `showSuccess`), and passes them down as plain props. This file has zero JSX except the single return.

**`container/container.com.tsx`** — purely presentational. It renders what it receives. It knows nothing about XState or service calls. It can be snapshot-tested with static props.

```
SignupContainer (index.tsx)
   useSignupFlow() → { state, send }
   ↓ props
ContainerCom (container.com.tsx)
   renders steps, layout, modal
```

---

### Copy Config

Every user-visible string — heading, CTA label, hint text, loading label, error copy — lives in `src/pages/Signup/config/steps.config.ts`. Step components import the strings they need; they never define them inline.

**Why:** A design review or copy change is a single-file diff. The components stay logic-only. Nothing is buried in JSX.

---

## Component Design

### `AuthSplitLayout`

The two-column page shell. Left panel: brand eyebrow, title, description, illustration. Right panel: optional progress bar above the fixed-height form card. A wave texture sits behind the entire page via a CSS `::before` pseudo-element on `.auth-page` (defined in `index.css`).

The progress bar sits _outside_ the card (above it) so it doesn't affect the card's internal layout as step content changes height.

### `AuthProgressBar`

Uses Framer Motion to animate the filled width between steps. The bar is rendered with `initial={false}` so it doesn't animate in on first render — it only animates on step transitions.

### `AuthStepTransition`

A thin Framer Motion `motion.div` that wraps each step. `AnimatePresence mode="wait"` in the container ensures the exiting step fully leaves the DOM before the entering step appears — no overlap, no layout jump.

```
exit: opacity 0, y -8
enter: opacity 0→1, y 10→0
duration: 280ms, ease [0.25, 0.1, 0.25, 1]
```

### `OTPInput`

Built from scratch (not a library) for full control:

- **Four separate `<input>` elements** — each holds one digit. Programmatic focus advances on digit entry, retreats on backspace from an empty cell.
- **Paste handler** — extracts up to four digits from clipboard text and distributes them across cells.
- **ARIA** — `role="group"` on the container, `aria-label="Digit N of 4"` on each cell, `aria-invalid` on error.
- **`autocomplete="one-time-code"`** on the first cell — allows browsers and SMS autofill to work.

### `Button`

Three variants (`primary`, `outline`, `ghost`), two sizes (`default`, `step`). When `isLoading` is true:

- Children swap to `<Loader /> + loadingLabel`
- `disabled` is set (prevents double-submit)
- `aria-busy="true"` is set (screen reader feedback)
- The active scale transform is suppressed on disabled state

### `PhoneInput`

Wraps `react-international-phone`'s `CountrySelector` and phone input with fully custom rendering so they match the design system exactly. The country selector button uses the same border, radius, focus ring, and hover styles as the rest of the form. `libphonenumber-js`'s `isValidPhoneNumber` validates the full E.164 number before the step can advance.

### `SuccessModal`

Framer Motion overlay with:

- Backdrop fade-in with `backdrop-blur-sm`
- Card scale-up from `0.94` with a `y` offset
- Staggered row entries (each summary row fades in with a `0.06 s` offset)
- Check icon scales in with a slight delay for emphasis

---

## Form Validation

Each step has its own Zod schema. The schema is the single source of validation rules and the TypeScript type — both inferred from the same definition.

| Step         | Schema           | Rules                                                                    |
| ------------ | ---------------- | ------------------------------------------------------------------------ |
| Account Type | `roleSchema`     | `z.enum(['personal', 'business'])` — required                            |
| Phone        | `phoneSchema`    | Non-empty + `isValidPhoneNumber()` per country                           |
| OTP          | `otpSchema`      | Exactly 4 characters, numeric                                            |
| Name         | `nameSchema`     | First and last name required, max 50 chars each                          |
| Password     | `passwordSchema` | Min 8 chars, ≥1 uppercase, ≥1 number; confirm must match via `.refine()` |

**Error display:** Inline beneath the relevant field, with `role="alert"` so screen readers announce them on appearance. Errors clear as soon as the user edits the field (`mode: 'onChange'` after first submit attempt).

**OTP is uncontrolled from React Hook Form** — because the four-cell input manages its own focus logic, it uses local `useState` and calls `otpSchema.safeParse()` manually on submit.

---

## Interaction States

Every interactive element has explicit styles for all states, using only design tokens (no hardcoded hex values in component files):

| State               | How it looks                                                                                   |
| ------------------- | ---------------------------------------------------------------------------------------------- |
| **Default**         | Border `border-border` or `border-border-input` for inputs                                     |
| **Hover**           | Border shifts toward `primary`, background shifts to `surface-muted`                           |
| **Focus**           | 2 px `outline` ring using `border-focus` token, offset by 2 px                                 |
| **Active / press**  | `scale(0.98–0.99)` micro-press on buttons and OTP cells                                        |
| **Loading**         | Spinner + label swap on submit button; `disabled` + `aria-busy`; `opacity-50` on form elements |
| **Error**           | `border-error` on input, inline `text-error` message with `role="alert"`                       |
| **Disabled**        | `opacity-50`, `cursor-not-allowed`, active scale suppressed                                    |
| **Resend cooldown** | 30 s countdown label; sending spinner during resend; success confirmation message              |

---

## Design System

All visual constants are CSS custom properties in `src/styles/theme.css`, declared inside Tailwind v4's `@theme` block. Components reference tokens — never raw hex values.

**Color tokens:**

| Token                      | Value     | Used for                                           |
| -------------------------- | --------- | -------------------------------------------------- |
| `--color-primary`          | `#0054fd` | CTAs, selected states, focus rings, progress bar   |
| `--color-primary-hover`    | `#0046d4` | Button hover                                       |
| `--color-primary-active`   | `#003db8` | Button press (`:active`)                           |
| `--color-background`       | `#eceef2` | Page background                                    |
| `--color-surface`          | `#ffffff` | Cards, inputs                                      |
| `--color-surface-muted`    | `#f9fafb` | Hover backgrounds, empty OTP cells                 |
| `--color-border`           | `#e5e7eb` | Standard borders                                   |
| `--color-border-input`     | `#b8cce0` | Phone and OTP cell borders (blue-tinted per Figma) |
| `--color-border-focus`     | `#0054fd` | Focus ring on all inputs and buttons               |
| `--color-text-primary`     | `#1a1f36` | Headings and body text                             |
| `--color-text-secondary`   | `#6b7280` | Hints, subtitles, secondary labels                 |
| `--color-text-label`       | `#7a90ad` | Field label text (matches Figma)                   |
| `--color-text-placeholder` | `#9ca3af` | Input placeholder text                             |
| `--color-text-inverse`     | `#ffffff` | Text on primary-colored backgrounds                |
| `--color-error`            | `#dc2626` | Validation errors, error borders                   |
| `--color-success`          | `#16a34a` | Success messages (resend confirmation)             |

**Font:** [Rubik](https://fonts.google.com/specimen/Rubik) — loaded from Google Fonts. Used across all weights (400–700) to match the Figma typography.

---

## Enhancements Beyond the Brief

These were not in the brief but improve quality or robustness:

| Enhancement                            | Detail                                                                                                                                                        |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **XState signup machine**              | Replaces naive `useState` step counter. Impossible transitions are impossible by construction. Error states are first-class.                                  |
| **Back-navigation persistence**        | Each step receives `defaultValues` from machine context, so going back pre-fills the form exactly as the user left it.                                        |
| **Phone number in OTP subtitle**       | After entering their phone, users see "An OTP has been sent to +91 98765 43210" — not a generic string.                                                       |
| **Flow-level error banner**            | If any step's async service fails, the machine surfaces `context.error` as a dismissible banner above the form (without breaking layout).                     |
| **Semantic design tokens**             | Zero hardcoded hex values in component files. Every color is a named CSS custom property in `theme.css`. Adding a dark mode would be a token swap.            |
| **`aria-busy` on loading buttons**     | Screen readers announce the loading state without requiring a live region.                                                                                    |
| **OTP `autocomplete="one-time-code"`** | Enables SMS autofill on iOS and Android.                                                                                                                      |
| **Agent / plugin architecture**        | Services communicate through a typed agent. Replacing `localStorage` with a different store, or mock JWTs with a real auth SDK, is scoped to one plugin file. |
| **Husky + lint-staged**                | ESLint and Prettier run on every staged file before each commit, keeping the history clean.                                                                   |

---

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Type check
npx tsc --noEmit

# Production build
npm run build
```

Navigate to `/signup` to start the flow.
