export const dealership = Object.freeze({
  name: 'Ponto Auto Veículos',
  whatsapp: '5583996520283',
  phone: '558332221111',
  instagram: 'https://www.instagram.com/pontoautoveiculos/',
  stock: 'https://www.olx.com.br/perfil/ponto-auto-veiculos-55b290fc',
  maps: 'https://share.google/TcU2Fro9KJTVfEbBU',
  address: 'Rua Professor Oswaldo de Miranda Pereira, 1164, Brisamar, João Pessoa, PB'
});
export function whatsappUrl(vehicle) {
  const text = vehicle ? `Olá, vi o ${vehicle.brand} ${vehicle.model} ${vehicle.version}, ano ${vehicle.year}, no site da Ponto Auto e tenho interesse! Ele ainda está disponível?` : 'Olá! Vim pelo site da Ponto Auto e gostaria de falar com um consultor.';
  return `https://wa.me/${dealership.whatsapp}?text=${encodeURIComponent(text)}`;
}

