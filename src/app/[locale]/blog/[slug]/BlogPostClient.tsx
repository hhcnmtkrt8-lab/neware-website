"use client";

import Link from "next/link";
import { ArrowLeft, Calendar, Clock, BookOpen, Cpu, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { blogPosts, type BlogPost } from "@/data/blog-posts";
import { products, productRoutes } from "@/data/neware";

interface Props {
  post: BlogPost;
  locale: string;
}

function renderMarkdown(text: string): React.ReactNode {
  const lines = text.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={i} className="text-xl font-bold text-slate-800 mt-8 mb-3 pb-2 border-b border-slate-200">
          {line.replace("## ", "")}
        </h2>
      );
      i++;
      continue;
    }

    if (line.startsWith("### ")) {
      elements.push(
        <h3 key={i} className="text-lg font-bold text-slate-800 mt-6 mb-2">
          {line.replace("### ", "")}
        </h3>
      );
      i++;
      continue;
    }

    if (line.startsWith("**") && line.endsWith("**") && !line.includes("\n")) {
      elements.push(
        <p key={i} className="font-bold text-slate-800 mt-4 mb-2">
          {line.replace(/\*\*/g, "")}
        </p>
      );
      i++;
      continue;
    }

    if (line.match(/^\| /) && line.endsWith(" |")) {
      const tableRows: string[] = [];
      while (i < lines.length && lines[i].match(/^\| /) && lines[i].endsWith(" |")) {
        tableRows.push(lines[i]);
        i++;
      }
      elements.push(
        <div key={`table-${i}`} className="overflow-x-auto my-4 rounded-xl border border-slate-200">
          <table className="w-full text-sm">
            <tbody>
              {tableRows.map((row, ri) => {
                const cells = row.split("|").slice(1, -1).map((c) => c.trim());
                const isSep = cells.every((c) => /^[-:]+$/.test(c));
                if (isSep) return null;
                return (
                  <tr key={ri} className={ri % 2 === 0 ? "bg-slate-50" : "bg-white"}>
                    {cells.map((cell, ci) => (
                      <td key={ci} className={`px-4 py-2.5 text-slate-700 ${ri === 0 ? "font-semibold text-slate-800" : ""}`}>
                        {cell.replace(/\*\*/g, "")}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    if (line.startsWith("- ") || line.startsWith("* ")) {
      const content = line.slice(2);
      elements.push(
        <li key={i} className="ml-5 text-slate-700 mb-1 leading-relaxed list-disc">
          {content.replace(/\*\*/g, "").replace(/\*/g, "")}
        </li>
      );
      i++;
      continue;
    }

    if (line.match(/^\d+\.\s+/)) {
      const match = line.match(/^\d+\.\s+(.+)/);
      if (match) {
        elements.push(
          <li key={i} className="ml-5 text-slate-700 mb-1 leading-relaxed list-decimal">
            {match[1].replace(/\*\*/g, "").replace(/\*/g, "")}
          </li>
        );
      }
      i++;
      continue;
    }

    if (line.trim() === "") {
      i++;
      continue;
    }

    elements.push(
      <p key={i} className="text-slate-700 mb-3 leading-relaxed">
        {line.replace(/\*\*/g, "").replace(/\*/g, "")}
      </p>
    );
    i++;
  }

  return <>{elements}</>;
}

export default function BlogPostClient({ post, locale }: Props) {
  const isZh = locale === "zh";

  const relatedPosts = blogPosts
    .filter((p) => p.id !== post.id)
    .slice(0, 2);

  const content = isZh ? post.content : post.contentEn;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link href={`/${locale}/blog`}>
          <Button variant="ghost" size="sm" className="mb-6 gap-2 text-slate-500 hover:text-slate-700">
            <ArrowLeft className="h-4 w-4" />
            {isZh ? "返回博客" : "Back to Blog"}
          </Button>
        </Link>

        <article>
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {(isZh ? post.tags : post.tagsEn).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
            <h1 className="text-3xl sm:text-4xl font-heading font-bold text-slate-900 mb-4 leading-tight">
              {isZh ? post.title : post.titleEn}
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed mb-4">
              {isZh ? post.summary : post.summaryEn}
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-slate-400">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {isZh ? post.date : post.dateEn}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {post.readingTime} {isZh ? "分钟阅读" : "min read"}
              </span>
              <span className="flex items-center gap-1.5">
                <BookOpen className="h-4 w-4" />
                {isZh ? post.author : post.authorEn}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            {renderMarkdown(content)}
          </div>
        </article>

        {/* Products Mentioned */}
        {post.relatedProducts && post.relatedProducts.length > 0 && (
          <div className="mt-12 pt-8 border-t border-slate-200">
            <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Cpu className="h-5 w-5 text-primary" />
              {isZh ? "相关产品" : "Products Mentioned"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {post.relatedProducts.map((productId) => {
                const product = products.find((p) => p.id === productId);
                if (!product) return null;
                const route = productRoutes.find((r) => r.id === product.routeId);
                const color = route?.color || "#1e40af";
                return (
                  <Link key={productId} href={`/${locale}/products/${productId}`}>
                    <Card className="group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden h-full">
                      <div className="h-1.5 w-full" style={{ backgroundColor: color }} />
                      <CardContent className="p-4 space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <Badge
                              variant="outline"
                              className="text-xs mb-2"
                              style={{ borderColor: color, color }}
                            >
                              {route ? (isZh ? route.name : route.nameEn) : product.routeId}
                            </Badge>
                            <h3 className="font-bold text-slate-900 text-sm group-hover:text-primary transition-colors line-clamp-1">
                              {product.nameEn}
                            </h3>
                          </div>
                          <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
                        </div>
                        <div className="flex flex-wrap gap-2 text-xs text-slate-500">
                          <span>{product.voltage}</span>
                          <span className="text-slate-300">|</span>
                          <span>{product.current}</span>
                          <span className="text-slate-300">|</span>
                          <span>{product.accuracy}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-12 pt-8 border-t border-slate-200">
            <h2 className="text-xl font-bold text-slate-800 mb-6">
              {isZh ? "相关文章" : "Related Articles"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedPosts.map((p) => (
                <Link
                  key={p.id}
                  href={`/${locale}/blog/${p.slug}`}
                  className="block p-4 bg-white rounded-xl border border-slate-200 hover:shadow-md hover:border-primary/20 transition-all"
                >
                  <p className="text-sm font-semibold text-slate-800 line-clamp-2 mb-2">
                    {isZh ? p.title : p.titleEn}
                  </p>
                  <p className="text-xs text-slate-400">
                    {isZh ? p.date : p.dateEn}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
