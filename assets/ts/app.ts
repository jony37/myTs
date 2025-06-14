window.addEventListener("DOMContentLoaded", function () {
  // loader
  function Loader(): void {
    let loderDiv = document.querySelector(".loader");
    setTimeout(() => {
      loderDiv?.classList.add("remove");
    }, 2000);
  }
  Loader();

  // navbar
  const header = document.querySelector("header") as HTMLElement,
    navBar = document.querySelector("nav") as HTMLElement;

  window.addEventListener("scroll", function () {
    if (window.scrollY >= 30) {
      navBar?.classList.add("active");
    } else {
      navBar?.classList.remove("active");
    }
  });

  //   carusel
  const nextBtn = document.querySelector(".next") as HTMLButtonElement;
  const prevBtn = document.querySelector(".prev") as HTMLButtonElement;
  const items = document.querySelectorAll(
    ".carousel-item"
  ) as NodeListOf<HTMLElement>;
  const carousel = document.querySelector(".carousel") as HTMLElement;
  const track = document.querySelector(".carousel-track") as HTMLElement; // обязательно добавь этот класс

  let currentIndex = 0;
  let autoScroll = setInterval(() => changeSlide(1), 7000);

  function changeSlide(direction: number): void {
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
  const tabs: NodeListOf<HTMLElement> = document.querySelectorAll(".tab"),
    contents = document.querySelectorAll(".content"),
    firsTab = document.querySelector(".cards-wrapper") as HTMLElement,
    SecondTab = document.querySelector(".sertificat-divs") as HTMLElement;

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

  //   Card section
  type CardData = {
    link: string;
    title: string;
    subtitle: string;
    image: string;
  };

  const container = document.querySelector(".card-bg") as HTMLElement;

  fetch("./assets/jsons/app.json")
    .then((response) => response.json())
    .then((data: CardData[]) => {
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

        container?.appendChild(div);
      });
    });

  // sertifiat
  type SertifiatData = {
    src: string;
  };

  const sertificatDivs = document.querySelector(
    ".sertificat-divs"
  ) as HTMLElement;

  fetch("./assets/jsons/sertificat.json")
    .then((response) => response.json())
    .then((data: SertifiatData[]) => {
      data.forEach((items) => {
        const sertImg = document.createElement("div");
        sertImg.className = "sertificat-img";

        sertImg.innerHTML = `
                <img src= ${items.src} alt="">
            `;

        sertificatDivs.appendChild(sertImg);
      });
    });

  // Tech stack
  type ImagesData = {
    src: string;
    title: string;
  };

  const cardContent = document.querySelector(".content-cards") as HTMLElement;

  fetch("./assets/jsons/image.json")
    .then((response) => response.json())
    .then((data: ImagesData[]) => {
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
  const name = document.querySelector("#name") as HTMLInputElement,
    email = document.querySelector("#email") as HTMLInputElement,
    message = document.querySelector("#message") as HTMLTextAreaElement,
    form = document.querySelector("form") as HTMLFormElement,
    response = document.querySelector(".response") as HTMLElement;

  function showMessage(text: string, isError = false) {
    const h1 = document.createElement("h1");
    h1.innerHTML = text;
    response.appendChild(h1);
    response.classList.toggle("error", isError);
    response.classList.add("show");

    setTimeout(() => {
      response.classList.remove("show");
    }, 3000);
  }

  function sendEmail(): void {
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
