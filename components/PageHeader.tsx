type PageHeaderProps = {
  title: string;
  description?: string;
};

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <header className="mb-8 text-center">
      <h1 className="text-3xl font-semibold tracking-tight bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">
        {title}
      </h1>
      {description && (
        <p className="mx-auto mt-3 max-w-2xl text-sm text-[--muted-foreground] leading-relaxed">
          {description}
        </p>
      )}
    </header>
  );
}
