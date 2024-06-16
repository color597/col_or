(function(){"use strict";var e={151:function(e,o,n){var s=n(751),t=n(641);const r=(0,t.Lk)("p",{class:"brand-oppo"},"OPPO",-1),a=(0,t.Lk)("p",{class:"brand-realme"},"真我",-1),l=(0,t.Lk)("p",{class:"brand-oneplus"},"一加",-1);function i(e,o){const n=(0,t.g2)("RouterLink"),s=(0,t.g2)("RouterView");return(0,t.uX)(),(0,t.CE)(t.FK,null,[(0,t.Lk)("nav",null,[(0,t.bF)(n,{to:"/oppo"},{default:(0,t.k6)((()=>[r])),_:1}),(0,t.bF)(n,{to:"/realme"},{default:(0,t.k6)((()=>[a])),_:1}),(0,t.bF)(n,{to:"/oneplus"},{default:(0,t.k6)((()=>[l])),_:1})]),(0,t.bF)(s,{class:"route-view-container"})],64)}var u=n(262);const c={},d=(0,u.A)(c,[["render",i]]);var p=d,v=n(220),m=n(953),_=n(278);let f={models:[{name:"OPPO Find X2 Pro",model:"PDEM30",prjNum:"19066"}]},g={getModels:e=>e.models},w={},k={};var P={namespaced:!0,state:f,getters:g,actions:w,mutations:k};let b={models:[{name:"真我 GT 大师探索版",model:"RMX3366",prjNum:"21615"},{name:"真我 GT5 Pro",model:"RMX3888",prjNum:"23607"}]},h={},C={},L={};var y={namespaced:!0,state:b,getters:h,actions:C,mutations:L};class O{constructor(e,o,n){this.name=e,this.model=o,this.prjNum=n}}class j{constructor(e,o){this.displayVersion=e,this.otaVersion=o}}let S={models:[new O("一加 8","IN2010","19823"),new O("一加 8 Pro","IN2020","19813"),new O("一加 9RT","MT2110","20820"),new O("一加 11","PHB110","22811"),new O("一加 Ace 2 Pro","PJA110","22851"),new O("一加 Ace 3","PJE110","23801")],versions:{22851:[new j(["14.0","2024.1 ~ 2024.2"],"PJA110Pro_11.G.02_6002_202401231508"),new j(["14.0","2024.3"],"PJA110Pro_11.G.03_6003_202402031639"),new j(["14.0","2024.4"],"PJA110Pro_11.G.04_6004_202402182232"),new j(["14.0.1","2024.5 ~ 2024.6"],"PJA110Pro_11.G.06_6006_202403151542"),new j(["14.0.1","2024.7"],"PJA110Pro_11.G.07_6007_202403272132"),new j(["14.0.1","2024.8 ~ 2024.9"],"PJA110Pro_11.G.09_6009_202405030429"),new j(["14.0.1","2024.10"],"PJA110Pro_11.G.10_6010_202405160053"),new j(["14.0.1","2024.11"],"PJA110Pro_11.G.11_6011_202405262132"),new j(["14.0.1","2024.12"],"PJA110Pro_11.G.12_6012_202406110258")]}},X={getModels:e=>e.models,getVersionInfo:e=>o=>e.versions[o]},A={},E={};var R={namespaced:!0,state:S,getters:X,actions:A,mutations:E},V=(0,_.y$)({state:{},getters:{},mutations:{},actions:{},modules:{oppo:P,realme:y,oneplus:R}}),G=n(33),F=n.p+"img/dropdown_arrow.7aa7784f.svg";const K={class:"container"},I={class:"dialog-content"},J={class:"dialog-title"},M={class:"dialog-message"};Boolean;const N={class:"container"},T={class:"dialog-content"},D={key:0,class:"dialog-title"},$={key:1,class:"dialog-message"},x={class:"dialog-view"};var B={__name:"BottomSheetDialog",props:{show:Boolean,title:String,message:String},emits:["update:show"],setup(e,{emit:o}){const n=o,r=()=>{n("update:show",!1)};return(o,n)=>(0,t.bo)(((0,t.uX)(),(0,t.CE)("div",{class:"dialog",onClick:(0,s.D$)(r,["self"])},[(0,t.Lk)("div",N,[(0,t.Lk)("div",T,[e.title?((0,t.uX)(),(0,t.CE)("span",D,(0,G.v_)(e.title),1)):(0,t.Q3)("",!0),e.message?((0,t.uX)(),(0,t.CE)("span",$,(0,G.v_)(e.message),1)):(0,t.Q3)("",!0)]),(0,t.Lk)("main",x,[(0,t.RG)(o.$slots,"default")]),(0,t.Lk)("footer",{class:"close-dialog"},[(0,t.Lk)("button",{onClick:r},"关闭")])])],512)),[[s.aG,e.show]])}};const H=(0,u.A)(B,[["__scopeId","data-v-a6cc69ce"]]);var W=H,Q=n(335);const U={class:"version-display"},q={class:"colorospro-version-display"},z={class:"dialog-version-detail"},Y={class:"detail-title"},Z={class:"detail-content"},ee=["innerHTML"];var oe={__name:"VersionView",props:{model:String,version:[String,String],otaVersion:String},setup(e){const o=e;let n=(0,m.KR)(!1),s=(0,m.KR)([]);const r=()=>{n.value=!n.value};return(0,Q.A)({url:`https://color597.github.io/col_or/ColorOS_Pro/json/CL/${o.model}/${o.otaVersion}.json`}).then((e=>{s.value=JSON.parse(e.data.body)})),(o,a)=>((0,t.uX)(),(0,t.CE)(t.FK,null,[(0,t.Lk)("div",{class:"version-info",onClick:r},[(0,t.Lk)("span",U,(0,G.v_)(e.version[1]),1),(0,t.Lk)("span",q,"ColorOS "+(0,G.v_)(e.version[0])+" Pro",1)]),(0,t.bF)(W,{show:(0,m.R1)(n),"onUpdate:show":a[0]||(a[0]=e=>(0,m.i9)(n)?n.value=e:n=e)},{default:(0,t.k6)((()=>[(0,t.Lk)("div",null,[((0,t.uX)(!0),(0,t.CE)(t.FK,null,(0,t.pI)((0,m.R1)(s).secondContents,(e=>((0,t.uX)(),(0,t.CE)("div",z,[(0,t.Lk)("span",Y,(0,G.v_)(e.title),1),(0,t.Lk)("div",Z,[((0,t.uX)(!0),(0,t.CE)(t.FK,null,(0,t.pI)(e.content.split("\n"),(e=>((0,t.uX)(),(0,t.CE)("span",{innerHTML:e},null,8,ee)))),256))])])))),256))])])),_:1},8,["show"])],64))}};const ne=(0,u.A)(oe,[["__scopeId","data-v-468e3de6"]]);var se=ne;const te={class:"device-container"},re={class:"device-info-model"},ae={class:"device-name"},le={class:"device-model"},ie={class:"version-container"},ue={class:"version-info"},ce={class:"no-version-detail",key:"no-version"};var de={__name:"DeviceView",props:{name:String,model:String,prjNum:String,versions:[String,String]},setup(e){let o=(0,m.KR)(!1),n=()=>{o.value=!o.value};return(r,a)=>((0,t.uX)(),(0,t.CE)(t.FK,null,[(0,t.Lk)("div",te,[(0,t.Lk)("div",{class:"device-info",onClick:a[0]||(a[0]=(...e)=>(0,m.R1)(n)&&(0,m.R1)(n)(...e))},[(0,t.Lk)("div",re,[(0,t.Lk)("span",ae,(0,G.v_)(e.name),1),(0,t.Lk)("span",le,(0,G.v_)(e.model)+" ("+(0,G.v_)(e.prjNum)+")",1)]),(0,t.Lk)("img",{class:(0,G.C4)([{rotate:(0,m.R1)(o)?"rotate":""},"dropdown"]),alt:"Dropdown_Arrow",src:F},null,2)]),(0,t.bo)((0,t.Lk)("div",ie,[(0,t.bo)((0,t.Lk)("div",ue,[((0,t.uX)(!0),(0,t.CE)(t.FK,null,(0,t.pI)(e.versions,((o,n)=>((0,t.uX)(),(0,t.Wv)(se,{key:n,model:e.model,otaVersion:o.otaVersion,version:o.displayVersion},null,8,["model","otaVersion","version"])))),128))],512),[[s.aG,(0,m.R1)(o)&&e.versions]])],512),[[s.aG,(0,m.R1)(o)]])]),(0,t.bo)((0,t.Lk)("div",ce,"暂未收录版本日志",512),[[s.aG,(0,m.R1)(o)&&!e.versions]])],64))}};const pe=(0,u.A)(de,[["__scopeId","data-v-e19baae6"]]);var ve=pe,me={__name:"OppoView",setup(e){const o=(0,m.KR)(V.getters["oppo/getModels"]);return(e,n)=>((0,t.uX)(),(0,t.CE)("div",null,[((0,t.uX)(!0),(0,t.CE)(t.FK,null,(0,t.pI)(o.value,(({name:e,model:o,prjNum:n})=>((0,t.uX)(),(0,t.Wv)(ve,{name:e,model:o,"prj-num":n},null,8,["name","model","prj-num"])))),256))]))}};const _e=me;var fe=_e;const ge={name:"OnePlusView",components:{DeviceView:ve}};var we=Object.assign(ge,{setup(e){const o=(0,m.KR)(V.getters["oneplus/getModels"]);let n=e=>V.getters["oneplus/getVersionInfo"](e);return(e,s)=>((0,t.uX)(),(0,t.CE)("div",null,[((0,t.uX)(!0),(0,t.CE)(t.FK,null,(0,t.pI)(o.value,(({name:e,model:o,prjNum:s})=>((0,t.uX)(),(0,t.Wv)(ve,{name:e,model:o,"prj-num":s,versions:(0,m.R1)(n)(s)},null,8,["name","model","prj-num","versions"])))),256))]))}});const ke=we;var Pe=ke;function be(e,o){return" realme "}const he={},Ce=(0,u.A)(he,[["render",be]]);var Le=Ce;const ye=[{path:"/",name:"devices",redirect:"/oppo",meta:"ColorOS Pro 版本详情"},{path:"/oppo",name:"oppo",component:fe},{path:"/realme",name:"realme",component:Le},{path:"/oneplus",name:"oneplus",component:Pe}],Oe=(0,v.aE)({history:(0,v.sC)(),routes:ye});var je=Oe;const Se=(0,s.Ef)(p);Se.config.globalProperties.$axios=Q.A,Se.use(V).use(je).mount("#app")}},o={};function n(s){var t=o[s];if(void 0!==t)return t.exports;var r=o[s]={exports:{}};return e[s](r,r.exports,n),r.exports}n.m=e,function(){var e=[];n.O=function(o,s,t,r){if(!s){var a=1/0;for(c=0;c<e.length;c++){s=e[c][0],t=e[c][1],r=e[c][2];for(var l=!0,i=0;i<s.length;i++)(!1&r||a>=r)&&Object.keys(n.O).every((function(e){return n.O[e](s[i])}))?s.splice(i--,1):(l=!1,r<a&&(a=r));if(l){e.splice(c--,1);var u=t();void 0!==u&&(o=u)}}return o}r=r||0;for(var c=e.length;c>0&&e[c-1][2]>r;c--)e[c]=e[c-1];e[c]=[s,t,r]}}(),function(){n.d=function(e,o){for(var s in o)n.o(o,s)&&!n.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:o[s]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,o){return Object.prototype.hasOwnProperty.call(e,o)}}(),function(){n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){n.p=""}(),function(){var e={524:0};n.O.j=function(o){return 0===e[o]};var o=function(o,s){var t,r,a=s[0],l=s[1],i=s[2],u=0;if(a.some((function(o){return 0!==e[o]}))){for(t in l)n.o(l,t)&&(n.m[t]=l[t]);if(i)var c=i(n)}for(o&&o(s);u<a.length;u++)r=a[u],n.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return n.O(c)},s=self["webpackChunkcolorospro_version_details"]=self["webpackChunkcolorospro_version_details"]||[];s.forEach(o.bind(null,0)),s.push=o.bind(null,s.push.bind(s))}();var s=n.O(void 0,[504],(function(){return n(151)}));s=n.O(s)})();
//# sourceMappingURL=app.1e309819.js.map