(function(root){'use strict';
function initial(){return {playerId:'',answers:Array(5).fill(null),slide:0};}
function validId(id){return /^\d{4,20}$/.test(String(id).trim());}
function answered(state){return state.answers.filter(x=>Number.isInteger(x)&&x>=0&&x<=3).length;}
function complete(state){return state.answers.length===5&&answered(state)===5;}
function firstUnanswered(state){return state.answers.findIndex(x=>x===null);}
function answer(state,index,option){if(!validId(state.playerId))throw new Error('Informe o ID do jogador.');if(!Number.isInteger(index)||index<0||index>4||!Number.isInteger(option)||option<0||option>3)throw new Error('Resposta inválida.');if(state.answers.slice(0,index).some(x=>x===null))throw new Error('Conclua a etapa anterior.');const answers=state.answers.slice();answers[index]=option;return {...state,answers};}
function quote(state,config){const pct=config.discountByCompleted[answered(state)];const base=config.product.basePriceCents;const total=Math.round(base*(100-pct)/100);return {base,total,discount:base-total,percentage:pct,diamonds:config.product.diamonds};}
function guard(route,state){if(/^pergunta\/[1-5]$/.test(route)){if(!validId(state.playerId))return 'identificacao';const idx=Number(route.split('/')[1])-1,first=firstUnanswered(state);if(first!==-1&&idx>first)return 'pergunta/'+(first+1);}if(['resultado','loja'].includes(route)){if(!validId(state.playerId))return 'identificacao';if(!complete(state))return 'pergunta/'+(firstUnanswered(state)+1);}return route;}
root.GameDomain={initial,validId,answered,complete,firstUnanswered,answer,quote,guard};
})(typeof window!=='undefined'?window:globalThis);
