import ReactMarkdown from "react-markdown";

type BlogPostContentProps = {
  content: string;
};

export function BlogPostContent({ content }: BlogPostContentProps) {
  return (
    <div className="blog-prose">
      <ReactMarkdown
        components={{
          a: ({ href, children }) => (
            <a
              href={href}
              target={href?.startsWith("http") ? "_blank" : undefined}
              rel={href?.startsWith("http") ? "noreferrer noopener" : undefined}
            >
              {children}
            </a>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
