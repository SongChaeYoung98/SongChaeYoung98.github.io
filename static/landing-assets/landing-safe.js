(function () {
  const root = document.getElementById("root");
  if (!root) return;

  const data = window.__BLOG_DATA__ || { posts: [], projects: [], commits: [] };
  const entries = [...(data.posts || []), ...(data.projects || [])]
    .sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")));
  const latest = entries[0];

  function esc(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  }

  function tagsHtml(tags) {
    return (Array.isArray(tags) ? tags : [])
      .slice(0, 3)
      .map((tag) => `<span class="rounded-full bg-white/10 px-3 py-1 font-body text-xs text-white/65">${esc(tag)}</span>`)
      .join("");
  }

  root.innerHTML = `
    <div class="min-h-screen bg-black text-white">
      <nav class="fixed left-0 right-0 top-4 z-50 flex items-center justify-between px-8 py-3 lg:px-16">
        <a href="/" class="flex h-12 w-12 items-center justify-center rounded-full liquid-glass-strong" aria-label="Home">
          <span class="font-heading text-3xl italic">S</span>
        </a>
        <div class="hidden items-center rounded-full px-1.5 py-1 liquid-glass md:flex">
          <a href="/" class="px-3 py-2 font-body text-sm font-medium text-foreground/90">Home</a>
          <a href="/posts/" class="px-3 py-2 font-body text-sm font-medium text-foreground/90">Posts</a>
          <a href="/projects/" class="px-3 py-2 font-body text-sm font-medium text-foreground/90">Projects</a>
          <a href="/tags/" class="px-3 py-2 font-body text-sm font-medium text-foreground/90">Tags</a>
          <a href="#recent-posts" class="px-3 py-2 font-body text-sm font-medium text-foreground/90">Archive</a>
        </div>
      </nav>

      <section class="relative min-h-[900px] overflow-hidden bg-black md:min-h-[940px]">
        <div class="rain-scene" aria-hidden="true"></div>
        <div class="absolute inset-0 z-0 bg-black/5"></div>
        <div class="pointer-events-none absolute bottom-0 z-[1] h-[300px] w-full bg-gradient-to-b from-transparent to-black"></div>
        <div class="relative z-10 mx-auto flex min-h-[900px] max-w-6xl flex-col items-center px-6 pt-[130px] text-center md:min-h-[940px]">
          <div class="mb-8 inline-flex rounded-full px-1 py-1 liquid-glass">
            <span class="rounded-full bg-white px-3 py-1 font-body text-xs font-semibold text-black">Blog</span>
            <span class="px-3 py-1 font-body text-xs text-white/80">engineering notes online</span>
          </div>
          <h1 class="max-w-2xl font-heading text-6xl italic leading-[0.8] text-foreground md:text-7xl lg:text-[5.5rem]">
            SongChaeYoung.dev
          </h1>
          <p class="mt-8 max-w-lg font-body text-sm font-light leading-tight text-white md:text-base">
            AI-era engineering notes, product experiments, and production-grade development logs.
          </p>
          <div class="hero-cta-row mt-8 flex items-center justify-center gap-4">
            <a href="/posts/" class="inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 font-body text-sm font-medium text-black transition hover:bg-white/90">Posts</a>
            <a href="/projects/" class="inline-flex items-center justify-center rounded-full px-5 py-2.5 font-body text-sm font-medium text-white liquid-glass">Projects</a>
            <span class="terminal-slot">
              <span id="terminal-host"></span>
            </span>
          </div>
          <div class="mt-10 grid w-full max-w-xl grid-cols-3 overflow-hidden rounded-2xl liquid-glass">
            <div class="border-r border-white/10 px-5 py-4">
              <div class="font-heading text-3xl italic text-white">${String((data.posts || []).length).padStart(2, "0")}</div>
              <div class="mt-1 font-body text-xs uppercase tracking-[0.16em] text-white/45">Posts</div>
            </div>
            <div class="border-r border-white/10 px-5 py-4">
              <div class="font-heading text-3xl italic text-white">${String((data.projects || []).length).padStart(2, "0")}</div>
              <div class="mt-1 font-body text-xs uppercase tracking-[0.16em] text-white/45">Projects</div>
            </div>
            <div class="px-5 py-4">
              <div class="font-heading text-3xl italic text-white">${esc((data.commits || [])[0]?.hash || "--")}</div>
              <div class="mt-1 font-body text-xs uppercase tracking-[0.16em] text-white/45">Commit</div>
            </div>
          </div>
          <div class="mt-auto pb-8 pt-16">
            <div class="mx-auto mb-8 w-fit rounded-full px-3.5 py-1 font-body text-xs font-medium text-white liquid-glass">currently shipping</div>
            <div class="flex flex-wrap justify-center gap-12 md:gap-16">
              ${["Backend", "System Design", "Troubleshooting", "Projects", "Retrospective"].map((item) => `<span class="font-heading text-2xl italic text-white md:text-3xl">${item}</span>`).join("")}
            </div>
          </div>
        </div>
      </section>

      <section id="recent-posts" class="bg-black px-6 py-24">
        <div class="mx-auto max-w-6xl">
          <div class="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <div class="w-fit rounded-full px-3.5 py-1 font-body text-xs font-medium text-white liquid-glass"># recent posts</div>
              <h2 class="mt-5 font-heading text-4xl italic leading-[0.9] tracking-tight text-white md:text-5xl lg:text-6xl">Latest Notes</h2>
            </div>
            <a href="/posts/" class="font-body text-sm text-white/60 transition hover:text-white">View all posts</a>
          </div>
          ${
            latest
              ? `<a href="${esc(latest.url)}" class="mt-8 block rounded-2xl p-8 transition hover:-translate-y-1 liquid-glass">
                  <div class="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
                    <div class="max-w-2xl">
                      <div class="font-body text-xs uppercase tracking-[0.18em] text-cyan-100/70">LATEST - ${esc(latest.section)}</div>
                      <h3 class="mt-5 font-body text-2xl font-medium text-white md:text-3xl">${esc(latest.title)}</h3>
                      <p class="mt-4 font-body text-sm font-light leading-relaxed text-white/60 md:text-base">${esc(latest.summary)}</p>
                      <div class="mt-6 flex flex-wrap gap-2">${tagsHtml(latest.tags)}</div>
                    </div>
                    <div class="font-body text-sm text-white/45">${esc(latest.dateLabel)}<span class="ml-5 text-xl text-white">-&gt;</span></div>
                  </div>
                </a>`
              : `<div class="mt-8 rounded-2xl p-8 liquid-glass">No entries yet.</div>`
          }
          <div class="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            ${entries.slice(1, 7).map((entry) => `
              <a href="${esc(entry.url)}" class="rounded-2xl p-6 transition hover:-translate-y-1 liquid-glass">
                <div class="font-body text-xs uppercase tracking-[0.18em] text-cyan-100/70">${esc(entry.section)}</div>
                <h3 class="mt-5 font-body text-xl font-medium text-white">${esc(entry.title)}</h3>
                <p class="mt-3 line-clamp-3 font-body text-sm font-light leading-relaxed text-white/55">${esc(entry.summary)}</p>
                <div class="mt-6 font-body text-xs text-white/40">${esc(entry.dateLabel)}</div>
              </a>
            `).join("")}
          </div>
        </div>
      </section>
    </div>
  `;

  const terminal = document.createElement("div");
  terminal.className = "terminal-hologram liquid-glass";
  terminal.innerHTML = `
    <button class="terminal-bar" type="button" aria-label="Open deploy log terminal">
      <span class="terminal-dots" aria-hidden="true">
        <span class="dot bg-[#ff5f57]"></span>
        <span class="dot bg-[#febc2e]"></span>
        <span class="dot bg-[#28c840]"></span>
      </span>
      <span class="terminal-mini-icon" aria-hidden="true">$</span>
      <span class="terminal-title">
        <span class="terminal-title-closed">log.sh</span>
        <span class="terminal-title-open">deploy log</span>
      </span>
      <span class="terminal-mini-meta" aria-hidden="true">recent</span>
    </button>
    <div class="terminal-body space-y-3 p-4 font-mono text-[11px] leading-relaxed text-white/70">
      <div><span class="text-cyan-200">~/SongChaeYoung.dev</span> <span class="text-white">$ recent --all</span></div>
      <div class="space-y-1">
        ${entries.slice(0, 5).map((entry) => `
          <a class="block rounded px-2 py-1 text-white/65 transition hover:bg-white/10 hover:text-white" href="${esc(entry.url)}">
            <span class="mr-2 rounded bg-white/10 px-1.5 py-0.5 text-[10px] uppercase text-cyan-100">${esc(entry.section)}</span>${esc(entry.title)}
          </a>
        `).join("") || '<span class="block px-2 text-white/45">No Markdown entries yet.</span>'}
      </div>
      <div><span class="text-cyan-200">~/SongChaeYoung.dev</span> <span class="text-white">$</span> <span class="terminal-cursor"></span></div>
    </div>
  `;

  const host = document.getElementById("terminal-host");
  const button = terminal.querySelector("button");
  let open = false;
  let pos = { x: 0, y: 0 };
  let drag = null;
  let didDrag = false;

  function renderTerminal() {
    terminal.classList.toggle("terminal-open", open);
    terminal.style.transform = open ? `translate3d(${pos.x}px, calc(${pos.y}px - 50%), 0)` : "";
    if (open && terminal.parentNode !== document.body) {
      document.body.appendChild(terminal);
    }
    if (!open && host && terminal.parentNode !== host) {
      host.appendChild(terminal);
    }
  }

  button.addEventListener("pointerdown", function (event) {
    if (!open) return;
    drag = { x: event.clientX - pos.x, y: event.clientY - pos.y, startX: event.clientX, startY: event.clientY };
    didDrag = false;
    window.addEventListener("pointermove", moveDrag);
    window.addEventListener("pointerup", stopDrag);
  });

  button.addEventListener("click", function () {
    if (didDrag) return;
    open = !open;
    if (!open) pos = { x: 0, y: 0 };
    renderTerminal();
  });

  document.addEventListener("pointerdown", function (event) {
    if (open && !terminal.contains(event.target)) {
      open = false;
      pos = { x: 0, y: 0 };
      renderTerminal();
    }
  });

  function moveDrag(event) {
    if (!drag) return;
    if (Math.abs(event.clientX - drag.startX) > 4 || Math.abs(event.clientY - drag.startY) > 4) didDrag = true;
    pos = { x: event.clientX - drag.x, y: event.clientY - drag.y };
    renderTerminal();
  }

  function stopDrag() {
    drag = null;
    window.removeEventListener("pointermove", moveDrag);
    window.removeEventListener("pointerup", stopDrag);
  }

  renderTerminal();
})();
