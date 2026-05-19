"use client";

import { useEffect } from "react";

export function WebVitals() {
  useEffect(() => {
    const sendToAnalytics = (metric: { name: string; value: number; id: string }) => {
      if (process.env.NODE_ENV === "development") {
        console.log("[WebVitals]", metric.name, metric.value, metric.id);
      }
      // In production, you would send to GA4:
      // if (typeof window.gtag === 'function') {
      //   window.gtag('event', metric.name, {
      //     event_category: 'Web Vitals',
      //     event_label: metric.id,
      //     value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      //     non_interaction: true,
      //   });
      // }
    };

    // LCP: Largest Contentful Paint
    const observeLCP = () => {
      if (!('PerformanceObserver' in window)) return;
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as PerformanceEntry & { startTime: number };
        sendToAnalytics({ name: 'LCP', value: lastEntry.startTime, id: 'lcp' });
      });
      observer.observe({ type: 'largest-contentful-paint', buffered: true });
    };

    // FID: First Input Delay
    const observeFID = () => {
      if (!('PerformanceObserver' in window)) return;
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if ('processingStart' in entry) {
            const fid = (entry as PerformanceEventTiming & { processingStart: number }).processingStart - entry.startTime;
            sendToAnalytics({ name: 'FID', value: fid, id: 'fid' });
          }
        });
      });
      observer.observe({ type: 'first-input', buffered: true });
    };

    // CLS: Cumulative Layout Shift
    const observeCLS = () => {
      if (!('PerformanceObserver' in window)) return;
      let clsValue = 0;
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          const perfEntry = entry as PerformanceEntry & { hadRecentInput: boolean; value: number };
          if (!perfEntry.hadRecentInput) {
            clsValue += perfEntry.value;
          }
        });
        sendToAnalytics({ name: 'CLS', value: clsValue, id: 'cls' });
      });
      observer.observe({ type: 'layout-shift', buffered: true });
    };

    // INP: Interaction to Next Paint (replaces FID)
    const observeINP = () => {
      if (!('PerformanceObserver' in window)) return;
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if ('processingStart' in entry) {
            const inp = (entry as PerformanceEventTiming & { processingStart: number }).processingStart - entry.startTime;
            sendToAnalytics({ name: 'INP', value: inp, id: 'inp' });
          }
        });
      });
      observer.observe({ type: 'first-input', buffered: true });
    };

    observeLCP();
    observeFID();
    observeCLS();
    observeINP();
  }, []);

  return null;
}
