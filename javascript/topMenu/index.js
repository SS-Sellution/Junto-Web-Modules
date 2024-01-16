"use strict";
window.addEventListener("scroll", function () {
    var header = document.querySelector("header");
    if (header) {
        if (window.scrollY > 0) {
            header.classList.add("scrolled");
        }
        else {
            header.classList.remove("scrolled");
        }
    }
});
const hamburgerMenu = document.querySelector(".hamburger-menu");
hamburgerMenu === null || hamburgerMenu === void 0 ? void 0 : hamburgerMenu.addEventListener("click", function () {
    document.body.classList.toggle("menu-open");
});
const nodes = document.querySelectorAll("nav>button");
const openSubMenus = [];
nodes.forEach((node) => {
    const possibleSubMenu = node.nextElementSibling;
    if (possibleSubMenu &&
        possibleSubMenu.tagName === "DIV" &&
        possibleSubMenu.classList.contains("sub-menu")) {
        node.data = {
            timeout: 0,
            hideSubmenu: () => {
                clearTimeout(node.data.timeout);
                node.data.timeout = setTimeout(() => node.classList.remove("mouse-over"), 500);
            },
            showSubmenu: () => {
                clearTimeout(node.data.timeout);
                node.data.timeout = setTimeout(() => node.classList.add("mouse-over"), 20);
            },
        };
        node.classList.add("has-sub-menu");
        // The button at this points has a subMenu
        node.addEventListener("click", function () {
            node.classList.toggle("open");
        });
        node.addEventListener("mouseover", node.data.showSubmenu);
        node.addEventListener("mouseout", node.data.hideSubmenu);
    }
});
