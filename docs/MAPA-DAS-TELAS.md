# Mapa das telas

Os nomes abaixo referem-se às capturas `image(20261018-HHMMSS).png`. O arquivo `revisao.html` dá acesso às 12 vistas com estado de exemplo.

| Nº | Captura | Vista | Rota |
| --- | --- | --- | --- |
| 01 | 215532 | Pergunta inicial | `#/inicio` |
| 02 | 215549 | Objetivos da missão | `#/missao` |
| 03 | 215559 | ID do jogador | `#/identificacao` |
| 04 | 215612 | Pergunta sobre mapa | `#/pergunta/1` |
| 05 | 215621 | Pergunta sobre jogadores | `#/pergunta/2` |
| 06 | 215632 | Pergunta sobre veículo | `#/pergunta/3` |
| 07 | 215641 | Pergunta sobre personagem | `#/pergunta/4` |
| 08 | 215649 | Pergunta sobre arma | `#/pergunta/5` |
| 09 | 215658 | Desconto desbloqueado | `#/resultado` |
| 10 | 215709 | Loja, banner Haikyu | `#/loja` |
| 11 | 215722 | Loja, banner Booyah | `?revisao=1&banner=2#/loja` |
| 12 | 215736 | Loja, seção de recarga | `#/loja/recarga` |

As vistas 10–12 pertencem à mesma loja. No fluxo normal, as rotas de resultado e loja exigem concluir as perguntas; os atalhos de revisão preenchem esse estado.

## Origem das artes

`missao-1.jpg` a `missao-5.jpg` são recortes das respectivas perguntas. `banner-haikyu.jpg`, os ícones de jogos e `banner-booyah.jpg` vêm das vistas 10 e 11. `banner-freefire.jpg` e `evento.jpg` vêm da vista 12. `freefire-logo.png` usa a captura de objetivos com transparência extraída. `fundo-missao.jpg` usa a captura de identificação com a área dos controles originais atenuada.

Para maior precisão visual em produção, substitua os recortes por exports originais do marketing, mantendo as proporções. Os textos e controles principais são HTML editável, não capturas de página usadas como interface.
