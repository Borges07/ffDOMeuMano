# Recarga Jogo — telas Free Fire

Frontend em HTML, CSS e JavaScript, sem instalação de dependências. Pacote independente do projeto da CNH.

## Executar e publicar

Requer Node.js para os comandos locais (sem dependências externas):

- `npm start`: abre o servidor em http://127.0.0.1:8080.
- `npm test`: executa os testes do fluxo.
- `npm run build`: prepara os arquivos em `dist/`.

Para hospedagem estática, envie o conteúdo de `dist/` para `public_html`. Mantenha `index.html`, `src/` e `assets/` na raiz. O layout inclui ajustes para celular em `src/responsive.css`.

## Abrir e apresentar

1. Extraia todo o ZIP, mantendo as pastas juntas.
2. Abra `index.html` para percorrer a sequência completa.
3. Abra `revisao.html` para acessar diretamente cada uma das 12 referências, com dados preenchidos para revisão.

O fluxo é: abertura → objetivos → ID → cinco perguntas → resultado → loja → resumo do pedido. Na identificação, use um ID de 4 a 20 números. O modo de revisão usa `1234`.

Se o navegador bloquear recursos locais, sirva esta pasta com um servidor estático da sua equipe. Com Python instalado: `python3 -m http.server 8080`, depois abra `http://localhost:8080/revisao.html`.

## Conteúdo entregue

- As 12 vistas das referências, incluindo os dois banners da loja e a seção de recarga.
- Navegação, validação do formato do ID, registro de respostas, desconto, carrossel, alteração de ID e resumo do pedido.
- CSS com adaptações para telas pequenas e fontes locais Orbitron e Oswald.
- Código separado em configuração (`src/config.js`), regras (`src/domain.js`), interface (`src/app.js`) e estilos (`src/styles.css`).
- Mapa das telas, proposta de integração e testes executáveis com Node.js.

As páginas do fluxo não têm faixas de “demonstrativo”. O guia de revisão e as observações de implementação ficam fora da apresentação principal.

## Decisões para a equipe

As referências fornecem imagens, mas não regras comerciais nem gabarito. Esta versão concede **85% ao concluir as cinco etapas**, independentemente das alternativas escolhidas. O array `discountByCompleted` centraliza essa regra. As perguntas foram transcritas das referências e não tiveram o conteúdo factual validado.

O preço final exibido é **R$ 19,90** para 6.800 diamantes. O valor de referência de **R$ 132,67** foi calculado para obter esse total com 85% de desconto e arredondamento em centavos; não é um preço comercial confirmado. Confirme a tabela antes de integrar vendas.

O cabeçalho usa a identificação editável “Recarga Jogo”. Os textos de abertura descrevem desconto, em vez de prometer entrega gratuita. A identificação mostra “ID informado”, pois não consulta conta. A arte e as cores seguem as capturas; esses textos são diferenças intencionais em relação ao material.

## Limites desta entrega

É um frontend local: não autentica jogadores, consulta contas, cobra PIX ou entrega diamantes. “Comprar” redireciona, na mesma aba, para o checkout externo configurado em `src/config.js`. O ID e as respostas não são enviados ao checkout por esta aplicação. O ID e as respostas existem apenas na memória da página e são apagados ao recarregar. Alterar o ID na loja mantém as respostas; a equipe deve definir como vincular elegibilidade ao destinatário no servidor.

As artes foram recortadas das capturas. O fundo foi reconstruído a partir da captura com a área central atenuada; não substitui o arquivo original de design. Há dois banners navegáveis, correspondentes às duas imagens fornecidas. A fidelidade é aproximada, sem comprovação de equivalência pixel a pixel. Não foi realizada inspeção visual do site em navegador neste ambiente.

## Verificação

Execute da pasta do projeto:

```sh
node --test tests/*.test.cjs
```

Os testes cobrem regras de progressão, valores em centavos, renderização das vistas em ambiente DOM simulado e o percurso interativo até o resumo. Não substituem testes de navegador.

## Arquivos e licenças

Consulte `docs/MAPA-DAS-TELAS.md` e `docs/INTEGRACAO.md`. As imagens de jogo e campanha vieram do material fornecido; os direitos permanecem com seus titulares. As fontes incluem as respectivas licenças OFL em `assets/fonts/`.
