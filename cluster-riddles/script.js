// cluster謎データ
const clusterRiddles = [
    {
        id: 1,
        title: "cluster死角謎",
        date: "2025年05月15日",
        image: "../assets/images/cluster/590fc9eb-6b4b-4755-9405-2d80836b4767.png",
        description: "「cluster死角謎」公開しました。よろしくどうぞ。",
        details: "「cluster死角謎」公開しました。よろしくどうぞ。",
        links: []
    }
];

// ページネーション設定
const itemsPerPage = 6;
let currentPage = 1;

// DOM要素
const riddlesGrid = document.getElementById('riddlesGrid');
const pagination = document.getElementById('pagination');
const loading = document.getElementById('loading');
const errorMessage = document.getElementById('errorMessage');
const detailModal = document.getElementById('detailModal');
const closeModal = document.getElementById('closeModal');

// 初期化
document.addEventListener('DOMContentLoaded', function() {
    loadRiddles();
    
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

// 謎解きデータの読み込み
function loadRiddles() {
    showLoading();
    
    // 実際のAPIコールをシミュレート
    setTimeout(() => {
        try {
            hideLoading();
            renderRiddles();
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
    riddlesGrid.style.display = 'none';
    pagination.style.display = 'none';
    errorMessage.style.display = 'none';
}

// ローディング非表示
function hideLoading() {
    loading.style.display = 'none';
    riddlesGrid.style.display = 'grid';
    pagination.style.display = 'flex';
}

// エラー表示
function showError() {
    errorMessage.style.display = 'block';
    riddlesGrid.style.display = 'none';
    pagination.style.display = 'none';
}

// 謎解きカードのレンダリング
function renderRiddles() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentRiddles = clusterRiddles.slice(startIndex, endIndex);
    
    riddlesGrid.innerHTML = '';
    
    currentRiddles.forEach(riddle => {
        const riddleCard = createRiddleCard(riddle);
        riddlesGrid.appendChild(riddleCard);
    });
}

// 謎解きカードの作成
function createRiddleCard(riddle) {
    const card = document.createElement('div');
    card.className = 'riddle-card';
    card.onclick = () => openDetailModal(riddle);
    
    card.innerHTML = `
        <img src="${riddle.image}" alt="${riddle.title}" class="riddle-card-image" 
             onerror="this.style.background='#e0e0e0'; this.style.display='flex'; this.style.alignItems='center'; this.style.justifyContent='center'; this.innerHTML='画像読み込み中'; this.style.color='#999';">
        <h3 class="riddle-card-title">${riddle.title}</h3>
        <div class="riddle-card-meta">
            <span class="riddle-card-date">${riddle.date}</span>
        </div>
        <p class="riddle-card-description">${riddle.description}</p>
    `;
    
    return card;
}

// ページネーションのレンダリング
function renderPagination() {
    const totalPages = Math.ceil(clusterRiddles.length / itemsPerPage);
    
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
    const totalPages = Math.ceil(clusterRiddles.length / itemsPerPage);
    
    if (page < 1 || page > totalPages) return;
    
    currentPage = page;
    renderRiddles();
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
    
    if (riddle.links && riddle.links.length > 0) {
        riddle.links.forEach(link => {
            const linkElement = document.createElement('a');
            linkElement.href = link.url;
            linkElement.className = 'event-link';
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