import { ReactNode } from "react";

export interface AttributesMovieProps {
  label: string;
  labelSize: 'sm' | 'md' | 'lg';
  fit?: boolean;
  children: ReactNode;
}

export default function AttributesMovie({
  label,
  labelSize = 'md',
  fit,
  children
}: AttributesMovieProps) {
  return (
    <div className={"flex flex-col gap-2 p-4 bg-surface-container/40 backdrop-blur-xl" + (fit ? ' w-fit' : '')}>
      <span className={`text-${labelSize} uppercase font-bold text-on-surface-variant/90`}>{label}</span>
      { children }
    </div>
  )
}