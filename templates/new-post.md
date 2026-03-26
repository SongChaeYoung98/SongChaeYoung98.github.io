<%*
// Obsidian Templater 스크립트
// 설치: Obsidian → Community Plugins → Templater

const postTypes = ["project", "devlog", "architecture"];
const type = await tp.system.suggester(postTypes, postTypes, false, "포스트 타입 선택");

let template;
if (type === "project") {
  template = tp.file.find_tfile("templates/project-post");
} else if (type === "devlog") {
  template = tp.file.find_tfile("templates/devlog-post");
} else {
  template = tp.file.find_tfile("templates/architecture-post");
}

const title = await tp.system.prompt("포스트 제목");
const today = tp.date.now("YYYY-MM-DD");

// 파일명: 날짜-타입-제목-kebab-case
const fileName = `${today}-${type}-${title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-가-힣]/g, '')}`;

// content/posts/ 아래에 생성
await tp.file.move(`content/posts/${fileName}`);
-%>
---
title: "<% title %>"
date: <% today %>
lastmod: <% today %>
draft: true
description: ""
categories: ["<% type %>"]
tags: []
showToc: true
---

<!-- 여기에 내용 작성 -->
