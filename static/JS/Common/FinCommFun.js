/**
 * 押汇处理
 */
//Function For Purchase By WL 20100420

var __SynInterestRateFlag = false;

var __IRData = new Array();
var tempParam = new Array();

var __FIN_BILL_CCY = "";
var __FIN_BILL_AMT = 0;
var __FIN_CUST_ID = "";
var __FIN_TRANS_TYPE = "";
var __FIN_TRANS_KEY = "";
var __initFinFlag = false;

var __ccyFlag = false;
//IR Pay Flag
var __IR_PAY_PRE_THIS = "PRE_THIS";
var __IR_PAY_RETURN_LATER  = "RETURN_LATER";

//Function init Finance info
function initFinSysInfo(){
	var custId = $('#FIN_CUST_ID').val();
	var trxCCY = $('#FIN_TRANS_CCY').val();
	var trxAMT = getFieldValue( $('#FIN_TRANS_AMT').get(0) );
	var finTransKey = $('#FIN_TRANS_KEY_TMP').val();
	var finTransType = $('#FIN_TRANS_TYPE').val();
	
	if(!custId || !trxCCY || !finTransKey || !finTransType){
		//alert("客户ID、交易币别、交易编号、押汇类型不能为空，请检查！");
		return ;
	}
	
	setExRateCustid(custId);
	__FIN_TRANS_KEY = finTransKey;
	__FIN_TRANS_TYPE = finTransType;
	getHisFinInfo("init");
	
	initFinancPage(custId,trxCCY,trxAMT);
	
	initExRateInfo(custId,trxAMT);
	if( !__SynInterestRateFlag ) initInterestRate();
}

//Function init InterestRate From DB
function initInterestRate(){
	if( __FIN_CUST_ID == null || __FIN_CUST_ID == "") return ;
	var jsonData = callFunction("F_GET_INTEREST", "", "JSON_HM");
	if(setInterestRate(jsonData)){
		__SynInterestRateFlag = true;	        
	  }
}

//Function setInterestRate			
function setInterestRate(IRData){
	if( IRData.rows == null || IRData.rows.length == 0 ) return;
    var bRet = false;
	var IRCount = IRData.rows.length;
	var rowData;
	for(var i = 0;i<IRCount;i++){
		rowData = IRData.rows[i];
		__IRData[rowData.IRTYPE + "#" + rowData.CCY + "#" + rowData.IRTERM] = rowData;
		//alert(rowData.IRTYPE + "#" + rowData.CCY + "#" + rowData.IRTERM);
	}
	bRet = true;
	return bRet;
}

function initFinancPage(custId,billCcy,billAmt){
	if( !custId || !billCcy || billAmt == null ){
		__initFinFlag = false;
		return;
	}else{
		//setFieldValue($('#FIN_CUST_ID').get(0),custId);
		//setFieldValue($('#FIN_TRANS_CCY').get(0),billCcy);
		//setFieldValue($('#FIN_TRANS_AMT').get(0),billAmt);
		var maxPer = getFieldValue($('#FIN_MAX_PER').get(0));
		var maxAmt = getFieldValue($('#FIN_MAX_AMT').get(0));
		var yetFinAmt = getFieldValue($('#HIS_TOL_AMT').get(0));
		
		$('#FIN_CURR_TOTAL_CCY').val(billCcy);
		
		// modify by lrz 20120703,其它融资业务，修改押汇金额，报出已超出最大比例
//		if( isNaN(maxPer) || maxPer == '' || maxPer == 0 || maxPer== null ) setFieldValue($('#FIN_MAX_PER').get(0),100);
//		if( isNaN(maxAmt) || maxAmt == '' || maxAmt == 0 || maxAmt == null ) setFieldValue($('#FIN_MAX_AMT').get(0),billAmt);
//		
//		maxAmt = getFieldValue($('#FIN_MAX_AMT').get(0));
		
		setFieldValue($('#FIN_MAX_PER').get(0),100);
		setFieldValue($('#FIN_MAX_AMT').get(0),billAmt);
		maxAmt = billAmt;
		var maxAmt1 = maxAmt-yetFinAmt;//modify by ldd 20130828
		// modify by lrz 20120703
		
		setFieldValue($('#FIN_DATE').get(0),getSysDate());
		//setFieldValue($('#FIN_MAT_DATE').get(0),getSysDate());
		
		var finBalAmt0 = getFieldValue($('#FIN_BAL_AMT0').get(0));
		if( finBalAmt0 == -1 ){
			setFieldValue($('#FIN_BAL_AMT').get(0),maxAmt);
		}
		setFieldValue($('#FIN_BAL_AMT').get(0),maxAmt1);//modify by ldd 20130828
		setFieldValue($('#FIN_SS_CCY').get(0),billCcy );
		
		__FIN_CUST_ID = custId;
		__FIN_BILL_CCY = billCcy;
		__FIN_BILL_AMT = billAmt;
		__initFinFlag = true;
		
		calCurrTotalFinAmt();
	}
}

//检查当存在融资金额的时候不能调整比例
function checkFinMaxAmt(obj) {
	var sorAmt = getFieldValue($('#FIN_SOR_AMT').get(0));
	if (sorAmt > 0) {
		alert("当存在融资金额的时候不能调整比例！请先清空融资金额！");
		return false;
	}
}

//calculate the max finance amount  改变最大融资比例
function calFinMaxAmt(obj){
	if( !__initFinFlag ) return;

	var yetFinAmt = getFieldValue($('#HIS_TOL_AMT').get(0));
//	checkMaxOrMinValue(obj,100,div(accMul(yetFinAmt,100),__FIN_BILL_AMT));
	
	//For the max finance amt  计算最大融资金额
	var finMaxPercentage = getFieldValue( obj ) / 100;
	var finMaxAmt = __FIN_BILL_AMT * finMaxPercentage;
	setFieldValue($('#FIN_MAX_AMT').get(0),finMaxAmt);
	
	calCurrFinPercentage();//for the this finance percentage
	
	//for the surplus finance amt  计算融资余额
	var finYetAmt = getFieldValue($('#HIS_TOL_AMT').get(0));
	if( isNaN(finYetAmt) ) finYetAmt = 0;
	var finSurAmt = finMaxAmt - finYetAmt;
	var finBalAmt0 = getFieldValue($('#FIN_BAL_AMT0').get(0));
	var finBalAmt = getFieldValue($('#FIN_BAL_AMT').get(0));
	if( finBalAmt0 == -1 ){
		setFieldValue($('#FIN_BAL_AMT').get(0),finSurAmt);
	}else{
		setFieldValue($('#FIN_BAL_AMT').get(0),finSurAmt);
		//setFieldValue( $('#FIN_BAL_AMT').get(0),finBalAmt0 - getFieldValue( $('#FIN_AMT').get(0) ) );
	}
	calCurrTotalFinAmt();
}

//For this finance amt  改变融资本次金额
function calFinPercentage(){
	if( !checkStatus() ) return;
	if( !__initFinFlag ) return;
	
	var finCurrCcy = $('#FIN_CCY').val();
	var tranCcy = $('#FIN_TRANS_CCY').val();
	
	var maxValue = getFieldValue($('#FIN_BAL_AMT').get(0));
	maxValue = maxValue * getExRateByType(tranCcy,finCurrCcy,__FEE_CURR_RATE_TYPE_SB);
	var minValue = 0;
	var taskname = getFieldValue("TASKNAME");
	if(taskname != "IMBLPURCHASE"){
//		checkMaxOrMinValue($('#FIN_AMT').get(0),maxValue,minValue);
	}
	
	var finCurrAmt = getFieldValue( $('#FIN_AMT').get(0) );
	finCurrAmt = finCurrAmt * getExRateByType(finCurrCcy,tranCcy,__FEE_CURR_RATE_TYPE_BS);
	setFieldValue($('#FIN_SOR_AMT').get(0),finCurrAmt);
	
	calCurrFinPercentage();//for this finance percentage   计算本次融资比例
	calCurrInterAmt();//for this finance interestrate amt   计算本次利息金额
	calCurrTotalFinAmt();//for total finance amt
	calRealityAmt();
}

function calFinPercentage2(){
	if( !checkStatus() ) return;
	if( !__initFinFlag ) return;
	
	var finCurrCcy = $('#FIN_CCY').val();
	var tranCcy = $('#FIN_TRANS_CCY').val();
	
	var finCurrAmt = getFieldValue( $('#FIN_SOR_AMT').get(0) );
	finCurrAmt = finCurrAmt * getExRateByType(tranCcy,finCurrCcy,__FEE_CURR_RATE_TYPE_SB);
	setFieldValue($('#FIN_AMT').get(0),finCurrAmt);
	
	calCurrInterAmt();//for this finance interestrate amt   计算本次利息金额
	calCurrTotalFinAmt();//for total finance amt
}

// for this finance interestrate  改变本次融资比例
function calFinAmt(obj){
	if( !__initFinFlag ) return;
	
	var maxAmt = getFieldValue($('#FIN_MAX_AMT').get(0));
	var balAmt = getFieldValue($('#FIN_BAL_AMT').get(0));
//	checkMaxOrMinValue(obj,accMul(div(balAmt, maxAmt), 100),0);
	
	var finCurrAmt = div(accMul(maxAmt,getFieldValue(obj)),100);
	setFieldValue($('#FIN_SOR_AMT').get(0),finCurrAmt);
	
	calFinPercentage2();
}

function calMaturityDay(obj){
	if( !checkStatus() ) return;
	if( !__initFinFlag ) return;
	
	checkMinValue(obj,0);
	
	var finDayNum = getFieldValue( obj );
	if( finDayNum == null || finDayNum =='' ){
		finDayNum = 0;
		obj.value = 0;
	}
	var finCurrDate = getFieldValue( $('#FIN_DATE').get(0) );
	var finMatuDate = Date2Str(getNextDate(finCurrDate,finDayNum));
	setFieldValue($('#FIN_MAT_DATE').get(0),finMatuDate);
	
	calCurrPercentage();
}

function calFinDayNum(obj){
	if( !__initFinFlag ) return;
	if( !checkStatus() ) return;
	var finCurrDate = getFieldValue( $('#FIN_DATE').get(0) );
	var finMatuDate = getFieldValue( obj );
	var finDayNum = subDays(finMatuDate,finCurrDate);
	setFieldValue($('#FIN_DAY_NUM').get(0),finDayNum);
	
	calCurrPercentage();
}

//calculate the total interestrate amount   计算利息总额
function calCurrTotalIntAmt(){
	if( !__initFinFlag ) return;
	var finIntFlag = getFieldValue( $('#FIN_INT_FLAG').get(0) );
	var finTotalIntAmt = 0;
	if( finIntFlag == __IR_PAY_PRE_THIS ){
		var finCurrIntAmt = getFieldValue( $('#FIN_INT_AMT').get(0) );
		var finDelayIntAmt = getFieldValue( $('#FIN_DELAY_INT_AMT').get(0) );
		if( isNaN(finCurrIntAmt) ) finCurrIntAmt = 0;
		if( isNaN(finDelayIntAmt) ) finDelayIntAmt = 0;
		finTotalIntAmt = finCurrIntAmt + finDelayIntAmt;
		setFieldValue($('#FIN_DRINT').get(0),finCurrIntAmt);
	}else if( finIntFlag == __IR_PAY_RETURN_LATER ){
		finTotalIntAmt = 0;
		setFieldValue($('#FIN_DRINT').get(0),0);
	}
	setFieldValue($('#FIN_INT_TOTAL_AMT').get(0),finTotalIntAmt);
	
	calRealityAmt(); //calculate the reality borrow amt  计算实际发放金额和币别
}

//calculate this finance percentage  计算本次融资比例
function calCurrFinPercentage(){
	if( !__initFinFlag ) return;
	var finMaxAmt = __FIN_BILL_AMT * ( getFieldValue($('#FIN_MAX_PER').get(0)) / 100 );
	var finCurrAmt = getFieldValue( $('#FIN_SOR_AMT').get(0) );
	if( isNaN(finCurrAmt) ) finCurrAmt = 0;
	var finCurrPercentage = finCurrAmt / finMaxAmt * 100;
	setFieldValue($('#FIN_PER').get(0),finCurrPercentage);
}

//calculate this interestrate amt  计算本次利息金额
function calCurrInterAmt(){
	if( !__initFinFlag ) return;
	var __CcyData = UtanGlobalCache("ccy").get();
	var baseDayNum = Number(__CcyData[__FIN_BILL_CCY].BASEDAYNUM);
	var finCurrAmt = getFieldValue( $('#FIN_AMT').get(0) );
	var finCurrInt = getFieldValue( $('#FIN_INT').get(0) );
	var finDayNum = getFieldValue( $('#FIN_DAY_NUM').get(0) );
	if( isNaN(finCurrAmt) ) finCurrAmt = 0;
	if( isNaN(finCurrInt) ) finCurrAmt = 1;
	var taskName=getFieldValue("TASKNAME");
	if(taskName=="IN_IMBLPURCHASE" || taskName=="IN_EXNGPURCHASE"){
		var finCurrIntAmt = (finCurrAmt * finCurrInt * finDayNum* 12) / ( baseDayNum * 1000 );
	}else{
		var finCurrIntAmt = (finCurrAmt * finCurrInt * finDayNum) / ( baseDayNum * 100 );
	}
	setFieldValue($('#FIN_INT_AMT').get(0),finCurrIntAmt);
//	setFieldValue( $('#FIN_DELAY_INT').get(0),finCurrInt );
	setFieldValue($('#FIN_DRINT').get(0),finCurrIntAmt);

	calCurrTotalIntAmt();//for total finance interestrate amt     计算利息总额
}

//calculate currently total finance amt  计算目前融资金额 和 目前融资所占比例
function calCurrTotalFinAmt(){
	if( !__initFinFlag ) return;
	var ospayFeedBack = $('#OSPAYFEEDBACK').val();//增加代付付款确认-支行反馈控制，不需要重新计算融资比例和
	if(ospayFeedBack=="YES") return;
	var finYetAmt = getFieldValue( $('#HIS_TOL_AMT').get(0) );
	var finCurrAmt = getFieldValue( $('#FIN_AMT').get(0) );
	var finCurrCcy = $('#FIN_CCY').val();
	finCurrAmt = finCurrAmt * getExRateByType(finCurrCcy,$('#FIN_TRANS_CCY').val(),__FEE_CURR_RATE_TYPE_BS);
	if( isNaN(finYetAmt) ) finYetAmt = 0;
	if( isNaN(finCurrAmt) ) finCurrAmt = 0;
	var finCurrTotalAmt = finYetAmt + finCurrAmt;
	setFieldValue($('#FIN_CURR_TOTAL_AMT').get(0),finCurrTotalAmt );
	
	var finMaxPercent = getFieldValue( $('#FIN_MAX_PER').get(0) ) / 100;
	var finMaxAmt = __FIN_BILL_AMT * finMaxPercent ;
	var finCurrTotalInt = (finCurrTotalAmt / finMaxAmt) * 100 ;
	setFieldValue($('#FIN_CURR_TOTAL_RATE').get(0),finCurrTotalInt );
}

//calculate the reality borrow amt  计算实际发放金额和币别
function calRealityAmt(){
	if( !__initFinFlag ) return;
	var finRealityAmt = 0;
	var finCCY = __FIN_BILL_CCY;
	var finTotalIntAmt = getFieldValue( $('#FIN_INT_TOTAL_AMT').get(0) );
	if( isNaN(finTotalIntAmt)) finTotalIntAmt = 0;
	
	var finCurrAmt = getFieldValue( $('#FIN_AMT').get(0) );
	if( isNaN(finCurrAmt)) finCurrAmt = 0;
	
	finRealityAmt = finCurrAmt - finTotalIntAmt;
	setFieldValue($('#FIN_SS_CCY').get(0),finCCY );
	setFieldValue($('#FIN_SS_AMT').get(0),finRealityAmt );
}

//calculate currently percentage  计算当前融资利率
function calCurrPercentage(){
	if( !__initFinFlag ) return;
	if( !__SynInterestRateFlag ) return ;
	if( !checkStatus() ) return;	
	calCurrInterAmt();
}

//Find the history finance info
function getHisFinInfo(flag){
	if( __FIN_TRANS_KEY == null || __FIN_TRANS_KEY == "") return ;
	$.ajax({
		url: '/UtanWeb/CommUtilServlet',
		dataType:'json',
		type:'POST',
		data:'OPERTYPE=HisFinanceData&FIN_TRANS_KEY='+__FIN_TRANS_KEY,
		async:false,
		error:function(){
			alert('获取历史融资信息通信错误!');
			return ;
		},
		success: function(jsonData){
			initHisFinInfo(jsonData,flag);
		}
	});

}

function initHisFinInfo(hisData,flag){
	if( hisData == null && flag == "init"){
		setFieldValue($('#HIS_TOL_AMT').get(0),0);
		setFieldValue($('#HIS_UNPAY_INT').get(0),0);
		setFieldValue($('#HIS_DELAY_INT').get(0),0);
		setFieldValue($('#FIN_BAL_AMT').get(0),0);
		setFieldValue($('#FIN_BAL_AMT0').get(0),-1);
		var billCcy = $('#FIN_TRANS_CCY').val();
		$('#FIN_CCY0').val(billCcy);
		$('#FIN_CCY').val(billCcy);
		$('#FIN_SS_CCY').val(billCcy);
	}else if(  hisData != null && flag == "init" ){
		__ccyFlag = true;
		var rowData = hisData.rows[0];

		setFieldValue($('#HIS_TOL_AMT').get(0),rowData.FIN_SOR_AMT);
		setFieldValue($('#HIS_UNPAY_INT').get(0),rowData.HIS_UNPAY_INT);
		setFieldValue($('#HIS_DELAY_INT').get(0),rowData.HIS_DELAY_INT);
		/*modify by wangx 20130722 start*/
		//setFieldValue($('#FIN_BAL_AMT').get(0),rowData.FIN_BAL_AMT);
		//setFieldValue($('#FIN_BAL_AMT0').get(0),rowData.FIN_BAL_AMT);
		setFieldValue($('#FIN_BAL_AMT').get(0),(getFieldValue( $('#FIN_TRANS_AMT').get(0) )*rowData.FIN_MAX_PER/100)-rowData.HIS_TOL_AMT);
		setFieldValue($('#FIN_BAL_AMT0').get(0),(getFieldValue( $('#FIN_TRANS_AMT').get(0) )*rowData.FIN_MAX_PER/100)-rowData.HIS_TOL_AMT);
		/*modify by wangx 20130722 end*/
		$('#FIN_CCY0').val(rowData.FIN_CCY);
		$('#FIN_CCY').val(rowData.FIN_CCY);
		$('#FIN_SS_CCY').val(rowData.FIN_CCY);
		
		setProperty($('#FIN_CCY').get(0),'P');
		setProperty($('#PURREPAY_ACCNO').get(0),'P');
		
		setFieldValue($('#FIN_MAX_PER').get(0),rowData.FIN_MAX_PER);
		setFieldValue($('#FIN_MAX_AMT').get(0),rowData.FIN_MAX_AMT);
		
		setFieldValue($('#FIN_BILLS_NO').get(0),rowData.FIN_BILLS_NO);
		
		createHisFinGrid(__FIN_TRANS_KEY);  
	}else if( hisData != null && flag == "fix" ){
		createHisFinGrid(__FIN_TRANS_KEY,flag);  
	}
}

function changeFinCcy(obj){
	var ccy = obj.value;
	if( !__ccyFlag ){
		$('#FIN_CCY0').val(ccy);
	}
	if( !checkStatus() ) return;
	__FIN_BILL_CCY = ccy;
	calMaturityDay( $('#FIN_DAY_NUM').get(0) );
	calFinPercentage();
}

function checkStatus(){
	var currType = $('#CURR_TASKTYPE').val();
	if( currType == null || currType == "" || currType == "RELEASE" ) return;
	var finTransType = __FIN_TRANS_TYPE;
	var finCcy = $('#FIN_CCY').val();
	var finIRTerm = "";
	var finDayCount = $('#FIN_DAY_NUM').val();
	if( isNaN(finDayCount)) finDayCount = 0;
	if( finDayCount == 0 ) return true;
	var __CcyData = UtanGlobalCache("ccy").get();
	var baseDayNum = Number(__CcyData[__FIN_BILL_CCY].BASEDAYNUM);
	//alert('baseDayNum---'+baseDayNum);
	//alert('finCcy---'+finCcy);
	//alert('finDayCount---'+finDayCount);
	if( finDayCount > 0 && finDayCount <= 30 ){
		finIRTerm = "1M";
	}else if( finDayCount > 30 && finDayCount <= 90 ){
		finIRTerm = "3M";
	}else if( finDayCount > 90 && finDayCount <= 180 ){
		finIRTerm = "6M";
	}else if( finDayCount > 180 && finDayCount <= 360 ){
		finIRTerm = "1Y";
	}else if( finDayCount > 360 ){
		finIRTerm = "2Y";
	}
	var finIntKey = finTransType + "#" + finCcy + "#" + finIRTerm;
	//alert("finIRTerm----"+finIRTerm+"==finTransType=="+finTransType+"==finIntKey="+finIntKey);
	if( __IRData[finIntKey] == null ){
		//alert("["+finCcy+"] 没有在利率表中维护！请检查！");
		//cancelTempParam();
		return true;
	}
	if( __IRData[finIntKey].IRVALUE == null ){
		//alert("["+finCcy+"] 没有在利率表中维护利率！请检查！");
		//cancelTempParam();
		return true;
	}
	if( __IRData[finIntKey].IR_COST_VALUE == null ){
		//alert("["+finCcy+"] 没有在利率表中维护成本利率！请检查！");
		//cancelTempParam();
		return true;
	}
	
	var finCurrInt = 0,finCostInt = 0;
	if( finDayCount <= 0 ){
		finCurrInt = 0;
		finCostInt = 0;
	}else{
		finCurrInt = __IRData[finIntKey].IRVALUE;
		finCostInt = __IRData[finIntKey].IR_COST_VALUE;
	}
	//alert("finCurrInt==="+finCurrInt+"===finCostInt=="+finCostInt);
	setFieldValue( $('#FIN_INT').get(0),finCurrInt );
	setFieldValue( $('#FIN_COST_INT').get(0),finCostInt );
	setFieldValue( $('#FIN_DELAY_INT').get(0),finCurrInt );

	return true;
}

function storeTempParam(){
	tempParam[0] = $('#FIN_CCY').val();
	tempParam[1] = getFieldValue( $('#FIN_AMT').get(0) );
	tempParam[2] = $('#FIN_DAY_NUM').val();
	tempParam[3] = $('#FIN_MAT_DATE').val();
}

function cancelTempParam(){
	$('#FIN_CCY').val(tempParam[0]);
	setFieldValue( $('#FIN_AMT').get(0),tempParam[1] );
	$('#FIN_DAY_NUM').val(tempParam[2]);
	$('#FIN_MAT_DATE').val(tempParam[3]);
}

function releaseFinSysInfo(){
	var custId = $('#FIN_CUST_ID').val();
	var trxCCY = $('#FIN_TRANS_CCY').val();
	var trxAMT = getFieldValue( $('#FIN_TRANS_AMT').get(0) );
	var finTransKey = $('#FIN_TRANS_KEY_TMP').val();
	var finTransType = $('#FIN_TRANS_TYPE').val();

	__FIN_TRANS_KEY = finTransKey;
	__FIN_TRANS_TYPE = finTransType;
	__FIN_CUST_ID = custId;
	__FIN_BILL_CCY = trxCCY;
	__FIN_BILL_AMT = trxAMT;
	getHisFinInfo("fix");
}

function fixFinSysInfo(){
	__initFinFlag = true;
	var custId = $('#FIN_CUST_ID').val();
	var trxCCY = $('#FIN_TRANS_CCY').val();
	var trxAMT = getFieldValue( $('#FIN_TRANS_AMT').get(0) );
	var finTransKey = $('#FIN_TRANS_KEY_TMP').val();
	var finTransType = $('#FIN_TRANS_TYPE').val();
	
	setExRateCustid(custId);
	__FIN_TRANS_KEY = finTransKey;
	__FIN_TRANS_TYPE = finTransType;
	__FIN_CUST_ID = custId;
	__FIN_BILL_CCY = trxCCY;
	__FIN_BILL_AMT = trxAMT;
	getHisFinInfo("fix");
	
	initExRateInfo(custId,trxAMT);
	if( !__SynInterestRateFlag ) initInterestRate();
}
function formatFinDeferToXml(){
	var rowData ;
	var allRows = jQuery("#FINANCING_HIS_GRID").jqGrid('getDataIDs');
	$.each( allRows, function(i, n){	
		jQuery('#FINANCING_HIS_GRID').jqGrid('saveRow',n,null,'clientArray');
	});
	var selectedRows = jQuery("#FINANCING_HIS_GRID").jqGrid('getGridParam','selarrrow');
	
	if( allRows != null && allRows.length > 0 ){		
		var formatXml = '';
		formatXml = "<?xml version='1.0' encoding='GBK'?><finpay><rows>";
		$.each( allRows, function(i, n){
			rowData = jQuery('#FINANCING_HIS_GRID').jqGrid('getRowData',n);
			
			var rowXml = '';
			var isSelect = "N";
			rowXml = '<row>';
			rowXml = rowXml + '<cell>'+rowData.FIN_TRANS_REF+'</cell>';		
			rowXml = rowXml + '<cell>'+rowData.FIN_CCY+'</cell>';		
			rowXml = rowXml + '<cell>'+rowData.FIN_AMT+'</cell>';	
			rowXml = rowXml + '<cell>'+rowData.FIN_INT+'</cell>';	
			rowXml = rowXml + '<cell>'+rowData.FIN_DATE+'</cell>';	
			rowXml = rowXml + '<cell>'+rowData.FIN_DAY_NUM+'</cell>';	
			rowXml = rowXml + '<cell>'+rowData.FIN_MAT_DATE+'</cell>';	
			rowXml = rowXml + '<cell>'+rowData.FIN_ACC_NO+'</cell>';	
			
			if ( jQuery.inArray(n,selectedRows)  != -1){
				isSelect = "Y";
			}
			
			rowXml = rowXml + '<cell>'+isSelect+'</cell>';	
			
			rowXml = rowXml + '</row>';
			formatXml = formatXml + rowXml;
		});
		formatXml = formatXml + '</rows></finpay>';
		
		$('#FIN_DEFER_GRID').get(0).value = formatXml;
	}
}
