!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("@sentry/browser")):"function"==typeof define&&define.amd?define(["@sentry/browser"],t):"object"==typeof exports?exports.lms=t(require("@sentry/browser")):(e.tikSDK=e.tikSDK||{},e.tikSDK.lms=t(e.Sentry))}(this,(function(e){return function(e){var t={};function s(n){if(t[n])return t[n].exports;var r=t[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,s),r.l=!0,r.exports}return s.m=e,s.c=t,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)s.d(n,r,function(t){return e[t]}.bind(null,r));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="",s(s.s=5)}([function(e,t,s){var n,r,o;"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self&&self,r=[t,s(7),s(8),s(1)],void 0===(o="function"==typeof(n=function(e,t,s,n){"use strict";function r(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return r=function(){return e},e}var o;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,t=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var t=r();if(t&&t.has(e))return t.get(e);var s={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in e)if(Object.prototype.hasOwnProperty.call(e,o)){var i=n?Object.getOwnPropertyDescriptor(e,o):null;i&&(i.get||i.set)?Object.defineProperty(s,o,i):s[o]=e[o]}return s.default=e,t&&t.set(e,s),s}(t),s=(o=s)&&o.__esModule?o:{default:o},globalThis.tikSdkSession||(globalThis.tikSdkSession={authToken:null,instructorAuthToken:null});var i=class{constructor(){this.lookup_field="id",this.useCache={list:!1,get:!1},this.validateCache=!0}get base_domain(){return(0,n.base_domain)()}get base_url(){return(0,n.base_url)()}get session(){return globalThis.tikSdkSession}configCache(e,t){this.useCache=e,this._cacheTimeout&&clearInterval(this._cacheTimeout),t&&(this.cacheTimeout=t,this._cacheTimeout=setInterval(()=>{this.validateCache=!0},this.cacheTimeout))}async http(e,n,r,o=!1){n=n?`${this.resource}/${n}`:""+this.resource;let i,a={},l=`${this.base_url}${n}/`;if(r&&"GET"===e)l+=s.default.stringify(r,!0),r=null;else if(r)if(Object.values(r).some(e=>e instanceof File)){const e=new FormData;for(let[t,s]of Object.entries(r))null===s&&(s=""),e.append(t,s);r=e}else r=JSON.stringify(r),a={"Content-Type":"application/json; charset=utf-8"};else r=void 0;console.log(e,n,r||"");try{if(this.session.authToken&&(a.Authorization="Bearer "+this.session.authToken),i=await fetch(l,{method:e,headers:a,body:r,mode:"cors",cache:"no-cache",redirect:"follow",referrer:"no-referrer"}),!(i.ok||o&&[404,401].includes(i.status))){const e=new Error(i.statusText||i.status);throw e.response=i,e}if("DELETE"!==e)return await i.json()}catch(e){throw console.error("HTTP Error:",l.toString(),JSON.stringify(r),i&&i.status),console.log("Sentry",typeof t,t,Object.keys(t)),"object"==typeof t&&"captureException"in t&&t.captureException(e),e}}toObj(e){return e}async list(){if(this.useCache.list&&!this.validateCache&&this.data)console.log(`[HTTP] ${this.resource}.list(): using cache`);else{const e=await this.http("GET","");this.data=e,this.validateCache=!1}return this.data}async get(e,t=!1){if(e){const s=await this.http("GET",e,null,t);return this.toObj(s)}return this.new()}async save(e,t,s=!1,n=!1,r=!1){if(this.validateCache=!0,!e.id&&!t||s)return await this.http("POST","",e,r);{const s=await this.http(n?"PATCH":"PUT",t||e.id,e,r);return this.toObj(s)}}new(){return null}async delete(e){return this.validateCache=!0,this.http("DELETE",e)}};e.default=i})?n.apply(t,r):n)||(e.exports=o)},function(e,t,s){var n,r,o;"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self&&self,r=[t,s(9)],void 0===(o="function"==typeof(n=function(e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.setConfigValue=function(e,t){globalThis.tikSdkConfig[e]=t},e.setConfig=n,e.setConfigOrganization=function(e){n({API_BASE_URL:e.api_base_url,API_PREFIX:e.api_prefix,CACHE_PREFIX:e.cache_prefix})},e.base_domain=r,e.base_url=function(){return r()+globalThis.tikSdkConfig.API_PREFIX},e.saas_base_domain=o,e.saas_base_url=function(){return o()+globalThis.tikSdkConfig.API_PREFIX},e.default=void 0;const s={API_BASE_URL:"",SAAS_API_BASE_URL:"",API_PREFIX:"/api/",CACHE_PREFIX:"",VERSION:t.version,PROTOCOL:"https"};function n(e){for(const t of Object.keys(s))t in e&&(globalThis.tikSdkConfig[t]=e[t])}function r(){return globalThis.tikSdkConfig.API_BASE_URL}function o(){return globalThis.tikSdkConfig.SAAS_API_BASE_URL}globalThis.tikSdkConfig||(globalThis.tikSdkConfig={}),function(){for(const e of Object.keys(s))e in globalThis.tikSdkConfig||(globalThis.tikSdkConfig[e]=s[e])}();var i=globalThis.tikSdkConfig;e.default=i})?n.apply(t,r):n)||(e.exports=o)},function(e,t,s){var n,r,o;"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self&&self,r=[t,s(0)],void 0===(o="function"==typeof(n=function(e,t){"use strict";var s;Object.defineProperty(e,"__esModule",{value:!0}),e.default=e.EntollsApi=void 0,t=(s=t)&&s.__esModule?s:{default:s};class n extends t.default{constructor(){super(),this.resource="enrolls",this.configCache({list:!0},36e5)}async registerOrder(e,t,s){return await this.http("POST",e+"/payment",{provider:t,...s})}async orderSuccess(e,t){return await this.http("POST",e+"/success",{order_id:t})}async orderFailure(e,t){return await this.http("POST",e+"/failure",{order_id:t})}}e.EntollsApi=n;var r=new n;e.default=r})?n.apply(t,r):n)||(e.exports=o)},function(e,t,s){var n,r,o;"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self&&self,r=[t,s(0)],void 0===(o="function"==typeof(n=function(e,t){"use strict";var s;Object.defineProperty(e,"__esModule",{value:!0}),e.default=e.LessonsApi=void 0,t=(s=t)&&s.__esModule?s:{default:s};class n extends t.default{constructor(){super(),this.resource="lessons",this.configCache({list:!0},36e5)}}e.LessonsApi=n;var r=new n;e.default=r})?n.apply(t,r):n)||(e.exports=o)},function(e,t,s){var n,r,o;"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self&&self,r=[t,s(11)],void 0===(o="function"==typeof(n=function(e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=e.InstructorsApi=void 0;class s extends t.UsersApi{constructor(){super(),this.resource="instructors",this.configCache({list:!0},36e5)}async featured(){return await this.http("GET","featured")}}e.InstructorsApi=s;var n=new s;e.default=n})?n.apply(t,r):n)||(e.exports=o)},function(e,t,s){var n,r,o;"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self&&self,r=[t,s(6),s(10),s(13),s(3),s(14),s(4),s(15),s(2),s(16),s(17),s(18)],void 0===(o="function"==typeof(n=function(e,t,s,n,r,o,i,a,l,u,c,f){"use strict";function d(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"attachments",{enumerable:!0,get:function(){return t.default}}),Object.defineProperty(e,"courses",{enumerable:!0,get:function(){return s.default}}),Object.defineProperty(e,"chapters",{enumerable:!0,get:function(){return n.default}}),Object.defineProperty(e,"lessons",{enumerable:!0,get:function(){return r.default}}),Object.defineProperty(e,"quizs",{enumerable:!0,get:function(){return o.default}}),Object.defineProperty(e,"instructors",{enumerable:!0,get:function(){return i.default}}),Object.defineProperty(e,"students",{enumerable:!0,get:function(){return a.default}}),Object.defineProperty(e,"enrolls",{enumerable:!0,get:function(){return l.default}}),Object.defineProperty(e,"webinars",{enumerable:!0,get:function(){return u.default}}),Object.defineProperty(e,"attendees",{enumerable:!0,get:function(){return c.default}}),Object.defineProperty(e,"reports",{enumerable:!0,get:function(){return f.default}}),t=d(t),s=d(s),n=d(n),r=d(r),o=d(o),i=d(i),a=d(a),l=d(l),u=d(u),c=d(c),f=d(f)})?n.apply(t,r):n)||(e.exports=o)},function(e,t,s){var n,r,o;"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self&&self,r=[t,s(0)],void 0===(o="function"==typeof(n=function(e,t){"use strict";var s;Object.defineProperty(e,"__esModule",{value:!0}),e.default=e.AttachmentsApi=void 0,t=(s=t)&&s.__esModule?s:{default:s};class n extends t.default{constructor(){super(),this.resource="attachments",this.configCache({list:!0},36e5)}}e.AttachmentsApi=n;var r=new n;e.default=r})?n.apply(t,r):n)||(e.exports=o)},function(t,s){t.exports=e},function(e,t,s){"use strict";var n=Object.prototype.hasOwnProperty;function r(e){try{return decodeURIComponent(e.replace(/\+/g," "))}catch(e){return null}}function o(e){try{return encodeURIComponent(e)}catch(e){return null}}t.stringify=function(e,t){t=t||"";var s,r,i=[];for(r in"string"!=typeof t&&(t="?"),e)if(n.call(e,r)){if((s=e[r])||null!=s&&!isNaN(s)||(s=""),r=o(r),s=o(s),null===r||null===s)continue;i.push(r+"="+s)}return i.length?t+i.join("&"):""},t.parse=function(e){for(var t,s=/([^=?#&]+)=?([^&]*)/g,n={};t=s.exec(e);){var o=r(t[1]),i=r(t[2]);null===o||null===i||o in n||(n[o]=i)}return n}},function(e){e.exports=JSON.parse('{"name":"tik-sdk","version":"2020.09.09","main":"index.js","module":"index.js","browser":"dist/tik-sdk.full.js","types":"types/tik-sdk.full.d.ts","exports":{".":"./index.js","./src/":"./src/"},"description":"TIK SDK","license":" GPL-3.0-only","author":{"name":"TIK (Technology Innovation Network)","email":"contact@tik.tn","url":"https://tik.tn"},"homepage":"https://tik.tn","private":true,"scripts":{"test":"jest","build:webpack":"webpack","build:babel":"babel index.js -d lib","lint":"eslint --ext .js,.vue,.ts --ignore-path .gitignore --ignore-pattern **/*.min.js . --ignore-pattern dist/"},"browserslist":["last 2 versions AND last 2 years AND supports es6-module","not IE 11","not IE_Mob 11","not dead"],"dependencies":{"@sentry/browser":"^5.5.0","@sentry/integrations":"^5.5.0","querystringify":"^2.1.1"},"devDependencies":{"@babel/cli":"^7.11.6","@babel/core":"^7.11.6","@babel/plugin-transform-modules-umd":"^7.10.4","@babel/preset-env":"^7.11.5","babel-eslint":"^10.0.1","babel-jest":"^26.3.0","babel-loader":"^8.1.0","clean-webpack-plugin":"^3.0.0","eslint":"^7.2.0","eslint-config-prettier":"^6.0.0","eslint-config-standard":">=12.0.0","eslint-loader":"^4.0.2","eslint-plugin-import":">=2.16.0","eslint-plugin-jest":">=24.0.0","eslint-plugin-node":">=8.0.1","eslint-plugin-prettier":"^3.0.1","eslint-plugin-promise":">=4.0.1","eslint-plugin-standard":">=4.0.0","husky":"^4.0.1","jest":"^26.4.2","lint-staged":"^10.3.0","nodemon":"^2.0.4","prettier":"^2.0.5","stylelint":"^13.1.0","ts-loader":"^8.0.3","typescript":"^4.0.2","webpack":"^4.44.1","webpack-cli":"^3.3.12"}}')},function(e,t,s){var n,r,o;"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self&&self,r=[t,s(0),s(2),s(3),s(4),s(12)],void 0===(o="function"==typeof(n=function(e,t,s,n,r,o){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(e,"__esModule",{value:!0}),e.default=e.CoursesApi=void 0,t=i(t),s=i(s),n=i(n),r=i(r),o=i(o);class a extends t.default{constructor(){super(),this.resource="courses",this.configCache({list:!0},36e5)}async getCourse(e,t=!1){return await o.default.fallbackCache("courses_get_"+e,async()=>await this.get(e),t)}async listCourses(e=!1){return await o.default.fallbackCache("courses_list",async()=>await this.list(),e)}async getLesson(e,t=!1){return await o.default.fallbackCache("lessons_get_"+e,async()=>await n.default.get(e),t)}async listEnrolledCourses(){return await this.http("GET","enrolled")}getLessonChapter(e,t){return t.chapters.find(t=>t.lessons.some(t=>t.id===e.id))}setupCourseLessons(e){let t=0;for(const s of e.chapters)for(const n of s.lessons)n.index=t,n.is_open=!0,n.start_at={immediate:0,daily:1,weekly:7,custom:-1}[e.schedule],n.start_at*=n.index,(void 0===n.start_at||n.start_at<0)&&(n.start_at=n.start_date||n.start_day),t++;e.lessons_duration=e.days,e.lessons_days=e.days,e.lessons_count=t}setupCourseSchedule(e,t,s){let n=null;t&&(n=s(t.created_at));const r=s();function o(e){return e.start_date?s(e.start_date):t?n.clone().add(e.start_at,"days"):s(e.start_at)}function i(e){return t?r>e.start_at:!e.start_at}for(const t of e.chapters)for(const e of t.lessons)e.start_at=o(e),e.is_open=i(e);return e}findLessonOnCourse(e,t){for(const s of t.chapters)for(const t of s.lessons)if(t.id===e.id)return t}getLessonsCount(e){let t=0;for(const s of e.chapters)t+=s.lessons.length;return t}getLessonsDuration(e){let t=0;for(const s of e.chapters)for(const e of s.lessons)t+=e.duration||0;return t}getLessonTrainer(e){try{return this.getLessonCourse(e).trainer}catch(e){console.error(e)}}fixEnroll(e){return e&&"string"==typeof e.completed_lessons&&(e.completed_lessons=e.completed_lessons.split(",").map(e=>e.trim()).filter(e=>e)),e}async getCourseEnroll(e,t,n=!1){const r=await o.default.fallbackCache("users_"+t+"_enrolls_"+e,async()=>await s.default.get(e,!0),n);if(r&&r.id)return this.fixEnroll(r)}async getUserEnrolls(){return await s.default.list()}getNextPrevLessons(e,t){let s=null,n=null,r=!1;for(const o of e.chapters){if(n)break;for(const e of o.lessons){if(r){n=e;break}t.id===e.id&&(r=!0),r||(s=e)}}return[s,n]}async markCompleted(e,t){const n=Array.from(t.completed_lessons);return n.includes(e)||n.push(e),t=await s.default.save({id:t.id,course:t.course,completed_lessons:n.join(",")},t.id),this.fixEnroll(t)}async enroll(e){e.id&&(e=e.id);const t=await s.default.save({course:e,completed_lessons:""});return this.fixEnroll(t)}async getInstructor(e,t){return await o.default.fallbackCache("instructors_get_"+e,async()=>await r.default.get(e),t)}}e.CoursesApi=a;var l=new a;e.default=l})?n.apply(t,r):n)||(e.exports=o)},function(e,t,s){var n,r,o;"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self&&self,r=[t,s(0)],void 0===(o="function"==typeof(n=function(e,t){"use strict";var s;Object.defineProperty(e,"__esModule",{value:!0}),e.default=e.UsersApi=void 0,t=(s=t)&&s.__esModule?s:{default:s};class n extends t.default{constructor(){super(),this.resource="users",this.configCache({list:!0},36e5)}async me(){const e=await this.http("GET","me",null,!0);return this.toObj(e)}async activate(e,t){return await this.http("POST",e+"/activate",{token:t},!0)}async get_by_email(e){return await this.http("POST","email",{email:e},!0)}}e.UsersApi=n;var r=new n;e.default=r})?n.apply(t,r):n)||(e.exports=o)},function(e,t,s){var n,r,o;"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self&&self,r=[t,s(1)],void 0===(o="function"==typeof(n=function(e,t){"use strict";var s;Object.defineProperty(e,"__esModule",{value:!0}),e.default=e.Cache=void 0,t=(s=t)&&s.__esModule?s:{default:s};class n{has(e){return globalThis.localStorage&&globalThis.localStorage[`${t.default.CACHE_PREFIX}_cache_${e}`]}del(e){globalThis.localStorage&&delete globalThis.localStorage[`${t.default.CACHE_PREFIX}_cache_${e}`]}get(e,s=!0){if(s&&this.has(e))try{return JSON.parse(globalThis.localStorage[`${t.default.CACHE_PREFIX}_cache_${e}`])}catch(e){console.error("[tikSdk]",e)}}set(e,s){if(globalThis.localStorage){const n=`${t.default.CACHE_PREFIX}_cache_${e}`;globalThis.localStorage[n]=JSON.stringify(s)}}async withCache(e,t,s=!1){const n=this.get(e,s);if(n)return n;const r=await t();return this.set(e,r),r}async fallbackCache(e,t,s=!1){let n;if(s)return this.get(e,!0);try{n=await t(),this.set(e,n)}catch(t){if("Forbidden"===t.message)throw t;n=this.get(e,!0)}return n}}e.Cache=n;var r=new n;e.default=r})?n.apply(t,r):n)||(e.exports=o)},function(e,t,s){var n,r,o;"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self&&self,r=[t,s(0)],void 0===(o="function"==typeof(n=function(e,t){"use strict";var s;Object.defineProperty(e,"__esModule",{value:!0}),e.default=e.ChaptersApi=void 0,t=(s=t)&&s.__esModule?s:{default:s};class n extends t.default{constructor(){super(),this.resource="chapters",this.configCache({list:!0},36e5)}}e.ChaptersApi=n;var r=new n;e.default=r})?n.apply(t,r):n)||(e.exports=o)},function(e,t,s){var n,r,o;"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self&&self,r=[t,s(0)],void 0===(o="function"==typeof(n=function(e,t){"use strict";var s;Object.defineProperty(e,"__esModule",{value:!0}),e.default=e.QuizsApi=void 0,t=(s=t)&&s.__esModule?s:{default:s};class n extends t.default{constructor(){super(),this.resource="quizs",this.configCache({list:!0},36e5)}}e.QuizsApi=n;var r=new n;e.default=r})?n.apply(t,r):n)||(e.exports=o)},function(e,t,s){var n,r,o;"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self&&self,r=[t,s(0)],void 0===(o="function"==typeof(n=function(e,t){"use strict";var s;Object.defineProperty(e,"__esModule",{value:!0}),e.default=e.StudentsApi=void 0,t=(s=t)&&s.__esModule?s:{default:s};class n extends t.default{constructor(){super(),this.resource="students",this.configCache({list:!0},36e5)}async me(){const e=await this.http("GET","me",null,!0);return this.toObj(e)}async activate(e,t){return await this.http("POST",e+"/activate",{token:t},!0)}async get_by_email(e){return await this.http("POST","email",{email:e},!0)}}e.StudentsApi=n;var r=new n;e.default=r})?n.apply(t,r):n)||(e.exports=o)},function(e,t,s){var n,r,o;"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self&&self,r=[t,s(0)],void 0===(o="function"==typeof(n=function(e,t){"use strict";var s;Object.defineProperty(e,"__esModule",{value:!0}),e.default=e.WebinarsApi=void 0,t=(s=t)&&s.__esModule?s:{default:s};class n extends t.default{constructor(){super(),this.resource="webinars",this.configCache({list:!0},36e5)}async join(e,t){return(await this.http("POST",e+"/join",{username:t})).url}async get_default(){try{return await this.http("GET","default")}catch(e){return null}}async create_default(e,t){return await this.http("POST","default",{name:e,attendees:t})}}e.WebinarsApi=n;var r=new n;e.default=r})?n.apply(t,r):n)||(e.exports=o)},function(e,t,s){var n,r,o;"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self&&self,r=[t,s(0)],void 0===(o="function"==typeof(n=function(e,t){"use strict";var s;Object.defineProperty(e,"__esModule",{value:!0}),e.default=e.AttendeesApi=void 0,t=(s=t)&&s.__esModule?s:{default:s};class n extends t.default{constructor(){super(),this.resource="attendees",this.configCache({list:!0},36e5)}async registerOrder(e,t,s){return await this.http("POST",e+"/payment",{provider:t,...s})}async orderSuccess(e,t){return await this.http("POST",e+"/success",{order_id:t})}async orderFailure(e,t){return await this.http("POST",e+"/failure",{order_id:t})}}e.AttendeesApi=n;var r=new n;e.default=r})?n.apply(t,r):n)||(e.exports=o)},function(e,t,s){var n,r,o;"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self&&self,r=[t,s(0)],void 0===(o="function"==typeof(n=function(e,t){"use strict";var s;Object.defineProperty(e,"__esModule",{value:!0}),e.default=e.ReportsApi=void 0,t=(s=t)&&s.__esModule?s:{default:s};class n extends t.default{constructor(){super(),this.resource="reports"}async course(e){return await this.http("GET","courses/"+e)}}e.ReportsApi=n;var r=new n;e.default=r})?n.apply(t,r):n)||(e.exports=o)}])}));
//# sourceMappingURL=tik-sdk.lms.js.map