
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Scissors } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useAuth, useUser, useFirestore } from "@/firebase";
import { useToast } from "@/hooks/use-toast";
import { doc, setDoc } from "firebase/firestore";

export default function Signup() {
  const router = useRouter();
  const auth = useAuth();
  const db = useFirestore();
  const { user, loading: authLoading } = useUser();
  const { toast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user && !authLoading) {
      router.replace("/dashboard");
    }
  }, [user, authLoading, router]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const newUser = userCredential.user;

      // Initialize User Profile in Firestore
      const resetDate = new Date();
      resetDate.setMonth(resetDate.getMonth() + 1);

      await setDoc(doc(db, "users", newUser.uid), {
        uid: newUser.uid,
        email: newUser.email,
        plan: "free",
        messagesUsed: 0,
        pdfsUsed: 0,
        resetDate: resetDate.toISOString().split('T')[0],
        createdAt: new Date().toISOString(),
      });

      router.replace("/dashboard");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Account creation failed",
        description: error.message || "Something went wrong. Please try again.",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0B1120]">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="flex flex-col items-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4 shadow-lg shadow-primary/20">
              <Scissors className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-headline font-bold text-white">Create Account</h1>
            <p className="text-white/40 text-sm mt-2">Join Atomize PDF today</p>
          </div>

          <form
            onSubmit={handleSignup}
            className="glass-card p-8 rounded-2xl space-y-5"
          >
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/60 ml-1">Email Address</label>
              <input
                type="email"
                placeholder="name@company.com"
                className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all disabled:opacity-50"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/60 ml-1">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all disabled:opacity-50"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isSubmitting}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-bold transition-all shadow-lg shadow-primary/20 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Creating Account..." : "Sign Up"}
            </button>

            <div className="text-center pt-4 text-sm">
              <span className="text-white/40">Already have an account? </span>
              <Link href="/signin" className="text-primary hover:underline font-semibold">
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </main>
      <FooterSection />
    </div>
  );
}
