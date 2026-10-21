export type HashLinkResult =
  | { status: "missing" }
  | { status: "invalid" }
  | { status: "valid"; deepLink: string }

// Shows the element whose data-status matches the parsed hash, and opens the
// deep link once per distinct value. Re-runs whenever the hash changes.
export function openFromHash(parseHash: (hash: string) => HashLinkResult) {
  let lastOpenedDeepLink: string | null = null

  function update() {
    const result = parseHash(window.location.hash)

    for (const el of document.querySelectorAll<HTMLElement>("[data-status]")) {
      el.hidden = el.dataset.status !== result.status
    }

    if (result.status !== "valid") {
      return
    }

    for (const link of document.querySelectorAll<HTMLAnchorElement>(
      "a[data-deep-link]",
    )) {
      link.href = result.deepLink
    }

    if (result.deepLink !== lastOpenedDeepLink) {
      lastOpenedDeepLink = result.deepLink
      window.location.href = result.deepLink
    }
  }

  update()
  window.addEventListener("hashchange", update)
}
