export const currency = value => new Intl.NumberFormat('pt-BR', {style:'currency',currency:'BRL',maximumFractionDigits:0}).format(value);
export const asset = path => /^assets\/[a-z0-9-]+\.(jpg|png|webp)$/i.test(path) ? path : 'assets/showroom.jpg';
export function element(tag, className='', text='') {
  const node=document.createElement(tag);node.className=className;node.textContent=text;return node;
}
export function animateIn(node) {
  if(!matchMedia('(prefers-reduced-motion: reduce)').matches) node.animate([{opacity:0,transform:'translateY(10px)'},{opacity:1,transform:'translateY(0)'}],{duration:380,easing:'cubic-bezier(.2,.7,.2,1)'});
}
export function arrowNavigation(event,index,length,select) {
  if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;
  event.preventDefault();select(event.key==='Home'?0:event.key==='End'?length-1:(index+(event.key==='ArrowRight'?1:-1)+length)%length,true);
}
