// 页面加载完成后执行
 document.addEventListener('DOMContentLoaded', function() {
    // 头部导航滚动效果
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // 服务卡片交互
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            // 移除其他卡片的选中状态
            serviceCards.forEach(c => c.classList.remove('selected'));
            // 添加当前卡片的选中状态
            this.classList.add('selected');
        });
    });
    
    // 评价轮播
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    let currentSlide = 0;
    
    function showSlide(index) {
        // 隐藏所有幻灯片
        slides.forEach(slide => slide.classList.remove('active'));
        // 移除所有指示器的活跃状态
        dots.forEach(dot => dot.classList.remove('active'));
        
        // 显示当前幻灯片
        slides[index].classList.add('active');
        // 激活当前指示器
        dots[index].classList.add('active');
        
        currentSlide = index;
    }
    
    // 下一张幻灯片
    function nextSlide() {
        let newSlide = currentSlide + 1;
        if (newSlide >= slides.length) {
            newSlide = 0;
        }
        showSlide(newSlide);
    }
    
    // 上一张幻灯片
    function prevSlide() {
        let newSlide = currentSlide - 1;
        if (newSlide < 0) {
            newSlide = slides.length - 1;
        }
        showSlide(newSlide);
    }
    
    // 点击指示器切换幻灯片
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });
    
    // 点击按钮切换幻灯片
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    // 自动轮播
    setInterval(nextSlide, 5000);
    
    // 产品卡片悬停效果增强
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.12)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        });
    });
    
    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // 减去头部高度
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 添加加载动画
    const body = document.querySelector('body');
    body.classList.add('loaded');
});