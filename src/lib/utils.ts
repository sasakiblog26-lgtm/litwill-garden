import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Tailwind CSSクラスをマージするユーティリティ */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
