import React, { useCallback, useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { motion, useInView } from "motion/react";
import Hls from "hls.js";
import { ArrowUp, ArrowUpRight, BarChart3, Database, FileText, GitBranch, Play, Server, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import featureOne from "@/assets/feature-1.gif";
import featureTwo from "@/assets/feature-2.gif";
import logoIcon from "@/assets/logo-icon.png";
import { content } from "@/data/landingContent";
import "./styles.css";

const heroVideo =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4";
const startVideo = "https://stream.mux.com/9JXDljEVWYwWu01PUkAemafDugK89o01BR6zqJ3aS9u00A.m3u8";
const statsVideo = "https://stream.mux.com/NcU3HlHeF7CUL86azTTzpy3Tlb00d6iF3BmCdFslMJYM.m3u8";
const ctaVideo = "https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8";

const fallbackBlogData = {
  posts: [
    {
      title: "Project ASDF",
      summary: "Hello World! My First Blog Post.",
      url: "/posts/first-post/",
      section: "project",
      date: "2026-03-26T00:00:00+09:00",
      dateLabel: "2026.03.26",
      tags: ["설계", "기획"],
      commitHash: "--",
    },
  ],
  projects: [
    {
      title: "AI Landing Page System",
      summary: "Hello World! My Second Blog Post.",
      url: "/projects/second-post/",
      section: "project",
      date: "2026-03-26T00:00:00+09:00",
      dateLabel: "2026.03.26",
      tags: ["react", "hugo"],
      commitHash: "--",
    },
  ],
  commits: [],
};

const siteData = window.__BLOG_DATA__ || fallbackBlogData;

function HlsVideo({ src, className = "", desaturate = false }) {
  const ref = useRef(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return undefined;
    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
      return undefined;
    }
    if (Hls.isSupported()) {
      const hls = new Hls({ enableWorker: true });
      hls.loadSource(src);
      hls.attachMedia(video);
      return () => hls.destroy();
    }
    return undefined;
  }, [src]);

  return (
    <video
      ref={ref}
      autoPlay
      loop
      muted
      playsInline
      className={`${className} ${desaturate ? "saturate-0" : ""}`}
    />
  );
}

function BlurText({ text, className = "", delay = 100 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const lines = text.split("\n");
  return (
    <span ref={ref} className={className}>
      {lines.map((line, lineIndex) => (
        <span key={`line-${lineIndex}`} className="block whitespace-nowrap">
          {line.split(" ").map((word, wordIndex) => {
            const index = lines.slice(0, lineIndex).reduce((count, item) => count + item.split(" ").length, 0) + wordIndex;
            return (
              <motion.span
                key={`${word}-${lineIndex}-${wordIndex}`}
                className="inline-block pr-[0.18em]"
                initial={{ filter: "blur(10px)", opacity: 0, y: 50 }}
                animate={
                  inView
                    ? {
                        filter: ["blur(10px)", "blur(5px)", "blur(0px)"],
                        opacity: [0, 0.5, 1],
                        y: [50, -5, 0],
                      }
                    : undefined
                }
                transition={{ delay: (index * delay) / 1000, duration: 0.7, ease: "easeOut" }}
              >
                {word}
              </motion.span>
            );
          })}
        </span>
      ))}
    </span>
  );
}

function FadeIn({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
      whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay, duration: 0.6, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Navbar() {
  const links = [
    ["Home", "/"],
    ["Posts", "/posts/"],
    ["Projects", "/projects/"],
    ["Tags", "/tags/"],
    ["Archive", "#recent-posts"],
  ];
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 backdrop-blur-md md:fixed md:left-0 md:right-0 md:top-4 md:bg-transparent md:px-8 md:py-3 md:backdrop-blur-0 lg:px-16">
      <a href="/" className="flex h-11 w-11 items-center justify-center rounded-full liquid-glass-strong md:h-12 md:w-12" aria-label="Home">
        <img src={logoIcon} alt="" className="h-11 w-11 object-contain md:h-12 md:w-12" />
      </a>
      <div className="hidden items-center rounded-full px-1.5 py-1 liquid-glass md:flex">
        {links.map(([label, href]) => (
          <a key={label} href={href} className="px-3 py-2 font-body text-sm font-medium text-foreground/90">
            {label}
          </a>
        ))}
        <a href="/posts/" className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 font-body text-sm font-medium text-black">
          글 보기 <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>
      <a href="/posts/" className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-2 font-body text-sm font-medium text-black md:hidden">
        글 보기 <ArrowUpRight className="h-3.5 w-3.5" />
      </a>
    </nav>
  );
}

function TerminalWindow() {
  const [dockPos, setDockPos] = useState(() => getDockHomePosition());
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [closingRect, setClosingRect] = useState(null);
  const [closingAnimating, setClosingAnimating] = useState(false);
  const [inHeroRange, setInHeroRange] = useState(true);
  const [hidden, setHidden] = useState(false);
  const [dragging, setDragging] = useState(false);
  const terminalRef = useRef(null);
  const orbitRef = useRef(null);
  const drag = useRef(null);
  const didDrag = useRef(false);
  const frame = useRef(null);
  const closeTimer = useRef(null);
  const closingRectFrame = useRef(null);
  const scrollPauseTimer = useRef(null);
  const nextDockPos = useRef(dockPos);
  const homeDockPos = useRef(dockPos);
  const renderedDockPos = useRef(dockPos);
  const recent = [...siteData.posts, ...siteData.projects].sort((a, b) => (b.date || "").localeCompare(a.date || "")).slice(0, 5);
  const commits = siteData.commits?.length ? siteData.commits : recent.slice(0, 3).map((item) => ({ hash: item.commitHash || "local", title: item.title, url: item.url }));

  function getPanelSize() {
    const width = Math.min(window.innerWidth - 32, window.innerWidth < 860 ? 380 : 328);
    const height = Math.min(window.innerHeight - 112, window.innerWidth < 860 ? 360 : 380);
    return { width, height };
  }

  function clampDock(next) {
    const { width, height } = getPanelSize();
    const gutter = window.innerWidth < 860 ? 12 : 16;
    const maxX = Math.max(gutter, window.innerWidth - width - gutter);
    const maxY = Math.max(gutter, window.innerHeight - height - gutter);
    return {
      x: Math.min(Math.max(next.x, gutter), maxX),
      y: Math.min(Math.max(next.y, gutter), maxY),
    };
  }

  function getDockHomePosition() {
    const { width } = getPanelSize();
    const mobile = window.innerWidth < 860;
    const rightInset = mobile ? 16 : 20;
    const y = Math.round(window.innerHeight * (mobile ? 0.34 : 0.26));
    return clampDock({
      x: window.innerWidth - width - rightInset,
      y,
    });
  }

  function getStableHomeDockPosition() {
    if (!homeDockPos.current) {
      homeDockPos.current = getDockHomePosition();
    }
    return homeDockPos.current;
  }

  function getClosedDockRect(home = getStableHomeDockPosition()) {
    const panelWidth = getPanelSize().width;
    return {
      left: home.x + (panelWidth - 86),
      top: home.y,
      width: 86,
      height: 42,
    };
  }

  const closeTerminal = useCallback(({ hideAfterClose = false } = {}) => {
    const home = getStableHomeDockPosition();
    const needsAnimatedHide = hideAfterClose && (open || !hidden || closing);
    window.clearTimeout(closeTimer.current);
    if (closingRectFrame.current) {
      cancelAnimationFrame(closingRectFrame.current);
      closingRectFrame.current = null;
    }
    if (!open) {
      setClosingRect(null);
      setClosingAnimating(false);
      nextDockPos.current = home;
      setDockPos(home);
      didDrag.current = false;
      if (needsAnimatedHide) {
        setHidden(false);
        setClosing(true);
        closeTimer.current = window.setTimeout(() => {
          setClosing(false);
          setHidden(true);
        }, 340);
      } else if (!hideAfterClose) {
        setClosing(false);
        setHidden(false);
      }
      return;
    }

    const snapshot = terminalRef.current?.getBoundingClientRect();
    setClosingRect(snapshot ? {
      left: snapshot.left,
      top: snapshot.top,
      width: snapshot.width,
      height: snapshot.height,
    } : null);
    setClosingAnimating(false);
    setHidden(false);
    setClosing(true);
    setOpen(false);
    didDrag.current = false;
    closingRectFrame.current = requestAnimationFrame(() => {
      setClosingAnimating(true);
      setClosingRect(getClosedDockRect(home));
      nextDockPos.current = home;
      setDockPos(home);
      closingRectFrame.current = null;
    });
    closeTimer.current = window.setTimeout(() => {
      setClosing(false);
      setClosingRect(null);
      setClosingAnimating(false);
      setHidden(hideAfterClose);
    }, 340);
  }, [closing, hidden, open]);

  useEffect(() => {
    function syncVisibility() {
      const zone = document.querySelector(".hero-terminal-range");
      if (!zone) return;
      const rect = zone.getBoundingClientRect();
      const visible = rect.bottom > 0 && rect.top < window.innerHeight;
      setInHeroRange(visible);
      if (visible) {
        window.clearTimeout(closeTimer.current);
        setClosing(false);
        setHidden(false);
        return;
      }
      closeTerminal({ hideAfterClose: true });
    }

    syncVisibility();
    window.addEventListener("scroll", syncVisibility, { passive: true });
    window.addEventListener("resize", syncVisibility);
    return () => {
      window.removeEventListener("scroll", syncVisibility);
      window.removeEventListener("resize", syncVisibility);
    };
  }, [closeTerminal]);

  useEffect(() => () => {
    window.clearTimeout(closeTimer.current);
    window.clearTimeout(scrollPauseTimer.current);
    if (closingRectFrame.current) {
      cancelAnimationFrame(closingRectFrame.current);
    }
  }, []);

  useEffect(() => {
    function pauseFloatingOnScroll() {
      const orbit = orbitRef.current;
      if (!orbit) return;
      orbit.classList.add("terminal-orbit-scroll-paused");
      window.clearTimeout(scrollPauseTimer.current);
      scrollPauseTimer.current = window.setTimeout(() => {
        orbit.classList.remove("terminal-orbit-scroll-paused");
      }, 140);
    }

    window.addEventListener("scroll", pauseFloatingOnScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", pauseFloatingOnScroll);
      window.clearTimeout(scrollPauseTimer.current);
    };
  }, []);

  useEffect(() => {
    function closeOnOutside(event) {
      if (!open) return;
      if (terminalRef.current && !terminalRef.current.contains(event.target)) {
        closeTerminal();
      }
    }

    document.addEventListener("pointerdown", closeOnOutside);
    return () => document.removeEventListener("pointerdown", closeOnOutside);
  }, [open, closeTerminal]);

  useEffect(() => {
    function keepInView() {
      setDockPos((value) => {
        if (!open) {
          const home = getDockHomePosition();
          homeDockPos.current = home;
          nextDockPos.current = home;
          renderedDockPos.current = home;
          return home;
        }
        if (!value) return value;
        const clamped = clampDock(value);
        nextDockPos.current = clamped;
        renderedDockPos.current = clamped;
        return clamped;
      });
    }

    window.addEventListener("resize", keepInView);
    return () => window.removeEventListener("resize", keepInView);
  }, [open]);

  function animateDockToTarget({ snap = false } = {}) {
    if (frame.current) return;
    frame.current = requestAnimationFrame(() => {
      const target = nextDockPos.current;
      const current = renderedDockPos.current || target;
      const eased = snap ? target : {
        x: current.x + ((target.x - current.x) * 0.24),
        y: current.y + ((target.y - current.y) * 0.24),
      };
      const settled = snap || (Math.abs(target.x - eased.x) < 0.6 && Math.abs(target.y - eased.y) < 0.6);
      const next = settled ? target : eased;
      renderedDockPos.current = next;
      setDockPos(next);
      frame.current = null;
      if (!settled) {
        animateDockToTarget();
      }
    });
  }

  function startDrag(event) {
    if (!open) {
      didDrag.current = false;
      return;
    }
    if (event.target.closest("a")) return;
    event.preventDefault();
    const rect = orbitRef.current?.getBoundingClientRect();
    const origin = rect ? { x: rect.left, y: rect.top } : dockPos || getDockHomePosition();
    drag.current = { x: event.clientX - origin.x, y: event.clientY - origin.y, startX: event.clientX, startY: event.clientY };
    didDrag.current = false;
    renderedDockPos.current = origin;
    setDragging(true);
    window.addEventListener("pointermove", moveDrag);
    window.addEventListener("pointerup", stopDrag);
  }
  function moveDrag(event) {
    if (!drag.current) return;
    if (Math.abs(event.clientX - drag.current.startX) > 4 || Math.abs(event.clientY - drag.current.startY) > 4) {
      didDrag.current = true;
    }
    nextDockPos.current = clampDock({ x: event.clientX - drag.current.x, y: event.clientY - drag.current.y });
    animateDockToTarget();
  }
  function stopDrag() {
    drag.current = null;
    setDragging(false);
    animateDockToTarget({ snap: true });
    window.removeEventListener("pointermove", moveDrag);
    window.removeEventListener("pointerup", stopDrag);
  }

  const orbitHidden = hidden && !open && !closing;
  const orbitInteractive = inHeroRange && !closing && !orbitHidden;

  return (
    <div
      ref={orbitRef}
      className={`terminal-orbit ${open ? "terminal-orbit-open" : ""} ${closing ? "terminal-orbit-closing" : ""} ${orbitHidden ? "terminal-orbit-hidden" : ""} ${orbitInteractive ? "" : "terminal-orbit-inactive"} ${dragging ? "terminal-orbit-dragging" : ""}`}
      style={{ left: `${dockPos.x}px`, top: `${dockPos.y}px`, right: "auto", bottom: "auto" }}
      aria-hidden={!orbitInteractive}
    >
    <div
      ref={terminalRef}
      className={`terminal-hologram liquid-glass ${open ? "terminal-open" : ""} ${closing ? "terminal-closing" : ""}`}
      style={closingRect ? {
        position: "fixed",
        left: `${closingRect.left}px`,
        top: `${closingRect.top}px`,
        width: `${closingRect.width}px`,
        height: `${closingRect.height}px`,
        maxHeight: `${closingRect.height}px`,
        marginTop: 0,
        transition: closingAnimating ? undefined : "none",
      } : undefined}
      onPointerDown={startDrag}
    >
      <button
        className="terminal-bar"
        onClick={() => {
          if (didDrag.current) {
            didDrag.current = false;
            return;
          }
          if (open) {
            closeTerminal();
            return;
          }
          window.clearTimeout(closeTimer.current);
          setClosingRect(null);
          setClosingAnimating(false);
          setClosing(false);
          setHidden(false);
          setOpen(true);
        }}
        type="button"
        aria-label="Open deploy log terminal"
        aria-expanded={open}
      >
        <span className="terminal-dots" aria-hidden="true">
          <span className="dot bg-[#ff5f57]" />
          <span className="dot bg-[#febc2e]" />
          <span className="dot bg-[#28c840]" />
        </span>
        <span className="terminal-mini-icon" aria-hidden="true">$</span>
        <span className="terminal-title">
          <span className="terminal-title-closed">log.</span>
          <span className="terminal-title-open">{content.terminal.title}</span>
        </span>
        <span className="terminal-mini-meta" aria-hidden="true">recent</span>
      </button>
      <div className="terminal-body space-y-3 p-4 font-mono text-[11px] leading-relaxed text-white/70">
        <div><span className="text-cyan-200">{content.terminal.cwd}</span> <span className="text-white">$ {content.terminal.command}</span></div>
        <div className="space-y-1">
          {recent.length ? recent.map((item) => (
            <a key={item.url} className="block rounded px-2 py-1 text-white/65 transition hover:bg-white/10 hover:text-white" href={item.url}>
              <span className="mr-2 rounded bg-white/10 px-1.5 py-0.5 text-[10px] uppercase text-cyan-100">{item.section}</span>
              {item.title}
            </a>
          )) : <span className="block px-2 text-white/45">No Markdown entries yet.</span>}
        </div>
        <div><span className="text-cyan-200">{content.terminal.cwd}</span> <span className="text-white">$ git log --oneline -3</span></div>
        <div className="space-y-1">
          {commits.map((commit, index) => (
            <a key={`${commit.hash}-${index}`} href={commit.url || "/posts/"} className="block rounded px-2 py-1 text-white/55 transition hover:bg-white/10 hover:text-white">
              <span className="text-cyan-100">{commit.hash}</span> {commit.title}
            </a>
          ))}
        </div>
        <div><span className="text-cyan-200">{content.terminal.cwd}</span> <span className="text-white">$</span> <span className="terminal-cursor" /></div>
      </div>
    </div>
    </div>
  );
}

function Hero() {
  const postCount = String(siteData.posts?.length || 0).padStart(2, "0");
  const projectCount = String(siteData.projects?.length || 0).padStart(2, "0");
  const commitHash = siteData.commits?.[0]?.hash || "--";

  return (
    <section className="relative min-h-[900px] overflow-hidden bg-black md:min-h-[940px]">
      <video autoPlay loop muted playsInline poster="/images/hero_bg.jpeg" className="absolute inset-0 z-0 h-full w-full object-cover opacity-70">
        <source src={heroVideo} type="video/mp4" />
      </video>
      <div className="rain-scene" aria-hidden="true" />
      <div className="absolute inset-0 z-0 bg-black/5" />
      <div className="pointer-events-none absolute bottom-0 z-[1] h-[300px] w-full bg-gradient-to-b from-transparent to-black" />
      <div className="hero-terminal-range relative z-10 mx-auto flex min-h-[900px] max-w-6xl flex-col items-center px-6 pt-24 text-center md:min-h-[940px] md:pt-[130px]">
        <FadeIn className="mb-8 inline-flex rounded-full px-1 py-1 liquid-glass">
          <span className="rounded-full bg-white px-3 py-1 font-body text-xs font-semibold text-black">Blog</span>
          <span className="px-3 py-1 font-body text-xs text-white/80">{content.hero.badge} ({content.hero.status})</span>
        </FadeIn>
        <h1 className="max-w-4xl font-heading text-6xl italic leading-[0.8] tracking-[-2px] text-foreground md:text-7xl lg:max-w-5xl lg:text-[5.5rem] lg:tracking-[-4px]">
          <BlurText text={content.hero.title} delay={100} />
        </h1>
        <motion.p
          initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
          animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-8 max-w-lg font-body text-sm font-light leading-tight text-white md:text-base"
        >
          {content.hero.description}
        </motion.p>
        <motion.div
          initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
          animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="hero-cta-row mt-8 flex items-center justify-center gap-4"
        >
          <a href="/posts/"><Button>{content.hero.primaryCta} <ArrowUpRight className="h-4 w-4" /></Button></a>
          <a href="/projects/"><Button variant="ghost" className="px-2"><Play className="h-4 w-4 fill-white" /> {content.hero.secondaryCta}</Button></a>
        </motion.div>
        <div className="hero-metrics mt-10 grid w-full max-w-xl grid-cols-3 overflow-hidden rounded-2xl liquid-glass">
          {[
            [postCount, "Posts"],
            [projectCount, "Projects"],
            [commitHash, "Commit"],
          ].map(([value, label]) => (
            <div key={label} className="border-r border-white/10 px-5 py-4 last:border-r-0">
              <div className="font-heading text-3xl italic text-white">{value}</div>
              <div className="mt-1 font-body text-xs uppercase tracking-[0.16em] text-white/45">{label}</div>
            </div>
          ))}
        </div>
        <div className="mt-auto pb-8 pt-16">
          <div className="mx-auto mb-8 w-fit rounded-full px-3.5 py-1 font-body text-xs font-medium text-white liquid-glass">{content.hero.signal}</div>
          <div className="flex flex-wrap justify-center gap-12 md:gap-16">
            {content.hero.keywords.map((name) => (
              <span key={name} className="font-heading text-2xl italic text-white md:text-3xl">{name}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function VideoSection({ src, children, className = "", desaturate = false, ...props }) {
  return (
    <section className={`relative overflow-hidden bg-black ${className}`} {...props}>
      <HlsVideo src={src} desaturate={desaturate} className="absolute inset-0 h-full w-full object-cover opacity-65" />
      <div className="pointer-events-none absolute left-0 right-0 top-0 h-[200px] bg-gradient-to-b from-black to-transparent" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[200px] bg-gradient-to-t from-black to-transparent" />
      {children}
    </section>
  );
}

function StartSection() {
  return (
    <VideoSection src={startVideo} className="py-24 md:py-28" id="services">
      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center justify-center px-6 text-center">
        <SectionBadge>{content.process.badge}</SectionBadge>
        <h2 className="mt-5 font-heading text-4xl italic leading-[0.9] tracking-tight text-white md:text-5xl lg:text-6xl">{content.process.title}</h2>
        <p className="mt-5 max-w-xl font-body text-sm font-light text-white/60 md:text-base">{content.process.description}</p>
        <a href="/posts/" className="mt-8"><Button className="px-6 py-3">{content.process.cta} <ArrowUpRight className="h-4 w-4" /></Button></a>
      </div>
    </VideoSection>
  );
}

function SectionBadge({ children }) {
  return <div className="w-fit rounded-full px-3.5 py-1 font-body text-xs font-medium text-white liquid-glass">{children}</div>;
}

function FeaturesChess() {
  const rows = content.featureRows.map((row, index) => ({
    ...row,
    image: index === 0 ? featureOne : featureTwo,
    reverse: index % 2 === 1,
  }));
  return (
    <section id="work" className="bg-black px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionBadge>기록 방식</SectionBadge>
        <h2 className="mt-5 max-w-2xl font-heading text-4xl italic leading-[0.9] tracking-tight text-white md:text-5xl lg:text-6xl">실무자가 읽어도 남는 기록.</h2>
        <div className="mt-16 space-y-10">
          {rows.map((row) => (
            <FadeIn key={row.title} className={`flex flex-col items-center gap-10 ${row.reverse ? "lg:flex-row-reverse" : "lg:flex-row"}`}>
              <div className="flex-1">
                <h3 className="font-heading text-4xl italic leading-[0.9] text-white md:text-5xl">{row.title}</h3>
                <p className="mt-5 max-w-md font-body text-sm font-light leading-relaxed text-white/60 md:text-base">{row.body}</p>
                <Button className="mt-7">{row.button} <ArrowUpRight className="h-4 w-4" /></Button>
              </div>
              <div className="flex-1 rounded-2xl p-2 liquid-glass">
                <img src={row.image} alt="" className="aspect-[16/10] w-full rounded-2xl object-cover" loading="lazy" />
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturesGrid() {
  const icons = [Database, Server, BarChart3, FileText];
  const items = content.strengths.items.map((item, index) => [icons[index] || Zap, item.title, item.body]);
  return (
    <section id="process" className="bg-black px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionBadge>{content.strengths.badge}</SectionBadge>
        <h2 className="mt-5 max-w-2xl font-heading text-4xl italic leading-[0.9] tracking-tight text-white md:text-5xl lg:text-6xl">{content.strengths.title}</h2>
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {items.map(([Icon, title, body]) => (
            <FadeIn key={title} className="rounded-2xl p-6 liquid-glass">
              <div className="mb-8 flex h-10 w-10 items-center justify-center rounded-full liquid-glass-strong"><Icon className="h-5 w-5 text-white" /></div>
              <h3 className="font-body text-lg font-medium text-white">{title}</h3>
              <p className="mt-3 font-body text-sm font-light leading-relaxed text-white/60">{body}</p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <VideoSection src={statsVideo} desaturate className="px-6 py-32">
      <div className="relative z-10 mx-auto max-w-6xl rounded-3xl p-12 liquid-glass md:p-16">
        <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-4">
          {content.stats.map(([value, label]) => (
            <div key={label}>
              <div className="font-heading text-4xl italic text-white md:text-5xl lg:text-6xl">{value}</div>
              <div className="mt-2 font-body text-sm font-light text-white/60">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </VideoSection>
  );
}

function Testimonials() {
  return (
    <section className="bg-black px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionBadge>{content.testimonials.badge}</SectionBadge>
        <h2 className="mt-5 max-w-2xl font-heading text-4xl italic leading-[0.9] tracking-tight text-white md:text-5xl lg:text-6xl">{content.testimonials.title}</h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {content.testimonials.items.map(({ quote, name, role }) => (
            <FadeIn key={name} className="rounded-2xl p-8 liquid-glass">
              <p className="font-body text-sm font-light italic leading-relaxed text-white/80">"{quote}"</p>
              <div className="mt-8 font-body text-sm font-medium text-white">{name}</div>
              <div className="mt-1 font-body text-xs font-light text-white/50">{role}</div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function CareerTimeline() {
  return (
    <section className="relative overflow-hidden bg-black px-6 py-28">
      <div className="absolute inset-x-0 top-24 mx-auto h-px max-w-5xl bg-gradient-to-r from-transparent via-cyan-100/30 to-transparent" />
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <SectionBadge>{content.timeline.badge}</SectionBadge>
            <h2 className="mt-5 font-heading text-4xl italic leading-[0.9] tracking-tight text-white md:text-5xl lg:text-6xl">
              {content.timeline.title}
            </h2>
            <p className="mt-5 max-w-md font-body text-sm font-light leading-relaxed text-white/55 md:text-base">
              {content.timeline.description}
            </p>
          </div>

          <div className="relative">
            <div className="absolute bottom-8 left-6 top-8 w-px bg-gradient-to-b from-white/0 via-white/20 to-white/0 md:left-1/2" />
            <div className="space-y-5">
              {content.timeline.items.map((item, index) => (
                <FadeIn
                  key={`${item.year}-${item.title}`}
                  className={`relative md:w-[calc(50%-18px)] ${index % 2 === 0 ? "md:mr-auto" : "md:ml-auto"}`}
                >
                  <article className="timeline-card liquid-glass rounded-2xl p-6">
                    <div className="mb-6 flex items-center justify-between gap-4">
                      <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 font-body text-xs text-cyan-100">
                        <GitBranch className="h-3.5 w-3.5" />
                        {item.label}
                      </div>
                      <div className="font-heading text-3xl italic text-white">{item.year}</div>
                    </div>
                    <h3 className="font-body text-xl font-medium leading-tight text-white">{item.title}</h3>
                    <p className="mt-4 font-body text-sm font-light leading-relaxed text-white/58">{item.body}</p>
                  </article>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CtaFooter() {
  return (
    <VideoSection src={ctaVideo} className="px-6 py-32" id="pricing">
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <h2 className="font-heading text-5xl italic leading-[0.85] text-white md:text-6xl lg:text-7xl">{content.finalCta.title}</h2>
        <p className="mx-auto mt-6 max-w-xl font-body text-sm font-light leading-relaxed text-white/60 md:text-base">{content.finalCta.description}</p>
        <div className="mt-9 flex justify-center gap-4">
          <a href="/posts/"><Button className="px-6 py-3">{content.finalCta.primary} <ArrowUpRight className="h-4 w-4" /></Button></a>
          <a href="/projects/"><Button variant="white" className="px-6 py-3">{content.finalCta.secondary}</Button></a>
        </div>
        <footer className="mt-32 flex flex-col gap-5 border-t border-white/10 pt-8 font-body text-xs text-white/40 md:flex-row md:items-center md:justify-between">
          <div>(c) 2026 SongChaeYoung.dev. All rights reserved.</div>
          <div className="flex justify-center gap-6">
            <a href="/privacy/">Privacy</a>
            <a href="/terms/">Terms</a>
            <a href="mailto:0.0yeriel@gmail.com">Contact</a>
          </div>
        </footer>
      </div>
    </VideoSection>
  );
}

function BlogIndex() {
  const entries = [...siteData.posts, ...siteData.projects].sort((a, b) => (b.date || "").localeCompare(a.date || "")).slice(0, 6);
  const latest = entries[0];
  return (
    <section id="recent-posts" className="bg-black px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <FadeIn className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionBadge># recent posts</SectionBadge>
            <h2 className="mt-5 font-heading text-4xl italic leading-[0.9] tracking-tight text-white md:text-5xl lg:text-6xl">최신 글</h2>
          </div>
          <a href="/posts/" className="font-body text-sm text-white/60 transition hover:text-white">모든 글 보기</a>
        </FadeIn>
        <FadeIn delay={0.08} className="mt-8 flex flex-wrap gap-2">
          {["All", "Project", "Dev Log", "Architecture"].map((tab) => (
            <button key={tab} className="rounded-full px-4 py-2 font-body text-sm text-white/75 liquid-glass" type="button">{tab}</button>
          ))}
        </FadeIn>
        {latest ? (
          <FadeIn delay={0.14} className="mt-8">
            <a href={latest.url} className="block rounded-2xl p-8 transition hover:-translate-y-1 liquid-glass">
            <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
              <div className="max-w-2xl">
                <div className="font-body text-xs uppercase tracking-[0.18em] text-cyan-100/70">LATEST · {latest.section}</div>
                <h3 className="mt-5 font-body text-2xl font-medium text-white md:text-3xl">{latest.title}</h3>
                <p className="mt-4 font-body text-sm font-light leading-relaxed text-white/60 md:text-base">{latest.summary}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {(latest.tags || []).slice(0, 3).map((tag) => (
                    <span key={tag} className="rounded-full bg-white/10 px-3 py-1 font-body text-xs text-white/65">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="font-body text-sm text-white/45">{latest.dateLabel}<span className="ml-5 text-xl text-white">→</span></div>
            </div>
            </a>
          </FadeIn>
        ) : null}
        <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {entries.slice(1).map((entry, index) => (
            <FadeIn key={entry.url} delay={0.2 + (index * 0.06)} className="h-full">
              <a href={entry.url} className="block h-full rounded-2xl p-6 transition hover:-translate-y-1 liquid-glass">
                <div className="font-body text-xs uppercase tracking-[0.18em] text-cyan-100/70">{entry.section}</div>
                <h3 className="mt-5 font-body text-xl font-medium text-white">{entry.title}</h3>
                <p className="mt-3 line-clamp-3 font-body text-sm font-light leading-relaxed text-white/55">{entry.summary}</p>
                <div className="mt-6 font-body text-xs text-white/40">{entry.dateLabel}</div>
              </a>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function ScrollToTopControl() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function syncScrollState() {
      const scrollTop = window.scrollY || window.pageYOffset || 0;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress = scrollable > 0 ? Math.min(scrollTop / scrollable, 1) : 0;
      setVisible(scrollTop > 520);
      setProgress(nextProgress);
    }

    syncScrollState();
    window.addEventListener("scroll", syncScrollState, { passive: true });
    window.addEventListener("resize", syncScrollState);
    return () => {
      window.removeEventListener("scroll", syncScrollState);
      window.removeEventListener("resize", syncScrollState);
    };
  }, []);

  return (
    <motion.button
      type="button"
      className={`top-control ${visible ? "top-control-visible" : ""}`}
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      style={{ "--top-progress": progress }}
      initial={false}
      animate={{
        opacity: visible ? 1 : 0,
        y: visible ? 0 : 20,
        scale: visible ? 1 : 0.98,
      }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="top-control-progress" aria-hidden="true" />
      <span className="top-control-core">
        <span className="top-control-core-grid" aria-hidden="true" />
        <ArrowUp className="h-4 w-4" />
      </span>
    </motion.button>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <TerminalWindow />
      <ScrollToTopControl />
      <Hero />
      <StartSection />
      <FeaturesChess />
      <FeaturesGrid />
      <Stats />
      <CareerTimeline />
      <Testimonials />
      <BlogIndex />
      <CtaFooter />
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
