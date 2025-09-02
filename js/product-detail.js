// 切换主图片
function changeMainImage(imageSrc) {
    document.getElementById('mainImage').src = imageSrc;
    
    // 更新缩略图的选中状态
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach(thumb => {
        thumb.classList.remove('active');
        if (thumb.querySelector('img').src.includes(imageSrc)) {
            thumb.classList.add('active');
        }
    });
}

// 数量选择器
function decreaseQuantity() {
    const quantityInput = document.getElementById('quantity');
    let value = parseInt(quantityInput.value);
    if (value > 1) {
        quantityInput.value = value - 1;
    }
}

function increaseQuantity() {
    const quantityInput = document.getElementById('quantity');
    let value = parseInt(quantityInput.value);
    quantityInput.value = value + 1;
}

// 切换选项值
document.querySelectorAll('.option-value').forEach(option => {
    option.addEventListener('click', function() {
        const parent = this.parentElement;
        parent.querySelectorAll('.option-value').forEach(opt => {
            opt.classList.remove('selected');
        });
        this.classList.add('selected');
    });
});

// 切换标签页
function switchTab(tabId) {
    // 隐藏所有内容
    document.querySelectorAll('.feature-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // 移除所有标签的选中状态
    document.querySelectorAll('.feature-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // 显示选中的内容和标签
    document.getElementById(tabId).classList.add('active');
    event.currentTarget.classList.add('active');
}

// 评论过滤功能
function filterReviews(rating) {
    // 更新过滤按钮的选中状态
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.currentTarget.classList.add('active');
    
    // 过滤评论
    const reviews = document.querySelectorAll('.review-item');
    if (rating === 'all') {
        reviews.forEach(review => {
            review.style.display = 'block';
        });
    } else {
        reviews.forEach(review => {
            if (review.getAttribute('data-rating') === rating) {
                review.style.display = 'block';
            } else {
                review.style.display = 'none';
            }
        });
    }
}

// 加载更多评论功能
function loadMoreReviews() {
    // 这里可以添加实际的加载逻辑，目前只是模拟
    const loadMoreBtn = document.querySelector('.load-more-btn');
    loadMoreBtn.textContent = '加载中...';
    
    setTimeout(() => {
        // 模拟没有更多评论的情况
        loadMoreBtn.textContent = '没有更多评论了';
        loadMoreBtn.disabled = true;
        loadMoreBtn.classList.add('disabled');
    }, 1000);
}

// FAQ 切换功能
function toggleFaq(element) {
    const answer = element.nextElementSibling;
    const icon = element.querySelector('.faq-icon');
    
    // 切换当前FAQ的显示状态
    if (answer.style.display === 'block') {
        answer.style.display = 'none';
        icon.textContent = '+';
    } else {
        answer.style.display = 'block';
        icon.textContent = '-';
    }
    
    // 关闭其他FAQ
    document.querySelectorAll('.faq-question').forEach(question => {
        if (question !== element) {
            question.nextElementSibling.style.display = 'none';
            question.querySelector('.faq-icon').textContent = '+';
        }
    });
}

// 初始化FAQ显示状态
window.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.faq-answer').forEach(answer => {
        answer.style.display = 'none';
    });
});