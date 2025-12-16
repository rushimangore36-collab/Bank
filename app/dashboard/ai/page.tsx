"use client";

import { useState } from "react";

const FAQ_QUESTIONS = [
  "How do I create a bank account?",
  "How can I send money?",
  "How can I withdraw money?",
  "Is my money safe?",
  "What happens if a transaction fails?",
];

export default function FAQOnlyHelpPage() {
  const [selectedQuestion, setSelectedQuestion] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const askFAQ = async () => {
    if (!selectedQuestion) return;

    setLoading(true);
    setReply("");

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: selectedQuestion }),
      });

      if (!res.ok) throw new Error("API error");

      const data = await res.json();
      setReply(data.reply);
    } catch {
      setReply("Unable to get answer. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow border p-5">
        <h2 className="text-xl font-semibold mb-4 text-center">Help & FAQs</h2>

        {/* FAQ Select */}
        <select
          value={selectedQuestion}
          onChange={(e) => setSelectedQuestion(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 text-sm mb-3"
        >
          <option value="">Select a question</option>
          {FAQ_QUESTIONS.map((q, index) => (
            <option key={index} value={q}>
              {q}
            </option>
          ))}
        </select>

        {/* Ask Button */}
        <button
          onClick={askFAQ}
          disabled={!selectedQuestion || loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm disabled:opacity-50"
        >
          {loading ? "Fetching answer..." : "Get Answer"}
        </button>

        {/* Answer */}
        {reply && (
          <div className="mt-4 p-3 bg-gray-100 rounded text-sm text-gray-800">
            {reply}
          </div>
        )}
      </div>
    </div>
  );
}
