const {chromium,webkit}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const BASE=process.env.BASE_URL||'http://127.0.0.1:8123';
let passed=0,failed=0;
async function test(name,fn){let timer;console.log('START',name);try{await Promise.race([fn(),new Promise((_,reject)=>{timer=setTimeout(()=>reject(new Error('Test exceeded 60 seconds')),60000)})]);console.log('PASS',name);passed++;}catch(e){console.error('FAIL',name,e.stack);failed++;}finally{clearTimeout(timer)}}
(async()=>{
for(const engine of [chromium,webkit]){
 const browser=await engine.launch();
 async function page(country='PL',width=390,delay=0){
  const context=await browser.newContext({viewport:{width,height:900},hasTouch:width<800,locale:'pl-PL'});
  const p=await context.newPage();p.errors=[];p.on('pageerror',e=>p.errors.push(e.message));
  await p.route('https://get.geojs.io/**',async r=>{if(delay)await new Promise(x=>setTimeout(x,delay));return r.fulfill({json:{country}})});
  await p.route('https://web3forms.com/**',r=>r.fulfill({contentType:'application/javascript',body:''}));
  // Never send commercial enquiries: all submission requests are intercepted.
  await p.route('https://api.web3forms.com/**',r=>r.fulfill({json:{success:true}}));
  await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>document.querySelectorAll('#products .product').length===12,null,{timeout:7000});return p;
 }
 for(const [country,lang] of [['PL','pl'],['DE','de'],['AT','de'],['CH','de'],['GB','en'],['US','en'],['CA','en'],['AU','en'],['NZ','en'],['TR','en'],['','en']]){
  await test(engine.name()+' IP '+country+' => '+lang,async()=>{const p=await page(country);await p.waitForFunction(l=>document.documentElement.lang===l,lang);assert.deepEqual(p.errors,[]);await p.context().close();});
 }
 await test(engine.name()+' manual selection wins delayed IP lookup',async()=>{const p=await page('DE',390,700);await p.locator('[data-lang="PL"]').click();await p.waitForTimeout(1000);assert.equal(await p.locator('html').getAttribute('lang'),'pl');await p.reload();assert.equal(await p.locator('html').getAttribute('lang'),'pl');await p.locator('[data-auto]').click();await p.waitForFunction(()=>document.documentElement.lang==='de');await p.context().close();});
 await test(engine.name()+' storage denied and lookup failure defaults EN',async()=>{const p=await page();await p.addInitScript(()=>{Object.defineProperty(window,'localStorage',{get(){throw new Error('Denied')}})});await p.route('https://get.geojs.io/**',r=>r.abort());await p.reload();await p.waitForFunction(()=>document.documentElement.lang==='en');assert.deepEqual(p.errors,[]);await p.context().close();});
 for(const width of [320,390,768,1024,1440]){
 await test(engine.name()+' layout/navigation '+width,async()=>{
  const p=await page('DE',width);await p.waitForFunction(()=>document.documentElement.lang==='de');
  const overflow=await p.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,elements:[...document.querySelectorAll('body *')].filter(e=>e.getBoundingClientRect().right>innerWidth+1).slice(0,12).map(e=>({tag:e.tagName,id:e.id,cls:e.className,width:e.getBoundingClientRect().width}))}));assert(overflow.scroll<=overflow.width+1,JSON.stringify(overflow));
  const missing=await p.evaluate(()=>[...document.querySelectorAll('a[href^="#"]')].map(a=>a.hash).filter(h=>h.length>1&&!document.getElementById(h.slice(1))));assert.deepEqual(missing,[]);assert(await p.locator('.hero-copy').evaluate(e=>e.getBoundingClientRect().right<=innerWidth),'hero text clipped');
  if(await p.locator('#menuBtn').isVisible()){await p.locator('#menuBtn').click();assert.equal(await p.locator('#menuBtn').getAttribute('aria-expanded'),'true');await p.keyboard.press('Escape');assert.equal(await p.locator('#menuBtn').getAttribute('aria-expanded'),'false');}
  await p.screenshot({path:`test-results/${engine.name()}-${width}.png`,fullPage:true});assert.deepEqual(p.errors,[]);await p.context().close();
 });}
 for(const lang of ['EN','PL','DE']){
 await test(engine.name()+' catalogues, translations and forms '+lang,async()=>{
  const p=await page('GB',1440);await p.locator(`[data-lang="${lang}"]`).click();
  assert.equal(await p.locator('#products .product').count(),12);
  await p.locator('[data-filter="core"]').click();assert.equal(await p.locator('#products .product').count(),1);
  await p.locator('[data-add]').click();assert((await p.locator('#selectedMaterials').inputValue()).includes('Nomex'));
  await p.locator('[data-filter="all"]').click();await p.locator('#search').fill('not-a-material');assert.equal(await p.locator('#products .product').count(),0);await p.locator('#search').fill('');
  await p.locator('#catalogSearch').fill('not-a-course');assert.equal(await p.locator('#catalogGrid article').count(),0);await p.locator('#catalogSearch').fill('');
  while(await p.locator('#catalogMore').isVisible())await p.locator('#catalogMore').click();assert.equal(await p.locator('#catalogGrid article').count(),65);
  await p.locator('[data-course-id]').first().click();const topic=await p.locator('#trainingTopic').inputValue();
  await p.locator('[data-lang="DE"]').click();assert.equal(await p.locator('#trainingTopic').inputValue(),topic);assert(!(await p.locator('#trainingTopic option:checked').innerText()).includes('undefined'));await p.locator(`[data-lang="${lang}"]`).click();
  await p.locator('[data-t="mroQuote"]').click();assert.equal(await p.locator('#enquiryType').inputValue(),'Materials & Supply');
  assert.equal(await p.locator('[name="delivery_country"]').inputValue(),'Poland');
  assert.equal(await p.locator('#rfq').evaluate(f=>f.checkValidity()),false);
  for(const mode of ['Materials & Supply','Recruitment & Engineering','Training & Certification Support']){
   await p.locator('#enquiryType').selectOption(mode);
   if(mode.startsWith('Recruitment')){await p.locator('#recruitIndustry').selectOption('Engineering');await p.locator('#recruitCount').fill('2');}
   if(mode.startsWith('Training')){await p.locator('#trainingTopic').selectOption('Composite Manufacturing');await p.locator('#trainingParticipants').fill('3');}
   await p.locator('[name="name"]').fill('AUTOMATED MOCK TEST');await p.locator('[name="email"]').fill('test@example.com');await p.locator('[name="message"]').fill('AUTOMATED MOCK TEST — never delivered');await p.locator('[name="privacy_acknowledged"]').check();
   await p.locator('#submitBtn').click();assert(await p.locator('#formStatus').isVisible());assert((await p.locator('#formStatus').innerText()).includes('hCaptcha'));
   await p.evaluate(()=>{let t=document.querySelector('[name="h-captcha-response"]');if(!t){t=document.createElement('textarea');t.hidden=true;t.name='h-captcha-response';document.querySelector('#rfq').append(t)}t.value='mock'});
   let payload='';await p.route('https://api.web3forms.com/**',r=>{payload=r.request().postData();return r.fulfill({json:{success:true}})});
   await p.locator('#submitBtn').click();await p.waitForFunction(()=>document.querySelector('#formStatus').classList.contains('ok'));assert(payload.includes(mode.replace('&','&')));assert(payload.includes('test@example.com'));
   if(!mode.startsWith('Recruitment'))assert(!payload.includes('name="vacancies"'));
   await p.evaluate(()=>document.querySelector('[name="h-captcha-response"]').value='');
  }
  // Failed server response must retain input, re-enable retry and never claim success.
  await p.locator('[name="name"]').fill('MOCK');await p.locator('[name="email"]').fill('test@example.com');await p.locator('[name="message"]').fill('DO NOT SEND');await p.locator('[name="privacy_acknowledged"]').check();await p.evaluate(()=>document.querySelector('[name="h-captcha-response"]').value='mock');
  await p.route('https://api.web3forms.com/**',r=>r.fulfill({status:500,body:'upstream error'}));await p.locator('#submitBtn').click();await p.waitForFunction(()=>document.querySelector('#formStatus').classList.contains('err'));assert.equal(await p.locator('[name="message"]').inputValue(),'DO NOT SEND');assert(await p.locator('#submitBtn').isEnabled());
  assert.deepEqual(p.errors,[]);await p.context().close();
 });}
 await test(engine.name()+' WCAG automated checks',async()=>{
  const p=await page('PL',1440);await p.waitForFunction(()=>document.documentElement.lang==='pl');
  await p.addScriptTag({path:require.resolve('axe-core/axe.min.js')});
  const result=await p.evaluate(async()=>await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa','wcag22aa']}}));
  fs.writeFileSync(`test-results/${engine.name()}-accessibility.json`,JSON.stringify(result,null,2));
  assert.deepEqual(result.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),[]);await p.context().close();
 });
 await test(engine.name()+' privacy languages',async()=>{
  const p=await page();for(const l of ['pl','de','en']){await p.goto(BASE+'/privacy.html#'+l);assert.equal(await p.locator('html').getAttribute('lang'),l);assert(await p.locator('#'+l).isVisible());assert.equal(await p.locator('.privacy-lang:visible').count(),1);}await p.context().close();
 });
 await browser.close();
}
console.log(JSON.stringify({passed,failed}));if(failed)process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1});
