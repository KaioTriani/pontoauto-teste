# Ponto Auto Veículos — Hostinger

Site completo, com imagens locais, catálogo JSON, filtros, animações, mapa e links de WhatsApp. Sem banco de dados, variáveis de ambiente ou credenciais. Há duas formas de importar este repositório na Hostinger.

## Opção 1 — Aplicação Web / Importar repositório Git

No painel da Hostinger, selecione **Criar site → Aplicação Web → Importar repositório Git** e escolha `KaioTriani/pontoauto-teste`.

| Campo | Valor |
|---|---|
| Branch | `main` |
| Framework | `Vite` |
| Versão Node.js | `22` ou `24` |
| Diretório do projeto | `.` (raiz do repositório) |
| Instalação | `pnpm install --frozen-lockfile` |
| Comando de build | `pnpm run build` (ou `npm run build`) |
| Diretório de saída | `dist` |
| Variáveis de ambiente | Nenhuma |

O arquivo `pnpm-lock.yaml` fixa as dependências. Caso o painel use apenas npm, a instalação `npm install` e o build `npm run build` também são compatíveis. O site é frontend estático: não configure servidor de backend nem comando de inicialização em produção. Confirme as configurações detectadas e clique em **Deploy**.

## Opção 2 — Site HTML/PHP → Avançado → Git

Os arquivos do site também estão prontos na raiz para deploy estático direto, sem instalar Node.js nem executar build.

1. No site HTML/PHP, abra **Avançado → Git**.
2. Selecione `KaioTriani/pontoauto-teste`, branch `main`.
3. Use `public_html` como diretório de destino e clique em **Deploy**.
4. Certifique-se de que o destino é o site desejado e não contém um site que precise ser preservado.

O `index.html` já está na raiz. Não é necessário mover arquivos de `dist` ou alterar caminhos. O `.htaccess` define o documento inicial, os tipos de JS/JSON e restringe o acesso aos arquivos de desenvolvimento no Apache/LiteSpeed. As imagens e o catálogo são públicos por natureza.

## Desenvolvimento local

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm build
pnpm preview
```

Alternativa sem Node.js: `python -m http.server 4173`, abrindo `http://localhost:4173`. É preciso servir por HTTP, não abrir o HTML via `file://`.

## Manutenção

- `index.html`: seções, textos, contatos e mapa.
- `styles.css`: estilos, responsividade e animações.
- `app.js`: catálogo, filtros, modal, menu e interações.
- `config.js`: telefone e mensagens de WhatsApp.
- `data/vehicles.json`: estoque com preços, anos, quilometragem e fontes.
- `assets/`: logo, fotos dos carros e showroom.
- `vite.config.js`: build opcional para a integração de Aplicação Web.

Para atualizar veículos, edite `data/vehicles.json` e adicione imagens em `assets/`. Use IDs únicos e valores numéricos. Para atualizar a data de consulta, altere também os textos correspondentes em `index.html` e `app.js`. Para mudar o WhatsApp, ajuste `config.js` e os links de fallback no HTML. O catálogo não sincroniza automaticamente com Instagram/OLX.

Após um novo commit em `main`, use a implantação automática da Hostinger ou a opção de reimplantar no painel.

Fontes, informações pendentes de confirmação e decisões de identidade estão em [REFERENCIAS.md](REFERENCIAS.md). Esse documento descreve a entrega original; neste repositório os arquivos de origem estão na raiz, e `dist` é gerado pelo build. Não há dependência de Sites/OpenAI para hospedar ou executar este projeto.

Documentação oficial:
- https://www.hostinger.com/support/1583302-how-to-deploy-a-git-repository-in-hostinger/
- https://www.hostinger.com/support/host-your-lovable-bolt-or-any-other-vibe-coded-website-on-hostinger/


## Atualização visual — 09/10/2026
Abertura com fotografia em destaque, assinatura transferida ao catálogo, tipografia editorial e 11 veículos da seleção anunciada pela loja. Consulte data/vehicles.json para atualizar os anúncios.

