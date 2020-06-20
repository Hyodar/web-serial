(function(e){function t(t){for(var a,s,i=t[0],c=t[1],l=t[2],d=0,p=[];d<i.length;d++)s=i[d],Object.prototype.hasOwnProperty.call(r,s)&&r[s]&&p.push(r[s][0]),r[s]=0;for(a in c)Object.prototype.hasOwnProperty.call(c,a)&&(e[a]=c[a]);u&&u(t);while(p.length)p.shift()();return o.push.apply(o,l||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],a=!0,i=1;i<n.length;i++){var c=n[i];0!==r[c]&&(a=!1)}a&&(o.splice(t--,1),e=s(s.s=n[0]))}return e}var a={},r={app:0},o=[];function s(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=e,s.c=a,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)s.d(n,a,function(t){return e[t]}.bind(null,a));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/web-serial/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],c=i.push.bind(i);i.push=t,i=i.slice();for(var l=0;l<i.length;l++)t(i[l]);var u=c;o.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"060c":function(e,t,n){"use strict";var a=n("752c"),r=n.n(a);r.a},"07e9":function(e,t,n){},4855:function(e,t,n){"use strict";var a=n("994c"),r=n.n(a);r.a},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var a=n("2b0e"),r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-app",{staticStyle:{"background-color":"#262626"},attrs:{dark:""}},[n("v-app-bar",{attrs:{app:""}},[n("v-spacer"),n("v-app-bar-nav-icon",{on:{click:function(t){return t.stopPropagation(),e.toggleDrawer(t)}}})],1),n("v-navigation-drawer",{attrs:{app:"",right:"",width:"350"},model:{value:e.drawer,callback:function(t){e.drawer=t},expression:"drawer"}},[n("SerialOptions",{attrs:{value:e.userOptions.serialConnection},on:{serialConnected:e.openSerial,serialDisconnected:e.closeSerial}}),n("LogModeOptions",{model:{value:e.userOptions.logMode,callback:function(t){e.$set(e.userOptions,"logMode",t)},expression:"userOptions.logMode"}}),n("DisplayModeOptions",{model:{value:e.userOptions.displayMode,callback:function(t){e.$set(e.userOptions,"displayMode",t)},expression:"userOptions.displayMode"}}),n("ExpressionList",{on:{snackbar:function(t){return e.setSnackbarMessage(t)}},model:{value:e.userOptions.expressions,callback:function(t){e.$set(e.userOptions,"expressions",t)},expression:"userOptions.expressions"}}),n("CommandList",{ref:"commandList",on:{sendCommand:e.sendCommand,snackbar:function(t){return e.setSnackbarMessage(t)}},model:{value:e.userOptions.commands,callback:function(t){e.$set(e.userOptions,"commands",t)},expression:"userOptions.commands"}})],1),n("v-main",[n("Snackbar",{ref:"snackbar"}),n("SerialChat",{ref:"chat",attrs:{logMode:e.userOptions.logMode,displayMode:e.userOptions.displayMode,expressions:e.userOptions.expressions,messageBufferSize:500}}),n("SerialInput",{on:{sendMessage:e.sendMessage}})],1)],1)},o=[],s=(n("96cf"),n("1da1")),i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("NavigationDrawerRow",{attrs:{label:"Serial Connection"}},[n("v-col",{attrs:{cols:9}},[n("v-autocomplete",{attrs:{items:e.menus.baudrate.suggestions,label:"Baud Rate"},model:{value:e.value.serialOptions.baudrate,callback:function(t){e.$set(e.value.serialOptions,"baudrate",t)},expression:"value.serialOptions.baudrate"}})],1),n("v-col",{attrs:{cols:3}},[n("v-btn",{attrs:{text:""},on:{click:e.toggleSerialConnection}},[e._v(" "+e._s(e.serialConnectionButtonText)+" ")])],1),n("v-row",[n("v-expansion-panels",{attrs:{flat:""}},[n("v-expansion-panel",{staticClass:"transparent"},[n("v-expansion-panel-header",[n("span",{staticClass:"text-button",staticStyle:{"font-size":"0.75rem !important"}},[e._v(" Additional Options ")])]),n("v-expansion-panel-content",{staticClass:"grey darken-3"},[n("v-row",[n("v-col",[n("v-select",{attrs:{items:e.menus.parity.options,value:e.value.serialOptions.parity,label:"Parity Type"}})],1),n("v-col",[n("v-text-field",{attrs:{type:"number",value:e.value.serialOptions.buffersize,label:"Buffer Size"}})],1)],1),n("v-row",[n("v-col",[n("v-select",{attrs:{items:e.menus.databits.options,value:e.value.serialOptions.databits,label:"Data Bits"}})],1),n("v-col",[n("v-select",{attrs:{items:e.menus.stopbits.options,value:e.value.serialOptions.stopbits,label:"Stop Bits"}})],1)],1),n("HorizontalSelection",{staticClass:"mt-2",attrs:{multiple:"",dense:"",options:e.menus.flags.options,value:e.menus.flags.default},on:{changedValue:function(t){return e.setSerialConnectionFlags(t)}}})],1)],1)],1)],1)],1)},c=[],l=(n("4160"),n("07ac"),n("159b"),function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-container",[n("v-row",{staticClass:"ma-1 mt-5",attrs:{justify:"center"}},[e._t("header",[n("div",{staticClass:"text-button"},[e._v(" "+e._s(e.label)+" ")])])],2),n("v-divider",{staticClass:"ma-2"}),n("v-row",{staticClass:"ma-3 mb-0",attrs:{justify:"center",align:"center"}},[e._t("default")],2)],1)}),u=[],d={name:"NavigationDrawerRow",props:{label:String}},p=d,m=n("2877"),h=n("6544"),v=n.n(h),f=n("a523"),b=n("ce7e"),g=n("0fd9"),x=Object(m["a"])(p,l,u,!1,null,null,null),w=x.exports;v()(x,{VContainer:f["a"],VDivider:b["a"],VRow:g["a"]});var S=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-row",{class:[e.dense?"ma-0":"ma-3"],attrs:{justify:"center"}},e._l(e.options,(function(t){return n("v-btn",{key:t.val,class:[e.isOptionActive(t.val)?"grey darken-2":void 0,e.dense?"pa-1":void 0],attrs:{tile:""},on:{click:function(n){return e.changeValue(t.val)}}},[e._v(" "+e._s(t.name)+" ")])})),1)},C=[],k=(n("4de4"),n("c975"),{name:"HorizontalSelection",data:function(){return{activeValue:null}},mounted:function(){this.activeValue=this.value},props:["options","value"],methods:{changeValue:function(e){if(this.multiple)return this.isOptionActive(e)?this.activeValue=this.activeValue.filter((function(t){return t!==e})):this.activeValue.push(e),void this.$emit("changedValue",this.activeValue);this.$emit("changedValue",e)},isOptionActive:function(e){return this.multiple?this.activeValue&&-1!==this.activeValue.indexOf(e):this.value===e}},computed:{multiple:function(){return void 0!==this.$attrs.multiple},dense:function(){return void 0!==this.$attrs.dense}}}),y=k,E=n("8336"),O=Object(m["a"])(y,S,C,!1,null,null,null),T=O.exports;v()(O,{VBtn:E["a"],VRow:g["a"]});n("dca8");var V=Object.freeze({RTSCTS:"rtscts",XON:"xon",XOFF:"xoff",XANY:"xany"}),_=V,M={name:"SerialOptions",components:{NavigationDrawerRow:w,HorizontalSelection:T},props:{value:Object},data:function(){return{menus:{baudrate:{suggestions:[115200,57600,38400,19200,9600,4800,2400,1800,1200,600,300,200,150,134,110,75,50]},databits:{options:[8,7,6,5]},stopbits:{options:[1,2]},parity:{options:["none","even","odd","mark","space"]},flags:{options:[{name:_.RTSCTS,val:_.RTSCTS},{name:_.XON,val:_.XON},{name:_.XOFF,val:_.XOFF},{name:_.XANY,val:_.XANY}],default:[]}}}},computed:{serialConnectionButtonText:function(){return this.value.active?"Cancel":"Go!"}},methods:{toggleSerialConnection:function(){this.value.active?this.$emit("serialDisconnected"):this.$emit("serialConnected")},setSerialConnectionFlags:function(e){var t=this;Object.values(_).forEach((function(e){t.value.serialOptions[e]=!1})),e.forEach((function(e){t.value.serialOptions[e]=!0}))}}},R=M,D=n("c6a6"),N=n("62ad"),j=n("cd55"),L=n("49e2"),$=n("c865"),I=n("0393"),F=n("b974"),P=n("8654"),B=Object(m["a"])(R,i,c,!1,null,null,null),A=B.exports;v()(B,{VAutocomplete:D["a"],VBtn:E["a"],VCol:N["a"],VExpansionPanel:j["a"],VExpansionPanelContent:L["a"],VExpansionPanelHeader:$["a"],VExpansionPanels:I["a"],VRow:g["a"],VSelect:F["a"],VTextField:P["a"]});var z=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("NavigationDrawerRow",{attrs:{label:"Log Mode"}},[n("HorizontalSelection",{attrs:{options:e.options,value:e.value},on:{changedValue:function(t){return e.updateValue(t)}}})],1)},W=[],q=(n("d81d"),n("4fad"),Object.freeze({TERMINAL:0,CHAT:1})),H=q,X={name:"LogModeOptions",components:{NavigationDrawerRow:w,HorizontalSelection:T},props:["value"],data:function(){return{options:Object.entries(H).map((function(e){return{name:e[0],val:e[1]}}))}},methods:{updateValue:function(e){this.$emit("input",e)}}},U=X,Y=Object(m["a"])(U,z,W,!1,null,null,null),K=Y.exports,G=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("NavigationDrawerRow",{attrs:{label:"Display Mode"}},[n("HorizontalSelection",{attrs:{options:e.options,value:e.value},on:{changedValue:function(t){return e.updateValue(t)}}})],1)},J=[],Q=Object.freeze({ASCII:0,HEX:1,BINARY:2}),Z=Q,ee={name:"DisplayModeOptions",components:{NavigationDrawerRow:w,HorizontalSelection:T},props:["value"],data:function(){return{options:Object.entries(Z).map((function(e){return{name:e[0],val:e[1]}}))}},methods:{updateValue:function(e){this.$emit("input",e)}}},te=ee,ne=Object(m["a"])(te,G,J,!1,null,null,null),ae=ne.exports,re=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("NavigationDrawerRow",{scopedSlots:e._u([{key:"header",fn:function(){return[n("v-spacer"),n("div",{staticClass:"text-button"},[e._v(" Expressions ")]),n("v-spacer"),n("v-btn",{attrs:{icon:"",small:""},on:{click:e.addNewExpression}},[n("v-icon",[e._v(" mdi-plus ")])],1)]},proxy:!0}])},[n("ExpressionEditor",{ref:"expressionEditor",on:{snackbar:function(t){return e.sendSnackbar(t)}}}),n("v-card",{directives:[{name:"bar",rawName:"v-bar"}],staticClass:"grey darken-3",staticStyle:{height:"300px",width:"100%"}},[n("v-list",[n("v-list-item-group",e._l(e.value,(function(t,a){return n("v-list-item",{key:a},[n("v-list-item-action",[n("v-checkbox",{attrs:{color:"grey darken-4"},model:{value:t.active,callback:function(n){e.$set(t,"active",n)},expression:"item.active"}})],1),n("v-list-item-content",{on:{click:function(n){return e.openExpressionEditor(t)}}},[n("v-list-item-title",{domProps:{textContent:e._s(t.name)}})],1),n("v-list-item-action",[n("v-menu",{attrs:{top:"","nudge-bottom":"105","nudge-left":"16","close-on-content-click":!1},scopedSlots:e._u([{key:"activator",fn:function(a){var r=a.on;return[n("v-btn",e._g({staticClass:"pa-3",attrs:{icon:"",color:t.color}},r),[n("v-icon",{attrs:{large:""}},[e._v(" mdi-label ")])],1)]}}],null,!0),model:{value:t.colorEdit,callback:function(n){e.$set(t,"colorEdit",n)},expression:"item.colorEdit"}},[n("v-card",[n("v-card-text",{staticClass:"pa-0"},[n("v-color-picker",{attrs:{flat:""},model:{value:t.color,callback:function(n){e.$set(t,"color",n)},expression:"item.color"}})],1)],1)],1)],1)],1)})),1)],1)],1)],1)},oe=[],se=(n("4d63"),n("ac1f"),n("25f0"),n("baa5"),"gimusy"),ie="gms",ce="a^";function le(e){var t=e.indexOf("/"),n=e.lastIndexOf("/");return-1!==t&&-1!==n&&t!==n&&e.length-n-1<=se.length}var ue=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-dialog",{attrs:{persistent:"","max-width":"300px"},model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[n("v-card",[n("v-card-title",[n("span",{staticClass:"headline"},[e._v("Expression Editor")])]),n("v-card-text",[n("v-container",[n("v-row",{attrs:{align:"center"}},[n("v-col",{attrs:{cols:"8"}},[n("v-text-field",{attrs:{label:"Name",required:""},model:{value:e.expression.name,callback:function(t){e.$set(e.expression,"name",t)},expression:"expression.name"}})],1),n("v-col",{attrs:{cols:"12"}},[n("v-text-field",{attrs:{label:"RegEx",required:""},model:{value:e.expressionField,callback:function(t){e.expressionField=t},expression:"expressionField"}})],1)],1)],1)],1),n("v-card-actions",[n("v-spacer"),n("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:function(t){return e.closeDialog(!1)}}},[e._v("Close")]),n("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:function(t){return e.closeDialog(!0)}}},[e._v("Save")])],1)],1)],1)},de=[],pe=(n("fb6a"),n("d3b7"),Object.freeze({Error:{NoWebSerial:{color:"error",content:"Your browser doesn't seem to have the WebSerial API enabled. Please check if your browser supports it. The 'enable' button will lead you to the instructions to activate it on Chrome.",buttons:[{text:"Enable",callback:function(){window.location.href="https://codelabs.developers.google.com/codelabs/web-serial/#2"}}],timeout:-1},NoTextDecoderStream:{color:"error",content:"Your browser doesn't seem to have the TextDecoderStream class. Maybe check on its documentation?",timeout:-1},NoTextEncoderStream:{color:"error",content:"Your browser doesn't seem to have the TextEncoderStream class. Maybe check on its documentation?",timeout:-1},NoPortSelected:{color:"error",content:"No serial port selected. Connection stopped.",timeout:2e3},ConnectionFailed:{color:"error",content:"Your serial connection failed somehow. Please try again.",timeout:3e3},InvalidRegExp:{color:"error",content:"There seemed to be something wrong with your RegExp. It's now back to the default.",timeout:3e3},Custom:function(e){return{color:"error",content:e,timeout:-1}}},Success:{SerialConnectionOpened:{color:"success",content:"Successfully opened a serial connection!",timeout:2e3},SerialConnectionClosed:{color:"success",content:"Successfully closed a serial connection!",timeout:2e3}},Warning:{SerialConnectionClosed:{color:"warning",content:"The serial connection was closed.",timeout:5e3},NoRegexSlashes:{color:"warning",content:"Hmm... Did you write your regex with '/' and flags? Those will be treated as actual characters, as you only need to write the regex content. The default flags are 'gms'.",timeout:5e3}}})),me=pe,he={name:"ExpressionEditor",data:function(){return{dialog:!1,expression:{name:"",expression:""},expressionField:""}},methods:{openDialog:function(e){this.dialog=!0,this.expression=e,this.previousExpression=Object.assign({},e),this.expressionField=this.expression.expression.toString().slice(1,-1)},closeDialog:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];if(!e)return Object.assign(this.expression,this.previousExpression),void(this.dialog=!1);try{le(this.expressionField)&&this.$emit("snackbar",me.Warning.NoRegexSlashes),this.expression.expression=new RegExp(this.expressionField,"")}catch(t){this.$emit("snackbar",me.Error.InvalidRegExp),this.expression.expression=new RegExp(ce,"")}this.dialog=!1}}},ve=he,fe=n("b0af"),be=n("99d9"),ge=n("169a"),xe=n("2fa4"),we=Object(m["a"])(ve,ue,de,!1,null,null,null),Se=we.exports;v()(we,{VBtn:E["a"],VCard:fe["a"],VCardActions:be["a"],VCardText:be["c"],VCardTitle:be["d"],VCol:N["a"],VContainer:f["a"],VDialog:ge["a"],VRow:g["a"],VSpacer:xe["a"],VTextField:P["a"]});var Ce={name:"ExpressionList",components:{ExpressionEditor:Se,NavigationDrawerRow:w},props:["value"],data:function(){return{expressionCount:0}},methods:{sendSnackbar:function(e){this.$emit("snackbar",e)},addNewExpression:function(){this.value.push({name:"Expression ".concat(this.expressionCount++),active:!1,expression:new RegExp(ce,""),color:"#ffffff",colorEdit:!1})},openExpressionEditor:function(e){this.$refs.expressionEditor.openDialog(e)}}},ke=Ce,ye=(n("4855"),n("ac7c")),Ee=n("03a4"),Oe=n("132d"),Te=n("8860"),Ve=n("da13"),_e=n("1800"),Me=n("5d23"),Re=n("1baa"),De=n("e449"),Ne=Object(m["a"])(ke,re,oe,!1,null,null,null),je=Ne.exports;v()(Ne,{VBtn:E["a"],VCard:fe["a"],VCardText:be["c"],VCheckbox:ye["a"],VColorPicker:Ee["a"],VIcon:Oe["a"],VList:Te["a"],VListItem:Ve["a"],VListItemAction:_e["a"],VListItemContent:Me["a"],VListItemGroup:Re["a"],VListItemTitle:Me["b"],VMenu:De["a"],VSpacer:xe["a"]});var Le=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("NavigationDrawerRow",{scopedSlots:e._u([{key:"header",fn:function(){return[n("v-spacer"),n("div",{staticClass:"text-button"},[e._v(" Commands ")]),n("v-spacer"),n("v-btn",{attrs:{icon:"",small:""},on:{click:e.addNewCommand}},[n("v-icon",[e._v(" mdi-plus ")])],1)]},proxy:!0}])},[n("CommandEditor",{ref:"commandEditor",on:{snackbar:function(t){return e.sendSnackbar(t)}}}),n("v-card",{directives:[{name:"bar",rawName:"v-bar"}],staticClass:"grey darken-3",staticStyle:{height:"300px",width:"100%"}},[n("v-list",[n("v-list-item-group",e._l(e.value,(function(t,a){return n("v-list-item",{key:a},[n("v-list-item-action",[n("v-btn",{attrs:{icon:"",color:"white"},on:{click:function(n){return e.sendCommand(t.content)}}},[n("v-icon",{staticClass:"mdi-flip-horizontal",attrs:{normal:""}},[e._v(" mdi-reply ")])],1)],1),n("v-list-item-content",{on:{click:function(n){return e.openCommandEditor(t)}}},[n("v-list-item-title",{domProps:{textContent:e._s(t.name)}})],1)],1)})),1)],1)],1)],1)},$e=[],Ie=(n("466d"),function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-dialog",{attrs:{persistent:"","max-width":"300px"},model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[n("v-card",[n("v-card-title",[n("span",{staticClass:"headline"},[e._v("Command Editor")])]),n("v-card-text",[n("v-container",[n("v-row",{attrs:{align:"center"}},[n("span",{staticClass:"text-caption"},[e._v(" Write as you normally would write a Javascript string. For example, to write a 0x01 byte, write '\\x01'. ")]),n("v-col",{attrs:{cols:"8"}},[n("v-text-field",{attrs:{label:"Name",required:""},model:{value:e.command.name,callback:function(t){e.$set(e.command,"name",t)},expression:"command.name"}})],1),n("v-col",{attrs:{cols:"12"}},[n("v-text-field",{attrs:{label:"Command",required:""},model:{value:e.command.content,callback:function(t){e.$set(e.command,"content",t)},expression:"command.content"}})],1),n("v-card",{staticClass:"grey darken-3 pa-2"},[n("span",{staticClass:"text-caption"},[e._v(" Send automatically when this RegEx matches a new message: "),n("br"),e._v(" (leave empty for a manual command) ")]),n("v-col",{attrs:{cols:"12"}},[n("v-text-field",{attrs:{label:"RegEx",required:""},model:{value:e.sequenceField,callback:function(t){e.sequenceField=t},expression:"sequenceField"}})],1)],1)],1)],1)],1),n("v-card-actions",[n("v-spacer"),n("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:function(t){return e.closeDialog(!1)}}},[e._v("Close")]),n("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:function(t){return e.closeDialog(!0)}}},[e._v("Save")])],1)],1)],1)}),Fe=[],Pe={name:"CommandEditor",data:function(){return{dialog:!1,command:{name:"",content:"",sequence:null},sequenceField:""}},methods:{openDialog:function(e){this.dialog=!0,this.command=e,this.previousCommand=Object.assign({},e),this.command.sequence?this.sequenceField=this.command.sequence.toString().slice(1,-(1+ie.length)):this.sequenceField=""},closeDialog:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];if(!e)return Object.assign(this.command,this.previousCommand),void(this.dialog=!1);try{le(this.sequenceField)&&this.$emit("snackbar",me.Warning.NoRegexSlashes),this.command.sequence=new RegExp(this.sequenceField,ie)}catch(t){this.$emit("snackbar",me.Error.InvalidRegExp),this.command.sequence=null}this.dialog=!1}}},Be=Pe,Ae=Object(m["a"])(Be,Ie,Fe,!1,null,null,null),ze=Ae.exports;v()(Ae,{VBtn:E["a"],VCard:fe["a"],VCardActions:be["a"],VCardText:be["c"],VCardTitle:be["d"],VCol:N["a"],VContainer:f["a"],VDialog:ge["a"],VRow:g["a"],VSpacer:xe["a"],VTextField:P["a"]});var We={name:"CommandList",components:{CommandEditor:ze,NavigationDrawerRow:w},props:["value"],data:function(){return{commandCount:0,scanTimeout:null,scanBuffer:""}},methods:{sendSnackbar:function(e){this.$emit("snackbar",e)},addNewCommand:function(){this.value.push({name:"Command ".concat(this.commandCount++),content:"",sequence:null})},openCommandEditor:function(e){this.$refs.commandEditor.openDialog(e)},sendCommand:function(e){e&&this.$emit("sendCommand",e)},addToScanBuffer:function(e){this.scanTimeout&&(clearTimeout(this.scanTimeout),this.scanTimeout=null),this.scanBuffer+=e,this.scanTimeout=setTimeout(this.checkMatches.bind(this),300)},checkMatches:function(){var e=this;this.scanBuffer&&(this.value.forEach((function(t){if(t.sequence){var n=e.scanBuffer.match(t.sequence).filter((function(e){return e}));if(n)for(var a=0;a<n.length;a++)e.sendCommand(t.content)}})),this.scanBuffer="")}}},qe=We,He=Object(m["a"])(qe,Le,$e,!1,null,null,null),Xe=He.exports;v()(He,{VBtn:E["a"],VCard:fe["a"],VIcon:Oe["a"],VList:Te["a"],VListItem:Ve["a"],VListItemAction:_e["a"],VListItemContent:Me["a"],VListItemGroup:Re["a"],VListItemTitle:Me["b"],VSpacer:xe["a"]});var Ue=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-container",{attrs:{id:"chatContainer"}},[n("v-card",{style:{backgroundColor:e.chatBackgroundColor,transition:"0.2s ease-in-out background-color"},attrs:{outlined:""}},[n("DynamicScroller",{ref:"scroller",staticClass:"scroller",attrs:{items:e.messages,"min-item-size":24,buffer:300,emitUpdate:!0},on:{resize:e.scrollToBottom,update:e.scrollerUpdate},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.item,r=t.index,o=t.active;return[n("DynamicScrollerItem",{attrs:{item:a,active:o,"data-active":o,"data-index":r,"size-dependencies":[a.content]}},[n("SerialChatMessage",{attrs:{id:a.id,time:a.time,content:a.content,author:a.author,logMode:e.logMode,expressions:e.activeExpressions,displayFunction:e.displayFunction}})],1)]}}])})],1)],1)},Ye=[],Ke=(n("99af"),function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"monitor-entry",on:{mouseover:function(t){e.showButton=!0},mouseleave:function(t){e.showButton=!1}}},[n("v-btn",{directives:[{name:"show",rawName:"v-show",value:e.showButton,expression:"showButton"}],staticClass:"message-button",attrs:{icon:"","x-small":""},on:{click:e.copyContent}},[n("v-icon",{attrs:{small:""}},[e._v(" mdi-content-copy ")])],1),e.logMode===e.LogMode.CHAT?n("div",[n("v-card",{staticStyle:{"font-family":"monospace","min-height":"42px"},attrs:{id:"msg-"+e.id,dense:"",color:e.colors[e.author],elevation:2}},[n("div",[n("v-card-subtitle",{staticClass:"ma-0 pa-2 pb-0 offwhite-text"},[e._v(" "+e._s(e.time)+" ")])],1),n("v-card-text",{staticClass:"pa-0 pd-1 pl-2 mt-0 offwhite-text",domProps:{innerHTML:e._s(e.regexMarkedContent)}})],1),n("div",{staticStyle:{height:"10px"}})],1):e.logMode===e.LogMode.TERMINAL?n("div",{staticStyle:{"font-family":"monospace"},attrs:{id:"msg-"+e.id}},[n("span",{class:[e.colors[e.author]],staticStyle:{"border-radius":"5px"}},[e._v(">>")]),e._v(" "+e._s(e.time)+" - "),n("span",{domProps:{innerHTML:e._s(e.regexMarkedContent)}})]):e._e()],1)}),Ge=[];n("5319"),n("a630"),n("a15b"),n("3ca3"),n("4d90");function Je(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;return" ".concat(e.charCodeAt(0).toString(t).padStart(n,"0"))}var Qe=/^[ -~]+$/,Ze=Object.freeze(["NUL","SOH","STX","ETX","EOT","ENQ","ACK","BEL","BS","HT","LF","VT","FF","CR","SO","SI","DLE","DC1","DC2","DC3","DC4","NAK","SYN","ETB","CAN","EM","SUB","ESC","FS","GS","RS","US"]),et=Object.freeze({LF:"<br>"}),tt=Object.freeze(Ze.map((function(e){return'<span style="color: yellow">&lt;'.concat(e,"&gt;</span>").concat(et[e]||"")})));function nt(e){return tt[e.charCodeAt(0)]||"□"}var at=function(e){return e.match(Qe)?e:nt(e)},rt=function(e){return Je(e,16,2)},ot=function(e){return Je(e,2,8)};function st(e,t){return Array.from(e).map(t).join("")}var it=Object.freeze({self:"primary",serial:"secondary"}),ct=it,lt=n("0665"),ut=n.n(lt),dt={name:"SerialChatMessage",props:["id","content","time","author","logMode","expressions","displayFunction"],data:function(){return{colors:ct,LogMode:H,showButton:!1}},computed:{regexMarkedContent:function(){return new ut.a(this.expressions,ie).replace(this.content)},rawContent:function(){return this.displayFunction===at?this.content:st(this.content,this.displayFunction)}},methods:{copyContent:function(){var e=document.createElement("textarea");document.getElementById("msg-".concat(this.id)).appendChild(e),e.value=this.rawContent,e.select(),e.setSelectionRange(0,99999),document.execCommand("copy"),e.remove()}}},pt=dt,mt=(n("9945"),Object(m["a"])(pt,Ke,Ge,!1,null,"24b8531c",null)),ht=mt.exports;v()(mt,{VBtn:E["a"],VCard:fe["a"],VCardSubtitle:be["b"],VCardText:be["c"],VIcon:Oe["a"]});var vt={name:"SerialChat",props:["logMode","displayMode","messageBufferSize","expressions"],components:{SerialChatMessage:ht},data:function(){return{messages:[],msgIdCount:0,lastScrollPosition:0,lastScrollMessageIndex:0,lastSentMessage:{self:{index:0,id:0,time:0},serial:{index:0,id:0,time:0}},testing:!1}},computed:{activeExpressions:function(){var e=this,t=this.expressions.filter((function(e){return e.active})).map((function(t){return[t.expression,function(n){return'<span style="background-color: '.concat(t.color,'">').concat(st(n,e.displayFunction),"</span>")}]}));return t.push([/[\s\S]/gm,function(t){return st(t,e.displayFunction)}]),t},displayFunction:function(){return this.displayMode===Z.ASCII?at:this.displayMode===Z.HEX?rt:ot},chatBackgroundColor:function(){return this.logMode===H.CHAT?"transparent":"#000000b0"}},watch:{logMode:function(){this.scrollToCurrentMessage(),this.$refs.scroller.forceUpdate(!0)},displayMode:function(){this.$refs.scroller.forceUpdate(!0)}},methods:{addEntry:function(e,t){var n=Date.now()-this.lastSentMessage[t].time,a=this.lastSentMessage[t],r=!1,o=this.$refs.scroller.$refs.scroller.$el,s=o.scrollTop+o.offsetHeight;if(r=o.scrollHeight-s<=50,n<500){var i=this.messageIndexSearch(a.id,a.index);this.messages[i].content+=e,a.time=Date.now()}else{this.messages.push({id:this.msgIdCount++,time:this.getCurrentTime(),content:e,author:t});while(this.messages.length>this.messageBufferSize)this.messages.shift();this.lastSentMessage[t]={id:this.msgIdCount-1,index:this.messages.length-1,time:Date.now()}}r&&setTimeout(this.scrollToBottom.bind(this),100)},scrollToBottom:function(){this.$refs.scroller.scrollToBottom()},getCurrentTime:function(){var e=new Date;return"[".concat(e.toLocaleDateString()," - ").concat(e.toLocaleTimeString(),"]")},scrollToCurrentMessage:function(){this.$refs.scroller.scrollToItem(this.lastScrollMessageIndex)},messageIndexSearch:function(e,t){for(var n=t;n>=0;n--)if(this.messages[n].id===e)return n},scrollerUpdate:function(e,t){this.lastScrollMessageIndex=t}}},ft=vt,bt=(n("060c"),Object(m["a"])(ft,Ue,Ye,!1,null,"a14f28c6",null)),gt=bt.exports;v()(bt,{VCard:fe["a"],VContainer:f["a"]});var xt=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-container",{staticClass:"grey darken-3",staticStyle:{height:"150px"}},[n("v-row",{attrs:{align:"center"}},[n("v-textarea",{staticClass:"pl-2",attrs:{outlined:"","hide-details":"",autocomplete:"off",height:"130px"},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")||t.ctrlKey||t.shiftKey||t.altKey||t.metaKey?null:e.sendMessage(t)}},model:{value:e.message,callback:function(t){e.message=t},expression:"message"}}),n("v-btn",{attrs:{icon:"",color:"primary","x-large":""},on:{click:e.sendMessage}},[n("v-icon",[e._v(" mdi-send ")])],1)],1)],1)},wt=[],St=n("4f25"),Ct=n.n(St),kt={name:"SerialInput",data:function(){return{message:""}},methods:{sendMessage:function(){this.message&&(this.$emit("sendMessage",Ct()(this.message)),this.message="")}}},yt=kt,Et=n("a844"),Ot=Object(m["a"])(yt,xt,wt,!1,null,null,null),Tt=Ot.exports;v()(Ot,{VBtn:E["a"],VContainer:f["a"],VIcon:Oe["a"],VRow:g["a"],VTextarea:Et["a"]});var Vt=function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.content?n("v-snackbar",{attrs:{top:"",color:e.content.color,timeout:e.content.timeout},model:{value:e.isOn,callback:function(t){e.isOn=t},expression:"isOn"}},[e._v(" "+e._s(e.content.content)+" "),e._l(e.content.buttons,(function(t,a){return n("v-btn",{key:a,attrs:{text:""},on:{click:t.callback}},[e._v(" "+e._s(t.text)+" ")])})),n("v-btn",{attrs:{text:""},on:{click:e.close}},[e._v(" Close ")])],2):e._e()},_t=[],Mt={name:"Snackbar",data:function(){return{isOn:!1,content:null,closeTimeout:null}},methods:{setMessage:function(e){var t=this;this.isOn&&this.close(),this.isOn=!0,this.content=e,-1!==e.timeout&&(this.closeTimeout=setTimeout((function(){t.close()}),e.timeout))},close:function(){this.closeTimeout&&(clearTimeout(this.closeTimeout),this.closeTimeout=null),this.isOn=!1,this.content=null}}},Rt=Mt,Dt=n("2db4"),Nt=Object(m["a"])(Rt,Vt,_t,!1,null,null,null),jt=Nt.exports;v()(Nt,{VBtn:E["a"],VSnackbar:Dt["a"]});var Lt=n("d4ec"),$t=n("bee2"),It=n("ade3"),Ft=function(){function e(t){Object(Lt["a"])(this,e),e.checkCompatibility(),this.setDefaultCallbacks(),this.active=!1,this.serialWriter=null,this.serialReader=null,this.serialWriterClosed=null,this.serialReaderClosed=null,this.encoder=null,this.decoder=null,this.serialPort=null,this.options={decodeFrom:"ascii",readLoopCallback:null},this.loadOptions(t)}return Object($t["a"])(e,[{key:"loadOptions",value:function(e){Object.assign(this.options,e)}},{key:"setDecodeFrom",value:function(e){this.options.decodeFrom=e}},{key:"setReadLoopCallback",value:function(e){var t=!1;this.active&&!this.options.readLoopCallback&&(t=!0),this.options.readLoopCallback=e,t&&this.readLoop()}},{key:"requestPort",value:function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(n){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!this.active){t.next=2;break}throw e.Error.AlreadyActive;case 2:return t.next=4,navigator.serial.requestPort(n);case 4:this.serialPort=t.sent;case 5:case"end":return t.stop()}}),t,this)})));function n(e){return t.apply(this,arguments)}return n}()},{key:"openConnection",value:function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(n){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(this.serialPort){t.next=2;break}throw e.Error.NoPortLoaded;case 2:return t.next=4,this.serialPort.open(n);case 4:if(this.serialPort.readable&&this.serialPort.writable){t.next=6;break}throw e.Error.NoStreams;case 6:this.active=!0,this.initializeReader(),this.initializeWriter();case 9:case"end":return t.stop()}}),t,this)})));function n(e){return t.apply(this,arguments)}return n}()},{key:"initializeReader",value:function(){this.decoder=new window.TextDecoderStream(this.options.decodeFrom),this.serialReaderClosed=this.serialPort.readable.pipeTo(this.decoder.writable),this.serialReader=this.decoder.readable.getReader(),this.options.readLoopCallback&&this.readLoop()}},{key:"initializeWriter",value:function(){this.encoder=new window.TextEncoderStream,this.serialWriterClosed=this.encoder.readable.pipeTo(this.serialPort.writable),this.serialWriter=this.encoder.writable.getWriter()}},{key:"write",value:function(e){this.serialWriter.write(e)}},{key:"read",value:function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.serialReader.read();case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"readLoop",value:function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(){var t,n,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,this.serialReader.read();case 3:a=e.sent,t=a.value,n=a.done,e.next=14;break;case 8:if(e.prev=8,e.t0=e["catch"](0),!(e.t0 instanceof DOMException)){e.next=12;break}return e.abrupt("break",19);case 12:this.serialReader.releaseLock(),this.serialReader=this.decoder.readable.getReader();case 14:if(!n){e.next=16;break}return e.abrupt("break",19);case 16:this.options.readLoopCallback(t);case 17:e.next=0;break;case 19:case"end":return e.stop()}}),e,this,[[0,8]])})));function t(){return e.apply(this,arguments)}return t}()},{key:"close",value:function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(){var t,n=arguments;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t=n.length>0&&void 0!==n[0]&&n[0],this.active=!1,!this.serialWriter){e.next=6;break}return this.serialWriter.close(),e.next=6,this.writableStreamClosed;case 6:if(!this.serialReader){e.next=18;break}return e.prev=7,e.next=10,this.serialReader.cancel();case 10:e.next=16;break;case 12:if(e.prev=12,e.t0=e["catch"](7),t&&e.t0 instanceof DOMException){e.next=16;break}throw e.t0;case 16:return e.next=18,this.serialReaderClosed.catch((function(){}));case 18:if(!this.serialPort){e.next=21;break}return e.next=21,this.serialPort.close();case 21:this.serialReader=null,this.serialWriter=null,this.serialReaderClosed=null,this.serialWriterClosed=null,this.serialPort=null,this.encoder=null,this.decoder=null;case 28:case"end":return e.stop()}}),e,this,[[7,12]])})));function t(){return e.apply(this,arguments)}return t}()},{key:"addEventListener",value:function(e,t){navigator.serial.addEventListener(e,t)}},{key:"setDefaultCallbacks",value:function(){this.addEventListener("disconnect",this.close.bind(this,!0))}}],[{key:"checkCompatibility",value:function(){if(!("serial"in navigator))throw e.Error.NoWebSerial;if(!("TextEncoderStream"in window))throw e.Error.NoTextEncoderStream;if(!("TextDecoderStream"in window))throw e.Error.NoTextDecoderStream}}]),e}();Object(It["a"])(Ft,"Errors",Object.freeze({NoWebSerial:new Error("This browser doesn't support or hasn't enabled the WebSerialAPI."),NoTextEncoderStream:new Error("This browser doesn't have the TextEncoderStream class. There's a way to polyfill it: https://developer.mozilla.org/en-US/docs/Web/API/TransformStream#Polyfilling_TextEncoderStream_and_TextDecoderStream"),NoTextDecoderStream:new Error("This browser doesn't have the TextDecoderStream class. There's a way to polyfill it: https://developer.mozilla.org/en-US/docs/Web/API/TransformStream#Polyfilling_TextEncoderStream_and_TextDecoderStream"),NoPortLoaded:new Error("There was not port loaded."),NoStreams:new Error("Invalid serial port streams."),AlreadyActive:new Error("This serial connection is already active.")}));var Pt=Ft,Bt={name:"App",components:{SerialChat:gt,SerialInput:Tt,Snackbar:jt,SerialOptions:A,LogModeOptions:K,DisplayModeOptions:ae,ExpressionList:je,CommandList:Xe},mounted:function(){try{Pt.checkCompatibility()}catch(e){switch(e){case Pt.Error.NoWebSerial:return void this.setSnackbarMessage(me.Error.NoWebSerial);case Pt.Error.NoTextDecoderStream:return void this.setSnackbarMessage(me.Error.NoTextDecoderStream);case Pt.Error.NoTextEncoderStream:return void this.setSnackbarMessage(me.Error.NoTextEncoderStream)}}},data:function(){return{snackbarMessage:null,browserSerial:null,drawer:!0,userOptions:{logMode:H.CHAT,displayMode:Z.ASCII,serialConnection:{active:!1,serialOptions:{baudrate:null,databits:8,stopbits:1,parity:"none",buffersize:255,rtscts:!1,xon:!1,xoff:!1,xany:!1}},expressions:[],commands:[]}}},methods:{sendMessage:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"self";this.$refs.chat.addEntry(e,t),this.browserSerial&&this.browserSerial.write(e),"serial"===t&&this.$refs.commandList.addToScanBuffer(e)},setSnackbarMessage:function(e){this.$refs.snackbar.setMessage(e)},toggleDrawer:function(){this.drawer=!this.drawer},openSerial:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.browserSerial=new Pt({decodeFrom:"ascii",readLoopCallback:function(t){e.sendMessage(t,"serial")}}),e.browserSerial.addEventListener("disconnect",(function(){e.closeSerial(!0),e.setSnackbarMessage(me.Warning.SerialConnectionClosed)})),t.prev=2,t.next=5,e.browserSerial.requestPort();case 5:t.next=11;break;case 7:return t.prev=7,t.t0=t["catch"](2),e.setSnackbarMessage(me.Error.NoPortSelected),t.abrupt("return");case 11:return t.prev=11,t.next=14,e.browserSerial.openConnection(e.userOptions.serialConnection.serialOptions);case 14:t.next=20;break;case 16:return t.prev=16,t.t1=t["catch"](11),e.setSnackbarMessage(me.Error.Custom("Serial port opening error: ".concat(t.t1))),t.abrupt("return");case 20:e.userOptions.serialConnection.active=!0,e.setSnackbarMessage(me.Success.SerialConnectionOpened);case 22:case"end":return t.stop()}}),t,null,[[2,7],[11,16]])})))()},closeSerial:function(){var e=arguments,t=this;return Object(s["a"])(regeneratorRuntime.mark((function n(){var a;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(a=e.length>0&&void 0!==e[0]&&e[0],a){n.next=4;break}return n.next=4,t.browserSerial.close();case 4:t.userOptions.serialConnection.active=!1,t.browserSerial=null,t.setSnackbarMessage(me.Success.SerialConnectionClosed);case 7:case"end":return n.stop()}}),n)})))()},sendCommand:function(e){this.sendMessage(Ct()(e))}}},At=Bt,zt=n("7496"),Wt=n("40dc"),qt=n("5bc1"),Ht=n("f6c4"),Xt=n("f774"),Ut=Object(m["a"])(At,r,o,!1,null,null,null),Yt=Ut.exports;v()(Ut,{VApp:zt["a"],VAppBar:Wt["a"],VAppBarNavIcon:qt["a"],VMain:Ht["a"],VNavigationDrawer:Xt["a"],VSpacer:xe["a"]});var Kt=n("f309");a["a"].use(Kt["a"]);var Gt=new Kt["a"]({theme:{dark:!0}}),Jt=(n("a899"),n("e508")),Qt=n("ae1a"),Zt=n.n(Qt);a["a"].use(Jt["a"]),a["a"].use(Zt.a),a["a"].config.productionTip=!1,new a["a"]({vuetify:Gt,render:function(e){return e(Yt)}}).$mount("#app")},"752c":function(e,t,n){},9945:function(e,t,n){"use strict";var a=n("07e9"),r=n.n(a);r.a},"994c":function(e,t,n){}});
//# sourceMappingURL=app.132753b8.js.map