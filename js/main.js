/* -------------------------------------------

Name:       Okai
Version:    1.0
Author:	    bslthemes
Website:    https://bslthemes.com/
Developer:	millerDigitalDesign (https://themeforest.net/user/millerdigitaldesign/)

------------------------------------------- */

document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  /* -------------------------------------------

    register gsap plugins

    ------------------------------------------- */
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin);

  /* -------------------------------------------

    ScrollSmoother

    ------------------------------------------- */
  ScrollSmoother.create({
    smooth: 1,
    effects: true,
    smoothTouch: 0.1,
  });
  /* -------------------------------------------
    
    tabs
    
    ------------------------------------------- */
  var tabs = document.querySelectorAll("ul.mil-tabs li");

  if (tabs.length > 0) {
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        var tab_id = this.getAttribute("data-tab");

        tabs.forEach(function (tab) {
          tab.classList.remove("mil-current");
        });
        var tabContents = document.querySelectorAll(".mil-tab-content");
        tabContents.forEach(function (content) {
          content.classList.remove("mil-current");
        });

        this.classList.add("mil-current");
        var tabContentElement = document.getElementById(tab_id);
        if (tabContentElement) {
          tabContentElement.classList.add("mil-current");
        }

        if (typeof ScrollTrigger !== "undefined") {
          ScrollTrigger.refresh();
        }
      });
    });
  }
  /* -------------------------------------------
    
    quantity
    
    ------------------------------------------- */
  var quantityField = document.getElementById("quantity");
  var minusButton = document.querySelector(".mil-minus");
  var plusButton = document.querySelector(".mil-plus");

  if (quantityField && minusButton && plusButton) {
    minusButton.addEventListener("click", function () {
      var currentValue = parseInt(quantityField.value, 10);
      if (currentValue > 0) {
        quantityField.value = currentValue - 1;
      }
    });

    plusButton.addEventListener("click", function () {
      var currentValue = parseInt(quantityField.value, 10);
      quantityField.value = currentValue + 1;
    });
  }
  /* -------------------------------------------

    accordion

    ------------------------------------------- */
  // let groups = gsap.utils.toArray(".mil-accordion-group");
  // let menus = gsap.utils.toArray(".mil-accordion-menu");
  // let menuToggles = groups.map(createAnimation);

  // menus.forEach((menu) => {
  //   menu.addEventListener("click", () => toggleMenu(menu));
  // });

  // function toggleMenu(clickedMenu) {
  //   menuToggles.forEach((toggleFn) => toggleFn(clickedMenu));
  // }

  // function createAnimation(element) {
  //   let menu = element.querySelector(".mil-accordion-menu");
  //   let box = element.querySelector(".mil-accordion-content");

  //   gsap.set(box, {
  //     height: "auto",
  //   });

  //   let animation = gsap
  //     .from(box, {
  //       height: 0,
  //       duration: 0.5,
  //       ease: "sine",
  //       onComplete: () => {
  //         ScrollTrigger.refresh();
  //       },
  //     })
  //     .reverse();

  //   let lastActiveMenu = null;

  //   return function (clickedMenu) {
  //     if (clickedMenu === menu) {
  //       let isOpen = animation.reversed();
  //       animation.reversed(!isOpen);

  //       if (isOpen) {
  //         if (lastActiveMenu && lastActiveMenu !== menu) {
  //           lastActiveMenu.classList.remove("mil-active");
  //         }
  //         menu.classList.add("mil-active");
  //         lastActiveMenu = menu;
  //       } else {
  //         menu.classList.remove("mil-active");
  //       }
  //     } else {
  //       animation.reverse();
  //       if (lastActiveMenu) {
  //         lastActiveMenu.classList.remove("mil-active");
  //       }
  //       clickedMenu.classList.add("mil-active");
  //       lastActiveMenu = clickedMenu;
  //     }
  //   };
  // }
  // Chạy thẳng luôn, không cần bọc trong document.addEventListener("DOMContentLoaded", ...)
  const accordionMenus = document.querySelectorAll(".mil-accordion-menu");

  accordionMenus.forEach((menu) => {
    menu.addEventListener("click", function (e) {
      e.preventDefault();
      console.log("Bạn vừa click vào menu!");

      // Xóa class active ở các tab khác
      accordionMenus.forEach((otherMenu) => {
        if (otherMenu !== menu) {
          otherMenu.classList.remove("active");
          if (otherMenu.nextElementSibling) {
            otherMenu.nextElementSibling.style.maxHeight = null;
          }
        }
      });

      // Mở/đóng tab hiện tại
      this.classList.toggle("active");
      const content = this.nextElementSibling;

      if (content) {
        if (content.style.maxHeight) {
          content.style.maxHeight = null;
        } else {
          content.style.maxHeight = content.scrollHeight + "px";
        }
      }
    });
  });
  /* -------------------------------------------

    cursor

    ------------------------------------------- */
  var follower = document.querySelector(".mil-cursor-follower");
  var posX = 0,
    posY = 0;
  var mouseX = 0,
    mouseY = 0;

  gsap.ticker.add(function () {
    posX += (mouseX - posX) / 10;
    posY += (mouseY - posY) / 10;
    gsap.set(follower, {
      css: {
        left: posX,
        top: posY,
      },
    });
  });

  function addHoverEffect(selector, className) {
    document.querySelectorAll(selector).forEach(function (link) {
      link.addEventListener("mouseenter", function () {
        follower.classList.add(className);
      });
      link.addEventListener("mouseleave", function () {
        follower.classList.remove(className);
      });
    });
  }

  addHoverEffect(".mil-c-dark", "mil-dark-active");
  addHoverEffect(".mil-c-gone", "mil-gone-active");
  addHoverEffect(".mil-c-view", "mil-view-active");
  addHoverEffect(".mil-c-next", "mil-next-active");
  addHoverEffect(".mil-c-read", "mil-read-active");
  addHoverEffect(".mil-c-swipe", "mil-swipe-active");

  document.addEventListener("mousemove", function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  /* -------------------------------------------

    menu

    ------------------------------------------- */
  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("mil-menu-btn")) {
      event.target.classList.toggle("mil-active");
      document.querySelector(".mil-menu-window").classList.toggle("mil-active");
    }
  });
  /* -------------------------------------------

    back to top

    ------------------------------------------- */
  var btn = document.getElementById("mil-btt");

  if (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
  /* -------------------------------------------

    scrollbar

    ------------------------------------------- */
  gsap.to(".mil-progress", {
    height: "100%",
    ease: "sine",
    scrollTrigger: {
      scrub: 0.3,
    },
  });

  /* -------------------------------------------

    scroll animations

    ------------------------------------------- */
  const appearance = document.querySelectorAll(".mil-up");
  appearance.forEach((section) => {
    gsap.fromTo(
      section,
      {
        opacity: 0,
        y: 60,
        scale: 0.96,
        ease: "sine",
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        scrollTrigger: {
          trigger: section,
          toggleActions: "play none none reverse",
        },
      },
    );
  });
  /* -------------------------------------------

    scale animations

    ------------------------------------------- */
  const scaleImage = document.querySelectorAll(".mil-scale-img");

  scaleImage.forEach((section) => {
    var value1 = section.getAttribute("data-value-1");
    var value2 = section.getAttribute("data-value-2");

    if (window.innerWidth < 992) {
      value1 = Math.max(0.95, value1);
    }

    gsap.fromTo(
      section,
      {
        ease: "sine",
        scale: value1,
      },
      {
        scale: value2,
        scrollTrigger: {
          trigger: section,
          scrub: true,
          toggleActions: "play none none reverse",
        },
      },
    );
  });
  /* -------------------------------------------

    counters

    ------------------------------------------- */
  const numbers = document.querySelectorAll(".mil-counter");

  numbers.forEach((element) => {
    var zero = {
      val: 0,
    };
    var num = parseFloat(element.getAttribute("data-number"));
    var split = (num + "").split("."); // to cover for instances of decimals
    var decimals = split.length > 1 ? split[1].length : 0;

    gsap.to(zero, {
      val: num,
      duration: 2,
      scrollTrigger: {
        trigger: element,
        toggleActions: "play none none reverse",
      },
      onUpdate: function () {
        element.textContent = zero.val.toFixed(decimals);
      },
    });
  });
  /* -------------------------------------------

    add class

    ------------------------------------------- */
  function addClassToElement(element) {
    if (element) {
      element.classList.add("mil-added");
    }
  }

  function removeClassFromElement(element) {
    if (element) {
      element.classList.remove("mil-added");
    }
  }

  document.querySelectorAll(".mil-add-class").forEach((element) => {
    ScrollTrigger.create({
      trigger: element,
      toggleActions: "play none none reverse",
      onEnter: () => addClassToElement(element),
      onLeaveBack: () => removeClassFromElement(element),
    });
  });
  /* -------------------------------------------

    sliders

    ------------------------------------------- */
  var swiper = new Swiper(".mil-reviews-slider", {
    parallax: true,
    autoHeight: true,
    slidesPerView: 1,
    spaceBetween: 30,
    speed: 800,
    navigation: {
      prevEl: ".mil-reviews-nav .mil-prev",
      nextEl: ".mil-reviews-nav .mil-next",
    },
    on: {
      slideChangeTransitionEnd: function () {
        ScrollTrigger.refresh();
      },
    },
  });

  var swiper = new Swiper(".mil-portfolio-slider", {
    parallax: true,
    autoHeight: true,
    initialSlide: 1,
    slidesPerView: 1,
    spaceBetween: 30,
    speed: 800,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    scrollbar: {
      el: ".mil-pagination",
    },
    on: {
      slideChangeTransitionEnd: function () {
        ScrollTrigger.refresh();
      },
    },
  });

  var swiper = new Swiper(".mil-portfolio-fs-slider", {
    parallax: true,
    slidesPerView: 1,
    spaceBetween: 30,
    speed: 800,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    breakpoints: {
      992: {},
    },
    mousewheel: {
      sensitivity: 1,
    },
  });
  var swiper = new Swiper(".mil-portfolio-fs-slider-2", {
    parallax: true,
    slidesPerView: 1,
    spaceBetween: 30,
    speed: 800,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    navigation: {
      prevEl: ".mil-port-nav .mil-prev",
      nextEl: ".mil-port-nav .mil-next",
    },
    breakpoints: {
      992: {},
    },
    mousewheel: {
      sensitivity: 1,
    },
  });

  var swiper = new Swiper(".mil-store-slider", {
    parallax: true,
    slidesPerView: 1,
    spaceBetween: 30,
    speed: 800,
    breakpoints: {
      992: {},
    },
  });

  var swiper = new Swiper(".mil-about-content-slider", {
    parallax: true,
    autoHeight: true,
    slidesPerView: 1,
    spaceBetween: 30,
    speed: 800,
    scrollbar: {
      el: ".mil-about-content-pagination",
    },
    on: {
      slideChangeTransitionEnd: function () {
        ScrollTrigger.refresh();
      },
    },
  });
  /* -------------------------------------------

    progressbar

    ------------------------------------------- */

  const progressBars = document.querySelectorAll(".mil-prog");

  progressBars.forEach((progressBar) => {
    const widthPercentage = progressBar.getAttribute("data-number");
    gsap.fromTo(
      progressBar,
      {
        ease: "sine",
        width: "0%",
      },
      {
        width: `${widthPercentage}%`,
        scrollTrigger: {
          trigger: progressBar,
          toggleActions: "play none none reverse",
          once: true,
        },
        duration: 2,
        ease: "sine",
      },
    );
  });
  /* -------------------------------------------

    price

    ------------------------------------------- */
  var price = document.querySelectorAll(".mil-pricing-table-price");
  var year = document.getElementById("year");
  var month = document.getElementById("month");

  if (price.length > 0 && year && month) {
    year.addEventListener("click", function () {
      this.classList.add("mil-active");
      month.classList.remove("mil-active");
      price.forEach(function (element) {
        element.textContent = element.getAttribute("data-year-price");
      });
    });

    month.addEventListener("click", function () {
      this.classList.add("mil-active");
      year.classList.remove("mil-active");
      price.forEach(function (element) {
        element.textContent = element.getAttribute("data-month-price");
      });
    });
  }
});

// service

document.addEventListener("DOMContentLoaded", function () {
  var swiper = new Swiper(".myServiceSlider", {
    loop: true,
    speed: 800, // Tốc độ chuyển ảnh (800ms giúp cảm giác mượt, không quá nhanh)
    grabCursor: true, // Hiện con trỏ bàn tay khi rê chuột vào để báo hiệu có thể kéo
    allowTouchMove: true, // Cho phép vuốt tay/kéo chuột
    parallax: true, // Tạo hiệu ứng chiều sâu khi trượt nếu cần

    autoplay: {
      delay: 3000,
      disableOnInteraction: false, // QUAN TRỌNG: Vuốt tay xong nó vẫn tự chạy tiếp
      pauseOnMouseEnter: true, // Dừng lại một chút khi khách rê chuột vào xem
    },

    // Thay đổi hiệu ứng từ 'fade' sang 'slide' để thấy rõ chuyển động trượt bằng tay
    effect: "slide",

    // Cấu hình lực quán tính khi vuốt tay
    touchRatio: 1,
    touchAngle: 45,
    resistanceRatio: 0.5,

    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true, // Các chấm nhỏ dần trông rất hiện đại
    },
  });
});
document.addEventListener("DOMContentLoaded", function () {
  new Swiper(".mil-blog-slider", {
    slidesPerView: 1,
    spaceBetween: 30,
    speed: 800,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    pagination: {
      el: ".mil-slider-pagination",
      clickable: true,
    },
    breakpoints: {
      // Khi màn hình >= 992px (Desktop)
      992: {
        slidesPerView: 2,
      },
    },
  });
});

//------------------LANG-------------------
// Hàm chính để tải và áp dụng ngôn ngữ
async function changeLanguage(lang) {
  try {
    // 1. Tải file JSON tương ứng (đảm bảo thư mục lang nằm cùng cấp với thư mục js hoặc ở thư mục gốc)
    const response = await fetch(`./lang/${lang}.json`);

    // Kiểm tra xem file có tồn tại không
    if (!response.ok) {
      throw new Error(`Không thể tải file: ./lang/${lang}.json`);
    }

    const translations = await response.json();

    // 2. Lưu ngôn ngữ người dùng vừa chọn vào bộ nhớ trình duyệt
    // Để khi họ bấm sang trang Giới thiệu, Liên hệ... web vẫn nhớ là đang dùng Tiếng Anh hay Việt
    localStorage.setItem("site_lang", lang);

    // 3. Cập nhật thẻ <html lang="vi/en"> phục vụ cho SEO và trình duyệt
    document.documentElement.lang = lang;

    // 4. Quét toàn bộ trang web để tìm các thẻ có thuộc tính data-i18n và thay chữ
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.getAttribute("data-i18n");

      // Nếu tìm thấy key này trong file JSON
      if (translations[key]) {
        // Dùng innerHTML thay vì textContent để các thẻ HTML bên trong JSON (như <br />) hoạt động được
        element.innerHTML = translations[key];
      }
    });

    // 5. Cập nhật giao diện của 2 nút VN / EN (thêm class 'active' cho nút đang được chọn)
    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.classList.remove("active"); // Xóa class active ở tất cả các nút
    });

    const activeBtn = document.getElementById(`btn-lang-${lang}`);
    if (activeBtn) {
      activeBtn.classList.add("active"); // Thêm class active vào nút của ngôn ngữ hiện tại
    }
  } catch (error) {
    console.error("Lỗi hệ thống đa ngôn ngữ:", error);
  }
}

// 6. Sự kiện chạy tự động ngay khi trình duyệt vừa load xong file HTML
document.addEventListener("DOMContentLoaded", () => {
  // Tìm xem trước đó người dùng đã chọn ngôn ngữ nào chưa, nếu chưa thì mặc định là 'vi'
  const savedLang = localStorage.getItem("site_lang") || "vi";

  // Gọi hàm đổi ngôn ngữ
  changeLanguage(savedLang);
});
const topPanel = document.querySelector(".mil-top-panel");

window.addEventListener("scroll", function () {
  if (window.scrollY > 50) {
    topPanel.classList.add("scrolled");
  } else {
    topPanel.classList.remove("scrolled");
  }
});
//----------------------------LOGO WINGS AND HEADER
const header = document.querySelector(".mil-top-panel");
const logo = document.getElementById("header-logo");

if (header && logo) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");

      if (!logo.src.includes("logo-wings-blue.png")) {
        logo.style.opacity = "0";

        setTimeout(() => {
          logo.src = "./img/logos/logo-wings-blue.png";
          logo.style.opacity = "1";
        }, 150);
      }
    } else {
      header.classList.remove("scrolled");

      if (!logo.src.includes("logo-wings-white.png")) {
        logo.style.opacity = "0";

        setTimeout(() => {
          logo.src = "./img/logos/logo-wings-white.png";
          logo.style.opacity = "1";
        }, 150);
      }
    }
  });
}
//------------------------- SIGNATURE PROJECT///
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".counter");

  // Hàm định dạng số (thêm dấu chấm ở hàng nghìn)
  const formatNumber = (num, needPadding) => {
    let formatted = num.toLocaleString("vi-VN");
    // Nếu cần thêm số 0 ở đầu (cho số < 10)
    if (needPadding && num < 10) {
      formatted = "0" + formatted;
    }
    return formatted;
  };

  const runCounter = (counter) => {
    const target = +counter.getAttribute("data-target");
    const needPadding = counter.getAttribute("data-pad") === "true"; // Kiểm tra xem có cần số 0 ở đầu không
    const duration = 2500; // 2.5 giây để số chạy chậm và mượt hơn

    let startTimestamp = null;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;

      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const currentNum = Math.floor(progress * target);

      counter.innerText = formatNumber(currentNum, needPadding);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        counter.innerText = formatNumber(target, needPadding);
      }
    };

    window.requestAnimationFrame(step);
  };

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        runCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  counters.forEach((counter) => {
    observer.observe(counter);
  });
});

// ///////////////////////////////////////
