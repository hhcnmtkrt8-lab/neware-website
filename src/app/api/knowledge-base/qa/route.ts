import { NextRequest, NextResponse } from "next/server";
import { answerQuestion } from "@/data/knowledge-base/qa-engine";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { question, locale = "zh" } = body;

    if (!question || typeof question !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid question field" },
        { status: 400 }
      );
    }

    if (question.trim().length < 3) {
      return NextResponse.json(
        { error: "Question too short" },
        { status: 400 }
      );
    }

    if (question.length > 500) {
      return NextResponse.json(
        { error: "Question too long (max 500 characters)" },
        { status: 400 }
      );
    }

    const result = answerQuestion(question.trim(), locale as string);

    return NextResponse.json({
      success: true,
      ...result,
      question,
      locale,
    });
  } catch (err) {
    console.error("[QA API] Error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
