!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("@sentry/browser")):"function"==typeof define&&define.amd?define(["@sentry/browser"],t):"object"==typeof exports?exports.crm=t(require("@sentry/browser")):(e.tikSDK=e.tikSDK||{},e.tikSDK.crm=t(e.Sentry))}(this,(function(e){return function(e){var t={};function i(a){if(t[a])return t[a].exports;var r=t[a]={i:a,l:!1,exports:{}};return e[a].call(r.exports,r,r.exports,i),r.l=!0,r.exports}return i.m=e,i.c=t,i.d=function(e,t,a){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(i.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(a,r,function(t){return e[t]}.bind(null,r));return a},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i(i.s=6)}([function(e,t,i){var a,r,n;"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self&&self,r=[t,i(7),i(8),i(3)],void 0===(n="function"==typeof(a=function(e,t,i,a){"use strict";function r(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return r=function(){return e},e}var n;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,t=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var t=r();if(t&&t.has(e))return t.get(e);var i={},a=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var n in e)if(Object.prototype.hasOwnProperty.call(e,n)){var s=a?Object.getOwnPropertyDescriptor(e,n):null;s&&(s.get||s.set)?Object.defineProperty(i,n,s):i[n]=e[n]}return i.default=e,t&&t.set(e,i),i}(t),i=(n=i)&&n.__esModule?n:{default:n},globalThis.tikSdkSession||(globalThis.tikSdkSession={authToken:null,instructorAuthToken:null});var s=class{constructor(){this.resource=null,this.model_name="",this.verbose_name="",this.verbose_name_plural="",this.view_perm="",this.add_perm="",this.change_perm="",this.delete_perm="",this.lookup_field="id",this.useCache={list:!1,get:!1},this.validateCache=!0}get base_domain(){return(0,a.base_domain)()}get base_url(){return(0,a.base_url)()}get session(){return globalThis.tikSdkSession}configCache(e,t){this.useCache=e,this._cacheTimeout&&clearInterval(this._cacheTimeout),t&&(this.cacheTimeout=t,this._cacheTimeout=setInterval(()=>{this.validateCache=!0},this.cacheTimeout))}async http(e,a,r,n=!1){a=a?`${this.resource}/${a}`:""+this.resource;let s,o={},l=`${this.base_url}${a}/`;if(r&&"GET"===e)l+=i.default.stringify(r,!0),r=null;else if(r)if(Object.values(r).some(e=>e instanceof File||e instanceof Blob)){const e=new FormData;for(let[t,i]of Object.entries(r))null==i?i="":i instanceof Date?i=i.toISOString():Array.isArray(i)?i=JSON.stringify(i):i instanceof File||i instanceof Blob||(i=i instanceof Object?JSON.stringify(i):"boolean"==typeof i?i?"True":"False":i.toString()),e.append(t,i);r=e}else r=JSON.stringify(r),o={"Content-Type":"application/json; charset=utf-8"};else r=void 0;console.log(e,a,r||"");try{if(this.session.authToken&&(o.Authorization="Bearer "+this.session.authToken),s=await fetch(l,{method:e,headers:o,body:r,mode:"cors",cache:"no-cache",redirect:"follow",referrer:"no-referrer"}),!(s.ok||n&&[404,401].includes(s.status))){const e=new Error(s.statusText||s.status);throw e.response=s,e}if("DELETE"!==e)return await s.json()}catch(e){throw console.error("HTTP Error:",l.toString(),JSON.stringify(r),s&&s.status),console.log("Sentry",typeof t,t,Object.keys(t)),"object"==typeof t&&"captureException"in t&&t.captureException(e),e}}toObj(e){return e}toString(e){return e.title?e.title:e.name?e.name:""}async list(){if(this.useCache.list&&!this.validateCache&&this.data)console.log(`[HTTP] ${this.resource}.list(): using cache`);else{const e=await this.http("GET","");this.data=e,this.validateCache=!1}return this.data}async get(e,t=!1){if(e){const i=await this.http("GET",e,null,t);return this.toObj(i)}return this.new()}async save(e,t,i=!1,a=!1,r=!1){if(this.validateCache=!0,!e[this.lookup_field]&&!t||i)return await this.http("POST","",e,r);{const i=await this.http(a?"PATCH":"PUT",t||e[this.lookup_field],e,r);return this.toObj(i)}}new(){return null}async delete(e){return this.validateCache=!0,this.http("DELETE",e)}};e.default=s})?a.apply(t,r):a)||(e.exports=n)},function(e,t,i){var a,r,n;"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self&&self,r=[t,i(0),i(2)],void 0===(n="function"==typeof(a=function(e,t,i){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,t=a(t),i=a(i);class r extends t.default{constructor(){super(),this.resource="products",this.model_name="product",this.verbose_name="Product",this.verbose_name_plural="Products",this.view_perm="product:view",this.add_perm="product:add",this.change_perm="product:change",this.delete_perm="product:delete",this.lookup_field="sku",this.configCache({list:!0},15e3)}new(){return{title:"",count:0,sku:"",category_id:null,category_title:"",is_active:!0,saleoffers:[],price_net:0,tax_rate:19,cost_price:0,has_variants:!1,is_shipping_required:!0,is_digital:!1,charge_taxes:!0,charge_shipping:!1}}async addStock(e,t){return this.http("POST",e.sku+"/stock",{count:t})}async rapport(e){return this.http("GET","rapport",e)}async categories(){return i.default.list()}defaultPrice(e){return parseFloat(e.price_net)*(1+e.tax_rate/100)}offerPrice(e,t,i){return e=parseFloat(e),"%"===i.discount_type&&i.discount_percentage?e=parseFloat(e)*(1-i.discount_percentage/100):"n"===i.discount_type&&i.discount_amount&&(e=parseFloat(e)-parseFloat(i.discount_amount)),e*t}offer(e,t){let i={count_min:0,discount_percentage:0};return e.saleoffers&&(i=e.saleoffers.reduce((e,i)=>i.count_min<=t&&i.count_min>=e.count_min?i:e,i)),i}price(e,t){const i=this.defaultPrice(e),a=this.offer(e,t);return this.offerPrice(i,t,a)}stockColor(e){return e.count<300?"#dd4b39":e.count<500?"#f39c12":"#00a65a"}status(){return[{name:"stock",displayName:"Stock",icon:"fa fa-cubes",backgroundColor:"rgb(137, 255, 88)"},{name:"new",displayName:"Nouveaux",icon:"fa fa-shopping-cart",backgroundColor:"#f6e06c"},{name:"scheduled",displayName:"Réservés",icon:"fa fa-hourglass-half",backgroundColor:"rgb(255, 255, 210)",color:"white"},{name:"inprogress",displayName:"En Cours",icon:"fa fa-truck",backgroundColor:"#337ab7"},{name:"done",displayName:"Délivrés",icon:"fa fa-check",backgroundColor:"#89ff58"},{name:"canceled",displayName:"Annulés",icon:"fa fa-times",backgroundColor:"#ff7b7b"},{name:"paid",displayName:"Payés",icon:"fa fa-money",backgroundColor:"rgb(32, 216, 223)"},{name:"returned",displayName:"Retourne Dépot",icon:"fa fa-cubes",backgroundColor:"#000000",color:"white"},{name:"released",displayName:"Libérés",icon:"fa fa-truck",backgroundColor:"#131654"}]}}var n=new r;e.default=n})?a.apply(t,r):a)||(e.exports=n)},function(e,t,i){var a,r,n;"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self&&self,r=[t,i(0)],void 0===(n="function"==typeof(a=function(e,t){"use strict";var i;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,t=(i=t)&&i.__esModule?i:{default:i};class a extends t.default{constructor(){super(),this.resource="categories",this.model_name="category",this.verbose_name="Category",this.verbose_name_plural="Categories",this.view_perm="category:view",this.add_perm="category:add",this.change_perm="category:change",this.delete_perm="category:delete",this.configCache({list:!0},216e6)}new(){return{id:"",title:"",thumbnail:void 0,is_active:!0}}}var r=new a;e.default=r})?a.apply(t,r):a)||(e.exports=n)},function(e,t,i){var a,r,n;"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self&&self,r=[t,i(9)],void 0===(n="function"==typeof(a=function(e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.setConfigValue=function(e,t){globalThis.tikSdkConfig[e]=t},e.setConfig=a,e.setConfigOrganization=function(e){a({API_BASE_URL:e.api_base_url,API_PREFIX:e.api_prefix,CACHE_PREFIX:e.cache_prefix})},e.base_domain=r,e.base_url=function(){return r()+globalThis.tikSdkConfig.API_PREFIX},e.saas_base_domain=n,e.saas_base_url=function(){return n()+globalThis.tikSdkConfig.API_PREFIX},e.default=void 0;const i={API_BASE_URL:"",SAAS_API_BASE_URL:"",API_PREFIX:"/api/",CACHE_PREFIX:"",VERSION:t.version,PROTOCOL:"https"};function a(e){for(const t of Object.keys(i))t in e&&(globalThis.tikSdkConfig[t]=e[t])}function r(){return globalThis.tikSdkConfig.API_BASE_URL}function n(){return globalThis.tikSdkConfig.SAAS_API_BASE_URL}globalThis.tikSdkConfig||(globalThis.tikSdkConfig={}),function(){for(const e of Object.keys(i))e in globalThis.tikSdkConfig||(globalThis.tikSdkConfig[e]=i[e])}();var s=globalThis.tikSdkConfig;e.default=s})?a.apply(t,r):a)||(e.exports=n)},function(e,t,i){var a,r,n;"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self&&self,r=[t,i(0)],void 0===(n="function"==typeof(a=function(e,t){"use strict";var i;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,t=(i=t)&&i.__esModule?i:{default:i};class a extends t.default{constructor(){super(),this.resource="delivery-companies",this.model_name="delivery",this.verbose_name="Delivery Company",this.verbose_name_plural="Delivery Companies",this.view_perm="delivery:view",this.add_perm="delivery:add",this.change_perm="delivery:change",this.delete_perm="delivery:delete",this.configCache({list:!0},36e5)}new(){return{id:"",type:"aramex",attrs:{},name:"",done:0,canceled:0,phone:"",email:"",address:"",is_active:!0}}async rapport(e){return this.http("GET","rapport",e)}async primary(){return(await this.list()).find(e=>e.is_primary)}toObj(e){return e.attrs||(e.attrs={}),this.updateAttrs(e),e}updateAttrs(e){if(!e.type)return;const t=this.typeAttrs(e.type);for(const i of t)void 0===e.attrs[i.name]&&(e.attrs[i.name]=i.default)}typeAttrs(e){const t=this.types().find(t=>t.ref===e);return t?t.attrs:[]}types(){return[{ref:"aramex",name:"Aramex",color:"rgb(228, 51, 51)",attrs:[{name:"number",type:"text",default:""},{name:"pin",type:"password",default:""},{name:"entity",type:"text",default:"TUN"},{name:"country_code",type:"text",default:"TN"}]},{ref:"fparcel",name:"FParcel",color:"rgb(23, 97, 39)",attrs:[]},{ref:"1delivery",name:"First Delivery",color:"rgb(0, 141, 76)",attrs:[]},{ref:"tnexpress",name:"Tunisia Express",color:"rgb(0, 128, 255)",attrs:[{name:"username",type:"text",default:""},{name:"password",type:"password",default:""},{name:"api_key",type:"text",default:""}]}]}status(){return[{name:"new",displayName:"Nouveaux",icon:"fa fa-hourglass-half",backgroundColor:"rgb(255,255,210)",color:"black"},{name:"created",displayName:"Command Confirmée",icon:"fa fa-shopping-cart",backgroundColor:"rgb(246, 224, 108)",color:"black"},{name:"in_delivery_facility",displayName:"En Depot",icon:"fa fa-bank",backgroundColor:"rgb(212, 137, 69)"},{name:"out_for_delivery",displayName:"En Cours",icon:"fa fa-truck",backgroundColor:"#337ab7"},{name:"returned_delivery_facility",displayName:"Echec",icon:"fa fa-warning",backgroundColor:"rgb(255, 123, 123)"},{name:"canceled",displayName:"Annulé",icon:"fa fa-times",backgroundColor:"rgb(228, 51, 51)"},{name:"delivered",displayName:"Délivré",icon:"fa fa-check",backgroundColor:"rgb(137, 255, 88)"},{name:"returned_shipper",displayName:"Retourne Definitif",icon:"fa fa-cubes",backgroundColor:"black"},{name:"paid",displayName:"Payé",icon:"fa fa-money",backgroundColor:"rgb(32, 216, 223)"}]}}var r=new a;e.default=r})?a.apply(t,r):a)||(e.exports=n)},function(e,t,i){var a,r,n;"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self&&self,r=[t,i(0)],void 0===(n="function"==typeof(a=function(e,t){"use strict";var i;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,t=(i=t)&&i.__esModule?i:{default:i};class a extends t.default{constructor(){super(),this.resource="stores",this.model_name="store",this.verbose_name="Store",this.verbose_name_plural="Stores",this.view_perm="store:view",this.add_perm="store:add",this.change_perm="store:change",this.delete_perm="store:delete",this.configCache({list:!0},36e5)}new(){return{id:"",title:"",thumbnail:void 0,phone:"",email:"",address:"",city:"",country:"TN",state:"Sfax",company_name:"",vat_number:"",postal_code:3e3,is_active:!0}}async primary(){return(await this.list()).find(e=>e.is_primary)}}var r=new a;e.default=r})?a.apply(t,r):a)||(e.exports=n)},function(e,t,i){var a,r,n;"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self&&self,r=[t,i(2),i(10),i(11),i(12),i(4),i(1),i(14),i(16),i(5)],void 0===(n="function"==typeof(a=function(e,t,i,a,r,n,s,o,l,d){"use strict";function c(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"categories",{enumerable:!0,get:function(){return t.default}}),Object.defineProperty(e,"clients",{enumerable:!0,get:function(){return i.default}}),Object.defineProperty(e,"collections",{enumerable:!0,get:function(){return a.default}}),Object.defineProperty(e,"commands",{enumerable:!0,get:function(){return r.default}}),Object.defineProperty(e,"delivery",{enumerable:!0,get:function(){return n.default}}),Object.defineProperty(e,"products",{enumerable:!0,get:function(){return s.default}}),Object.defineProperty(e,"staffs",{enumerable:!0,get:function(){return o.default}}),Object.defineProperty(e,"stock",{enumerable:!0,get:function(){return l.default}}),Object.defineProperty(e,"stores",{enumerable:!0,get:function(){return d.default}}),t=c(t),i=c(i),a=c(a),r=c(r),n=c(n),s=c(s),o=c(o),l=c(l),d=c(d)})?a.apply(t,r):a)||(e.exports=n)},function(t,i){t.exports=e},function(e,t,i){"use strict";var a=Object.prototype.hasOwnProperty;function r(e){try{return decodeURIComponent(e.replace(/\+/g," "))}catch(e){return null}}function n(e){try{return encodeURIComponent(e)}catch(e){return null}}t.stringify=function(e,t){t=t||"";var i,r,s=[];for(r in"string"!=typeof t&&(t="?"),e)if(a.call(e,r)){if((i=e[r])||null!=i&&!isNaN(i)||(i=""),r=n(r),i=n(i),null===r||null===i)continue;s.push(r+"="+i)}return s.length?t+s.join("&"):""},t.parse=function(e){for(var t,i=/([^=?#&]+)=?([^&]*)/g,a={};t=i.exec(e);){var n=r(t[1]),s=r(t[2]);null===n||null===s||n in a||(a[n]=s)}return a}},function(e){e.exports=JSON.parse('{"name":"tik-sdk","version":"2020.09.09","main":"index.js","module":"index.js","types":"types/tik-sdk.full.d.ts","exports":{".":"./index.js","./src/":"./src/"},"description":"TIK SDK","license":" GPL-3.0-only","author":{"name":"TIK (Technology Innovation Network)","email":"contact@tik.tn","url":"https://tik.tn"},"homepage":"https://tik.tn","private":true,"scripts":{"test":"jest","build:webpack":"webpack","build:babel":"babel index.js -d lib","lint":"eslint --ext .js,.vue,.ts --ignore-path .gitignore --ignore-pattern **/*.min.js . --ignore-pattern dist/"},"browserslist":["last 2 versions AND last 2 years AND supports es6-module","not IE 11","not IE_Mob 11","not dead"],"dependencies":{"@sentry/browser":"^5.5.0","@sentry/integrations":"^5.5.0","querystringify":"^2.1.1"},"devDependencies":{"dotenv-webpack":"^3.0.0","@babel/cli":"^7.11.6","@babel/core":"^7.11.6","@babel/plugin-transform-modules-umd":"^7.10.4","@babel/preset-env":"^7.11.5","babel-eslint":"^10.0.1","babel-jest":"^26.3.0","babel-loader":"^8.1.0","clean-webpack-plugin":"^3.0.0","eslint":"^7.2.0","eslint-config-prettier":"^6.0.0","eslint-config-standard":">=12.0.0","eslint-loader":"^4.0.2","eslint-plugin-import":">=2.16.0","eslint-plugin-jest":">=24.0.0","eslint-plugin-node":">=8.0.1","eslint-plugin-prettier":"^3.0.1","eslint-plugin-promise":">=4.0.1","eslint-plugin-standard":">=4.0.0","husky":"^4.0.1","jest":"^26.4.2","lint-staged":"^10.3.0","nodemon":"^2.0.4","prettier":"^2.0.5","stylelint":"^13.1.0","ts-loader":"^8.0.3","typescript":"^4.0.2","webpack":"^4.44.1","webpack-cli":"^3.3.12"}}')},function(e,t,i){var a,r,n;"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self&&self,r=[t,i(0)],void 0===(n="function"==typeof(a=function(e,t){"use strict";var i;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,t=(i=t)&&i.__esModule?i:{default:i};class a extends t.default{constructor(){super(),this.resource="clients",this.model_name="client",this.verbose_name="Client",this.verbose_name_plural="Clients",this.view_perm="client:view",this.add_perm="client:add",this.change_perm="client:change",this.delete_perm="client:delete",this.configCache({list:!0},3e5)}new(){return{full_name:"",first_name:"",last_name:"",attrs:{type:"detail",facebook_url:""},phone:"",address:"",country:"TN",state:"Sfax",postal_code:"",email:"",company_name:"",vat_number:""}}toObj(e){return e.attrs||(e.attrs={}),Object.defineProperties(e,{type:{get(){return this.attrs.type},set(e){this.attrs.type=e}}}),e}toString(e){return`${e.first_name||""} ${e.last_name||""}`}async rapport(e){return this.http("GET",e+"/rapport")}async history(e){return this.http("GET",e+"/history")}typeAchat(){return["gros","detail"]}states(){return["Ariana","Beja","Ben Arous","Bizerte","Gabes","Gafsa","Jendouba","Kairouan","Kasserine","Kebili","Kef","Mahdia","Mannouba","Medenine","Monastir","Nabeul","Sfax","Sidi Bouzid","Siliana","Sousse","Tataouine","Tozeur","Tunis","Zaghouan"]}}var r=new a;e.default=r})?a.apply(t,r):a)||(e.exports=n)},function(e,t,i){var a,r,n;"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self&&self,r=[t,i(1),i(0)],void 0===(n="function"==typeof(a=function(e,t,i){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,t=a(t),i=a(i);class r extends i.default{constructor(){super(),this.resource="collections",this.model_name="collection",this.verbose_name="Collection",this.verbose_name_plural="Collections",this.view_perm="collection:view",this.add_perm="collection:add",this.change_perm="collection:change",this.delete_perm="collection:delete",this.lookup_field="sku",this.configCache({list:!0},36e5)}new(){return{sku:"",title:"",description:"",delivery_id:null,suivi_id:null,items:[{product_id:null,name:"",price:0,count:0}],discount:0,price_net:0,thumbnail:"",is_active:!0}}itemPrice(e){return e.product_id&&e.product?t.default.price(e.product,e.count):parseFloat(e.price)}addItem(e,t){let i;"object"==typeof t?(i=e.items.find(e=>e.product_id===t.id),i?i.count++:(i={title:t.title,count:1,product_id:t.id,max_count:t.count,product:t},e.items.push(i))):(i={title:"",count:0,price:0,product_id:null,max_count:0},e.items.push(i)),i.price=this.itemPrice(i),e.price_net=this.price(e)}changeItemProduct(e,t,i){"string"==typeof i?(t.product_id=null,t.product=null,t.title=i,t.max_count=4294967295):(t.product_id=i.id,t.product=i,t.title=i.title,t.max_count=i.count||4294967295),t.price=0,t.count=1,t.price=this.itemPrice(t),e.price_net=this.price(e)}removeItem(e,t){e.items.splice(e.items.indexOf(t),1),e.price_net=this.price(e)}price(e){const t=e.items.reduce((e,t)=>this.itemPrice(t)+e,0)-parseFloat(e.discount||0);return Math.round(100*t)/100}}var n=new r;e.default=n})?a.apply(t,r):a)||(e.exports=n)},function(e,t,i){var a,r,n;"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self&&self,r=[t,i(0),i(4),i(5),i(1),i(13)],void 0===(n="function"==typeof(a=function(e,t,i,a,r,n){"use strict";function s(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,t=s(t),i=s(i),a=s(a),r=s(r),n=s(n);class o extends t.default{constructor(){super(),this.resource="commands",this.model_name="command",this.verbose_name="Command",this.verbose_name_plural="Commands",this.view_perm="command:view",this.add_perm="command:add",this.change_perm="command:change",this.delete_perm="command:delete",this.configCache({list:!0},6e4)}async new(){return{client_id:null,client_attrs:{full_name:"",phone:"",address:"",country:"TN",state:"",city:"",postal_code:""},type:"delivery",delivery_id:(await i.default.primary()||{}).id,store_id:(await a.default.primary()||{}).id,store_name:(await a.default.primary()||{}).title,commercial_id:null,suivi_id:null,status:"new",customer_note:"",staff_notes:[],items:[{product_id:null,title:"",price:0,count:0}],discount:0,total:0}}toString(e){return e.id?e.id.toString().padStart(8,"0"):""}setClient(e,t){t?(e.client_id=t.id,e.client_attrs.phone=t.phone,e.client_attrs.full_name=t.full_name,e.client_attrs.address=t.address,e.client_attrs.country=t.country,e.client_attrs.state=t.state,e.client_attrs.postal_code=t.postal_code):(e.client_id=null,e.client_attrs={})}itemPrice(e){return e.product_id?e.product?r.default.price(e.product,e.count):void 0:parseFloat(e.price)}addItem(e,t){let i;"object"==typeof t?(i=e.items.find(e=>e.product_id===t.id),i?i.count++:(i={title:t.title,count:1,product_id:t.id,max_count:t.count,product:t},e.items.push(i))):(i={title:"",count:0,price:0,product_id:null,max_count:0},e.items.push(i)),i.price=this.itemPrice(i),e.total=this.price(e)}changeItemProduct(e,t,i){"string"==typeof i?(t.product_id=null,t.product=null,t.title=i,t.max_count=4294967295):(t.product_id=i.id,t.product=i,t.title=i.title,t.max_count=i.count||4294967295),t.price=0,t.count=1,t.price=this.itemPrice(t),e.total=this.price(e)}removeItem(e,t){e.items.splice(e.items.indexOf(t),1),e.total=this.price(e)}price(e){const t=e.items.reduce((e,t)=>this.itemPrice(t)+e,0)-parseFloat(e.discount||0);return Math.round(100*t)/100}totalHT(e){return n.default.tax_rate?(parseFloat(e.total)+parseFloat(e.discount||0))/(1+parseFloat(n.default.tax_rate)/100):parseFloat(e.total)+parseFloat(e.discount||0)}tva(e){return n.default.tax_rate?parseFloat(e.total)/(1+parseFloat(n.default.tax_rate)/100)*(parseFloat(n.default.tax_rate)/100):0}ttc(e){return parseFloat(e.total)+parseFloat(n.default.tax_stamp||0)}async rapport(e){return this.http("GET","rapport",e)}async deliver(e,t=null){return t?this.http("POST",e.id+"/deliver",{command_id:e.id,shipment_id:t}):this.http("POST",e.id+"/deliver")}async track(e){return this.http("POST",e.id+"/track")}async shipment(e){return this.http("GET",e.id+"/deliver")}async assign(e,t){return this.http("POST","assign",{staff_id:e,commands:t.map(e=>e.id)})}async makeNew(e,t){return this.http("POST","new",{staff_id:e,commands:t.map(e=>e.id)})}async cash(e,t){return this.http("POST","cash",{staff_id:e,commands:t.map(e=>e.id)})}async paid(e,t){return this.http("POST","paid",{staff_id:e,commands:t.map(e=>e.id)})}async returned(e,t){return this.http("POST","returned",{staff_id:e,commands:t.map(e=>e.id)})}commandTypes(){return["direct","delivery"]}commandStatus(){return["new","scheduled","inprogress","done","canceled","returned","cash","paid"]}status(){return[{name:"new",displayName:"Nouveaux",icon:"fa fa-shopping-cart",backgroundColor:"#f6e06c",date:"created_at"},{name:"scheduled",displayName:"Réservés",icon:"fa fa-hourglass-half",backgroundColor:"rgb(255, 255, 210)",date:"scheduled_at"},{name:"inprogress",displayName:"En Cours",icon:"fa fa-truck",backgroundColor:"#337ab7",date:"assigned_at"},{name:"done",displayName:"Délivrés",icon:"fa fa-check",backgroundColor:"#89ff58",date:"completed_at"},{name:"canceled",displayName:"Annulés",icon:"fa fa-times",backgroundColor:"#ff7b7b",date:"completed_at"},{name:"cash",displayName:"Encaisés",icon:"fa fa-bank",backgroundColor:"#e6e6e6",date:"cash_at"},{name:"paid",displayName:"Payés",icon:"fa fa-money",backgroundColor:"rgb(32, 216, 223)",date:"paid_at"},{name:"returned",displayName:"Retourne Dépot",icon:"fa fa-cubes",backgroundColor:"#000000",color:"white",date:"paid_at",dark:!0}]}}var l=new o;e.default=l})?a.apply(t,r):a)||(e.exports=n)},function(e,t,i){var a,r,n;"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self&&self,r=[t,i(0),i(3)],void 0===(n="function"==typeof(a=function(e,t,i){"use strict";var a;Object.defineProperty(e,"__esModule",{value:!0}),e.default=e.Organization=e.organizationApi=void 0,t=(a=t)&&a.__esModule?a:{default:a};class r extends t.default{constructor(){super(),this.resource="site"}toObj(e){return e.attrs||(e.attrs={}),e.payment_providers||(e.payment_providers=[]),e._phone=e.phone,delete e.cover_file,delete e.picture_file,delete e.background_image_file,e}}const n=new r;e.organizationApi=n;class s{constructor(e){e&&this.apply(e)}async refresh(){const e=await n.list();e&&this.apply(e)}apply(e){this.data=e;const t=new URL((0,i.base_url)());this.http_protocol=(t.protocol||"https:")+"//",this.http_port=t.port?":"+t.port:"";const a={};for(const t of e.domains)a[t.type]=t.domain;a.api||(a.api=a.admin),a.admin||(a.admin=a.api),a.cdn||(a.cdn=a.api),this.domains=a,this.env(this)}html2txt(e){return e?e.replace(/<[^>]+>/g,""):""}env(e){return e||(e={}),e.hide_website=!(!this.data.hide_website&&!{}.HIDE_WEBSITE),e.modules=(this.data.modules||{}.MODULES||"").split(","),e.installed_apps=(this.data.installed_apps||{}.INSTALLED_APPS||"").split(","),e.delivery_backends=(this.data.delivery_backends||{}.DELIVERY_BACKENDS||"").split(","),e.description=this.data.description||"",e.description_txt=this.data.description_txt||this.html2txt(this.data.description)||"",e.display_name=this.data.display_name||this.data.name,e.short_name=this.data.name,e.cover=this.static(this.data.cover),e.picture=this.static(this.data.picture),e.favicon=this.static(this.data.favicon),e.logo=this.static(this.data.picture),e.background_image=this.static(this.data.background_image),e.email=this.data.email,e.location=this.data.location,e.phone=this.data.phone,e.slug=this.data.slug,e.cache_prefix=this.data.slug,e.about_us=this.data.summary,e.about_us_fr=this.data.summary,e.fb_url=this.data.facebook_url,e.twitter_url=this.data.twitter_url,e.youtube_url=this.data.youtube_url,e.instagram_url=this.data.instagram_url,e.linkedin_url=this.data.linkedin_url,e.wiretransfer=this.data.wiretransfer,e.mandat=this.data.mandat,e.payment_providers=this.data.payment_providers,e.default_currency=this.data.default_currency,e.tax_rate=this.data.tax_rate,e.tax_stamp=this.data.tax_stamp,e.api_prefix={}.API_PREFIX||"/api/",e.maintenance_mode=this.data.maintenance_mode||{}.MAINTENANCE_MODE,e.maintenance_token=this.data.maintenance_token||{}.MAINTENANCE_TOKEN,e.api_base_url=`${this.http_protocol}${this.domains.api}${this.http_port}`,this.domains.webapp?e.base_url=`${this.http_protocol}${this.domains.webapp}`:e.base_url={}.BASE_URL,e.piwik_site_id=this.data.piwik_site_id||{}.PIWIK_SITE_ID,e.fb_pixel_id=this.data.fb_pixel_id||{}.FB_PIXEL_ID,e.fb_page_id=this.data.fb_page_id||{}.FB_PAGE_ID,e.fb_app_id=this.data.fb_app_id,e.google_analytics_id=this.data.google_analytics_id||{}.GOOGLE_ANALYTICS_ID,e.google_gtag_id=this.data.google_gtag_id||{}.GOOGLE_GTAG_ID,e.locales=({}.LOCALES||"en-US,fr-FR").split(","),e.default_locale=this.data.default_locale,e.newsletter_default_subject="default",e}ENV(e){function t(e){return null==e?"":e}e||(e={});const i=this.env();for(const a of Object.keys(i)){const r=t(i[a]);if(Array.isArray(r))e[a.toUpperCase()]=r.join(",");else if(r&&"object"==typeof r)for(const i of Object.keys(r)){const n=t(r[i]);e[`${a}_${i}`.toUpperCase()]=n}else e[a.toUpperCase()]=r}return e}static(e){return e&&e.startsWith("/")?`${this.http_protocol}${this.domains.cdn}${this.http_port}${e}`:e}hasModule(e){return this.modules.includes(e)}hasDeliveryBackend(e){return this.delivery_backends.includes(e)}}e.Organization=s,globalThis.TikSdkOrganization||(globalThis.TikSdkOrganization=new s);var o=globalThis.TikSdkOrganization;e.default=o})?a.apply(t,r):a)||(e.exports=n)},function(e,t,i){var a,r,n;"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self&&self,r=[t,i(15)],void 0===(n="function"==typeof(a=function(e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;class i extends t.UsersApi{constructor(){super(),this.resource="staffs",this.model_name="staff",this.verbose_name="Staff",this.verbose_name_plural="Staffs",this.view_perm="staff:view",this.add_perm="staff:add",this.change_perm="staff:change",this.delete_perm="staff:delete",this.configCache({list:!0},36e5)}new(){return{first_name:"",last_name:"",full_name:"",roles:["commercial"],phone:"",email:"",attrs:{unlimited_access:!1,start_at:"08:00",end_at:"18:00"},is_active:!0,is_staff:!0}}toObj(e){return e&&"user_not_found"!==e.code?(e.roles=["admin","manager","finance","suivi","commercial","stock","freelance"].filter(t=>e.roles.includes(t)),Object.defineProperties(e,{role:{get(){return this.roles[0]}},is_admin:{get(){return this.roles.includes("admin")}},is_freelance:{get(){return this.roles.includes("freelance")}},start_at:{value:"08:00",writable:!1},end_at:{value:"18:00",writable:!1},unlimited_access:{get(){return this.attrs.unlimited_access},set(e){this.attrs.unlimited_access=e}}}),e):null}toString(e){return`${e.first_name||""} ${e.last_name||""}`}async unlimited(){return this.http("GET","unlimited")}roles(){return["admin","manager","finance","suivi","commercial","stock",...{}.MODULES.includes("pos")&&["pos"]||[]]}}var a=new i;e.default=a})?a.apply(t,r):a)||(e.exports=n)},function(e,t,i){var a,r,n;"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self&&self,r=[t,i(0)],void 0===(n="function"==typeof(a=function(e,t){"use strict";var i;Object.defineProperty(e,"__esModule",{value:!0}),e.default=e.UsersApi=void 0,t=(i=t)&&i.__esModule?i:{default:i};class a extends t.default{constructor(){super(),this.resource="users",this.model_name="user",this.verbose_name="User",this.verbose_name_plural="Users",this.view_perm="user:view",this.add_perm="user:add",this.change_perm="user:change",this.delete_perm="user:delete",this.configCache({list:!0},36e5)}async me(){const e=await this.http("GET","me",null,!0);return this.toObj(e)}async activate(e,t){return await this.http("POST",e+"/activate",{token:t},!0)}async get_by_email(e){return await this.http("POST","email",{email:e},!0)}toString(e){return`${e.first_name||""} ${e.last_name||""}`}}e.UsersApi=a;var r=new a;e.default=r})?a.apply(t,r):a)||(e.exports=n)},function(e,t,i){var a,r,n;"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self&&self,r=[t,i(0)],void 0===(n="function"==typeof(a=function(e,t){"use strict";var i;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,t=(i=t)&&i.__esModule?i:{default:i};class a extends t.default{constructor(){super(),this.resource="stock",this.model_name="stock",this.verbose_name="Stock",this.verbose_name_plural="Stock",this.view_perm="stock:view",this.add_perm="stock:add",this.change_perm="stock:change",this.delete_perm="stock:delete",this.configCache({list:!0},6e4)}async report(e,t){return this.http("GET","report",{assigned_at:e,suivi_id:t})}async release(e,t){return this.http("POST","release",{staff_id:e,commands:t.map(e=>e.id)})}toString(e){return e.id?e.id.toString().padStart(8,"0"):""}}var r=new a;e.default=r})?a.apply(t,r):a)||(e.exports=n)}])}));
//# sourceMappingURL=tik-sdk.crm.js.map