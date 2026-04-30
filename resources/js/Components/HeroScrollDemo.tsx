"use client";
import React from "react";
import { ContainerScroll } from "@/Components/ui/container-scroll-animation";

export function HeroScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden bg-navy-950 pt-20">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-white">
              Unleash the power of <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none bg-gradient-to-r from-indigo-300 to-accent bg-clip-text text-transparent">
                Scroll Animations
              </span>
            </h1>
          </>
        }
      >
        <img
          src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop"
          alt="Dashboard Preview"
          className="mx-auto rounded-2xl object-cover h-full w-full object-left-top shadow-2xl"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
}
