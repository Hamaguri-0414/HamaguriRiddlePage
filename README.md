## 📄 Webページ

https://hamaguri-0414.github.io/HamaguriRiddlePage/

## 🎯 プロジェクト概要

このサイトは、はまぐりが制作した様々な謎解きコンテンツを紹介・提供するWebサイトです。GitHub Pagesでホスティングされており、静的サイトとして動作します。
また、READMEを含め多くの文章・ソースコードはClaude Codeが執筆しています。

### 📋 主な機能

- **Web謎**: Webブラウザで遊べる謎解きコンテンツ
- **一枚謎**: 画像ベースの謎解きと答え合わせ機能
- **ヒントシステム**: 段階的にヒントを表示する機能
- **Xシェア機能**: 正解時のSNSシェア機能

## 🏗️ サイト構成

```
はまぐりの謎解き保管庫/
├── TOPページ           # メインランディングページ
├── Web謎              # Webブラウザで遊べる謎解き（開発予定）
└── 一枚謎             # 画像謎の一覧・詳細ページ
    ├── 一覧ページ      # 最大20件/ページ表示
    └── 詳細ページ      # 個別謎の表示・答え合わせ
```

## 🛠️ 技術スタック

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **スタイリング**: レスポンシブデザイン（Grid, Flexbox）
- **セキュリティ**: SHA-256ハッシュによる答え合わせ
- **ホスティング**: GitHub Pages対応
- **開発ツール**: ローカルHTTPサーバー必須

## 🚀 ローカルでの動作確認方法

### 前提条件

- Python 3.x がインストールされていること
- モダンなWebブラウザ（Chrome, Firefox, Safari, Edge）

### 1. リポジトリのクローン

```bash
git clone https://github.com/Hamaguri-0414/HamaguriRiddlePage.git
cd HamaguriRiddlePage
```

### 2. ローカルサーバーの起動

```bash
# Python 3.x の場合
python3 -m http.server 8000

# または Python 2.x の場合
python -m SimpleHTTPServer 8000
```

### 3. ブラウザでアクセス

以下のURLをブラウザで開いてください：

- **TOPページ**: http://localhost:8000/
- **一枚謎一覧**: http://localhost:8000/single-riddles/
- **Web謎**: http://localhost:8000/web-riddles/
- **ハッシュ生成ツール**: http://localhost:8000/tools/hash-generator.html

### ⚠️ 重要な注意事項

**ローカルサーバーが必要な理由**: 
一枚謎機能はJavaScriptのfetch APIを使用してJSONファイルを読み込むため、ブラウザのCORS（Cross-Origin Resource Sharing）制限により、ファイルを直接開くだけでは動作しません。必ずHTTPサーバー経由でアクセスしてください。

## 🎮 一枚謎の遊び方

### 基本的な流れ

1. **一覧ページ**で気になる謎をクリック
2. **詳細ページ**で謎の画像を確認
3. 必要に応じて**💡 ヒントボタン**でヒントを確認
4. 答えを入力欄に入力して**回答する**ボタンをクリック
5. 正解の場合、解説とXシェアボタンが表示されます

### テスト用謎解き

- **謎ID**: riddle-001（テストの小謎）
- **答え**: `てすと`
- **ヒント**: 2つのヒントが利用可能

## 🔧 開発者向け情報

### 新しい謎の追加方法

1. **画像の配置**: `assets/images/riddles/` に画像ファイルを追加
2. **メタデータの追加**: `data/riddles.json` に謎情報を追加
3. **答えの設定**: `tools/hash-generator.html` でハッシュ生成し、`data/riddle-answers.json` に追加

### プロジェクト構造

```
HamaguriRiddlePage/
├── index.html                  # TOPページ
├── web-riddles/
│   └── index.html             # Web謎（開発予定ページ）
├── single-riddles/
│   ├── index.html             # 一枚謎一覧
│   ├── riddle.html            # 一枚謎詳細
│   ├── style.css              # 一枚謎専用CSS
│   └── script.js              # 一枚謎専用JavaScript
├── assets/
│   ├── css/style.css          # 共通CSS
│   ├── js/main.js             # 共通JavaScript
│   └── images/riddles/        # 謎画像
├── data/
│   ├── riddles.json           # 謎メタデータ
│   └── riddle-answers.json    # 答えとヒント（ハッシュ化）
├── tools/
│   └── hash-generator.html    # 答えハッシュ生成ツール
└── CLAUDE.md                  # 開発ガイドライン
```

### 答えハッシュの生成

新しい謎を追加する際は、`tools/hash-generator.html` を使用して正解のSHA-256ハッシュを生成してください。

## 📱 対応環境

- **デスクトップ**: Windows, macOS, Linux
- **モバイル**: iOS Safari, Android Chrome
- **ブラウザ**: Chrome 90+, Firefox 90+, Safari 14+, Edge 90+

## 🤝 コントリビューション

このプロジェクトは個人のポートフォリオサイトですが、バグ報告や改善提案は歓迎します。

## 📄 ライセンス

© 2025 Hamaguri. All rights reserved.

## 🔗 関連リンク

- **Web謎**: （コンテンツ公開後にリンク追加予定）
- **X (Twitter)**: 正解時のシェア機能で `#はまぐり謎` ハッシュタグを使用

---

謎解きを楽しんでいただき、ありがとうございます！ 🧩✨
