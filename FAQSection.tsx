
"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does the AI grounding work?",
    answer: "Our system uses Retrieval-Augmented Generation (RAG). When you ask a question, we first search your document for the most relevant text chunks and provide only those to the AI. This ensures the answer is strictly based on your file."
  },
  {
    question: "Is my data secure?",
    answer: "Yes. Your PDFs and chat history are stored securely in encrypted Firestore buckets. We do not use your private documents to train public AI models."
  },
  {
    question: "What happens when I reach my message limit?",
    answer: "On the Free plan, you'll reach a cap after 10 messages. You can upgrade to Pro or Business at any time to get higher or unlimited message volumes."
  },
  {
    question: "Can I cancel my subscription?",
    answer: "Absolutely. You can manage your subscription and billing through the dashboard settings at any time. Your access will continue until the end of your billing period."
  },
  {
    question: "Which file formats are supported?",
    answer: "Currently, we specialize in high-precision PDF extraction. We are working on supporting .docx, .txt, and other text-heavy formats in the near future."
  }
];

export default function FAQSection() {
  return (
    <section className="py-24 bg-[#0B1120]/50 relative">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-white/40">
            Everything you need to know about Atomize PDF.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="glass-card border-white/5 px-6 rounded-xl">
              <AccordionTrigger className="text-white hover:text-primary transition-colors hover:no-underline font-semibold py-6">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-white/60 leading-relaxed pb-6">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
