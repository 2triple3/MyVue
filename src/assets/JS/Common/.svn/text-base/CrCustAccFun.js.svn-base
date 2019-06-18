/**
 * 扣客户帐处理
 */
//Function For Cr By WL 20100427

var CR_CUST_ID = "";
var CR_CUST_ACC_AMT = 0;
var CR_CUST_ACC_CCY = "";

var __changeCrAmt = 0;
var __changeCrPreAmt = 0;
var __changeCrPreAmt2 = 0;

var CR_IS_CREATE_BAR_FLAG = false;
/**
 * @param custId
 * @param custOrgCode
 * @param crCustAccAmt
 * @param crCustAccCcy
*/
function initCrCustAcc(checkFlag){
	CR_CUST_ID = $('#CR_CUST_ACC_CUSTID').val();
	if( CR_CUST_ID == "" ) return;
	setExRateCustid(CR_CUST_ID);
	var feeCcy0 = $('#FEE_CR_TOTAL_CCY').val();
	
	if( feeCcy0 != null && feeCcy0 != ''){
		//start add by lrz 20120730
		var rate = getExRateByCcy(feeCcy0);
		
		if(rate == null || rate == ""){
			alert("获取汇率失败：["+feeCcy0+"]没有维护，请检查！");
			return;
		}
		//end add by lrz 20120730
	
		var amt = getFieldValue( $('#FEE_CR_TOTAL_AMT').get(0) );

		$('#FEE_CR_TOTAL_BUYRATE').val( getCCYRateByType(feeCcy0,'B') );
		$('#FEE_CR_TOTAL_SELRATE').val( getCCYRateByType(feeCcy0,'S') );
		$('#FEE_CR_TOTAL_PP_BUYRATE').val( getCCYRateByType(feeCcy0,'PB') );
		$('#FEE_CR_TOTAL_PP_SELRATE').val( getCCYRateByType(feeCcy0,'PS') );
		$('#FEE_CR_TOTAL_CNY').val( amt * getExRateByType(feeCcy0,__SYS_LOCALCCY,__FEE_CURR_RATE_TYPE_BS) );
		$('#FEE_CR_TOTAL_PP_CNY').val( amt * getExRateByType(feeCcy0,__SYS_LOCALCCY,__FEE_CURR_RATE_TYPE_PPBS) );
	}
	
	var hcCcy0 = $('#HC_CUST_ACC_CCY').val();
	if( hcCcy0 != null && hcCcy0 != '' ){
		//start add by lrz 20120730
		var rate = getExRateByCcy(hcCcy0);
		
		if(rate == null || rate == ""){
			alert("获取汇率失败：["+hcCcy0+"]没有维护，请检查！");
			return;
		}
		//end add by lrz 20120730
		var amt1 = getFieldValue( $('#HC_CUST_ACC_AMT').get(0) );
		$('#HC_CUST_ACC_BUYRATE').val( getCCYRateByType(hcCcy0,'B') );
		$('#HC_CUST_ACC_SELRATE').val( getCCYRateByType(hcCcy0,'S') );
		$('#HC_CUST_ACC_PP_BUYRATE').val( getCCYRateByType(hcCcy0,'PB') );
		$('#HC_CUST_ACC_PP_SELRATE').val( getCCYRateByType(hcCcy0,'PS') );
		$('#HC_CUST_ACC_CNY').val( amt1 * getExRateByType(hcCcy0,__SYS_LOCALCCY,__FEE_CURR_RATE_TYPE_BS) );
		$('#HC_CUST_ACC_PP_CNY').val( amt1 * getExRateByType(hcCcy0,__SYS_LOCALCCY,__FEE_CURR_RATE_TYPE_PPBS) );
	}
	CR_CUST_ACC_AMT = getFieldValue( $('#CR_CUST_ACC_AMT').get(0) );
	CR_CUST_ACC_CCY = $('#CR_CUST_ACC_CCY').val();
	if( CR_CUST_ACC_CCY == '' ){
		$('#CRCUSTACC_GRID').GridUnload();
		CR_IS_CREATE_BAR_FLAG = false;
		createCrGrid('jsonstring','',true,true);
		createCrPageButton(true);
		return;
	}
	initCrGrid();

	if( checkFlag == null || checkFlag != "checked" ){
	 	checkFlag = document.UTFORM.CHECK_ACCOUNT.checked;
	 	if( checkFlag ) document.UTFORM.CHECK_ACCOUNT.checked = false;
	 }
	return true;
}

function initCommCrMessage(){
	CR_CUST_ID = $('#CR_CUST_ACC_CUSTID').val();
	if( CR_CUST_ID == "" ) return;

	setExRateCustid(CR_CUST_ID);
	var feeCcy0 = $('#FEE_CR_TOTAL_CCY').val();
	if( feeCcy0 != null && feeCcy0 != '' ){
		var amt = getFieldValue( $('#FEE_CR_TOTAL_AMT').get(0) );
		$('#FEE_CR_TOTAL_BUYRATE').val( getCCYRateByType(feeCcy0,'B') );
		$('#FEE_CR_TOTAL_SELRATE').val( getCCYRateByType(feeCcy0,'S') );
		$('#FEE_CR_TOTAL_PP_BUYRATE').val( getCCYRateByType(feeCcy0,'PB') );
		$('#FEE_CR_TOTAL_PP_SELRATE').val( getCCYRateByType(feeCcy0,'PS') );
		$('#FEE_CR_TOTAL_CNY').val( amt * getExRateByType(feeCcy0,__SYS_LOCALCCY,__FEE_CURR_RATE_TYPE_BS) );
		$('#FEE_CR_TOTAL_PP_CNY').val( amt * getExRateByType(feeCcy0,__SYS_LOCALCCY,__FEE_CURR_RATE_TYPE_PPBS) );
	}
	
	var hcCcy0 = $('#HC_CUST_ACC_CCY').val();
	if( hcCcy0 != null && hcCcy0 != '' ){
		var amt1 = getFieldValue( $('#HC_CUST_ACC_AMT').get(0) );
		$('#HC_CUST_ACC_BUYRATE').val( getCCYRateByType(hcCcy0,'B') );
		$('#HC_CUST_ACC_SELRATE').val( getCCYRateByType(hcCcy0,'S') );
		$('#HC_CUST_ACC_PP_BUYRATE').val( getCCYRateByType(hcCcy0,'PB') );
		$('#HC_CUST_ACC_PP_SELRATE').val( getCCYRateByType(hcCcy0,'PS') );
		$('#HC_CUST_ACC_CNY').val( amt1 * getExRateByType(hcCcy0,__SYS_LOCALCCY,__FEE_CURR_RATE_TYPE_BS) );
		$('#HC_CUST_ACC_PP_CNY').val( amt1 * getExRateByType(hcCcy0,__SYS_LOCALCCY,__FEE_CURR_RATE_TYPE_PPBS) );
	}
	
	CR_CUST_ACC_AMT = getFieldValue( $('#CR_CUST_ACC_AMT').get(0) );
	CR_CUST_ACC_CCY = $('#CR_CUST_ACC_CCY').val();
}

function initCrGrid(){
	if( !CR_CUST_ID ||! CR_CUST_ACC_CCY ) return;
	if( !CR_CUST_ACC_AMT) CR_CUST_ACC_AMT = 0;
	$('#CRCUSTACC_GRID').GridUnload();
	CR_IS_CREATE_BAR_FLAG = false;
    createCrGrid('jsonstring','',true,true);
    createCrPageButton(true);
    
	var initAmt = FormatAmtByCCY(CR_CUST_ACC_AMT,CR_CUST_ACC_CCY);
	
	var firstCrRow = {
							CR_ACCOUNT_CCY:CR_CUST_ACC_CCY,
							CR_BUY_RATE:getCCYRateByType(CR_CUST_ACC_CCY,'B'),
							CR_SELL_RATE:getCCYRateByType(CR_CUST_ACC_CCY,'S'),
							CR_SOURCE_CCY:CR_CUST_ACC_CCY,
							CR_SOURCE_AMT:initAmt,
							CR_ACCOUNT_AMT:initAmt,
							CR_ACCOUNT_NO:'',
							CR_PP_BUY_RATE:getCCYRateByType(CR_CUST_ACC_CCY,'PB'),
							CR_PP_SEL_RATE:getCCYRateByType(CR_CUST_ACC_CCY,'PS'),
							ACC_CNY:CR_CUST_ACC_AMT * getExRateByType(CR_CUST_ACC_CCY,__SYS_LOCALCCY,'BS'),
							ACC_PP_CNY:CR_CUST_ACC_AMT * getExRateByType(CR_CUST_ACC_CCY,__SYS_LOCALCCY,'PPBS'),
							IS_CHECK_ACCNO:'',
							CR_DESC:'原币入账',
							ACC_ATTR:"K",
							SEQ_NO:'',
							PROD_TYPE:''
						};
	 var secondCrRow = {
							CR_ACCOUNT_CCY:__SYS_LOCALCCY,
							CR_BUY_RATE:getCCYRateByType(CR_CUST_ACC_CCY,'B'),
							CR_SELL_RATE:getCCYRateByType(__SYS_LOCALCCY,'S'),
							CR_SOURCE_CCY:CR_CUST_ACC_CCY,
							CR_SOURCE_AMT:'0.00',
							CR_ACCOUNT_AMT:'0.00',
							CR_ACCOUNT_NO:'',
							// modify by liaorizhi 20120911 平盘价显示错误 start
							CR_PP_BUY_RATE:getCCYRateByType(__SYS_LOCALCCY,'PB'),
							CR_PP_SEL_RATE:getCCYRateByType(CR_CUST_ACC_CCY,'PS'),
							// modify by liaorizhi 20120911 平盘价显示错误 end
							ACC_CNY:CR_CUST_ACC_AMT * getExRateByType(CR_CUST_ACC_CCY,__SYS_LOCALCCY,'BS'),
							ACC_PP_CNY:CR_CUST_ACC_AMT * getExRateByType(CR_CUST_ACC_CCY,__SYS_LOCALCCY,'PPBS'),
							IS_CHECK_ACCNO:'NO',
							CR_DESC:'结汇入账',
							ACC_ATTR:"K",
							SEQ_NO:'',
							PROD_TYPE:''
						};
	var thirdDrRow = {
							CR_ACCOUNT_CCY:'USD',
							CR_BUY_RATE:getCCYRateByType(CR_CUST_ACC_CCY,'B'),
							CR_SELL_RATE:getCCYRateByType('USD','S'),
							CR_SOURCE_CCY:CR_CUST_ACC_CCY,
							CR_SOURCE_AMT:'0.00',
							CR_ACCOUNT_AMT:'0.00',
							CR_ACCOUNT_NO:'',
							// modify by liaorizhi 20120911 平盘价显示错误 start
							CR_PP_BUY_RATE:getCCYRateByType('USD','PB'),
							CR_PP_SEL_RATE:getCCYRateByType(CR_CUST_ACC_CCY,'PS'),
							// modify by liaorizhi 20120911 平盘价显示错误 end
							ACC_CNY:CR_CUST_ACC_AMT * getExRateByType(CR_CUST_ACC_CCY,__SYS_LOCALCCY,__FEE_CURR_RATE_TYPE_BS),
							ACC_PP_CNY:CR_CUST_ACC_AMT * getExRateByType(CR_CUST_ACC_CCY,__SYS_LOCALCCY,__FEE_CURR_RATE_TYPE_PPBS),
							IS_CHECK_ACCNO:'NO',
							CR_DESC:'套汇入账',
							ACC_ATTR:"K",
							SEQ_NO:'',
							PROD_TYPE:''
						};
						
	jQuery("#CRCUSTACC_GRID").jqGrid('addRowData',1,firstCrRow,'last');
	jQuery("#CRCUSTACC_GRID").jqGrid('addRowData',2,secondCrRow,'last');
	jQuery("#CRCUSTACC_GRID").jqGrid('addRowData',3,thirdDrRow,'last');
	setJshFlagByCcyCr("CRCUSTACC_GRID");
}

function changeCrCcy(aimCCY,rowId){
	jQuery('#CRCUSTACC_GRID').jqGrid('saveRow',rowId,null,'clientArray');
	var rowData = jQuery('#CRCUSTACC_GRID').jqGrid('getRowData',rowId);
	var sorAmt = FormatStr2Amt(rowData.CR_SOURCE_AMT);
	var accAmt = sorAmt * ( getExRateByType(CR_CUST_ACC_CCY,aimCCY,'BS') );
	if( aimCCY == CR_CUST_ACC_CCY ) accAmt = sorAmt;
	accAmt = FormatAmtByCCY(accAmt,aimCCY);
	$('#CRCUSTACC_GRID').jqGrid('setRowData',rowId,{
		CR_BUY_RATE:getCCYRateByType(CR_CUST_ACC_CCY,'B'),
		CR_SELL_RATE:getCCYRateByType(aimCCY,'S'),
		// modify by liaorizhi 20120911 平盘价显示错误 start
		CR_PP_BUY_RATE:getCCYRateByType(aimCCY,'PB'),
		CR_PP_SEL_RATE:getCCYRateByType(CR_CUST_ACC_CCY,'PS'),
		// modify by liaorizhi 20120911 平盘价显示错误 end
		CR_ACCOUNT_AMT:accAmt});

	currRowData = jQuery('#CRCUSTACC_GRID').jqGrid('getRowData',rowId);
	jQuery('#CRCUSTACC_GRID').jqGrid('editRow',rowId);
}

function storeCrData(obj){
	var rowData = jQuery('#CRCUSTACC_GRID').jqGrid('getRowData',1);
	__changeCrAmt = FormatStr2Amt(rowData.CR_SOURCE_AMT);
	__changeCrPreAmt = FormatStr2Amt(obj.value);
}

function storeCrData2(rowid,obj){
	var rowData = jQuery('#CRCUSTACC_GRID').jqGrid('getRowData',1);
	__changeCrAmt = FormatStr2Amt(rowData.CR_SOURCE_AMT);
	__changeCrPreAmt = FormatStr2Amt($('#'+rowid+'_CR_SOURCE_AMT').val());
	__changeCrPreAmt2 = FormatStr2Amt(obj.value);
}

function changeCrAmt(srcAmt,rowId){
	srcAmt = FormatStr2Amt(srcAmt);
	if(srcAmt == ''){
		srcAmt = 0;
	}
	if( (__changeCrAmt * 1 + __changeCrPreAmt * 1) < srcAmt * 1 ) {
		alert("金额["+srcAmt+"]超过["+(__changeCrAmt * 1 + __changeCrPreAmt * 1) +"]!!请检查! ");
		jQuery('#CRCUSTACC_GRID').jqGrid('restoreRow',rowId);
		return;
	}
	if( isNaN(srcAmt) ){
		alert("请输入数字!!");
		jQuery('#CRCUSTACC_GRID').jqGrid('restoreRow',rowId);
		return;
	}
	if( srcAmt * 1 < 0 ){
		alert("请输入正数!!");
		jQuery('#CRCUSTACC_GRID').jqGrid('restoreRow',rowId);
		return;
	}
	
	jQuery('#CRCUSTACC_GRID').jqGrid('saveRow',rowId,null,'clientArray');
	var rowData = jQuery('#CRCUSTACC_GRID').jqGrid('getRowData',rowId);
	var srcCcy = rowData.CR_SOURCE_CCY;
	var accCCY = rowData.CR_ACCOUNT_CCY;
	var accAmt = srcAmt.accMul( getExRateByType(srcCcy,accCCY,'BS') );//锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷  锟斤拷锟絠nit.js
	
	var accCny = srcAmt.accMul(getExRateByType(srcCcy,__SYS_LOCALCCY,'BS'));
	var accPpCny = srcAmt.accMul(getExRateByType(srcCcy,__SYS_LOCALCCY,'PPBS'));
	
	if( srcAmt == 0 ) $('#CRCUSTACC_GRID').jqGrid('setRowData',rowId,{CR_ACCOUNT_NO:''});
	
	if( srcCcy == accCCY ) accAmt = srcAmt;
	accAmt = FormatAmtByCCY(accAmt,accCCY);
	srcAmt = FormatAmtByCCY(srcAmt,srcCcy);
	
	$('#CRCUSTACC_GRID').jqGrid('setRowData',rowId,{
		CR_SOURCE_AMT:srcAmt,
		CR_ACCOUNT_AMT:accAmt,
		ACC_CNY:accCny,
		ACC_PP_CNY:accPpCny,
		CR_BUY_RATE:getCCYRateByType(srcCcy,"B"),
		CR_SELL_RATE:getCCYRateByType(accCCY,"S"),
		// modify by liaorizhi 20120911 平盘价显示错误 start
		CR_PP_BUY_RATE:getCCYRateByType(accCCY,"PB"),
		CR_PP_SEL_RATE:getCCYRateByType(srcCcy,"PS")});
		// modify by liaorizhi 20120911 平盘价显示错误 end
	
	var ssAmt = CR_CUST_ACC_AMT;
	var allRows = jQuery("#CRCUSTACC_GRID").jqGrid('getDataIDs');
	var ssRowData;
	$.each( allRows, function(i, n){
		if( n != 1 ){
			ssRowData = jQuery('#CRCUSTACC_GRID').jqGrid('getRowData',n);
			ssAmt = ssAmt - FormatStr2Amt(ssRowData.CR_SOURCE_AMT);
			
			$('#CRCUSTACC_GRID').jqGrid('setRowData',n,{
				CR_BUY_RATE:getCCYRateByType(ssRowData.CR_SOURCE_CCY,"B"),
				CR_SELL_RATE:getCCYRateByType(ssRowData.CR_ACCOUNT_CCY,"S"),
				// modify by liaorizhi 20120911 平盘价显示错误 start
				CR_PP_BUY_RATE:getCCYRateByType(ssRowData.CR_ACCOUNT_CCY,"PB"),
				CR_PP_SEL_RATE:getCCYRateByType(ssRowData.CR_SOURCE_CCY,"PS")});
				// modify by liaorizhi 20120911 平盘价显示错误 end
		}
	});
	
	if( ssAmt == 0 ) $('#CRCUSTACC_GRID').jqGrid('setRowData',1,{CR_ACCOUNT_NO:''});
	
	var sssAmt = FormatAmtByCCY(ssAmt,srcCcy);
	ssRowData = jQuery('#CRCUSTACC_GRID').jqGrid('getRowData',1);
	$('#CRCUSTACC_GRID').jqGrid('setRowData',1,{
								CR_SOURCE_AMT:sssAmt,
								CR_ACCOUNT_AMT:sssAmt,
								ACC_CNY:getExRateByType(srcCcy,__SYS_LOCALCCY,'BS') * ssAmt,
								ACC_PP_CNY:getExRateByType(srcCcy,__SYS_LOCALCCY,'PPBS') * ssAmt,
								CR_BUY_RATE:getCCYRateByType(ssRowData.CR_SOURCE_CCY,"B"),
								CR_SELL_RATE:getCCYRateByType(ssRowData.CR_ACCOUNT_CCY,"S"),
								// modify by liaorizhi 20120911 平盘价显示错误 start
								CR_PP_BUY_RATE:getCCYRateByType(ssRowData.CR_ACCOUNT_CCY,"PB"),
								CR_PP_SEL_RATE:getCCYRateByType(ssRowData.CR_SOURCE_CCY,"PS")});
								// modify by liaorizhi 20120911 平盘价显示错误 end
	currRowData = jQuery('#CRCUSTACC_GRID').jqGrid('getRowData',rowId);
	//jQuery('#CRCUSTACC_GRID').jqGrid('editRow',rowId);
}

function changeCrAmt2(accAmt,rowId){
	accAmt = FormatStr2Amt(accAmt);
	if(accAmt == ''){
		accAmt = 0;
	}
	if( isNaN(accAmt) ){
		alert("请输入数字!!");
		jQuery('#CRCUSTACC_GRID').jqGrid('restoreRow',rowId);
		return;
	}
	if( accAmt * 1 < 0 ){
		alert("请输入正数!!");
		jQuery('#CRCUSTACC_GRID').jqGrid('restoreRow',rowId);
		return;
	}
	
	jQuery('#CRCUSTACC_GRID').jqGrid('saveRow',rowId,null,'clientArray');
	var rowData = jQuery('#CRCUSTACC_GRID').jqGrid('getRowData',rowId);
	var srcCcy = rowData.CR_SOURCE_CCY;
	var accCCY = rowData.CR_ACCOUNT_CCY;
	var srcAmt = accAmt.accMul ( getExRateByType(accCCY,srcCcy,'SB') );
	
	if( (__changeCrAmt * 1 + __changeCrPreAmt * 1) < srcAmt * 1 ) {
		alert("金额["+srcAmt+"/"+srcCcy+"] ["+accAmt+"/"+accCCY+"] 超过 ["+(__changeCrAmt * 1 + __changeCrPreAmt * 1)+"]!! 请检查! ");
		$('#CRCUSTACC_GRID').jqGrid('setRowData',rowId,{CR_ACCOUNT_AMT:__changeCrPreAmt2});
		jQuery('#CRCUSTACC_GRID').jqGrid('restoreRow',rowId);
		return;
	}
	
	var accCny = srcAmt.accMul( getExRateByType(srcCcy,__SYS_LOCALCCY,'BS'));
	var accPpCny = srcAmt.accMul( getExRateByType(srcCcy,__SYS_LOCALCCY,'PPBS'));
	
	if( accAmt == 0 ) $('#CRCUSTACC_GRID').jqGrid('setRowData',rowId,{CR_ACCOUNT_NO:''});
	
	if( srcCcy == accCCY ) srcAmt = accAmt;
	accAmt = FormatAmtByCCY(accAmt,accCCY);
	srcAmt = FormatAmtByCCY(srcAmt,srcCcy);
	
	$('#CRCUSTACC_GRID').jqGrid('setRowData',rowId,{
		CR_SOURCE_AMT:srcAmt,
		CR_ACCOUNT_AMT:accAmt,
		ACC_CNY:accCny,
		ACC_PP_CNY:accPpCny,
		CR_BUY_RATE:getCCYRateByType(srcCcy,"B"),
		CR_SELL_RATE:getCCYRateByType(accCCY,"S"),
		// modify by liaorizhi 20120911 平盘价显示错误 start
		CR_PP_BUY_RATE:getCCYRateByType(accCCY,"PB"),
		CR_PP_SEL_RATE:getCCYRateByType(srcCcy,"PS")});
		// modify by liaorizhi 20120911 平盘价显示错误end
	
	var ssAmt = CR_CUST_ACC_AMT;
	var allRows = jQuery("#CRCUSTACC_GRID").jqGrid('getDataIDs');
	var ssRowData;
	$.each( allRows, function(i, n){	
		if( n != 1 ){
			ssRowData = jQuery('#CRCUSTACC_GRID').jqGrid('getRowData',n);
			ssAmt = ssAmt - FormatStr2Amt(ssRowData.CR_SOURCE_AMT);
			
			$('#CRCUSTACC_GRID').jqGrid('setRowData',n,{
				CR_BUY_RATE:getCCYRateByType(ssRowData.CR_SOURCE_CCY,"B"),
				CR_SELL_RATE:getCCYRateByType(ssRowData.CR_ACCOUNT_CCY,"S"),
				// modify by liaorizhi 20120911 平盘价显示错误 start
				CR_PP_BUY_RATE:getCCYRateByType(ssRowData.CR_ACCOUNT_CCY,"PB"),
				CR_PP_SEL_RATE:getCCYRateByType(ssRowData.CR_SOURCE_CCY,"PS")});
				// modify by liaorizhi 20120911 平盘价显示错误 end
		}
	});
	
	if( ssAmt == 0 ) $('#CRCUSTACC_GRID').jqGrid('setRowData',1,{CR_ACCOUNT_NO:''});
	
	ssRowData = jQuery('#CRCUSTACC_GRID').jqGrid('getRowData',1);
	var sssAmt = FormatAmtByCCY(ssAmt,srcCcy);
	$('#CRCUSTACC_GRID').jqGrid('setRowData',1,{
								CR_SOURCE_AMT:sssAmt,
								CR_ACCOUNT_AMT:sssAmt,
								ACC_CNY:getExRateByType(srcCcy,__SYS_LOCALCCY,'BS') * ssAmt,
								ACC_PP_CNY:getExRateByType(srcCcy,__SYS_LOCALCCY,'PPBS') * ssAmt,
								CR_BUY_RATE:getCCYRateByType(ssRowData.CR_SOURCE_CCY,"B"),
								CR_SELL_RATE:getCCYRateByType(ssRowData.CR_ACCOUNT_CCY,"S"),
								// modify by liaorizhi 20120911 平盘价显示错误 start
								CR_PP_BUY_RATE:getCCYRateByType(ssRowData.CR_ACCOUNT_CCY,"PB"),
								CR_PP_SEL_RATE:getCCYRateByType(ssRowData.CR_SOURCE_CCY,"PS")});
								// modify by liaorizhi 20120911 平盘价显示错误 end
	currRowData = jQuery('#CRCUSTACC_GRID').jqGrid('getRowData',rowId);
	//jQuery('#CRCUSTACC_GRID').jqGrid('editRow',rowId);
}

function delCrInfo(rowId){
	var flag = false;
	jQuery('#CRCUSTACC_GRID').jqGrid('saveRow',rowId,null,'clientArray');
	var oneRow = jQuery('#CRCUSTACC_GRID').jqGrid('getRowData',1);
	var rowData = jQuery('#CRCUSTACC_GRID').jqGrid('getRowData',rowId);
	var srcAmt1 = FormatStr2Amt( oneRow.CR_SOURCE_AMT );
	var srcAmtx = FormatStr2Amt(rowData.CR_SOURCE_AMT);
	var srcCcy = oneRow.CR_SOURCE_CCY;
	var ssAmt = FormatAmtByCCY( srcAmt1 + srcAmtx,srcCcy );
	$('#CRCUSTACC_GRID').jqGrid('setRowData',1,{
		CR_SOURCE_AMT:ssAmt,
		CR_ACCOUNT_AMT:ssAmt,
		ACC_CNY:getExRateByType(srcCcy,__SYS_LOCALCCY,'BS') * ssAmt,
		ACC_PP_CNY:getExRateByType(srcCcy,__SYS_LOCALCCY,'PPBS') * ssAmt
	});
	flag = true;
	return flag;
}

function formatCrXml(){
	if( $('#CRCUSTACC_GRID').get(0) != null ){
		var rowData ;
		var allRows = jQuery("#CRCUSTACC_GRID").jqGrid('getDataIDs');
		$.each( allRows, function(i, n){	
			jQuery('#CRCUSTACC_GRID').jqGrid('saveRow',n,null,'clientArray');
		});

		if( allRows != null && allRows.length > 0 ){		
			var formatXml = '';
			formatXml = "<?xml version='1.0' encoding='GBK'?><cr><rows>";
			$.each( allRows, function(i, n){
				rowData = jQuery('#CRCUSTACC_GRID').jqGrid('getRowData',n);
				
				var rowXml = '';
				rowXml = '<row>';
				
				rowXml = rowXml + '<cell hidFlag = "N">'+rowData.CR_ACCOUNT_CCY+'</cell>';//0
				rowXml = rowXml + '<cell hidFlag = "N">'+rowData.CR_BUY_RATE+'</cell>';//1
				rowXml = rowXml + '<cell hidFlag = "N">'+rowData.CR_SELL_RATE+'</cell>';//2
				rowXml = rowXml + '<cell hidFlag = "N">'+rowData.CR_SOURCE_CCY+'</cell>';//3
				rowXml = rowXml + '<cell hidFlag = "N">'+FormatStr2Amt(rowData.CR_SOURCE_AMT)+'</cell>';//4
				rowXml = rowXml + '<cell hidFlag = "N">'+FormatStr2Amt(rowData.CR_ACCOUNT_AMT)+'</cell>';//5
				rowXml = rowXml + '<cell hidFlag = "N">'+rowData.CR_ACCOUNT_NO+'</cell>';//6
				rowXml = rowXml + '<cell hidFlag = "N">'+rowData.SUBMARKS+'</cell>';//7
				rowXml = rowXml + '<cell hidFlag = "N">'+rowData.ACC_ATTR+'</cell>';//8
				rowXml = rowXml + '<cell hidFlag = "Y">'+rowData.CR_PP_BUY_RATE+'</cell>';//9
				rowXml = rowXml + '<cell hidFlag = "Y">'+rowData.CR_PP_SEL_RATE+'</cell>';//10
				rowXml = rowXml + '<cell hidFlag = "Y">'+rowData.ACC_CNY+'</cell>';//11
				rowXml = rowXml + '<cell hidFlag = "Y">'+rowData.ACC_PP_CNY+'</cell>';//12
				rowXml = rowXml + '<cell hidFlag = "Y">'+rowData.IS_CHECK_ACCNO+'</cell>';//13
				rowXml = rowXml + '<cell hidFlag = "Y">'+rowData.CR_DESC+'</cell>';//14
				rowXml = rowXml + '<cell hidFlag = "N">'+rowData.SEQ_NO+'</cell>';//15
				rowXml = rowXml + '<cell hidFlag = "N">'+rowData.PROD_TYPE+'</cell>';//16
				rowXml = rowXml + '</row>';
				formatXml = formatXml + rowXml;
			});
			formatXml = formatXml + '</rows></cr>';
			
			$('#CR_CUST_ACC_GRID').get(0).value = formatXml;
		}
		formatCrXmlForVou();
	}
}

function formatCrXmlForVou(){
	var rowData ;
	var allRows = jQuery("#CRCUSTACC_GRID").jqGrid('getDataIDs');
	$.each( allRows, function(i, n){	
		jQuery('#CRCUSTACC_GRID').jqGrid('saveRow',n,null,'clientArray');
	});
	
	var buyRate,selRate,ppBuyRate,ppSelRate;
	var formatXml = '';
	formatXml = "<?xml version='1.0' encoding='GBK'?><CUSTACC_VOU><ACCOUNTS>";
	var jshDM = $('#CR_CUST_ACC_JSHDM').val();
	var jshDX = $('#CR_CUST_ACC_JSHDX').val();
	if( jshDM == null ) jshDM = "";
	if( jshDX == null ) jshDX = ""; 
	
	//for check
	var hcAmt = getFieldValue($('#HC_CUST_ACC_AMT').get(0));
	var hcAccNo = $('#HC_CUST_ACC_NO').val();
	if( hcAmt != null && hcAccNo != null && hcAccNo != '' && hcAmt != 0 ){
		var rowXml = '';
		var hcCcy = $('#HC_CUST_ACC_CCY').val();
		
		buyRate = $('#HC_CUST_ACC_BUYRATE').val();
		selRate = $('#HC_CUST_ACC_SELRATE').val();
		ppBuyRate = $('#HC_CUST_ACC_PP_BUYRATE').val();
		ppSelRate = $('#HC_CUST_ACC_PP_SELRATE').val();
		
		rowXml = '<ACCOUNT>';
		rowXml = rowXml + '<ACC_DCFLAG>Cr</ACC_DCFLAG>';
		rowXml = rowXml + '<ACC_CUSTID>'+CR_CUST_ID+'</ACC_CUSTID>';
		rowXml = rowXml + '<ACC_NO>'+hcAccNo+'</ACC_NO>';
		rowXml = rowXml + '<ACC_CCY>'+hcCcy+'</ACC_CCY>';
		rowXml = rowXml + '<ACC_AMT>'+hcAmt+'</ACC_AMT>';
		rowXml = rowXml + '<ACC_BUYRATE>'+buyRate+'</ACC_BUYRATE>';
		rowXml = rowXml + '<ACC_SELRATE>'+selRate+'</ACC_SELRATE>';
		rowXml = rowXml + '<ACC_PP_BUYRATE>'+ppBuyRate+'</ACC_PP_BUYRATE>';
		rowXml = rowXml + '<ACC_PP_SELRATE>'+ppSelRate+'</ACC_PP_SELRATE>';
		rowXml = rowXml + '<ACC_CNY>0</ACC_CNY>';
		rowXml = rowXml + '<ACC_PP_CNY>0</ACC_PP_CNY>';
		rowXml = rowXml + '<ACC_SOR_AMT>'+hcAmt+'</ACC_SOR_AMT>';
		rowXml = rowXml + '<ACC_SOR_CCY>'+hcCcy+'</ACC_SOR_CCY>';
		rowXml = rowXml + '<ACC_JSHDM></ACC_JSHDM>';
		rowXml = rowXml + '<ACC_JSHDX></ACC_JSHDX>';
		rowXml = rowXml + '<ACC_USD_BUYRATE>'+getCCYRateByType('USD','B')+'</ACC_USD_BUYRATE>';
		rowXml = rowXml + '<ACC_USD_SELRATE>'+getCCYRateByType('USD','S')+'</ACC_USD_SELRATE>';
		rowXml = rowXml + '<ACC_MIDRATE>'+getCCYRateByType(hcCcy,'M')+'</ACC_MIDRATE>';
		rowXml = rowXml + '<ACC_VOUTYPE>CRCHK</ACC_VOUTYPE>';
		rowXml = rowXml + '</ACCOUNT>';
		
		formatXml = formatXml + rowXml;
		
		var checkFlag = document.UTFORM.CHECK_ACCOUNT.checked;
		if( checkFlag ){
			rowXml = '<ACCOUNT>';
			rowXml = rowXml + '<ACC_DCFLAG>Dr</ACC_DCFLAG>';
			rowXml = rowXml + '<ACC_CUSTID>'+CR_CUST_ID+'</ACC_CUSTID>';
			rowXml = rowXml + '<ACC_NO>'+hcAccNo+'</ACC_NO>';
			rowXml = rowXml + '<ACC_CCY>'+hcCcy+'</ACC_CCY>';
			rowXml = rowXml + '<ACC_AMT>'+hcAmt+'</ACC_AMT>';
			rowXml = rowXml + '<ACC_BUYRATE>'+buyRate+'</ACC_BUYRATE>';
			rowXml = rowXml + '<ACC_SELRATE>'+selRate+'</ACC_SELRATE>';
			rowXml = rowXml + '<ACC_PP_BUYRATE>'+ppBuyRate+'</ACC_PP_BUYRATE>';
			rowXml = rowXml + '<ACC_PP_SELRATE>'+ppSelRate+'</ACC_PP_SELRATE>';
			rowXml = rowXml + '<ACC_CNY>0</ACC_CNY>';
			rowXml = rowXml + '<ACC_PP_CNY>0</ACC_PP_CNY>';
			rowXml = rowXml + '<ACC_SOR_AMT>'+hcAmt+'</ACC_SOR_AMT>';
			rowXml = rowXml + '<ACC_SOR_CCY>'+hcCcy+'</ACC_SOR_CCY>';
			rowXml = rowXml + '<ACC_JSHDM></ACC_JSHDM>';
			rowXml = rowXml + '<ACC_JSHDX></ACC_JSHDX>';
			rowXml = rowXml + '<ACC_USD_BUYRATE>'+getCCYRateByType('USD','B')+'</ACC_USD_BUYRATE>';
			rowXml = rowXml + '<ACC_USD_SELRATE>'+getCCYRateByType('USD','S')+'</ACC_USD_SELRATE>';
			rowXml = rowXml + '<ACC_MIDRATE>'+getCCYRateByType(hcCcy,'M')+'</ACC_MIDRATE>';
			rowXml = rowXml + '<ACC_VOUTYPE>CRCHK</ACC_VOUTYPE>';
			rowXml = rowXml + '</ACCOUNT>';
			
			formatXml = formatXml + rowXml;
		}
	}
	
	if( allRows != null && allRows.length > 0 ){	
		$.each( allRows, function(i, n){
			rowData = jQuery('#CRCUSTACC_GRID').jqGrid('getRowData',n);
			var amt1 = FormatStr2Amt(rowData.CR_ACCOUNT_AMT);
			if( amt1 != 0 ){
				var rowXml = '';
				
				var accAmt = FormatStr2Amt(rowData.CR_ACCOUNT_AMT);
				var sorAmt = FormatStr2Amt(rowData.CR_SOURCE_AMT);
				if( accAmt != 0 && sorAmt != 0 ){
					rowXml = '<ACCOUNT>';
					rowXml = rowXml + '<ACC_DCFLAG>Cr</ACC_DCFLAG>';
					rowXml = rowXml + '<ACC_CUSTID>'+CR_CUST_ID+'</ACC_CUSTID>';
					rowXml = rowXml + '<ACC_NO>'+rowData.CR_ACCOUNT_NO+'</ACC_NO>';
					rowXml = rowXml + '<SUBMARKS>'+rowData.SUBMARKS+'</SUBMARKS>';
					rowXml = rowXml + '<ACC_CCY>'+rowData.CR_ACCOUNT_CCY+'</ACC_CCY>';
					rowXml = rowXml + '<ACC_AMT>'+accAmt+'</ACC_AMT>';
					rowXml = rowXml + '<ACC_BUYRATE>'+rowData.CR_BUY_RATE+'</ACC_BUYRATE>';
					rowXml = rowXml + '<ACC_SELRATE>'+rowData.CR_SELL_RATE+'</ACC_SELRATE>';
					rowXml = rowXml + '<ACC_PP_BUYRATE>'+rowData.CR_PP_BUY_RATE+'</ACC_PP_BUYRATE>';
					rowXml = rowXml + '<ACC_PP_SELRATE>'+rowData.CR_PP_SEL_RATE+'</ACC_PP_SELRATE>';
					rowXml = rowXml + '<ACC_CNY>'+rowData.ACC_CNY+'</ACC_CNY>';
					rowXml = rowXml + '<ACC_PP_CNY>'+rowData.ACC_PP_CNY+'</ACC_PP_CNY>';
					rowXml = rowXml + '<ACC_SOR_AMT>'+sorAmt+'</ACC_SOR_AMT>';
					rowXml = rowXml + '<ACC_SOR_CCY>'+rowData.CR_SOURCE_CCY+'</ACC_SOR_CCY>';
					rowXml = rowXml + '<ACC_JSHDM>'+jshDM+'</ACC_JSHDM>';
					rowXml = rowXml + '<ACC_JSHDX>'+jshDX+'</ACC_JSHDX>';
					rowXml = rowXml + '<ACC_USD_BUYRATE>'+getCCYRateByType('USD','B')+'</ACC_USD_BUYRATE>';
					rowXml = rowXml + '<ACC_USD_SELRATE>'+getCCYRateByType('USD','S')+'</ACC_USD_SELRATE>';
					rowXml = rowXml + '<ACC_MIDRATE>'+getCCYRateByType(rowData.CR_SOURCE_CCY,'M')+'</ACC_MIDRATE>';
					rowXml = rowXml + '<ACC_VOUTYPE>CRGRID</ACC_VOUTYPE>';
					rowXml = rowXml + '<ACC_ATTR>'+rowData.ACC_ATTR+'</ACC_ATTR>';
					rowXml = rowXml + '<SEQ_NO>'+rowData.SEQ_NO+'</SEQ_NO>';
					rowXml = rowXml + '<PROD_TYPE>'+rowData.PROD_TYPE+'</PROD_TYPE>';
					rowXml = rowXml + '</ACCOUNT>';
				}
				formatXml = formatXml + rowXml;
			}
		});
	}
	
	//for fee
	var accNo = $('#FEE_CR_TOTAL_ACCNO').val();
	var feeCrAcctSeqno = $('#FEE_CR_AcctSeqNo').val();
	var feeCrProdType = $('#FEE_CR_ProdType').val();
	var feeCrSubject = $('#FEE_CR_SUBJECT').val();
	var ccy = $('#FEE_CR_TOTAL_CCY').val();
	var amt = getFieldValue( $('#FEE_CR_TOTAL_AMT').get(0) );
	if( accNo != null && accNo != '' && ccy != null && ccy != '' && amt != null && amt != 0 ){
		var rowXml = '';
		buyRate = $('#FEE_CR_TOTAL_BUYRATE').val();
		selRate = $('#FEE_CR_TOTAL_SELRATE').val();
		ppBuyRate = $('#FEE_CR_TOTAL_PP_BUYRATE').val();
		ppSelRate = $('#FEE_CR_TOTAL_PP_SELRATE').val();
		
		rowXml = '<ACCOUNT>';
		rowXml = rowXml + '<ACC_DCFLAG>Dr</ACC_DCFLAG>';
		rowXml = rowXml + '<ACC_CUSTID>'+CR_CUST_ID+'</ACC_CUSTID>';
		rowXml = rowXml + '<ACC_NO>'+accNo+'</ACC_NO>';
		rowXml = rowXml + '<SUBMARKS>'+feeCrSubject+'</SUBMARKS>';
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
		rowXml = rowXml + '<ACC_VOUTYPE>CRFEE</ACC_VOUTYPE>';
		rowXml = rowXml + '<ACC_TYPE>CRFEE</ACC_TYPE>';
		rowXml = rowXml + '<SEQ_NO>'+feeCrAcctSeqno+'</SEQ_NO>';
		rowXml = rowXml + '<PROD_TYPE>'+feeCrProdType+'</PROD_TYPE>';
		rowXml = rowXml + '</ACCOUNT>';
			
		formatXml = formatXml + rowXml;
	}
	
	formatXml = formatXml + '</ACCOUNTS></CUSTACC_VOU>';

	$('#CR_CUST_ACC_GRID_VOU').val(formatXml);
}

function initReleaseCr(){
	var xmlStr = "";
	xmlStr = $('#CR_CUST_ACC_GRID').val();
	if( xmlStr != null && xmlStr != "" ){
		$('#CRCUSTACC_GRID').GridUnload();
		CR_IS_CREATE_BAR_FLAG = false;
		createCrGrid('xmlstring',xmlStr,false,false);
		createCrPageButton(false);
	}
}

function initFixPengingCr(){
	var xmlStr = "";
	initCommCrMessage();
	setExRateCustid( $('#CR_CUST_ACC_CUSTID').val() );
	xmlStr = $('#CR_CUST_ACC_GRID').val();
	if( xmlStr != null && xmlStr != "" ){
		$('#CRCUSTACC_GRID').GridUnload();
		CR_IS_CREATE_BAR_FLAG = false;
		createCrGrid('xmlstring',xmlStr,true,true);
		createCrPageButton(true);
	}
}

function getHcAmt(obj){
	var ccy1 = $('#HC_CUST_ACC_CCY0').val();
	var ccy2 = obj.value;
	var rate = getExRateByType(ccy1,ccy2,__FEE_CURR_RATE_TYPE_MID);
	var srcAmt = getFieldValue( $('#HC_CUST_ACC_AMT0').get(0) );
	var rateAmt = srcAmt * rate;
	setFieldValue( $('#HC_CUST_ACC_AMT').get(0), rateAmt);
	
	var hcCcy0 = $('#HC_CUST_ACC_CCY').val();
	if( hcCcy0 != null && hcCcy0 != '' ){
		$('#HC_CUST_ACC_BUYRATE').val( getCCYRateByType(hcCcy0,'B') );
		$('#HC_CUST_ACC_SELRATE').val( getCCYRateByType(hcCcy0,'S') );
		$('#HC_CUST_ACC_PP_BUYRATE').val( getCCYRateByType(hcCcy0,'PB') );
		$('#HC_CUST_ACC_PP_SELRATE').val( getCCYRateByType(hcCcy0,'PS') );
	}
}

function getCrJshForBOP(){
	if( typeof(getJSHDataForBop) == 'function' ){
		jQuery('#CRCUSTACC_GRID').jqGrid('saveRow',currRowIdCR,null,'clientArray');
		currRowData = jQuery('#CRCUSTACC_GRID').jqGrid('getRowData',currRowIdCR);
		var ccy = currRowData.CR_ACCOUNT_CCY;
		var amt = FormatStr2Amt(currRowData.CR_SOURCE_AMT);
		var accNo = currRowData.CR_ACCOUNT_NO;
		var buyRate = currRowData.CR_BUY_RATE;
		var selRate = currRowData.CR_SELL_RATE;
		//alert('ccy-'+ccy+'-amt-'+amt+'-accNo-'+accNo+'-buyRate-'+buyRate+'-selRate-'+selRate);
		$('#CR_CUST_TEMP_ACCNO').val(accNo); 
		jQuery('#CRCUSTACC_GRID').jqGrid('editRow',currRowIdCR);
		getJSHDataForBop(ccy,amt,accNo,buyRate,selRate,"CR");
	}
	//  add by lrz 20120615
	if(typeof(onCrCustAccChange) == 'function' ){
		onCrCustAccChange();
	}
	// 给支付用
	if(typeof(onSettleChange) == 'function' ){
		//还没有实现，需要的时候自己去实现
	}
}
		
function setCrCurrData(rowid){
	currRowData = jQuery('#CRCUSTACC_GRID').jqGrid('getRowData',rowid);
	var crAccNo = getGridData("CRCUSTACC_GRID","CR_ACCOUNT_NO",rowid);
	if(crAccNo==null||crAccNo==""){
		 $('#CRCUSTACC_GRID').jqGrid('setRowData',rowid,{SUBMARKS:''});
	}
	setProperty($("#" + rowid + "_SUBMARKS"),"P");
}			

function createCrPageButton(clickEnable){
	if( CR_IS_CREATE_BAR_FLAG ) return;
	CR_IS_CREATE_BAR_FLAG = true;
	jQuery('#CRCUSTACC_GRID')
		.jqGrid('navButtonAdd','#CRCUSTACC_GRID_BAR',{
		    caption: '',
		    title: 'Add CrInfo',
			buttonicon:'ui-icon-plus',
			clickEnable:clickEnable,
		    onClickButton :function(){
				addCrData();
	    	}})
		.jqGrid('navButtonAdd','#CRCUSTACC_GRID_BAR',{
			caption:'',
			title:'Del CrInfo',
			buttonicon:'ui-icon-minus',
			clickEnable:clickEnable,
			onClickButton : function (){
				delCrData();
	    	}})
		.jqGrid('navButtonAdd','#CRCUSTACC_GRID_BAR',{
			caption:'',
			title:'Edit Row',
			buttonicon:'ui-icon-pencil',
			clickEnable:clickEnable,
			onClickButton : function (){
				editCrData();
	    	}})
		.jqGrid('navButtonAdd','#CRCUSTACC_GRID_BAR',{
			caption:'',
			title:'Save Row',
			buttonicon:'ui-icon-disk',
			clickEnable:clickEnable,
			onClickButton : function (){
				saveCrData();
	    	}})
		.jqGrid('navButtonAdd','#CRCUSTACC_GRID_BAR',{
			caption:'',
			title:'Cancle Save Row',
			buttonicon:'ui-icon-cancel',
			clickEnable:clickEnable,
			onClickButton : function (){
				cancleCrData();
	    	}});
}																						

function changeCheckToCust(obj){
	var checkFlag = obj.checked;
	var checkAmt = getFieldValue($('#HC_CUST_ACC_AMT').get(0));
	var crAmt = getFieldValue( $('#CR_CUST_ACC_AMT').get(0) );
	if( checkFlag ){
		setFieldValue($('#CR_CUST_ACC_AMT').get(0),(crAmt + checkAmt));
		
		initCrCustAcc("checked");
		__changeCrAmt = crAmt;
		__changeCrPreAmt = checkAmt;
		changeCrAmt(checkAmt,1);
	}else{
		changeCrAmt(0,1);
		setFieldValue($('#CR_CUST_ACC_AMT').get(0),(crAmt - checkAmt));
		initCrCustAcc("checked");
	}
}

function checkCheckFlag(obj){
	var checkAmt = getFieldValue($('#HC_CUST_ACC_AMT').get(0));
	var custId = $('#CR_CUST_ACC_CUSTID').val();
	if( checkAmt == null || checkAmt == 0 || custId == null || custId == "" ){
		alert("No Check Amt Or CustomID,Please Check!");
	}
}

function checkCrGridData(){
	var allRows = jQuery("#CRCUSTACC_GRID").jqGrid('getDataIDs');
	var data;
	for( var i = 0; i < allRows.length;i++ ){
		jQuery('#CRCUSTACC_GRID').jqGrid('saveRow',allRows[i],null,'clientArray');
		
		data = jQuery('#CRCUSTACC_GRID').jqGrid('getRowData',allRows[i]);
		if( data.CR_SOURCE_AMT && FormatStr2Amt( data.CR_SOURCE_AMT ) > 0 && !data.CR_ACCOUNT_NO ){
			alert("帐号不能为空,请检查!"); // 帐号不能为空,请检查
			// add by fanrui for报错聚焦 begin
			currRowIdCR = i+1;
			jQuery('#CRCUSTACC_GRID').jqGrid('editRow',allRows[i],null,'clientArray');
			setFocus($("#" + allRows[i] + "_CR_ACCOUNT_NO")[0]);
			// add by fanrui for报错聚焦 end
			return false;
		}
		if( data.CR_SOURCE_AMT && FormatStr2Amt( data.CR_SOURCE_AMT ) > 0 && !data.IS_CHECK_ACCNO ){
			alert("是否待核查选项不能为空,请检查!"); // 是否待核查选项不能为空,请检查
			// add by fanrui for报错聚焦 begin
			currRowIdCR = i+1;
			jQuery('#CRCUSTACC_GRID').jqGrid('editRow',allRows[i],null,'clientArray');
			setFocus($("#" + allRows[i] + "_IS_CHECK_ACCNO")[0]);
			// add by fanrui for报错聚焦 end
			return false;
		}
	}
	return true;
}

function changeTransExratesCr(rowId,rateValue,rateType){
	if( isNaN(rateValue) ){
		alert("请输入数字!!");
		jQuery('#CRCUSTACC_GRID').jqGrid('restoreRow',rowId);
		return;
	}
	if( rateValue * 1 < 0 ){
		alert("请输入正数!!");
		jQuery('#CRCUSTACC_GRID').jqGrid('restoreRow',rowId);
		return;
	}
	if( !__ExRateData ) return;
	
	jQuery('#CRCUSTACC_GRID').jqGrid('saveRow',rowId,null,'clientArray');
	var rowData = jQuery('#CRCUSTACC_GRID').jqGrid('getRowData',rowId);
	
	var srcCcy = rowData.CR_SOURCE_CCY;
	var accCCY = rowData.CR_ACCOUNT_CCY;
	var srcAmt = FormatStr2Amt(rowData.CR_SOURCE_AMT);
	var accAmt = srcAmt.accMul( getExRateByType(srcCcy,accCCY,'BS') );
	var accCny = srcAmt.accMul(getExRateByType(srcCcy,__SYS_LOCALCCY,'BS'));
	var accPpCny = srcAmt.accMul( getExRateByType(srcCcy,__SYS_LOCALCCY,'PPBS'));
	
	if( srcAmt == 0 ) $('#CRCUSTACC_GRID').jqGrid('setRowData',rowId,{CR_ACCOUNT_NO:''});
	
	srcAmt = FormatAmtByCCY(srcAmt,srcCcy);
	accAmt = FormatAmtByCCY(accAmt,accCCY);
	
	$('#CRCUSTACC_GRID').jqGrid('setRowData',rowId,{
		CR_SOURCE_AMT:srcAmt,
		CR_ACCOUNT_AMT:accAmt,
		ACC_CNY:accCny,
		ACC_PP_CNY:accPpCny});
	
	var ssAmt = FormatStr2Amt( $("#CR_CUST_ACC_AMT").val() );
	var allRows = jQuery("#CRCUSTACC_GRID").jqGrid('getDataIDs');
	var ssRowData;
	$.each( allRows, function(i, n){
		if( n != 1 ){
			jQuery('#CRCUSTACC_GRID').jqGrid('saveRow',n,null,'clientArray');
			ssRowData = jQuery('#CRCUSTACC_GRID').jqGrid('getRowData',n);
			ssAmt = ssAmt - FormatStr2Amt(ssRowData.CR_SOURCE_AMT);
			
			var eSrcCcy = ssRowData.CR_SOURCE_CCY;
			var eSrcAmt = FormatStr2Amt(ssRowData.CR_SOURCE_AMT);
			var eAaccCCY = ssRowData.CR_ACCOUNT_CCY;
			var eAccAmt = FormatAmtByCCY( eSrcAmt.accMul ( getExRateByType(eSrcCcy,eAaccCCY,'BS') ), eAaccCCY);
			var eAccCny = eSrcAmt.accMul( getExRateByType(eSrcCcy,__SYS_LOCALCCY,'BS'));
			var eAccPpCny = eSrcAmt.accMul(getExRateByType(eSrcCcy,__SYS_LOCALCCY,'PPBS'));

			if( rateType == "Buy" ){
				$('#CRCUSTACC_GRID').jqGrid('setRowData',n,{CR_BUY_RATE:rateValue});
			}else if( rateType == "Sell" && accCCY == eAaccCCY ){
				$('#CRCUSTACC_GRID').jqGrid('setRowData',n,{CR_SELL_RATE:rateValue});
			}
			$('#CRCUSTACC_GRID').jqGrid('setRowData',n,{CR_ACCOUNT_AMT:eAccAmt,ACC_CNY:eAccCny,ACC_PP_CNY:eAccPpCny});
		}
	});
	
	if( ssAmt == 0 ) $('#CRCUSTACC_GRID').jqGrid('setRowData',1,{CR_ACCOUNT_NO:''});
	
	var sssAmt = FormatAmtByCCY(ssAmt,srcCcy);
	if( rateType == "Buy" ){
		$('#CRCUSTACC_GRID').jqGrid('setRowData',1,{CR_BUY_RATE:rateValue});
	}else if( rateType == "Sell" && accCCY == srcCcy ){
		$('#CRCUSTACC_GRID').jqGrid('setRowData',1,{CR_SELL_RATE:rateValue});
	}
	$('#CRCUSTACC_GRID').jqGrid('setRowData',1,{
		CR_SOURCE_AMT:sssAmt,
		CR_ACCOUNT_AMT:sssAmt,
		ACC_CNY:getExRateByType(srcCcy,__SYS_LOCALCCY,'BS').accMul(ssAmt),
		ACC_PP_CNY:getExRateByType(srcCcy,__SYS_LOCALCCY,'PPBS').accMul(ssAmt)
	});
}

// modify by liaorizhi 20120806 start
function changeTransExratesCrPP(rowDataArr){
	if( !__ExRateData || !rowDataArr || rowDataArr.length == 0 ) return;
	
	var allRows = jQuery("#CRCUSTACC_GRID").jqGrid('getDataIDs');
	var obj,rowData;
	
	for(var key in rowDataArr){
		obj = rowDataArr[key];
		var askType = obj.TRANS_TYPE;
		var selCcy = obj.SEL_CCY;
		var buyCcy = obj.BUY_CCY;

		$.each( allRows, function(i, n){
			jQuery('#CRCUSTACC_GRID').jqGrid('saveRow',n,null,'clientArray');
			rowData = jQuery('#CRCUSTACC_GRID').jqGrid('getRowData',n);
			
			if (buyCcy == rowData.CR_SOURCE_CCY && selCcy == __SYS_LOCALCCY && "JH" == askType) {
				$('#CRCUSTACC_GRID').jqGrid('setRowData',n,{CR_BUY_RATE:obj.BUYRATE});
				$('#CRCUSTACC_GRID').jqGrid('setRowData',n,{CR_PP_SEL_RATE:obj.PPSELRATE});
			} else if (selCcy == rowData.CR_ACCOUNT_CCY && buyCcy == __SYS_LOCALCCY && "SH" == askType) {
				$('#CRCUSTACC_GRID').jqGrid('setRowData',n,{CR_SELL_RATE:obj.SELRATE});
				$('#CRCUSTACC_GRID').jqGrid('setRowData',n,{CR_PP_BUY_RATE:obj.PPBUYRATE});
			}else if ("TH" == askType) {
				if (selCcy == rowData.CR_ACCOUNT_CCY) {
					$('#CRCUSTACC_GRID').jqGrid('setRowData',n,{CR_BUY_RATE:obj.BUYRATE});
					$('#CRCUSTACC_GRID').jqGrid('setRowData',n,{CR_PP_SEL_RATE:obj.PPSELRATE});
				}
				if (buyCcy == rowData.CR_SOURCE_CCY) {
					$('#CRCUSTACC_GRID').jqGrid('setRowData',n,{CR_SELL_RATE:obj.SELRATE});
					$('#CRCUSTACC_GRID').jqGrid('setRowData',n,{CR_PP_BUY_RATE:obj.PPBUYRATE});
				}
			}
		});
		$('#CR_ASKPRICE_NO').val(obj.ASKPRICE_NO);
	}
}

// add by liaorizhi 20120912 对选择的询价编号校验
function chooseAskNoCheckCr(rowDataArr){
	var allRows = jQuery("#CRCUSTACC_GRID").jqGrid('getDataIDs');
	var obj = rowDataArr[0]; // 一次只能选择一个询价编号
	var askType =  obj.TRANS_TYPE;
	var bool = false;
	
	$.each( allRows, function(i, n){
		jQuery('#CRCUSTACC_GRID').jqGrid('saveRow',n,null,'clientArray');
		rowData = jQuery('#CRCUSTACC_GRID').jqGrid('getRowData',n);
		
		var crCustCcy = rowData.CR_ACCOUNT_CCY;
		var transCcy  = rowData.CR_SOURCE_CCY;
		var crCustAmt = FormatStr2Amt(rowData.CR_ACCOUNT_AMT);
		
		if(crCustCcy != transCcy && crCustAmt > 0){
			if(crCustCcy == "CNY" && askType == "JH"){
				return bool = true;
			}else if(transCcy == "CNY" && askType == "SH"){
				return bool = true;
			}else if(askType == "TH" && crCustCcy != "CNY" && transCcy != "CNY"){
				return bool = true;
			}
		}
	});
	if(!bool){
		alert("错误提示：该笔询价编号适用["+askType+"]，请检查！");
		$('#CR_ASKPRICE_NO').val('');
	}

	return bool;
}

// add by liaorizhi 20120912 选择询价编号后计算入客户账金额
function calCrCustJshAmt(){
	var allRows = jQuery("#CRCUSTACC_GRID").jqGrid('getDataIDs');
	
	$.each( allRows, function(i, n){
		jQuery('#CRCUSTACC_GRID').jqGrid('saveRow',n,null,'clientArray');
		rowData = jQuery('#CRCUSTACC_GRID').jqGrid('getRowData',n);
		
		var crCustCcy = rowData.CR_ACCOUNT_CCY;
		var transCcy  = rowData.CR_SOURCE_CCY;
		var crSourceAmt = FormatStr2Amt(rowData.CR_SOURCE_AMT);
		var crCustAmt = crSourceAmt * getExRateByType(transCcy,crCustCcy,"BS");
		
		$('#CRCUSTACC_GRID').jqGrid('setRowData',n,{CR_ACCOUNT_AMT:FormatAmtByCCY(crCustAmt,crCustCcy)});
	});	
}

function lookupOnChangeSYS(lookupName,rowDataArr) {
	if (lookupName == "ASKPRICELK_CR" && rowDataArr.length > 0) {
		if(!chooseAskNoCheckCr(rowDataArr)) return;
		updateSysExrateByASK(rowDataArr);
		changeTransExratesCrPP(rowDataArr);
		calCrCustJshAmt();
	}
}

function setJshFlagByCcyCr(GridName){
	var rowData ;
	var allRows = jQuery("#"+GridName).jqGrid('getDataIDs');
	var ccy1 = "",ccy2 = "", amt = 0,jshFlag = false;thFlag = false;
	$.each( allRows, function(i, n){
		jQuery("#"+GridName).jqGrid('saveRow',allRows[i],null,'clientArray');// modify by liaorizhi 20121101 
		
		rowData = jQuery('#'+GridName).jqGrid('getRowData',n);
		ccy1 = rowData.CR_ACCOUNT_CCY;
		ccy2 = rowData.CR_SOURCE_CCY;
		amt = FormatStr2Amt(rowData.CR_SOURCE_AMT);

		if( amt > 0 && ccy1 && ccy2 && ccy1 != ccy2 && ( ccy1 == "CNY" || ccy2 == "CNY" ) ){
			jshFlag = true;
		}
		if( amt > 0 && ccy1 && ccy2 && ccy1 != ccy2 && ccy1 != "CNY" && ccy2 != "CNY"  ){
			thFlag = true;
		}
	});
	var trans_key = getFieldValue(document.UTFORM.TRANS_KEY);
	
	var srcCcy = rowData.CR_SOURCE_CCY;
	var eSrcAmt = FormatStr2Amt(getGridData("CRCUSTACC_GRID", "CR_SOURCE_AMT", 2));
	var eTrcAmt = FormatStr2Amt(getGridData("CRCUSTACC_GRID", "CR_SOURCE_AMT", 3));
	var sql1="select ASK_CONT_AMT from CLR_ASPRC_DEFTAMT where ASK_CONT_CCY='"+srcCcy+"'"
	var count1 = executeQuery("INFO1",sql1);
	if(count1!="1") {return;}
    var askcontamt=getTableFieldValue("INFO1",1,"ASK_CONT_AMT");
	if( jshFlag){
		if(askcontamt>eSrcAmt){
			setProperty(document.UTFORM.CR_ASKPRICE_NO,"O");
		}else{
			setProperty(document.UTFORM.CR_ASKPRICE_NO,"M");
		}
		setProperty($('#CR_CUST_ACC_JSHDM').get(0),"M");
		setProperty($('#CR_CUST_ACC_JSHDX').get(0),"M");
	}else{
		setProperty(document.UTFORM.CR_ASKPRICE_NO,"O");
		setFieldValue(document.UTFORM.CR_ASKPRICE_NO,"");
		setProperty($('#CR_CUST_ACC_JSHDM').get(0),"O");
		setProperty($('#CR_CUST_ACC_JSHDX').get(0),"O");
	}
	if (thFlag){
		if(askcontamt<eTrcAmt){
			setProperty(document.UTFORM.CR_ASKPRICE_NO,"M");
		}else{
			setProperty(document.UTFORM.CR_ASKPRICE_NO,"O");
		}
	}
}

//add by yangcl for 用于拼装Cr客户帐xml明细数据
function formatCrCustAccXml() {
	try {
		$("#crCustAccXml").val("");
		var formatCrCustAccXml = "<?xml version='1.0' encoding='UTF-8'?><crCustAccXml>";
		if ($('#CRCUSTACC_GRID').get(0) != null) {
			var rowData;
			var allRows = jQuery("#CRCUSTACC_GRID").jqGrid('getDataIDs');
			$.each(allRows, function(i, n) {
				jQuery('#CRCUSTACC_GRID').jqGrid('saveRow', n, null, 'clientArray');
			});
			if (allRows != null && allRows.length > 0) {
				var crAccountCcy = '', crAccountAmt = '', crAccountNo = '';
				$.each(allRows,
					function(i, n) {
						rowData = jQuery('#CRCUSTACC_GRID').jqGrid('getRowData', n);
						crAccountCcy = rowData.CR_ACCOUNT_CCY;
						crAccountAmt = FormatStr2Amt(rowData.CR_ACCOUNT_AMT);
					    crAccountNo = rowData.CR_ACCOUNT_NO;
						if (crAccountAmt != 0 && "" != crAccountNo) {
							formatCrCustAccXml = formatCrCustAccXml + "<custAccDetail ACCNO=\"" + crAccountNo + "\" CUSTACC_AMT=\"" + crAccountAmt + "\"  CUSTACC_CCY=\"" + crAccountCcy + "\" />";
                        }
					 }
				);
				formatCrCustAccXml = formatCrCustAccXml + "</crCustAccXml>";
				$('#crCustAccXml').val(formatCrCustAccXml);
			}
		}
	} catch (e) {
         $("#crCustAccXml").val(""); 
	}
}