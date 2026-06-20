import { useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "motion/react";

// ─── Magnetic Button ─────────────────────────────────────────────────
function MagneticBtn({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const tx = useTransform(x, (v) => v * 0.3);
  const ty = useTransform(y, (v) => v * 0.3);

  const move = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set(e.clientX - (r.left + r.width / 2));
    y.set(e.clientY - (r.top + r.height / 2));
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={move}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ x: tx, y: ty }}
      className="inline-flex items-center gap-2 px-5 py-2.5 text-base font-medium text-foreground/80 border border-border rounded-full hover:border-accent/40 hover:text-accent hover:bg-accent/8 hover:shadow-[0_0_20px_rgba(249,115,22,0.12)] transition-all duration-200"
    >
      {icon}
      {label}
    </motion.a>
  );
}

// ─── Floating Shape ──────────────────────────────────────────────────
function FloatShape({ className, delay = 0 }: { className: string; delay?: number }) {
  return (
    <motion.div
      className={`absolute rounded-full pointer-events-none ${className}`}
      style={{ background: "rgba(249,115,22,0.08)" }}
      animate={{ y: [0, -16, 0, 10, 0], x: [0, 10, -6, -12, 0] }}
      transition={{ duration: 10 + delay, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

// ─── Skill Tag ───────────────────────────────────────────────────────
function SkillTag({ name, index }: { name: string; index: number }) {
  const [h, setH] = useState(false);
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4 + index * 0.03, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      className={`relative px-4 py-2 text-sm font-medium rounded-lg border cursor-default transition-all duration-200 ${
        h
          ? "border-accent/50 bg-accent/10 text-accent shadow-[0_0_18px_rgba(249,115,22,0.2)] scale-105"
          : "border-border text-foreground/80 bg-white"
      }`}
    >
      {name}
    </motion.span>
  );
}

// ─── App ─────────────────────────────────────────────────────────────
export default function App() {
  const cv = {
    name: "Trần Thế Quang",
    title: "EdTech Student",
    uni: "Hanoi University of Science and Technology, Year 2",
    philosophy: '"AI sẽ là bước tiến lớn của con người."',
    email: "theanhchinishin@gmail.com",
    github: "https://github.com/theanhchinishin-cmyk",
    facebook: "https://facebook.com/thqung.ea",
    skills: [
      "Node.js", "CSS3", "JavaScript", "Figma", "Embedded JavaScript", "HTML5",
      "UI/UX Design", "Git & GitHub", "Responsive Design", "Problem Solving",
    ],
    interests: ["Web Design", "AI / LLMs", "EdTech"],
    gpbl: {
      tag: "gPBL 2026 Candidate",
      subtitle: "IoT in the Era of LLMs",
      period: "Aug 26 – Sep 5, 2026",
      desc: "Selected for an intensive cross-disciplinary program combining IoT hardware with Large Language Models to build educational tools.",
    },
    achievements: [
      "🥈 2nd Prize — G-BOARD JAM 2026 & TALKSHOW: LEVEL UP YOUR CAREER IN MOBILE GAME",
      "🥉 3rd Prize — City-Level Pascal Competition (Grade 6, 2018)",
      "🥉 3rd Prize — City-Level Mathematics Competition (Grade 9, 2021)",
      "IELTS 6.0 — English Proficiency (2023)",
      "3.75 GPA (2025.1)",
    ],
    strengths: [
      "🤝 Strong Teamwork — Collaborate effectively and listen before building",
      "💻 Solid IT Skills — Proficient in frontend development, tools, and workflows",
      "❤️ Always Ready to Help — Supportive mindset, patient with others, eager to assist",
    ],
    projects: [
      {
        num: "01", title: "Document Sharing Platform",
        tech: "Full-stack · Deployed on Render",
        url: "https://final1-7872.onrender.com/",
        items: [
          "Features optimized categorization for technical subjects like Calculus, Physics, and Programming",
          "Enables seamless user interaction through secure document uploads and intuitive search tools",
          "Provides a centralized platform for students to share and access academic resources",
        ],
      },
      {
        num: "02", title: "Interactive Pet Care Educational Web Game",
        tech: "JavaScript · CSS3 · Embedded JavaScript",
        url: "https://animal-wh9h.onrender.com/",
        items: [
          "Developed 6+ interactive games teaching proper animal interaction for elementary students",
          "Implemented pet collection feature + scenario-based decision-making games",
          "Pet collection system where students add their own pets",
        ],
      },
    ],
  };

  const s = {
    init: { opacity: 0, y: 24 },
    anim: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.1 + i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    }),
  };

  return (
    <div className="relative min-h-[100dvh] bg-background overflow-hidden">
      {/* ── Floating Background ── */}
      <FloatShape className="w-80 h-80 -top-20 -right-20 blur-[90px]" />
      <FloatShape className="w-60 h-60 top-1/3 -left-20 blur-[70px]" delay={1.5} />
      <FloatShape className="w-48 h-48 bottom-40 right-1/4 blur-[60px]" delay={3} />
      <FloatShape className="w-36 h-36 bottom-20 left-1/4 blur-[50px]" delay={2.5} />

      {/* ── Main ── */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8 py-8 sm:py-12 min-h-[100dvh] flex flex-col justify-center">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">

          {/* ═══════════════════════════════ CARD 1 ─── Name / Identity ── 3×2 */}
          <motion.div
            custom={0} variants={s} initial="init" animate="anim"
            className="md:col-span-3 md:row-span-2 p-8 sm:p-10 bg-white border border-border rounded-3xl flex flex-col justify-between relative"
          >
            {/* ── Avatar ── */}
            <div className="absolute top-8 right-8 sm:top-10 sm:right-10">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-accent/30 overflow-hidden bg-surface shadow-[0_0_30px_rgba(249,115,22,0.1)]">
                {/*
                  🖼️ THAY ẢNH CỦA BẠN VÀO ĐÂY:
                  - Export ảnh từ Figma hoặc chụp ảnh profile
                  - Đặt file ảnh vào thư mục `public/`
                  - Sửa đường dẫn dưới đây, ví dụ: src="/my-photo.jpg"
                  - Kích thước khuyên dùng: 200x200px, file PNG hoặc JPG
                */}
                <img
                  src="/avt.jpg"
                  alt="Profile"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Nếu ảnh lỗi hoặc chưa thay, hiện chữ
                    (e.target as HTMLImageElement).style.display = "none";
                    (e.target as HTMLImageElement).parentElement!.classList.add("flex", "items-center", "justify-center");
                    // Thêm chữ fallback (tên viết tắt)
                    const fallback = document.createElement("span");
                    fallback.className = "text-2xl font-bold text-accent";
                    fallback.textContent = cv.name.split(" ").map(n => n[0]).join("");
                    (e.target as HTMLImageElement).parentElement!.appendChild(fallback);
                  }}
                />
              </div>
            </div>

            <div>
              <span className="inline-block px-3 py-1.5 text-xs font-bold tracking-[0.15em] uppercase text-white bg-accent rounded-lg mb-5">
                ✦ Digital CV
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-extrabold tracking-tight text-foreground leading-[1.05] max-w-[75%] sm:max-w-[80%]">
                {cv.name.split(" ").map((p, i, a) =>
                  i === a.length - 1
                    ? <span key={i} className="text-accent"> {p}</span>
                    : <span key={i}> {p}</span>
                )}
              </h1>
              <p className="mt-4 text-xl sm:text-2xl text-foreground/80 font-semibold">{cv.title}</p>
              <p className="mt-2 text-base sm:text-lg text-muted">{cv.uni}</p>
            </div>

            <div className="mt-7">
              <p className="text-base sm:text-lg italic text-foreground/70 border-l-4 border-accent/40 pl-5 leading-relaxed">
                {cv.philosophy}
              </p>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <MagneticBtn
                href={`mailto:${cv.email}`}
                label="Email"
                icon={
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                }
              />
              <MagneticBtn
                href={cv.github} label="GitHub"
                icon={
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
                }
              />
              <MagneticBtn
                href={cv.facebook} label="Facebook"
                icon={
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                }
              />
            </div>
          </motion.div>

          {/* ═══════════════════════════════ CARD 2 ─── Skills ── 3×1 */}
          <motion.div
            custom={1} variants={s} initial="init" animate="anim"
            className="md:col-span-3 p-8 sm:p-10 bg-white border border-border rounded-3xl"
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                <span className="text-accent">⚡</span> Technical Arsenal
              </h2>
              <div className="flex items-center gap-2">
                {cv.interests.map((x) => (
                  <span key={x} className="px-3 py-1 text-sm font-semibold text-accent bg-accent/10 rounded-lg border border-accent/20">
                    {x}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {cv.skills.map((s, i) => (
                <SkillTag key={s} name={s} index={i} />
              ))}
            </div>
          </motion.div>

          {/* ═══════════════════════════════ CARD 3 ─── gPBL Glow ── 3×1 */}
          <motion.div
            custom={2} variants={s} initial="init" animate="anim"
            className="md:col-span-3 p-8 sm:p-10 bg-white border border-accent/30 rounded-3xl glow-card relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-accent/10 rounded-full blur-[80px] -mr-16 -mt-16" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/8 rounded-full blur-[60px] -ml-10 -mb-10" />
            <div className="relative z-10">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="px-3 py-1.5 text-sm font-bold tracking-widest uppercase text-white bg-accent rounded-lg shadow-[0_0_20px_rgba(249,115,22,0.3)]">
                  ★ {cv.gpbl.tag}
                </span>
                <span className="text-base text-muted font-medium">{cv.gpbl.period}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-foreground">
                {cv.gpbl.subtitle}
              </h3>
              <p className="mt-3 text-base sm:text-lg text-foreground/70 leading-relaxed font-medium">
                {cv.gpbl.desc}
              </p>
            </div>
          </motion.div>

          {/* ═══════════════════════════════ CARD ─── Achievements ── 6×1 */}
          <motion.div
            custom={3} variants={s} initial="init" animate="anim"
            className="md:col-span-6 p-8 sm:p-10 bg-gradient-to-br from-accent/[0.03] to-white border border-border rounded-3xl"
          >
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2 mb-5">
              <span className="text-accent">🏆</span> Achievements
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3">
              {cv.achievements.map((a) => (
                <div key={a} className="flex items-start gap-3 text-base text-foreground/75">
                  <span className="text-accent mt-1 shrink-0 text-lg">▹</span>
                  <span>{a}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ═══════════════════════════════ CARD ─── Strengths ── 6×1 */}
          <motion.div
            custom={3.5} variants={s} initial="init" animate="anim"
            className="md:col-span-6 p-8 sm:p-10 bg-white border border-border rounded-3xl"
          >
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2 mb-5">
              <span className="text-accent">💪</span> Strengths
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3">
              {cv.strengths.map((s) => (
                <div key={s} className="flex items-start gap-3 text-base text-foreground/75">
                  <span className="text-accent mt-1 shrink-0 text-lg">▹</span>
                  <span>{s}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ═══════════════════════════════ CARD 4 ─── Project 01 ── 2×1 */}
          <motion.div
            custom={4} variants={s} initial="init" animate="anim"
            className="md:col-span-2 p-8 sm:p-10 bg-white border border-border rounded-3xl flex flex-col"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center text-accent text-lg font-black shrink-0">
                {cv.projects[0].num}
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">{cv.projects[0].title}</h3>
                <p className="text-sm text-muted font-medium">{cv.projects[0].tech}</p>
              </div>
            </div>
            <ul className="space-y-3 flex-1">
              {cv.projects[0].items.map((a, i) => (
                <li key={i} className="text-base text-foreground/70 flex items-start gap-3 leading-relaxed">
                  <span className="text-accent mt-1 shrink-0 text-lg">▹</span>
                  <span>{a}</span>
                </li>
              ))}
            </ul>
            {cv.projects[0].url && (
              <a
                href={cv.projects[0].url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-accent rounded-xl hover:bg-accent-dark hover:shadow-[0_0_20px_rgba(249,115,22,0.25)] transition-all duration-200 active:scale-[0.97] self-start"
              >
                Visit Live Site
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </a>
            )}
          </motion.div>

          {/* ═══════════════════════════════ CARD 5 ─── Project 02 ── 2×1 */}
          <motion.div
            custom={5} variants={s} initial="init" animate="anim"
            className="md:col-span-2 p-8 sm:p-10 bg-white border border-border rounded-3xl flex flex-col"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center text-accent text-lg font-black shrink-0">
                {cv.projects[1].num}
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">{cv.projects[1].title}</h3>
                <p className="text-sm text-muted font-medium">{cv.projects[1].tech}</p>
              </div>
            </div>
            <ul className="space-y-3 flex-1">
              {cv.projects[1].items.map((a, i) => (
                <li key={i} className="text-base text-foreground/70 flex items-start gap-3 leading-relaxed">
                  <span className="text-accent mt-1 shrink-0 text-lg">▹</span>
                  <span>{a}</span>
                </li>
              ))}
            </ul>
            {cv.projects[1].url && (
              <a
                href={cv.projects[1].url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-accent rounded-xl hover:bg-accent-dark hover:shadow-[0_0_20px_rgba(249,115,22,0.25)] transition-all duration-200 active:scale-[0.97] self-start"
              >
                Visit Live Site
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </a>
            )}
          </motion.div>

          {/* ═══════════════════════════════ CARD 6 ─── Open To ── 2×1 */}
          <motion.div
            custom={6} variants={s} initial="init" animate="anim"
            className="md:col-span-2 p-8 sm:p-10 bg-white border border-border rounded-3xl"
          >
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2 mb-5">
              <span className="text-accent">📬</span> Open To
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
              {["Internships", "Hackathons", "Open Source", "Mentorship"].map((x) => (
                <div key={x} className="flex items-center gap-3 text-base text-foreground/70 font-medium">
                  <span className="w-2 h-2 rounded-full bg-accent shrink-0" />
                  <span>{x}</span>
                </div>
              ))}
            </div>
            <div className="pt-4 border-t-2 border-border/60">
              <p className="text-base text-muted font-medium">
                📍 Hanoi, Vietnam · GMT+7 · Reply within 24–48h
              </p>
            </div>
          </motion.div>
        </div>

        {/* ── Footer ── */}
        <p className="mt-8 text-center text-sm text-muted/50 font-medium">
          Built by The Quang
        </p>
      </div>
    </div>
  );
}
