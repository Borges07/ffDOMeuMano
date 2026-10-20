# Integração para desenvolvimento

## Organização

`config.js` contém marca, produto, perguntas, artes e progressão do desconto. `domain.js` contém funções sem dependência de DOM. `app.js` renderiza as rotas e gerencia eventos. `styles.css` contém os estilos compartilhados e responsivos. Essa divisão pode ser migrada para componentes React sem alterar a organização visual.

O estado atual contém `playerId`, cinco índices de resposta e `slide`. Não há armazenamento persistente nem chamadas externas. O parâmetro `revisao=1` é apenas uma facilidade de apresentação local e não deve conceder descontos no backend.

## Contratos sugeridos, ainda não implementados

| Operação | Entrada | Resposta esperada |
| --- | --- | --- |
| Obter campanha | Identificador da campanha | Versão, perguntas, produtos, período e regras |
| Iniciar participação | Campanha e ID do jogador | Identificador da participação e próxima etapa |
| Registrar resposta | Participação, pergunta e alternativa | Progresso e próxima etapa |
| Calcular oferta | Participação e produto | Preço de referência, desconto, total, validade e identificador da oferta |
| Criar pedido | Oferta, destinatário, método e chave de idempotência | Identificador, status e dados do pagamento autorizado |
| Consultar pedido | Identificador do pedido | Estado do pagamento e da entrega |

O servidor deve recalcular elegibilidade e valores em centavos. Não deve aceitar como autoridade o percentual, o preço ou as respostas armazenados pelo navegador. Defina se o benefício depende de conclusão ou acerto, se pode ser transferido ao alterar o ID e como tratar repetição da campanha.

O botão “Comprar” atualmente abre `order()`, um resumo local. Esse é o ponto para conectar a criação de pedido. Somente após resposta válida do provedor, apresente os dados reais de PIX. Confirmação de pagamento e liberação da recarga devem vir do backend e dos eventos do provedor, com controle de duplicidade.

A validação atual do ID verifica apenas formato, não existência nem titularidade. A interface não solicita senha da conta. Se necessário, a consulta de apelido/conta deve usar a integração autorizada adotada pela equipe.

## Ajustes de produção

Substituir marca e textos comerciais pelos aprovados; confirmar preços, regras e gabarito; trocar artes recortadas pelos exports originais; implementar estados de carregamento, erro, expiração e pagamento; definir persistência; revisar privacidade e termos conforme o tratamento de dados efetivamente implementado.

O HTML atual bloqueia conexões externas pela Content Security Policy. Ajuste `connect-src` para os domínios necessários ao integrar APIs, mantendo segredos no servidor. Remova os atalhos de revisão do pacote público.
