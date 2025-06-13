window.addEventListener("DOMContentLoaded", function () {
  // loader
  function Loader(): void {
    let loderDiv = document.querySelector(".loader");
    setTimeout(() => {
      loderDiv?.classList.add("remove");
    }, 2000);
  }
  Loader();

  // navbar bg
  const header = document.querySelector("header") as HTMLElement,
    navBar = document.querySelector("nav") as HTMLElement;

  window.addEventListener("scroll", function () {
    if (window.scrollY >= 30) {
      navBar?.classList.add("active");
    } else {
      navBar?.classList.remove("active");
    }
  });
});
