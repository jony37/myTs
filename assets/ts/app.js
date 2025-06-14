"use strict";
window.addEventListener("DOMContentLoaded", function () {
    // loader
    function Loader() {
        let loderDiv = document.querySelector(".loader");
        setTimeout(() => {
            loderDiv === null || loderDiv === void 0 ? void 0 : loderDiv.classList.add("remove");
        }, 2000);
    }
    Loader();
    // navbar
    const header = document.querySelector("header"), navBar = document.querySelector("nav");
    window.addEventListener("scroll", function () {
        if (window.scrollY >= 30) {
            navBar === null || navBar === void 0 ? void 0 : navBar.classList.add("active");
        }
        else {
            navBar === null || navBar === void 0 ? void 0 : navBar.classList.remove("active");
        }
    });
    //   carusel
    const nextBtn = document.querySelector(".next");
    const prevBtn = document.querySelector(".prev");
    const items = document.querySelectorAll(".carousel-item");
    const carousel = document.querySelector(".carousel");
    const track = document.querySelector(".carousel-track"); // обязательно добавь этот класс
    let currentIndex = 0;
    let autoScroll = setInterval(() => changeSlide(1), 7000);
    function changeSlide(direction) {
        currentIndex = (currentIndex + direction + items.length) % items.length;
        const itemWidth = items[0].offsetWidth;
        track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    }
    [prevBtn, nextBtn].forEach((btn, i) => {
        btn.addEventListener("click", () => {
            clearInterval(autoScroll);
            changeSlide(i === 0 ? -1 : 1);
            autoScroll = setInterval(() => changeSlide(1), 7000);
        });
    });
    carousel.addEventListener("mouseenter", () => clearInterval(autoScroll));
    carousel.addEventListener("mouseleave", () => {
        autoScroll = setInterval(() => changeSlide(1), 7000);
    });
    window.addEventListener("resize", () => changeSlide(0));
    // tab
    const tabs = document.querySelectorAll(".tab"), contents = document.querySelectorAll(".content"), firsTab = document.querySelector(".cards-wrapper"), SecondTab = document.querySelector(".sertificat-divs");
    tabs[0].classList.add("active");
    contents[0].classList.add("active");
    tabs.forEach((tab, index) => {
        tab.addEventListener("click", () => {
            tabs.forEach((t) => t.classList.remove("active"));
            contents.forEach((c) => c.classList.remove("active"));
            tab.classList.add("active");
            contents[index].classList.add("active");
        });
    });
    const container = document.querySelector(".card-bg");
    fetch("./assets/jsons/app.json")
        .then((response) => response.json())
        .then((data) => {
        data.forEach((items) => {
            const div = document.createElement("div");
            div.className = "card";
            div.innerHTML = `
        <a href = ${items.link}>
            <div class="card-img">
                <img src= ${items.image} alt="">
            </div>
            <div class="card-content">
                <h1 class="color">${items.title}</h1>
                <p class="subtitle">${items.subtitle}</p>
                <p>leve demo</p>
            </div>
        </a>
            `;
            container === null || container === void 0 ? void 0 : container.appendChild(div);
        });
    });
    const sertificatDivs = document.querySelector(".sertificat-divs");
    fetch("./assets/jsons/sertificat.json")
        .then((response) => response.json())
        .then((data) => {
        data.forEach((items) => {
            const sertImg = document.createElement("div");
            sertImg.className = "sertificat-img";
            sertImg.innerHTML = `
                <img src= ${items.src} alt="">
            `;
            sertificatDivs.appendChild(sertImg);
        });
    });
    const cardContent = document.querySelector(".content-cards");
    fetch("./assets/jsons/image.json")
        .then((response) => response.json())
        .then((data) => {
        data.forEach((images) => {
            const contentCard = document.createElement("div");
            contentCard.className = "content-card";
            contentCard.innerHTML = `
                <div class="content-cards__img">
                    <img src= ${images.src} alt="">
                </div>
                <p>${images.title}</p>
            `;
            cardContent.appendChild(contentCard);
        });
    });
    // Get in Touch
    const name = document.querySelector("#name"), email = document.querySelector("#email"), message = document.querySelector("#message"), form = document.querySelector("form"), response = document.querySelector(".response");
    function showMessage(text, isError = false) {
        const h1 = document.createElement("h1");
        h1.innerHTML = text;
        response.appendChild(h1);
        response.classList.toggle("error", isError);
        response.classList.add("show");
        setTimeout(() => {
            response.classList.remove("show");
        }, 3000);
    }
    function sendEmail() {
        const parms = {
            name: name.value,
            email: email.value,
            message: message.value,
        };
        emailjs
            .send("service_ggarkcc", "template_hopz0q7", parms)
            .then(() => {
            response.innerHTML = "Message sent successfully!";
            response.classList.add("sucses");
            form.reset(); // очистка формы после отправки
        })
            .catch((err) => alert("Error sending message: " + err.text));
    }
    form.addEventListener("submit", function (e) {
        e.preventDefault(); // предотвращает перезагрузку страницы
        sendEmail();
    });
});
