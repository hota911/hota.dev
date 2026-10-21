const THREAD_ID_PATTERN = /^[A-Za-z0-9_-]{1,128}$/

export type ThreadLinkResult =
  | { status: "missing" }
  | { status: "invalid" }
  | { status: "valid"; deepLink: string }

export function parseThreadHash(hash: string): ThreadLinkResult {
  const threadId = hash.startsWith("#") ? hash.slice(1) : hash

  if (threadId.length === 0) {
    return { status: "missing" }
  }

  if (!THREAD_ID_PATTERN.test(threadId)) {
    return { status: "invalid" }
  }

  return {
    status: "valid",
    deepLink: `codex://threads/${threadId}`,
  }
}
