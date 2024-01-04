import { SplideClass } from "./splide.min.js";
import { startDetailsNodeGroups } from "./detailsGroup/detailsGroups.js";

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

const start = () => {
  startDetailsNodeGroups();
};

window.addEventListener("DOMContentLoaded", start);
