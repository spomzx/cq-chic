// 等待DOM加载完成
$(document).ready(function() {
  // 头部导航滚动效果
  const header = $('.site-header');
  let lastScrollTop = 0;
  
  $(window).scroll(function() {
    const scrollTop = $(this).scrollTop();
    
    if (scrollTop > 100) {
      header.addClass('header-scrolled');
    } else {
      header.removeClass('header-scrolled');
    }
    
    lastScrollTop = scrollTop;
  });
  
  // 服务卡片交互
  const serviceCards = $('.service-card');
  
  serviceCards.each(function(index) {
    // 添加延迟动画效果
    $(this).css('transition-delay', index * 0.1 + 's');
  });
  
  // 评价轮播功能
  const testimonialSlider = $('.testimonial-slider');
  const testimonialItems = $('.testimonial-item');
  const prevBtn = $('.slider-prev');
  const nextBtn = $('.slider-next');
  const dots = $('.dot');
  let currentIndex = 0;
  const totalItems = testimonialItems.length;
  
  // 初始化轮播
  function initSlider() {
    testimonialItems.hide();
    testimonialItems.eq(0).show();
    dots.eq(0).addClass('active');
  }
  
  // 显示当前项
  function showSlide(index) {
    if (index < 0) index = totalItems - 1;
    if (index >= totalItems) index = 0;
    
    testimonialItems.fadeOut(300);
    testimonialItems.eq(index).fadeIn(300);
    
    dots.removeClass('active');
    dots.eq(index).addClass('active');
    
    currentIndex = index;
  }
  
  // 前一项
  function prevSlide() {
    showSlide(currentIndex - 1);
  }
  
  // 后一项
  function nextSlide() {
    showSlide(currentIndex + 1);
  }
  
  // 点击导航按钮
  prevBtn.click(prevSlide);
  nextBtn.click(nextSlide);
  
  // 点击指示器
  dots.click(function() {
    const index = $(this).index();
    showSlide(index);
  });
  
  // 自动轮播
  let autoplayInterval = setInterval(nextSlide, 5000);
  
  // 鼠标悬停时暂停自动轮播
  testimonialSlider.hover(
    function() {
      clearInterval(autoplayInterval);
    },
    function() {
      autoplayInterval = setInterval(nextSlide, 5000);
    }
  );
  
  // 初始化轮播
  initSlider();
  
  // 产品卡片悬停效果增强
  const productCards = $('.product-card, .related-product-card');
  
  productCards.hover(
    function() {
      $(this).find('.product-image img, .related-product-image img').css('transform', 'scale(1.1)');
    },
    function() {
      $(this).find('.product-image img, .related-product-image img').css('transform', 'scale(1)');
    }
  );
  
  // 产品详情页 - 缩略图点击切换主图
  const thumbnails = $('.thumbnail-item');
  const mainImage = $('.main-image img');
  
  thumbnails.click(function() {
    const imgSrc = $(this).find('img').attr('src');
    mainImage.fadeOut(200, function() {
      $(this).attr('src', imgSrc).fadeIn(200);
    });
    
    thumbnails.removeClass('active');
    $(this).addClass('active');
  });
  
  // 产品详情页 - 数量选择器
  const minusBtn = $('.quantity-btn.minus');
  const plusBtn = $('.quantity-btn.plus');
  const quantityValue = $('.quantity-value');
  
  minusBtn.click(function() {
    let value = parseInt(quantityValue.text());
    if (value > 1) {
      quantityValue.text(value - 1);
    }
  });
  
  plusBtn.click(function() {
    let value = parseInt(quantityValue.text());
    quantityValue.text(value + 1);
  });
  
  // 产品特性标签页
  const tabBtns = $('.tab-btn');
  const tabContents = $('.tab-content');
  
  tabBtns.click(function() {
    const index = $(this).index();
    
    tabBtns.removeClass('active');
    $(this).addClass('active');
    
    tabContents.removeClass('active');
    tabContents.eq(index).addClass('active');
  });
  
  // FAQ手风琴效果
  const faqQuestions = $('.faq-question');
  
  faqQuestions.click(function() {
    $(this).toggleClass('active');
    $(this).next('.faq-answer').toggleClass('active');
  });
  
  // 平滑滚动
  $('a[href^="#"]').on('click', function(e) {
    e.preventDefault();
    
    const target = $(this.getAttribute('href'));
    if (target.length) {
      $('html, body').stop().animate({
        scrollTop: target.offset().top - 100
      }, 800);
    }
  });
  
  // 移动端菜单切换
  const mobileMenuToggle = $('.mobile-menu-toggle');
  const mobileMenu = $('.mobile-menu');
  
  if (mobileMenuToggle.length && mobileMenu.length) {
    mobileMenuToggle.click(function() {
      mobileMenu.slideToggle();
    });
  }
  
  // 下拉菜单增强
  const dropdownToggles = $('.nav-item.has-dropdown > .nav-link');
  
  dropdownToggles.hover(
    function() {
      $(this).parent().find('.dropdown-menu').addClass('show');
    },
    function() {
      $(this).parent().find('.dropdown-menu').removeClass('show');
    }
  );
  
  // 加入购物车按钮动画
  const addToCartBtns = $('.add-to-cart-btn');
  
  addToCartBtns.click(function() {
    const btn = $(this);
    const originalText = btn.text();
    
    btn.text('已加入购物车');
    btn.addClass('added');
    
    setTimeout(function() {
      btn.text(originalText);
      btn.removeClass('added');
    }, 2000);
  });
  
  // 图片懒加载
  if ('IntersectionObserver' in window) {
    const imgObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const src = img.getAttribute('data-src');
          
          if (src) {
            img.setAttribute('src', src);
            img.removeAttribute('data-src');
          }
          
          observer.unobserve(img);
        }
      });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
      imgObserver.observe(img);
    });
  }
  
  // 响应式调整
  function handleResize() {
    const windowWidth = $(window).width();
    
    // 在小屏幕上关闭下拉菜单
    if (windowWidth < 768) {
      $('.dropdown-menu').removeClass('show');
    }
    
    // 重置轮播高度以适应不同屏幕
    if (testimonialSlider.length) {
      const tallestItem = Math.max.apply(null, testimonialItems.map(function() {
        return $(this).outerHeight();
      }).get());
      
      testimonialSlider.css('min-height', tallestItem + 'px');
    }
  }
  
  // 初始调用和窗口调整时调用
  handleResize();
  $(window).resize(handleResize);
  
  // 加载更多产品功能
  const loadMoreBtn = $('.load-more-btn');
  
  if (loadMoreBtn.length) {
    loadMoreBtn.click(function() {
      const btn = $(this);
      btn.text('加载中...');
      btn.addClass('loading');
      
      // 模拟加载延迟
      setTimeout(function() {
        btn.text('没有更多产品了');
        btn.addClass('disabled');
        btn.removeClass('loading');
      }, 1500);
    });
  }
  
  // 搜索功能
  const searchBtn = $('.search-btn');
  const searchModal = $('.search-modal');
  const searchClose = $('.search-close');
  
  if (searchBtn.length && searchModal.length && searchClose.length) {
    searchBtn.click(function() {
      searchModal.fadeIn();
      searchModal.find('input').focus();
    });
    
    searchClose.click(function() {
      searchModal.fadeOut();
    });
    
    $(document).click(function(e) {
      if (!$(e.target).closest('.search-modal-content, .search-btn').length) {
        searchModal.fadeOut();
      }
    });
  }
  
  // 颜色选择器
  const colorOptions = $('.color-option');
  
  colorOptions.click(function() {
    colorOptions.removeClass('active');
    $(this).addClass('active');
  });
  
  // 星级评分交互
  const ratingInputs = $('.rating-input input');
  
  ratingInputs.on('change', function() {
    const rating = $(this).val();
    const stars = $(this).closest('.rating-input').find('.rating-stars');
    
    stars.html('');
    for (let i = 1; i <= 5; i++) {
      const starClass = i <= rating ? 'star-filled' : 'star-empty';
      stars.append('<span class="' + starClass + '">★</span>');
    }
  });
  
  // 产品快速查看
  const quickViewBtns = $('.quick-view-btn');
  const quickViewModal = $('.quick-view-modal');
  const quickViewClose = $('.quick-view-close');
  
  if (quickViewBtns.length && quickViewModal.length && quickViewClose.length) {
    quickViewBtns.click(function(e) {
      e.preventDefault();
      quickViewModal.fadeIn();
    });
    
    quickViewClose.click(function() {
      quickViewModal.fadeOut();
    });
    
    $(document).click(function(e) {
      if (!$(e.target).closest('.quick-view-modal-content, .quick-view-btn').length) {
        quickViewModal.fadeOut();
      }
    });
  }
  
  // 促销倒计时
  const countdownElements = $('.countdown');
  
  countdownElements.each(function() {
    const element = $(this);
    const endDate = new Date(element.data('end-date'));
    
    function updateCountdown() {
      const now = new Date();
      const diff = endDate - now;
      
      if (diff <= 0) {
        element.html('<span>优惠已结束</span>');
        return;
      }
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      element.html(
        '<span class="countdown-item"><span class="countdown-value">' + days + '</span><span class="countdown-label">天</span></span>' +
        '<span class="countdown-item"><span class="countdown-value">' + hours + '</span><span class="countdown-label">时</span></span>' +
        '<span class="countdown-item"><span class="countdown-value">' + minutes + '</span><span class="countdown-label">分</span></span>' +
        '<span class="countdown-item"><span class="countdown-value">' + seconds + '</span><span class="countdown-label">秒</span></span>'
      );
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
  });
});

// Shopify特定功能
Shopify.theme = {
  // 初始化Shopify主题功能
  init: function() {
    this.initCart();
    this.initProductForms();
    this.initCustomerAccount();
  },
  
  // 购物车功能
  initCart: function() {
    // 监听加入购物车事件
    $(document).on('ajax:success', 'form[action^="/cart/add"]', function(event) {
      const data = event.detail[1];
      
      // 更新购物车计数
      $('.cart-count').text(data.item_count);
      
      // 显示添加成功提示
      Shopify.theme.showNotification('产品已添加到购物车');
    });
    
    // 购物车更新功能
    $(document).on('change', '.cart-item-quantity', function() {
      const itemKey = $(this).data('item-key');
      const quantity = $(this).val();
      
      $.ajax({
        type: 'POST',
        url: '/cart/change.js',
        data: { quantity: quantity, id: itemKey },
        dataType: 'json',
        success: function(cart) {
          // 更新购物车总价
          $('.cart-subtotal').text(Shopify.formatMoney(cart.subtotal, '¥{{amount}}'));
          $('.cart-total').text(Shopify.formatMoney(cart.total_price, '¥{{amount}}'));
          
          // 更新购物车计数
          $('.cart-count').text(cart.item_count);
        }
      });
    });
  },
  
  // 产品表单功能
  initProductForms: function() {
    // 产品选项变化时更新价格
    $(document).on('change', '.product-form select, .product-form input[type="radio"], .product-form input[type="checkbox"]', function() {
      const form = $(this).closest('form');
      const productId = form.data('product-id');
      const options = {};
      
      // 获取所有选中的选项
      form.find('select').each(function() {
        options[$(this).attr('name')] = $(this).val();
      });
      
      form.find('input[type="radio"]:checked, input[type="checkbox"]:checked').each(function() {
        options[$(this).attr('name')] = $(this).val();
      });
      
      // 请求变体数据
      $.getJSON('/products/' + productId + '.js', function(product) {
        // 查找匹配的变体
        const variant = product.variants.find(function(v) {
          let match = true;
          Object.keys(options).forEach(function(name) {
            const optionName = name.replace('option-', '');
            if (v[optionName] !== options[name]) {
              match = false;
            }
          });
          return match;
        });
        
        if (variant) {
          // 更新价格
          form.find('.product-price').text(Shopify.formatMoney(variant.price, '¥{{amount}}'));
          
          // 更新库存状态
          if (variant.inventory_quantity <= 0 && !variant.inventory_policy) {
            form.find('.add-to-cart-btn, .buy-now-btn').prop('disabled', true).text('缺货');
          } else {
            form.find('.add-to-cart-btn, .buy-now-btn').prop('disabled', false).text(function(i, text) {
              return text.includes('缺货') ? ($(this).hasClass('add-to-cart-btn') ? '加入购物车' : '立即购买') : text;
            });
          }
          
          // 更新SKU
          if (variant.sku) {
            form.find('.product-sku').text(variant.sku);
          }
        }
      });
    });
  },
  
  // 客户账户功能
  initCustomerAccount: function() {
    // 登录表单提交
    $(document).on('submit', '#customer_login', function(e) {
      e.preventDefault();
      const form = $(this);
      const email = form.find('input[name="customer[email]"]').val();
      const password = form.find('input[name="customer[password]"]').val();
      
      $.ajax({
        type: 'POST',
        url: '/account/login',
        data: { customer: { email: email, password: password } },
        success: function() {
          window.location.href = '/account';
        },
        error: function() {
          Shopify.theme.showNotification('登录失败，请检查您的邮箱和密码', 'error');
        }
      });
    });
  },
  
  // 显示通知
  showNotification: function(message, type) {
    type = type || 'success';
    
    // 创建通知元素
    const notification = $('<div>', {
      class: 'notification ' + type,
      text: message
    }).appendTo('body');
    
    // 添加动画
    notification.fadeIn().delay(3000).fadeOut(function() {
      $(this).remove();
    });
  }
};

// 页面加载完成后初始化Shopify主题功能
$(document).ready(function() {
  Shopify.theme.init();
});