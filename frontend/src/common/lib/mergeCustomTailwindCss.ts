import { twMerge } from "tailwind-merge";

type mergedefaultCssCssProps = (
  defaultCss: string,
  className?: string
) => string;

export const mergedefaultCss: mergedefaultCssCssProps = (
  defaultCss,
  className
) => {
  const newClassName = twMerge(defaultCss, className);
  return newClassName;
};
