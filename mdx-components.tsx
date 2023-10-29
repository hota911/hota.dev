import type { MDXComponents } from "mdx/types"

// This file is required to use @next/mdx in the `app` directory.
export function useMDXComponents(components: MDXComponents) {
  return {
    ...components,
  }
}
