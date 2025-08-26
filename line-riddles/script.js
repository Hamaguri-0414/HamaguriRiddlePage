// LINE謎データ
const lineRiddles = [
    {
        id: 1,
        title: "セブンライン謎",
        date: "2025年06月08日",
        image: "../assets/images/LINE/seven-line-riddle.png",
        description: "身内向けの誕生日記念のライン謎です。",
        details: "身内向けの誕生日記念のライン謎です。小謎に出てきた法則に従ってLINE謎の招待リンクを変更すると真のライン謎に辿り着けるギミックがありました。",
        links: [],
        isPrivate: true
    },
    {
        id: 2,
        title: "誕生日一日目謎",
        date: "2025年07月21日",
        image: "../assets/images/LINE/just-birthday-riddle.png",
        description: "身内向けの誕生日記念のライン謎です。",
        details: "身内向けの誕生日記念のライン謎です。誕生日を祝われたメッセージが誕生日の翌日に送られてきたことから誕生日を一日勘違いされている可能性を考慮して小謎を解きなおすことで、誕生日二日目謎に辿り着けるギミックがありました。",
        links: [],
        isPrivate: true
    },
    {
        id: 3,
        title: "なのライン謎",
        date: "2025年08月20日",
        image: "../assets/images/LINE/nano-line-riddle.png",
        description: "身内向けの誕生日記念のライン謎です。",
        details: "身内向けの誕生日記念のライン謎です。フィッシュボーンに小謎の答えではなく、小謎がモチーフになっている公演に参加した日付を当てはめることでフィッシュボーンの答えが文章から電話番号に変化し、実際に電話をかけることでお祝いメッセージが再生されるギミックがありました。",
        links: [],
        isPrivate: true
    }
];

// ページネーション設定
const itemsPerPage = 6;
let currentPage = 1;

// DOM要素
const lineRiddlesGrid = document.getElementById('lineRiddlesGrid');
const pagination = document.getElementById('pagination');
const loading = document.getElementById('loading');
const errorMessage = document.getElementById('errorMessage');
const detailModal = document.getElementById('detailModal');
const closeModal = document.getElementById('closeModal');

// 初期化
document.addEventListener('DOMContentLoaded', function() {
    loadLineRiddles();
    
    // モーダル関連のイベントリスナー
    closeModal.addEventListener('click', closeDetailModal);
    detailModal.addEventListener('click', function(e) {
        if (e.target === detailModal) {
            closeDetailModal();
        }
    });
    
    // ESCキーでモーダルを閉じる
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && detailModal.style.display !== 'none') {
            closeDetailModal();
        }
    });
});

// LINE謎データの読み込み
function loadLineRiddles() {
    showLoading();
    
    // 実際のAPIコールをシミュレート
    setTimeout(() => {
        try {
            hideLoading();
            renderLineRiddles();
            renderPagination();
        } catch (error) {
            hideLoading();
            showError();
        }
    }, 1000);
}

// ローディング表示
function showLoading() {
    loading.style.display = 'flex';
    lineRiddlesGrid.style.display = 'none';
    pagination.style.display = 'none';
    errorMessage.style.display = 'none';
}

// ローディング非表示
function hideLoading() {
    loading.style.display = 'none';
    lineRiddlesGrid.style.display = 'grid';
    pagination.style.display = 'flex';
}

// エラー表示
function showError() {
    errorMessage.style.display = 'block';
    lineRiddlesGrid.style.display = 'none';
    pagination.style.display = 'none';
}

// LINE謎カードのレンダリング
function renderLineRiddles() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentRiddles = lineRiddles.slice(startIndex, endIndex);
    
    lineRiddlesGrid.innerHTML = '';
    
    currentRiddles.forEach(riddle => {
        const riddleCard = createLineRiddleCard(riddle);
        lineRiddlesGrid.appendChild(riddleCard);
    });
}

// LINE謎カードの作成
function createLineRiddleCard(riddle) {
    const card = document.createElement('div');
    card.className = 'line-riddle-card';
    card.onclick = () => openDetailModal(riddle);
    
    card.innerHTML = `
        <img src="${riddle.image}" alt="${riddle.title}" class="line-riddle-card-image" 
             onerror="this.style.background='#e0e0e0'; this.style.display='flex'; this.style.alignItems='center'; this.style.justifyContent='center'; this.innerHTML='画像読み込み中'; this.style.color='#999';">
        <h3 class="line-riddle-card-title">${riddle.title}</h3>
        <div class="line-riddle-card-meta">
            <span class="line-riddle-card-date">${riddle.date}</span>
        </div>
        <p class="line-riddle-card-description">${riddle.description}</p>
    `;
    
    return card;
}

// ページネーションのレンダリング
function renderPagination() {
    const totalPages = Math.ceil(lineRiddles.length / itemsPerPage);
    
    if (totalPages <= 1) {
        pagination.style.display = 'none';
        return;
    }
    
    pagination.innerHTML = '';
    
    // 前のページボタン
    const prevButton = document.createElement('button');
    prevButton.className = 'pagination-button';
    prevButton.textContent = '前へ';
    prevButton.disabled = currentPage === 1;
    prevButton.onclick = () => goToPage(currentPage - 1);
    pagination.appendChild(prevButton);
    
    // ページ番号ボタン
    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.className = `pagination-button ${i === currentPage ? 'active' : ''}`;
        pageButton.textContent = i;
        pageButton.onclick = () => goToPage(i);
        pagination.appendChild(pageButton);
    }
    
    // 次のページボタン
    const nextButton = document.createElement('button');
    nextButton.className = 'pagination-button';
    nextButton.textContent = '次へ';
    nextButton.disabled = currentPage === totalPages;
    nextButton.onclick = () => goToPage(currentPage + 1);
    pagination.appendChild(nextButton);
}

// ページ移動
function goToPage(page) {
    const totalPages = Math.ceil(lineRiddles.length / itemsPerPage);
    
    if (page < 1 || page > totalPages) return;
    
    currentPage = page;
    renderLineRiddles();
    renderPagination();
    
    // ページトップにスクロール
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 詳細モーダルを開く
function openDetailModal(riddle) {
    document.getElementById('modalTitle').textContent = riddle.title;
    document.getElementById('modalDate').textContent = riddle.date;
    document.getElementById('modalDescription').textContent = riddle.details;
    
    const modalImage = document.getElementById('modalImage');
    modalImage.src = riddle.image;
    modalImage.onerror = function() {
        this.style.background = '#e0e0e0';
        this.style.display = 'flex';
        this.style.alignItems = 'center';
        this.style.justifyContent = 'center';
        this.innerHTML = '画像読み込み中';
        this.style.color = '#999';
    };
    
    // リンクの表示
    const modalLinks = document.getElementById('modalLinks');
    modalLinks.innerHTML = '';
    modalLinks.style.display = 'flex';
    
    // 非公開の謎の場合、非公開ボタンを表示
    if (riddle.isPrivate) {
        const privateButton = document.createElement('button');
        privateButton.className = 'riddle-link riddle-link-private';
        privateButton.textContent = 'この作品は非公開です';
        privateButton.disabled = true;
        modalLinks.appendChild(privateButton);
    }
    
    if (riddle.links && riddle.links.length > 0) {
        riddle.links.forEach(link => {
            const linkElement = document.createElement('a');
            linkElement.href = link.url;
            linkElement.className = 'riddle-link';
            linkElement.textContent = link.text;
            linkElement.target = '_blank';
            linkElement.rel = 'noopener noreferrer';
            modalLinks.appendChild(linkElement);
        });
    } else if (!riddle.isPrivate) {
        // リンクがなく、非公開でもない場合はリンクセクション全体を非表示
        modalLinks.style.display = 'none';
    }
    
    detailModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// 詳細モーダルを閉じる
function closeDetailModal() {
    detailModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}