// 謎詳細ページ専用JavaScript

// グローバル変数
let answersData = null;
let currentHintIndex = 0;
let currentRiddleHints = [];

// ページ読み込み時の初期化
document.addEventListener('DOMContentLoaded', async function() {
    try {
        // 回答データの読み込み
        await loadAnswersData();

        // フォームイベントの設定
        setupAnswerForm(RIDDLE_ID);

        // ヒント機能の初期化
        initHintSystem(RIDDLE_ID);

    } catch (error) {
        console.error('詳細ページの初期化エラー:', error);
    }
});

// 回答データの読み込み
async function loadAnswersData() {
    try {
        const response = await fetch('../data/riddle-answers.json');
        if (!response.ok) {
            throw new Error('回答データの読み込みに失敗しました');
        }
        answersData = await response.json();
    } catch (error) {
        console.error('回答データ読み込みエラー:', error);
        throw error;
    }
}

// 回答フォームの設定
function setupAnswerForm(riddleId) {
    const form = document.getElementById('answerForm');
    const input = document.getElementById('answerInput');
    const button = document.getElementById('submitButton');
    const feedback = document.getElementById('answerFeedback');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const answer = input.value.trim();
        if (!answer) return;

        // ボタンを無効化
        button.disabled = true;
        button.textContent = '確認中...';

        try {
            const isCorrect = await checkAnswer(riddleId, answer);

            if (isCorrect) {
                showCorrectFeedback();
                setTimeout(() => showCorrectModal(riddleId), 500);
            } else {
                showIncorrectFeedback();
            }
        } catch (error) {
            console.error('回答チェックエラー:', error);
            showIncorrectFeedback('エラーが発生しました。もう一度お試しください。');
        } finally {
            // ボタンを有効化
            button.disabled = false;
            button.textContent = '解答する';
        }
    });
}

// 回答のチェック
async function checkAnswer(riddleId, answer) {
    const answerData = answersData.answers[riddleId];
    if (!answerData) {
        throw new Error('回答データが見つかりません');
    }

    // 入力値を正規化（ひらがな・カタカナ変換、大小文字統一など）
    const normalizedAnswer = normalizeAnswer(answer);

    // SHA-256ハッシュを計算
    const answerHash = await calculateSHA256(normalizedAnswer);

    // correctHashが文字列の場合（旧形式：単一ハッシュ）
    if (typeof answerData.correctHash === 'string') {
        return answerHash === answerData.correctHash;
    }

    // correctHashが配列の場合（新形式：複数ハッシュ）
    if (Array.isArray(answerData.correctHash)) {
        return answerData.correctHash.includes(answerHash);
    }

    // どちらでもない場合はエラー
    throw new Error('正解ハッシュの形式が不正です');
}

// 回答の正規化
function normalizeAnswer(answer) {
    return answer
        .trim()
        .toLowerCase()
        .replace(/[ァ-ヶ]/g, (match) => String.fromCharCode(match.charCodeAt(0) - 0x60))
        .replace(/\s+/g, '');
}

// SHA-256ハッシュの計算
async function calculateSHA256(text) {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// 正解フィードバックの表示
function showCorrectFeedback() {
    const feedback = document.getElementById('answerFeedback');
    feedback.className = 'answer-feedback feedback-correct';
    feedback.textContent = '正解です！';
    feedback.style.display = 'block';
}

// 不正解フィードバックの表示
function showIncorrectFeedback(message = '残念！もう一度考えてみてください。') {
    const feedback = document.getElementById('answerFeedback');
    feedback.className = 'answer-feedback feedback-incorrect';
    feedback.textContent = message;
    feedback.style.display = 'block';

    // 3秒後にフィードバックを非表示
    setTimeout(() => {
        feedback.style.display = 'none';
    }, 3000);
}

// 正解モーダルの表示
function showCorrectModal(riddleId) {
    const modal = document.getElementById('correctModal');
    const explanation = document.getElementById('explanation');
    const shareButton = document.getElementById('shareButton');
    const closeButton = document.getElementById('closeModalButton');

    // 解説の表示
    const answerData = answersData.answers[riddleId];
    explanation.innerHTML = answerData.explanation || '解説はありません。';

    // シェアボタンの設定
    shareButton.onclick = () => shareOnX();

    // 閉じるボタンの設定
    closeButton.onclick = () => {
        modal.style.display = 'none';
    };

    // モーダル外クリックで閉じる
    modal.onclick = (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    };

    modal.style.display = 'flex';
}

// Xでシェア
function shareOnX() {
    const title = document.querySelector('.riddle-title').textContent;
    const text = `「${title}」の謎を解きました！ #はまぐり謎`;
    const url = window.location.href;
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;

    window.open(shareUrl, '_blank', 'width=550,height=420');
}

// ヒント機能の初期化
function initHintSystem(riddleId) {
    const answerData = answersData.answers[riddleId];
    const hintButton = document.getElementById('hintButton');

    if (answerData && answerData.hints && answerData.hints.length > 0) {
        currentRiddleHints = answerData.hints;
        currentHintIndex = 0;

        // ヒントボタンを表示
        hintButton.style.display = 'block';

        // ヒントボタンのイベントリスナー設定
        hintButton.onclick = () => showHintModal();

        // ヒントモーダルのイベントリスナー設定
        setupHintModalEvents();
    } else {
        // ヒントがない場合はボタンを非表示
        hintButton.style.display = 'none';
    }
}

// ヒントモーダルのイベント設定
function setupHintModalEvents() {
    const modal = document.getElementById('hintModal');
    const closeButton = document.getElementById('closeHintButton');
    const nextButton = document.getElementById('nextHintButton');
    const prevButton = document.getElementById('prevHintButton');

    // 閉じるボタンのイベント
    closeButton.onclick = () => {
        modal.style.display = 'none';
    };

    // 次のヒントボタンのイベント
    nextButton.onclick = () => {
        showNextHint();
    };

    // 前のヒントボタンのイベント
    prevButton.onclick = () => {
        showPrevHint();
    };

    // モーダル外クリックで閉じる
    modal.onclick = (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    };
}

// ヒントモーダルを表示
function showHintModal() {
    const modal = document.getElementById('hintModal');

    // 現在のヒントを表示
    updateHintDisplay();

    modal.style.display = 'flex';
}

// ヒント表示の更新
function updateHintDisplay() {
    const hintContent = document.getElementById('hintContent');
    const hintCounter = document.getElementById('hintCounter');
    const nextButton = document.getElementById('nextHintButton');
    const prevButton = document.getElementById('prevHintButton');

    // 現在のヒントを表示
    hintContent.textContent = currentRiddleHints[currentHintIndex];

    // ページネーション表示を更新
    hintCounter.textContent = `${currentHintIndex + 1}/${currentRiddleHints.length}`;

    // 前のヒントボタンの状態を更新
    if (currentHintIndex <= 0) {
        prevButton.style.display = 'none';
    } else {
        prevButton.style.display = 'flex';
        prevButton.textContent = `← 前のヒント (${currentHintIndex}/${currentRiddleHints.length})`;
    }

    // 次のヒントボタンの状態を更新
    if (currentHintIndex >= currentRiddleHints.length - 1) {
        nextButton.style.display = 'none';
    } else {
        nextButton.style.display = 'flex';
        nextButton.textContent = `次のヒント (${currentHintIndex + 2}/${currentRiddleHints.length}) →`;
    }
}

// 次のヒントを表示
function showNextHint() {
    if (currentHintIndex < currentRiddleHints.length - 1) {
        currentHintIndex++;
        updateHintDisplay();
    }
}

// 前のヒントを表示
function showPrevHint() {
    if (currentHintIndex > 0) {
        currentHintIndex--;
        updateHintDisplay();
    }
}
