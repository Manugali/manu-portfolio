type PageHeaderProps = {
  title: string;
  description?: string;
};

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <header className="mb-10 md:mb-14">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">
        {title}
      </h1>
      {description && (
        <p className="mt-3 max-w-2xl text-sm md:text-base text-[--muted-foreground] leading-relaxed">
          {description}
        </p>
      )}
    </header>
  );
}
