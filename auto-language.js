(()=>{"use strict";
const KEY="jsk_composite_lang_pref",buttons=[...document.querySelectorAll("[data-lang]")],container=document.querySelector(".langs");let scripted=false;
function save(v){try{if(v)localStorage.setItem(KEY,v);else localStorage.removeItem(KEY)}catch(e){}}
function saved(){try{return localStorage.getItem(KEY)}catch(e){return null}}
const auto=document.createElement("button");auto.type="button";auto.textContent="AUTO";auto.dataset.auto="1";auto.title="Choose language automatically by IP country";auto.setAttribute("aria-label","Automatic language by IP country");if(container)container.appendChild(auto);
function showAuto(b){auto.classList.toggle("geo-on",b);auto.setAttribute("aria-pressed",String(b))}
function apply(l){const b=buttons.find(x=>x.dataset.lang===l);if(b){scripted=true;try{b.click()}finally{scripted=false}}}
buttons.forEach(b=>b.addEventListener("click",()=>{if(!scripted){save(b.dataset.lang);showAuto(false)}}));
async function autoDetect(){
showAuto(true);
let c="";
for(const url of ["/api/geo","https://get.geojs.io/v1/ip/country.json"]){
 try{const r=await fetch(url,{cache:"no-store"});if(r.ok){const d=await r.json();c=String(d.country||"").toUpperCase();if(c)break}}catch(e){}
}
if(!c)c=String(navigator.language||"").slice(0,2).toUpperCase();
apply(c==="PL"?"PL":(["DE","AT","CH"].includes(c)?"DE":"EN"));
}
auto.addEventListener("click",()=>{save(null);autoDetect()});
const manual=saved();if(["PL","EN","DE"].includes(manual)){showAuto(false);apply(manual)}else autoDetect();
})();