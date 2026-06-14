
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import PricingSection from "@/components/PricingSection";
import FeaturesSection from "@/components/FeaturesSection";
import CTASection from "@/components/CTASection";
import FAQSection from "@/components/FAQSection";
import PDFPreview from "@/components/PDFPreview";
import { Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0B1120]">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 px-4 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="max-w-7xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-primary text-xs font-bold mb-8 animate-fade-in">
              <Sparkles className="w-3 h-3" />
              <span>Next-Gen Document Intelligence</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-headline font-bold text-white tracking-tight leading-tight mb-6">
              Chat with your PDFs <br />
              <span className="gradient-text">Instantly & Precisely</span>
            </h1>

            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              Upload documents and let our RAG-powered AI analyze, summarize, and answer your questions with strict citations from the source.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
              <a
                href="/signup"
                className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-xl shadow-primary/20 text-lg"
              >
                Start Free Trial 🚀
              </a>
              <a
                href="/pricing"
                className="w-full sm:w-auto border border-white/10 bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-xl font-bold transition-all text-lg"
              >
                View Pricing
              </a>
            </div>

            <div className="w-full max-w-2xl mx-auto">
              <PDFPreview />
            </div>
          </div>
        </section>

        {/* Pricing Section - Order: Hero -> Pricing -> Features -> CTA -> FAQ */}
        <PricingSection />

        {/* Features Comparison Section */}
        <FeaturesSection />

        {/* Bottom CTA Section */}
        <CTASection />

        {/* FAQ Section */}
        <FAQSection />
      </main>

      <FooterSection />
    </div>
  );
}
