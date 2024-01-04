import { SplideClass } from "./splide.min.js";
import { API_URL } from "./contstants.js";

const splide = new SplideClass(".splide", {
  type: "loop",
  perPage: 3,
  perMove: 3,
  gap: 24,
  arrows: false,
  breakpoints: {
    800: {
      perPage: 2,
      perMove: 1,
      gap: 16,
    },
    400: {
      perPage: 1,
      perMove: 1,
      gap: 16,
      pagination: false,
    },
  },
});
splide.mount();

const startDetailsNode = () => {
  const nodes = document.querySelectorAll("details");
  const groups: Record<string, HTMLDetailsElement[]> = {};
  nodes.forEach((node) => {
    const groupName = node.getAttribute("data-details-group");
    if (groupName) {
      let group = groups[groupName];
      group = group ? group : [];
      groups[groupName] = group;
      group.push(node);

      node.addEventListener("click", function (event) {
        group?.forEach((element) => {
          if (element !== node) {
            element.open = false;
          }
        });

        if (node.open) {
          event.preventDefault();
        }
      });
    }
  });
  console.log(groups);
};

const start = () => {
  startDetailsNode();
};

window.addEventListener("DOMContentLoaded", start);

console.log(API_URL);
