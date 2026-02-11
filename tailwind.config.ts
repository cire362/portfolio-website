import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // База (Noir)
        void: "#050505", // Vantablack
        primary: "#E0E0E0",
        accent: "#FF003C", // Кроваво-красный (Ошибки/Важное)

        // Режимы
        "neon-react": "#61DAFB", // React Cyan
        "neon-vue": "#42B883", // Vue Green
      },
      fontFamily: {
        mono: ["var(--font-jetbrains-mono)"],
        display: ["var(--font-unbounded)"],
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(to right, #2a2a2a 1px, transparent 1px), linear-gradient(to bottom, #2a2a2a 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};
export default config;
