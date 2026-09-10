# Open Codexリンクページ設計

## 目的

GitHubのPull RequestからCodexのローカルタスクをクリックして開けるHTTPSリンクを提供する。
OpenAIが案内する `codex://threads/<thread-id>` を、GitHubが通常のリンクとして扱える
`https://hota.dev/open-codex/#<thread-id>` 経由で開く。

参照: [OpenAI Docs — Deep links](https://learn.chatgpt.com/docs/reference/commands#deep-links)

## 対象範囲

- `hota.dev` に `/open-codex/` ページを追加する。
- URLフラグメントからCodexのtechnical thread IDを読み取る。
- 有効なIDなら `codex://threads/<thread-id>` を自動的に開く。
- 自動遷移が動かない場合に、同じDeep Linkを開くボタンを常に表示する。
- brainリポジトリのPull Requestテンプレートで、Codexセッションのリンクを
  `https://hota.dev/open-codex/#<thread-id>` に変更する。

ログイン、IDとタスク名の対応表、短縮URLの発行、アクセス履歴の保存は行わない。

## URLとプライバシー

URLは次の形式とする。

```text
https://hota.dev/open-codex/#<thread-id>
```

thread IDをパスやクエリではなくフラグメントへ置く。フラグメントはHTTPリクエストに
含まれないため、通常のWebサーバーのアクセスログにはthread IDが残らない。

ページにはアクセス解析や外部スクリプトを追加しない。ページ上で動くJavaScriptからは
フラグメントを参照できるため、将来共通レイアウトへ外部スクリプトを追加する場合も、このページが
thread IDを扱うことを考慮する。

検索結果へ載せる必要はないため、ページは `noindex, nofollow` とする。

## 動作

`/open-codex/` はNext.js App Routerのページとして実装する。URLフラグメントはサーバーへ
送信されないため、Client Componentがブラウザ上で `window.location.hash` を読み取る。

1. 先頭の `#` を除いた値をthread IDとして取得する。
2. IDが英数字、ハイフン、アンダースコアのみで1〜128文字なら有効とする。
3. `codex://threads/<thread-id>` を組み立て、自動遷移を試す。
4. ページには `Open in Codex` のリンクを常に表示する。

自動遷移の成否をブラウザから確実に判定できないため、成功メッセージへの切り替えや
タイムアウト判定は行わない。Codexが開かなかった場合も、利用者は同じページに残り、ボタンから
再実行できる。

## 表示とエラー

既存の `hota.dev` に合わせた簡素な英語表示とする。

- 有効なID: `Opening this Codex task…` と `Open in Codex` リンクを表示する。
- IDなし: `Add a thread ID after #.` とURL例を表示する。
- 不正なID: `This Codex thread link is invalid.` とURL例を表示する。

ボタンはJavaScriptのクリックハンドラーだけにせず、`href` を持つリンクとして実装する。
キーボード操作と支援技術で通常のリンクとして利用できる状態を保つ。

## 検証

新しいテスト依存関係は追加しない。次を完了条件とする。

- `pnpm lint` が成功する。
- `pnpm build` が成功する。
- 実在するthread ID入りURLをクリックし、Codexで対象タスクが開く。
- IDなし、不正な文字を含むID、許容長を超えるIDでDeep Linkを生成しない。
- ページのHTMLまたはメタデータに `noindex, nofollow` が含まれる。
- brainのPull Requestテンプレートから生成したHTTPSリンクがGitHub上でクリックできる。
