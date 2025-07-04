// cluster謎データ（サンプル）
const clusterRiddles = [
    {
        id: 1,
        title: "第1回 cluster謎解きイベント",
        date: "2024年01月15日",
        image: "../assets/images/cluster-riddles/event1.jpg",
        description: "初回のcluster謎解きイベント。メタバース空間での新しい謎解き体験を提供しました。",
        details: "メタバース空間clusterで初めて開催された謎解きイベントです。参加者の皆さんと一緒にバーチャル空間を探索しながら、様々な謎を解きました。新しい形の謎解き体験として、多くの方にご参加いただきました。",
        links: [
            {
                text: "イベント詳細を見る",
                url: "https://cluster.mu/e/example1"
            }
        ]
    },
    {
        id: 2,
        title: "春の謎解きフェスティバル",
        date: "2024年03月20日",
        image: "../assets/images/cluster-riddles/event2.jpg",
        description: "春をテーマにした謎解きイベント。桜舞う美しい空間で謎解きを楽しみました。",
        details: "春の季節をテーマにした特別な謎解きイベントです。桜が舞い散る美しいバーチャル空間で、季節感あふれる謎解きを楽しんでいただきました。参加者同士の交流も活発で、素晴らしいイベントとなりました。",
        links: [
            {
                text: "イベント詳細を見る",
                url: "https://cluster.mu/e/example2"
            },
            {
                text: "参加者の感想",
                url: "https://example.com/reviews2"
            }
        ]
    },
    {
        id: 3,
        title: "夏祭り謎解き大会",
        date: "2024年07月10日",
        image: "../assets/images/cluster-riddles/event3.jpg",
        description: "夏祭りの雰囲気の中で行われた大規模な謎解き大会。チーム戦で盛り上がりました。",
        details: "夏祭りをテーマにした大規模な謎解き大会です。屋台や花火が彩るバーチャル会場で、チーム対抗の謎解きバトルを開催しました。参加者の皆さんの熱い戦いが繰り広げられ、非常に盛り上がったイベントでした。",
        links: [
            {
                text: "イベント詳細を見る",
                url: "https://cluster.mu/e/example3"
            },
            {
                text: "結果発表",
                url: "https://example.com/results3"
            }
        ]
    },
    {
        id: 4,
        title: "ハロウィン謎解きナイト",
        date: "2024年10月31日",
        image: "../assets/images/cluster-riddles/event4.jpg",
        description: "ハロウィンの夜に開催されたホラー要素を含む謎解きイベント。",
        details: "ハロウィンの夜に開催された特別な謎解きイベントです。少しホラー要素を含む謎解きで、スリルと楽しさを両立させました。仮装をした参加者も多く、ハロウィンらしい賑やかなイベントとなりました。",
        links: [
            {
                text: "イベント詳細を見る",
                url: "https://cluster.mu/e/example4"
            }
        ]
    },
    {
        id: 5,
        title: "クリスマス謎解きパーティー",
        date: "2024年12月24日",
        image: "../assets/images/cluster-riddles/event5.jpg",
        description: "クリスマスイブに開催された特別な謎解きパーティー。プレゼント交換もありました。",
        details: "クリスマスイブに開催された年末の特別イベントです。クリスマスツリーやイルミネーションで飾られた会場で、心温まる謎解きを楽しんでいただきました。参加者同士のプレゼント交換も行い、素敵なクリスマスを過ごしました。",
        links: [
            {
                text: "イベント詳細を見る",
                url: "https://cluster.mu/e/example5"
            },
            {
                text: "写真ギャラリー",
                url: "https://example.com/gallery5"
            }
        ]
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
    }
    
    detailModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// 詳細モーダルを閉じる
function closeDetailModal() {
    detailModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}