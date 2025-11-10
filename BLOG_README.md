# Blog & Project Details Setup

This portfolio now includes a fully functional MDX-based blog system and project detail pages!

## 📝 Features

### Blog System

- ✅ MDX support for writing blog posts with React components
- ✅ Automatic syntax highlighting
- ✅ Frontmatter support (title, date, excerpt, tags, author, readTime)
- ✅ Auto-styled markdown (no manual styling needed)
- ✅ Responsive design
- ✅ Tag system
- ✅ Static generation for optimal performance

### Project Detail Pages

- ✅ Dynamic routes for each project
- ✅ Auto-generated from constants.ts
- ✅ Tech stack display
- ✅ Feature breakdown
- ✅ Links to repository and live demo
- ✅ Back navigation

## 🚀 Quick Start

### Running the Development Server

```bash
# For MDX support (recommended)
npm run dev

# With Turbopack (faster, but MDX may have issues)
npm run dev:turbo
```

Visit:

- **Homepage**: http://localhost:3000
- **Blog**: http://localhost:3000/blog
- **Projects**: Click any project card, or visit `/projects/[slug]`

### Building for Production

```bash
npm run build
npm start
```

## ✍️ Writing Blog Posts

### 1. Create a New MDX File

Create a new file in `content/blog/` with the `.mdx` extension:

```bash
content/blog/my-awesome-post.mdx
```

### 2. Add Frontmatter

Start your post with frontmatter:

```mdx
---
title: "Your Amazing Blog Post Title"
date: "2024-01-20"
excerpt: "A short description that appears in the blog list"
tags: ["React", "Next.js", "TypeScript"]
author: "Your Name"
readTime: "5 min read"
---
```

### 3. Write Your Content

Use standard Markdown with optional React components:

```mdx
# Main Heading

Your content here with **bold** and _italic_ text.

## Subheading

- List item 1
- List item 2

### Code Example

\`\`\`typescript
const greeting: string = 'Hello, World!';
console.log(greeting);
\`\`\`

You can also use inline `code` like this.

> This is a blockquote for important notes.

[Link to external resource](https://example.com)
```

### 4. Auto-Generated Elements

- **URL**: Posts are accessible at `/blog/filename-without-extension`
- **Sorting**: Posts are automatically sorted by date (newest first)
- **Styling**: All markdown elements are pre-styled to match your design system

## 🎨 Styling

All markdown elements use your existing CSS variables:

- `--color-primary`: Primary brand color
- `--color-text`: Main text color
- `--color-text-secondary`: Secondary text
- `--color-background`: Background color
- `--color-surface`: Card backgrounds
- `--color-border`: Border colors
- `--color-accent`: Accent color

## 📁 Project Structure

```
my-portfolio-website/
├── content/
│   └── blog/                          # MDX blog posts go here
│       ├── getting-started-nextjs-15.mdx
│       └── oklch-tailwind-colors.mdx
├── src/
│   ├── app/
│   │   ├── blog/
│   │   │   ├── page.tsx              # Blog listing page
│   │   │   └── [slug]/
│   │   │       └── page.tsx          # Individual blog post
│   │   ├── projects/
│   │   │   └── [slug]/
│   │   │       └── page.tsx          # Project detail pages
│   │   └── components/
│   │       └── Projects.tsx          # Updated with detail links
│   └── lib/
│       └── blog.ts                   # Blog utility functions
├── mdx-components.tsx                # MDX component styling
└── constants.ts                      # Project data
```

## 🔧 Configuration

### MDX Configuration (`next.config.ts`)

```typescript
import createMDX from "@next/mdx";

const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  experimental: {
    mdxRs: false,
  },
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
```

### Adding Navigation

The blog link is already added to the main navigation in `constants.ts`:

```typescript
export const NAV_LINKS = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Blog", href: "/blog" }, // ← Blog link
  { name: "Contact", href: "#contact" },
];
```

## 📝 Adding New Projects

Projects are automatically generated from `constants.ts`. To add a new project with a detail page:

```typescript
export const PROJECTS_DATA: Project[] = [
  {
    title: "Your New Project",
    description: "Detailed description of your project...",
    tags: ["React", "Node.js", "MongoDB"],
    repoUrl: "https://github.com/username/repo",
    demoUrl: "https://your-demo.com", // Optional
  },
  // ...other projects
];
```

The detail page will be automatically available at:
`/projects/your-new-project`

## 🎯 Tips

1. **Image URLs**: Use absolute URLs or place images in `public/` folder
2. **Code Highlighting**: Code blocks are automatically styled
3. **Responsive**: All layouts are mobile-friendly
4. **SEO**: Metadata is auto-generated from frontmatter
5. **Fast**: Static generation ensures quick page loads

## 🐛 Troubleshooting

### MDX not working with Turbopack

Use the standard dev command instead:

```bash
npm run dev  # Uses Webpack with full MDX support
```

### Build errors

Make sure all frontmatter is valid YAML and all required fields are present.

### Styling not applied

Check that your CSS variables are defined in `globals.css`.

## 📚 Resources

- [MDX Documentation](https://mdxjs.com/)
- [Next.js MDX Guide](https://nextjs.org/docs/app/building-your-application/configuring/mdx)
- [Markdown Guide](https://www.markdownguide.org/)

---

Happy blogging! 🎉
