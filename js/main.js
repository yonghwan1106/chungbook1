// 충북 하나로 카드 자바스크립트

// 페이지가 로드된 후 실행
document.addEventListener('DOMContentLoaded', function() {
  // 스크롤 이벤트 처리
  handleScroll();
  
  // 모바일 메뉴 토글
  setupMobileMenu();
  
  // 스무스 스크롤 설정
  setupSmoothScroll();
  
  // FAQ 토글 설정
  setupFaqToggle();
  
  // 카운터 애니메이션
  setupCounterAnimation();
});

// 스크롤 이벤트 처리 함수
function handleScroll() {
  const header = document.querySelector('header');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// 모바일 메뉴 토글 함수
function setupMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });
  }
}

// 스무스 스크롤 설정 함수
function setupSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  for (const link of links) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: 'smooth'
        });
        
        // 모바일 메뉴가 열려있는 경우 닫기
        const navMenu = document.querySelector('.nav-menu');
        const menuToggle = document.querySelector('.menu-toggle');
        
        if (navMenu && navMenu.classList.contains('active')) {
          navMenu.classList.remove('active');
          if (menuToggle) {
            menuToggle.classList.remove('active');
          }
        }
      }
    });
  }
}

// FAQ 토글 설정 함수
function setupFaqToggle() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    if (question) {
      question.addEventListener('click', () => {
        // 현재 아이템의 활성화 상태를 토글
        item.classList.toggle('active');
        
        // 다른 FAQ 항목들을 비활성화 (아코디언 스타일)
        // 주석 처리하면 여러 항목을 동시에 열 수 있음
        /*
        faqItems.forEach(otherItem => {
          if (otherItem !== item && otherItem.classList.contains('active')) {
            otherItem.classList.remove('active');
          }
        });
        */
      });
    }
  });
}

// 카운터 애니메이션 설정 함수
function setupCounterAnimation() {
  const counterSection = document.querySelector('.counter-section');
  
  if (counterSection) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        animateCounters();
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    
    observer.observe(counterSection);
  }
}

// 카운터 애니메이션 함수
function animateCounters() {
  const counters = document.querySelectorAll('.counter');
  
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000; // 애니메이션 지속 시간(ms)
    const step = Math.ceil(target / (duration / 16)); // 16ms 간격으로 증가할 숫자
    
    let current = 0;
    const updateCounter = () => {
      current += step;
      if (current > target) {
        current = target;
      }
      counter.textContent = current.toLocaleString();
      
      if (current < target) {
        requestAnimationFrame(updateCounter);
      }
    };
    
    updateCounter();
  });
}

// 스크롤 시 요소가 화면에 나타나면 애니메이션 적용
function setupScrollAnimation() {
  const elements = document.querySelectorAll('.animate-on-scroll');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
      }
    });
  }, { threshold: 0.1 });
  
  elements.forEach(element => {
    observer.observe(element);
  });
}

// 페이지 로드 후 스크롤 애니메이션 설정
window.addEventListener('load', setupScrollAnimation);
