# まりちゃんランドアプリ

GitHub Pages で公開できる、HTML/CSS/JavaScript の静的Webアプリです。

## ページ

- ホーム
- まりちゃんランドへの行き方
- 登場人物
- 使える魔法
- 入場はこちら
- まりちゃんランド日記
- アルバム
- 管理ページ

## ローカルで見る

`index.html` をブラウザで開くと動きます。

フォームの登録データは、このブラウザの `localStorage` に保存されます。サーバーやデータベースはまだ使っていません。

管理ページのデモ合言葉:

```text
marichan
```

## GitHub Pages で公開する

1. このフォルダを GitHub リポジトリに push します。
2. GitHub の `Settings` → `Pages` を開きます。
3. `Build and deployment` の `Source` を `GitHub Actions` にします。
4. `main` ブランチに push すると `.github/workflows/pages.yml` が公開処理を実行します。

## あとで写真に差し替える場所

- ヒーロー画像: `assets/hero-marichan-land.png`
- 登場人物: `index.html` の `characters` セクション
- 行き方: `index.html` の `access` セクション
- アルバム: `index.html` の `album` セクション

## 次に足すとよさそうなもの

- 登場人物の写真カード
- 行き方ページの本物の写真
- 入場証のダウンロード機能
- お知らせを追加できる管理画面
- Firebase や Supabase を使った共有データ保存
