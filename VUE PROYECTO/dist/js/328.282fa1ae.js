"use strict";(self["webpackChunkvue_proyecto"]=self["webpackChunkvue_proyecto"]||[]).push([[328],{1328:function(t,e,n){n.r(e),n.d(e,{default:function(){return A}});var c=n(4108),s=n(9096);const o={class:"event__comments"},a=(0,c.QD)("h1",null,"Tickets de soporte",-1),i={class:"event__comment"},r={class:"event__comment__info"},l={class:"event__comment__body"},u={key:1},k=(0,c.QD)("h3",null,"Acceso no autorizado",-1),_=[k];function h(t,e,n,k,h,d){return(0,c.Wz)(),(0,c.An)("section",o,[a,h.tickets?((0,c.Wz)(!0),(0,c.An)(c.ae,{key:0},(0,c.mi)(h.tickets,(t=>((0,c.Wz)(),(0,c.An)("article",i,[(0,c.QD)("div",r,[(0,c.QD)("p",null,(0,s.WA)(t.contactEmail),1)]),(0,c.QD)("div",l,[(0,c.QD)("p",null,(0,s.WA)(t.text),1)])])))),256)):!1===h.tickets?((0,c.Wz)(),(0,c.An)("article",u,_)):(0,c.g1)("",!0)])}var d=n(3220);const v=(0,d.I)(["token"]);var m={data(){return{tickets:null}},async created(){const t=await fetch("http://localhost:8000/api/tickets",{method:"get",headers:{Authorization:"Bearer "+v.get("token")}});200===t.status?this.tickets=await t.json():this.tickets=!1}},p=n(4100);const f=(0,p.c)(m,[["render",h]]);var A=f}}]);
//# sourceMappingURL=328.282fa1ae.js.map