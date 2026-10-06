import { whatsappUrl } from './config.js';
const $ = selector => document.querySelector(selector);
const money = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 0 });
const escape = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const waIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M20.5 11.5a8.5 8.5 0 0 1-12.6 7.4L3 20l1.2-4.7a8.5 8.5 0 1 1 16.3-3.8Z"/><path d="M8 7.5c-2 3.7 4.8 10 7.8 6.7l-2.3-1.6-1.1 1c-1.6-.7-2.7-1.8-3.3-3.3l.9-1.2L8.6 7Z"/></svg>';
let vehicles = [], category = '', lastTrigger = null;
const isReduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const observer = 'IntersectionObserver' in window && !isReduced ? new IntersectionObserver(entries => entries.forEach(entry => { if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);} }), { threshold: .08 }) : null;
function reveal(){ if(observer) document.querySelectorAll('.reveal:not(.ready)').forEach(el=>{el.classList.add('ready');observer.observe(el);}); }
function safeImage(path){ return /^assets\/[a-z0-9-]+\.(jpg|png|webp)$/i.test(path) ? path : 'assets/showroom.jpg'; }
function specs(v){return `<div class="card-specs"><span>${v.year}</span><span>${money.format(v.km)} km</span><span>${escape(v.transmission)}</span></div>`;}
function features(v){return `<div class="features">${v.features.map(f=>`<span>${escape(f)}</span>`).join('')}</div>`;}
function cta(v){return `<a class="button card-cta" href="${escape(whatsappUrl(v))}" target="_blank" rel="noopener noreferrer" aria-label="Comprar ${escape(v.brand+' '+v.model)} via WhatsApp">${waIcon} Comprar via WhatsApp</a>`;}
function card(v){return `<article class="vehicle-card reveal"><button class="card-photo" data-detail="${escape(v.id)}" aria-label="Ver detalhes do ${escape(v.brand+' '+v.model)}"><img src="${safeImage(v.image)}" width="640" height="427" alt="${escape(v.brand+' '+v.model+' '+v.year)} na Ponto Auto" loading="lazy" decoding="async"><span class="card-badge">${escape(v.fuel==='Híbrido'?'HÍBRIDO':v.category.toUpperCase())}</span><span class="photo-cta">Ver detalhes</span></button><div class="card-body"><p class="card-brand">${escape(v.brand)}</p><h3 class="card-title">${escape(v.model)}</h3><p class="card-version">${escape(v.version)}</p>${specs(v)}${features(v)}<span class="price-label">Valor anunciado</span><p class="card-price"><small>R$</small> ${money.format(v.price)}</p>${cta(v)}</div></article>`;}
function normalize(value){return value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();}
function render(){
  const query=normalize($('#search').value), brand=$('#brand').value, limit=Number($('#budget').value)||Infinity;
  const filtered=vehicles.filter(v=>(!query||normalize(`${v.brand} ${v.model} ${v.version}`).includes(query))&&(!brand||v.brand===brand)&&v.price<=limit&&(!category||v.category===category||v.fuel===category));
  const sorters={'price-asc':(a,b)=>a.price-b.price,'price-desc':(a,b)=>b.price-a.price,year:(a,b)=>b.year-a.year,km:(a,b)=>a.km-b.km};
  if(sorters[$('#sort').value]) filtered.sort(sorters[$('#sort').value]);
  $('#vehicles').innerHTML=filtered.map(card).join('');$('#empty').hidden=filtered.length>0;
  $('#result-count').textContent=`${filtered.length} ${filtered.length===1?'veículo encontrado':'veículos encontrados'} nesta seleção`;
  reveal();
}
async function load(){
  $('#load-error').hidden=true;$('#result-count').textContent='Carregando veículos…';
  try{
    const response=await fetch('data/vehicles.json');if(!response.ok)throw new Error('Estoque indisponível');
    const data=await response.json();
    if(!Array.isArray(data.vehicles)||!data.vehicles.every(v=>typeof v.id==='string'&&typeof v.brand==='string'&&typeof v.model==='string'&&typeof v.version==='string'&&Number.isFinite(v.price)&&Number.isFinite(v.year)&&Number.isFinite(v.km)&&Array.isArray(v.features)))throw new Error('Catálogo inválido');
    vehicles=data.vehicles;
    $('#brand').innerHTML='<option value="">Todas as marcas</option>'+[...new Set(vehicles.map(v=>v.brand))].sort().map(b=>`<option>${escape(b)}</option>`).join('');render();
  }catch{ $('#vehicles').innerHTML='';$('#result-count').textContent='Estoque temporariamente indisponível';$('#load-error').hidden=false;$('#empty').hidden=true; }
}
function reset(){category='';$('#filters').reset();$('#sort').value='featured';document.querySelectorAll('[data-category]').forEach(b=>{b.classList.toggle('active',b.dataset.category==='');b.setAttribute('aria-pressed',String(b.dataset.category===''));});render();}
$('#filters').addEventListener('submit',e=>{e.preventDefault();render();});
$('#filters').addEventListener('input',render);$('#filters').addEventListener('change',render);
$('#filters').addEventListener('reset',()=>{setTimeout(()=>{category='';$('#sort').value='featured';document.querySelectorAll('[data-category]').forEach(b=>{b.classList.toggle('active',b.dataset.category==='');b.setAttribute('aria-pressed',String(b.dataset.category===''));});render();},0);});
$('#sort').addEventListener('change',render);$('#clear').addEventListener('click',reset);$('#retry').addEventListener('click',load);
document.querySelectorAll('[data-category]').forEach(button=>button.addEventListener('click',()=>{category=button.dataset.category;document.querySelectorAll('[data-category]').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});render();}));
document.querySelectorAll('[data-whatsapp]').forEach(a=>a.href=whatsappUrl());
function openDialog(dialog,trigger){lastTrigger=trigger;dialog.showModal();document.body.style.overflow='hidden';}
document.querySelectorAll('dialog').forEach(dialog=>{dialog.querySelector('[data-close]').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});dialog.addEventListener('close',()=>{document.body.style.overflow='';lastTrigger?.focus();});});
$('#vehicles').addEventListener('click',e=>{const button=e.target.closest('[data-detail]');if(!button)return;const v=vehicles.find(v=>v.id===button.dataset.detail);if(!v)return;$('#detail-content').innerHTML=`<img class="detail-image" src="${safeImage(v.image)}" alt="${escape(v.brand+' '+v.model)}"><div class="detail-info"><p class="eyebrow">${escape(v.brand)} · ${escape(v.category)}</p><h2 id="detail-title">${escape(v.brand+' '+v.model)}</h2><p>${escape(v.version)}</p>${specs(v)}${features(v)}<p class="card-price"><small>R$</small> ${money.format(v.price)}</p>${cta(v)}<p class="detail-note">Combustível: ${escape(v.fuel)}. Dados consultados em 06/10/2026. Confirme disponibilidade, equipamentos e condições com o vendedor.</p><a class="detail-source" href="${/^https:\/\/pb\.olx\.com\.br\//.test(v.source)?escape(v.source):'#estoque'}" target="_blank" rel="noopener noreferrer">Consultar anúncio original na OLX</a></div>`;openDialog($('#details'),button);});
$('#privacy-open').addEventListener('click',e=>openDialog($('#privacy'),e.currentTarget));
function closeMenu(){ $('#navigation').classList.remove('open');$('#menu').setAttribute('aria-expanded','false');$('#menu').setAttribute('aria-label','Abrir menu'); }
$('#menu').addEventListener('click',()=>{const open=$('#navigation').classList.toggle('open');$('#menu').setAttribute('aria-expanded',String(open));$('#menu').setAttribute('aria-label',open?'Fechar menu':'Abrir menu');});
document.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',closeMenu));document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
const scroll=()=>$('#header').classList.toggle('scrolled',window.scrollY>35);window.addEventListener('scroll',scroll,{passive:true});scroll();
$('#year').textContent=new Date().getFullYear();
setTimeout(()=>$('#splash')?.remove(),1800);reveal();load();


