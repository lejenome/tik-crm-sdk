!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("@sentry/browser")):"function"==typeof define&&define.amd?define(["@sentry/browser"],t):"object"==typeof exports?exports.core=t(require("@sentry/browser")):(e.tikSDK=e.tikSDK||{},e.tikSDK.core=t(e.Sentry))}(this,(function(e){return function(e){var t={};function n(s){if(t[s])return t[s].exports;var i=t[s]={i:s,l:!1,exports:{}};return e[s].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=e,n.c=t,n.d=function(e,t,s){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(n.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(s,i,function(t){return e[t]}.bind(null,i));return s},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=4)}([function(t,n){t.exports=e},function(e,t,n){var s,i,r;"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self&&self,i=[t,n(0),n(6),n(2)],void 0===(r="function"==typeof(s=function(e,t,n,s){"use strict";function i(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return i=function(){return e},e}var r;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,t=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var t=i();if(t&&t.has(e))return t.get(e);var n={},s=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var r in e)if(Object.prototype.hasOwnProperty.call(e,r)){var o=s?Object.getOwnPropertyDescriptor(e,r):null;o&&(o.get||o.set)?Object.defineProperty(n,r,o):n[r]=e[r]}return n.default=e,t&&t.set(e,n),n}(t),n=(r=n)&&r.__esModule?r:{default:r},globalThis.tikSdkSession||(globalThis.tikSdkSession={authToken:null,instructorAuthToken:null});var o=class{constructor(){this.resource=null,this.model_name="",this.verbose_name="",this.verbose_name_plural="",this.view_perm="",this.add_perm="",this.change_perm="",this.delete_perm="",this.lookup_field="id",this.useCache={list:!1,get:!1},this.validateCache=!0}get base_domain(){return(0,s.base_domain)()}get base_url(){return(0,s.base_url)()}get session(){return globalThis.tikSdkSession}get_url(e){return e=e?`${this.resource}/${e}`:""+this.resource,`${this.base_url}${e}/`}configCache(e,t){this.useCache=e,this._cacheTimeout&&clearInterval(this._cacheTimeout),t&&(this.cacheTimeout=t,this._cacheTimeout=setInterval(()=>{this.validateCache=!0},this.cacheTimeout))}async http(e,s,i,r=!1){let o,a={},l=this.get_url(s);if(i&&"GET"===e)l+=n.default.stringify(i,!0),i=null;else if(i)if(Object.values(i).some(e=>e instanceof File||e instanceof Blob)){const e=new FormData;for(let[t,n]of Object.entries(i))null==n?n="":n instanceof Date?n=n.toISOString():Array.isArray(n)?n=JSON.stringify(n):n instanceof File||n instanceof Blob||(n=n instanceof Object?JSON.stringify(n):"boolean"==typeof n?n?"True":"False":n.toString()),e.append(t,n);i=e}else i=JSON.stringify(i),a={"Content-Type":"application/json; charset=utf-8"};else i=void 0;console.log(e,s,i||"");try{if(this.session.authToken&&(a.Authorization="Bearer "+this.session.authToken),o=await fetch(l,{method:e,headers:a,body:i,mode:"cors",cache:"no-cache",redirect:"follow",referrer:"no-referrer"}),!(o.ok||r&&[404,401].includes(o.status))){const e=new Error(o.statusText||o.status);throw e.response=o,e}if("DELETE"!==e)return await o.json()}catch(e){throw console.error("HTTP Error:",l.toString(),JSON.stringify(i),o&&o.status),console.log("Sentry",typeof t,t,Object.keys(t)),"object"==typeof t&&"captureException"in t&&t.captureException(e),e}}toObj(e){return e}toString(e){return e.title?e.title:e.name?e.name:""}async list(){if(this.useCache.list&&!this.validateCache&&this.data)console.log(`[HTTP] ${this.resource}.list(): using cache`);else{const e=await this.http("GET","");this.data=e,this.validateCache=!1}return this.data}async get(e,t=!1){if(e){const n=await this.http("GET",e,null,t);return this.toObj(n)}return this.new()}async save(e,t,n=!1,s=!1,i=!1){if(this.validateCache=!0,!e[this.lookup_field]&&!t||n)return await this.http("POST","",e,i);{const n=await this.http(s?"PATCH":"PUT",t||e[this.lookup_field],e,i);return this.toObj(n)}}new(){return null}async delete(e){return this.validateCache=!0,this.http("DELETE",e)}};e.default=o})?s.apply(t,i):s)||(e.exports=r)},function(e,t,n){var s,i,r;"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self&&self,i=[t,n(7)],void 0===(r="function"==typeof(s=function(e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.setConfigValue=function(e,t){globalThis.tikSdkConfig[e]=t},e.setConfig=s,e.setConfigOrganization=function(e){s({API_BASE_URL:e.api_base_url,API_PREFIX:e.api_prefix,CACHE_PREFIX:e.cache_prefix})},e.base_domain=i,e.base_url=function(){return i()+globalThis.tikSdkConfig.API_PREFIX},e.saas_base_domain=r,e.saas_base_url=function(){return r()+globalThis.tikSdkConfig.API_PREFIX},e.default=void 0;const n={API_BASE_URL:"",SAAS_API_BASE_URL:"",API_PREFIX:"/api/",CACHE_PREFIX:"",VERSION:t.version,PROTOCOL:"https"};function s(e){for(const t of Object.keys(n))t in e&&(globalThis.tikSdkConfig[t]=e[t])}function i(){return globalThis.tikSdkConfig.API_BASE_URL}function r(){return globalThis.tikSdkConfig.SAAS_API_BASE_URL}globalThis.tikSdkConfig||(globalThis.tikSdkConfig={}),function(){for(const e of Object.keys(n))e in globalThis.tikSdkConfig||(globalThis.tikSdkConfig[e]=n[e])}();var o=globalThis.tikSdkConfig;e.default=o})?s.apply(t,i):s)||(e.exports=r)},function(e,t,n){var s,i,r;"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self&&self,i=[t,n(1)],void 0===(r="function"==typeof(s=function(e,t){"use strict";var n;Object.defineProperty(e,"__esModule",{value:!0}),e.default=e.UsersApi=void 0,t=(n=t)&&n.__esModule?n:{default:n};class s extends t.default{constructor(){super(),this.resource="users",this.model_name="user",this.verbose_name="User",this.verbose_name_plural="Users",this.view_perm="user:view",this.add_perm="user:add",this.change_perm="user:change",this.delete_perm="user:delete",this.configCache({list:!0},36e5)}async me(){const e=await this.http("GET","me",null,!0);return this.toObj(e)}async activate(e,t){return await this.http("POST",e+"/activate",{token:t},!0)}async get_by_email(e){return await this.http("POST","email",{email:e},!0)}toString(e){return`${e.first_name||""} ${e.last_name||""}`}}e.UsersApi=s;var i=new s;e.default=i})?s.apply(t,i):s)||(e.exports=r)},function(e,t,n){var s,i,r;"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self&&self,i=[t,n(5),n(3)],void 0===(r="function"==typeof(s=function(e,t,n){"use strict";function s(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"auth",{enumerable:!0,get:function(){return t.default}}),Object.defineProperty(e,"users",{enumerable:!0,get:function(){return n.default}}),t=s(t),n=s(n)})?s.apply(t,i):s)||(e.exports=r)},function(e,t,n){var s,i,r;"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self&&self,i=[t,n(0),n(1),n(8),n(9)],void 0===(r="function"==typeof(s=function(e,t,n,s,i){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return o=function(){return e},e}Object.defineProperty(e,"__esModule",{value:!0}),e.default=e.AuthApi=void 0,t=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var t=o();if(t&&t.has(e))return t.get(e);var n={},s=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var i in e)if(Object.prototype.hasOwnProperty.call(e,i)){var r=s?Object.getOwnPropertyDescriptor(e,i):null;r&&(r.get||r.set)?Object.defineProperty(n,i,r):n[i]=e[i]}return n.default=e,t&&t.set(e,n),n}(t),n=r(n),s=r(s),i=r(i);class a extends n.default{constructor(){super(),this.resource="auth",this.me={},this.ns={me:"me",token:"token",authToken:"authToken"}}async fetchMe(){return await s.default.me()}async user(){const e=await this.http("GET","user",null,!0);return this.toObj(e)}async currentUser(){if(this.me&&this.me.id)return this.me;{let e;if(i.default.has(this.ns.me)&&(e=i.default.get(this.ns.me)),navigator.onLine)try{e=await this.fetchMe()}catch(e){console.error(e)}return e?(i.default.set(this.ns.me,e),this.me=e,t.configureScope(e=>{e.setUser({id:this.me.email})}),this.me):(await this.logout(),null)}}async login(e,t){const n=await this.http("POST","login",{email:e,password:t},!0);return!!n.access_token&&(this.session[this.ns.authToken]=n.access_token,i.default.set(this.ns.token,{token:n.access_token}),!0)}async isLoggedin(){const e=i.default.get(this.ns.token);if(e){let t=!0;if(navigator.onLine&&(t=await this.http("POST","token/verify",e,!0),t=t&&"token_not_valid"!==t.code),t)return this.session[this.ns.authToken]=e.token,console.log(this.session),!0}return i.default.del(this.ns.token),!1}async logout(){await this.http("POST","logout",{}),this.me={},this.session[this.ns.authToken]=null,i.default.del(this.ns.token),i.default.del(this.ns.me),t.configureScope(e=>{e.setUser({})})}async passwordRequestReset(e){return await this.http("POST","password/reset",{email:e})}async passwordReset({token:e,uid:t,password:n}){return await this.http("POST","password/reset/confirm",{uid:t,token:e,new_password1:n,new_password2:n})}async confirmEmail(e){return await this.http("POST","register/verify-email",{key:e})}async register(e){return await this.http("POST","register",{...e,password1:e.password,password2:e.password})}async socialaccounts(){return await this.http("GET","socialaccounts")}async socialapps(){return await this.http("GET","socialapps")}async redirectSocialLogin(e){const t=this.get_url(e);globalThis.location.href=t}async socialLogin(e,t){const n=await this.http("POST",""+e,t,!0);return!!n.access_token&&(this.session[this.ns.authToken]=n.access_token,i.default.set(this.ns.token,{token:n.access_token}),!0)}}e.AuthApi=a;var l=new a;e.default=l})?s.apply(t,i):s)||(e.exports=r)},function(e,t,n){"use strict";var s=Object.prototype.hasOwnProperty;function i(e){try{return decodeURIComponent(e.replace(/\+/g," "))}catch(e){return null}}function r(e){try{return encodeURIComponent(e)}catch(e){return null}}t.stringify=function(e,t){t=t||"";var n,i,o=[];for(i in"string"!=typeof t&&(t="?"),e)if(s.call(e,i)){if((n=e[i])||null!=n&&!isNaN(n)||(n=""),i=r(i),n=r(n),null===i||null===n)continue;o.push(i+"="+n)}return o.length?t+o.join("&"):""},t.parse=function(e){for(var t,n=/([^=?#&]+)=?([^&]*)/g,s={};t=n.exec(e);){var r=i(t[1]),o=i(t[2]);null===r||null===o||r in s||(s[r]=o)}return s}},function(e){e.exports=JSON.parse('{"name":"tik-sdk","version":"2020.09.09","main":"index.js","module":"index.js","types":"types/tik-sdk.full.d.ts","exports":{".":"./index.js","./src/":"./src/"},"description":"TIK SDK","license":" GPL-3.0-only","author":{"name":"TIK (Technology Innovation Network)","email":"contact@tik.tn","url":"https://tik.tn"},"homepage":"https://tik.tn","private":true,"scripts":{"test":"jest","build:webpack":"webpack","build:babel":"babel index.js -d lib","lint":"eslint --ext .js,.vue,.ts --ignore-path .gitignore --ignore-pattern **/*.min.js . --ignore-pattern dist/"},"browserslist":["last 2 versions AND last 2 years AND supports es6-module","not IE 11","not IE_Mob 11","not dead"],"dependencies":{"@sentry/browser":"^5.5.0","@sentry/integrations":"^5.5.0","querystringify":"^2.1.1"},"devDependencies":{"@babel/cli":"^7.11.6","@babel/core":"^7.11.6","@babel/plugin-transform-modules-umd":"^7.10.4","@babel/preset-env":"^7.11.5","babel-eslint":"^10.0.1","babel-jest":"^26.3.0","babel-loader":"^8.1.0","clean-webpack-plugin":"^3.0.0","dotenv-webpack":"^3.0.0","eslint":"^7.2.0","eslint-config-prettier":"^6.0.0","eslint-config-standard":">=12.0.0","eslint-loader":"^4.0.2","eslint-plugin-import":">=2.16.0","eslint-plugin-jest":">=24.0.0","eslint-plugin-node":">=8.0.1","eslint-plugin-prettier":"^3.0.1","eslint-plugin-promise":">=4.0.1","eslint-plugin-standard":">=4.0.0","husky":"^4.0.1","jest":"^26.4.2","lint-staged":"^10.3.0","nodemon":"^2.0.4","prettier":"^2.0.5","stylelint":"^13.1.0","ts-loader":"^8.0.3","typescript":"^4.0.2","webpack":"^4.44.1","webpack-cli":"^3.3.12"}}')},function(e,t,n){var s,i,r;"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self&&self,i=[t,n(3)],void 0===(r="function"==typeof(s=function(e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;class n extends t.UsersApi{constructor(){super(),this.resource="staffs",this.model_name="staff",this.verbose_name="Staff",this.verbose_name_plural="Staffs",this.view_perm="staff:view",this.add_perm="staff:add",this.change_perm="staff:change",this.delete_perm="staff:delete",this.configCache({list:!0},36e5)}new(){return{first_name:"",last_name:"",full_name:"",roles:["commercial"],phone:"",email:"",attrs:{unlimited_access:!1,start_at:"08:00",end_at:"18:00"},is_active:!0,is_staff:!0}}toObj(e){return e&&"user_not_found"!==e.code?(e.roles=["admin","manager","finance","suivi","commercial","stock","freelance"].filter(t=>e.roles.includes(t)),Object.defineProperties(e,{role:{get(){return this.roles[0]}},is_admin:{get(){return this.roles.includes("admin")}},is_freelance:{get(){return this.roles.includes("freelance")}},start_at:{value:"08:00",writable:!1},end_at:{value:"18:00",writable:!1},unlimited_access:{get(){return this.attrs.unlimited_access},set(e){this.attrs.unlimited_access=e}}}),e):null}toString(e){return`${e.first_name||""} ${e.last_name||""}`}async unlimited(){return this.http("GET","unlimited")}roles(){return["admin","manager","finance","suivi","commercial","stock",...{}.MODULES.includes("pos")&&["pos"]||[]]}}var s=new n;e.default=s})?s.apply(t,i):s)||(e.exports=r)},function(e,t,n){var s,i,r;"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self&&self,i=[t,n(2)],void 0===(r="function"==typeof(s=function(e,t){"use strict";var n;Object.defineProperty(e,"__esModule",{value:!0}),e.default=e.Cache=void 0,t=(n=t)&&n.__esModule?n:{default:n};class s{has(e){return globalThis.localStorage&&globalThis.localStorage[`${t.default.CACHE_PREFIX}_cache_${e}`]}del(e){globalThis.localStorage&&delete globalThis.localStorage[`${t.default.CACHE_PREFIX}_cache_${e}`]}get(e,n=!0){if(n&&this.has(e))try{return JSON.parse(globalThis.localStorage[`${t.default.CACHE_PREFIX}_cache_${e}`])}catch(e){console.error("[tikSdk]",e)}}set(e,n){if(globalThis.localStorage){const s=`${t.default.CACHE_PREFIX}_cache_${e}`;globalThis.localStorage[s]=JSON.stringify(n)}}async withCache(e,t,n=!1){const s=this.get(e,n);if(s)return s;const i=await t();return this.set(e,i),i}async fallbackCache(e,t,n=!1){let s;if(n)return this.get(e,!0);try{s=await t(),this.set(e,s)}catch(t){if("Forbidden"===t.message)throw t;s=this.get(e,!0)}return s}}e.Cache=s;var i=new s;e.default=i})?s.apply(t,i):s)||(e.exports=r)}])}));
//# sourceMappingURL=tik-sdk.core.js.map