!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("@sentry/browser")):"function"==typeof define&&define.amd?define(["@sentry/browser"],t):"object"==typeof exports?exports.core=t(require("@sentry/browser")):(e.tikSDK=e.tikSDK||{},e.tikSDK.core=t(e.Sentry))}(this,(function(e){return function(e){var t={};function n(i){if(t[i])return t[i].exports;var s=t[i]={i:i,l:!1,exports:{}};return e[i].call(s.exports,s,s.exports,n),s.l=!0,s.exports}return n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)n.d(i,s,function(t){return e[t]}.bind(null,s));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=3)}([function(e,t,n){var i,s,r;"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self&&self,s=[t,n(1),n(5),n(2)],void 0===(r="function"==typeof(i=function(e,t,n,i){"use strict";function s(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return s=function(){return e},e}var r;Object.defineProperty(e,"__esModule",{value:!0}),e.default=e.session=void 0,t=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var t=s();if(t&&t.has(e))return t.get(e);var n={},i=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var r in e)if(Object.prototype.hasOwnProperty.call(e,r)){var o=i?Object.getOwnPropertyDescriptor(e,r):null;o&&(o.get||o.set)?Object.defineProperty(n,r,o):n[r]=e[r]}return n.default=e,t&&t.set(e,n),n}(t),n=(r=n)&&r.__esModule?r:{default:r},globalThis.tikSdkSession||(globalThis.tikSdkSession={authToken:null,instructorAuthToken:null});const o=globalThis.tikSdkSession;e.session=o;var a=class{constructor(){this.lookup_field="id",this.useCache={list:!1,get:!1},this.validateCache=!0}get base_domain(){return(0,i.base_domain)()}get base_url(){return(0,i.base_url)()}configCache(e,t){this.useCache=e,this._cacheTimeout&&clearInterval(this._cacheTimeout),t&&(this.cacheTimeout=t,this._cacheTimeout=setInterval(()=>{this.validateCache=!0},this.cacheTimeout))}async http(e,i,s,r=!1){i=i?`${this.resource}/${i}`:""+this.resource;let a,l={},u=`${this.base_url}${i}/`;if(s&&"GET"===e)u+=n.default.stringify(s,!0),s=null;else if(s)if(Object.values(s).some(e=>e instanceof File)){const e=new FormData;for(let[t,n]of Object.entries(s))null===n&&(n=""),e.append(t,n);s=e}else s=JSON.stringify(s),l={"Content-Type":"application/json; charset=utf-8"};else s=void 0;console.log(e,i,s||"");try{if(o.authToken&&(l.Authorization="Bearer "+o.authToken),a=await fetch(u,{method:e,headers:l,body:s,mode:"cors",cache:"no-cache",redirect:"follow",referrer:"no-referrer"}),!(a.ok||r&&[404,401].includes(a.status))){const e=new Error(a.statusText||a.status);throw e.response=a,e}if("DELETE"!==e)return await a.json()}catch(e){throw console.error("HTTP Error:",u.toString(),JSON.stringify(s),a&&a.status),console.log("Sentry",typeof t,t,Object.keys(t)),"object"==typeof t&&"captureException"in t&&t.captureException(e),e}}toObj(e){return e}async list(){if(this.useCache.list&&!this.validateCache&&this.data)console.log(`[HTTP] ${this.resource}.list(): using cache`);else{const e=await this.http("GET","");this.data=e,this.validateCache=!1}return this.data}async get(e,t=!1){if(e){const n=await this.http("GET",e,null,t);return this.toObj(n)}return this.new()}async save(e,t,n=!1,i=!1,s=!1){if(this.validateCache=!0,!e.id&&!t||n)return await this.http("POST","",e,s);{const n=await this.http(i?"PATCH":"PUT",t||e.id,e,s);return this.toObj(n)}}new(){return null}async delete(e){return this.validateCache=!0,this.http("DELETE",e)}};e.default=a})?i.apply(t,s):i)||(e.exports=r)},function(t,n){t.exports=e},function(e,t,n){var i,s,r;"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self&&self,s=[t,n(6)],void 0===(r="function"==typeof(i=function(e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.setConfigValue=function(e,t){globalThis.tikSdkConfig[e]=t},e.setConfig=i,e.setConfigOrganization=function(e){i({API_BASE_URL:e.api_base_url,API_PREFIX:e.api_prefix,CACHE_PREFIX:e.cache_prefix})},e.base_domain=s,e.base_url=function(){return s()+globalThis.tikSdkConfig.API_PREFIX},e.default=void 0;const n={API_BASE_URL:"",API_PREFIX:"/api/",CACHE_PREFIX:"",VERSION:t.version,PROTOCOL:"https"};function i(e){for(const t of Object.keys(n))t in e&&(globalThis.tikSdkConfig[t]=e[t])}function s(){return globalThis.tikSdkConfig.API_BASE_URL}globalThis.tikSdkConfig||(globalThis.tikSdkConfig={}),function(){for(const e of Object.keys(n))e in globalThis.tikSdkConfig||(globalThis.tikSdkConfig[e]=n[e])}();var r=globalThis.tikSdkConfig;e.default=r})?i.apply(t,s):i)||(e.exports=r)},function(e,t,n){var i,s,r;"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self&&self,s=[t,n(4),n(10)],void 0===(r="function"==typeof(i=function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"auth",{enumerable:!0,get:function(){return t.default}}),Object.defineProperty(e,"users",{enumerable:!0,get:function(){return n.default}}),t=i(t),n=i(n)})?i.apply(t,s):i)||(e.exports=r)},function(e,t,n){var i,s,r;"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self&&self,s=[t,n(1),n(0),n(7),n(8)],void 0===(r="function"==typeof(i=function(e,t,n,i,s){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return o=function(){return e},e}function a(e){if(e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var t=o();if(t&&t.has(e))return t.get(e);var n={},i=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var s in e)if(Object.prototype.hasOwnProperty.call(e,s)){var r=i?Object.getOwnPropertyDescriptor(e,s):null;r&&(r.get||r.set)?Object.defineProperty(n,s,r):n[s]=e[s]}return n.default=e,t&&t.set(e,n),n}Object.defineProperty(e,"__esModule",{value:!0}),e.default=e.AuthApi=void 0,t=a(t),n=a(n),i=r(i),s=r(s);class l extends n.default{constructor(){super(),this.resource="token",this.me={},this.ns={me:"me",token:"token",authToken:"authToken"}}async fetchMe(){return await i.default.me()}async currentUser(){if(this.me&&this.me.id)return this.me;{let e;if(s.default.has(this.ns.me)&&(e=s.default.get(this.ns.me)),navigator.onLine)try{e=await this.fetchMe()}catch(e){}return e?(s.default.set(this.ns.me,e),this.me=e,t.configureScope(e=>{e.setUser({id:this.me.email})}),this.me):(await this.logout(),null)}}async login(e,t){const i=await this.http("POST","",{email:e,password:t},!0);return!!i.access&&(n.session[this.ns.authToken]=i.access,s.default.set(this.ns.token,{token:i.access}),!0)}async isLoggedin(){const e=s.default.get(this.ns.token);if(e){let t=!0;if(navigator.onLine&&(t=await this.http("POST","verify",e,!0),t=t&&"token_not_valid"!==t.code),t)return n.session[this.ns.authToken]=e.token,console.log(n.session),!0}return s.default.del(this.ns.token),!1}async logout(){this.me={},n.session[this.ns.authToken]=null,s.default.del(this.ns.token),s.default.del(this.ns.me),t.configureScope(e=>{e.setUser({})})}}e.AuthApi=l;var u=new l;e.default=u})?i.apply(t,s):i)||(e.exports=r)},function(e,t,n){"use strict";var i=Object.prototype.hasOwnProperty;function s(e){try{return decodeURIComponent(e.replace(/\+/g," "))}catch(e){return null}}function r(e){try{return encodeURIComponent(e)}catch(e){return null}}t.stringify=function(e,t){t=t||"";var n,s,o=[];for(s in"string"!=typeof t&&(t="?"),e)if(i.call(e,s)){if((n=e[s])||null!=n&&!isNaN(n)||(n=""),s=r(s),n=r(n),null===s||null===n)continue;o.push(s+"="+n)}return o.length?t+o.join("&"):""},t.parse=function(e){for(var t,n=/([^=?#&]+)=?([^&]*)/g,i={};t=n.exec(e);){var r=s(t[1]),o=s(t[2]);null===r||null===o||r in i||(i[r]=o)}return i}},function(e){e.exports=JSON.parse('{"name":"tik-sdk","version":"2020.09.09","main":"index.js","module":"index.js","browser":"dist/tik-sdk.full.js","types":"types/tik-sdk.full.d.ts","description":"TIK SDK","author":{"name":"TIK (Technology Innovation Network)","email":"contact@tik.tn","url":"https://tik.tn"},"homepage":"https://tik.tn","private":true,"scripts":{"test":"jest","build:webpack":"webpack","build:babel":"babel index.js -d lib","lint":"eslint --ext .js,.vue,.ts --ignore-path .gitignore --ignore-pattern **/*.min.js ."},"browserslist":["last 2 versions","not IE 11","not IE_Mob 11","not dead"],"dependencies":{"@sentry/browser":"^5.5.0","@sentry/integrations":"^5.5.0","querystringify":"^2.1.1"},"devDependencies":{"@babel/cli":"^7.11.6","@babel/core":"^7.11.6","@babel/plugin-transform-modules-umd":"^7.10.4","@babel/preset-env":"^7.11.5","babel-eslint":"^10.0.1","babel-jest":"^26.3.0","babel-loader":"^8.1.0","clean-webpack-plugin":"^3.0.0","eslint":"^7.2.0","eslint-config-prettier":"^6.0.0","eslint-config-standard":">=12.0.0","eslint-loader":"^4.0.2","eslint-plugin-import":">=2.16.0","eslint-plugin-jest":">=24.0.0","eslint-plugin-node":">=8.0.1","eslint-plugin-prettier":"^3.0.1","eslint-plugin-promise":">=4.0.1","eslint-plugin-standard":">=4.0.0","husky":"^4.0.1","jest":"^26.4.2","lint-staged":"^10.3.0","nodemon":"^2.0.4","prettier":"^2.0.5","stylelint":"^13.1.0","ts-loader":"^8.0.3","typescript":"^4.0.2","webpack":"^4.44.1","webpack-cli":"^3.3.12"}}')},function(e,t,n){var i,s,r;"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self&&self,s=[t,n(0)],void 0===(r="function"==typeof(i=function(e,t){"use strict";var n;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,t=(n=t)&&n.__esModule?n:{default:n};class i extends t.default{constructor(){super(),this.resource="staffs",this.configCache({list:!0},36e5)}new(){return{full_name:"",status:"indoor",roles:["commercial"],phone:"",email:"",attrs:{unlimited_access:!1,start_at:"08:00",end_at:"18:00"},is_active:!0}}async me(){const e=await this.http("GET","me",null,!0);return this.toObj(e)}toObj(e){return e&&"user_not_found"!==e.code?(e.roles=["admin","manager","finance","suivi","commercial","stock","freelance"].filter(t=>e.roles.includes(t)),Object.defineProperties(e,{role:{get(){return this.roles[0]}},is_admin:{get(){return this.roles.includes("admin")}},is_freelance:{get(){return this.roles.includes("freelance")}},start_at:{value:"08:00",writable:!1},end_at:{value:"18:00",writable:!1},unlimited_access:{get(){return this.attrs.unlimited_access},set(e){this.attrs.unlimited_access=e}}}),e):null}async unlimited(){return this.http("GET","unlimited")}roles(){return["admin","manager","finance","suivi","commercial","stock",...process.env.MODULES.includes("pos")&&["pos"]||[]]}}var s=new i;e.default=s})?i.apply(t,s):i)||(e.exports=r)},function(e,t,n){(function(i){var s,r,o,a;"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self&&self,a=function(e,t){"use strict";var n;Object.defineProperty(e,"__esModule",{value:!0}),e.default=e.Cache=void 0,t=(n=t)&&n.__esModule?n:{default:n};class s{has(e){return i.localStorage&&i.localStorage[`${t.default.CACHE_PREFIX}_cache_${e}`]}del(e){i.localStorage&&delete i.localStorage[`${t.default.CACHE_PREFIX}_cache_${e}`]}get(e,n=!0){if(n&&this.has(e))try{return JSON.parse(i.localStorage[`${t.default.CACHE_PREFIX}_cache_${e}`])}catch(e){}}set(e,n){if(i.localStorage){const s=`${t.default.CACHE_PREFIX}_cache_${e}`;i.localStorage[s]=JSON.stringify(n)}}async withCache(e,t,n=!1){const i=this.get(e,n);if(i)return i;const s=await t();return this.set(e,s),s}async fallbackCache(e,t,n=!1){let i;if(n)return this.get(e,!0);try{i=await t(),this.set(e,i)}catch(t){if("Forbidden"===t.message)throw t;i=this.get(e,!0)}return i}}e.Cache=s;var r=new s;e.default=r},r=[t,n(2)],void 0===(o="function"==typeof(s=a)?s.apply(t,r):s)||(e.exports=o)}).call(this,n(9))},function(e,t){var n;n=function(){return this}();try{n=n||new Function("return this")()}catch(e){"object"==typeof window&&(n=window)}e.exports=n},function(e,t,n){var i,s,r;"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self&&self,s=[t,n(0)],void 0===(r="function"==typeof(i=function(e,t){"use strict";var n;Object.defineProperty(e,"__esModule",{value:!0}),e.default=e.UsersApi=void 0,t=(n=t)&&n.__esModule?n:{default:n};class i extends t.default{constructor(){super(),this.resource="users",this.configCache({list:!0},36e5)}async me(){return await this.http("GET","me",null,!0)}async activate(e,t){return await this.http("POST",e+"/activate",{token:t},!0)}async get_by_email(e){return await this.http("POST","email",{email:e},!0)}}e.UsersApi=i;var s=new i;e.default=s})?i.apply(t,s):i)||(e.exports=r)}])}));
//# sourceMappingURL=tik-sdk.core.js.map