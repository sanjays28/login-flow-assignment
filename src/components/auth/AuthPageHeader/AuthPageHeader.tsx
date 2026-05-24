interface AuthPageHeaderProps {
  title: string;
  subtitle?: string;
}

export function AuthPageHeader({ title, subtitle }: AuthPageHeaderProps) {
  return (
    <header className="mb-5 sm:mb-8">
      <h2 className="text-xl font-semibold text-text-primary sm:text-2xl">{title}</h2>
      {subtitle && <p className="mt-1.5 text-sm text-text-secondary sm:mt-2">{subtitle}</p>}
    </header>
  );
}
