/* ============ PARTE B: interface ============ */
(function(){
const $=q=>document.querySelector(q);
if(!window.THREE||!THREE.OrbitControls){$('#stageMsg').hidden=false;return}

const PAIRS=[
  {id:'cuca-boto',a:'cuca',b:'boto',star:1,forca:'Par ranzinza e alegre. Cuca acadêmica conversa com Harvard e MIT. Os dois são neutros entre os times.',cuidado:'Cuca com desenho próprio, sem a cara da versão da TV. Boto é anfitrião festeiro, nunca galã.'},
  {id:'boi-boto',a:'boi',b:'boto',forca:'O Boi já é tradição de fantasia: alegórico de verdade, com gente dançando dentro.',cuidado:'Nunca vermelho com azul no Boi (Garantido e Caprichoso).'},
  {id:'mapinguari-curupira',a:'mapinguari',b:'curupira',forca:'Gordo e magro literal. Pelúcia no estilo dos mascotes da NBA.',cuidado:'O Curupira pode colidir com o time Mata e com mascotes de Copa.'},
  {id:'iara-saci',a:'iara',b:'saci',forca:'Personagens muito conhecidos.',cuidado:'Os dois são de times. Saci de uma perna não serve em gincana e pede representação cuidadosa.'}
];
const CATS={folclore:0,fauna:1,cultura:2};
const DIRS={dupla:{n:'Duplas',forca:'Cobre gala e parceiros de um lado, gincana e redes do outro.',risco:'Dobra o custo: duas fantasias, dois modelos.'},
  folclore:{n:'Folclore',forca:'Personagens das lendas brasileiras, prontos para vestir.',risco:'Evite escolher um personagem que já é de algum time.'},
  fauna:{n:'Fauna',forca:'Bichos queridos do Brasil, fáceis de virar pelúcia e fantasia.',risco:'Precisa de traço próprio para não lembrar mascote de outra marca.'},
  cultura:{n:'Cultura popular',forca:'Festas, ofícios e tradições do Brasil inteiro.',risco:'Validar o traje com quem vive a tradição antes de produzir.'},
  fusao:{n:'Fusão',forca:'Neutro entre times. O time que vence a gincana acende a sua peça.',risco:'Visual carregado e difícil como fantasia.'},
  brincante:{n:'Brincante',forca:'O dress-up é o próprio conceito: ele veste o folclore.',risco:'Identidade própria mais fraca, depende do figurino.'},
  zero:{n:'Começar do zero',forca:'Monte um personagem novo com todas as peças: cabeça, corpo, cauda, cores e o resto.',risco:'Sem lenda por trás, ele precisa de uma história própria.'}};
const ROSTER=[['Folclore',['cuca','boto','boi','mapinguari','curupira','iara','saci','lobisomem','mula','capelobo','boitata','norato','matinta','fulozinha']],['Fauna',['arara','tucano','uirapuru','onca','mico','capivara']],['Cultura popular',['passista','baiana','maracatu','cangaceiro','vaqueiro','jangadeiro','rendeira','repentista','gaucho','capoeirista','sambista','caipira','torcedor','brincante']],['Times',['fusao']]];
const HAIRS=[['curto','Curto'],['cacheado','Cacheado'],['coque','Coque'],['longo','Longo'],['nenhum','Raspado']];
const FALAS={zero:'Prazer! Acabei de nascer na BC.',mula:'Sem cabeça, mas com muita ideia!',fulozinha:'Quem cuida da mata sou eu.',norato:'Do rio até Harvard!',uirapuru:'Escuta esse canto!',tucano:'Tô de bico aberto pra BC!',mico:'Pequeno, mas dourado!',jangadeiro:'Do Ceará pro mundo!',vaqueiro:'Eita, que a boiada chegou!',rendeira:'Cada ponto, uma história.',maracatu:'A nação chegou!',repentista:'Rimei BC com felicidade!',lobisomem:'Auuu! Bora pra BC!',capelobo:'Meu faro não erra: vai ser incrível.',boitata:'Eu acendo essa festa!',matinta:'Fiu fiu! Ouviu o assobio?',arara:'Ninguém fala mais alto que eu!',onca:'Força total, time!',capivara:'Calma. Vai dar tudo certo.',passista:'Abre a sombrinha que é frevo!',baiana:'Axé pra quem chega!',cangaceiro:'O sertão também é Harvard.',gaucho:'Bah, que conferência tri!',capoeirista:'Ginga, galera!',sambista:'Hoje é dia de festa!',caipira:'Olha a cobra! É mentira!',torcedor:'É do Brasil!',
cuca:'Silêncio, que a palestra já vai começar!',boto:'Bora, galera! Inscrições abertas!',boi:'Que a festa comece!',mapinguari:'Pode deixar que eu cuido de vocês.',curupira:'Duvido me alcançar!',iara:'Vem pro rio, vem pra BC!',saci:'Alguém viu meu gorro?',brincante:'Hoje eu sou o Boto!',fusao:'Qual time acende hoje?'};
const OPT={
  expr:[['feliz','Feliz'],['torcendo','Torcendo'],['bravo','Bravo-cômico'],['surpreso','Surpreso'],['piscando','Piscando'],['pensando','Pensando'],['triste','Triste'],['vitorioso','Vitorioso']],
  outfit:[['base','Natural','O traje da lenda'],['jangadeiro','Jangadeiro','Listras do mar'],['vaqueiro','Vaqueiro','Gibão de couro'],['rendeira','Rendeira','Renda e saia'],['maracatu','Maracatu','Manto de rainha'],['folhas','Folhagem','Vestido de mata'],['gala','Gala','Beca, terno ou joias'],['gincana','Gincana','Camisa 27 do time'],['chita','Chita','Festa brasileira'],['junino','Junino','Xadrez e remendo'],['frevo','Frevo','Listras de Recife'],['baiana','Baiana','Saia rodada de renda'],['cangaceiro','Cangaceiro','Couro do sertão'],['gaucho','Gaúcho','Bombacha e lenço'],['capoeira','Capoeira','Abadá e corda'],['carnaval','Carnaval','Paetê e plumas'],['canarinho','Canarinho','Camisa amarela 27']],
  pose:[['parado','Parado','Institucional'],['acenando','Acenando','Boas-vindas'],['torcendo','Torcendo','Pulo de festa'],['correndo','Correndo','Gincana'],['pensando','Pensando','Card e quadrinho']],
  prop:[['nenhum','Mãos livres'],['livro','Livro BC'],['bandeira','Bandeira BC27'],['trofeu','Troféu'],['microfone','Microfone'],['sombrinha','Sombrinha de frevo'],['berimbau','Berimbau'],['pandeiro','Pandeiro'],['cuia','Cuia de chimarrão'],['bola','Bola'],['bandeirinhas','Bandeirinhas'],['maraca','Maracá'],['viola','Viola'],['estandarte','Estandarte'],['remo','Remo de jangada'],['bilro','Almofada de bilro'],['celular','Celular (selfie)'],['megafone','Megafone'],['balao','Balões'],['placa','Placa BORA BC27'],['pipa','Pipa'],['sorvete','Sorvete'],['coco','Água de coco'],['caneca','Caneca de café'],['acai','Açaí na tigela'],['coxinha','Coxinha'],['pirulito','Pirulito'],['camera','Câmera']],
  team:[['neutro','Neutro'],['correnteza','Correnteza'],['chama','Chama'],['mata','Mata'],['vendaval','Vendaval'],['fusao','Os quatro']],
  mask:[['nenhuma','Rosto livre'],['mula','Mula de fogo'],['tucano','Tucano'],['mico','Mico-leão'],['boto','Boto'],['jacare','Jacaré'],['boi','Boi'],['mapinguari','Mapinguari'],['lobisomem','Lobisomem'],['capelobo','Capelobo'],['coruja','Matinta'],['arara','Arara'],['onca','Onça'],['capivara','Capivara'],['cobra','Cobra de fogo'],['curupira','Curupira'],['boitata','Crista do Boitatá'],['saci','Saci']]
};
const BGS={verde:{n:'Verde BC',bg:BC.green,floor:'#0B7A4A',disc:BC.alt},claro:{n:'Claro',bg:BC.alt,floor:'#E3EAE3',disc:'#FFFFFF'},azul:{n:'Azul',bg:BC.blue,floor:'#1E8DEB',disc:BC.yellow},amarelo:{n:'Amarelo',bg:BC.yellow,floor:'#EEEA86',disc:BC.green}};
const RANGES={head:[.8,1.4],height:[.85,1.15],body:[.85,1.2]};

/* ---- estado ---- */
const KEY='bc27-atelie-3d-v1',KEYL='bc27-atelie-3d-looks-v1';
const load=(k,d)=>{try{const v=localStorage.getItem(k);return v?JSON.parse(v):d}catch(e){return d}};
const save=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}};
const chars={};Object.keys(SPECIES).forEach(id=>chars[id]=defaultChar(id));
let state={dir:'dupla',pair:'cuca-boto',custom:{a:'cuca',b:'boto'},solo:false,active:'cuca',cat:'roupa',bg:'verde',cam:'corpo',spin:false,style:'3d',frame:'livre',livre:'capivara',scen:'liso',pick:{folclore:'cuca',fauna:'capivara',cultura:'passista'},last:{'3d':'cartoon3d','2d':'cartoon2d'},chars};
const saved=load(KEY,null);if(saved&&saved.chars){Object.keys(SPECIES).forEach(id=>{if(saved.chars[id])chars[id]={...defaultChar(id),...saved.chars[id]}});state={...state,...saved,chars}}
if(state.dir==='livre'){const c=Object.keys(CATS).find(k=>ROSTER[CATS[k]][1].includes(state.livre));state.dir=c||'folclore';if(c)state.pick[c]=state.livre}
state.pick={folclore:'cuca',fauna:'capivara',cultura:'passista',...(state.pick||{})};state.last={'3d':'cartoon3d','2d':'cartoon2d',...(state.last||{})};
if(state.style==='3d')state.style='vinil';if(state.style==='2d')state.style='cartoon3d';if(!STY[state.style])state.style='vinil';
const hist=[];const pushHist=()=>{hist.push(JSON.stringify(state.chars));if(hist.length>40)hist.shift()};
const inView=()=>CATS[state.dir]!==undefined?[state.pick[state.dir]]:state.dir==='zero'?['zero']:state.dir==='fusao'?['fusao']:state.dir==='brincante'?['brincante']:(()=>{if(state.pair==='livre'){const c=state.custom||{};return [SPECIES[c.a]?c.a:'cuca',SPECIES[c.b]&&c.b!==c.a?c.b:(c.a==='boto'?'cuca':'boto')]}const p=PAIRS.find(x=>x.id===state.pair)||PAIRS[0];return [p.a,p.b]})();
const soloOn=()=>state.dir==='dupla'&&!!state.solo;
if(!inView().includes(state.active))state.active=inView()[0];
const renderIds=()=>state.frame==='card'||soloOn()?[state.active]:inView();
const persist=()=>save(KEY,state);

/* ---- cena ---- */
const cv=$('#cv'),stageEl=$('#stage');
let renderer;try{renderer=new THREE.WebGLRenderer({canvas:cv,antialias:true,preserveDrawingBuffer:true})}catch(e){$('#stageMsg').hidden=false;return}
renderer.setPixelRatio(Math.min(2,window.devicePixelRatio||1));renderer.outputEncoding=THREE.sRGBEncoding;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=.8;renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
const scene=new THREE.Scene();
/* ---- modo 2D: toon, contorno e molduras ---- */
const GRAD=new THREE.DataTexture(new Uint8Array([72,72,72,255,170,170,170,255,255,255,255,255]),3,1);GRAD.minFilter=GRAD.magFilter=THREE.NearestFilter;GRAD.needsUpdate=true;
const GRAD2=new THREE.DataTexture(new Uint8Array([125,125,125,255,255,255,255,255]),2,1);GRAD2.minFilter=GRAD2.magFilter=THREE.NearestFilter;GRAD2.needsUpdate=true;
const GRAD1=new THREE.DataTexture(new Uint8Array([255,255,255,255]),1,1);GRAD1.needsUpdate=true;
const OUTL=new THREE.ShaderMaterial({uniforms:{c:{value:new THREE.Color(BC.ink)},t:{value:.001}},vertexShader:'uniform float t;void main(){vec3 n=normalize(normalMatrix*normal);vec4 mv=modelViewMatrix*vec4(position,1.);mv.xyz+=n*t*(-mv.z);gl_Position=projectionMatrix*mv;}',fragmentShader:'uniform vec3 c;void main(){gl_FragColor=vec4(c,1.);}',side:THREE.BackSide});
const TC=new Map();
function toonify(root){const ms=[];root.traverse(o=>{if(o.isMesh)ms.push(o)});
  ms.forEach(o=>{const om=o.material;let tm=TC.get(om);
    if(!tm){tm=new THREE.MeshToonMaterial({color:om.color?om.color.clone():new THREE.Color('#FFFFFF'),map:om.map||null,gradientMap:(STY[state.style].grad===1?GRAD1:STY[state.style].grad===2?GRAD2:GRAD),transparent:om.transparent,opacity:om.opacity,side:om.side,depthWrite:om.depthWrite});
      if(om.emissive&&om.emissiveIntensity>0){tm.emissive=om.emissive.clone();tm.emissiveIntensity=om.emissiveIntensity*.8}TC.set(om,tm)}
    o.material=tm;
    if(om.transparent||/Circle|Plane|Shape/.test(o.geometry.type)||(om.emissiveIntensity>0&&om.color&&om.color.getHex()===0xffffff))return;
    if(!STY[state.style].outline)return;const ol=new THREE.Mesh(o.geometry,OUTL);ol.castShadow=false;ol.receiveShadow=false;o.add(ol)})}
function outlineT(){OUTL.uniforms.t.value=(STY[state.style].outline||2.6)*renderer.getPixelRatio()*(camera.fov*Math.PI/180)/Math.max(1,renderer.domElement.height)}
let HT=null;function halftone(){if(HT)return HT;const c=document.createElement('canvas');c.width=c.height=1024;const x=c.getContext('2d');x.fillStyle=BC.yellow;x.fillRect(0,0,1024,1024);x.fillStyle='rgba(3,99,59,.16)';for(let j=0;j<1024;j+=22)for(let i=0;i<1024;i+=22){x.beginPath();x.arc(i+((j/22)%2)*11,j,3+5*(j/1024),0,7);x.fill()}HT=new THREE.CanvasTexture(c);HT.encoding=THREE.sRGBEncoding;return HT}
const ov=document.getElementById('ov'),oc=ov.getContext('2d');
function rr(c,x,y,w,h,r){c.moveTo(x+r,y);c.arcTo(x+w,y,x+w,y+h,r);c.arcTo(x+w,y+h,x,y+h,r);c.arcTo(x,y+h,x,y,r);c.arcTo(x,y,x+w,y,r);c.closePath()}
function cardRect(W,H){const ch=H*.94,cw=Math.min(W*.94,ch*5/7);return {x:(W-cw)/2,y:(H-ch)/2,w:cw,h:ch}}
function wrapLines(c,t,maxW){const ws=String(t).split(/\s+/).filter(Boolean),L=[];let cur='';ws.forEach(w=>{const tt=cur?cur+' '+w:w;if(c.measureText(tt).width>maxW&&cur){L.push(cur);cur=w}else cur=tt});if(cur)L.push(cur);return L.slice(0,4)}
function stats(id){const s=state.chars[id],b=SPECIES[id].role==='inst'?{Sabedoria:8,Carisma:7,Ginga:4,Energia:5}:{Sabedoria:5,Carisma:8,Ginga:9,Energia:8};
  ({correnteza:['Carisma'],chama:['Energia'],mata:['Sabedoria'],vendaval:['Ginga'],fusao:['Sabedoria','Carisma','Ginga','Energia']}[s.team]||[]).forEach(k=>b[k]++);
  if(s.outfit==='gincana')b.Energia++;if(s.outfit==='gala')b.Carisma++;Object.keys(b).forEach(k=>b[k]=Math.min(10,b[k]));return b}
function drawOverlay(){const W=renderer.domElement.width,H=renderer.domElement.height,k=renderer.getPixelRatio();if(ov.width!==W||ov.height!==H){ov.width=W;ov.height=H}
  oc.clearRect(0,0,W,H);if(state.frame==='livre')return;
  if(state.frame==='quadrinho'){
    current.forEach((ch,i)=>{const s=state.chars[ch.id],p=ch.meta.headG.localToWorld(new THREE.Vector3(0,ch.meta.headTop*1.02,0)).project(camera);if(p.z>1)return;
      const hx=(p.x+1)/2*W,hy=(1-p.y)/2*H;oc.font=`800 ${15*k}px ${FONT}`;
      const lines=wrapLines(oc,(s.fala||FALAS[ch.id]).toUpperCase(),190*k),lh=19*k,bw=Math.max(...lines.map(l=>oc.measureText(l).width))+32*k,bh=lines.length*lh+24*k;
      const left=current.length>1?i===0:hx>W/2;let bx=left?hx-bw-24*k:hx+24*k,by=hy-bh-56*k;bx=Math.max(18*k,Math.min(W-bw-18*k,bx));by=Math.max(18*k,by);
      const tx=bx+bw*(left?.72:.28),tb=by+bh;oc.lineJoin='round';oc.lineWidth=3.5*k;oc.strokeStyle=BC.ink;oc.fillStyle='#FFFFFF';
      oc.beginPath();oc.moveTo(tx-12*k,tb-2*k);oc.lineTo(hx+(left?-8:8)*k,hy-8*k);oc.lineTo(tx+12*k,tb-2*k);oc.closePath();oc.fill();oc.stroke();
      oc.beginPath();rr(oc,bx,by,bw,bh,18*k);oc.fill();oc.stroke();oc.fillRect(tx-10*k,tb-6*k,20*k,8*k);
      oc.fillStyle=BC.ink;oc.textAlign='center';oc.textBaseline='middle';lines.forEach((l,j)=>oc.fillText(l,bx+bw/2,by+12*k+lh*(j+.5)))});
    oc.lineWidth=8*k;oc.strokeStyle=BC.ink;oc.strokeRect(5*k,5*k,W-10*k,H-10*k)}
  if(state.frame==='card'){const id=state.active,s=state.chars[id],T=TEAMS[s.team],C=cardRect(W,H),st=stats(id),rad=22*k,bw=14*k,iw=C.w-2*bw;
    const alt=(getComputedStyle(document.documentElement).getPropertyValue('--surface-alt')||BC.alt).trim();
    oc.beginPath();oc.rect(0,0,W,H);rr(oc,C.x,C.y,C.w,C.h,rad);oc.fillStyle=alt;oc.fill('evenodd');
    oc.beginPath();rr(oc,C.x,C.y,C.w,C.h,rad);rr(oc,C.x+bw,C.y+bw,iw,C.h-2*bw,rad*.6);oc.fillStyle=id==='fusao'?BC.green:T.main;oc.fill('evenodd');
    const bh=58*k;oc.beginPath();rr(oc,C.x+bw,C.y+bw,iw,bh,rad*.6);oc.fillStyle=BC.green;oc.fill();
    oc.fillStyle=BC.yellow;oc.font=`800 ${28*k}px ${FONT}`;oc.textAlign='left';oc.textBaseline='middle';oc.fillText(String(s.nome).toUpperCase(),C.x+bw+16*k,C.y+bw+bh/2+1*k);
    const bx=C.x+C.w-bw-34*k,by=C.y+bw+bh/2;oc.beginPath();oc.arc(bx,by,20*k,0,7);oc.fillStyle=id==='fusao'?BC.bright:T.acc;oc.fill();oc.fillStyle=BC.ink;oc.font=`800 ${10*k}px ${FONT}`;oc.textAlign='center';oc.fillText((id==='fusao'?'TODOS':T.el).toUpperCase(),bx,by+1*k);
    const ph=158*k,py=C.y+C.h-bw-ph;oc.beginPath();rr(oc,C.x+bw,py,iw,ph,rad*.6);oc.fillStyle='#FFFFFF';oc.fill();
    oc.fillStyle='#4A5D53';oc.font=`600 ${11*k}px ${FONT}`;oc.textAlign='left';oc.fillText(`${SPECIES[id].role==='inst'?'INSTITUCIONAL':'DINÂMICO'} · ${SPECIES[id].sub.toUpperCase()}`,C.x+bw+16*k,py+20*k);
    const px0=C.x+bw+112*k,pw=(iw-128*k)/10;
    Object.entries(st).forEach(([n,v],i)=>{const y=py+44*k+i*25*k;oc.fillStyle=BC.ink;oc.font=`700 ${13*k}px ${FONT}`;oc.fillText(n,C.x+bw+16*k,y);
      for(let j=0;j<10;j++){oc.beginPath();rr(oc,px0+j*pw,y-6*k,pw-4*k,12*k,3*k);oc.fillStyle=j<v?BC.green:'#E3EAE3';oc.fill()}});
    oc.fillStyle='#4A5D53';oc.font=`600 ${9.5*k}px ${FONT}`;oc.textAlign='center';oc.fillText('BRAZIL CONFERENCE · HARVARD & MIT · 2027',C.x+C.w/2,C.y+C.h-bw-12*k)}}
if(THREE.RoomEnvironment){const pm=new THREE.PMREMGenerator(renderer);scene.environment=pm.fromScene(new THREE.RoomEnvironment(),.04).texture}
const camera=new THREE.PerspectiveCamera(28,1,.05,80);camera.position.set(0,1.3,5.4);
const controls=new THREE.OrbitControls(camera,cv);controls.enableDamping=true;controls.minDistance=1;controls.maxDistance=14;controls.maxPolarAngle=Math.PI*.53;controls.target.set(0,.8,0);
scene.add(new THREE.HemisphereLight('#FFFFFF','#2E5A44',.22));
const key=new THREE.DirectionalLight('#FFF4E2',1.8);key.position.set(2.6,4.2,3.2);key.castShadow=true;key.shadow.mapSize.set(2048,2048);Object.assign(key.shadow.camera,{left:-3,right:3,top:3,bottom:-3,near:.5,far:14});key.shadow.camera.updateProjectionMatrix();key.shadow.bias=-.0004;key.shadow.normalBias=.02;key.shadow.radius=6;scene.add(key);
const rim=new THREE.DirectionalLight('#D6F5FF',1.1);rim.position.set(-3,2.6,-3.2);scene.add(rim);
const fill=new THREE.DirectionalLight('#FFFFFF',.35);fill.position.set(-2.5,1.2,3);scene.add(fill);
const floor=new THREE.Mesh(new THREE.CircleGeometry(16,72),new THREE.MeshStandardMaterial({roughness:.95}));floor.rotation.x=-Math.PI/2;floor.receiveShadow=true;scene.add(floor);
const disc=new THREE.Mesh(new THREE.CylinderGeometry(1.75,1.8,.03,96),new THREE.MeshStandardMaterial({roughness:.6}));disc.position.y=.015;disc.receiveShadow=true;scene.add(disc);
const catcher=new THREE.Mesh(new THREE.CircleGeometry(16,64),new THREE.ShadowMaterial({opacity:.2}));catcher.rotation.x=-Math.PI/2;catcher.position.y=.031;catcher.receiveShadow=true;catcher.visible=false;scene.add(catcher);
const turn=new THREE.Group();turn.position.y=.03;scene.add(turn);
const ring=new THREE.Mesh(new THREE.RingGeometry(.42,.47,64),new THREE.MeshStandardMaterial({color:BC.bright,emissive:BC.bright,emissiveIntensity:.6,side:THREE.DoubleSide}));ring.rotation.x=-Math.PI/2;ring.position.y=.004;turn.add(ring);
let current=[];
const isW2=renderer.capabilities.isWebGL2;
const RT=new THREE.WebGLRenderTarget(4,4,isW2?{samples:4,type:THREE.HalfFloatType}:{});
const postCam=new THREE.OrthographicCamera(-1,1,1,-1,0,1),postScene=new THREE.Scene();
const POSTM=new THREE.ShaderMaterial({uniforms:{tC:{value:RT.texture},res:{value:new THREE.Vector2(4,4)},mode:{value:1}},depthTest:false,depthWrite:false,
 vertexShader:'varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position.xy,0.,1.);}',
 fragmentShader:`uniform sampler2D tC;uniform vec2 res;uniform float mode;varying vec2 vUv;
 float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
 float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);}
 float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<4;i++){v+=a*noise(p);p*=2.;a*=.5;}return v;}
 vec3 aces(vec3 c){return clamp((c*(2.51*c+.03))/(c*(2.43*c+.59)+.14),0.,1.);}
 vec3 tos(vec3 c){return pow(max(c,0.),vec3(1./2.2));}
 float lum(vec3 c){return dot(c,vec3(.299,.587,.114));}
 float L(vec2 u){return lum(tos(texture2D(tC,u).rgb));}
 float sob(vec2 u,vec2 p){float tl=L(u+p*vec2(-1,1)),t=L(u+p*vec2(0,1)),tr=L(u+p*vec2(1,1)),l=L(u+p*vec2(-1,0)),r=L(u+p*vec2(1,0)),bl=L(u+p*vec2(-1,-1)),b=L(u+p*vec2(0,-1)),br=L(u+p*vec2(1,-1));float gx=tr+2.*r+br-tl-2.*l-bl,gy=tl+2.*t+tr-bl-2.*b-br;return sqrt(gx*gx+gy*gy);}
 void main(){vec2 px=1./res;vec2 fc=gl_FragCoord.xy;
  if(mode<1.5){vec2 w=(vec2(fbm(vUv*9.),fbm(vUv*9.+3.))-.5)*px*4.;vec3 c=tos(texture2D(tC,vUv+w).rgb);
   float l=lum(c),h=step(.55,fract((fc.x+fc.y)/7.)),h2=step(.55,fract((fc.x-fc.y)/7.));
   c*=mix(1.,.86+.14*h,smoothstep(.55,.25,l));c*=mix(1.,.88+.12*h2,smoothstep(.3,.12,l));
   c=mix(c,vec3(.98,.96,.9),.06);c*=.94+.06*fbm(fc/2.5);gl_FragColor=vec4(c,1.);}
  else if(mode>2.5){vec2 w1=(vec2(fbm(vUv*14.),fbm(vUv*14.+5.))-.5)*px*4.,w2=(vec2(fbm(vUv*11.+9.),fbm(vUv*11.+2.))-.5)*px*6.;
   float e1=smoothstep(.12,.45,sob(vUv+w1,px*1.2)),e2=smoothstep(.15,.5,sob(vUv+w2,px*1.6))*.6;float l=L(vUv);
   float pn=.6+.4*noise(fc*vec2(.35,2.2));float h1=step(.62,fract((fc.x+fc.y*.6)/5.))*smoothstep(.72,.45,l)*pn,h2=step(.62,fract((fc.x-fc.y*.8)/5.))*smoothstep(.42,.2,l)*pn;
   float ink=clamp(max(e1,e2)+.35*h1+.35*h2,0.,1.)*(.75+.25*noise(fc*.7));
   vec3 paper=vec3(.975,.962,.93)*(.95+.05*fbm(fc/3.));vec3 tint=mix(paper,tos(texture2D(tC,vUv).rgb),.1);
   gl_FragColor=vec4(mix(tint,vec3(.24,.23,.27),ink),1.);}
  else{vec2 w=(vec2(fbm(vUv*5.),fbm(vUv*5.+7.))-.5)*px*8.;vec2 q=vUv+w;
   vec3 c=aces(texture2D(tC,q).rgb*.95);vec3 b=vec3(0.);for(int i=0;i<8;i++){float a=float(i)*.785;b+=aces(texture2D(tC,q+vec2(cos(a),sin(a))*px*3.).rgb*.95);}b/=8.;
   vec3 col=mix(c,b,.35);float e=length(c-b);col*=1.-clamp(e*2.2,0.,.4);
   float g=fbm(fc/2.2);col=mix(col,col*col,.15*g);col=tos(col);col=pow(col,vec3(1.12));col=mix(col,vec3(1.),.03+.04*fbm(vUv*3.));
   col*=.92+.08*fbm(fc/4.+11.);gl_FragColor=vec4(col,1.);}}`});
postScene.add(new THREE.Mesh(new THREE.PlaneGeometry(2,2),POSTM));
function sizeRT(){const v=new THREE.Vector2();renderer.getDrawingBufferSize(v);RT.setSize(Math.max(4,v.x),Math.max(4,v.y));POSTM.uniforms.res.value.copy(v)}
function renderFrame(){const Y=STY[state.style];if(Y.post){renderer.setRenderTarget(RT);renderer.render(scene,camera);renderer.setRenderTarget(null);POSTM.uniforms.mode.value=Y.post==='desenho'?1:Y.post==='rascunho'?3:2;renderer.render(postScene,postCam)}else renderer.render(scene,camera)}
let blobs=[];const BLOBG=new THREE.PlaneGeometry(1,1);const BLOBM=(()=>{const c=document.createElement('canvas');c.width=c.height=128;const x=c.getContext('2d'),g=x.createRadialGradient(64,64,0,64,64,64);g.addColorStop(0,'rgba(0,0,0,.42)');g.addColorStop(.55,'rgba(0,0,0,.18)');g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.fillRect(0,0,128,128);return new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(c),transparent:true,depthWrite:false})})();
const scenG=new THREE.Group();scene.add(scenG);
let WV=null;function wavesTex(){if(WV)return WV;const c=document.createElement('canvas');c.width=c.height=512;const x=c.getContext('2d');x.fillStyle='#F4EFE3';x.fillRect(0,0,512,512);x.strokeStyle='#1A1A1A';x.lineWidth=34;for(let r=0;r<5;r++){x.beginPath();for(let i=0;i<=512;i+=8){const y=r*102.4+40+Math.sin(i/512*Math.PI*4)*34;i?x.lineTo(i,y):x.moveTo(i,y)}x.stroke()}WV=new THREE.CanvasTexture(c);WV.encoding=THREE.sRGBEncoding;WV.wrapS=WV.wrapT=THREE.RepeatWrapping;WV.repeat.set(3,3);return WV}
function makeScenery(kind){while(scenG.children.length){const c=scenG.children.pop();disposeChar(c)}
  const add=o=>{o.traverse(x=>{if(x.isMesh){x.castShadow=true;x.receiveShadow=true}});scenG.add(o)};
  if(kind==='saojoao'){const cs=[BC.yellow,'#C8202F',BC.blue,BC.bright,'#E2572A','#EE8FAE'],sh=new THREE.Shape();sh.moveTo(-.09,0);sh.lineTo(.09,0);sh.lineTo(0,-.17);sh.closePath();const geo=new THREE.ShapeGeometry(sh);
    [[2.5,-1.6],[2.15,-2.2],[2.8,-2.8]].forEach(([y,z],r)=>{const st=new THREE.Mesh(taperTube([[-3.2,y+.2,z],[0,y-.35,z+.3],[3.2,y+.2,z]],()=>.006,40,6),mat('#F4EFE3','fabric'));scenG.add(st);for(let i=0;i<22;i++){const p=st.geometry.userData.curve.getPointAt((i+.5)/22);scenG.add(mesh(geo,mat(cs[(i+r)%cs.length],'flat'),p.x,p.y,p.z))}});
    const fg=new THREE.Group();fg.position.set(2.3,0,-.6);for(let i=0;i<4;i++){const lg=mesh(new THREE.CylinderGeometry(.05,.05,.7,10),mat('#6B4A2A','skin'),0,.12,0);lg.rotation.order='YXZ';lg.rotation.set(Math.PI/2.4,i*Math.PI/4,0);fg.add(lg)}const fc=flameCrest(3,3);fc.position.y=.15;fg.add(fc);add(fg)}
  if(kind==='carnaval'){const cs=[BC.yellow,BC.bright,BC.blue,'#E2572A','#EE8FAE','#FFFFFF'],geo=new THREE.BoxGeometry(.05,.004,.03);for(let i=0;i<220;i++){const a=i*2.39996,r=.6+((i*7919)%997)/997*3.2,c=mesh(geo,mat(cs[i%cs.length],'skin'),Math.cos(a)*r,.034,Math.sin(a)*r);c.rotation.y=a*3;scenG.add(c)}
    for(let k=0;k<5;k++){const a=k*1.3+.4,cx=Math.cos(a)*2.2,cz=Math.sin(a)*2.2-.5,pts=[];for(let j=0;j<=20;j++){const t=j/20*Math.PI*4;pts.push([cx+Math.cos(t)*.15,.04+j*.004,cz+Math.sin(t)*.15+j*.01])}add(new THREE.Mesh(taperTube(pts,()=>.012,60,6),mat(cs[k%cs.length],'skin')))}}
  if(kind==='amazonia'){const gs=['#1E5A33','#2E7D46','#3E9A55','#14482A'];for(let i=0;i<14;i++){const sd=i%2?1:-1,l=mesh(SPH(1),mat(gs[i%4],'skin'),sd*(1.9+Math.sin(i)*.4),.6+((i*37)%10)/10*1.4,-1.4-((i*53)%10)/10,.35,.9,.05);l.rotation.set(0,sd*.4,sd*(.6+(i>>1)*.35));add(l)}
    [[-1.6,.9],[1.7,.6],[-1.2,-.8]].forEach(([x,z])=>{add(mesh(new THREE.CylinderGeometry(.45,.45,.02,40),mat('#3E9A55','skin'),x,.035,z));const rim=new THREE.Mesh(new THREE.TorusGeometry(.45,.025,8,40),mat('#7DB063','skin'));rim.rotation.x=Math.PI/2;rim.position.set(x,.05,z);add(rim)})}
  if(kind==='sertao'){const cg=mat('#3E7A45','skin');[[-2.4,-1.2,1.2],[2.6,-1.6,1.5],[-3,-2.6,.9]].forEach(([x,z,k])=>{const c=new THREE.Group();c.position.set(x,0,z);c.scale.setScalar(k);c.add(mesh(new THREE.CapsuleGeometry(.12,1.2,6,14),cg,0,.72,0));[-1,1].forEach(d=>{const a1=mesh(new THREE.CapsuleGeometry(.08,.3,6,12),cg,d*.24,.75+d*.08,0);a1.rotation.z=d*Math.PI/2;c.add(a1);c.add(mesh(new THREE.CapsuleGeometry(.08,.4,6,12),cg,d*.4,1+d*.08,0))});add(c)});scenG.add(mesh(SPH(.9),mat('#F6B12B','glow'),1.8,3.2,-7))}
  if(kind==='calcadao'){const tx=wavesTex(),fl=mesh(new THREE.CircleGeometry(3.4,64),new THREE.MeshStandardMaterial({map:tx,roughness:.85}),0,.033,0);fl.rotation.x=-Math.PI/2;fl.receiveShadow=true;scenG.add(fl);
    const pm=new THREE.Group();pm.position.set(-2.3,0,-1.2);pm.add(new THREE.Mesh(taperTube([[0,0,0],[.15,1.2,0],[.05,2.4,.1]],t=>.09-.04*t,30,12),mat('#8A6A44','skin')));for(let i=0;i<8;i++){const lf=new THREE.Group();lf.position.set(.05,2.4,.1);lf.rotation.y=i/8*Math.PI*2;const l=mesh(SPH(1),mat(i%2?'#2E7D46':'#3E9A55','skin'),.4,-.12,0,.45,.03,.1);l.rotation.z=-.35;lf.add(l);pm.add(lf)}add(pm)}}
function applyScen(){const k=state.scen+'|'+state.style;if(applyScen.k===k)return;applyScen.k=k;makeScenery(state.scen);if(STY[state.style].toon)toonify(scenG)}
const GRT={};function gradTex(c){if(GRT[c])return GRT[c];const cv2=document.createElement('canvas');cv2.width=8;cv2.height=512;const x=cv2.getContext('2d'),g=x.createLinearGradient(0,0,0,512);g.addColorStop(0,shade(c,.16));g.addColorStop(.62,c);g.addColorStop(1,shade(c,-.06));x.fillStyle=g;x.fillRect(0,0,8,512);const t=new THREE.CanvasTexture(cv2);t.encoding=THREE.sRGBEncoding;return GRT[c]=t}
function applyBg(){const b=BGS[state.bg],Y=STY[state.style],two=!!Y.warm,flat=state.frame==='quadrinho';
  renderer.toneMapping=Y.toon?THREE.NoToneMapping:THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=Y.toon?1:two?.95:.8;
  key.color.set(two?'#FFE3BF':'#FFF4E2');key.intensity=Y.toon?1.7:two?2.1:1.8;rim.color.set(two||Y.toon?'#BFE6FF':'#D6F5FF');rim.intensity=two?2.2:Y.toon?1.6:1.1;fill.intensity=two?.5:.35;
  OUTL.uniforms.c.value.set(Y.olc||BC.ink);
  floor.visible=disc.visible=!(flat||Y.toon);catcher.visible=flat||!!Y.toon;
  if(flat){scene.background=halftone();scene.fog=null}else{scene.background=(two||Y.toon)?gradTex(b.bg):new THREE.Color(b.bg);scene.fog=Y.toon?null:new THREE.Fog(b.bg,7,16)}
  floor.material.color.set(state.scen==='sertao'?'#E3C08A':b.floor);disc.material.color.set(state.scen==='sertao'?'#F3DFB8':b.disc);document.querySelector('.stage-wrap').style.background=b.bg;camera.fov=Y.fov;camera.updateProjectionMatrix();outlineT()}
function disposeChar(o){o.traverse(x=>{if(x.isMesh&&x.geometry&&!Object.values(GC).includes(x.geometry))x.geometry.dispose()})}
function rebuild(){
  current.forEach(c=>{turn.remove(c.root);disposeChar(c.root)});current=[];
  const ids=renderIds(),n=ids.length;
  const builds=ids.map(id=>{const r={id,...build(id,state.chars[id],{sy:STY[state.style]})};if(STY[state.style].toon)toonify(r.root);return r});
  const gap=n>1?Math.max(.62,(builds[0].meta.width+builds[1].meta.width)*.5+.18)/2:0;
  builds.forEach((b,i)=>{const x=n>1?(i?gap:-gap):0;b.root.position.set(x,b.root.userData.jump||0,0);b.root.rotation.y=n>1&&STY[state.style].dim==='3d'?(i?-.2:.2):0;b.root.userData.id=b.id;turn.add(b.root);current.push(b)});
  blobs.forEach(x=>turn.remove(x));blobs=current.map(c=>{const k=c.meta.width*1.15+.3,bl=new THREE.Mesh(BLOBG,BLOBM);bl.rotation.x=-Math.PI/2;bl.position.set(c.root.position.x,.006,0);bl.scale.set(k,k*.7,1);bl.renderOrder=1;turn.add(bl);return bl});
  const act=current.find(c=>c.id===state.active);ring.visible=n>1&&!!act;if(act){ring.position.x=act.root.position.x;const s=act.meta.width*.7+.15;ring.scale.set(s/.45,s/.45,1)}
  $('#hudWho').textContent='Editando: '+state.chars[state.active].nome;
}
let camGoal=null;
function setCam(){const n=renderIds().length,act=current.find(c=>c.id===state.active)||current[0];const tall=Math.max(...current.map(c=>c.meta.totalH),1.2);
  const F=Math.tan(14*Math.PI/180)/Math.tan(STY[state.style].fov/2*Math.PI/180),card=state.frame==='card';
  let tgt=new THREE.Vector3(0,tall*(card?.47:.55),0),pos;
  if(state.cam==='close'&&act){const x=act.root.position.x;tgt=new THREE.Vector3(x,act.meta.headY,0);pos=new THREE.Vector3(x+.25*F,act.meta.headY+.12,1.9*F)}
  else if(state.cam==='costas')pos=new THREE.Vector3(0,tall*.8,-(n>1?6:5.4)*F);
  else pos=new THREE.Vector3(0,tall*.8,(n>1?6:5.4)*F*(card?1.15:1));
  camGoal={pos,tgt}}
function resize(){const r=stageEl.getBoundingClientRect();if(!r.width||!r.height)return;renderer.setSize(r.width,r.height,false);camera.aspect=r.width/r.height;camera.updateProjectionMatrix();sizeRT();outlineT();drawOverlay()}
new ResizeObserver(resize).observe(stageEl);resize();
const reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
let last=performance.now();
function loop(now){if(!stageEl.offsetParent||paused){last=now;requestAnimationFrame(loop);return}const dt=Math.min(.05,(now-last)/1000);last=now;
  controls.enableRotate=STY[state.style].dim==='3d';if(!controls.enableRotate)turn.rotation.y=0;
  if(state.spin&&!reduce&&controls.enableRotate)turn.rotation.y+=dt*.45;
  if(camGoal){camera.position.lerp(camGoal.pos,.12);controls.target.lerp(camGoal.tgt,.12);if(camera.position.distanceTo(camGoal.pos)<.01)camGoal=null}
  if(!reduce)current.forEach((c,i)=>{c.root.position.y=(c.root.userData.jump||0)+Math.max(0,Math.sin(now/420+i*1.7))*(c.root.userData.jump?.05:.008);if(state.style!=='vinil'){const q=Math.sin(now/320+i*1.7)*.022;c.root.scale.set(1-q*.5,1+q,1-q*.5)}else c.root.scale.set(1,1,1)});
  controls.update();renderFrame();if(state.frame!=='livre')drawOverlay();requestAnimationFrame(loop)}
requestAnimationFrame(loop);

/* clique no personagem escolhe quem editar */
const ray=new THREE.Raycaster(),ptr=new THREE.Vector2();let down=null;
cv.addEventListener('pointerdown',e=>{down={x:e.clientX,y:e.clientY}});
cv.addEventListener('pointerup',e=>{if(!down)return;const moved=Math.hypot(e.clientX-down.x,e.clientY-down.y);down=null;if(moved>5||inView().length<2)return;
  const r=cv.getBoundingClientRect();ptr.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);ray.setFromCamera(ptr,camera);
  const hit=ray.intersectObjects(current.map(c=>c.root),true)[0];if(!hit)return;let o=hit.object;while(o&&!o.userData.id)o=o.parent;if(o&&o.userData.id!==state.active){state.active=o.userData.id;render()}});

/* ---- interface ---- */
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function toast(t){const el=$('#toast');el.textContent=t;el.hidden=false;clearTimeout(toast.t);toast.t=setTimeout(()=>el.hidden=true,1900)}
function renderHeader(){
  $('#dirs').innerHTML=Object.entries(DIRS).map(([k,d])=>`<button class="dir${state.dir===k?' on':''}" data-dir="${k}" aria-pressed="${state.dir===k}">${d.n}</button>`).join('');
  $('#pairs').innerHTML=CATS[state.dir]!==undefined?ROSTER[CATS[state.dir]][1].map(id=>`<button class="pair${state.pick[state.dir]===id?' on':''}" data-livre="${id}">${SPECIES[id].nome}</button>`).join(''):state.dir==='dupla'?PAIRS.map(p=>`<button class="pair${state.pair===p.id?' on':''}" data-pair="${p.id}">${SPECIES[p.a].nome} + ${SPECIES[p.b].nome}${p.star?'<small>recomendada</small>':''}</button>`).join('')+`<button class="pair${state.pair==='livre'?' on':''}" data-pair="livre">Monte a sua dupla</button>`+pairBar():'';
  $('#pairs').hidden=!(state.dir==='dupla'||CATS[state.dir]!==undefined);document.querySelectorAll('#dimSeg button').forEach(b=>b.classList.toggle('on',b.dataset.dim===STY[state.style].dim));
}
/* dupla flexível: troca qualquer lado por qualquer personagem e mostra só quem está em edição */
function charOpts(cur){return ROSTER.concat([['Outros',['zero']]]).map(([g,ids])=>`<optgroup label="${g}">${ids.map(id=>`<option value="${id}"${id===cur?' selected':''}>${esc(state.chars[id].nome)}</option>`).join('')}</optgroup>`).join('')}
function pairBar(){const [a,b]=inView();return `<div class="pairbar"><label>Esquerda <select data-side="a" aria-label="Personagem da esquerda">${charOpts(a)}</select></label><button class="pair" data-swap="1" title="Trocar de lado" aria-label="Trocar de lado">⇄</button><label>Direita <select data-side="b" aria-label="Personagem da direita">${charOpts(b)}</select></label><span class="sep"></span><button class="pair${state.solo?'':' on'}" data-solo="0" aria-pressed="${!state.solo}">Ver os dois</button><button class="pair${state.solo?' on':''}" data-solo="1" aria-pressed="${!!state.solo}">Só ${esc(state.chars[state.active].nome)}</button></div>`}
function setPair(a,b){if(a===b)return;state.custom={a,b};state.pair='livre';if(![a,b].includes(state.active))state.active=a;render()}
function sw(cols){return `<span class="sw">${cols.map(c=>`<i style="background:${c}"></i>`).join('')}</span>`}
/* linhas de cor com a paleta BC: principal, detalhe e extra para cada peça */
function corRows(peca,rows,titulo='Cores BC'){const co=state.chars[state.active].cores||{};
  return `<div class="group cores-bc"><span class="label">${titulo}</span>${rows.map(([i,l])=>{const cur=i===null?co[peca]:(co[peca]||[])[i];
    return `<div class="cor-row"><span>${l}</span><div class="swatches"><button class="swb orig${cur?'':' on'}" data-cor="${peca}" data-i="${i===null?'':i}" data-v="" title="Cor original" aria-label="Cor original" aria-pressed="${!cur}"></button>${BCPAL.map(([c,n])=>`<button class="swb${cur===c?' on':''}" style="background:${c}" data-cor="${peca}" data-i="${i===null?'':i}" data-v="${c}" title="${n}" aria-label="${n}" aria-pressed="${cur===c}"></button>`).join('')}</div></div>`}).join('')}
  <div class="row"><button class="btn" data-cor="${peca}" data-reset="1">Voltar às cores originais</button></div></div>`}
const TRES=[[0,'Principal'],[1,'Detalhe'],[2,'Extra']];
function optCards(key,list,cur,colors){return `<div class="opts">${list.map(([v,l,sub])=>`<button class="opt${cur===v?' on':''}" data-set="${key}" data-v="${v}" aria-pressed="${cur===v}">${colors?sw(colors(v)):''}<b>${l}</b>${sub?`<span>${sub}</span>`:''}</button>`).join('')}</div>`}
function catsFor(id){const c=[['corpo','Corpo'],['rosto','Rosto'],['roupa','Roupa'],['chapeu','Chapéu']];if((id==='zero'?{...ZDEF,...(state.chars.zero.z||{})}.head:SPECIES[id].head)==='humano'&&id!=='curupira'&&!(id==='fusao'&&(state.chars.fusao.base||'capivara')!=='humano'))c.splice(2,0,['cabelo','Cabelo']);if(id==='brincante')c.push(['mascara','Máscara']);if(id==='fusao')c.unshift(['base','Base']);if(id==='zero')c.unshift(['forma','Forma']);c.push(id==='fusao'?['pecas','Peças']:['time','Time']);c.push(['pose','Pose'],['mao','Mão']);return c}
function renderEditor(){
  const id=state.active,s=state.chars[id],SP=id==='zero'?zeroSP(s):(id==='fusao'&&s.base&&s.base!=='humano'&&SPECIES[s.base])?SPECIES[s.base]:SPECIES[id],cats=catsFor(id);if(!cats.find(c=>c[0]===state.cat))state.cat=id==='zero'?'forma':'corpo';
  let h=state.dir==='zero'?(()=>{const i=Math.max(0,cats.findIndex(c=>c[0]===state.cat)),n=cats.length,H={forma:'Escolha a cabeça e o tipo de corpo. Isso define quem ele é.',corpo:'Ajuste as proporções. Cabeça grande deixa mais fofo.',rosto:'Escolha a expressão padrão. Feliz e piscando funcionam melhor nas redes.',cabelo:'O cabelo só aparece quando a cabeça é de pessoa.',roupa:'Gincana para eventos, Gala para o institucional, as de cultura para datas especiais.',chapeu:'O chapéu vira a assinatura dele na silhueta.',time:'Neutro deixa o mascote de todos os times.',pose:'A pose muda por peça: card, post ou figurinha.',mao:'O objeto conta o que ele faz. Último passo: dê um nome na ficha ao lado.'};
  return `<div class="step"><span class="label" style="margin:0">Passo ${i+1} de ${n} · ${cats[i][1]}</span><div class="bar"><i style="width:${(i+1)/n*100}%"></i></div><span>${H[cats[i][0]]||''}</span><div class="row"><button class="btn" data-step="-1" ${i?'':'disabled'}>Voltar</button><button class="btn primary" data-step="1" ${i<n-1?'':'disabled'}>Próximo passo</button></div></div>`})():'';
  h+=`<div class="who">${inView().map(k=>`<button class="whob${k===id?' on':''}" data-active="${k}"><b>${esc(state.chars[k].nome)}</b><span>${SPECIES[k].sub}</span></button>`).join('')}</div>`;
  h+=`<div class="cats" role="tablist">${cats.map(([c,l])=>`<button class="cat${state.cat===c?' on':''}" role="tab" aria-selected="${state.cat===c}" data-cat="${c}">${l}</button>`).join('')}</div>`;
  switch(state.cat){
    case 'forma':{const z={...ZDEF,...(s.z||{})},zc=(k,list)=>`<div class="opts">${list.map(([v,l])=>`<button class="opt${z[k]===v?' on':''}" data-z="${k}" data-v="${v}" aria-pressed="${z[k]===v}"><b>${l}</b></button>`).join('')}</div>`;
      h+=`<div class="row" style="margin-bottom:12px"><button class="btn" data-zrand="1">Sortear uma forma</button></div>`;
      h+=`<div class="group"><span class="label">Cabeça</span>${zc('head',ZHEADS)}</div>`;
      h+=`<div class="group"><span class="label">Corpo</span>${zc('corpo',Object.entries(CORPOS).map(([k,v])=>[k,v[0]]))}</div>`;
      if(!['serpente','sereia'].includes(z.corpo))h+=`<div class="group"><span class="label">Cauda</span>${zc('cauda',[['nenhuma','Sem cauda'],['jacare','Jacaré'],['boto','Boto'],['lobo','Peluda'],['felino','Felina'],['passaro','Penas']])}</div>`;
      h+=`<div class="group"><span class="label">Mãos</span>${zc('maos',[['hand','Mãos'],['mitten','Luvas'],['claw','Garras'],['paw','Patas']])}</div>`;
      if(!['serpente','sereia'].includes(z.corpo))h+=`<div class="group"><span class="label">Pés</span>${zc('pes',[['shoe','Sapatos'],['claw','Garras'],['paw','Patas'],['hoof','Cascos'],['back','Virados para trás']])}</div>`;
      h+=`<div class="group"><span class="label">Cores</span><div class="row">${[['pele','Pele'],['barriga','Barriga'],['olhos','Olhos'],['cabelo','Cabelo']].map(([k,l])=>`<label class="label" style="display:flex;flex-direction:column;align-items:center;gap:4px;margin:0" for="zc-${k}"><input type="color" id="zc-${k}" data-zc="${k}" value="${z[k]}">${l}</label>`).join('')}</div></div>`;
      h+=`<div class="row">${[['pelo','Pelo'],['manchas','Manchas'],['barrigaOn','Barriga clara'],['brilho','Brilho de fogo']].map(([k,l])=>`<button class="tg${z[k]?' on':''}" data-zt="${k}">${l}</button>`).join('')}</div>`;break}
    case 'corpo':{const sl=(k,l)=>`<label class="sl" for="sl-${k}"><span>${l}</span><input type="range" id="sl-${k}" data-slider="${k}" min="${RANGES[k][0]}" max="${RANGES[k][1]}" step=".01" value="${s[k]}"><output id="out-${k}">${(+s[k]).toFixed(2).replace('.',',')}</output></label>`;
      h+=`<div class="group"><span class="label">Ponto de partida</span><div class="row"><button class="btn" data-preset="inst">Institucional</button><button class="btn" data-preset="din">Dinâmico</button><button class="btn" data-preset="reset">Padrão</button></div></div>`;
      h+=`<div class="group"><span class="label">Proporções</span>${sl('head','Cabeça')}${sl('height','Altura')}${sl('body','Largura')}</div>`;
      h+=`<div class="group"><span class="label">${id==='iara'?'Pele e cauda':'Cor'}</span><div class="swatches">${SP.pal.map((p,i)=>`<button class="swb${s.color===i?' on':''}" style="background:${p.tail?`linear-gradient(135deg,${p.skin} 50%,${p.tail} 50%)`:p.belly?`linear-gradient(135deg,${p.skin} 55%,${p.belly} 55%)`:p.skin}" data-set="color" data-num="1" data-v="${i}" title="${p.n}" aria-label="${p.n}"></button>`).join('')}</div></div>`;
      h+=`<p class="hint">Institucional fica acima de 1 : 3 cabeças; dinâmico, perto de 1 : 2,5. A conta aparece na ficha.</p>`;break}
    case 'rosto':h+=optCards('expr',OPT.expr,s.expr);h+=`<div class="row" style="margin-top:12px"><button class="tg${s.blush?' on':''}" data-toggle="blush">Bochechas</button><button class="tg${s.lashes?' on':''}" data-toggle="lashes">Cílios</button><button class="tg${s.glasses?' on':''}" data-toggle="glasses">Óculos</button></div>`;break;
    case 'roupa':h+=optCards('outfit',OPT.outfit,s.outfit,v=>({base:[SP.pal[s.color].skin],gala:[BC.green,BC.yellow],gincana:[TEAMS[s.team].main,TEAMS[s.team].acc],chita:['#C9283A','#F6C431','#1E5BB5'],junino:['#C8202F','#FFFFFF','#3B5A8A'],frevo:['#F6C431','#C8202F','#2C5BB0'],baiana:['#FFFFFF',BC.yellow],cangaceiro:['#7A4A2A','#E3AC40'],gaucho:['#FFFFFF','#C8202F','#2A2A2A'],capoeira:['#FFFFFF',BC.bright],carnaval:['#E3AC40','#EE8FAE',BC.bright],canarinho:['#FFD43B',BC.green,'#1F4FA8'],jangadeiro:['#FFFFFF','#2C5BB0'],vaqueiro:['#8A5A32','#3B4A6A'],rendeira:['#FFFFFF','#2C5BB0'],maracatu:['#B5122B','#E3AC40'],folhas:['#2E7D46','#7DCB6A']}[v]||[]));
      h+=corRows('roupa',TRES)+corRows('sapato',[[null,'Sapatos']],'Sapatos (cores BC)');
      h+=`<p class="hint">Principal tinge a cor que mais aparece na roupa, Detalhe a segunda e Extra a terceira. Sapatos só aparecem nos personagens que usam sapato.</p>`;
      if(SP.body.saia)h+=`<p class="hint">A saia alegórica com fitas é do Boi: aparece com qualquer roupa.</p>`;break;
    case 'chapeu':h+=optCards('hat',HATS,s.hat);if(s.hat&&s.hat!=='nenhum')h+=corRows('chapeu',TRES);if(id==='boto')h+=`<p class="hint">Na lenda, o chapéu branco esconde o espiráculo do Boto.</p>`;break;
    case 'mascara':h+=optCards('mask',OPT.mask,s.mask);h+=`<p class="hint">O Brincante é um só personagem que veste o folclore. Cada máscara vira card, figurinha e fantasia trocável.</p>`;break;
    case 'time':h+=optCards('team',OPT.team.map(([v,l])=>[v,l,TEAMS[v].el]),s.team,v=>v==='fusao'?['#1F3A6B','#E2572A','#1E5A33','#C8202F']:[TEAMS[v].main,TEAMS[v].acc]);
      h+=`<p class="hint">O time entra como acessório removível: brinco e colar (Água), crista de fogo (Fogo), coroa de folhas (Terra), lenço ao vento (Ar).</p>`;break;
    case 'base':h+=optCards('base',[['capivara','Capivara','Calma e fofa'],['onca','Onça-pintada','Força'],['arara','Arara','Cores do Brasil'],['boto','Boto','Festa'],['boi','Boi-Bumbá','Alegoria'],['humano','Encantado','Forma humana']],s.base||'capivara');h+=`<p class="hint">A Fusão veste os quatro elementos sobre qualquer base. As peças apagadas ficam em tom pastel.</p>`;break;
    case 'pecas':{const lt=s.lit||{},cla=s.pecas==='classica';h+=`<div class="row" style="margin-bottom:10px"><button class="tg${cla?'':' on'}" data-set="pecas" data-v="delicada">Peças delicadas</button><button class="tg${cla?' on':''}" data-set="pecas" data-v="classica">Peças clássicas</button></div>`;h+=`<div class="opts">${(cla?[['correnteza','Cabelo-correnteza','#3D8FE0'],['chama','Crista de fogo','#E2572A'],['mata','Pernas-raiz','#7A5532'],['vendaval','Capa de redemoinho','#C8202F']]:[['correnteza','Onda na cabeça','#2F8FE8'],['chama','Crista de fogo','#E2572A'],['mata','Saia de folhas','#2E9A56'],['vendaval','Lenço ao vento','#E0313F']]).map(([k,l,c])=>`<button class="opt${lt[k]?' on':''}" data-lit="${k}" aria-pressed="${!!lt[k]}">${sw([c])}<b>${l}</b><span>${TEAMS[k].n} · ${lt[k]?'acesa':'apagada'}</span></button>`).join('')}</div><p class="hint">Na gincana, só a peça do time que vence acende. Use para simular o placar.</p>`;break}
    case 'pose':h+=optCards('pose',OPT.pose,s.pose);break;
    case 'mao':h+=optCards('prop',OPT.prop,s.prop);if(s.prop&&s.prop!=='nenhum')h+=corRows('mao',TRES);break;
    case 'cabelo':h+=optCards('hair',HAIRS,s.hair||(SP.headOpt||{}).hair||'curto');break;
  }
  $('#editor').innerHTML=h;
}
function alerts(id){const s=state.chars[id],a=[];
  if(s.head>1.2&&(['torcendo','correndo'].includes(s.pose)||s.outfit==='gincana'))a.push('Cabeça grande em movimento: prever ventilação, peso no ombro e campo de visão.');
  if(SPECIES[id].body.gala==='beca'&&s.outfit==='gala'&&['torcendo','correndo'].includes(s.pose))a.push('Beca até o tornozelo com pose de gincana: risco de tropeço.');
  if((id==='cuca'||id==='boto')&&(s.outfit==='gincana'||s.pose==='correndo'))a.push('Cauda: fixar acima do joelho, com enchimento leve.');
  if(id==='iara')a.push('Cauda de peixe não anda: na fantasia vira saia longa com nadadeira na barra.');
  if(id==='saci')a.push('Uma perna no 3D; na fantasia, a segunda perna fica coberta. Traços respeitosos, sem caricatura.');
  if(id==='curupira')a.push('Pés virados: capas de sapato invertidas sobre tênis comuns.');
  if(id==='mapinguari')a.push('Pelúcia grande: ventilação e um guia ao lado em eventos.');
  if(id==='boi'){a.push('Saia alegórica: armação leve e fitas curtas para não enroscar.');if(['vendaval','fusao'].includes(s.team))a.push('Vermelho com azul no Boi lembra Garantido e Caprichoso: trocar o time ou as cores.')}
  if(['fitas','gorro'].includes(s.hat)||id==='brincante')a.push('Conferir altura total com chapéu para portas e palco.');
  if(s.team==='fusao'||id==='fusao')a.push('Muitos acessórios: na fantasia, no máximo dois removíveis.');
  if(id==='mula')a.push('Cabeça de fogo: tecido translúcido com LED frio, nunca chama de verdade.');
  if(id==='boitata')a.push('Corpo de serpente: na fantasia vira saia com cauda enrolada e LED.');
  if(['passista','baiana','cangaceiro','gaucho','capoeirista','sambista','caipira','jangadeiro','vaqueiro','rendeira','maracatu','repentista'].includes(id))a.push('Traje de cultura popular: validar os detalhes com quem vive a tradição antes de produzir.');
  if(s.outfit==='carnaval')a.push('Plumas nas costas: prever largura em portas; não usar em gincana.');
  if(s.outfit==='baiana')a.push('Saia rodada: armação leve; não usar em corrida.');
  return a}
function renderFicha(){
  const ids=inView(),D=DIRS[state.dir],pair=PAIRS.find(p=>p.id===state.pair);
  let h=`<h2>Ficha técnica</h2><div class="card green"><span class="k">Direção ${esc(D.n)}</span><p>${D.forca}</p><span class="k">Risco</span><p>${D.risco}</p>${state.dir==='dupla'&&pair?`<span class="k">Por que essa dupla</span><p>${pair.forca}</p><span class="k">Cuidado</span><p>${pair.cuidado}</p>`:''}</div>`;
  ids.forEach(id=>{const s=state.chars[id],c=current.find(x=>x.id===id),m=c?c.meta:build(id,s).meta,SP=id==='zero'?zeroSP(s):SPECIES[id],pal=SP.pal[s.color]||SP.pal[0],T=TEAMS[s.team];
    const role=SP.role==='inst'?'Institucional':'Dinâmico',al=alerts(id);
    h+=`<div class="card"><label class="label" for="nome-${id}">Nome do personagem</label><input type="text" id="nome-${id}" data-nome="${id}" value="${esc(s.nome)}" maxlength="18">
    <label class="label" for="fala-${id}" style="margin-top:10px">Fala no quadrinho</label><input type="text" class="fala" id="fala-${id}" data-fala="${id}" value="${esc(s.fala||FALAS[id])}" maxlength="70">
    <dl><dt>Papel</dt><dd>${role}</dd><dt>Proporção</dt><dd>1 : ${m.ratio.toFixed(1).replace('.',',')} cabeças</dd><dt>Altura</dt><dd>${(m.totalH*100).toFixed(0)} cm no modelo</dd><dt>Time</dt><dd>${id==='fusao'?'Os quatro':T.n+' ('+T.el+')'}</dd><dt>Paleta</dt><dd><span class="dots">${[pal.skin,pal.belly||pal.tail,BC.green,BC.yellow].filter(Boolean).map(x=>`<i style="background:${x}" title="${x}"></i>`).join('')}</span></dd></dl>
    <span class="label">Peças nomeadas para o Blender</span><div class="slots">${m.slots.map(esc).join('<br>')}</div>
    <ul class="alerts">${al.length?al.map(x=>`<li>${x}</li>`).join(''):'<li class="ok">Nada a sinalizar para a fantasia nessa combinação.</li>'}</ul></div>`});
  h+=`<div class="card"><span class="label">Levar adiante</span><div class="row"><button class="btn primary" id="glbBtn">Exportar 3D (.zip)</button><button class="btn" id="pngBtn">Foto 1x</button><button class="btn" id="png2Btn">Foto 2x</button><button class="btn" id="saveBtn">Salvar look</button><button class="btn" id="copyBtn">Copiar ficha</button></div><p class="hint">O .zip traz um arquivo glTF que o Blender importa direto (Arquivo, Importar, glTF 2.0). A foto sai em PNG: 1x no tamanho da tela, 2x com o dobro de pixels.</p><div id="copyFb"></div></div>`;
  const looks=load(KEYL,[]);
  h+=`<div class="card"><span class="label">Looks salvos neste navegador</span><div class="looks">${looks.length?looks.map((l,i)=>`<div class="look"><button class="load" data-load="${i}">${esc(l.nome)}</button><button class="del" data-del="${i}" aria-label="Apagar">×</button></div>`).join(''):'<p class="hint" style="margin:0">Salve combinações para comparar depois.</p>'}</div></div>`;
  $('#ficha').innerHTML=h;
}
function renderChrome(){
  $('#bgs').innerHTML=Object.entries(BGS).map(([k,b])=>`<button class="bgb${state.bg===k?' on':''}" style="background:${b.bg}" data-bg="${k}" title="${b.n}" aria-label="Fundo ${b.n}"></button>`).join('');
  document.querySelectorAll('#camSeg button').forEach(b=>b.classList.toggle('on',b.dataset.cam===state.cam));
  {const dm=STY[state.style].dim;$('#styleSel').innerHTML=Object.entries(STY).filter(([k,v])=>v.dim===dm).map(([k,v])=>`<option value="${k}">${v.n}</option>`).join('');$('#styleSel').value=state.style;$('#spinBtn').hidden=dm==='2d'}
  document.querySelectorAll('#frameSeg button').forEach(b=>b.classList.toggle('on',b.dataset.frame===state.frame));
  $('#spinBtn').classList.toggle('on',state.spin);$('#scenSel').value=state.scen;$('#undoBtn').disabled=!hist.length}
function render(full=true){applyBg();applyScen();rebuild();setCam();renderHeader();if(full)renderEditor();renderFicha();renderChrome();drawOverlay();persist()}

/* ---- ações ---- */
function setC(k,v){pushHist();state.chars[state.active][k]=v;render()}
function preset(p){pushHist();const id=state.active,s=state.chars[id];
  if(p==='reset'){state.chars[id]={...defaultChar(id),nome:s.nome}}
  if(p==='inst')Object.assign(s,{head:.95,height:1.08,body:1,pose:'parado',outfit:'gala',expr:'pensando'});
  if(p==='din')Object.assign(s,{head:1.28,height:.92,body:1.05,pose:'torcendo',outfit:'gincana',expr:'torcendo',prop:'bandeira'});render()}
function randomize(){pushHist();const pick=a=>a[Math.floor(Math.random()*a.length)][0],rnd=([a,b])=>Math.round((a+Math.random()*(b-a))*100)/100;
  inView().forEach(id=>{const s=state.chars[id];Object.assign(s,{head:rnd(RANGES.head),height:rnd(RANGES.height),body:rnd(RANGES.body),color:id==='zero'?0:Math.floor(Math.random()*SPECIES[id].pal.length),expr:pick(OPT.expr),outfit:pick(OPT.outfit),hat:pick(HATS),team:pick(OPT.team),pose:pick(OPT.pose),prop:pick(OPT.prop)});if(id==='brincante')s.mask=pick(OPT.mask)});render()}
function undo(){if(!hist.length)return;state.chars=JSON.parse(hist.pop());render()}

let dl=null;let paused=false;
async function saveFile(name,blob){if(dl){await dl.save({filename:name,data:blob});return}const u=URL.createObjectURL(blob),a=document.createElement('a');a.href=u;a.download=name;a.rel='noopener';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),5000)}
(async()=>{try{if(window.claude&&claude.use)dl=await claude.use('downloads')}catch(e){dl=null}if(dl)renderFicha()})();
async function exportZip(){if(!THREE.GLTFExporter||!window.JSZip){toast('Exportação indisponível aqui');return}
  toast('Gerando o 3D...');const grp=new THREE.Group();(soloOn()?[state.active]:inView()).forEach((id,i,a)=>{const b=build(id,state.chars[id],{sy:STY[state.style]});b.root.position.x=a.length>1?(i?.7:-.7):0;grp.add(b.root)});
  new THREE.GLTFExporter().parse(grp,async gltf=>{try{const z=new JSZip(),name=inView().join('-');
    z.file(`bc27-${name}.gltf`,JSON.stringify(gltf));z.file('LEIA-ME.txt',`BC27 · mascotes ${name}\n\nBlender: Arquivo > Importar > glTF 2.0 e escolha o .gltf.\nCada peça tem nome de slot (corpo, cabeça, rosto, roupa, chapéu, time, objeto) para trocar e refinar.\nEscala: 1 unidade = 1 metro.\n\nFicha:\n${fichaJSON()}`);
    paused=true;let blob;try{blob=await z.generateAsync({type:'blob'})}finally{paused=false}await saveFile(`bc27-mascotes-${name}.zip`,blob);toast('Arquivo baixado')}catch(e){toast(e&&e.code==='declined'?'Download cancelado':'Não foi possível salvar')}},
    ()=>toast('Não foi possível exportar'),{binary:false,embedImages:true,onlyVisible:true})}
async function exportPng(scale){scale=scale||1;toast('Gerando a foto...');try{if(document.fonts&&document.fonts.ready)await document.fonts.ready}catch(e){}const pr=renderer.getPixelRatio();if(scale>1){renderer.setPixelRatio(pr*scale);resize()}renderFrame();drawOverlay();const W=cv.width,H=cv.height,R=state.frame==='card'?cardRect(W,H):{x:0,y:0,w:W,h:H},cc=document.createElement('canvas');cc.width=Math.round(R.w);cc.height=Math.round(R.h);const c2=cc.getContext('2d');c2.drawImage(cv,-R.x,-R.y);c2.drawImage(ov,-R.x,-R.y);if(scale>1){renderer.setPixelRatio(pr);resize()}cc.toBlob(async b=>{if(!b){toast('Não foi possível gerar a foto');return}try{await saveFile(`bc27-look-${inView().join('-')}-${cc.width}x${cc.height}.png`,b);toast('Arquivo baixado')}catch(e){toast(e&&e.code==='declined'?'Download cancelado':'Não foi possível salvar')}},'image/png')}
function fichaJSON(){return JSON.stringify({projeto:'BC27 mascotes',direcao:state.dir,dupla:state.dir==='dupla'?state.pair:null,personagens:inView().map(id=>{const c=current.find(x=>x.id===id);return {id,...state.chars[id],proporcao_cabecas:c?+c.meta.ratio.toFixed(2):null,slots_blender:c?c.meta.slots:[]}})},null,2)}

/* ---- eventos ---- */
document.querySelector('.app header').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;
  if(b.dataset.dir){state.dir=b.dataset.dir;state.active=inView()[0];if(state.dir==='zero')state.cat='forma';render();if(window.onAtelieDir)onAtelieDir(state.dir)}
  if(b.dataset.livre){state.pick[state.dir]=b.dataset.livre;state.active=b.dataset.livre;render()}
  if(b.dataset.dim){const cur=STY[state.style].dim;if(b.dataset.dim!==cur){state.last[cur]=state.style;state.style=state.last[b.dataset.dim];TC.clear();render()}}
  if(b.dataset.pair){if(b.dataset.pair==='livre'&&state.pair!=='livre'){const [x,y]=inView();state.custom={a:x,b:y}}state.pair=b.dataset.pair;state.active=inView()[0];render()}
  if(b.dataset.swap){const [x,y]=inView();setPair(y,x)}
  if(b.dataset.solo){state.solo=b.dataset.solo==='1';render()}});
document.querySelector('.app header').addEventListener('change',e=>{const t=e.target;if(!t.dataset.side)return;let [x,y]=inView();const v=t.value;
  if(t.dataset.side==='a'){if(v===y)y=x;x=v;state.active=x}else{if(v===x)x=y;y=v;state.active=y}setPair(x,y)});
const ed=$('#editor');let sliding=false,raf=0;
ed.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;const d=b.dataset;
  if(d.set)setC(d.set,d.num?+d.v:d.v);
  else if(d.cat){state.cat=d.cat;renderEditor();persist()}
  else if(d.active){state.active=d.active;render()}
  else if(d.preset)preset(d.preset);
  else if(d.toggle)setC(d.toggle,!state.chars[state.active][d.toggle]);
  else if(d.step){const cs=catsFor(state.active),i=cs.findIndex(c=>c[0]===state.cat),j=Math.max(0,Math.min(cs.length-1,i+ +d.step));state.cat=cs[j][0];renderEditor();persist();document.querySelector('#editor').scrollTop=0}
  else if(d.z){pushHist();const s=state.chars[state.active];s.z={...ZDEF,...s.z,[d.z]:d.v};render()}
  else if(d.zt){pushHist();const s=state.chars[state.active],z={...ZDEF,...s.z};z[d.zt]=!z[d.zt];s.z=z;render()}
  else if(d.zrand){pushHist();const s=state.chars[state.active],pk=a=>a[Math.floor(Math.random()*a.length)],hx=()=>'#'+Math.floor(Math.random()*16777215).toString(16).padStart(6,'0');s.z={...ZDEF,...s.z,head:pk(ZHEADS)[0],corpo:pk(Object.keys(CORPOS)),cauda:pk(['nenhuma','nenhuma','jacare','boto','lobo','felino','passaro']),maos:pk(['hand','mitten','claw','paw']),pes:pk(['shoe','claw','paw','hoof']),pele:hx(),barriga:hx()};render()}
  else if(d.cor){pushHist();const s=state.chars[state.active],co={...(s.cores||{})};
    if(d.reset)delete co[d.cor];else if(d.i==='')co[d.cor]=d.v||null;else{const a=[...(co[d.cor]||[null,null,null])];a[+d.i]=d.v||null;co[d.cor]=a}
    s.cores=co;render()}
  else if(d.lit){pushHist();const s=state.chars[state.active];s.lit={...s.lit,[d.lit]:!s.lit[d.lit]};render()}});
ed.addEventListener('input',e=>{const t=e.target;if(t.dataset.zc){const s=state.chars[state.active];s.z={...ZDEF,...s.z,[t.dataset.zc]:t.value};cancelAnimationFrame(raf);raf=requestAnimationFrame(()=>rebuild());return}if(!t.dataset.slider)return;if(!sliding){pushHist();sliding=true}
  state.chars[state.active][t.dataset.slider]=+t.value;$('#out-'+t.dataset.slider).textContent=(+t.value).toFixed(2).replace('.',',');
  cancelAnimationFrame(raf);raf=requestAnimationFrame(()=>rebuild())});
ed.addEventListener('change',e=>{if(e.target.dataset.zc){renderFicha();persist()}if(e.target.dataset.slider){sliding=false;renderFicha();renderChrome();persist()}});
const fi=$('#ficha');
fi.addEventListener('input',e=>{const fz=e.target.dataset.fala;if(fz){state.chars[fz].fala=e.target.value;drawOverlay();return}const k=e.target.dataset.nome;if(k){state.chars[k].nome=e.target.value;$('#hudWho').textContent='Editando: '+state.chars[state.active].nome}});
fi.addEventListener('change',e=>{if(e.target.dataset.fala)persist();if(e.target.dataset.nome){persist();renderEditor()}});
fi.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;
  if(b.id==='glbBtn')exportZip();
  if(b.id==='pngBtn')exportPng(1);if(b.id==='png2Btn')exportPng(2);
  if(b.id==='saveBtn'){const looks=load(KEYL,[]);looks.unshift({nome:`Look ${looks.length+1} · ${inView().map(id=>state.chars[id].nome).join(' + ')}`,dir:state.dir,pair:state.pair,chars:JSON.parse(JSON.stringify(state.chars))});save(KEYL,looks.slice(0,20));renderFicha();toast('Look salvo')}
  if(b.id==='copyBtn'){const txt=fichaJSON(),fb=()=>{$('#copyFb').innerHTML=`<textarea class="fallback" readonly>${esc(txt)}</textarea>`;const ta=$('#copyFb textarea');ta.focus();ta.select();toast('Selecione e copie')};try{navigator.clipboard.writeText(txt).then(()=>toast('Ficha copiada'),fb)}catch(err){fb()}}
  if(b.dataset.load!==undefined){const l=load(KEYL,[])[+b.dataset.load];if(l){pushHist();Object.keys(SPECIES).forEach(id=>{if(l.chars[id])state.chars[id]={...defaultChar(id),...l.chars[id]}});state.dir=l.dir||state.dir;state.pair=l.pair||state.pair;state.active=inView()[0];render();toast('Look carregado')}}
  if(b.dataset.del!==undefined){const looks=load(KEYL,[]);looks.splice(+b.dataset.del,1);save(KEYL,looks);renderFicha()}});
$('#bgs').addEventListener('click',e=>{const b=e.target.closest('button');if(b){state.bg=b.dataset.bg;applyBg();renderChrome();persist()}});
$('#camSeg').addEventListener('click',e=>{const b=e.target.closest('button');if(b){state.cam=b.dataset.cam;setCam();renderChrome();persist()}});
$('#styleSel').addEventListener('change',e=>{state.style=e.target.value;state.last[STY[state.style].dim]=state.style;TC.clear();render()});
$('#frameSeg').addEventListener('click',e=>{const b=e.target.closest('button');if(b){state.frame=b.dataset.frame;render()}});
$('#spinBtn').addEventListener('click',()=>{state.spin=!state.spin;if(!state.spin)turn.rotation.y=0;renderChrome();persist()});
$('#scenSel').addEventListener('change',e=>{state.scen=e.target.value;applyBg();applyScen();persist()});
$('#undoBtn').addEventListener('click',undo);$('#randBtn').addEventListener('click',randomize);
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(()=>{Object.keys(TX).forEach(k=>{if(TX[k])TX[k].dispose();delete TX[k]});Object.keys(MC).forEach(k=>{if(MC[k].map)delete MC[k]});rebuild()});

window.atelie={getDir:()=>state.dir,setDir(d){if(!DIRS[d]||state.dir===d)return;state.dir=d;state.active=inView()[0];if(d==='zero')state.cat='forma';render();persist()},
style:()=>state.style,styles:()=>Object.entries(STY).map(([k,v])=>({k,n:v.n,dim:v.dim})),saveFile,
pairs:()=>PAIRS.map(p=>({id:p.id,star:!!p.star,forca:p.forca,cuidado:p.cuidado,a:state.chars[p.a].nome,b:state.chars[p.b].nome})),
openPair(id){const p=PAIRS.find(x=>x.id===id);if(!p)return;state.dir='dupla';state.pair=id;state.active=p.a;render()},
async snapPairs(style,W,H){W=W||900;H=H||900;const keep={dir:state.dir,pair:state.pair,active:state.active,style:state.style},pr=renderer.getPixelRatio(),out=[];paused=true;
  try{if(style&&STY[style]&&style!==state.style){state.style=style;TC.clear()}state.dir='dupla';
    renderer.setPixelRatio(1);renderer.setSize(W,H,false);camera.aspect=W/H;camera.updateProjectionMatrix();sizeRT();outlineT();applyBg();applyScen();
    for(const p of PAIRS){state.pair=p.id;state.active=p.a;rebuild();ring.visible=false;setCam();if(camGoal){camera.position.copy(camGoal.pos);controls.target.copy(camGoal.tgt);camGoal=null}controls.update();renderFrame();out.push({id:p.id,url:cv.toDataURL('image/png')});await new Promise(r=>setTimeout(r,30))}
  }finally{const sc=keep.style!==state.style;Object.assign(state,keep);if(sc)TC.clear();renderer.setPixelRatio(pr);camera.aspect=1;paused=false;render(false);resize()}
  return out}};
render();
})();
