
"use client";

import { motion } from "framer-motion";
import { Zap, ShieldCheck, Database, Search, MessageSquare, Files } from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Deep RAG Pipeline",
    description: "Our system extracts, chunks, and indexes your PDFs so the AI can retrieve precise answers without hallucinations."
  },
  {
    icon: ShieldCheck,
    title: "Strict AI Grounding",
    description: "The assistant only answers from the context provided. If it's not in the document, we'll tell you."
  },
  {
    icon: Zap,
    title: "Instant Processing",
    description: "High-speed document parsing that extracts text and prepares chunks for analysis in seconds."
  },
  {
    icon: Database,
    title: "Cloud Usage Tracking",
    description: "Monitor your message and PDF consumption in real-time with automatic monthly resets."
  },
  {
    icon: MessageSquare,
    title: "Contextual Chat",
    description: "Maintain long-running conversations with a history-aware assistant that remembers document context."
  },
  {
    icon: Files,
    title: "Team Workspaces",
    description: "Manage shared document hubs and invite team members to collaborate on workspace projects."
  }
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-[#0B1120] relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-headline font-bold text-white mb-4">
            Powerful Features for <br /> <span className="text-primary">Serious Document Analysis</span>
          </h2>
          <p className="text-white/40 text-lg max-w-2xl mx-auto">
            Everything you need to turn static PDFs into dynamic sources of truth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-8 group hover:border-primary/30 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
