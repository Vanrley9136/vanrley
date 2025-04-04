"use strict";

const elementToggleFunc = function (elem) { elem.classList.toggle("active"); };

const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

const testimonialsModalFunc = function () {
    modalContainer.classList.toggle("active");
    overlay.classList.toggle("active");
};

for (let i = 0; i < testimonialsItem.length; i++) {
    testimonialsItem[i].addEventListener("click", function () {
        modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
        modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
        modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
        modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
        testimonialsModalFunc();
    });
}

modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");
const projectList = document.querySelector(".project-list");
const noProjects = document.querySelector(".no-projects");

select.addEventListener("click", function () { elementToggleFunc(this); });

for (let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener("click", function () {
        let selectedValue = this.innerText.toLowerCase();
        selectValue.innerText = this.innerText;
        elementToggleFunc(select);
        filterFunc(selectedValue);
    });
}

const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
    let hasVisibleProjects = false;
    for (let i = 0; i < filterItems.length; i++) {
        if (selectedValue === "todos" || selectedValue === "all") {
            filterItems[i].classList.add("active");
        } else if (filterItems[i].dataset.category === selectedValue) {
            filterItems[i].classList.add("active");
        } else {
            filterItems[i].classList.remove("active");
        }
        if (filterItems[i].classList.contains("active")) {
            hasVisibleProjects = true;
        }
    }
    // Exibe a mensagem se não houver projetos visíveis
    noProjects.style.display = hasVisibleProjects ? "none" : "block";
};

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

const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener("input", function () {
        if (form.checkValidity()) {
            formBtn.removeAttribute("disabled");
        } else {
            formBtn.setAttribute("disabled", "");
        }
    });
}

const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

for (let i = 0; i < navigationLinks.length; i++) {
    navigationLinks[i].addEventListener("click", function () {
        const targetPage = this.innerHTML.toLowerCase().trim();

        for (let j = 0; j < pages.length; j++) {
            const pageData = pages[j].dataset.page;
            if (targetPage === pageData) {
                pages[j].classList.add("active");
            } else {
                pages[j].classList.remove("active");
            }
        }

        for (let k = 0; k < navigationLinks.length; k++) {
            navigationLinks[k].classList.remove("active");
        }
        this.classList.add("active");
        window.scrollTo(0, 0);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const skillsItems = document.querySelectorAll(".skills-item");
    const options = {
        threshold: 0.5
    };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressFill = entry.target.querySelector(".skill-progress-fill");
                const skillPercentage = entry.target.querySelector("data").value;
                progressFill.style.width = skillPercentage + "%";
                observer.unobserve(entry.target);
            }
        });
    }, options);
    skillsItems.forEach(item => {
        observer.observe(item);
    });

    // Verifica se há projetos visíveis ao carregar a página
    const filterItems = document.querySelectorAll("[data-filter-item]");
    let hasVisibleProjects = false;
    for (let i = 0; i < filterItems.length; i++) {
        if (filterItems[i].classList.contains("active")) {
            hasVisibleProjects = true;
            break;
        }
    }
    noProjects.style.display = hasVisibleProjects || filterItems.length > 0 ? "none" : "block";

    // Inicializar com "Home" ativo
    navigationLinks[0].classList.add("active");
    pages[0].classList.add("active");
});

const circle = document.querySelector('#circle');
document.addEventListener('mousemove', e => {
    const mouseX = e.pageX - 30;
    const mouseY = e.pageY - 30;
    circle.style.left = `${mouseX}px`;
    circle.style.top = `${mouseY}px`;
});

// Função para calcular a idade dinamicamente
function calculateAge(birthDate) {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    return age;
}

// Definir a data de nascimento (atualize aqui se mudar)
const birthDate = "2000-12-11"; // Formato: YYYY-MM-DD, atualize esta linha se a data de nascimento mudar
document.getElementById("age").textContent = calculateAge(birthDate);