import App from "@/App";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        path: "/",
        async lazy() { const { default: Component } = await import("@/pages/HomePage"); return { Component }; },
        index: true
      },
      {
        path: "/about",
        async lazy() { const { default: Component } = await import("@/pages/About"); return { Component }; },
      },
      {
        path: "/contact",
        async lazy() { const { default: Component } = await import("@/pages/ContactPage"); return { Component }; },
      },
      // Legal
      {
        path: "legal/privacy",
        async lazy() { const { default: Component } = await import("@/pages/Legal/PrivacyPolicy"); return { Component }; },
      },
      {
        path: "legal/terms",
        async lazy() { const { default: Component } = await import("@/pages/Legal/TermsOfService"); return { Component }; },
      },
      // News
      {
        path: "news",
        async lazy() { const { default: Component } = await import("@/pages/News/NewsFeed"); return { Component }; },
      },
      {
        path: "news/:id",
        async lazy() { const { default: Component } = await import("@/pages/News/ArticlePage"); return { Component }; },
      },
    ],
  }
])