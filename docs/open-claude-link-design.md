# Open Claude Codeリンクページ設計

## 目的

GitHubのPull RequestからClaudeデスクトップアプリのClaude Codeセッションをクリックして開ける
HTTPSリンクを提供する。GitHubはMarkdown中の `claude://` リンクを除去するため、
`claude://claude.ai/epitaxy/<session-id>` を、GitHubが通常のリンクとして扱える
`https://hota.dev/open-claude/#<session-id>` 経由で開く。

`claude://claude.ai/epitaxy/<session-id>` は、Claudeデスクトップアプリのセッション APIが
セッションの `link` として返す形式である（例:
`claude://claude.ai/epitaxy/local_644a0847-6d98-4de2-9e35-c0a914f78cb3`）。この形式は公開
ドキュメントには載っていない。公開ヘルプが案内するのは `claude://code/new` などの形式だけである。

参照: [Open Claude desktop with a link](https://support.claude.com/en/articles/14729294-open-claude-desktop-with-a-link)

## 対象範囲

- `hota.dev` に `/open-claude/` ページを追加する。
- URLフラグメントからClaude CodeのローカルセッションIDを読み取る。
- 有効なIDなら `claude://claude.ai/epitaxy/<session-id>` を自動的に開く。
- 自動遷移が動かない場合に、同じDeep Linkを開くボタンを常に表示する。
- brainリポジトリのPull Requestテンプレートで、Claude Codeセッションのリンクを
  `https://hota.dev/open-claude/#SESSION_ID` に変更する。

ログイン、IDとセッション名の対応表、短縮URLの発行、アクセス履歴の保存は行わない。
新規セッションの作成や、フォルダ・プロンプトの受け渡しも行わない。

## URLとプライバシー

URLは次の形式とする。

```text
https://hota.dev/open-claude/#<session-id>
```

セッションIDをパスやクエリではなくフラグメントへ置く。フラグメントはHTTPリクエストに
含まれないため、通常のWebサーバーのアクセスログにはセッションIDが残らない。

ページにはアクセス解析や外部スクリプトを追加しない。ページ上で動くJavaScriptからは
フラグメントを参照できるため、将来共通レイアウトへ外部スクリプトを追加する場合も、このページが
セッションIDを扱うことを考慮する。

検索結果へ載せる必要はないため、ページは `noindex, nofollow` とする。

## 動作

`/open-claude/` はNext.js App Routerのページとして実装する。URLフラグメントはサーバーへ
送信されないため、Client Componentがブラウザ上で `window.location.hash` を読み取る。

1. 先頭の `#` を除いた値をセッションIDとして取得する。
2. IDが `/^local_[A-Za-z0-9-]{1,64}$/` に一致すれば有効とする。これはClaudeデスクトップアプリが
   ローカルセッションIDの検証に使う正規表現である。
3. `claude://claude.ai/epitaxy/<session-id>` を組み立て、自動遷移を試す。
4. ページには `Open in Claude Code` のリンクを常に表示する。

セッションは、それが存在するマシンのClaudeデスクトップアプリでのみ開ける。自動遷移の成否を
ブラウザから確実に判定できないため、成功メッセージへの切り替えやタイムアウト判定は行わない。
Claudeが開かなかった場合も、利用者は同じページに残り、ボタンから再実行できる。

## 表示とエラー

既存の `hota.dev` と `/open-codex/` に合わせた簡素な英語表示とする。

- 有効なID: `Opening this Claude Code session…` と `Open in Claude Code` リンクを表示する。
- IDなし: `Add a session ID after #.` とURL例を表示する。
- 不正なID: `This Claude Code session link is invalid.` とURL例を表示する。

ボタンはJavaScriptのクリックハンドラーだけにせず、`href` を持つリンクとして実装する。
キーボード操作と支援技術で通常のリンクとして利用できる状態を保つ。

## 検証

新しいテスト依存関係は追加しない。次を完了条件とする。

- `pnpm lint` が成功する。
- `pnpm build` が成功する。
- 実在するセッションID入りURLをクリックし、Claudeデスクトップアプリで対象セッションが開く。
- IDなし、`local_` で始まらないID、`/` などの不正な文字を含むID、許容長を超えるIDで
  Deep Linkを生成しない。
- ページのHTMLまたはメタデータに `noindex, nofollow` が含まれる。
- brainのPull Requestテンプレートから生成したHTTPSリンクがGitHub上でクリックできる。
