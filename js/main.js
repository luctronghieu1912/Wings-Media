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
  // Chạy thẳng luôn, không cần bọc trong document.addEventListener("DOMContentLoaded", ...)
  const accordionMenus = document.querySelectorAll(".mil-accordion-menu");

  accordionMenus.forEach((menu) => {
    menu.addEventListener("click", function (e) {
      e.preventDefault();

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
        y: 100, // Tăng từ 60 -> 100
        scale: 0.9, // Giảm từ 0.96 -> 0.9
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2, // Thêm duration
        ease: "power3.out", // Đổi ease
        scrollTrigger: {
          trigger: section,
          start: "top 85%", // Bắt đầu sớm hơn
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

  /* -------------------------------------------

    progressbar

    ------------------------------------------- */

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
// SOLUTION RIGHT
var solutionToggles = document.querySelectorAll(".solution-toggle");

solutionToggles.forEach(function (btn) {
  btn.addEventListener("click", function () {
    var wrap = btn.nextElementSibling;
    var isOpen = btn.getAttribute("aria-expanded") === "true";

    // Đóng các mục khác đang mở trước khi mở mục vừa bấm
    solutionToggles.forEach(function (otherBtn) {
      if (
        otherBtn !== btn &&
        otherBtn.getAttribute("aria-expanded") === "true"
      ) {
        otherBtn.setAttribute("aria-expanded", "false");
        var otherWrap = otherBtn.nextElementSibling;
        if (otherWrap) {
          otherWrap.style.maxHeight = null;
        }
      }
    });

    // Toggle mục vừa bấm (mở nếu đang đóng, đóng nếu đang mở)
    btn.setAttribute("aria-expanded", String(!isOpen));

    if (!isOpen) {
      wrap.style.maxHeight = wrap.scrollHeight + "px";
    } else {
      wrap.style.maxHeight = null;
    }
  });
});

/* -------------------------------------------
 
    press slider (Đôi Cánh trên báo chí) — Embla Carousel
 
    ------------------------------------------- */
var pressEmblaNode = document.querySelector(".mil-press-embla");

if (pressEmblaNode && typeof EmblaCarousel !== "undefined") {
  var pressViewport = pressEmblaNode.querySelector(".embla__viewport");

  var pressAutoplay =
    typeof EmblaCarouselAutoplay !== "undefined"
      ? EmblaCarouselAutoplay({
          delay: 2500,
          stopOnMouseEnter: true, // dừng khi hover
          stopOnInteraction: false, // kéo xong tự chạy tiếp
        })
      : undefined;

  var pressEmbla = EmblaCarousel(
    pressViewport,
    {
      loop: true,
      align: "start",
      dragFree: false,
      containScroll: "trimSnaps",
    },
    pressAutoplay ? [pressAutoplay] : [],
  );

  /* Con trỏ "grab/grabbing" khi kéo */
  pressEmbla.on("pointerDown", function () {
    pressViewport.classList.add("is-dragging");
  });
  pressEmbla.on("pointerUp", function () {
    pressViewport.classList.remove("is-dragging");
  });
}
