import type { BlogPost } from "../blog-posts";
import { blogPosts as productGuides } from "./product-guides";
import { blogPosts as technicalPosts } from "./technical-deep-dives";

export type { BlogPost };

export const blogPosts: BlogPost[] = [
  ...productGuides,
  ...technicalPosts,
];
