import Splide from "@splidejs/splide";
import { API_URL } from "./contstants";

new Splide(".splide").mount();

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

alert(API_URL);
