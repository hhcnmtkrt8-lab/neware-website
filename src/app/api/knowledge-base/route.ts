import { NextResponse } from "next/server";
import {
  documents,
  categories,
  getDocumentsByCategory,
  getDocumentById,
  getCategoryBySlug,
  searchDocuments,
  getDocumentsBySoftware,
  type CategorySlug,
} from "@/data/knowledge-base";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const action = searchParams.get("action");

  if (action === "categories") {
    return NextResponse.json({ categories });
  }

  if (action === "documents") {
    const category = searchParams.get("category");
    const software = searchParams.get("software");
    const q = searchParams.get("q");

    let result = documents;

    if (category) {
      const validSlug = category as CategorySlug;
      result = getDocumentsByCategory(validSlug);
    } else if (software) {
      result = getDocumentsBySoftware(software as Parameters<typeof getDocumentsBySoftware>[0]);
    } else if (q) {
      result = searchDocuments(q);
    }

    return NextResponse.json({ documents: result, total: result.length });
  }

  if (action === "document") {
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Missing id parameter" }, { status: 400 });
    }
    const doc = getDocumentById(id);
    if (!doc) {
      return NextResponse.json({ error: "Document not found" }, { status: 404 });
    }
    return NextResponse.json({ document: doc });
  }

  if (action === "category") {
    const slug = searchParams.get("slug");
    if (!slug) {
      return NextResponse.json({ error: "Missing slug parameter" }, { status: 400 });
    }
    const category = getCategoryBySlug(slug as CategorySlug);
    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }
    const docs = getDocumentsByCategory(slug as CategorySlug);
    return NextResponse.json({ category, documents: docs });
  }

  // Default: return all documents with categories
  return NextResponse.json({
    categories,
    documents,
    total: documents.length,
  });
}
