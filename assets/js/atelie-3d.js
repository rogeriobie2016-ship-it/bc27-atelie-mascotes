/* ============ PARTE A: construtor 3D (sem DOM) ============ */
if(window.THREE&&THREE.ColorManagement)THREE.ColorManagement.legacyMode=false;
const BC={green:'#03633B',bright:'#15E888',blue:'#007EE5',yellow:'#FBF99D',ink:'#0E2A1D',alt:'#F3F6F1'};
/* paleta oficial do BC Studio (design system BC27), usada para tingir roupa, chapéu, sapato e objeto */
const BCPAL=[['#0B5E37','Verde'],['#15E888','Verde vivo'],['#FBF99D','Amarelo'],['#0A7BE5','Azul'],['#0D3A85','Noite'],['#FFFFFF','Branco'],['#121211','Preto']];
const TEAMS={
  neutro:{n:'Neutro',el:'BC',main:BC.green,acc:BC.yellow},
  correnteza:{n:'Correnteza',el:'Água',main:'#1F3A6B',acc:'#D9A441'},
  chama:{n:'Chama',el:'Fogo',main:'#E2572A',acc:'#F6B12B'},
  mata:{n:'Mata',el:'Terra',main:'#1E5A33',acc:'#7DB063'},
  vendaval:{n:'Vendaval',el:'Ar',main:'#C8202F',acc:'#2C5BB0'},
  fusao:{n:'Os quatro',el:'Todos',main:'#4A2F7A',acc:'#E3AC40'}
};
const HUMAN={legLen:.55,torsoL:.55,hipR:.19,waistR:.175,chestR:.2,shoulderR:.185,armR:.048,armLen:.5,legR:.064,neck:.05,headK:1.4,legs:2,foot:'shoe',hand:'hand',gala:'terno'};
const SKINS=[{n:'Jambo',skin:'#B9784F'},{n:'Areia',skin:'#D9A47A'},{n:'Canela',skin:'#8A5537'},{n:'Cacau',skin:'#6B4128'},{n:'Retinto',skin:'#4E2E1E'},{n:'Clara',skin:'#EBC3A0'}];
const ARQ=(nome,sub,role,hair,def)=>({nome,sub,role,head:'humano',headOpt:{hair,hairCol:'#1E1612'},pal:SKINS,body:HUMAN,def});
const SPECIES={
  cuca:{nome:'Cuca',sub:'Jacaré da reitoria',role:'inst',head:'jacare',belly:true,
    pal:[{n:'Verde-jacaré',skin:'#4F7B3A',belly:'#DAD59C'},{n:'Oliva',skin:'#6F7A3A',belly:'#E5DBA8'},{n:'Esmeralda',skin:'#0F6B45',belly:'#CDE8B6'},{n:'Cinza-rio',skin:'#5E6E63',belly:'#DAD9C6'}],
    body:{legLen:.5,torsoL:.6,hipR:.2,waistR:.18,chestR:.2,shoulderR:.19,armR:.05,armLen:.5,legR:.066,neck:.05,headK:1.4,legs:2,foot:'claw',hand:'claw',tail:'jacare',gala:'beca'},
    def:{head:1,height:1.05,body:.95,expr:'feliz',outfit:'gala',hat:'capelo',pose:'parado',prop:'livro',glasses:true}},
  boto:{nome:'Boto',sub:'Recepção em festa',role:'din',head:'boto',belly:true,
    pal:[{n:'Rosa-boto',skin:'#EE8FAE',belly:'#FAD3DE'},{n:'Coral',skin:'#F2907E',belly:'#FCD6CC'},{n:'Lilás-rio',skin:'#C79BDA',belly:'#EBD8F2'},{n:'Cinza-rosado',skin:'#C7A2AE',belly:'#ECDADF'}],
    body:{legLen:.38,torsoL:.5,hipR:.25,waistR:.26,chestR:.23,shoulderR:.19,armR:.06,armLen:.42,legR:.078,neck:.0,headK:1.4,legs:2,foot:'shoe',hand:'mitten',tail:'boto',gala:'terno-branco'},
    def:{head:1.2,height:.95,body:1.05,expr:'torcendo',outfit:'gincana',hat:'panama',pose:'acenando',prop:'bandeira'}},
  boi:{nome:'Boi-Bumbá',sub:'Alegoria de gala',role:'inst',head:'boi',
    pal:[{n:'Veludo',skin:'#3A2B26',belly:'#EAD8C4'},{n:'Caramelo',skin:'#A8652F',belly:'#F2DFC6'},{n:'Branco',skin:'#EFE8DC',belly:'#F4D6D0'},{n:'Dourado',skin:'#C99A4A',belly:'#F6E7C6'},{n:'Malhado',skin:'#F4EEE4',belly:'#3A2B26'}],
    body:{legLen:.5,torsoL:.6,hipR:.27,waistR:.27,chestR:.27,shoulderR:.23,armR:.068,armLen:.5,legR:.085,neck:.03,headK:1.4,legs:2,foot:'hoof',hand:'mitten',gala:'terno',saia:true},
    def:{expr:'feliz',outfit:'base',hat:'nenhum',pose:'acenando',prop:'nenhum'}},
  mapinguari:{nome:'Mapinguari',sub:'Guarda gentil da mata',role:'inst',head:'mapinguari',belly:true,
    pal:[{n:'Castanho',skin:'#7A4A2C',belly:'#C79A6B'},{n:'Ferrugem',skin:'#9C4A25',belly:'#E0B07C'},{n:'Musgo',skin:'#4E5A33',belly:'#A9B27A'}],
    body:{legLen:.5,torsoL:.7,hipR:.33,waistR:.35,chestR:.34,shoulderR:.27,armR:.095,armLen:.62,legR:.115,neck:0,headK:1.45,legs:2,foot:'paw',hand:'paw',fur:true,gala:'beca'},
    def:{expr:'feliz',outfit:'base',pose:'parado'}},
  curupira:{nome:'Curupira',sub:'Pequeno e veloz',role:'din',head:'humano',headOpt:{hair:'chama'},
    pal:[{n:'Jambo',skin:'#A9693F'},{n:'Cacau',skin:'#6B4128'},{n:'Canela',skin:'#8A5537'}],
    body:{legLen:.42,torsoL:.38,hipR:.14,waistR:.13,chestR:.15,shoulderR:.14,armR:.04,armLen:.36,legR:.05,neck:.03,headK:1.45,legs:2,foot:'back',hand:'hand',gala:'terno'},
    def:{head:1.15,height:.95,expr:'piscando',outfit:'base',pose:'correndo'}},
  iara:{nome:'Iara',sub:'Encanto das águas',role:'inst',head:'humano',headOpt:{hair:'longo',hairCol:'#1B2140'},
    pal:[{n:'Morena',skin:'#A8714A',tail:'#1F8A84'},{n:'Jambo',skin:'#B9784F',tail:'#2C6FB0'},{n:'Cacau',skin:'#6B4128',tail:'#127A5E'}],
    body:{legLen:.62,torsoL:.52,hipR:.17,waistR:.165,chestR:.17,shoulderR:.16,armR:.04,armLen:.46,legR:.06,neck:.06,headK:1.3,legs:0,hand:'hand',tail:'peixe',gala:'iara'},
    def:{expr:'feliz',outfit:'base',pose:'parado',hat:'tiara'}},
  saci:{nome:'Saci',sub:'Pura travessura',role:'din',head:'humano',headOpt:{hair:'curto',hairCol:'#1A1210'},
    pal:[{n:'Retinto',skin:'#4E2E1E'},{n:'Cacau',skin:'#6B4128'},{n:'Canela',skin:'#8A5537'}],
    body:{legLen:.46,torsoL:.4,hipR:.15,waistR:.145,chestR:.165,shoulderR:.155,armR:.043,armLen:.38,legR:.06,neck:.03,headK:1.5,legs:1,foot:'shoe',hand:'hand',gala:'terno'},
    def:{head:1.1,expr:'piscando',outfit:'base',hat:'gorro',pose:'acenando'}},
  brincante:{nome:'Brincante',sub:'Veste o folclore',role:'din',head:'humano',headOpt:{hair:'curto',hairCol:'#2A1E18'},
    pal:[{n:'Jambo',skin:'#B9784F'},{n:'Areia',skin:'#D9A47A'},{n:'Cacau',skin:'#6B4128'},{n:'Retinto',skin:'#4E2E1E'}],
    body:HUMAN,def:{expr:'torcendo',outfit:'base',hat:'fitas',pose:'torcendo',mask:'boto'}},
  lobisomem:{nome:'Lobisomem',sub:'Uivo de festa',role:'din',head:'lobo',belly:true,iris:'#C99A1E',pal:[{n:'Cinza-lua',skin:'#6E7480',belly:'#C9CCD3'},{n:'Castanho',skin:'#6B4A33',belly:'#D2B48C'},{n:'Noite',skin:'#3A3F52',belly:'#9AA0B5'}],body:{...HUMAN,hipR:.21,waistR:.2,chestR:.24,shoulderR:.22,armR:.058,legR:.072,headK:1.4,foot:'paw',hand:'paw',fur:true,tail:'lobo'},def:{expr:'piscando',pose:'acenando'}},
  capelobo:{nome:'Capelobo',sub:'Focinho comprido',role:'inst',head:'tamandua',belly:true,pal:[{n:'Tamanduá',skin:'#5B4A3A',belly:'#D8C7A6'},{n:'Cinza',skin:'#6A6862',belly:'#D9D4C8'}],body:{...HUMAN,hipR:.24,waistR:.25,chestR:.25,shoulderR:.21,armR:.065,legR:.08,headK:1.45,foot:'paw',hand:'paw',fur:true,gala:'beca'},def:{expr:'pensando',outfit:'gala'}},
  boitata:{nome:'Boitatá',sub:'Serpente de fogo',role:'din',head:'cobra',belly:true,glow:true,iris:'#F6B12B',pal:[{n:'Fogo',skin:'#E2572A',belly:'#F6B12B',tail:'#E2572A'},{n:'Brasa',skin:'#C8202F',belly:'#F6B12B',tail:'#C8202F'},{n:'Fogo-azul',skin:'#2C5BB0',belly:'#7FD3FF',tail:'#2C5BB0'}],body:{...HUMAN,legLen:.5,legs:0,tail:'serpente',hand:'mitten',headK:1.45},def:{expr:'feliz',pose:'acenando'}},
  matinta:{nome:'Matinta Perera',sub:'Coruja do assobio',role:'inst',head:'coruja',belly:true,iris:'#F28C1E',pal:[{n:'Coruja',skin:'#6B5440',belly:'#E3D3B5'},{n:'Noite',skin:'#3E3550',belly:'#C9BEDC'}],body:{...HUMAN,hipR:.22,waistR:.22,chestR:.22,shoulderR:.19,headK:1.4,fur:true,hand:'mitten',foot:'claw',gala:'beca'},def:{expr:'pensando'}},
  arara:{nome:'Arara',sub:'Cores do Brasil',role:'din',head:'arara',belly:true,iris:'#2A1A10',pal:[{n:'Azul e amarelo',skin:'#1F6FD1',belly:'#FFC93C',acc:'#2EA44F'},{n:'Vermelha',skin:'#D62B2B',belly:'#FFC93C',acc:'#1F6FD1'}],body:{...HUMAN,legLen:.34,legR:.056,hipR:.25,waistR:.255,chestR:.24,shoulderR:.2,armR:.058,armLen:.42,neck:.02,headK:1.5,foot:'claw',hand:'mitten',tail:'passaro'},def:{expr:'feliz',pose:'acenando'}},
  onca:{nome:'Onça-pintada',sub:'Força do Pantanal',role:'din',head:'felino',belly:true,spots:true,iris:'#7DB063',pal:[{n:'Pintada',skin:'#E3A23B',belly:'#FFF1D6'},{n:'Preta',skin:'#2A2622',belly:'#4A423A'}],body:{...HUMAN,hipR:.19,chestR:.22,headK:1.45,foot:'paw',hand:'paw',tail:'felino'},def:{expr:'feliz',pose:'correndo'}},
  capivara:{nome:'Capivara',sub:'Calma de todo mundo',role:'inst',head:'capivara',pal:[{n:'Capivara',skin:'#8A6142',belly:'#B58A63'},{n:'Areia',skin:'#A97F57',belly:'#CBA37A'}],body:{...HUMAN,legLen:.38,torsoL:.55,hipR:.28,waistR:.3,chestR:.27,shoulderR:.21,armR:.06,armLen:.4,legR:.08,headK:1.4,fur:true,foot:'paw',hand:'paw'},def:{expr:'feliz',hat:'laranja'}},
  passista:ARQ('Passista de frevo','Recife e Olinda','din','cacheado',{outfit:'frevo',prop:'sombrinha',pose:'torcendo',expr:'torcendo'}),
  baiana:ARQ('Axé','Salvador, Bahia','inst','coque',{outfit:'baiana',hat:'turbante',pose:'acenando',expr:'feliz',color:4}),
  cangaceiro:ARQ('Cangaço','Sertão nordestino','din','curto',{outfit:'cangaceiro',hat:'cangaceiro',expr:'piscando',color:2}),
  gaucho:ARQ('Pampa','Rio Grande do Sul','inst','curto',{outfit:'gaucho',hat:'gaucho',prop:'cuia',expr:'feliz',color:5}),
  capoeirista:ARQ('Capoeirista','Roda de capoeira','din','curto',{outfit:'capoeira',prop:'berimbau',pose:'acenando',expr:'feliz',color:3}),
  sambista:ARQ('Sambista','Carnaval','din','cacheado',{outfit:'carnaval',hat:'flores',prop:'pandeiro',pose:'torcendo',expr:'vitorioso',color:2}),
  caipira:ARQ('Caipira','São João','din','curto',{outfit:'junino',hat:'palha',prop:'bandeirinhas',pose:'acenando',expr:'piscando',color:1}),
  torcedor:ARQ('Torcida','Copa do Mundo','din','curto',{outfit:'canarinho',prop:'bola',pose:'torcendo',expr:'vitorioso'}),
  mula:{nome:'Mula sem Cabeça',sub:'Fogo que brinca',role:'din',head:'mula',belly:true,iris:'#5A1E0A',pal:[{n:'Castanha',skin:'#7A4A2C',belly:'#C79A6B'},{n:'Preta',skin:'#2E2622',belly:'#7A6A60'},{n:'Branca',skin:'#E9E1D4',belly:'#F6EFE6'}],body:{...HUMAN,hipR:.22,waistR:.22,chestR:.23,shoulderR:.2,armR:.055,legR:.072,headK:1.35,foot:'hoof',hand:'mitten',tail:'lobo'},def:{expr:'feliz',pose:'acenando'}},
  fulozinha:ARQ('Fulozinha','Guarda da mata','din','longo',{outfit:'folhas',hat:'flores',expr:'piscando',color:2}),
  norato:{nome:'Cobra Norato',sub:'Cobra Grande do rio',role:'inst',head:'cobra',headOpt:{calm:true},belly:true,iris:'#F2C230',pal:[{n:'Rio',skin:'#1F6FA8',belly:'#BFE3F0',tail:'#1F6FA8'},{n:'Esmeralda',skin:'#127A5E',belly:'#C8EBD8',tail:'#127A5E'}],body:{...HUMAN,legLen:.5,legs:0,tail:'serpente',hand:'mitten',headK:1.45},def:{hat:'coroa',expr:'feliz'}},
  uirapuru:{nome:'Uirapuru',sub:'O canto da floresta',role:'din',head:'uirapuru',belly:true,iris:'#2A1A10',pal:[{n:'Uirapuru',skin:'#B5532A',belly:'#F2C9A0',acc:'#6B3A1E'}],body:{...HUMAN,legLen:.34,legR:.056,hipR:.25,waistR:.255,chestR:.24,shoulderR:.2,armR:.058,armLen:.42,neck:.02,headK:1.5,foot:'claw',hand:'mitten',tail:'passaro'},def:{expr:'feliz',prop:'microfone',pose:'acenando'}},
  tucano:{nome:'Tucano',sub:'Bico de festa',role:'din',head:'tucano',belly:true,iris:'#2A1A10',pal:[{n:'Toco',skin:'#1F1F26',belly:'#FFFFFF',acc:'#F28C1E'}],body:{...HUMAN,legLen:.34,legR:.056,hipR:.25,waistR:.255,chestR:.24,shoulderR:.2,armR:.058,armLen:.42,neck:.02,headK:1.5,foot:'claw',hand:'mitten',tail:'passaro'},def:{expr:'feliz',pose:'acenando'}},
  mico:{nome:'Mico-leão-dourado',sub:'Joia da Mata Atlântica',role:'din',head:'mico',belly:true,iris:'#5A2E0A',pal:[{n:'Dourado',skin:'#E58A2B',belly:'#F2C9A0'}],body:{...HUMAN,legLen:.48,headK:1.4,fur:true,foot:'paw',hand:'hand',tail:'felino'},def:{expr:'piscando',pose:'acenando'}},
  jangadeiro:ARQ('Jangada','Mar do Ceará','din','curto',{outfit:'jangadeiro',hat:'palha',prop:'remo',expr:'feliz',color:2}),
  vaqueiro:ARQ('Gibão','Vaquejada do sertão','inst','curto',{outfit:'vaqueiro',hat:'couro',expr:'feliz',color:0}),
  rendeira:ARQ('Renda','Renda de bilro','inst','coque',{outfit:'rendeira',prop:'bilro',expr:'feliz',color:1}),
  maracatu:ARQ('Realeza do Maracatu','Nação de Pernambuco','inst','coque',{outfit:'maracatu',hat:'coroa',prop:'estandarte',expr:'feliz',color:4}),
  repentista:ARQ('Repentista','Viola e rima','din','curto',{outfit:'chita',hat:'palha',prop:'viola',expr:'piscando',color:3}),
  zero:{nome:'Meu mascote',sub:'Começando do zero',role:'din',head:'humano',pal:[{n:'Minha cor',skin:'#B9784F'}],body:HUMAN,def:{expr:'feliz',outfit:'gincana',pose:'acenando',z:{head:'capivara',corpo:'barrigudo',cauda:'nenhuma',pes:'paw',maos:'paw',pele:'#8A6142',barriga:'#C9A37A',olhos:'#4A2E1E',cabelo:'#2A1E18',pelo:true,manchas:false,brilho:false,barrigaOn:true}}},
  fusao:{nome:'Fusão',sub:'Os quatro times em um',role:'din',head:'humano',headOpt:{hair:'cacheado',hairCol:'#2A1E18'},
    pal:[{n:'Encantado',skin:'#CFE7D6'},{n:'Areia',skin:'#E3C9A8'},{n:'Lilás',skin:'#D7CDEA'}],
    body:{...HUMAN,legLen:.5,torsoL:.52},def:{base:'capivara',expr:'vitorioso',outfit:'base',pose:'torcendo'}}
};
const STY={
 vinil:{dim:'3d',n:'3D vinil',head:1.06,eye:1.1,legs:1,hands:1.12,feet:1.1,mouth:1,fov:28},
 cartoon3d:{dim:'3d',n:'Cartoon 3D',head:1.2,eye:1.25,legs:.82,hands:1.3,feet:1.25,mouth:1.2,skin:'soft',warm:1,iris:.76,pupil:.44,hl2:1,fov:28},
 cartoon2d:{dim:'2d',n:'Cartoon 2D',head:1.2,eye:1.25,legs:.82,hands:1.3,feet:1.25,mouth:1.2,iris:.76,pupil:.44,hl2:1,toon:1,grad:3,outline:2.6,fov:16},
 anime:{dim:'2d',n:'Anime',head:1.12,eye:1.32,eyeY:1.28,legs:1.04,hands:1,feet:.95,mouth:.6,brow:.55,iris:.84,pupil:.3,hl2:1,toon:1,grad:2,outline:1.5,olc:'#3A2633',fov:16},
 chibi:{dim:'3d',n:'Chibi',head:1.6,eye:1.35,legs:.6,hands:1.25,feet:1.3,mouth:1.1,skin:'soft',warm:1,iris:.78,pupil:.46,hl2:1,fov:28},
 massinha:{dim:'3d',n:'Massinha',head:1.15,eye:1.12,legs:.86,hands:1.25,feet:1.25,mouth:1.1,skin:'clay',fabric:'clay',warm:1,fov:28},
 pelucia:{dim:'3d',n:'Pelúcia',head:1.32,eye:1.05,legs:.72,hands:1.2,feet:1.25,mouth:.9,skin:'fur',fabric:'fur',button:1,warm:1,fov:28},
 desenho:{dim:'2d',n:'Desenho (traço)',head:1.2,eye:1.25,legs:.82,hands:1.3,feet:1.25,mouth:1.2,iris:.76,pupil:.44,hl2:1,toon:1,grad:2,outline:3.6,fov:20,post:'desenho'},
 chapado:{dim:'2d',n:'Chapado',head:1.2,eye:1.25,legs:.82,hands:1.3,feet:1.25,mouth:1.2,iris:.76,pupil:.44,hl2:1,toon:1,grad:1,outline:2.8,fov:10},
 rascunho:{dim:'2d',n:'Rascunho a lápis',head:1.2,eye:1.25,legs:.82,hands:1.3,feet:1.25,mouth:1.2,iris:.76,pupil:.44,hl2:1,toon:1,grad:3,outline:0,fov:10,post:'rascunho'},
 aquarela:{dim:'2d',n:'Aquarela',head:1.2,eye:1.25,legs:.82,hands:1.3,feet:1.25,mouth:1.2,iris:.76,pupil:.44,hl2:1,skin:'soft',warm:1,fov:24,post:'aquarela'}
};
const CORPOS={humano:['Humano',HUMAN],robusto:['Robusto',{...HUMAN,hipR:.27,waistR:.28,chestR:.28,shoulderR:.23,armR:.068,legR:.085}],pequeno:['Pequeno',{...HUMAN,legLen:.4,torsoL:.42,hipR:.16,waistR:.15,chestR:.17,shoulderR:.15,armR:.045,armLen:.38,legR:.055}],barrigudo:['Barrigudo',{...HUMAN,legLen:.38,torsoL:.5,hipR:.25,waistR:.27,chestR:.23,shoulderR:.19,armR:.06,armLen:.42,legR:.078}],gigante:['Gigante',{...HUMAN,legLen:.5,torsoL:.7,hipR:.33,waistR:.35,chestR:.34,shoulderR:.27,armR:.095,armLen:.62,legR:.115}],perneta:['Uma perna',{...HUMAN,legs:1}],serpente:['Serpente',{...HUMAN,legLen:.5,legs:0,tail:'serpente'}],sereia:['Sereia',{...HUMAN,legLen:.62,legs:0,tail:'peixe'}]};
const ZHEADS=[['humano','Pessoa'],['jacare','Jacaré'],['boto','Boto'],['boi','Boi'],['mapinguari','Ciclope peludo'],['lobo','Lobo'],['tamandua','Tamanduá'],['cobra','Cobra'],['coruja','Coruja'],['arara','Arara'],['tucano','Tucano'],['felino','Felino'],['capivara','Capivara'],['mico','Mico'],['mula','Cabeça de fogo']];
const ZDEF={head:'humano',corpo:'humano',cauda:'nenhuma',pes:'shoe',maos:'hand',pele:'#B9784F',barriga:'#F1D9BE',olhos:'#4A2E1E',cabelo:'#2A1E18',pelo:false,manchas:false,brilho:false,barrigaOn:true};
function zeroSP(s){const z={...ZDEF,...(s.z||{})},B={...CORPOS[z.corpo][1],headK:1.42,foot:z.pes,hand:z.maos,fur:z.pelo};
  if(z.cauda!=='nenhuma'&&!['serpente','sereia'].includes(z.corpo))B.tail=z.cauda;
  return {nome:s.nome,sub:'Começando do zero',role:'din',head:z.head,headOpt:{hairCol:z.cabelo,calm:!z.brilho},belly:z.barrigaOn,spots:z.manchas,glow:z.brilho,iris:z.olhos,pal:[{n:'Minha cor',skin:z.pele,belly:z.barriga,tail:z.pele,acc:z.barriga}],body:B}}
const BASE_STATE={pecas:'delicada',lashes:false,head:1,height:1,body:1,color:0,expr:'feliz',outfit:'base',hat:'nenhum',team:'neutro',pose:'parado',prop:'nenhum',glasses:false,blush:true,mask:'nenhuma',lit:{correnteza:true,chama:true,mata:true,vendaval:true},cores:{},aj:{}};
function defaultChar(id){return JSON.parse(JSON.stringify({...BASE_STATE,nome:SPECIES[id].nome,...SPECIES[id].def}))}

const EXPR={
  feliz:{o:[.85,.85],low:.35,brow:0,by:0,mouth:'smile',blush:1},
  torcendo:{o:[0,0],low:.5,brow:-.15,by:.35,mouth:'open',blush:1},
  bravo:{o:[.55,.55],low:.2,brow:.5,by:-.1,mouth:'frown',mw:.7},
  surpreso:{o:[1,1],sc:1.15,brow:-.1,by:.55,mouth:'o'},
  piscando:{o:[.9,0],low:.4,brow:0,by:.1,mouth:'smile',blush:1},
  pensando:{o:[.75,.75],brow:0,by:0,byL:.45,mouth:'side',look:[.5,.45],blush:1},
  triste:{o:[.62,.62],brow:-.5,by:.1,mouth:'frown',look:[0,-.5]},
  vitorioso:{o:[1,1],star:1,brow:-.15,by:.35,mouth:'open',blush:1}
};

/* ---- materiais e texturas ---- */
const MC={};
function shade(hex,t){const c=new THREE.Color(hex);const hsl={};c.getHSL(hsl);c.setHSL(hsl.h,hsl.s,Math.max(0,Math.min(1,hsl.l+t)));return '#'+c.getHexString()}
const MODE={sy:null};
function mat(c,k='skin'){if(MODE.sy){if(k==='skin'&&MODE.sy.skin)k=MODE.sy.skin;else if(k==='fabric'&&MODE.sy.fabric)k=MODE.sy.fabric}const key=c+'|'+k;if(MC[key])return MC[key];let m;
  switch(k){
    case 'skin':m=new THREE.MeshPhysicalMaterial({color:c,roughness:.48,clearcoat:.35,clearcoatRoughness:.35});break;
    case 'clay':m=new THREE.MeshStandardMaterial({color:c,roughness:.85,bumpMap:clayTex(),bumpScale:.006});break;
    case 'soft':m=new THREE.MeshPhysicalMaterial({color:c,roughness:.6,clearcoat:.06,sheen:.9,sheenColor:new THREE.Color(shade(c,.28)),sheenRoughness:.45});break;
    case 'fur':m=new THREE.MeshPhysicalMaterial({color:c,roughness:.95,sheen:1,sheenColor:new THREE.Color(shade(c,.25)),sheenRoughness:.6,bumpMap:furTex(),bumpScale:.015});break;
    case 'fabric':m=new THREE.MeshPhysicalMaterial({color:c,roughness:.82,sheen:.4,sheenColor:new THREE.Color(shade(c,.2))});break;
    case 'velvet':m=new THREE.MeshPhysicalMaterial({color:c,roughness:.65,sheen:1,sheenColor:new THREE.Color(shade(c,.35)),sheenRoughness:.4,side:THREE.DoubleSide});break;
    case 'gold':m=new THREE.MeshStandardMaterial({color:c,metalness:.85,roughness:.28});break;
    case 'gloss':m=new THREE.MeshPhysicalMaterial({color:c,roughness:.2,clearcoat:1,clearcoatRoughness:.15});break;
    case 'eye':m=new THREE.MeshPhysicalMaterial({color:c,roughness:.12,clearcoat:1});break;
    case 'flat':m=new THREE.MeshStandardMaterial({color:c,roughness:.6,side:THREE.DoubleSide});break;
    case 'ember':m=new THREE.MeshPhysicalMaterial({color:c,emissive:c,emissiveIntensity:.35,roughness:.4,clearcoat:.5});break;
    case 'glow':m=new THREE.MeshStandardMaterial({color:c,emissive:c,emissiveIntensity:.65,roughness:.45});break;
    case 'scales':m=new THREE.MeshPhysicalMaterial({color:c,roughness:.3,metalness:.25,clearcoat:.8,iridescence:.4});break;
    case 'blush':m=new THREE.MeshStandardMaterial({color:c,roughness:.8,transparent:true,opacity:.45,depthWrite:false});break;
    default:m=new THREE.MeshStandardMaterial({color:c});
  }
  m.userData.k=k;MC[key]=m;return m}
/* ---- tingir peças com a paleta BC: a cor que mais aparece vira a principal, a segunda vira detalhe, a terceira extra ---- */
const TT={};
const rgb=h=>{const n=parseInt(String(h).replace('#','').slice(0,6),16);return [n>>16&255,n>>8&255,n&255]};
function hexDist(a,b){const x=rgb(a),y=rgb(b);return Math.hypot(x[0]-y[0],x[1]-y[1],x[2]-y[2])}
function texDom(t){if(t.userData.dom)return t.userData.dom;const im=t.image;let dom='#FFFFFF';
  try{const c=document.createElement('canvas'),s=64;c.width=c.height=s;const x=c.getContext('2d');x.drawImage(im,0,0,s,s);const d=x.getImageData(0,0,s,s).data,h={};
    for(let i=0;i<d.length;i+=4){const k=(d[i]>>4)+','+(d[i+1]>>4)+','+(d[i+2]>>4);h[k]=(h[k]||0)+1}
    dom='#'+Object.keys(h).sort((a,b)=>h[b]-h[a])[0].split(',').map(v=>(+v*16+8).toString(16).padStart(2,'0')).join('')}catch(e){}
  return t.userData.dom=dom}
function tintTex(t,main,det){const key=t.uuid+main+det;if(TT[key])return TT[key];const im=t.image,dom=rgb(texDom(t)),M=rgb(main),D=det?rgb(det):null;
  let out=t;try{const c=document.createElement('canvas');c.width=im.width;c.height=im.height;const x=c.getContext('2d');x.drawImage(im,0,0);const g=x.getImageData(0,0,c.width,c.height),d=g.data;
    const [dr,dg,db]=dom;
    for(let i=0;i<d.length;i+=4){const dist=Math.hypot(d[i]-dr,d[i+1]-dg,d[i+2]-db),w=Math.min(1,Math.max(0,(dist-30)/60));
      const r2=D?D[0]:d[i],g2=D?D[1]:d[i+1],b2=D?D[2]:d[i+2];d[i]=M[0]*(1-w)+r2*w;d[i+1]=M[1]*(1-w)+g2*w;d[i+2]=M[2]*(1-w)+b2*w}
    x.putImageData(g,0,0);out=new THREE.CanvasTexture(c);out.encoding=t.encoding;out.anisotropy=t.anisotropy;out.wrapS=t.wrapS;out.wrapT=t.wrapT;out.repeat.copy(t.repeat)}catch(e){}
  return TT[key]=out}
function geoArea(g){if(g.userData.area!==undefined)return g.userData.area;const p=g.attributes.position,ix=g.index,a=new THREE.Vector3(),b=new THREE.Vector3(),c=new THREE.Vector3();let s=0;
  const n=ix?ix.count:p.count;for(let i=0;i+2<n;i+=3){const i0=ix?ix.getX(i):i,i1=ix?ix.getX(i+1):i+1,i2=ix?ix.getX(i+2):i+2;a.fromBufferAttribute(p,i0);b.fromBufferAttribute(p,i1);c.fromBufferAttribute(p,i2);s+=b.sub(a).cross(c.sub(a)).length()/2}
  return g.userData.area=s}
function tint(meshes,cols){cols=(cols||[]).slice(0,3);if(!cols.some(Boolean)||!meshes.length)return;
  const groups=[],v=new THREE.Vector3();
  meshes.forEach(o=>{const m=o.material;if(!m||!m.color||m.transparent)return;const hex=m.map?texDom(m.map):'#'+m.color.getHexString();
    o.getWorldScale(v);const wt=geoArea(o.geometry)*Math.abs(v.x*v.y+v.y*v.z+v.x*v.z)/3;
    let g=groups.find(x=>hexDist(x.hex,hex)<24);if(!g){g={hex,wt:0,ms:[]};groups.push(g)}g.wt+=wt;g.ms.push(o)});
  groups.sort((a,b)=>b.wt-a.wt).forEach((g,i)=>{const c=cols[i];if(!c)return;
    g.ms.forEach(o=>{const m=o.material;
      if(m.map){const k='tm'+m.uuid+c+(cols[1]||'');o.material=MC[k]||(MC[k]=Object.assign(m.clone(),{map:tintTex(m.map,c,cols[1])}))}
      else if(m.userData.k)o.material=mat(c,m.userData.k);
      else{const k='tc'+m.uuid+c;o.material=MC[k]||(MC[k]=m.clone());o.material.color.set(c)}})})}
function meshesOf(root){const a=[];root.traverse(o=>{if(o.isMesh)a.push(o)});return a}
/* ---- ajuste livre de posição, giro e tamanho (cm, graus e %) ---- */
const AJ0={x:0,y:0,z:0,ry:0,rx:0,rz:0,k:100};
function ajOf(s,p){return {...AJ0,...((s.aj||{})[p]||{})}}
function ajApply(o,a,u=1){const D=Math.PI/180;o.position.x+=a.x*.01*u;o.position.y+=a.y*.01*u;o.position.z+=a.z*.01*u;o.rotation.order='YXZ';o.rotation.set(a.rx*D,a.ry*D,a.rz*D);o.scale.multiplyScalar(a.k/100)}
function pivotWrap(g){const b=new THREE.Box3().setFromObject(g),c=new THREE.Vector3();if(b.isEmpty())return g;b.getCenter(c);if(g.parent){g.parent.updateMatrixWorld(true);g.parent.worldToLocal(c)}const ch=[...g.children];ch.forEach(o=>o.position.sub(c));g.position.copy(c);return g}
const TX={};
function canvasTex(key,w,h,draw,rep){if(TX[key]!==undefined)return TX[key];
  if(typeof document==='undefined'){TX[key]=null;return null}
  const c=document.createElement('canvas');c.width=w;c.height=h;const x=c.getContext('2d');if(!x){TX[key]=null;return null}
  draw(x,w,h);const t=new THREE.CanvasTexture(c);t.encoding=THREE.sRGBEncoding;t.anisotropy=4;
  if(rep){t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(rep[0],rep[1])}TX[key]=t;return t}
const FONT='"Bricolage Grotesque", system-ui, sans-serif';
function shirtTex(bg,fg){return canvasTex('shirt'+bg+fg,1280,512,(x,w,h)=>{x.fillStyle=bg;x.fillRect(0,0,w,h);x.textAlign='center';x.textBaseline='middle';
  x.font='800 300px '+FONT;x.lineJoin='round';x.lineWidth=20;x.strokeStyle=BC.ink;x.strokeText('27',w/2,h*.4);x.fillStyle=fg;x.fillText('27',w/2,h*.4);
  x.font='800 90px '+FONT;[0,w].forEach(px=>{x.strokeStyle=BC.ink;x.lineWidth=10;x.strokeText('BC',px,h*.3);x.fillStyle=fg;x.fillText('BC',px,h*.3)})})}
function chitaTex(){return canvasTex('chita',256,256,(x,w,h)=>{x.fillStyle='#C9283A';x.fillRect(0,0,w,h);
  const fl=(cx,cy,r,p,c)=>{for(let i=0;i<5;i++){const a=i*Math.PI*2/5;x.fillStyle=p;x.beginPath();x.arc(cx+Math.cos(a)*r,cy+Math.sin(a)*r,r*.8,0,7);x.fill()}x.fillStyle=c;x.beginPath();x.arc(cx,cy,r*.6,0,7);x.fill()};
  x.fillStyle='#2F7D46';[[60,40,.6],[190,170,-.8],[120,230,.2]].forEach(([a,b,r])=>{x.save();x.translate(a,b);x.rotate(r);x.beginPath();x.ellipse(0,0,26,10,0,0,7);x.fill();x.restore()});
  fl(64,64,22,'#F6C431','#1E5BB5');fl(192,192,22,'#F6C431','#1E5BB5');fl(192,60,14,'#FFFFFF','#E3AC40');fl(60,190,14,'#FFFFFF','#E3AC40')},[5,3])}
function patchTex(){return canvasTex('patch',256,256,(x,w,h)=>{const cs=[BC.green,BC.yellow,BC.blue,BC.bright,'#FFFFFF','#E2572A','#C8202F','#1F3A6B'];for(let i=0;i<4;i++)for(let j=0;j<4;j++){x.fillStyle=cs[(i*3+j*5)%cs.length];x.fillRect(i*64,j*64,64,64)}x.strokeStyle='rgba(0,0,0,.25)';x.setLineDash([6,5]);x.lineWidth=3;for(let i=0;i<=4;i++){x.beginPath();x.moveTo(i*64,0);x.lineTo(i*64,h);x.stroke();x.beginPath();x.moveTo(0,i*64);x.lineTo(w,i*64);x.stroke()}},[3,2])}
function flagTex(){return canvasTex('flag',512,320,(x,w,h)=>{x.fillStyle=BC.green;x.fillRect(0,0,w,h);x.fillStyle=BC.yellow;x.textAlign='center';x.textBaseline='middle';x.font='800 150px '+FONT;x.fillText('BC27',w/2,h/2+6)})}
function windTex(){return canvasTex('wind',512,256,(x,w,h)=>{x.fillStyle='#F4EFE3';x.fillRect(0,0,w,h);x.lineWidth=14;x.lineCap='round';for(let i=0;i<6;i++){x.strokeStyle=i%2?'#2C5BB0':'#C8202F';x.beginPath();const cx=40+i*90,cy=60+(i%3)*60;for(let a=0;a<11;a+=.2){const r=4+a*4;x.lineTo(cx+Math.cos(a)*r,cy+Math.sin(a)*r)}x.stroke()}})}
function clayTex(){return canvasTex('clay',256,256,(x,w,h)=>{x.fillStyle='#808080';x.fillRect(0,0,w,h);for(let i=0;i<900;i++){const v=Math.floor(90+Math.random()*80);x.fillStyle=`rgba(${v},${v},${v},.35)`;x.beginPath();x.ellipse(Math.random()*w,Math.random()*h,2+Math.random()*7,1+Math.random()*3,Math.random()*3,0,7);x.fill()}},[4,4])}
function stripeTex(a,b){return canvasTex('st'+a+b,64,64,(x,w,h)=>{x.fillStyle=a;x.fillRect(0,0,w,h);x.fillStyle=b;for(let i=0;i<4;i++)x.fillRect(0,i*16,w,8)},[1,8])}
function furTex(){return canvasTex('fur',256,256,(x,w,h)=>{const d=x.createImageData(w,h);for(let i=0;i<w*h;i++){const v=110+Math.random()*120;d.data[i*4]=d.data[i*4+1]=d.data[i*4+2]=v;d.data[i*4+3]=255}x.putImageData(d,0,0);x.strokeStyle='rgba(0,0,0,.35)';x.lineWidth=2;for(let i=0;i<500;i++){const a=Math.random()*w,b=Math.random()*h;x.beginPath();x.moveTo(a,b);x.lineTo(a+3,b+12);x.stroke()}},[6,6])}

/* ---- geometrias ---- */
function plaidTex(){return canvasTex('plaid',128,128,(x,w,h)=>{x.fillStyle='#FFFFFF';x.fillRect(0,0,w,h);x.fillStyle='rgba(200,32,47,.55)';x.fillRect(0,40,w,48);x.fillRect(40,0,48,h);x.fillStyle='rgba(200,32,47,.3)';x.fillRect(0,0,w,10);x.fillRect(0,0,10,h)},[6,4])}
function frevoTex(){return canvasTex('frevo',320,64,(x,w,h)=>{['#F6C431','#C8202F','#2C5BB0','#2EA44F','#E2572A'].forEach((c,i)=>{x.fillStyle=c;x.fillRect(i*64,0,64,h)})},[3,1])}
function laceTex(){return canvasTex('lace',64,64,(x,w,h)=>{x.fillStyle='#FFFFFF';x.fillRect(0,0,w,h);x.strokeStyle='#D9D4C8';x.lineWidth=2;for(let i=0;i<2;i++)for(let j=0;j<2;j++){x.beginPath();x.arc(16+i*32,16+j*32,8,0,7);x.stroke()}},[10,6])}
function sequinTex(){return canvasTex('seq',64,64,(x,w,h)=>{x.fillStyle='#C98F2A';x.fillRect(0,0,w,h);for(let i=0;i<4;i++)for(let j=0;j<4;j++){x.fillStyle=(i+j)%2?'#F6D77A':'#E3AC40';x.beginPath();x.arc(8+i*16,8+j*16,6,0,7);x.fill()}},[12,4])}
const GC={};
const SPH=(r=1,a=32,b=24)=>GC['s'+r+a+b]||(GC['s'+r+a+b]=new THREE.SphereGeometry(r,a,b));
const HEMI_UP=()=>GC.hu||(GC.hu=new THREE.SphereGeometry(1,32,16,0,Math.PI*2,0,Math.PI/2));
const HEMI_LO=()=>GC.hl||(GC.hl=new THREE.SphereGeometry(1,32,16,0,Math.PI*2,Math.PI/2,Math.PI/2));
const TOOTH=()=>GC.t||(GC.t=new THREE.ConeGeometry(.01,.028,12));
const FLAME=()=>GC.f||(GC.f=new THREE.LatheGeometry([[0,0],[.045,.03],[.055,.08],[.04,.15],[.018,.21],[0,.25]].map(p=>new THREE.Vector2(p[0],p[1])),24));
function starGeo(){if(GC.star)return GC.star;const s=new THREE.Shape();for(let i=0;i<10;i++){const r=i%2?.022:.05,a=Math.PI/2+i*Math.PI/5;const px=Math.cos(a)*r,py=Math.sin(a)*r;i?s.lineTo(px,py):s.moveTo(px,py)}s.closePath();return GC.star=new THREE.ExtrudeGeometry(s,{depth:.012,bevelEnabled:true,bevelSize:.004,bevelThickness:.004,bevelSegments:2})}
function crescentGeo(){if(GC.cr)return GC.cr;const s=new THREE.Shape();s.absarc(0,0,.04,0,Math.PI*2,false);const hole=new THREE.Path();hole.absarc(.016,.008,.034,0,Math.PI*2,true);s.holes.push(hole);return GC.cr=new THREE.ExtrudeGeometry(s,{depth:.008,bevelEnabled:false,curveSegments:24})}
function mesh(geo,m,x=0,y=0,z=0,sx=1,sy=sx,sz=sx){const o=new THREE.Mesh(geo,m);o.position.set(x,y,z);o.scale.set(sx,sy,sz);return o}
function capsule(r,len,m){return new THREE.Mesh(new THREE.CapsuleGeometry(r,Math.max(len,.001),8,20),m)}
function taperTube(pts,rFn,tub=48,rad=18){
  const curve=new THREE.CatmullRomCurve3(pts.map(p=>new THREE.Vector3(p[0],p[1],p[2])));
  const fr=curve.computeFrenetFrames(tub,false),pos=[],uv=[],idx=[];
  for(let i=0;i<=tub;i++){const t=i/tub,P=curve.getPointAt(t),N=fr.normals[i],Bn=fr.binormals[i],r=rFn(t);
    for(let j=0;j<=rad;j++){const v=j/rad*Math.PI*2,c=Math.cos(v),s=Math.sin(v);
      pos.push(P.x+r*(c*N.x+s*Bn.x),P.y+r*(c*N.y+s*Bn.y),P.z+r*(c*N.z+s*Bn.z));uv.push(t,j/rad)}}
  for(let i=0;i<tub;i++)for(let j=0;j<rad;j++){const a=i*(rad+1)+j,b=(i+1)*(rad+1)+j;idx.push(a,b,a+1,b,b+1,a+1)}
  const g=new THREE.BufferGeometry();g.setIndex(idx);g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));g.computeVertexNormals();g.userData.curve=curve;return g}
function smoothPts(raw,n=40){const c=new THREE.CatmullRomCurve3(raw.map(([r,y])=>new THREE.Vector3(r,y,0)));return c.getPoints(n).map(p=>new THREE.Vector2(Math.max(p.x,.001),p.y))}
function torsoPts(B,w,L){return smoothPts([[.001,-.03*L],[B.hipR*w*.75,-.02*L],[B.hipR*w,.12*L],[B.waistR*w,.45*L],[B.chestR*w,.74*L],[B.shoulderR*w,.92*L],[B.shoulderR*w*.55,1.0*L],[.001,1.02*L]])}
function radiusAt(pts,y){for(let i=1;i<pts.length;i++){const a=pts[i-1],b=pts[i];if((y>=a.y&&y<=b.y)||(y<=a.y&&y>=b.y)){const t=(y-a.y)/((b.y-a.y)||1);return a.x+(b.x-a.x)*t}}return pts[Math.floor(pts.length/2)].x}
function latheRange(pts,ya,yb,k){const sel=[new THREE.Vector2(radiusAt(pts,ya)*k,ya)];pts.forEach(p=>{if(p.y>ya&&p.y<yb)sel.push(new THREE.Vector2(p.x*k,p.y))});sel.push(new THREE.Vector2(Math.max(radiusAt(pts,yb)*k,.001),yb));return new THREE.LatheGeometry(sel,48,Math.PI,Math.PI*2)}

/* ---- cabeças ---- */
function headHumano(m,opt={}){const g=new THREE.Group();
  g.add(mesh(SPH(.15),m.skin,0,.14,0));
  [-1,1].forEach(d=>g.add(mesh(SPH(.036,16,12),m.skin,d*.148,.13,.005)));
  g.add(mesh(SPH(.024,16,12),m.skin,0,.122,.152));
  const hcol=opt.hairCol||'#2A1E18',hc=mat(hcol,'skin');let top=.29;
  if(opt.hair==='curto'){const cap=new THREE.Mesh(new THREE.SphereGeometry(.158,32,16,0,Math.PI*2,0,Math.PI*.42),hc);cap.position.set(0,.14,-.008);cap.rotation.x=-.28;g.add(cap);top=.3}
  if(opt.hair==='cacheado'){for(let i=0;i<30;i++){const u=i/30,ph=u*1.95,az=i*2.39996,dx=Math.sin(ph)*Math.cos(az),dy=Math.cos(ph),dz=Math.sin(ph)*Math.sin(az);if(dz>.35&&ph>.75)continue;g.add(mesh(SPH(.062,16,12),hc,dx*.16,.16+dy*.16,-.012+dz*.16))}top=.38}
  if(opt.hair==='coque'){const cap=new THREE.Mesh(new THREE.SphereGeometry(.158,32,16,0,Math.PI*2,0,Math.PI*.42),hc);cap.position.set(0,.14,-.008);cap.rotation.x=-.28;g.add(cap);g.add(mesh(SPH(.075),hc,0,.3,-.07));top=.38}
  if(opt.hair==='longo'){g.add(mesh(SPH(.16),hc,0,.2,-.05));
    for(let i=0;i<7;i++){const a=(i-3)*.3,x0=Math.sin(a)*.13,z0=-.06-Math.cos(a)*.07,wv=.02*Math.sin(i*1.7);
      g.add(new THREE.Mesh(taperTube([[x0,.24,z0],[x0*1.25,.08,z0-.04],[x0*1.4+wv,-.15,z0-.03],[x0*1.3-wv,-.4,z0-.05]],t=>.05*(1-t)+.013),hc))}
    top=.36}
  if(opt.hair==='chama'){for(let i=-3;i<=3;i++){const f=new THREE.Mesh(FLAME(),mat(['#C8202F','#E2572A','#F6B12B'][(i+3)%3],'glow'));f.position.set(i*.045,.25-Math.abs(i)*.015,-.03-Math.abs(i)*.012);f.rotation.set(-.55,0,-i*.18);f.scale.setScalar(1.15-Math.abs(i)*.1);g.add(f)}top=.47}
  return {g,A:{eyes:[{p:[-.058,.155,.128],r:.042},{p:[.058,.155,.128],r:.042}],mouth:{p:[0,.075,.14],w:.036},cheeks:[[-.088,.1,.118],[.088,.1,.118]],hat:[0,.255,0],hatK:1,top,ears:[[-.152,.095,.01],[.152,.095,.01]],crownR:.16,browCol:hcol,crest:opt.hair==='chama'}}}
function headJacare(m){const g=new THREE.Group();
  g.add(mesh(SPH(.15),m.skin,0,.13,0,1.1,.85,1.1));
  const up=capsule(.075,.24,m.skin);up.rotation.x=Math.PI/2;up.position.set(0,.1,.2);up.scale.set(1.3,1,.6);g.add(up);
  const lo=capsule(.07,.22,m.belly);lo.rotation.x=Math.PI/2;lo.position.set(0,.045,.19);lo.scale.set(1.22,1,.45);g.add(lo);
  for(let i=0;i<3;i++)[-1,1].forEach(d=>{const t=mesh(TOOTH(),m.white,d*.072,.058,.2+i*.07);t.scale.setScalar(.75);t.rotation.x=Math.PI;g.add(t)});
  [-1,1].forEach(d=>{g.add(mesh(SPH(.066,24,16),m.skin,d*.075,.215,.075));g.add(mesh(SPH(.013,12,8),m.dark,d*.034,.135,.37))});
  for(let i=0;i<3;i++)g.add(mesh(new THREE.ConeGeometry(.022,.04,10),m.skinD,0,.235-i*.03,-.06-i*.06));
  return {g,A:{eyes:[{p:[-.075,.235,.118],r:.05},{p:[.075,.235,.118],r:.05}],mouth:{p:[0,.07,.383],w:.05},cheeks:[[-.13,.1,.13],[.13,.1,.13]],hat:[0,.24,-.03],hatK:1.05,top:.29,ears:[[-.165,.1,-.01],[.165,.1,-.01]],crownR:.17}}}
function headBoto(m){const g=new THREE.Group();
  g.add(mesh(SPH(.18),m.skin,0,.15,0,1,.95,1));
  g.add(mesh(SPH(.12),m.skin,0,.2,.08));
  const ro=capsule(.05,.2,m.skin);ro.rotation.x=Math.PI/2+.12;ro.position.set(0,.07,.25);g.add(ro);
  g.add(mesh(SPH(.14),m.belly,0,.06,.07,1,.55,1.05));
  return {g,A:{eyes:[{p:[-.1,.155,.14],r:.042},{p:[.1,.155,.14],r:.042}],mouth:{p:[0,.045,.393],w:.03},cheeks:[[-.13,.08,.13],[.13,.08,.13]],hat:[0,.3,0],hatK:1.08,top:.33,ears:[[-.175,.1,0],[.175,.1,0]],crownR:.18}}}
function headBoi(m){const g=new THREE.Group();
  g.add(mesh(SPH(.17),m.skin,0,.15,0,1.05,.95,1));
  g.add(mesh(SPH(.12),m.belly,0,.07,.14,1.25,.8,.9));
  [-1,1].forEach(d=>{g.add(mesh(SPH(.016,12,8),m.dark,d*.05,.075,.243));
    g.add(new THREE.Mesh(taperTube([[d*.12,.25,0],[d*.22,.29,.01],[d*.27,.38,.04],[d*.26,.45,.05]],t=>.035*(1-t)+.008,24,12),mat('#E3AC40','gold')));
    const e=mesh(SPH(.06),m.skin,d*.19,.17,-.01,1.5,.6,1);e.rotation.z=-d*.35;g.add(e)});
  const st=new THREE.Mesh(starGeo(),mat(BC.yellow,'glow'));st.position.set(0,.215,.152);g.add(st);
  const rc=[BC.yellow,BC.bright,BC.blue,'#FFFFFF',BC.green,BC.yellow];
  rc.forEach((c,i)=>{const d=i<3?-1:1,k=i%3;const r=mesh(new THREE.BoxGeometry(.018,.3,.004),mat(c,'fabric'),d*(.09+k*.03),.08,-.13-k*.01);r.rotation.z=d*.08;g.add(r)});
  return {g,A:{eyes:[{p:[-.095,.18,.142],r:.045},{p:[.095,.18,.142],r:.045}],mouth:{p:[0,.03,.238],w:.05},cheeks:[[-.14,.1,.11],[.14,.1,.11]],hat:[0,.31,0],hatK:1.1,top:.32,ears:[[-.17,.12,.0],[.17,.12,0]],crownR:.18}}}
function headMapinguari(m){const g=new THREE.Group();
  g.add(mesh(SPH(.2),m.skin,0,.12,0,1.1,.95,1));
  for(let i=0;i<5;i++){const c=mesh(new THREE.ConeGeometry(.035,.09,10),m.skin,(i-2)*.06,.3-Math.abs(i-2)*.02,-.02);c.rotation.z=-(i-2)*.3;g.add(c)}
  [-1,1].forEach(d=>g.add(mesh(SPH(.05),m.skin,d*.2,.22,0)));
  g.add(mesh(SPH(.045),m.dark,0,.08,.2,1.2,.8,.8));
  return {g,A:{eyes:[{p:[0,.18,.165],r:.075}],mouth:{body:true,t:.42,w:.11},cheeks:[[-.15,.08,.13],[.15,.08,.13]],hat:[0,.3,0],hatK:1.25,top:.31,ears:[[-.22,.1,0],[.22,.1,0]],crownR:.22}}}
function headLobo(m){const g=new THREE.Group();g.add(mesh(SPH(.16),m.skin,0,.15,0,1,.95,1));
  const mz=capsule(.06,.12,m.skin);mz.rotation.x=Math.PI/2+.1;mz.position.set(0,.1,.17);mz.scale.set(1.15,1,.85);g.add(mz);
  g.add(mesh(SPH(.06),m.belly,0,.075,.16,1.1,.7,1.2));g.add(mesh(SPH(.03),m.dark,0,.12,.285,1.2,.8,1));
  [-1,1].forEach(d=>{const e=mesh(new THREE.ConeGeometry(.055,.13,12),m.skin,d*.1,.3,-.01);e.rotation.z=-d*.35;g.add(e);const ei=mesh(new THREE.ConeGeometry(.03,.08,10),mat('#E7A0A8','skin'),d*.098,.295,.012);ei.rotation.z=-d*.35;g.add(ei);const c=mesh(new THREE.ConeGeometry(.04,.09,10),m.skin,d*.15,.08,.04);c.rotation.z=d*1.9;g.add(c)});
  return {g,A:{eyes:[{p:[-.065,.19,.13],r:.042},{p:[.065,.19,.13],r:.042}],mouth:{p:[0,.06,.275],w:.035},cheeks:[[-.11,.11,.12],[.11,.11,.12]],hat:[0,.28,0],hatK:1,top:.36,ears:[[-.16,.12,0],[.16,.12,0]],crownR:.17}}}
function headTamandua(m){const g=new THREE.Group();g.add(mesh(SPH(.14),m.skin,0,.14,0,1,.9,1.1));
  g.add(new THREE.Mesh(taperTube([[0,.13,.08],[0,.11,.25],[0,.07,.42]],t=>.055*(1-t)+.018,24,14),m.skin));g.add(mesh(SPH(.022),m.dark,0,.07,.43));
  [-1,1].forEach(d=>g.add(mesh(SPH(.035),m.skin,d*.11,.24,-.03,1,1,.5)));g.add(mesh(SPH(1),m.belly,0,.06,0,.13,.06,.12));
  return {g,A:{eyes:[{p:[-.075,.18,.11],r:.036},{p:[.075,.18,.11],r:.036}],mouth:{p:[0,.05,.41],w:.018},cheeks:[[-.1,.11,.12],[.1,.11,.12]],hat:[0,.25,-.02],hatK:.95,top:.27,ears:[[-.13,.1,0],[.13,.1,0]],crownR:.15}}}
function headCobra(m,opt={}){const g=new THREE.Group();g.add(mesh(SPH(.15),m.skin,0,.14,.04,1.15,.78,1.35));g.add(mesh(SPH(.12),m.belly,0,.09,.09,1.05,.45,1.2));
  if(!opt.calm){const fc=flameCrest(5,1);fc.position.set(0,.22,-.02);g.add(fc)}
  g.add(mesh(new THREE.BoxGeometry(.012,.004,.07),mat('#C8202F','skin'),0,.085,.25));[-1,1].forEach(d=>{const f=mesh(new THREE.BoxGeometry(.008,.004,.03),mat('#C8202F','skin'),d*.01,.085,.29);f.rotation.y=d*.5;g.add(f)});
  return {g,A:{eyes:[{p:[-.085,.19,.17],r:.045},{p:[.085,.19,.17],r:.045}],mouth:{p:[0,.11,.236],w:.05},cheeks:[[-.13,.13,.14],[.13,.13,.14]],hat:[0,.26,0],hatK:1.05,top:.33,ears:[[-.17,.13,.04],[.17,.13,.04]],crownR:.18,crest:!opt.calm}}}
function headCoruja(m){const g=new THREE.Group();g.add(mesh(SPH(.19),m.skin,0,.15,0,1.05,.95,.95));g.add(mesh(SPH(1),m.belly,0,.15,.1,.16,.14,.08));
  [-1,1].forEach(d=>{const t=mesh(new THREE.ConeGeometry(.04,.12,10),m.skin,d*.12,.32,-.01);t.rotation.z=-d*.3;g.add(t)});
  const bk=mesh(new THREE.ConeGeometry(.028,.07,12),mat('#E3AC40','gloss'),0,.12,.2);bk.rotation.x=Math.PI*.62;g.add(bk);
  return {g,A:{eyes:[{p:[-.068,.18,.155],r:.056},{p:[.068,.18,.155],r:.056}],mouth:{p:[0,.07,.185],w:.025},cheeks:[[-.13,.1,.13],[.13,.1,.13]],hat:[0,.3,0],hatK:1.15,top:.37,ears:[[-.19,.12,0],[.19,.12,0]],crownR:.2}}}
function headFelino(m){const g=new THREE.Group();g.add(mesh(SPH(.16),m.skin,0,.15,0,1.06,.95,1));g.add(mesh(SPH(.07),m.belly,0,.095,.13,1.35,.8,.9));g.add(mesh(SPH(.022),mat('#5A2E2A','gloss'),0,.13,.19,1.3,.8,.8));
  [-1,1].forEach(d=>{g.add(mesh(SPH(.05),m.skin,d*.12,.28,-.01,1,1,.5));g.add(mesh(SPH(.03),m.belly,d*.12,.28,.012,1,1,.4))});
  const sp=mat('#2A1D14','skin');[[-.08,.27,.08],[.07,.28,.09],[0,.3,.05],[-.14,.2,.06],[.14,.21,.06],[-.05,.25,.12],[.12,.13,.1]].forEach(p=>{const s=mesh(SPH(1),sp,p[0],p[1],p[2],.018,.018,.012);s.lookAt(p[0]*2,p[1]*2-.15,p[2]*2);g.add(s)});
  return {g,A:{eyes:[{p:[-.07,.18,.13],r:.044},{p:[.07,.18,.13],r:.044}],mouth:{p:[0,.07,.19],w:.035},cheeks:[[-.11,.11,.12],[.11,.11,.12]],hat:[0,.29,0],hatK:1.05,top:.33,ears:[[-.17,.13,0],[.17,.13,0]],crownR:.17}}}
function headCapivara(m){const g=new THREE.Group();g.add(mesh(SPH(.15),m.skin,0,.15,.02,1,.95,1.25));g.add(mesh(SPH(.1),m.skin,0,.12,.17,1.15,.9,.75));
  [-1,1].forEach(d=>{g.add(mesh(SPH(.014,10,8),m.dark,d*.035,.15,.245));g.add(mesh(SPH(.03),m.skinD,d*.1,.27,-.05,1,1,.6))});
  return {g,A:{eyes:[{p:[-.105,.2,.12],r:.036},{p:[.105,.2,.12],r:.036}],mouth:{p:[0,.085,.24],w:.03},cheeks:[[-.11,.12,.15],[.11,.12,.15]],hat:[0,.27,-.02],hatK:.95,top:.3,ears:[[-.15,.14,0],[.15,.14,0]],crownR:.16}}}
function headMula(m){const g=new THREE.Group(),fire=mat('#F28C1E','ember'),core=mat('#FFC24A','glow');
  g.add(mesh(SPH(.15),fire,0,.15,0,1,1.05,.95));g.add(mesh(SPH(.1),core,0,.13,.06,1.1,.9,.8));
  const fc=flameCrest(5,1.5);fc.position.set(0,.2,-.02);g.add(fc);[-1,1].forEach(d=>{const f=new THREE.Mesh(FLAME(),fire);f.position.set(d*.13,.12,-.02);f.rotation.z=-d*1.1;f.scale.setScalar(.9);g.add(f)});
  return {g,A:{eyes:[{p:[-.06,.17,.135],r:.045},{p:[.06,.17,.135],r:.045}],mouth:{p:[0,.085,.15],w:.035},cheeks:[[-.1,.11,.12],[.1,.11,.12]],hat:[0,.27,0],hatK:1,top:.44,ears:[[-.15,.12,0],[.15,.12,0]],crownR:.16,crest:true}}}
function headMico(m){const g=new THREE.Group();g.add(mesh(SPH(.13),m.belly,0,.14,.02));
  for(let i=0;i<22;i++){const a=i/22*Math.PI*2;g.add(mesh(SPH(.07,16,12),m.skin,Math.cos(a)*.15,.14+Math.sin(a)*.15,-.03))}
  g.add(mesh(SPH(.14),m.skin,0,.16,-.07));g.add(mesh(SPH(.018),m.dark,0,.11,.15));
  return {g,A:{eyes:[{p:[-.05,.17,.115],r:.036},{p:[.05,.17,.115],r:.036}],mouth:{p:[0,.07,.135],w:.025},cheeks:[[-.08,.11,.12],[.08,.11,.12]],hat:[0,.3,0],hatK:1.2,top:.36,ears:[[-.2,.13,0],[.2,.13,0]],crownR:.2}}}
function birdBase(m,face){const g=new THREE.Group();g.add(mesh(SPH(.17),m.skin,0,.16,0,1.06,1,1));g.add(mesh(SPH(1),mat(face,'skin'),0,.165,.08,.135,.115,.1));return g}
function birdA(extra){return Object.assign({eyes:[{p:[-.064,.185,.152],r:.052},{p:[.064,.185,.152],r:.052}],mouth:{p:[0,.09,.15],w:.02,hide:true},cheeks:[[-.115,.125,.135],[.115,.125,.135]],hat:[0,.3,0],hatK:1.08,top:.36,ears:[[-.17,.14,0],[.17,.14,0]],crownR:.18},extra||{})}
function birdCrest(g,cols,n,y,z){for(let i=0;i<n;i++){const x=(i-(n-1)/2)*.045,f=mesh(SPH(1),cols[i%cols.length],x,y+(i===(n-1)/2?.03:0),z,.032,.07,.03);f.rotation.z=-x*4;f.rotation.x=-.35;g.add(f)}}
function headArara(m){const g=birdBase(m,'#FFFFFF'),bk=mat('#EDE6D8','gloss'),bk2=mat('#3A3A44','gloss');
  g.add(mesh(SPH(1),bk,0,.125,.18,.05,.046,.05));g.add(new THREE.Mesh(taperTube([[0,.14,.2],[0,.125,.235],[0,.095,.235]],t=>.03*(1-t)+.008,16,10),bk));
  g.add(mesh(SPH(1),bk2,0,.093,.165,.038,.024,.038));birdCrest(g,[m.skin,m.belly],3,.31,-.03);
  return {g,A:birdA()}}
function headUirapuru(m){const g=birdBase(m,m.belly.color?'#'+m.belly.color.getHexString():'#F2C9A0'),bk=mat('#F2A33A','gloss'),bk2=mat('#E08A24','gloss');
  g.add(mesh(SPH(1),bk,0,.128,.178,.04,.03,.055));g.add(mesh(SPH(1),bk2,0,.103,.168,.032,.018,.042));birdCrest(g,[m.skin],2,.31,-.04);
  return {g,A:birdA()}}
function headTucano(m){const g=birdBase(m,'#FFFFFF'),or=mat('#F5871F','gloss'),or2=mat('#E0701A','gloss'),blu=mat('#5FB8F5','skin');
  [-1,1].forEach(d=>g.add(mesh(SPH(.064),blu,d*.064,.185,.128,1,1,.4)));
  const up=new THREE.Mesh(taperTube([[0,.15,.13],[0,.153,.22],[0,.14,.3],[0,.115,.345]],t=>.06*(1-t*.35),30,16),or);up.scale.x=.9;g.add(up);
  const lo=new THREE.Mesh(taperTube([[0,.1,.13],[0,.098,.21],[0,.103,.28]],t=>.038*(1-t*.4),24,12),or2);lo.scale.x=.85;g.add(lo);
  g.add(mesh(SPH(1),mat('#C2410C','gloss'),0,.117,.345,.034,.036,.018));g.add(mesh(SPH(1),mat('#FFD34D','gloss'),0,.19,.23,.028,.012,.065));
  return {g,A:birdA()}}
const HEADS={uirapuru:headUirapuru,humano:headHumano,jacare:headJacare,boto:headBoto,boi:headBoi,mapinguari:headMapinguari,lobo:headLobo,tamandua:headTamandua,cobra:headCobra,coruja:headCoruja,arara:headArara,felino:headFelino,capivara:headCapivara,mula:headMula,tucano:headTucano,mico:headMico};

/* ---- olhos, boca, rosto ---- */
const lerp=(a,b,t)=>a+(b-a)*t;
function eyeGroup(r,o,low,look,star,lid,iris){const g=new THREE.Group();
  g.add(new THREE.Mesh(SPH(r),mat('#FFFFFF','eye')));
  const Y=MODE.sy||STY.vinil;if(Y.button){g.children[0].material=mat('#17141C','gloss')}
  const ir=new THREE.Group();
  if(star){const st=new THREE.Mesh(starGeo(),mat('#F6B12B','glow'));st.scale.setScalar(r/.05*.9);st.position.z=r*.8;ir.add(st)}
  else if(Y.button){ir.add(mesh(SPH(1),mat('#FFFFFF','glow'),r*.3,r*.32,r*.88,r*.18,r*.18,r*.05))}
  else{const T=!!Y.hl2,ki=Y.iris||.62,kp=Y.pupil||.34;ir.add(mesh(SPH(1),mat(iris,'eye'),0,0,r*.66,r*ki,r*ki,r*.36));ir.add(mesh(SPH(1),mat(shade(iris,-.18),'eye'),0,0,r*.72,r*ki*.82,r*ki*.82,r*.34));ir.add(mesh(SPH(1),mat('#0B0B10','eye'),0,0,r*.8,r*kp,r*kp,r*.2));ir.add(mesh(SPH(1),mat('#FFFFFF','glow'),r*.26,r*.28,r*.92,r*(T?.17:.12),r*(T?.17:.12),r*.05));if(T)ir.add(mesh(SPH(1),mat('#FFFFFF','glow'),-r*.2,-r*.22,r*.92,r*.07,r*.07,r*.03))}
  ir.rotation.y=(look?look[0]:0)*.45;ir.rotation.x=-(look?look[1]:0)*.45;g.add(ir);
  const up=new THREE.Mesh(HEMI_UP(),lid);up.scale.setScalar(r*1.08);up.rotation.x=lerp(1.57,-1.05,o);g.add(up);
  const lo=new THREE.Mesh(HEMI_LO(),lid);lo.scale.setScalar(r*1.06);lo.rotation.x=lerp(1.25,.5,low||0);g.add(lo);
  return g}
function mouthGroup(type,w){const g=new THREE.Group(),dk=mat('#3A1426','flat');
  if(type==='smile'||type==='frown'||type==='side'){const arc=Math.PI*.7,t=new THREE.Mesh(new THREE.TorusGeometry(w,w*.15,10,28,arc),dk);
    if(type==='frown'){t.rotation.z=Math.PI/2-arc/2;t.position.y=-w*.75}else{t.rotation.z=-Math.PI/2-arc/2;t.position.y=w*.75}
    if(type==='side'){t.scale.setScalar(.65);t.rotation.z+=.45;t.position.x=w*.25}g.add(t)}
  if(type==='open'){const d=new THREE.Mesh(new THREE.CircleGeometry(w,28,Math.PI,Math.PI),dk);d.position.y=w*.25;g.add(d);
    g.add(mesh(SPH(1),mat('#F07A8A','eye'),0,-w*.32,.003,w*.45,w*.22,.008));
    const rim=new THREE.Mesh(new THREE.TorusGeometry(w,w*.1,8,28,Math.PI),dk);rim.rotation.z=Math.PI;rim.position.y=w*.25;g.add(rim)}
  if(type==='o'){g.add(new THREE.Mesh(new THREE.CircleGeometry(w*.42,24),dk));g.add(new THREE.Mesh(new THREE.TorusGeometry(w*.42,w*.09,8,24),dk))}
  return g}
function oculosG(f){let g=f.getObjectByName('OCULOS');if(!g){g=new THREE.Group();g.name='OCULOS';f.add(g)}return g}
function addFace(faceG,A,s,m,irisCol,ck=1){const E=EXPR[s.expr]||EXPR.feliz;
  const browM=A.browCol?mat(A.browCol,'skin'):m.skinD;
  A.eyes.forEach((e,i)=>{const side=A.eyes.length===1?0:(e.p[0]<0?-1:1),o=E.o[i]!==undefined?E.o[i]:E.o[0];
    const eg=eyeGroup(e.r,o,E.low,E.look,E.star,m.lid,irisCol);eg.position.set(...e.p);eg.scale.setScalar((E.sc||1)*ck);eg.scale.y*=(MODE.sy&&MODE.sy.eyeY)||1;
    if(s.lashes&&A.eyes.length===2)for(let k=0;k<3;k++){const ls=capsule(e.r*.07*ck,e.r*.32*ck,m.dark);ls.position.set(e.p[0]+side*e.r*ck*(.62+k*.2),e.p[1]+e.r*ck*(.9-k*.28),e.p[2]+e.r*.25);ls.rotation.z=-side*(.5+k*.45);faceG.add(ls)}faceG.add(eg);
    const bw=capsule(e.r*.17*ck*((MODE.sy&&MODE.sy.brow)||1),e.r*ck*(A.eyes.length===1?1.6:1.05),browM);
    const lift=(E.by||0)+(side>0?(E.byL||0):0);
    bw.rotation.z=Math.PI/2+(side||0)*(E.brow||0);bw.position.set(e.p[0],e.p[1]+e.r*ck*(1.45+lift),e.p[2]+e.r*.25);faceG.add(bw);
    if(s.glasses){const gr=new THREE.Mesh(new THREE.TorusGeometry(e.r*1.45*ck,.008,10,40),mat('#1E2A24','gloss'));gr.position.set(e.p[0],e.p[1],e.p[2]+e.r*.55);oculosG(faceG).add(gr)}});
  if(s.glasses&&A.eyes.length===2){const [a,b]=A.eyes,br=new THREE.Mesh(new THREE.CylinderGeometry(.006,.006,Math.max(.01,Math.abs(b.p[0]-a.p[0])-a.r*2.9*ck),8),mat('#1E2A24','gloss'));br.rotation.z=Math.PI/2;br.position.set(0,a.p[1]+.005,a.p[2]+a.r*.6);oculosG(faceG).add(br)}
  if(s.blush&&E.blush)A.cheeks.forEach(c=>faceG.add(mesh(SPH(1),mat('#F2647E','blush'),c[0],c[1],c[2],.03,.018,.012)));
  return mouthGroup(E.mouth,(A.mouth.w)*(E.mw||1)*((MODE.sy&&MODE.sy.mouth)||1))}

/* ---- mãos, pés ---- */
function handMesh(type,r,m){const g=new THREE.Group();
  if(type==='hand'){g.add(mesh(SPH(1),m.skin,0,-r*.6,0,r*1.45,r*1.7,r*1.15));g.add(mesh(SPH(1),m.skin,0,-r*.2,r*.9,r*.55,r*.7,r*.55))}
  else if(type==='mitten')g.add(mesh(SPH(1),m.skin,0,-r*.7,0,r*1.6,r*1.7,r*1.4));
  else{const k=type==='paw'?1.5:1.35;g.add(mesh(SPH(1),m.skin,0,-r*.6,0,r*k,r*k*1.1,r*k*.95));
    [-1,0,1].forEach(i=>{const c=mesh(TOOTH(),m.white,i*r*.55,-r*(1.5+k*.45),r*.35);c.rotation.x=Math.PI;c.scale.setScalar(r/.03);g.add(c)})}
  return g}
function footMesh(type,r,m,shoe){const g=new THREE.Group();
  if(type==='shoe'){g.add(mesh(SPH(1),shoe||m.skin,0,-.02,r*.62,r*1.38,.062,r*2.15));if(shoe)g.add(mesh(new THREE.CylinderGeometry(1,1,1,28),mat('#EFE8DC','skin'),0,-.066,r*.62,r*1.4,.016,r*2.18))}
  else if(type==='back')g.add(mesh(SPH(1),m.skin,0,-.03,-r*.8,r*1.2,.045,r*2.0));
  else if(type==='hoof')g.add(mesh(new THREE.CylinderGeometry(r*1.15,r*1.3,.075,24),mat('#1E1614','gloss'),0,-.037,0));
  else{const k=type==='paw'?1.25:1.05;g.add(mesh(SPH(1),m.skin,0,-.03,r*.6,r*1.3*k,.045,r*2.1*k));
    [-1,0,1].forEach(i=>{const c=mesh(TOOTH(),m.white,i*r*.55*k,-.04,r*2.6*k);c.rotation.x=Math.PI/2;c.scale.setScalar(Math.max(1,r/.05));g.add(c)})}
  return g}

/* ---- chapéus ---- */
const HATS=[['nenhum','Sem chapéu','Cabeça livre'],['capelo','Capelo','Formatura, Harvard e MIT'],['panama','Panamá branco','Assinatura do Boto'],['bone','Boné do time','Gincana'],['fitas','Chapéu de fitas','Brincante de festa'],['gorro','Gorro vermelho','Assinatura do Saci'],['tiara','Tiara de concha','Iara de gala'],['palha','Chapéu de palha','São João'],['cangaceiro','Chapéu de cangaço','Sertão'],['turbante','Turbante','Bahia'],['gaucho','Chapéu do pampa','Rio Grande do Sul'],['couro','Chapéu de gibão','Vaquejada'],['coroa','Coroa de maracatu','Realeza'],['flores','Coroa de flores','Carnaval'],['laranja','Laranja na cabeça','Capivara raiz'],['bonetras','Boné para trás','Estilo de rua'],['viseira','Viseira','Esporte e sol'],['touca','Touca de pompom','Inverno de Boston'],['bandana','Bandana','Faixa na testa'],['fones','Fones de ouvido','Clima de DJ'],['cartola','Cartola','Mestre de cerimônias'],['festa','Chapéu de festa','Aniversário da BC']];
function makeHat(type,T){const g=new THREE.Group();
  if(type==='capelo'){const dg=mat('#024A2C','fabric'),y=mat(BC.yellow,'fabric');g.add(mesh(new THREE.CylinderGeometry(.13,.145,.08,32),dg,0,.0,0));const b=mesh(new THREE.BoxGeometry(.34,.022,.34),dg,0,.05,0);b.rotation.y=Math.PI/4;g.add(b);
    g.add(mesh(SPH(.018),mat(BC.yellow,'gold'),0,.066,0));const cd=mesh(new THREE.CylinderGeometry(.005,.005,.24,6),y,.12,.064,0);cd.rotation.z=Math.PI/2;g.add(cd);g.add(mesh(new THREE.CylinderGeometry(.005,.005,.14,6),y,.24,-.005,0));g.add(mesh(new THREE.ConeGeometry(.018,.05,10),y,.24,-.09,0))}
  if(type==='panama'){const L=mat('#F4EFE3','fabric');g.add(mesh(new THREE.CylinderGeometry(.27,.27,.012,48),L,0,-.02,0));g.add(mesh(new THREE.CylinderGeometry(.115,.135,.13,40),L,0,.045,0));g.add(mesh(new THREE.CylinderGeometry(.137,.137,.035,40),mat(T.main,'fabric'),0,.005,0));g.rotation.set(-.05,0,.08)}
  if(type==='bone'||type==='bonetras'){const c=mat(T.main,'fabric');const d=new THREE.Mesh(new THREE.SphereGeometry(.172,32,16,0,Math.PI*2,0,Math.PI/2),c);d.scale.y=.75;d.position.y=-.06;g.add(d);g.add(mesh(SPH(1),c,0,-.06,.17,.12,.012,.1));g.add(mesh(SPH(.018),mat(T.acc,'fabric'),0,.07,0));
    if(type==='bonetras'){g.rotation.y=Math.PI;const ab=new THREE.Mesh(new THREE.TorusGeometry(.04,.008,8,20,Math.PI),mat(T.acc,'fabric'));ab.position.set(0,-.075,-.168);g.add(ab)}}
  if(type==='viseira'){const c=mat(BC.green,'fabric');const b=new THREE.Mesh(new THREE.TorusGeometry(.168,.022,10,48),c);b.rotation.x=Math.PI/2;b.position.y=-.05;b.scale.y=1;g.add(b);g.add(mesh(SPH(1),mat(BC.yellow,'fabric'),0,-.055,.19,.13,.012,.1))}
  if(type==='touca'){const c=mat(BC.green,'fabric'),d=new THREE.Mesh(new THREE.SphereGeometry(.178,32,16,0,Math.PI*2,0,Math.PI/2),c);d.position.y=-.07;d.scale.y=.95;g.add(d);
    const fd=new THREE.Mesh(new THREE.TorusGeometry(.172,.035,12,48),mat(BC.yellow,'fabric'));fd.rotation.x=Math.PI/2;fd.position.y=-.06;g.add(fd);g.add(mesh(SPH(.055),mat(BC.yellow,'fur'),0,.12,0))}
  if(type==='bandana'){const r=mat('#C8202F','fabric'),b=new THREE.Mesh(new THREE.TorusGeometry(.168,.03,10,48),r);b.rotation.x=Math.PI/2;b.position.y=-.06;g.add(b);
    [-1,1].forEach(d=>{const t=mesh(SPH(1),r,d*.035,-.09,-.18,.03,.07,.012);t.rotation.z=d*.5;g.add(t)});g.add(mesh(SPH(.028),r,0,-.06,-.175))}
  if(type==='fones'){const bk=mat('#20242A','gloss'),bd=new THREE.Mesh(new THREE.TorusGeometry(.185,.014,10,40,Math.PI),bk);bd.position.y=-.1;g.add(bd);
    [-1,1].forEach(d=>{const cp=mesh(new THREE.CylinderGeometry(.06,.06,.04,28),mat(BC.bright,'gloss'),d*.19,-.11,0);cp.rotation.z=Math.PI/2;g.add(cp);const pd=mesh(new THREE.CylinderGeometry(.048,.048,.02,24),bk,d*.165,-.11,0);pd.rotation.z=Math.PI/2;g.add(pd)})}
  if(type==='cartola'){const bk=mat('#121211','fabric');g.add(mesh(new THREE.CylinderGeometry(.24,.24,.014,48),bk,0,-.02,0));g.add(mesh(new THREE.CylinderGeometry(.13,.12,.26,36),bk,0,.11,0));g.add(mesh(new THREE.CylinderGeometry(.122,.122,.04,36),mat(BC.green,'fabric'),0,.01,0));g.rotation.set(-.04,0,.06)}
  if(type==='festa'){const c=mesh(new THREE.ConeGeometry(.095,.28,28),mat(BC.bright,'gloss'),0,.1,0);g.add(c);[.03,.1,.17].forEach((y,i)=>{const r=.095*(1-(y+.04)/.28)+.004,t=new THREE.Mesh(new THREE.TorusGeometry(r,.009,8,32),mat(i%2?BC.blue:BC.yellow,'gloss'));t.rotation.x=Math.PI/2;t.position.y=y;g.add(t)});g.add(mesh(SPH(.035),mat(BC.yellow,'fur'),0,.25,0));g.rotation.z=-.15}
  if(type==='fitas'){g.add(mesh(new THREE.CylinderGeometry(.155,.17,.13,40,1,true),mat(BC.yellow,'velvet'),0,.04,0));{const tp=mesh(new THREE.CircleGeometry(.155,32),mat(BC.yellow,'velvet'),0,.105,0);tp.rotation.x=-Math.PI/2;g.add(tp)}
    const br=new THREE.Mesh(new THREE.TorusGeometry(.18,.016,10,48),mat(BC.green,'velvet'));br.rotation.x=Math.PI/2;br.position.y=-.02;g.add(br);
    for(let i=0;i<8;i++){const a=i/8*Math.PI*2,mr=mesh(new THREE.CircleGeometry(.02,16),mat('#E8EEF2','gold'),Math.sin(a)*.165,.045,Math.cos(a)*.165);mr.rotation.y=a;g.add(mr)}
    const cs=[BC.green,BC.bright,BC.blue,BC.yellow,'#FFFFFF',T.main];for(let i=0;i<14;i++){const a=(60+i*(240/13))*Math.PI/180,rb=mesh(new THREE.BoxGeometry(.026,.28,.004),mat(cs[i%cs.length],'fabric'),Math.sin(a)*.19,-.16,Math.cos(a)*.19);rb.rotation.y=a;g.add(rb)}}
  if(type==='gorro'){const r=mat('#C8202F','fabric');const t=new THREE.Mesh(new THREE.TorusGeometry(.15,.03,12,40),r);t.rotation.x=Math.PI/2;t.position.y=-.03;g.add(t);
    const c=mesh(new THREE.CylinderGeometry(.03,.155,.24,32),r,0,.08,-.04);c.rotation.x=-.4;g.add(c);g.add(mesh(SPH(.04),r,0,.18,-.13))}
  if(type==='palha'){const st=mat('#D9B65C','fabric');g.add(mesh(new THREE.CylinderGeometry(.28,.28,.014,48),st,0,-.02,0));g.add(mesh(new THREE.CylinderGeometry(.1,.13,.11,32),st,0,.04,0));g.add(mesh(new THREE.CylinderGeometry(.132,.132,.03,32),mat('#C8202F','fabric'),0,0,0));for(let i=0;i<24;i++){const a=i/24*Math.PI*2,f=mesh(new THREE.BoxGeometry(.012,.004,.03),st,Math.sin(a)*.29,-.022,Math.cos(a)*.29);f.rotation.y=a;g.add(f)}g.rotation.set(-.08,0,-.1)}
  if(type==='cangaceiro'){const lt=mat('#7A4A2A','skin'),gd=mat('#E3AC40','gold');const cr=new THREE.Mesh(new THREE.SphereGeometry(.15,32,16,0,Math.PI*2,0,Math.PI/2),lt);cr.position.y=-.03;cr.scale.y=.9;g.add(cr);
    const fb=new THREE.Mesh(new THREE.CylinderGeometry(.27,.27,.016,40,1,false,-Math.PI/2,Math.PI),lt);fb.rotation.x=-1.25;fb.position.set(0,.02,.04);g.add(fb);
    const bb=new THREE.Mesh(new THREE.CylinderGeometry(.24,.24,.014,40,1,false,Math.PI/2,Math.PI),lt);bb.position.y=-.03;g.add(bb);
    [-1,0,1].forEach(i=>{const s=new THREE.Mesh(starGeo(),gd);s.position.set(i*.09,.12-Math.abs(i)*.03,.1);s.rotation.x=-.3;s.scale.setScalar(i?.7:1);g.add(s)})}
  if(type==='turbante'){const wt=mat('#FFFFFF','fabric');for(let i=0;i<3;i++){const t=new THREE.Mesh(new THREE.TorusGeometry(.14-i*.025,.05,12,40),i===1?mat(BC.yellow,'fabric'):wt);t.rotation.x=Math.PI/2+(i-1)*.25;t.position.y=-.02+i*.05;g.add(t)}g.add(mesh(SPH(.12),wt,0,.08,0,1,.75,1));g.add(mesh(SPH(.05),mat(BC.yellow,'fabric'),.05,.14,.08))}
  if(type==='gaucho'){const bk=mat('#1E1A1A','fabric');g.add(mesh(new THREE.CylinderGeometry(.26,.26,.012,48),bk,0,-.02,0));g.add(mesh(new THREE.CylinderGeometry(.125,.13,.09,32),bk,0,.025,0));g.add(mesh(new THREE.CylinderGeometry(.132,.132,.022,32),mat('#7A4A2A','skin'),0,-.005,0))}
  if(type==='coroa'){const gd=mat('#E3AC40','gold');g.add(mesh(new THREE.CylinderGeometry(.14,.14,.07,32,1,true),gd,0,0,0));for(let i=0;i<8;i++){const a=i/8*Math.PI*2;g.add(mesh(new THREE.ConeGeometry(.025,.07,8),gd,Math.sin(a)*.14,.07,Math.cos(a)*.14));g.add(mesh(SPH(.016,10,8),mat([BC.bright,'#C8202F',BC.blue][i%3],'gloss'),Math.sin(a)*.145,0,Math.cos(a)*.145))}}
  if(type==='laranja'){g.add(mesh(SPH(.085),mat('#F28C1E','skin'),0,.05,0));const lf=mesh(SPH(1),mat('#2E7D46','skin'),.03,.135,0,.035,.008,.016);lf.rotation.z=.4;g.add(lf);g.add(mesh(new THREE.CylinderGeometry(.006,.006,.03,6),mat('#5A3A20','skin'),0,.14,0))}
  if(type==='flores'){const cs=['#EE8FAE',BC.yellow,'#E2572A','#FFFFFF',BC.bright];for(let i=0;i<10;i++){const a=i/10*Math.PI*2,fg=new THREE.Group();fg.position.set(Math.sin(a)*.16,-.03,Math.cos(a)*.16);fg.rotation.y=a;for(let k=0;k<5;k++){const b=k/5*Math.PI*2;fg.add(mesh(SPH(.022,10,8),mat(cs[i%cs.length],'skin'),Math.cos(b)*.025,Math.sin(b)*.025,.01))}fg.add(mesh(SPH(.016,10,8),mat(BC.yellow,'skin'),0,0,.02));g.add(fg)}}
  if(type==='couro'){const lt=mat('#8A5A32','skin'),cr=new THREE.Mesh(new THREE.SphereGeometry(.15,32,16,0,Math.PI*2,0,Math.PI/2),lt);cr.position.y=-.03;cr.scale.y=.95;g.add(cr);g.add(mesh(new THREE.CylinderGeometry(.25,.25,.014,40),lt,0,-.03,0));const fb=new THREE.Mesh(new THREE.CylinderGeometry(.25,.25,.014,40,1,false,-Math.PI/2,Math.PI),lt);fb.rotation.x=-1.0;fb.position.set(0,0,.03);g.add(fb);const st=new THREE.Mesh(new THREE.TorusGeometry(.152,.012,8,40),mat('#5A3A20','skin'));st.rotation.x=Math.PI/2;st.position.y=-.02;g.add(st)}
  if(type==='tiara'){const gd=mat('#E3AC40','gold'),t=new THREE.Mesh(new THREE.TorusGeometry(.15,.012,10,40,Math.PI),gd);t.rotation.x=-.45;t.position.y=-.06;g.add(t);
    g.add(mesh(SPH(1),mat('#F7E7EA','gloss'),0,.05,.06,.05,.045,.02));for(let i=0;i<7;i++){const a=.3+i*.42;g.add(mesh(SPH(.013,12,8),mat('#FFFDF7','gloss'),Math.cos(a)*.15,-.06+Math.sin(a)*.15*Math.cos(.45),Math.sin(a)*.15*Math.sin(.45)))}}
  return g}

/* ---- acessórios de time e objetos ---- */
function flameCrest(n=3,k=1){const g=new THREE.Group();for(let i=0;i<n;i++){const d=i-(n-1)/2,f=new THREE.Mesh(FLAME(),mat(i%2?'#F6B12B':'#E2572A','glow'));f.position.set(d*.055*k,0,0);f.rotation.z=-d*.3;f.scale.setScalar(k*(i%2?1.15:.9));g.add(f)}return g}
function leafCrown(r0){const g=new THREE.Group();for(let i=0;i<12;i++){const a=i/12*Math.PI*2,p=new THREE.Group();p.rotation.y=a;const l=mesh(SPH(1),mat(i%2?'#7DB063':'#2E7D46','skin'),0,0,r0,.03,.07,.012);l.rotation.x=.45;p.add(l);g.add(p)}return g}
function makeProp(type,T){const g=new THREE.Group();
  if(type==='livro'){const b=mesh(new THREE.BoxGeometry(.15,.2,.045),mat(BC.green,'fabric'),0,.04,.07);b.rotation.y=.4;g.add(b);const sp=mesh(new THREE.BoxGeometry(.02,.2,.05),mat(BC.yellow,'fabric'),-.07,.04,.04);sp.rotation.y=.4;g.add(sp)}
  if(type==='bandeira'){g.add(mesh(new THREE.CylinderGeometry(.009,.009,.75,10),mat('#8A5A32','skin'),0,.3,0));const ft=flagTex();const f=mesh(new THREE.PlaneGeometry(.34,.21),ft?new THREE.MeshStandardMaterial({map:ft,side:THREE.DoubleSide,roughness:.8}):mat(BC.green,'flat'),.17,.56,0);g.add(f)}
  if(type==='trofeu'){const gd=mat('#E3AC40','gold');g.add(mesh(new THREE.LatheGeometry([[0,0],[.05,0],[.05,.015],[.014,.03],[.014,.07],[.06,.11],[.07,.2],[.065,.2],[.054,.12],[0,.11]].map(p=>new THREE.Vector2(p[0],p[1])),32),gd,0,.0,.08));[-1,1].forEach(d=>{const h=new THREE.Mesh(new THREE.TorusGeometry(.035,.008,8,20,Math.PI),gd);h.position.set(d*.07,.16,.08);h.rotation.z=-d*Math.PI/2;g.add(h)})}
  if(type==='sombrinha'){g.add(mesh(new THREE.CylinderGeometry(.007,.007,.5,8),mat('#20242A','gloss'),0,.18,0));const cs=[BC.yellow,'#C8202F',BC.blue,'#2EA44F'];for(let i=0;i<8;i++)g.add(mesh(new THREE.ConeGeometry(.24,.1,2,1,true,i*Math.PI/4,Math.PI/4),mat(cs[i%4],'flat'),0,.47,0))}
  if(type==='berimbau'){g.add(new THREE.Mesh(taperTube([[0,-.25,.05],[.07,.25,.05],[0,.8,.05]],()=>.008,24,6),mat('#8A5A32','skin')));g.add(mesh(new THREE.CylinderGeometry(.0015,.0015,1.05,4),mat('#CCCCCC','gold'),0,.275,.05));g.add(mesh(SPH(.07),mat('#B07A3E','skin'),.03,-.1,.06,1,1.1,1))}
  if(type==='pandeiro'){const p=new THREE.Group();p.add(mesh(new THREE.CylinderGeometry(.11,.11,.04,32,1,true),mat('#8A5A32','skin')));const mb=mesh(new THREE.CircleGeometry(.11,32),mat('#F2E6CC','flat'),0,.02,0);mb.rotation.x=-Math.PI/2;p.add(mb);for(let i=0;i<5;i++){const a=i/5*Math.PI*2;p.add(mesh(new THREE.CylinderGeometry(.016,.016,.006,12),mat('#E3AC40','gold'),Math.sin(a)*.112,0,Math.cos(a)*.112))}p.rotation.x=Math.PI/2;p.position.set(0,.08,.08);g.add(p)}
  if(type==='cuia'){g.add(mesh(SPH(.06),mat('#6B4A2A','skin'),0,.06,.06,1,1.15,1));g.add(mesh(new THREE.CylinderGeometry(.045,.04,.02,24),mat('#C9A15A','gold'),0,.13,.06));const b=mesh(new THREE.CylinderGeometry(.004,.004,.16,8),mat('#D9D9D9','gold'),.02,.17,.06);b.rotation.z=-.3;g.add(b)}
  if(type==='bola'){g.add(mesh(SPH(.11),mat('#FFFFFF','gloss'),0,.04,.12));[[0,1,0],[.9,.3,.3],[-.9,.3,.3],[0,.2,1],[.5,-.6,.6],[-.5,-.6,.6]].forEach(d=>{const v=new THREE.Vector3(...d).normalize(),s=mesh(SPH(1),mat('#1A1A1A','gloss'),v.x*.108,.04+v.y*.108,.12+v.z*.108,.032,.032,.008);s.lookAt(v.x*2,.04+v.y*2,.12+v.z*2);g.add(s)})}
  if(type==='bandeirinhas'){const cs=[BC.yellow,'#C8202F',BC.blue,BC.bright,'#E2572A','#EE8FAE',BC.green],st=new THREE.Mesh(taperTube([[0,.05,.04],[.25,-.06,.06],[.5,0,.08]],()=>.004,24,6),mat('#F4EFE3','fabric'));g.add(st);const sh=new THREE.Shape();sh.moveTo(-.03,0);sh.lineTo(.03,0);sh.lineTo(0,-.06);sh.closePath();const geo=new THREE.ShapeGeometry(sh);cs.forEach((c,i)=>{const p=st.geometry.userData.curve.getPointAt((i+.5)/cs.length);g.add(mesh(geo,mat(c,'flat'),p.x,p.y,p.z))})}
  if(type==='maraca'){g.add(mesh(new THREE.CylinderGeometry(.012,.012,.12,10),mat('#8A5A32','skin'),0,.04,.05));g.add(mesh(SPH(.055),mat('#E2572A','gloss'),0,.14,.05,1,1.15,1));g.add(mesh(new THREE.TorusGeometry(.055,.006,6,24),mat(BC.yellow,'fabric'),0,.14,.05))}
  if(type==='viola'){const wd=mat('#B5743A','gloss'),bd=new THREE.Group();bd.add(mesh(SPH(1),wd,0,0,0,.11,.13,.04));bd.add(mesh(SPH(1),wd,0,.13,0,.085,.09,.04));const hole=mesh(new THREE.CylinderGeometry(.025,.025,.006,20),mat('#2A1A10','flat'),0,.06,.041);hole.rotation.x=Math.PI/2;bd.add(hole);bd.add(mesh(new THREE.BoxGeometry(.03,.32,.02),mat('#5A3A20','skin'),0,.36,0));bd.add(mesh(new THREE.BoxGeometry(.05,.07,.02),mat('#5A3A20','skin'),0,.55,0));bd.rotation.z=-.6;bd.position.set(.02,.05,.1);g.add(bd)}
  if(type==='estandarte'){g.add(mesh(new THREE.CylinderGeometry(.009,.009,.9,10),mat('#E3AC40','gold'),0,.35,0));g.add(mesh(new THREE.PlaneGeometry(.26,.34),mat('#B5122B','velvet'),0,.6,.01));const st=new THREE.Mesh(starGeo(),mat(BC.yellow,'gold'));st.position.set(0,.62,.02);st.scale.setScalar(1.3);g.add(st);g.add(mesh(new THREE.BoxGeometry(.28,.02,.01),mat('#E3AC40','gold'),0,.43,.012))}
  if(type==='remo'){g.add(mesh(new THREE.CylinderGeometry(.01,.01,.8,10),mat('#B5743A','skin'),0,.2,0));g.add(mesh(SPH(1),mat('#B5743A','skin'),0,-.24,0,.05,.13,.012))}
  if(type==='bilro'){const pl=mesh(new THREE.CylinderGeometry(.09,.09,.2,24),mat('#F4EFE3','fabric'),0,.04,.09);pl.rotation.z=Math.PI/2;g.add(pl);for(let i=0;i<6;i++)g.add(mesh(new THREE.CylinderGeometry(.006,.004,.08,6),mat('#B5743A','skin'),-.06+i*.024,-.04,.17))}
  if(type==='celular'){const c=new THREE.Group();c.add(mesh(new THREE.BoxGeometry(.075,.15,.012),mat('#121211','gloss')));c.add(mesh(new THREE.BoxGeometry(.064,.13,.002),mat(BC.bright,'glow'),0,0,.0065));c.position.set(0,.08,.06);c.rotation.set(-.2,.35,0);g.add(c)}
  if(type==='megafone'){const mg=new THREE.Group(),y=mat(BC.yellow,'gloss'),c=mesh(new THREE.CylinderGeometry(.03,.085,.22,28),y,0,.1,.13);c.rotation.x=Math.PI/2;mg.add(c);const r=new THREE.Mesh(new THREE.TorusGeometry(.085,.01,8,32),mat('#0B5E37','gloss'));r.position.set(0,.1,.24);mg.add(r);mg.add(mesh(new THREE.BoxGeometry(.03,.09,.04),mat('#121211','gloss'),0,.03,.06));mg.rotation.y=-1.1;g.add(mg)}
  if(type==='balao'){[[BC.bright,-.12,.5],[BC.yellow,.02,.6],['#0A7BE5',.15,.48]].forEach(([c,x,y])=>{g.add(new THREE.Mesh(taperTube([[0,0,0],[x*.4,y*.5,0],[x,y-.12,0]],()=>.0018,20,4),mat('#F4EFE3','fabric')));g.add(mesh(SPH(1),mat(c,'gloss'),x,y,0,.1,.12,.1));g.add(mesh(new THREE.ConeGeometry(.014,.025,10),mat(c,'gloss'),x,y-.125,0))})}
  if(type==='sorvete'){const k=mesh(new THREE.ConeGeometry(.042,.14,20),mat('#D9A45C','skin'),0,.05,.06);k.rotation.x=Math.PI;g.add(k);g.add(mesh(SPH(.048),mat('#EE8FAE','skin'),0,.14,.06));g.add(mesh(SPH(.042),mat('#6B4128','skin'),0,.205,.06));g.add(mesh(SPH(.012),mat('#C8202F','gloss'),0,.25,.06))}
  if(type==='coco'){g.add(mesh(SPH(.085),mat('#5E9E3A','skin'),0,.08,.07,1,1.08,1));g.add(mesh(new THREE.CylinderGeometry(.03,.03,.005,20),mat('#F4EFE3','skin'),0,.17,.07));const s=mesh(new THREE.CylinderGeometry(.005,.005,.16,8),mat(BC.bright,'gloss'),.03,.22,.07);s.rotation.z=-.35;g.add(s);g.add(mesh(new THREE.ConeGeometry(.05,.025,16),mat(BC.yellow,'flat'),.06,.3,.07))}
  if(type==='caneca'){const c=mat('#0B5E37','gloss');g.add(mesh(new THREE.CylinderGeometry(.045,.04,.1,28),c,0,.06,.07));g.add(mesh(new THREE.CylinderGeometry(.04,.04,.004,24),mat('#4A2A16','skin'),0,.11,.07));const h=new THREE.Mesh(new THREE.TorusGeometry(.028,.008,8,20),c);h.position.set(.05,.06,.07);g.add(h);const b=mesh(new THREE.CylinderGeometry(.0455,.0455,.018,28,1,true),mat(BC.yellow,'gloss'),0,.065,.07);g.add(b)}
  if(type==='placa'){g.add(mesh(new THREE.CylinderGeometry(.008,.008,.55,10),mat('#B5743A','skin'),0,.22,0));const tx=canvasTex('placa',512,320,(x,w,h)=>{x.fillStyle='#0B5E37';x.fillRect(0,0,w,h);x.fillStyle='#FBF99D';x.textAlign='center';x.textBaseline='middle';x.font='800 92px '+FONT;x.fillText('BORA',w/2,h*.33);x.fillText('BC27!',w/2,h*.7)});
    g.add(mesh(new THREE.BoxGeometry(.34,.22,.012),mat('#0B5E37','fabric'),0,.56,-.004));g.add(mesh(new THREE.PlaneGeometry(.33,.21),tx?new THREE.MeshStandardMaterial({map:tx,roughness:.8}):mat('#0B5E37','flat'),0,.56,.0025))}
  if(type==='pipa'){g.add(new THREE.Mesh(taperTube([[0,0,0],[.1,.22,-.02],[.2,.44,-.06]],()=>.0015,24,4),mat('#F4EFE3','fabric')));const k=new THREE.Group();k.position.set(.22,.58,-.06);k.scale.setScalar(.8);k.rotation.z=-.3;
    [[0,.16,.12,0,BC.yellow],[0,.16,-.12,0,'#0A7BE5'],[0,-.2,.12,0,'#0A7BE5'],[0,-.2,-.12,0,BC.yellow]].forEach(([ax,ay,bx,by,c])=>{const sh=new THREE.Shape();sh.moveTo(0,0);sh.lineTo(ax,ay);sh.lineTo(bx,by);sh.closePath();k.add(new THREE.Mesh(new THREE.ShapeGeometry(sh),mat(c,'flat')))});
    k.add(new THREE.Mesh(taperTube([[0,-.2,0],[.05,-.3,0],[-.03,-.4,0],[.02,-.5,0]],()=>.002,24,4),mat('#F4EFE3','fabric')));[-.3,-.4,-.5].forEach((y,i)=>k.add(mesh(new THREE.BoxGeometry(.04,.018,.004),mat(i%2?BC.bright:'#C8202F','flat'),i%2?-.02:.03,y,0)));g.add(k)}
  if(type==='pirulito'){g.add(mesh(new THREE.CylinderGeometry(.004,.004,.2,8),mat('#FFFFFF','gloss'),0,.08,.06));const d=mesh(new THREE.CylinderGeometry(.075,.075,.022,36),mat(BC.bright,'gloss'),0,.24,.06);d.rotation.x=Math.PI/2;g.add(d);[.025,.05].forEach(r=>{const t=new THREE.Mesh(new THREE.TorusGeometry(r,.008,8,32),mat('#FFFFFF','gloss'));t.position.set(0,.24,.072);g.add(t)})}
  if(type==='camera'){const c=new THREE.Group();c.add(mesh(new THREE.BoxGeometry(.15,.095,.06),mat('#121211','gloss')));const l=mesh(new THREE.CylinderGeometry(.034,.038,.06,28),mat('#3A3F48','gloss'),0,0,.055);l.rotation.x=Math.PI/2;c.add(l);c.add(mesh(new THREE.CylinderGeometry(.025,.025,.004,24),mat('#0A7BE5','gloss'),0,0,.086).rotateX(Math.PI/2));c.add(mesh(new THREE.BoxGeometry(.04,.02,.03),mat(BC.yellow,'gloss'),-.04,.055,0));c.position.set(0,.07,.08);g.add(c)}
  if(type==='acai'){const bw=new THREE.Mesh(HEMI_LO(),mat('#F4EFE3','gloss'));bw.scale.set(.09,.06,.09);bw.position.set(0,.09,.08);g.add(bw);const top=mesh(new THREE.CircleGeometry(.086,32),mat('#4B1F4F','skin'),0,.088,.08);top.rotation.x=-Math.PI/2;g.add(top);
    for(let i=0;i<7;i++){const a=i*2.4,r=.035+(i%3)*.012;g.add(mesh(new THREE.CylinderGeometry(.014,.014,.006,14),mat('#F6E3A0','skin'),Math.cos(a)*r,.092,.08+Math.sin(a)*r))}g.add(mesh(SPH(.012),mat('#C8202F','gloss'),0,.1,.08))}
  if(type==='coxinha'){const m2=mat('#D98A3A','skin');g.add(mesh(SPH(.055),m2,0,.07,.07));g.add(mesh(new THREE.ConeGeometry(.052,.09,24),m2,0,.15,.07))}
  if(type==='microfone'){const h=mesh(new THREE.CylinderGeometry(.016,.012,.16,16),mat('#20242A','gloss'),0,.06,.05);h.rotation.x=-.45;g.add(h);g.add(mesh(SPH(.036),mat('#B8BEC8','gold'),0,.14,.09))}
  return g}

/* ---- personagem completo ---- */
function build(id,s,opt={}){const SY=opt.sy||STY.vinil;const CO=s.cores||{};MODE.sy=SY;const ck=SY.eye;
  const SP=id==='zero'?zeroSP(s):(id==='fusao'&&s.base&&s.base!=='humano'&&SPECIES[s.base])?SPECIES[s.base]:SPECIES[id],B=SP.body,pal=SP.pal[s.color]||SP.pal[0],T={...TEAMS[s.team]||TEAMS.neutro,id:s.team},P=id.toUpperCase();
  const m={skin:mat(pal.skin,B.fur?'fur':SP.glow?'ember':'skin'),belly:mat(pal.belly||shade(pal.skin,.2),'skin'),dark:mat('#20141A','eye'),white:mat('#FFFDF7','gloss'),skinD:mat(shade(pal.skin,-.2),'skin')};m.lid=B.fur?mat(pal.skin,'skin'):m.skin;
  const w=s.body,h=s.height,legLen=B.legLen*h*SY.legs,L=B.torsoL*h,hipsY=legLen,O=s.outfit;
  const root=new THREE.Group();root.name=P;
  const body=new THREE.Group();body.name=P+'_corpo';root.add(body);
  const pts=torsoPts(B,w,L),fz=y=>radiusAt(pts,y)*.82;
  const torso=new THREE.Mesh(new THREE.LatheGeometry(pts,48,Math.PI,Math.PI*2),m.skin);torso.scale.z=.82;torso.position.y=hipsY;body.add(torso);
  if(SP.belly)body.add(mesh(SPH(1),m.belly,0,hipsY+L*.42,fz(L*.42)-.035,radiusAt(pts,L*.42)*.62,L*.3,.06));
  if(SP.spots){const sp=mat('#2A1D14','skin');for(let i=0;i<26;i++){const rr=((Math.sin(i*12.9898)*43758.5453)%1+1)%1,y=L*(.08+.84*rr),az=i*2.39996,r=radiusAt(pts,y)+.002,px=Math.sin(az)*r,pz=Math.cos(az)*r*.82,s2=mesh(SPH(1),sp,px,hipsY+y,pz,.026,.026,.012);s2.lookAt(px*2,hipsY+y,pz*2);body.add(s2)}}
  if(B.neck>0)body.add(mesh(new THREE.CylinderGeometry(B.shoulderR*w*.32,B.shoulderR*w*.36,B.neck*h+.06,20),m.skin,0,hipsY+L+B.neck*h/2-.02,0));

  /* cabeça (ou máscara do Brincante) */
  const mask=id==='brincante'?s.mask:'nenhuma';let H,fm=m,iris='#4A2E1E';
  const maskSp={mula:'mula',tucano:'tucano',mico:'mico',boto:'boto',jacare:'cuca',boi:'boi',mapinguari:'mapinguari',lobisomem:'lobisomem',capelobo:'capelobo',coruja:'matinta',arara:'arara',onca:'onca',capivara:'capivara',cobra:'boitata'}[mask];
  if(maskSp){const mp=SPECIES[maskSp].pal[0];fm={skin:mat(mp.skin,'skin'),belly:mat(mp.belly,'skin'),dark:m.dark,white:m.white,skinD:mat(shade(mp.skin,-.2),'skin')};fm.lid=fm.skin;H=HEADS[SPECIES[maskSp].head](fm)}
  else if(mask==='curupira')H=headHumano(m,{hair:'chama'});
  else H=HEADS[SP.head](m,{...(SP.headOpt||{}),...(s.hair?{hair:s.hair}:{})});
  if((maskSp?SPECIES[maskSp]:SP).head==='mula')fm={...fm,lid:mat('#F28C1E','ember')};
  if(id==='cuca'||maskSp==='cuca')iris='#C99A1E';if(id==='boto'||maskSp==='boto')iris='#3B2A4A';{const isp=maskSp?SPECIES[maskSp]:SP;if(isp&&isp.iris)iris=isp.iris}
  const A=H.A,hs=s.head*B.headK*SY.head;
  const headG=new THREE.Group();headG.name=P+'_cabeca'+(maskSp||mask!=='nenhuma'?'_mascara_'+mask:'');headG.position.y=hipsY+L+B.neck*h-.02;headG.scale.setScalar(hs);headG.add(H.g);root.add(headG);
  const faceG=new THREE.Group();faceG.name=P+'_rosto_'+s.expr;headG.add(faceG);
  const mouth=addFace(faceG,A,s,fm,iris,ck);
  {const og=faceG.getObjectByName('OCULOS');if(og){og.name=P+'_oculos';root.updateMatrixWorld(true);pivotWrap(og);ajApply(og,ajOf(s,'oculos'),1/hs);tint(meshesOf(og),CO.oculos)}}
  if(A.mouth.body){mouth.position.set(0,hipsY+L*A.mouth.t,fz(L*A.mouth.t)+.01);mouth.name=P+'_boca_barriga';root.add(mouth)}
  else{mouth.position.set(A.mouth.p[0],A.mouth.p[1],A.mouth.p[2]+.006);faceG.add(mouth)}if(A.mouth.hide)mouth.visible=false;

  /* braços */
  const shY=hipsY+L*.86,shX=radiusAt(pts,L*.86)*.96,aR=B.armR*w*1.22,ua=B.armLen*h*.5,fa=B.armLen*h*.44,arms={};
  [-1,1].forEach(side=>{const sh=new THREE.Group();sh.name=P+'_braco_'+(side<0?'dir':'esq');sh.position.set(side*shX,shY,0);root.add(sh);
    sh.add(mesh(SPH(aR*1.12,20,16),m.skin));const up=capsule(aR,ua,m.skin);up.position.y=-ua/2;sh.add(up);
    const el=new THREE.Group();el.position.y=-ua;sh.add(el);el.add(mesh(SPH(aR*.98,20,16),m.skin));const fo=capsule(aR*.92,fa,m.skin);fo.position.y=-fa/2;el.add(fo);
    const hd=new THREE.Group();hd.position.y=-fa-aR*.3;el.add(hd);hd.add(handMesh(B.hand,aR,m));hd.scale.setScalar(SY.hands);arms[side]={sh,el,hd}});

  /* pernas */
  const fus=id==='fusao',lit=s.lit||{};
  const legM=m.skin;
  const footY=.075,thl=(legLen-footY)*.52,shl=(legLen-footY)*.48,legs={};
  const SHOES={gincana:['#FFFFFF','gloss'],gala:B.gala==='terno-branco'?['#F4EFE3','gloss']:['#1A1414','gloss'],chita:['#7A4A2A','skin'],junino:['#7A4A2A','skin'],frevo:['#FFFFFF','gloss'],vaqueiro:['#5A3A20','skin'],rendeira:['#7A4A2A','skin'],maracatu:['#E3AC40','gold'],baiana:['#FFFFFF','gloss'],cangaceiro:['#5A3A20','skin'],gaucho:['#1A1414','gloss'],carnaval:['#E3AC40','gold'],canarinho:['#FFFFFF','gloss']};
  let shoe=null;if(B.foot==='shoe'){const sd=SHOES[O]||(O==='base'&&SP.head==='humano'&&!['curupira','saci','fusao','iara'].includes(id)?['#7A4A2A','skin']:null);shoe=sd?mat(CO.sapato||sd[0],sd[1]):null}
  const legXs=B.legs===2?[-1,1]:B.legs===1?[0]:[];
  legXs.forEach(side=>{const lr=B.legR*w*1.14*(B.legs===1?1.2:1),hp=new THREE.Group();hp.name=P+'_perna'+(side<0?'_dir':side>0?'_esq':'');hp.position.set(side*B.hipR*w*.48,hipsY,0);root.add(hp);
    const th=capsule(lr,thl,legM);th.position.y=-thl/2;hp.add(th);const kn=new THREE.Group();kn.position.y=-thl;hp.add(kn);kn.add(mesh(SPH(lr*.97,20,16),legM));
    const sn=capsule(lr*.9,shl,legM);sn.position.y=-shl/2;kn.add(sn);const ft=new THREE.Group();ft.position.y=-shl;kn.add(ft);
    ft.add(footMesh(B.foot,lr,{...m,skin:legM},shoe));ft.scale.setScalar(SY.feet);legs[side]={hp,kn,ft,lr}});

  /* caudas */
  if(B.tail==='jacare'||B.tail==='boto'){const z0=-fz(L*.15)*.8,J=B.tail==='jacare';
    const tp=J?[[0,hipsY+.02,z0],[0,hipsY*.55,z0-.12],[.02,.12,z0-.36],[.1,.06,z0-.6],[.2,.05,z0-.76]]:[[0,hipsY,z0],[0,hipsY*.55,z0-.1],[0,.14,z0-.24]];
    const ge=taperTube(tp,J?t=>B.hipR*w*.72*(1-t)+.02:t=>.1*(1-t)+.035),tl=new THREE.Mesh(ge,m.skin);tl.name=P+'_cauda';root.add(tl);
    if(J)for(let t=.08;t<.95;t+=.11){const p=ge.userData.curve.getPointAt(t),rr=B.hipR*w*.72*(1-t)+.02;root.add(mesh(new THREE.ConeGeometry(.02,.045,8),m.skinD,p.x,p.y+rr*.92,p.z))}
    else{const e=ge.userData.curve.getPointAt(1);[-1,1].forEach(d=>{const f=mesh(SPH(1),m.skin,e.x+d*.07,e.y-.02,e.z-.04,.09,.025,.05);f.rotation.y=d*.5;root.add(f)})}}
  if(B.tail==='peixe'){const tm=mat(pal.tail,'scales'),tp=[[0,hipsY+.02,0],[0,hipsY*.62,.03],[0,hipsY*.3,.06],[0,.08,.16],[0,.07,.38],[0,.12,.52]];
    const ge=taperTube(tp,t=>B.hipR*w*1.02*(1-t*.88)+.012),tl=new THREE.Mesh(ge,tm);tl.name=P+'_cauda';root.add(tl);
    const e=ge.userData.curve.getPointAt(1);[-1,1].forEach(d=>{const f=mesh(SPH(1),mat(shade(pal.tail,.15),'scales'),e.x+d*.08,e.y+.05,e.z+.03,.11,.03,.06);f.rotation.set(-.6,d*.4,d*.5);root.add(f)})}

  if(B.tail==='lobo'||B.tail==='felino'){const z0=-fz(L*.15)*.85,Lb=B.tail==='lobo',tp=Lb?[[0,hipsY+.02,z0],[0,hipsY*.8,z0-.12],[.05,hipsY*.62,z0-.26]]:[[0,hipsY,z0],[0,hipsY*.5,z0-.18],[.05,.12,z0-.3],[.12,.2,z0-.42],[.14,.32,z0-.44]];
    const tl=new THREE.Mesh(taperTube(tp,Lb?t=>.045+.05*Math.sin(Math.PI*t):t=>.035-.01*t),m.skin);tl.name=P+'_cauda';root.add(tl);if(!Lb){const e=tl.geometry.userData.curve.getPointAt(1);root.add(mesh(SPH(.03),m.dark,e.x,e.y,e.z))}}
  if(B.tail==='passaro'){const z0=-fz(L*.15)*.8;[[-1,m.skin],[0,mat(pal.acc||pal.belly,'skin')],[1,m.belly]].forEach(([d,mt])=>{const tl=new THREE.Mesh(taperTube([[d*.03,hipsY+.02,z0],[d*.06,hipsY*.5,z0-.12],[d*.1,.06,z0-.22]],t=>.035*(1-t)+.012),mt);tl.name=P+'_cauda';root.add(tl)})}
  if(B.tail==='serpente'){const tp=[[0,hipsY+.02,0],[0,hipsY*.6,.02],[0,hipsY*.3,.06],[.12,.08,.1],[.22,.07,-.05],[.05,.07,-.2],[-.18,.07,-.12],[-.22,.07,.08],[-.1,.08,.25],[.08,.1,.32],[.2,.16,.36]];
    const ge=taperTube(tp,t=>B.hipR*w*1.05*(1-t*.85)+.012,80,18),tl=new THREE.Mesh(ge,mat(pal.tail,SP.glow?'ember':'scales'));tl.name=P+'_cauda';root.add(tl);if(SP.glow){const fl=flameCrest(1,1.1);fl.position.copy(ge.userData.curve.getPointAt(1));root.add(fl)}}

  /* roupa (mangas e calças entram nos braços e pernas; o que surgir até o fim da roupa é tingível) */
  const preRoupa=new Set(meshesOf(root));
  const cl=new THREE.Group();cl.name=P+'_roupa_'+O;root.add(cl);
  const shell=(y0,y1,k,mt)=>{const o=new THREE.Mesh(latheRange(pts,y0*L,y1*L,k),mt);o.scale.z=.82;o.position.y=hipsY;return o};
  const sleeve=(k,len,mt,full)=>[-1,1].forEach(sd=>{const a=arms[sd],u=capsule(aR*k,ua*(full?.95:.42),mt);u.position.y=-ua*(full?.48:.2);a.sh.add(u);if(full){const f=capsule(aR*k*.95,fa*.85,mt);f.position.y=-fa*.42;a.el.add(f)}});
  const pants=(mt,short)=>legXs.forEach(sd=>{const l=legs[sd],t=capsule(l.lr*1.2,thl*(short?.38:1),mt);t.position.y=-thl*(short?.2:.5);l.hp.add(t);if(!short){const sn=capsule(l.lr*1.12,shl*.85,mt);sn.position.y=-shl*.45;l.kn.add(sn)}});
  const hips=(mt,k=1.07)=>{if(!legXs.length)return;const c=mesh(new THREE.CylinderGeometry(B.hipR*w*k,B.hipR*w*k*1.05,L*.24,40),mt,0,hipsY+L*.05,0);c.scale.z=.82;cl.add(c)};
  if(O==='gincana'){const bg=T.main,fg=T.acc,tx=shirtTex(bg,fg),sm=tx?new THREE.MeshPhysicalMaterial({map:tx,roughness:.8,sheen:.3}):mat(bg,'fabric');
    cl.add(shell(.06,1.03,1.045,sm));sleeve(1.32,0,mat(bg,'fabric'));hips(mat(BC.ink,'fabric'));pants(mat(BC.ink,'fabric'),true)}
  if(O==='chita'){const tx=chitaTex(),cm=tx?new THREE.MeshPhysicalMaterial({map:tx,roughness:.8,sheen:.3}):mat('#C9283A','fabric');
    cl.add(shell(.04,1.03,1.045,cm));sleeve(1.3,0,cm);const lm=mat('#F4EFE3','fabric');hips(lm);pants(lm,false)}
  if(O==='gala'){const gs=B.gala;
    if(gs==='beca'){const rp=smoothPts([[B.shoulderR*w*.5,L*1.01],[B.shoulderR*w*1.08,L*.95],[B.chestR*w*1.12,L*.74],[B.waistR*w*1.16,L*.45],[B.hipR*w*1.25,L*.1],[B.hipR*w*1.55,-(hipsY-.15)]],30);
      const robe=new THREE.Mesh(new THREE.LatheGeometry(rp,48,Math.PI,Math.PI*2),mat(BC.green,'velvet'));robe.scale.z=.85;robe.position.y=hipsY;cl.add(robe);
      [-1,1].forEach(d=>{const sp=[[.98,.07],[.75,.085],[.45,.09],[.12,.1],[-.4,.11]].map(([t,x])=>{const yy=t>=0?L*t:t*hipsY;return [d*x*w,hipsY+yy,(radiusAt(rp,yy)*.85+.012)/.3]});const st=new THREE.Mesh(taperTube(sp,()=>.032,30,10),mat(BC.yellow,'velvet'));st.scale.z=.3;cl.add(st)});
      const col=new THREE.Mesh(new THREE.TorusGeometry(B.shoulderR*w*.62,.028,12,40),mat('#FFFFFF','fabric'));col.rotation.x=Math.PI/2;col.position.y=hipsY+L*.97;col.scale.y=.85;cl.add(col);
      [-1,1].forEach(sd=>{const a=arms[sd],u=mesh(new THREE.CylinderGeometry(aR*1.5,aR*2,ua*1.02,24,1,true),mat(BC.green,'velvet'),0,-ua/2,0);a.sh.add(u);const f=mesh(new THREE.CylinderGeometry(aR*1.9,aR*2.7,fa*.8,24,1,true),mat(BC.green,'velvet'),0,-fa*.4,0);a.el.add(f)})}
    else if(gs==='iara'){const gd=mat('#E3AC40','gold');cl.add(shell(.3,1.0,1.05,mat(pal.tail,'scales')));const sa=new THREE.Mesh(new THREE.TorusGeometry(B.chestR*w*1.02,.02,10,48),gd);sa.rotation.set(Math.PI/2,.55,0);sa.position.y=hipsY+L*.55;sa.scale.y=.82;cl.add(sa)}
    else{const wb=gs==='terno-branco',jc=wb?'#F4EFE3':BC.green,jm=mat(jc,'fabric');cl.add(shell(-.03,1.03,1.065,jm));sleeve(1.22,0,jm,true);
      const pm=mat(wb?'#F4EFE3':'#023A23','fabric');hips(pm);pants(pm,false);
      const sv=new THREE.Shape();sv.moveTo(-.07*w,0);sv.lineTo(.07*w,0);sv.lineTo(0,-.2*h);sv.closePath();const vv=mesh(new THREE.ShapeGeometry(sv),mat(wb?BC.bright:'#FFFFFF','flat'),0,hipsY+L*.98,fz(L*.9)*1.065+.015);vv.rotation.x=-.25;cl.add(vv);
      const bt=mat(wb?BC.green:BC.yellow,'fabric'),ny=hipsY+L*.95,nz=fz(L*.93)*1.07+.02;[-1,1].forEach(d=>{const c=mesh(new THREE.ConeGeometry(.026,.05,14),bt,d*.024,ny,nz);c.rotation.z=d*Math.PI/2;cl.add(c)});cl.add(mesh(SPH(.013),bt,0,ny,nz+.004));
      if(wb)cl.add(mesh(new THREE.BoxGeometry(.04,.03,.01),mat(BC.bright,'fabric'),radiusAt(pts,L*.72)*.45,hipsY+L*.74,fz(L*.72)*1.07+.006))}}
  const mapMat=(tx,fb)=>tx?new THREE.MeshPhysicalMaterial({map:tx,roughness:.8,sheen:.3}):mat(fb,'fabric');
  if(O==='junino'){const sm=mapMat(plaidTex(),'#C8202F');cl.add(shell(.06,1.03,1.045,sm));sleeve(1.25,0,sm,true);const jm=mat('#3B5A8A','fabric');hips(jm);pants(jm,false);legXs.forEach(sd=>{const pt=mesh(new THREE.BoxGeometry(.06,.06,.01),mat(BC.yellow,'fabric'),0,-shl*.4,legs[sd].lr*1.15);pt.rotation.z=.3;legs[sd].kn.add(pt)})}
  if(O==='frevo'){const sm=mapMat(frevoTex(),BC.yellow);cl.add(shell(.06,1.03,1.05,sm));sleeve(1.3,0,sm);const r=new THREE.Mesh(new THREE.TorusGeometry(B.waistR*w*1.1,.03,10,48),mat('#E2572A','fabric'));r.rotation.x=Math.PI/2;r.position.y=hipsY+L*.12;r.scale.y=.82;cl.add(r);const sh=mat('#2C5BB0','fabric');hips(sh);pants(sh,true)}
  if(O==='baiana'){const wt=mapMat(laceTex(),'#FFFFFF');cl.add(shell(.42,1.03,1.05,wt));sleeve(1.5,0,wt);const top=hipsY+L*.42,hg=top-.03,rb=Math.max(B.hipR*w*2.6,.5);
    cl.add(mesh(new THREE.CylinderGeometry(B.waistR*w*1.08,rb,hg,48,1,true),wt,0,top-hg/2,0));[[.06,'#2C5BB0'],[hg*.35,BC.yellow]].forEach(([y,c])=>{const t=new THREE.Mesh(new THREE.TorusGeometry(lerp(rb,B.waistR*w*1.08,y/hg)+.004,.018,8,64),mat(c,'fabric'));t.rotation.x=Math.PI/2;t.position.y=y+.03;cl.add(t)})}
  if(O==='cangaceiro'){const lt=mat('#7A4A2A','skin'),kh=mat('#C9B48A','fabric');cl.add(shell(.1,1.0,1.06,lt));sleeve(1.22,0,kh,true);hips(kh);pants(kh,false);
    [-1,1].forEach(d=>{const sp=[[d*radiusAt(pts,L*.9)*.7,hipsY+L*.95,fz(L*.9)*1.07],[0,hipsY+L*.55,fz(L*.55)*1.1],[-d*radiusAt(pts,L*.2)*.8,hipsY+L*.15,fz(L*.2)*1.08]];const st=new THREE.Mesh(taperTube(sp,()=>.016,24,8),mat('#4A2A16','skin'));cl.add(st);for(let t=.1;t<1;t+=.2){const pp=st.geometry.userData.curve.getPointAt(t);cl.add(mesh(SPH(.01,10,8),mat('#E3AC40','gold'),pp.x,pp.y,pp.z+.012))}});
    const bt=new THREE.Mesh(new THREE.TorusGeometry(B.hipR*w*1.1,.022,8,48),mat('#4A2A16','skin'));bt.rotation.x=Math.PI/2;bt.position.y=hipsY+L*.1;bt.scale.y=.82;cl.add(bt)}
  if(O==='gaucho'){const wt=mat('#F4EFE3','fabric');cl.add(shell(.06,1.03,1.045,wt));sleeve(1.25,0,wt,true);const bm=mat('#2A2A2A','fabric');hips(bm);legXs.forEach(sd=>{const l=legs[sd],t=capsule(l.lr*1.65,thl,bm);t.position.y=-thl*.5;l.hp.add(t);const sn=capsule(l.lr*1.5,shl*.75,bm);sn.position.y=-shl*.38;l.kn.add(sn)});
    const red=mat('#C8202F','fabric'),fx=new THREE.Mesh(new THREE.TorusGeometry(B.waistR*w*1.08,.035,10,48),red);fx.rotation.x=Math.PI/2;fx.position.y=hipsY+L*.2;fx.scale.y=.82;cl.add(fx);
    const ny=hipsY+L*.96,nr=radiusAt(pts,L*.94)*.62+.03,lc=new THREE.Mesh(new THREE.TorusGeometry(nr,.028,10,40),red);lc.rotation.x=Math.PI/2;lc.position.y=ny;lc.scale.y=.85;cl.add(lc);const kn=mesh(new THREE.ConeGeometry(.045,.1,12),red,0,ny-.09,fz(L*.85)*1.06+.02);kn.rotation.x=Math.PI;cl.add(kn)}
  if(O==='capoeira'){const wt=mat('#FFFFFF','fabric');hips(wt);pants(wt,false);const cd=new THREE.Mesh(new THREE.TorusGeometry(B.hipR*w*1.12,.018,8,48),mat(BC.bright,'fabric'));cd.rotation.x=Math.PI/2;cd.position.y=hipsY+L*.13;cd.scale.y=.82;cl.add(cd);[-1,1].forEach(d=>{const e=capsule(.012,.14,mat(BC.yellow,'fabric'));e.position.set(d*.03+B.hipR*w*.3,hipsY+L*.13-.08,fz(L*.13)*1.12);cl.add(e)})}
  if(O==='carnaval'){const sq=sequinTex(),gm=sq?new THREE.MeshStandardMaterial({map:sq,metalness:.8,roughness:.3}):mat('#E3AC40','gold');cl.add(shell(.58,.86,1.05,gm));hips(gm);pants(gm,true);
    const fan=new THREE.Group(),cs=[BC.yellow,BC.bright,'#E2572A','#EE8FAE',BC.blue,BC.yellow,'#C8202F','#7DB063',BC.bright,'#EE8FAE',BC.yellow];cs.forEach((c,i)=>{const a=(i/(cs.length-1)-.5)*2.4,f=mesh(SPH(1),mat(c,'fabric'),Math.sin(a)*.32,Math.cos(a)*.32,0,.05,.22,.012);f.rotation.z=-a;fan.add(f)});fan.position.set(0,hipsY+L*.75,-fz(L*.75)-.06);cl.add(fan)}
  if(O==='canarinho'){const sm=mapMat(shirtTex('#FFD43B',BC.green),'#FFD43B');cl.add(shell(.06,1.03,1.045,sm));sleeve(1.32,0,mat('#FFD43B','fabric'));const col=new THREE.Mesh(new THREE.TorusGeometry(radiusAt(pts,L*.97)*1.05+.01,.016,8,40),mat(BC.green,'fabric'));col.rotation.x=Math.PI/2;col.position.y=hipsY+L*.98;col.scale.y=.85;cl.add(col);const sh=mat('#1F4FA8','fabric');hips(sh);pants(sh,true)}
  if(O==='jangadeiro'){const sm=mapMat(stripeTex('#FFFFFF','#2C5BB0'),'#FFFFFF');cl.add(shell(.06,1.03,1.045,sm));sleeve(1.25,0,sm);const wt=mat('#F4EFE3','fabric');hips(wt);legXs.forEach(sd=>{const l=legs[sd],t=capsule(l.lr*1.25,thl,wt);t.position.y=-thl*.5;l.hp.add(t);const r=capsule(l.lr*1.32,.03,wt);r.position.y=-shl*.12;l.kn.add(r)});const ny=hipsY+L*.96,nr=radiusAt(pts,L*.94)*.62+.03,lc=new THREE.Mesh(new THREE.TorusGeometry(nr,.025,10,40),mat('#C8202F','fabric'));lc.rotation.x=Math.PI/2;lc.position.y=ny;lc.scale.y=.85;cl.add(lc)}
  if(O==='vaqueiro'){const lt=mat('#8A5A32','skin'),dk=mat('#5A3A20','skin');cl.add(shell(0,1.03,1.065,lt));sleeve(1.28,0,lt,true);const jm=mat('#3B4A6A','fabric');hips(jm);pants(jm,false);legXs.forEach(sd=>{const l=legs[sd],c=capsule(l.lr*1.38,thl*.9,dk);c.position.y=-thl*.48;l.hp.add(c)});for(let i=0;i<5;i++){const y=L*(.3+i*.13);cl.add(mesh(SPH(.012,10,8),mat('#E3AC40','gold'),0,hipsY+y,fz(y)*1.07+.01))}}
  if(O==='rendeira'){const lc=mapMat(laceTex(),'#FFFFFF');cl.add(shell(.4,1.03,1.05,lc));sleeve(1.35,0,lc);const top=hipsY+L*.42,hg=top-.04,rb=Math.max(B.hipR*w*1.9,.34);cl.add(mesh(new THREE.CylinderGeometry(B.waistR*w*1.08,rb,hg,48,1,true),mat('#2C5BB0','fabric'),0,top-hg/2,0));cl.add(mesh(new THREE.CylinderGeometry(B.waistR*w*1.1,rb*1.01,hg*.82,48,1,true,-Math.PI*.3,Math.PI*.6),lc,0,top-hg*.42,0))}
  if(O==='maracatu'){const vel=mat('#B5122B','velvet'),gd=mat('#E3AC40','gold');cl.add(shell(.06,1.03,1.05,mat('#F4EFE3','fabric')));sleeve(1.3,0,gd);const ch=L+hipsY*.85;cl.add(mesh(new THREE.CylinderGeometry(B.shoulderR*w*.95,B.hipR*w*2.2,ch,48,1,true,Math.PI*.55,Math.PI*.9),vel,0,hipsY+L*.98-ch/2,0));const col=new THREE.Mesh(new THREE.TorusGeometry(radiusAt(pts,L*.96)*1.05,.045,12,40),gd);col.rotation.x=Math.PI/2;col.position.y=hipsY+L*.97;col.scale.y=.85;cl.add(col);const top=hipsY+L*.2,hg=top-.03,rb=Math.max(B.hipR*w*2.4,.44);cl.add(mesh(new THREE.CylinderGeometry(B.waistR*w*1.08,rb,hg,48,1,true),mat('#F6C431','velvet'),0,top-hg/2,0))}
  if(O==='folhas'){cl.add(shell(.3,1.0,1.04,mat('#2E7D46','skin')));for(let i=0;i<20;i++){const a=i/20*Math.PI*2,pp=new THREE.Group();pp.rotation.y=a;pp.position.y=hipsY+L*.3;const lf=mesh(SPH(1),mat(i%2?'#2E9A56':'#7DCB6A','skin'),0,-.13,radiusAt(pts,L*.3)*.9+.02,.06,.2,.016);lf.rotation.x=.18;pp.add(lf);cl.add(pp)}const fl=new THREE.Group();for(let k=0;k<5;k++){const b=k/5*Math.PI*2;fl.add(mesh(SPH(.02,10,8),mat('#F6C431','skin'),Math.cos(b)*.024,Math.sin(b)*.024,0))}fl.position.set(radiusAt(pts,L*.8)*.4,hipsY+L*.82,fz(L*.8)*1.05+.01);cl.add(fl)}
  if(O==='base'){
    if(id==='saci'){const r=mat('#C8202F','fabric');hips(r,1.08);pants(r,true)}
    if(id==='curupira')for(let i=0;i<14;i++){const a=i/14*Math.PI*2,p=new THREE.Group();p.rotation.y=a;p.position.y=hipsY-.02;const l=mesh(SPH(1),mat(i%2?'#2E7D46':'#7DB063','skin'),0,-.08,B.hipR*w*1.02,.035,.13,.012);l.rotation.x=.15;p.add(l);cl.add(p)}
    if(id==='iara'){cl.add(shell(.3,1.0,1.05,mat(pal.tail,'scales')));const gd=new THREE.Mesh(new THREE.TorusGeometry(radiusAt(pts,L*.3)*1.06,.018,10,48),mat('#E3AC40','gold'));gd.rotation.x=Math.PI/2;gd.position.y=hipsY+L*.3;gd.scale.y=.82;cl.add(gd)}
    if(id==='brincante'){const tx=patchTex();cl.add(shell(.08,1.0,1.045,tx?new THREE.MeshPhysicalMaterial({map:tx,roughness:.8,sheen:.3}):mat(BC.yellow,'fabric')));const lm=mat('#F4EFE3','fabric');hips(lm);pants(lm,false)}}

  root.updateMatrixWorld(true);tint(meshesOf(root).filter(o=>!preRoupa.has(o)),CO.roupa);

  /* saia alegórica do Boi */
  if(B.saia){const sg=new THREE.Group();sg.name=P+'_saia';const top=hipsY+.08,hgt=hipsY*.72,r0=B.hipR*w*1.12,r1=B.hipR*w*1.9;
    sg.add(mesh(new THREE.CylinderGeometry(r0,r1,hgt,48,1,true),mat(BC.green,'velvet'),0,top-hgt/2,0));
    const gd=mat(BC.yellow,'gold');[[r1,top-hgt],[r0,top]].forEach(([r,y])=>{const t=new THREE.Mesh(new THREE.TorusGeometry(r,.02,10,64),gd);t.rotation.x=Math.PI/2;t.position.y=y;sg.add(t)});
    for(let i=0;i<24;i++){const a=i/24*Math.PI*2,rr=lerp(r0,r1,.55),sq=mesh(new THREE.CircleGeometry(.018,16),i%2?gd:mat(BC.bright,'glow'),Math.sin(a)*(rr+.003),top-hgt*.55,Math.cos(a)*(rr+.003));sq.rotation.y=a;sg.add(sq)}
    const cs=[BC.yellow,BC.bright,BC.blue,'#FFFFFF'];for(let i=0;i<28;i++){const a=i/28*Math.PI*2,rb=mesh(new THREE.BoxGeometry(.03,.16,.004),mat(cs[i%4],'fabric'),Math.sin(a)*r1,top-hgt-.08,Math.cos(a)*r1);rb.rotation.y=a;sg.add(rb)}
    root.add(sg)}

  /* peças da Fusão: acesas brilham, apagadas ficam em tom pastel */
  if(fus){const pg=n=>{const g=new THREE.Group();g.name='FUSAO_peca_'+n+(lit[n]?'_acesa':'_apagada');return g};
    const PAS={correnteza:'#BCD3EC',chama:'#F6D3B8',mata:'#C9E2C2',vendaval:'#F0C9CD'},on=k=>!!lit[k];
    if(s.pecas==='classica'){const dy=A.top-.29;
    const w1=pg('correnteza'),wm=on('correnteza')?mat('#3D8FE0','ember'):mat(PAS.correnteza,'skin');for(let i=0;i<8;i++){const a=(i-3.5)*.32,x0=Math.sin(a)*.12,z0=-.02-Math.cos(a)*.06;w1.add(new THREE.Mesh(taperTube([[x0,.27+dy,z0],[x0*1.3,.33+dy,z0-.12],[x0*1.6,.18+dy,z0-.28],[x0*1.8,-.06+dy,z0-.36]],t=>.05*(1-t)+.012,32,12),wm))}headG.add(w1);
    const f1=pg('chama'),fc=flameCrest(3,1.25);if(!on('chama'))fc.children.forEach(c=>c.material=mat(PAS.chama,'skin'));fc.position.set(0,A.top-.02,0);f1.add(fc);headG.add(f1);
    const m1=pg('mata'),rm=on('mata')?mat('#7A5532','skin'):mat(PAS.mata,'skin');legXs.forEach(sd=>{const l=legs[sd],x=l.hp.position.x;for(let k=0;k<5;k++){const a=(k-2)*.6+(sd>0?.2:-.2);m1.add(new THREE.Mesh(taperTube([[x,.04,0],[x+Math.sin(a)*.12,.015,Math.cos(a)*.1],[x+Math.sin(a)*.24,.01,Math.cos(a)*.2]],t=>.022*(1-t)+.006,16,8),rm))}l.kn.add(mesh(SPH(1),on('mata')?mat('#4FD18B','ember'):mat(PAS.mata,'skin'),0,0,l.lr*1.1,.05,.09,.015))});root.add(m1);
    const v1=pg('vendaval'),tx=windTex(),cm=on('vendaval')?new THREE.MeshPhysicalMaterial({map:tx||null,color:tx?'#FFFFFF':'#C8202F',roughness:.7,side:THREE.DoubleSide,sheen:.5}):mat(PAS.vendaval,'flat');v1.add(mesh(new THREE.CylinderGeometry(.3*w,.55*w,L*1.2,40,1,true,Math.PI*.62,Math.PI*.76),cm,0,hipsY+L*.95-L*.6,-.02));root.add(v1)}
    else{
    const w1=pg('correnteza'),wm=on('correnteza')?mat('#2F8FE8','ember'):mat(PAS.correnteza,'skin'),wl=on('correnteza')?mat('#7FC4FF','ember'):mat('#DCE8F5','skin');
    [-1,0,1].forEach(i=>{const x0=i*.07,y0=A.top*.85;w1.add(new THREE.Mesh(taperTube([[x0,y0,-.02],[x0*1.4,y0+.07,-.1],[x0*1.8,y0+.02,-.2],[x0*1.9,y0-.07,-.2],[x0*1.6,y0-.05,-.13]],t=>.04*(1-t*.75),36,12),i?wl:wm))});
    A.ears.forEach(e=>{const d=mesh(SPH(1),wm,e[0],e[1]-.05,e[2]+.01,.018,.026,.018);w1.add(d)});headG.add(w1);
    const f1=pg('chama'),fc=flameCrest(3,.95);if(!on('chama'))fc.children.forEach(c=>c.material=mat(PAS.chama,'skin'));fc.position.set(0,A.top-.02,.05);fc.rotation.x=.2;f1.add(fc);headG.add(f1);
    const m1=pg('mata');for(let i=0;i<16;i++){const a=i/16*Math.PI*2,pp=new THREE.Group();pp.rotation.y=a;pp.position.y=hipsY+L*.08;const lf=mesh(SPH(1),on('mata')?mat(i%2?'#2E9A56':'#7DCB6A','skin'):mat(i%2?PAS.mata:'#DDEBD7','skin'),0,-.07,radiusAt(pts,L*.08)*.95+.01,.045,.12,.014);lf.rotation.x=.22;pp.add(lf);m1.add(pp)}
    const fl=mesh(SPH(1),on('mata')?mat('#F6C431','skin'):mat('#F4EBC9','skin'),radiusAt(pts,L*.1)*.5,hipsY+L*.12,fz(L*.1)+.03,.03,.03,.02);m1.add(fl);root.add(m1);
    const v1=pg('vendaval'),ny=hipsY+L*.97,rr=radiusAt(pts,L*.94)*.62+.03,c1=on('vendaval')?mat('#E0313F','fabric'):mat(PAS.vendaval,'skin'),c2=on('vendaval')?mat('#2C5BB0','fabric'):mat('#D3DAEE','skin');
    const sc=new THREE.Mesh(new THREE.TorusGeometry(rr,.04,12,40),c1);sc.rotation.x=Math.PI/2;sc.position.y=ny;sc.scale.y=.85;v1.add(sc);
    [[c1,0,1],[c2,-.06,-1]].forEach(([mt,dy,sd])=>v1.add(new THREE.Mesh(taperTube([[sd*.05,ny+dy,-rr*.7],[sd*.16,ny-.06+dy,-rr-.1],[sd*.28,ny-.02+dy,-rr-.2],[sd*.4,ny-.12+dy,-rr-.24]],t=>.034*(1-t)+.012,28,10),mt)));root.add(v1)}}

  /* acessórios de time */
  if(!fus){const tg=new THREE.Group();tg.name='TIME_'+s.team;root.add(tg);const tgh=new THREE.Group();tgh.name='TIME_'+s.team+'_cabeca';headG.add(tgh);const has=t=>s.team===t||s.team==='fusao';
    if(has('correnteza')){const gd=mat('#D9A441','gold');A.ears.forEach(e=>{const r=new THREE.Mesh(new THREE.TorusGeometry(.024,.006,8,24),gd);r.position.set(e[0],e[1]-.03,e[2]);r.rotation.y=Math.PI/2;tgh.add(r)});
      const cy=hipsY+L*.96,rx=radiusAt(pts,L*.93)*.78+.02,rz=rx*.85+.01;for(let i=0;i<20;i++){const a=i/20*Math.PI*2;tg.add(mesh(SPH(.015,12,8),mat('#FFFDF7','gloss'),Math.sin(a)*rx,cy-Math.max(0,Math.cos(a))*.05,Math.cos(a)*rz))}
      const cr=new THREE.Mesh(crescentGeo(),gd);cr.position.set(0,cy-.1,rz+.01);tg.add(cr)}
    if(has('chama')&&!A.crest){const fc=flameCrest(3,s.team==='fusao'?.8:1);fc.position.set(0,A.top-.01,0);tgh.add(fc)}
    if(has('mata')){const lc=leafCrown(A.crownR||.16);lc.position.y=A.hat[1]-.05;tgh.add(lc)}
    if(has('vendaval')){const ny=hipsY+L*.97,rr=radiusAt(pts,L*.94)*.62+.03,t=new THREE.Mesh(new THREE.TorusGeometry(rr,.035,12,40),mat('#C8202F','fabric'));t.rotation.x=Math.PI/2;t.position.y=ny;t.scale.y=.85;tg.add(t);
      [['#C8202F',0],['#2C5BB0',-.05]].forEach(([c,dy])=>tg.add(new THREE.Mesh(taperTube([[-.06,ny+dy,-rr*.7],[-.2,ny-.05+dy,-rr-.12],[-.32,ny-.02+dy,-rr-.22],[-.45,ny-.12+dy,-rr-.28]],t=>.03*(1-t)+.01,28,10),mat(c,'fabric'))))}
    if(s.team==='neutro'){const st=new THREE.Mesh(starGeo(),mat(BC.yellow,'glow'));st.position.set(radiusAt(pts,L*.75)*.45,hipsY+L*.78,fz(L*.78)*1.1+.01);st.scale.setScalar(.8);tg.add(st)};{const a=ajOf(s,'time');ajApply(tg,{...a,rx:0,ry:0,rz:0,k:100});ajApply(tgh,{...a,rx:0,ry:0,rz:0,k:100},1/hs);tint(meshesOf(tg).concat(meshesOf(tgh)),CO.time)}}

  /* Boitatá: serpente de fogo sobre a cabeça do Brincante */
  if(mask==='boitata'){const bt=new THREE.Mesh(taperTube([[-.2,.08,-.04],[-.16,.36,0],[0,.46,.02],[.16,.36,.04],[.2,.12,.08]],t=>.04-.015*t,40,14),mat('#E2572A','glow'));bt.name='BRINCANTE_mascara_boitata';headG.add(bt);
    const bh=mesh(SPH(.05),mat('#F6B12B','glow'),.2,.1,.1,1,.8,1.3);headG.add(bh);[-1,1].forEach(d=>headG.add(mesh(SPH(.01),m.dark,.2+d*.02,.12,.15)))}

  /* chapéu */
  const hatT=mask==='saci'?'gorro':s.hat;
  if(hatT&&hatT!=='nenhum'){const hw=new THREE.Group(),hg=makeHat(hatT,T);hw.name=P+'_chapeu_'+hatT;hw.add(hg);hw.position.set(...A.hat);hw.scale.setScalar(A.hatK);ajApply(hw,ajOf(s,'chapeu'),1/hs);headG.add(hw);hw.updateMatrixWorld(true);tint(meshesOf(hw),CO.chapeu)}

  /* pose */
  const set=(sd,sz,sx,ez,ex)=>{const a=arms[sd];a.sh.rotation.set(sx,0,sd*sz);a.el.rotation.set(ex,0,sd*ez)};
  set(-1,.14,0,0,-.18);set(1,.14,0,0,-.18);let jump=0,lean=0;
  switch(s.pose){
    case 'acenando':set(-1,2.45,0,.4,0);break;
    case 'torcendo':set(-1,2.6,0,.25,0);set(1,2.6,0,.25,0);jump=.06;break;
    case 'correndo':set(1,.15,.75,0,-1.25);set(-1,.15,-.7,0,-1.25);if(legs[-1]){legs[1].hp.rotation.x=-.6;legs[1].kn.rotation.x=.35;legs[-1].hp.rotation.x=.55;legs[-1].kn.rotation.x=1.0}lean=.08;break;
    case 'pensando':set(-1,.35,-1.05,0,-2.0);set(1,.1,-.2,0,-1.1);break;
  }
  root.rotation.x=lean;root.userData.jump=jump;

  /* objeto na mão direita, sempre em pé */
  if(s.prop&&s.prop!=='nenhum'){const pr=new THREE.Group(),pi=makeProp(s.prop,T);pr.add(pi);ajApply(pi,ajOf(s,'mao'),1/SY.hands);pr.name='PROP_'+s.prop;const hand=arms[-1].hd;hand.add(pr);root.updateMatrixWorld(true);const q=new THREE.Quaternion();hand.getWorldQuaternion(q);pr.quaternion.copy(q.invert());pr.updateMatrixWorld(true);tint(meshesOf(pr),CO.mao)}

  root.traverse(o=>{if(o.isMesh){o.castShadow=true;o.receiveShadow=true}});
  const headTop=A.top*hs,totalH=hipsY+L+B.neck*h+headTop;
  const slots=[];root.traverse(o=>{if(o.name&&/^[A-Z]{3,}_/.test(o.name)&&!slots.includes(o.name))slots.push(o.name)});
  MODE.sy=null;
  return {root,meta:{headG,headTop:A.top,ratio:totalH/headTop,totalH,headY:hipsY+L+B.neck*h+headTop*.5,width:Math.max(Math.max(B.chestR,B.hipR)*w*2+B.armR*4,(A.crownR||.16)*2.3*hs),slots}};
}
