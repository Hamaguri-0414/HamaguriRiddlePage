// 制作実績データ
const portfolioWorks = [
    {
        id: 1,
        title: "クラスター社10周年謎解きラリー",
        date: "2025年07月07日",
        image: "../assets/images/portfolio/10th-nazo.png",
        description: "クラスター株式会社の10周年を記念したメタバースプラットフォーム cluster 上で遊べる周遊型の謎解きです。",
        details: "クラスター株式会社の10周年を記念したメタバースプラットフォーム cluster 上で遊べる周遊型の謎解きです。2025年7月7日から同年8月8日まで開催されました。",
        links: [
            {
                text: "詳細をみる",
                url: "https://x.com/cluster_jp/status/1939974777038586348"
            }
        ]
    }
];

// ページネーション設定
const itemsPerPage = 6;
let currentPage = 1;

// DOM要素
const portfolioGrid = document.getElementById('portfolioGrid');
const pagination = document.getElementById('pagination');
const loading = document.getElementById('loading');
const errorMessage = document.getElementById('errorMessage');
const detailModal = document.getElementById('detailModal');
const closeModal = document.getElementById('closeModal');

// 初期化
document.addEventListener('DOMContentLoaded', function() {
    loadPortfolio();
    
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

// 制作実績データの読み込み
function loadPortfolio() {
    showLoading();
    
    // 実際のAPIコールをシミュレート
    setTimeout(() => {
        try {
            hideLoading();
            renderPortfolio();
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
    portfolioGrid.style.display = 'none';
    pagination.style.display = 'none';
    errorMessage.style.display = 'none';
}

// ローディング非表示
function hideLoading() {
    loading.style.display = 'none';
    portfolioGrid.style.display = 'grid';
    pagination.style.display = 'flex';
}

// エラー表示
function showError() {
    errorMessage.style.display = 'block';
    portfolioGrid.style.display = 'none';
    pagination.style.display = 'none';
}

// 制作実績カードのレンダリング
function renderPortfolio() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentWorks = portfolioWorks.slice(startIndex, endIndex);
    
    portfolioGrid.innerHTML = '';
    
    currentWorks.forEach(work => {
        const workCard = createPortfolioCard(work);
        portfolioGrid.appendChild(workCard);
    });
}

// 制作実績カードの作成
function createPortfolioCard(work) {
    const card = document.createElement('div');
    card.className = 'portfolio-card';
    card.onclick = () => openDetailModal(work);
    
    card.innerHTML = `
        <img src="${work.image}" alt="${work.title}" class="portfolio-card-image" 
             onerror="this.style.background='#e0e0e0'; this.style.display='flex'; this.style.alignItems='center'; this.style.justifyContent='center'; this.innerHTML='画像読み込み中'; this.style.color='#999';">
        <h3 class="portfolio-card-title">${work.title}</h3>
        <div class="portfolio-card-meta">
            <span class="portfolio-card-date">${work.date}</span>
        </div>
        <p class="portfolio-card-description">${work.description}</p>
    `;
    
    return card;
}

// ページネーションのレンダリング
function renderPagination() {
    const totalPages = Math.ceil(portfolioWorks.length / itemsPerPage);
    
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
    const totalPages = Math.ceil(portfolioWorks.length / itemsPerPage);
    
    if (page < 1 || page > totalPages) return;
    
    currentPage = page;
    renderPortfolio();
    renderPagination();
    
    // ページトップにスクロール
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 詳細モーダルを開く
function openDetailModal(work) {
    document.getElementById('modalTitle').textContent = work.title;
    document.getElementById('modalDate').textContent = work.date;
    document.getElementById('modalDescription').textContent = work.details;
    
    const modalImage = document.getElementById('modalImage');
    modalImage.src = work.image;
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
    
    if (work.links && work.links.length > 0) {
        work.links.forEach(link => {
            const linkElement = document.createElement('a');
            linkElement.href = link.url;
            linkElement.className = 'work-link';
            linkElement.textContent = link.text;
            linkElement.target = '_blank';
            linkElement.rel = 'noopener noreferrer';
            modalLinks.appendChild(linkElement);
        });
    } else {
        // リンクがない場合はリンクセクション全体を非表示
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