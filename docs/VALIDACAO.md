# Validação da entrega

Resultado: **7 testes aprovados**, executados com `node --test tests/*.test.cjs`.

Verificados: bloqueio de acesso a etapas futuras; ID inválido; percurso de cinco respostas; clique duplo; desconto de 85% e total de R$ 19,90; edição do destinatário; resumo; alternância de banners; geração das 12 vistas; existência das imagens e fontes; descarte do estado; cancelamento de avanço pendente; atalho de acessibilidade.

A renderização foi verificada em DOM simulado com Node.js. **Não houve inspeção visual em navegador**, teste de responsividade real ou comparação pixel a pixel. As adaptações responsivas estão no CSS e devem ser conferidas pela equipe nos navegadores de destino, especialmente em 390 px, 768 px e nas larguras das capturas.

Pagamentos e entrega não foram testados porque essas integrações não existem nesta versão.
