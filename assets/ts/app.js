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
    const h1 = document.createElement("h1");
    function showMessage(text, isError = false) {
        h1.innerHTML = text;
        response.appendChild(h1);
        response.classList.toggle("error", isError);
        response.classList.add("sucses");
        setTimeout(() => {
            response.classList.remove("sucses");
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
            showMessage("Message sent successfully!");
            form.reset();
        })
            .catch((err) => {
            showMessage("Ошибка при отправке: " + err.text, true);
        });
    }
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        sendEmail();
    });
    // Coment section
    const photoInput = document.getElementById("photo-input");
    const photoPreview = document.getElementById("photo-preview");
    const previewImg = document.getElementById("preview-img");
    const removePhotoBtn = document.getElementById("remove-photo");
    photoInput.addEventListener("change", function () {
        var _a;
        const file = (_a = this.files) === null || _a === void 0 ? void 0 : _a[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                var _a;
                previewImg.src = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
                photoPreview.classList.remove("hidden");
            };
            reader.readAsDataURL(file);
        }
    });
    removePhotoBtn.addEventListener("click", function () {
        previewImg.src = "";
        photoInput.value = "";
        photoPreview.classList.add("hidden");
    });
    let uploadedImageBase64 = "";
    photoInput.addEventListener("change", function () {
        var _a;
        const file = (_a = this.files) === null || _a === void 0 ? void 0 : _a[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                var _a;
                uploadedImageBase64 = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result; // Сохраняем base64
                previewImg.src = uploadedImageBase64;
                photoPreview.classList.remove("hidden");
            };
            reader.readAsDataURL(file);
        }
    });
    console.log(uploadedImageBase64);
    const PersonsName = document.querySelector("#coment-name"), PersonMessage = document.querySelector("#coment-message"), PersonPhoto = document.querySelector("#preview-img"), postBtn = document.querySelector(".post-btn"), commentsContainer = document.querySelector(".all-coment"), commentsLengthEl = document.querySelector(".coments-lenght");
    const defaultUserImage = "./assets/img/Photo.png";
    let comments = [];
    function renderComments() {
        commentsContainer.innerHTML = "";
        comments.forEach(({ name, message, image, time }) => {
            const div = document.createElement("div");
            div.className = "comentariya-div d-flex";
            div.innerHTML = `
      <div class="comentariya-div__img d-flex">
          <img src="${image}" alt="User Photo">
      </div>
      <div style="margin-left: 14px;">
          <p class="coment-name">${name} <span class="time">${time}</span></p>
          <p class="coment-message">${message}</p>
      </div>
    `;
            commentsContainer.appendChild(div);
        });
        commentsLengthEl.textContent = comments.length.toString();
    }
    function loadComments() {
        const saved = localStorage.getItem("comments");
        if (saved) {
            comments = JSON.parse(saved);
            renderComments();
        }
    }
    function saveComments() {
        localStorage.setItem("comments", JSON.stringify(comments));
    }
    postBtn.addEventListener("click", () => {
        const name = PersonsName.value.trim();
        const message = PersonMessage.value.trim();
        const image = PersonPhoto.src || defaultUserImage;
        if (!name || !message) {
            alert("Введите имя и сообщение.");
            return;
        }
        const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        const newComment = { name, message, image, time };
        comments.push(newComment);
        saveComments();
        renderComments();
        PersonsName.value = "";
        PersonMessage.value = "";
        PersonPhoto.src = defaultUserImage;
    });
    loadComments();
});
