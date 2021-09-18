System.register("chunks:///_virtual/main.ts",["cc"],(function(t){"use strict";var o,n,e;return{setters:[function(t){o=t.cclegacy,n=t.Component,e=t._decorator}],execute:function(){var c;o._RF.push({},"ea1a0b9mxlN8qBqGVBlgngN","main",void 0);const{ccclass:s,property:r}=e;t("Main",s("Main")(c=class extends n{start(){console.log("SDKBox TS start")}onButtonInit(){if(this.checkSDKBox()){console.log("SDKBox TS onButtonInit");try{sdkbox.firebase.Analytics.init()}catch(t){console.error(t.toString()),console.log(t.stack)}}}onButtonStart(){this.checkSDKBox()&&console.log("SDKBox TS onButtonStart")}checkSDKBox(){return"undefined"!=typeof sdkbox||(console.log("Can't detect sdkbox"),!1)}})||c);o._RF.pop()}}}));

System.register("chunks:///_virtual/main",["./main.ts"],(function(){"use strict";return{setters:[null],execute:function(){}}}));

(function(r) {
  r('virtual:///prerequisite-imports/main', 'chunks:///_virtual/main'); 
})(function(mid, cid) {
    System.register(mid, [cid], function (_export, _context) {
    return {
        setters: [function(_m) {
            var _exportObj = {};

            for (var _key in _m) {
              if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _m[_key];
            }
      
            _export(_exportObj);
        }],
        execute: function () { }
    };
    });
});