(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))a(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function n(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(i){if(i.ep)return;i.ep=!0;const r=n(i);fetch(i.href,r)}})();let o="en";const h={en:{meta:{"/":{t:"Renit: The small framework with powerful features"}},menu:{docs:"Docs"},aside:"On this page",home:{title:"The small framework with powerful features",desc:"Renit is a powerful JavaScript framework with a very small footprint, built for developers who need a simple and elegant toolkit to create full-featured web applications.",btn1:"Get Started",btn3:"Wiew on Github",hero:{1:{t:"Easy to use",d:"Create the simplest components in the world."},2:{t:"Tailored for needs",d:"<em>Renit</em> typically encompasses packages that might be needed in every project."}}},leftMenu:[{h:"Welcome to Renit",o:1,m:[{t:"Getting started",u:"intro/start"},{t:"Changelog",u:"intro/changelog"},{t:"Roadmap",u:"intro/roadmap"}]}]},tr:{meta:{"/tr":{t:"Renit: Güçlü özelliklere sahip küçük çerçeve"}},menu:{docs:"Dökümanlar"},aside:"Sayfa içeriği",home:{meta:{title:"Renit: The small framework with powerful features"},title:"Güçlü özelliklere sahip küçük çerçeve",desc:"Renit, tam özellikli web uygulamaları oluşturmak için basit ve zarif bir araç setine ihtiyaç duyan geliştiriciler için tasarlanmış, çok az yer kaplayan güçlü bir JavaScript çerçevesidir.",btn1:"Buradan Başlayın",btn3:"Github'da Görüntüleyin",hero:{1:{t:"Kullanımı basit",d:"Dünyanın en basit bileşenlerini oluşturun."},2:{t:"İhtiyaçlara uygun",d:"<em>Renit</em>, tipik olarak her projede ihtiyaç duyulabilecek paketleri içerisinde barındıran bir yapıya sahiptir."}}},leftMenu:[{h:"Renit'e hoş geldiniz",o:1,m:[{t:"Başlangıç",u:"tr/intro/start"},{t:"Sürüm notları",u:"tr/intro/changelog"},{t:"Yol haritası",u:"tr/intro/roadmap"}]}]}};let P={},x={},w={};function G(t){t=="home"?($(".page").hide(),$(".home").show()):t=="page"&&($(".page").show(),$(".home").hide())}function O(){return new Promise(t=>{$("[data-href]").each(function(e){let n=$(this).data("href");n=="/"?o!="en"&&(n=n+o):o!="en"?n="/"+o+"/"+n:n="/"+n,$(this).attr("href",n),$(this).off(),$(this).click(function(a){a.preventDefault(),a.stopPropagation(),page(n)})}),t(!0)})}function k(t,e,n){return typeof e=="string"?k(t,e.split("."),n):e.length==1&&n!==void 0?t[e[0]]=n:e.length==0?t:k(t[e[0]],e.slice(1),n)}function T(){return new Promise(t=>{$("[data-t]").each(function(e){let n=$(this).data("t"),a=h[o];const i=k(a,n);$(this).html(i)}),t(!0)})}function z(t){return new Promise(e=>{t.includes("/tr")?(o="tr",$(".tr").show(),$(".trf").css("display","flex"),$(".enf").hide()):(o="en",$(".en").show(),$(".enf").css("display","flex"),$(".trf").hide()),document.documentElement.setAttribute("lang",o),$(".language").val(o),e()})}let L;async function d(t,e){const n=t.path;L!=n&&(await z(n),await O(),await T(),n in h[o].meta&&(document.title=h[o].meta[n].t),L=n),e()}function C(){$(".app").addClass("back"),G("home")}function R(t,e="1-4",n){return new Promise(a=>{$(".app").removeClass("back"),G("page"),B(),Y(t,e,n,a)})}let H;function B(){if(H!=o){const t=h[o].leftMenu;let e="";t.forEach(n=>{n.o?e+="<details open>":e+="<details>",e+=`<summary><span>${n.h}</span><svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="m14.83 11.29-4.24-4.24a1 1 0 1 0-1.42 1.41L12.71 12l-3.54 3.54a1 1 0 0 0 0 1.41 1 1 0 0 0 .71.29 1 1 0 0 0 .71-.29l4.24-4.24a1.002 1.002 0 0 0 0-1.42Z"></path></svg></summary>`,e+="<ul>",n.m.forEach(a=>{a.m?(e+="<li>",e+=`<a href="/${a.u}">${a.t}</a>`,e+="<ul>",a.m.forEach(i=>{e+=`<li><a href="/${i.u}">${i.t}</a></li>`}),e+="</ul>",e+="</li>"):e+=`<li><a href="/${a.u}">${a.t}</a></li>`}),e+="</ul>",e+="</details>"}),$(".sidebar").html(`<div>${e}</div>`),H=o}}function Y(t,e,n,a){let i=P[t],r=x[t],l=w[t];if(!i){const{gfmHeadingId:g,getHeadingList:m}=markedGfmHeadingId,p=location.origin;let s;const b=`${p}/doc/${t}.md`;n?s=b+"?"+n:s=b,fetch(s).then(c=>c.text()).then(c=>{r=c.slice(0,c.indexOf(`
`)).replace("# ",""),r=r+" | Renit",i=new marked.Marked(markedHighlight.markedHighlight({langPrefix:"hljs language-",highlight(y,u,f){const M=hljs.getLanguage(u)?u:"plaintext";return hljs.highlight(y,{language:M}).value}}),g(),{hooks:{postprocess(y){l=m(),e=e.split("-");const u=[];return l.forEach(f=>{f.level>=e[0]&&f.level<=e[1]&&u.push(f)}),w[t]=u,y}}}).parse(c,{headerIds:!0,mangle:!1}),P[t]=i,x[t]=r,document.querySelector("#preview").innerHTML=i,document.title=r,S(t),a(!0)});return}document.querySelector("#preview").innerHTML=i,document.title=r,S(t),a(!0)}function S(t){const e=w[t];q(e)}function q(t){let e="";t.forEach(n=>{e+=`<li><a href="#${n.id}" class="h${n.level}">${n.text}</a></li>`}),$(".toc").html(e)}function A(){const t=e=>{const{currentTarget:n}=e;if(!n)return;const a=n.getBoundingClientRect(),i=e.clientX-a.left,r=e.clientY-a.top;n.style.setProperty("--mouse-x",`${i}px`),n.style.setProperty("--mouse-y",`${r}px`);const l=200,g=n.offsetWidth/2,m=n.offsetHeight/2,p=(e.offsetX-g)/l,s=-(e.offsetY-m)/l;n.style.setProperty("--rotate-x",`${p}deg`),n.style.setProperty("--rotate-y",`${s}deg`)};for(const e of document.querySelectorAll(".hero-card"))e.onmousemove=t}function D(){$(".language").on("change",function(){let t=location.pathname;const e=this.value;e=="tr"?t=="/"?page("/"+e):page("/"+e+t):(t=t.replace("/tr",""),t?page(t):page("/"))})}function E(){const t=$(".file-multi");t.find(".file-line span:not(:first)").addClass("inactive"),t.find(".file-page").hide(),t.find(".file-page:first").show(),$(".file-multi .file-line span").click(function(){const e=$(this).attr("id");if($(this).hasClass("inactive")){const n=$(this).parent(),a=n.parent();n.find("span").addClass("inactive"),$(this).removeClass("inactive"),a.find(".file-page").hide(),a.find("#"+e+"c").show()}})}A();D();function I(){page("/",d,()=>{C()}),page("/tr",d,()=>{C()})}async function v(t,e="1-4",n=0){page(`/${t}`,d,async()=>{await R(`${t}`,e),E()});const a=n==1?`${t}`:`${t}.tr`;page(`/tr/${t}`,d,async()=>{await R(`${a}`,e),E()})}I();v("intro/start","1-4",1);v("intro/changelog","1-2",1);v("intro/roadmap","1-4",1);page();