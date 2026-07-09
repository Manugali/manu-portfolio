type PageHeaderProps = {
  title: string;
  description?: string;
  label?: string;
};

export function PageHeader({ title, description, label }: PageHeaderProps) {
  return (
    <header className="mb-10 space-y-3 text-center">
      {label ? <p className="section-label">{label}</p> : null}
      <h1 className="section-title">{title}</h1>
      {description ? <p className="section-copy">{description}</p> : null}
    </header>
  );
}
