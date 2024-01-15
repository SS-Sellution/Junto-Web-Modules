window.addEventListener("scroll", function () {
  var header = document.querySelector("header");
  if (header) {
    if (window.scrollY > 0) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }
});

const hamburgerMenu = document.querySelector(".hamburger-menu");
hamburgerMenu?.addEventListener("click", function () {
  document.body.classList.toggle("menu-open");
});

const nodes = document.querySelectorAll("nav>button");
const groups = {};
nodes.forEach((node) => {
  const possibleSubMenu = node.nextElementSibling;
  if (
    possibleSubMenu &&
    possibleSubMenu.tagName === "DIV" &&
    possibleSubMenu.classList.contains("sub-menu")
  ) {
    // The button at this points has a subMenu
    node.addEventListener("click", function () {
      node.classList.toggle("open");
    });
  }
});
