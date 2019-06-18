/**
 * 还押汇处理
 */
//Function For Purchase By WL 20100427
var __currSelectedRows = new Array();

//[Bugfree_1832_控制在同币种还押汇的时候是否允许一次还多笔：true-允许；false-不允许]_B wulei 2013-10-09
//标准版为允许多选
var __isMultRepayFlag = false;
//[Bugfree_1832_控制在同币种还押汇的时候是否允许一次还多笔：true-允许；false-不允许]_E wulei 2013-10-09

//支持直接传入交易编号
function initRepaySysInfo(rCustIdField,rTransKeyField, rTransCcyField) {
	if (!rCustIdField || !rTransKeyField || !$('#'+rCustIdField).get(0) || !$('#'+rCustIdField).val()) return ;

	var transKey = "";
	var custId = $('#'+rCustIdField).val();

	if (!$('#'+rTransKeyField).get(0)) {
		transKey = rTransKeyField;
	} else {
		transKey  = $('#'+rTransKeyField).val();
	}
	
	var transCcy = (rTransCcyField && $('#'+rTransCcyField)[0]) ? $('#'+rTransCcyField).val() : "";
	
	$('#R_CUST_ID').val(custId);
	$('#R_TRANS_KEY').val(transKey);
	$('#RET_DATE').val( getSysDate() );
	$('#EQ_TOTAL_CCY').val(transCcy);
	
	setExRateCustid(custId);
	
	initTotalData(transKey);
	initFinHisData(transKey);
	isShowRepayPurPage();
}

function initFinHisData(rTransKey){
	if (!rTransKey) return ;
	$.ajax({
		url: '/UtanWeb/CommUtilServlet',
		dataType:'json',
		type:'POST',
		data:'OPERTYPE=RepayPurchase&GRID_PURCHASE_KEY='+rTransKey,
		async:false, // modify by fanr 没有问题编号,偶然发现的问题
		error:function(){
			alert('获取历史融资信息通信错误!');
			return ;
		},
		success: function(jsonData){
			formatFinHisData(jsonData);
		}
	});
}

function formatFinHisData(finData){
	if( finData.rows == null || finData.rows == "" ) return ;
	var dataLength = finData.rows.length;
	$('#REPAY_PUR_GRID').GridUnload();
	createRepayGrid('jsonstring','',true);
	var rowData;
	for( var i=0;i<dataLength;i++ ){
		rowData = finData.rows[i];
		rowData.FIN_INT_AMT = 0;
		rowData.FIN_DELAY_INT_AMT = 0;
		rowData.FIN_DELAY_DAY = 0;
		jQuery("#REPAY_PUR_GRID").jqGrid('addRowData',(i+1),rowData,'last');
		if( i == 0 ){
			jQuery("#REPAY_PUR_GRID").jqGrid('setSelection',(i+1),true);
		}
	}
}
//add by liaorizhi 20120908 如果没有押汇金额，隐藏该页面
function isShowRepayPurPage(){
	var len = getAmtValue(document.UTFORM.R_UN_TOTAL_AMT);

	if(len > 0){
		showTab("REPAYPURCHASE");
	}else{
		hideTab("REPAYPURCHASE");
	}
}

//add by wulei at 2013-05-14 还押汇的时候如果取消某笔则显示值也清空
function clearRepayInfo() {
	$('#R_FIN_CCY').val("");
	$('#R_FIN_AMT').val("");
	$('#R_FIN_DAY_NUM').val("");
	$('#R_FIN_DATE').val("");
	$('#R_FIN_DELAY_DAY_NUM').val("");
	$('#R_FIN_DELAY_INT').val("");
	$('#R_FIN_INT').val("");
	$('#R_FIN_MAT_DATE').val("");
	$('#R_FIN_TRANS_TYPE').val("");
	$('#FIN_ACC_NO').val("");
	$('#PURREPAY_ACCNO').val("");
	$('#FIN_TRANS_KEY').val("");
	$('#FIN_INT_FLAG').val("");
	$('#R_FIN_DEFER_DAYNUM').val("");
	$('#R_FIN_DEFER_INT').val("");
	$('#R_FIN_DAYNUM').val("");
	$('#R_FIN_INT_AMT').val("");
	$('#R_FIN_DEFER_INT_AMT').val("");
	$('#R_FIN_DELAY_INT_AMT').val("");
	$('#R_FIN_INT_TOTAL_AMT').val("");
	$('#RET_YH_AMT').val("");
	$('#RET_SH_AMT').val("");
	$('#RET_PAY_AMT').val("");
	$('#DK_ACCNO').val("");
	$('#FIN_CARD_NO').val("");
	$('#DK_ACCNO_SUBJECT').val("");
	$('#FIN_CONTRACT_NO').val("");
	$('#FIN_TRANS_TYPE').val("");
	$('#FIN_NO').val("");
	
}

function showFinData(rowId,rowData,oper){
	if( rowData == null ) return ;
	if( oper == "" || oper == null ) oper = "+";
	
	$('#SHOW_CURR_SELECTED_ROW').html("<strong>"+rowData.FIN_TRANS_REF+"</strong>");
	
	var finAmt = rowData.FIN_AMT;
	var finCcy = rowData.FIN_CCY;
	var finDate = rowData.FIN_DATE;
	var dayNum = rowData.FIN_DAY_NUM;
	var deferNum = rowData.DEFER_DAYS;
	var delayInt = rowData.FIN_DELAY_INT;
	var deferInt = rowData.DEFER_RATE;
	
	var currDate = getSysDate();
	var totalNum = subDays(Str2Date(currDate),Str2Date(finDate));	
	var delayDayNum = 0;
	if (totalNum - dayNum > deferNum) {
		delayDayNum = totalNum - dayNum-deferNum;
		$('#R_FIN_DAYNUM').val(dayNum);
	} else if (totalNum > dayNum) {
		deferNum = totalNum - dayNum;
		$('#R_FIN_DAYNUM').val(dayNum);
	} else {
		$('#R_FIN_DAYNUM').val(totalNum);
		deferNum = 0;
	}
	
	setFieldValue($('#R_FIN_CCY').get(0),finCcy);
	setFieldValue($('#R_FIN_AMT').get(0),finAmt);
	setFieldValue($('#R_FIN_DAY_NUM').get(0),dayNum);
	setFieldValue($('#R_FIN_DATE').get(0),finDate);
	setFieldValue($('#R_FIN_DELAY_DAY_NUM').get(0),delayDayNum);
	setFieldValue($('#R_FIN_DELAY_INT').get(0),delayInt);
	setFieldValue($('#R_FIN_INT').get(0),rowData.FIN_INT);
	setFieldValue($('#R_FIN_MAT_DATE').get(0),rowData.FIN_MAT_DATE);
	setFieldValue($('#R_FIN_TRANS_TYPE').get(0),rowData.FIN_TRANS_TYPE);
	setFieldValue($('#FIN_ACC_NO').get(0),rowData.FIN_ACC_NO);
	setFieldValue($('#PURREPAY_ACCNO').get(0),rowData.PURREPAY_ACCNO);
	setFieldValue($('#FIN_TRANS_KEY').get(0),rowData.FIN_TRANS_KEY);
	setFieldValue($('#FIN_INT_FLAG').get(0),rowData.FIN_INT_FLAG);
	setFieldValue($('#R_FIN_DEFER_DAYNUM').get(0),deferNum);
	setFieldValue($('#R_FIN_DEFER_INT').get(0),deferInt);
	setFieldValue($('#DK_ACCNO').get(0),rowData.DK_ACCNO);
	setFieldValue($('#FIN_CARD_NO').get(0),rowData.FIN_CARD_NO);
	setFieldValue($('#DK_ACCNO_SUBJECT').get(0),rowData.DK_ACCNO_SUBJECT);
	setFieldValue($('#FIN_CONTRACT_NO').get(0),rowData.FIN_CONTRACT_NO);
	setFieldValue($('#FIN_TRANS_TYPE').get(0),rowData.FIN_TRANS_TYPE);
	setFieldValue($('#FIN_NO').get(0),rowData.FIN_NO);
	
	var yetTotal = FormatStr2Amt(rowData.RET_PAY_AMT);
	setFieldValue($('#RET_PAY_AMT').get(0),yetTotal);
	
	var yhAmt = finAmt - yetTotal;
	setFieldValue($('#RET_YH_AMT').get(0),yhAmt);
	var ss_amt = rowData.RET_SS_AMT;
	if( ss_amt == 0 || ss_amt == "" || ss_amt == null ){
		jQuery('#REPAY_PUR_GRID').jqGrid('setRowData',rowId,{RET_SS_AMT:yhAmt});
	}

	rowData= jQuery('#REPAY_PUR_GRID').jqGrid('getRowData',rowId);
	setFieldValue($('#RET_SH_AMT').get(0), Number(rowData.RET_SS_AMT));
	
	
	//cal int amt
	calThisFinInterAmt(rowId);
	
	var laseNo = Number(rowData.RET_COUNT) + 1;
	setFieldValue($('#RET_NO').get(0),laseNo);
	
	if( oper == "+" ){
		inquerBalAmt();//查询贷款账号信息
		inquerInterFace();//调用还款查询接口
		calRealRetAmt();
		
		$('#FIN_REPAY_TYPE').val("1");
		jQuery('#REPAY_PUR_GRID').jqGrid('setRowData',rowId,{
			        RET_PAY_AMT:(getFieldValue($('#R_FIN_AMT').get(0)) - getFieldValue($('#RET_YH_AMT').get(0))),
					FIN_INT_AMT:getFieldValue($('#R_FIN_INT_AMT').get(0)),
					FIN_DEFER_INT_AMT:getFieldValue($('#R_FIN_DEFER_INT_AMT').get(0)),
					FIN_DELAY_INT_AMT:getFieldValue($('#R_FIN_DELAY_INT_AMT').get(0)),
					FIN_DELAY_DAY:$('#R_FIN_DELAY_DAY_NUM').val(),
					FIN_DEFER_DAY:$('#R_FIN_DEFER_DAYNUM').val(),
					RET_SS_AMT:getFieldValue($('#RET_SH_AMT').get(0)),
					RET_SS_TOTAL_AMT:(getFieldValue($('#R_FIN_INT_TOTAL_AMT').get(0)) + getFieldValue($('#RET_SH_AMT').get(0)))
					});
		setFieldValue($('#RET_PAY_AMT').get(0),(getFieldValue($('#R_FIN_AMT').get(0)) - getFieldValue($('#RET_YH_AMT').get(0))));
		setFieldClass('M');
	}else if( oper == "-" ){
		jQuery('#REPAY_PUR_GRID').jqGrid('setRowData',rowId,{
					FIN_INT_AMT:0,
					FIN_DELAY_INT_AMT:0,
					FIN_DEFER_INT_AMT:0,
					FIN_DELAY_DAY:0,
					RET_SS_AMT:0,
					RET_SS_TOTAL_AMT:0
					});
	//[Bugfree_998_出口托收的还押汇:若有两笔还押汇信息，不停地勾选其中一笔，应还/实还总利息会随着变化]_B fanr 2013-9-22
		setProperty($('#RET_SH_AMT').get(0),'P');
		setFieldValue($('#RET_SH_AMT').get(0), getFieldValue($('#RET_SH_AMT').get(0)) - Number(rowData.RET_SS_AMT));
		$('#SHOW_CURR_SELECTED_ROW').html("");
	}
	setFieldValue($('#R_CREDIT_RETUR_CODE').get(0),"");
	calTotalData(oper);
	if(oper == "-"){ // 必须最后清除数据,否则 calTotalData(oper) 计算不准确
		clearRepayInfo();
	}
	//[Bugfree_998_出口托收的还押汇:若有两笔还押汇信息，不停地勾选其中一笔，应还/实还总利息会随着变化]_E fanr 2013-9-22
}

function showClickRow(rowId){
	var currType = $('#CURR_TASKTYPE').val();
	var currTaskType = $('#SYS_TASK_TYPE').val();
	if( currType == "RELEASE" || currTaskType == "HISTORY" ) return;
		
	var rowData= jQuery('#REPAY_PUR_GRID').jqGrid('getRowData',rowId);
	$('#SHOW_CURR_SELECTED_ROW').html("<strong>"+rowData.FIN_TRANS_REF+"</strong>");
	
	var finAmt = rowData.FIN_AMT;
	var finCcy = rowData.FIN_CCY;
	var finDate = rowData.FIN_DATE;
	var dayNum = rowData.FIN_DAY_NUM;
	var deferNum = rowData.DEFER_DAYS;
	var delayInt = rowData.FIN_DELAY_INT;
	var deferInt = rowData.DEFER_RATE;
	
	var currDate = getSysDate();
	var totalNum = subDays(Str2Date(currDate),Str2Date(finDate));
	var delayDayNum = 0;
	if (totalNum - dayNum > deferNum) {
		delayDayNum = totalNum - dayNum-deferNum; 
		$('#R_FIN_DAYNUM').val(dayNum);
	} else if (totalNum > dayNum) {
		deferNum = totalNum - dayNum;
		$('#R_FIN_DAYNUM').val(dayNum);
	} else {
		$('#R_FIN_DAYNUM').val(totalNum);
		deferNum = 0;
	}
	
	setFieldValue($('#R_FIN_CCY').get(0),finCcy);
	setFieldValue($('#R_FIN_AMT').get(0),finAmt);
	setFieldValue($('#R_FIN_DAY_NUM').get(0),dayNum);
	setFieldValue($('#R_FIN_DATE').get(0),finDate);
	setFieldValue($('#R_FIN_DELAY_DAY_NUM').get(0),delayDayNum);
	setFieldValue($('#R_FIN_DELAY_INT').get(0),delayInt);
	setFieldValue($('#R_FIN_INT').get(0),rowData.FIN_INT);
	setFieldValue($('#R_FIN_MAT_DATE').get(0),rowData.FIN_MAT_DATE);
	setFieldValue($('#R_FIN_TRANS_TYPE').get(0),rowData.FIN_TRANS_TYPE);
	setFieldValue($('#FIN_ACC_NO').get(0),rowData.FIN_ACC_NO);
	setFieldValue($('#PURREPAY_ACCNO').get(0),rowData.PURREPAY_ACCNO);
	setFieldValue($('#FIN_TRANS_KEY').get(0),rowData.FIN_TRANS_KEY);
	setFieldValue($('#FIN_INT_FLAG').get(0),rowData.FIN_INT_FLAG);
	setFieldValue($('#R_FIN_DEFER_DAYNUM').get(0),deferNum);
	setFieldValue($('#R_FIN_DEFER_INT').get(0),deferInt);
	setFieldValue($('#DK_ACCNO').get(0),rowData.DK_ACCNO);
	setFieldValue($('#FIN_CARD_NO').get(0),rowData.FIN_CARD_NO);
	setFieldValue($('#DK_ACCNO_SUBJECT').get(0),rowData.DK_ACCNO_SUBJECT);
	setFieldValue($('#FIN_CONTRACT_NO').get(0),rowData.FIN_CONTRACT_NO);
	setFieldValue($('#FIN_TRANS_TYPE').get(0),rowData.FIN_TRANS_TYPE);
	setFieldValue($('#FIN_NO').get(0),rowData.FIN_NO);
	
	var yetTotal = FormatStr2Amt(rowData.RET_PAY_AMT);
	setFieldValue($('#RET_PAY_AMT').get(0),yetTotal);
	
	var yhAmt = finAmt - yetTotal;
	setFieldValue($('#RET_YH_AMT').get(0),yhAmt);
	setFieldValue($('#RET_SH_AMT').get(0),rowData.RET_SS_AMT);
	var laseNo = Number(rowData.RET_COUNT) + 1;
	setFieldValue($('#RET_NO').get(0),laseNo);
	
	calThisFinInterAmt(rowId);
	
	var selectedRows = jQuery("#REPAY_PUR_GRID").jqGrid('getGridParam','selarrrow');
	if ( jQuery.inArray(rowId,selectedRows)  != -1){
		setFieldClass('M');
	}else{
		setFieldClass('P');
	}
}

function initTotalData(rTransKey){
	if( rTransKey == null || rTransKey == "") return ;
	$.ajax({
		url: '/UtanWeb/CommUtilServlet',
		dataType:'json',
		type:'POST',
		data:'OPERTYPE=FinTolData&TOL_TRANS_KEY='+rTransKey,
		async:false,
		error:function(){
			alert('获取历史融资所有信息通信失败!');
			return ;
		},
		success: function(jsonData){
			initTotalInfo(jsonData);
		}
	});
}

function initTotalInfo(tolData){
	if( tolData.rows != null ){
		var rowData = tolData.rows[0];
		var hisTolAmt = FormatStr2Amt(rowData.HIS_TOL_AMT); // modify by liaorizhi 2012-11-8 格式化金额
		var retPayAmt = FormatStr2Amt(rowData.RET_PAY_AMT); // modify by liaorizhi 2012-11-8 格式化金额
		
		$('#R_FIN_TOTAL_CCY').val(rowData.FIN_CCY);
		setFieldValue($('#R_FIN_TOTAL_AMT').get(0),rowData.HIS_TOL_AMT);
		setFieldValue($('#R_UN_TOTAL_AMT').get(0),( hisTolAmt - retPayAmt));
		setFieldValue($('#R_UN_TOTAL_INT_AMT').get(0),rowData.HIS_UNPAY_INT);
		setFieldValue($('#R_UN_TOTAL_DELAY_AMT').get(0),rowData.HIS_DELAY_INT);
		setFieldValue($('#RET_TOTAL_INT_AMT').get(0),(rowData.FIN_TOTAL_INT));
		setFieldValue($('#R_TOTAL_NO').get(0),(Number(rowData.RET_COUNT) + 1));
		
		if (!$('#EQ_TOTAL_CCY').val()) $('#EQ_TOTAL_CCY').val(rowData.FIN_TRANS_CCY);
	}
}

function showAllFinData(allRows,oper){
	if( allRows == null || allRows.length == 0 ) return ;
	if( oper == null || oper == "" ) oper = "+";
	
	setFieldValue($('#R_TOTAL_AMT').get(0),0);
	setFieldValue($('#R_TOTAL_DELAY_AMT').get(0),0);
	setFieldValue($('#R_TOTAL_INT_AMT').get(0),0);
	setFieldValue($('#FIN_INT_TOTAL_AMT').get(0),0);
	setFieldValue($('#FIN_INT_TOTAL_AMT_SH').get(0),0);
	setFieldValue($('#R_TOTAL_AMT0').get(0),0);
	//showClickRow(1);
	
	var rowData;
	$.each( allRows, function(i, n){
		rowData = jQuery('#REPAY_PUR_GRID').jqGrid('getRowData',n);
		if( oper == "+" ){
			showFinData(n,rowData,oper);
			setFieldClass('M');
		}else{
			jQuery('#REPAY_PUR_GRID').jqGrid('setRowData',n,{
					FIN_INT_AMT:0,
					FIN_DELAY_INT_AMT:0,
					FIN_DELAY_DAY:0,
					RET_SS_AMT:0,
					RET_SS_TOTAL_AMT:0});
			setFieldClass('P');
		}
	});
}

function initSsRetAmt(obj,rowId){
	if( rowId == -1 ) return ;
			
	var maxValue = getFieldValue($('#RET_YH_AMT').get(0));
	var minValue = getFieldValue($('#R_FIN_INT_TOTAL_AMT').get(0));
	
	checkMaxOrMinValue(obj,maxValue,minValue);
	
	var ssAmt = getFieldValue(obj);
	var ysAmt = getFieldValue($('#RET_YH_AMT').get(0));
	if( isNaN(ssAmt) ) return ;
	
	if( ssAmt < maxValue ){
		$('#FIN_REPAY_TYPE').val("4");
	}else if( ssAmt == maxValue ){
		$('#FIN_REPAY_TYPE').val("1");
	}
	
	//calThisFinInterAmt(rowId);
	var rowData = jQuery('#REPAY_PUR_GRID').jqGrid('getRowData',rowId);
	jQuery('#REPAY_PUR_GRID').jqGrid('setRowData',rowId,{
//			FIN_INT_AMT:getFieldValue($('#R_FIN_INT_AMT').get(0)),
			FIN_INT_AMT:getFieldValue($('#FIN_INT_TOTAL_AMT_SH').get(0)),
			FIN_DEFER_INT_AMT:getFieldValue($('#R_FIN_DEFER_INT_AMT').get(0)),
			FIN_DELAY_INT_AMT:getFieldValue($('#R_FIN_DELAY_INT_AMT').get(0)),
			FIN_DELAY_DAY:$('#R_FIN_DELAY_DAY_NUM').val(),
			FIN_DEFER_DAY:$('#R_FIN_DEFER_DAYNUM').val(),
			RET_SS_AMT:getFieldValue($('#RET_SH_AMT').get(0)),
			RET_SS_TOTAL_AMT:(getFieldValue($('#R_FIN_INT_TOTAL_AMT').get(0)) + getFieldValue($('#RET_SH_AMT').get(0)))
			});
	calTotalData("+-");
	onFinChange("+");
	calRealRetAmt();
}
function initSsRetInt(obj,rowId){
	if( rowId == -1 ) return ;
			
	var maxValue = getFieldValue($('#FIN_INT_TOTAL_AMT').get(0));
	var minValue = 0;
	
//	checkMaxOrMinValue(obj,maxValue,minValue);
	
	var ssAmt = getFieldValue(obj);
	var ysAmt = getFieldValue($('#RET_YH_AMT').get(0));
	if( isNaN(ssAmt) ) return ;
	var rowData = jQuery('#REPAY_PUR_GRID').jqGrid('getRowData',rowId);
	jQuery('#REPAY_PUR_GRID').jqGrid('setRowData',rowId,{
			FIN_INT_AMT:getFieldValue($('#FIN_INT_TOTAL_AMT_SH').get(0))		
			});
	calRealRetAmt();
}
function calTotalData(oper){
	var allRows = jQuery("#REPAY_PUR_GRID").jqGrid('getGridParam','selarrrow');
	var rowData;
	var totalAmt = 0;
	$.each( allRows, function(i, n){
		rowData = jQuery('#REPAY_PUR_GRID').jqGrid('getRowData',n);
		totalAmt = totalAmt + Number(rowData.RET_SS_AMT);
	});
	setFieldValue($('#R_TOTAL_AMT0').get(0),totalAmt);
	
	var totalDelAmt = getFieldValue($('#R_TOTAL_DELAY_AMT').get(0));
	var totalIntAmt = getFieldValue($('#R_TOTAL_INT_AMT').get(0));
	if( oper == "+" ){
		totalDelAmt += getFieldValue($('#R_FIN_DELAY_INT_AMT').get(0));
		totalIntAmt += getFieldValue($('#R_FIN_INT_AMT').get(0)) + getFieldValue($('#R_FIN_DEFER_INT_AMT').get(0));
	}else if( oper == "-" ){
		totalDelAmt = totalDelAmt - getFieldValue($('#R_FIN_DELAY_INT_AMT').get(0));
		//[Bugfree_998_出口托收的还押汇:若有两笔还押汇信息，不停地勾选其中一笔，应还/实还总利息会随着变化]_B fanr 2013-9-22
		totalIntAmt = totalIntAmt - getFieldValue($('#R_FIN_INT_AMT').get(0)) - getFieldValue($('#R_FIN_DEFER_INT_AMT').get(0));
		//[Bugfree_998_出口托收的还押汇:若有两笔还押汇信息，不停地勾选其中一笔，应还/实还总利息会随着变化]_E fanr 2013-9-22
	}else if( oper == "+-" ){
		totalDelAmt = totalDelAmt - $('#R_FIN_DELAY_INT_AMT_TEM').val() + getFieldValue($('#R_FIN_DELAY_INT_AMT').get(0));
		totalIntAmt = totalIntAmt - $('#R_FIN_INT_AMT_TEM').val() - $('#R_FIN_DEFER_INT_AMT_TEM').val()
		+ getFieldValue($('#R_FIN_INT_AMT').get(0)) + getFieldValue($('#R_FIN_DEFER_INT_AMT').get(0));
	}
	if( totalDelAmt < 0 ) totalDelAmt = 0;
	if( totalIntAmt < 0 ) totalIntAmt = 0;
	//setFieldValue($('#R_TOTAL_DELAY_AMT').get(0),totalDelAmt);
	//setFieldValue($('#R_TOTAL_INT_AMT').get(0),totalIntAmt);
	//setFieldValue($('#FIN_INT_TOTAL_AMT').get(0),totalIntAmt + totalDelAmt);
	//setFieldValue($('#FIN_INT_TOTAL_AMT_SH').get(0),totalIntAmt + totalDelAmt);
	
	//setFieldValue($('#R_TOTAL_AMT').get(0),(totalAmt + totalDelAmt + totalIntAmt));
	$('#R_TOTAL_CCY').val($('#R_FIN_CCY').val());
	
	//add by wulei 计算交易币种的还款金额
	var rAmt = getFieldValue($('#R_TOTAL_AMT')[0]);
	var rCcy = $('#R_TOTAL_CCY').val();
	var tCcy = $('#EQ_TOTAL_CCY').val();
	var tAmt = rAmt;
	if (rCcy == tCcy) {
		//do nothing
	} else {
		tAmt = accMul(rAmt,getExRateByType(rCcy,tCcy,'BS'));
	}
	setFieldValue($('#EQ_TOTAL_AMT')[0], tAmt);
}

function formatFinToXML(){
	var rowData ;
	var allRows = jQuery("#REPAY_PUR_GRID").jqGrid('getDataIDs');
	$.each( allRows, function(i, n){	
		jQuery('#REPAY_PUR_GRID').jqGrid('saveRow',n,null,'clientArray');
	});
	var selectedRows = jQuery("#REPAY_PUR_GRID").jqGrid('getGridParam','selarrrow');
	
	if( allRows != null && allRows.length > 0 ){		
		var formatXml = '';
		formatXml = "<?xml version='1.0' encoding='GBK'?><purchase><rows>";
		$.each( allRows, function(i, n){
			rowData = jQuery('#REPAY_PUR_GRID').jqGrid('getRowData',n);
			
			var rowXml = '';
			var isSelect = "N";
			rowXml = '<row>';
			
			rowXml = rowXml + '<cell>'+rowData.FIN_NO+'</cell>';		
			rowXml = rowXml + '<cell>'+rowData.FIN_TRANS_REF+'</cell>';		
			rowXml = rowXml + '<cell>'+rowData.FIN_CCY+'</cell>';	
			rowXml = rowXml + '<cell>'+rowData.FIN_AMT+'</cell>';	
			rowXml = rowXml + '<cell>'+rowData.RET_PAY_AMT+'</cell>';	
			rowXml = rowXml + '<cell>'+rowData.FIN_DATE+'</cell>';	
			rowXml = rowXml + '<cell>'+rowData.FIN_MAT_DATE+'</cell>';	
			rowXml = rowXml + '<cell>'+rowData.FIN_INT+'</cell>';	
			rowXml = rowXml + '<cell>'+rowData.FIN_INT_AMT+'</cell>';	
			rowXml = rowXml + '<cell>'+rowData.FIN_DELAY_INT+'</cell>';
			rowXml = rowXml + '<cell>'+rowData.FIN_DELAY_INT_AMT+'</cell>';	
			rowXml = rowXml + '<cell>'+rowData.FIN_DELAY_DAY+'</cell>';
			rowXml = rowXml + '<cell>'+rowData.FIN_DAY_NUM+'</cell>';	
			rowXml = rowXml + '<cell>'+rowData.RET_SS_AMT+'</cell>';	
			rowXml = rowXml + '<cell>'+rowData.FIN_TRANS_TYPE+'</cell>';	
			rowXml = rowXml + '<cell>'+rowData.FIN_INT_FLAG+'</cell>';	
			rowXml = rowXml + '<cell>'+rowData.RET_SS_TOTAL_AMT+'</cell>';	
			rowXml = rowXml + '<cell>'+rowData.RET_COUNT+'</cell>';	
			rowXml = rowXml + '<cell>'+rowData.PURREPAY_ACCNO+'</cell>';	
			rowXml = rowXml + '<cell>'+rowData.FIN_ACC_NO+'</cell>';
			rowXml = rowXml + '<cell>'+rowData.DK_ACCNO+'</cell>';
			rowXml = rowXml + '<cell>'+rowData.FIN_CARD_NO+'</cell>';
			rowXml = rowXml + '<cell>'+rowData.DK_ACCNO_SUBJECT+'</cell>';
			rowXml = rowXml + '<cell>'+rowData.FIN_CONTRACT_NO+'</cell>';
			rowXml = rowXml + '<cell>'+rowData.FIN_TRANS_KEY+'</cell>';
			
			
			if ( jQuery.inArray(n,selectedRows)  != -1){
				isSelect = "Y";
			}
			
			rowXml = rowXml + '<cell>'+isSelect+'</cell>';
			
			rowXml = rowXml + '</row>';
			formatXml = formatXml + rowXml;
		});
		formatXml = formatXml + '</rows></purchase>';
		$('#RET_FIN_DATA_GRID').get(0).value = formatXml;
	}
//[Bugfree_1766_系统支持本币以外的币别押汇，但是不支持本币以外的其他币别还押汇]_B fanr 2013-11-1
	formatRetFinXmlForVou();
}


function formatRetFinXmlForVou(){
	
	var formatXml = "";
	var accNo = "TEMP"; // 并不显示在分录里
	var ccy = $('#R_TOTAL_CCY').val();
	var amt = getFieldValue('R_TOTAL_AMT');
	
	var eqCcy = getFieldValue('EQ_TOTAL_CCY');
	var eqAmt = getFieldValue('EQ_TOTAL_AMT');
	var taskName = getFieldValue('TASKNAME');
	
	if (ccy == eqCcy || taskName != "EXNGSettlement") {
		$("#RET_FIN_DATA_VOU").val("");
		return;
	}
	
	if( ccy  && accNo  && amt ){
		formatXml = "<?xml version='1.0' encoding='GBK'?><CUSTACC_VOU><ACCOUNTS>";
		var account = '';
		
		var cnyAmt = (amt.accMul(getExRateByType(ccy,'CNY','BS'))).toFixed(2);
		var ppCnyAmt = (amt.accMul(getExRateByType(ccy,'CNY','PPBS'))).toFixed(2);
		
		account = "<ACCOUNT>";
		account = account + "<ACC_DCFLAG>Dr</ACC_DCFLAG>"; // 借贷标记
		account = account + "<IS_COMPUTER_FLAG>NO</IS_COMPUTER_FLAG>"; // 是否参与记账分录
		account = account + "<ACC_CUSTID>"+getFieldValue("R_CUST_ID")+"</ACC_CUSTID>"; // 客户号
		account = account + "<ACC_NO></ACC_NO>"; // 账号
		account = account + "<ACC_CCY>"+eqCcy+"</ACC_CCY>";
		account = account + "<ACC_AMT>"+eqAmt+"</ACC_AMT>";
		account = account + "<ACC_BUYRATE>"+getCCYRateByType(eqCcy, 'B')+"</ACC_BUYRATE>";
		account = account + "<ACC_SELRATE>"+getCCYRateByType(eqCcy,'S')+"</ACC_SELRATE>";
		account = account + "<ACC_PP_BUYRATE>"+getCCYRateByType(eqCcy,'PB')+"</ACC_PP_BUYRATE>";
		account = account + "<ACC_PP_SELRATE>"+getCCYRateByType(eqCcy,'PS')+"</ACC_PP_SELRATE>";
		account = account + "<ACC_CNY>"+cnyAmt+"</ACC_CNY>";
		account = account + "<ACC_PP_CNY>"+ppCnyAmt+"</ACC_PP_CNY>";
		account = account + '<ACC_JSHDM>100</ACC_JSHDM>';
		account = account + '<ACC_JSHDX>01</ACC_JSHDX>';
		account = account + '<ACC_USD_BUYRATE>'+getCCYRateByType('USD','B')+'</ACC_USD_BUYRATE>';
		account = account + '<ACC_USD_SELRATE>'+getCCYRateByType('USD','S')+'</ACC_USD_SELRATE>';
		account = account + '<ACC_MIDRATE>'+getCCYRateByType(eqCcy,'M')+'</ACC_MIDRATE>';
		account = account + '<ACC_VOUTYPE>RET_FIN</ACC_VOUTYPE>';//区分是什么帐
		account = account + "</ACCOUNT>";
		
		account = account + "<ACCOUNT>";
		account = account + "<ACC_DCFLAG>Cr</ACC_DCFLAG>"; // 借贷标记
		account = account + "<IS_COMPUTER_FLAG>NO</IS_COMPUTER_FLAG>"; // 是否参与记账分录
		account = account + "<ACC_CUSTID>"+getFieldValue("R_CUST_ID")+"</ACC_CUSTID>"; // 客户号
		account = account + "<ACC_NO></ACC_NO>"; // 账号
		account = account + "<ACC_CCY>"+ccy+"</ACC_CCY>";
		account = account + "<ACC_AMT>"+amt+"</ACC_AMT>";
		account = account + "<ACC_BUYRATE>"+getCCYRateByType(ccy,'B')+"</ACC_BUYRATE>";
		account = account + "<ACC_SELRATE>"+getCCYRateByType(ccy,'S')+"</ACC_SELRATE>";
		account = account + "<ACC_PP_BUYRATE>"+getCCYRateByType(ccy,'PB')+"</ACC_PP_BUYRATE>";
		account = account + "<ACC_PP_SELRATE>"+getCCYRateByType(ccy,'PS')+"</ACC_PP_SELRATE>";
		account = account + "<ACC_CNY>"+cnyAmt+"</ACC_CNY>";
		account = account + "<ACC_PP_CNY>"+ppCnyAmt+"</ACC_PP_CNY>";
		account = account + '<ACC_JSHDM>100</ACC_JSHDM>';
		account = account + '<ACC_JSHDX>01</ACC_JSHDX>';
		account = account + '<ACC_USD_BUYRATE>'+getCCYRateByType('USD','B')+'</ACC_USD_BUYRATE>';
		account = account + '<ACC_USD_SELRATE>'+getCCYRateByType('USD','S')+'</ACC_USD_SELRATE>';
		account = account + '<ACC_MIDRATE>'+getCCYRateByType(ccy,'M')+'</ACC_MIDRATE>';
		account = account + '<ACC_VOUTYPE>RET_FIN</ACC_VOUTYPE>';//区分是什么帐
		account = account + "</ACCOUNT>";
		
		
		formatXml = formatXml + account;
		formatXml = formatXml　+　'</ACCOUNTS></CUSTACC_VOU>';
	}
	$("#RET_FIN_DATA_VOU").val(formatXml);
}
//[Bugfree_1766_系统支持本币以外的币别押汇，但是不支持本币以外的其他币别还押汇]_E fanr 2013-11-1

function initReleasePur(){
	var xmlStr = "",selectFlag = 'N';
	xmlStr = $('#RET_FIN_DATA_GRID').val();
	if( xmlStr != null && xmlStr != "" ){
		$('#REPAY_PUR_GRID').GridUnload();
		createRepayGrid('xmlstring',xmlStr,false);
		var xmlData = jQuery.jgrid.stringToDoc(xmlStr);
		$(xmlData).find("rows > row").each(function(i){
	        selectFlag = $(this).find('cell').eq(22).text();

	        if( selectFlag == 'Y' ){
	        	jQuery("#REPAY_PUR_GRID").jqGrid('setSelection',(i+1),false);
	        }
	    }); 
	}
	isShowRepayPurPage();
} 

function initFixPengingPur(){
	var xmlStr = "",selectFlag = 'N';
	xmlStr = $('#RET_FIN_DATA_GRID').val();
	if( xmlStr != null && xmlStr != "" ){
		var preRetDate = $('#RET_DATE').val();
		var currDate = getSysDate();
		if(preRetDate != currDate){
			$('#IS_NOT_ONE_DATE_FIX').val("Y");//隔日修改交易
		}
		$('#RET_DATE').val( getSysDate() );
		$('#REPAY_PUR_GRID').GridUnload();
		createRepayGrid('xmlstring',xmlStr,true);
		var xmlData = jQuery.jgrid.stringToDoc(xmlStr);
		$(xmlData).find("rows > row").each(function(i){ 
	        selectFlag = $(this).find('cell').eq(22).text();
	        if( selectFlag == 'Y' ){
	        	jQuery("#REPAY_PUR_GRID").jqGrid('setSelection',(i+1),false);
	        	 setProperty($('#RET_SH_AMT').get(0),"M");
	        	currRowIdREP = i+1;
	        }
	    }); 
	}
	isShowRepayPurPage();
}

//[Bugfree_1832_控制在同币种还押汇的时候是否允许一次还多笔：true-允许；false-不允许]_B wulei 2013-10-09
function setFieldClass(classType){
	setProperty($('#RET_SH_AMT').get(0),classType);
}
//[Bugfree_1832_控制在同币种还押汇的时候是否允许一次还多笔：true-允许；false-不允许]_E wulei 2013-10-09

function onFinChange(flag){
	if( typeof(onRepayPurChange) == 'function' ){
		onRepayPurChange(flag);
	}
}

function calThisFinInterAmt(rowId){//计算利息金额
	/**var rowData = jQuery('#REPAY_PUR_GRID').jqGrid('getRowData',rowId);
	var type = rowData.FIN_INT_FLAG;
	var finAmt = getFieldValue( $('#RET_SH_AMT').get(0) );
	var ccy = $('#R_FIN_CCY').val();
	var baseDayNum = UtanGlobalCache("ccy").get()[ccy].BASEDAYNUM;
	var finIntAmt = 0,delIntAmt = 0,deferIntAmt = 0;
	if( type == "RETURN_LATER" ){
		var finDays = $('#R_FIN_DAYNUM').val();
		var finInt = getFieldValue( $('#R_FIN_INT').get(0) );
		finIntAmt = div(accMul(accMul(finAmt,finDays),finInt),accMul(baseDayNum,100));
		(finAmt * 1 * finDays * finInt) / ( baseDayNum * 100 );		finIntAmt = finIntAmt.toFixed(2);
		setFieldValue( $('#R_FIN_INT_AMT').get(0),finIntAmt);
	}else{
		setFieldValue( $('#R_FIN_INT_AMT').get(0),0 );
	}
	
	var delInt = getFieldValue( $('#R_FIN_DELAY_INT').get(0) );
	var delDays = $('#R_FIN_DELAY_DAY_NUM').val();
	delIntAmt = div(accMul(accMul(finAmt,delDays),delInt),accMul(baseDayNum,100));
	(finAmt * 1 * delDays * delInt) / ( baseDayNum * 100 );	delIntAmt = delIntAmt.toFixed(2);
	setFieldValue( $('#R_FIN_DELAY_INT_AMT').get(0),delIntAmt);
	
	add by wulei 计算展期利息	var deferInt = getFieldValue($('#R_FIN_DEFER_INT').get(0));
	var deferDays = $('#R_FIN_DEFER_DAYNUM').val();
	deferIntAmt = div(accMul(accMul(finAmt,deferDays),deferInt),accMul(baseDayNum,100));
	(finAmt * 1 * deferDays * deferInt) / ( baseDayNum * 100 );	deferIntAmt = deferIntAmt.toFixed(2);
	setFieldValue( $('#R_FIN_DEFER_INT_AMT').get(0),deferIntAmt);
	
	setFieldValue( $('#R_FIN_INT_TOTAL_AMT').get(0),(Number(finIntAmt) + Number(delIntAmt) + Number(deferIntAmt)) );*/
}

function storeParam(){
	$('#R_FIN_INT_AMT_TEM').val( getFieldValue( $('#R_FIN_INT_AMT').get(0) ) );
	$('#R_FIN_DELAY_INT_AMT_TEM').val( getFieldValue( $('#R_FIN_DELAY_INT_AMT').get(0) ) );
	$('#R_FIN_DEFER_INT_AMT_TEM').val( getFieldValue( $('#R_FIN_DEFER_INT_AMT').get(0) ) );
}

function calDelayIntAmt(rowid,obj){
	storeParam();
	calThisFinInterAmt(rowid);
	jQuery('#REPAY_PUR_GRID').jqGrid('setRowData',rowid,{
					FIN_DELAY_INT:obj.value,
					FIN_DELAY_INT_AMT:getFieldValue($('#R_FIN_DELAY_INT_AMT').get(0)),
					RET_SS_AMT:getFieldValue($('#RET_SH_AMT').get(0)),
					RET_SS_TOTAL_AMT:(getFieldValue($('#R_FIN_INT_TOTAL_AMT').get(0)) + getFieldValue($('#RET_SH_AMT').get(0)))
					});
	calTotalData("+-");
	onFinChange("+");
}

//[Bugfree_1832_控制在同币种还押汇的时候是否允许一次还多笔：true-允许；false-不允许]_B wulei 2013-10-09
var __ISSELECTFLAG = false;//记录是否有没有选中,与__isMultRepayFlag联合使用，当__isMultRepayFlag为false的时候用于记录是否有选中的记录
function checkSelectStatus(rowid,oper,str){
	if (__isMultRepayFlag) return false;//如果设置为允许多选，则跳过记录是否有没有选中
	if( oper == '+' ){
		if( __ISSELECTFLAG ){
			jQuery("#REPAY_PUR_GRID").jqGrid('setSelection',rowid,false);
			alert(str);
			return true;
		}else{
			__ISSELECTFLAG = true;
			return false;
		}
	}else{
		__ISSELECTFLAG = false;
		return false;
	}
}

function checkSelectAllStatus(aRowids,str){
	if (__isMultRepayFlag) return false;
	
	if( aRowids.length > 1 ){
		jQuery("#REPAY_PUR_GRID").jqGrid('resetSelection');
		for(var j=0;j<__currSelectedRows.length;j++){
			jQuery("#REPAY_PUR_GRID").jqGrid('setSelection',__currSelectedRows[j],false);
		}
		alert(str);
		return true;
	}else if( aRowids.length == 1 ){
		__ISSELECTFLAG = true;
		return false;
	}
}
//[Bugfree_1832_控制在同币种还押汇的时候是否允许一次还多笔：true-允许；false-不允许]_E wulei 2013-10-09

function calRealRetAmt(){
	var intAmt = getFieldValue( $('#FIN_INT_TOTAL_AMT_SH').get(0) );
	var repAmt = getFieldValue( $('#RET_SH_AMT').get(0) );
	var tAmt = intAmt+repAmt;
	setFieldValue($('#R_TOTAL_AMT').get(0),tAmt);
		var rCcy = $('#R_TOTAL_CCY').val();
	var tCcy = $('#EQ_TOTAL_CCY').val();
	if (rCcy == tCcy) {
	} else {
		tAmt = accMul(tAmt,getExRateByType(rCcy,tCcy,'BS'));
	}
	setFieldValue($('#EQ_TOTAL_AMT')[0], tAmt);
}
