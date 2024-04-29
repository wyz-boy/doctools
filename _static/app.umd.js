!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e="undefined"!=typeof globalThis?globalThis:e||self).App=t()}(this,(function(){"use strict";class e{constructor(e,t){if(this.$,"string"!=typeof e)return void(this.$=e);let r=["innerText","className","id","title","innerText","value","tabIndex","role","href","ariaPressed","preload","controls","autoplay","src","placeholder","htmlFor","type","autocomplete","name","accept","disabled","innerHTML","action"];if(this.$=document.createElement(e),"object"==typeof t)for(const e in t)r.includes(e)?this.$[e]=t[e]:this.$.dataset[e]=t[e]}cloneNode(t){return new e(this.$.cloneNode(t))}set innerText(e){this.$.innerText=e}get innerText(){return this.$.innerText}get height(){return this.$.offsetHeight}get width(){return this.$.offsetWidth}get id(){return this.$.id}set id(e){this.$.id=e}get value(){return this.$.value}set value(e){this.$.value=e}get src(){return this.$.src}set src(e){this.$.src=e}focus(){this.$.focus()}get classList(){return this.$.classList}get style(){return this.$.style}onchange(e,t,r){return this.$.onchange=s=>{void 0===r?t.apply(e,[s]):r.constructor==Array&&(r.push(s),t.apply(e,r))},this}onclick(e,t,r){return this.$.onclick=s=>{void 0===r?t.apply(e,[s]):r.constructor==Array&&(r.push(s),t.apply(e,r))},this}onup(e,t,r){return this.$.addEventListener("mouseup",(s=>{void 0===r?t.apply(e,[s]):r.constructor==Array&&(r.push(s),t.apply(e,r))})),this}ondown(e,t,r){return this.$.addEventListener("mousedown",(s=>{void 0===r?t.apply(e,[s]):r.constructor==Array&&(r.push(s),t.apply(e,r))})),this}onmove(e,t,r){return this.$.addEventListener("mousemove",(s=>{void 0===r?t.apply(e,[s]):r.constructor==Array&&(r.push(s),t.apply(e,r))})),this}onevent(e,t,r,s){return this.$.addEventListener(e,(e=>{void 0===s?r.apply(t,[e]):s.constructor==Array&&(s.push(e),r.apply(t,s))})),this}append(e){return e.constructor!=Array&&(e=[e]),e.forEach((e=>{/HTML(.*)Element/.test(e.constructor.name)?this.$.appendChild(e):"object"==typeof e&&/HTML(.*)Element/.test(e.$.constructor.name)&&this.$.appendChild(e.$)})),this}delete(){this.$.remove()}removeChilds(){let e=this.$.lastElementChild;for(;e;)this.$.removeChild(e),e=this.$.lastElementChild;return this}static get(t,r){return void 0===(r=r instanceof e?r.$:r)?document.querySelector(t):r.querySelector(t)}static getAll(t,r){return"object"==typeof(r=r instanceof e?r.$:r)?r.querySelectorAll(t):get(r).querySelectorAll(t)}static switchState(t,r){let s=null!=r?r:"on";(t=t instanceof e?t.$:t).classList.contains(s)?t.classList.remove(s):t.classList.add(s)}static UID(){return(+new Date).toString(36)+Math.random().toString(36).substr(2)}static prototypeDetails(t){let r=new e("summary",{innerText:t.innerText}),s=new e("details",{id:t.id,name:t.id}).append(r);return null!=t.onevent&&t.onevent.forEach((e=>{e.args.push(s.$),r.onevent(e.event,e.self,e.fun,e.args)})),s}static prototypeInputFile(t){return new e("label",{htmlFor:`${t.id}_input`,id:t.id,className:t.className,innerText:t.innerText}).append(new e("input",{id:`${t.id}_input`,type:"file"}))}static prototypeCheckSwitch(t){let r=new e("input",{id:t.id,name:t.id,className:"checkswitch",type:"checkbox",value:!1});return[r,new e("div",{className:t.className}).append([new e("div").append([new e("label",{className:"checkswitch",htmlFor:t.id,innerText:t.innerText}).append([r,new e("span")])])])]}static prototypeDownload(e,t){let r,s=/.*\.(py|xml|csv|json|svg|png)$/;if(!s.test(e))return;let n=e.match(s)[1];switch(e=e.replaceAll("/","-").replaceAll(" ","_").toLowerCase(),n){case"xml":r="data:x-application/xml;charset=utf-8,"+encodeURIComponent(t);break;case"py":r="data:text/python;charset=utf-8,"+encodeURIComponent(t);break;case"json":r="data:text/json;charset=utf-8,"+encodeURIComponent(t);break;case"csv":r="data:text/csv;charset=utf-8,"+encodeURIComponent(t);break;case"svg":r="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(t);break;case"png":r=t}let a=document.createElement("a");a.setAttribute("href",r),a.setAttribute("download",e),a.style.display="none",document.body.appendChild(a),a.click(),document.body.removeChild(a)}static setSelected(e,t){for(var r=0;r<e.$.options.length;r++)if(e.$.options[r].text==t)return void(e.$.options[r].selected=!0)}static lazyUpdate(t,r,s,n){n=null==n?"innerText":n;let a=e.get(`[data-uid='${r}']`,t);for(const t in s)e.get(`#${t}`,a)[n]=s[t]}}let t=new class{constructor(){this.portrait=!1,this.offline="file:"==window.location.protocol,this.currentTheme=localStorage.getItem("theme"),this.ctrlPressed=localStorage.getItem("ctrlPressed"),this.contentRoot=e.get("html").dataset.content_root;let t=document.querySelector('meta[name="repo"]');this.repo=t?t.content.split("/"):[""];let r=this.$={};r.body=new e(e.get("body")),null===this.currentTheme&&(this.currentTheme=this.getOSTheme()),r.body.classList.add("js-on"),this.currentTheme!==this.getOSTheme()&&r.body.classList.add(this.currentTheme),r.searchButton=new e("button",{id:"search",className:"icon",title:"Search (/)"}).onclick(this,(()=>{e.switchState(r.searchArea),e.switchState(r.searchAreaBg),r.searchBox.focus(),r.searchBox.$.select()})),r.changeTheme=new e("button",{className:"dark"===this.currentTheme?"icon on":"icon",id:"theme",title:"Switch theme"}).onclick(this,(()=>{r.body.classList.remove(this.currentTheme),this.currentTheme="dark"===this.currentTheme?"light":"dark",this.getOSTheme()==this.currentTheme?localStorage.removeItem("theme"):(localStorage.setItem("theme",this.currentTheme),r.body.classList.add(this.currentTheme))})),r.searchAreaBg=new e("div",{className:"search-area-bg"}).onclick(this,(()=>{e.switchState(r.searchArea),e.switchState(r.searchAreaBg)})),r.searchArea=new e(e.get("form.search-area")),r.searchBox=new e(e.get("form.search-area input")),r.searchArea.$.action=e.get('link[rel="search"]').href,r.body.append([r.searchAreaBg]),r.rightHeader=new e(e.get("header #right span.reverse")).append([r.changeTheme,r.searchButton]),r.relatedNext=e.get(".related .next"),r.relatedPrev=e.get(".related .prev")}handleResize(){this.portrait=window.innerHeight>window.innerWidth}search(t){"/"!==t.key||this.$.searchArea.classList.contains("on")?"Escape"===t.code&&this.$.searchArea.classList.contains("on")&&(e.switchState(this.$.searchArea),e.switchState(this.$.searchAreaBg)):(e.switchState(this.$.searchArea),e.switchState(this.$.searchAreaBg),this.$.searchBox.focus(),this.$.searchBox.$.select())}related(e){e.ctrlKey&&("ArrowLeft"==e.code&&this.$.relatedPrev?location.href=this.$.relatedPrev.href:"ArrowRight"==e.code&&this.$.relatedNext&&(location.href=this.$.relatedNext.href))}keyUp(e){switch(e.key){case"ArrowLeft":case"ArrowRight":this.related(e);break;case"/":this.search(e)}"Escape"===e.code&&this.search(e)}init(){onresize=()=>{this.handleResize()},document.addEventListener("keyup",(e=>{this.keyUp(e)}),!1),this.dynamic()}dynamic(){this.offline&&console.log("navigation: dynamic features are not available in offline mode")}dynamicRepoToc(t){let r=this.$,s="index.html",n=[],a=[];for(const[r,n]of Object.entries(t)){if(!("name"in n))continue;let t=r==this.repo[0]?`${this.contentRoot}`:`${this.contentRoot}../${r}/`;if("topic"in n)for(const[i,o]of Object.entries(n.topic)){if("string"!=typeof o)continue;let n=new e("a",{href:`${t}${i}/${s}`,className:this.repo.join("/")===`${r}/${i}`?"current":""});n.innerText=o,a.push(n)}else{let i=new e("a",{href:`${t}${s}`,className:this.repo[0]===r?"current":""});i.innerText=n.name,a.push(i)}}a.forEach((e=>{n.push(e.cloneNode(!0))})),r.repotocTreeOverlay.$&&(r.repotocTreeOverlay.removeChilds(),r.repotocTreeOverlay.append(n)),r.repotocTreeSidebar.$&&(r.repotocTreeSidebar.removeChilds(),r.repotocTreeSidebar.append(a))}setState(e,t){e.forEach((e=>{t?e.classList.add("on"):e.classList.remove("on")}))}getOSTheme(){return window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}};function r(){window.app={},app.navigation=t,app.navigation.init()}return r(),r}));
//# sourceMappingURL=app.umd.js.map
