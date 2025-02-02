!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e="undefined"!=typeof globalThis?globalThis:e||self).App=t()}(this,(function(){"use strict";const e={repository:void 0,version:void 0,offline:void 0,theme:void 0,content_root:void 0,sub_hosted:void 0,path:void 0,reloaded:void 0,metadata:void 0};class t{constructor(t){this.init_state(e),this.parent=t,t.state=e}repository(){let e=document.querySelector('meta[name="repository"]');return e?e.content:""}version(){let e=document.querySelector('meta[name="version"]');if(null!==e){return e.content}}content_root(){let e,t=document.querySelector("script#documentation_options");return null!==t&&(e=t.dataset.url_root),null==e&&(e=document.querySelector("html").dataset.content_root),null==e&&(t=document.querySelector(".repotoc-tree .current"),null!==t&&(e=t.getAttribute("href").replace("index.html",""))),null==e&&(console.warn("Failed to get content root."),e=""),e}sub_hosted(e,t){let s=new URL(e,location).href,r=new URL(t,location.origin).href;return s.startsWith(r)}path(e,t,s){s||(t="");let r=new URL(e,location).href,a=new URL(t,location.origin).href;return r.startsWith(a)?r.replace(a,"").replace(/^\/|\/$/g,""):""}reloaded(){return!!window.performance&&performance.navigation.type===performance.navigation.TYPE_RELOAD}init_state(e){e.repository=this.repository(),e.version=this.version(),e.offline="file:"==window.location.protocol,e.theme=localStorage.getItem("theme"),e.content_root=this.content_root(),e.sub_hosted=this.sub_hosted(e.content_root,e.repository),e.path=this.path(e.content_root,e.repository,e.sub_hosted),e.reloaded=this.reloaded()}}class s{static randomChar(){const e="abcdefghijklmnopqrstuvwxyz";return e[Math.floor(26*Math.random())]}static UID(){return this.randomChar()+(+new Date).toString(36)+Math.random().toString(36).substring(3)}static SID(){return this.randomChar()+Math.random().toString(36).substring(3,8)}static fromUrl(e){let t=new URLSearchParams(document.location.search);return null==t.get(e)?this.urlDefaults(e):this.urlValidParams(e,t.get(e))}static urlDefaults(e){if("theme"===e)return"light"}static urlValidParams(e,t){if("theme"===e)return["dark","light"].includes(t)?t:this.urlDefaults(e)}static cleanPathname(e){return e.replace(/([^:]\/)\/+/g,"$1").replace(/[^:]\.\//g,"$1")}static getDepth(e){return(e.match(/\//g)||[]).length}static cache_check(e,t,s,r){let a=localStorage.getItem(t);null!==a&&(a=JSON.parse(a));let o=new Date(0);o.setHours(s),!0===e.reloaded||null===a||a.timestamp+o.valueOf()<Date.now()?fetch(t,{method:"Get",headers:{"Content-Type":"application/json"}}).then((e=>{if(!0===e.ok)return e.json()})).then((e=>{e&&(a={obj:e},a.timestamp=Date.now(),r(e),localStorage.setItem(t,JSON.stringify(a)))})).catch((e=>{console.error(`Failed to resolve ${t}, due to:`,e)})):r(a.obj)}}class r{constructor(e,t){if(this.$,"string"==typeof e){if(this.$=document.createElement(e),"object"==typeof t)for(const e in t)e in this.$?this.$[e]=t[e]:this.$.dataset[e]=t[e]}else this.$=e}cloneNode(e){return new r(this.$.cloneNode(e))}set innerText(e){this.$.innerText=e}get innerText(){return this.$.innerText}get height(){return this.$.offsetHeight}get width(){return this.$.offsetWidth}get id(){return this.$.id}set id(e){this.$.id=e}get value(){return this.$.value}set value(e){this.$.value=e}get src(){return this.$.src}set src(e){this.$.src=e}focus(){this.$.focus()}get classList(){return this.$.classList}get style(){return this.$.style}onchange(e,t,s){return this.$.onchange=r=>{void 0===s?t.apply(e,[r]):s.constructor==Array&&(s.push(r),t.apply(e,s))},this}onclick(e,t,s){return this.$.onclick=r=>{void 0===s?t.apply(e,[r]):s.constructor==Array&&(s.push(r),t.apply(e,s))},this}onup(e,t,s){return this.$.addEventListener("mouseup",(r=>{void 0===s?t.apply(e,[r]):s.constructor==Array&&(s.push(r),t.apply(e,s))})),this}ondown(e,t,s){return this.$.addEventListener("mousedown",(r=>{void 0===s?t.apply(e,[r]):s.constructor==Array&&(s.push(r),t.apply(e,s))})),this}onmove(e,t,s){return this.$.addEventListener("mousemove",(r=>{void 0===s?t.apply(e,[r]):s.constructor==Array&&(s.push(r),t.apply(e,s))})),this}onevent(e,t,s,r){return this.$.addEventListener(e,(e=>{void 0===r?s.apply(t,[e]):r.constructor==Array&&(r.push(e),s.apply(t,r))})),this}append(e){return e.constructor!=Array&&(e=[e]),e.forEach((e=>{/HTML(.*)Element/.test(e.constructor.name)?this.$.appendChild(e):"object"==typeof e&&/HTML(.*)Element/.test(e.$.constructor.name)&&this.$.appendChild(e.$)})),this}delete(){this.$.remove()}removeChilds(){let e=this.$.lastElementChild;for(;e;)this.$.removeChild(e),e=this.$.lastElementChild;return this}static get(e,t){return void 0===(t=t instanceof r?t.$:t)?document.querySelector(e):t.querySelector(e)}static getAll(e,t){return"object"==typeof(t=t instanceof r?t.$:t)?t.querySelectorAll(e):get(t).querySelectorAll(e)}static switchState(e,t){let s=null!=t?t:"on";(e=e instanceof r?e.$:e).classList.contains(s)?e.classList.remove(s):e.classList.add(s)}static UID(){return(+new Date).toString(36)+Math.random().toString(36).substr(2)}static prototypeDetails(e){let t=new r("summary",{innerText:e.innerText}),s=new r("details",{id:e.id,name:e.id}).append(t);return null!=e.onevent&&e.onevent.forEach((e=>{e.args.push(s.$),t.onevent(e.event,e.self,e.fun,e.args)})),s}static prototypeInputFile(e){return new r("label",{htmlFor:`${e.id}_input`,id:e.id,className:e.className,innerText:e.innerText}).append(new r("input",{id:`${e.id}_input`,type:"file"}))}static prototypeCheckSwitch(e){let t=new r("input",{id:e.id,name:e.id,className:"checkswitch",type:"checkbox",value:!1});return[t,new r("div",{className:e.className}).append([new r("div").append([new r("label",{className:"checkswitch",htmlFor:e.id,innerText:e.innerText}).append([t,new r("span")])])])]}static prototypeDownload(e,t){let s,r=/.*\.(py|xml|csv|json|svg|png)$/;if(!r.test(e))return;let a=e.match(r)[1];switch(e=e.replaceAll("/","-").replaceAll(" ","_").toLowerCase(),a){case"xml":s="data:x-application/xml;charset=utf-8,"+encodeURIComponent(t);break;case"py":s="data:text/python;charset=utf-8,"+encodeURIComponent(t);break;case"json":s="data:text/json;charset=utf-8,"+encodeURIComponent(t);break;case"csv":s="data:text/csv;charset=utf-8,"+encodeURIComponent(t);break;case"svg":s="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(t);break;case"png":s=t}let o=document.createElement("a");o.setAttribute("href",s),o.setAttribute("download",e),o.style.display="none",document.body.appendChild(o),o.click(),document.body.removeChild(o)}static setSelected(e,t){for(var s=0;s<e.$.options.length;s++)if(e.$.options[s].text==t)return void(e.$.options[s].selected=!0)}static lazyUpdate(e,t,s,a){a=null==a?"innerText":a;let o=r.get(`[data-uid='${t}']`,e);for(const e in s)r.get(`#${e}`,o)[a]=s[e]}}class a{constructor(e){(this.$={}).head=new r(r.get("head")),this.parent=e,this.init()}init(){!0!==this.parent.state.offline?!1!==this.parent.state.sub_hosted?s.cache_check(this.parent.state,"/doctools/metadata.json",24,(e=>{this.init_metadata(e)})):console.log("fetch: dynamic features are not available for single repository doc"):console.log("fetch: dynamic features are not available in offline mode")}init_metadata(e){this.parent.state.metadata=e,"modules"in e&&this.load_modules(e.modules)}load_modules(e){"javascript"in e&&e.javascript.forEach((e=>{let t=new r("script",{src:`/doctools/_static/${e}`});this.$.head.append(t)})),"stylesheet"in e&&e.stylesheet.forEach((e=>{let t=new r("link",{rel:"stylesheet",type:"text/css",href:`/doctools/_static/${e}`});this.$.head.append(t)}))}}class o{constructor(e){this.parent=e,this.portrait=!1,this.scrollSpy={localtoc:new Map,currentLocaltoc:void 0};let t=this.$={};t.body=new r(r.get("body")),t.content=new r(r.get(".body section")),t.localtoc=new r(r.get(".tocwrapper > nav > ul > li")),this.scroll_spy(),null===this.parent.state.theme&&(this.parent.state.theme=this.os_theme()),t.body.classList.add("js-on"),this.parent.state.theme!==this.os_theme()&&t.body.classList.add(this.parent.state.theme),t.searchButton=new r("button",{id:"search",className:"icon",title:"Search (/)"}).onclick(this,(()=>{r.switchState(t.searchArea),r.switchState(t.searchAreaBg),t.searchInput.focus(),t.searchInput.$.select()})),t.changeTheme=new r("button",{className:"dark"===this.parent.state.theme?"icon on":"icon",id:"theme",title:"Switch theme"}).onclick(this,(()=>{t.body.classList.remove(this.parent.state.theme),this.parent.state.theme="dark"===this.parent.state.theme?"light":"dark",this.os_theme()==this.parent.state.theme?localStorage.removeItem("theme"):(localStorage.setItem("theme",this.parent.state.theme),t.body.classList.add(this.parent.state.theme))})),t.searchAreaBg=new r("div",{className:"search-area-bg"}).onclick(this,(()=>{r.switchState(t.searchArea),r.switchState(t.searchAreaBg)})),t.searchArea=new r(r.get(".search-area")),t.searchForm=new r(r.get("form",t.searchArea)),t.searchInput=new r(r.get("input",t.searchForm)),t.searchForm.$.action=r.get('link[rel="search"]').href,t.body.append([t.searchAreaBg]),t.rightHeader=new r(r.get("header #right span.reverse")).append([t.changeTheme,t.searchButton]),t.relatedNext=r.get(".related .next"),t.relatedPrev=r.get(".related .prev"),this.init(),e.navigation=this}scroll_spy(){null!==this.$.localtoc.$&&this.prepareLocaltocMap()}prepareLocaltocMap(){let e="",t=this.scrollSpy.localtoc,s=0;r.getAll(".reference.internal",this.$.localtoc).forEach((r=>{e=`${s}_${r.textContent}`,t.set(e,[r,void 0]),s+=1}));let a=[];for(let e=0;e<7;e++)a.push(...r.getAll(`section > h${e}`,this.$.content));a=a.sort(((e,t)=>e.getBoundingClientRect().y-t.getBoundingClientRect().y)),s=0,a.forEach((r=>{e=r.textContent,e=`${s}_${e}`,t.has(e)&&(t.set(e,[t.get(e)[0],r]),s+=1)})),t.forEach(((e,t,s)=>{void 0===e[1]&&s.delete(t)}))}handleResize(){this.portrait=window.innerHeight>window.innerWidth}handleScroll(){if(null!==this.$.localtoc.$){let e,t,s,r,a=Number.MAX_SAFE_INTEGER,o=Number.MIN_SAFE_INTEGER,n=this.scrollSpy.localtoc;if(n.forEach(((s,n,i)=>{r=s[1].getBoundingClientRect().y,r<=0?r>o&&(o=r,e=n):r<a&&(a=r,t=n)})),s=a<80?t:e,void 0!==s){let e=this.scrollSpy.currentLocaltoc;s!==e&&(n.get(s)[0].classList.add("current"),void 0!==e&&n.get(e)[0].classList.remove("current"),this.scrollSpy.currentLocaltoc=s)}}}search(e){"/"!==e.key||this.$.searchArea.classList.contains("on")?"Escape"===e.code&&this.$.searchArea.classList.contains("on")&&(r.switchState(this.$.searchArea),r.switchState(this.$.searchAreaBg)):(r.switchState(this.$.searchArea),r.switchState(this.$.searchAreaBg),this.$.searchInput.focus(),this.$.searchInput.$.select())}related(e){if(!e.altKey||!e.shiftKey)return;e.preventDefault();let t=e.ctrlKey&&location.href.split("#").length>1?`#${location.href.split("#")[1]}`:"";"ArrowLeft"!=e.code&&"KeyA"!=e.code||!this.$.relatedPrev?"ArrowRight"!=e.code&&"KeyD"!=e.code||!this.$.relatedNext||(location.href=this.$.relatedNext.href+t):location.href=this.$.relatedPrev.href+t}keyup(e){switch(e.code){case"ArrowLeft":case"ArrowRight":case"KeyA":case"KeyD":this.related(e);break;case"IntlRo":case"Escape":this.search(e)}}keydown(e){if(e.altKey&&e.shiftKey)switch(e.code){case"ArrowLeft":case"ArrowRight":case"KeyA":case"KeyD":e.preventDefault()}}os_theme(){return window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}init(){onresize=()=>{this.handleResize()},onscroll=()=>{this.handleScroll()},document.addEventListener("keyup",(e=>{this.keyup(e)}),!1),document.addEventListener("keydown",(e=>{this.keydown(e)}),!1)}}function n(){window.app={},new t(app),new a(app),new o(app)}return n(),n}));
//# sourceMappingURL=app.umd.js.map
