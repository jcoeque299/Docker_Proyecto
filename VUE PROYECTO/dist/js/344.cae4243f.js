"use strict";(self["webpackChunkvue_proyecto"]=self["webpackChunkvue_proyecto"]||[]).push([[344],{3344:function(e,t,r){r.r(t),r.d(t,{default:function(){return f}});var s=r(4108),n=r(9096);const a=(0,s.QD)("h1",null,"Resultados",-1),d=["src","alt"],o={class:"event__card__content"},i={key:0},c={key:1},u={key:1},l=(0,s.QD)("h2",null,"No hay resultados",-1),v=[l],p={key:2},y=(0,s.QD)("h2",null,"Error de búsqueda. Por favor, usa el formulario para realizar búsquedas",-1),h=[y];function m(e,t,r,l,y,m){const _=(0,s.E1)("router-link");return y.events?((0,s.Wz)(),(0,s.An)("section",{key:y.events,class:"event__card__container"},[a,((0,s.Wz)(!0),(0,s.An)(s.ae,null,(0,s.mi)(y.events,(e=>((0,s.Wz)(),(0,s.An)("article",{class:"event__card",key:e.id},[(0,s.K2)(_,{to:{name:"event",params:{id:e.id}}},{default:(0,s.Ql)((()=>[e.images?((0,s.Wz)(),(0,s.An)("img",{key:0,src:e.images[0].url,alt:e.name},null,8,d)):(0,s.g1)("",!0),(0,s.QD)("div",o,[(0,s.QD)("h2",null,(0,n.WA)(e.name),1),e.dates.start.dateTBD||e.dates.start.dateTBA?(0,s.g1)("",!0):((0,s.Wz)(),(0,s.An)("p",i,(0,n.WA)(e.dates.start.localDate),1)),e._embedded&&e._embedded.venues?((0,s.Wz)(),(0,s.An)("p",c,(0,n.WA)(e._embedded.venues[0].country.name)+", "+(0,n.WA)(e._embedded.venues[0].city.name),1)):(0,s.g1)("",!0)])])),_:2},1032,["to"])])))),128))])):!1===y.events?((0,s.Wz)(),(0,s.An)("section",u,v)):y.error?((0,s.Wz)(),(0,s.An)("section",p,h)):(0,s.g1)("",!0)}var _={props:{query:{type:String,required:!1},type:{type:String,required:!1},country:{type:String,required:!1},date:{type:String,required:!1}},data(){return{events:null,error:!1}},watch:{$route(e,t){this.searchEvents()}},async created(){await this.searchEvents()},methods:{async searchEvents(){try{const e=await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?keyword=${this.$props.query}&countryCode=${this.$props.country}&classificationName=${this.$props.type}&startDateTime=${this.$props.date}T00:00:00Z&apikey=S1sDAS05dZI5JmtvdarQaZN5tFxkOUpr`),t=await e.json();if(t._embedded)return this.events=t._embedded.events,void console.log(this.events);this.events=!1}catch{this.error=!0}}}},k=r(4100);const A=(0,k.c)(_,[["render",m]]);var f=A}}]);
//# sourceMappingURL=344.cae4243f.js.map