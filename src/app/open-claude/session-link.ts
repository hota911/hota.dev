// Same pattern the Claude desktop app uses to validate local session IDs.
const SESSION_ID_PATTERN = /^local_[A-Za-z0-9-]{1,64}$/

export type SessionLinkResult =
  | { status: "missing" }
  | { status: "invalid" }
  | { status: "valid"; deepLink: string }

export function parseSessionHash(hash: string): SessionLinkResult {
  const sessionId = hash.startsWith("#") ? hash.slice(1) : hash

  if (sessionId.length === 0) {
    return { status: "missing" }
  }

  if (!SESSION_ID_PATTERN.test(sessionId)) {
    return { status: "invalid" }
  }

  return {
    status: "valid",
    deepLink: `claude://claude.ai/epitaxy/${sessionId}`,
  }
}
