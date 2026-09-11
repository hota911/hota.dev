"use client"

import { useEffect, useRef, useState } from "react"
import { parseThreadHash, type ThreadLinkResult } from "./thread-link"

const EXAMPLE_URL = "https://hota.dev/open-codex/#<thread-id>"

export default function OpenCodexLink() {
  const [threadLink, setThreadLink] = useState<ThreadLinkResult | null>(null)
  const lastOpenedDeepLink = useRef<string | null>(null)

  useEffect(() => {
    function openThreadFromHash() {
      const nextThreadLink = parseThreadHash(window.location.hash)
      setThreadLink(nextThreadLink)

      if (
        nextThreadLink.status === "valid" &&
        nextThreadLink.deepLink !== lastOpenedDeepLink.current
      ) {
        lastOpenedDeepLink.current = nextThreadLink.deepLink
        window.location.href = nextThreadLink.deepLink
      }
    }

    openThreadFromHash()
    window.addEventListener("hashchange", openThreadFromHash)

    return () => window.removeEventListener("hashchange", openThreadFromHash)
  }, [])

  return (
    <main className="prose">
      <h2>Open Codex</h2>
      {threadLink === null && <p>Reading the Codex task link…</p>}
      {threadLink?.status === "valid" && (
        <>
          <p>Opening this Codex task…</p>
          <a href={threadLink.deepLink}>Open in Codex</a>
        </>
      )}
      {threadLink?.status === "missing" && (
        <>
          <p>Add a thread ID after #.</p>
          <code>{EXAMPLE_URL}</code>
        </>
      )}
      {threadLink?.status === "invalid" && (
        <>
          <p>This Codex thread link is invalid.</p>
          <code>{EXAMPLE_URL}</code>
        </>
      )}
    </main>
  )
}
