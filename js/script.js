// DOM 元素加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 平滑滚动功能
    const smoothScroll = function(targetId) {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // 减去头部高度
                behavior: 'smooth'
            });
        }
    };

    // 为导航链接添加平滑滚动
    document.querySelectorAll('.nav-link, .footer-links a, .hero .btn').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1); // 获取锚点部分
            smoothScroll(targetId);
        });
    });

    // 表单提交处理
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 简单的表单验证
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (!name || !email || !message) {
                alert('请填写所有必填字段！');
                return;
            }
            
            // 简单的邮箱验证
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('请输入有效的邮箱地址！');
                return;
            }
            
            // 在实际应用中，这里会发送表单数据到服务器
            // 这里仅做模拟提交
            alert('表单提交成功！感谢您的留言，我们会尽快回复您。');
            contactForm.reset();
        });
    }

    // 服务卡片交互
    const serviceCards = document.querySelectorAll('.service-card');
    const servicesImage = document.querySelector('.services-image img');
    
    // 为每个服务准备不同的图片
    const serviceImages = {
        'service1': 'images/5059.jpg', // Blossom Code
        'service2': 'images/5155.jpg', // Health protection
        'service3': 'images/5215.jpg', // Pathfinder Light
        'service4': 'images/5059.jpg', // Mind Bloom
        'service5': 'images/5155.jpg', // Family Heritag
        'service6': 'images/5215.jpg', // Aura Spark
        'service7': 'images/5059.jpg', // Inner Realm
        'service8': 'images/5155.jpg'  // Frequency Flux
    };
    
    // 为每个服务卡片添加事件监听
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1)';
            
            // 鼠标滑动到卡片上时切换主图片
            const serviceType = this.getAttribute('data-service');
            
            // 移除所有卡片的选中状态
            serviceCards.forEach(c => {
                c.classList.remove('selected');
            });
            
            // 为当前鼠标悬停的卡片添加选中状态
            this.classList.add('selected');
            
            // 更换主图片，并添加过渡效果
            servicesImage.style.opacity = '0';
            setTimeout(() => {
                servicesImage.src = serviceImages[serviceType] || serviceImages.service1;
                servicesImage.alt = this.querySelector('h4').textContent;
                servicesImage.style.opacity = '1';
            }, 300);
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            // 保留阴影效果，以便用户知道刚刚悬停过的卡片
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });
    });
    
    // 设置初始选中状态
    if (serviceCards.length > 0) {
        serviceCards[0].classList.add('selected');
    }
    
    // 为服务图片添加过渡效果
    if (servicesImage) {
        servicesImage.style.transition = 'opacity 0.3s ease';
    }

    // 监听滚动事件，为导航添加滚动效果
    const header = document.querySelector('header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        // 滚动时改变头部样式
        if (currentScrollY > 50) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.backgroundColor = 'rgba(255, 255, 255, 1)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
        
        // 隐藏/显示滚动时的导航栏
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });

    // 添加页面加载动画
    const fadeElements = document.querySelectorAll('.section-title, .about-content, .service-card, .contact-info, .contact-form');
    
    const fadeInOnScroll = function() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // 初始设置
    fadeElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // 首次触发动画
    fadeInOnScroll();
    
    // 滚动时触发动画
    window.addEventListener('scroll', fadeInOnScroll);

    // 响应式导航菜单（在移动设备上）
    const createMobileMenu = function() {
        const headerContainer = document.querySelector('header .container');
        const nav = document.querySelector('header nav');
        
        // 检查是否已经创建了移动菜单按钮
        if (!document.querySelector('.mobile-menu-btn')) {
            const mobileMenuBtn = document.createElement('button');
            mobileMenuBtn.classList.add('mobile-menu-btn');
            mobileMenuBtn.innerHTML = '☰';
            mobileMenuBtn.style.display = 'none';
            mobileMenuBtn.style.fontSize = '24px';
            mobileMenuBtn.style.background = 'none';
            mobileMenuBtn.style.border = 'none';
            mobileMenuBtn.style.color = '#333';
            mobileMenuBtn.style.cursor = 'pointer';
            
            headerContainer.appendChild(mobileMenuBtn);
            
            // 移动菜单按钮点击事件
            mobileMenuBtn.addEventListener('click', function() {
                nav.style.display = nav.style.display === 'block' ? 'none' : 'block';
            });
        }
        
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        
        // 响应式处理
        const handleResponsiveMenu = function() {
            if (window.innerWidth <= 768) {
                mobileMenuBtn.style.display = 'block';
                nav.style.display = 'none';
            } else {
                mobileMenuBtn.style.display = 'none';
                nav.style.display = 'block';
            }
        };
        
        // 首次调用
        handleResponsiveMenu();
        
        // 窗口大小改变时调用
        window.addEventListener('resize', handleResponsiveMenu);
    };
    
    // 创建移动菜单
    createMobileMenu();

    // 返回顶部按钮
    const createBackToTopButton = function() {
        // 检查是否已经存在返回顶部按钮
        if (!document.querySelector('.back-to-top')) {
            const backToTopButton = document.createElement('button');
            backToTopButton.classList.add('back-to-top');
            backToTopButton.innerHTML = '↑';
            backToTopButton.style.position = 'fixed';
            backToTopButton.style.bottom = '30px';
            backToTopButton.style.right = '30px';
            backToTopButton.style.width = '50px';
            backToTopButton.style.height = '50px';
            backToTopButton.style.borderRadius = '50%';
            backToTopButton.style.backgroundColor = '#3498db';
            backToTopButton.style.color = 'white';
            backToTopButton.style.border = 'none';
            backToTopButton.style.fontSize = '24px';
            backToTopButton.style.cursor = 'pointer';
            backToTopButton.style.opacity = '0';
            backToTopButton.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            backToTopButton.style.transform = 'translateY(20px)';
            backToTopButton.style.zIndex = '999';
            backToTopButton.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
            
            // 点击返回顶部
            backToTopButton.addEventListener('click', function() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
            
            document.body.appendChild(backToTopButton);
        }
        
        const backToTopButton = document.querySelector('.back-to-top');
        
        // 监听滚动事件，显示/隐藏返回顶部按钮
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopButton.style.opacity = '1';
                backToTopButton.style.transform = 'translateY(0)';
            } else {
                backToTopButton.style.opacity = '0';
                backToTopButton.style.transform = 'translateY(20px)';
            }
        });
    };
    
    // 创建返回顶部按钮
    createBackToTopButton();
    
    // 促销横幅倒计时功能
    const initCountdown = function() {
        const timerItems = document.querySelectorAll('.timer-item .timer-value');
        if (timerItems.length === 0) return; // 如果没有找到倒计时元素，则不执行
        
        // 设置初始倒计时时间（45小时50分钟30秒）
        let hours = 45;
        let minutes = 50;
        let seconds = 30;
        
        // 更新倒计时显示
        const updateCountdown = function() {
            // 更新显示
            if (timerItems[0]) timerItems[0].textContent = hours.toString().padStart(2, '0');
            if (timerItems[1]) timerItems[1].textContent = minutes.toString().padStart(2, '0');
            if (timerItems[2]) timerItems[2].textContent = seconds.toString().padStart(2, '0');
            
            // 减少倒计时时间
            seconds--;
            
            if (seconds < 0) {
                seconds = 59;
                minutes--;
                
                if (minutes < 0) {
                    minutes = 59;
                    hours--;
                    
                    if (hours < 0) {
                        // 倒计时结束后重置
                        hours = 45;
                        minutes = 50;
                        seconds = 30;
                    }
                }
            }
        };
        
        // 立即执行一次以更新初始显示
        updateCountdown();
        
        // 每秒更新一次倒计时
        setInterval(updateCountdown, 1000);
    };
    
    // 初始化倒计时功能
    initCountdown();

    // 评价轮播功能
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    const prevButton = document.querySelector('.slider-prev');
    const nextButton = document.querySelector('.slider-next');
    let currentSlide = 0;

    function showSlide(index) {
        // 隐藏所有轮播图
        testimonialSlides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // 移除所有指示器的活动状态
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // 显示指定的轮播图
        testimonialSlides[index].classList.add('active');
        dots[index].classList.add('active');
        
        // 更新当前轮播图索引
        currentSlide = index;
    }

    // 下一张轮播图
    function nextSlide() {
        let nextIndex = currentSlide + 1;
        if (nextIndex >= testimonialSlides.length) {
            nextIndex = 0;
        }
        showSlide(nextIndex);
    }

    // 上一张轮播图
    function prevSlide() {
        let prevIndex = currentSlide - 1;
        if (prevIndex < 0) {
            prevIndex = testimonialSlides.length - 1;
        }
        showSlide(prevIndex);
    }

    // 添加按钮事件监听 - 先检查元素是否存在
    if (prevButton && nextButton) {
        prevButton.addEventListener('click', prevSlide);
        nextButton.addEventListener('click', nextSlide);
    }

    // 添加指示器点击事件 - 先检查元素是否存在
    if (dots.length > 0) {
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
            });
        });
    }

    // 自动轮播 - 先检查元素是否存在
    if (testimonialSlides.length > 0) {
        let slideInterval = setInterval(nextSlide, 5000);

        // 鼠标悬停时暂停自动轮播
        const testimonialSlider = document.querySelector('.testimonial-slider');
        if (testimonialSlider) {
            testimonialSlider.addEventListener('mouseenter', () => {
                clearInterval(slideInterval);
            });

            // 鼠标离开时恢复自动轮播
            testimonialSlider.addEventListener('mouseleave', () => {
                slideInterval = setInterval(nextSlide, 5000);
            });
        }
    }
});