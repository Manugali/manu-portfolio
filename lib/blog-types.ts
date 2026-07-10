export const TAGS = ["building", "learning", "opinions", "life", "tech"] as const;
export type Tag = (typeof TAGS)[number];

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags: Tag[];
  featured?: boolean;
  content: string;
  readingTime: number;
};

export type BlogPostMeta = Omit<BlogPost, "content">;
