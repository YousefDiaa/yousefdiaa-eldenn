'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// Fix #2 — safe modal click with null-check
for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {

    const avatarEl = this.querySelector("[data-testimonials-avatar]");
    if (avatarEl && modalImg) {
      modalImg.src = avatarEl.src;
      modalImg.alt = avatarEl.alt;
    }

    if (modalTitle) modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    if (modalText)  modalText.innerHTML  = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();
  });
}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

if (select) {
  select.addEventListener("click", function () { elementToggleFunc(this); });

  // add event in all select items
  for (let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener("click", function () {

      let selectedValue = this.innerText.toLowerCase();
      selectValue.innerText = this.innerText;
      elementToggleFunc(select);
      filterFunc(selectedValue);

    });
  }

  // filter variables
  const filterItems = document.querySelectorAll("[data-filter-item]");

  const filterFunc = function (selectedValue) {
    // strip count badge text from the selected value (e.g. "all 7" → "all")
    const cleanValue = selectedValue.replace(/\s*\d+\s*$/, '').trim();

    for (let i = 0; i < filterItems.length; i++) {
      if (cleanValue === "all") {
        filterItems[i].classList.add("active");
      } else if (cleanValue === filterItems[i].dataset.category) {
        filterItems[i].classList.add("active");
      } else {
        filterItems[i].classList.remove("active");
      }
    }
  }

  // add event in all filter button items for large screen
  if (filterBtn.length > 0) {
    let lastClickedBtn = filterBtn[0];

    for (let i = 0; i < filterBtn.length; i++) {
      filterBtn[i].addEventListener("click", function () {

        let selectedValue = this.innerText.toLowerCase();
        selectValue.innerText = this.innerText;
        filterFunc(selectedValue);

        lastClickedBtn.classList.remove("active");
        this.classList.add("active");
        lastClickedBtn = this;

      });
    }
  }
}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}



// CV functionality
const cvDownloadBtn = document.querySelector("#cvDownloadBtn");
const cvObject = document.querySelector("#cvFrame");

// Set the CV file path
const cvFilePath = "./assets/CV.pdf";
if (cvObject && cvObject.tagName === 'OBJECT') {
  cvObject.data = cvFilePath;
}

// Add download functionality
if (cvDownloadBtn) {
  cvDownloadBtn.addEventListener("click", function () {
    const link = document.createElement("a");
    link.href = cvFilePath;
    link.download = "Yousef_Diaa_El_Denn_CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
}



// Fix #11 — Back to top button
const backToTopBtn = document.querySelector("#backToTop");

if (backToTopBtn) {
  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add("visible");
    } else {
      backToTopBtn.classList.remove("visible");
    }
  });

  backToTopBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}



// Fix #12 — Scroll-reveal for timeline items using IntersectionObserver
const revealItems = document.querySelectorAll(".timeline-item");

revealItems.forEach(item => item.classList.add("reveal"));

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));
} else {
  // fallback for older browsers — show all immediately
  document.querySelectorAll(".reveal").forEach(el => el.classList.add("visible"));
}



// Fix #6 — Typing animation for sidebar name
const typedNameEl = document.getElementById("typed-name");

if (typedNameEl) {
  const fullName = typedNameEl.textContent;
  typedNameEl.textContent = "";

  // Add blinking cursor
  const cursor = document.createElement("span");
  cursor.className = "typing-cursor";
  typedNameEl.appendChild(cursor);

  let charIndex = 0;

  function typeChar() {
    if (charIndex < fullName.length) {
      typedNameEl.insertBefore(document.createTextNode(fullName[charIndex]), cursor);
      charIndex++;
      setTimeout(typeChar, 80);
    }
    // cursor keeps blinking after typing is done
  }

  // Start typing after a short delay on page load
  setTimeout(typeChar, 600);
}