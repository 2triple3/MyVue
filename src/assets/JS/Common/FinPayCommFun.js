/**
 * 还押汇处理
 */
//Function For Purchase By WL 20100420

var __SynInterestRateFlag = false;

var __IRData = new Array();

var __FIN_BILL_CCY = "";
var __FIN_BILL_AMT = 0;
var __FIN_CUST_ID = "";
var __FIN_TRANS_TYPE = "";
var __FIN_TRANS_KEY = "";
var __initFinFlag = false;

//IR Pay Flag
var __IR_PAY_PRE_THIS = "PRE_THIS";
var __IR_PAY_PRE_ALL = "PRE_ALL";
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
	getHisFinInfo();
	
	initFinancPage(custId,trxCCY,trxAMT);
	
	initExRateInfo(custId,trxAMT);
	if( !__SynInterestRateFlag ) initInterestRate();
}

//Function init InterestRate From DB
function initInterestRate(){
	if( __FIN_CUST_ID == null || __FIN_CUST_ID == "") return ;
	$.ajax({
		url: '/UtanWeb/CommUtilServlet',
		dataType:'json',
		type:'POST',
		data:'OPERTYPE=InterestRate',
		async:false,
		error:function(){
			alert('获取利率信息通信错误!');
			return ;
		},
		success: function(jsonData){
			if(setInterestRate(jsonData)){
				__SynInterestRateFlag = true;	        
			  }
		}
	});
}

//Function setInterestRate			
function setInterestRate(IRData){
    var bRet = false;
	var IRCount = IRData.rows.length;
	var rowData;
	for(var i = 0;i<IRCount;i++){
		rowData = IRData.rows[i];
		__IRData[rowData.IRTYPE + "#" + rowData.CCY + "#" + rowData.IRTERM] = rowData;
	}
	bRet = true;
	return bRet;
}

function initFinancPage(custId,billCcy,billAmt){
	if( custId == "" || custId == null || billCcy == "" || billCcy == null || billAmt == null ){
		__initFinFlag = false;
		return;
	}else{
		//setFieldValue($('#FIN_CUST_ID').get(0),custId);
		//setFieldValue($('#FIN_TRANS_CCY').get(0),billCcy);
		//setFieldValue($('#FIN_TRANS_AMT').get(0),billAmt);
		var maxPer = getFieldValue($('#FIN_MAX_PER').get(0));
		var maxAmt = getFieldValue($('#FIN_MAX_AMT').get(0));
		
		if( isNaN(maxPer) || maxPer == '' || maxPer == 0 || maxPer== null ) setFieldValue($('#FIN_MAX_PER').get(0),100);
		if( isNaN(maxAmt) || maxAmt == '' || maxAmt == 0 || maxAmt == null ) setFieldValue($('#FIN_MAX_AMT').get(0),billAmt);
		
		maxAmt = getFieldValue($('#FIN_MAX_AMT').get(0));
		setFieldValue($('#FIN_DATE').get(0),getSysDate());
		setFieldValue($('#FIN_MAT_DATE').get(0),getSysDate());
		//setFieldValue($('#FIN_TRANS_TYPE').get(0),__FIN_TRANS_TYPE);
		setFieldValue($('#FIN_BAL_AMT').get(0),maxAmt - getFieldValue( $('#HIS_TOL_AMT').get(0) ));
		
		setFieldValue($('#FIN_SS_CCY').get(0),billCcy );
		
		__FIN_CUST_ID = custId;
		__FIN_BILL_CCY = billCcy;
		__FIN_BILL_AMT = billAmt;
		__initFinFlag = true;
		
		calCurrTotalFinAmt();
	}
}

//calculate the max finance amount  改变最大融资比例
function calFinMaxAmt(obj){
	if( !__initFinFlag ) return;

	checkMaxOrMinValue(obj,100,0);
	
	//For the max finance amt  计算最大融资金额
	var finMaxPercentage = getFieldValue( obj ) / 100;
	var finMaxAmt = __FIN_BILL_AMT * finMaxPercentage;
	setFieldValue($('#FIN_MAX_AMT').get(0),finMaxAmt);
	
	calCurrFinPercentage();//for the this finance percentage
	
	//for the surplus finance amt  计算融资余额
	var finYetAmt = getFieldValue($('#HIS_TOL_AMT').get(0));
	if( isNaN(finYetAmt) ) finYetAmt = 0;
	var finSurAmt = finMaxAmt - finYetAmt;
	setFieldValue($('#FIN_BAL_AMT').get(0),finSurAmt);
	
	calCurrTotalFinAmt();
}

//For this finance amt  改变融资本次金额
function calFinPercentage(){
	if( !__initFinFlag ) return;
	
	var maxValue = getFieldValue($('#FIN_MAX_AMT').get(0));
	var minValue = 0;
	checkMaxOrMinValue($('#FIN_AMT').get(0),maxValue,minValue);
	
	calCurrFinPercentage();//for this finance percentage   计算本次融资比例
	calCurrInterAmt();//for this finance interestrate amt   计算本次利息金额
	calCurrTotalFinAmt();//for total finance amt
}

// for this finance interestrate  改变本次融资比例
function calFinAmt(obj){
	if( !__initFinFlag ) return;
	
	checkMaxOrMinValue(obj,100,0);
	
	var finCurrPercentage = getFieldValue( obj ) / 100;
	var finMaxPercent = getFieldValue( $('#FIN_MAX_PER').get(0) ) / 100;
	var finCurrAmt = __FIN_BILL_AMT * finMaxPercent * finCurrPercentage;
	setFieldValue($('#FIN_AMT').get(0),finCurrAmt);
	
	calFinPercentage();
}

function calMaturityDay(obj){
	if( !__initFinFlag ) return;
	
	checkMinValue(obj,0);
	
	var finDayNum = getFieldValue( obj );
	var finCurrDate = getFieldValue( $('#FIN_DATE').get(0) );
	var finMatuDate = Date2Str(getNextDate(finCurrDate,finDayNum));
	setFieldValue($('#FIN_MAT_DATE').get(0),finMatuDate);
	
	calCurrPercentage();
}

function calFinDayNum(obj){
	if( !__initFinFlag ) return;
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
	}else if( finIntFlag == __IR_PAY_PRE_ALL ){
		var finCurrIntAmt = getFieldValue( $('#FIN_INT_AMT').get(0) );
		var finDelayIntAmt = getFieldValue( $('#FIN_DELAY_INT_AMT').get(0) );
		var finHisIntAmt = getFieldValue( $('#HIS_UNPAY_INT').get(0) );
		var finHisDelayIntAmt = getFieldValue( $('#HIS_DELAY_INT').get(0) );
		if( isNaN(finCurrIntAmt) ) finCurrIntAmt = 0;
		if( isNaN(finDelayIntAmt) ) finDelayIntAmt = 0;
		if( isNaN(finHisIntAmt) ) finHisIntAmt = 0;
		if( isNaN(finHisDelayIntAmt) ) finHisDelayIntAmt = 0;
		finTotalIntAmt = finCurrIntAmt + finDelayIntAmt + finHisIntAmt + finHisDelayIntAmt;
	}else{
		finTotalIntAmt = 0;
	}
	setFieldValue($('#FIN_INT_TOTAL_AMT').get(0),finTotalIntAmt);
	
	calRealityAmt(); //calculate the reality borrow amt  计算实际发放金额和币别
}

//calculate this finance percentage  计算本次融资比例
function calCurrFinPercentage(){
	if( !__initFinFlag ) return;
	var finMaxAmt = __FIN_BILL_AMT * ( getFieldValue($('#FIN_MAX_PER').get(0)) / 100 );
	var finCurrAmt = getFieldValue( $('#FIN_AMT').get(0) );
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
	var finCurrIntAmt = (finCurrAmt * finCurrInt * finDayNum) / ( baseDayNum * 100 );
	setFieldValue($('#FIN_INT_AMT').get(0),finCurrIntAmt);

	calCurrTotalIntAmt();//for total finance interestrate amt     计算利息总额
}

//calculate currently total finance amt  计算目前融资金额 和 目前融资所占比例
function calCurrTotalFinAmt(){
	if( !__initFinFlag ) return;
	var finYetAmt = getFieldValue( $('#HIS_TOL_AMT').get(0) );
	var finCurrAmt = getFieldValue( $('#FIN_AMT').get(0) );
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
	var finCurrInt = 0,finCostInt = 0;
	var finIRTerm = "";
	var finTransType = __FIN_TRANS_TYPE;
	var __CcyData = UtanGlobalCache("ccy").get();
	var baseDayNum = Number(__CcyData[__FIN_BILL_CCY].BASEDAYNUM);
	var finCurrDate = getFieldValue( $('#FIN_DATE').get(0) );
	var finDayCount = getFieldValue( $('#FIN_DAY_NUM').get(0) );
	if( isNaN(finDayCount)) finDayCount = 0;
	
	if( finDayCount <= 0 ){
		finCurrInt = 0;
		finCostInt = 0;
	}else{
		if( finDayCount > 0 && finDayCount <= 30 ){
			finIRTerm = "1M";
		}else if( finDayCount > 30 && finDayCount <= 30 * 3 ){
			finIRTerm = "3M";
		}else if( finDayCount > 30 * 3 && finDayCount <= 30 * 6 ){
			finIRTerm = "6M";
		}else if( finDayCount > 30 * 6 && finDayCount <= baseDayNum ){
			finIRTerm = "1Y";
		}else if( finDayCount > baseDayNum && finDayCount <= 2 * baseDayNum ){
			finIRTerm = "2Y";
		}else{
			finIRTerm = "2Y";
		}
		var finIntKey = finTransType + "#" + __FIN_BILL_CCY + "#" + finIRTerm;
		finCurrInt = __IRData[finIntKey].IRVALUE;
		finCostInt = __IRData[finIntKey].IR_COST_VALUE;
	}
	setFieldValue( $('#FIN_INT').get(0),finCurrInt );
	setFieldValue( $('#FIN_COST_INT').get(0),finCostInt );
	calCurrInterAmt();
}

//Find the history finance info
function getHisFinInfo(){
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
			initHisFinInfo(jsonData);
		}
	});

}

function initHisFinInfo(hisData){
	if( hisData == null ){
		setFieldValue($('#HIS_TOL_AMT').get(0),0);
		setFieldValue($('#HIS_UNPAY_INT').get(0),0);
		setFieldValue($('#HIS_DELAY_INT').get(0),0);
	}else{
		var rowData = hisData.rows[0];
		setFieldValue($('#HIS_TOL_AMT').get(0),rowData.HIS_TOL_AMT);
		setFieldValue($('#HIS_UNPAY_INT').get(0),rowData.HIS_UNPAY_INT);
		setFieldValue($('#HIS_DELAY_INT').get(0),rowData.HIS_DELAY_INT);
		
		setFieldValue($('#FIN_MAX_PER').get(0),rowData.FIN_MAX_PER);
		setFieldValue($('#FIN_MAX_AMT').get(0),rowData.FIN_MAX_AMT);
		createHisFinGrid(__FIN_TRANS_KEY);  
	}
}