import"./hoisted.9yYLbhf1.js";const m={cloneTemplate:({element:t})=>{if(!("content"in t))throw new Error("Node is not a template element.");const c=t.content.cloneNode(!0);return m.DOM(c)},DOM:t=>{const c={element:t};return function s(u,e,n){for(let o=0;o<u.children.length;o++){const r=u.children[o],a=r.getAttribute("ozine-ref"),f=r.getAttribute("ozine-data");let l=n;if(f)try{l=JSON.parse(f)}catch{console.error(`Invalid ozine-data attribute: ${f}. Must be a valid JSON object.`)}if(a&&a.match(/^[A-Za-z0-9_]{1,}(\[\]$|\$$)/gim)===null){console.error(`Invalid ozine-ref name: ${a}. Must be a valid variable name. Ending with $ for single element or [] for array. Allow characters: A-Z, a-z, 0-9, _.`),console.error(r);return}const d=e;if(a&&a?.search(/\[\]$/)>0){const i={element:r};l&&(i.elementData=l);const h=a;d[h]=d[h]?d[h]:[],d[h]?.push(i),s(r,i,l)}else if(a){const i={element:r};l&&(i.elementData=l),d[a]=i,s(r,i,l)}else s(r,e,l)}}(t,c),c},__version__:"0.0.1",__UI:null,getUI:function(t=!1){return this.__UI=t?m.DOM(document.body):this.__UI||m.DOM(document.body),this.__UI}};document.addEventListener("DOMContentLoaded",()=>{const t=m.DOM(document.body),c={};console.log(t);const s=t.subtotal_price_template$;if(s){const e=m.cloneTemplate(s);console.log(e),document.body.appendChild(e.element)}fetch("http://juntowealth360.com/api/stripe/products").then(e=>e.json()).then(e=>{e.data.forEach(n=>{c[n.id]={...n,selected:!1}}),t["packages[]"]?.map(n=>{const o=n.price$?.element,r=n.element.getAttribute("id")??"";o&&(o.innerHTML=`$${(c[r].unitAmount/100).toFixed(2)}`)})});const u=()=>{let e=0;for(const o in c)c[o].selected&&(e+=c[o].unitAmount);const n=t.total$;n&&(n.element.innerHTML=`$${(e/100).toFixed(2)}`)};t["packages[]"]?.map(e=>{const n=e.element.getAttribute("id")??"",o=e.checkbox$?.element;o&&e.checkbox$?.element.addEventListener("change",()=>{c[n].selected=o.checked,u()})})});
