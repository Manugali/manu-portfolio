export function Footer() {
  return (
    <footer className="relative mt-20 py-6 px-6 border-t border-[--border]">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center">
        <div className="text-xs text-[--muted-foreground]">
          © {new Date().getFullYear()} All rights reserved.
        </div>
      </div>
    </footer>
  );
}


