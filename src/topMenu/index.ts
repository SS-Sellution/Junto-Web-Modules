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

type SubmenuButton = HTMLButtonElement & {
  data: { hideSubmenu: () => void; timeout: number; showSubmenu: () => void };
};
const nodes = document.querySelectorAll<SubmenuButton>("nav>button");
const openSubMenus: Element[] = [];
nodes.forEach((node) => {
  const possibleSubMenu = node.nextElementSibling;
  if (
    possibleSubMenu &&
    possibleSubMenu.tagName === "DIV" &&
    possibleSubMenu.classList.contains("sub-menu")
  ) {
    node.data = {
      timeout: 0,
      hideSubmenu: () => {
        clearTimeout(node.data.timeout);
        node.data.timeout = setTimeout(
          () => node.classList.remove("mouse-over"),
          500
        );
      },
      showSubmenu: () => {
        clearTimeout(node.data.timeout);
        node.data.timeout = setTimeout(
          () => node.classList.add("mouse-over"),
          20
        );
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
