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
  data: {
    hideSubmenu: () => void;
    timeout: number;
    timeoutHideSubmenu: number;
    showSubmenu: () => void;
  };
};
const nodes = document.querySelectorAll<SubmenuButton>("nav>button");
const openSubMenus: Element[] = [];
nodes.forEach((node) => {
  const possibleSubMenu = node.nextElementSibling as HTMLDivElement;
  if (
    possibleSubMenu &&
    possibleSubMenu.tagName === "DIV" &&
    possibleSubMenu.classList.contains("sub-menu")
  ) {
    node.data = {
      timeout: 0,
      timeoutHideSubmenu: 0,
      hideSubmenu: () => {
        clearTimeout(node.data.timeout);
        clearTimeout(node.data.timeoutHideSubmenu);
        node.data.timeout = setTimeout(() => {
          node.classList.remove("fade-in-submenu");
          node.classList.remove("show-button-arrow");
        }, 250);
        node.data.timeoutHideSubmenu = setTimeout(() => {
          node.classList.remove("show-submenu");
          possibleSubMenu.style.left = "";
        }, 500);
      },
      showSubmenu: () => {
        if (
          possibleSubMenu.classList.contains("one-col") &&
          document.body.getBoundingClientRect().width > 800
        ) {
          possibleSubMenu.style.left =
            node.getBoundingClientRect().x +
            node.getBoundingClientRect().width / 2 +
            "px";
        }
        node.classList.add("show-submenu");
        clearTimeout(node.data.timeout);
        clearTimeout(node.data.timeoutHideSubmenu);
        node.data.timeout = setTimeout(() => {
          node.classList.add("fade-in-submenu");
          node.classList.add("show-button-arrow");
        }, 20);
      },
    };

    node.classList.add("has-sub-menu");
    // The button at this points has a subMenu
    node.addEventListener("click", function () {
      node.classList.toggle("open");
    });

    node.addEventListener("mouseover", node.data.showSubmenu);

    node.addEventListener("mouseout", node.data.hideSubmenu);
    possibleSubMenu.addEventListener("mouseover", node.data.showSubmenu);
    possibleSubMenu.addEventListener("mouseout", node.data.hideSubmenu);
  }
});
