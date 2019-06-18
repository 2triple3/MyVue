/**
 * 客户帐处理
 */
//Function For CustAcc  By WL 20100708--------------------

function setCustAccJSH(obj){
	var custId = $('#ACC_DRCUSTID').val();
	if( custId == null || custId == "" ) return;
	setExRateCustid(custId);
	calCustAccJSHInfo(obj);
	formatCustAccJSHToXml();
}

function calCustAccJSHInfo(obj){
	
	var id = "";
	if(obj){
		id = obj.id;
	}
	var ccy11 = $('#ACC_DR_CCY').val();
	var ccy22 = $('#ACC_CR_CCY').val();
	var settle = $('#SETTLE_TYPE').val();
	
	if( ccy11 == null || ccy11 == "" || ccy22 == null || ccy22 == "" ) return;
	if(settle=="CASH"){//zxm结汇增加现钞方式
		$('#CUST_ACC_BUYRATE1').val(getCCYRateByType(ccy11,'C'));
	    $('#CUST_ACC_SELRATE1').val(getCCYRateByType(ccy11,'C'));
	    $('#CUST_ACC_BUYRATE2').val(getCCYRateByType(ccy22,'C'));
	    $('#CUST_ACC_SELRATE2').val(getCCYRateByType(ccy22,'C'));
	}else{
		$('#CUST_ACC_BUYRATE1').val(getCCYRateByType(ccy11,'B'));
	    $('#CUST_ACC_SELRATE1').val(getCCYRateByType(ccy11,'S'));
	    $('#CUST_ACC_BUYRATE2').val(getCCYRateByType(ccy22,'B'));
	    $('#CUST_ACC_SELRATE2').val(getCCYRateByType(ccy22,'S'));
	}

	$('#CUST_ACC_PP_BUYRATE1').val(getCCYRateByType(ccy11,'PB'));
	$('#CUST_ACC_PP_SELRATE1').val(getCCYRateByType(ccy11,'PS'));

	$('#CUST_ACC_PP_BUYRATE2').val(getCCYRateByType(ccy22,'PB'));
	$('#CUST_ACC_PP_SELRATE2').val(getCCYRateByType(ccy22,'PS'));
	
	var amt1 = getFieldValue( $('#ACC_DR_AMT').get(0) );
	var amt2 = getFieldValue( $('#ACC_CR_AMT').get(0) );
	
	var jshType = $('#CUST_ACC_JSH_TYPE').val();
	if( jshType == 'JH'){
//		if(id=="CNY_AMT" ){
//			setFieldValue( $('#ACC_DR_AMT').get(0),div(amt2,getExRateByType(ccy11,ccy22,'BS')) );
//		}else if( id=="TRANS_AMT"){
//			setFieldValue( $('#ACC_CR_AMT').get(0),accMul(amt1,getExRateByType(ccy11,ccy22,'BS')) );
//		}else if(id=="TRANS_CCY" || id=="EXCHANGE_RATE"){
			var jshAmtType = document.getElementById("JSHAMTTYPE").value; 
			if(settle=="CASH"){//zxm结汇增加现钞方式
				if(jshAmtType=="TRANS_AMT"){
				    setFieldValue( $('#ACC_CR_AMT').get(0),accMul(amt1,getExRateByType(ccy11,ccy22,'CSHBS')) );
			    }else if(jshAmtType=="CNY_AMT"){
				   setFieldValue( $('#ACC_DR_AMT').get(0),div(amt2,getExRateByType(ccy11,ccy22,'CSHBS')) );;
			    }
			}else{
				if(jshAmtType=="TRANS_AMT"){
				    setFieldValue( $('#ACC_CR_AMT').get(0),accMul(amt1,getExRateByType(ccy11,ccy22,'BS')) );
			    }else if(jshAmtType=="CNY_AMT"){
				   setFieldValue( $('#ACC_DR_AMT').get(0),div(amt2,getExRateByType(ccy11,ccy22,'BS')) );;
			    }
			}
			
//		}
	}else if( jshType == 'SH' ){
//		if(id=="TRANS_AMT" ){
//			setFieldValue( $('#ACC_DR_AMT').get(0),accMul(amt2,getExRateByType(ccy22,ccy11,'SB')) );
//		}else if( id=="CNY_AMT"){
//			setFieldValue( $('#ACC_CR_AMT').get(0),div(amt1,getExRateByType(ccy22,ccy11,'SB')) );
//		}else if(id=="TRANS_CCY" || id=="EXCHANGE_RATE2"){
			var jshAmtType = document.getElementById("JSHAMTTYPE").value; 
			if(jshAmtType=="TRANS_AMT"){
				setFieldValue( $('#ACC_DR_AMT').get(0),accMul(amt2,getExRateByType(ccy22,ccy11,'SB')) );
			}else if(jshAmtType=="CNY_AMT"){
				setFieldValue( $('#ACC_CR_AMT').get(0),div(amt1,getExRateByType(ccy22,ccy11,'SB')) );
			}
//		}
	}else if( jshType == 'DR_TH' ){
		setFieldValue( $('#ACC_CR_AMT').get(0),accMul(amt1,getExRateByType(ccy11,ccy22,'BS')) );
	}else if( jshType == 'CR_TH' ){
		setFieldValue( $('#ACC_DR_AMT').get(0),accMul(amt2,getExRateByType(ccy22,ccy11,'SB')) );
	}
	
	amt1 = getFieldValue( $('#ACC_DR_AMT').get(0) );
	amt2 = getFieldValue( $('#ACC_CR_AMT').get(0) );
	
	$('#CUST_ACC_DCFLAG1').val('Dr');
	$('#CUST_ACC_DCFLAG2').val('Cr');
	
	var custid = $('#ACC_DRCUSTID').val();
	$('#CUST_ACC_CUSTID1').val(custid);
	$('#CUST_ACC_CUSTID2').val(custid);
	
	$('#CUST_ACCNO1').val( $('#ACC_DR_ACCNO').val() );
	$('#CUST_ACCNO2').val( $('#ACC_CR_ACCNO').val() );
	
	$('#SEQ_NO1').val( $('#DEBIT_AcctSeqNo').val() );
	$('#SEQ_NO2').val( $('#CREDIT_AcctSeqNo').val() );
	
	$('#PROD_TYPE1').val( $('#DEBIT_ProdType').val() );
	$('#PROD_TYPE2').val( $('#CREDIT_ProdType').val() );
	
	$('#SUBMARKS1').val( $('#ACC_JJ_SUBJECTNUM').val() );
	$('#SUBMARKS2').val( $('#ACC_DJ_SUBJECTNUM').val() );
	
	var ccy1 = $('#ACC_DR_CCY').val();
	var ccy2 = $('#ACC_CR_CCY').val();
	$('#CUST_ACC_CCY1').val( ccy1 );
	$('#CUST_ACC_CCY2').val( ccy2 );
	
	setFieldValue( $('#CUST_ACC_AMT1').get(0),amt1);
	setFieldValue( $('#CUST_ACC_AMT2').get(0),amt2);
	
	var cny1 = amt1 * 1 * getExRateByType(ccy1,'CNY','BS');
	var cny2 = cny1;
	setFieldValue( $('#CUST_ACC_CNY1').get(0),cny1);
	setFieldValue( $('#CUST_ACC_CNY2').get(0),cny2);

	var ppcny1 = amt1 * 1 * getExRateByType(ccy1,'CNY','PPBS');
	var ppcny2 = ppcny1;
	setFieldValue( $('#CUST_ACC_PP_CNY1').get(0),ppcny1);
	setFieldValue( $('#CUST_ACC_PP_CNY2').get(0),ppcny2);
}

function formatCustAccJSHToXml(){
	var isFlag = $("#IS_SHOW_CUSTACC_PAGE").val();
	if( isFlag == "N" ) return;
	var xml = "<?xml version='1.0' encoding='GBK'?><CUSTACC_VOU><ACCOUNTS>";
	var account = "";
	var jshDM = $('#CUST_ACC_JSHDM').val();
	var jshDX = $('#CUST_ACC_JSHDX').val();
	if( jshDM == null ) jshDM = "";
	if( jshDX == null ) jshDX = ""; 
	for( var i = 1;i< 3;i++ ){
		account = "<ACCOUNT>";
		account = account + "<ACC_DCFLAG>"+$('#CUST_ACC_DCFLAG'+i).val()+"</ACC_DCFLAG>";
		account = account + "<ACC_CUSTID>"+$('#CUST_ACC_CUSTID'+i).val()+"</ACC_CUSTID>";
		account = account + "<ACC_NO>"+$('#CUST_ACCNO'+i).val()+"</ACC_NO>";
		account = account + "<SUBMARKS>"+$('#SUBMARKS'+i).val()+"</SUBMARKS>";
		account = account + "<ACC_CCY>"+$('#CUST_ACC_CCY'+i).val()+"</ACC_CCY>";
		account = account + "<ACC_AMT>"+getFieldValue( $('#CUST_ACC_AMT'+i).get(0) )+"</ACC_AMT>";
		account = account + "<ACC_BUYRATE>"+$('#CUST_ACC_BUYRATE'+i).val()+"</ACC_BUYRATE>";
		account = account + "<ACC_SELRATE>"+$('#CUST_ACC_SELRATE'+i).val()+"</ACC_SELRATE>";
		account = account + "<ACC_PP_BUYRATE>"+$('#CUST_ACC_PP_BUYRATE'+i).val()+"</ACC_PP_BUYRATE>";
		account = account + "<ACC_PP_SELRATE>"+$('#CUST_ACC_PP_SELRATE'+i).val()+"</ACC_PP_SELRATE>";
		account = account + "<ACC_CNY>"+getFieldValue( $('#CUST_ACC_CNY'+i).get(0) )+"</ACC_CNY>";
		account = account + "<ACC_PP_CNY>"+getFieldValue( $('#CUST_ACC_PP_CNY'+i).get(0) )+"</ACC_PP_CNY>";
		account = account + '<ACC_JSHDM>'+jshDM+'</ACC_JSHDM>';
		account = account + '<ACC_JSHDX>'+jshDX+'</ACC_JSHDX>';
		account = account + '<ACC_USD_BUYRATE>'+getCCYRateByType('USD','B')+'</ACC_USD_BUYRATE>';
		account = account + '<ACC_USD_SELRATE>'+getCCYRateByType('USD','S')+'</ACC_USD_SELRATE>';
		account = account + '<ACC_MIDRATE>'+getCCYRateByType($('#CUST_ACC_CCY'+i).val(),'M')+'</ACC_MIDRATE>';
		account = account + '<ACC_ATTR>'+$('#ACCOUNT_ATTR'+i).val()+'</ACC_ATTR>';//区分N内部中间账号或者K客户账号
		account = account + "<SEQ_NO>"+$('#SEQ_NO'+i).val()+"</SEQ_NO>";
		account = account + "<PROD_TYPE>"+$('#PROD_TYPE'+i).val()+"</PROD_TYPE>";
		account = account + '<ACC_VOUTYPE>CUSTGRID</ACC_VOUTYPE>';//区分是什么帐
		account = account + "</ACCOUNT>";
		xml = xml + account;
	}
	xml = xml + '</ACCOUNTS></CUSTACC_VOU>';
	
	$('#CUST_ACC_JSH_GRID').val(xml);
}

// modify by liaorizhi 20120806 start
function changeTransExratesCustPP(rowDataArr){
	if( !__ExRateData || !rowDataArr || rowDataArr.length == 0 ) return;
	
	var obj;
	var ccy1 = $('#CUST_ACC_CCY1').val();
	var ccy2 = $('#CUST_ACC_CCY2').val();

	for(var key in rowDataArr){
		obj = rowDataArr[key];
		var askType = obj.TRANS_TYPE;
		var selCcy = obj.SEL_CCY;
		var buyCcy = obj.BUY_CCY;
		
		if (buyCcy == ccy1 && "JH" == askType) {
			$('#CUST_ACC_BUYRATE1').val(obj.BUYRATE);
			$('#CUST_ACC_PP_SELRATE1').val(obj.PPSELRATE);
		} else if (selCcy == ccy2 && "SH" == askType) {
			$('#CUST_ACC_SELRATE2').val(obj.SELRATE);
			$('#CUST_ACC_PP_BUYRATE2').val(obj.PPBUYRATE);
		} else if("TH" == askType){
			if (buyCcy == ccy1){
				$('#CUST_ACC_BUYRATE1').val(obj.BUYRATE);
				$('#CUST_ACC_PP_SELRATE1').val(obj.PPSELRATE);
			}
			if (obj.SEL_CCY == ccy2) {
				$('#CUST_ACC_SELRATE2').val(obj.SELRATE);
				$('#CUST_ACC_PP_BUYRATE2').val(obj.PPBUYRATE);
			}
		}
		$('#ASKPRICE_NO').val(obj.ASKPRICE_NO);
	}
	
	setCustAccJSH();
	if( typeof(setBasePageInfo) == 'function' ){
		setBasePageInfo();
	}
}

// add by liaorizhi 20120912 对选择的询价编号校验
function chooseAskNoCheck(rowDataArr){
	var allRows = jQuery("#CRCUSTACC_GRID").jqGrid('getDataIDs');
	var obj = rowDataArr[0]; // 一次只能选择一个询价编号
	var askType =  obj.TRANS_TYPE;
	var ccy1 = $('#CUST_ACC_CCY1').val();
	var ccy2 = $('#CUST_ACC_CCY2').val();
	var bool = false;	

	if(ccy1 == "CNY" && askType == "SH"){
		return bool = true;
	}else if(ccy2 == "CNY" && askType == "JH"){
		return bool = true;
	}else if(ccy1 != ccy2 && askType == "TH"){
			return bool = true;
	}
	
	if(!bool){
		alert("错误提示：该笔询价编号适用["+askType+"]，请检查！");
		$('#ASKPRICE_NO').val('');
	}

	return bool;
}

function lookupOnChangeSYS(lookupName,rowDataArr) {
	if (lookupName == "ASKPRICELK_JSH" && rowDataArr.length > 0) {
		if(!chooseAskNoCheck(rowDataArr)) return;
		updateSysExrateByASK(rowDataArr);
		changeTransExratesCustPP(rowDataArr);
	}
}
//---end--------------------------------------------------------------
