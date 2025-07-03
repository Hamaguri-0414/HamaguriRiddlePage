// 一枚謎専用JavaScript

// グローバル変数
let riddlesData = null;
let answersData = null;
let currentPage = 1;
const RIDDLES_PER_PAGE = 20;

// ページ読み込み時の初期化
document.addEventListener('DOMContentLoaded', function() {
    const currentPath = window.location.pathname;
    
    if (currentPath.includes('riddle.html')) {
        // 詳細ページの初期化
        initRiddleDetailPage();
    } else {
        // 一覧ページの初期化
        initRiddleListPage();
    }
});

// 一覧ページの初期化
async function initRiddleListPage() {
    try {
        // URLパラメータからページ番号を取得
        const urlParams = new URLSearchParams(window.location.search);
        currentPage = parseInt(urlParams.get('page')) || 1;
        
        // データの読み込み
        await loadRiddlesData();
        
        // UI の更新
        renderRiddlesList();
        renderPagination();
        hideLoading();
        
    } catch (error) {
        console.error('一覧ページの初期化エラー:', error);
        showError();
    }
}

// 詳細ページの初期化
async function initRiddleDetailPage() {
    try {
        // URLパラメータから謎IDを取得
        const urlParams = new URLSearchParams(window.location.search);
        const riddleId = urlParams.get('id');
        
        if (!riddleId) {
            throw new Error('謎IDが指定されていません');
        }
        
        // データの読み込み
        await loadRiddlesData();
        await loadAnswersData();
        
        // 謎の表示
        displayRiddle(riddleId);
        
        // フォームイベントの設定
        setupAnswerForm(riddleId);
        
        hideLoading();
        
    } catch (error) {
        console.error('詳細ページの初期化エラー:', error);
        showError();
    }
}

// 謎データの読み込み
async function loadRiddlesData() {
    try {
        const response = await fetch('../data/riddles.json');
        if (!response.ok) {
            throw new Error('謎データの読み込みに失敗しました');
        }
        riddlesData = await response.json();
    } catch (error) {
        console.error('謎データ読み込みエラー:', error);
        throw error;
    }
}

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

// 謎一覧の表示
function renderRiddlesList() {
    const grid = document.getElementById('riddlesGrid');
    const startIndex = (currentPage - 1) * RIDDLES_PER_PAGE;
    const endIndex = startIndex + RIDDLES_PER_PAGE;
    const riddlesToShow = riddlesData.riddles.slice(startIndex, endIndex);
    
    grid.innerHTML = riddlesToShow.map(riddle => `
        <div class="riddle-card" onclick="navigateToRiddle('${riddle.id}')">
            <h3 class="riddle-card-title">${escapeHtml(riddle.title)}</h3>
            <div class="riddle-card-meta">
                <time class="riddle-card-date">${formatDate(riddle.date)}</time>
                <div class="riddle-difficulty difficulty-${riddle.difficulty}">
                    ${getDifficultyText(riddle.difficulty)}
                </div>
            </div>
            <p class="riddle-card-description">${escapeHtml(riddle.description || '')}</p>
        </div>
    `).join('');
}

// ページネーションの表示
function renderPagination() {
    const pagination = document.getElementById('pagination');
    const totalPages = Math.ceil(riddlesData.riddles.length / RIDDLES_PER_PAGE);
    
    if (totalPages <= 1) {
        pagination.innerHTML = '';
        return;
    }
    
    const buttons = [];
    
    // 前のページボタン
    buttons.push(`
        <button class="pagination-button" ${currentPage === 1 ? 'disabled' : ''} 
                onclick="changePage(${currentPage - 1})">
            前へ
        </button>
    `);
    
    // ページ番号ボタン
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);
    
    for (let i = startPage; i <= endPage; i++) {
        buttons.push(`
            <button class="pagination-button ${i === currentPage ? 'active' : ''}" 
                    onclick="changePage(${i})">
                ${i}
            </button>
        `);
    }
    
    // 次のページボタン
    buttons.push(`
        <button class="pagination-button" ${currentPage === totalPages ? 'disabled' : ''} 
                onclick="changePage(${currentPage + 1})">
            次へ
        </button>
    `);
    
    pagination.innerHTML = buttons.join('');
}

// ページ変更
function changePage(page) {
    const totalPages = Math.ceil(riddlesData.riddles.length / RIDDLES_PER_PAGE);
    
    if (page < 1 || page > totalPages) return;
    
    currentPage = page;
    
    // URLの更新
    const url = new URL(window.location);
    url.searchParams.set('page', page);
    window.history.pushState({}, '', url);
    
    // 表示の更新
    renderRiddlesList();
    renderPagination();
    
    // ページトップにスクロール
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 謎詳細ページへの遷移
function navigateToRiddle(riddleId) {
    window.location.href = `riddle.html?id=${riddleId}`;
}

// 謎の表示（詳細ページ）
function displayRiddle(riddleId) {
    const riddle = riddlesData.riddles.find(r => r.id === riddleId);
    
    if (!riddle) {
        throw new Error('指定された謎が見つかりません');
    }
    
    // ページタイトルの更新
    document.getElementById('pageTitle').textContent = `${riddle.title} - Hamaguri謎解きポートフォリオ`;
    document.getElementById('breadcrumbTitle').textContent = riddle.title;
    
    // 謎情報の表示
    document.getElementById('riddleTitle').textContent = riddle.title;
    document.getElementById('riddleDate').textContent = formatDate(riddle.date);
    document.getElementById('riddleDifficulty').textContent = getDifficultyText(riddle.difficulty);
    document.getElementById('riddleDifficulty').className = `riddle-difficulty difficulty-${riddle.difficulty}`;
    
    // 画像の読み込み
    const img = document.getElementById('riddleImage');
    const imageLoading = document.getElementById('imageLoading');
    
    img.onload = () => {
        imageLoading.style.display = 'none';
        img.style.display = 'block';
    };
    
    img.onerror = () => {
        imageLoading.innerHTML = '<p>画像の読み込みに失敗しました</p>';
    };
    
    img.src = `../assets/images/riddles/${riddle.image}`;
    img.alt = `${riddle.title}の謎画像`;
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
            button.textContent = '回答する';
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
    
    return answerHash === answerData.correctHash;
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
    shareButton.onclick = () => shareOnX(riddleId);
    
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
function shareOnX(riddleId) {
    const riddle = riddlesData.riddles.find(r => r.id === riddleId);
    const text = `「${riddle.title}」の謎を解きました！ #はまぐり謎`;
    const url = window.location.href;
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    
    window.open(shareUrl, '_blank', 'width=550,height=420');
}

// ユーティリティ関数
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function getDifficultyText(difficulty) {
    const difficultyMap = {
        easy: '初級',
        medium: '中級',
        hard: '上級'
    };
    return difficultyMap[difficulty] || '不明';
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function hideLoading() {
    const loading = document.getElementById('loading');
    const content = document.getElementById('riddleContent') || document.querySelector('.riddles-list');
    
    if (loading) loading.style.display = 'none';
    if (content) content.style.display = 'block';
}

function showError() {
    const loading = document.getElementById('loading');
    const error = document.getElementById('errorMessage');
    
    if (loading) loading.style.display = 'none';
    if (error) error.style.display = 'block';
}