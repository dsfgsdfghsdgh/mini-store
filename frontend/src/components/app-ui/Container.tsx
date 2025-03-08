import { mergedefaultCss } from "@/lib/mergeCustomTailwindCss";
import React from "react";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={mergedefaultCss(
        "max-w-screen-xl mx-auto py-10 px-4 md:px-0",
        className
      )}
    >
      {children}
    </div>
  );
}
