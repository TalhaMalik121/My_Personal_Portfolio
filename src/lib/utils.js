import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/** Expo-out: fast start, long silky settle. */
export const EASE = [0.19, 1, 0.22, 1];
/** Quart in-out: for curtains / wipes. */
export const EASE_IN_OUT = [0.76, 0, 0.24, 1];

export const SOCIALS = {
  github: "https://github.com/TalhaMalik121",
  linkedin: "https://www.linkedin.com/in/muhammad-talha-3b6a5a286/",
  email: "https://mail.google.com/mail/?view=cm&fs=1&to=talhagulsher7782@gmail.com",
};
