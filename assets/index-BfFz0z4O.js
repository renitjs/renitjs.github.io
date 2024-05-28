(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))i(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function t(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerPolicy&&(s.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?s.credentials="include":a.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(a){if(a.ep)return;a.ep=!0;const s=t(a);fetch(a.href,s)}})();const ee={backspace:8,tab:9,enter:13,shift:16,control:17,alt:18,pause:19,capslock:20,escape:27," ":32,pageup:33,pagedown:34,end:35,home:36,arrowleft:37,arrowup:38,arrowright:39,arrowdown:40,insert:45,delete:46,meta:91,numlock:144,scrolllock:145,";":186,"=":187,",":188,"-":189,".":190,"/":191,"`":192,"[":219,"\\":220,"]":221,"'":222,add:187},te=typeof window<"u"&&/Mac|iPod|iPhone|iPad/.test(window.navigator.platform),H={alt:"altKey",control:"ctrlKey",meta:"metaKey",shift:"shiftKey","ctrl/cmd":te?"metaKey":"ctrlKey"};function ne(n){return ee[n]||n.toUpperCase().charCodeAt(0)}function P(n,e){const t=n.split("+").reduce((s,l)=>H[l]?(s.modifiers[H[l]]=!0,s):{...s,keyCode:ne(l)},{modifiers:{altKey:!1,ctrlKey:!1,metaKey:!1,shiftKey:!1},keyCode:null}),i=Object.keys(t.modifiers).every(s=>t.modifiers[s]?e[s]:!e[s]),a=t.keyCode?e.which===t.keyCode:!0;return i&&a}const V=["h1","h2","h3","h4","h5","h6","p","a","em","strong","ul","ol","li","table","thead","tfoot","tr","td","div","span","section","article","header","footer","aside","button","textarea","select","option","script","style","if","else-if","else","for"],ie=["area","base","br","col","command","embed","hr","img","input","link","meta","param","source"],A=["{",'"',"'","("],K="  ";function ae(n,e){const{value:t,selectionStart:i,selectionEnd:a}=n;if(e.type!=="keydown"||!P("tab",e))return;e.preventDefault();const l=t.substr(0,i).split(`
`);let r=l[l.length-1].trim();if(r.includes("<")){const u=r.split(">");r=u[u.length-1].trim()}if(V.indexOf(r)!==-1){const u=r.length,f=t.substr(0,i-u),y=t.substr(a,t.length);let v=`<${r}>`,d=`</${r}>`,c=`${v}${d}`;r=="a"&&(v=`<${r} href="">`,c=`${v}${d}`);const h=i-u+v.length;return{value:f+`${c}`+y,selectionStart:h,selectionEnd:h}}if(ie.indexOf(r)!==-1){const u=r.length,f=t.substr(0,i-u),y=t.substr(a,t.length);let v=`<${r}`,d="",c=">";r=="img"?d=' src=""':r=="input"?d=' type="text"':r=="link"&&(d=' rel="stylesheet" href=""');let h=`${v}${d}${c}`,m=h.length;(r=="img"||r=="link")&&(m=m-2);const w=i-u+m;return{value:f+`${h}`+y,selectionStart:w,selectionEnd:w}}if(r=="log"){const u=t.substr(0,i-3),f=t.substr(a,t.length),y=i+9;return{value:u+"console.log();"+f,selectionStart:y,selectionEnd:y}}const p=i+K.length;return{value:t.substring(0,i)+K+t.substring(a),selectionStart:p,selectionEnd:p}}function se(n,e){const{value:t,selectionStart:i,selectionEnd:a}=n;if(e.type!=="keydown"||!P("enter",e))return;const s=t.substring(0,i).split(`
`).length-1,o=t.split(`
`)[s],r=/^\s+/.exec(o);if(r){e.preventDefault();const f=`
`+r[0],y=i+f.length;return{value:t.substring(0,i)+f+t.substring(a),selectionStart:y,selectionEnd:y}}}function re(n,e){const{value:t,selectionStart:i,selectionEnd:a}=n;if(e.type==="keydown"){if(e.key==">"){const s=t.substr(0,i);if(s){const l=t.substr(a,t.length),o=s.match(/<([^>=]+)$/);if(o){const r=o[1].match(/^([a-z1-6]+)/);if(r){const p=r[1];if(V.indexOf(p)!==-1){const u="</"+p+">";return{value:s+u+l,selectionStart:i,selectionEnd:i}}}}}}if(A.indexOf(e.key)!==-1&&e.type==="keydown"){const s=t.substr(0,i),l=t.substr(a,t.length);let o=s.substr(s.length-1);if(o&&(o=o.trim()),A.indexOf(o)!==-1&&o==e.key){let r=Array.from(l)[0];r&&(r=r.trim()),r==e.key&&e.preventDefault()}else{let r;return e.key=="{"&&(r="}"),e.key=="("&&(r=")"),(e.key=='"'||e.key=="'")&&(r=e.key),{value:s+r+l,selectionStart:i,selectionEnd:i}}}}}function le(n,e){const{value:t,selectionStart:i,selectionEnd:a}=n;if(!P("shift+alt+arrowdown",e))return;e.preventDefault();const s=t.substring(0,i).split(`
`).length-1,o=t.split(`
`)[s],r=t.substr(0,i),p=t.substr(a,t.length),u=r.split(`
`),f=u[u.length-1],y=o.length-f.length,v=t.substr(0,i+y),c=p.split(`
`)[0],h=t.substr(a+c.length,t.length),m=i+o.length+1;return{value:v+`
`+o+h,selectionStart:m,selectionEnd:m}}function oe(n,e){P("ctrl/cmd+s",e)&&e.preventDefault()}function ce(n){return n.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}const W="if|else|else-if|for",ue=W.split("|"),fe=`class="hljs-name">(${W})<`;function J(n,e){return e!="nit"?n:n.replace(new RegExp(fe,"g"),(t,...i)=>{const a=i[0];if(ue.includes(a))return`class="hljs-name hljs-nit">${a}<`})}const he=[ae,se,re,le,oe];class de{constructor(){this.root=document.querySelector(".repl-code-editor"),this.textarea=document.querySelector(".repl-code-editor-text"),this.pre=document.querySelector(".repl-code-editor-pre"),this.lines=document.querySelector(".repl-code-editor-line"),this.handle=null,this.selectionHandle=null,this.value=null,this.language="nit",this.updateCallback=null,this.tempLineNumber=0,this.init(),this.update(),this.updateLines()}init(){this.addTextareaEvents()}addTextareaEvents(){this.handle=e=>{const t=pe(he,e,this.language);this.update(t)},this.selectionHandle=e=>{if(document.activeElement!==this.textarea)return;const t=this.textarea.value.substring(0,this.textarea.selectionStart).split(`
`).length-1+1;this.tempLineNumber!=t&&($(".repl-line").removeClass("active"),$(`.repl-line-${t}`).addClass("active")),this.tempLineNumber=t},this.textarea.addEventListener("input",this.handle),this.textarea.addEventListener("keydown",this.handle),document.addEventListener("selectionchange",this.selectionHandle)}update(e){let t,i,a;if(e?(t=e.value,i=e.selectionStart,a=e.selectionEnd):t=this.value,t!=null&&(this.textarea.value=t),this.textarea.selectionStart=i,this.textarea.selectionEnd=a,t==null)return;this.value=t;let s=this.highlight(t);this.pre.innerHTML=s+"<br/>",this.updateLines(),this.updateCallback&&this.updateCallback({value:t})}highlight(e){const t=hljs.highlight(e,{language:this.language}).value;return J(t,this.language)}updateLines(){let e;this.value!=null?e=this.value.split(`
`):e=[""];const t=e.length.toString().length;t==1?this.root.style.paddingLeft=`${t+3}ch`:this.root.style.paddingLeft=`${t+2}ch`,this.lines.innerHTML=e.map((i,a)=>{const s=a+1;let l="";s==this.tempLineNumber&&(l="active");const o=`<span class="repl-line repl-line-${s} ${l}" style="position: absolute; opacity: .3; left: 0">${1+a}</span>`,r=`<span style="color: transparent; pointer-events: none">${ce(i)}</span>`;return`${o}${r}`}).join(`
`)}change(e){this.language=e.language,this.value=e.value,this.update()}onUpdate(e){this.updateCallback=e}destroy(){this.textarea.removeEventListener("input",this.handle),this.textarea.removeEventListener("keydown",this.handle),document.removeEventListener("selectionchange",this.selectionHandle)}}function pe(n,e,t){const{value:i,selectionStart:a,selectionEnd:s}=e.target;return n.reduce((l,o)=>({...l,...o(l,e,t)}),{value:i,selectionStart:a,selectionEnd:s})}class ge{constructor(e){this.repl=e,this.files=[],this.file=null,this.init()}init(){const e=this;$(document).off("click",".repl-add-file"),$(document).on("click",".repl-add-file",async function(t){const i=prompt("Please enter a file name:");if(i!=null){const a=await e.add(i);await e.active(a.name)}}),$(document).off("click",".repl-file"),$(document).on("click",".repl-file",async function(t){const a=$(this).data("filename");await e.active(a)}),this.repl.onUpdate(t=>{this.file.value=t.value})}add(e,t=""){return new Promise(i=>{let s=e.split(".")[1];s||(s="nit",e=e+"."+s),s=="js"&&(s="javascript");const l={name:e,value:t,language:s};this.files.push(l),this.addTab(l),i(l)})}addTab(e){let t=`<div class="repl-file" title="./${e.name}" data-filename="${e.name}"><span>${e.name}</span></div>`;$(".repl-add-file").before(t)}getFile(e){return this.files.find(t=>t.name==e)}active(e){return new Promise(t=>{const i=this.getFile(e);$(".repl-file").removeClass("repl-file-active"),$(`[data-filename="${e}"]`).addClass("repl-file-active"),this.file=i,this.repl.change(i),$(this.repl.pre).removeClass(function(a,s){return(s.match(/(^|\s)language-\S+/g)||[]).join(" ")}),$(this.repl.pre).addClass("language-"+i.language),this.repl.textarea.focus(),t(i)})}}function me(n){return{subLanguage:"xml",contains:[n.COMMENT("<!--","-->",{relevance:10}),{begin:/^(\s*)(<script(\s*context="module")?>)/gm,end:/^(\s*)(<\/script>)/gm,subLanguage:"javascript",excludeBegin:!0,excludeEnd:!0,contains:[{begin:/^(\s*)(\$:)/gm,end:/(\s*)/gm,className:"keyword"}]},{begin:/^(\s*)(<style.*>)/gm,end:/^(\s*)(<\/style>)/gm,subLanguage:"css",excludeBegin:!0,excludeEnd:!0},{begin:/\{/gm,end:/\}/gm,subLanguage:"javascript",contains:[{begin:/[\{]/,end:/[\}]/,skip:!0},{begin:/([@])(html)/gm,className:"keyword",relevance:10}]}]}}hljs.registerLanguage("nit",me);let g="en";const S={en:{meta:{"/":{t:"Renit: The small framework with powerful features"}},menu:{docs:"Docs",repl:"REPL"},aside:"On this page",home:{title:"The small framework with powerful features",desc:"Renit is a powerful JavaScript framework with a very small footprint, built for developers who need a simple and elegant toolkit to create full-featured web applications.",btn1:"Get Started",btn3:"Wiew on Github",hero:{1:{t:"Easy to use",d:"Create the simplest components in the world."},2:{t:"Tailored for needs",d:"<em>Renit</em> typically encompasses packages that might be needed in every project."}}},leftMenu:[{h:"Welcome to Renit",o:1,m:[{t:"Getting started",u:"intro/start"},{t:"Changelog",u:"intro/changelog"},{t:"Roadmap",u:"intro/roadmap"}]},{h:"Guides",o:1,m:[{t:"Functional usage",u:"guides/functional-usage"}]},{h:"Libraries",o:1,m:[{t:"Type and value checks",u:"libraries/type-and-value-checks"},{t:"Collection interactions",u:"libraries/collection-interactions"},{t:"Mathematical operations",u:"libraries/mathematical-operations"},{t:"Data transformation",u:"libraries/data-transformation",m:[{t:"HTML Parser",u:"libraries/data-transformation/html"}]}]},{h:"Helpers",o:1,m:[{t:"pipe",u:"helpers/pipe"},{t:"clone",u:"helpers/clone"}]}]},tr:{meta:{"/tr":{t:"Renit: Güçlü özelliklere sahip küçük çerçeve"}},menu:{docs:"Dökümanlar",repl:"REPL"},aside:"Sayfa içeriği",home:{meta:{title:"Renit: The small framework with powerful features"},title:"Güçlü özelliklere sahip küçük çerçeve",desc:"Renit, tam özellikli web uygulamaları oluşturmak için basit ve zarif bir araç setine ihtiyaç duyan geliştiriciler için tasarlanmış, çok az yer kaplayan güçlü bir JavaScript çerçevesidir.",btn1:"Buradan Başlayın",btn3:"Github'da Görüntüleyin",hero:{1:{t:"Kullanımı basit",d:"Dünyanın en basit bileşenlerini oluşturun."},2:{t:"İhtiyaçlara uygun",d:"<em>Renit</em>, tipik olarak her projede ihtiyaç duyulabilecek paketleri içerisinde barındıran bir yapıya sahiptir."}}},leftMenu:[{h:"Renit'e hoş geldiniz",o:1,m:[{t:"Başlangıç",u:"intro/start"},{t:"Sürüm notları",u:"intro/changelog"},{t:"Yol haritası",u:"intro/roadmap"}]},{h:"Kılavuzlar",o:1,m:[{t:"Fonksiyonel kullanım",u:"guides/functional-usage"}]},{h:"Kütüphaneler",o:1,m:[{t:"Tür ve değer kontrolleri",u:"libraries/type-and-value-checks"},{t:"Koleksiyon etkileşimleri",u:"libraries/collection-interactions"},{t:"Matematik işlemleri",u:"libraries/mathematical-operations"},{t:"Veri dönüştürme",u:"libraries/data-transformation",m:[{t:"HTML Ayrıştırıcı",u:"libraries/data-transformation/html"}]}]},{h:"Yardımcılar",o:1,m:[{t:"pipe",u:"helpers/pipe"},{t:"clone",u:"helpers/clone"}]}]}};let j={},D={},M={};function O(n){n=="home"?($(".page").hide(),$(".repl").hide(),$(".home").show()):n=="page"?($(".page").show(),$(".home").hide(),$(".repl").hide()):n=="repl"&&($(".page").hide(),$(".home").hide(),$(".repl").show())}function Z(){return new Promise(n=>{$("[data-href]").each(function(e){let t=$(this).data("href");t=="/"?g!="en"&&(t="#!/"+g):g!="en"?t="#!/"+g+"/"+t:t="#!/"+t,$(this).attr("href",t),$(this).off(),$(this).click(function(i){i.preventDefault(),i.stopPropagation(),page(t)})}),$("[data-go]").each(function(e){let t=$(this).data("go");$(this).attr("href",t),$(this).off(),$(this).click(function(i){i.preventDefault(),i.stopPropagation(),location.href=t})}),n(!0)})}function N(n,e,t){return typeof e=="string"?N(n,e.split("."),t):e.length==1&&t!==void 0?n[e[0]]=t:e.length==0?n:N(n[e[0]],e.slice(1),t)}function ye(){return new Promise(n=>{$("[data-t]").each(function(e){let t=$(this).data("t"),i=S[g];const a=N(i,t);$(this).html(a)}),n(!0)})}function $e(n){return new Promise(e=>{n.includes("/tr")?(g="tr",$(".tr").show(),$(".trf").css("display","flex"),$(".enf").hide()):(g="en",$(".en").show(),$(".enf").css("display","flex"),$(".trf").hide()),document.documentElement.setAttribute("lang",g),$(".language").val(g),e()})}let B;async function k(n,e){window.scrollTo(0,0);const t=n.path;B!=t&&(await $e(t),await Z(),await ye(),p404||t in S[g].meta&&(document.title=S[g].meta[t].t),B=t),e()}let C=!1;function _(){C&&(Pe(),C=!1)}function q(){$(".app").addClass("back"),$(".app").removeClass("repl-app"),O("home"),_()}function z(){$(".app").removeClass("back"),$(".app").addClass("repl-app"),O("repl"),C&&X(),C||(X(),C=!0)}function F(n,e="1-4",t){return new Promise(i=>{$(".app").removeClass("back"),$(".app").removeClass("repl-app"),O("page"),be(),ve(n,e,t,i),_()})}let I;function be(){if(I!=g){const n=S[g].leftMenu;let e="";n.forEach(t=>{t.o?e+="<details open>":e+="<details>",e+=`<summary><span>${t.h}</span><svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="m14.83 11.29-4.24-4.24a1 1 0 1 0-1.42 1.41L12.71 12l-3.54 3.54a1 1 0 0 0 0 1.41 1 1 0 0 0 .71.29 1 1 0 0 0 .71-.29l4.24-4.24a1.002 1.002 0 0 0 0-1.42Z"></path></svg></summary>`,e+="<ul>",t.m.forEach(i=>{i.m?(e+="<li>",e+=`<a data-href="${i.u}">${i.t}</a>`,e+="<ul>",i.m.forEach(a=>{e+=`<li><a data-href="${a.u}">${a.t}</a></li>`}),e+="</ul>",e+="</li>"):e+=`<li><a data-href="${i.u}">${i.t}</a></li>`}),e+="</ul>",e+="</details>"}),$(".sidebar").html(`<div>${e}</div>`),I=g,Z()}}function ve(n,e,t,i){let a=j[n],s=D[n],l=M[n];const o=[];if(!a){const r=location.origin;let p;const u=`${r}/doc/${n}.md`;t?p=u+"?"+t:p=u,fetch(p).then(f=>f.text()).then(f=>{s=f.slice(0,f.indexOf(`
`)).replace("# ",""),s=s+" | Renit",a=new marked.Marked(markedHighlight.markedHighlight({langPrefix:"hljs language-",highlight(d,c,h){let m=[];c.indexOf("{")>0&&(m=c.slice(c.indexOf("{")+1,c.indexOf("}")).split(",").map(Number),c=c.slice(0,c.indexOf("{")).trim());const w=hljs.getLanguage(c)?c:"plaintext";let L=hljs.highlight(d,{language:w}).value;if(L=J(L,w),m.length>0){const E=L.split(`
`);m.forEach(x=>{x=x-1,E[x]&&(E[x]=`<span class="mark">${E[x]}</span>`)}),L=E.join(`
`)}return L}}),{headerIds:!1,renderer:{heading(d,c,h){h=h.toLowerCase().trim().replace(/<[!\/a-z].*?>/gi,"");const m=`${we(h)}`,w={level:c,text:d,id:m};return o.push(w),`<h${c} id="${m}">${d}</h${c}>
`}}},{hooks:{postprocess(d){l=o,e=e.split("-");const c=[];return l.forEach(h=>{h.level>=e[0]&&h.level<=e[1]&&c.push(h)}),M[n]=c,d}}}).parse(f,{mangle:!1}),j[n]=a,D[n]=s,document.querySelector("#preview").innerHTML=a,document.title=s,G(n),i(!0)});return}document.querySelector("#preview").innerHTML=a,document.title=s,G(n),i(!0)}function we(n){var e={çÇ:"c",ğĞ:"g",şŞ:"s",üÜ:"u",ıİ:"i",öÖ:"o"};for(var t in e)n=n.replace(new RegExp("["+t+"]","g"),e[t]);return n=n.replace(/[^-a-zA-Z0-9\s]+/gi,"").replace(/\s/gi,"-").replace(/[-]+/gi,"-").toLowerCase(),Number.isInteger(parseInt(Array.from(n)[0]))&&(n=n.substring(1)),Array.from(n)[0]=="-"&&(n=n.substring(1)),n}function G(n){const e=M[n];ke(e)}function ke(n){const t=location.href.split("?")[0];let i="";n.forEach(a=>{i+=`<li><a href="${t}?section=${a.id}" class="h${a.level}">${a.text}</a></li>`}),$(".toc").html(i)}function Le(){const n=e=>{const{currentTarget:t}=e;if(!t)return;const i=t.getBoundingClientRect(),a=e.clientX-i.left,s=e.clientY-i.top;t.style.setProperty("--mouse-x",`${a}px`),t.style.setProperty("--mouse-y",`${s}px`);const l=150,o=t.offsetWidth/2,r=t.offsetHeight/2,p=(e.offsetX-o)/l,u=-(e.offsetY-r)/l;t.style.setProperty("--rotate-x",`${p}deg`),t.style.setProperty("--rotate-y",`${u}deg`)};for(const e of document.querySelectorAll(".hero-card"))e.onmousemove=n}function xe(){$(".language").on("change",function(){let n=location.hash;const e=this.value;e=="tr"?n=="#!/"?page("/"+e):page("/"+e+n):(n=n.replace("#!/tr",""),n?page(n):page("/"))})}function Y(){if(U){U=0;let e;location.href.includes("?")&&(e=location.href.split("?")[1].split("=")[1]),e&&Q(e)}const n=$(".file-multi");n.find(".file-line span:not(:first)").addClass("inactive"),n.find(".file-page").hide(),n.find(".file-page:first").show(),$(".file-multi .file-line span").click(function(){const e=$(this).attr("id");if($(this).hasClass("inactive")){const t=$(this).parent(),i=t.parent();t.find("span").addClass("inactive"),$(this).removeClass("inactive"),i.find(".file-page").hide(),i.find("#"+e+"c").show()}})}let U=1;function Ce(){let n;location.hash.includes("?")&&(n=location.hash.split("?")[1].split("=")[1],n&&Q(n))}window.onhashchange=Ce;function Q(n){const e=document.querySelectorAll("#"+n)[0];e&&e.scrollIntoView()}Le();xe();function Ee(){page("/",k,()=>{q()}),page("/tr",k,()=>{q()})}function Se(){page("/repl",k,()=>{z()}),page("/tr/repl",k,()=>{z()})}async function b(n,e="1-4",t=void 0,i=0){page(`/${n}`,k,async()=>{await F(`${n}`,e,t),Y()});const a=i==1?`${n}`:`${n}.tr`;page(`/tr/${n}`,k,async()=>{await F(`${a}`,e,t),Y()})}let R,T;function X(){const n="app.nit";R=new de,T=new ge(R),T.add(n).then(()=>{T.active(n)})}function Pe(){R.destroy()}Ee();Se();b("intro/start");b("intro/changelog","1-2",1,1);b("intro/roadmap","1-4",1);b("guides/functional-usage","1-3",1);b("libraries/type-and-value-checks","1-3",1);b("libraries/collection-interactions","1-3",1);b("libraries/mathematical-operations","1-3",1);b("libraries/data-transformation","1-3",1);b("libraries/data-transformation/html","1-3",1);b("helpers/pipe","1-3",2);b("helpers/clone","1-3",1);page({hashbang:!0});
