(() => {
const texts={
 en:['Privacy & data protection','Back to website','Important: legal identity, mailing address, retention periods and provider arrangements need confirmation before commercial launch. Do not submit confidential or restricted technical data.','Last updated: 7 November 2026'],
 pl:['Prywatność i ochrona danych','Powrót do strony','Do uzupełnienia przed uruchomieniem działalności komercyjnej: pełna tożsamość prawna, adres korespondencyjny, okresy przechowywania danych oraz ustalenia z dostawcami usług. Nie przesyłaj danych poufnych ani zastrzeżonych.','Ostatnia aktualizacja: 7 listopada 2026'],
 de:['Datenschutz','Zurück zur Website','Vor dem kommerziellen Start zu ergänzen: vollständige rechtliche Identität, Postanschrift, Aufbewahrungsfristen und Vereinbarungen mit Dienstleistern. Keine vertraulichen oder eingeschränkten technischen Daten senden.','Letzte Aktualisierung: 7. November 2026']
};
function update(){
 let saved;try{saved=localStorage.getItem('jsk_composite_lang_pref')?.toLowerCase()}catch{}
 const l=texts[location.hash.slice(1)]?location.hash.slice(1):texts[saved]?saved:'en',t=texts[l];
 document.documentElement.lang=l;document.title=t[0]+' | JSK Composite';
 document.querySelector('h1').textContent=t[0];document.querySelector('.privacy-banner').textContent=t[2];
 document.querySelectorAll('.privacy-lang').forEach(el=>el.hidden=el.id!==l);
 document.querySelectorAll('.privacy-nav a').forEach(el=>el.setAttribute('aria-current',el.hash==='#'+l?'true':'false'));
 document.querySelectorAll('a[href="/"],a[href^="/?lang="]').forEach(el=>{el.href='/?lang='+l;if(!el.classList.contains('logo'))el.textContent='← '+t[1];});
 document.querySelector('main>p.micro').textContent=t[3];
}
addEventListener('hashchange',update);update();
})();
