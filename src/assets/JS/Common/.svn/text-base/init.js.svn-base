/**
 * 用户配置处理
 */
var INIT = {
	"autoPopupWindow":{
		"setting":"SHORTCUT",				// valid:"YES","NO","SHORTCUT"
		"shortcut":"Ctrl+L"
	},
	"holidays":{
		"delayMethod":"deleteLastHoliday"
	},
	"tab_queue":{
		"tab_taskGrid":true,
		"tab_swiftGrid":true,
		"tab_tempSaveGrid":true,
		"tab_fixpendingGrid":true,
		"tab_fastInquire":true,
		"tab_hintMsg":true,
		"tab_printList":true,
		"tab_joinList":true,
		"tab_warnList":true,
		"tab_blackList":true,
		"tab_bopList":true
	},
	"SHOW_BAL_SUBPAGE":false,
	"lookupAutoInsertSingleResult":false,
	"autoSwitchNoteTab":true,
	/**
	 * 提供参数用来配置是否启用汇率修改功能
	 * add by wulei at 2012-06-17
	 * @param value lists:true 启用/fasle 停用
	 */
	"EXRATE_MODIFY_FLAG":false
};


/**
 *  队列配置 
 */
var queueObj = {
	nameLists:["taskGrid", "swiftGrid", "tempSaveGrid", "fastInquire", "hintMsg", "print", "join", "warn", "black"], 
	taskGrid:{
		"isQueue":true,
		"desc":"交易队列",
		"countId":"FLOWLIST",
		"countFontColor":"#E1584B",
		"logo":"task_logo.png"
	},
	swiftGrid:{
		"isQueue":true,
		"desc":"报文队列",
		"countId":"SWIFTLIST/SWIFTFLOWLIST",
		"countFontColor":"#F1582C",
		"logo":"swift_logo.png"
	},
	tempSaveGrid:{
		"isQueue":true,
		"desc":"暂存队列",
		"countId":"TEMPLIST",
		"countFontColor":"#F3737F",
		"logo":"tempsave_logo.png"
	},
	fastInquire:{
		"isQueue":true,
		"desc":"交易查询",
		"countId":"quickInqList",
		"countFontColor":"#51C3C6",
		"logo":"fastinquire_logo.png"
	},
	hintMsg:{
		"isQueue":true,
		"desc":"交易提示",
		"countId":"HINTLIST",
		"countFontColor":"#E1584B",
		"logo":"hintmsg_logo.png"
	},
	print:{
		"isQueue":true,
		"desc":"打印队列",
		"countId":"",
		"countFontColor":"#F29D9E",
		"logo":"print_logo.png"
	},
	join:{
		"isQueue":true,
		"desc":"参与交易队列",
		"countId":"",
		"countFontColor":"#EFC85E",
		"logo":"join_logo.png"
	},
	warn:{
		"isQueue":true,
		"desc":"预警队列",
		"countId":"WARNLIST",
		"countFontColor":"#E60111",
		"logo":"warn_logo.png"
	},
	black:{
		"isQueue":true,
		"desc":"黑名单授权队列",
		"countId":"BLACKLIST",
		"countFontColor":"#4C4C4C",
		"logo":"black_logo.png"
	},
//	bop:{
//		"isQueue":true,
//		"desc":"申报待补录队列",
//		"countId":"BOPLIST",
//		"countFontColor":"#EC6941",
//		"logo":"bop_logo.png"
//	}
}

var KEYCODE = {
	A:65,
	B:66,
	C:67,
	D:68,
	E:69,
	F:70,
	G:71,
	H:72,
	I:73,
	J:74,
	K:75,
	L:76,
	M:77,
	N:78,
	O:79,
	P:80,
	Q:81,
	R:82,
	S:83,
	T:84,
	U:85,
	V:86,
	W:87,
	X:88,
	Y:89,
	Z:90
};
var REGEXPS = {
	YYYY 	 : /^(\d{4})$/ ,
	"YYYY-m" : /^(\d{4}\-)([2-9]{1})$/	,	// use "" because "-" is not valid
	"YYYY-mm" : /^(\d{4}\-)([0-1]{1}\d{1})$/
};

//[Bugfree_2268_提示显示title]_B wulei 2014-02-10
var ERRORMSG = {
	tooLong: "长度应该 <= ",  // 长度应该 <=
	tooShort:"长度应该 >= ",  // 长度应该 >= 
	tooHigh: "行数应该 <= "   // 行数应该 <=
};

var CHAR_RULES = {
	// 数字字符
	"n":"0-9",
	// x字符
	"x":"0-9a-zA-Z\\/\\-\\?:\\(\\)\\ \\.,'\\+\\r\\n",
	// 小写字母
	"a":"a-z",
	//大写字母
	"A":"A-Z",
	// 大写字母,小写字母和数字
	"c":"0-9a-zA-Z",
	// 非打印字符集合,等同于"\f\n\r\t\v"(\f换页符Tab;\n换行符;\r回车符;\t制表符;\v垂直制表符)
	"$s":"\s",
	//中文字符   
	"CN":"\u4E00-\u9FA5",
	//中文字符   中文标点符号   #,%,+,-,/,=,@,|,¨,·,×,ˇ,ˉ,—,‖,‘,’,“,”,…,∶,、,。,〃,々,〈,〉,《,》,「,」,『,』,【,】,〔,〕,〖,〗,！,＂,＇,（,）,，,．,：,；,？,［,］,｀,｛,｜,｝,～,￥
	"CN.":"\u4E00-\u9FA5"+"\u0023,\u0025,\u002b,\u002d,\u002f,\u003d,\u0040,\u007c,\u00a8,\u00b7,\u00d7,\u02c7,\u02c9,\u2014,\u2016,\u2018,\u2019,\u201c,\u201d,\u2026,\u2236,\u3001,\u3002,\u3003,\u3005,\u3008,\u3009,\u300a,\u300b,\u300c,\u300d,\u300e,\u300f,\u3010,\u3011,\u3014,\u3015,\u3016,\u3017,\uff01,\uff02,\uff07,\uff08,\uff09,\uff0c,\uff0e,\uff1a,\uff1b,\uff1f,\uff3b,\uff3d,\uff40,\uff5b,\uff5c,\uff5d,\uff5e,\uffe5"
};

//待扩展
var REGEX_RULES = {
	"number" : "[1-9]\\d*|[1-9]\\d*\.\\d*|0\.\\d*[1-9]\\d*" ,      //整数+小数，不含0
	"rate"      : "(0|0\\.\\d*|1|1\\.0*)" ,                                   //利率必须大于等于0且小于等于1
	"Integer" : "\\d*" ,																//整数
	"0.01-1.00" :	"1\.00|0\.(0[1-9]|[1-9][0-9])"					//0.01-1.00之间(包括0.01和1.00)
};

jQuery.prototype.baseClass = function(newBase){
	var baseClassArr = ["CHAR","AMT","DATE","RATE"];
	var oldBase = "";
	
	for( var i = baseClassArr.length ; i>=0; i-- ){
		if( this.hasClass( baseClassArr[i] ) ){
			oldClass =  baseClassArr[i];
		}
	}
	
	if(arguments.length === 0){
		return oldBase;
	} else {
		this.removeClass(oldBase).addClass(newBase);
		return this;
	}

}

/**
 * 重写toFixed方法，以修正因不同浏览器带来的bug
 * 例如：0.009.toFixed(2) 在IE下回得到 0.00
 * @param {int} len
 * @return {String } returnStr
 */
Number.prototype.toFixed=function(len){
	var temNum = 0.5;
	var num = this;
	var returnStr;
	var flag = false;
	if (num < 0) {
		num = Math.abs(num);
		flag = true;
	}
	//Fixed by wulei at 2013-05-20  更改计算方式 解决1.005四舍五入的问题
	num = div(utanParseInt(accMul(num,Math.pow( 10, len )) + temNum),Math.pow( 10, len ));
	
	if (flag) {
		num = 0 - num;
	}
	returnStr = num + "";
	var decIndex = returnStr.indexOf(".");
	var decLen = len;
	if( decIndex > 0 ){
		decLen = len - (returnStr.substring(decIndex+1)).length;
	}else{
		if (len > 0) returnStr += ".";
	}
	for( var i = 0;i < decLen;i++ ){
		returnStr += "0";
	}

	return returnStr;
}

/**
*@function
*/
function div(num1,num2){
	var d1=0,d2=0,dou1,dou2;
	
	try{d1=num1.toString().split(".")[1].length}catch(e){}
	try{d2=num2.toString().split(".")[1].length}catch(e){}
	
	dou1=Number(num1.toString().replace(".",""));
	dou2=Number(num2.toString().replace(".",""));
	return (dou1/dou2)*Math.pow(10,d2-d1)
}

Number.prototype.div=function(num){
	return div(this,num);
}

/**
*@function
*/
function accMul(num1,num2){
	var len=0,str1=num1.toString(),str2=num2.toString();
	try{len+=str1.split(".")[1].length}catch(e){}
	try{len+=str2.split(".")[1].length}catch(e){}
	return Number(str1.replace(".",""))*Number(str2.replace(".",""))/Math.pow(10,len);
}

Number.prototype.accMul=function(num){
	return accMul(this,num);
}

/**
*@function
*/
function add(num1,num2){
	var n1,n2,p;
	try{n1=num1.toString().split(".")[1].length}catch(e){n1=0}
	try{n2=num2.toString().split(".")[1].length}catch(e){n2=0}
	p=Math.pow(10,Math.max(n1,n2));
	return (num1*p+num2*p)/p;
}

Number.prototype.add=function(num){
	return add(this,num);
}


function minus(num1,num2){
	var n1,n2,p1,p2;
	try{n1=num1.toString().split(".")[1].length}catch(e){n1=0}
	try{n2=num2.toString().split(".")[1].length}catch(e){n2=0}
	p1=Math.pow(10,Math.max(n1,n2));
	p2=(n1>=n2)?n1:n2;
	return ((num1*p1-num2*p1)/p1).toFixed(p2);
}

Number.prototype.minus=function(num){
	return minus(this,num);
}

// 判断是否空对象
function isEmptyObject(obj){
	for(var key in obj){
		return false;
	}
	return true;
}

// 缓存
// UtanGlobalCache 全局缓存
// UtanCache 普通缓存(当前页面缓存)
// 注意,既然是缓存,那么只允许set一次,之后的set均不生效
// 注意,不能返回undefined,undefined是缓存机制的保留字
// 目前全局缓存有:userConfig,ccy,holiday,allUser
(function(){
	var UtanCache,
		UC,
		cacheVariables = {};
	var AGlobalVar = function(name, params){
		var thisName = name,
			thisParams = params,
			realObj = undefined;
		this.get = function(){
			if(realObj === undefined){
				this.fresh();
			}
			return realObj;
		};
		this.set = function(){
			return this;
		};
		this.setParams = function(params){
			$.extend(thisParams, params);
			return this;
		};
		this.fresh = function(){
			realObj = undefined;
			realObj = params.fresh.apply(thisParams, arguments);
			return this;
		};
		this.destroy = function(){
			cacheVariables[thisName] = undefined;
		};
		return this;
	};
	UtanCache = function(varibleName){
		return cacheVariables[varibleName] || undefined;
	};
	UtanCache.get = UtanCache;
	UtanCache.set = function(name, params, callBack){
		if(cacheVariables[name]){ // 确保只能set一次
			return;
		};
		var thisOne = cacheVariables[name] = new AGlobalVar(name, params);
		return thisOne;
	};
	window.UtanCache = window.UC = UtanCache;
	window.UtanGlobalCache =  window.top.UtanCache; 
	if(window.opener && window.opener.document) { // 后者判断是因为chrome下.opener始终存在
		window.UtanGlobalCache = window.opener.top.UtanCache; // 如果是window.open的窗体,优先取其父窗体
	}
	window.UGC = window.UtanGlobalCache;
})();
