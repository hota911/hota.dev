import type { MDXComponents } from "mdx/types"
import { ReactNode } from "react"

// This file is required to use @next/mdx in the `app` directory.
export function useMDXComponents(components: MDXComponents) {
  return {
    ...components,
    // Apply the `prose` class to all paragraphs.
    wrapper: ({ children }: { children: ReactNode }) => {
      return <main className="prose">{children}</main>
    },
  }
}
