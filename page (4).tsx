"use client";

import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { motion } from "framer-motion";

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto py-20 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <h1 className="text-4xl font-headline font-bold text-white mb-8">Terms of Service</h1>

          <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground leading-relaxed">
            <p className="text-lg text-white/80">
              Please read these Terms of Service carefully before using Atomize PDF.
            </p>

            <section className="space-y-4">
              <h2 className="text-2xl font-headline font-semibold text-white">Acceptance of Terms</h2>
              <p>
                By accessing or using our service, you agree to be bound by these terms. If you disagree with any part of the terms, you may not access the service.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-headline font-semibold text-white">Acceptable Use</h2>
              <p>
                By using this service, you agree not to upload illegal, harmful, or malicious content. We reserve the right to suspend accounts that violate our community standards or engage in automated abuse of the platform.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-headline font-semibold text-white">Cloud Limits</h2>
              <p>
                Free and Pro accounts are subject to specific cloud storage and processing limits as defined in our pricing documentation. Exceeding these limits may require an upgrade or data cleanup.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-headline font-semibold text-white">Account Suspension</h2>
              <p>
                We reserve the right to suspend or terminate access to our service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
              </p>
            </section>
          </div>
        </motion.div>
      </main>
      <FooterSection />
    </div>
  );
}
