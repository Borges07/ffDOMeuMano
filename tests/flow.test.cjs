const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.resolve(__dirname,'..');
function boot(hash='#/inicio',search=''){
 const nodes=new Map(),listeners={},timers=new Map();let serial=0;
 function node(selector){if(!nodes.has(selector))nodes.set(selector,{innerHTML:'',textContent:'',open:false,events:{},focus(){},scrollIntoView(){},setAttribute(){},removeAttribute(){},addEventListener(type,fn){this.events[type]=fn;},showModal(){this.open=true;},close(){this.open=false;}});return nodes.get(selector);}
 let currentHash=hash;
 const location={search,assign(value){this.redirectedTo=value;},get hash(){return currentHash;},set hash(value){currentHash=value.startsWith('#')?value:'#'+value;listeners.hashchange?.();},replace(value){this.hash=value;}};
 const context={document:{querySelector:node,title:''},location,URLSearchParams,Intl,console,
 FormData:class{constructor(form){this.form=form;}get(key){return this.form.values[key];}},
 setTimeout(fn){const id=++serial;timers.set(id,fn);return id;},clearTimeout(id){timers.delete(id);},scrollY:0,scrollTo(){},addEventListener(type,fn){listeners[type]=fn;}};
 context.window=context;vm.createContext(context);
 for(const file of ['config','domain','app'])vm.runInContext(fs.readFileSync(path.join(root,'src',file+'.js'),'utf8'),context,{filename:file+'.js'});
 return {context,node,location,html:()=>node('#app').innerHTML,
 click(dataset){node('#app').events.click({target:{closest(selector){return selector==='[data-answer]'&&'answer'in dataset||selector==='[data-slide]'&&'slide'in dataset||selector==='[data-action]'&&'action'in dataset?{dataset}:null;}}});},
 submit(id,values,selector='#app'){node(selector).events.submit({target:{id,values},preventDefault(){}});},
 flush(){const callbacks=[...timers.values()];timers.clear();callbacks.forEach(fn=>fn());}};
}
test('ID obrigatório e bloqueio de atalhos para perguntas e loja',()=>{
 const b=boot('#/loja');assert.equal(b.location.hash,'#/identificacao');
 b.submit('player-form',{playerId:'abc'});assert.match(b.node('#player-error').textContent,/4 a 20/);
 b.submit('player-form',{playerId:'12345678'});assert.equal(b.location.hash,'#/pergunta/1');
 b.location.hash='#/pergunta/5';assert.equal(b.location.hash,'#/pergunta/1');
});
test('percurso completo, proteção contra clique duplo, preço e destinatário do resumo',()=>{
 const b=boot('#/identificacao');b.submit('player-form',{playerId:'12345678'});
 for(let i=0;i<5;i++){b.click({answer:String(i%4),question:String(i)});b.click({answer:'3',question:String(i)});assert.match(b.html(),/RESPOSTA REGISTRADA/);b.flush();}
 assert.equal(b.location.hash,'#/resultado');assert.match(b.html(),/85%/);
 b.location.hash='#/loja';assert.match(b.html(),/19,90/);assert.match(b.html(),/12345678/);
 b.click({action:'buy'});assert.equal(b.location.redirectedTo,'https://pag.ambienteseguro.app/checkout/diamantes-free-fire');
 b.click({action:'edit-id'});b.submit('edit-id-form',{playerId:'87654321'},'#modal');assert.match(b.html(),/87654321/);
 b.click({action:'buy'});assert.equal(b.location.redirectedTo,'https://pag.ambienteseguro.app/checkout/diamantes-free-fire');
 b.click({slide:'next'});assert.match(b.html(),/banner-booyah.jpg/);
 b.click({slide:'next'});assert.match(b.html(),/banner-haikyu.jpg/);
});
test('as 12 vistas de revisão geram conteúdo e todas as imagens existem',()=>{
 const review=fs.readFileSync(path.join(root,'revisao.html'),'utf8');
 const links=[...review.matchAll(/href="(index.html\?revisao[^"]+)"/g)].map(m=>m[1]);assert.equal(links.length,12);
 for(const link of links){const url=new URL(link,'https://local.invalid/');const b=boot(url.hash,url.search);assert.ok(b.html().includes('<main'));assert.ok(!b.html().includes('undefined'));for(const match of b.html().matchAll(/src="([^"]+)"/g))assert.ok(fs.existsSync(path.join(root,match[1])),match[1]);}
 const css=fs.readFileSync(path.join(root,'src/styles.css'),'utf8');for(const match of css.matchAll(/url\('([^']+)'\)/g))assert.ok(fs.existsSync(path.resolve(root,'src',match[1])),match[1]);
});
test('cálculo em centavos e progresso preservado ao revisar uma resposta',()=>{
 const {GameDomain:D,GAME_CONFIG:C}=boot().context;let s={...D.initial(),playerId:'1234'};
 assert.throws(()=>D.answer(s,2,0),/anterior/);assert.throws(()=>D.answer(s,0,4),/inválida/);
 assert.equal(D.quote(s,C).total,13267);
 for(let i=0;i<5;i++)s=D.answer(s,i,3);assert.equal(D.quote(s,C).total,1990);assert.equal(D.quote(s,C).discount,11277);
 const revised=D.answer(s,1,2);assert.equal(D.answered(revised),5);assert.equal(s.answers[1],3);assert.equal(revised.answers[1],2);
});
test('nova página descarta estado e sair reinicia a missão',()=>{
 const b=boot('#/resultado','?revisao=1');b.click({action:'exit'});assert.equal(b.location.hash,'#/inicio');b.location.hash='#/loja';assert.equal(b.location.hash,'#/identificacao');
 assert.equal(boot('#/resultado').location.hash,'#/identificacao');
});
test('trocar de rota durante a resposta cancela o avanço pendente',()=>{
 const b=boot('#/pergunta/1','?revisao=1');b.click({answer:'0',question:'0'});b.location.hash='#/missao';b.flush();assert.equal(b.location.hash,'#/missao');
});
test('atalho de acessibilidade preserva a rota',()=>{
 const b=boot('#/missao');let prevented=false;b.node('.skip').events.click({preventDefault(){prevented=true;}});assert.ok(prevented);assert.equal(b.location.hash,'#/missao');
});
