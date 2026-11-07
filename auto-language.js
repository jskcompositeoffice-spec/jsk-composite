(() => {
  "use strict";
  const KEY = "jsk_composite_lang_pref", valid = ["PL", "DE", "EN"];
  const buttons = [...document.querySelectorAll("[data-lang]")];
  let scripted = false, request = 0;
  const auto = document.createElement("button");
  auto.type = "button"; auto.textContent = "AUTO"; auto.dataset.auto = "1";
  document.querySelector(".langs")?.append(auto);
  function preference(value) { try { value ? localStorage.setItem(KEY,value) : localStorage.removeItem(KEY); } catch {} }
  function show(enabled) { auto.classList.toggle("geo-on",enabled); auto.setAttribute("aria-pressed",String(enabled)); }
  function apply(value) { scripted = true; try { buttons.find(b=>b.dataset.lang===value)?.click(); } finally { scripted=false; } }
  async function detect() {
    const version=++request; show(true);
    let country="";
    try {
      const response=await fetch("https://get.geojs.io/v1/ip/country.json", {cache:"no-store",signal:AbortSignal.timeout(4000)});
      if(response.ok) { const data=await response.json(); if(/^[A-Z]{2}$/i.test(data.country)) country=data.country.toUpperCase(); }
    } catch {}
    if(version!==request) return;
    apply(country==="PL"?"PL":["DE","AT","CH"].includes(country)?"DE":"EN");
  }
  buttons.forEach(button=>button.addEventListener("click",()=>{
    if(!scripted) { ++request; preference(button.dataset.lang); show(false); }
  }));
  auto.addEventListener("click",()=>{preference(null);const url=new URL(location.href);url.searchParams.delete("lang");history.replaceState(null,"",url);detect();});
  let manual;try {manual=localStorage.getItem(KEY);}catch{}
  const urlLanguage=new URLSearchParams(location.search).get("lang")?.toUpperCase();
  if(valid.includes(urlLanguage)){show(false);apply(urlLanguage);}
  else if(valid.includes(manual)){show(false);apply(manual);}else detect();
})();
