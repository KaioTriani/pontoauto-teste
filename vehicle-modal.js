import {whatsappUrl} from './config.js';
import {currency,asset,element,animateIn,arrowNavigation} from './vehicle-ui.js';

export function renderVehicleModal(vehicle,host) {
  host.replaceChildren();
  const photos=Array.isArray(vehicle.photos)&&vehicle.photos.length?vehicle.photos:[{src:vehicle.image,alt:vehicle.brand+' '+vehicle.model}];
  const gallery=element('section','vehicle-gallery');gallery.setAttribute('aria-label','Galeria de fotos');
  const stage=element('div','gallery-stage');
  const photo=element('img','gallery-photo');photo.width=1280;photo.height=960;
  const previous=element('button','gallery-arrow previous','‹');previous.type='button';previous.setAttribute('aria-label','Foto anterior');
  const next=element('button','gallery-arrow next','›');next.type='button';next.setAttribute('aria-label','Próxima foto');
  const count=element('p','gallery-count');count.setAttribute('aria-live','polite');
  stage.append(photo,previous,next,count);
  const thumbnails=element('div','gallery-thumbnails');
  let active=0;
  function select(index,focus=false){
    active=index;photo.src=asset(photos[index].src);photo.alt=photos[index].alt||`${vehicle.brand} ${vehicle.model} — foto ${index+1}`;
    photo.onerror=()=>{photo.onerror=null;photo.src=asset(vehicle.image);};
    count.textContent=`${index+1} / ${photos.length}`;
    [...thumbnails.children].forEach((b,i)=>b.setAttribute('aria-pressed',String(i===index)));
    if(focus)thumbnails.children[index].focus();animateIn(photo);
  }
  photos.forEach((p,i)=>{
    const button=element('button','gallery-thumbnail');button.type='button';button.setAttribute('aria-label',`Ver foto ${i+1} de ${photos.length}`);
    const img=element('img');img.src=asset(p.src);img.alt='';img.loading='lazy';button.append(img);
    button.onclick=()=>select(i);button.onkeydown=e=>arrowNavigation(e,i,photos.length,select);thumbnails.append(button);
  });
  previous.hidden=next.hidden=photos.length<2;
  previous.onclick=()=>select((active-1+photos.length)%photos.length);next.onclick=()=>select((active+1)%photos.length);
  stage.tabIndex=0;stage.addEventListener('keydown',e=>arrowNavigation(e,active,photos.length,select));
  let startX=0;stage.addEventListener('pointerdown',e=>{startX=e.clientX;});stage.addEventListener('pointerup',e=>{if(e.target.closest('button'))return;const delta=e.clientX-startX;if(Math.abs(delta)>55)select((active+(delta<0?1:-1)+photos.length)%photos.length);});
  gallery.append(stage,thumbnails);
  const info=element('section','vehicle-sheet');const title=element('h2','',vehicle.brand+' '+vehicle.model);title.id='detail-title';
  const specs=element('dl','technical-specs');
  const values=vehicle.specifications||{'Ano':vehicle.year,'Quilometragem':vehicle.km+' km','Combustível':vehicle.fuel,'Câmbio':vehicle.transmission};
  Object.entries(values).forEach(([label,value])=>{const row=element('div');row.append(element('dt','',label),element('dd','',String(value)));specs.append(row);});
  const equipment=element('ul','equipment');(vehicle.equipment||vehicle.features||[]).forEach(item=>equipment.append(element('li','',item)));
  const link=element('a','button modal-contact','Comprar via WhatsApp');link.href=whatsappUrl(vehicle);link.target='_blank';link.rel='noopener noreferrer';
  const source=element('a','detail-source','Consultar anúncio original na OLX');source.href=/^https:\/\/pb\.olx\.com\.br\//.test(vehicle.source)?vehicle.source:'#estoque';source.target='_blank';source.rel='noopener noreferrer';
  const date=(vehicle.verifiedAt||'').split('-').reverse().join('/');
  info.append(element('p','eyebrow',vehicle.category),title,element('p','modal-version',vehicle.version),element('p','modal-price',currency(vehicle.price)),link,element('h3','','Ficha técnica'),specs,element('h3','','Equipamentos e diferenciais'),equipment,element('p','detail-note',`Dados do anúncio consultados em ${date}. Confirme disponibilidade, equipamentos e condições com a loja.`),source);
  host.append(gallery,info);select(0);
}
