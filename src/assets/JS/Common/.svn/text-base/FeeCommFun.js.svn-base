/**
 * 费用处理
 */
//Function For Fee By WL 20100325

//Global Param
var __CHG_FEE_CUSTID = "";
var __CHG_POSTFEE_ORGID = ""; // ADD BY FANRUI FOR 要求各个机构维护自己的邮费
var __CHG_FEE_TRXCCY = "";
var __CHG_FEE_TRXAMT = -1;

var __CommFeeData = new Array(); //存放优惠后的费用信息
var __PostFeeData = new Array();
var __CableFeeData = new Array();
var __JT_CommFeeData = new Array();//存放静态费用信息
var __JT_PostFeeData = new Array();
var __JT_CableFeeData = new Array();

var __SynCommFeeFlag = false;
var __SynPostFeeFlag = false;
var __SynCableFeeFlag = false;

var __SynCommFeeCustId = '';
var __SynPostFeeCustId = '';
var __SynCableFeeCustId = '';

var commFeeDescArray = new Array();
var postFeeDescArray = new Array();
var cableFeeDescArray = new Array();

var COMMFEE = 'COMM';			//手续费
var MIDFEE = 'MID';				//手续费的一种,没有单独维护,在掉费用函数的时候传入的
var POSTFEE = 'POST';			//邮费
var CABLEFEE = 'CABLE';			//电报费
var FINANCEFEE = 'FINANCE';		//贸易融资费

//FeeCalType  费用计算类型
var __CHG_FEE_FIX_RATE = "Fixed Rate";//固定费率		Y
var __CHG_FEE_FLAT_AMOUNT = "Flat Amount";//固定金额		Y
var __CHG_FEE_TIERED_BY_AMOUNT = "Tiered By Amount";//按金额区间		Y
var __CHG_FEE_INCREASE_BY_PERIOD = "Increase By Period";//按期限递增		Y
var __CHG_FEE_TIERED_BY_PERIOD = "Tiered By Period";//按期限区间		Y
var __CHG_FEE_RATE_PERIOD = "Rate+Period";//固定费率+期限		N
var __CHG_FEE_DISCOUNT = "Discount";//打折方式优惠		以上几种计算后，根据配置按折扣计算折扣后的值

var __FEE_DISCOUNT_OPEN_FLAG = true;//是否启用按折扣计算标记

//FEERULE 1.CNY  2.USD  3.TRXCCY
var __FEE_RULE = "CNY";//默认费用收费币别
var __currSsEditFeeAmt = 0;//实际修改费用过度字段   内部使用
var __hisSsEditFeeAmt = 0;//历史实际修改费用过度字段  内部使用
var IS_M_N_FLAG = false;//在计算费用的时候 是否由于超过最大值或小于最小值 而是用最大值或最小值的标记
var isKeepSSWR = false;//是否保持四舍五入  true 100/false  100.00
var IS_SELECT_FLAG = false;//是否在产生的费用的时候勾选费用
var isStoreReturnFeeFlag = true;//是否储存勾选的当前行数据 以备回复
var isCheckPayByFlag = false;//是否检查勾选的费用收取方向是否一致
var VIRTUAL_CUST = "00000000";//虚拟柜员
var IS_CUST_NULL = false;//是否存在空柜员   当IS_CUST_NULL 为true时  启用虚拟柜员00000000
var FEE_IS_CREATE_BAR_FLAG = false;//是否创建状态栏标记

var OTH_UN_FAVORABLE_FLAG = true;//是否开启OTH方向收费不进行优惠  标记

//modify by wulei at 20150723 历史费用手工修改实收金额bug
var _FEE_HIS_SS_R = {};//存放历史费用实际收取费用，只读，用来恢复

function initFeeSysInfo(custField,transKeyFld,ccyField,amtField,isHisFlag,isCustNull){
	if(!isHisFlag) IS_SELECT_FLAG = false;
	if( isHisFlag == "N" ) IS_SELECT_FLAG = false;
	if( isHisFlag == "Y" ) IS_SELECT_FLAG = true;
	
	if(!isCustNull) IS_CUST_NULL = false;
	if( isCustNull != "Y" ) IS_CUST_NULL = false;
	if( isCustNull == "Y" ) IS_CUST_NULL = true;
	$('#IS_CUST_NULL_FLAG').val( IS_CUST_NULL );
	var custId = "";
	if( !IS_CUST_NULL ){
		if(!custField) return;
		if( $('#'+custField).get(0) == null ) return ;
		custId = $('#'+custField).val();
	}else{
		custId = VIRTUAL_CUST;
	}
	
	if( ccyField == null || ccyField == "" || amtField == null ) return ;
	if( $('#'+ccyField).get(0) == null ) return ;
	if( $('#'+amtField).get(0) == null ) return ;

	var trxCCY = $('#'+ccyField).val();
	var trxAMT = getFieldValue( $('#'+amtField).get(0) );
	if( trxAMT == 0 || trxAMT < 0 ) return;
	
	setExRateCustid(custId);
	var transKey = "",tmpValue = "";
	var transKeyArr = transKeyFld.split(",");
	for( var i=0;i<transKeyArr.length;i++ ){
		if( $('#'+transKeyArr[i]).get(0) == null ){
			alert("字段 ["+transKeyArr[i]+" 不存在!! 请检查!!]");
			return;
		}
		tmpValue = $('#'+transKeyArr[i]).val();
		if( tmpValue == null || tmpValue == "null" || tmpValue == undefined || tmpValue == "" ) continue;
		
		transKey = transKey + tmpValue;
		if( i != transKeyArr.length - 1 ) transKey = transKey + ",";
	}
	
	//if( custId == null || custId == "" ) return ;
	if( trxCCY == null || trxCCY == "" ) return ;
		
	initCustInfo(custId,trxCCY,trxAMT);
	clear_FEE_HIS_SS_R();
	$('#CHG_FEE_OUR_CCY').val(__FEE_RULE);

	initExRateInfo(custId,trxAMT);
	if( !__SynCommFeeFlag || __SynCommFeeCustId != __CHG_FEE_CUSTID ) initCommFeeInfo();
	if( !__SynPostFeeFlag || __SynPostFeeCustId != __CHG_FEE_CUSTID ) initPostFeeInfo();
	if( !__SynCableFeeFlag || __SynCableFeeCustId != __CHG_FEE_CUSTID ) initCableFeeInfo();

	if( transKey ){
		getTransHisFee(custId,transKey);
		isCreateHisFeeFlag = false;
		isCreateRealHisFeeFlag = false;
	}
}
function clear_FEE_HIS_SS_R(){
	_FEE_HIS_SS_R={};
}

//init common message
function initCommMessage(){
	var custId = $('#__CHG_FEE_CUSTID').val();
	var flag = $('#IS_CUST_NULL_FLAG').val();
	if( flag == "true" ){
		IS_CUST_NULL = true;
	}else{
		IS_CUST_NULL = false;
	}
	
	if( IS_CUST_NULL ){
		custId = VIRTUAL_CUST;
	}
	var trxCCY = $('#__CHG_FEE_TRXCCY').val();
	var trxAMT = getFieldValue($('#__CHG_FEE_TRXAMT').get(0));
	__CHG_FEE_CUSTID = custId;
	__CHG_FEE_TRXCCY = trxCCY;
	__CHG_FEE_TRXAMT = trxAMT;
	setExRateCustid(custId);
	
	var feeTypes = ["ExRateData", "ExRateScaleData"];
	if( !__SynCommFeeFlag || __SynCommFeeCustId != __CHG_FEE_CUSTID ) feeTypes.push("CommFeeData");
	if( !__SynPostFeeFlag || __SynPostFeeCustId != __CHG_FEE_CUSTID ) feeTypes.push("PostFeeData");
	if( !__SynCableFeeFlag || __SynCableFeeCustId != __CHG_FEE_CUSTID ) feeTypes.push("JTCABLEFEE");
	if(feeTypes.length>0) initAllFeeInfoAjax(feeTypes);
	
	clearFeeData();
	currSelectRows.splice(0,currSelectRows.length);
	hisSelectRows.splice(0,hisSelectRows.length);
	
	currRowIdFEE = -1;
	hisRowId = -1;
	currRowData = null;
	hisRowData = null;
	
	commFeeDescArray.splice(0,commFeeDescArray.length);
	postFeeDescArray.splice(0,postFeeDescArray.length);
	cableFeeDescArray.splice(0,cableFeeDescArray.length);
	
}

//init Cust Info
function initCustInfo(custId,trxCCY,trxAMT){
	__CHG_FEE_CUSTID = custId;
	__CHG_FEE_TRXCCY = trxCCY;
	__CHG_FEE_TRXAMT = trxAMT;
	if( !IS_CUST_NULL ){
		$('#__CHG_FEE_CUSTID').val(__CHG_FEE_CUSTID); 
	}
	
	//[FRATHF_00005_费用收取支持多币种] fanr 2013-11-19
	$('#__CHG_FEE_TRXCCY').val(__CHG_FEE_TRXCCY);
	setFieldValue( $('#__CHG_FEE_TRXAMT').get(0),__CHG_FEE_TRXAMT );			  
	$('#CHG_FEE_OTH_CCY').val(trxCCY);   
	clearFeeData();   
	
	$('#CHG_CURR_FEE_GRID').GridUnload();
	FEE_IS_CREATE_BAR_FLAG = false;
	createCurrFee('jsonstring','',true,true,true);
	createFeePageButton(true);
	
	currSelectRows.splice(0,currSelectRows.length);
	hisSelectRows.splice(0,hisSelectRows.length);
	
	currRowIdFEE = -1;
	hisRowId = -1;
	currRowData = null;
	hisRowData = null;
	
	commFeeDescArray.splice(0,commFeeDescArray.length);
	postFeeDescArray.splice(0,postFeeDescArray.length);
	cableFeeDescArray.splice(0,cableFeeDescArray.length);
}

function initAllFeeInfoAjax(feeTypes){ // 为了优化,将几个ajax合并,包括三种费用获取和汇率信息和汇率浮动范围信息
	var postDataStr = "OPERTYPE=allFeeData&feeTypes="+feeTypes.join(";")+"&CUSTID="+__CHG_FEE_CUSTID+"&CREATETYPE=INIT";
	var trans_ref = "",transKey = "";
	if ($('#TRANS_REF').get(0)) trans_ref = $('#TRANS_REF').val();
 	if ($('#TRANS_KEY').get(0)) transKey = $('#TRANS_KEY').val();
 	postDataStr += '&TRANS_REF=' + trans_ref+ '&TRANS_KEY=' + transKey; // 汇率信息需要
 	
	if($.inArray("CommFeeData", feeTypes)>-1){
		var taskName = document.UTFORM.TASKNAME.value;
		postDataStr += "&TASKNAME=" + taskName;
	}
	if($.inArray("PostFeeData", feeTypes)>-1){
		var orgId = getFieldValue($("#TRANS_ORG_CODE")[0]);
		postDataStr += "&orgId=" + orgId;
	}
	if($.inArray("JTCABLEFEE", feeTypes)>-1){
		
	}
	
	$.ajax({
		url: '/UtanWeb/CommUtilServlet',
		dataType:'json',
		type:'POST',
		data:postDataStr,
		async:false,
		error:function(){
			alert('获取全部费用信息(含汇率信息)失败，请检查！');
			return ;
		},
		success: function(jsonData){
			// 处理汇率信息
			if(jsonData.ExRateData){
				// 和ExRateInfo.js中 initExRateInfo 方法一样逻辑
				var exRateData = jsonData.ExRateData;
				var favData = exRateData.FAVRATE;
				var jtData = exRateData.JTRATE;
				if( isEmptyObject(favData) || isEmptyObject(jtData) || !favData.rows || !jtData.rows ){
					alert("汇率信息不存在!! 请检查!!");
					return;
				} else {
			       setExRateData(favData); // 每次更改客户都再次读库,是因为库中汇率实时变化吗?  answer by wulei:不是，因为每个客户的优惠情况不一样所以要重新读取
			       setJTExRateData(jtData);
			       __LAST_EXRATE_CUSTID = __CHG_FEE_CUSTID;	
			       setExRateCustid(__CHG_FEE_CUSTID);
			       saveCurrTransExRate(favData,__CHG_FEE_CUSTID);
			    }
				if (exRateData.PPSTATUS && $('#ASKPRICE_NO').get(0)) {
					$('#ASKPRICE_NO').val(exRateData.PPSTATUS);
					setProperty($('#ASKPRICE_NO').get(0),"P");
				}
		  	}
			if(jsonData.ExRateScaleData){
				// 和ExRateInfo.js中 initExRateInfo 方法一样逻辑
				__DBExRateScaleJsonData = {};
				$.extend(true,__DBExRateScaleJsonData,jsonData.ExRateScaleData);
			}
			// 处理费用信息
			if(jsonData.CommFeeData && setCommFeeInfo(jsonData.CommFeeData)){
				__SynCommFeeFlag = true;	  
				__SynCommFeeCustId = __CHG_FEE_CUSTID;
			}
			if(jsonData.PostFeeData && setPostFeeInfo(jsonData.PostFeeData)){
				__SynPostFeeFlag = true;	       
				__SynPostFeeCustId = __CHG_FEE_CUSTID; 
			}
			if(jsonData.JTCABLEFEE && setCableFeeInfo(jsonData.JTCABLEFEE)){
				__SynCableFeeFlag = true;	       
				__SynCableFeeCustId = __CHG_FEE_CUSTID;  
		  	}
			

		}
	});
	
}

//Function For Init Fee Info
function initCommFeeInfo(){
	if( __CHG_FEE_CUSTID == null || __CHG_FEE_CUSTID == "") return ;
	var taskName = document.UTFORM.TASKNAME.value; // modify by liaorizhi 20121022 通过交易类型获取费用信息

	$.ajax({
		url: '/UtanWeb/CommUtilServlet',
		dataType:'json',
		type:'POST',
		data:'OPERTYPE=CommFeeData&CUSTID=' + __CHG_FEE_CUSTID+'&TASKNAME='+taskName+'&CREATETYPE=INIT',
		async:false,
		error:function(){
			alert('获取费用信息失败，请检查！');
			return ;
		},
		success: function(jsonData){
			if(setCommFeeInfo(jsonData)){
				__SynCommFeeFlag = true;	  
				__SynCommFeeCustId = __CHG_FEE_CUSTID;
			  }
		}
	});
}

//Function setFeeInfo			
function setCommFeeInfo(CommFeeData){
	var favData = CommFeeData.FAVCOMMFEE;
	var jtData = CommFeeData.JTCOMMFEE;
	if( isEmptyObject(favData) || isEmptyObject(jtData) || !favData.rows || !jtData.rows ){
		alert("没有手续费信息！请维护！");
		return false;
	}
    var bRet = false;
	var feeCount = favData.rows.length;
	var rowData;
	for(var i = 0;i<feeCount;i++){
		rowData = favData.rows[i];
		__CommFeeData[rowData.FEENAME] = rowData;
		
		rowData = jtData.rows[i];
		__JT_CommFeeData[rowData.FEENAME] = rowData;
	}
	bRet = true;
	return bRet;
}

//Function For Init PostFee Info
function initPostFeeInfo(){
	if( __CHG_FEE_CUSTID == null || __CHG_FEE_CUSTID == "") return ;
	var orgId = getFieldValue($("#TRANS_ORG_CODE")[0]); // add by fanrui 要求各个机构单独维护邮费
	$.ajax({
		url: '/UtanWeb/CommUtilServlet',
		dataType:'json',
		type:'POST',
		data:'OPERTYPE=PostFeeData&CUSTID=' + __CHG_FEE_CUSTID+'&orgId='+orgId+'&CREATETYPE=INIT',
		async:false,
		error:function(){
			alert('获取邮费通信错误!');
			return ;
		},
		success: function(jsonData){
			if(setPostFeeInfo(jsonData)){
				__SynPostFeeFlag = true;	       
				__SynPostFeeCustId = __CHG_FEE_CUSTID; 
			  }
		}
	});
}

//Function setPostFeeInfo			
function setPostFeeInfo(PostFeeData){
	var favData = PostFeeData.FAVPOSTFEE;
	var jtData = PostFeeData.JTPOSTFEE;
	if( isEmptyObject(favData) || isEmptyObject(jtData) || !favData.rows || !jtData.rows ){
		alert("没有邮费信息！请维护！");
		return false;
	}
    var bRet = false;
	var feeCount = favData.rows.length;
	var rowData;
	for(var i = 0;i<feeCount;i++){
		rowData = favData.rows[i];
		__PostFeeData[rowData.REGCODE] = rowData;
		
		rowData = jtData.rows[i];
		__JT_PostFeeData[rowData.REGCODE] = rowData;
	}
	bRet = true;
	return bRet;
}

//Function For Init CableFee Info
function initCableFeeInfo(){
	if( __CHG_FEE_CUSTID == null || __CHG_FEE_CUSTID == "") return ;
	$.ajax({
		url: '/UtanWeb/CommUtilServlet',
		dataType:'json',
		type:'POST',
		data:'OPERTYPE=CableFeeData&CUSTID=' + __CHG_FEE_CUSTID+'&CREATETYPE=INIT',
		async:false,
		error:function(){
			alert('获取电报费通信错误!');
			return ;
		},
		success: function(jsonData){
			if(setCableFeeInfo(jsonData)){
				__SynCableFeeFlag = true;	       
				__SynCableFeeCustId = __CHG_FEE_CUSTID;  
			  }
		}
	});
}

//Function setCableFeeInfo			
function setCableFeeInfo(CableFeeData){
	var favData = CableFeeData.FAVCABLEFEE;
	var jtData = CableFeeData.JTCABLEFEE;
	if( isEmptyObject(favData) || isEmptyObject(jtData) || !favData.rows || !jtData.rows ){
		alert("没有电报费信息！请维护！");
		return false;
	}
    var bRet = false;
	var feeCount = favData.rows.length;
	var rowData;
	for(var i = 0;i<feeCount;i++){
		rowData = favData.rows[i];
		__CableFeeData[rowData.CABLETYPE] = rowData;
		
		rowData = jtData.rows[i];
		__JT_CableFeeData[rowData.CABLETYPE] = rowData;
	}
	bRet = true;
	return bRet;
}

//Function getFeeFromCache			
function getFeeFromCache(FeeType,FeeKey,dir,FeeKind){
	if (!dir) dir = "OUR";
	if (!FeeKind) FeeKind = "F";
	
	if( FeeType == COMMFEE ){
		if( !__SynCommFeeFlag ) return null;
		if (OTH_UN_FAVORABLE_FLAG) {
			if ("F" == FeeKind) {//优惠
				if ("OUR" == dir) return __CommFeeData[FeeKey];
				if ("OTH" == dir) return __JT_CommFeeData[FeeKey];
			} else if ("J" == FeeKind) {//静态
				return __JT_CommFeeData[FeeKey];
			}
		} else {
			if ("F" == FeeKind) return __CommFeeData[FeeKey];
			if ("J" == FeeKind) return __JT_CommFeeData[FeeKey];
		}
	}else if( FeeType == POSTFEE ){
		if( !__SynPostFeeFlag ) return null;
		if (OTH_UN_FAVORABLE_FLAG) {
			if ("F" == FeeKind) {//优惠
				if ("OUR" == dir) return __PostFeeData[FeeKey];
				if ("OTH" == dir) return __JT_PostFeeData[FeeKey];
			} else if ("J" == FeeKind) {//静态
				return __JT_PostFeeData[FeeKey];
			}
		} else {
			if ("F" == FeeKind) return __PostFeeData[FeeKey];
			if ("J" == FeeKind) return __JT_PostFeeData[FeeKey];
		}
	}else if( FeeType == CABLEFEE ){
		if( !__SynCableFeeFlag ) return null;
		if (OTH_UN_FAVORABLE_FLAG) {
			if ("F" == FeeKind) {//优惠
				if ("OUR" == dir) return __CableFeeData[FeeKey];
				if ("OTH" == dir) return __JT_CableFeeData[FeeKey];
			} else if ("J" == FeeKind) {//静态
				return __JT_CableFeeData[FeeKey];
			}
		} else {
			if ("F" == FeeKind) return __CableFeeData[FeeKey];
			if ("J" == FeeKind) return __JT_CableFeeData[FeeKey];
		}
	}
}	

//Function isFeeExist  Check The Fee Is Exist
 function isFeeExist(FeeType,FeeKey){
 	if( FeeType == COMMFEE ){
		if( !__SynCommFeeFlag || !__CommFeeData[FeeKey] || !__JT_CommFeeData[FeeKey]){
	 		return false;
	 	}else{
	 		return true;
	 	}
	}else if( FeeType == POSTFEE ){
		if( !__SynPostFeeFlag || !__PostFeeData[FeeKey] || !__JT_PostFeeData[FeeKey]){
	 		return false;
	 	}else{
	 		return true;
	 	}
	}else if( FeeType == CABLEFEE ){
		if( !__SynCableFeeFlag || !__CableFeeData[FeeKey] || !__JT_CableFeeData[FeeKey] ){
	 		return false;
	 	}else{
	 		return true;
	 	}
	}
 }
 
//Check The CacheFee,If true,Get Data From Cache,Then From DB and Updata The Cache    The Data Type:JSON
function getCommFee(FeeName,FeeDesc,PayCCY,FeeAMT,PayDirection,selectFlag,FeeType,baseDays ){
	if( __CHG_FEE_CUSTID != "" && __CHG_FEE_TRXCCY != "" && __CHG_FEE_TRXAMT >= 0 ){
		if( PayDirection == "" ) PayDirection = "OUR";
		if( FeeType == null ) FeeType = "";
		if( selectFlag == null || selectFlag == "" || selectFlag != "Y" ) selectFlag = "N";
		if( baseDays == null ) baseDays = 0;
		if(isFeeExist(COMMFEE,FeeName)){
			if( jQuery.inArray(FeeDesc,commFeeDescArray) == -1 ){
				commFeeDescArray.push(FeeDesc);
				if( FeeType == "" ){
					createCommFeeInfo(FeeName,FeeDesc,PayCCY,FeeAMT,PayDirection,selectFlag,COMMFEE,baseDays,"ADD");
				}else{
					createCommFeeInfo(FeeName,FeeDesc,PayCCY,FeeAMT,PayDirection,selectFlag,MIDFEE,baseDays,"ADD");
				}
				return 3;
			}else{
				alert(FeeDesc+"已经存在，请检查！");
				return 2;
			}
		}else{
			alert(FeeDesc+"不存在，请检查！");
		}
	}else{
		return 1;
	}
}

/**
 * 收取邮电费
 * @param {Object} regCode		地区码
 * @param {Object} feeDesc		费用描述
 * @param {Object} payDirection	费用方向
 * @param {Object} feeCcy			费用币别
 * @param {Object} selectFlag		是否收取费用
 * @return {TypeName} 
 */
function getPostFee(regCode,feeDesc,payDirection,feeAimCcy,selectFlag){
	if (__CHG_FEE_CUSTID && __CHG_FEE_TRXCCY && __CHG_FEE_TRXAMT >= 0 ){
		if (!payDirection) payDirection = "OUR";
		if (!selectFlag || selectFlag != "Y" ) selectFlag = "N";
		if (!feeAimCcy) feeAimCcy = "CNY";
		if(isFeeExist(POSTFEE,regCode)){
			if( jQuery.inArray(feeDesc,postFeeDescArray) == -1 ){
				postFeeDescArray.push(feeDesc);
				createPostFeeInfo(regCode,feeDesc,payDirection,feeAimCcy,selectFlag);
				return 3;
			}else{
				alert(feeDesc+"已经存在，请检查！");
				return 2;
			}
		}else{
			var orgId = getFieldValue($("#TRANS_ORG_CODE")[0]);
			var str = "邮费信息 " + orgId + "-"+regCode + "["+feeDesc+"] 不存在!!请维护!\n"
			str += "邮费规则:如果该机构维护了任意区域邮费,那么所有邮费信息将取该机构邮费信息\n";
			str += "否则取总行的邮费信息。\n"
			str += "请按照以上规则,先确认取该机构邮费还是总行邮费,再进行相应邮费维护!";
			alert(str);
		}
	}else{
		return 1;
	}
}

function getCableFee(cableType,feeDesc,payDirection,selectFlag,state){
	if( __CHG_FEE_CUSTID != "" && __CHG_FEE_TRXCCY != "" && __CHG_FEE_TRXAMT >= 0 ){
		if( payDirection == "" ) payDirection = "OUR";
		if( state == null || state == '' ) state = 0;
		if( selectFlag == null || selectFlag == "" || selectFlag != "Y" ) selectFlag = "N";
		if(isFeeExist(CABLEFEE,cableType)){
			if( jQuery.inArray(feeDesc,cableFeeDescArray) == -1 ){
				cableFeeDescArray.push(feeDesc);
				createCableFeeInfo(cableType,feeDesc,payDirection,selectFlag,state);
				return 3;
			}else{
				alert(feeDesc+"已经存在，请检查！");
				return 2;
			}
		}else{
			//alert(feeDesc + "不存在，请检查！");
		}
	}else{
		return 1;
	}
}

function getFinanceFee(feeName, feeDesc, feeCcy, feeAmt, feePay) {
	if( jQuery.inArray(feeDesc,commFeeDescArray) == -1 ){
		commFeeDescArray.push(feeDesc);
		
		var rowId = 1;
		var allRows = jQuery("#CHG_CURR_FEE_GRID").jqGrid('getDataIDs');
		if( allRows.length > 0 ){
			var rowId = parseInt(Math.max.apply({},allRows) + 1);
		}
		
		var feeGridRow = {
							FEE_PAY_BY:feePay, 
							FEE_TYPE:FINANCEFEE,  
							FEE_DESC:feeDesc,
							FEE_CCY_F:feeCcy, 		
							FEE_AMT_F:feeAmt, 	
							FEE_CCY:feeCcy, 
							FEE_AMT:feeAmt, 
							FEE_SS_CCY:feeCcy,
							FEE_SS_AMT:feeAmt, 
							FEE_PRE_SS_AMT:feeAmt, 
							FEE_NAME:feeName,
							AREA_CODE:''
						};
	
		jQuery("#CHG_CURR_FEE_GRID").jqGrid('addRowData',rowId,feeGridRow,'last');
		return 3;
	}else{
		alert(feeDesc+"已经存在，请检查！");
		return 2;
	}
}

//ADD BY WULEI AT 20130507 FOR FEE----BEGIN
function calCommFeeByFeeKind(FeeInfo,TransAMT,TransCCY,baseDays) {
	var FeeKindArr = new Array();
	var calType = FeeInfo.CALTYPE;
	var feeAmt = 0,feeCcy = TransCCY;
	switch(calType){
		case __CHG_FEE_FIX_RATE:
			feeAmt  = getFeeByFixRate(FeeInfo,TransAMT,TransCCY);
			if( IS_M_N_FLAG ) feeCcy = __FEE_RULE;
			break;
		case __CHG_FEE_FLAT_AMOUNT:
			//[Bugfree_1544_费用优惠有问题]_B fanr 2013-9-11
			feeAmt  = getFeeByFlatAmt(FeeInfo);
			//[Bugfree_1544_费用优惠有问题]_E fanr 2013-9-11
			// [Bugfree_2060_费用维护在交易中不生效]_B fanr 2013-11-27
			//modify by wanggf 20140703 start
			if (Number(FeeInfo.FEEAMTUSD)!=0) {
				feeCcy = FeeInfo.FEECCY;
			} else {
				feeCcy = __FEE_RULE;
			}
			// [Bugfree_2060_费用维护在交易中不生效]_E fanr 2013-11-27
			break;
		case __CHG_FEE_TIERED_BY_AMOUNT:
			feeAmt  = getFeeByTieredAmount(FeeInfo,TransAMT,TransCCY);
			if( IS_M_N_FLAG ) feeCcy = __FEE_RULE;
			break;
		case __CHG_FEE_INCREASE_BY_PERIOD:
			feeAmt  = getFeeByIncreaseByPeriod(FeeInfo,TransAMT,TransCCY,baseDays);
			if( IS_M_N_FLAG ) feeCcy = __FEE_RULE;
			break;
	}
	
	var feeAmtStr = FormatAmtByCCY(1 * feeAmt,feeCcy);
	if( isKeepSSWR ){
		feeAmtStr = Amt2FormatStr(1 * feeAmt,0);
	}
	FeeKindArr[0] = feeCcy;
	FeeKindArr[1] = feeAmt;
	FeeKindArr[2] = feeAmtStr;
	return FeeKindArr;
}
//ADD BY WULEI AT 20130507 FOR FEE----END

//param FeeName,FeeDesc,PayCCY,FeeAMT,PayDirection	
/*
 * @param FeeName 费用名称
 * @param FeeDesc 费用描述
 * @param TransCCY 交易币别
 * @param TransAMT 交易金额
 * @param PayDirection 收费方向
 * @param selectFlag 默认是否勾选标记
 * @param type 费用类型：COMM/MID
 * @param baseDays收费天数
 * @param newType 计费方式：新增/更新
*/
function createCommFeeInfo(FeeName,FeeDesc,TransCCY,TransAMT,PayDirection,selectFlag,type,baseDays,newType){
	var FeeInfo = getFeeFromCache(COMMFEE,FeeName,PayDirection);
	if( FeeInfo == null ) return ;
	//__FEE_RULE = getFeeRealCcy(PayDirection,FeeInfo.FEECCY);
	var unPayDir = getPayByUnSelect(PayDirection);
	var feeType = type;
	if( type == MIDFEE ){
		//__FEE_RULE = FeeInfo.FEECCY;
	}
	var feeName = FeeName;
	var feeDesc = FeeDesc;
	var feeCcy = TransCCY;
	var calType = FeeInfo.CALTYPE;
	var feeAmt = 0,feeAmtStr;
	
	//MODIFY BY WULEI AT 20130507 FOR FEE----BEGIN
	/*
	switch(calType){
		case __CHG_FEE_FIX_RATE://固定费率
			feeAmt  = getFeeByFixRate(FeeInfo,TransAMT,TransCCY);
			if( IS_M_N_FLAG ) feeCcy = __FEE_RULE;
			break;
		case __CHG_FEE_FLAT_AMOUNT://固定金额
			feeAmt  = getFeeByFlatAmt(FeeInfo);
			if (FeeInfo.FEECCY) {
				feeCcy = FeeInfo.FEECCY;
			} else {
				feeCcy = __FEE_RULE;
			}
			break;
		case __CHG_FEE_TIERED_BY_AMOUNT://按金额区间
			feeAmt  = getFeeByTieredAmount(FeeInfo,TransAMT,TransCCY);
			if( IS_M_N_FLAG ) feeCcy = __FEE_RULE;
			break;
		case __CHG_FEE_INCREASE_BY_PERIOD://按期限递增
			feeAmt  = getFeeByIncreaseByPeriod(FeeInfo,TransAMT,TransCCY,baseDays);
			if( IS_M_N_FLAG ) feeCcy = __FEE_RULE;
			break;
		case __CHG_FEE_TIERED_BY_PERIOD://按期限区间
			feeAmt  = getFeeByTieredPeriod(FeeInfo,TransAMT,TransCCY,baseDays);
			if( IS_M_N_FLAG ) feeCcy = __FEE_RULE;
			break;
	}
	*/
	var FeeKindArr = calCommFeeByFeeKind(FeeInfo,TransAMT,TransCCY,baseDays);
	feeCcy = FeeKindArr[0];
	feeAmt = FeeKindArr[1];
	feeAmtStr = FeeKindArr[2];
	//MODIFY BY WULEI AT 20130507 FOR FEE----END
	var taskname = getFieldValue("TASKNAME");
	if(taskname=="IN_EXNGSENDDOC"){
		var FEEPAYSITE = getFieldValue("FEEPAYSITE");
		if(FEEPAYSITE =="OTH"){
			setFieldValue("OTHUNPAID",feeAmtStr);
			OTHUNPAID_onChange();
		}
	}
	var rowId = 1;
	var allRows = jQuery("#CHG_CURR_FEE_GRID").jqGrid('getDataIDs');
	if( allRows.length > 0 ){
		rowId = parseInt(Math.max.apply({},allRows) + 1);
	}
	//MODIFY BY WULEI AT 20130507 FOR FEE----BEGIN
	//var feeAmtStr = FormatAmtByCCY(1 * feeAmt,feeCcy);
	//if( isKeepSSWR ){
	//	feeAmtStr = Amt2FormatStr(1 * feeAmt,0);
	//}
	//MODIFY BY WULEI AT 20130507 FOR FEE----END

	var pic = '/UtanWeb/images/icons/search.png';
	if( FeeInfo.FAVORABLE == 'Y' ){
		pic = '/UtanWeb/images/icons/search1.png';
	}
	var viewFeeStr = "";
	
	//ADD BY WULEI AT 20130507 FOR FEE----BEGIN
	var FeeInfoJ = getFeeFromCache(COMMFEE,FeeName,PayDirection,"J");
	var FeeKindArrJ = calCommFeeByFeeKind(FeeInfoJ,TransAMT,TransCCY,baseDays);
	var feeCcyJ = FeeKindArrJ[0];
	var feeAmtJ = FeeKindArrJ[1];
	var feeAmtStrJ = FeeKindArrJ[2];
	//ADD BY WULEI AT 20130507 FOR FEE----END
	
if (newType == "ADD") {
		//add by rabbit 2016-10-31 保函费用改造
		
		if(taskname=="IMLGISSUE" && FeeName=="LGHand"){
			var imlgfee = getFieldValue("FEE_DEAL_FIRST_TOTALAMT");
			var feeccy= getFieldValue("FEE_DEAL_CCY");
			feeAmtStrJ = FormatAmtByCCY(1 * imlgfee,feeCcyJ);
			feeAmtStrJ=getJTExRateByType(feeccy,__FEE_RULE,"SB") * feeAmtStrJ;
//			feeAmtStrJ = imlgfee;
//			feeAmtStr = imlgfee;
			feeAmtStr = FormatAmtByCCY(1 * imlgfee,feeCcy);;
			feeAmtStr=getJTExRateByType(feeccy,__FEE_RULE,"SB") * feeAmtStr;
			feeAmtStr = Amt2FormatStr(1 * feeAmtStr,2);
			feeAmtStrJ = Amt2FormatStr(1 * feeAmtStrJ,2);
			viewFeeStr = "<a href='#' onclick='doViewFeeInfo("+rowId+",\""+feeType+"\",\"CHG_CURR_FEE_GRID\")'><img src='"+pic+"' /></a>";
			var feeGridRow = {
											FEE_PAY_BY:PayDirection, 
											FEE_TYPE:feeType,  
											FEE_DESC:feeDesc,
											FEE_CCY_F:feeCcyJ, 		//ADD BY WULEI AT 20130507 FOR FEE
											FEE_AMT_F:feeAmtStrJ, 	//ADD BY WULEI AT 20130507 FOR FEE
											FEE_CCY:feeCcy, 
											FEE_AMT:feeAmtStr, 
											FEE_SS_CCY:feeCcy,
											FEE_SS_AMT:feeAmtStr,
											FEE_PRE_SS_AMT:feeAmtStr,
											VIEW_FEEINFO:viewFeeStr,
											FEE_NAME:feeName,
											AREA_CODE:'',
											FAVORABLE:FeeInfo.FAVORABLE,
											FEE_SCRIPT:"createCommFeeInfo('"+FeeName+"','"+FeeDesc+"','"+TransCCY+"','"+TransAMT+"','"+unPayDir+"','"+selectFlag+"','"+type+"','"+baseDays+"','UPDATE');",
											GIVEUP_FLAG:"NO"
										};
			jQuery("#CHG_CURR_FEE_GRID").jqGrid('addRowData',rowId,feeGridRow,'last');
			if( selectFlag == "Y" ){
				jQuery('#CHG_CURR_FEE_GRID').jqGrid('setSelection',rowId,true);
			}
		}else{
			viewFeeStr = "<a href='#' onclick='doViewFeeInfo("+rowId+",\""+feeType+"\",\"CHG_CURR_FEE_GRID\")'><img src='"+pic+"' /></a>";
			var feeGridRow = {
											FEE_PAY_BY:PayDirection, 
											FEE_TYPE:feeType,  
											FEE_DESC:feeDesc,
											FEE_CCY_F:feeCcyJ, 		//ADD BY WULEI AT 20130507 FOR FEE
											FEE_AMT_F:feeAmtStrJ, 	//ADD BY WULEI AT 20130507 FOR FEE
											FEE_CCY:feeCcy, 
											FEE_AMT:feeAmtStr, 
											FEE_SS_CCY:feeCcy,
											FEE_SS_AMT:feeAmtStr,
											FEE_PRE_SS_AMT:feeAmtStr,
											VIEW_FEEINFO:viewFeeStr,
											FEE_NAME:feeName,
											AREA_CODE:'',
											FAVORABLE:FeeInfo.FAVORABLE,
											FEE_SCRIPT:"createCommFeeInfo('"+FeeName+"','"+FeeDesc+"','"+TransCCY+"','"+TransAMT+"','"+unPayDir+"','"+selectFlag+"','"+type+"','"+baseDays+"','UPDATE');",
											GIVEUP_FLAG:"NO"
										};
			jQuery("#CHG_CURR_FEE_GRID").jqGrid('addRowData',rowId,feeGridRow,'last');
			if( selectFlag == "Y" ){
				jQuery('#CHG_CURR_FEE_GRID').jqGrid('setSelection',rowId,true);
			}
		}
	} else if (newType == "UPDATE") {
		
		if(taskname=="IMLGISSUE" && FeeName=="LGHand"){
			
			var imlgfee = getFieldValue("FEE_DEAL_FIRST_TOTALAMT");
			var feeccy= getFieldValue("FEE_DEAL_CCY");
			feeAmtStrJ = FormatAmtByCCY(1 * imlgfee,feeCcyJ);
			
//			feeAmtStrJ = imlgfee;
//			feeAmtStr = imlgfee;
			feeAmtStr = FormatAmtByCCY(1 * imlgfee,feeCcy);;
			if('OTH'==PayDirection){
				feeAmtStrJ=getJTExRateByType(feeccy,__FEE_RULE,"BS") * feeAmtStrJ;
				feeAmtStr=getJTExRateByType(feeccy,__FEE_RULE,"BS") * feeAmtStr;
			}else{
				feeAmtStrJ=getJTExRateByType(feeccy,__FEE_RULE,"SB") * feeAmtStrJ;
				feeAmtStr=getJTExRateByType(feeccy,__FEE_RULE,"SB") * feeAmtStr;
			}
			feeAmtStr = Amt2FormatStr(1 * feeAmtStr,2);
			feeAmtStrJ = Amt2FormatStr(1 * feeAmtStrJ,2);
			viewFeeStr = "<a href='#' onclick='doViewFeeInfo("+currRowIdFEE+",\""+feeType+"\",\"CHG_CURR_FEE_GRID\")'><img src='"+pic+"' /></a>";
			$('#CHG_CURR_FEE_GRID').jqGrid('setRowData',currRowIdFEE,{
																						FEE_TYPE:feeType,  
																						FEE_DESC:feeDesc, 
																						FEE_CCY_F:feeCcyJ, 		//ADD BY WULEI AT 20130507 FOR FEE
																						FEE_AMT_F:feeAmtStrJ, 	//ADD BY WULEI AT 20130507 FOR FEE
																						FEE_CCY:feeCcy, 
																						FEE_AMT:feeAmtStr, 
																						FEE_SS_CCY:feeCcy,
																						FEE_SS_AMT:feeAmtStr,
																						FEE_PRE_SS_AMT:feeAmtStr,
																						VIEW_FEEINFO:viewFeeStr,
																						FEE_NAME:feeName,
																						AREA_CODE:'',
																						FAVORABLE:FeeInfo.FAVORABLE,
																						FEE_SCRIPT:"createCommFeeInfo('"+FeeName+"','"+FeeDesc+"','"+TransCCY+"','"+TransAMT+"','"+unPayDir+"','"+selectFlag+"','"+type+"','"+baseDays+"','UPDATE');"});
		
		}else{
			viewFeeStr = "<a href='#' onclick='doViewFeeInfo("+currRowIdFEE+",\""+feeType+"\",\"CHG_CURR_FEE_GRID\")'><img src='"+pic+"' /></a>";
			$('#CHG_CURR_FEE_GRID').jqGrid('setRowData',currRowIdFEE,{
																						FEE_TYPE:feeType,  
																						FEE_DESC:feeDesc, 
																						FEE_CCY_F:feeCcyJ, 		//ADD BY WULEI AT 20130507 FOR FEE
																						FEE_AMT_F:feeAmtStrJ, 	//ADD BY WULEI AT 20130507 FOR FEE
																						FEE_CCY:feeCcy, 
																						FEE_AMT:feeAmtStr, 
																						FEE_SS_CCY:feeCcy,
																						FEE_SS_AMT:feeAmtStr,
																						FEE_PRE_SS_AMT:feeAmtStr,
																						VIEW_FEEINFO:viewFeeStr,
																						FEE_NAME:feeName,
																						AREA_CODE:'',
																						FAVORABLE:FeeInfo.FAVORABLE,
																						FEE_SCRIPT:"createCommFeeInfo('"+FeeName+"','"+FeeDesc+"','"+TransCCY+"','"+TransAMT+"','"+unPayDir+"','"+selectFlag+"','"+type+"','"+baseDays+"','UPDATE');"});
		}
	}
}
//ADD BY WULEI AT 20130507 FOR FEE----BEGIN
function calPostFeeByFeeKind(postFeeData,state) {
	var FeeKindArr = new Array();
	var feeAmt = 0,feeCcy = __FEE_RULE,feeAmtStr = "";
	
	var localCCY = postFeeData.LOCALCCY;
	var forCCY = postFeeData.FOREIGNCCY;
	var localAMT = postFeeData.LOCALAMT;
	var forAMT = postFeeData.FOREIGNAMT;
	if( __FEE_RULE == "CNY" ){
		feeAmt = localAMT;
		feeAmtStr = FormatAmtByCCY(localAMT,localCCY);
		feeCcy = localCCY;
	}else if( __FEE_RULE == "USD" ){
		feeAmt = forAMT;
		feeAmtStr = FormatAmtByCCY(forAMT,forCCY);
		feeCcy = forCCY;
	}
	
	if( state == 1 ){
		//__FEE_RULE == "USD";
		feeAmt = forAMT;
		feeCcy = "USD";
		feeAmtStr = FormatAmtByCCY(forAMT,"USD");
	}
	
	if( isKeepSSWR ){
		feeAmtStr = Amt2FormatStr(1 * feeAmt,0);
	}
	
	FeeKindArr[0] = feeCcy;
	FeeKindArr[1] = feeAmt;
	FeeKindArr[2] = feeAmtStr;
	return FeeKindArr;
}
//ADD BY WULEI AT 20130507 FOR FEE----END

/**
 * 收取邮电费
 * @param {Object} regCode		地区码
 * @param {Object} feeDesc		费用描述
 * @param {Object} payDirection	费用方向
 * @param {Object} feeCcy			费用币别
 * @param {Object} selectFlag		默认是否收取
 * @return {TypeName} 
 */
function createPostFeeInfo(regCode,feeDesc,payDirection,feeAimCcy,selectFlag,state){
	regCode = regCode.toUpperCase();
	var rowKey = regCode;
	var postFeeData = getFeeFromCache(POSTFEE,rowKey,payDirection);
	
	if (!postFeeData) {
		alert("没有地区编码:["+rowKey+"] !  ");
		return ;
	}
	var feeType = POSTFEE;
	
	//MODIFY BY WULEI AT 20130507 FOR FEE----BEGIN
	/*
	var localCCY = postFeeData.LOCALCCY;
	var forCCY = postFeeData.FOREIGNCCY;
	var localAMT = postFeeData.LOCALAMT;
	var forAMT = postFeeData.FOREIGNAMT;
	var feeAmtStr = "",feeAmt = 0,feeCcy = __FEE_RULE;
	if ( __FEE_RULE == "CNY") {//该规则下 如果不单独设置收费币别  则按CNY收取
		if (feeAimCcy == "CNY" || localCCY != feeAimCcy) {
			if (localCCY != feeAimCcy) alert("注意:邮费[地区编码("+regCode+")]没有维护币种为("+feeAimCcy+")的对应金额，系统将按CNY生产邮费！");
			feeAmt = localAMT;
			feeAmtStr = FormatAmtByCCY(localAMT,localCCY);
			feeCcy = localCCY;
		} else if (feeAimCcy == forCCY) {
			feeAmt = forAMT;
			feeAmtStr = FormatAmtByCCY(forAMT,forCCY);
			feeCcy = forCCY;
		}
	} else if ( __FEE_RULE == "USD" ) {//该规则下如果不单读设置收费币种 默认收取外币
		feeAmt = forAMT;
		feeAmtStr = FormatAmtByCCY(forAMT,forCCY);
		feeCcy = forCCY;
	}
	
	if( isKeepSSWR ){
		feeAmtStr = Amt2FormatStr(1 * feeAmt,0);
	}
	*/
	var feeAmtStr = "",feeAmt = 0,feeCcy = __FEE_RULE;
	var FeeKindArr = calPostFeeByFeeKind(postFeeData,state);
	feeCcy = FeeKindArr[0];
	feeAmt = FeeKindArr[1];
	feeAmtStr = FeeKindArr[2];
	//MODIFY BY WULEI AT 20130507 FOR FEE----BEGIN
	
	
	var rowId = 1;
	var allRows = jQuery("#CHG_CURR_FEE_GRID").jqGrid('getDataIDs');
	if( allRows.length > 0 ){
		var rowId = parseInt(Math.max.apply({},allRows) + 1);
	}
	
	var pic = '/UtanWeb/images/icons/search.png';
	if( postFeeData.FAVORABLE == 'Y' ){
		pic = '/UtanWeb/images/icons/search1.png';
	}
	var viewFeeStr = "<a href='#' onclick='doViewFeeInfo("+rowId+",\""+feeType+"\",\"CHG_CURR_FEE_GRID\")'><img src='"+pic+"' /></a>";
	//ADD BY WULEI AT 20130507 FOR FEE----BEGIN
	var postFeeDataJ = getFeeFromCache(POSTFEE,rowKey,payDirection,"J");
	var FeeKindArrJ = calPostFeeByFeeKind(postFeeDataJ,state);
	var feeCcyJ = FeeKindArrJ[0];
	var feeAmtJ = FeeKindArrJ[1];
	var feeAmtStrJ = FeeKindArrJ[2];
	//ADD BY WULEI AT 20130507 FOR FEE----END
	
	
	var feeGridRow = {
									FEE_PAY_BY:payDirection, 
									FEE_TYPE:feeType,  
									FEE_DESC:feeDesc,
									FEE_CCY_F:feeCcyJ, 		//ADD BY WULEI AT 20130507 FOR FEE
									FEE_AMT_F:feeAmtStrJ, 	//ADD BY WULEI AT 20130507 FOR FEE
									FEE_CCY:feeCcy, 
									FEE_AMT:feeAmtStr, 
									FEE_SS_CCY:feeCcy,
									FEE_SS_AMT:feeAmtStr, 
									FEE_PRE_SS_AMT:feeAmtStr, 
									VIEW_FEEINFO:viewFeeStr,
									FEE_NAME:rowKey,
									AREA_CODE:regCode,
									FAVORABLE:postFeeData.FAVORABLE,
									GIVEUP_FLAG:"NO"
								};
								
	jQuery("#CHG_CURR_FEE_GRID").jqGrid('addRowData',rowId,feeGridRow,'last');
	if( selectFlag == "Y"  ){
		jQuery('#CHG_CURR_FEE_GRID').jqGrid('setSelection',rowId,true);
	}
}

//ADD BY WULEI AT 20130507 FOR FEE----BEGIN
function calCableFeeByFeeKind(cableFeeData,state) {
	var FeeKindArr = new Array();
	var feeAmtStr = "",feeAmt = 0,feeCcy = __FEE_RULE;
	
	var localCCY = cableFeeData.LOCALCCY;
	var forCCY = cableFeeData.FOREIGNCCY;
	var localAMT = cableFeeData.LOCALAMT;
	var forAMT = cableFeeData.FOREIGNAMT;
	if( __FEE_RULE == "CNY" ){
		feeAmt = localAMT;
		feeAmtStr = FormatAmtByCCY(localAMT,localCCY);
		feeCcy = localCCY;
	}else if( __FEE_RULE == "USD" ){
		feeAmt = forAMT;
		feeAmtStr = FormatAmtByCCY(forAMT,forCCY);
		feeCcy = forCCY;
	}
	
	if( state == 1 ){
		//__FEE_RULE == "USD";
		feeAmt = forAMT;
		feeCcy = "USD";
		feeAmtStr = FormatAmtByCCY(forAMT,"USD");
	}
	
	if( isKeepSSWR ){
		feeAmtStr = Amt2FormatStr(1 * feeAmt,0);
	}
	
	FeeKindArr[0] = feeCcy;
	FeeKindArr[1] = feeAmt;
	FeeKindArr[2] = feeAmtStr;
	return FeeKindArr;
}
//ADD BY WULEI AT 20130507 FOR FEE----END

function createCableFeeInfo(cableType,feeDesc,payDirection,selectFlag,state){
	var cableFeeData = getFeeFromCache(CABLEFEE,cableType,payDirection);
	if( cableFeeData == null ) return ;
	//__FEE_RULE = getRealCcy(payDirection);
	var feeType = CABLEFEE;
	
	//MODIFY BY WULEI AT 20130507 FOR FEE----BEGIN
	/*
	var localCCY = cableFeeData.LOCALCCY;
	var forCCY = cableFeeData.FOREIGNCCY;
	var localAMT = cableFeeData.LOCALAMT;
	var forAMT = cableFeeData.FOREIGNAMT;
	var feeAmtStr = "",feeAmt = 0,feeCcy = __FEE_RULE;
	if( __FEE_RULE == "CNY" ){
		feeAmt = localAMT;
		feeAmtStr = FormatAmtByCCY(localAMT,localCCY);
		feeCcy = localCCY;
	}else if( __FEE_RULE == "USD" ){
		feeAmt = forAMT;
		feeAmtStr = FormatAmtByCCY(forAMT,forCCY);
		feeCcy = forCCY;
	}
	
	if( state == 1 ){
		//__FEE_RULE == "USD";
		feeAmt = forAMT;
		feeCcy = "USD";
		feeAmtStr = FormatAmtByCCY(forAMT,"USD");
	}
	
	if( isKeepSSWR ){
		feeAmtStr = Amt2FormatStr(1 * feeAmt,0);
	}
	*/
	var feeAmtStr = "",feeAmt = 0,feeCcy = __FEE_RULE;
	var FeeKindArr = calCableFeeByFeeKind(cableFeeData,state);
	feeCcy = FeeKindArr[0];
	feeAmt = FeeKindArr[1];
	feeAmtStr = FeeKindArr[2];
	//MODIFY BY WULEI AT 20130507 FOR FEE----END
	
	
	var rowId = 1;
	var allRows = jQuery("#CHG_CURR_FEE_GRID").jqGrid('getDataIDs');
	if( allRows.length > 0 ){
		var rowId = parseInt(Math.max.apply({},allRows) + 1);
	}
	
	var pic = '/UtanWeb/images/icons/search.png';
	if( cableFeeData.FAVORABLE == 'Y' ){
		pic = '/UtanWeb/images/icons/search1.png';
	}
	var viewFeeStr = "<a href='#' onclick='doViewFeeInfo("+rowId+",\""+feeType+"\",\"CHG_CURR_FEE_GRID\")'><img src='"+pic+"' /></a>";
	
	//ADD BY WULEI AT 20130507 FOR FEE----BEGIN
	var cableFeeDataJ = getFeeFromCache(CABLEFEE,cableType,payDirection,"J");
	var FeeKindArrJ = calCableFeeByFeeKind(cableFeeDataJ,state);
	var feeCcyJ = FeeKindArrJ[0];
	var feeAmtJ = FeeKindArrJ[1];
	var feeAmtStrJ = FeeKindArrJ[2];
	//ADD BY WULEI AT 20130507 FOR FEE----END
	
	var feeGridRow = {
									FEE_PAY_BY:payDirection, 
									FEE_TYPE:feeType,  
									FEE_DESC:feeDesc,
									FEE_CCY_F:feeCcyJ, 		//ADD BY WULEI AT 20130507 FOR FEE
									FEE_AMT_F:feeAmtStrJ, 	//ADD BY WULEI AT 20130507 FOR FEE
									FEE_CCY:feeCcy, 
									FEE_AMT:feeAmtStr, 
									FEE_SS_CCY:feeCcy,
									FEE_SS_AMT:feeAmtStr, 
									FEE_PRE_SS_AMT:feeAmtStr, 
									VIEW_FEEINFO:viewFeeStr,
									FEE_NAME:cableType,
									AREA_CODE:'',
									FAVORABLE:cableFeeData.FAVORABLE,
									GIVEUP_FLAG:"NO"
								};

	jQuery("#CHG_CURR_FEE_GRID").jqGrid('addRowData',rowId,feeGridRow,'last');
	if( selectFlag == "Y" ){
		jQuery('#CHG_CURR_FEE_GRID').jqGrid('setSelection',rowId,true);
	}
}

//固定费率
function getFeeByFixRate(FeeData,FeeAMT,FeeCCY,usedRate){
	IS_M_N_FLAG = false;
	var feeAmt = 0,feeAmt1 = 0,minAmt = 0,maxAmt = 0;
	var fixRate = FeeData.FIXRATE;

	if( usedRate != null && !isNaN(usedRate) ){
		fixRate = usedRate;
	}
	if( fixRate == null ) fixRate = 100;
	
	feeAmt = FeeAMT * ( fixRate/100 );
	
	feeAmt = calCommFeeByFavType(FeeData,feeAmt);
	
	minAmt = Number(FeeData.FEEMINAMTCNY);
	maxAmt = Number(FeeData.FEEMAXAMTCNY);
	feeAmt1 = getJTExRateByType(FeeCCY,__FEE_RULE,__FEE_CURR_RATE_TYPE_SB) * feeAmt;
	
	if( maxAmt != 0 ){
		if( feeAmt1 > maxAmt ){
			feeAmt = maxAmt;
			IS_M_N_FLAG = true;
		}
	}
	if( feeAmt1 < minAmt ){
		feeAmt = minAmt;
		IS_M_N_FLAG = true;
	}

	return feeAmt;
}

// 固定金额
function getFeeByFlatAmt(FeeData){
	var trxFeeAmt = 0;
	if(Number(FeeData.FEEAMTUSD)==0){
		trxFeeAmt = Number(FeeData.FEEAMTCNY);
	}else{
		trxFeeAmt = Number(FeeData.FEEAMTUSD);
	}
	//modify by wanggf 20140703 start
//	if( __FEE_RULE == "CNY" && (!FeeData.FEECCY || "CNY" == FeeData.FEECCY) ){
//		trxFeeAmt = Number(FeeData.FEEAMTCNY);
//	}else{
//		trxFeeAmt = Number(FeeData.FEEAMTUSD);
//	}
//	
//	if( !trxFeeAmt ) trxFeeAmt = 0;
	//modify by wanggf 20140703 end
	
	trxFeeAmt = calCommFeeByFavType(FeeData,trxFeeAmt);
	
	return trxFeeAmt;
}

//按金额区间
function getFeeByTieredAmount(FeeData,FeeAMT,FeeCCY){
	IS_M_N_FLAG = false;
	var feeAmt = 0;//USD
	var feeAmt1 = 0; //__FEE_RULE
	var firstAmt = Number(FeeData.FIRSTTIERAMT);
	var secondAmt = Number(FeeData.SECONDTIERAMT);
	var thirdAmt = Number(FeeData.THIRDTIERAMT);
	var firstRate = Number(FeeData.FIRSTTIERRATE);
	var secondRate = Number(FeeData.SECONDTIERRATE);
	var thirdRate = Number(FeeData.THIRDTIERRATE);
	var fourthRate = Number(FeeData.FOURTHTIERRATE);
	//alert(FeeCCY+'--FeeAMT--1--|'+FeeAMT);
	FeeAMT = getJTExRateByType(FeeCCY,"USD",__FEE_CURR_RATE_TYPE_SB) * FeeAMT;
	//alert('USD--FeeAMT--1--|'+FeeAMT);
	var minAmt = Number(FeeData.FEEMINAMTCNY);
	var maxAmt = Number(FeeData.FEEMAXAMTCNY);
	//alert('CNY--minAmt--1--|'+minAmt);
	//alert('CNY--maxAmt--1--|'+maxAmt);
	//alert('firstAmt--'+firstAmt+'--secondAmt--'+secondAmt+'--firstRate--'+firstRate+'--secondRate--'+secondRate+'--thirdRate--'+thirdRate);
	//if( firstAmt != null && firstAmt > 0 && secondAmt != null && secondAmt > 0 && thirdAmt != null && thirdAmt > 0 ){
	if( firstAmt &&  secondAmt &&  thirdAmt  ){	
		if( FeeAMT < firstAmt && FeeAMT > 0 ){
			if( firstRate != null ){
				feeAmt = FeeAMT * ( firstRate/100 );
			}
		}else if( FeeAMT >= firstAmt && FeeAMT < secondAmt ){
			if( secondRate != null ){
				feeAmt = FeeAMT * ( secondRate/100 );
			}
		}else if( FeeAMT >= secondAmt && FeeAMT < thirdAmt ){
			if( thirdRate != null ){
				feeAmt = FeeAMT * ( thirdRate/100 );
			}
		}else if( FeeAMT >= thirdAmt ){
			if( fourthRate != null ){
				feeAmt = FeeAMT * ( fourthRate/100 );
			}
		}
	}else if( firstAmt &&  secondAmt &&  !thirdAmt  ){
		if( FeeAMT < firstAmt && FeeAMT > 0 ){
			if( firstRate != null ){
				feeAmt = FeeAMT * ( firstRate/100 );
			}
		}else if( FeeAMT >= firstAmt && FeeAMT < secondAmt ){
			if( secondRate != null ){
				feeAmt = FeeAMT * ( secondRate/100 );
			}
		}else if( FeeAMT >= secondAmt ){
			if( thirdRate != null ){
				feeAmt = FeeAMT * ( thirdRate/100 );
			}
		}
	}else if( firstAmt &&  !secondAmt &&  !thirdAmt  ){
		if( FeeAMT < firstAmt && FeeAMT > 0 ){
			if( firstRate != null ){
				feeAmt = FeeAMT * ( firstRate/100 );
			}
		}else if( FeeAMT >= firstAmt ){
			if( secondRate != null ){
				feeAmt = FeeAMT * ( secondRate/100 );
			}
		}
	}else{
		alert(FeeData.FEENAME+"("+FeeData.FEEDESC+")类型为按金额递增，配置不正确，请检查！");
	}
	
	feeAmt = calCommFeeByFavType(FeeData,feeAmt);
	
	//alert('USD--feeAmt--1--|'+feeAmt);
	feeAmt1 = getJTExRateByType("USD",__FEE_RULE,__FEE_CURR_RATE_TYPE_SB) * feeAmt;
	//alert(__FEE_RULE+'--feeAmt1--1--|'+feeAmt1);
	if( maxAmt != 0 ){
		if( feeAmt1 > maxAmt ){
			feeAmt = maxAmt;
			IS_M_N_FLAG = true;
		}
	}
	if( feeAmt1 < minAmt ){
		feeAmt = minAmt;
		IS_M_N_FLAG = true;
	}
	//alert('--feeAmt1--1--|'+feeAmt);
	
	return feeAmt;
}

function getSumDays(per){
	var num = 1;
	if( per == "Year" ){
		num = 360;
	}else if( per == "Quarter"){
		num = 120;
	}else if( per == "Month"){
		num = 30;
	}else if( per == "Week"){
		num = 7;
	}else if( per == "Day"){
		num = 1;
	}
	return num;
}

//按期限递增
function getFeeByIncreaseByPeriod(FeeData,FeeAMT,FeeCCY,baseDays){
	IS_M_N_FLAG = false;
	var feeBaseDays = Number(FeeData.BASEPERIOD);
	var feeIncDays = Number(FeeData.INCREASEPER);
	var feeIncRate = Number(FeeData.INCREASE_RATE_PER);
	var baseFixRate = Number(FeeData.FIXRATE);
	var feeBasePero = FeeData.PERUNIT;
	feeBaseDays = feeBaseDays * getSumDays( feeBasePero );
	feeIncDays =  feeIncDays * getSumDays( feeBasePero );
	
	//alert("feeBaseDays--"+feeBaseDays+"--feeIncDays--"+feeIncDays+"--baseDays--"+baseDays+"--feeIncRate--"+feeIncRate+"--baseFixRate--"+baseFixRate);
	if( baseFixRate == null ) baseFixRate = 100;
	var feeAmt = 0,feeAmt1 = 0,minAmt = 0,maxAmt = 0;
	if( feeBaseDays - baseDays >= 0 ){
		feeAmt = getFeeByFixRate(FeeData,FeeAMT,FeeCCY);
	}else{
		var incDays = baseDays - feeBaseDays;
		var incNums = Math.ceil(incDays / feeIncDays);
		var resultRate = baseFixRate + incNums * feeIncRate;
		feeAmt = getFeeByFixRate(FeeData,FeeAMT,FeeCCY,resultRate);
	}
	
	return feeAmt;
}

//按期限区间
function getFeeByTieredPeriod(FeeData,FeeAMT,FeeCCY,baseDays){
	IS_M_N_FLAG = false;
	var feeAmt = 0,feeAmt1 = 0;
	var firstDays = Number(FeeData.FIRTIRPER) * getSumDays(FeeData.FIRCIRUNIT);
	var secondDays = Number(FeeData.SECTIRPER) * getSumDays(FeeData.SECCIRUNIT);
	var thirdDays = Number(FeeData.THDTIRPER) * getSumDays(FeeData.THDCIRUNIT);
	var firstRate = Number(FeeData.FIRSTTIERRATE);
	var secondRate = Number(FeeData.SECONDTIERRATE);
	var thirdRate = Number(FeeData.THIRDTIERRATE);
	var fourthRate = Number(FeeData.FOURTHTIERRATE);
	
	FeeAMT = getJTExRateByType(FeeCCY,"USD",__FEE_CURR_RATE_TYPE_SB) * FeeAMT;
	
	var minAmt = Number(FeeData.FEEMINAMTCNY);
	var maxAmt = Number(FeeData.FEEMAXAMTCNY);
//	alert('firstDays--'+firstDays+'--secondDays--'+secondDays+'--firstRate--'+firstRate+'--secondRate--'+secondRate+'--thirdRate--'+thirdRate);
	if( firstDays && secondDays ){
		if( baseDays < firstDays && baseDays >= 0 ){
			if( firstRate != null ){
				feeAmt = FeeAMT * ( firstRate/100 );
			}
		}else if( baseDays >= firstDays && baseDays < secondDays ){
			if( secondRate != null ){
				feeAmt = FeeAMT * ( secondRate/100 );
			}
		}else if( baseDays >= secondDays && baseDays < thirdDays ){
			if( thirdRate != null ){
				feeAmt = FeeAMT * ( thirdRate/100 );
			}
		}else if( baseDays >= thirdDays ){
			if( fourthRate != null ){
				feeAmt = FeeAMT * ( fourthRate/100 );
			}
		}
	}else if( firstDays && secondDays && !thirdDays ){
		if( baseDays < firstDays && baseDays >= 0 ){
			if( firstRate != null ){
				feeAmt = FeeAMT * ( firstRate/100 );
			}
		}else if( baseDays >= firstDays && baseDays < secondDays ){
			if( secondRate != null ){
				feeAmt = FeeAMT * ( secondRate/100 );
			}
		}else if( baseDays >= secondDays ){
			if( thirdRate != null ){
				feeAmt = FeeAMT * ( thirdRate/100 );
			}
		}
	}else if( firstDays && !secondDays && !thirdDays ){
		if( baseDays < firstDays && baseDays >= 0 ){
			if( firstRate != null ){
				feeAmt = FeeAMT * ( firstRate/100 );
			}
		}else if( baseDays >= firstDays ){
			if( secondRate != null ){
				feeAmt = FeeAMT * ( secondRate/100 );
			}
		}
	}else{
		alert(FeeData.FEENAME+"("+FeeData.FEEDESC+")类型为按期限递增，配置不正确，请检查！");
	}
	
	feeAmt = calCommFeeByFavType(FeeData,feeAmt);
	
	feeAmt1 = getJTExRateByType(FeeCCY,__FEE_RULE,__FEE_CURR_RATE_TYPE_SB) * feeAmt;
	
	if( maxAmt != 0 ){
		if( feeAmt1 > maxAmt ){
			feeAmt = maxAmt;
			IS_M_N_FLAG = true;
		}
	}
	if( feeAmt1 < minAmt ){
		feeAmt = minAmt;
		IS_M_N_FLAG = true;
	}
	
	return feeAmt;
}

/**
 * at by wulei at 2012-01-12 根据折扣计算费用
 * @param {Object} feeData
 * @param {Double} feeAmt
 */
function calCommFeeByFavType(feeData,feeAmt){
	if (!__FEE_DISCOUNT_OPEN_FLAG) return feeAmt;
	
	var returnAmt = feeAmt;
	var feeDiscount = feeData.DISCOUNT;
	if(!feeDiscount || feeDiscount == 0) feeDiscount = 100;
	returnAmt = feeAmt.accMul(Number(feeDiscount) / 100);
	
	return returnAmt;
}

//Function getHisFee param:custId,tranKey
function getTransHisFee(custId,tranKey){
	var transRef = getFieldValue("TRANS_REF"); //[Bugfree_1725_温州：选择一笔有历史费用的进口到单自由出报交易] fanr 2013-10-29
	$('#CHG_HIS_FEE_GRID').GridUnload();
	$('#CHG_REAL_HIS_FEE_GRID').GridUnload();
	$.ajax({
		url: '/UtanWeb/CommUtilServlet',
		dataType:'text',
		type:'POST',
		//[Bugfree_1725_温州：选择一笔有历史费用的进口到单自由出报交易] fanr 2013-10-29
		data:'OPERTYPE=isHisExit&HISDATA=' + tranKey+'&CUSTID='+custId + '&CURR_INPUT_TYPE=' + __CURR_INPUT_TYPE + '&TRANS_REF=' + transRef,
		async:false,
		error:function(){
			alert('获取费用历史信息通信错误!');
			return ;
		},
		success: function(isFlag){
			if( isFlag == "Y" ){
				if( tranKey != "" ){
					createHisFee('init',custId,tranKey,'json','',true,true,true);
					createRealHisFee('init',custId,tranKey,'json','',true,true,false);
				}
			}
		}
	});
}

/**
 *Calculate The Fee   ///////////////////////////////////////////  very import function  ////////////////////////////////////////
 *oper : +/-
 *currRowIdFEE : currently selected row id
 *currFeeGrid : currently jqgrid id
 */
function calCommFee(oper,currRowIdFEE,currFeeGrid,payBy,ssAmt){
	if( oper == null || oper == "" || currRowIdFEE == -1 || currRowIdFEE == null || currFeeGrid == null || currFeeGrid== "" ) return;
	var currRowData;
	jQuery('#'+currFeeGrid).jqGrid('saveRow',currRowIdFEE,null,'clientArray');
	currRowData = jQuery('#'+currFeeGrid).jqGrid('getRowData',currRowIdFEE);
	var feeType = currRowData.FEE_TYPE;
	var fee_pay_by = currRowData.FEE_PAY_BY;
	
	if(payBy){//for change pay by
		fee_pay_by = payBy;
	}

	var FeeTotalAmt = calCommFeeONLY(oper,currRowIdFEE,currFeeGrid,payBy,ssAmt);
	
	if( fee_pay_by == "OUR" ){
		if( feeType == COMMFEE || feeType == MIDFEE ){
			$('#CHG_FEE_OUR_HAND').val(FeeTotalAmt);
		}else if( feeType == POSTFEE ){
			$('#CHG_FEE_OUR_POST').val(FeeTotalAmt);
		}else if( feeType == CABLEFEE ){
			$('#CHG_FEE_OUR_CABLE').val(FeeTotalAmt);
		}else if( feeType == FINANCEFEE ){
			$('#CHG_FEE_OUR_FINANCE').val(FeeTotalAmt);
		}
	}else if( fee_pay_by == "OTH" ){
		if( feeType == COMMFEE || feeType == MIDFEE ){
			$('#CHG_FEE_OTH_HAND').get(0).value = FeeTotalAmt;
		}else if( feeType == POSTFEE ){
			$('#CHG_FEE_OTH_POST').get(0).value = FeeTotalAmt;
		}else if( feeType == CABLEFEE ){
			$('#CHG_FEE_OTH_CABLE').get(0).value = FeeTotalAmt;
		}else if( feeType == FINANCEFEE ){
			$('#CHG_FEE_OTH_FINANCE').get(0).value = FeeTotalAmt;
		}
	}
	
	calTotalFeeAmt();
	if( currRowData.FEE_TYPE == MIDFEE ){
		$('#FLAT_MID_BANK_FEE').val( FormatStr2Amt( currRowData.FEE_PRE_SS_AMT ) );
	}
}

function calCommFeeONLY(oper,currRowIdFEE,currFeeGrid,payBy,ssAmt) {
	var currRowData;
	jQuery('#'+currFeeGrid).jqGrid('saveRow',currRowIdFEE,null,'clientArray');
	currRowData = jQuery('#'+currFeeGrid).jqGrid('getRowData',currRowIdFEE);
	
	var commFeeAMT = 0,postFeeAMT = 0,cableFeeAMT = 0, financeFeeAMT = 0;
	var FeeCCY ;
	var FeeTotalAmt;
	var feeType = currRowData.FEE_TYPE;
	var fee_pay_by = currRowData.FEE_PAY_BY;
	var feePreSsAmt = 0;
	
	if( payBy != null && payBy != "" ){//for change pay by
		fee_pay_by = payBy;
	}
	if( oper == "--" ){//for change edit amt
		if( ssAmt != null && ssAmt != 0){
			oper = "-";
			currRowData.FEE_PRE_SS_AMT = FormatAmtByCCY(ssAmt,currRowData.FEE_SS_CCY);
			if( isKeepSSWR ){
				currRowData.FEE_PRE_SS_AMT = Amt2FormatStr( ssAmt,0);
			}
		}
	}

	if( fee_pay_by == "OUR" ){
		commFeeAMT =  getFieldValue($('#CHG_FEE_OUR_HAND').get(0));
		postFeeAMT =  getFieldValue($('#CHG_FEE_OUR_POST').get(0));
		cableFeeAMT = getFieldValue($('#CHG_FEE_OUR_CABLE').get(0));
		financeFeeAMT = getFieldValue($('#CHG_FEE_OUR_FINANCE').get(0));
		//alert("commFeeAMT--"+commFeeAMT+"--cableFeeAMT---"+cableFeeAMT);
		if( commFeeAMT == "" || commFeeAMT == null || isNaN(commFeeAMT) ) commFeeAMT = 0;
		if( postFeeAMT == "" || postFeeAMT == null || isNaN(postFeeAMT) ) postFeeAMT = 0;
		if( cableFeeAMT == "" || cableFeeAMT == null || isNaN(cableFeeAMT) ) cableFeeAMT = 0;
		if (!financeFeeAMT || isNaN(financeFeeAMT)) financeFeeAMT = 0;
		
		FeeCCY = $('#CHG_FEE_OUR_CCY').val();
		var fee_ss_ccy = currRowData.FEE_SS_CCY;
		var fee_Ccy = currRowData.FEE_CCY;
		if( FeeCCY == '' ){
			FeeCCY = fee_ss_ccy;
			setFieldValue($('#CHG_FEE_OUR_CCY').get(0),FeeCCY);
		}
		
		if( oper == "+" ){
			if( fee_ss_ccy != FeeCCY ){
				if( fee_Ccy != FeeCCY ){
					var rate = getJTExRateByType(fee_ss_ccy,FeeCCY,__FEE_CURR_RATE_TYPE_SB);
					var fee_Ss_Amt = FormatAmtByCCY(FormatStr2Amt(currRowData.FEE_SS_AMT) * rate,FeeCCY);
					var fee_Pre_Ss_Amt = FormatAmtByCCY(FormatStr2Amt(currRowData.FEE_PRE_SS_AMT) * rate,FeeCCY);
					//alert("fee_Ss_Amt--"+fee_Ss_Amt+"--fee_Pre_Ss_Amt---"+fee_Pre_Ss_Amt);
					if( isKeepSSWR ){
						fee_Ss_Amt = Amt2FormatStr( FormatStr2Amt(currRowData.FEE_SS_AMT) * rate,0);
						fee_Pre_Ss_Amt = Amt2FormatStr( FormatStr2Amt(currRowData.FEE_PRE_SS_AMT) * rate,0);
					}
					
					//for the min or max value
					if( feeType == COMMFEE ){
						var mm_Data = getFeeFromCache(COMMFEE,currRowData.FEE_NAME,fee_pay_by);
						if( mm_Data != null  ){
							var mm_calType = mm_Data.CALTYPE;
							if( mm_calType == __CHG_FEE_FIX_RATE ){
								if( FeeCCY == "CNY" ){
									if( Number(fee_Ss_Amt) < Number(mm_Data.FEEMINAMTCNY) ) fee_Ss_Amt = mm_Data.FEEMINAMTCNY;
									if( Number(mm_Data.FEEMAXAMTCNY)  > 0 && Number(fee_Ss_Amt) > Number(mm_Data.FEEMAXAMTCNY) ) fee_Ss_Amt = mm_Data.FEEMAXAMTCNY;
									
									if( Number(fee_Pre_Ss_Amt) < Number(mm_Data.FEEMINAMTCNY) ) fee_Pre_Ss_Amt = mm_Data.FEEMINAMTCNY;
									if( Number(mm_Data.FEEMAXAMTCNY)  > 0 && Number(fee_Pre_Ss_Amt) > Number(mm_Data.FEEMAXAMTCNY) ) fee_Pre_Ss_Amt = mm_Data.FEEMAXAMTCNY;
								}else if( FeeCCY == "USD" ){
									if( Number(fee_Ss_Amt) < Number(mm_Data.FEEMINAMTUSD )) fee_Ss_Amt = mm_Data.FEEMINAMTUSD;
									if( Number(mm_Data.FEEMAXAMTUSD)  > 0 && Number(fee_Ss_Amt) > Number(mm_Data.FEEMAXAMTUSD) ) fee_Ss_Amt = mm_Data.FEEMAXAMTUSD;
									
									if( Number(fee_Pre_Ss_Amt) < Number(mm_Data.FEEMINAMTUSD) ) fee_Pre_Ss_Amt = mm_Data.FEEMINAMTUSD;
									if( Number(mm_Data.FEEMAXAMTUSD)  > 0 && Number(fee_Pre_Ss_Amt) > Number(mm_Data.FEEMAXAMTUSD )) fee_Pre_Ss_Amt = mm_Data.FEEMAXAMTUSD;
								}
							}
						}
					}
					$('#'+currFeeGrid).jqGrid('setRowData',currRowIdFEE,{
																									FEE_SS_AMT:fee_Ss_Amt,
																									FEE_PRE_SS_AMT:fee_Pre_Ss_Amt,
																									FEE_SS_CCY:FeeCCY});
					currRowData = jQuery('#'+currFeeGrid).jqGrid('getRowData',currRowIdFEE);
				}else{
					$('#'+currFeeGrid).jqGrid('setRowData',currRowIdFEE,{
																									FEE_SS_AMT:currRowData.FEE_AMT,
																									FEE_PRE_SS_AMT:currRowData.FEE_AMT,
																									FEE_SS_CCY:FeeCCY});
					currRowData = jQuery('#'+currFeeGrid).jqGrid('getRowData',currRowIdFEE);
				}
			}
			feePreSsAmt = FormatStr2Amt(currRowData.FEE_PRE_SS_AMT);
			if( isKeepSSWR ){
				feePreSsAmt = FormatStr2Amt( Amt2FormatStr(feePreSsAmt,0) );
			}
			//alert("feePreSsAmt--"+feePreSsAmt);
			if( feeType == COMMFEE || feeType == MIDFEE ){
				FeeTotalAmt = commFeeAMT + feePreSsAmt;
			}else if( feeType == POSTFEE ){
				FeeTotalAmt = postFeeAMT + feePreSsAmt;
			}else if( feeType == CABLEFEE ){
				FeeTotalAmt = cableFeeAMT + feePreSsAmt;
			}else if( feeType == FINANCEFEE ){
				FeeTotalAmt = financeFeeAMT + feePreSsAmt;
			}
			//alert("FeeTotalAmt--"+FeeTotalAmt);
		}else if( oper == "-" ){
			feePreSsAmt = FormatStr2Amt(currRowData.FEE_PRE_SS_AMT);
			if( isKeepSSWR ){
				feePreSsAmt = FormatStr2Amt( Amt2FormatStr(feePreSsAmt,0) );
			}
			if( feeType == COMMFEE || feeType == MIDFEE ){
				FeeTotalAmt = commFeeAMT - feePreSsAmt;
			}else if( feeType == POSTFEE ){
				FeeTotalAmt = postFeeAMT - feePreSsAmt;
			}else if( feeType == CABLEFEE ){
				FeeTotalAmt = cableFeeAMT - feePreSsAmt;
			}else if( feeType == FINANCEFEE ){
				FeeTotalAmt = financeFeeAMT - feePreSsAmt;
			}
		}

		if( isKeepSSWR ){
			FeeTotalAmt = Amt2FormatStr(FeeTotalAmt,0);
		}else{
			FeeTotalAmt = FormatAmtByCCY(FeeTotalAmt,FeeCCY);
		}
	}else if( fee_pay_by == "OTH" ){
		commFeeAMT =  getFieldValue($('#CHG_FEE_OTH_HAND').get(0));
		postFeeAMT =  getFieldValue($('#CHG_FEE_OTH_POST').get(0));
		cableFeeAMT = getFieldValue($('#CHG_FEE_OTH_CABLE').get(0));
		financeFeeAMT = getFieldValue($('#CHG_FEE_OTH_FINANCE').get(0));
		
		if( commFeeAMT == "" || commFeeAMT == null || isNaN(commFeeAMT) ) commFeeAMT = 0;
		if( postFeeAMT == "" || postFeeAMT == null || isNaN(postFeeAMT) ) postFeeAMT = 0;
		if( cableFeeAMT == "" || cableFeeAMT == null || isNaN(cableFeeAMT) ) cableFeeAMT = 0;
		if (!financeFeeAMT || isNaN(financeFeeAMT)) financeFeeAMT = 0;
		
		FeeCCY = getFieldValue($('#CHG_FEE_OTH_CCY').get(0));
		var fee_ss_ccy = currRowData.FEE_SS_CCY;
		var fee_Ccy = currRowData.FEE_CCY;
		if( FeeCCY == '' ){
			FeeCCY = fee_ss_ccy;
			setFieldValue($('#CHG_FEE_OTH_CCY').get(0),FeeCCY);
		}
		if( oper == "+" ){
			if( fee_ss_ccy != FeeCCY ){
				if( fee_Ccy != FeeCCY ){
					var rate = getJTExRateByType(fee_ss_ccy,FeeCCY,__FEE_CURR_RATE_TYPE_SB);
					var fee_Ss_Amt = FormatAmtByCCY(FormatStr2Amt(currRowData.FEE_SS_AMT) * rate,FeeCCY);
					var fee_Pre_SsAmt = FormatAmtByCCY(FormatStr2Amt(currRowData.FEE_PRE_SS_AMT) * rate,FeeCCY);
					
					if( isKeepSSWR ){
						fee_Ss_Amt = Amt2FormatStr( FormatStr2Amt(currRowData.FEE_SS_AMT) * rate,0);
						fee_Pre_SsAmt = Amt2FormatStr( FormatStr2Amt(currRowData.FEE_PRE_SS_AMT) * rate,0);
					}
					
					$('#'+currFeeGrid).jqGrid('setRowData',currRowIdFEE,{
																							FEE_SS_AMT:fee_Ss_Amt,
																							FEE_PRE_SS_AMT:fee_Pre_SsAmt,
																							FEE_SS_CCY:FeeCCY});
					currRowData = jQuery('#'+currFeeGrid).jqGrid('getRowData',currRowIdFEE);
				}else{
					$('#'+currFeeGrid).jqGrid('setRowData',currRowIdFEE,{
																							FEE_SS_AMT:currRowData.FEE_AMT,
																							FEE_PRE_SS_AMT:currRowData.FEE_AMT,
																							FEE_SS_CCY:FeeCCY});
					currRowData = jQuery('#'+currFeeGrid).jqGrid('getRowData',currRowIdFEE);
				}
			}
			
			feePreSsAmt = FormatStr2Amt(currRowData.FEE_PRE_SS_AMT);
			if( isKeepSSWR ){
				feePreSsAmt = FormatStr2Amt( Amt2FormatStr( feePreSsAmt,0) );
			}
			if( feeType == COMMFEE || feeType == MIDFEE ){
				FeeTotalAmt = commFeeAMT + feePreSsAmt;
			}else if( feeType == POSTFEE ){
				FeeTotalAmt = postFeeAMT + feePreSsAmt;
			}else if( feeType == CABLEFEE ){
				FeeTotalAmt = cableFeeAMT + feePreSsAmt;
			}else if( feeType == FINANCEFEE ){
				FeeTotalAmt = financeFeeAMT + feePreSsAmt;
			}
		}else if( oper == "-" ){
			feePreSsAmt = FormatStr2Amt(currRowData.FEE_PRE_SS_AMT);
			if( isKeepSSWR ){
				feePreSsAmt = FormatStr2Amt( Amt2FormatStr( feePreSsAmt,0) );
			}
			if( feeType == COMMFEE || feeType == MIDFEE ){
				FeeTotalAmt = commFeeAMT - feePreSsAmt;
			}else if( feeType == POSTFEE ){
				FeeTotalAmt = postFeeAMT - feePreSsAmt;
			}else if( feeType == CABLEFEE ){
				FeeTotalAmt = cableFeeAMT - feePreSsAmt;
			}else if( feeType == FINANCEFEE ){
				FeeTotalAmt = financeFeeAMT - feePreSsAmt;
			}
		}

		if( isKeepSSWR ){
			FeeTotalAmt = Amt2FormatStr( FeeTotalAmt,0);
		}else{
			FeeTotalAmt = FormatAmtByCCY(FeeTotalAmt,FeeCCY);
		}
	}
	
	return FeeTotalAmt;
}

function calTotalFeeAmt(){
	var othTotalAMT = getFieldValue($('#CHG_FEE_OTH_HAND').get(0)) + getFieldValue($('#CHG_FEE_OTH_POST').get(0)) + getFieldValue($('#CHG_FEE_OTH_CABLE').get(0)) + getFieldValue($('#CHG_FEE_OTH_FINANCE').get(0));
	var ourTotalAMT = getFieldValue($('#CHG_FEE_OUR_HAND').get(0)) + getFieldValue($('#CHG_FEE_OUR_POST').get(0)) + getFieldValue($('#CHG_FEE_OUR_CABLE').get(0)) + getFieldValue($('#CHG_FEE_OUR_FINANCE').get(0));
	
	if( isKeepSSWR ){
		othTotalAMT = Amt2FormatStr( othTotalAMT,0);
		ourTotalAMT = Amt2FormatStr( ourTotalAMT,0);
	}else{
		othTotalAMT = FormatAmtByCCY(othTotalAMT,$('#CHG_FEE_OTH_CCY').val());
		ourTotalAMT = FormatAmtByCCY(ourTotalAMT,$('#CHG_FEE_OUR_CCY').val());
	}
	
	$('#CHG_FEE_OTH_TOTAL').val(othTotalAMT);
	$('#CHG_FEE_OUR_TOTAL').val(ourTotalAMT);
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function selectAllAdd(aRowids,currSel,gridID){
	$.each( aRowids, function(i, n){
		if( jQuery.inArray(n,currSel) == -1 ){
			calCommFee("+",n,gridID,"",0);
		}else{
			jQuery('#'+gridID).jqGrid('saveRow',n,null,'clientArray');
		}
	});
}

function selectAllDel(aRowids,currSel,gridID){
	$.each( aRowids, function(i, n){
		if( jQuery.inArray(n,currSel) != -1 ){
			calCommFee("-",n,gridID,"",0);
		}
	});
}

//[FINWARE_V3.5_TFS_2013120026]_B QF.wulei 2013-4-23   先进行判断是否需要根据收费方向重新计算费用
function calOurOthFee(rowid) {
	if (OTH_UN_FAVORABLE_FLAG) {
		jQuery('#CHG_CURR_FEE_GRID').jqGrid('saveRow',rowid,null,'clientArray');
		var rowData = jQuery('#CHG_CURR_FEE_GRID').jqGrid('getRowData',rowid);
		eval(""+rowData.FEE_SCRIPT+"");
	}
}
//[FINWARE_V3.5_TFS_2013120026]_E QF.wulei 2013-4-23

function changePayBy(obj){
	var payBy = obj.value;
	var payBy0;
	if( payBy == "OUR" ) payBy0 = "OTH";
	if( payBy == "OTH" ) payBy0 = "OUR";
	var currId = obj.id;
	currRowIdFEE = currId.substring(0,currId.indexOf('_') );
	calCommFee("-",currRowIdFEE,"CHG_CURR_FEE_GRID",payBy0,0);
	
	//add by wulei 先进行判断是否需要根据收费方向重新计算费用
	calOurOthFee(currRowIdFEE);
	
	calCommFee("+",currRowIdFEE,"CHG_CURR_FEE_GRID",payBy,0);
	jQuery('#CHG_CURR_FEE_GRID').jqGrid('editRow',currRowIdFEE);
}

function changeHisPayBy(obj){
	var payBy = obj.value;
	var payBy0;
	if( payBy == "OUR" ) payBy0 = "OTH";
	if( payBy == "OTH" ) payBy0 = "OUR";
	var currId = obj.id;
	hisRowId = currId.substring(0,currId.indexOf('_') );
	calCommFee("-",hisRowId,"CHG_HIS_FEE_GRID",payBy0,0);
	calCommFee("+",hisRowId,"CHG_HIS_FEE_GRID",payBy,0);
	jQuery('#CHG_HIS_FEE_GRID').jqGrid('editRow',hisRowId);
}

function updateStoreData(obj){
	var currId = obj.id;
	currRowIdFEE = currId.substring(0,currId.indexOf('_') );
	currRowData = jQuery('#CHG_CURR_FEE_GRID').jqGrid('getRowData',currRowIdFEE);
	__currSsEditFeeAmt = FormatStr2Amt( $('#'+currRowIdFEE+'_FEE_PRE_SS_AMT').val() );
	if( isKeepSSWR ){
		__currSsEditFeeAmt = FormatStr2Amt( Amt2FormatStr( __currSsEditFeeAmt,0) );
	}
}

function updateHisStoreData(obj){
	var currId = obj.id;
	hisRowId = currId.substring(0,currId.indexOf('_') );
	hisRowData = jQuery('#CHG_HIS_FEE_GRID').jqGrid('getRowData',hisRowId);
	__hisSsEditFeeAmt = FormatStr2Amt( $('#'+hisRowId+'_FEE_PRE_SS_AMT').val() );
	if( isKeepSSWR ){
		__hisSsEditFeeAmt = FormatStr2Amt( Amt2FormatStr( __hisSsEditFeeAmt,0) );
	}
}

function editSsAmtChecked(obj){
	var amt = FormatStr2Amt(obj.value);
	
	if( isNaN(amt) ){
		alert("请输入数字!!");
		jQuery('#CHG_CURR_FEE_GRID').jqGrid('restoreRow',currRowIdFEE);
		jQuery('#CHG_CURR_FEE_GRID').jqGrid('editRow',currRowIdFEE);
		return;
	}
	if( amt * 1 < 0 ){
		alert("请输入正数!!");
		jQuery('#CHG_CURR_FEE_GRID').jqGrid('restoreRow',currRowIdFEE);
		jQuery('#CHG_CURR_FEE_GRID').jqGrid('editRow',currRowIdFEE);
		return;
	}

	var ss_Amt = FormatStr2Amt(currRowData.FEE_SS_AMT,currRowData.FEE_SS_CCY);
	
	if( isKeepSSWR ){
		var ss_AmtStr = Amt2FormatStr( amt,0);
	}else{
		var ss_AmtStr = FormatAmtByCCY(amt,currRowData.FEE_SS_CCY);
	}
	//zhangy
	var taskname = getFieldValue("TASKNAME");
	if(taskname=="IN_EXNGSENDDOC"){
		var FEEPAYSITE = getFieldValue("FEEPAYSITE");
		if(FEEPAYSITE =="OTH"){
			setFieldValue("OTHUNPAID",ss_AmtStr);
			OTHUNPAID_onChange();
		}
	}
	
	var pic = '/UtanWeb/images/icons/search1.png';
	if( currRowData.FAVORABLE != 'Y' ){
		if( amt >= ss_Amt ){
			pic = '/UtanWeb/images/icons/search.png';
		}
	}
	var viewFeeStr = "<a href='#' onclick='doViewFeeInfo("+currRowIdFEE+",\""+currRowData.FEE_TYPE+"\",\"CHG_CURR_FEE_GRID\")'><img src='"+pic+"'></img></a>";
	$('#CHG_CURR_FEE_GRID').jqGrid('setRowData',currRowIdFEE,{
												FEE_PRE_SS_AMT:ss_AmtStr,
												VIEW_FEEINFO:viewFeeStr,
												FAVORABLE:"Y"});
	
	calCommFee("--",currRowIdFEE,"CHG_CURR_FEE_GRID","",__currSsEditFeeAmt);

	calCommFee("+",currRowIdFEE,"CHG_CURR_FEE_GRID","",0);
	jQuery('#CHG_CURR_FEE_GRID').jqGrid('saveRow',currRowIdFEE,null,'clientArray');
	jQuery('#CHG_CURR_FEE_GRID').jqGrid('editRow',currRowIdFEE);
}

function editHisSsAmtChecked(obj){
	var amt = FormatStr2Amt(obj.value);
	
	if( isNaN(amt) ){
		alert("请输入数字!!");
		jQuery('#CHG_HIS_FEE_GRID').jqGrid('restoreRow',hisRowId);
		jQuery('#CHG_HIS_FEE_GRID').jqGrid('editRow',hisRowId);
		return;
	}
	if( amt * 1 < 0 ){
		alert("请输入正数!!");
		jQuery('#CHG_HIS_FEE_GRID').jqGrid('restoreRow',hisRowId);
		jQuery('#CHG_HIS_FEE_GRID').jqGrid('editRow',hisRowId);
		return;
	}

	var ss_Amt = FormatStr2Amt(hisRowData.FEE_SS_AMT,hisRowData.FEE_SS_CCY);
	
	if( isKeepSSWR ){
		var ss_AmtStr = Amt2FormatStr( amt,0);
	}else{
		var ss_AmtStr = FormatAmtByCCY(amt,hisRowData.FEE_SS_CCY);
	}
	
	var pic = '/UtanWeb/images/icons/search1.png';
	if( hisRowData.FAVORABLE != 'Y' ){
		if( amt >= ss_Amt ){
			pic = '/UtanWeb/images/icons/search.png';
		}
	}
	var viewFeeStr = "<a href='#' onclick='doViewFeeInfo("+hisRowId+",\""+hisRowData.FEE_TYPE+"\",\"CHG_HIS_FEE_GRID\")'><img src='"+pic+"'></img></a>";
	$('#CHG_HIS_FEE_GRID').jqGrid('setRowData',hisRowId,{
												FEE_PRE_SS_AMT:ss_AmtStr,
												VIEW_FEEINFO:viewFeeStr,
												FAVORABLE:"Y"});
	
	calCommFee("--",hisRowId,"CHG_HIS_FEE_GRID","",__hisSsEditFeeAmt);

	calCommFee("+",hisRowId,"CHG_HIS_FEE_GRID","",0);
	jQuery('#CHG_HIS_FEE_GRID').jqGrid('saveRow',hisRowId,null,'clientArray');
	jQuery('#CHG_HIS_FEE_GRID').jqGrid('editRow',hisRowId);
}

function editSsAmtNoCheck(obj){
	var amt = FormatStr2Amt(obj.value);
	var objId = obj.id;
	var currId = objId.substring(0,objId.indexOf('_') );
	
	if( isNaN(amt) ){
		alert("请输入数字!!");
		jQuery('#CHG_CURR_FEE_GRID').jqGrid('restoreRow',currId);
		jQuery('#CHG_CURR_FEE_GRID').jqGrid('editRow',currId);
		return;
	}
	if( amt * 1 < 0 ){
		alert("请输入正数!!");
		jQuery('#CHG_CURR_FEE_GRID').jqGrid('restoreRow',currId);
		jQuery('#CHG_CURR_FEE_GRID').jqGrid('editRow',currId);
		return;
	}
	
	var rowData = jQuery('#CHG_CURR_FEE_GRID').jqGrid('getRowData',currId);
	var ccy = rowData.FEE_SS_CCY;
	feeType = rowData.FEE_TYPE;
	
	var ss_Amt = FormatStr2Amt(rowData.FEE_SS_AMT,rowData.FEE_SS_CCY);
	if( isKeepSSWR ){
		var ss_AmtStr = Amt2FormatStr( amt,0);
	}else{
		var ss_AmtStr = FormatAmtByCCY(amt,ccy);
	}
	
	//zhangy
	var taskname = getFieldValue("TASKNAME");
	if(taskname=="IN_EXNGSENDDOC"){
		var FEEPAYSITE = getFieldValue("FEEPAYSITE");
		if(FEEPAYSITE =="OTH"){
			setFieldValue("OTHUNPAID",ss_AmtStr);
			OTHUNPAID_onChange();
		}
	}
	var pic = '/UtanWeb/images/icons/search1.png';
	if( rowData.FAVORABLE != 'Y' ){
		if( amt >= ss_Amt ){
			pic = '/UtanWeb/images/icons/search.png';
		}
	}
	var viewFeeStr = "<a href='#' onclick='doViewFeeInfo("+currRowIdFEE+",\""+feeType+"\",\"CHG_CURR_FEE_GRID\")'><img src='"+pic+"'></img></a>";
	$('#CHG_CURR_FEE_GRID').jqGrid('setRowData',currRowIdFEE,{
												FEE_PRE_SS_AMT:ss_AmtStr,
												VIEW_FEEINFO:viewFeeStr,
												FAVORABLE:"Y"});
												
	jQuery('#CHG_CURR_FEE_GRID').jqGrid('saveRow',currId,null,'clientArray');
	jQuery('#CHG_CURR_FEE_GRID').jqGrid('editRow',currId);
}

function editHisSsAmtNoCheck(obj){
	var amt = FormatStr2Amt(obj.value);
	var objId = obj.id;
	var currId = objId.substring(0,objId.indexOf('_') );
	
	if( isNaN(amt) ){
		alert("请输入数字!!");
		jQuery('#CHG_HIS_FEE_GRID').jqGrid('restoreRow',currId);
		jQuery('#CHG_HIS_FEE_GRID').jqGrid('editRow',currId);
		return;
	}
	if( amt * 1 < 0 ){
		alert("请输入正数!!");
		jQuery('#CHG_HIS_FEE_GRID').jqGrid('restoreRow',currId);
		jQuery('#CHG_HIS_FEE_GRID').jqGrid('editRow',currId);
		return;
	}
	
	var rowData = jQuery('#CHG_HIS_FEE_GRID').jqGrid('getRowData',currId);
	var ccy = rowData.FEE_SS_CCY;
	feeType = rowData.FEE_TYPE;
	
	var ss_Amt = FormatStr2Amt(rowData.FEE_SS_AMT,rowData.FEE_SS_CCY);
	if( isKeepSSWR ){
		var ss_AmtStr = Amt2FormatStr( amt,0);
	}else{
		var ss_AmtStr = FormatAmtByCCY(amt,ccy);
	}
	
	var pic = '/UtanWeb/images/icons/search1.png';
	if( rowData.FAVORABLE != 'Y' ){
		if( amt >= ss_Amt ){
			pic = '/UtanWeb/images/icons/search.png';
		}
	}
	var viewFeeStr = "<a href='#' onclick='doViewFeeInfo("+currId+",\""+feeType+"\",\"CHG_HIS_FEE_GRID\")'><img src='"+pic+"'></img></a>";
	$('#CHG_HIS_FEE_GRID').jqGrid('setRowData',currId,{
												FEE_PRE_SS_AMT:ss_AmtStr,
												VIEW_FEEINFO:viewFeeStr,
												FAVORABLE:"Y"});
												
	jQuery('#CHG_HIS_FEE_GRID').jqGrid('saveRow',currId,null,'clientArray');
	jQuery('#CHG_HIS_FEE_GRID').jqGrid('editRow',currId);
}

function changChgCCY(obj,gridID1,gridID2){
	clearFeeData();	
	var currSelRows = jQuery("#"+gridID1).jqGrid('getGridParam','selarrrow');
	if( currSelRows != null ){
		$.each(currSelRows, function(i, n){
			var data = jQuery('#'+gridID1).jqGrid('getRowData',n);
			$('#'+gridID1).jqGrid('setRowData',n,{
				FEE_SS_AMT:(data.FEE_AMT ||  _FEE_HIS_SS_R[n + "_" + gridID1 + "_FEE_SS_AMT"]),
				FEE_PRE_SS_AMT:(  data.FEE_AMT || _FEE_HIS_SS_R[n + "_" + gridID1 + "_FEE_PRE_SS_AMT"]),
				FEE_SS_CCY:(data.FEE_CCY||_FEE_HIS_SS_R[n + "_" + gridID1 + "_FEE_SS_CCY"] )
			});
			
			calCommFee("+",n,gridID1,"",0);
		});
	}
	
	var hisSelRows = jQuery("#"+gridID2).jqGrid('getGridParam','selarrrow');
	if( hisSelRows != null ){
		$.each( hisSelRows, function(j, m){
			var data = jQuery('#'+gridID2).jqGrid('getRowData',m);
			$('#'+gridID2).jqGrid('setRowData',m,{
				FEE_SS_AMT:(  data.FEE_AMT||_FEE_HIS_SS_R[m + "_" + gridID2 + "_FEE_SS_AMT"]),
				FEE_PRE_SS_AMT:(  data.FEE_AMT ||_FEE_HIS_SS_R[m + "_" + gridID2 + "_FEE_PRE_SS_AMT"]),
				FEE_SS_CCY:( data.FEE_CCY||_FEE_HIS_SS_R[m + "_" + gridID2 + "_FEE_SS_CCY"])
			});
			
			calCommFee("+",m,gridID2,"",0);
		});
	}
	
	onChange();
}

function clearFeeData(){
	$('#CHG_FEE_OUR_HAND').val(0);
	$('#CHG_FEE_OTH_HAND').val(0);
	
	$('#CHG_FEE_OUR_POST').val(0);
	$('#CHG_FEE_OTH_POST').val(0);
	
	$('#CHG_FEE_OUR_CABLE').val(0);
	$('#CHG_FEE_OTH_CABLE').val(0);
	
	$('#CHG_FEE_OUR_TOTAL').val(0);
	$('#CHG_FEE_OTH_TOTAL').val(0);
	
	$('#CHG_FEE_OUR_FINANCE').val(0);
	$('#CHG_FEE_OTH_FINANCE').val(0);
}
	
//Function formatFeeToXML
function formatFeeToJSON(){
		if( $('#CHG_CURR_FEE_GRID').get(0) != null ){
		var rowData ;
		var allRows = jQuery("#CHG_CURR_FEE_GRID").jqGrid('getDataIDs');
		$.each( allRows, function(i, n){	
			jQuery('#CHG_CURR_FEE_GRID').jqGrid('saveRow',n,null,'clientArray');
		});
		var selectedRows = jQuery("#CHG_CURR_FEE_GRID").jqGrid('getGridParam','selarrrow');
		
		var jsonData = $("#CHG_CURR_FEE_GRID").jqGrid('getRowData');
		for(var i=0; i<jsonData.length; i++){
			// 处理是否收取
			var rowData = jsonData[i];
			var rowId = allRows[i];
			var isSelect = "N";
			if ( jQuery.inArray(rowId,selectedRows)  != -1){
				isSelect = "Y";
			}
			rowData.SELECTED_FLAG = isSelect;
			if(!rowData.FEE_CCY_F) rowData.FEE_CCY_F = "";
		}
		var jsonDataStr = "";
		if(jsonData.length>0){
			jsonDataStr = $.toJSON(jsonData, function(key, value){
				if(key==="FEE_AMT" || key==="FEE_SS_AMT" || key==="FEE_PRE_SS_AMT" || key==="FEE_AMT_F"){
					return FormatStr2Amt(value);
				}
				return value;
			});
		}
		$('#__CHG_FEE_CURR_GRID_JSON').val(jsonDataStr);
	}
	formatHisFeeToJSON();
	formatRealHisFeeToJSON();
	getFeeModifyFlag();
}

function getFeeModifyFlag(){
	var msg = "Modify Information:";
	var rowMsg = "";
	var allRows = jQuery("#CHG_CURR_FEE_GRID").jqGrid('getDataIDs');
	var rowData,isModFlag = "NO";
	for( var i = 0;i<allRows.length;i++ ){
		rowData = jQuery('#CHG_CURR_FEE_GRID').jqGrid('getRowData',allRows[i]);
		if( FormatStr2Amt( rowData.FEE_SS_AMT ) != FormatStr2Amt( rowData.FEE_PRE_SS_AMT ) ){
			isModFlag = "YES";
			rowMsg += " ("+rowData.FEE_SS_CCY+" : " + rowData.FEE_SS_AMT + " -----> " + rowData.FEE_PRE_SS_AMT + ") ";
		}
	}
	msg = msg + rowMsg + " ";
 	$('#CHARGE_ISAUTH_FLAG').val(isModFlag);
 	$('#CHARGE_ISAUTH_NOTE').val(msg);
}

function formatHisFeeToXML(){
	if( $('#CHG_HIS_FEE_GRID').get(0) != null ){
		var rowData ;
		var allRows = jQuery("#CHG_HIS_FEE_GRID").jqGrid('getDataIDs');
		$.each( allRows, function(i, n){	
			jQuery('#CHG_HIS_FEE_GRID').jqGrid('saveRow',n,null,'clientArray');
		});
		
		var selectedRows = jQuery("#CHG_HIS_FEE_GRID").jqGrid('getGridParam','selarrrow');
		
		if( allRows != null && allRows.length > 0 ){		
			var formatXml = '';
			formatXml = "<?xml version='1.0' encoding='GBK'?><hisfee><rows>";
			$.each( allRows, function(i, n){
				rowData = jQuery('#CHG_HIS_FEE_GRID').jqGrid('getRowData',n);
				
				var rowXml = '';
				var isSelect = "N";
				rowXml = '<row>';
				
				rowXml = rowXml + '<cell>'+rowData.BIZ_NO+'</cell>';//0
				rowXml = rowXml + '<cell>'+rowData.FEE_PAY_BY+'</cell>';//1
				rowXml = rowXml + '<cell>'+rowData.FEE_TYPE+'</cell>';//2
				rowXml = rowXml + '<cell>'+rowData.FEE_DESC+'</cell>';//3
				rowXml = rowXml + '<cell>'+rowData.FEE_CCY+'</cell>';//4
				rowXml = rowXml + '<cell>'+FormatStr2Amt(rowData.FEE_AMT)+'</cell>';//5
				rowXml = rowXml + '<cell>'+rowData.FEE_SS_CCY+'</cell>';//6
				rowXml = rowXml + '<cell>'+FormatStr2Amt(rowData.FEE_SS_AMT)+'</cell>';//7
				rowXml = rowXml + '<cell>'+FormatStr2Amt(rowData.FEE_PRE_SS_AMT)+'</cell>';//8
				rowXml = rowXml + '<cell></cell>';//9
				rowXml = rowXml + '<cell>'+rowData.FEE_NAME+'</cell>';//10
				rowXml = rowXml + '<cell>'+rowData.FEE_KEY+'</cell>';//11
				rowXml = rowXml + '<cell>'+rowData.AREA_CODE+'</cell>';//12
				rowXml = rowXml + '<cell>'+rowData.FAVORABLE+'</cell>';//13
				
				if ( jQuery.inArray(n,selectedRows)  != -1){
					isSelect = "Y";
				}
				
				rowXml = rowXml + '<cell>'+isSelect+'</cell>';//14
				//ADD BY WULEI AT 20130507 FOR FEE----BEGIN
				rowXml = rowXml + '<cell hidFlag = "N">'+rowData.FEE_CCY_F+'</cell>';//15
				rowXml = rowXml + '<cell hidFlag = "N">'+FormatStr2Amt(rowData.FEE_AMT_F)+'</cell>';//16
				//ADD BY WULEI AT 20130507 FOR FEE----END
				
				
				rowXml = rowXml + '</row>';
				formatXml = formatXml + rowXml;
			});
			formatXml = formatXml + '</rows></hisfee>';
			
			$('#__CHG_FEE_HIS_GRIDINFO').get(0).value = formatXml;
		}
	}
}


function formatHisFeeToJSON(){
	if( $('#CHG_HIS_FEE_GRID').get(0) != null ){
		var rowData ;
		var allRows = jQuery("#CHG_HIS_FEE_GRID").jqGrid('getDataIDs');
		$.each( allRows, function(i, n){	
			jQuery('#CHG_HIS_FEE_GRID').jqGrid('saveRow',n,null,'clientArray');
		});
		var selectedRows = jQuery("#CHG_HIS_FEE_GRID").jqGrid('getGridParam','selarrrow');
		var jsonData = $("#CHG_HIS_FEE_GRID").jqGrid('getRowData');
		for(var i=0; i<jsonData.length; i++){
			// 处理是否收取
			var rowData = jsonData[i];
			var rowId = allRows[i];
			var isSelect = "N";
			if ( jQuery.inArray(rowId, selectedRows)  != -1){
				isSelect = "Y";
			}
			rowData.SELECTED_FLAG = isSelect;
			if(!rowData.FEE_CCY_F) rowData.FEE_CCY_F = "";
		}
		var jsonDataStr = "";
		if(jsonData.length>0){
			jsonDataStr = $.toJSON(jsonData, function(key, value){
				if(key==="FEE_AMT" || key==="FEE_SS_AMT" || key==="FEE_PRE_SS_AMT" || key==="FEE_AMT_F"){
					return FormatStr2Amt(value);
				}
				return value;
			});
		}
		$('#__CHG_FEE_HIS_GRID_JSON').get(0).value = jsonDataStr;
	}
	formatVoucherFee();
}

function formatRealHisFeeToJSON(){
	if( $('#CHG_REAL_HIS_FEE_GRID').get(0) != null ){
		var jsonData = $("#CHG_REAL_HIS_FEE_GRID").jqGrid('getRowData');
		for(var i=0; i<jsonData.length; i++){
			var rowData = jsonData[i];
			if(!rowData.FEE_CCY_F) rowData.FEE_CCY_F = "";
		}
		var jsonDataStr = "";
		if(jsonData.length>0){
			jsonDataStr = $.toJSON(jsonData, function(key, value){
				if(key==="FEE_AMT" || key==="FEE_SS_AMT" || key==="FEE_PRE_SS_AMT" || key==="FEE_AMT_F"){
					return FormatStr2Amt(value);
				}
				return value;
			});
		}
		$('#__CHG_FEE_REAL_HIS_GRID_JSON').get(0).value = jsonDataStr;
	}
}

//Function initFeeGrid
function initReleaseFee(){
	var jsonStr = "",selectFlag = 'N',favo = "N",feeType = "";
	jsonStr = $('#__CHG_FEE_CURR_GRID_JSON').val();
	if(jsonStr){
		$('#CHG_CURR_FEE_GRID').GridUnload();
		FEE_IS_CREATE_BAR_FLAG = false;
		var arrData = $.parseJSON(jsonStr);
		var len = arrData.length;
		var jsonData = {
			"rows":arrData,
			"records" : len,
			"page" : 1,
			"total" : len
		}
		createCurrFee('jsonstring',jsonData,false,false,false);
		createFeePageButton(false);
		
		for(var i=0; i<arrData.length; i++){
			var rowData = arrData[i];
			var rowId = (i+1)+"";
			selectFlag = rowData.SELECTED_FLAG;
			favo = rowData.FAVORABLE;
			feeType = rowData.FEE_TYPE;
			if( selectFlag == 'Y' ){
	        	jQuery("#CHG_CURR_FEE_GRID").jqGrid('setSelection', rowId, false);
	        }
			var pic = '/UtanWeb/images/icons/search1.png';
			if( favo != 'Y' ) pic = '/UtanWeb/images/icons/search.png';
			var viewFeeStr = "<a href='#' onclick='doViewFeeInfo("+(rowId)+",\""+feeType+"\",\"CHG_CURR_FEE_GRID\")'><img src='"+pic+"'></img></a>";
	        $('#CHG_CURR_FEE_GRID').jqGrid('setRowData',(rowId),{VIEW_FEEINFO:viewFeeStr});
		}
	}
}

function initReleaseHisFee(){
	var jsonStr = "",selectFlag = 'N',favo = "N",feeType = "";
	jsonStr = $('#__CHG_FEE_HIS_GRID_JSON').val();
	if(jsonStr){
		$('#CHG_HIS_FEE_GRID').GridUnload();
		var arrData = $.parseJSON(jsonStr);
		var len = arrData.length;
		var jsonData = {
			"rows":arrData,
			"records" : len,
			"page" : 1,
			"total" : len
		}
		
		createHisFee('history','','','jsonstring',jsonData,false,false,false);
		for(var i=0; i<arrData.length; i++){
			var rowData = arrData[i];
			var rowId = (i+1)+"";
			selectFlag = rowData.SELECTED_FLAG;
			favo = rowData.FAVORABLE;
	        feeType = rowData.FEE_TYPE;
	        if( selectFlag == 'Y' ){
	        	jQuery("#CHG_HIS_FEE_GRID").jqGrid('setSelection',rowId,false);
	        }
		}
		dealAllGiveUpFee("CHG_HIS_FEE_GRID");
	}
}

function initReleaseRealHisFee(){
	var jsonStr = "";
	jsonStr = $('#__CHG_FEE_REAL_HIS_GRID_JSON').val();
	if(jsonStr){
		$('#CHG_REAL_HIS_FEE_GRID').GridUnload();
		var arrData = $.parseJSON(jsonStr);
		var len = arrData.length;
		var jsonData = {
			"rows":arrData,
			"records" : len,
			"page" : 1,
			"total" : len
		}
		createRealHisFee('history','','','jsonstring',jsonData,false,false,false);
	}
}

//Function initFeeGrid
function initFixPengingFee(){
	initCommMessage();
	var jsonStr = "",selectFlag = 'N',favo = "N",feeType = "";
	jsonStr = $('#__CHG_FEE_CURR_GRID_JSON').val();
	if(jsonStr){
		var arrData = $.parseJSON(jsonStr);
		for(var i=0; i<arrData.length; i++){
			var rowData = arrData[i];
			var rowId = (i+1)+"";

	        favo = rowData.FAVORABLE;
	        feeType = rowData.FEE_TYPE;
	        
            _FEE_HIS_SS_R[rowId + "_CHG_CURR_FEE_GRID_FEE_SS_CCY"] = rowData.FEE_SS_CCY;
	        _FEE_HIS_SS_R[rowId + "_CHG_CURR_FEE_GRID_FEE_SS_AMT"] = rowData.FEE_SS_AMT;
	        _FEE_HIS_SS_R[rowId + "_CHG_CURR_FEE_GRID_FEE_PRE_SS_AMT"] = rowData.FEE_PRE_SS_AMT;	        

	        var pic = '/UtanWeb/images/icons/search1.png';
			if( favo != 'Y' ) pic = '/UtanWeb/images/icons/search.png';
			var viewFeeStr = "<a href='#' onclick='doViewFeeInfo("+rowId+",\""+feeType+"\",\"CHG_CURR_FEE_GRID\")'><img src='"+pic+"'></img></a>";
	        rowData.VIEW_FEEINFO = viewFeeStr;
	        $('#CHG_CURR_FEE_GRID').jqGrid('addRowData', rowId, rowData);
	    }
		
		for(var j=0; j<arrData.length; j++){
			var rowData = arrData[j];
			var rowId = (j+1)+"";
			var selectFlag = rowData.SELECTED_FLAG;
			if( selectFlag == 'Y' ){
	        	jQuery("#CHG_CURR_FEE_GRID").jqGrid('setSelection', rowId, true);
	        }
		}
		dealAllGiveUpFee("CHG_CURR_FEE_GRID");
	} else {
		$('#CHG_CURR_FEE_GRID').GridUnload();
		FEE_IS_CREATE_BAR_FLAG = false;
		createCurrFee('',jsonStr,true,true,true);
		createFeePageButton(true);
	}
}

function initFixPendingHisFee(){
	var jsonStr = "",selectFlag = 'N';
	jsonStr = $('#__CHG_FEE_HIS_GRID_JSON').val();
	if(jsonStr){
		$('#CHG_HIS_FEE_GRID').GridUnload();
		
		var arrData = $.parseJSON(jsonStr);
		var len = arrData.length;
		var jsonData = {
			"rows":arrData,
			"records" : len,
			"page" : 1,
			"total" : len
		}
		createHisFee('fixpending','','','jsonstring',jsonData,true,true,true);
		
		for(var i=0; i<arrData.length; i++){
			var rowData = arrData[i];
			var rowId = (i+1)+"";
			selectFlag = rowData.SELECTED_FLAG;
			if( selectFlag == 'Y' ){
	        	jQuery("#CHG_HIS_FEE_GRID").jqGrid('setSelection', rowId,true);
	        }
		}
		dealAllGiveUpFee("CHG_HIS_FEE_GRID");
	}
}

function initFixPendingRealHisFee(){
	var jsonStr = "",selectFlag = 'N';
	jsonStr = $('#__CHG_FEE_REAL_HIS_GRID_JSON').val();
	if(jsonStr){
		$('#CHG_REAL_HIS_FEE_GRID').GridUnload();
		var arrData = $.parseJSON(jsonStr);
		var len = arrData.length;
		var jsonData = {
			"rows":arrData,
			"records" : len,
			"page" : 1,
			"total" : len
		}
		createRealHisFee('fixpending','','','jsonstring',jsonData,true,true,true);
	}
}

function onChange(){
	if( typeof(onCustFeeChange) == 'function' ){
		onCustFeeChange();
	}
}

function onChange2(){
	if( typeof(onPayByChange) == 'function' ){
		onPayByChange();
	}
}

function doViewFeeInfo(rowid,feeType,gridName){
	jQuery('#'+gridName).jqGrid('saveRow',rowid,null,'clientArray');
	var rowData = jQuery('#'+gridName).jqGrid('getRowData',rowid);
	var feeName = rowData.FEE_NAME;
	var isFavorable = rowData.FAVORABLE;
	$('#CURR_FEE_NAME').val( feeName );
	$('#CURR_FEE_TYPE').val(feeType);
	$('#CURR_FEE_FAVORABLE').val(isFavorable);
	
	$('#OPERTYPE').val('VIEWFEEINFO');
	createSingleWindow("viewFee", 820, 430);
	$('#TASKTYPE').val('COMMUTILSERVLET');
	document.UTFORM.target = 'viewFeeIFrame';
	document.UTFORM.submit();
}

function getRealCcy(payBy){
	if( payBy == 'OUR' ){
		return 'CNY';
	}else if( payBy == 'OTH' ){
		return 'USD';
	}
	return 'CNY';
}

function getFeeRealCcy(payBy,feeCcy){
	if( payBy == 'OUR' ){
		return 'CNY';
	}else if( payBy == 'OTH' ){
		if( feeCcy == null || feeCcy == "" ) return 'USD';
		return feeCcy;
	}
	return 'CNY';
}

function createFeePageButton( clickEnable ){
	if( FEE_IS_CREATE_BAR_FLAG ) return;
	FEE_IS_CREATE_BAR_FLAG = true;
	jQuery('#CHG_CURR_FEE_GRID')
		.jqGrid('navButtonAdd','#CHG_CURR_FEE_GRID_BAR',{
		    caption: '',
		    title: 'Add Fee Info',
			buttonicon:'ui-icon-plus',
			clickEnable:clickEnable,
		    onClickButton :function(){
				addFee();
	    	}})
		.jqGrid('navButtonAdd','#CHG_CURR_FEE_GRID_BAR',{
			caption:'',
			title:'Del Fee Info',
			buttonicon:'ui-icon-minus',
			clickEnable:clickEnable,
			onClickButton : function (){
				delFee();
	    	}})
		.jqGrid('navButtonAdd','#CHG_CURR_FEE_GRID_BAR',{
			caption:'',
			title:'Edit Row',
			buttonicon:'ui-icon-pencil',
			clickEnable:clickEnable,
			onClickButton : function (){
				editFeeRow();
	    	}})
		.jqGrid('navButtonAdd','#CHG_CURR_FEE_GRID_BAR',{
			caption:'',
			title:'Save Row',
			buttonicon:'ui-icon-disk',
			clickEnable:clickEnable,
			onClickButton : function (){
				saveFeeRow();
	    	}})
		.jqGrid('navButtonAdd','#CHG_CURR_FEE_GRID_BAR',{
			caption:'',
			title:'Cancle Save Row',
			buttonicon:'ui-icon-cancel',
			clickEnable:clickEnable,
			onClickButton : function (){
				cancleFeeRow();
	    	}});
}

function getGridSelectArrFlag(gridName,selectArray){
	var allRows = jQuery("#"+gridName).jqGrid('getGridParam','selarrrow')
	var isExistFlag = false;
	for(var i = 0;i < selectArray.length;i++ ){
		if ( jQuery.inArray(selectArray[i]+'',allRows)  != -1){
			isExistFlag = true;
			break;
		}
	}
	//alert("isExistFlag-1-"+isExistFlag);
	return isExistFlag;
}

function getGridSelectFlag(gridName,rowid){
	var allRows = jQuery("#"+gridName).jqGrid('getGridParam','selarrrow')
	var isExistFlag = false;
	if ( jQuery.inArray(rowid+'',allRows)  != -1){
		isExistFlag = true;
	}
	//alert("isExistFlag-2-"+isExistFlag);
	return isExistFlag;
}

function storeReturnFee(oper,rowid,gridName){
	if( !isStoreReturnFeeFlag ) return;
	var data = jQuery('#'+gridName).jqGrid('getRowData',rowid);
	if( oper == "-" ){
		//modify by wulei at 20150723 历史费用手工修改实收金额bug
		$('#'+gridName).jqGrid('setRowData',rowid,{
				FEE_SS_AMT:(data.FEE_AMT || _FEE_HIS_SS_R[rowid + "_" + gridName + "_FEE_SS_AMT"] ),
				FEE_PRE_SS_AMT:(data.FEE_AMT || _FEE_HIS_SS_R[rowid + "_" + gridName + "_FEE_PRE_SS_AMT"] ),
				FEE_SS_CCY:(data.FEE_CCY || _FEE_HIS_SS_R[rowid + "_" + gridName + "_FEE_SS_CCY"] )});
	}else if( oper == "--" ){
		var allRows = jQuery("#"+gridName).jqGrid('getDataIDs');
		$.each( allRows, function(i, n){	
			storeReturnFee("-",n,gridName)
		});
	}	
}


function checkPayByStatus(oper,currFeeGrid,selectedArray,checkFlag,rowid){
	if( !isCheckPayByFlag ) return true;
	saveFeeRow();
	saveHisFeeRow();
	if( checkPayByOneRow(currFeeGrid,"CHG_CURR_FEE_GRID",selectedArray,getCurrSelectPayBy(oper,currFeeGrid,rowid),checkFlag,rowid) 
		&& 
		checkPayByOneRow(currFeeGrid,"CHG_HIS_FEE_GRID",selectedArray,getCurrSelectPayBy(oper,currFeeGrid,rowid),checkFlag,rowid) ) return true;
	return false;
}

function checkPayByOth(){
	var data;
	var allRows = jQuery('#CHG_CURR_FEE_GRID').jqGrid('getGridParam','selarrrow');
	if( allRows ){
		for(var i=0;i<allRows.length;i++){
			jQuery('#CHG_CURR_FEE_GRID').jqGrid('saveRow',allRows[i],null,'clientArray');
			data = jQuery('#CHG_CURR_FEE_GRID').jqGrid('getRowData',allRows[i]);
			if( data.FEE_PAY_BY == 'OTH' ){
				alert("费用收取方向必须为OUR,请检查！");
				return false;
			}
		}
	}
	var allHisRows = jQuery('#CHG_HIS_FEE_GRID').jqGrid('getGridParam','selarrrow');
	if( allHisRows ){
		for(var j=0;j<allHisRows.length;j++){
			jQuery('#CHG_HIS_FEE_GRID').jqGrid('saveRow',allHisRows[i],null,'clientArray');
			data = jQuery('#CHG_HIS_FEE_GRID').jqGrid('getRowData',allHisRows[j]);
			if( data.FEE_PAY_BY == 'OTH' ){
				alert("费用收取方向必须为OUR,请检查！");
				return false;
			}
		}
	}
	return true;
}

function checkPayByOneRow(currFeeGrid,gridName,selectedArray,payBy,checkFlag,rowid){
	if( !isCheckPayByFlag ) return;
	var allRows = jQuery("#"+gridName).jqGrid('getGridParam','selarrrow');
	if( !allRows || allRows.length == 0 ) return true;
	
	var data;
	for(var i=0;i<allRows.length;i++){
		data = jQuery('#'+gridName).jqGrid('getRowData',allRows[i]);
		if( payBy && payBy != data.FEE_PAY_BY ){
			if( checkFlag == "select" ){
				var selectData = jQuery('#'+gridName).jqGrid('getRowData',rowid);
				payBy = getPayByUnSelect(selectData.FEE_PAY_BY);
				$('#'+currFeeGrid).jqGrid('setRowData',rowid,{FEE_PAY_BY:payBy});
				jQuery('#'+currFeeGrid).jqGrid('editRow',rowid);
			}else if( checkFlag == "click" ){
				jQuery("#"+currFeeGrid).jqGrid('resetSelection');
				$.each( selectedArray, function(j, n){
					jQuery("#"+currFeeGrid).jqGrid('setSelection',n,false);
				});
			}
			alert("费用收费方向必须一致为["+payBy+"],请检查！");
			return false;
		}
	}
	return true;
}

function getCurrSelectPayBy(oper,currFeeGrid,rowid){
	var data;
	if( currSelectRows.length > 0 ){
		data = jQuery('#CHG_CURR_FEE_GRID').jqGrid('getRowData',currSelectRows[0]);
		return data.FEE_PAY_BY;
	}
	if( hisSelectRows.length > 0 ){
		data = jQuery('#CHG_HIS_FEE_GRID').jqGrid('getRowData',hisSelectRows[0]);
		return data.FEE_PAY_BY;
	}
	
	if( oper == "+" || Number(rowid) != -1 ){
		var currRows = jQuery("#"+currFeeGrid).jqGrid('getDataIDs');
		if( currRows && currRows.length > 0 ){
			data = jQuery('#'+currFeeGrid).jqGrid('getRowData',rowid);
			return data.FEE_PAY_BY;
		}
	}else if( oper == "++" || Number(rowid) == -1 ){
		var allRows = jQuery("#CHG_CURR_FEE_GRID").jqGrid('getDataIDs');
		if( allRows && allRows.length > 0 ){
			data = jQuery('#CHG_CURR_FEE_GRID').jqGrid('getRowData',allRows[0]);
			return data.FEE_PAY_BY;
		}
		var allHisRows = jQuery("#CHG_HIS_FEE_GRID").jqGrid('getDataIDs');
		if( allHisRows && allHisRows.length > 0 ){
			data = jQuery('#CHG_HIS_FEE_GRID').jqGrid('getRowData',allHisRows[0]);
			return data.FEE_PAY_BY;
		}
	}
	return "";
}

function getPayByUnSelect(payBy){
	if( payBy == "OUR" ){
		return "OTH";
	}
	return "OUR";
}


function getExrateInfo(ccy){
	var r;
	$.ajax({
	  url: '/UtanWeb/CommUtilServlet',
	  dataType:'json',
	  type:'POST',
	  data:'OPERTYPE=getExRateInfo&ccy='+ccy,
	  async:false,
	  error:function(){
	  		alert('获取汇率信息通信错误!');
	  		return ;
	  },
	  success: function(jsonData){
		  r =  jsonData;
	  }
	});
	return r;
}
function formatVoucherFee(){
		var feeVouData = {
		"OUR":[],
		"OTH":[]
	};
	var addVouData = function(gid){
		var selData = jQuery("#"+gid).jqGrid('getGridParam','selarrrow');
		if(!selData || !selData.length) return;
		$.each(selData, function(i, n){
			var d = jQuery('#'+gid).jqGrid('getRowData', n);
			if ("COMM" == d.FEE_TYPE) {
				d.VIEW_FEEINFO = "";
					if(d.FEE_PAY_BY == "OUR"){
					feeVouData.OUR.push(d);
				} else if(d.FEE_PAY_BY == "OTH"){
					feeVouData.OTH.push(d);
				}
			}
		});
	};
	
	//curr fee
	addVouData("CHG_CURR_FEE_GRID");
	
	//his fee
	addVouData("CHG_HIS_FEE_GRID");
	
	var jsonStr = ""; 
	if(feeVouData.OUR.length>0 || feeVouData.OTH.length>0){
		jsonStr = $.toJSON(feeVouData);
	}
	setFieldValue("__FEE_JSON_STRING" , jsonStr );
}
//-------------------------end-------------------------
//默认勾选当前费用-->除付汇交易用,除OTH
function selectAllFee() {
	var allRows = jQuery("#CHG_CURR_FEE_GRID").jqGrid('getDataIDs');
	for ( var i = 0; i < allRows.length; i++) {
		var rowId = allRows[i];
		var rowData = jQuery('#CHG_CURR_FEE_GRID').jqGrid('getRowData', rowId);
		var feePayBy = getGridValue(rowData, rowId, "FEE_PAY_BY");
		if (feePayBy != "OTH") {
			setGridSelected( {
				"gridId" : "CHG_CURR_FEE_GRID",
				"selected" : true,
				"rowNum" : rowId,
				"fire" : true
			});
		}
	}
}

function dealAllGiveUpFee(gridName){	
	var allRows = jQuery("#"+gridName).jqGrid('getDataIDs');
	for(var i=0; i<allRows.length; i++){
		var rowId = allRows[i];
		var rowData = jQuery('#'+gridName).jqGrid('getRowData',rowId);
		var givupFlag = rowData.GIVEUP_FLAG;
		if(givupFlag=="YES"){
			checkOffJQGrid(gridName, rowId, false);
			disableJQGrid(gridName, rowId);
		}
	}
}
/**
 * 判断有没有进行勾取
 * 勾取：则取消勾取-计算费用
 * 未勾取：则进行费用计算，但是不累加到总金额
 */
function changeCharge4PreToDo(gridName, rowId) {
	var allRows = jQuery("#"+gridName).jqGrid('getGridParam','selarrrow');
	if($.inArray(rowId,allRows)>-1){//勾取
		jQuery("#"+gridName).jqGrid("setSelection",rowId,true);	
		calCommFeeONLY("+",rowId,gridName,"",0);
	} else {//未勾取
		calCommFeeONLY("+",rowId,gridName,"",0);
	}
}

/**
 * 判断费用在预算的情况下，做勾取动作等相关
 */
function preChargeSelected(gridName, rowId) {
	var gf = getGridValue({"gridName":gridName,"rowId":rowId,"fieldName":"GIVEUP_FLAG"});
	if (gf != "PRE") return true;
		
	var pay = getGridValue({"gridName":gridName,"rowId":rowId,"fieldName":"FEE_PAY_BY"});
	var ssCcy = getGridValue({"gridName":gridName,"rowId":rowId,"fieldName":"FEE_SS_CCY"});
	var ccy = getFieldValue("CHG_FEE_"+pay+"_CCY");
	var amt = getFieldValue("CHG_FEE_"+pay+"_TOTAL");
	
	if (ccy != ssCcy && amt == 0) {
		alert("默认收费方向["+pay+"]的币种为["+ccy+"],要收取该笔预算费用，会默认收取预算币种["+ssCcy+"],请注意!");
		setFieldValue("CHG_FEE_"+pay+"_CCY", ssCcy);
		return true;
	}
	
	if (ccy != ssCcy && amt > 0) {
		alert("已经存在币种为["+ccy+"]的收费记录,不能进行此费用["+ssCcy+"]的收取!");
		event.preventDefault();
        event.returnValue = false;
        jQuery("#"+gridName).jqGrid("setSelection",rowId,false);	
		return false;
	}
	
	return true;
}

/**
 * 取消选择预算费用
 */
function preChargeUnSelected(gridName, rowId) {
	$('#'+gridName).jqGrid('setRowData', rowId, {GIVEUP_FLAG:"NO"});
}

/**
 * 检查所有费用中是否存在预算费用
 * 若存在
 * 	若预算费用的币种与收取费用不一致，则提示
 * @param {Object} gridName
 */
function preChargeSelectedAll(gridName, selectedRows) {
	var allRows = jQuery("#"+gridName).jqGrid('getDataIDs');
	var pre = {};
	$.each(allRows, function(i, n){	
		var pf = getGridValue({"gridName":gridName,"rowId":n,"fieldName":"GIVEUP_FLAG"});
		if (pf == "PRE") {
			var ssCcy = getGridValue({"gridName":gridName,"rowId":n,"fieldName":"FEE_SS_CCY"});
			var pay = getGridValue({"gridName":gridName,"rowId":n,"fieldName":"FEE_PAY_BY"});
			pre[ssCcy] = pay;
		}
	});
	
	var _tccy = null;
	for (var k in pre) {
		if (_tccy != null && k == _tccy) {
			alert("存在不同币种的预算费用,请先统一币种,或者单独收取!");
			
			event.preventDefault();
        	event.returnValue = false;
        	
        	jQuery("#"+gridName).jqGrid("resetSelection");	
        	
        	$.each(selectedRows, function(i, n){	
				jQuery("#"+gridName).jqGrid("setSelection", n, false);	
			});
        	
			return false;
		} else {
			_tccy = k;
		}
	}
	
	for (var k in pre) {
		var ccy = getFieldValue("CHG_FEE_"+pre[k]+"_CCY");
		if (k != ccy) {
			alert("默认收取费用币种["+ccy+"]与预算费用币种["+k+"]不一致,不同全部收取!");
			
			event.preventDefault();
        	event.returnValue = false;
        	
        	jQuery("#"+gridName).jqGrid("resetSelection");
        	
        	$.each(selectedRows, function(i, n){	
				jQuery("#"+gridName).jqGrid("setSelection", n, false);	
			});
        	
			return false;
		}
	}
	
	return true;
}

function preChargeUnSelectedAll(gridName) {
	var allRows = jQuery("#"+gridName).jqGrid('getDataIDs');
	$.each(allRows, function(i, n){	
		var pf = getGridValue({"gridName":gridName,"rowId":n,"fieldName":"GIVEUP_FLAG"});
		if (pf == "PRE") {
			preChargeUnSelected(gridName, n);
		}
	});
}