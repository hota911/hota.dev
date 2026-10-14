This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Claude Code を開くリンク

GitHub の Markdown では `claude://` リンクが除去されるため、HTTPS 経由で Claude デスクトップアプリの
既存の Claude Code セッションを開くページを置いている。

```text
https://hota.dev/claude/session/<セッションID>
→ claude://claude.ai/epitaxy/<セッションID>
```

- セッション ID は `local_...` の形式で、`/^local_[A-Za-z0-9-]{1,64}$/` に一致しない場合は 404 を返す。
- 受け付けるのはセッション ID だけで、クエリパラメータを含めプロンプトやフォルダなどは一切引き渡さない。
- ページを開くと自動で `claude://` リンクへ遷移し、遷移しない場合のために「Claude で開く」リンクを表示する。
  セッションは、それがあるマシンの Claude デスクトップアプリで開く。

## Designs

- [Open Codex link page](docs/open-codex-link-design.md)
