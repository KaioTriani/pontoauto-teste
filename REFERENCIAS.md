# Ponto Auto Veículos

Site responsivo em HTML5, CSS3 e JavaScript com módulos ES. Sem dependências de execução, compilação ou backend: o atendimento acontece diretamente no WhatsApp. Sirva a pasta `dist` em qualquer hospedagem estática com HTTPS.

## Executar localmente

Com Python 3 instalado, na raiz do projeto:

```sh
python -m http.server 4173 --directory dist
```

Abra http://localhost:4173. Não abra o HTML por `file://`: a leitura do JSON e os módulos precisam de HTTP.

## Arquivos

- `dist/index.html`: estrutura semântica, conteúdo, mapa, diálogos e metadados.
- `dist/styles.css`: identidade visual, breakpoints, animações e suporte a movimento reduzido.
- `dist/app.js`: renderização, busca, filtros, ordenação, diálogos e menu móvel.
- `dist/config.js`: dados da loja e criação centralizada dos links de WhatsApp.
- `dist/data/vehicles.json`: catálogo independente da apresentação, com fonte de cada anúncio.
- `dist/assets/`: logo, showroom e fotos reais, armazenados localmente para evitar links temporários.

## Atualizar o catálogo

Edite o JSON, mantendo IDs únicos e valores numéricos para `year`, `km` e `price`. Coloque a foto em `dist/assets/` e informe esse caminho em `image`. Os filtros de marca são gerados automaticamente. `features` é uma lista de diferenciais; `source` aponta para o anúncio original. Atualize também as datas visíveis no HTML e na nota do diálogo em `app.js` ao revisar o estoque. O campo `updatedAt` registra a data no arquivo de dados. O catálogo é um retrato editorial, não uma sincronização automática.

Para mudar o WhatsApp, altere `dealership.whatsapp` em `config.js`, usando país + DDD + telefone (apenas dígitos), e os links de fallback `https://wa.me/5583996520283` no HTML. Nenhuma mensagem é enviada automaticamente: o cliente abre a conversa e decide enviar.

## Referências e dados consultados em 06/10/2026

- Instagram: https://www.instagram.com/pontoautoveiculos/ — logo circular verde/prata, nome e telefones observados no perfil. As publicações recentes são principalmente Reels; a abertura dos detalhes foi limitada pela interface de login. Não foi possível garantir correspondência entre cada Reel e cada veículo.
- Página oficial vinculada na bio: https://bio.site/PontoAuto — confirmou o WhatsApp 5583996520283, logo, showroom, estoque da OLX e link oficial do mapa.
- Estoque oficial: https://www.olx.com.br/perfil/ponto-auto-veiculos-55b290fc — seis veículos reais, fotos, preços, anos e quilometragens; endereço e declaração de 25 anos de atuação. Não foram usados os anúncios da empresa homônima de Araraquara.
- Horários: https://avaliacoesbrasil.com/concessionaria/joao-pessoa/ponto-auto-veiculos/ — fonte secundária; confirmar com a loja antes do lançamento comercial.
- CNPJ: https://www.econodata.com.br/consulta-empresa/09391845000120-ponto-auto-veiculos-ltda — registro público associado ao nome e município; confirmar a razão social/CNPJ operacional com a empresa.
- Referência de organização: https://avantgarde.com.br/veiculos/ — catálogo fotográfico, filtros e ordenação. Não foram copiados código ou identidade da Avantgarde.

## Identidade e decisões

Logo original preservada, circular, no cabeçalho, splash e rodapé. Verde profundo, prata, branco e preto seguem os elementos observados. Os tons de interface (`#28683d`, `#14251c`, `#b2da86`) são adaptações visuais, não códigos de um manual oficial. A família tipográfica original não pôde ser identificada com precisão; Manrope e Barlow Condensed são escolhas de projeto com fontes de fallback locais.

## Recursos e cuidados operacionais

- Pesquisa sem distinção de acentos, filtros combinados, ordenação por preço/ano/km e limpeza de filtros.
- Catálogo com estados de carregamento, erro com nova tentativa e lista vazia.
- Detalhes em diálogo nativo, fechamento por Escape e retorno do foco.
- Splash de duração limitada, animações de entrada e respeito a `prefers-reduced-motion`.
- Cabeçalho fixo, menu móvel acessível, link de salto e foco visível.
- Imagens com dimensões, carregamento tardio fora do banner e texto alternativo.
- Sem formulários, trackers ou cookies próprios. Google Fonts e iframe do Google Maps são serviços externos.
- Confirmar estoque, preços, direitos de uso das imagens, horários e cadastro empresarial antes de divulgação comercial. Os links de redes presentes são os canais encontrados (Instagram, OLX e WhatsApp); não foram inventados perfis de Facebook ou outras redes.

O mapa usa a pesquisa do endereço confirmado e oferece o link oficial da loja como alternativa. A localização do marcador depende da resolução do Google Maps; não representa geocodificação de coordenadas validada manualmente.

## Publicação

Envie o conteúdo de `dist` à raiz da hospedagem. Não publique arquivos de controle ou credenciais. Em Sites, `.openai/hosting.json` seleciona a pasta estática. A primeira publicação é privada para revisão; a abertura ao público é uma etapa separada. Um servidor de aplicação só é necessário se houver futura integração com CRM, painel administrativo ou estoque em tempo real.

