/**
 * 汇率处理
 */
//Function For ExRate By WL 20100401
var __ExRateData = {};  //ExRate
var __JTExRateData ={};//存放牌价的汇率信息
var __ExRateJsonData = {};//内存中所有汇率信息json格式
var __DBExRateJsonData = {}; // 数据库中存储的汇率信息json格式
var __DBExRateScaleJsonData = {}; // 数据库中存储的汇率浮动允许范围json格式
var __SYS_LOCALCCY = "CNY";
var __EXRATE_CUSTID = "";
var __LAST_EXRATE_CUSTID = "";

var __FEE_CURR_RATE_TYPE_MID = "MID";
var __FEE_CURR_RATE_TYPE_SB = "SB";
var __FEE_CURR_RATE_TYPE_BS = "BS";

var __FEE_CURR_RATE_TYPE_PPSB = "PPSB";
var __FEE_CURR_RATE_TYPE_PPBS = "PPBS";

//param FeeName,FeeDesc,PayCCY,FeeAMT,PayDirection
 function initExRateInfo(custId,exRateAmt){
	 // 注意FeeCommFun.js中initAllFeeInfoAjax方法有同样逻辑代码
 	if( custId == null || custId == "" ) return;
 	if( __LAST_EXRATE_CUSTID == custId ) return;
 	var trans_ref = "",transKey = "";
 	if ($('#TRANS_REF').get(0)) trans_ref = $('#TRANS_REF').val();
 	if ($('#TRANS_KEY').get(0)) transKey = $('#TRANS_KEY').val();

 	$.ajax({
		  url: '/UtanWeb/CommUtilServlet',
		  dataType:'json',
		  type:'POST',
		  data:'OPERTYPE=ExRateData&CUSTID=' + custId + '&TRANS_REF=' + trans_ref+ '&TRANS_KEY=' + transKey,
		  async:false,
		  error:function(){
		  		alert('获取汇率通信错误!');
		  		return ;
		  },
		  success: function(jsonData){
				var favData = jsonData.FAVRATE;
				var jtData = jsonData.JTRATE;
				if( isEmptyObject(favData) || isEmptyObject(jtData) || !favData.rows || !jtData.rows ){
					alert("汇率信息不存在!! 请检查!!");
					return;
				} else {
			       setExRateData(favData); // 每次更改客户都再次读库,是因为库中汇率实时变化吗?  answer by wulei:不是，因为每个客户的优惠情况不一样所以要重新读取
			       setJTExRateData(jtData);
			       __LAST_EXRATE_CUSTID = custId;	
			       setExRateCustid(custId);
			       saveCurrTransExRate(favData,custId);
			    }
				if (jsonData.PPSTATUS && $('#ASKPRICE_NO').get(0)) {
					$('#ASKPRICE_NO').val(jsonData.PPSTATUS);
					setProperty($('#ASKPRICE_NO').get(0),"P");
				}
		  }
	});
 	// 获取汇率浮动范围   
 	$.ajax({
		  url: '/UtanWeb/CommUtilServlet',
		  dataType:'json',
		  type:'POST',
		  data:'OPERTYPE=ExRateScaleData',
		  async:false,
		  error:function(){
		  		alert('获取汇率浮动范围通信错误!');
		  		return ;
		  },
		  success: function(jsonData){
				__DBExRateScaleJsonData = {};
				$.extend(true,__DBExRateScaleJsonData,jsonData);
		  }
	});
 }
 
//Function setExRateData		
function setExRateData(rateData){
	if( rateData.rows == null || rateData.rows == "" ){
		alert("汇率不存在!! 请检查!!");
		return;
	}
	__ExRateJsonData = rateData;
	var rateCount = rateData.rows.length;
	var rowData;
	for(var i = 0;i<rateCount;i++){
		rowData = rateData.rows[i];
		// 格式化成2位小数
		var decLen=2;
		if(rowData.CCY==="JPY"){
			decLen = 4; // 日元要4位
		}
		for(var j in rowData){
			if( !isNaN(rowData[j]) ){ // 这里处理比较粗糙,通过判断是否是数字字符串进行格式化
				rowData[j] = (rowData[j]*1).toFixed(decLen);
			}
		}
		__ExRateData[rowData.CCY] = rowData;
		//checkFavExRate(rowData.CCY);
	}
	// 拷贝汇率信息初始值
   	__DBExRateJsonData = {}; // 置空
   	$.extend(true,__DBExRateJsonData,__ExRateData);
}	
//Function setJTExRateData		
function setJTExRateData(rateData){
	if( rateData.rows == null || rateData.rows == "" ){
		alert("汇率不存在!! 请检查!!");
		return;
	}
//	__ExRateJsonData = rateData;
	var rateCount = rateData.rows.length;
	var rowData;
	for(var i = 0;i<rateCount;i++){
		rowData = rateData.rows[i];
		// 格式化成2位小数
		var decLen=2;
		if(rowData.CCY==="JPY"){
			decLen = 4; // 日元要4位
		}
		for(var j in rowData){
			if( !isNaN(rowData[j]) ){ // 这里处理比较粗糙,通过判断是否是数字字符串进行格式化
				rowData[j] = (rowData[j]*1).toFixed(decLen);
			}
		}
		__JTExRateData[rowData.CCY] = rowData;
		//checkFavExRate(rowData.CCY);
	}
}	

function getExRateByCcy(ccy){
	if( ccy == null || ccy == "" ) return;
	if( __EXRATE_CUSTID == '' ){alert("客户号不存在!!"); return;}
	
	if( __LAST_EXRATE_CUSTID != __EXRATE_CUSTID  ) initExRateInfo(__EXRATE_CUSTID,0);
	ccy = ccy.toUpperCase();
	return __ExRateData[ccy];
}

function getExRateByType(ccy1,ccy2,exType) {
	if( __EXRATE_CUSTID == '' ){alert("客户号不存在!!"); return;}
	if( __LAST_EXRATE_CUSTID != __EXRATE_CUSTID  ) initExRateInfo(__EXRATE_CUSTID,0);
	if(exType=="MID"){
		return getExMidRate(ccy1,ccy2);
	}else if(exType=="BS"){
		return getExBSRate(ccy1,ccy2);
	}else if(exType == "SB" ){
		return getExSBRate(ccy1,ccy2);
	}else if( exType == "PPSB" ){
		return getExPPSBRate(ccy1,ccy2);
	}else if( exType == "PPBS" ){
		return getExPPBSRate(ccy1,ccy2);
	}else if( exType == "CSHBS" ){//zxm现钞
		return getExCSHBSRate(ccy1,ccy2);
	}
	return 1;
}

function getJTExRateByType(ccy1,ccy2,exType) {
	if( __EXRATE_CUSTID == '' ){alert("客户号不存在!!"); return;}
	if( __LAST_EXRATE_CUSTID != __EXRATE_CUSTID  ) initExRateInfo(__EXRATE_CUSTID,0);
	if(exType=="MID"){
		return getJTExMidRate(ccy1,ccy2);
	}else if(exType=="BS"){
		return getJTExBSRate(ccy1,ccy2);
	}else if(exType == "SB" ){
		return getJTExSBRate(ccy1,ccy2);
	}else if( exType == "PPSB" ){
		return getJTExPPSBRate(ccy1,ccy2);
	}else if( exType == "PPBS" ){
		return getJTExPPBSRate(ccy1,ccy2);
	}else if( exType == "CSHBS" ){//zxm现钞
		return getJTExCSHBSRate(ccy1,ccy2);
	}
	return 1;
}

function getExBSRate(ccy1,ccy2){//ccy1---->ccy2
	if(__ExRateData[ccy1] == null) return 1;
	if(__ExRateData[ccy2] == null) return 1;
	if(ccy1 == ccy2) return 1;
	if(ccy1 == __SYS_LOCALCCY) return div(100.0,__ExRateData[ccy2].SELRATE);
	if(ccy2 == __SYS_LOCALCCY) return div(__ExRateData[ccy1].BUYRATE,100.0);
	return div(__ExRateData[ccy1].BUYRATE,__ExRateData[ccy2].SELRATE);
}

function getExSBRate(ccy1,ccy2){//ccy1---->ccy2
	if(__ExRateData[ccy1] == null) return 1;
	if(__ExRateData[ccy2] == null) return 1;
	if(ccy1 == ccy2) return 1;
	if(ccy1 == __SYS_LOCALCCY) return div(100.0,__ExRateData[ccy2].BUYRATE);
	if(ccy2 == __SYS_LOCALCCY) return div(__ExRateData[ccy1].SELRATE,100.0);
	return div(__ExRateData[ccy1].SELRATE,__ExRateData[ccy2].BUYRATE);
}

function getExMidRate(ccy1,ccy2)  {
	var midRate = 1.0;	
	if(__ExRateData[ccy1] == null) return 1;
	if(__ExRateData[ccy2] == null) return 1;
	if(ccy1 == ccy2) return 1;
	if(ccy1 == __SYS_LOCALCCY) return div(100.0,__ExRateData[ccy2].MIDRATE);
	if(ccy2 == __SYS_LOCALCCY) return div(__ExRateData[ccy1].MIDRATE,100.0);
	return div(__ExRateData[ccy1].MIDRATE,__ExRateData[ccy2].MIDRATE);
}


function getExPPSBRate(ccy1,ccy2){
	if(__ExRateData[ccy1] == null) return 1;
	if(__ExRateData[ccy2] == null) return 1;
	if(ccy1 == ccy2) return 1;
	if(ccy1 == __SYS_LOCALCCY) return div(100.0,__ExRateData[ccy2].PPBUYRATE);
	if(ccy2 == __SYS_LOCALCCY) return div(__ExRateData[ccy1].PPSELRATE,100.0);
	return div(__ExRateData[ccy1].PPSELRATE,__ExRateData[ccy2].PPBUYRATE);
}

function getExPPBSRate(ccy1,ccy2){
	if(__ExRateData[ccy1] == null) return 1;
	if(__ExRateData[ccy2] == null) return 1;
	if(ccy1 == ccy2) return 1;
	if(ccy1 == __SYS_LOCALCCY) return div(100.0,__ExRateData[ccy2].PPSELRATE);
	if(ccy2 == __SYS_LOCALCCY) return div(__ExRateData[ccy1].PPBUYRATE,100.0);
	return div(__ExRateData[ccy1].PPBUYRATE,__ExRateData[ccy2].PPSELRATE);
}
function getExCSHBSRate(ccy1,ccy2){//zxm现钞价
	if(__ExRateData[ccy1] == null) return 1;
	if(__ExRateData[ccy2] == null) return 1;
	if(ccy1 == ccy2) return 1;
	if(ccy1 == __SYS_LOCALCCY) return div(100.0,__ExRateData[ccy2].CSHBUYRATE);
	if(ccy2 == __SYS_LOCALCCY) return div(__ExRateData[ccy1].CSHBUYRATE,100.0);
	return div(__ExRateData[ccy1].CSHBUYRATE,__ExRateData[ccy2].CSHBUYRATE);
}


//牌价汇率
function getJTExBSRate(ccy1,ccy2){//ccy1---->ccy2
	if(__JTExRateData[ccy1] == null) return 1;
	if(__JTExRateData[ccy2] == null) return 1;
	if(ccy1 == ccy2) return 1;
	if(ccy1 == __SYS_LOCALCCY) return div(100.0,__JTExRateData[ccy2].SELRATE);
	if(ccy2 == __SYS_LOCALCCY) return div(__JTExRateData[ccy1].BUYRATE,100.0);
	return div(__JTExRateData[ccy1].BUYRATE,__JTExRateData[ccy2].SELRATE);
}

function getJTExSBRate(ccy1,ccy2){//ccy1---->ccy2
	if(__JTExRateData[ccy1] == null) return 1;
	if(__JTExRateData[ccy2] == null) return 1;
	if(ccy1 == ccy2) return 1;
	if(ccy1 == __SYS_LOCALCCY) return div(100.0,__JTExRateData[ccy2].BUYRATE);
	if(ccy2 == __SYS_LOCALCCY) return div(__JTExRateData[ccy1].SELRATE,100.0);
	return div(__JTExRateData[ccy1].SELRATE,__JTExRateData[ccy2].BUYRATE);
}
function getJTExMidRate(ccy1,ccy2)  {
	var midRate = 1.0;	
	if(__JTExRateData[ccy1] == null) return 1;
	if(__JTExRateData[ccy2] == null) return 1;
	if(ccy1 == ccy2) return 1;
	if(ccy1 == __SYS_LOCALCCY) return div(100.0,__JTExRateData[ccy2].MIDRATE);
	if(ccy2 == __SYS_LOCALCCY) return div(__JTExRateData[ccy1].MIDRATE,100.0);
	return div(__JTExRateData[ccy1].MIDRATE,__JTExRateData[ccy2].MIDRATE);
}
function getJTExPPSBRate(ccy1,ccy2){
	if(__JTExRateData[ccy1] == null) return 1;
	if(__JTExRateData[ccy2] == null) return 1;
	if(ccy1 == ccy2) return 1;
	if(ccy1 == __SYS_LOCALCCY) return div(100.0,__JTExRateData[ccy2].PPBUYRATE);
	if(ccy2 == __SYS_LOCALCCY) return div(__JTExRateData[ccy1].PPSELRATE,100.0);
	return div(__JTExRateData[ccy1].PPSELRATE,__JTExRateData[ccy2].PPBUYRATE);
}

function getJTExPPBSRate(ccy1,ccy2){
	if(__JTExRateData[ccy1] == null) return 1;
	if(__JTExRateData[ccy2] == null) return 1;
	if(ccy1 == ccy2) return 1;
	if(ccy1 == __SYS_LOCALCCY) return div(100.0,__JTExRateData[ccy2].PPSELRATE);
	if(ccy2 == __SYS_LOCALCCY) return div(__JTExRateData[ccy1].PPBUYRATE,100.0);
	return div(__JTExRateData[ccy1].PPBUYRATE,__JTExRateData[ccy2].PPSELRATE);
}
function getJTExCSHBSRate(ccy1,ccy2){//zxm现钞价
	if(__JTExRateData[ccy1] == null) return 1;
	if(__JTExRateData[ccy2] == null) return 1;
	if(ccy1 == ccy2) return 1;
	if(ccy1 == __SYS_LOCALCCY) return div(100.0,__JTExRateData[ccy2].CSHBUYRATE);
	if(ccy2 == __SYS_LOCALCCY) return div(__JTExRateData[ccy1].CSHBUYRATE,100.0);
	return div(__JTExRateData[ccy1].CSHBUYRATE,__JTExRateData[ccy2].CSHBUYRATE);
}
//牌价汇率



function setExRateCustid(custid){
	if( custid == null || custid == '' ) return;
	__EXRATE_CUSTID = custid;
}

function getCCYRateByType(Ccy,RateType){
	if( __EXRATE_CUSTID == '' ){alert("客户号不存在!!"); return;}
	if( __LAST_EXRATE_CUSTID != __EXRATE_CUSTID  ) initExRateInfo(__EXRATE_CUSTID,0);
	if( Ccy==null || Ccy.length <=0) return 1;
	var rateType = RateType.toUpperCase();
	var Ccy = Ccy.toUpperCase();
	
	switch( rateType ){
		case "B":
			return __ExRateData[Ccy].BUYRATE;
		case "S":
			return __ExRateData[Ccy].SELRATE;
		case "E":
			return __ExRateData[Ccy].EQUSDRATE;
		case "C":
			return __ExRateData[Ccy].CSHBUYRATE;	
		case "M":
			return __ExRateData[Ccy].MIDRATE;
		case "PB":
			return __ExRateData[Ccy].PPBUYRATE;
		case "PS":
			return __ExRateData[Ccy].PPSELRATE;
	}
}

function saveCurrTransExRate(exRateData,custId){
	if( exRateData.rows == null || exRateData.rows == "" ) return;
	if( $('#EXRATEINFO').get(0) == null ) return;
	var jsonString = "",rowData,leg = exRateData.rows.length;
	var isFavo = "",redBegin = "",redEnd = "";
	for( var i=0;i<leg;i++){
		rowData = exRateData.rows[i];
		isFavo = rowData.FAVORABLE;
		redBegin = "";
		redEnd = "";
		if( isFavo == 'Y' ){
			redBegin = "<div style='color: red'; >";
			redEnd = "</div>";
		}
		jsonString = jsonString + "{\"CCY\":\"" + rowData.CCY + "\","+
												"\"BUYRATE\":\""  + rowData.BUYRATE  + "\","+
												"\"SELRATE\":\""  +rowData.SELRATE + "\","+
												"\"MIDRATE\":\""  +rowData.MIDRATE + "\","+
												"\"PPBUYRATE\":\""  +rowData.PPBUYRATE + "\","+
												"\"PPSELRATE\":\""  +rowData.PPSELRATE + "\","+
												"\"CSHBUYRATE\":\""  +rowData.CSHBUYRATE + "\","+
												"\"CSHSELRATE\":\""  +rowData.CSHSELRATE + "\","+
												"\"EQUSDRATE\":\""  +rowData.EQUSDRATE + "\","+
												"\"FAVORABLE\":\"" +rowData.FAVORABLE + "\"}";
		if( i != leg - 1 ){
			jsonString = jsonString + ",";
		}
	}
	jsonString = "{\"total\":"+leg+",\"rows\":["+ jsonString + "]}";
	$('#CURR_TRANS_EXRATE_JSON').val(jsonString);
	$('#CURR_TRANS_EXRATE_CUST').val(custId);
}

function saveCurrTransExRateE(transExrateE,ccyArrayE,custId){
	if( ccyArrayE.length == null ) return;
	if( $('#EXRATEINFO').get(0) == null ) return;
	var jsonString = "",rowData,leg = ccyArrayE.length;
	var isFavo = "",redBegin = "",redEnd = "";
	for( var i=0;i<leg;i++){
		rowData = transExrateE[ccyArrayE[i]];
		isFavo = rowData.FAVORABLE;
		redBegin = "";
		redEnd = "";
		if( isFavo == 'Y' ){
			redBegin = "<div style=color: red; >";
			redEnd = "</div>";
		}
		jsonString = jsonString + "{\"CCY\":\"" + rowData.CCY + "\","+
												"\"BUYRATE\":\""  + rowData.BUYRATE  + "\","+
												"\"SELRATE\":\""  +rowData.SELRATE + "\","+
												"\"MIDRATE\":\""  +rowData.MIDRATE + "\","+
												"\"PPBUYRATE\":\""  +rowData.PPBUYRATE + "\","+
												"\"PPSELRATE\":\""  +rowData.PPSELRATE + "\","+
												"\"CSHBUYRATE\":\""  +rowData.CSHBUYRATE + "\","+
												"\"CSHSELRATE\":\""  +rowData.CSHSELRATE + "\","+
												"\"EQUSDRATE\":\""  +rowData.EQUSDRATE + "\","+
												"\"FAVORABLE\":\""  +rowData.FAVORABLE + "\"}";
		if( i != leg - 1 ){
			jsonString = jsonString + ",";
		}
	}
	jsonString = "{\"total\":"+leg+",\"rows\":["+ jsonString + "]}";

	$('#CURR_TRANS_EXRATE_JSON').val(jsonString);
	$('#CURR_TRANS_EXRATE_CUST').val(custId);
}

function checkFavExRate(ccy){
	if( ccy == null || ccy == "" ) return true;
	if( __ExRateData[ccy] == null ) return true;
	
	var buyRate = Number(__ExRateData[ccy].BUYRATE);
	var selRate = Number(__ExRateData[ccy].SELRATE);
	var midRate = Number(__ExRateData[ccy].MIDRATE);
	
	if( buyRate > midRate ){
		var isSure=confirm("币别["+ccy+"]的买入价["+buyRate+"]高于中间价["+midRate+"],确认继续提交吗?");
		if( !isSure ) return false;
	}
	if( selRate < midRate ){
		var isSure=confirm("币别["+ccy+"]的卖出价["+selRate+"]低于中间价["+midRate+"],确认继续提交吗?");
		if( !isSure ) return false;
	}
	
	return true;
}

function checkAllFavExRate(){
	if( __LAST_EXRATE_CUSTID != __EXRATE_CUSTID  ) return true;
	if( !UtanGlobalCache("ccy").get().ccyString) return true;
	var ccyArray = UtanGlobalCache("ccy").get().ccyString.split(';');
	var ccy = "";
	for(var i=0;i<ccyArray.length;i++){
		ccy = ccyArray[i].substring(0,3);
		if( __ExRateData[ccy] == null ) return true;
		var buyRate = Number(__ExRateData[ccy].BUYRATE);
		var selRate = Number(__ExRateData[ccy].SELRATE);
		var midRate = Number(__ExRateData[ccy].MIDRATE);
		
		if( buyRate > midRate ){
			var isSure=confirm("币别["+ccy+"]的买入价["+buyRate+"]高于中间价["+midRate+"],确认继续提交吗?");
			if( !isSure ) return false;
		}
		if( selRate < midRate ){
			var isSure=confirm("币别["+ccy+"]的卖出价["+selRate+"]低于中间价["+midRate+"],确认继续提交吗?");
			if( !isSure ) return false;
		}
	}
	return true;
}

function checkFavRate(){
	var custCrAccArray = new Array();
	var custDrAccArray = new Array();
	var custChkAccArray = new Array();
	var flag = true;
	
	//FOR CUSTACC
	if( $('#CUST_ACC_CCY1').get(0) != null && $('#CUST_ACC_CCY1').val() != '' && $('#CUST_ACC_CCY2').get(0) != null && $('#CUST_ACC_CCY2').val() != ''  ){
		var ccy1 = $('#CUST_ACC_CCY1').val();
		var ccy2 = $('#CUST_ACC_CCY2').val();
		if( ccy1 != ccy2 ){ 
			if( !checkFavExRate(ccy1) ) flag = false;
			if( !checkFavExRate(ccy2) ) flag = false;
		}
	}
	
	//FOR CUST HC
	if( $('#HC_CUST_ACC_CCY0').get(0) != null && $('#HC_CUST_ACC_CCY0').val() != '' && $('#HC_CUST_ACC_CCY').get(0) != null && $('#HC_CUST_ACC_CCY').val() != ''  ){
		var ccy1 = $('#HC_CUST_ACC_CCY0').val();
		var ccy2 = $('#HC_CUST_ACC_CCY').val();
		if( ccy1 != ccy2 ){ 
			if( !checkFavExRate(ccy1) ) flag = false;
			if( !checkFavExRate(ccy2) ) flag = false;
		}
	}
	
	//FOR CR CUSTACC
	if( $('#CRCUSTACC_GRID').get(0) != null ){
		var allRows = jQuery("#CRCUSTACC_GRID").jqGrid('getDataIDs');
		var rowData;
		$.each( allRows, function(i, n){	
			rowData = jQuery('#CRCUSTACC_GRID').jqGrid('getRowData',n);
			var ccy = rowData.CR_ACCOUNT_CCY;
			var amt = FormatStr2Amt(rowData.CR_SOURCE_AMT);
			if ( amt > 0 ){
				if( !checkFavExRate(ccy) ){ custCrAccArray.push(ccy); flag = false; }
			}
		});
	}
	
	//FOR DR CUSTACC
	if( $('#DRCUSTACC_GRID').get(0) != null ){
		var allRows = jQuery("#DRCUSTACC_GRID").jqGrid('getDataIDs');
		var rowData;
		$.each( allRows, function(i, n){	
			rowData = jQuery('#DRCUSTACC_GRID').jqGrid('getRowData',n);
			var ccy = rowData.DR_ACCOUNT_CCY;
			var amt = FormatStr2Amt(rowData.DR_SOURCE_AMT);
			if ( amt > 0 && jQuery.inArray(ccy,custCrAccArray)  == -1){
				if( !checkFavExRate(ccy) ){ custDrAccArray.push(ccy); flag = false; }
			}
		});
	}
	
	//FOR OUTCHECK
	if( $('#OUT_CHK_DETAIL_GRID').get(0) != null ){
		var allRows = jQuery("#OUT_CHK_DETAIL_GRID").jqGrid('getDataIDs');
		var rowData;
		$.each( allRows, function(i, n){	
			rowData = jQuery('#OUT_CHK_DETAIL_GRID').jqGrid('getRowData',n);
			var ccy = rowData.OUT_CR_ACCOUNT_CCY;
			var amt = FormatStr2Amt(rowData.OUT_CR_SOURCE_AMT);
			if ( amt > 0 && jQuery.inArray(ccy,custCrAccArray)  == -1 && jQuery.inArray(ccy,custDrAccArray)  == -1){
				if( !checkFavExRate(ccy) ){ custChkAccArray.push(ccy); flag = false; }
			}
		});
	}
	
	return flag;
}

function setExrateModfiyFlag(flag,msg){
	$('#EXRATE_ISAUTH_FLAG').val(flag);
	$('#EXRATE_ISAUTH_NOTE').val(msg);
}

/**
 * 手动更改交易中的汇率，实际交易中 以修改后的为准
 * @param {String} custidField	客户号字段    必输
 * @param {String} ccyField		币别字段		 必输
 * @param {String} exrateField	汇率字段		 必输
 * @param {String} exrateType	汇率类型		 必输		
 * 			可选值:	BUYRATE		买入价,
 * 						SELRATE		卖出价,
 * 						MIDRATE		中间价,
 * 						PPBUYRATE	平盘买入价,
 * 						PPSELRATE	平盘卖出价,
 */
function changeTransExrates(custidField,ccyField,exrateField,exrateType){
	if( !__ExRateData || isEmptyObject(__ExRateData) ){
		initFixpendingExrate(custidField);
	}
	if( !custidField || !ccyField || !exrateField || !exrateType ) return;
	if( !$("#"+custidField).get(0) || !$("#"+ccyField).get(0) || !$("#"+exrateField).get(0) ) return;
	
	var custid = $("#"+custidField).val();
	var ccy = $("#"+ccyField).val();
	var exrate = getFieldValue($("#"+exrateField)[0]);

	if( !custid || !ccy || !exrate ) return;
	
	exrateType = exrateType.toUpperCase();
	if(exrateField){
		var oldExrate = __DBExRateJsonData[ccy][exrateType];
		var scale = parseFloat(__DBExRateScaleJsonData[ccy]); // 天津银行特有 其他银行请写var scale=0(不校验),若想测试效果,写var scale=0.04
		if(scale){ // scale为以下值都不会执行 : NaN,0
			if( Math.abs(exrate-oldExrate)/oldExrate >= scale ){ 
				alert("汇率变动已超出指定范围"+(scale*100)+"%("+ccy+");\n若想继续执行变动,请联系总行更改汇率浮动范围!\n然后刷新页面重试");
				$("#"+exrateField).val(oldExrate);
				return;
			}
		}
	}
	
	// eval("__ExRateData[ccy]."+exrateType+" = exrate;");
	__ExRateData[ccy][exrateType] = exrate;
	saveCurrTransExRate( __ExRateJsonData,custid );
}

function initFixpendingExrate(custidField){
	if( $("#"+custidField).get(0) && $("#"+custidField).val() ){
		var custid = $("#"+custidField).val();
		setExRateCustid( custid );
		initExRateInfo( custid,0 );
	}
}
//  modify by liaorizhi 20120806 start 
function updateSysExrateByASK(rowDataArr) {
	var obj;
	for(var key in rowDataArr){
		obj = rowDataArr[key];
		var trasType = obj.TRANS_TYPE;
		var selRate = obj.SELRATE;
		var buyRate = obj.BUYRATE;
		var selPPRate = obj.PPSELRATE;
		var buyPPRate = obj.PPBUYRATE;

		if(trasType == "TH"){
			__ExRateData[obj.SEL_CCY]["SELRATE"] = selRate;
			__ExRateData[obj.SEL_CCY]["PPBUYRATE"] = buyPPRate;
			__ExRateData[obj.BUY_CCY]["BUYRATE"] = buyRate;
			__ExRateData[obj.BUY_CCY]["PPSELRATE"] = selPPRate;
		}else if(trasType == "SH"){
			__ExRateData[obj.SEL_CCY]["SELRATE"] = selRate;
			__ExRateData[obj.SEL_CCY]["PPBUYRATE"] = buyPPRate;
		}else if(trasType == "JH"){
			__ExRateData[obj.BUY_CCY]["BUYRATE"] = buyRate;
			__ExRateData[obj.BUY_CCY]["PPSELRATE"] = selPPRate;
		}
	}	
}
//  modify by liaorizhi 20120806 end 

/**
 * 设置临时汇率,重庆要求可以改动
 * @param {Object} ccy
 * @param {Object} bsFlag
 */
function setTmpRate(ccy, rate, bsFlag){
	if(!ccy || !rate || !bsFlag) return;
	var decLen=2;
	if(ccy==="JPY"){
		decLen = 4; // 日元要4位
	}
	if( !isNaN(rate) ){
		rate = (rate*1).toFixed(decLen);
		if(bsFlag=="B"){
			__ExRateData[ccy].BUYRATE = rate;
		}else if(bsFlag=="S"){
			__ExRateData[ccy].SELRATE = rate;
		}
	}
}