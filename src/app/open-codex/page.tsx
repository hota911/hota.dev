import type { Metadata } from "next"
import OpenCodexLink from "./open-codex-link"

export const metadata: Metadata = {
  title: "Open Codex | hota.dev",
  description: "Open a local Codex task from an HTTPS link.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function OpenCodexPage() {
  return <OpenCodexLink />
}
