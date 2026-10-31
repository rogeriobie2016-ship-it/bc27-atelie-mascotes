/* ===== Casca do site: rotas por hash, menu lateral, gaveta, trilha e anterior/próximo ===== */
(function(){
/* Versão do site: mude aqui quando publicar uma atualização */
const SITE={versao:'v1.2',data:'30/10/2026',nome:'Ateliê de Mascotes BC27'};
const PFX=window.BC_HASH||'#/';
const $=q=>document.querySelector(q),$$=q=>Array.from(document.querySelectorAll(q));

const ROUTES=[
  {id:'atelie-duplas',t:'Duplas',g:'Ateliê',page:'atelie',dir:'dupla',n:'4'},
  {id:'comparar-duplas',t:'Comparar duplas',g:'Ateliê',page:'comparar'},
  {id:'atelie-folclore',t:'Folclore',g:'Ateliê',page:'atelie',dir:'folclore',n:'14'},
  {id:'atelie-fauna',t:'Fauna',g:'Ateliê',page:'atelie',dir:'fauna',n:'6'},
  {id:'atelie-cultura-popular',t:'Cultura popular',g:'Ateliê',page:'atelie',dir:'cultura',n:'14'},
  {id:'atelie-fusao',t:'Fusão',g:'Ateliê',page:'atelie',dir:'fusao',n:'6'},
  {id:'atelie-brincante',t:'Brincante',g:'Ateliê',page:'atelie',dir:'brincante',n:'17'},
  {id:'atelie-do-zero',t:'Começar do zero',g:'Ateliê',page:'atelie',dir:'zero',n:'8'},
  {id:'visao-geral',t:'Visão geral',g:'Guia',page:'inicio'},
  {id:'como-usar',t:'Como usar',g:'Guia',page:'como-usar'},
  {id:'exportar',t:'Exportar e Blender',g:'Guia',page:'exportar'},
  {id:'decisoes',t:'Decisões e times',g:'Guia',page:'decisoes'}
];
const byId=Object.fromEntries(ROUTES.map(r=>[r.id,r]));
const byDir=Object.fromEntries(ROUTES.filter(r=>r.dir).map(r=>[r.dir,r]));
const NF={id:'nao-encontrada',t:'Página não encontrada',page:'nao-encontrada'};
const href=id=>PFX+id;

/* menu */
const groups=[...new Set(ROUTES.map(r=>r.g))];
$('#sideNav').innerHTML=groups.map(g=>`<div class="s-group"><h2>${g}</h2>${ROUTES.filter(r=>r.g===g).map(r=>`<a href="${href(r.id)}" data-route="${r.id}">${r.t}${r.n?`<small>${r.n}</small>`:''}</a>`).join('')}</div>`).join('');
$$('[data-r]').forEach(a=>a.setAttribute('href',href(a.dataset.r)));
$('#sideVer').textContent=`${SITE.versao} · atualizado em ${SITE.data}`;

/* gaveta (abaixo de 1024px) */
const side=$('#sidebar'),scrim=$('#scrim'),burger=$('#menuBtn'),mq=matchMedia('(max-width:1023px)');
let open=false;
function setInert(){side.inert=mq.matches&&!open}
function openMenu(){open=true;side.classList.add('open');scrim.hidden=false;burger.setAttribute('aria-expanded','true');document.body.style.overflow='hidden';setInert();const a=side.querySelector('[aria-current]')||side.querySelector('a');a&&a.focus()}
function closeMenu(back){if(!open)return;open=false;side.classList.remove('open');scrim.hidden=true;burger.setAttribute('aria-expanded','false');document.body.style.overflow='';setInert();if(back)burger.focus()}
burger.addEventListener('click',()=>open?closeMenu(true):openMenu());
scrim.addEventListener('click',()=>closeMenu(true));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&open){e.preventDefault();closeMenu(true)}});
side.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu(false)});
mq.addEventListener('change',()=>{if(!mq.matches)closeMenu(false);setInert()});
setInert();

/* pular para o conteúdo, sem mexer na rota */
$('.s-skip').addEventListener('click',e=>{e.preventDefault();const h=$('.s-page:not([hidden]) h1');(h||$('#conteudo')).focus()});

/* restaurar padrão: apaga só os ajustes do ateliê; os looks salvos ficam */
$$('.s-reset').forEach(b=>{const txt=b.textContent;b.addEventListener('click',()=>{
  if(!b.classList.contains('armed')){b.classList.add('armed');b.textContent='Confirmar: apagar ajustes';clearTimeout(b.t);b.t=setTimeout(()=>{b.classList.remove('armed');b.textContent=txt},4000);return}
  try{localStorage.removeItem('bc27-atelie-3d-v1')}catch(e){}location.reload()})});

/* rotas */
let first=true,cur=null;
function parse(){const h=decodeURIComponent(location.hash.replace(/^#\/?/,''));if(h==='inicio')return byId['visao-geral'];if(!h||h==='atelie'){const d=window.atelie&&atelie.getDir();return byDir[d]||byId['atelie-duplas']}return byId[h]||NF}
function show(){
  const r=parse();
  const raw=location.hash.replace(/^#\/?/,'');if(raw==='atelie'||raw==='inicio'){history.replaceState(null,'',href(r.id))}
  if(r.dir&&window.atelie)atelie.setDir(r.dir);
  const changed=!cur||cur.page!==r.page;
  $$('.s-page').forEach(p=>p.hidden=p.dataset.page!==r.page);
  $$('#sideNav a').forEach(a=>a.dataset.route===r.id?a.setAttribute('aria-current','page'):a.removeAttribute('aria-current'));
  const crumbs=[`<li><a href="${href('atelie')}">Ateliê</a></li>`,`<li><span aria-current="page">${r.t}</span></li>`];
  $('#crumbs').innerHTML=crumbs.join('');
  const i=ROUTES.indexOf(r),prev=i>0?ROUTES[i-1]:null,next=i>=0&&i<ROUTES.length-1?ROUTES[i+1]:null;
  $('#pager').innerHTML=i<0?`<a class="s-next" href="${href('atelie')}"><span>Voltar</span><b>Ateliê</b></a>`:
    (prev?`<a class="s-prev" href="${href(prev.id)}"><span>← Anterior</span><b>${prev.t}</b></a>`:'')+(next?`<a class="s-next" href="${href(next.id)}"><span>Próximo →</span><b>${next.t}</b></a>`:'');
  document.title=`${r.t} | ${SITE.nome}`;
  if(!first){window.scrollTo(0,0);const h=$(`.s-page[data-page="${r.page}"] h1`);if(h){h.setAttribute('tabindex','-1');h.focus({preventScroll:true})}}
  if(changed&&r.page==='atelie')window.dispatchEvent(new Event('resize'));
  if(changed&&r.page==='comparar')compare();
  cur=r;first=false;
}
/* comparar duplas: fotografa as 4 duplas no mesmo estilo */
const cg=$('#cmpGrid'),cs=$('#cmpStyle'),cst=$('#cmpStatus'),csheet=$('#cmpSheet');let busy=false,again=false,shots=[],info=[];
const esc=t=>String(t).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
async function compare(){
  if(!window.atelie||!atelie.snapPairs){cst.textContent='O 3D não abriu neste navegador. Tente o Chrome ou o Safari atualizados.';return}
  if(busy){again=true;return}busy=true;
  if(!cs.options.length){cs.innerHTML=atelie.styles().map(o=>`<option value="${o.k}">${esc(o.n)}${o.dim==='2d'?' (2D)':''}</option>`).join('');cs.value=atelie.style()}
  info=atelie.pairs();csheet.disabled=true;cst.textContent='Gerando as 4 duplas...';
  if(!shots.length)cg.innerHTML=info.map(()=>'<div class="s-cmp-card"><div class="s-cmp-ph"></div><div class="s-cmp-txt"><h2>&nbsp;</h2></div></div>').join('');
  try{
    shots=await atelie.snapPairs(cs.value,900,900);
    const sn=(cs.options[cs.selectedIndex]||{}).text||'';
    cg.innerHTML=info.map((p,i)=>`<article class="s-cmp-card"><img src="${shots[i].url}" width="900" height="900" alt="${esc(p.a)} e ${esc(p.b)} no estilo ${esc(sn)}"><div class="s-cmp-txt"><h2>${esc(p.a)} + ${esc(p.b)}${p.star?'<span class="s-badge">Recomendada</span>':''}</h2><p><span>Por que essa dupla</span>${esc(p.forca)}</p><p><span>Cuidado</span>${esc(p.cuidado)}</p><button class="btn" type="button" data-open="${p.id}">Editar no ateliê</button></div></article>`).join('');
    cst.textContent='';csheet.disabled=false;
  }catch(e){cst.textContent='Não foi possível gerar as duplas. Clique em Atualizar.'}
  finally{busy=false;if(again){again=false;compare()}}
}
cs.addEventListener('change',compare);$('#cmpRefresh').addEventListener('click',compare);
cg.addEventListener('click',e=>{const b=e.target.closest('[data-open]');if(b){atelie.openPair(b.dataset.open);location.hash=href('atelie-duplas')}});
function wrap(c,t,x,y,w,lh){const ws=t.split(' ');let l='';for(const wd of ws){const tt=l?l+' '+wd:wd;if(c.measureText(tt).width>w&&l){c.fillText(l,x,y);y+=lh;l=wd}else l=tt}if(l)c.fillText(l,x,y);return y+lh}
csheet.addEventListener('click',async()=>{if(!shots.length)return;cst.textContent='Montando a prancha...';
  try{try{await document.fonts.ready}catch(e){}
    const imgs=await Promise.all(shots.map(s=>new Promise((ok,no)=>{const im=new Image();im.onload=()=>ok(im);im.onerror=no;im.src=s.url})));
    const S=900,G=40,T=150,L=170,W=G*3+S*2,H=T+2*(S+L)+G,c=document.createElement('canvas');c.width=W;c.height=H;const x=c.getContext('2d');
    x.fillStyle='#F3F6F1';x.fillRect(0,0,W,H);x.fillStyle='#03633B';x.font='800 60px "Bricolage Grotesque", system-ui, sans-serif';x.fillText('BC27 · As 4 duplas',G,90);
    x.font='600 24px "JetBrains Mono", ui-monospace, monospace';x.fillStyle='#4A5D53';x.fillText('Estilo: '+((cs.options[cs.selectedIndex]||{}).text||''),G,128);
    info.forEach((p,i)=>{const px=G+(i%2)*(S+G),py=T+Math.floor(i/2)*(S+L);x.drawImage(imgs[i],px,py,S,S);x.fillStyle='#0E2A1D';x.font='800 40px "Bricolage Grotesque", system-ui, sans-serif';x.fillText(p.a+' + '+p.b+(p.star?'  (recomendada)':''),px,py+S+50);x.fillStyle='#4A5D53';x.font='600 24px "Bricolage Grotesque", system-ui, sans-serif';wrap(x,p.forca,px,py+S+88,S,30)});
    const blob=await new Promise(r=>c.toBlob(r,'image/png'));if(!blob)throw 0;
    await atelie.saveFile(`bc27-duplas-${cs.value}-${W}x${H}.png`,blob);cst.textContent='Arquivo baixado';
  }catch(e){cst.textContent=e&&e.code==='declined'?'Download cancelado':'Não foi possível baixar a prancha.'}});

/* quando a pessoa troca a direção pelos botões do próprio ateliê, a rota acompanha */
window.onAtelieDir=d=>{const r=byDir[d];if(r&&parse().id!==r.id)location.hash=href(r.id)};
window.addEventListener('hashchange',show);
show();
})();
