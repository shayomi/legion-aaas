"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
  y?: "sm" | "md" | "lg";
};

const yClassMap = {
  sm: "translate-y-3",
  md: "translate-y-6",
  lg: "translate-y-10",
};

export function Reveal({ children, className, delayMs = 0, y = "md" }: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setVisible(true);
        observer.disconnect();
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${delayMs}ms`,
        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
      }}
      className={cn(
        "transform-gpu transition-[opacity,transform,filter] duration-700 motion-reduce:transform-none motion-reduce:transition-none",
        visible ? "translate-y-0 opacity-100 blur-0" : `${yClassMap[y]} opacity-0 blur-[6px]`,
        className
      )}
    >
      {children}
    </div>
  );
}
