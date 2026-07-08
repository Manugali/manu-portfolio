type PageHeaderProps = {
  title: string;
  description?: string;
};

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <header className="mb-8">
      <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">
        {title}
      </h1>
      {description && (
        <p className="mt-3 text-sm text-[--muted-foreground] leading-relaxed">
          {description}
        </p>
      )}
    </header>
  );
}
