import type { Metadata } from "next"
import { notFound } from "next/navigation"
import OpenOnLoad from "./open-on-load"

export const metadata: Metadata = {
  title: "Open Claude Code session | hota.dev",
  description: "Open a Claude Code desktop session from an HTTPS link.",
  robots: {
    index: false,
    follow: false,
  },
}

// Same pattern the Claude desktop app uses to validate local session IDs.
const SESSION_ID_PATTERN = /^local_[A-Za-z0-9-]{1,64}$/

export default async function OpenClaudeSessionPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  if (!SESSION_ID_PATTERN.test(id)) {
    notFound()
  }
  const deepLink = `claude://claude.ai/epitaxy/${id}`

  return (
    <main className="prose">
      <OpenOnLoad href={deepLink} />
      <h2>Claude Code のセッションを開く</h2>
      <p>
        セッション: <code>{id}</code>
      </p>
      <p>
        <a href={deepLink}>Claude で開く</a>
      </p>
      <p>
        セッションがあるマシンの Claude
        デスクトップアプリで開きます。自動で開かない場合は上のリンクを押してください。
      </p>
    </main>
  )
}
