"use client"

import { useEffect } from "react"

// Custom schemes are unreliable as HTTP Location redirects, so navigate from
// the browser instead.
export default function OpenOnLoad({ href }: { href: string }) {
  useEffect(() => {
    window.location.href = href
  }, [href])

  return null
}
