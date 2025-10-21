// 謎ごとに個別のHTMLページを生成するスクリプト
const fs = require('fs');
const path = require('path');

// データファイルの読み込み
const riddlesData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/riddles.json'), 'utf-8'));

// 出力ディレクトリ
const outputDir = path.join(__dirname, '../single-riddles');

// HTMLテンプレート関数
function generateRiddleHTML(riddle) {
    const imageUrl = `https://hamaguri-0414.github.io/HamaguriRiddlePage/assets/images/riddles/${riddle.image}`;
    const pageUrl = `https://hamaguri-0414.github.io/HamaguriRiddlePage/single-riddles/${riddle.id}.html`;
    const title = `${riddle.title} - Hamaguriの謎解き保管庫`;

    return `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>

    <!-- OGP Meta Tags -->
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="はまぐりの謎解き保管庫">
    <meta property="og:title" content="${title}">
    <meta property="og:url" content="${pageUrl}">
    <meta property="og:image" content="${imageUrl}">

    <!-- Twitter Card Meta Tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${title}">
    <meta name="twitter:image" content="${imageUrl}">

    <link rel="stylesheet" href="../assets/css/style.css">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header class="header">
        <nav class="nav">
            <div class="container">
                <h1 class="logo">
                    <a href="../">はまぐりの謎解き保管庫</a>
                </h1>
                <nav class="breadcrumb">
                    <a href="../">TOP</a>
                    <span class="separator">></span>
                    <a href="./">一枚謎</a>
                    <span class="separator">></span>
                    <span class="current">${riddle.title}</span>
                </nav>
            </div>
        </nav>
    </header>

    <main class="main">
        <section class="riddle-detail">
            <div class="container">

                <article class="riddle-content" id="riddleContent">
                    <header class="riddle-header">
                        <h2 class="riddle-title">${riddle.title}</h2>
                        <div class="riddle-meta">
                            <time class="riddle-date">${formatDate(riddle.date)}</time>
                            <div class="riddle-difficulty difficulty-${riddle.difficulty}">${getDifficultyText(riddle.difficulty)}</div>
                        </div>
                    </header>

                    <div class="riddle-image-container">
                        <img class="riddle-image" src="../assets/images/riddles/${riddle.image}" alt="${riddle.title}の謎画像">
                    </div>

                    <div class="answer-section">
                        <form class="answer-form" id="answerForm">
                            <div class="input-group">
                                <input
                                    type="text"
                                    id="answerInput"
                                    class="answer-input"
                                    placeholder="答えを入力してください..."
                                    autocomplete="off"
                                    required
                                >
                                <div class="button-group">
                                    <button type="button" class="hint-button" id="hintButton" style="display: none;">
                                        💡 ヒント
                                    </button>
                                    <button type="submit" class="submit-button" id="submitButton">
                                        解答する
                                    </button>
                                </div>
                            </div>
                            <div class="answer-feedback" id="answerFeedback"></div>
                        </form>
                    </div>
                </article>

            </div>
        </section>
    </main>

    <!-- ヒントモーダル -->
    <div class="modal" id="hintModal" style="display: none;">
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title">💡 ヒント</h3>
                <div class="hint-pagination" id="hintPagination">
                    <span id="hintCounter">1/1</span>
                </div>
            </div>
            <div class="modal-body">
                <div class="hint-content" id="hintContent">
                    <!-- ヒント内容がここに表示されます -->
                </div>
                <div class="modal-actions">
                    <button class="prev-hint-button" id="prevHintButton" style="display: none;">
                        ← 前のヒント
                    </button>
                    <button class="next-hint-button" id="nextHintButton">
                        次のヒント →
                    </button>
                    <button class="close-modal-button" id="closeHintButton">
                        閉じる
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- 正解モーダル -->
    <div class="modal" id="correctModal" style="display: none;">
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title">🎉 正解です！</h3>
            </div>
            <div class="modal-body">
                <div class="explanation" id="explanation">
                    <!-- 解説がここに表示されます -->
                </div>
                <div class="modal-actions">
                    <button class="share-button" id="shareButton">
                        <span class="share-icon">🐦</span>
                        Xでシェアする
                    </button>
                    <button class="close-modal-button" id="closeModalButton">
                        閉じる
                    </button>
                </div>
            </div>
        </div>
    </div>

    <footer class="footer">
        <div class="container">
            <p class="copyright">
                &copy; 2025 Hamaguri. All rights reserved.
            </p>
        </div>
    </footer>

    <script src="../assets/js/main.js"></script>
    <script>
        // 謎IDを設定
        const RIDDLE_ID = '${riddle.id}';
    </script>
    <script src="riddle-detail.js"></script>
</body>
</html>
`;
}

// 日付フォーマット関数
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// 難易度テキスト取得
function getDifficultyText(difficulty) {
    const difficultyMap = {
        easy: '初級',
        medium: '中級',
        hard: '上級'
    };
    return difficultyMap[difficulty] || '不明';
}

// 各謎のHTMLを生成
riddlesData.riddles.forEach(riddle => {
    const html = generateRiddleHTML(riddle);
    const filePath = path.join(outputDir, `${riddle.id}.html`);

    fs.writeFileSync(filePath, html, 'utf-8');
    console.log(`Generated: ${riddle.id}.html`);
});

console.log(`\n✓ ${riddlesData.riddles.length}個の謎ページを生成しました。`);
