---
title: "Basic Usage of Next.js"
date: "2024-03-27"
tags: ["nextjs", "react", "frontend/framework", "frontend/nextjs"]
excerpt: "Learn about the basic concepts and usage of Next.js."
---

# Introduction to Next.js and Its Basic Usage

**Next.js** is a React-based framework that provides features for modern web application development, such as SSR (Server-Side Rendering) and SSG (Static Site Generation).

## Main Features of Next.js

Next.js has the following features:

1. **File System Based Routing**: Routes are automatically configured based on the file structure in the `pages` directory.
2. **Server-Side Rendering (SSR)**: Improves initial load performance by rendering pages on the server side.
3. **Static Site Generation (SSG)**: Generates pages at build time, enabling fast page loading and excellent SEO.
4. **API Routes**: Easily create serverless functions.
5. **Built-in CSS Support**: Supports CSS Modules, Sass, Styled JSX, and more.

## Installation

To start a Next.js project, run the following commands:

```bash
npx create-next-app@latest my-next-app
cd my-next-app
npm run dev
```

This will start your application at `http://localhost:3000`.

## Creating Basic Pages

In Next.js, you can add new pages simply by creating files in the `pages` directory. For example:

```jsx:pages/about.js
export default function About() {
  return (
    <div>
      <h1>About Page</h1>
      <p>This is the about page</p>
    </div>
  );
}
```

By creating this file, the page becomes accessible at the URL `/about`.

## Data Fetching

Next.js offers several methods for fetching data:

### getStaticProps (Static Generation)

```jsx
export async function getStaticProps() {
  const res = await fetch('https://api.example.com/data');
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}
```

### getServerSideProps (Server-Side Rendering)

```jsx
export async function getServerSideProps() {
  const res = await fetch('https://api.example.com/data');
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}
```

## Summary

Next.js provides many features to simplify React application development and improve performance. By understanding the basic concepts introduced in this article, you can start developing efficient web applications. 