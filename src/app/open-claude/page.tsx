import type { Metadata } from "next"
import OpenClaudeLink from "./open-claude-link"

export const metadata: Metadata = {
  title: "Open Claude Code | hota.dev",
  description: "Open a local Claude Code session from an HTTPS link.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function OpenClaudePage() {
  return <OpenClaudeLink />
}
