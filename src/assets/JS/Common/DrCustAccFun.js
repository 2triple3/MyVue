/**
 * 入客户帐处理
 */
var tempAmtFld = new Array(new Array(),new Array());//2 * N
var DR_IS_CREATE_BAR_FLAG = false;
var scrWidth = (document.body.clientWidth) - 35;
var currRowIdDR = -1;
var currRowData = null;
var currRowIdDR0 = -1;
var currRowData0 = null;

var QUREYACCOUNTNAME = "QureyAccount_CUST";

var _show_three_rows_flag = true;

var paramObj_DrCustAccFun = {
	defaultDrRow : "1" // 默认扣账栏 "1" 原币; "2" 售汇; "3" 套汇
}

function setParam_DrCustAccFun(key, value){
	paramObj_DrCustAccFun[key] = value;
}

function initDrCustAcc(){
	var drCustid = $('#DR_CUST_ACC_CUSTID').val();
	if( drCustid == '' ) return;
	setExRateCustid(drCustid);
	
	var feeCcy0 = $('#FEE_DR_TOTAL_CCY').val();
	if( feeCcy0 != null && feeCcy0 != '' ){
		var amt = getFieldValue( $('#FEE_DR_TOTAL_AMT').get(0) );
		$('#FEE_DR_TOTAL_BUYRATE').val( getCCYRateByType(feeCcy0,'B') );
		$('#FEE_DR_TOTAL_SELRATE').val( getCCYRateByType(feeCcy0,'S') );
		$('#FEE_DR_TOTAL_PP_BUYRATE').val( getCCYRateByType(feeCcy0,'PB') );
		$('#FEE_DR_TOTAL_PP_SELRATE').val( getCCYRateByType(feeCcy0,'PS') );
		$('#FEE_DR_TOTAL_CNY').val( amt * getExRateByType(feeCcy0,__SYS_LOCALCCY,__FEE_CURR_RATE_TYPE_SB) );
		$('#FEE_DR_TOTAL_PP_CNY').val( amt * getExRateByType(feeCcy0,__SYS_LOCALCCY,__FEE_CURR_RATE_TYPE_PPSB) );
	}
	
	initDrAccGrid();
	initDrFeeGrid();
	
		//将蓝色背景去掉
	$("#DRCUSTACC_GRID").find("td").eq(1).removeClass(); 
	$("#DRCUSTACC_GRID").find("td").eq(5).removeClass(); 
	$("#DRCUSTACC_GRID").find("td").eq(6).removeClass(); 
	$("#DRCUSTACC_GRID").find("td").eq(13).removeClass(); 

	return true;
}

function initDrAccGrid(){
	var amt = getFieldValue( $('#DR_CUST_ACC_AMT').get(0) );
	amt= FormatStr2Amt(amt);
	var ccy = $('#DR_CUST_ACC_CCY').val();
	//if( amt == 0 || ccy == ""  ) return;
	
	var accNo = $('#DR_CUST_ACCNO').val();
	var initAmt = FormatAmtByCCY(amt,ccy);
    if( accNo == null ) accNo = '';
    createDrGrid('jsonstring','',true,true);
    initDrGrid("DRCUSTACC_GRID",accNo,initAmt,ccy);
}

function initDrGrid(GridName,accNo,initAmt,initCcy){
	var custid = $('#DR_CUST_ACC_CUSTID').val();
	if( custid == null || custid == "" ) return;
	var xbzMark=getFieldValue("XBZ_MARK");
	var remitType=getFieldValue("REMIT_TYPE");
	var acckAttr="K"
	if(remitType=="D"||remitType=="F"||remitType=="BH"){
		acckAttr="N"
	}
	var firstDrRow = {
							DR_ACCOUNT_CCY:initCcy,
							DR_BUY_RATE:getCCYRateByType(initCcy,'B'),
							DR_SELL_RATE:getCCYRateByType(initCcy,'S'),
							DR_SOURCE_CCY:initCcy,
							DR_SOURCE_AMT:initAmt,
							DR_ACCOUNT_AMT:initAmt,
							DR_ACCOUNT_NO:accNo,
							DR_PP_BUY_RATE:getCCYRateByType(initCcy,'PB'),
							DR_PP_SEL_RATE:getCCYRateByType(initCcy,'PS'),
							ACC_CNY:initAmt * getExRateByType(initCcy,__SYS_LOCALCCY,__FEE_CURR_RATE_TYPE_SB),
							ACC_PP_CNY:initAmt * getExRateByType(initCcy,__SYS_LOCALCCY,__FEE_CURR_RATE_TYPE_PPSB),
							DR_DESC:'原币扣账',
							ACC_ATTR:acckAttr,
							SEQ_NO:'',
							PROD_TYPE:''
							
						};
	if(xbzMark=="" || xbzMark==null || xbzMark=="NO"){
	var secondDrRow = {
							DR_ACCOUNT_CCY:__SYS_LOCALCCY,
							DR_BUY_RATE:getCCYRateByType(__SYS_LOCALCCY,'B'),
							DR_SELL_RATE:getCCYRateByType(initCcy,'S'),
							DR_SOURCE_CCY:initCcy,
							DR_SOURCE_AMT:'0.00',
							DR_ACCOUNT_AMT:'0.00',
							DR_ACCOUNT_NO:'',
							// modify by liaorizhi 20120911 平盘价显示错误 start
							DR_PP_BUY_RATE:getCCYRateByType(initCcy,'PB'),
							DR_PP_SEL_RATE:getCCYRateByType(__SYS_LOCALCCY,'PS'),
							// modify by liaorizhi 20120911 平盘价显示错误 end
							ACC_CNY:0,
							ACC_PP_CNY:0,
							DR_DESC:'售汇扣账',
							ACC_ATTR:acckAttr,
							SEQ_NO:'',
							PROD_TYPE:''
						};
	var thirdDrRow = {
							DR_ACCOUNT_CCY:'USD',
							DR_BUY_RATE:getCCYRateByType('USD','B'),
							DR_SELL_RATE:getCCYRateByType(initCcy,'S'),
							DR_SOURCE_CCY:initCcy,
							DR_SOURCE_AMT:'0.00',
							DR_ACCOUNT_AMT:'0.00',
							DR_ACCOUNT_NO:'',
							DR_PP_BUY_RATE:getCCYRateByType(initCcy,'PB'),
							DR_PP_SEL_RATE:getCCYRateByType('USD','PS'),
							ACC_CNY:0,
							ACC_PP_CNY:0,
							DR_DESC:'套汇扣账',
							ACC_ATTR:acckAttr,
							SEQ_NO:'',
							PROD_TYPE:''
						};
	}

	jQuery("#"+GridName).jqGrid('addRowData',1,firstDrRow,'last');
	if (_show_three_rows_flag && (xbzMark=="" || xbzMark==null || xbzMark=="NO")) {
		jQuery("#"+GridName).jqGrid('addRowData',2,secondDrRow,'last');
		jQuery("#"+GridName).jqGrid('addRowData',3,thirdDrRow,'last');
	}
	// [Bugfree_2052_【鞍山】先不收取手续费，输入完毕后收取手续费。扣账页面和申报页面信息有误]_B fanr 2013-12-3
	//setFieldValue("DR_CUST_ACC_JSHDM", ""); 
	//setProperty("DR_CUST_ACC_JSHDM", "O");
	// [Bugfree_2052_【鞍山】先不收取手续费，输入完毕后收取手续费。扣账页面和申报页面信息有误]_E fanr 2013-12-3
	
	// 默认出第几栏账务
	// "1" 第一栏 原币扣账
	// "2" 第二栏 售汇扣账
	// "3" 第三栏 套汇扣账
	
	var defDrRow = paramObj_DrCustAccFun.defaultDrRow;
	if(!defDrRow || defDrRow=="1" || defDrRow=="3"){
		return;
	}else if(defDrRow=="2"){ // 售汇
		var _data = {
			DR_SOURCE_AMT : initAmt
		}
		jQuery("#"+GridName).jqGrid('setRowData', "2", _data);
		// 与DR_SOURCE_AMT栏位的change事件保持一致
		changeDrAmt(initAmt, "2", GridName);
		getDrJshForBOP("2",GridName);
		jQuery('#'+GridName).jqGrid('saveRow',"2",null,'clientArray'); // 必须保存,不然直接处于编辑状态去修改会报错
	}
}
	

function initCommDrMessage(){
	var drCustid = $('#DR_CUST_ACC_CUSTID').val();
	if( drCustid == '' ) return;
	
	setExRateCustid(drCustid);
	var feeCcy0 = $('#FEE_DR_TOTAL_CCY').val();
	if( feeCcy0 != null && feeCcy0 != '' ){
		var amt = getFieldValue( $('#FEE_DR_TOTAL_AMT').get(0) );
		$('#FEE_DR_TOTAL_BUYRATE').val( getCCYRateByType(feeCcy0,'B') );
		$('#FEE_DR_TOTAL_SELRATE').val( getCCYRateByType(feeCcy0,'S') );
		$('#FEE_DR_TOTAL_PP_BUYRATE').val( getCCYRateByType(feeCcy0,'PB') );
		$('#FEE_DR_TOTAL_PP_SELRATE').val( getCCYRateByType(feeCcy0,'PS') );
		$('#FEE_DR_TOTAL_CNY').val( amt * getExRateByType(feeCcy0,__SYS_LOCALCCY,__FEE_CURR_RATE_TYPE_SB) );
		$('#FEE_DR_TOTAL_PP_CNY').val( amt * getExRateByType(feeCcy0,__SYS_LOCALCCY,__FEE_CURR_RATE_TYPE_PPSB) );
	}
}

function changeDrCcy(aimCCY,rowId,GridName,xbzMark){
	GridName = getGridNames(GridName);
	var drCcy = getCcyByGridName(GridName);
	var xbzCustRate = getFieldValue("XBZ_CUST_RATE");
	if(aimCCY != drCcy && aimCCY!="CNY"&& xbzMark=="YES"){
		alert("客户账币种只能为当前交易币种和人民币");
		setGridValue({"gridName":GridName,"rowId":rowId,"fieldName":"DR_ACCOUNT_CCY","value":drCcy});
	}
	var xbmAmt=getFieldValue("XBZ_AMT");
	jQuery('#'+GridName).jqGrid('saveRow',rowId,null,'clientArray');
	var rowData = jQuery('#'+GridName).jqGrid('getRowData',rowId);
	var sorAmt = FormatStr2Amt(rowData.DR_SOURCE_AMT);
	var accAmt = sorAmt * ( getExRateByType(drCcy,aimCCY,__FEE_CURR_RATE_TYPE_SB) );
	if( aimCCY == drCcy ) accAmt = sorAmt;
	accAmt = FormatAmtByCCY(accAmt,aimCCY);
	var xbzAccAmt=FormatAmtByCCY(xbzCustRate*xbmAmt,aimCCY);
	$('#'+GridName).jqGrid('setRowData',rowId,{
		DR_BUY_RATE:getCCYRateByType(aimCCY,'B'),
		DR_SELL_RATE:getCCYRateByType(drCcy,'S'),
		// modify by liaorizhi 20120911 平盘价显示错误 start
		DR_PP_BUY_RATE:getCCYRateByType(drCcy,'PB'),
		DR_PP_SEL_RATE:getCCYRateByType(aimCCY,'PS'),
		// modify by liaorizhi 20120911 平盘价显示错误 end
		DR_ACCOUNT_AMT:xbzMark=="YES"?xbzAccAmt:accAmt,
		//DR_ACCOUNT_AMT:accAmt,
		//modify by wangbq for 更改币种清空账号和科目号
		DR_ACCOUNT_NO:"",
		SUBMARKS:""
		//modify by wangbq for 更改币种清空账号和科目号
	});
	
	currRowData = jQuery('#'+GridName).jqGrid('getRowData',rowId);
	
	setJshFlagByCcy(GridName);
	jQuery('#'+GridName).jqGrid('editRow',rowId);
}

function changeDrAmt(srcAmt,rowId,GridName){
	GridName = getGridNames(GridName);
	srcAmt = FormatStr2Amt(srcAmt);
	if(srcAmt == ''){
		srcAmt = 0;
	}
	var flag = getGridNameKind(GridName);
	
	if( (tempAmtFld[flag][1] * 1 + tempAmtFld[flag][2] * 1) < srcAmt * 1 ) {
		alert("金额["+srcAmt+"] 超过 ["+(tempAmtFld[flag][1] * 1 + tempAmtFld[flag][2] * 1)+"]!! 请检查! ");
		jQuery('#'+GridName).jqGrid('restoreRow',rowId);
		return;
	}
	if( isNaN(srcAmt) ){
		alert("请输入数字!!");
		jQuery('#'+GridName).jqGrid('restoreRow',rowId);
		return;
	}
	if( srcAmt * 1 < 0 ){
		alert("请输入正数!!");
		jQuery('#'+GridName).jqGrid('restoreRow',rowId);
		return;
	}
	
	jQuery('#'+GridName).jqGrid('saveRow',rowId,null,'clientArray');
	var rowData = jQuery('#'+GridName).jqGrid('getRowData',rowId);
	var srcCcy = rowData.DR_SOURCE_CCY;
	var accCCY = rowData.DR_ACCOUNT_CCY;
	var accAmt = srcAmt.accMul( getExRateByType(srcCcy,accCCY,__FEE_CURR_RATE_TYPE_SB) );
	
	var accCny = srcAmt.accMul(getExRateByType(srcCcy,__SYS_LOCALCCY,__FEE_CURR_RATE_TYPE_SB));
	var accPpCny = srcAmt.accMul(getExRateByType(srcCcy,__SYS_LOCALCCY,__FEE_CURR_RATE_TYPE_PPSB));
	
	if( srcAmt == 0 ) $('#'+GridName).jqGrid('setRowData',rowId,{DR_ACCOUNT_NO:''});
		
	if( srcCcy == accCCY ) accAmt = srcAmt;
	accAmt = FormatAmtByCCY(accAmt,accCCY);
	srcAmt = FormatAmtByCCY(srcAmt,srcCcy);

	$('#'+GridName).jqGrid('setRowData',rowId,{
		DR_SOURCE_AMT:srcAmt,
		DR_ACCOUNT_AMT:accAmt,
		ACC_CNY:accCny,
		ACC_PP_CNY:accPpCny,
		DR_BUY_RATE:getCCYRateByType(accCCY,"B"),
		DR_SELL_RATE:getCCYRateByType(srcCcy,"S"),
		
		// modify by liaorizhi 20120911 平盘价显示错误 start
		DR_PP_BUY_RATE:getCCYRateByType(srcCcy,"PB"),
		DR_PP_SEL_RATE:getCCYRateByType(accCCY,"PS")});
		// modify by liaorizhi 20120911 平盘价显示错误 end
	
	var ssAmt = getAmtByGridName(GridName);
	var allRows = jQuery("#"+GridName).jqGrid('getDataIDs');
	var ssRowData;
	$.each( allRows, function(i, n){	
		if( n != 1 ){
			ssRowData = jQuery('#'+GridName).jqGrid('getRowData',n);
			ssAmt = ssAmt - FormatStr2Amt(ssRowData.DR_SOURCE_AMT);
			
			$('#'+GridName).jqGrid('setRowData',n,{
				DR_BUY_RATE:getCCYRateByType(ssRowData.DR_ACCOUNT_CCY,"B"),
				DR_SELL_RATE:getCCYRateByType(ssRowData.DR_SOURCE_CCY,"S"),
				// modify by liaorizhi 20120911 平盘价显示错误 start
				DR_PP_BUY_RATE:getCCYRateByType(ssRowData.DR_SOURCE_CCY,"PB"),
				DR_PP_SEL_RATE:getCCYRateByType(ssRowData.DR_ACCOUNT_CCY,"PS")});
				// modify by liaorizhi 20120911 平盘价显示错误 end
		}
	});
	
	if( ssAmt == 0 ) $('#'+GridName).jqGrid('setRowData',1,{DR_ACCOUNT_NO:''});
	
	ssRowData = jQuery('#'+GridName).jqGrid('getRowData',1);
	var sssAmt = FormatAmtByCCY(ssAmt,srcCcy);
	$('#'+GridName).jqGrid('setRowData',1,{
								DR_SOURCE_AMT:sssAmt,
								DR_ACCOUNT_AMT:sssAmt,
								ACC_CNY:getExRateByType(srcCcy,__SYS_LOCALCCY,__FEE_CURR_RATE_TYPE_SB) * ssAmt,
								ACC_PP_CNY:getExRateByType(srcCcy,__SYS_LOCALCCY,__FEE_CURR_RATE_TYPE_PPSB) * ssAmt,
								DR_BUY_RATE:getCCYRateByType(ssRowData.DR_ACCOUNT_CCY,"B"),
								DR_SELL_RATE:getCCYRateByType(ssRowData.DR_SOURCE_CCY,"S"),
								// modify by liaorizhi 20120911 平盘价显示错误 start
								DR_PP_BUY_RATE:getCCYRateByType(ssRowData.DR_SOURCE_CCY,"PB"),
								DR_PP_SEL_RATE:getCCYRateByType(ssRowData.DR_ACCOUNT_CCY,"PS")});
								// modify by liaorizhi 20120911 平盘价显示错误 end
	
	currRowData = jQuery('#'+GridName).jqGrid('getRowData',rowId);	
	setJshFlagByCcy(GridName);
	jQuery('#'+GridName).jqGrid('editRow',rowId);
}

function changeDrAmt2(accAmt,rowId,GridName){
	GridName = getGridNames(GridName);
	var flag = getGridNameKind(GridName);
	
	accAmt = FormatStr2Amt(accAmt);
	if(accAmt == ''){
		accAmt = 0;
	}
	if( isNaN(accAmt) ){
		alert("请输入数字!!");
		jQuery('#'+GridName).jqGrid('restoreRow',rowId);
		return;
	}
	if( accAmt * 1 < 0 ){
		alert("请输入正数!!");
		jQuery('#'+GridName).jqGrid('restoreRow',rowId);
		return;
	}
	
	jQuery('#'+GridName).jqGrid('saveRow',rowId,null,'clientArray');
	var rowData = jQuery('#'+GridName).jqGrid('getRowData',rowId);
	var srcCcy = rowData.DR_SOURCE_CCY;
	var accCCY = rowData.DR_ACCOUNT_CCY;
	var srcAmt = accAmt.accMul( getExRateByType(accCCY,srcCcy,__FEE_CURR_RATE_TYPE_BS) );

	if( (tempAmtFld[flag][1] * 1 + tempAmtFld[flag][2] * 1) < srcAmt * 1 ) {
		alert("金额["+accAmt+"/"+accCCY+"] - ["+srcAmt+"/"+srcCcy+"] 超过 ["+(tempAmtFld[flag][1] * 1 + tempAmtFld[flag][2] * 1)+"]!! 请检查! ");
		$('#'+GridName).jqGrid('setRowData',rowId,{DR_ACCOUNT_AMT:tempAmtFld[flag][3]});
		jQuery('#'+GridName).jqGrid('restoreRow',rowId);
		return;
	}
	
	var accCny = srcAmt.accMul(getExRateByType(srcCcy,__SYS_LOCALCCY,__FEE_CURR_RATE_TYPE_SB));
	var accPpCny = srcAmt.accMul(getExRateByType(srcCcy,__SYS_LOCALCCY,__FEE_CURR_RATE_TYPE_PPSB));
	
	if( accAmt == 0 ) $('#'+GridName).jqGrid('setRowData',rowId,{DR_ACCOUNT_NO:''});
	
	if( srcCcy == accCCY ) srcAmt = accAmt;
	accAmt = FormatAmtByCCY(accAmt,accCCY);
	srcAmt = FormatAmtByCCY(srcAmt,srcCcy);
	
	$('#'+GridName).jqGrid('setRowData',rowId,{
		DR_SOURCE_AMT:srcAmt,
		DR_ACCOUNT_AMT:accAmt,
		ACC_CNY:accCny,
		ACC_PP_CNY:accPpCny,
		DR_BUY_RATE:getCCYRateByType(accCCY,"B"),
		DR_SELL_RATE:getCCYRateByType(srcCcy,"S"),
		// modify by liaorizhi 20120911 平盘价显示错误 start
		DR_PP_BUY_RATE:getCCYRateByType(srcCcy,"PB"),
		DR_PP_SEL_RATE:getCCYRateByType(accCCY,"PS")
		// modify by liaorizhi 20120911 平盘价显示错误 end
	});
	
	var ssAmt = getAmtByGridName(GridName);
	var allRows = jQuery("#"+GridName).jqGrid('getDataIDs');
	var ssRowData;
	$.each( allRows, function(i, n){	
		if( n != 1 ){
			ssRowData = jQuery('#'+GridName).jqGrid('getRowData',n);
			ssAmt = ssAmt - FormatStr2Amt(ssRowData.DR_SOURCE_AMT);
			
			$('#'+GridName).jqGrid('setRowData',n,{
				DR_BUY_RATE:getCCYRateByType(ssRowData.DR_ACCOUNT_CCY,"B"),
				DR_SELL_RATE:getCCYRateByType(ssRowData.DR_SOURCE_CCY,"S"),
				// modify by liaorizhi 20120911 平盘价显示错误 start
				DR_PP_BUY_RATE:getCCYRateByType(ssRowData.DR_SOURCE_CCY,"PB"),
				DR_PP_SEL_RATE:getCCYRateByType(ssRowData.DR_ACCOUNT_CCY,"PS")
				// modify by liaorizhi 20120911 平盘价显示错误 end
			});
		}
	});
	
	if( ssAmt == 0 ) $('#'+GridName).jqGrid('setRowData',1,{DR_ACCOUNT_NO:''});
	
	ssRowData = jQuery('#'+GridName).jqGrid('getRowData',1);
	var sssAmt = FormatAmtByCCY(ssAmt,srcCcy);
	$('#'+GridName).jqGrid('setRowData',1,{
		DR_SOURCE_AMT:sssAmt,
		DR_ACCOUNT_AMT:sssAmt,
		ACC_CNY:getExRateByType(srcCcy,__SYS_LOCALCCY,__FEE_CURR_RATE_TYPE_SB) * ssAmt,
		ACC_PP_CNY:getExRateByType(srcCcy,__SYS_LOCALCCY,__FEE_CURR_RATE_TYPE_PPSB) * ssAmt,
		DR_BUY_RATE:getCCYRateByType(ssRowData.DR_ACCOUNT_CCY,"B"),
		DR_SELL_RATE:getCCYRateByType(ssRowData.DR_SOURCE_CCY,"S"),
		// modify by liaorizhi 20120911 平盘价显示错误 start
		DR_PP_BUY_RATE:getCCYRateByType(ssRowData.DR_SOURCE_CCY,"PB"),
		DR_PP_SEL_RATE:getCCYRateByType(ssRowData.DR_ACCOUNT_CCY,"PS")
		// modify by liaorizhi 20120911 平盘价显示错误 end
	});
	
	currRowData = jQuery('#'+GridName).jqGrid('getRowData',rowId);	
	setJshFlagByCcy(GridName);
	jQuery('#'+GridName).jqGrid('editRow',rowId);
}

function delDrInfo(rowId,GridName){
	GridName = getGridNames(GridName);
	var flag = false;
	
	jQuery('#'+GridName).jqGrid('saveRow',rowId,null,'clientArray');
	var oneRow = jQuery('#'+GridName).jqGrid('getRowData',1);
	var rowData = jQuery('#'+GridName).jqGrid('getRowData',rowId);
	var srcAmt1 = FormatStr2Amt( oneRow.DR_SOURCE_AMT );
	var srcAmtx = FormatStr2Amt(rowData.DR_SOURCE_AMT);
	var srcCcy = oneRow.DR_SOURCE_CCY;
	var ssAmt = FormatAmtByCCY( srcAmt1 + srcAmtx,srcCcy );
	$('#'+GridName).jqGrid('setRowData',1,{
		DR_SOURCE_AMT:ssAmt,
		DR_ACCOUNT_AMT:ssAmt,
		ACC_CNY:getExRateByType(srcCcy,__SYS_LOCALCCY,__FEE_CURR_RATE_TYPE_SB) * ssAmt,
		ACC_PP_CNY:getExRateByType(srcCcy,__SYS_LOCALCCY,__FEE_CURR_RATE_TYPE_PPSB) * ssAmt
	});
	flag = true;
	return flag;
}

function formatDrXml(){
	var feeFlag = $('#DR_ISMUL_ACCNO').val();
	if( feeFlag == null || feeFlag == "" ) feeFlag = "ONE";
	formatResultXml("DRCUSTACC_GRID","DR_CUST_ACC_GRID");
	
	if( feeFlag == "MUL" && $('#DRCUSTFEE_GRID').get(0) != null ){
		formatResultXml("DRCUSTFEE_GRID","DR_CUST_FEE_GRID");
	}
	formatDrXmlForVou(feeFlag);
}

function formatResultXml(GridName,xmlField){
	if( $('#'+GridName).get(0) != null ){
		var allRows = jQuery("#"+GridName).jqGrid('getDataIDs');
		$.each( allRows, function(i, n){	
			jQuery('#'+GridName).jqGrid('saveRow',n,null,'clientArray');
		});
		var rowData ;
		
		if( allRows != null && allRows.length > 0 ){		
			var formatXml = '';
			formatXml = "<?xml version='1.0' encoding='GBK'?><dr><rows>";
			$.each( allRows, function(i, n){
				rowData = jQuery('#'+GridName).jqGrid('getRowData',n);
				
				var rowXml = '';
				rowXml = '<row>';
				
				rowXml = rowXml + '<cell hidFlag = "N">'+rowData.DR_ACCOUNT_CCY+'</cell>';//0
				rowXml = rowXml + '<cell hidFlag = "N">'+rowData.DR_BUY_RATE+'</cell>';//1
				rowXml = rowXml + '<cell hidFlag = "N">'+rowData.DR_SELL_RATE+'</cell>';//2
				rowXml = rowXml + '<cell hidFlag = "N">'+rowData.DR_SOURCE_CCY+'</cell>';//3
				rowXml = rowXml + '<cell hidFlag = "N">'+FormatStr2Amt(rowData.DR_SOURCE_AMT)+'</cell>';//4
				rowXml = rowXml + '<cell hidFlag = "N">'+FormatStr2Amt(rowData.DR_ACCOUNT_AMT)+'</cell>';//5
				rowXml = rowXml + '<cell hidFlag = "N">'+rowData.DR_ACCOUNT_NO+'</cell>';//6
				rowXml = rowXml + '<cell hidFlag = "N">'+rowData.SUBMARKS+'</cell>';//7
				rowXml = rowXml + '<cell hidFlag = "N">'+rowData.ACC_ATTR+'</cell>';//8
				rowXml = rowXml + '<cell hidFlag = "N">'+rowData.DR_DESC+'</cell>';//9
				rowXml = rowXml + '<cell hidFlag = "Y">'+rowData.DR_PP_BUY_RATE+'</cell>';//10
				rowXml = rowXml + '<cell hidFlag = "Y">'+rowData.DR_PP_SEL_RATE+'</cell>';//11
				rowXml = rowXml + '<cell hidFlag = "Y">'+rowData.ACC_CNY+'</cell>';//12
				rowXml = rowXml + '<cell hidFlag = "Y">'+rowData.ACC_PP_CNY+'</cell>';//13
				rowXml = rowXml + '<cell hidFlag = "N">'+rowData.SEQ_NO+'</cell>';//14
				rowXml = rowXml + '<cell hidFlag = "N">'+rowData.PROD_TYPE+'</cell>';//15
				
				rowXml = rowXml + '</row>';
				formatXml = formatXml + rowXml;
			});
			formatXml = formatXml + '</rows></dr>';

			$('#'+xmlField).val(formatXml);
		}
	}
}

function formatDrXmlForVou(feeFlag){
	var rowData ;
	var drCustid = $('#DR_CUST_ACC_CUSTID').val();
	var allRows = jQuery("#DRCUSTACC_GRID").jqGrid('getDataIDs');
	$.each( allRows, function(i, n){	
		jQuery('#DRCUSTACC_GRID').jqGrid('saveRow',n,null,'clientArray');
	});
	
	var formatXml = '';
	formatXml =  "<?xml version='1.0' encoding='GBK'?><CUSTACC_VOU><ACCOUNTS>";
	var buyRate,selRate,ppBuyRate,ppSelRate;
	var jshDM = $('#DR_CUST_ACC_JSHDM').val();
	var jshDX = $('#DR_CUST_ACC_JSHDX').val();
	if( jshDM == null ) jshDM = "";
	if( jshDX == null ) jshDX = ""; 
	if( allRows != null && allRows.length > 0 ){
		$.each( allRows, function(i, n){
			rowData = jQuery('#DRCUSTACC_GRID').jqGrid('getRowData',n);
			var amt11 = FormatStr2Amt(rowData.DR_ACCOUNT_AMT);
			if( amt11 != 0 ){
				var rowXml = '';
				
				var accAmt = FormatStr2Amt(rowData.DR_ACCOUNT_AMT);
				var sorAmt = FormatStr2Amt(rowData.DR_SOURCE_AMT);
				if( accAmt != 0 && sorAmt != 0 ){
					rowXml = '<ACCOUNT>';
					rowXml = rowXml + '<ACC_DCFLAG>Dr</ACC_DCFLAG>';
					rowXml = rowXml + '<ACC_CUSTID>'+drCustid+'</ACC_CUSTID>';
					rowXml = rowXml + '<ACC_NO>'+rowData.DR_ACCOUNT_NO+'</ACC_NO>';
					rowXml = rowXml + '<SUBMARKS>'+rowData.SUBMARKS+'</SUBMARKS>';
					rowXml = rowXml + '<ACC_CCY>'+rowData.DR_ACCOUNT_CCY+'</ACC_CCY>';
					rowXml = rowXml + '<ACC_AMT>'+accAmt+'</ACC_AMT>';
					rowXml = rowXml + '<ACC_BUYRATE>'+rowData.DR_BUY_RATE+'</ACC_BUYRATE>';
					rowXml = rowXml + '<ACC_SELRATE>'+rowData.DR_SELL_RATE+'</ACC_SELRATE>';
					rowXml = rowXml + '<ACC_PP_BUYRATE>'+rowData.DR_PP_BUY_RATE+'</ACC_PP_BUYRATE>';
					rowXml = rowXml + '<ACC_PP_SELRATE>'+rowData.DR_PP_SEL_RATE+'</ACC_PP_SELRATE>';
					rowXml = rowXml + '<ACC_CNY>'+rowData.ACC_CNY+'</ACC_CNY>';
					rowXml = rowXml + '<ACC_PP_CNY>'+rowData.ACC_PP_CNY+'</ACC_PP_CNY>';
					rowXml = rowXml + '<ACC_SOR_AMT>'+sorAmt+'</ACC_SOR_AMT>';
					rowXml = rowXml + '<ACC_SOR_CCY>'+rowData.DR_SOURCE_CCY+'</ACC_SOR_CCY>';
					rowXml = rowXml + '<ACC_JSHDM>'+jshDM+'</ACC_JSHDM>';
					rowXml = rowXml + '<ACC_JSHDX>'+jshDX+'</ACC_JSHDX>';
					rowXml = rowXml + '<ACC_USD_BUYRATE>'+getCCYRateByType('USD','B')+'</ACC_USD_BUYRATE>';
					rowXml = rowXml + '<ACC_USD_SELRATE>'+getCCYRateByType('USD','S')+'</ACC_USD_SELRATE>';
					rowXml = rowXml + '<ACC_MIDRATE>'+getCCYRateByType(rowData.DR_SOURCE_CCY,'M')+'</ACC_MIDRATE>';
					rowXml = rowXml + '<ACC_ATTR>'+rowData.ACC_ATTR+'</ACC_ATTR>';
					rowXml = rowXml + '<SEQ_NO>'+rowData.SEQ_NO+'</SEQ_NO>';
					rowXml = rowXml + '<PROD_TYPE>'+rowData.PROD_TYPE+'</PROD_TYPE>';
					rowXml = rowXml + '<ACC_VOUTYPE>DRGRID</ACC_VOUTYPE>';//区分是什么帐
					rowXml = rowXml + '</ACCOUNT>';
				}
				formatXml = formatXml + rowXml;
			}
		});
	}
	
	var feeVouXml = "<?xml version='1.0' encoding='GBK'?><CUSTACC_VOU><ACCOUNTS>";
	if( feeFlag == "ONE" ){
		var accNo = $('#FEE_DR_TOTAL_ACCNO').val();
		var ccy = $('#FEE_DR_TOTAL_CCY').val();
		var amt = getFieldValue( $('#FEE_DR_TOTAL_AMT').get(0) );
		if( ccy != null && ccy != '' && accNo != null && accNo != '' && amt != null && amt != 0){
			var rowXml = '';
			
			buyRate = $('#FEE_DR_TOTAL_BUYRATE').val();
			selRate = $('#FEE_DR_TOTAL_SELRATE').val();
			ppBuyRate = $('#FEE_DR_TOTAL_PP_BUYRATE').val();
			ppSelRate = $('#FEE_DR_TOTAL_PP_SELRATE').val();
			feeDrSubject = $('#FEE_DR_SUBJECT').val();
			var  feeDrAccType = $('#FEE_ACCNO_TYPE').val();
			var  feeDrSeqNo = $('#FEE_DR_SEQ_NO').val();
			var  feeDrProdType = $('#FEE_DR_PROD_TYPE').val();
			
			rowXml = '<ACCOUNT>';
			rowXml = rowXml + '<ACC_DCFLAG>Dr</ACC_DCFLAG>';
			rowXml = rowXml + '<ACC_CUSTID>'+drCustid+'</ACC_CUSTID>';
			rowXml = rowXml + '<ACC_NO>'+accNo+'</ACC_NO>';
			rowXml = rowXml + '<SUBMARKS>'+feeDrSubject+'</SUBMARKS>';
			rowXml = rowXml + '<ACC_CCY>'+ccy+'</ACC_CCY>';
			rowXml = rowXml + '<ACC_AMT>'+amt+'</ACC_AMT>';
			rowXml = rowXml + '<ACC_BUYRATE>'+buyRate+'</ACC_BUYRATE>';
			rowXml = rowXml + '<ACC_SELRATE>'+selRate+'</ACC_SELRATE>';
			rowXml = rowXml + '<ACC_PP_BUYRATE>'+ppBuyRate+'</ACC_PP_BUYRATE>';
			rowXml = rowXml + '<ACC_PP_SELRATE>'+ppSelRate+'</ACC_PP_SELRATE>';
			rowXml = rowXml + '<ACC_CNY>0</ACC_CNY>';
			rowXml = rowXml + '<ACC_PP_CNY>0</ACC_PP_CNY>';
			rowXml = rowXml + '<ACC_SOR_AMT>'+amt+'</ACC_SOR_AMT>';
			rowXml = rowXml + '<ACC_SOR_CCY>'+ccy+'</ACC_SOR_CCY>';
			rowXml = rowXml + '<ACC_JSHDM>'+jshDM+'</ACC_JSHDM>';
			rowXml = rowXml + '<ACC_JSHDX>'+jshDX+'</ACC_JSHDX>';
			rowXml = rowXml + '<ACC_USD_BUYRATE>'+getCCYRateByType('USD','B')+'</ACC_USD_BUYRATE>';
			rowXml = rowXml + '<ACC_USD_SELRATE>'+getCCYRateByType('USD','S')+'</ACC_USD_SELRATE>';
			rowXml = rowXml + '<ACC_MIDRATE>'+getCCYRateByType(ccy,'M')+'</ACC_MIDRATE>';
			rowXml = rowXml + '<ACC_ATTR>'+feeDrAccType+'</ACC_ATTR>';
			rowXml = rowXml + '<SEQ_NO>'+feeDrSeqNo+'</SEQ_NO>';
			rowXml = rowXml + '<PROD_TYPE>'+feeDrProdType+'</PROD_TYPE>';
			rowXml = rowXml + '<ACC_VOUTYPE>DRFEE</ACC_VOUTYPE>';//区分是什么帐
			rowXml = rowXml + '</ACCOUNT>';
			
			feeVouXml = feeVouXml + rowXml;
		}
	}else if( feeFlag == "MUL" ){
		allRows = jQuery("#DRCUSTFEE_GRID").jqGrid('getDataIDs');
		$.each( allRows, function(i, n){	
			jQuery('#DRCUSTFEE_GRID').jqGrid('saveRow',n,null,'clientArray');
		});
		
		if( allRows != null && allRows.length > 0 ){
			$.each( allRows, function(i, n){
				rowData = jQuery('#DRCUSTFEE_GRID').jqGrid('getRowData',n);
				var amt11 = FormatStr2Amt(rowData.DR_ACCOUNT_AMT);
				if( amt11 != 0 ){
					var rowXml = '';
					
					var accAmt = FormatStr2Amt(rowData.DR_ACCOUNT_AMT);
					var sorAmt = FormatStr2Amt(rowData.DR_SOURCE_AMT);
					if( accAmt != 0 && sorAmt != 0 ){
						rowXml = '<ACCOUNT>';
						rowXml = rowXml + '<ACC_DCFLAG>Dr</ACC_DCFLAG>';
						rowXml = rowXml + '<ACC_CUSTID>'+drCustid+'</ACC_CUSTID>';
						rowXml = rowXml + '<ACC_NO>'+rowData.DR_ACCOUNT_NO+'</ACC_NO>';
						rowXml = rowXml + '<SUBMARKS>'+rowData.SUBMARKS+'</SUBMARKS>';
						rowXml = rowXml + '<ACC_CCY>'+rowData.DR_ACCOUNT_CCY+'</ACC_CCY>';
						rowXml = rowXml + '<ACC_AMT>'+accAmt+'</ACC_AMT>';
						rowXml = rowXml + '<ACC_BUYRATE>'+rowData.DR_BUY_RATE+'</ACC_BUYRATE>';
						rowXml = rowXml + '<ACC_SELRATE>'+rowData.DR_SELL_RATE+'</ACC_SELRATE>';
						rowXml = rowXml + '<ACC_PP_BUYRATE>'+rowData.DR_PP_BUY_RATE+'</ACC_PP_BUYRATE>';
						rowXml = rowXml + '<ACC_PP_SELRATE>'+rowData.DR_PP_SEL_RATE+'</ACC_PP_SELRATE>';
						rowXml = rowXml + '<ACC_CNY>'+rowData.ACC_CNY+'</ACC_CNY>';
						rowXml = rowXml + '<ACC_PP_CNY>'+rowData.ACC_PP_CNY+'</ACC_PP_CNY>';
						rowXml = rowXml + '<ACC_SOR_AMT>'+sorAmt+'</ACC_SOR_AMT>';
						rowXml = rowXml + '<ACC_SOR_CCY>'+rowData.DR_SOURCE_CCY+'</ACC_SOR_CCY>';
						rowXml = rowXml + '<ACC_JSHDM>'+jshDM+'</ACC_JSHDM>';
						rowXml = rowXml + '<ACC_JSHDX>'+jshDX+'</ACC_JSHDX>';
						rowXml = rowXml + '<ACC_USD_BUYRATE>'+getCCYRateByType('USD','B')+'</ACC_USD_BUYRATE>';
						rowXml = rowXml + '<ACC_USD_SELRATE>'+getCCYRateByType('USD','S')+'</ACC_USD_SELRATE>';
						rowXml = rowXml + '<ACC_MIDRATE>'+getCCYRateByType(rowData.DR_SOURCE_CCY,'M')+'</ACC_MIDRATE>';
						rowXml = rowXml + '<ACC_VOUTYPE>DRFEEGRID</ACC_VOUTYPE>';//区分是什么帐
						rowXml = rowXml + '<ACC_ATTR>'+rowData.ACC_ATTR+'</ACC_ATTR>';
						rowXml = rowXml + '<SEQ_NO>'+rowData.SEQ_NO+'</SEQ_NO>';
						rowXml = rowXml + '<PROD_TYPE>'+rowData.PROD_TYPE+'</PROD_TYPE>';
						rowXml = rowXml + '</ACCOUNT>';
					}
					feeVouXml = feeVouXml + rowXml;
				}
			});
		}
	}
	formatXml = formatXml + '</ACCOUNTS></CUSTACC_VOU>';
	feeVouXml = feeVouXml + '</ACCOUNTS></CUSTACC_VOU>';
	
	$('#DR_CUST_ACC_GRID_VOU').get(0).value = formatXml;
		if ($("#DR_CUST_ACC_GRID_VOU_FEE")[0]) $('#DR_CUST_ACC_GRID_VOU_FEE').get(0).value = feeVouXml;
}

function initReleaseDr(){
	var xmlStr = $('#DR_CUST_ACC_GRID').val();
	if( xmlStr != null && xmlStr != "" ){
		createDrGrid('xmlstring',xmlStr,false,false);
	}
	initReleaseFeeDr();
}

function initReleaseFeeDr(){
	var xmlStr = $('#DR_CUST_FEE_GRID').val();
	if( xmlStr != null && xmlStr != "" ){
		createMultAccNoGrid('xmlstring',xmlStr,false,false);
	}
}

function initFixPengingDr(){
	initCommDrMessage();
	var xmlStr = $('#DR_CUST_ACC_GRID').val();;
	setExRateCustid( $('#DR_CUST_ACC_CUSTID').val() );
	if( xmlStr != null && xmlStr != "" ){
		createDrGrid('xmlstring',xmlStr,true,true);
	}
	initFixPengingFeeDr();
}

function initFixPengingFeeDr(){
	var xmlStr = $('#DR_CUST_FEE_GRID').val();
	if( xmlStr != null && xmlStr != "" ){
		createMultAccNoGrid('xmlstring',xmlStr,true,true);
	}
}

function storeDrData(obj,GridName){
	GridName = getGridNames(GridName);
	var rowData = jQuery('#'+GridName).jqGrid('getRowData',1);
	
	var flag = getGridNameKind(GridName);
	tempAmtFld[flag][1] = FormatStr2Amt(rowData.DR_SOURCE_AMT);
	tempAmtFld[flag][2] = FormatStr2Amt(obj.value);
}

function storeDrData2(rowid,obj,GridName){
	GridName = getGridNames(GridName);
	var rowData = jQuery('#'+GridName).jqGrid('getRowData',1);
	
	var flag = getGridNameKind(GridName);
	tempAmtFld[flag][1] = FormatStr2Amt(rowData.DR_SOURCE_AMT);
	tempAmtFld[flag][2] = FormatStr2Amt($('#'+rowid+'_DR_SOURCE_AMT').val());
	tempAmtFld[flag][3] = FormatStr2Amt(obj.value);
}

function getDrJshForBOP(rowId,GridName){
	if( rowId == null || rowId == "" ) rowId = currRowIdDR;
	GridName = getGridNames(GridName);
	if( typeof(getJSHDataForBop) == 'function' ){
		jQuery('#'+GridName).jqGrid('saveRow',rowId,null,'clientArray');
		currRowData = jQuery('#'+GridName).jqGrid('getRowData',rowId);
		var ccy = currRowData.DR_ACCOUNT_CCY;
		var amt = FormatStr2Amt(currRowData.DR_SOURCE_AMT);
		var accNo = currRowData.DR_ACCOUNT_NO;
		var buyRate = currRowData.DR_BUY_RATE;
		var selRate = currRowData.DR_SELL_RATE;
		
		//alert('ccy-'+ccy+'-amt-'+amt+'-accNo-'+accNo+'-buyRate-'+buyRate+'-selRate-'+selRate);
		jQuery('#'+GridName).jqGrid('editRow',rowId);
		getJSHDataForBop(ccy,amt,accNo,buyRate,selRate,"DR");
	}
	$('#DR_CUST_TEMP_ACCNO').val(getGridData("DRCUSTACC_GRID","DR_ACCOUNT_NO",rowId));
	if(typeof(onDrCustAccChange) == 'function' ){
		onDrCustAccChange();
	}
	
	// 给支付页面用
	// [Bugfree_2167_扣帐页面]_B fanr 2013-12-27
	if(typeof(onPaymentChange) == 'function' ){
		currRowData = jQuery('#'+GridName).jqGrid('getRowData',rowId);
		var ccy = getGridValue(currRowData,rowId,"DR_ACCOUNT_CCY");
		var transCcy = document.UTFORM.DR_CUST_ACC_CCY.value;
		if(transCcy == "CNY" && ccy == "CNY"){
			var custAccNo = getGridValue(currRowData,rowId,"DR_ACCOUNT_NO");
			var transAmt = getAmtValue(document.UTFORM.DR_CUST_ACC_AMT);
			jQuery('#'+GridName).jqGrid('editRow',rowId);
			onPaymentChange(transAmt,custAccNo);
		}
	}
	// [Bugfree_2167_扣帐页面]_E fanr 2013-12-27
}
		
function setDrCurrData(rowid,GridName){
	currRowData = jQuery('#'+GridName).jqGrid('getRowData',rowid);
	var drAccNo = getGridData("DRCUSTACC_GRID","DR_ACCOUNT_NO",rowid);
	if(drAccNo==null||drAccNo==""){
		 $('#'+GridName).jqGrid('setRowData',rowid,{SUBMARKS:''});
	}
	setProperty($("#" + rowid + "_SUBMARKS"),"P");
}	

function createDrPageButton(clickEnable,GridName){
	GridName = getGridNames(GridName);
	if( DR_IS_CREATE_BAR_FLAG ) return;
	DR_IS_CREATE_BAR_FLAG = true;
	jQuery('#'+GridName)
		/** 重庆扣账不需要增加按钮
		.jqGrid('navButtonAdd','#'+GridName+'_BAR',{
		    caption: '',
		    title: 'Add DrInfo',
			buttonicon:'ui-icon-plus',
			clickEnable:clickEnable,
		    onClickButton :function(){
				addDrData(GridName);
	    	}})
	    */
		.jqGrid('navButtonAdd','#'+GridName+'_BAR',{
			caption:'',
			title:'Del DrInfo',
			buttonicon:'ui-icon-minus',
			clickEnable:clickEnable,
			onClickButton : function (){
				delDrData(GridName);
	    	}})
		.jqGrid('navButtonAdd','#'+GridName+'_BAR',{
			caption:'',
			title:'Edit Row',
			buttonicon:'ui-icon-pencil',
			clickEnable:clickEnable,
			onClickButton : function (){
				editDrData(GridName);
	    	}})
		.jqGrid('navButtonAdd','#'+GridName+'_BAR',{
			caption:'',
			title:'Save Row',
			buttonicon:'ui-icon-disk',
			clickEnable:clickEnable,
			onClickButton : function (){
				saveDrData(GridName);
	    	}})
		.jqGrid('navButtonAdd','#'+GridName+'_BAR',{
			caption:'',
			title:'Cancle Save Row',
			buttonicon:'ui-icon-cancel',
			clickEnable:clickEnable,
			onClickButton : function (){
				cancleDrData(GridName);
	    	}});
}

function getRowIDByFieldId(fieldId){
	var pos = fieldId.indexOf("_");
	var rowId = -1;
	if( pos > 0 ){
		rowId =  fieldId.substring(0,pos);
	}
	return rowId;
}

function getGridNames(GridName){
	if( GridName == null || GridName == "" ) return "DRCUSTACC_GRID";
	return GridName;
}

function getGridNameKind(GridName){
	if( GridName == null || "DRCUSTACC_GRID" == GridName ) return 0;
	if( "DRCUSTFEE_GRID" == GridName ) return 1;
}

function getAmtByGridName(GridName){
	if( GridName == null || "DRCUSTACC_GRID" == GridName ) return getFieldValue( $('#DR_CUST_ACC_AMT').get(0) );
	if( "DRCUSTFEE_GRID" == GridName ) return getFieldValue( $('#FEE_DR_TOTAL_AMT').get(0) );
}

function getCcyByGridName(GridName){
	if( GridName == null || "DRCUSTACC_GRID" == GridName ) return $('#DR_CUST_ACC_CCY').val();
	if( "DRCUSTFEE_GRID" == GridName ) return $('#FEE_DR_TOTAL_CCY').val();
}

//初始化费用扣帐表格
function initDrFeeGrid(){
	if (!$('#DRCUSTFEE_GRID').get(0)) return; // 判断如果没有费用扣帐表格的话,则返回
	setFeeDrSubPro();
	saveDrData("DRCUSTFEE_GRID");
	var amt = getFieldValue( $('#FEE_DR_TOTAL_AMT').get(0) );
	var ccy = $('#FEE_DR_TOTAL_CCY').val();
	var showFlag = $('#DR_ISMUL_ACCNO').val();
	if( showFlag == null || showFlag == "" ) showFlag = "ONE";
	if( amt == 0 || ccy == "" ){
		setProperty($('#DR_ISMUL_ACCNO').get(0),"P");
	}else{
		setProperty($('#DR_ISMUL_ACCNO').get(0),"O");
	}
	var accNo = "";
	if( showFlag == "ONE" ){
		accNo = $('#FEE_DR_TOTAL_ACCNO').val();
		var rowData,existAccNoNum = 0;
		if( !accNo ){
			var allRows = jQuery("#DRCUSTFEE_GRID").jqGrid('getDataIDs');
			$.each( allRows, function(i, n){	
				rowData =  jQuery('#DRCUSTFEE_GRID').jqGrid('getRowData',n);
				if( rowData.DR_ACCOUNT_NO ){
					accNo = rowData.DR_ACCOUNT_NO;
					existAccNoNum++;
				}
			});
			if( existAccNoNum == 1 ) setFieldValue($('#FEE_DR_TOTAL_ACCNO').get(0),accNo);
		}
		if( amt > 0 && ccy != "" ){
			setProperty($('#FEE_DR_TOTAL_ACCNO').get(0),"M");
		}else{
			setProperty($('#FEE_DR_TOTAL_ACCNO').get(0),"P");
		}
		$('#DRCUSTFEE_GRID').GridUnload();
	}else if( showFlag == "MUL" ){
		accNo = $('#FEE_DR_TOTAL_ACCNO').val();
		$('#FEE_DR_TOTAL_ACCNO').val("");
		setProperty($('#FEE_DR_TOTAL_ACCNO').get(0),"P");
		createMultAccNoGrid('jsonstring','',true,true);
		var initAmt = FormatAmtByCCY(amt,ccy);
		initDrGrid("DRCUSTFEE_GRID",accNo,initAmt,ccy);
	}
}

function setFeeDrSubPro(){//控制单费用扣帐时科目号
	var drIsMulAcc = $('#DR_ISMUL_ACCNO').val();
	if(drIsMulAcc == "ONE"){
		
	}else if(drIsMulAcc == "MUL"){
		setFieldValue(document.UTFORM.FEE_DR_SUBJECT,"");
	}
}

function getcurrRowIdDRByGridName(GridName){
	var rowid = -1;
	if( GridName == "DRCUSTACC_GRID" ){
		rowid = currRowIdDR;
	}else if( GridName == "DRCUSTFEE_GRID" ){
		rowid = currRowIdDR0;
	}
	return rowid;
}

function addDrData(GridName){
	var drCcy = $('#DR_CUST_ACC_CCY').val();
	var drAmt = FormatAmtByCCY(0,drCcy);
	setExRateCustid( $('#DR_CUST_ACC_CUSTID').val() );
	var data = {
						DR_ACCOUNT_CCY:drCcy,
						DR_BUY_RATE:getCCYRateByType(drCcy,'B'),
						DR_SELL_RATE:getCCYRateByType(drCcy,'S'),
						DR_SOURCE_CCY:drCcy,
						DR_SOURCE_AMT:drAmt,
						DR_ACCOUNT_AMT:drAmt,
						DR_ACCOUNT_NO:'',
						DR_PP_BUY_RATE:getCCYRateByType(drCcy,'PB'),
						DR_PP_SEL_RATE:getCCYRateByType(drCcy,'PS'),
						ACC_CNY:0,
						ACC_PP_CNY:0
					};
	var allRows = jQuery("#"+GridName).jqGrid('getDataIDs');
	var rowId = parseInt(Math.max.apply({},allRows) + 1);
	jQuery("#"+GridName).jqGrid('addRowData',rowId,data,'last');
}

function saveDrData(GridName){
	var allRows = jQuery("#"+GridName).jqGrid('getDataIDs');
	$.each( allRows, function(i, n){	
		jQuery('#'+GridName).jqGrid('saveRow',n,null,'clientArray');
	});
	cancleInqAccount();
}

function saveAnotherGrid(GridName){
	var anotherGrid = "DRCUSTACC_GRID";
	if(GridName=="DRCUSTACC_GRID"){
		anotherGrid = "DRCUSTFEE_GRID";
	}
	
	var allRows = jQuery("#"+anotherGrid).jqGrid('getDataIDs');
	$.each( allRows, function(i, n){	
		jQuery('#'+anotherGrid).jqGrid('saveRow',n,null,'clientArray');
	});
	//如果同时显示入账，则保存入账表格
	var taskname = getFieldValue(document.UTFORM.TASKNAME);
	if(taskname=="COMBKITRADE"){
		saveCrData();
	}
}

function cancleDrData(GridName){
	var allRows = jQuery("#"+GridName).jqGrid('getDataIDs');
	$.each( allRows, function(i, n){	
		jQuery('#'+GridName).jqGrid('restoreRow',n);
	});
	cancleInqAccount();
}

function editDrData(GridName){
	var rowid = getcurrRowIdDRByGridName(GridName);
	saveDrData(GridName);
	jQuery('#'+GridName).jqGrid('editRow',rowid);
	
		//设置为不可修改
	var xbzMark=getFieldValue("XBZ_MARK");
	if(xbzMark=="" || xbzMark==null || xbzMark=="NO"){
		$("#1_DR_ACCOUNT_CCY").attr("disabled",true); 
	}else{
		$("#1_DR_ACCOUNT_CCY").attr("disabled",false);
	}
	$("#1_DR_SOURCE_AMT").attr("disabled",true); 
	$("#1_DR_ACCOUNT_AMT").attr("disabled",true); 
	$("#2_DR_ACCOUNT_CCY").attr("disabled",true); 

}

function delDrData(GridName){
	var rowid = getcurrRowIdDRByGridName(GridName);
	if( rowid == -1 ){
		alert("请选择一行!!");
	}else if( rowid == 1 ){
		alert("不能删除第一行!!");
	}else if( rowid == 2 ){
		alert("不能删除第二行!!");
	}else{
		var isSure=confirm("Please Make Sure to Delete Rows ["+rowid+"] ??");
		if(isSure){
			if( delDrInfo(rowid,GridName) ){
				jQuery('#'+GridName).jqGrid('delRowData',rowid);
				rowid = -1;
			}
		}
	}
	cancleInqAccount();
}

function createGirdFun(datatype,gridData,clickEnable,editAble,GridName,GridBar,GridTitle,GridFlag,showThreeFlag){
	//add by @auth wulei at @date 2012-06-17 @desc 控制是否启用汇率修改   begin
	var rateEditAble = editAble;
	if (!UtanGlobalCache("userConfig").get().EXRATE_MODIFY_FLAG) rateEditAble = false;
	 //add by @auth wulei at @date 2012-06-17 @desc 控制是否启用汇率修改   end
	rateEditAble = custRateEditEnable;
	//获取小币种全球通标记
	var xbzMark=getFieldValue("XBZ_MARK");
	_show_three_rows_flag = (showThreeFlag && "N" == showThreeFlag) ? false : true;
	
	$('#'+GridName).GridUnload();
	DR_IS_CREATE_BAR_FLAG = false;
	$('#'+GridName).jqGrid({
		caption:GridTitle,
        datatype:datatype,
		datastr:gridData,
        rownumbers:true,
		width:scrWidth,
        height:100,
		altRows:true,
		altclass:'ui-priority-secondary',
        sortable:false, 	
        rowNum:-1,
		pager: '#'+GridBar,
		pgbuttons:false,
		pginput:false,
		viewrecords: true,
		forceFit : true,
		colNames:GRID_COLNAMES,
        colModel:[
						{
							name:'DR_ACCOUNT_CCY',
							index:'DR_ACCOUNT_CCY',
							sortable:false,
							width:60,
							editable:editAble,
							edittype:'select',
							editoptions:{
								//dataUrl:'/UtanWeb/CommUtilServlet?OPERTYPE=getCCY',
								value:UtanGlobalCache("ccy").get().ccyString,
								style:'width:100%;',
								dataEvents:[
													{type:'change',fn:function(e){changeDrCcy(this.value,getRowIDByFieldId(this.id),GridName,xbzMark);getDrJshForBOP(getRowIDByFieldId(this.id),GridName);setInqAccInfo(getRowIDByFieldId(this.id),GridName);}},
													{type:'focus',fn:function(e){cancleInqAccount();storeDrData(this,GridName);}},
													{type:'click',fn:function(e){cancleInqAccount();checkRow(getRowIDByFieldId(this.id),2,'Do not change the currency!');}}//checkRow(getRowIDByFieldId(this.id),1,' Do not modify the currency!');
													//{type:'click',fn:function(e){cancleInqAccount();checkRow(getRowIDByFieldId(this.id),1,' Do not modify the currency!');checkRow(getRowIDByFieldId(this.id),2,'Do not change the currency!');}}
												]
							}	
						},
						{name:'DR_BUY_RATE',index:'DR_BUY_RATE',sortable:false,editable:rateEditAble,align:"right",formatter:'number',hidden:xbzMark=="YES"?true:false,
						//{name:'DR_BUY_RATE',index:'DR_BUY_RATE',sortable:false,editable:rateEditAble,align:"right",formatter:'number',
							formatoptions:{decimalPlaces:6},
							editoptions:{
								dataEvents:[
									{type:'change',fn:function(e){
										changeTransExrates("DR_CUST_ACC_CUSTID",currRowIdDR+"_DR_ACCOUNT_CCY",currRowIdDR+"_DR_BUY_RATE","BUYRATE");
										changeTransExratesDr("DRCUSTACC_GRID",currRowIdDR,this.value,"Buy");
										getDrJshForBOP(getRowIDByFieldId(this.id),GridName);
										}
									}]
							}
						},
						//{name:'DR_SELL_RATE',index:'DR_SELL_RATE',sortable:false,editable:rateEditAble,align:"right",formatter:'number',
						{name:'DR_SELL_RATE',index:'DR_SELL_RATE',sortable:false,editable:rateEditAble,align:"right",formatter:'number',hidden:xbzMark=="YES"?true:false,
							formatoptions:{decimalPlaces:6},
							editoptions:{
								dataEvents:[{type:'change',fn:function(e){
									changeTransExrates("DR_CUST_ACC_CUSTID","DR_CUST_ACC_CCY",currRowIdDR+"_DR_SELL_RATE","SELRATE");
									changeTransExratesDr("DRCUSTACC_GRID",currRowIdDR,this.value,"Sell");
									getDrJshForBOP(getRowIDByFieldId(this.id),GridName);
									}
								        },
                                                                        {type:'focus',fn:function(e){$('#'+getRowIDByFieldId(this.id)+'_DR_SELL_RATE').attr("disabled",true);}},
                                                                        {type:'click',fn:function(e){$('#'+getRowIDByFieldId(this.id)+'_DR_SELL_RATE').attr("disabled",true);}}
                                                                          ]
							}
						},
						{name:'DR_SOURCE_CCY',index:'DR_SOURCE_CCY',sortable:false,editable:false,width:60},
						{
							name:'DR_SOURCE_AMT',
							classes:'jqEditAbleM',
							index:'DR_SOURCE_AMT',
							sortable:false,
							align:"right",
							editable:editAble,
							editoptions:{
								dataEvents:[
													{type:'change',fn:function(e){changeDrAmt(this.value,getRowIDByFieldId(this.id),GridName);getDrJshForBOP(getRowIDByFieldId(this.id),GridName);}},
													{type:'focus',fn:function(e){cancleInqAccount();storeDrData(this,GridName);}},
													{type:'click',fn:function(e){cancleInqAccount();checkRow(getRowIDByFieldId(this.id),1,'Do not modify the amount!');}}
												  ]
							}	
						},
						{
							name:'DR_ACCOUNT_AMT',
							classes:'jqEditAbleM', 
							index:'DR_ACCOUNT_AMT',
							sortable:false,
							align:"right",
							editable:editAble,
							editoptions:{
								dataEvents:[
													{type:'change',fn:function(e){changeDrAmt2(this.value,getRowIDByFieldId(this.id),GridName);getDrJshForBOP(getRowIDByFieldId(this.id),GridName);}},
													{type:'focus',fn:function(e){cancleInqAccount();storeDrData2(getRowIDByFieldId(this.id),this,GridName);}},
													{type:'click',fn:function(e){cancleInqAccount();checkRow(getRowIDByFieldId(this.id),1,'Do not modify the amount!');}}
												  ]
							}	
						},
						{
							name:'DR_ACCOUNT_NO',
							classes:'jqEditAbleM', 
							index:'DR_ACCOUNT_NO',
							sortable:false,
							editable:editAble,
							editoptions:{
								dataEvents:[
													{type:'change',fn:function(e){setDrCurrData(getRowIDByFieldId(this.id),GridName);getDrJshForBOP(getRowIDByFieldId(this.id),GridName);setInqAccInfo(getRowIDByFieldId(this.id),GridName);}},
													{type:'focus',fn:function(e){
														var rowId = getRowIDByFieldId(this.id);
														var accAttr = getGridValue({"gridName":GridName,"rowId":rowId,"fieldName":"ACC_ATTR"});
														var ccy = getGridValue({"gridName":GridName,"rowId":rowId,"fieldName":"DR_ACCOUNT_CCY"});
														var acct = getGridValue({"gridName":GridName,"rowId":rowId,"fieldName":"DR_ACCOUNT_NO"});
														if(accAttr=="N"){
															this.setAttribute("key2param", "{'K':'"+rowId+"_DR_ACCOUNT_NO','P':'INNERACCT'},{'K':'"+rowId+"_SUBMARKS','P':'SUBJECT'}");
															lookupOnFocus(this,'INNERACCT_LK');
														} else {
															this.setAttribute("key2param", "{'K':'"+rowId+"_DR_ACCOUNT_NO','P':'ActNo'},{'K':'"+rowId+"_SEQ_NO','P':'AcctSeqNo'},{'K':'"+rowId+"_PROD_TYPE','P':'ProdType'}");
															//lookupParam="DR_CUST_ACC_CUSTID,FEE_DR_TOTAL_CCY"
															//alert(getRowIDByFieldId(this.id));
															//this.setAttribute("lookupFire","YES");
															$("#LOOKUPFIRE").val("YES");
															lookupOnFocus(this,'QueryAccount_CUSTLookup',"DR_CUST_ACC_CUSTID,"+getRowIDByFieldId(this.id)+"_DR_ACCOUNT_CCY");
															
//															inqireAccountNo(
//															this,
//															'QureyAccount_CUST',
//															$('#'+getRowIDByFieldId(this.id)+'_DR_ACCOUNT_CCY').val(),
//															$('#DR_CUST_ACC_CUSTID').val());
															}
															}
														}
														
												 ]
							}	
						},
						{name:'SUBMARKS',index:'SUBMARKS',sortable:false,editable:editAble,hidden:false,
							editoptions:{
								dataEvents:[
													{type:'change',fn:function(e){if('20120' ==$('#'+getRowIDByFieldId(this.id)+'_SUBMARKS').val()){alert("待核查账号不能直接扣款.请确认！")}}},
													{type:'focus',fn:function(e){$('#'+getRowIDByFieldId(this.id)+'_SUBMARKS').attr("disabled",true);}},
													{type:'click',fn:function(e){$('#'+getRowIDByFieldId(this.id)+'_SUBMARKS').attr("disabled",true);}}
												  ]
							}
						},
						{name:'ACC_ATTR',index:'ACCOUNT_ATTR',sortable:false,edittype:'select',width:90,editable:editAble,
			        		editoptions: {
			        			value:"K:对公客户账号;N:内部账号",
			        			dataEvents:[{
										type:'change',
										fn:function(e){
											// 清空账号和科目号
			        						var rowId = getRowIDByFieldId(this.id);
											setGridValue({"gridName":GridName,"rowId":rowId,"fieldName":"DR_ACCOUNT_NO","value":""});
											setGridValue({"gridName":GridName,"rowId":rowId,"fieldName":"SUBMARKS","value":""});
											setInqAccInfo(rowId,GridName);
										}
								}]
			        		},
			        		formatter:function(cellvalue, options, rowObject){
								return getGridSelectFormatter(cellvalue, options, rowObject);
							},
							unformat:function(cellvalue, options, rowObject){
								return getGridSelectUnformat(cellvalue, options, rowObject);
							}
		        		},
						{name:'DR_DESC',index:'DR_DESC',formatter:'text'},
						{name:'DR_PP_BUY_RATE',index:'DR_PP_BUY_RATE',formatter:'number',formatoptions:{decimalPlaces:6},hidden:true},
						{name:'DR_PP_SEL_RATE',index:'DR_PP_SEL_RATE',formatter:'number',formatoptions:{decimalPlaces:6},hidden:true},
						{name:'ACC_CNY',index:'ACC_CNY',formatter:'number',hidden:true},
						{name:'ACC_PP_CNY',index:'ACC_PP_CNY',formatter:'number',hidden:true},
						{name:'SEQ_NO',index:'SEQ_NO',sortable:false,editable:editAble,hidden:false,
							editoptions:{
								dataEvents:[
													{type:'focus',fn:function(e){$('#'+getRowIDByFieldId(this.id)+'_SEQ_NO').attr("disabled",true);}},
													{type:'click',fn:function(e){$('#'+getRowIDByFieldId(this.id)+'_SEQ_NO').attr("disabled",true);}}
												  ]
							}
						},
						{name:'PROD_TYPE',index:'PROD_TYPE',sortable:false,editable:editAble,hidden:false,
							editoptions:{
								dataEvents:[
													{type:'focus',fn:function(e){$('#'+getRowIDByFieldId(this.id)+'_PROD_TYPE').attr("disabled",true);}},
													{type:'click',fn:function(e){$('#'+getRowIDByFieldId(this.id)+'_PROD_TYPE').attr("disabled",true);}}
												  ]
							}
						},
						],
		onSelectRow: function(rowId,status){
			saveDrData(GridName);
			if(GridFlag){
				currRowIdDR = rowId;
				currRowData = jQuery('#'+GridName).jqGrid('getRowData',rowId);
			}else{
				currRowIdDR0 = rowId;
				currRowData0 = jQuery('#'+GridName).jqGrid('getRowData',rowId);
			}
			editDrData(GridName);
			saveAnotherGrid(GridName);
		},
		ondblClickRow:function(rowId,iRow,iCol,e){
			if(rowId){
				if(GridFlag){
					currRowIdDR = rowId;
					currRowData = jQuery('#'+GridName).jqGrid('getRowData',rowId);
				}else{
					currRowIdDR0 = rowId;
					currRowData0 = jQuery('#'+GridName).jqGrid('getRowData',rowId);
				}
				editDrData(GridName);
			}
		}
    }).navGrid('#'+GridBar,{edit:false,add:false,del:false,view:false,search:false,refresh:false});
	createDrPageButton(clickEnable,GridName);
}

function setJshFlagByCcy(GridName){
	var rowData ;
	var allRows = jQuery("#"+GridName).jqGrid('getDataIDs');
	var ccy1 = "",ccy2 = "", amt = 0,jshFlag = false;thFlag = false;
	$.each( allRows, function(i, n){
		jQuery("#"+GridName).jqGrid('saveRow',allRows[i],null,'clientArray');// modify by liaorizhi 20121101 
		
		rowData = jQuery('#'+GridName).jqGrid('getRowData',n);
		ccy1 = rowData.DR_ACCOUNT_CCY;
		ccy2 = rowData.DR_SOURCE_CCY;
		amt = FormatStr2Amt(rowData.DR_SOURCE_AMT);
		
		if( amt > 0 && ccy1 != null && ccy2 != null && ccy1 != "" && ccy2 != "" && ccy1 != ccy2 && ( ccy1 == "CNY" || ccy2 == "CNY" ) ){
			jshFlag = true;
		}
		if( amt > 0 && ccy1 != null && ccy2 != null && ccy1 != "" && ccy2 != "" && ccy1 != ccy2 && ccy1 != "CNY" && ccy2 != "CNY"  ){
			thFlag = true;
		}
	});
	var trans_key = getFieldValue(document.UTFORM.TRANS_KEY);
	
	var srcCcy = rowData.DR_SOURCE_CCY;
	var eSrcAmt = FormatStr2Amt(getGridData("DRCUSTACC_GRID", "DR_SOURCE_AMT", 2));
	var eTrcAmt = FormatStr2Amt(getGridData("DRCUSTACC_GRID", "DR_SOURCE_AMT", 3));
	var sql1="select ASK_CONT_AMT from CLR_ASPRC_DEFTAMT where ASK_CONT_CCY='"+srcCcy+"'"
	var count1 = executeQuery("INFO1",sql1);
	if(count1!="1") {return;}
    var askcontamt=getTableFieldValue("INFO1",1,"ASK_CONT_AMT");
	if( jshFlag ){ 
		if(askcontamt<=eSrcAmt){
			setProperty(document.UTFORM.DR_ASKPRICE_NO,"M");
		}else{
			setProperty(document.UTFORM.DR_ASKPRICE_NO,"O");
		}
		setProperty($('#DR_CUST_ACC_JSHDM').get(0),"M");
		setProperty($('#DR_CUST_ACC_JSHDX').get(0),"M");
		
	}else{
		setProperty(document.UTFORM.DR_ASKPRICE_NO,"O");
		setFieldValue(document.UTFORM.DR_ASKPRICE_NO,"");
		setProperty($('#DR_CUST_ACC_JSHDM').get(0),"O");
		setProperty($('#DR_CUST_ACC_JSHDX').get(0),"O");
	}
	if (thFlag){
		if(askcontamt<=eTrcAmt){
			setProperty(document.UTFORM.DR_ASKPRICE_NO,"M");
		}else{
			setProperty(document.UTFORM.DR_ASKPRICE_NO,"O");
		}
	}
}

function checkDrGridData(){
	var allRows = jQuery("#DRCUSTACC_GRID").jqGrid('getDataIDs');
	var data;
	for( var i = 0; i < allRows.length;i++ ){
		jQuery('#DRCUSTACC_GRID').jqGrid('saveRow',allRows[i],null,'clientArray');
		data = jQuery('#DRCUSTACC_GRID').jqGrid('getRowData',allRows[i]);
		if( data.DR_SOURCE_AMT && FormatStr2Amt( data.DR_SOURCE_AMT ) > 0 && !data.DR_ACCOUNT_NO ){
			alert("账号不能为空,请检查!");
			// add by fanrui for报错聚焦 begin
			currRowIdDR = i+1;
			jQuery('#DRCUSTACC_GRID').jqGrid('editRow',allRows[i],null,'clientArray');
			setFocus($("#" + allRows[i] + "_DR_ACCOUNT_NO")[0]);
			// add by fanrui for报错聚焦 end
			return false;
		}
	}
	return true;
}

function changeTransExratesDr(GridName,rowId,rateValue,rateType){
	if( isNaN(rateValue) ){
		alert("请输入数字!!");
		jQuery('#'+GridName).jqGrid('restoreRow',rowId);
		return;
	}
	if( rateValue * 1 < 0 ){
		alert("请输入正数!!");
		jQuery('#'+GridName).jqGrid('restoreRow',rowId);
		return;
	}
	if( !__ExRateData ) return;
	
	jQuery('#'+GridName).jqGrid('saveRow',rowId,null,'clientArray');
	var rowData = jQuery('#'+GridName).jqGrid('getRowData',rowId);
	
	var srcCcy = rowData.DR_SOURCE_CCY;
	var accCCY = rowData.DR_ACCOUNT_CCY;
	var srcAmt = FormatStr2Amt(rowData.DR_SOURCE_AMT);
	var accAmt = srcAmt.accMul( getExRateByType(srcCcy,accCCY,__FEE_CURR_RATE_TYPE_SB) );
	var accCny = srcAmt.accMul(getExRateByType(srcCcy,__SYS_LOCALCCY,__FEE_CURR_RATE_TYPE_SB));
	var accPpCny = srcAmt.accMul(getExRateByType(srcCcy,__SYS_LOCALCCY,__FEE_CURR_RATE_TYPE_PPSB));
	
	if( srcAmt == 0 ) $('#'+GridName).jqGrid('setRowData',rowId,{DR_ACCOUNT_NO:''});
		
	accAmt = FormatAmtByCCY(accAmt,accCCY);
	srcAmt = FormatAmtByCCY(srcAmt,srcCcy);

	$('#'+GridName).jqGrid('setRowData',rowId,{
		DR_SOURCE_AMT:srcAmt,
		DR_ACCOUNT_AMT:accAmt,
		ACC_CNY:accCny,
		ACC_PP_CNY:accPpCny});
	
	var ssAmt = getAmtByGridName(GridName);
	var allRows = jQuery("#"+GridName).jqGrid('getDataIDs');
	var ssRowData;
	$.each( allRows, function(i, n){	
		if( n != 1 ){
			jQuery('#'+GridName).jqGrid('saveRow',n,null,'clientArray');
			ssRowData = jQuery('#'+GridName).jqGrid('getRowData',n);
			ssAmt = ssAmt - FormatStr2Amt(ssRowData.DR_SOURCE_AMT);
			
			var eSrcCcy = ssRowData.DR_SOURCE_CCY;
			var eSrcAmt = FormatStr2Amt(ssRowData.DR_SOURCE_AMT);
			var eAaccCCY = ssRowData.DR_ACCOUNT_CCY;
			var eAccAmt = FormatAmtByCCY( eSrcAmt.accMul( getExRateByType(eSrcCcy,eAaccCCY,__FEE_CURR_RATE_TYPE_SB) ), eAaccCCY);
			var eAccCny = eSrcAmt.accMul(getExRateByType(eSrcCcy,__SYS_LOCALCCY,__FEE_CURR_RATE_TYPE_SB));
			var eAccPpCny = eSrcAmt.accMul(getExRateByType(eSrcCcy,__SYS_LOCALCCY,__FEE_CURR_RATE_TYPE_PPSB));
			
			if( rateType == "Buy" && accCCY == eAaccCCY ){
				$('#'+GridName).jqGrid('setRowData',n,{DR_BUY_RATE:rateValue});
			}else if( rateType == "Sell" ){
				$('#'+GridName).jqGrid('setRowData',n,{DR_SELL_RATE:rateValue});
			}
			$('#'+GridName).jqGrid('setRowData',n,{DR_ACCOUNT_AMT:eAccAmt,ACC_CNY:eAccCny,ACC_PP_CNY:eAccPpCny});
		}
	});
	
	if( ssAmt == 0 ) $('#'+GridName).jqGrid('setRowData',1,{DR_ACCOUNT_NO:''});
	
	if( rateType == "Buy"  && accCCY == srcCcy  ){
		$('#'+GridName).jqGrid('setRowData',1,{DR_BUY_RATE:rateValue});
	}else if( rateType == "Sell" ){
		$('#'+GridName).jqGrid('setRowData',1,{DR_SELL_RATE:rateValue});
	}
	var sssAmt = FormatAmtByCCY(ssAmt,srcCcy);
	$('#'+GridName).jqGrid('setRowData',1,{
		DR_SOURCE_AMT:sssAmt,
		DR_ACCOUNT_AMT:sssAmt,
		ACC_CNY:getExRateByType(srcCcy,__SYS_LOCALCCY,__FEE_CURR_RATE_TYPE_SB).accMul(ssAmt),
		ACC_PP_CNY:getExRateByType(srcCcy,__SYS_LOCALCCY,__FEE_CURR_RATE_TYPE_PPSB).accMul(ssAmt)
	});
}

// modify by liaorizhi 20120806 start
function changeTransExratesDrPP(rowDataArr){
	if( !__ExRateData || !rowDataArr || rowDataArr.length == 0 ) return;
	
	var allRows = jQuery("#DRCUSTACC_GRID").jqGrid('getDataIDs');
	var obj,rowData;
	for(var key in rowDataArr){
		obj = rowDataArr[key];
		var askType = obj.TRANS_TYPE;
		var selCcy = obj.SEL_CCY;
		var buyCcy = obj.BUY_CCY;


		$.each( allRows, function(i, n){
			jQuery('#DRCUSTACC_GRID').jqGrid('saveRow',n,null,'clientArray');
			rowData = jQuery('#DRCUSTACC_GRID').jqGrid('getRowData',n);

			if (buyCcy == rowData.DR_ACCOUNT_CCY && "JH" == askType) {
				$('#DRCUSTACC_GRID').jqGrid('setRowData',n,{DR_BUY_RATE:obj.BUYRATE});
				$('#DRCUSTACC_GRID').jqGrid('setRowData',n,{DR_PP_SEL_RATE:obj.PPSELRATE});
			} else if (selCcy == rowData.DR_SOURCE_CCY && "SH" == askType) {
				$('#DRCUSTACC_GRID').jqGrid('setRowData',n,{DR_SELL_RATE:obj.SELRATE});
				$('#DRCUSTACC_GRID').jqGrid('setRowData',n,{DR_PP_BUY_RATE:obj.PPBUYRATE});
			}else if ("TH" == askType) {
				if (buyCcy == rowData.DR_ACCOUNT_CCY) {
					$('#DRCUSTACC_GRID').jqGrid('setRowData',n,{DR_BUY_RATE:obj.BUYRATE});
					$('#DRCUSTACC_GRID').jqGrid('setRowData',n,{DR_PP_SEL_RATE:obj.PPSELRATE});
				}
				if (selCcy == rowData.DR_SOURCE_CCY) {
					$('#DRCUSTACC_GRID').jqGrid('setRowData',n,{DR_SELL_RATE:obj.SELRATE});
					$('#DRCUSTACC_GRID').jqGrid('setRowData',n,{DR_PP_BUY_RATE:obj.PPBUYRATE});
				}
			}
		});
		$('#DR_ASKPRICE_NO').val(obj.ASKPRICE_NO);
	}
}

// add by liaorizhi 20120912 选择询价编号后计算扣客户账金额
function calDrCustJshAmt(){
	var allRows = jQuery("#DRCUSTACC_GRID").jqGrid('getDataIDs');
	
	$.each( allRows, function(i, n){
		jQuery('#DRCUSTACC_GRID').jqGrid('saveRow',n,null,'clientArray');
		rowData = jQuery('#DRCUSTACC_GRID').jqGrid('getRowData',n);
		
		var drCustCcy = rowData.DR_ACCOUNT_CCY;
		var transCcy  = rowData.DR_SOURCE_CCY;
		var drSourceAmt = FormatStr2Amt(rowData.DR_SOURCE_AMT);
		var drCustAmt = drSourceAmt * getExRateByType(transCcy,drCustCcy,"SB");
		
		$('#DRCUSTACC_GRID').jqGrid('setRowData',n,{DR_ACCOUNT_AMT:FormatAmtByCCY(drCustAmt,drCustCcy)});
	});	
}

// add by liaorizhi 20120912 对选择的询价编号校验
function chooseAskNoCheckDr(rowDataArr){
	var allRows = jQuery("#DRCUSTACC_GRID").jqGrid('getDataIDs');
	var obj = rowDataArr[0]; // 一次只能选择一个询价编号
	var askType =  obj.TRANS_TYPE;
	var bool = false;
	
	$.each( allRows, function(i, n){
		jQuery('#DRCUSTACC_GRID').jqGrid('saveRow',n,null,'clientArray');
		rowData = jQuery('#DRCUSTACC_GRID').jqGrid('getRowData',n);
		
		var drCustCcy = rowData.DR_ACCOUNT_CCY;
		var transCcy  = rowData.DR_SOURCE_CCY;
		var drCustAmt = FormatStr2Amt(rowData.DR_ACCOUNT_AMT);
		
		if(drCustCcy != transCcy && drCustAmt > 0){
			if(drCustCcy == "CNY" && askType == "SH"){
				return bool = true;
			}else if(transCcy == "CNY" && askType == "JH"){
				return bool = true;
			}else if(askType == "TH" && drCustCcy != "CNY" && transCcy != "CNY"){
				return bool = true;
			}
		}
	});
	if(!bool){
		alert("错误提示：该笔询价编号适用["+askType+"]，请检查！");
		$('#DR_ASKPRICE_NO').val('');
	}

	return bool;
}

function lookupOnChangeSYS(lookupName,rowDataArr) {
	if (lookupName == "ASKPRICELK" && rowDataArr.length > 0) {
		if(!chooseAskNoCheckDr(rowDataArr)) return;
		updateSysExrateByASK(rowDataArr);
		changeTransExratesDrPP(rowDataArr);
		calDrCustJshAmt();
		if(typeof(onDrCustAccChange) == 'function' ){
			onDrCustAccChange();
		}
	}
}

function setInqAccInfo(rowId,GridName){
	var inqCcy = getGridValue({"gridName":GridName,"rowId":rowId,"fieldName":"DR_ACCOUNT_CCY"});
	var inqAcct = getGridValue({"gridName":GridName,"rowId":rowId,"fieldName":"DR_ACCOUNT_NO"});
	$('#DR_INQ_CCY').val(inqCcy);
	$('#DR_INQ_ACCT').val(inqAcct);
}

//add by yangcl for 用于拼装Dr客户帐xml明细数据
function formatDrCustAccXml() {
	try {
		$("#drCustAccXml").val("");
		var formatDrCustAccXml = "<?xml version='1.0' encoding='UTF-8'?><drCustAccXml>";
		if ($('#DRCUSTACC_GRID').get(0) != null) {
			var rowData;
			var allRows = jQuery("#DRCUSTACC_GRID").jqGrid('getDataIDs');
			$.each(allRows, function(i, n) {
				jQuery('#DRCUSTACC_GRID').jqGrid('saveRow', n, null, 'clientArray');
			});
			if (allRows != null && allRows.length > 0) {
				var drAccountCcy = '', drAccountAmt = '', drAccountNo = '';
				$.each(allRows,
					function(i, n) {
						rowData = jQuery('#DRCUSTACC_GRID').jqGrid('getRowData', n);
						drAccountCcy = rowData.DR_ACCOUNT_CCY;
						drAccountAmt = FormatStr2Amt(rowData.DR_ACCOUNT_AMT);
					    drAccountNo = rowData.DR_ACCOUNT_NO;
					    //srcCcy = rowData.DR_SOURCE_CCY;
					   // srcAmt=FormatStr2Amt(rowData.DR_SOURCE_AMT);
					   // buyRate=rowData.DR_BUY_RATE;
					  //  selRate=rowData.DR_SEL_RATE;
					   // drflag=rowData.DR_DRFLAG;
					    //custaccCny=rowData.ACC_CNY;
					    //accFlag=rowData.DR_ACCFLAG;
						if (drAccountAmt != 0 && "" != drAccountNo) {
							formatDrCustAccXml = formatDrCustAccXml + "<custAccDetail ACCNO=\"" + drAccountNo + "\" CUSTACC_AMT=\"" + drAccountAmt + "\"  CUSTACC_CCY=\"" + drAccountCcy + "\" />";
                        }
					 }
				);
				formatDrCustAccXml = formatDrCustAccXml + "</drCustAccXml>";
				$('#drCustAccXml').val(formatDrCustAccXml);
			}
		}
	} catch (e) {
         $("#drCustAccXml").val(""); 
	}
}                     