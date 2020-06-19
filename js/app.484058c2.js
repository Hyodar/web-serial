(function(e){function t(t){for(var a,i,s=t[0],c=t[1],l=t[2],d=0,p=[];d<s.length;d++)i=s[d],Object.prototype.hasOwnProperty.call(r,i)&&r[i]&&p.push(r[i][0]),r[i]=0;for(a in c)Object.prototype.hasOwnProperty.call(c,a)&&(e[a]=c[a]);u&&u(t);while(p.length)p.shift()();return o.push.apply(o,l||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],a=!0,s=1;s<n.length;s++){var c=n[s];0!==r[c]&&(a=!1)}a&&(o.splice(t--,1),e=i(i.s=n[0]))}return e}var a={},r={app:0},o=[];function i(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=a,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)i.d(n,a,function(t){return e[t]}.bind(null,a));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/web-serial/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],c=s.push.bind(s);s.push=t,s=s.slice();for(var l=0;l<s.length;l++)t(s[l]);var u=c;o.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"20af":function(e,t,n){},"545c":function(e,t,n){"use strict";var a=n("8314"),r=n.n(a);r.a},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var a=n("2b0e"),r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-app",{staticStyle:{"background-color":"#262626"},attrs:{dark:""}},[n("v-app-bar",{attrs:{app:""}},[n("v-spacer"),n("v-app-bar-nav-icon",{on:{click:function(t){return t.stopPropagation(),e.toggleDrawer(t)}}})],1),n("NavigationDrawer",{ref:"drawer",attrs:{active:e.navigationDrawer.active,menus:e.navigationDrawer.menus,optionData:e.navigationDrawer.optionData},on:{snackbar:e.setSnackbarMessage,serialConnected:e.openSerial,serialDisconnected:e.closeSerial}}),n("v-main",[n("Snackbar",{ref:"snackbar"}),n("SerialChat",{ref:"chat",attrs:{logMode:e.navigationDrawer.optionData.logMode,displayMode:e.navigationDrawer.optionData.displayMode,messageBufferSize:500,expressions:e.navigationDrawer.optionData.expressions}}),n("SerialInput",{on:{sendMessage:e.sendMessage}})],1)],1)},o=[],i=(n("96cf"),n("1da1")),s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-navigation-drawer",{attrs:{app:"",right:"",width:"350"},model:{value:e.drawer,callback:function(t){e.drawer=t},expression:"drawer"}},[n("v-container",[n("v-row",{staticClass:"ma-1 mt-5",attrs:{justify:"center"}},[n("div",{staticClass:"text-button"},[e._v(" Serial Connection ")])]),n("v-divider",{staticClass:"ma-2"}),n("v-row",{staticClass:"ma-3 mb-0",attrs:{justify:"center",align:"center"}},[n("v-col",{attrs:{cols:9}},[n("v-autocomplete",{attrs:{items:e.menus.serialConnection.baudrate.suggestions,label:"Baud Rate"},model:{value:e.optionData.serialConnection.serialOptions.baudrate,callback:function(t){e.$set(e.optionData.serialConnection.serialOptions,"baudrate",t)},expression:"optionData.serialConnection.serialOptions.baudrate"}})],1),n("v-col",{attrs:{cols:3}},[n("v-btn",{attrs:{text:"",loading:e.menus.serialConnection.loading},on:{click:e.toggleSerialConnection}},[e._v(" "+e._s(e.serialConnectionButtonText)+" ")])],1)],1),n("v-expansion-panels",{attrs:{flat:""}},[n("v-expansion-panel",{staticClass:"transparent"},[n("v-expansion-panel-header",[n("span",{staticClass:"text-button",staticStyle:{"font-size":"0.75rem !important"}},[e._v(" Additional Options ")])]),n("v-expansion-panel-content",{staticClass:"grey darken-3"},[n("v-row",[n("v-col",[n("v-select",{attrs:{items:e.menus.serialConnection.parityType.options,value:e.optionData.serialConnection.serialOptions.parity,label:"Parity Type"}})],1),n("v-col",[n("v-text-field",{attrs:{type:"number",value:e.optionData.serialConnection.serialOptions.buffersize,label:"Buffer Size"}})],1)],1),n("v-row",[n("v-col",[n("v-select",{attrs:{items:e.menus.serialConnection.databits.options,value:e.optionData.serialConnection.serialOptions.databits,label:"Data Bits"}})],1),n("v-col",[n("v-select",{attrs:{items:e.menus.serialConnection.stopbits.options,value:e.optionData.serialConnection.serialOptions.stopbits,label:"Stop Bits"}})],1)],1),n("HorizontalSelection",{staticClass:"mt-2",attrs:{multiple:"",dense:"",options:e.menus.serialConnection.flags.options,value:e.menus.serialConnection.flags.default},on:{changedValue:function(t){return e.setSerialConnectionFlags(t)}}})],1)],1)],1)],1),n("v-container",[n("v-row",{staticClass:"ma-1",attrs:{justify:"center"}},[n("div",{staticClass:"text-button"},[e._v(" Log Mode ")])]),n("v-divider",{staticClass:"ma-2"}),n("HorizontalSelection",{attrs:{options:e.menus.logMode.options,value:e.optionData.logMode},on:{changedValue:function(t){e.optionData.logMode=t}}})],1),n("v-container",[n("v-row",{staticClass:"ma-1",attrs:{justify:"center"}},[n("div",{staticClass:"text-button"},[e._v(" Display Mode ")])]),n("v-divider",{staticClass:"ma-2"}),n("HorizontalSelection",{attrs:{options:e.menus.displayMode.options,value:e.optionData.displayMode},on:{changedValue:function(t){e.optionData.displayMode=t}}})],1),n("v-container",[n("v-row",{staticClass:"ma-1",attrs:{justify:"center"}},[n("v-spacer"),n("div",{staticClass:"text-button"},[e._v(" Expressions ")]),n("v-spacer"),n("v-btn",{attrs:{icon:"",small:""},on:{click:e.addNewExpression}},[n("v-icon",[e._v(" mdi-plus ")])],1)],1),n("ExpressionEditor",{ref:"expressionEditor",on:{snackbar:function(t){return e.sendSnackbar(t)}}}),n("v-divider",{staticClass:"ma-2"}),n("v-card",{directives:[{name:"bar",rawName:"v-bar"}],staticClass:"grey darken-3",staticStyle:{height:"300px"}},[n("v-list",[n("v-list-item-group",e._l(e.optionData.expressions,(function(t,a){return n("v-list-item",{key:a},[n("v-list-item-action",[n("v-checkbox",{attrs:{color:"grey darken-4"},model:{value:t.active,callback:function(n){e.$set(t,"active",n)},expression:"item.active"}})],1),n("v-list-item-content",{on:{click:function(n){return e.openExpressionEditor(t)}}},[n("v-list-item-title",{domProps:{textContent:e._s(t.name)}})],1),n("v-list-item-action",[n("v-menu",{attrs:{top:"","nudge-bottom":"105","nudge-left":"16","close-on-content-click":!1},scopedSlots:e._u([{key:"activator",fn:function(a){var r=a.on;return[n("v-btn",e._g({staticClass:"pa-3",attrs:{icon:"",color:t.color}},r),[n("v-icon",{attrs:{large:""}},[e._v(" mdi-label ")])],1)]}}],null,!0),model:{value:t.colorEdit,callback:function(n){e.$set(t,"colorEdit",n)},expression:"item.colorEdit"}},[n("v-card",[n("v-card-text",{staticClass:"pa-0"},[n("v-color-picker",{attrs:{flat:""},model:{value:t.color,callback:function(n){e.$set(t,"color",n)},expression:"item.color"}})],1)],1)],1)],1)],1)})),1)],1)],1)],1)],1)},c=[],l=(n("4160"),n("07ac"),n("4d63"),n("ac1f"),n("25f0"),n("159b"),n("dca8"),Object.freeze({ASCII:0,HEX:1,BINARY:2})),u=l,d=Object.freeze({TERMINAL:0,CHAT:1}),p=d,h=Object.freeze({RTSCTS:"rtscts",XON:"xon",XOFF:"xoff",XANY:"xany"}),v=h,f=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-row",{class:[e.dense?"ma-0":"ma-3"],attrs:{justify:"center"}},e._l(e.options,(function(t){return n("v-btn",{key:t.val,class:[e.isOptionActive(t.val)?"grey darken-2":void 0,e.dense?"pa-1":void 0],attrs:{tile:""},on:{click:function(n){return e.changeValue(t.val)}}},[e._v(" "+e._s(t.name)+" ")])})),1)},m=[],g=(n("4de4"),n("c975"),{name:"HorizontalSelection",data:function(){return{activeValue:null}},mounted:function(){this.activeValue=this.value},props:["options","value"],methods:{changeValue:function(e){if(this.multiple)return this.isOptionActive(e)?this.activeValue=this.activeValue.filter((function(t){return t!==e})):this.activeValue.push(e),void this.$emit("changedValue",this.activeValue);this.$emit("changedValue",e)},isOptionActive:function(e){return this.multiple?this.activeValue&&-1!==this.activeValue.indexOf(e):this.value===e}},computed:{multiple:function(){return void 0!==this.$attrs.multiple},dense:function(){return void 0!==this.$attrs.dense}}}),b=g,x=n("2877"),S=n("6544"),C=n.n(S),w=n("8336"),y=n("0fd9"),k=Object(x["a"])(b,f,m,!1,null,null,null),E=k.exports;C()(k,{VBtn:w["a"],VRow:y["a"]});var T=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-dialog",{attrs:{persistent:"","max-width":"300px"},model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[n("v-card",[n("v-card-title",[n("span",{staticClass:"headline"},[e._v("Expression Editor")])]),n("v-card-text",[n("v-container",[n("v-row",{attrs:{align:"center"}},[n("v-col",{attrs:{cols:"8"}},[n("v-text-field",{attrs:{label:"Name",required:""},model:{value:e.expression.name,callback:function(t){e.$set(e.expression,"name",t)},expression:"expression.name"}})],1),n("v-col",{attrs:{cols:"12"}},[n("v-text-field",{attrs:{label:"RegEx",required:""},model:{value:e.expressionField,callback:function(t){e.expressionField=t},expression:"expressionField"}})],1)],1)],1)],1),n("v-card-actions",[n("v-spacer"),n("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:function(t){return e.closeDialog(!1)}}},[e._v("Close")]),n("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:function(t){return e.closeDialog(!0)}}},[e._v("Save")])],1)],1)],1)},D=[],M=(n("fb6a"),n("d3b7"),n("baa5"),"gimusy"),O="gms",V="a^";function _(e){var t=e.indexOf("/"),n=e.lastIndexOf("/");return-1!==t&&-1!==n&&t!==n&&e.length-n-1<=M.length}var R=Object.freeze({Error:{NoWebSerial:{color:"error",content:"Your browser doesn't seem to have the WebSerial API enabled. Please check if your browser supports it. The 'enable' button will lead you to the instructions to activate it on Chrome.",buttons:[{text:"Enable",callback:function(){window.location.href="https://codelabs.developers.google.com/codelabs/web-serial/#2"}}],timeout:-1},NoTextDecoderStream:{color:"error",content:"Your browser doesn't seem to have the TextDecoderStream class. Maybe check on its documentation?",timeout:-1},NoTextEncoderStream:{color:"error",content:"Your browser doesn't seem to have the TextEncoderStream class. Maybe check on its documentation?",timeout:-1},NoPortSelected:{color:"error",content:"No serial port selected. Connection stopped.",timeout:2e3},ConnectionFailed:{color:"error",content:"Your serial connection failed somehow. Please try again.",timeout:3e3},InvalidRegExp:{color:"error",content:"There seemed to be something wrong with your RegExp. It's now back to the default.",timeout:3e3},Custom:function(e){return{color:"error",content:e,timeout:-1}}},Success:{SerialConnectionOpened:{color:"success",content:"Successfully opened a serial connection!",timeout:2e3},SerialConnectionClosed:{color:"success",content:"Successfully closed a serial connection!",timeout:2e3}},Warning:{SerialConnectionClosed:{color:"warning",content:"The serial connection was closed.",timeout:5e3},NoRegexSlashes:{color:"warning",content:"Hmm... Did you write your regex with '/' and flags? Those will be treated as actual characters, as you only need to write the regex content. The default flags are 'gms'.",timeout:5e3}}}),N=R,I={name:"ExpressionEditor",data:function(){return{dialog:!1,expression:{name:"",expression:""},expressionField:""}},methods:{openDialog:function(e){this.dialog=!0,this.expression=e,this.previousExpression=Object.assign({},e),this.expressionField=this.expression.expression.toString().slice(1,-1)},closeDialog:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];if(!e)return Object.assign(this.expression,this.previousExpression),void(this.dialog=!1);try{_(this.expressionField)&&this.$emit("snackbar",N.Warning.NoRegexSlashes),this.expression.expression=new RegExp(this.expressionField,"")}catch(t){this.$emit("snackbar",N.Error.InvalidRegExp),this.expression.expression=new RegExp(V,"")}this.dialog=!1}}},j=I,A=n("b0af"),L=n("99d9"),P=n("62ad"),$=n("a523"),F=n("169a"),B=n("2fa4"),z=n("8654"),W=Object(x["a"])(j,T,D,!1,null,null,null),H=W.exports;C()(W,{VBtn:w["a"],VCard:A["a"],VCardActions:L["a"],VCardText:L["c"],VCardTitle:L["d"],VCol:P["a"],VContainer:$["a"],VDialog:F["a"],VRow:y["a"],VSpacer:B["a"],VTextField:z["a"]});var X={name:"NavigationDrawer",props:["active","optionData"],components:{HorizontalSelection:E,ExpressionEditor:H},data:function(){return{drawer:!0,menus:{serialConnection:{baudrate:{suggestions:[115200,57600,38400,19200,9600,4800,2400,1800,1200,600,300,200,150,134,110,75,50]},databits:{options:[8,7,6,5]},stopbits:{options:[1,2]},parityType:{options:["none","even","odd","mark","space"]},flags:{options:[{name:"RTSCTS",val:v.RTSCTS},{name:"XON",val:v.XON},{name:"XOFF",val:v.XOFF},{name:"XANY",val:v.XANY}],default:[]},loading:!1},logMode:{options:[{name:"TERMINAL",val:p.TERMINAL},{name:"CHAT",val:p.CHAT}]},displayMode:{options:[{name:"ASCII",val:u.ASCII},{name:"HEX",val:u.HEX},{name:"BINARY",val:u.BINARY}]},expressions:{count:0,editing:!1}}}},mounted:function(){this.drawer=this.active},computed:{serialConnectionButtonText:function(){return this.optionData.serialConnection.active?"Close":"Go!"}},methods:{toggleSerialConnection:function(){this.menus.serialConnection.loading=!0,this.optionData.serialConnection.active?this.closeSerialConnection():this.openSerialConnection()},openSerialConnection:function(){this.$emit("serialConnected")},closeSerialConnection:function(){this.$emit("serialDisconnected")},setSerialConnectionFlags:function(e){var t=this;Object.values(v).forEach((function(e){t.optionData.serialConnection.serialOptions[e]=!1})),e.forEach((function(e){t.optionData.serialConnection.serialOptions[e]=!0}))},toggle:function(){this.drawer=!this.drawer},addNewExpression:function(){this.optionData.expressions.push({name:"Expression ".concat(this.menus.expressions.count++),active:!1,expression:new RegExp(V,""),color:"#ffffff",colorEdit:!1})},openExpressionEditor:function(e){this.$refs.expressionEditor.openDialog(e)},sendSnackbar:function(e){this.$emit("snackbar",e)},setSerialLoading:function(e){this.menus.serialConnection.loading=e}}},Y=X,U=(n("545c"),n("c6a6")),q=n("ac7c"),K=n("03a4"),G=n("ce7e"),J=n("cd55"),Q=n("49e2"),Z=n("c865"),ee=n("0393"),te=n("132d"),ne=n("8860"),ae=n("da13"),re=n("1800"),oe=n("5d23"),ie=n("1baa"),se=n("e449"),ce=n("f774"),le=n("b974"),ue=Object(x["a"])(Y,s,c,!1,null,null,null),de=ue.exports;C()(ue,{VAutocomplete:U["a"],VBtn:w["a"],VCard:A["a"],VCardText:L["c"],VCheckbox:q["a"],VCol:P["a"],VColorPicker:K["a"],VContainer:$["a"],VDivider:G["a"],VExpansionPanel:J["a"],VExpansionPanelContent:Q["a"],VExpansionPanelHeader:Z["a"],VExpansionPanels:ee["a"],VIcon:te["a"],VList:ne["a"],VListItem:ae["a"],VListItemAction:re["a"],VListItemContent:oe["a"],VListItemGroup:ie["a"],VListItemTitle:oe["b"],VMenu:se["a"],VNavigationDrawer:ce["a"],VRow:y["a"],VSelect:le["a"],VSpacer:B["a"],VTextField:z["a"]});var pe=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-container",{staticStyle:{"background-color":"#363636",height:"calc(100% - 150px)"},attrs:{id:"chatContainer"}},[n("v-card",{style:{backgroundColor:e.chatBackgroundColor,transition:"0.2s ease-in-out background-color"},attrs:{outlined:""}},[n("DynamicScroller",{ref:"scroller",staticClass:"scroller",attrs:{items:e.messages,"min-item-size":24,buffer:300,emitUpdate:!0},on:{resize:e.scrollToBottom,update:e.scrollerUpdate},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.item,r=t.index,o=t.active;return[n("DynamicScrollerItem",{attrs:{item:a,active:o,"data-active":o,"data-index":r,"size-dependencies":[a.content]}},[n("SerialChatMessage",{attrs:{id:a.id,time:a.time,content:a.content,author:a.author,logMode:e.logMode,expressions:e.activeExpressions,displayFunction:e.displayFunction}})],1)]}}])})],1)],1)},he=[],ve=(n("99af"),n("d81d"),function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"monitor-entry",on:{mouseover:function(t){e.showButton=!0},mouseleave:function(t){e.showButton=!1}}},[n("v-btn",{directives:[{name:"show",rawName:"v-show",value:e.showButton,expression:"showButton"}],staticClass:"message-button",attrs:{icon:"","x-small":""},on:{click:e.copyContent}},[n("v-icon",{attrs:{small:""}},[e._v(" mdi-content-copy ")])],1),e.logMode===e.LogMode.CHAT?n("div",[n("v-card",{staticStyle:{"font-family":"monospace","min-height":"42px"},attrs:{id:"msg-"+e.id,dense:"",color:e.colors[e.author],elevation:2}},[n("div",[n("v-card-subtitle",{staticClass:"ma-0 pa-2 pb-0 offwhite-text"},[e._v(" "+e._s(e.time)+" ")])],1),n("v-card-text",{staticClass:"pa-0 pd-1 pl-2 mt-0 offwhite-text",domProps:{innerHTML:e._s(e.regexMarkedContent)}})],1),n("div",{staticStyle:{height:"10px"}})],1):e.logMode===e.LogMode.TERMINAL?n("div",{staticStyle:{"font-family":"monospace"},attrs:{id:"msg-"+e.id}},[n("span",{class:[e.colors[e.author]],staticStyle:{"border-radius":"5px"}},[e._v(">>")]),e._v(" "+e._s(e.time)+" - "),n("span",{domProps:{innerHTML:e._s(e.regexMarkedContent)}})]):e._e()],1)}),fe=[];n("5319"),n("a630"),n("a15b"),n("3ca3"),n("466d"),n("4d90");function me(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;return" ".concat(e.charCodeAt(0).toString(t).padStart(n,"0"))}var ge=/^[ -~]+$/,be=Object.freeze(["NUL","SOH","STX","ETX","EOT","ENQ","ACK","BEL","BS","HT","LF","VT","FF","CR","SO","SI","DLE","DC1","DC2","DC3","DC4","NAK","SYN","ETB","CAN","EM","SUB","ESC","FS","GS","RS","US"]),xe=Object.freeze({LF:"<br>"}),Se=Object.freeze(be.map((function(e){return'<span style="color: yellow">&lt;'.concat(e,"&gt;</span>").concat(xe[e]||"")})));function Ce(e){return Se[e.charCodeAt(0)]||"□"}var we=function(e){return e.match(ge)?e:Ce(e)},ye=function(e){return me(e,16,2)},ke=function(e){return me(e,2,8)};function Ee(e,t){return Array.from(e).map(t).join("")}var Te=n("0665"),De=n.n(Te),Me=Object.freeze({self:"primary",serial:"secondary"}),Oe={name:"SerialChatMessage",props:["id","content","time","author","logMode","expressions","displayFunction"],data:function(){return{colors:Me,LogMode:p,showButton:!1}},computed:{regexMarkedContent:function(){return new De.a(this.expressions,O).replace(this.content)},rawContent:function(){return this.displayFunction===we?this.content:Ee(this.content,this.displayFunction)}},methods:{copyContent:function(){var e=document.createElement("textarea");document.getElementById("msg-".concat(this.id)).appendChild(e),e.value=this.rawContent,e.select(),e.setSelectionRange(0,99999),document.execCommand("copy"),e.remove()}}},Ve=Oe,_e=(n("7513"),Object(x["a"])(Ve,ve,fe,!1,null,"d0310580",null)),Re=_e.exports;C()(_e,{VBtn:w["a"],VCard:A["a"],VCardSubtitle:L["b"],VCardText:L["c"],VIcon:te["a"]});var Ne={name:"SerialChat",props:["logMode","displayMode","messageBufferSize","expressions"],components:{SerialChatMessage:Re},data:function(){return{messages:[],msgIdCount:0,lastScrollPosition:0,lastScrollMessageIndex:0,lastSentMessage:{self:{index:0,id:0,time:0},serial:{index:0,id:0,time:0}},testing:!1}},computed:{activeExpressions:function(){var e=this,t=this.expressions.filter((function(e){return e.active})).map((function(t){return[t.expression,function(n){return'<span style="background-color: '.concat(t.color,'">').concat(Ee(n,e.displayFunction),"</span>")}]}));return t.push([/[\s\S]/gm,function(t){return Ee(t,e.displayFunction)}]),t},displayFunction:function(){return this.displayMode===u.ASCII?we:this.displayMode===u.HEX?ye:ke},chatBackgroundColor:function(){return this.logMode===p.CHAT?"transparent":"#000000b0"}},watch:{logMode:function(){this.scrollToCurrentMessage(),this.$refs.scroller.forceUpdate(!0)},displayMode:function(){this.$refs.scroller.forceUpdate(!0)}},methods:{addEntry:function(e,t){var n=Date.now()-this.lastSentMessage[t].time,a=this.lastSentMessage[t],r=!1,o=this.$refs.scroller.$refs.scroller.$el,i=o.scrollTop+o.offsetHeight;if(r=o.scrollHeight-i<=50,n<500){var s=this.messageIndexSearch(a.id,a.index);this.messages[s].content+=e,a.time=Date.now()}else{this.messages.push({id:this.msgIdCount++,time:this.getCurrentTime(),content:e,author:t});while(this.messages.length>this.messageBufferSize)this.messages.shift();this.lastSentMessage[t]={id:this.msgIdCount-1,index:this.messages.length-1,time:Date.now()}}r&&setTimeout(this.scrollToBottom.bind(this),100)},scrollToBottom:function(){this.$refs.scroller.scrollToBottom()},getCurrentTime:function(){var e=new Date;return"[".concat(e.toLocaleDateString()," - ").concat(e.toLocaleTimeString(),"]")},scrollToCurrentMessage:function(){this.$refs.scroller.scrollToItem(this.lastScrollMessageIndex)},messageIndexSearch:function(e,t){for(var n=t;n>=0;n--)if(this.messages[n].id===e)return n},scrollerUpdate:function(e,t){this.lastScrollMessageIndex=t}},mounted:function(){var e=function(){var e=document.querySelector(".scroller"),t=document.querySelector("#chatContainer"),n=getComputedStyle(t).height;e.style.height="".concat(.9*parseFloat(n,10),"px")};e(),window.addEventListener("resize",e)}},Ie=Ne,je=Object(x["a"])(Ie,pe,he,!1,null,null,null),Ae=je.exports;C()(je,{VCard:A["a"],VContainer:$["a"]});var Le=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-container",{staticClass:"grey darken-3",staticStyle:{height:"150px"}},[n("v-row",{attrs:{align:"center"}},[n("v-textarea",{staticClass:"pl-2",attrs:{outlined:"","hide-details":"",autocomplete:"off",height:"130px"},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")||t.ctrlKey||t.shiftKey||t.altKey||t.metaKey?null:e.sendMessage(t)}},model:{value:e.message,callback:function(t){e.message=t},expression:"message"}}),n("v-btn",{attrs:{icon:"",color:"primary","x-large":""},on:{click:e.sendMessage}},[n("v-icon",[e._v(" mdi-send ")])],1)],1)],1)},Pe=[],$e=n("4f25"),Fe=n.n($e),Be={name:"SerialInput",data:function(){return{message:""}},methods:{sendMessage:function(){this.message&&(this.$emit("sendMessage",Fe()(this.message)),this.message="")}}},ze=Be,We=n("a844"),He=Object(x["a"])(ze,Le,Pe,!1,null,null,null),Xe=He.exports;C()(He,{VBtn:w["a"],VContainer:$["a"],VIcon:te["a"],VRow:y["a"],VTextarea:We["a"]});var Ye=function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.content?n("v-snackbar",{attrs:{top:"",color:e.content.color,timeout:e.content.timeout},model:{value:e.isOn,callback:function(t){e.isOn=t},expression:"isOn"}},[e._v(" "+e._s(e.content.content)+" "),e._l(e.content.buttons,(function(t,a){return n("v-btn",{key:a,attrs:{text:""},on:{click:t.callback}},[e._v(" "+e._s(t.text)+" ")])})),n("v-btn",{attrs:{text:""},on:{click:e.close}},[e._v(" Close ")])],2):e._e()},Ue=[],qe={name:"Snackbar",data:function(){return{isOn:!1,content:null,closeTimeout:null}},methods:{setMessage:function(e){var t=this;this.isOn&&this.close(),this.isOn=!0,this.content=e,-1!==e.timeout&&(this.closeTimeout=setTimeout((function(){t.close()}),e.timeout))},close:function(){this.closeTimeout&&(clearTimeout(this.closeTimeout),this.closeTimeout=null),this.isOn=!1,this.content=null}}},Ke=qe,Ge=n("2db4"),Je=Object(x["a"])(Ke,Ye,Ue,!1,null,null,null),Qe=Je.exports;C()(Je,{VBtn:w["a"],VSnackbar:Ge["a"]});var Ze=n("d4ec"),et=n("bee2"),tt=n("ade3"),nt=function(){function e(t){Object(Ze["a"])(this,e),e.checkCompatibility(),this.setDefaultCallbacks(),this.active=!1,this.serialWriter=null,this.serialReader=null,this.serialWriterClosed=null,this.serialReaderClosed=null,this.encoder=null,this.decoder=null,this.serialPort=null,this.options={decodeFrom:"ascii",readLoopCallback:null},this.loadOptions(t)}return Object(et["a"])(e,[{key:"loadOptions",value:function(e){Object.assign(this.options,e)}},{key:"setDecodeFrom",value:function(e){this.options.decodeFrom=e}},{key:"setReadLoopCallback",value:function(e){var t=!1;this.active&&!this.options.readLoopCallback&&(t=!0),this.options.readLoopCallback=e,t&&this.readLoop()}},{key:"requestPort",value:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(n){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!this.active){t.next=2;break}throw e.Error.AlreadyActive;case 2:return t.next=4,navigator.serial.requestPort(n);case 4:this.serialPort=t.sent;case 5:case"end":return t.stop()}}),t,this)})));function n(e){return t.apply(this,arguments)}return n}()},{key:"openConnection",value:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(n){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(this.serialPort){t.next=2;break}throw e.Error.NoPortLoaded;case 2:return t.next=4,this.serialPort.open(n);case 4:if(this.serialPort.readable&&this.serialPort.writable){t.next=6;break}throw e.Error.NoStreams;case 6:this.active=!0,this.initializeReader(),this.initializeWriter();case 9:case"end":return t.stop()}}),t,this)})));function n(e){return t.apply(this,arguments)}return n}()},{key:"initializeReader",value:function(){this.decoder=new window.TextDecoderStream(this.options.decodeFrom),this.serialReaderClosed=this.serialPort.readable.pipeTo(this.decoder.writable),this.serialReader=this.decoder.readable.getReader(),this.options.readLoopCallback&&this.readLoop()}},{key:"initializeWriter",value:function(){this.encoder=new window.TextEncoderStream,this.serialWriterClosed=this.encoder.readable.pipeTo(this.serialPort.writable),this.serialWriter=this.encoder.writable.getWriter()}},{key:"write",value:function(e){this.serialWriter.write(e)}},{key:"read",value:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.serialReader.read();case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"readLoop",value:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(){var t,n,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,this.serialReader.read();case 3:a=e.sent,t=a.value,n=a.done,e.next=14;break;case 8:if(e.prev=8,e.t0=e["catch"](0),!(e.t0 instanceof DOMException)){e.next=12;break}return e.abrupt("break",19);case 12:this.serialReader.releaseLock(),this.serialReader=this.decoder.readable.getReader();case 14:if(!n){e.next=16;break}return e.abrupt("break",19);case 16:this.options.readLoopCallback(t);case 17:e.next=0;break;case 19:case"end":return e.stop()}}),e,this,[[0,8]])})));function t(){return e.apply(this,arguments)}return t}()},{key:"close",value:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(){var t,n=arguments;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t=n.length>0&&void 0!==n[0]&&n[0],this.active=!1,!this.serialWriter){e.next=6;break}return this.serialWriter.close(),e.next=6,this.writableStreamClosed;case 6:if(!this.serialReader){e.next=18;break}return e.prev=7,e.next=10,this.serialReader.cancel();case 10:e.next=16;break;case 12:if(e.prev=12,e.t0=e["catch"](7),t&&e.t0 instanceof DOMException){e.next=16;break}throw e.t0;case 16:return e.next=18,this.serialReaderClosed.catch((function(){}));case 18:if(!this.serialPort){e.next=21;break}return e.next=21,this.serialPort.close();case 21:this.serialReader=null,this.serialWriter=null,this.serialReaderClosed=null,this.serialWriterClosed=null,this.serialPort=null,this.encoder=null,this.decoder=null;case 28:case"end":return e.stop()}}),e,this,[[7,12]])})));function t(){return e.apply(this,arguments)}return t}()},{key:"addEventListener",value:function(e,t){navigator.serial.addEventListener(e,t)}},{key:"setDefaultCallbacks",value:function(){this.addEventListener("disconnect",this.close.bind(this,!0))}}],[{key:"checkCompatibility",value:function(){if(!("serial"in navigator))throw e.Error.NoWebSerial;if(!("TextEncoderStream"in window))throw e.Error.NoTextEncoderStream;if(!("TextDecoderStream"in window))throw e.Error.NoTextDecoderStream}}]),e}();Object(tt["a"])(nt,"Errors",Object.freeze({NoWebSerial:new Error("This browser doesn't support or hasn't enabled the WebSerialAPI."),NoTextEncoderStream:new Error("This browser doesn't have the TextEncoderStream class. There's a way to polyfill it: https://developer.mozilla.org/en-US/docs/Web/API/TransformStream#Polyfilling_TextEncoderStream_and_TextDecoderStream"),NoTextDecoderStream:new Error("This browser doesn't have the TextDecoderStream class. There's a way to polyfill it: https://developer.mozilla.org/en-US/docs/Web/API/TransformStream#Polyfilling_TextEncoderStream_and_TextDecoderStream"),NoPortLoaded:new Error("There was not port loaded."),NoStreams:new Error("Invalid serial port streams."),AlreadyActive:new Error("This serial connection is already active.")}));var at=nt,rt={name:"App",components:{NavigationDrawer:de,SerialChat:Ae,SerialInput:Xe,Snackbar:Qe},mounted:function(){try{at.checkCompatibility()}catch(e){switch(e){case at.Error.NoWebSerial:return void this.setSnackbarMessage(N.Error.NoWebSerial);case at.Error.NoTextDecoderStream:return void this.setSnackbarMessage(N.Error.NoTextDecoderStream);case at.Error.NoTextEncoderStream:return void this.setSnackbarMessage(N.Error.NoTextEncoderStream)}}},data:function(){return{snackbarMessage:null,showAsTerminal:!1,browserSerial:null,navigationDrawer:{active:!0,optionData:{logMode:p.CHAT,displayMode:u.ASCII,serialConnection:{active:!1,serialOptions:{baudrate:null,databits:8,stopbits:1,parity:"none",buffersize:255,rtscts:!1,xon:!1,xoff:!1,xany:!1}},expressions:[]}}}},methods:{sendMessage:function(e){this.$refs.chat.addEntry(e,"self"),this.browserSerial&&this.browserSerial.write(e)},setSnackbarMessage:function(e){this.$refs.snackbar.setMessage(e)},toggleDrawer:function(){this.$refs.drawer.toggle()},openSerial:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.browserSerial=new at({decodeFrom:"ascii",readLoopCallback:function(t){e.$refs.chat.addEntry(t,"serial")}}),e.browserSerial.addEventListener("disconnect",(function(){e.closeSerial(!0),e.setSnackbarMessage(N.Warning.SerialConnectionClosed),e.$refs.drawer.setSerialLoading(!1)})),t.prev=2,t.next=5,e.browserSerial.requestPort();case 5:t.next=12;break;case 7:return t.prev=7,t.t0=t["catch"](2),e.$refs.drawer.setSerialLoading(!1),e.setSnackbarMessage(N.Error.NoPortSelected),t.abrupt("return");case 12:return t.prev=12,t.next=15,e.browserSerial.openConnection(e.navigationDrawer.optionData.serialConnection.serialOptions);case 15:t.next=22;break;case 17:return t.prev=17,t.t1=t["catch"](12),e.$refs.drawer.setSerialLoading(!1),e.setSnackbarMessage(N.Error.Custom("Serial port opening error: ".concat(t.t1))),t.abrupt("return");case 22:e.navigationDrawer.optionData.serialConnection.active=!0,e.$refs.drawer.setSerialLoading(!1),e.setSnackbarMessage(N.Success.SerialConnectionOpened);case 25:case"end":return t.stop()}}),t,null,[[2,7],[12,17]])})))()},closeSerial:function(){var e=arguments,t=this;return Object(i["a"])(regeneratorRuntime.mark((function n(){var a;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(a=e.length>0&&void 0!==e[0]&&e[0],a){n.next=4;break}return n.next=4,t.browserSerial.close();case 4:t.navigationDrawer.optionData.serialConnection.active=!1,t.$refs.drawer.setSerialLoading(!1),t.browserSerial=null,t.setSnackbarMessage(N.Success.SerialConnectionClosed);case 8:case"end":return n.stop()}}),n)})))()}}},ot=rt,it=n("7496"),st=n("40dc"),ct=n("5bc1"),lt=n("f6c4"),ut=Object(x["a"])(ot,r,o,!1,null,null,null),dt=ut.exports;C()(ut,{VApp:it["a"],VAppBar:st["a"],VAppBarNavIcon:ct["a"],VMain:lt["a"],VSpacer:B["a"]});var pt=n("f309");a["a"].use(pt["a"]);var ht=new pt["a"]({theme:{dark:!0}}),vt=(n("a899"),n("e508")),ft=n("ae1a"),mt=n.n(ft);a["a"].use(vt["a"]),a["a"].use(mt.a),a["a"].config.productionTip=!1,new a["a"]({vuetify:ht,render:function(e){return e(dt)}}).$mount("#app")},7513:function(e,t,n){"use strict";var a=n("20af"),r=n.n(a);r.a},8314:function(e,t,n){}});
//# sourceMappingURL=app.484058c2.js.map