/* Translations for static content and accessibility labels. */
(() => {
  const rows = [
    ['.workforce-flag>span','EU','UE','EU'],
    ['[data-filter="mro"],.foot-links a[href="#mro"]','Aviation MRO','Lotnictwo MRO','Luftfahrt MRO'],
    ['.top span:first-child','ENGINEERED MATERIALS · GLOBAL SOURCING · B2B','MATERIAŁY TECHNICZNE · GLOBALNE ZAOPATRZENIE · B2B','TECHNISCHE MATERIALIEN · GLOBALE BESCHAFFUNG · B2B'],
    ['.top span:last-child','POLAND / EUROPE','POLSKA / EUROPA','POLEN / EUROPA'],
    ['#nav a[href="#dual"],.foot-links a[href="#dual"]','Dual-Use','Podwójne zastosowanie','Duale Verwendung'],
    ['#nav a[href="#mro"]','Aviation MRO Products','Materiały lotnicze MRO','Luftfahrt-MRO-Materialien'],
    ['.hero-promise-intro','We tailor this place for your:','Dopasowujemy ofertę do Twoich potrzeb:','Wir passen unser Angebot an Ihren Bedarf an:'],
    ['.hero-promise-services span:nth-of-type(1)','Support','Wsparcie','Unterstützung'],
    ['.hero-promise-services span:nth-of-type(2)','Training','Szkolenia','Schulung'],
    ['.hero-promise-services span:nth-of-type(3)','Production','Produkcja','Produktion'],
    ['.hero-stamp','DUAL-USE MATERIALS','MATERIAŁY PODWÓJNEGO ZASTOSOWANIA','DUAL-USE-MATERIALIEN'],
    ['.band article:nth-child(1) b','AEROSPACE','LOTNICTWO','LUFTFAHRT'],
    ['.band article:nth-child(1) small','Composite structures','Konstrukcje kompozytowe','Verbundstrukturen'],
    ['.band article:nth-child(2) b','DEFENCE & UAV','OBRONNOŚĆ I UAV','VERTEIDIGUNG & UAV'],
    ['.band article:nth-child(2) small','Civil / defence technology','Technologie cywilne i obronne','Zivile und militärische Technik'],
    ['.band article:nth-child(3) b','AVIATION MRO','LOTNICTWO MRO','LUFTFAHRT MRO'],
    ['.band article:nth-child(3) small','Repair consumables','Materiały naprawcze','Reparaturmaterialien'],
    ['.band article:nth-child(4) b','MOTORSPORT & MARINE','MOTORSPORT I PRZEMYSŁ MORSKI','MOTORSPORT & MARINE'],
    ['.band article:nth-child(4) small','High-performance systems','Systemy o wysokich parametrach','Hochleistungssysteme'],
    ['#dual li:nth-child(1)','UAV platforms & lightweight structures','Platformy UAV i lekkie konstrukcje','UAV-Plattformen und Leichtbaustrukturen'],
    ['#dual li:nth-child(2)','Radomes, aircraft fairings & interiors','Radomy, owiewki i wnętrza samolotów','Radome, Flugzeugverkleidungen und Innenräume'],
    ['#dual li:nth-child(3)','Marine, motorsport & industrial composites','Kompozyty dla przemysłu morskiego, motorsportu i przemysłu','Verbundwerkstoffe für Marine, Motorsport und Industrie'],
    ['.tag:nth-child(1)','Prepreg & dry carbon / glass','Prepreg i suche tkaniny węglowe / szklane','Prepreg und trockene Carbon-/Glasgewebe'],
    ['.tag:nth-child(2)','Nomex® honeycomb cores','Rdzenie komórkowe Nomex®','Nomex®-Wabenkerne'],
    ['.tag:nth-child(3)','Structural adhesives & resins','Kleje konstrukcyjne i żywice','Strukturklebstoffe und Harze'],
    ['.tag:nth-child(4)','Bagging films & sealant tapes','Folie próżniowe i taśmy uszczelniające','Vakuumfolien und Dichtbänder'],
    ['.tag:nth-child(5)','Peel ply, breather & release film','Peel ply, materiały odpowietrzające i folie rozdzielające','Abreißgewebe, Entlüftungsvlies und Trennfolie'],
    ['.tag:nth-child(6)','Sealants, cleaning & NDT supplies','Uszczelniacze, środki czyszczące i materiały NDT','Dichtstoffe, Reinigungs- und NDT-Materialien'],
    ['.note-mro','CoC, TDS, SDS and batch traceability supplied where supported by the specific manufacturer and product.','CoC, TDS, SDS i identyfikowalność partii są dostępne, jeśli zapewnia je producent danego produktu.','CoC, TDS, SDS und Chargenrückverfolgbarkeit, soweit vom Hersteller für das Produkt bereitgestellt.'],
    ['#about .split>div:first-child>p:last-child','We prioritise technical specifications, traceability and realistic supply terms. Supplier relationships, approvals and product availability are confirmed individually.','Priorytetem są specyfikacje techniczne, identyfikowalność i realne warunki dostaw. Relacje z dostawcami, zatwierdzenia i dostępność produktów potwierdzamy indywidualnie.','Technische Spezifikationen, Rückverfolgbarkeit und realistische Lieferbedingungen stehen im Vordergrund. Lieferantenbeziehungen, Zulassungen und Verfügbarkeit werden einzeln bestätigt.'],
    ['.step:nth-child(1) strong','01 / SOURCE','01 / ZAOPATRZENIE','01 / BESCHAFFUNG'],
    ['.step:nth-child(1) small','Find original manufacturers and material supply opportunities.','Wyszukiwanie producentów i możliwości dostaw materiałów.','Hersteller und Liefermöglichkeiten ermitteln.'],
    ['.step:nth-child(2) strong','02 / VALIDATE','02 / WERYFIKACJA','02 / PRÜFUNG'],
    ['.step:nth-child(2) small','Review technical documentation, traceability and end-use compliance.','Weryfikacja dokumentacji, identyfikowalności i zgodności zastosowania.','Technische Dokumentation, Rückverfolgbarkeit und Endverwendung prüfen.'],
    ['.step:nth-child(3) strong','03 / QUOTE','03 / OFERTA','03 / ANGEBOT'],
    ['.step:nth-child(3) small','Prepare customer-focused quotations and supply terms.','Przygotowanie ofert i warunków dostaw dla klienta.','Kundenbezogene Angebote und Lieferbedingungen erstellen.'],
    ['.training-mark>span','SKILLS','UMIEJĘTNOŚCI','KOMPETENZEN'],
    ['.training-mark>small','TRAINING & QUALIFICATIONS','SZKOLENIA I KWALIFIKACJE','SCHULUNG & QUALIFIKATIONEN']
  ];
  const L={EN:0,PL:1,DE:2};
  const extra={
    EN:{footerCountry:'Poland',skipLink:'Skip to content',courseSearch:'Search training courses'},
    PL:{footerCountry:'Polska',skipLink:'Przejdź do treści',courseSearch:'Szukaj szkoleń'},
    DE:{footerCountry:'Polen',skipLink:'Zum Inhalt springen',courseSearch:'Schulungen suchen'}
  };
  Object.keys(extra).forEach(l=>Object.assign(T[l],extra[l]));
  function update(){
    const l=document.documentElement.lang.toUpperCase(),k=L[l]??0;
    rows.forEach(([selector,...values])=>document.querySelectorAll(selector).forEach(el=>el.textContent=values[k]));
    document.querySelectorAll('.foot-links a').forEach(el=>{
      const key={'#materials':'materials','#workforce':'workforceNav','#training':'trainingNav','#contact':'contact'}[el.hash];
      if(key)el.textContent=T[l][key];
    });
    document.querySelectorAll('.training-id').forEach((el,i)=>{el.textContent=String(i+1).padStart(2,'0')+' / '+T[l][['trainOne','trainTwo','trainThree','trainFour','trainFive','trainSix'][i]];});
    document.querySelectorAll('[data-lang]').forEach(el=>el.setAttribute('aria-pressed',String(el.dataset.lang===l)));
    document.querySelectorAll('[data-filter]').forEach(el=>el.setAttribute('aria-pressed',String(el.classList.contains('active'))));
    const attrs=[
      ['#search','aria-label',['Search materials','Szukaj materiałów','Materialien suchen']],
      ['.hero-promise','aria-label',['Support, training and production','Wsparcie, szkolenia i produkcja','Unterstützung, Schulung und Produktion']],
      ['.workforce-sectors','aria-label',['Industry sectors','Branże przemysłu','Industriebranchen']],
      ['#catalogFilters','aria-label',['Training sectors','Kategorie szkoleń','Schulungskategorien']],
      ['[data-auto]','aria-label',['Automatic language by public IP','Automatyczny język według publicznego IP','Automatische Sprache nach öffentlicher IP']],
      ['#rfq [name="name"]','placeholder',['Full name','Imię i nazwisko','Vor- und Nachname']],
      ['#rfq [name="company"]','placeholder',['Company name','Nazwa firmy','Firmenname']],
      ['#recruitCount','placeholder',['e.g. 5','np. 5','z. B. 5']],
      ['#trainingParticipants','placeholder',['e.g. 8','np. 8','z. B. 8']],
      ['.hero-image','alt',['Commercial passenger aircraft in flight','Samolot pasażerski w locie','Passagierflugzeug im Flug']],
      ['.mro-image img','alt',['Aircraft representing aviation maintenance materials','Samolot ilustrujący materiały do obsługi lotniczej','Flugzeug als Illustration für Luftfahrt-Wartungsmaterialien']],
      ['.dual-image','aria-label',['Illustrative aerospace technology','Poglądowa technologia lotnicza','Illustrative Luftfahrttechnik']]
    ];
    attrs.forEach(([sel,attr,v])=>document.querySelectorAll(sel).forEach(el=>el.setAttribute(attr,v[k])));
    const names=new Intl.DisplayNames([l.toLowerCase()],{type:'region'});
    const codes={Austria:'AT',Belgium:'BE',Bulgaria:'BG',Croatia:'HR',Cyprus:'CY',Czechia:'CZ',Denmark:'DK',Estonia:'EE',Finland:'FI',France:'FR',Germany:'DE',Greece:'GR',Hungary:'HU',Ireland:'IE',Italy:'IT',Latvia:'LV',Lithuania:'LT',Luxembourg:'LU',Malta:'MT',Netherlands:'NL',Poland:'PL',Portugal:'PT',Romania:'RO',Slovakia:'SK',Slovenia:'SI',Spain:'ES',Sweden:'SE'};
    document.querySelectorAll('[name="delivery_country"] option').forEach(el=>{const value=el.value;el.value=value;el.textContent=codes[value]?names.of(codes[value]):['Other','Inny','Andere'][k];});
    document.querySelectorAll('[data-t="skipLink"],[data-t="courseSearch"]').forEach(el=>el.textContent=T[l][el.dataset.t]);
    document.querySelector('[data-t="privacyLink"]').href='/privacy.html#'+l.toLowerCase();
    document.title=['JSK Composite — Materials, Engineering & Training','JSK Composite — Materiały, inżynieria i szkolenia','JSK Composite — Materialien, Engineering & Schulungen'][k];
    document.querySelector('meta[name="description"]').content=[
      'Composite materials, recruitment, engineering support and technical training enquiries for aerospace, MRO, marine and industry.',
      'Materiały kompozytowe, rekrutacja, wsparcie inżynieryjne i szkolenia techniczne dla lotnictwa, MRO, przemysłu morskiego i przemysłu.',
      'Verbundwerkstoffe, Personalvermittlung, Engineering und technische Schulungsanfragen für Luftfahrt, MRO, Marine und Industrie.'
    ][k];
    document.querySelector('meta[property="og:title"]').content=document.title;
    document.querySelector('meta[property="og:description"]').content=document.querySelector('meta[name="description"]').content;
  }
  document.querySelectorAll('[data-lang]').forEach(el=>el.addEventListener('click',update));
  document.getElementById('enquiryType').addEventListener('change',update);
  ['staffingCTA','trainingCTA'].forEach(id=>document.getElementById(id).addEventListener('click',update));
  document.getElementById('rfq').addEventListener('reset',()=>setTimeout(update,0));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open')){menuBtn.click();menuBtn.focus();}});
  document.querySelectorAll('a[href="#contact"]').forEach(el=>{
    if(!['staffingCTA','trainingCTA'].includes(el.id))el.addEventListener('click',()=>{
      enquiryType.value='Materials & Supply';updateEnquiryMode();update();
    });
  });
  update();
})();
