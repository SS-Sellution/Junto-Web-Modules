window.addEventListener("scroll",function(){var e=document.querySelector("menu");e&&(window.scrollY>0?e.classList.add("scrolled"):e.classList.remove("scrolled"))});const i=document.querySelector(".hamburger-menu");i?.addEventListener("click",function(){document.body.classList.toggle("menu-open")});console.log(i);const a=document.querySelectorAll("nav>button"),u=[];a.forEach(e=>{const t=e.nextElementSibling;t&&t.tagName==="DIV"&&t.classList.contains("sub-menu")&&(e.data={timeout:0,timeoutHideSubmenu:0,hideSubmenu:s=>{clearTimeout(e.data.timeout),clearTimeout(e.data.timeoutHideSubmenu),s===!0?(e.classList.remove("fade-in-submenu"),e.classList.remove("show-button-arrow"),e.classList.remove("show-submenu"),t.style.left=""):(e.data.timeout=setTimeout(()=>{e.classList.remove("fade-in-submenu"),e.classList.remove("show-button-arrow")},250),e.data.timeoutHideSubmenu=setTimeout(()=>{e.classList.remove("show-submenu"),t.style.left=""},500))},showSubmenu:()=>{t.classList.contains("one-col")&&document.body.getBoundingClientRect().width>800&&(t.style.left=e.getBoundingClientRect().x+e.getBoundingClientRect().width/2+"px"),e.classList.add("show-submenu"),clearTimeout(e.data.timeout),clearTimeout(e.data.timeoutHideSubmenu),e.data.timeout=setTimeout(()=>{e.classList.add("fade-in-submenu"),e.classList.add("show-button-arrow")},20),u.forEach(s=>{s!==e&&s.data.hideSubmenu(!0)})}},e.addEventListener("click",function(){e.classList.toggle("open")}),e.addEventListener("mouseover",e.data.showSubmenu),e.addEventListener("mouseout",e.data.hideSubmenu),t.addEventListener("mouseover",e.data.showSubmenu),t.addEventListener("mouseout",e.data.hideSubmenu),u.push(e))});