"use client";

import { useState, useEffect } from "react";
import { X, Download, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ExitIntentPopup() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const hasSeen = localStorage.getItem("neware-exit-popup-seen");
    if (hasSeen) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setVisible(true);
        localStorage.setItem("neware-exit-popup-seen", "1");
      }
    };

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;
      if (scrollTop + clientHeight >= scrollHeight - 200) {
        if (!localStorage.getItem("neware-exit-popup-seen")) {
          setVisible(true);
          localStorage.setItem("neware-exit-popup-seen", "1");
        }
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("neware-lead-email", email);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setVisible(false)} />
      <div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-md w-full mx-4 p-8 animate-in zoom-in-95 fade-in duration-300">
        <button
          onClick={() => setVisible(false)}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-14 h-14 bg-amber-100 dark:bg-amber-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <Download className="w-7 h-7 text-amber-600 dark:text-amber-400" />
          </div>
          <h2 className="text-2xl font-bold mb-2">
            Before You Go...
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Download our free Battery Testing Equipment Selection Guide — the most comprehensive buying resource available.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="popup-email">Work Email *</Label>
            <Input
              id="popup-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="mt-1"
            />
          </div>
          <Button type="submit" className="w-full gap-2 bg-amber-600 hover:bg-amber-700">
            <Mail className="w-4 h-4" />
            Send Me the Free Guide
            <ArrowRight className="w-4 h-4" />
          </Button>
          <p className="text-xs text-center text-slate-500">
            No spam. Unsubscribe anytime. Your data is safe with us.
          </p>
        </form>
      </div>
    </div>
  );
}
