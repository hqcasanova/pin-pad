(function(e){function t(t){for(var i,c,r=t[0],o=t[1],l=t[2],d=0,p=[];d<r.length;d++)c=r[d],Object.prototype.hasOwnProperty.call(a,c)&&a[c]&&p.push(a[c][0]),a[c]=0;for(i in o)Object.prototype.hasOwnProperty.call(o,i)&&(e[i]=o[i]);u&&u(t);while(p.length)p.shift()();return s.push.apply(s,l||[]),n()}function n(){for(var e,t=0;t<s.length;t++){for(var n=s[t],i=!0,r=1;r<n.length;r++){var o=n[r];0!==a[o]&&(i=!1)}i&&(s.splice(t--,1),e=c(c.s=n[0]))}return e}var i={},a={app:0},s=[];function c(t){if(i[t])return i[t].exports;var n=i[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.m=e,c.c=i,c.d=function(e,t,n){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)c.d(n,i,function(t){return e[t]}.bind(null,i));return n},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="/pin-pad/";var r=window["webpackJsonp"]=window["webpackJsonp"]||[],o=r.push.bind(r);r.push=t,r=r.slice();for(var l=0;l<r.length;l++)t(r[l]);var u=o;s.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("cd49")},"086d":function(e,t,n){"use strict";n("bcf4")},"0900":function(e,t,n){"use strict";n("3f8b")},"0977":function(e,t,n){"use strict";n("c0fd")},1788:function(e,t,n){},"204f":function(e,t,n){},"3f8b":function(e,t,n){},"92d5":function(e,t,n){"use strict";n("204f")},bbc7:function(e,t,n){},bcf4:function(e,t,n){},c0fd:function(e,t,n){},ca75:function(e,t,n){"use strict";n("bbc7")},cd49:function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var i=n("7a23");function a(e,t,n,a,s,c){var r=Object(i["s"])("display"),o=Object(i["s"])("keypad");return Object(i["k"])(),Object(i["d"])(i["a"],null,[Object(i["g"])(r,{class:"layout-item",code:e.code,validLength:e.validLength,isPinLocked:e.isPinLocked,isValidating:e.isValidating},null,8,["code","validLength","isPinLocked","isValidating"]),Object(i["g"])(o,{class:"layout-item",isDisabled:e.isPinLocked,isBlockInput:e.isValidating},null,8,["isDisabled","isBlockInput"])],64)}var s=n("5530"),c=function(e){return Object(i["m"])("data-v-7cc8ebda"),e=e(),Object(i["l"])(),e},r={class:"display-layout"},o={class:"display-title display-item"},l={class:"display-status error-text"},u=c((function(){return Object(i["e"])("strong",{class:"display-status success-text"},"OK",-1)})),d=Object(i["f"])(" PIN verified "),p=Object(i["f"])(" Enter your PIN code "),b={class:"display-feedback display-item"},f=Object(i["f"])("Checking..."),O=Object(i["f"])("Your PIN is valid");function v(e,t,n,a,s,c){var v=Object(i["s"])("pin-char"),j=Object(i["s"])("pin-string");return Object(i["k"])(),Object(i["d"])("div",r,[Object(i["e"])("h2",o,[e.isFail?(Object(i["k"])(),Object(i["d"])(i["a"],{key:0},[Object(i["e"])("strong",l,Object(i["u"])(e.isPinLocked?"LOCKED":"ERROR"),1),Object(i["f"])(" "+Object(i["u"])(e.isPinLocked?"Keypad disabled":"Wrong PIN"),1)],64)):e.isSuccess?(Object(i["k"])(),Object(i["d"])(i["a"],{key:1},[u,d],64)):(Object(i["k"])(),Object(i["d"])(i["a"],{key:2},[p],64))]),Object(i["e"])("p",b,[e.isValidating?(Object(i["k"])(),Object(i["d"])(i["a"],{key:0},[f],64)):e.isFail&&!e.isPinLocked?(Object(i["k"])(),Object(i["d"])(i["a"],{key:1},[Object(i["f"])(Object(i["u"])(e.isLastAttempt?"Last try remaining":"Please try again"),1)],64)):e.isFail&&e.isPinLocked?(Object(i["k"])(),Object(i["d"])(i["a"],{key:2},[Object(i["f"])(" Please wait "+Object(i["u"])(e.paddedCountdown)+" seconds ",1)],64)):e.isSuccess?(Object(i["k"])(),Object(i["d"])(i["a"],{key:3},[O],64)):(Object(i["k"])(),Object(i["d"])(i["a"],{key:4},[Object(i["f"])("The code must be "+Object(i["u"])(e.validLength)+" characters long",1)],64))]),Object(i["g"])(j,{class:Object(i["j"])(["display-pin display-item",{error:e.isFail&&!e.isValidating}]),pinLength:e.validLength,isLoading:e.isValidating||e.isPinLocked,value:e.code},{default:Object(i["w"])((function(t){return[Object(i["g"])(v,{isVisible:e.isCharVisible(t.pinPos),value:t.pinChar},null,8,["isVisible","value"])]})),_:1},8,["class","pinLength","isLoading","value"])])}n("a9e3");function j(e,t,n,a,s,c){return Object(i["k"])(),Object(i["d"])("div",{class:Object(i["j"])(["pin-string",{loading:e.isLoading}])},[(Object(i["k"])(!0),Object(i["d"])(i["a"],null,Object(i["q"])(e.charPositions,(function(t){return Object(i["k"])(),Object(i["d"])("span",{key:t,class:"pin-string__item"},[Object(i["r"])(e.$slots,"default",{pinPos:t,pinChar:e.value[t]},void 0,!0)])})),128))],2)}var h=Object(i["h"])({name:"PinString",props:{pinLength:{type:Number,required:!0},value:{type:String,default:""},isLoading:{type:Boolean,default:!1}},computed:{charPositions(){var e=[],t=0;for(t;t<this.pinLength;t++)e.push(t);return e}}}),y=(n("92d5"),n("6b0d")),g=n.n(y);const k=g()(h,[["render",j],["__scopeId","data-v-0df7cfaf"]]);var m=k;function P(e,t,n,a,s,c){return Object(i["k"])(),Object(i["d"])("span",{class:Object(i["j"])(["pin-char",{fill:e.isValue&&!e.isVisible,"hide-border":e.isValue&&e.isVisible,faded:e.isDisabled}])},Object(i["u"])(e.isVisible?e.value:""),3)}var L=Object(i["h"])({name:"PinChar",props:{value:{type:String,default:""},isVisible:{type:Boolean,default:!0},isDisabled:{type:Boolean,default:!1}},computed:{isValue(){return this.value.length}}});n("0977");const I=g()(L,[["render",P],["__scopeId","data-v-3441abb5"]]);var S,C=I,V=n("5502"),_=(n("d3b7"),n("25f0"),n("4d90"),{code:"",failCount:-1,validLength:JSON.parse("4"),lockThreshold:JSON.parse("3"),lockTimeout:JSON.parse("10")});(function(e){e["pinUpdate"]="PIN_UPDATE",e["PinSuccess"]="PIN_SUCCESS",e["PinFail"]="PIN_FAIL",e["PinReset"]="PIN_RESET"})(S||(S={}));var w,N={[S.pinUpdate](e,t){e.code=`${e.code}${t}`},[S.PinSuccess](e){e.failCount=0},[S.PinFail](e){-1===e.failCount?e.failCount=1:e.failCount++},[S.PinReset](e){e.code=""}},R=n("1da1"),D=(n("96cf"),JSON.parse("2000")),B="1234";function E(e){return new Promise((function(t,n){setTimeout(e===B?t:n,D)}))}(function(e){e["ValidatePin"]="VALIDATE_PIN",e["UpdatePin"]="UPDATE_PIN",e["ResetPin"]="RESET_PIN"})(w||(w={}));var F={[w.ValidatePin](e){return Object(R["a"])(regeneratorRuntime.mark((function t(){var n,i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=e.state,i=e.commit,t.prev=1,t.next=4,E(n.code);case 4:i(S.PinSuccess),t.next=10;break;case 7:t.prev=7,t.t0=t["catch"](1),i(S.PinFail);case 10:case"end":return t.stop()}}),t,null,[[1,7]])})))()},[w.UpdatePin](e,t){var n=e.commit;n(S.pinUpdate,t.toString())},[w.ResetPin](e){var t=e.commit;t(S.PinReset)}},T={isFail(e){return e.failCount>0},isSuccess(e){return 0===e.failCount},isPinShort(e){return e.code.length<e.validLength},isLockFailCount(e){return e.failCount>0&&e.failCount%e.lockThreshold===0},isLastAttempt(e){return e.failCount%e.lockThreshold===e.lockThreshold-1}},K=Object(V["a"])({plugins:[],state:_,mutations:N,actions:F,getters:T});function U(){return K}var x,A=Object(i["p"])(0),H=U(),J=Object(i["b"])((function(){return H.getters.isLockFailCount})),$=H.state.lockTimeout.toString().length;function q(e){A.value=e,x=setInterval((function(){A.value--,0===A.value&&(clearInterval(x),x=0)}),1e3)}var M=function(){var e=Object(i["b"])((function(){return J.value&&A.value>0})),t=Object(i["b"])((function(){return A.value.toString().padStart($,"0")})),n=function(){Object(i["v"])(J,(function(e){e&&!x&&q(H.state.lockTimeout)}))};return{timerOnFailcount:n,unlockCountdown:Object(i["o"])(A),paddedCountdown:t,isPinLocked:e}},G=Object(i["h"])({name:"Display",components:{PinString:m,PinChar:C},props:{code:{type:String,required:!0},validLength:{type:Number,required:!0},visibleFromLast:{type:Number,default:0|JSON.parse("1")},isPinLocked:{type:Boolean,default:!1},isValidating:{type:Boolean,default:!1}},computed:Object(s["a"])({},Object(V["b"])(["isLastAttempt","isFail","isSuccess"])),setup(){var e=M(),t=e.paddedCountdown;return{paddedCountdown:t}},methods:{isCharVisible(e){return e>=this.code.length-this.visibleFromLast}}});n("f09a");const W=g()(G,[["render",v],["__scopeId","data-v-7cc8ebda"]]);var Y=W,z={class:"keypad-layout"};function Q(e,t,n,a,s,c){var r=Object(i["s"])("key-button");return Object(i["k"])(),Object(i["d"])("div",z,[(Object(i["k"])(!0),Object(i["d"])(i["a"],null,Object(i["q"])(e.keyValues,(function(n){return Object(i["k"])(),Object(i["d"])("div",{class:"key-item",key:n},[Object(i["g"])(r,{class:"primary-btn",disabled:e.isDisabled,value:n,isCancelHold:e.isBlockInput,isGlobalKeyHandler:!0,"onKey:pressed":t[0]||(t[0]=function(t){return!e.isBlockInput&&e.pinUpdate(t)})},null,8,["disabled","value","isCancelHold"])])})),128))])}function X(e,t,n,a,s,c){var r=Object(i["t"])("touch");return Object(i["x"])((Object(i["k"])(),Object(i["d"])("button",{class:"key-btn",type:"button",onKeydown:t[0]||(t[0]=Object(i["y"])((function(){return e.onRelease&&e.onRelease.apply(e,arguments)}),["enter","space"]))},[Object(i["f"])(Object(i["u"])(e.value),1)],32)),[[r,e.onHold,"hold"],[r,e.onRelease,"release"]])}var Z=Object(i["h"])({name:"KeyButton",props:{value:{type:[String,Number],required:!0},pressInterval:{type:Number,default:100},pressEvent:{type:String,default:"key:pressed"},isCancelHold:{type:Boolean,default:!1},isGlobalKeyHandler:{type:Boolean,default:!1}},data(){return{intervalID:0}},mounted(){this.isGlobalKeyHandler&&document.addEventListener("keydown",this.onValueKey.bind(this))},unmounted(){document.removeEventListener("keydown",this.onValueKey)},methods:{onHold(){var e=this;this.intervalID=setInterval((function(){e.isCancelHold?(clearInterval(e.intervalID),e.intervalID=0):e.$emit(e.pressEvent,e.value)}),this.pressInterval)},onRelease(){this.intervalID?(clearInterval(this.intervalID),this.intervalID=0):this.$emit(this.pressEvent,this.value)},onValueKey(e){e.key!==this.value.toString()||this.$el.disabled||(this.onRelease(),this.$el.focus())}}});n("086d");const ee=g()(Z,[["render",X],["__scopeId","data-v-7e532fd6"]]);var te=ee,ne=U(),ie=Object(i["b"])((function(){return ne.getters.isPinShort})),ae=function(){function e(e){ie.value?ne.dispatch(w.UpdatePin,e):ne.dispatch(w.ResetPin)}return{pinUpdate:e}},se=Object(i["h"])({name:"Keypad",components:{KeyButton:te},props:{keyValues:{type:Array,default(){return JSON.parse("[1, 2, 3, 4, 5, 6, 7, 8, 9, 0]")}},isDisabled:{type:Boolean,default:!1},isBlockInput:{type:Boolean,default:!1}},setup(){var e=ae(),t=e.pinUpdate;return{pinUpdate:t}}});n("0900");const ce=g()(se,[["render",Q],["__scopeId","data-v-ed9e9cae"]]);var re=ce,oe=U(),le=Object(i["p"])(!1),ue=Object(i["b"])((function(){return oe.state.code.length})),de=function(){var e=function(e){var t=oe.dispatch(w.ValidatePin);le.value=!0,t.finally((function(){e&&oe.dispatch(w.ResetPin),le.value=!1}))},t=function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];Object(i["v"])(ue,(function(n){n===oe.state.validLength&&e(t)}))};return{validateOnLength:t,isValidating:Object(i["o"])(le)}},pe=Object(i["h"])({name:"App",components:{Display:Y,Keypad:re},props:{isResetOnValidation:{type:Boolean,default:!0}},computed:Object(s["a"])({},Object(V["c"])(["code","validLength"])),setup(e){var t=de(),n=t.validateOnLength,i=t.isValidating,a=M(),s=a.timerOnFailcount,c=a.isPinLocked;return n(e.isResetOnValidation),s(),{isPinLocked:c,isValidating:i}}});n("ca75");const be=g()(pe,[["render",a]]);var fe=be,Oe=n("9a7e"),ve=Object(i["c"])(fe).use(Oe["a"]).use(K).mount("#app");ve.$store.subscribe((function(e,t){document.body.classList.toggle("success",0===t.failCount),document.body.classList.toggle("error",t.failCount>0)}))},f09a:function(e,t,n){"use strict";n("1788")}});
//# sourceMappingURL=app.e13ff0f1.js.map