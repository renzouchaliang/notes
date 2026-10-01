---
title: "把想法写下来：一份个人出版指南"
slug: "a-place-for-notes"
date: "2026-10-02"
description: "从一页 Markdown 开始，让笔记、研究与长期思考拥有自己的位置。"
category: "Notes / 笔记"
tags: ["Writing", "Markdown", "开始"]
lang: "zh-CN"
---
这是一篇示例文章，也是这个小站的起点。这里可以放一段观察、一份完整报告，或一组仍在生长的研究材料。内容以 Markdown 保存，发布后成为简洁、可分享的网页。

This is a sample publication. Replace it with your own writing when you are ready.

## 给文字一个稳定的地址

文章的地址由 `slug` 决定。这篇文章始终位于 `/articles/a-place-for-notes/`，即使标题、文件名或正文更新，链接也保持不变。

> 写作不必一次完成。一个稳定的地址，让想法可以持续生长。

## 从 Markdown 到网页

![Markdown 文章经过 Astro 构建后成为网页的流程图](/images/publishing-flow.svg)

每篇文章的开头包含标题、日期、摘要、分类和标签。正文支持 **粗体**、*强调*、列表与[普通链接](https://www.markdownguide.org/)。

### 简单的发布流程

1. 在 `src/content/articles/` 新建 `.md` 文件。
2. 填写文章信息，选择一个永久 slug。
3. 本地预览并运行构建。
4. 提交到 Git，让 Cloudflare Pages 发布更新。

```yaml
title: "我的第一篇文章"
slug: "my-first-article"
date: "2026-10-02"
description: "用一句话介绍这篇文章。"
category: "笔记"
tags: ["写作"]
lang: "zh-CN"
```

## 选择适合内容的形式

| 内容 | 建议组织方式 | 适合的材料 |
| --- | --- | --- |
| 笔记 | 一个问题，一组观察 | 日常记录与灵感 |
| 报告 | 背景、发现、结论 | 表格、代码和图像 |
| 研究 | 问题、方法、参考资料 | 来源链接与引用 |

宽表格和代码块可以横向滚动，图片会适应屏幕宽度。中英文内容都采用宽松行距与清晰的层级，便于在手机上阅读。

## 引用与参考资料

用 Markdown 链接标注来源，也可以使用文末参考列表与脚注。重要结论应当能追溯到原始材料。[^source]

[^source]: 本文展示的是发布格式，不包含研究结论。关于 Markdown，可阅读 [Markdown Guide](https://www.markdownguide.org/basic-syntax/)。

1. [Astro documentation](https://docs.astro.build/)
2. [Cloudflare Pages documentation](https://developers.cloudflare.com/pages/)
