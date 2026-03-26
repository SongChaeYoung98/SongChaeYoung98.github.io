<%*
// ─────────────────────────────────────────
// SongChaeYoung.dev — Obsidian Templater
// 새 포스트 생성 마법사
// ─────────────────────────────────────────

const postTypes = [
  "project",
  "devlog",
  "architecture",
  "til",
  "troubleshooting",
  "retrospective",
  "reading",
  "mindmap",
];

const typeLabels = {
  project:       "🗂  Project       — 전체 프로젝트 기록",
  devlog:        "📝  Dev Log       — 커밋 단위 개발 로그",
  architecture:  "⚙️   Architecture  — 시스템 설계 & 마인드맵",
  til:           "💡  TIL           — 오늘 배운 것",
  troubleshooting:"🚨  Troubleshooting — 버그 & 삽질 기록",
  retrospective: "📅  Retrospective  — 주간/월간 회고",
  reading:       "📗  Reading        — 독서 노트",
  mindmap:       "🗺   Mindmap        — Mermaid 다이어그램",
};

const type = await tp.system.suggester(
  Object.values(typeLabels),
  postTypes,
  false,
  "포스트 타입 선택"
);

if (!type) return;

// ── 공통 입력 ──
const title = await tp.system.prompt("포스트 제목");
if (!title) return;
const today = tp.date.now("YYYY-MM-DD");
const now   = tp.date.now("YYYY-MM-DDTHH:mm:ssZ");

// ── 타입별 추가 입력 ──
let extraFrontmatter = "";
let templateFile     = null;

if (type === "devlog") {
  const issueNum  = await tp.system.prompt("GitHub Issue 번호 (없으면 엔터)") || "";
  const projectName = await tp.system.prompt("시리즈/프로젝트명 (없으면 엔터)") || "";
  extraFrontmatter = `series: "${projectName}"`;
  templateFile = tp.file.find_tfile("templates/devlog-post");

} else if (type === "project") {
  templateFile = tp.file.find_tfile("templates/project-post");

} else if (type === "architecture" || type === "mindmap") {
  templateFile = tp.file.find_tfile("templates/architecture-post");

} else if (type === "til") {
  templateFile = tp.file.find_tfile("templates/til-post");

} else if (type === "troubleshooting") {
  templateFile = tp.file.find_tfile("templates/troubleshooting-post");

} else if (type === "retrospective") {
  const month = tp.date.now("YYYY년 MM월");
  extraFrontmatter = ``;
  templateFile = tp.file.find_tfile("templates/retrospective-post");

} else if (type === "reading") {
  templateFile = tp.file.find_tfile("templates/reading-post");
}

// ── 파일명 생성 ──
const slug = title
  .toLowerCase()
  .replace(/\s+/g, '-')
  .replace(/[^a-z0-9\-가-힣]/g, '');
const fileName = `${today}-${type}-${slug}`;

// ── content/posts/ 아래로 이동 ──
await tp.file.move(`content/posts/${fileName}`);
-%>
---
title: "<% title %>"
date: <% now %>
lastmod: <% now %>
draft: true
description: ""
categories: ["<% type %>"]
tags: []
showToc: true
tocopen: false
<% extraFrontmatter %>
---

<!-- 여기에 내용 작성 -->
