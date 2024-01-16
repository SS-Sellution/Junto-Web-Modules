import { SplideClass } from "./splide.min.js";
import { startDetailsNodeGroups } from "./detailsGroup/detailsGroups.js";
import { Timeline } from "./ozine/Timeline.js";

import "./topMenu/index.js";

const timeline = new Timeline({
  duration: 1000,
});

document.body.onmouseover = function () {
  timeline.play();
};
document.body.onmouseout = function () {
  timeline.reverse(1000);
};

const splide = new SplideClass("#home-slider", {
  type: "loop",
  flickMaxPages: 1,
  perPage: 3,
  perMove: 3,
  gap: 24,
  arrows: false,
  arrowPath: "m13.5 7.01 13 13m-13 13 13-13",
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

const testimonials = new SplideClass("#testimonials-slider", {
  arrowPath: "m13.5 7.01 13 13m-13 13 13-13",
  autoplay: true,
  pauseOnHover: true,
  pauseOnFocus: true,
  type: "loop",
  flickMaxPages: 1,
  perPage: 1,
  perMove: 1,
  gap: 24,
  arrows: true,
});
testimonials.mount();

const start = () => {
  startDetailsNodeGroups();
};

window.addEventListener("DOMContentLoaded", start);
