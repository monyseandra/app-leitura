

// ======================================================================
// 1. BASE: REACT, ARMAZENAMENTO E SENHA
//    Aqui ficam as peças básicas usadas pelo resto do código.
// ======================================================================
// Pega do React as funções de estado (useState), efeitos (useEffect), referências e contexto.
const {useState,useEffect,useRef,createContext,useContext}=React;
// htm deixa escrever HTML dentro do JavaScript (como o JSX do React) sem precisar de compilador.
// Exemplo: html`<button class="btn">Oi</button>`
const html=htm.bind(React.createElement);
// Contexto: caixa compartilhada com todas as telas (dados do usuário, navegar, avisos...).
// Qualquer tela pega tudo com useC().
const Ctx=createContext();const useC=()=>useContext(Ctx);
// Lê/grava no localStorage do navegador com segurança (se der erro, devolve o valor padrão).
const ls={get(k,d){try{const v=localStorage.getItem(k);return v?JSON.parse(v):d}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v));return true}catch(e){return false}}};
// Nomes (chaves) usados no localStorage:
//   me:users      -> contas cadastradas
//   me:session    -> e-mail de quem está logado
//   me:data:EMAIL -> livros, metas, resenhas... daquele usuário
//   me:a11y       -> preferências de acessibilidade
const K={u:"me:users",s:"me:session",d:e=>"me:data:"+e};
// Estrutura dos dados de um usuário novo (tudo começa vazio).
const emptyData=()=>({books:{},goal:null,sessions:[],prefs:{reminder:false,pub:false},kindle:{on:false},recent:[],drafts:{},likes:{},cm:{},fol:{}});
// Descobre quem está logado (lembrar de mim = localStorage; senão = sessionStorage).
const getSess=()=>{try{return localStorage.getItem(K.s)||sessionStorage.getItem(K.s)}catch(e){return null}};
// Transforma a senha em um código (SHA-256) para nunca guardar a senha de verdade.
async function hash(p){try{const b=await crypto.subtle.digest("SHA-256",new TextEncoder().encode("me|"+p));return[...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,"0")).join("")}catch(e){return btoa(unescape(encodeURIComponent("me|"+p)))}}
// ======================================================================
// 2. ÍCONES
//    Cada ícone é só o desenho (path) de um SVG. O componente Ic desenha o ícone pelo nome.
// ======================================================================
const P={book:"M2 4h6a4 4 0 0 1 4 4v13a3 3 0 0 0-3-3H2z M22 4h-6a4 4 0 0 0-4 4v13a3 3 0 0 1 3-3h7z",chart:"M12 20V10 M18 20V4 M6 20v-4",search:"M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z M21 21l-4.3-4.3",user:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2 M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",back:"M19 12H5 M12 19l-7-7 7-7",star:"M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8-6.2-3.3-6.2 3.3L7 14.2 2 9.3l6.9-1z",check:"M20 6L9 17l-5-5",plus:"M12 5v14 M5 12h14",minus:"M5 12h14",eye:"M2 12s4-8 10-8 10 8 10 8-4 8-10 8S2 12 2 12z M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",eyeoff:"M17.9 17.9A10 10 0 0 1 12 20c-6 0-10-8-10-8a18 18 0 0 1 5-5.9 M9.9 4.2A9 9 0 0 1 12 4c6 0 10 8 10 8a18 18 0 0 1-2.2 3.2 M1 1l22 22",flag:"M4 22V4 M4 15s1-1 4-1 5 2 8 2 4-1 4-1V4s-1 1-4 1-5-2-8-2-4 1-4 1",trophy:"M6 9H4a2 2 0 0 1-2-2V5h4 M18 9h2a2 2 0 0 0 2-2V5h-4 M6 3h12v6a6 6 0 0 1-12 0z M12 15v4 M8 21h8",x:"M18 6L6 18 M6 6l12 12",chev:"M9 18l6-6-6-6",share:"M18 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M6 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M18 22a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M8.6 13.5l6.8 4 M15.4 6.5l-6.8 4",cloudoff:"M2 2l20 20 M5.8 5.8A7 7 0 0 0 7 19h10.5a4.5 4.5 0 0 0 1.6-.3 M9 4.2A7 7 0 0 1 17.5 9H18a4.5 4.5 0 0 1 3.4 7.5",sync:"M21 12a9 9 0 0 0-15-6.7L3 8 M3 3v5h5 M3 12a9 9 0 0 0 15 6.7L21 16 M16 16h5v5",quote:"M3 21c3 0 7-1 7-8V5H4v6h4 M14 21c3 0 7-1 7-8V5h-6v6h4",send:"M22 2L11 13 M22 2l-7 20-4-9-9-4z",bookmark:"M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z",lock:"M5 11h14v10H5z M8 11V7a4 4 0 0 1 8 0v4",phone:"M7 2h10v20H7z M12 18h.01",out:"M9 21H5V3h4 M16 17l5-5-5-5 M21 12H9",flame:"M12 2c1 4 6 6 6 12a6 6 0 0 1-12 0c0-3 2-4 3-7 1 1 3 2 3-5z",bolt:"M13 2L3 14h9l-1 8 10-12h-9z",msg:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",sparkle:"M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z",info:"M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M12 16v-4 M12 8h.01",target:"M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12z M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",shield:"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",scan:"M3 7V3h4 M17 3h4v4 M21 17v4h-4 M7 21H3v-4 M7 12h10",filter:"M4 6h16 M7 12h10 M10 18h4",searchx:"M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z M21 21l-4.3-4.3 M9 9l4 4 M13 9l-4 4",dots:"M12 6h.01 M12 12h.01 M12 18h.01",save:"M5 3h11l3 3v15H5z M8 3v6h7V3",heart:"M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z",users:"M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M23 21v-2a4 4 0 0 0-3-3.9 M16 3.1a4 4 0 0 1 0 7.8",access:"M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M12 7v.01 M8 10l4 1 4-1 M12 11v3 M10 18l2-4 2 4",volume:"M11 5L6 9H2v6h4l5 4z M15.5 8.5a5 5 0 0 1 0 7 M19 5a10 10 0 0 1 0 14",home:"M3 11l9-8 9 8 M5 10v10h14V10 M10 20v-6h4v6"};
// Uso: <${Ic} n="book"/>  (n = nome do ícone)
const Ic=({n})=>html`<svg class="ic" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d=${P[n]}/></svg>`;
// ======================================================================
// 3. DADOS E FUNÇÕES AUXILIARES
//    Catálogo de livros, categorias e funções de cálculo (metas, estatísticas, datas).
// ======================================================================
// Catálogo de livros. Campos: id, t=título, a=autor, g=gênero, ar=área, p=páginas, y=ano,
// r=nota, n=avaliações, cats=categorias, s=sinopse, q=citação, c=cores da capa [fundo1, fundo2, texto].
const CAT=[
{id:"b1",t:"Dom Casmurro",a:"Machado de Assis",g:"Clássico",ar:"Literatura brasileira",p:256,y:1899,r:4.8,n:"1,2k",cats:["Clássicos","Romance"],s:"Dom Casmurro narra a história de Bento Santiago, o Bentinho, e de sua obsessão por Capitu, a jovem de olhos de ressaca com quem vive uma história de amor marcada pelo ciúme e pela dúvida. Contada em primeira pessoa, a obra deixa ao leitor a pergunta que atravessa gerações: Capitu traiu ou não?",q:"“Capitu era Capitu, isto é, uma criatura muito particular, mais mulher do que eu era homem.” — Capítulo XXXII",c:["#EDE6D8","#D9CDB8","#5a4636"]},
{id:"b2",t:"1984",a:"George Orwell",g:"Clássico distópico",ar:"Ficção distópica",p:328,y:1949,r:4.8,n:"2,1k",cats:["Clássicos","Ficção Científica","Suspense"],s:"Winston Smith vive sob o olhar do Grande Irmão, num mundo em que o Partido controla a verdade, a história e até o pensamento. Um clássico sobre vigilância, liberdade e poder.",q:"“Guerra é paz. Liberdade é escravidão. Ignorância é força.” — Parte 1, Capítulo 1",c:["#6b2d45","#3a1a2c","#f1e3e8"]},
{id:"b3",t:"O Hobbit",a:"J.R.R. Tolkien",g:"Fantasia",ar:"Fantasia",p:336,y:1937,r:4.8,n:"1,8k",cats:["Fantasia","Clássicos"],s:"Bilbo Bolseiro, um hobbit caseiro, é arrastado por Gandalf e treze anões numa jornada para recuperar um tesouro guardado por um dragão.",q:"“Em um buraco no chão vivia um hobbit.” — Capítulo 1",c:["#8fa36a","#d8b86a","#2e3a1f"]},
{id:"b4",t:"Ensaio Sobre a Cegueira",a:"José Saramago",g:"Romance",ar:"Literatura portuguesa",p:288,y:1995,r:4.6,n:"960",cats:["Clássicos","Suspense"],s:"Uma epidemia de cegueira branca atinge uma cidade inteira. Isolados em quarentena, os cegos enfrentam o colapso da civilização e a própria humanidade.",q:"“Se podes olhar, vê. Se podes ver, repara.” — Epígrafe",c:["#2d2d2d","#111","#e9e3d8"]},
{id:"b5",t:"Memórias Póstumas de Brás Cubas",a:"Machado de Assis",g:"Clássico",ar:"Literatura brasileira",p:224,y:1881,r:4.9,n:"1,5k",cats:["Clássicos"],s:"O defunto autor Brás Cubas conta a própria vida com ironia e humor ácido, num marco do realismo brasileiro.",q:"“Algum tempo hesitei se devia abrir estas memórias pelo princípio ou pelo fim.” — Capítulo 1",c:["#E9E3D6","#cfc6b3","#3b3a5a"]},
{id:"b6",t:"O Cortiço",a:"Aluísio Azevedo",g:"Naturalismo",ar:"Literatura brasileira",p:280,y:1890,r:4.7,n:"870",cats:["Clássicos","Romance"],s:"No Rio de Janeiro do século XIX, um cortiço cresce e vira retrato de um país: ambição, miséria e desejo convivem no mesmo pátio.",q:"“O cortiço acordava, abrindo, não os olhos, mas a sua infinidade de portas e janelas.” — Capítulo 3",c:["#d7a86a","#a8553a","#2d1b12"]},
{id:"b7",t:"A Revolução dos Bichos",a:"George Orwell",g:"Clássico distópico",ar:"Ficção distópica",p:152,y:1945,r:4.8,n:"1,9k",cats:["Clássicos","Ficção Científica"],s:"Os animais de uma fazenda expulsam o dono humano e tentam criar uma sociedade igualitária, até que alguns se tornam mais iguais que os outros.",q:"“Todos os animais são iguais, mas alguns animais são mais iguais que os outros.” — Capítulo 10",c:["#cbc4b6","#8f8778","#2a2a2a"]},
{id:"b8",t:"Torto Arado",a:"Itamar Vieira Junior",g:"Ficção brasileira",ar:"Literatura brasileira",p:264,y:2019,r:4.9,n:"2,4k",cats:["Romance"],s:"Duas irmãs, Bibiana e Belonísia, crescem numa fazenda na Chapada Diamantina. Um segredo da infância molda a luta delas por terra, voz e pertencimento.",q:"“Foi por meio da boca de Zeca Chapéu Grande que a voz dos encantados chegou.” — Parte 1",c:["#e29a55","#b8522e","#2c1a10"]},
{id:"b9",t:"Fahrenheit 451",a:"Ray Bradbury",g:"Ficção distópica",ar:"Ficção científica",p:194,y:1953,r:4.7,n:"1,3k",cats:["Ficção Científica","Clássicos"],s:"Num futuro em que livros são proibidos, o bombeiro Montag queima o que deveria proteger, até questionar tudo.",q:"“Era um prazer queimar.” — Parte 1",c:["#4a3470","#1d1233","#f6a04d"]},
{id:"b10",t:"O Amor Incômodo",a:"Elena Ferrante",g:"Romance",ar:"Literatura italiana",p:176,y:1992,r:4.4,n:"640",cats:["Romance","Suspense"],s:"Após a morte misteriosa da mãe, Delia volta a Nápoles e mergulha em memórias de uma relação de amor e medo.",q:"“Minha mãe se afogou na noite de 23 de maio, dia do meu aniversário.” — Capítulo 1",c:["#d3dde0","#9db4ba","#233840"]}];
// B[id] devolve o livro do catálogo pelo id (ex.: B.b1 = Dom Casmurro).
const B=Object.fromEntries(CAT.map(b=>[b.id,b]));
// Categorias mostradas na busca e quantidade de obras.
const CATS=[["Ficção Científica","1.420"],["Clássicos","3.850"],["Romance","2.910"],["Não-Ficção","1.180"],["Suspense","940"],["Fantasia","2.340"]];
// SL = nomes dos status de leitura.
const SL={lendo:"Lendo",quero:"Quero ler",lido:"Lido",abandonado:"Abandonado"};
// Tags de sensações que o leitor pode marcar na resenha (máximo 4).
const TAGS=["Reflexivo","Distopia","Essencial","Impactante","Ritmo rápido","Atemporal","Emocionante","Divertido"];
// RL = textos das notas de 1 a 5 estrelas.
const RL=["","Não gostei","Regular","Bom","Muito bom","Obra-prima!"];
// fd = formata datas em português (ex.: 14 de junho de 2026).
const fd=(i,o)=>new Date(i).toLocaleDateString("pt-BR",o||{day:"numeric",month:"long",year:"numeric"});
// setSt = muda o status de um livro (e marca como concluído se for "lido").
const setSt=(n,id,st)=>{const e=n.books[id]||(n.books[id]={added:Date.now(),page:0});e.status=st;if(st==="lido"){e.page=B[id].p;e.finished=new Date().toISOString()}if(st==="quero")e.page=0};
// Calcula o progresso da meta (quanto já foi feito, porcentagem e rótulo).
function goalProg(d){const g=d.goal;if(!g)return null;const now=new Date();const inP=i=>{if(!i)return false;const t=new Date(i);return t.getFullYear()===now.getFullYear()&&(g.period==="mensal"?t.getMonth()===now.getMonth():true)};
const L=Object.entries(d.books).filter(([i,b])=>b.status==="lido"&&inP(b.finished));let done;
if(g.type==="livros")done=L.length;else if(g.type==="paginas")done=L.reduce((s,[i])=>s+B[i].p,0);else done=Math.round(d.sessions.filter(s=>inP(s.date)).reduce((s,x)=>s+x.min,0)/60);
return{done,pct:Math.min(100,Math.round(done/g.value*100)),unit:{livros:"livros",paginas:"páginas",tempo:"horas"}[g.type],label:g.period==="mensal"?"Meta mensal":"Meta anual "+now.getFullYear()}}
// Estatísticas do perfil: livros lidos, páginas lidas e horas de leitura.
function stats(d){const b=Object.values(d.books);return{lidos:b.filter(x=>x.status==="lido").length,pags:b.reduce((s,x)=>s+(x.page||0),0),h:Math.round(d.sessions.reduce((s,x)=>s+x.min,0)/60)}}
// Estimativa de tempo que falta para terminar o livro (2 min por página).
const timeLeft=(left)=>{const m=left*2;return Math.floor(m/60)+"h "+String(m%60).padStart(2,"0")+"min"};

// ======================================================================
// 4. COMPONENTES REUTILIZÁVEIS
//    Peças pequenas usadas em várias telas.
// ======================================================================
// Capa de livro desenhada com CSS (não precisa de imagem).
function Cover({b,w=76}){const[c1,c2,fg]=b.c;return html`<div class="cover" aria-hidden="true" style=${{width:w,height:w*1.45,background:`linear-gradient(160deg,${c1},${c2})`,color:fg}}><span>${b.t}</span><small>${b.a}</small></div>`}
// Barra de progresso acessível (leitores de tela leem a porcentagem).
const Bar=({v,l})=>html`<div class="bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow=${v} aria-label=${l}><span style=${{width:v+"%"}}/></div>`;
// Interruptor liga/desliga com texto de apoio (role="switch").
const Sw=({on,set,id,label,desc})=>html`<div class="row between pad"><div class="sp"><span id=${id}>${label}</span>${desc&&html`<p class="sm mut">${desc}</p>`}</div><button class="sw" role="switch" aria-checked=${on} aria-labelledby=${id} onClick=${()=>set(!on)}/></div>`;
// Moldura padrão de cada tela: botão voltar, título (h1) e conteúdo.
function Page({title,back,right,children,full}){const{nav}=useC();return html`<main id="conteudo" class=${"main"+(full?" full":"")}><div class="hd">${back&&html`<button class="ib" aria-label="Voltar" onClick=${()=>nav(back)}><${Ic} n="back"/></button>`}<h1 id="h1" tabIndex="-1">${title}</h1>${right}</div>${children}</main>`}
// Aviso de tela vazia com botão de ação.
function Empty({icon,title,text,cta,onCta,ctaIcon}){return html`<div class="empty"><${Ic} n=${icon}/><h2>${title}</h2><p>${text}</p>${cta&&html`<button class="btn" onClick=${onCta}>${ctaIcon&&html`<${Ic} n=${ctaIcon}/>`}${cta}</button>`}</div>`}
// Janela (modal): prende o foco do teclado, fecha com Esc e devolve o foco ao fechar.
function Modal({title,onClose,children}){const r=useRef(),prev=useRef(document.activeElement);
useEffect(()=>{const p=prev.current;r.current.querySelector("input,textarea,select,button")?.focus();document.body.style.overflow="hidden";return()=>{document.body.style.overflow="";p&&p.focus&&p.focus()}},[]);
const key=e=>{if(e.key==="Escape")onClose();if(e.key==="Tab"){const f=[...r.current.querySelectorAll("button,input,textarea,select,a[href]")].filter(x=>!x.disabled);if(!f.length)return;const a=f[0],z=f[f.length-1];if(e.shiftKey&&document.activeElement===a){e.preventDefault();z.focus()}else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus()}}};
return html`<div class="ov" onMouseDown=${e=>e.target===e.currentTarget&&onClose()}><div class="dlg" role="dialog" aria-modal="true" aria-labelledby="dt" ref=${r} onKeyDown=${key}><h2 id="dt">${title}</h2>${children}</div></div>`}
// Campo de formulário com rótulo e mensagem de erro ligada ao campo.
function Field({id,label,error,right,...p}){return html`<div class="field"><label htmlFor=${id}>${label}</label><div class=${right?"pw":""}><input class="inp" id=${id} aria-invalid=${!!error} aria-describedby=${error?id+"-e":undefined} ...${p}/>${right}</div>${error&&html`<p class="err" id=${id+"-e"}>${error}</p>`}</div>`}
// Campo de senha com botão de mostrar/ocultar.
function PwField({show,...p}){const[s,set]=useState(false);return html`<${Field} ...${p} type=${s?"text":"password"} right=${html`<button type="button" class="ib" aria-label=${s?"Ocultar senha":"Mostrar senha"} aria-pressed=${s} onClick=${()=>set(!s)}><${Ic} n=${s?"eyeoff":"eye"}/></button>`}/>`}
// Leva o foco do teclado para o primeiro campo com erro.
const focusErr=()=>setTimeout(()=>document.querySelector("[aria-invalid=true]")?.focus(),30);

// ======================================================================
// 5. TELAS DE ENTRAR E CRIAR CONTA
//    Tela dividida: figura de leitura à esquerda, formulário à direita.
// ======================================================================

// Figura da tela de entrar (SVG): pilha de livros, livro aberto, xícara e planta.
function Ilustracao(){return html`<svg viewBox="0 0 400 320" role="img" aria-label="Ilustração de uma pilha de livros com um livro aberto, uma xícara de chá e uma planta">
  <circle cx="300" cy="70" r="38" fill="#F6EEDC"/>
  <g fill="#fff" opacity=".85"><circle cx="70" cy="50" r="3"/><circle cx="140" cy="92" r="2"/><circle cx="230" cy="40" r="2.5"/><circle cx="365" cy="140" r="2"/><circle cx="40" cy="150" r="2"/></g>
  <rect x="30" y="268" width="340" height="14" rx="7" fill="#33196B"/>
  <rect x="70" y="236" width="150" height="32" rx="4" fill="#A98BEB"/><rect x="82" y="246" width="126" height="4" fill="#EAE2F0"/>
  <rect x="84" y="204" width="130" height="32" rx="4" fill="#E8B9A0"/><rect x="96" y="214" width="106" height="4" fill="#fff" opacity=".7"/>
  <rect x="76" y="172" width="140" height="32" rx="4" fill="#A9BFA8"/><rect x="88" y="182" width="116" height="4" fill="#fff" opacity=".7"/>
  <path d="M70 168 Q108 148 146 164 L146 128 Q108 112 70 130z" fill="#FBF8F4" stroke="#3B3345" strokeWidth="2" strokeLinejoin="round"/>
  <path d="M222 168 Q184 148 146 164 L146 128 Q184 112 222 130z" fill="#FBF8F4" stroke="#3B3345" strokeWidth="2" strokeLinejoin="round"/>
  <path d="M84 140 Q112 130 134 140 M84 150 Q112 140 134 150 M158 140 Q180 130 208 140 M158 150 Q180 140 208 150" stroke="#CBBFDA" strokeWidth="2" fill="none" strokeLinecap="round"/>
  <rect x="262" y="236" width="50" height="32" rx="8" fill="#FBF8F4" stroke="#3B3345" strokeWidth="2"/>
  <path d="M312 244 q16 4 0 18" fill="none" stroke="#3B3345" strokeWidth="2"/>
  <path d="M276 226 q-6 -10 0 -18 M292 226 q-6 -10 0 -18" stroke="#fff" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
  <rect x="330" y="240" width="30" height="28" rx="4" fill="#C98F6B"/>
  <path d="M345 240 C330 220 332 200 345 190 C358 200 360 220 345 240z" fill="#8FAE8F"/>
  <path d="M345 240 C320 232 318 214 326 206 C340 212 346 226 345 240z" fill="#A9BFA8"/>
  <path d="M345 240 C370 232 372 214 364 206 C350 212 344 226 345 240z" fill="#7C9E7C"/>
</svg>`}

// Moldura das duas telas: lado esquerdo = nome + figura, lado direito = formulário (children).
function AuthLayout({title,sub,children}){return html`<main id="conteudo" class="auth-split">
  <section class="auth-art"><div class="brand-big"><${Ic} n="book"/> Minha Estante</div><p class="lema">leia · sonhe · viva</p><${Ilustracao}/></section>
  <section class="auth-form"><div class="auth-box"><h1 id="h1" tabIndex="-1">${title}</h1><p class="mut">${sub}</p>${children}</div></section>
</main>`}

// Tela de ENTRAR: confere e-mail e senha (comparando o hash) e abre a sessão.
function Login(){
  const{users,login,nav,say}=useC();
  const[f,setF]=useState({email:"",pw:"",rem:false});   // valores digitados
  const[e,setE]=useState({});                           // mensagens de erro
  const ch=k=>ev=>setF({...f,[k]:ev.target.type==="checkbox"?ev.target.checked:ev.target.value});
  async function go(ev){
    ev.preventDefault();
    const em=f.email.trim().toLowerCase(),er={};
    if(!em)er.email="Informe seu e-mail.";
    if(!f.pw)er.pw="Informe sua senha.";
    if(!er.email&&!er.pw){const u=users[em];if(!u||u.h!==await hash(f.pw))er.form="E-mail ou senha incorretos. Confira os dados ou crie uma conta."}
    setE(er);
    if(Object.keys(er).length)return focusErr();   // leva o foco para o primeiro erro
    login(em,f.rem);
  }
  return html`<${AuthLayout} title="Bem-vindo de volta!" sub="Entre para continuar sua leitura">
    <form onSubmit=${go} noValidate>
      ${e.form&&html`<p class="err" role="alert" style=${{marginBottom:12}}>${e.form}</p>`}
      <${Field} id="em" label="E-mail" type="email" autoComplete="email" placeholder="seu@email.com" value=${f.email} onChange=${ch("email")} error=${e.email}/>
      <${PwField} id="pw" label="Senha" autoComplete="current-password" value=${f.pw} onChange=${ch("pw")} error=${e.pw}/>
      <label class="chk"><input type="checkbox" checked=${f.rem} onChange=${ch("rem")}/> Lembrar de mim</label>
      <button type="button" class="link" onClick=${()=>say("A recuperação de senha precisa de um servidor de e-mail e não está disponível nesta versão.")}>Esqueci minha senha</button>
      <button class="btn block" style=${{marginTop:8}}>Entrar</button>
      <div class="sep">ou</div>
      <button type="button" class="btn ghost block" onClick=${()=>say("Entrar com Google não está disponível nesta versão. Use e-mail e senha.")}>Entrar com Google</button>
    </form>
    <div class="auth-alt"><p>Não tem conta?</p><button class="link" onClick=${()=>nav("cadastro")}>Criar conta</button></div>
  <//>`}

// Tela de CRIAR CONTA: valida os campos, guarda o usuário (senha com hash) e já entra.
function Signup(){
  const{users,register,nav,say}=useC();
  const[f,setF]=useState({name:"",email:"",pw:"",pw2:"",terms:false});
  const[e,setE]=useState({});
  const ch=k=>ev=>setF({...f,[k]:ev.target.type==="checkbox"?ev.target.checked:ev.target.value});
  async function go(ev){
    ev.preventDefault();
    const em=f.email.trim().toLowerCase(),er={};
    if(f.name.trim().length<2)er.name="Informe seu nome completo.";
    if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em))er.email="Informe um e-mail válido, como nome@email.com.";
    else if(users[em])er.email="Já existe uma conta com este e-mail. Entre ou use outro e-mail.";
    if(f.pw.length<8)er.pw="A senha precisa ter pelo menos 8 caracteres.";
    if(f.pw2!==f.pw)er.pw2="As senhas não são iguais.";
    if(!f.terms)er.terms="Aceite os Termos de Uso e a Política de Privacidade para continuar.";
    setE(er);
    if(Object.keys(er).length)return focusErr();
    await register(f.name.trim(),em,f.pw);
  }
  return html`<${AuthLayout} title="Criar conta" sub="Comece a organizar suas leituras">
    <form onSubmit=${go} noValidate>
      <${Field} id="nm" label="Nome completo" autoComplete="name" placeholder="Seu nome" value=${f.name} onChange=${ch("name")} error=${e.name}/>
      <${Field} id="em" label="E-mail" type="email" autoComplete="email" placeholder="seu@email.com" value=${f.email} onChange=${ch("email")} error=${e.email}/>
      <${PwField} id="pw" label="Senha (mínimo 8 caracteres)" autoComplete="new-password" value=${f.pw} onChange=${ch("pw")} error=${e.pw}/>
      <${PwField} id="pw2" label="Confirmação de senha" autoComplete="new-password" value=${f.pw2} onChange=${ch("pw2")} error=${e.pw2}/>
      <label class="chk"><input type="checkbox" checked=${f.terms} onChange=${ch("terms")} aria-invalid=${!!e.terms}/> Aceito os Termos de Uso e a Política de Privacidade</label>
      ${e.terms&&html`<p class="err" role="alert">${e.terms}</p>`}
      <button class="btn block" style=${{marginTop:12}}>Criar conta</button>
      <div class="sep">ou</div>
      <button type="button" class="btn ghost block" onClick=${()=>say("Cadastro com Google não está disponível nesta versão. Use e-mail e senha.")}>Cadastrar com Google</button>
    </form>
    <div class="auth-alt"><p>Já tem conta?</p><button class="link" onClick=${()=>nav("entrar")}>Entrar</button></div>
  <//>`}

// ======================================================================
// 6. TELAS DE LIVROS E PERFIL
//    Biblioteca, detalhes, avaliação, busca, metas, progresso, Kindle e perfil.
// ======================================================================
// Cartão de livro da Biblioteca.
function BookCard({id,onMenu}){const{data,nav}=useC();const b=B[id],e=data.books[id];const pct=Math.round(e.page/b.p*100);
return html`<article class="card bk"><${Cover} b=${b}/><div class="sp"><div class="row between"><span class="tag">${SL[e.status]}</span><button class="ib" aria-label=${"Opções de "+b.t} onClick=${()=>onMenu(id)}><${Ic} n="dots"/></button></div>
<h2 style=${{fontSize:"1.25rem"}}><button class="link" style=${{textDecoration:"none",color:"inherit",fontFamily:"inherit",fontSize:"inherit",textAlign:"left",padding:0}} onClick=${()=>nav("livro-"+id)}>${b.t}</button></h2><p class="mut">${b.a}</p>
${e.status==="lendo"&&html`<p class="sm" style=${{color:"var(--ok)",fontWeight:700}}>Pág. ${e.page} de ${b.p} • ${pct}%</p><${Bar} v=${pct} l=${"Progresso em "+b.t}/>`}
${e.status==="lido"&&html`<p class="sm" style=${{color:"var(--star)",fontWeight:700}}>${e.rating?"★".repeat(e.rating)+" "+e.rating+",0":html`<button class="link sm" onClick=${()=>nav("avaliar-"+id)}>Avaliar este livro</button>`}</p>`}
${e.status==="quero"&&html`<p class="sm" style=${{color:"var(--ok)",fontWeight:700}}>Na fila de leitura</p>`}</div></article>`}
// Tela BIBLIOTECA: meta, busca, filtros por status e lista de livros.
function Estante(){const{data,nav,upd,say}=useC();const[q,setQ]=useState("");const[f,setF]=useState("todos");const[m,setM]=useState(null);
const ids=Object.keys(data.books);const cnt=s=>ids.filter(i=>data.books[i].status===s).length;const g=goalProg(data);
const list=ids.filter(i=>(f==="todos"||data.books[i].status===f)&&(B[i].t+" "+B[i].a).toLowerCase().includes(q.toLowerCase())).sort((a,b)=>data.books[b].added-data.books[a].added);
if(!ids.length)return html`<${Page} title="Estante"><${Empty} icon="book" title="Sua estante está vazia" text="Adicione seu primeiro livro para começar a acompanhar suas leituras." cta="Adicionar livro" ctaIcon="plus" onCta=${()=>nav("buscar")}/><//>`;
return html`<${Page} title="Estante">
${g?html`<section class="card" aria-label="Meta de leitura"><div class="row between"><b>${g.label}</b><b>${g.pct}%</b></div><p style=${{color:"var(--ok)",fontWeight:700}}>${g.done} de ${data.goal.value} ${g.unit} concluídos</p><${Bar} v=${g.pct} l=${g.label}/><p class="sm">${g.pct>=100?"Meta alcançada. Parabéns!":"Restam "+(data.goal.value-g.done)+" "+g.unit+" para alcançar sua meta."}</p></section>`:html`<section class="card row between"><span>Você ainda não definiu uma meta.</span><button class="btn ghost sm" onClick=${()=>nav("metas")}>Definir meta</button></section>`}
<div class="field"><label class="sr" htmlFor="qs">Buscar na minha estante</label><input id="qs" type="search" class="inp" placeholder="Buscar na minha estante…" value=${q} onChange=${e=>setQ(e.target.value)} onInput=${e=>setQ(e.target.value)}/></div>
<div class="chips" role="group" aria-label="Filtrar por status">${[["todos","Todos",ids.length],["lendo","Lendo",cnt("lendo")],["lido","Lidos",cnt("lido")],["quero","Quero ler",cnt("quero")],["abandonado","Abandonados",cnt("abandonado")]].filter(x=>x[0]!=="abandonado"||x[2]).map(([k,l,n])=>html`<button class="chip" key=${k} aria-pressed=${f===k} onClick=${()=>setF(k)}>${l} (${String(n).padStart(2,"0")})</button>`)}</div>
<div class="dl" aria-live="polite">${list.length?list.map(i=>html`<${BookCard} key=${i} id=${i} onMenu=${setM}/>`):html`<p class="mut">Nenhum livro encontrado com esses filtros.</p>`}</div>
<div class="note" role="status"><${Ic} n="check"/>${data.kindle.on?"Sua estante está sincronizada":"Sua estante está salva neste navegador"}</div>
<button class="btn block" onClick=${()=>nav("buscar")}><${Ic} n="plus"/> Adicionar livro</button>
${m&&html`<${Modal} title=${"Mover “"+B[m].t+"” para"} onClose=${()=>setM(null)}>${Object.keys(SL).map(s=>html`<button key=${s} class="btn ghost block" aria-pressed=${data.books[m].status===s} onClick=${()=>{upd(n=>setSt(n,m,s));say("Status atualizado com sucesso!");setM(null)}}>${SL[s]}</button>`)}<button class="btn danger block" onClick=${()=>{upd(n=>{delete n.books[m]});say("Livro removido da estante.");setM(null)}}>Remover da estante</button><button class="link" onClick=${()=>setM(null)}>Cancelar</button><//>`}<//>`}

// Tela DETALHES DO LIVRO: status, progresso, sinopse, citação e registrar sessão.
function Detail({id}){const{data,upd,nav,say}=useC();const b=B[id];const[more,setMore]=useState(false);const[m,setM]=useState(null);const[inv,setInv]=useState(false);const[v,setV]=useState({a:"",b:""});
if(!b)return html`<${Page} title="Livro não encontrado" back="estante"><${Empty} icon="searchx" title="Não encontramos este livro" text="Volte à estante ou faça uma nova busca." cta="Buscar livros" onCta=${()=>nav("buscar")}/><//>`;
const e=data.books[id];const pct=e?Math.round(e.page/b.p*100):0;
const setS=s=>{upd(n=>setSt(n,id,s));say("Status atualizado com sucesso!");if(s==="lido")setInv(true)};
const addPage=ev=>{ev.preventDefault();const p=Math.max(0,Math.min(b.p,+v.a||0));upd(n=>{n.books[id].page=p;if(p>=b.p)setSt(n,id,"lido")});setM(null);say("Página atualizada.");if(p>=b.p)setInv(true)};
const addSess=ev=>{ev.preventDefault();const pg=Math.max(0,+v.a||0),mi=Math.max(0,+v.b||0);if(!pg&&!mi)return;upd(n=>{if(!n.books[id])setSt(n,id,"lendo");const x=n.books[id];if(x.status!=="lido"){x.status="lendo";x.page=Math.min(b.p,x.page+pg);if(x.page>=b.p)setSt(n,id,"lido")}n.sessions.push({id,pages:pg,min:mi,date:new Date().toISOString()})});setM(null);say("Sessão registrada.")};
const quote=e&&e.quote?e.quote:b.q;
return html`<${Page} title="Detalhes do livro" back=${e?"estante":"buscar"}>
<section class="card" style=${{textAlign:"center",display:"grid",justifyItems:"center",gap:8}}><${Cover} b=${b} w=140/><span class="tag">${b.g}</span><p class="cap">${b.ar.toUpperCase()}</p><h2 style=${{fontSize:"2rem"}}>${b.t}</h2><p class="mut">${b.a}</p><div class="chips" style=${{justifyContent:"center"}}><span class="tag">${b.p} páginas</span><span class="tag">Ano ${b.y}</span><span class="tag">Português</span></div></section>
<div class="stats"><div class="stat"><b>${String(b.r).replace(".",",")}</b><span>Nota média</span></div><div class="stat"><b>${b.n}</b><span>Avaliações</span></div><div class="stat"><b>${e?pct+"%":"–"}</b><span>${e?"Seu progresso":"Não iniciado"}</span></div></div>
<h2 style=${{margin:"6px 0"}} id="ml">Meu estado de leitura</h2><div class="chips" role="group" aria-labelledby="ml">${Object.keys(SL).map(s=>html`<button key=${s} class="chip" aria-pressed=${!!e&&e.status===s} onClick=${()=>setS(s)}>${SL[s]}</button>`)}</div>
${e&&e.status==="lendo"&&html`<section class="card"><h3 class="row"><${Ic} n="book"/> Progresso da leitura</h3><div class="row between" style=${{marginTop:8}}><b class="sm">Página ${e.page} de ${b.p}</b><span class="sm">${b.p-e.page} páginas restantes</span></div><${Bar} v=${pct} l="Progresso da leitura"/><p class="sm">Restam aproximadamente ${timeLeft(b.p-e.page)}</p><div style=${{textAlign:"center",marginTop:10}}><button class="btn ghost sm" onClick=${()=>{setV({a:e.page,b:""});setM("page")}}>Atualizar página</button></div></section>`}
<section class="card"><h3 class="row"><${Ic} n="msg"/> Sinopse</h3><p style=${{marginTop:8}}>${more?b.s:b.s.slice(0,150)+(b.s.length>150?"…":"")}</p>${b.s.length>150&&html`<button class="link" aria-expanded=${more} onClick=${()=>setMore(!more)}>${more?"Ler menos":"Ler mais"}</button>`}</section>
<section class="quote" aria-label="Citação"><div class="row between"><span class="cap" style=${{fontFamily:"var(--sans)"}}>${e&&e.quote?"CITAÇÃO MARCADA":"CITAÇÃO DO LIVRO"}</span><${Ic} n="quote"/></div><p style=${{marginTop:8}}>${quote}</p></section>
<div class="stack" style=${{marginTop:16}}>${e&&e.status==="lido"?html`<button class="btn ghost block" onClick=${()=>nav("avaliar-"+id)}><${Ic} n="star"/> ${e.rating?"Editar avaliação":"Avaliar livro"}</button>`:null}<button class="btn block" onClick=${()=>{setV({a:"",b:""});setM("sess")}}>Registrar sessão</button></div>
${m==="page"&&html`<${Modal} title="Atualizar página" onClose=${()=>setM(null)}><form onSubmit=${addPage} class="stack"><${Field} id="pg" label=${"Página atual (de "+b.p+")"} type="number" min="0" max=${b.p} inputMode="numeric" value=${v.a} onChange=${x=>setV({...v,a:x.target.value})}/><button class="btn block">Salvar página</button><button type="button" class="btn ghost block" onClick=${()=>setM(null)}>Cancelar</button></form><//>`}
${m==="sess"&&html`<${Modal} title="Registrar sessão" onClose=${()=>setM(null)}><form onSubmit=${addSess} class="stack"><${Field} id="sp" label="Páginas lidas" type="number" min="0" inputMode="numeric" value=${v.a} onChange=${x=>setV({...v,a:x.target.value})}/><${Field} id="sm" label="Tempo de leitura (minutos)" type="number" min="0" inputMode="numeric" value=${v.b} onChange=${x=>setV({...v,b:x.target.value})}/><button class="btn block">Salvar sessão</button><button type="button" class="btn ghost block" onClick=${()=>setM(null)}>Cancelar</button></form><//>`}
${inv&&html`<${Modal} title="Livro salvo como Lido!" onClose=${()=>setInv(false)}><p class="mut">Quer dar uma nota e escrever uma opinião agora?</p><div class="row"><button class="btn ghost sp" onClick=${()=>setInv(false)}>Agora não</button><button class="btn sp" onClick=${()=>{setInv(false);nav("avaliar-"+id)}}>Avaliar</button></div><//>`}<//>`}

// Tela AVALIAR E RESENHAR: nota, tags, texto, citação e publicar na comunidade.
function Review({id}){const{data,upd,nav,say}=useC();const b=B[id],e=data.books[id];const d=data.drafts[id]||{};
const[r,setR]=useState(d.r??(e&&e.rating)??0);const[tg,setTg]=useState(d.tg??(e&&e.tags)??[]);const[tx,setTx]=useState(d.tx??(e&&e.review)??"");const[qt,setQt]=useState(d.qt??(e&&e.quote)??"");const[rec,setRec]=useState(d.rec??(e&&e.rec)??false);const[sp,setSp]=useState(d.sp??false);const[er,setEr]=useState("");
if(!b||!e)return html`<${Page} title="Avaliar & Resenhar" back="estante"><${Empty} icon="book" title="Adicione o livro primeiro" text="Para avaliar, o livro precisa estar na sua estante." cta="Ir para a estante" onCta=${()=>nav("estante")}/><//>`;
const words=tx.trim()?tx.trim().split(/\s+/).length:0;
const tog=t=>{if(tg.includes(t))setTg(tg.filter(x=>x!==t));else if(tg.length>=4)say("Você pode escolher até 4 tags.");else setTg([...tg,t])};
const draft=()=>{upd(n=>{n.drafts[id]={r,tg,tx,qt,rec,sp}});say("Rascunho salvo.")};
const pub=()=>{if(!r){setEr("Escolha uma nota de 1 a 5 estrelas para publicar.");return}if(tx.trim().length<10){setEr("Escreva sua resenha (mínimo de 10 caracteres) para publicar.");return}
upd(n=>{Object.assign(n.books[id],{rating:r,tags:tg,review:tx,quote:qt,rec,spoiler:sp,reviewedAt:new Date().toISOString()});delete n.drafts[id]});say("Resenha publicada na comunidade.");nav("comunidade")};
return html`<${Page} title="Avaliar & Resenhar" back=${"livro-"+id} right=${html`<button class="btn ghost sm" onClick=${draft}><${Ic} n="bookmark"/> Salvar rascunho</button>`}>
<section class="card bk"><${Cover} b=${b} w=72/><div class="sp"><span class="tag">${SL[e.status]}</span><h2>${b.t}</h2><p class="mut">${b.a}</p>${e.finished&&html`<p class="sm">Concluído em ${fd(e.finished)}</p>`}<p class="sm">${e.page} páginas lidas</p></div></section>
<section class="card" style=${{textAlign:"center"}}><h2 id="cl" style=${{fontSize:"1.2rem"}}>Sua classificação geral</h2><div class="stars" id="stars" role="radiogroup" aria-labelledby="cl" tabIndex="-1" style=${{margin:"10px 0"}}>${[1,2,3,4,5].map(n=>html`<button key=${n} role="radio" aria-checked=${r===n} aria-label=${n+(n>1?" estrelas":" estrela")+", "+RL[n]} class=${n<=r?"on":""} onClick=${()=>{setR(n);setEr("")}}><${Ic} n="star"/></button>`)}</div><p aria-live="polite" style=${{color:"var(--star)",fontWeight:700}}>${r?RL[r]+" "+r+"/5":"Toque em uma estrela"}</p>${er&&html`<p class="err" role="alert">${er}</p>`}</section>
<section class="card"><h2 id="tl">Sensações & vibe</h2><p class="sm mut">Selecione até 4 tags (${tg.length}/4)</p><div class="chips" role="group" aria-labelledby="tl">${TAGS.map(t=>html`<button key=${t} class="chip" aria-pressed=${tg.includes(t)} onClick=${()=>tog(t)}>${t}</button>`)}</div></section>
<section class="card"><h2><label htmlFor="rv">Sua resenha</label></h2><p class="sm mut" aria-live="polite">${words} palavras • ${tx.length}/500 caracteres</p><textarea id="rv" class="inp" style=${{marginTop:8}} maxLength="500" value=${tx} onChange=${x=>setTx(x.target.value)} placeholder="O que você achou do livro?"/><${Sw} on=${sp} set=${setSp} id="sw1" label="Esta resenha contém spoilers"/></section>
<section class="card"><h2 class="row"><${Ic} n="quote"/> <label htmlFor="qt">Citação marcante</label></h2><p class="sm mut">Opcional</p><textarea id="qt" class="inp" style=${{minHeight:80,marginTop:8}} maxLength="300" value=${qt} onChange=${x=>setQt(x.target.value)}/></section>
<section class="card"><${Sw} on=${rec} set=${setRec} id="sw2" label="Recomenda para amigos?" desc="Destaca em destaque no feed dos seus seguidores"/></section>
${er&&html`<p class="err" role="alert" style=${{marginBottom:10}}>${er}</p>`}<div class="stack"><button class="btn block" onClick=${pub}><${Ic} n="send"/> Publicar resenha</button><button class="btn ghost block" onClick=${()=>{upd(n=>{delete n.drafts[id]});nav("livro-"+id)}}>Descartar</button></div><//>`}

// Tela BUSCAR: pesquisa, categorias e recomendações.
function Search(){const{data,upd,nav,say}=useC();const[q,setQ]=useState("");const[cat,setCat]=useState("");const[fl,setFl]=useState(false);
const add=(id,st)=>{upd(n=>{if(!n.books[id])setSt(n,id,st)});say("“"+B[id].t+"” foi adicionado à estante.")};
const norm=s=>s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");
const res=(q||cat)?CAT.filter(b=>(!cat||b.cats.includes(cat))&&norm(b.t+" "+b.a+" "+b.g).includes(norm(q))):null;
const submit=e=>{e.preventDefault();const t=q.trim();if(t)upd(n=>{n.recent=[t,...n.recent.filter(x=>x!==t)].slice(0,6)})};
const seed=Object.keys(data.books).find(i=>data.books[i].status!=="quero");const sb=seed&&B[seed];
const rec=CAT.filter(b=>!data.books[b.id]&&(!sb||b.cats.some(c=>sb.cats.includes(c)))).slice(0,2);const wk=["b7","b8","b9"].map(i=>B[i]);
const Row=({b,label,btn})=>html`<article class="card bk" key=${b.id}><${Cover} b=${b} w=64/><div class="sp"><p class="sm" style=${{color:"var(--ok)",fontWeight:700}}>${b.g} • ★ ${String(b.r).replace(".",",")}</p><h3><button class="link" style=${{textDecoration:"none",color:"inherit",fontFamily:"inherit",fontSize:"inherit",textAlign:"left",padding:0}} onClick=${()=>nav("livro-"+b.id)}>${b.t}</button></h3><p class="mut sm">${b.a}</p>${data.books[b.id]?html`<p class="sm" style=${{marginTop:8,fontWeight:700}}>Na estante • ${SL[data.books[b.id].status]}</p>`:html`<button class="btn sm" style=${{marginTop:8}} onClick=${()=>add(b.id,"quero")}>${btn||"Adicionar à estante"}</button>`}</div></article>`;
return html`<${Page} title="Buscar & Descobrir"><p class="mut" style=${{marginTop:-10,marginBottom:14}}>Explore títulos e recomendações personalizadas.</p>
<form role="search" onSubmit=${submit}><div class="field"><label class="sr" htmlFor="q">Título, autor ou ISBN</label><input id="q" type="search" class="inp" placeholder="Título, autor ou ISBN" value=${q} onChange=${e=>setQ(e.target.value)} onInput=${e=>setQ(e.target.value)}/></div></form>
<div class="row between"><button class="link row" onClick=${()=>say("A leitura de código de barras precisa da câmera e não está disponível nesta versão. Busque pelo título ou autor.")}><${Ic} n="scan"/> Ler código de barras</button><button class="link row" aria-expanded=${fl} onClick=${()=>setFl(!fl)}><${Ic} n="filter"/> Filtros</button></div>
${fl&&html`<div class="chips" role="group" aria-label="Filtrar por categoria">${CATS.map(([c])=>html`<button key=${c} class="chip" aria-pressed=${cat===c} onClick=${()=>setCat(cat===c?"":c)}>${c}</button>`)}</div>`}
${res?html`<section aria-live="polite" aria-label="Resultados">${res.length?html`<div class="dl" style=${{marginTop:14}}>${res.map(b=>html`<${Row} b=${b} btn="Quero ler"/>`)}</div>`:html`<${Empty} icon="searchx" title="Nenhum resultado encontrado" text="Tente outro título, autor ou ISBN." cta="Limpar busca" onCta=${()=>{setQ("");setCat("")}}/>`}</section>`:html`<div>
${data.recent.length>0&&html`<section><div class="row between"><h2 style=${{fontSize:"1.1rem"}}>Buscas recentes</h2><button class="link" onClick=${()=>upd(n=>{n.recent=[]})}>Limpar</button></div><div class="chips">${data.recent.map(r=>html`<button key=${r} class="chip" onClick=${()=>setQ(r)}>${r}</button>`)}</div></section>`}
<h2 class="row" style=${{margin:"18px 0 10px"}}><${Ic} n="sparkle"/> ${sb?"Porque você leu "+sb.t:"Para começar"}</h2><div class="dl">${(rec.length?rec:CAT.filter(b=>!data.books[b.id]).slice(0,2)).map(b=>html`<${Row} b=${b} btn="Quero ler"/>`)}</div>
<h2 style=${{margin:"18px 0 10px"}}>Explorar categorias</h2><div class="cats">${CATS.map(([c,n])=>html`<button key=${c} onClick=${()=>setCat(c)}><span><b>${c}</b><br/><span class="sm mut">${n} obras</span></span></button>`)}</div>
<h2 style=${{margin:"18px 0 2px"}}>Recomendações da semana</h2><p class="sm mut" style=${{marginBottom:10}}>Atualizado hoje</p><div class="dl">${wk.map(b=>html`<${Row} b=${b}/>`)}</div></div>`}<//>`}

// Tela METAS DE LEITURA: tipo (livros/páginas/tempo), valor e período.
function Goals(){const{data,upd,nav,say}=useC();const st=stats(data);const g=data.goal||{type:"livros",value:20,period:"anual"};const[t,setT]=useState(g.type);const[v,setV]=useState(g.value);const[p,setP]=useState(g.period);
const Q={livros:[12,20,30,50],paginas:[3000,5000,8000,12000],tempo:[50,100,150,200]},U={livros:"livros",paginas:"páginas",tempo:"horas"};
const sug=Math.max(12,st.lidos+4);const step={livros:1,paginas:500,tempo:10}[t];const y=new Date().getFullYear();
const rate=p==="anual"?(t==="livros"?(v/12).toFixed(1).replace(".",",")+" livros/mês":Math.round(v/12)+" "+U[t]+"/mês"):v+" "+U[t]+" no mês";
return html`<${Page} title="Metas de leitura" back=${data.goal?"progresso":"estante"}><p class="cap" style=${{marginTop:-8}}>CONFIGURAÇÕES DE LEITURA</p>
<section class="card row"><${Ic} n="flag"/><div><h2>Metas para ${y}</h2><p class="mut">Estabeleça seus objetivos literários e acompanhe sua evolução sem pressão.</p></div></section>
<section class="card"><p class="cap">SUGESTÃO INTELIGENTE</p><p>Baseado no seu histórico, sugerimos ${sug} livros para um ritmo equilibrado.</p><div style=${{textAlign:"center",marginTop:8}}><button class="btn ghost sm" onClick=${()=>{setT("livros");setV(sug);say("Sugestão aplicada: "+sug+" livros.")}}>Aplicar</button></div></section>
<h2 id="tm" style=${{margin:"6px 0"}}>Tipo de meta</h2><div class="chips" role="group" aria-labelledby="tm">${[["livros","Livros"],["paginas","Páginas"],["tempo","Tempo"]].map(([k,l])=>html`<button key=${k} class="chip" aria-pressed=${t===k} onClick=${()=>{setT(k);setV(Q[k][1])}}>${l}</button>`)}</div>
<section class="card"><h2>Valor da meta</h2><div class="row" style=${{background:"var(--soft)",borderRadius:16,padding:8,margin:"10px 0"}}><button class="ib" aria-label="Diminuir" onClick=${()=>setV(Math.max(1,v-step))}><${Ic} n="minus"/></button><label class="sr" htmlFor="gv">Quantidade desejada em ${U[t]}</label><input id="gv" class="inp sp" style=${{textAlign:"center",fontSize:"1.8rem",border:0,background:"transparent",color:"var(--pri)",fontFamily:"var(--serif)"}} type="number" min="1" inputMode="numeric" value=${v} onChange=${e=>setV(Math.max(1,+e.target.value||1))}/><button class="ib" aria-label="Aumentar" onClick=${()=>setV(v+step)}><${Ic} n="plus"/></button></div><p class="sm mut">${U[t]} • Sugestões rápidas</p><div class="chips">${Q[t].map(n=>html`<button key=${n} class="chip" aria-pressed=${v===n} onClick=${()=>setV(n)}>${n}</button>`)}</div></section>
<section class="card"><div class="field" style=${{margin:0}}><label htmlFor="pp" style=${{fontSize:"1.2rem",fontFamily:"var(--serif)"}}>Período de avaliação</label><select id="pp" class="inp" value=${p} onChange=${e=>setP(e.target.value)}><option value="anual">Anual (${y})</option><option value="mensal">Mensal</option></select></div></section>
<div class="note" role="status"><${Ic} n="target"/><span>Ritmo recomendado: para alcançar ${v} ${U[t]}${p==="anual"?" no ano":" no mês"}, mantenha ${rate}.</span></div>
<div class="stack"><button class="btn block" onClick=${()=>{upd(n=>{n.goal={type:t,value:v,period:p}});say("Meta salva.");nav("progresso")}}><${Ic} n="check"/> Salvar meta</button><button class="btn ghost block" onClick=${()=>nav(data.goal?"progresso":"estante")}>Cancelar</button></div><//>`}

// Tela PROGRESSO: meta, estatísticas, gráfico por mês e última leitura.
function Progress(){const{data,nav,openBackup}=useC();const g=goalProg(data);const st=stats(data);const[h,setH]=useState(new Date().getMonth()<6?0:1);
if(!g)return html`<${Page} title="Progresso"><${Empty} icon="trophy" title="Você ainda não definiu uma meta" text="Defina uma meta de leitura e acompanhe seu progresso ao longo do ano." cta="Definir meta" ctaIcon="target" onCta=${()=>nav("metas")}/><//>`;
const y=new Date().getFullYear();const M=["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"].slice(h*6,h*6+6);
const done=Object.entries(data.books).filter(([i,b])=>b.status==="lido"&&b.finished&&new Date(b.finished).getFullYear()===y);
const cnt=M.map((m,k)=>done.filter(([i,b])=>new Date(b.finished).getMonth()===h*6+k).length);const mx=Math.max(...cnt);
const last=[...done].sort((a,b)=>new Date(b[1].finished)-new Date(a[1].finished))[0];
const doy=Math.ceil((new Date()-new Date(y,0,1))/864e5);const exp=data.goal.period==="anual"?data.goal.value*doy/365:data.goal.value;const ok=g.done>=Math.floor(exp);
return html`<${Page} title=${"Meu progresso • "+y} right=${html`<button class="btn ghost sm" onClick=${openBackup}>Exportar</button>`}>
<p class="mut" style=${{marginTop:-10,marginBottom:14}}>Metas e estatísticas anuais de leitura</p>
<div class="dl"><section class="card"><p class="cap">${g.label.toUpperCase()}</p><p style=${{font:"600 2.4rem var(--serif)"}}>${g.done}/${data.goal.value}</p><p style=${{color:"var(--ok)",fontWeight:700}}>${g.pct}% concluída</p><${Bar} v=${g.pct} l=${g.label}/><p class="sm">${g.pct>=100?"Meta alcançada!":"Faltam "+(data.goal.value-g.done)+" "+g.unit+" para sua meta"} • Alvo: ${data.goal.value} ${g.unit}</p><div style=${{textAlign:"center",marginTop:10}}><button class="btn ghost sm" onClick=${()=>nav("metas")}>Editar meta</button></div></section>
<div><div class="note" role="status"><${Ic} n="check"/><span>${ok?"Ritmo excelente!":"Dá para acelerar."}<br/><span class="sm" style=${{fontWeight:400}}>${ok?"Você está no caminho certo para concluir sua meta.":"Que tal registrar uma sessão de leitura hoje?"}</span></span></div>
<div class="stats"><div class="stat"><b>${st.lidos}</b><span>Livros lidos</span></div><div class="stat"><b>${st.pags.toLocaleString("pt-BR")}</b><span>Páginas</span></div><div class="stat"><b>${st.h}h</b><span>Leitura</span></div></div></div></div>
<section class="card"><div class="row between"><h2>Livros por mês</h2><button class="chip" onClick=${()=>setH(1-h)} aria-label=${"Mostrando "+(h?"Jul a Dez":"Jan a Jun")+". Alternar semestre"}>${h?"Jul – Dez":"Jan – Jun"}</button></div><p class="sm mut" style=${{margin:"4px 0 10px"}}>Distribuição de leitura no ${h+1}º semestre</p>
<div class="chart" role="img" aria-label=${"Livros concluídos por mês: "+M.map((m,k)=>m+" "+cnt[k]).join(", ")}>${M.map((m,k)=>html`<div class=${"col"+(mx>0&&cnt[k]===mx?" hi":"")} key=${m}><span>${cnt[k]}</span><i style=${{height:(mx?cnt[k]/mx*78:2)+"%",minHeight:3}}/><span class="sm" style=${{fontWeight:600}}>${m}</span></div>`)}</div><p class="sm mut" style=${{marginTop:8}}>Roxo: meses regulares • Verde: destaque do mês</p></section>
${last&&html`<section class="card"><p class="cap">ÚLTIMA LEITURA CONCLUÍDA</p><div class="bk" style=${{marginTop:8}}><${Cover} b=${B[last[0]]} w=64/><div class="sp"><span class="tag">Finalizado</span><h3>${B[last[0]].t}</h3><p class="mut sm">${B[last[0]].a}</p>${last[1].rating&&html`<p style=${{color:"var(--star)",fontWeight:700}}>${"★".repeat(last[1].rating)} ${last[1].rating},0 estrelas</p>`}</div></div></section>`}<//>`}

// Tela SINCRONIZAR KINDLE: desconectado, conectado e erro de sincronização (simulação local).
function Kindle(){const{data,upd,nav,say}=useC();const k=data.kindle;const[err,setErr]=useState(false);const[m,setM]=useState(false);const[em,setEm]=useState("");
const st=stats(data);const sy=()=>{if(!navigator.onLine){setErr(true);return}setErr(false);upd(n=>{n.kindle.last=new Date().toISOString()});say("Sincronização concluída.")};
const T=(l,key,d)=>html`<${Sw} on=${k[key]!==false} set=${v=>upd(n=>{n.kindle[key]=v})} id=${"k"+key} label=${l} desc=${d}/>`;
if(err)return html`<${Page} title="Sincronização" back="perfil"><section class="card" style=${{textAlign:"center",display:"grid",gap:10,justifyItems:"center"}}><${Ic} n="cloudoff"/><h2>Não foi possível sincronizar</h2><p class="mut">Verifique sua conexão com a internet e tente novamente.</p><p class="sm mut">Seus livros e registros não foram perdidos.${k.last?" Última sincronização: "+fd(k.last,{day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"})+".":""}</p></section><div class="stack"><button class="btn block" onClick=${sy}><${Ic} n="sync"/> Tentar novamente</button><button class="btn ghost block" onClick=${()=>nav("perfil")}>Voltar para configurações</button></div><//>`;
if(!k.on)return html`<${Page} title="Sincronizar Kindle" back="perfil"><section class="card row between"><div><h2>Status da conta</h2><p class="mut">Nenhuma conta conectada</p></div><${Ic} n="cloudoff"/></section>
<section class="card"><div class="row"><${Ic} n="phone"/><div><h2>Conectar conta Amazon</h2><p class="mut sm">Importe automaticamente seu progresso de leitura do Kindle.</p></div></div><button class="btn block" style=${{marginTop:12}} onClick=${()=>{setEm("");setM(true)}}>Conectar</button></section>
<section class="card" style=${{background:"var(--soft)"}}><h3>Por que conectar?</h3><ul style=${{paddingLeft:20,margin:"8px 0 0"}}><li>Importe livros e progresso automaticamente</li><li>Sincronize destaques e notas</li><li>Acompanhe tudo em um só lugar</li></ul></section>
${m&&html`<${Modal} title="Conectar conta Amazon" onClose=${()=>setM(false)}><form class="stack" onSubmit=${e=>{e.preventDefault();if(!/^\S+@\S+\.\S+$/.test(em))return;upd(n=>{n.kindle={on:true,email:em.trim(),last:new Date().toISOString()}});setM(false);say("Conta Amazon conectada.")}}><p class="sm mut">Informe o e-mail da sua conta Amazon. Nenhuma senha é guardada.</p><${Field} id="ke" label="E-mail da conta Amazon" type="email" value=${em} onChange=${e=>setEm(e.target.value)} required/><button class="btn block">Conectar</button><button type="button" class="btn ghost block" onClick=${()=>setM(false)}>Cancelar</button></form><//>`}<//>`;
return html`<${Page} title="Sincronizar Kindle" back="perfil"><p class="cap" style=${{color:"var(--ok)",marginTop:-8}}>CONEXÃO ATIVA</p>
<div class="note" role="status"><${Ic} n="check"/><span>Conta conectada<br/><span class="sm" style=${{fontWeight:400}}>Última sincronização: ${fd(k.last,{day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"})}</span></span></div>
<section class="card"><p class="cap">CONTA AMAZON CONECTADA</p><div class="row between"><h2 style=${{fontSize:"1.2rem",wordBreak:"break-all"}}>${k.email}</h2><${Ic} n="shield"/></div></section>
<button class="btn block" onClick=${sy}><${Ic} n="sync"/> Sincronizar agora</button>
<h2 style=${{margin:"20px 0 10px"}}>Estatísticas</h2><div class="stats"><div class="stat"><b>${Object.keys(data.books).length}</b><span>Livros</span></div><div class="stat"><b>${Object.values(data.books).filter(b=>b.quote).length}</b><span>Destaques</span></div><div class="stat"><b>${Object.values(data.books).filter(b=>b.review).length}</b><span>Notas</span></div></div>
<h2 style=${{margin:"20px 0 10px"}}>Preferências de dados</h2><section class="card">${T("Importar novos livros automaticamente","auto","Adiciona aquisições recentes à biblioteca")}${T("Sincronizar progresso de páginas","prog","Mantém as páginas atualizadas")}${T("Importar notas e destaques","notes","Copia citações marcadas no e-reader")}</section>
<section class="card" style=${{background:"var(--soft)"}}><h3 class="row"><${Ic} n="lock"/> Privacidade</h3><p class="sm" style=${{marginTop:6}}>Seus dados ficam salvos neste navegador. Nenhuma senha da Amazon é armazenada.</p></section>
<button class="btn danger block" onClick=${()=>{upd(n=>{n.kindle={on:false}});say("Conta desconectada. Seus dados continuam salvos.")}}><${Ic} n="out"/> Desconectar conta Amazon</button><p class="sm mut" style=${{textAlign:"center",marginTop:12}}>Ao desconectar, seus dados locais permanecerão salvos na biblioteca.</p><//>`}

// Textos das janelas de Perguntas frequentes, Fale conosco e Termos.
const INFO={faq:["Perguntas frequentes",["Meus dados ficam salvos? Sim, neste navegador e neste aparelho, mesmo depois de sair da conta. Use o backup do perfil para guardar uma cópia ou levar para outro aparelho.","Como defino uma meta? Em Progresso, toque em Definir meta.","Como avalio um livro? Marque o livro como Lido e toque em Avaliar."]],contato:["Fale conosco",["Envie sua dúvida ou sugestão para suporte@minhaestante.app. Respondemos em até 2 dias úteis."]],termos:["Termos de Uso e Privacidade",["Seus dados de leitura são guardados apenas neste navegador e não são enviados a terceiros.","Você pode apagar tudo a qualquer momento limpando os dados do navegador."]]};
// Tela PERFIL E AJUSTES: dados, conquistas, histórico, Kindle e preferências.
function Profile(){const{data,upd,nav,user,logout,say,openBackup,setName}=useC();const st=stats(data);const[m,setM]=useState(null);const[nm,setNm]=useState(user.name);
const hist=Object.entries(data.books).filter(([i,b])=>b.status==="lido").sort((a,b)=>new Date(b[1].finished)-new Date(a[1].finished));
const days=new Set(data.sessions.map(s=>s.date.slice(0,10)));let streak=0;for(let d=new Date();days.has(d.toISOString().slice(0,10));d.setDate(d.getDate()-1))streak++;
const ach=[];if(streak>=2)ach.push(["flame","Consistente",streak+" dias seguidos lendo"]);if(st.pags>=4000)ach.push(["bolt","Devorador","Mais de 4.000 páginas"]);if(Object.values(data.books).filter(b=>b.review).length>=10)ach.push(["msg","Voz Literária","10+ resenhas publicadas"]);if(st.lidos>=1)ach.push(["trophy","Primeira leitura","Você concluiu um livro"]);
const share=async()=>{try{if(navigator.share){await navigator.share({title:"Minha Estante",text:"Estou lendo com a Minha Estante."});return}}catch(e){return}say("O compartilhamento não está disponível neste navegador.")};
const sh=(k,l,d)=>html`<${Sw} on=${data.prefs[k]} set=${v=>upd(n=>{n.prefs[k]=v})} id=${"p"+k} label=${l} desc=${d}/>`;
return html`<${Page} title="Perfil & Ajustes" right=${html`<button class="ib" aria-label="Compartilhar" onClick=${share}><${Ic} n="share"/></button>`}><p class="cap" style=${{marginTop:-8}}>MINHA CONTA</p>
<section class="card row"><div aria-hidden="true" style=${{width:68,height:68,borderRadius:"50%",background:"var(--soft)",color:"var(--pri)",display:"grid",placeItems:"center",font:"600 2rem var(--serif)",flex:"none"}}>${user.name[0].toUpperCase()}</div><div class="sp"><h2>${user.name}</h2><p class="sm" style=${{wordBreak:"break-all"}}>${user.email}</p><p class="sm mut">Membro desde ${fd(user.since,{month:"long",year:"numeric"})}</p><button class="btn ghost sm" style=${{marginTop:8}} onClick=${()=>{setNm(user.name);setM("edit")}}>Editar perfil</button></div></section>
<div class="stats"><div class="stat"><b>${st.lidos}</b><span>Livros lidos</span></div><div class="stat"><b>${st.pags.toLocaleString("pt-BR")}</b><span>Páginas</span></div><div class="stat"><b>${st.h}h</b><span>Leitura</span></div></div>
<div class="dl"><div><h2 class="cap" style=${{fontFamily:"var(--sans)",margin:"8px 0"}}>ÚLTIMAS CONQUISTAS</h2><section class="card">${ach.length?ach.map(([i,t,d])=>html`<div class="row pad" key=${t}><${Ic} n=${i}/><div><b>${t}</b><p class="sm mut">${d}</p></div></div>`):html`<div class="row"><${Ic} n="trophy"/><div><b>Nenhuma conquista ainda</b><p class="sm mut">Comece a ler para desbloquear conquistas!</p></div></div>`}</section>
<h2 class="cap" style=${{fontFamily:"var(--sans)",margin:"8px 0"}}>HISTÓRICO DE LEITURA</h2><section class="card">${hist.length?hist.slice(0,4).map(([i,b])=>html`<button class="item" key=${i} onClick=${()=>nav("livro-"+i)}><${Cover} b=${B[i]} w=40/><span><b>${B[i].t}</b><br/><span class="sm mut">${B[i].a} • ${B[i].p}p</span><br/><span class="sm" style=${{color:"var(--ok)"}}>Finalizado em ${fd(b.finished)}</span></span></button>`):html`<div class="row"><${Ic} n="book"/><div><b>Nenhum livro no histórico</b><p class="sm mut">Seus livros lidos aparecerão aqui.</p></div></div>`}</section></div>
<div><h2 class="cap" style=${{fontFamily:"var(--sans)",margin:"8px 0"}}>DISPOSITIVOS & INTEGRAÇÕES</h2><section class="card row between"><div class="row"><${Ic} n="phone"/><div><b>Amazon Kindle</b><p class="sm" style=${{color:data.kindle.on?"var(--ok)":"var(--mut)"}}>${data.kindle.on?"Conectado":"Não conectado"}</p></div></div><button class="btn ghost sm" onClick=${()=>nav("kindle")}>${data.kindle.on?"Gerenciar":"Conectar"}</button></section>
<h2 class="cap" style=${{fontFamily:"var(--sans)",margin:"8px 0"}}>PREFERÊNCIAS DE LEITURA & APP</h2><section class="card">${sh("reminder","Lembrete diário de leitura","Notificação diária às 20:00 (requer permissão do navegador)")}${sh("pub","Perfil e resenhas públicas","Visível na aba de descoberta da comunidade")}</section>
<h2 class="cap" style=${{fontFamily:"var(--sans)",margin:"8px 0"}}>CONTA & SUPORTE</h2><section class="card">${[["faq","Perguntas frequentes"],["contato","Fale conosco"],["termos","Termos de Uso e Privacidade"]].map(([k,l])=>html`<button class="item row between" key=${k} onClick=${()=>setM(k)}><span>${l}</span><${Ic} n="chev"/></button>`)}<button class="item row between" onClick=${openBackup}><span>Backup dos dados</span><${Ic} n="chev"/></button><div class="row between pad" style=${{borderTop:"1px solid var(--line)"}}><span>Versão do app</span><span class="mut">v1.4.2</span></div></section></div></div>
<button class="btn danger block" onClick=${logout}><${Ic} n="out"/> Sair da conta</button>
${m==="edit"&&html`<${Modal} title="Editar perfil" onClose=${()=>setM(null)}><form class="stack" onSubmit=${e=>{e.preventDefault();if(nm.trim().length<2)return;setName(nm.trim());setM(null);say("Perfil atualizado.")}}><${Field} id="en" label="Nome completo" value=${nm} onChange=${e=>setNm(e.target.value)}/><button class="btn block">Salvar</button><button type="button" class="btn ghost block" onClick=${()=>setM(null)}>Cancelar</button></form><//>`}
${INFO[m]&&html`<${Modal} title=${INFO[m][0]} onClose=${()=>setM(null)}>${INFO[m][1].map(t=>html`<p key=${t}>${t}</p>`)}<button class="btn block" onClick=${()=>setM(null)}>Fechar</button><//>`}<//>`}

// Janela de BACKUP: copia/restaura todas as contas e dados salvos no navegador.
function Backup({onClose}){const{say,setUsers,data}=useC();const mk=()=>{const o={v:1,users:ls.get(K.u,{}),data:{}};Object.keys(o.users).forEach(e=>{o.data[e]=ls.get(K.d(e),emptyData())});return JSON.stringify(o)};const[t,setT]=useState(mk);
const copy=async()=>{try{await navigator.clipboard.writeText(t);say("Backup copiado.")}catch(e){say("Não foi possível copiar. Selecione o texto e copie manualmente.")}};
const rest=()=>{try{const o=JSON.parse(t);if(!o.users||!o.data)throw 0;const u={...ls.get(K.u,{}),...o.users};ls.set(K.u,u);Object.keys(o.data).forEach(e=>ls.set(K.d(e),o.data[e]));say("Backup restaurado. Recarregando…");setTimeout(()=>location.reload(),900)}catch(e){say("Backup inválido. Cole o texto completo copiado antes.")}};
return html`<${Modal} title="Backup dos dados" onClose=${onClose}><p class="sm mut">Copie e guarde este texto para levar suas contas e livros para outro aparelho. Para restaurar, cole o texto aqui e toque em Restaurar.</p><label class="sr" htmlFor="bk">Texto do backup</label><textarea id="bk" class="inp" value=${t} onChange=${e=>setT(e.target.value)}/><button class="btn block" onClick=${copy}>Copiar backup</button><button class="btn ghost block" onClick=${rest}>Restaurar</button><button class="link" onClick=${onClose}>Fechar</button><//>`}

// ======================================================================
// 7. COMUNIDADE (REDE SOCIAL)
//    Início, feed de resenhas, curtir, comentar e seguir leitores.
//    Os leitores e resenhas de exemplo ficam abaixo; curtidas e comentários ficam salvos no navegador.
// ======================================================================
// Leitores de exemplo da comunidade.
const USERS={u1:{n:"Maria Clara",h:"@mariaclara",bio:"Leio de tudo, mas amo clássicos brasileiros.",c:"#B5651D",f:1240},u2:{n:"Julia S.",h:"@juliaslivros",bio:"Distopias, café e muitas anotações.",c:"#2F6B5E",f:860},u3:{n:"Rafael Lima",h:"@rafalima",bio:"Fantasia, ficção científica e RPG.",c:"#4F5FA8",f:410},u4:{n:"Beatriz Alves",h:"@beaalves",bio:"Romances que doem e fazem bem.",c:"#A8426B",f:2310}};
// Resenhas de exemplo (u=autor, b=livro, r=nota, l=curtidas, cm=comentários).
const POSTS=[{id:"p1",u:"u1",b:"b1",r:5,t:"A dúvida de Bentinho me acompanhou por dias. Machado escreve com ironia e deixa o leitor sozinho com a pergunta. Cada releitura muda minha opinião.",tg:["Atemporal","Reflexivo"],l:342,d:"2026-11-10",cm:[["u3","Concordo, mudo de lado a cada leitura!"]]},{id:"p2",u:"u2",b:"b2",r:5,t:"Leitura densa e assustadoramente atual. Orwell mostra o que acontece quando a verdade passa a ser controlada. Deixa uma inquietude que dura muito depois da última página.",tg:["Distopia","Essencial"],l:198,d:"2026-11-08",cm:[]},{id:"p3",u:"u3",b:"b3",r:4,t:"Aventura gostosa do começo ao fim. Bilbo é um herói improvável e isso faz toda a diferença. Ótimo para quem quer começar em fantasia.",tg:["Emocionante","Divertido"],l:87,d:"2026-11-05",cm:[]},{id:"p4",u:"u4",b:"b8",r:5,t:"Torto Arado é sobre terra, voz e pertencimento. A força das duas irmãs me emocionou. Um livro para ler devagar.",tg:["Impactante","Emocionante"],l:256,d:"2026-11-02",cm:[["u1","Um dos melhores que li este ano."]]},{id:"p5",u:"u2",b:"b9",r:4,t:"Fahrenheit 451 envelheceu muito bem. Ritmo rápido e uma ideia que arrepia: o perigo de parar de pensar.",tg:["Ritmo rápido","Distopia"],l:64,d:"2026-10-28",cm:[]}];
// Devolve os dados do autor (você ou um leitor de exemplo).
const au=(u,me)=>u==="me"?{n:me.name,h:"@"+me.email.split("@")[0],c:"#6D3FC0"}:USERS[u];
// Bolinha colorida com a inicial do nome.
const Av=({a,s=48})=>html`<span class="av" aria-hidden="true" style=${{width:s,height:s,background:a.c,fontSize:s/2.4+"px"}}>${a.n[0]}</span>`;
// Uma resenha do feed: autor, livro, nota, texto, curtir, comentar e seguir.
function Post({p}){const{data,upd,nav,user,say}=useC();const a=au(p.u,user),b=B[p.b];const liked=!!(data.likes||{})[p.id];const fol=!!(data.fol||{})[p.u];const my=(data.cm||{})[p.id]||[];const[open,setOpen]=useState(false);const[tx,setTx]=useState("");
const all=[...p.cm.map(([u,t])=>({u,t})),...my.map(c=>({u:"me",t:c.t}))];const nl=p.l+(liked?1:0);
return html`<article class="card post" aria-label=${"Resenha de "+a.n+" sobre "+b.t}><div class="row"><button class="avb" aria-label=${"Ver perfil de "+a.n} onClick=${()=>nav(p.u==="me"?"perfil":"leitor-"+p.u)}><${Av} a=${a}/></button><div class="sp"><b>${a.n}</b><p class="sm mut">${a.h} • ${fd(p.d,{day:"numeric",month:"short"})}</p></div>${p.u!=="me"&&html`<button class="btn ghost sm" aria-pressed=${fol} aria-label=${(fol?"Deixar de seguir ":"Seguir ")+a.n} onClick=${()=>{upd(n=>{n.fol=n.fol||{};n.fol[p.u]=!n.fol[p.u]});say(fol?"Você deixou de seguir "+a.n+".":"Você agora segue "+a.n+".")}}>${fol?"Seguindo":"Seguir"}</button>`}</div>
<div class="bk" style=${{margin:"14px 0"}}><${Cover} b=${b} w=64/><div class="sp"><h3><button class="link" style=${{textDecoration:"none",color:"inherit",fontFamily:"inherit",fontSize:"inherit",textAlign:"left",padding:0}} onClick=${()=>nav("livro-"+b.id)}>${b.t}</button></h3><p class="sm mut">${b.a}</p><p class="starl" aria-hidden="true">${"★".repeat(p.r)+"☆".repeat(5-p.r)}</p><span class="sr">Nota ${p.r} de 5</span><div class="chips" style=${{margin:"4px 0 0"}}>${p.tg.map(t=>html`<span class="tag" key=${t}>${t}</span>`)}</div></div></div>
<p>${p.t}</p><div class="row" style=${{marginTop:12}}><button class=${"act"+(liked?" liked":"")} aria-pressed=${liked} aria-label=${(liked?"Descurtir":"Curtir")+" resenha, "+nl+" curtidas"} onClick=${()=>upd(n=>{n.likes=n.likes||{};n.likes[p.id]=!n.likes[p.id]})}><${Ic} n="heart"/>${nl}</button><button class="act" aria-expanded=${open} aria-label=${"Comentários, "+all.length} onClick=${()=>setOpen(!open)}><${Ic} n="msg"/>${all.length}</button></div>
${open&&html`<div>${all.map((c,i)=>html`<div class="cm" key=${i}><b class="sm">${au(c.u,user).n}</b><p>${c.t}</p></div>`)}<form class="row" style=${{marginTop:10}} onSubmit=${e=>{e.preventDefault();if(!tx.trim())return;upd(n=>{n.cm=n.cm||{};(n.cm[p.id]=n.cm[p.id]||[]).push({t:tx.trim()})});setTx("");say("Comentário publicado.")}}><label class="sr" htmlFor=${"c"+p.id}>Escreva um comentário</label><input id=${"c"+p.id} class="inp sp" maxLength="200" placeholder="Escreva um comentário…" value=${tx} onChange=${e=>setTx(e.target.value)}/><button class="btn sm">Enviar</button></form></div>`}</article>`}
// Tela INÍCIO: saudação, frase, "Continue lendo" e "Novidades para você".
function Home(){const{data,nav,user}=useC();const first=user.name.split(" ")[0];const cur=Object.keys(data.books).filter(i=>data.books[i].status==="lendo").slice(0,2);const nov=CAT.filter(b=>!data.books[b.id]).slice(0,8);
return html`<${Page} title=${"Olá, "+first+"! ♡"}><p class="mut" style=${{marginTop:-10,marginBottom:14}}>Que bom te ver por aqui!</p><button class="srch" onClick=${()=>nav("buscar")}><${Ic} n="search"/> Buscar livros, autores, gêneros…</button>
<section class="quoteb" aria-label="Frase do dia"><p>“Livros são sonhos que seguramos nas mãos.” ♡</p></section>
<div class="row between"><h2>Continue lendo</h2><button class="link" onClick=${()=>nav("estante")}>Ver todos</button></div>
${cur.length?cur.map(i=>{const e=data.books[i],b=B[i];return html`<article class="card bk" key=${i} style=${{marginTop:10}}><${Cover} b=${b} w=64/><div class="sp"><h3><button class="link" style=${{textDecoration:"none",color:"inherit",fontFamily:"inherit",fontSize:"inherit",textAlign:"left",padding:0}} onClick=${()=>nav("livro-"+i)}>${b.t}</button></h3><p class="sm mut">${b.a}</p><p class="sm" style=${{color:"var(--ok)",fontWeight:700}}>Pág. ${e.page} de ${b.p}</p><${Bar} v=${Math.round(e.page/b.p*100)} l=${"Progresso em "+b.t}/></div></article>`}):html`<section class="card row between" style=${{marginTop:10}}><span>Você não está lendo nada agora.</span><button class="btn sm" onClick=${()=>nav("buscar")}>Escolher livro</button></section>`}
<h2 style=${{margin:"18px 0 4px"}}>Novidades para você</h2><div class="hs">${nov.map(b=>html`<button class="hsi" key=${b.id} aria-label=${b.t+", "+b.a} onClick=${()=>nav("livro-"+b.id)}><${Cover} b=${b} w=104/><b class="sm">${b.t}</b><span class="sm mut">${b.a}</span></button>`)}</div><//>`}
// Tela COMUNIDADE: lista de resenhas (Para você / Seguindo) e botão de escrever resenha.
function Feed(){const{data,upd,nav,say,user}=useC();const[tab,setTab]=useState("todos");const[m,setM]=useState(false);const fol=data.fol||{};
const mine=Object.entries(data.books).filter(([i,b])=>b.review&&b.reviewedAt).map(([i,b])=>({id:"m-"+i,u:"me",b:i,r:b.rating||0,t:b.review,tg:b.tags||[],l:0,d:b.reviewedAt,cm:[]}));
const ps=[...mine,...POSTS].sort((a,b)=>new Date(b.d)-new Date(a.d)).filter(p=>tab==="todos"||fol[p.u]||p.u==="me");const lidos=Object.keys(data.books).filter(i=>data.books[i].status==="lido");
return html`<${Page} title="Comunidade" right=${html`<button class="btn sm" onClick=${()=>setM(true)}>Escrever resenha</button>`}><p class="sm mut" style=${{marginTop:-10}}>Resenhas de leitores. Os perfis desta tela são de exemplo.</p>
<div class="chips" role="group" aria-label="Filtrar feed"><button class="chip" aria-pressed=${tab==="todos"} onClick=${()=>setTab("todos")}>Para você</button><button class="chip" aria-pressed=${tab==="seg"} onClick=${()=>setTab("seg")}>Seguindo</button></div>
${tab==="todos"&&html`<section class="card" aria-label="Quem seguir"><h2 style=${{fontSize:"1.2rem",marginBottom:8}}>Quem seguir</h2><div class="chips">${Object.entries(USERS).map(([k,u])=>html`<button class="chip row" key=${k} onClick=${()=>nav("leitor-"+k)} aria-label=${"Ver perfil de "+u.n}><${Av} a=${u} s=${28}/> ${u.n}</button>`)}</div></section>`}
<div aria-live="polite">${ps.length?ps.map(p=>html`<${Post} p=${p} key=${p.id}/>`):html`<${Empty} icon="users" title="Você ainda não segue ninguém" text="Siga leitores para ver as resenhas deles aqui." cta="Ver todos" onCta=${()=>setTab("todos")}/>`}</div>
${m&&html`<${Modal} title="Qual livro você quer resenhar?" onClose=${()=>setM(false)}><p class="sm mut">Livros que ainda não estão na estante serão marcados como Lidos.</p>${CAT.map(b=>html`<button key=${b.id} class="btn ghost block" onClick=${()=>{setM(false);upd(n=>{if(!n.books[b.id])setSt(n,b.id,"lido")});nav("avaliar-"+b.id)}}>${b.t}</button>`)}<button class="link" onClick=${()=>setM(false)}>Cancelar</button><//>`}<//>`}
// Perfil de outro leitor: seguidores, resenhas e botão seguir.
function Reader({id}){const{data,upd,nav,say}=useC();const a=USERS[id];if(!a)return html`<${Page} title="Perfil não encontrado" back="comunidade"><${Empty} icon="user" title="Não encontramos este perfil" text="Volte para a comunidade." cta="Ir para a comunidade" onCta=${()=>nav("comunidade")}/><//>`;
const fol=!!(data.fol||{})[id];const ps=POSTS.filter(p=>p.u===id);
return html`<${Page} title=${a.n} back="comunidade"><section class="card" style=${{textAlign:"center",display:"grid",justifyItems:"center",gap:8}}><${Av} a=${a} s=${88}/><p class="mut">${a.h}</p><p>${a.bio}</p><div class="row"><span><b>${(a.f+(fol?1:0)).toLocaleString("pt-BR")}</b> seguidores</span><span><b>${ps.length}</b> resenhas</span></div><button class="btn" aria-pressed=${fol} onClick=${()=>{upd(n=>{n.fol=n.fol||{};n.fol[id]=!n.fol[id]});say(fol?"Você deixou de seguir "+a.n+".":"Você agora segue "+a.n+".")}}>${fol?"Seguindo":"Seguir"}</button></section>${ps.map(p=>html`<${Post} p=${p} key=${p.id}/>`)}<//>`}
// Lê o conteúdo da tela em voz alta (Web Speech API do navegador).
// Dica: o navegador precisa ter uma voz instalada e o volume do aparelho ligado.
function falar(say){
  const s=window.speechSynthesis;
  if(!s||typeof SpeechSynthesisUtterance==="undefined"){say("Este navegador não tem leitura em voz alta. Tente o Chrome, Edge ou Safari.");return}
  const el=document.getElementById("conteudo");
  const texto=(el?el.innerText:document.body.innerText).replace(/\s+/g," ").trim();
  if(!texto){say("Não há texto para ler nesta tela.");return}
  // Divide em frases curtas: alguns navegadores cortam falas muito longas.
  const partes=(texto.match(/[^.!?]+[.!?]*/g)||[texto]).flatMap(f=>f.length>180?(f.match(/.{1,180}(\s|$)/g)||[f]):[f]);
  const escolherVoz=()=>{const v=s.getVoices();return v.find(x=>/pt[-_]BR/i.test(x.lang))||v.find(x=>/^pt/i.test(x.lang))||null};
  let i=0,comecou=false;
  const proxima=()=>{                       // fala uma frase e, ao terminar, chama a próxima
    if(i>=partes.length)return;
    const u=new SpeechSynthesisUtterance(partes[i++].trim());
    u.lang="pt-BR";const v=escolherVoz();if(v)u.voice=v;
    u.onstart=()=>{comecou=true};
    u.onend=proxima;
    u.onerror=ev=>{if(ev.error!=="interrupted"&&ev.error!=="canceled")say("Não foi possível reproduzir o áudio ("+ev.error+"). Verifique o volume e as permissões do navegador.")};
    s.speak(u);
  };
  s.cancel();s.resume();
  setTimeout(proxima,200);                  // pequena pausa depois do cancel (evita falha no Chrome)
  setTimeout(()=>{if(!comecou&&!s.speaking)say("O áudio não iniciou. Verifique o volume, se o navegador tem uma voz em português e se o site pode tocar som.")},3000);
  say("Lendo a tela em voz alta…");
}
// Para a leitura em voz alta.
function pararFala(){try{window.speechSynthesis.cancel()}catch(e){}}

// ======================================================================
// 8. ACESSIBILIDADE
//    Painel do botão redondo (canto superior direito) e leitura em voz alta.
// ======================================================================
// Painel de acessibilidade: texto maior, contraste, dislexia, espaço, animações, vibração e voz.
function A11y({a,set,onClose}){const{say}=useC();const sw=(k,l,d)=>html`<${Sw} on=${a[k]} set=${v=>set({...a,[k]:v})} id=${"a"+k} label=${l} desc=${d}/>`;
const speak=()=>falar(say);
return html`<${Modal} title="Acessibilidade" onClose=${onClose}><div class="row between"><span id="fsl">Tamanho do texto: ${["Normal","Grande","Maior","Máximo"][a.fs]}</span><span class="row"><button class="btn ghost sm" aria-label="Diminuir texto" disabled=${a.fs===0} onClick=${()=>set({...a,fs:a.fs-1})}>A−</button><button class="btn ghost sm" aria-label="Aumentar texto" disabled=${a.fs===3} onClick=${()=>set({...a,fs:a.fs+1})}>A+</button></span></div>
${sw("hc","Alto contraste","Fundo preto e cores fortes, para baixa visão")}${sw("dys","Fonte para dislexia","Letras mais fáceis de distinguir")}${sw("sp","Mais espaço no texto","Aumenta o espaço entre letras, palavras e linhas")}${sw("rm","Reduzir animações","Remove movimentos e transições")}${sw("vib","Vibrar nos avisos","No celular, avisos também vibram. Útil para surdez")}
<div class="row"><button class="btn ghost sp" onClick=${speak}><${Ic} n="volume"/> Ler esta tela</button><button class="btn ghost sp" onClick=${pararFala}>Parar leitura</button></div>
<p class="sm mut">Este site não usa sons nem vídeos: todos os avisos aparecem em texto. Funciona com leitores de tela (NVDA, VoiceOver, TalkBack) e só com teclado: Tab navega, Enter ativa e Esc fecha janelas.</p>
<button class="btn ghost block" onClick=${()=>set({fs:0,hc:false,dys:false,sp:false,rm:false,vib:true})}>Restaurar padrão</button><button class="btn block" onClick=${onClose}>Fechar</button><//>`}
// ======================================================================
// 9. APP PRINCIPAL
//    Rotas (telas), estado geral, login/cadastro e início do app.
// ======================================================================
// Itens do menu: [rota, nome, ícone].
const TABS=[["inicio","Início","home"],["estante","Biblioteca","book"],["progresso","Progresso","chart"],["buscar","Buscar","search"],["comunidade","Comunidade","users"],["perfil","Perfil","user"]];
// Rotas que podem ser vistas sem estar logado.
const PUB=["","entrar","cadastro"];
// Componente principal: decide qual tela mostrar e guarda o estado geral.
function App(){
  // Estado: rota atual (vem do # da URL), e-mail logado, contas, dados do usuário, aviso (toast).
const[route,setRoute]=useState(()=>location.hash.slice(1));const[email,setEmail]=useState(getSess);const[users,setUsers0]=useState(()=>ls.get(K.u,{}));
const[data,setData]=useState(()=>{const e=getSess();return e?ls.get(K.d(e),emptyData()):emptyData()});const[toast,setToast]=useState("");const[bk,setBk]=useState(false);const[ac,setAc]=useState(false);const[a,setA]=useState(()=>({fs:0,hc:false,dys:false,sp:false,rm:false,vib:true,...ls.get("me:a11y",{})}));
  // Aplica as opções de acessibilidade: tamanho da fonte e atributos data-* lidos pelo CSS.
useEffect(()=>{const r=document.documentElement;r.style.fontSize=[100,115,130,150][a.fs]+"%";["hc","dys","sp","rm"].forEach(k=>r.setAttribute("data-"+k,a[k]?"on":"off"));window.__vib=a.vib;ls.set("me:a11y",a)},[a]);
  // Escuta mudanças no # da URL para trocar de tela.
useEffect(()=>{const f=()=>setRoute(location.hash.slice(1));addEventListener("hashchange",f);try{navigator.storage&&navigator.storage.persist&&navigator.storage.persist()}catch(e){}return()=>removeEventListener("hashchange",f)},[]);
  // SALVA AUTOMATICAMENTE os dados do usuário no navegador a cada mudança.
useEffect(()=>{if(email)ls.set(K.d(email),data)},[data,email]);
  // Navegar = trocar o # da URL.
const nav=r=>{if(location.hash.slice(1)===r)setRoute(r);else location.hash=r;window.scrollTo(0,0)};
const user=email&&users[email];
useEffect(()=>{if(email&&!user){setEmail(null)}},[email,user]);
let r=route;if(!user&&!PUB.includes(r))r="";if(user&&PUB.includes(r))r="inicio";
useEffect(()=>{if(r!==route&&(user||PUB.includes(route)||true))history.replaceState(null,"",r?"#"+r:location.pathname+location.search)},[r,route,user]);
useEffect(()=>{setTimeout(()=>{const h=document.getElementById("h1");h&&h.focus({preventScroll:true})},50)},[r]);
  // Mostra um aviso na tela (e vibra no celular, se estiver ativado).
const say=m=>{if(window.__vib&&navigator.vibrate)navigator.vibrate(120);setToast(m);clearTimeout(window.__t);window.__t=setTimeout(()=>setToast(""),4200)};
  // Atualiza os dados do usuário: copia, aplica a mudança e o efeito acima salva.
const upd=fn=>setData(d=>{const n=JSON.parse(JSON.stringify(d));fn(n);return n});
const setUsers=u=>{ls.set(K.u,u);setUsers0(u)};
  // Entrar: guarda a sessão e carrega os dados daquele usuário.
const login=(em,rem)=>{try{localStorage.removeItem(K.s);sessionStorage.removeItem(K.s);(rem?localStorage:sessionStorage).setItem(K.s,em)}catch(e){}setData(ls.get(K.d(em),emptyData()));setEmail(em);nav("inicio")};
  // Criar conta: grava o usuário (senha em hash) e já entra.
const register=async(name,em,pw)=>{const u={...ls.get(K.u,{}),[em]:{name,email:em,h:await hash(pw),since:new Date().toISOString()}};if(!ls.set(K.u,u)){say("Não foi possível salvar o cadastro. Verifique se o navegador permite armazenamento.");return}ls.set(K.d(em),emptyData());setUsers0(u);login(em,true)};
  // Sair: encerra a sessão; os dados continuam salvos no navegador.
const logout=()=>{try{localStorage.removeItem(K.s);sessionStorage.removeItem(K.s)}catch(e){}setEmail(null);nav("");say("Você saiu. Seus dados continuam salvos neste aparelho.")};
const setName=n=>setUsers({...users,[email]:{...users[email],name:n}});
const ctx={data,upd,nav,say,user,users,login,register,logout,setName,setUsers,openBackup:()=>setBk(true)};
  // Escolhe a tela de acordo com a rota (se não estiver logado, só Login e Cadastro).
let scr;const[k,id]=[r.split("-")[0],r.split("-").slice(1).join("-")];
if(!user)scr=r==="cadastro"?html`<${Signup}/>`:html`<${Login}/>`;
else scr=r==="inicio"?html`<${Home}/>`:r==="comunidade"?html`<${Feed}/>`:k==="leitor"?html`<${Reader} id=${id} key=${id}/>`:r==="progresso"?html`<${Progress}/>`:r==="buscar"?html`<${Search}/>`:r==="perfil"?html`<${Profile}/>`:r==="metas"?html`<${Goals}/>`:r==="kindle"?html`<${Kindle}/>`:k==="livro"?html`<${Detail} id=${id} key=${id}/>`:k==="avaliar"?html`<${Review} id=${id} key=${id}/>`:html`<${Estante}/>`;
const tab=k==="leitor"?"comunidade":k==="livro"||k==="avaliar"?"estante":k==="metas"?"progresso":k==="kindle"?"perfil":r;
return html`<${Ctx.Provider} value=${ctx}><div class="app"><button class="skip" onClick=${()=>document.getElementById("h1")?.focus()}>Pular para o conteúdo</button><button class="a11y" aria-label="Abrir opções de acessibilidade" onClick=${()=>setAc(true)}><${Ic} n="access"/></button>
${scr}
${user&&html`<nav class="tabs" aria-label="Navegação principal"><div class="brand" aria-hidden="true"><${Ic} n="book"/> Minha Estante</div>${TABS.map(([h,l,i])=>html`<a key=${h} href=${"#"+h} aria-current=${tab===h?"page":undefined}><${Ic} n=${i}/>${l}</a>`)}</nav>`}
<div class="toast" role="status" aria-live="polite" style=${{display:toast?"block":"none"}}>${toast}</div>
${bk&&html`<${Backup} onClose=${()=>setBk(false)}/>`}${ac&&html`<${A11y} a=${a} set=${setA} onClose=${()=>setAc(false)}/>`}</div><//>`}
// Liga o React à <div id="root"> do index.html e desenha o app.
ReactDOM.createRoot(document.getElementById("root")).render(html`<${App}/>`);
