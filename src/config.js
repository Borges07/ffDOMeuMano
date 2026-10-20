/* Conteúdo e valores de apresentação; nenhuma API de venda ou autenticação. */
window.GAME_CONFIG={
 merchant:'Recarga Jogo',
 checkoutUrl:'https://pag.ambienteseguro.app/checkout/diamantes-free-fire',
 product:{id:'ff-6800',name:'6.800 diamantes',diamonds:6800,basePriceCents:13267},
 discountByCompleted:[0,17,34,51,68,85],
 questions:[
  {id:'mapa',image:'missao-1.jpg',alt:'Mapa de Bermuda',title:'Qual é o nome da principal zona de combate em Free Fire?',options:['Bermuda','Kalahari','Purgatory','Alpine']},
  {id:'jogadores',image:'missao-2.jpg',alt:'Arte Booyah!',title:'Quantos jogadores participam de uma partida normal de Free Fire?',options:['50','52','48','100']},
  {id:'veiculo',image:'missao-3.jpg',alt:'Motocicleta do jogo',title:'Qual destes veículos tem apenas 2 rodas?',options:['Moto','Jeep','Tuk Tuk','Helicóptero']},
  {id:'personagem',image:'missao-4.jpg',alt:'Personagens de Free Fire',title:'Qual foi o primeiro personagem lançado em Free Fire?',options:['Kelly','Ford','Andrew','Nikita']},
  {id:'arma',image:'missao-5.jpg',alt:'Arma e personagens do jogo',title:'Qual arma do Free Fire atravessa parede de gelo?',options:['AWM','M1014','Desert Eagle','Barrett']}
 ],
 banners:[{image:'banner-haikyu.jpg',alt:'Celebração de lançamento de Haikyu! Fly High'},{image:'banner-booyah.jpg',alt:'Passe Booyah em reais'}],
 routes:[['inicio','Pergunta inicial'],['missao','Apresentação da missão'],['identificacao','ID do jogador'],['pergunta/1','Missão 1'],['pergunta/2','Missão 2'],['pergunta/3','Missão 3'],['pergunta/4','Missão 4'],['pergunta/5','Missão 5'],['resultado','Desconto'],['loja','Loja de recarga']]
};
