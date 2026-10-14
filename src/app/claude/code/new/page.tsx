import type { Metadata } from "next"
import OpenOnLoad from "./open-on-load"

export const metadata: Metadata = {
  title: "Open Claude Code | hota.dev",
  description: "Open a new Claude Code session from an HTTPS link.",
  robots: {
    index: false,
    follow: false,
  },
}

// Only these query params are forwarded; the scheme and path stay fixed so
// this page cannot be used as an open redirector.
const FORWARDED_PARAMS = ["folder", "q"] as const

export default async function OpenClaudeCodePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const forwarded = new Map<string, string>()
  for (const name of FORWARDED_PARAMS) {
    const value = params[name]
    const first = Array.isArray(value) ? value[0] : value
    if (first !== undefined) {
      forwarded.set(name, first)
    }
  }
  // encodeURIComponent turns spaces into %20; URLSearchParams would use "+",
  // which the desktop app may not decode as a space.
  const query = Array.from(
    forwarded,
    ([name, value]) => `${name}=${encodeURIComponent(value)}`,
  ).join("&")
  const deepLink = `claude://code/new${query ? `?${query}` : ""}`

  return (
    <main className="prose">
      <OpenOnLoad href={deepLink} />
      <h2>Claude Code を開く</h2>
      <p>Claude デスクトップアプリで新しいセッションを開きます。</p>
      <ul>
        <li>
          フォルダ: <code>{forwarded.get("folder") ?? "(指定なし)"}</code>
        </li>
        <li>
          プロンプト: <code>{forwarded.get("q") ?? "(指定なし)"}</code>
        </li>
      </ul>
      <p>
        <a href={deepLink}>Claude で開く</a>
      </p>
      <p>
        自動で開かない場合は上のリンクを押してください。Claude
        デスクトップアプリが必要です。
      </p>
    </main>
  )
}
