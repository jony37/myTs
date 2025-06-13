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
    // navbar bg
    const header = document.querySelector("header"), navBar = document.querySelector("nav");
    window.addEventListener("scroll", function () {
        if (window.scrollY >= 30) {
            navBar === null || navBar === void 0 ? void 0 : navBar.classList.add("active");
        }
        else {
            navBar === null || navBar === void 0 ? void 0 : navBar.classList.remove("active");
        }
    });
});
