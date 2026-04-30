"use client";

import { ReactNode, useEffect, useRef } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import InteractiveHoverButton from "./interactive-hover-button";
import { router } from '@inertiajs/react';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface VerticalMarqueeProps {
  children: ReactNode;
  pauseOnHover?: boolean;
  reverse?: boolean;
  className?: string;
  speed?: number;
  onItemsRef?: (items: HTMLElement[]) => void;
}

function VerticalMarquee({
  children,
  pauseOnHover = false,
  reverse = false,
  className,
  speed = 30,
  onItemsRef,
}: VerticalMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (onItemsRef && containerRef.current) {
      const items = Array.from(containerRef.current.querySelectorAll('.marquee-item')) as HTMLElement[];
      onItemsRef(items);
    }
  }, [onItemsRef]);

  return (
    <div
      ref={containerRef}
      className={cn("group flex flex-col overflow-hidden", className)}
      style={
        {
          "--duration": `${speed}s`,
        } as React.CSSProperties
      }
    >
      <div
        className={cn(
          "flex shrink-0 flex-col animate-marquee-vertical",
          reverse && "[animation-direction:reverse]",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
      >
        {children}
      </div>
      <div
        className={cn(
          "flex shrink-0 flex-col animate-marquee-vertical",
          reverse && "[animation-direction:reverse]",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
        aria-hidden="true"
      >
        {children}
      </div>
    </div>
  );
}

const marqueeItems = [
  "Software Engineer",
  "Data Scientist",
  "Product Manager",
  "UI/UX Designer",
  "System Analyst",
  "Backend Developer",
  "Frontend Developer",
  "Digital Marketer",
];

export default function CTAWithVerticalMarquee() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const marqueeContainer = marqueeRef.current;
    if (!marqueeContainer) return;

    const updateOpacity = () => {
      const items = marqueeContainer.querySelectorAll('.marquee-item');
      const containerRect = marqueeContainer.getBoundingClientRect();
      const centerY = containerRect.top + containerRect.height / 2;

      items.forEach((item) => {
        const itemRect = item.getBoundingClientRect();
        const itemCenterY = itemRect.top + itemRect.height / 2;
        const distance = Math.abs(centerY - itemCenterY);
        const maxDistance = containerRect.height / 2;
        const normalizedDistance = Math.min(distance / maxDistance, 1);
        const opacity = 1 - normalizedDistance * 0.75;
        (item as HTMLElement).style.opacity = opacity.toString();
      });
    };

    const animationFrame = () => {
      updateOpacity();
      requestAnimationFrame(animationFrame);
    };

    const frame = requestAnimationFrame(animationFrame);

    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section className="bg-[#f6f6f6] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-white rounded-[40px] px-8 py-16 sm:px-16 overflow-hidden shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] border border-slate-100 flex items-center min-h-[500px]">
          
          <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px] opacity-40 pointer-events-none"></div>
          <div className="absolute top-[0%] left-[-10%] w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[80px] pointer-events-none"></div>
          <div className="absolute bottom-[0%] right-[-10%] w-[500px] h-[500px] bg-indigo-400/10 rounded-full blur-[80px] pointer-events-none"></div>

          <div className="relative z-20 flex flex-col lg:flex-row items-center justify-between w-full h-full gap-12">
            
            {/* Left Content (Text & Button) */}
            <div className="flex-1 text-center lg:text-left py-8 lg:py-0 relative z-20 max-w-xl">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#1A1A2E] font-[family-name:var(--font-heading)] leading-[1.1] mb-6 tracking-tight animate-fade-in-up">
                Saatnya Mulai Transformasi<br className="hidden md:block"/>Karier Anda 
              </h2>
              <p className="mt-4 text-slate-500 text-lg md:text-xl mb-10 font-medium leading-relaxed animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                Dapatkan roadmap presisi secara instan, validasi portofolio cerdas, dan sinkronisasi menuju posisi idaman Anda di industri.
              </p>
              
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                <InteractiveHoverButton 
                    text="Mulai Gratis Sekarang" 
                    loadingText="Memproses..."
                    successText="Siap Melesat!"
                    className="rounded-xl shadow-[0_10px_20px_-10px_rgba(59,130,246,0.6)] hover:shadow-xl hover:shadow-primary/30 transition-all text-[18px] py-4 px-10 min-w-0"
                    onClick={() => {
                        setTimeout(() => {
                            router.visit('/register');
                        }, 2000);
                    }}
                />
              </div>
            </div>

            {/* Right Marquee + Logo Kembangin */}
            <div className="relative flex-1 h-[400px] lg:h-[550px] w-full flex items-center justify-center animate-fade-in-up" style={{ animationDelay: '600ms' }}>
              
              {/* Logo removed as requested */}



              <div ref={marqueeRef} className="relative w-full h-full overflow-hidden z-20">
                <VerticalMarquee speed={30} className="h-full items-center">
                  {marqueeItems.map((item, idx) => (
                    <div
                      key={idx}
                      className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-800 tracking-tight py-6 marquee-item text-center w-full"
                    >
                      {item}
                    </div>
                  ))}
                </VerticalMarquee>
                
                {/* Vignettes for smooth fading at top and bottom */}
                <div className="pointer-events-none absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white via-white/70 to-transparent z-30"></div>
                <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/70 to-transparent z-30"></div>
              </div>
              
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
