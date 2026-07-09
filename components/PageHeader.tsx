type PageHeaderProps = {
  title: string;
  description?: string;
  sectionNumber?: string;
};

export function PageHeader({ title, description, sectionNumber }: PageHeaderProps) {
  return (
    <header className="mb-8 text-center">
      {sectionNumber ? (
        <p className="section-number mb-3">{sectionNumber}</p>
      ) : null}
      <h1 className="gradient-text-hero text-3xl font-semibold sm:text-4xl">{title}</h1>
      <div className="header-divider" />
      {description ? (
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[--muted-foreground]">
          {description}
        </p>
      ) : null}
    </header>
  );
}
