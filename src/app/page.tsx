"use client";

import TheSwitch from "@/components/TheSwitch";
import { useMode } from "@/context/ModeContext";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type ProjectMode = "react" | "vue" | "both";

const projects: {
  title: string;
  stack: string[];
  mode: ProjectMode;
  description: string;
  links: { github: string; live: string };
}[] = [
  {
    title: "Signal Relay",
    stack: ["React", "Next", "Nest", "Postgres"],
    mode: "react",
    description: "Realtime ops dashboard with resilient queues and typed APIs.",
    links: { github: "#", live: "#" },
  },
  {
    title: "Vue District",
    stack: ["Vue", "Nuxt", "Node"],
    mode: "vue",
    description: "Order-first UI system for logistics and automation flows.",
    links: { github: "#", live: "#" },
  },
  {
    title: "Monolith Console",
    stack: ["Nest", "Postgres", "Redis"],
    mode: "both",
    description: "Immutable core services with audit trails and policy gates.",
    links: { github: "#", live: "#" },
  },
  {
    title: "Ghost Archive",
    stack: ["React", "Vue", "TypeScript"],
    mode: "both",
    description: "Dual-rendered media archive with indexed search and exports.",
    links: { github: "#", live: "#" },
  },
];

const timeline: {
  title: string;
  detail: string;
  year: string;
}[] = [
  {
    title: "Started with JS",
    detail: "Learned fundamentals and browser APIs.",
    year: "2024",
  },
  {
    title: "Learned React",
    detail: "Built component systems and design tokens.",
    year: "2025",
  },
  {
    title: "Meet with NestJS",
    detail: "Services, auth, and scalable API design.",
    year: "2025",
  },
  {
    title: "Current: Deepening Architecture",
    detail: "Event-driven design and system hardening.",
    year: "Now",
  },
];

export default function Home() {
  const { mode } = useMode();

  const commands = useMemo(
    () => [
      'echo "Building robust systems"',
      "git status --porcelain",
      "npm run build",
      "curl -s /api/health | jq .status",
      "docker compose ps",
      "node -e \"console.log('ready')\"",
    ],
    [],
  );

  const [cmdIndex, setCmdIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduceMotion(mq.matches);
    onChange();
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => {
      setCmdIndex((i) => (i + 1) % commands.length);
    }, 2400);
    return () => window.clearInterval(id);
  }, [commands.length, reduceMotion]);

  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
  const easeInOutSine = (t: number) => (1 - Math.cos(Math.PI * t)) / 2;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  } satisfies Variants;

  const itemVariants = {
    hidden: { opacity: 0, y: 26 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.75, ease: easeOutCubic },
    },
  } satisfies Variants;

  return (
    <div className="relative z-10 min-h-screen">
      <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-black/70 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-center sm:text-left font-display text-sm uppercase tracking-[0.25em] sm:tracking-[0.4em] text-white">
            The Glitch Dualist
          </div>
          <nav className="flex flex-wrap items-center justify-center gap-4 text-xs uppercase tracking-[0.2em] text-white/60 sm:justify-end">
            <a className="transition-colors hover:text-white" href="#hero">
              Hero
            </a>
            <a className="transition-colors hover:text-white" href="#core">
              Core
            </a>
            <a className="transition-colors hover:text-white" href="#projects">
              Projects
            </a>
            <a className="transition-colors hover:text-white" href="#timeline">
              Timeline
            </a>
            <a className="transition-colors hover:text-white" href="#connect">
              Connect
            </a>
          </nav>

          <TheSwitch />
        </div>
      </header>

      <main className="relative">
        <motion.section
          id="hero"
          className="relative overflow-hidden"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="ambient-glow" aria-hidden="true" />
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 pb-20 pt-24 md:grid-cols-[1.1fr_0.9fr]">
            <div>
              <motion.p
                variants={itemVariants}
                className="text-xs uppercase tracking-[0.4em] text-white/40"
              >
                Fullstack Developer
              </motion.p>
              <motion.h1
                variants={itemVariants}
                className="mt-4 font-display text-4xl font-bold tracking-[0.18em] text-white md:text-6xl lg:text-7xl"
              >
                <span className="glitch" data-text="KIRILL SHAMANAEV">
                  KIRILL SHAMANAEV
                </span>
              </motion.h1>
              <motion.p variants={itemVariants} className="mt-6">
                <span className="terminal-input" aria-label="Terminal input">
                  <span className="terminal-prompt">kirill@dualism</span>
                  <span className="terminal-dim">:</span>
                  <span className="terminal-path">~/core</span>
                  <span className="terminal-dim">$</span>
                  <span className="terminal-cmd">
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.span
                        key={cmdIndex}
                        initial={{ opacity: 0, y: 6, filter: "blur(1px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -6, filter: "blur(1px)" }}
                        transition={{ duration: reduceMotion ? 0 : 0.22 }}
                        className="terminal-cmd-text"
                      >
                        {commands[cmdIndex]}
                      </motion.span>
                    </AnimatePresence>
                  </span>
                </span>
              </motion.p>
              <motion.div
                variants={itemVariants}
                className="mt-10 flex flex-wrap items-center gap-4"
              >
                <a
                  className="cta-button hover-glitch"
                  data-text="Initialize Connection"
                  href="#connect"
                >
                  Initialize Connection
                </a>
                <div className="text-xs uppercase tracking-[0.3em] text-white/40">
                  Mode: {mode.toUpperCase()}
                </div>
              </motion.div>
              <motion.div
                variants={itemVariants}
                className="mt-10 flex items-center gap-6 text-xs uppercase tracking-[0.3em] text-white/50"
              >
                <span>React</span>
                <span>Vue</span>
                <span>Nest</span>
                <span>TypeScript</span>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, ease: easeOutCubic }}
              className="flex items-center justify-center"
            >
              <motion.div
                animate={{ y: [0, -14, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: easeInOutSine,
                }}
              >
                <div
                  className="avatar-frame"
                  style={{
                    // used by CSS pseudo-elements to create chromatic offsets
                    ["--avatar-url" as any]: "url('/avatar.jpg')",
                  }}
                >
                  <Image
                    src="/avatar.jpg"
                    alt="Kirill Shamanaev"
                    fill
                    priority
                    sizes="(min-width: 768px) 19rem, 16rem"
                    className="avatar-img"
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        <section id="core" className="mx-auto max-w-6xl px-6 py-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
            variants={containerVariants}
            className="flex items-center justify-between"
          >
            <motion.h2
              variants={itemVariants}
              className="font-display text-2xl uppercase tracking-[0.3em] text-white"
            >
              The Core
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-xs uppercase tracking-[0.3em] text-white/50"
            >
              System Core / Immutable
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
            variants={containerVariants}
            className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.1fr_1fr]"
          >
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="glass-panel hover-glitch"
              data-text="Frontend Shell"
            >
              <h3 className="text-xs uppercase tracking-[0.3em] text-white/60">
                Frontend Shell
              </h3>
              <div className="mt-6 space-y-4">
                <div className={cn("tag", mode === "vue" && "tag-dim")}>
                  React / Next.js
                </div>
                <div className={cn("tag", mode === "react" && "tag-dim")}>
                  Vue / Nuxt
                </div>
                <div className="tag">UI Systems</div>
              </div>
              <p className="mt-6 text-sm text-white/60">
                The shell morphs, shifts, and re-renders with the selected
                reality.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="core-block hover-glitch"
              data-text="Backend Foundation"
            >
              <p className="text-xs uppercase tracking-[0.4em] text-white/50">
                The Monolith
              </p>
              <h3 className="mt-4 font-display text-3xl text-white">
                Backend Foundation
              </h3>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <span className="chip">NestJS</span>
                <span className="chip">Postgres</span>
                <span className="chip">Node</span>
                <span className="chip">Express</span>
              </div>
              <p className="mt-6 text-sm text-white/60">
                Immutable services, reliable data, and strict contracts.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="glass-panel hover-glitch"
              data-text="Operational Traits"
            >
              <h3 className="text-xs uppercase tracking-[0.3em] text-white/60">
                Operational Traits
              </h3>
              <ul className="mt-6 space-y-4 text-sm text-white/70">
                <li>Typed APIs and modular domains.</li>
                <li>Event-driven integrations.</li>
                <li>Security-first workflows.</li>
              </ul>
            </motion.div>
          </motion.div>
        </section>

        <section id="projects" className="mx-auto max-w-6xl px-6 py-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
            variants={containerVariants}
            className="flex items-center justify-between"
          >
            <motion.h2
              variants={itemVariants}
              className="font-display text-2xl uppercase tracking-[0.3em] text-white"
            >
              Projects
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-xs uppercase tracking-[0.3em] text-white/50"
            >
              Case Studies
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
            variants={containerVariants}
            className="mt-10 grid gap-6 md:grid-cols-2"
          >
            {projects.map((project) => {
              const dimmed =
                mode !== "noir" &&
                project.mode !== "both" &&
                project.mode !== mode;

              return (
                <motion.article
                  key={project.title}
                  variants={itemVariants}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.2 }}
                  className={cn("data-card hover-glitch", dimmed && "mode-dim")}
                  data-text={project.title}
                >
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-white/40">
                    <span>Diskette</span>
                    <span>{project.mode.toUpperCase()}</span>
                  </div>
                  <h3 className="mt-4 font-display text-xl text-white">
                    {project.title}
                  </h3>
                  <p className="mt-4 text-sm text-white/60">
                    {project.description}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.stack.map((tag) => (
                      <span className="chip" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 flex gap-4 text-xs uppercase tracking-[0.3em]">
                    <a
                      className="link-ghost hover-glitch"
                      data-text="GitHub"
                      href={project.links.github}
                    >
                      GitHub
                    </a>
                    <a
                      className="link-ghost hover-glitch"
                      data-text="Live Demo"
                      href={project.links.live}
                    >
                      Live Demo
                    </a>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </section>

        <section id="timeline" className="mx-auto max-w-5xl px-6 py-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
            variants={containerVariants}
            className="flex items-center justify-between"
          >
            <motion.h2
              variants={itemVariants}
              className="font-display text-2xl uppercase tracking-[0.3em] text-white"
            >
              Experience
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-xs uppercase tracking-[0.3em] text-white/50"
            >
              18 y.o. Student & Developer
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
            variants={containerVariants}
            className="timeline mt-10"
          >
            {timeline.map((item) => (
              <motion.div
                key={item.title}
                variants={itemVariants}
                className="timeline-item"
              >
                <div className="timeline-dot" />
                <div className="timeline-content">
                  <div className="text-xs uppercase tracking-[0.3em] text-white/40">
                    {item.year}
                  </div>
                  <h3 className="mt-2 font-display text-lg text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-white/60">{item.detail}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </main>

      <footer id="connect" className="border-t border-white/10 px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-2xl uppercase tracking-[0.3em] text-white">
            Connect
          </h2>
          <div className="terminal mt-8">
            <p>
              &gt;{" "}
              <a
                className="link-ghost hover-glitch"
                data-text="mailto:kirillshamanaev1@gmail.com"
                href="mailto:kirillshamanaev1@gmail.com"
              >
                mailto:kirillshamanaev1@gmail.com
              </a>
            </p>
            <p>
              &gt;{" "}
              <a
                className="link-ghost hover-glitch"
                data-text="open:https://t.me/kii1888"
                href="https://t.me/kii1888"
                target="_blank"
                rel="noreferrer"
              >
                open:https://t.me/kii1888
              </a>
            </p>
            <p>
              &gt;{" "}
              <a
                className="link-ghost hover-glitch"
                data-text="git:https://github.com/cire362"
                href="https://github.com/cire362"
                target="_blank"
                rel="noreferrer"
              >
                git:https://github.com/cire362
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
