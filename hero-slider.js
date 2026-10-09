import {whatsappUrl} from './config.js';
import {currency,asset,element,animateIn,arrowNavigation} from './vehicle-ui.js';

export function initHero(vehicles) {
  const selection=vehicles.filter(v=>v.featured).slice(0,5);
  const host=document.querySelector('#hero-thumbnails');
  const photo=document.querySelector('#hero-photo');
  const status=document.querySelector('#hero-status');
  if(!selection.length)return;
  host.replaceChildren();let active=0,revision=0;
  function select(index,focus=false){
    active=index;const vehicle=selection[index];const current=++revision;
    host.querySelectorAll('button').forEach((b,i)=>b.setAttribute('aria-pressed',String(i===index)));
    if(focus)host.children[index].focus();
    document.querySelector('#hero-model').textContent=vehicle.brand+' '+vehicle.model;
    document.querySelector('#hero-version').textContent=vehicle.version;
    document.querySelector('#hero-year').textContent=vehicle.year;
    document.querySelector('#hero-km').textContent=vehicle.km.toLocaleString('pt-BR')+' km';
    document.querySelector('#hero-price').textContent=currency(vehicle.price);
    document.querySelector('#hero-contact').href=whatsappUrl(vehicle);
    document.querySelector('#hero-details').dataset.detail=vehicle.id;
    status.textContent=`${index+1} de ${selection.length}: ${vehicle.brand} ${vehicle.model}`;
    const source=asset(vehicle.heroImage||vehicle.image);
    photo.alt=vehicle.brand+' '+vehicle.model;
    photo.onerror=()=>{if(current===revision&&photo.getAttribute('src')!==vehicle.image)photo.src=asset(vehicle.image);};
    photo.src=source;animateIn(photo);
  }
  selection.forEach((v,i)=>{
    const button=element('button','hero-thumb');button.type='button';button.setAttribute('aria-label','Destacar '+v.brand+' '+v.model);button.setAttribute('aria-controls','hero-stage');
    const image=element('img');image.src=asset(v.heroImage||v.image);image.alt='';image.width=160;image.height=100;image.loading='lazy';
    image.onerror=()=>{image.onerror=null;image.src=asset(v.image);};
    button.append(image,element('span','',v.brand+' '+v.model));
    button.addEventListener('click',()=>select(i));button.addEventListener('keydown',e=>arrowNavigation(e,i,selection.length,select));host.append(button);
  });
  document.querySelector('#hero-previous').onclick=()=>select((active-1+selection.length)%selection.length);
  document.querySelector('#hero-next').onclick=()=>select((active+1)%selection.length);
  select(0);
}
