import { FAQS } from "@/lib/faq";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return Response.json({ reply: "Invalid request." }, { status: 400 });
    }

    // Match FAQ exactly
    const matchedFAQ = FAQS.find((faq) => faq.question === message);

    if (!matchedFAQ) {
      return Response.json(
        {
          reply:
            "This question is not supported. Please select a question from the FAQ list.",
        },
        { status: 400 }
      );
    }

    return Response.json({
      reply: matchedFAQ.answer,
      source: "faq",
    });
  } catch (error) {
    console.error("FAQ API error:", error);
    return Response.json(
      { reply: "Server error. Try again later." },
      { status: 500 }
    );
  }
}
