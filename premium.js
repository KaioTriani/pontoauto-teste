import { whatsappUrl } from './config.js';

/** Curated previews are derived from the same catalog, never a second price list. */
export function initPremium(vehicles) {
  const section = document.querySelector('#premium');
  const thumbnails = document.querySelector('#premium-thumbnails');
  const preview = document.querySelector('#premium-preview');
  const selected = vehicles.filter(vehicle => vehicle.price > 500000);
  section.hidden = selected.length === 0;
  thumbnails.replaceChildren();
  preview.replaceChildren();
  if (!selected.length) return;
  const price = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
  const safeImage = path => /^assets\/[a-z0-9-]+\.(jpg|png|webp)$/i.test(path) ? path : 'assets/showroom.jpg';
  const create = (tag, className, text) => {
    const element = document.createElement(tag);
    element.className = className;
    if (text) element.textContent = text;
    return element;
  };
  function show(vehicle, index) {
    [...thumbnails.children].forEach((button, i) => button.setAttribute('aria-pressed', String(i === index)));
    const photo = create('img', 'premium-photo');
    photo.src = safeImage(vehicle.image);
    photo.alt = `${vehicle.brand} ${vehicle.model} ${vehicle.year}`;
    photo.width = 1280; photo.height = 960;
    const info = create('div', 'premium-info');
    const link = create('a', 'button', 'Comprar via WhatsApp');
    link.href = whatsappUrl(vehicle); link.target = '_blank'; link.rel = 'noopener noreferrer';
    info.append(create('p', 'eyebrow light', vehicle.brand), create('h2', '', vehicle.model),
      create('p', 'premium-version', vehicle.version),
      create('p', 'premium-specs', `${vehicle.year} · ${vehicle.km.toLocaleString('pt-BR')} km · ${vehicle.transmission}`),
      create('p', 'premium-price', price.format(vehicle.price)), link);
    preview.replaceChildren(photo, info);
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
      preview.animate([{opacity:0,transform:'translateY(8px)'},{opacity:1,transform:'translateY(0)'}], {duration:350,easing:'ease-out'});
    }
  }
  selected.forEach((vehicle, index) => {
    const button = create('button', 'premium-thumb');
    button.type = 'button'; button.setAttribute('aria-controls', 'premium-preview');
    button.setAttribute('aria-label', `Visualizar ${vehicle.brand} ${vehicle.model}`);
    const image = create('img', ''); image.src = safeImage(vehicle.image); image.alt = ''; image.loading = 'lazy';
    button.append(image, create('span', '', `${vehicle.brand} ${vehicle.model}`));
    button.addEventListener('click', () => show(vehicle, index));
    button.addEventListener('keydown', event => {
      if (!['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
      event.preventDefault();
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? selected.length-1 : (index+(event.key==='ArrowRight'?1:-1)+selected.length)%selected.length;
      thumbnails.children[next].focus(); show(selected[next], next);
    });
    thumbnails.append(button);
  });
  show(selected[0], 0);
}
