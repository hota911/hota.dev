"use client"

import { useEffect, useRef, useState } from "react"
import { parseSessionHash, type SessionLinkResult } from "./session-link"

const EXAMPLE_URL = "https://hota.dev/open-claude/#<session-id>"

export default function OpenClaudeLink() {
  const [sessionLink, setSessionLink] = useState<SessionLinkResult | null>(null)
  const lastOpenedDeepLink = useRef<string | null>(null)

  useEffect(() => {
    function openSessionFromHash() {
      const nextSessionLink = parseSessionHash(window.location.hash)
      setSessionLink(nextSessionLink)

      if (
        nextSessionLink.status === "valid" &&
        nextSessionLink.deepLink !== lastOpenedDeepLink.current
      ) {
        lastOpenedDeepLink.current = nextSessionLink.deepLink
        window.location.href = nextSessionLink.deepLink
      }
    }

    openSessionFromHash()
    window.addEventListener("hashchange", openSessionFromHash)

    return () => window.removeEventListener("hashchange", openSessionFromHash)
  }, [])

  return (
    <main className="prose">
      <h2>Open Claude Code</h2>
      {sessionLink === null && <p>Reading the Claude Code session link…</p>}
      {sessionLink?.status === "valid" && (
        <>
          <p>Opening this Claude Code session…</p>
          <a href={sessionLink.deepLink}>Open in Claude Code</a>
        </>
      )}
      {sessionLink?.status === "missing" && (
        <>
          <p>Add a session ID after #.</p>
          <code>{EXAMPLE_URL}</code>
        </>
      )}
      {sessionLink?.status === "invalid" && (
        <>
          <p>This Claude Code session link is invalid.</p>
          <code>{EXAMPLE_URL}</code>
        </>
      )}
    </main>
  )
}
