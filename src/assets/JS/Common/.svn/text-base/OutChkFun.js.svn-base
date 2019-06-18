/**
 * 待核查处理
 */

//Function For check out  By WL 20100628---init-----------

var __currOutRowId = -1;
var __changeOutChkAmt = 0;
var __changeOutChkPreAmt = 0;

var __changeOutCrAmt = 0;
var __changeOutCrPreAmt = 0;
var __changeOutCrPreAmt2 = 0;

var OUT_IS_CREATE_BAR_FLAG = false;

function initOutCheck(){
	var custId = $('#CHK_CUSTID').val();
	var ccy = $('#CHK_OUT_CCY').val();
	
	setExRateCustid(custId);
	initOutChkData(custId,ccy);
}

function initOutChkData(custId,ccy){
	var args = {};
	setFunctionArgs(args , "OUT_CUSTID" , custId);
	setFunctionArgs(args , "CCY" , ccy);
	setFunctionArgs(args , "OWN_KEY" , $('#CHK_OWNER_KEY').val() );
	var jsonData = callFunction("F_GET_OUTCHECK", args, "JSON_HM");
	initChkOutGrid(jsonData);
	
}

function initChkOutGrid(jsonData){
	$('#OUT_CHK_GRID').GridUnload();
	createOutChkGrid('jsonstring','',true,true,true);
	//createOutPageButton(true);
	
	if( jsonData.rows == null || jsonData.rows == "" ){
		$('#OUT_CHK_DETAIL_GRID').GridUnload();
		createCrOutGrid('jsonstring','',true,true);
		setFieldValue($('#CHK_OUT_AMT').get(0),0);
		return ;
	}
	
	var dataLength = jsonData.rows.length;
	var rowData;
	var ccy,amt = 0;
	for( var i=0;i<dataLength;i++ ){
		rowData = jsonData.rows[i];
		ccy = rowData.CHK_CCY;
		rowData.CHK_AMT = FormatAmtByCCY(1 * rowData.CHK_AMT,ccy);
		rowData.CHK_BALANCE = FormatAmtByCCY(1 * rowData.CHK_BALANCE,ccy);
		rowData.CHK_OUT_AMT = rowData.CHK_BALANCE;
		jQuery("#OUT_CHK_GRID").jqGrid('addRowData',(i+1),rowData,'last');
		$('#CHK_OUT_ACCNO').val(rowData.CHK_ACCNO);
		
		amt += rowData.OUT_AMT;
	}
	$('#OUT_CHK_DETAIL_GRID').GridUnload();
	createCrOutGrid('jsonstring','',true,true);
	var allRows = jQuery("#OUT_CHK_GRID").jqGrid('getDataIDs');
	$.each( allRows, function(i, n){
		rowData = jQuery('#OUT_CHK_GRID').jqGrid('getRowData',n);
		if( $('#CHK_OWNER_KEY').val() == rowData.OWNER_KEY ){
			jQuery("#OUT_CHK_GRID").jqGrid('setSelection',n,true);
		}
	});
}

function calOutChkAmt(rowData,oper){
	var amt = getFieldValue( $('#CHK_OUT_AMT').get(0) );
	var hisAmt = getFieldValue( $('#CHK_OUT_HIS_AMT').get(0) );
	if( amt == null || amt == '' ) amt = 0;
	if( hisAmt == null || hisAmt == '' ) hisAmt = 0;
	var outAmt = 0,hisOutAmt = 0;
	
	if( oper == "+" ){
		outAmt = FormatStr2Amt(rowData.CHK_OUT_AMT); 
		hisOutAmt = rowData.OUT_AMT; 
		amt = amt + outAmt * 1;
		hisAmt = hisAmt + hisOutAmt * 1;
		calOutAmt(rowData.CHK_CCY,amt);
		calHisOutAmt(rowData.CHK_CCY,hisAmt);
		setOutChkStatus(currRowIdCHK,rowData);
		createOutRecord(rowData.CHK_CCY,amt);
	}else if( oper == "-" ){
		outAmt = FormatStr2Amt(rowData.CHK_OUT_AMT);
		hisOutAmt = rowData.OUT_AMT; 
		amt = amt - outAmt * 1;
		hisAmt = hisAmt - hisOutAmt * 1;
		calOutAmt(rowData.CHK_CCY,amt);
		calHisOutAmt(rowData.CHK_CCY,hisAmt);
		createOutRecord(rowData.CHK_CCY,amt);
	}else if( oper == "++" ){
		amt = 0;
		outAmt = 0;
		hisOutAmt = 0;
		hisAmt = 0;
		var rowData1;
		var allRows =  jQuery("#OUT_CHK_GRID").jqGrid('getDataIDs');

		$.each( allRows, function(i, n){
			jQuery('#OUT_CHK_GRID').jqGrid('saveRow',n,null,'clientArray');
			rowData1 = jQuery('#OUT_CHK_GRID').jqGrid('getRowData',n);
			outAmt = FormatStr2Amt(rowData1.CHK_OUT_AMT);
			hisOutAmt = rowData1.OUT_AMT; 
			amt = amt + outAmt * 1;
			hisAmt = hisAmt + hisOutAmt * 1;
			setOutChkStatus(n,rowData1);
		});
		
		calOutAmt(rowData1.CHK_CCY,amt);
		calHisOutAmt(rowData1.CHK_CCY,hisAmt);
		createOutRecord(rowData1.CHK_CCY,amt);
	}else if( oper == "--" ){
		setFieldValue($('#CHK_OUT_AMT').get(0),0);
		setFieldValue($('#CHK_OUT_HIS_AMT').get(0),0);
		createOutRecord('',0);
	}
}

function storeOutChkData(obj){
	var currId = obj.id;
	__currOutRowId = currId.substring(0,currId.indexOf('_') );
	var rowData = jQuery('#OUT_CHK_GRID').jqGrid('getRowData',__currOutRowId);
	__changeOutChkAmt = FormatStr2Amt(rowData.CHK_BALANCE);
	__changeOutChkPreAmt = FormatStr2Amt(obj.value);
}

function changeOutChkAmt(obj){
	var amt = FormatStr2Amt(obj.value);
	
	if( __changeOutChkAmt * 1 < amt * 1 ) {
		alert("金额["+amt+"] 超过 ["+__changeOutChkAmt+"]!! 请检查! ");
		jQuery('#OUT_CHK_GRID').jqGrid('restoreRow',__currOutRowId);
		jQuery('#OUT_CHK_GRID').jqGrid('editRow',__currOutRowId);
		return;
	}
	if( isNaN(amt) ){
		alert("请输入数字!!");
		jQuery('#OUT_CHK_GRID').jqGrid('restoreRow',__currOutRowId);
		jQuery('#OUT_CHK_GRID').jqGrid('editRow',__currOutRowId);
		return;
	}
	if( amt * 1 < 0 ){
		alert("请输入正数!!");
		jQuery('#OUT_CHK_GRID').jqGrid('restoreRow',__currOutRowId);
		jQuery('#OUT_CHK_GRID').jqGrid('editRow',__currOutRowId);
		return;
	}
	var amt1 = getFieldValue($('#CHK_OUT_AMT').get(0));
	var finalAmt = amt1 - __changeOutChkPreAmt + amt * 1;

	calOutAmt('',finalAmt);
	
	var rowData = jQuery('#OUT_CHK_GRID').jqGrid('getRowData',__currOutRowId);
	$('#OUT_CHK_GRID').jqGrid('setRowData',__currOutRowId,{CHK_OUT_AMT:FormatAmtByCCY(amt,rowData.CHK_CCY)});
	jQuery('#OUT_CHK_GRID').jqGrid('saveRow',__currOutRowId,null,'clientArray');
	rowData = jQuery('#OUT_CHK_GRID').jqGrid('getRowData',__currOutRowId);
	
	setOutChkStatus(__currOutRowId,rowData);
	
	jQuery('#OUT_CHK_GRID').jqGrid('editRow',__currOutRowId);
	createOutRecord(rowData.CHK_CCY,finalAmt);
}

function initReleaseOutChk(){
	var xmlStr = "",selectFlag = 'N';
	xmlStr = $('#CHK_OUT_GRID').val();
	if( xmlStr != null && xmlStr != "" ){
		$('#OUT_CHK_GRID').GridUnload();
		createOutChkGrid('xmlstring',xmlStr,false,false,false);
		//createOutPageButton(false);
		var xmlData = jQuery.jgrid.stringToDoc(xmlStr);
		$(xmlData).find("rows > row").each(function(i){ 
	        selectFlag = $(this).find('cell').eq(10).text();
	        if( selectFlag == 'Y' ){
	        	jQuery("#OUT_CHK_GRID").jqGrid('setSelection',(i+1),false);
	        }
	    }); 
	}
	initReleaseCrOut();
}

function initReleaseCrOut(){
	var xmlStr = "";
	xmlStr = $('#CHK_OUT_CR_GRID').val();
	if( xmlStr != null && xmlStr != "" ){
		$('#OUT_CHK_DETAIL_GRID').GridUnload();
		OUT_IS_CREATE_BAR_FLAG = false;
		createCrOutGrid('xmlstring',xmlStr,false,false);
		createOutPageButton(false);
	}
}

function initFixPengingOutChk(){
	setExRateCustid( $('#CHK_CUSTID').val() );
	var xmlStr = "",selectFlag = 'N';
	xmlStr = $('#CHK_OUT_GRID').val();
	if( xmlStr != null && xmlStr != "" ){
		$('#OUT_CHK_GRID').GridUnload();
		createOutChkGrid('xmlstring',xmlStr,true,true,true);
		//createOutPageButton(true);
		var xmlData = jQuery.jgrid.stringToDoc(xmlStr);
		$(xmlData).find("rows > row").each(function(i){ 
	        selectFlag = $(this).find('cell').eq(10).text();
	        if( selectFlag == 'Y' ){
	        	jQuery("#OUT_CHK_GRID").jqGrid('setSelection',(i+1),false);
	        }
	    }); 
	}
	initFixPengingCrOut();
}

function initFixPengingCrOut(){
	var xmlStr = "";
	xmlStr = $('#CHK_OUT_CR_GRID').val();
	if( xmlStr != null && xmlStr != "" ){
		$('#OUT_CHK_DETAIL_GRID').GridUnload();
		OUT_IS_CREATE_BAR_FLAG = false;
		createCrOutGrid('xmlstring',xmlStr,true,true);
		createOutPageButton(true);
	}
}

function formatOutChkToXml(){
	formatOutCrXml();
	var rowData ;
	
	var outMulAccCust = $('#CHK_CUSTID').val();	
	var outMulAccNo = $('#CURR_ACCOUNT_AMT_NO').val();
	var outMulAccCcy = $('#CURR_ACCOUNT_AMT_CCY').val();
	var jshDM = $('#OUT_CR_CUST_ACC_JSHDM').val();
	var jshDX = $('#OUT_CR_CUST_ACC_JSHDX').val();
	if( jshDM == null ) jshDM = "";
	if( jshDX == null ) jshDX = ""; 
	
	var allRows = jQuery("#OUT_CHK_GRID").jqGrid('getDataIDs');
	$.each( allRows, function(i, n){	
		jQuery('#OUT_CHK_GRID').jqGrid('saveRow',n,null,'clientArray');
	});
	var selectedRows =  jQuery("#OUT_CHK_GRID").jqGrid('getGridParam','selarrrow');

	var totalCount = 0;
	if( allRows != null && allRows.length > 0 ){		
		var formatXml = '',voucherXml = "";
		formatXml = "<?xml version='1.0' encoding='GBK'?><outchk><rows>";
		voucherXml = "<?xml version='1.0' encoding='GBK'?><CUSTACC_VOU><ACCOUNTS>";
		$.each( allRows, function(i, n){
			rowData = jQuery('#OUT_CHK_GRID').jqGrid('getRowData',n);
			
			var rowXml = '',rowVouXml = "";
			var isSelect = "N";
			rowXml = '<row>';
			rowXml = rowXml + '<cell hidFlag = "N">'+rowData.OWNER_KEY+'</cell>';	//0
			rowXml = rowXml + '<cell hidFlag = "N">'+rowData.CHK_DATE+'</cell>';	//1
			rowXml = rowXml + '<cell hidFlag = "N">'+rowData.CHK_CCY+'</cell>';		//2
			rowXml = rowXml + '<cell hidFlag = "N">'+FormatStr2Amt(rowData.CHK_AMT)+'</cell>';	//3
			rowXml = rowXml + '<cell hidFlag = "N">'+FormatStr2Amt(rowData.CHK_BALANCE)+'</cell>';//4
			rowXml = rowXml + '<cell hidFlag = "N">'+FormatStr2Amt(rowData.OUT_AMT)+'</cell>';		//5
			rowXml = rowXml + '<cell hidFlag = "N">'+FormatStr2Amt(rowData.CHK_OUT_AMT)+'</cell>';//6		
			rowXml = rowXml + '<cell hidFlag = "N">'+rowData.CHK_BALANCE_AMT+'</cell>';		//7
			rowXml = rowXml + '<cell hidFlag = "Y">'+rowData.CHK_STATUS+'</cell>';		//8
			rowXml = rowXml + '<cell hidFlag = "Y">'+rowData.SYSID+'</cell>';		//9
			
			var mulOutCheckAmt ="";
			if ( jQuery.inArray(n,selectedRows)  != -1){
				isSelect = "Y";
				totalCount += 1;
				mulOutCheckAmt = FormatStr2Amt(rowData.CHK_OUT_AMT);
				if( mulOutCheckAmt > 0 ){
					rowVouXml = '<ACCOUNT>';
					rowVouXml = rowVouXml + '<ACC_DCFLAG>Cr</ACC_DCFLAG>';
					rowVouXml = rowVouXml + '<ACC_CUSTID>'+outMulAccCust+'</ACC_CUSTID>';
					rowVouXml = rowVouXml + '<ACC_NO>'+outMulAccNo+'</ACC_NO>';
					rowVouXml = rowVouXml + '<ACC_CCY>'+outMulAccCcy+'</ACC_CCY>';
					rowVouXml = rowVouXml + '<ACC_AMT>'+( mulOutCheckAmt * getExRateByType(rowData.CHK_CCY,outMulAccCcy,__FEE_CURR_RATE_TYPE_BS) )+'</ACC_AMT>';
					rowVouXml = rowVouXml + '<ACC_BUYRATE>'+getCCYRateByType(rowData.CHK_CCY,'B')+'</ACC_BUYRATE>';
					rowVouXml = rowVouXml + '<ACC_SELRATE>'+getCCYRateByType(outMulAccCcy,'S')+'</ACC_SELRATE>';
					rowVouXml = rowVouXml + '<ACC_PP_BUYRATE>'+getCCYRateByType(rowData.CHK_CCY,'PB')+'</ACC_PP_BUYRATE>';
					rowVouXml = rowVouXml + '<ACC_PP_SELRATE>'+getCCYRateByType(outMulAccCcy,'PS')+'</ACC_PP_SELRATE>';
					rowVouXml = rowVouXml + '<ACC_CNY>'+( mulOutCheckAmt * getExRateByType(rowData.CHK_CCY,"CNY",__FEE_CURR_RATE_TYPE_BS) )+'</ACC_CNY>';
					rowVouXml = rowVouXml + '<ACC_PP_CNY>'+( mulOutCheckAmt * getExRateByType(rowData.CHK_CCY,"CNY",__FEE_CURR_RATE_TYPE_PPBS) )+'</ACC_PP_CNY>';
					rowVouXml = rowVouXml + '<ACC_SOR_AMT>'+mulOutCheckAmt+'</ACC_SOR_AMT>';
					rowVouXml = rowVouXml + '<ACC_SOR_CCY>'+rowData.CHK_CCY+'</ACC_SOR_CCY>';
					rowVouXml = rowVouXml + '<ACC_JSHDM>'+jshDM+'</ACC_JSHDM>';
					rowVouXml = rowVouXml + '<ACC_JSHDX>'+jshDX+'</ACC_JSHDX>';
					rowVouXml = rowVouXml + '<ACC_USD_BUYRATE>'+getCCYRateByType('USD','B')+'</ACC_USD_BUYRATE>';
					rowVouXml = rowVouXml + '<ACC_USD_SELRATE>'+getCCYRateByType('USD','S')+'</ACC_USD_SELRATE>';
					rowVouXml = rowVouXml + '<ACC_MIDRATE>'+getCCYRateByType(rowData.CHK_CCY,'M')+'</ACC_MIDRATE>';
					//rowXml = rowXml + '<ACC_VOUTYPE>OUTGRID</ACC_VOUTYPE>';//区分是什么帐 modify by wyj at 20130808 移到下面
					rowVouXml = rowVouXml + '</ACCOUNT>';
				}
			}
			
			rowXml = rowXml + '<cell hidFlag = "Y">'+isSelect+'</cell>';	//10
			rowXml = rowXml + '<cell hidFlag = "Y">'+rowData.OWNER_REF+'</cell>';//11	
			
			//add by wyj at 20130808 start
			if ( jQuery.inArray(n,selectedRows)  != -1){
				isSelect = "Y";
				if( mulOutCheckAmt > 0 ){
					rowXml = rowXml + '<ACC_VOUTYPE>OUTGRID</ACC_VOUTYPE>';//区分是什么帐
				}
			}
			//add by wyj at 20130808 end 
			
			rowXml = rowXml + '</row>';
			formatXml = formatXml + rowXml;
			voucherXml = voucherXml + rowVouXml;
		});
		formatXml = formatXml + '</rows></outchk>';
		voucherXml = voucherXml + '</ACCOUNTS></CUSTACC_VOU>';

		$('#CURR_ACCOUNT_AMT_NUM_C').val(totalCount);
		$('#CHK_OUT_GRID').get(0).value = formatXml;
		$('#CHK_OUT_GRID_MULSEL').val( voucherXml );
		//alert(voucherXml);
		formatOutChkJSHToXml();
	}
	
	var ccy = $('#CHK_OUT_CCY').val();
	var amt = getFieldValue( $('#CHK_OUT_AMT').get(0) );
	
	$('#CHK_OUT_CNY').val( amt * (getExRateByType(ccy,__SYS_LOCALCCY,'BS')) );
	$('#CHK_OUT_PPCNY').val( amt * (getExRateByType(ccy,__SYS_LOCALCCY,'PPBS')) );
}

function formatOutCrXml(){
	if( $('#OUT_CHK_DETAIL_GRID').get(0) != null ){
		$('#CURR_ACCOUNT_AMT_NUM').val("");
		var rowData ;
		var allRows = jQuery("#OUT_CHK_DETAIL_GRID").jqGrid('getDataIDs');
		$.each( allRows, function(i, n){	
			jQuery('#OUT_CHK_DETAIL_GRID').jqGrid('saveRow',n,null,'clientArray');
		});

		if( allRows != null && allRows.length > 0 ){		
			var formatXml = '';
			formatXml = "<?xml version='1.0' encoding='GBK'?><outcr><rows>";
			$.each( allRows, function(i, n){
				rowData = jQuery('#OUT_CHK_DETAIL_GRID').jqGrid('getRowData',n);
				
				var rowXml = '';
				rowXml = '<row>';
				var sorAmt = FormatStr2Amt(rowData.OUT_CR_SOURCE_AMT);
				var custCcy = rowData.OUT_CR_ACCOUNT_CCY;
				var custccccNo = rowData.OUT_CR_ACCOUNT_NO;
				
				rowXml = rowXml + '<cell hidFlag = "N">'+custCcy+'</cell>';
				rowXml = rowXml + '<cell hidFlag = "N">'+rowData.OUT_CR_BUY_RATE+'</cell>';
				rowXml = rowXml + '<cell hidFlag = "N">'+rowData.OUT_CR_SELL_RATE+'</cell>';
				rowXml = rowXml + '<cell hidFlag = "N">'+rowData.OUT_CR_SOURCE_CCY+'</cell>';
				rowXml = rowXml + '<cell hidFlag = "N">'+sorAmt+'</cell>';
				rowXml = rowXml + '<cell hidFlag = "N">'+FormatStr2Amt(rowData.OUT_CR_ACCOUNT_AMT)+'</cell>';
				rowXml = rowXml + '<cell hidFlag = "N">'+custccccNo+'</cell>';
				rowXml = rowXml + '<cell hidFlag = "N">'+rowData.SUBMARKS+'</cell>';
				rowXml = rowXml + '<cell hidFlag = "Y">'+rowData.OUT_CR_PP_BUY_RATE+'</cell>';
				rowXml = rowXml + '<cell hidFlag = "Y">'+rowData.OUT_CR_PP_SEL_RATE+'</cell>';
				rowXml = rowXml + '<cell hidFlag = "Y">'+rowData.OUT_ACC_CNY+'</cell>';
				rowXml = rowXml + '<cell hidFlag = "Y">'+rowData.OUT_ACC_PP_CNY+'</cell>';
				
				rowXml = rowXml + '</row>';
				formatXml = formatXml + rowXml;
				
				if( currSelectRows.length > 1 && sorAmt > 0 ){
					$('#CURR_ACCOUNT_AMT_NO').val(custccccNo);
					$('#CURR_ACCOUNT_AMT_CCY').val(custCcy);
					$('#CURR_ACCOUNT_CCY').val(custCcy);
					var num = $('#CURR_ACCOUNT_AMT_NUM').val();
					num = num + 'a';
					$('#CURR_ACCOUNT_AMT_NUM').val(num);
				}
			});
			formatXml = formatXml + '</rows></outcr>';
			
			var ccy = $('#CHK_OUT_CCY').val();
			var coccy = $('#CURR_ACCOUNT_CCY').val();
			if( coccy == null || coccy == "" ) coccy = ccy;
			var bRate = getCCYRateByType(ccy,'B');
			var sRate = getCCYRateByType(coccy,'S');
			var ppbRate = getCCYRateByType(ccy,'PB');
			var ppsRate = getCCYRateByType(coccy,'PS');
			$('#CHK_OUT_RATE').val(bRate+','+sRate+','+ppbRate+','+ppsRate);
	
			$('#CHK_OUT_CR_GRID').get(0).value = formatXml;
		}
	}
}

function checkOutFlag(){
	var num = $('#CURR_ACCOUNT_AMT_NUM').val();
	if( num.length > 1 ){
		alert(getOutChkDesc());
		return false;
	}
	return true;
}

function formatOutChkJSHToXml(){
	var rowData ;
	var allRows = jQuery("#OUT_CHK_DETAIL_GRID").jqGrid('getDataIDs');
	$.each( allRows, function(i, n){	
		jQuery('#OUT_CHK_DETAIL_GRID').jqGrid('saveRow',n,null,'clientArray');
	});
	
	var buyRate,selRate,ppBuyRate,ppSelRate;
	var formatXml = '';
	formatXml = "<?xml version='1.0' encoding='GBK'?><CUSTACC_VOU><ACCOUNTS>";
	var jshDM = $('#OUT_CR_CUST_ACC_JSHDM').val();
	var jshDX = $('#OUT_CR_CUST_ACC_JSHDX').val();
	if( jshDM == null ) jshDM = "";
	if( jshDX == null ) jshDX = ""; 
	if( allRows != null && allRows.length > 0 ){	
		var custid = $('#CHK_CUSTID').val();	
		$.each( allRows, function(i, n){
			rowData = jQuery('#OUT_CHK_DETAIL_GRID').jqGrid('getRowData',n);
			var rowXml = '';
			
			var accAmt = FormatStr2Amt(rowData.OUT_CR_ACCOUNT_AMT);
			var sorAmt = FormatStr2Amt(rowData.OUT_CR_SOURCE_AMT);
			if( accAmt != 0 && sorAmt != 0 ){
				rowXml = '<ACCOUNT>';
				rowXml = rowXml + '<ACC_DCFLAG>Cr</ACC_DCFLAG>';
				rowXml = rowXml + '<ACC_CUSTID>'+custid+'</ACC_CUSTID>';
				rowXml = rowXml + '<ACC_NO>'+rowData.OUT_CR_ACCOUNT_NO+'</ACC_NO>';
				rowXml = rowXml + '<SUBMARKS>'+rowData.SUBMARKS+'</SUBMARKS>';
				rowXml = rowXml + '<ACC_CCY>'+rowData.OUT_CR_ACCOUNT_CCY+'</ACC_CCY>';
				rowXml = rowXml + '<ACC_AMT>'+accAmt+'</ACC_AMT>';
				rowXml = rowXml + '<ACC_BUYRATE>'+rowData.OUT_CR_BUY_RATE+'</ACC_BUYRATE>';
				rowXml = rowXml + '<ACC_SELRATE>'+rowData.OUT_CR_SELL_RATE+'</ACC_SELRATE>';
				rowXml = rowXml + '<ACC_PP_BUYRATE>'+getCCYRateByType(rowData.OUT_CR_ACCOUNT_CCY,'PB')+'</ACC_PP_BUYRATE>';
				rowXml = rowXml + '<ACC_PP_SELRATE>'+getCCYRateByType(rowData.OUT_CR_SOURCE_CCY,'PS')+'</ACC_PP_SELRATE>';
				rowXml = rowXml + '<ACC_CNY>'+rowData.OUT_ACC_CNY+'</ACC_CNY>';
				rowXml = rowXml + '<ACC_PP_CNY>'+rowData.OUT_ACC_PP_CNY+'</ACC_PP_CNY>';
				rowXml = rowXml + '<ACC_SOR_AMT>'+sorAmt+'</ACC_SOR_AMT>';
				rowXml = rowXml + '<ACC_SOR_CCY>'+rowData.OUT_CR_SOURCE_CCY+'</ACC_SOR_CCY>';
				rowXml = rowXml + '<ACC_JSHDM>'+jshDM+'</ACC_JSHDM>';
				rowXml = rowXml + '<ACC_JSHDX>'+jshDX+'</ACC_JSHDX>';
				rowXml = rowXml + '<ACC_USD_BUYRATE>'+getCCYRateByType('USD','B')+'</ACC_USD_BUYRATE>';
				rowXml = rowXml + '<ACC_USD_SELRATE>'+getCCYRateByType('USD','S')+'</ACC_USD_SELRATE>';
				rowXml = rowXml + '<ACC_MIDRATE>'+getCCYRateByType(rowData.OUT_CR_SOURCE_CCY,'M')+'</ACC_MIDRATE>';
				rowXml = rowXml + '<ACC_VOUTYPE>OUTJSHGRID</ACC_VOUTYPE>';//区分是什么帐
				rowXml = rowXml + '</ACCOUNT>';
			}
			formatXml = formatXml + rowXml;
		});
	}
	formatXml = formatXml + '</ACCOUNTS></CUSTACC_VOU>';
	
	$('#CHK_OUT_JSH_GRID').val(formatXml);
}

function calOutAmt(ccy,amt){
	var ccy1 = ccy;
	if( ccy1 == '' ){
		ccy1 = $('#CHK_OUT_CCY').val();
	}else{
		$('#CHK_OUT_CCY').val(ccy1);
	}
	setFieldValue($('#CHK_OUT_AMT').get(0),amt);
}

function calHisOutAmt(ccy,amt){
	var ccy1 = ccy;
	if( ccy1 == '' ){
		ccy1 = $('#CHK_OUT_HIS_CCY').val();
	}else{
		$('#CHK_OUT_HIS_CCY').val(ccy1);
	}
	setFieldValue($('#CHK_OUT_HIS_AMT').get(0),amt);
}

function setOutChkStatus(currRowIdCHK,rowData){
	var tolBal = FormatStr2Amt(rowData.CHK_BALANCE) - FormatStr2Amt(rowData.CHK_OUT_AMT);
	var chkStatus = rowData.CHK_STATUS;
	if( tolBal == 0 ){
		chkStatus = '2';
	}else if( tolBal > 0 && tolBal < FormatStr2Amt(rowData.CHK_BALANCE) ){
		chkStatus = '1';
	}else if( tolBal == FormatStr2Amt(rowData.CHK_AMT) ){
		chkStatus = '0';
	}
	$('#OUT_CHK_GRID').jqGrid('setRowData',currRowIdCHK,{CHK_BALANCE_AMT:tolBal,CHK_STATUS:chkStatus });
}

function createOutRecord(ccy,amt){
	delAllRows();
	if( amt > 0 ){
		var srcCcy = $('#CHK_OUT_CCY').val();
		var firstCrRow = {
								OUT_CR_ACCOUNT_CCY:ccy,
								OUT_CR_BUY_RATE:getCCYRateByType(ccy,'B'),
								OUT_CR_SELL_RATE:getCCYRateByType(ccy,'S'),
								OUT_CR_SOURCE_CCY:ccy,
								OUT_CR_SOURCE_AMT:FormatAmtByCCY(amt,ccy),
								OUT_CR_ACCOUNT_AMT:FormatAmtByCCY(amt,ccy),
								OUT_CR_ACCOUNT_NO:'',
								SUBMARKS:'',
								OUT_CR_PP_BUY_RATE:getCCYRateByType(ccy,'PB'),
								OUT_CR_PP_SEL_RATE:getCCYRateByType(ccy,'PS'),
								OUT_ACC_CNY:amt * getExRateByType(ccy,__SYS_LOCALCCY,'BS'),
								OUT_ACC_PP_CNY:amt * getExRateByType(ccy,__SYS_LOCALCCY,'PPBS')
							};
		 var secondCrRow = {
								OUT_CR_ACCOUNT_CCY:__SYS_LOCALCCY,
								OUT_CR_BUY_RATE:getCCYRateByType(srcCcy,'B'),
								OUT_CR_SELL_RATE:getCCYRateByType(__SYS_LOCALCCY,'S'),
								OUT_CR_SOURCE_CCY:srcCcy,
								OUT_CR_SOURCE_AMT:'0.00',
								OUT_CR_ACCOUNT_AMT:'0.00',
								OUT_CR_ACCOUNT_NO:'',
								SUBMARKS:'',
								OUT_CR_PP_BUY_RATE:getCCYRateByType(srcCcy,'PB'),
								OUT_CR_PP_SEL_RATE:getCCYRateByType(__SYS_LOCALCCY,'PS'),
								OUT_ACC_CNY:0,
								OUT_ACC_PP_CNY:0
							};
		var thirdDrRow = {
							OUT_CR_ACCOUNT_CCY:'USD',
							OUT_CR_BUY_RATE:getCCYRateByType(srcCcy,'B'),
							OUT_CR_SELL_RATE:getCCYRateByType('USD','S'),
							OUT_CR_SOURCE_CCY:srcCcy,
							OUT_CR_SOURCE_AMT:'0.00',
							OUT_CR_ACCOUNT_AMT:'0.00',
							OUT_CR_ACCOUNT_NO:'',
							SUBMARKS:'',
							OUT_CR_PP_BUY_RATE:getCCYRateByType(srcCcy,'PB'),
							OUT_CR_PP_SEL_RATE:getCCYRateByType('USD','PS'),
							OUT_ACC_CNY:amt * getExRateByType(srcCcy,__SYS_LOCALCCY,__FEE_CURR_RATE_TYPE_BS),
							OUT_ACC_PP_CNY:amt * getExRateByType(srcCcy,__SYS_LOCALCCY,__FEE_CURR_RATE_TYPE_PPBS)
						};
		jQuery("#OUT_CHK_DETAIL_GRID").jqGrid('addRowData',1,firstCrRow,'last');
		jQuery("#OUT_CHK_DETAIL_GRID").jqGrid('addRowData',2,secondCrRow,'last');
		jQuery("#OUT_CHK_DETAIL_GRID").jqGrid('addRowData',3,thirdDrRow,'last');
	}
}

function delAllRows(){
	var allRows = jQuery("#OUT_CHK_DETAIL_GRID").jqGrid('getDataIDs');
	$.each( allRows, function(i, n){
		jQuery('#OUT_CHK_DETAIL_GRID').jqGrid('delRowData',n);
	});
}

function changeOutCrCcy(aimCCY,rowId){
	var sorCcy = $('#CHK_OUT_CCY').val();
	jQuery('#OUT_CHK_DETAIL_GRID').jqGrid('saveRow',rowId,null,'clientArray');
	var rowData = jQuery('#OUT_CHK_DETAIL_GRID').jqGrid('getRowData',rowId);
	var sorAmt = FormatStr2Amt(rowData.OUT_CR_SOURCE_AMT);
	var accAmt = sorAmt * ( getExRateByType(sorCcy,aimCCY,'BS') );
	if( aimCCY == sorCcy ) accAmt = sorAmt;
	accAmt = FormatAmtByCCY(accAmt,aimCCY);
	$('#OUT_CHK_DETAIL_GRID').jqGrid('setRowData',rowId,{
		OUT_CR_BUY_RATE:getCCYRateByType(sorCcy,'B'),
		OUT_CR_SELL_RATE:getCCYRateByType(aimCCY,'S'),
		OUT_CR_PP_BUY_RATE:getCCYRateByType(aimCCY,'PB'),
		OUT_CR_PP_SEL_RATE:getCCYRateByType(aimCCY,'PS'),
		OUT_CR_ACCOUNT_AMT:accAmt});

	jQuery('#OUT_CHK_DETAIL_GRID').jqGrid('editRow',rowId);
}

function storeOutCrData(obj){
	var currId = obj.id;
	__currOutRowId = currId.substring(0,currId.indexOf('_') );
	var rowData = jQuery('#OUT_CHK_DETAIL_GRID').jqGrid('getRowData',1);
	__changeOutCrAmt = FormatStr2Amt(rowData.OUT_CR_SOURCE_AMT);
	__changeOutCrPreAmt = FormatStr2Amt(obj.value);
}

function storeOutCrData2(rowid,obj){
	var rowData = jQuery('#OUT_CHK_DETAIL_GRID').jqGrid('getRowData',1);
	__changeOutCrAmt = FormatStr2Amt(rowData.OUT_CR_SOURCE_AMT);
	__changeOutCrPreAmt = FormatStr2Amt($('#'+rowid+'_OUT_CR_SOURCE_AMT').val());
	__changeOutCrPreAmt2 = FormatStr2Amt(obj.value);
}

function changeOutCrAmt(srcAmt,rowId){
	srcAmt = FormatStr2Amt(srcAmt);

	if( (__changeOutCrAmt * 1 + __changeOutCrPreAmt * 1 ) < srcAmt * 1 ) {
		alert("金额["+srcAmt+"] 超过 ["+(__changeOutCrAmt * 1 + __changeOutCrPreAmt * 1 )+"]!! 请检查! ");
		jQuery('#OUT_CHK_DETAIL_GRID').jqGrid('restoreRow',rowId);
		return;
	}
	if( isNaN(srcAmt) ){
		alert("请输入数字!!");
		jQuery('#OUT_CHK_DETAIL_GRID').jqGrid('restoreRow',rowId);
		return;
	}
	if( srcAmt * 1 < 0 ){
		alert("请输入正数!!");
		jQuery('#OUT_CHK_DETAIL_GRID').jqGrid('restoreRow',rowId);
		return;
	}

	jQuery('#OUT_CHK_DETAIL_GRID').jqGrid('saveRow',rowId,null,'clientArray');
	var rowData = jQuery('#OUT_CHK_DETAIL_GRID').jqGrid('getRowData',rowId);
	var srcCcy = rowData.OUT_CR_SOURCE_CCY;
	var accCCY = rowData.OUT_CR_ACCOUNT_CCY;
	var accAmt = srcAmt * ( getExRateByType(srcCcy,accCCY,'BS') );

	var accCny = srcAmt * getExRateByType(srcCcy,__SYS_LOCALCCY,'BS');
	var accPpCny = srcAmt * getExRateByType(srcCcy,__SYS_LOCALCCY,'PPBS');
	
	if( accCCY == srcCcy ) accAmt = srcAmt;
	accAmt = FormatAmtByCCY(accAmt,accCCY);
	srcAmt = FormatAmtByCCY(srcAmt,srcCcy);
	
	$('#OUT_CHK_DETAIL_GRID').jqGrid('setRowData',rowId,{
		OUT_CR_SOURCE_AMT:srcAmt,
		OUT_CR_ACCOUNT_AMT:accAmt,
		OUT_ACC_CNY:accCny,
		OUT_ACC_PP_CNY:accPpCny});

	var ssAmt = getFieldValue( $('#CHK_OUT_AMT').get(0) );
	var allRows = jQuery("#OUT_CHK_DETAIL_GRID").jqGrid('getDataIDs');
	var ssRowData;
	$.each( allRows, function(i, n){	
		if( n != 1 ){
			ssRowData = jQuery('#OUT_CHK_DETAIL_GRID').jqGrid('getRowData',n);
			ssAmt = ssAmt - FormatStr2Amt(ssRowData.OUT_CR_SOURCE_AMT);
		}
	});
	var sssAmt = FormatAmtByCCY(ssAmt,srcCcy);
	$('#OUT_CHK_DETAIL_GRID').jqGrid('setRowData',1,{
							OUT_CR_SOURCE_AMT:sssAmt,
							OUT_CR_ACCOUNT_AMT:sssAmt,
							OUT_ACC_CNY:getExRateByType(srcCcy,__SYS_LOCALCCY,'BS') * ssAmt,
							OUT_ACC_PP_CNY:getExRateByType(srcCcy,__SYS_LOCALCCY,'PPBS') * ssAmt});
	//jQuery('#OUT_CHK_DETAIL_GRID').jqGrid('editRow',rowId);
}

function changeOutCrAmt2(accAmt,rowId){
	accAmt = FormatStr2Amt(accAmt);
	if( isNaN(accAmt) ){
		alert("请输入数字!!");
		jQuery('#OUT_CHK_DETAIL_GRID').jqGrid('restoreRow',rowId);
		return;
	}
	if( accAmt * 1 < 0 ){
		alert("请输入正数!!");
		jQuery('#OUT_CHK_DETAIL_GRID').jqGrid('restoreRow',rowId);
		return;
	}
	
	jQuery('#OUT_CHK_DETAIL_GRID').jqGrid('saveRow',rowId,null,'clientArray');
	var rowData = jQuery('#OUT_CHK_DETAIL_GRID').jqGrid('getRowData',rowId);
	var srcCcy = rowData.OUT_CR_SOURCE_CCY;
	var accCCY = rowData.OUT_CR_ACCOUNT_CCY;
	var srcAmt = accAmt * ( getExRateByType(accCCY,srcCcy,'SB') );
	
	if( (__changeOutCrAmt * 1 + __changeOutCrPreAmt * 1) < srcAmt * 1 ) {
		alert("金额 ["+accAmt+"/"+accCCY+"] - ["+srcAmt+"/"+srcCcy+"] 超过 ["+(__changeOutCrAmt * 1 + __changeOutCrPreAmt * 1)+"]!! 请检查! ");
		$('#OUT_CHK_DETAIL_GRID').jqGrid('setRowData',rowId,{OUT_CR_ACCOUNT_AMT:__changeOutCrPreAmt2});
		jQuery('#OUT_CHK_DETAIL_GRID').jqGrid('restoreRow',rowId);
		return;
	}
	var accCny = srcAmt * getExRateByType(srcCcy,__SYS_LOCALCCY,'BS');
	var accPpCny = srcAmt * getExRateByType(srcCcy,__SYS_LOCALCCY,'PPBS');
	
	if( srcCcy == accCCY ) srcAmt = accAmt;
	accAmt = FormatAmtByCCY(accAmt,accCCY);
	srcAmt = FormatAmtByCCY(srcAmt,srcCcy);
	
	$('#OUT_CHK_DETAIL_GRID').jqGrid('setRowData',rowId,{
		OUT_CR_SOURCE_AMT:srcAmt,
		OUT_CR_ACCOUNT_AMT:accAmt,
		OUT_ACC_CNY:accCny,
		OUT_ACC_PP_CNY:accPpCny});
	
	var ssAmt = getFieldValue( $('#CHK_OUT_AMT').get(0) );
	var allRows = jQuery("#OUT_CHK_DETAIL_GRID").jqGrid('getDataIDs');
	var ssRowData;
	$.each( allRows, function(i, n){	
		if( n != 1 ){
			ssRowData = jQuery('#OUT_CHK_DETAIL_GRID').jqGrid('getRowData',n);
			ssAmt = ssAmt - FormatStr2Amt(ssRowData.OUT_CR_SOURCE_AMT);
		}
	});
	var sssAmt = FormatAmtByCCY(ssAmt,srcCcy);
	$('#OUT_CHK_DETAIL_GRID').jqGrid('setRowData',1,{
								OUT_CR_SOURCE_AMT:sssAmt,
								OUT_CR_ACCOUNT_AMT:sssAmt,
								OUT_ACC_CNY:getExRateByType(srcCcy,__SYS_LOCALCCY,'BS') * ssAmt,
								OUT_ACC_PP_CNY:getExRateByType(srcCcy,__SYS_LOCALCCY,'PPBS') * ssAmt});
	currRowData = jQuery('#OUT_CHK_DETAIL_GRID').jqGrid('getRowData',rowId);
	//jQuery('#OUT_CHK_DETAIL_GRID').jqGrid('editRow',rowId);
}

function delCrInfo(rowId){
	var flag = false;
	jQuery('#OUT_CHK_DETAIL_GRID').jqGrid('saveRow',rowId,null,'clientArray');
	var oneRow = jQuery('#OUT_CHK_DETAIL_GRID').jqGrid('getRowData',1);
	var rowData = jQuery('#OUT_CHK_DETAIL_GRID').jqGrid('getRowData',rowId);
	var srcAmt1 = FormatStr2Amt( oneRow.OUT_CR_SOURCE_AMT );
	var srcAmtx = FormatStr2Amt(rowData.OUT_CR_SOURCE_AMT);
	var srcCcy = oneRow.OUT_CR_SOURCE_CCY;
	var ssAmt = FormatAmtByCCY( srcAmt1 + srcAmtx,srcCcy );
	$('#OUT_CHK_DETAIL_GRID').jqGrid('setRowData',1,{
																			OUT_CR_SOURCE_AMT:ssAmt,
																			OUT_CR_ACCOUNT_AMT:ssAmt,
																			OUT_ACC_CNY:getExRateByType(srcCcy,__SYS_LOCALCCY,'BS') * ssAmt,
																			OUT_ACC_PP_CNY:getExRateByType(srcCcy,__SYS_LOCALCCY,'PPBS') * ssAmt});
	flag = true;
	return flag;
}

function getOutJshForBOP(){
	//[FINWARE_V3.5_TFS_2013100051]_B QF.wulei 2013-3-18 增加判断结售汇统计代码是否必输
	if( $('#OUT_CHK_DETAIL_GRID').get(0) != null ){
		var rowData,ccy1,ccy2,amt;
		var allRows = jQuery("#OUT_CHK_DETAIL_GRID").jqGrid('getDataIDs');
		setProperty($('#OUT_CR_CUST_ACC_JSHDM').get(0),"O");
		$.each( allRows, function(i, n){	
			jQuery('#OUT_CHK_DETAIL_GRID').jqGrid('saveRow',n,null,'clientArray');
			rowData = jQuery('#OUT_CHK_DETAIL_GRID').jqGrid('getRowData',n);
			ccy1 = rowData.OUT_CR_ACCOUNT_CCY;
			ccy2 = rowData.OUT_CR_SOURCE_CCY;
			amt = FormatStr2Amt(rowData.OUT_CR_SOURCE_AMT);
			
			if( amt > 0 && ccy1 && ccy2 && ccy1 != ccy2 && ( ccy1 == "CNY" || ccy2 == "CNY" ) ){
				setProperty($('#OUT_CR_CUST_ACC_JSHDM').get(0),"M");
			}
		});
		jQuery('#OUT_CHK_DETAIL_GRID').jqGrid('editRow',currRowIdCHK0);
	}
	//[FINWARE_V3.5_TFS_2013100051]_E QF.wulei 2013-3-18
	if( typeof(getJSHDataForBop) == 'function' ){
		jQuery('#OUT_CHK_DETAIL_GRID').jqGrid('saveRow',currRowIdCHK0,null,'clientArray');
		currRowData0 = jQuery('#OUT_CHK_DETAIL_GRID').jqGrid('getRowData',currRowIdCHK0);
		var ccy = currRowData0.OUT_CR_ACCOUNT_CCY;
		var amt = FormatStr2Amt(currRowData0.OUT_CR_SOURCE_AMT);
		var accNo = currRowData0.OUT_CR_ACCOUNT_NO;
		var buyRate = currRowData0.OUT_CR_BUY_RATE;
		var selRate = currRowData0.OUT_CR_SELL_RATE;
		//alert('ccy-'+ccy+'-amt-'+amt+'-accNo-'+accNo+'-buyRate-'+buyRate+'-selRate-'+selRate);
		jQuery('#OUT_CHK_DETAIL_GRID').jqGrid('editRow',currRowIdCHK0);
		getJSHDataForBop(ccy,amt,accNo,buyRate,selRate,"OUT");
	}
}

function createOutPageButton(clickEnable){
	if( OUT_IS_CREATE_BAR_FLAG ) return;
	OUT_IS_CREATE_BAR_FLAG = true;
	jQuery('#OUT_CHK_GRID')
		.jqGrid('navButtonAdd','#OUT_CHK_GRID_BAR',{
			caption:'',
			title:'Edit Row',
			buttonicon:'ui-icon-pencil',
			clickEnable:clickEnable,
			onClickButton : function (){
				editOutChkRow();
	    	}})
		.jqGrid('navButtonAdd','#OUT_CHK_GRID_BAR',{
			caption:'',
			title:'Save Row',
			buttonicon:'ui-icon-disk',
			clickEnable:clickEnable,
			onClickButton : function (){
				saveOutChkRow();
	    	}})
		.jqGrid('navButtonAdd','#OUT_CHK_GRID_BAR',{
			caption:'',
			title:'Cancle Save Row',
			buttonicon:'ui-icon-cancel',
			clickEnable:clickEnable,
			onClickButton : function (){
				cancleOutChkRow();
	    	}});
}

function setCheckCurrData(rowid){
	var outCrAccNo = getGridData("OUT_CHK_DETAIL_GRID","OUT_CR_ACCOUNT_NO",rowid);
	if(outCrAccNo==null||outCrAccNo==""){
		 $('#OUT_CHK_DETAIL_GRID').jqGrid('setRowData',rowid,{SUBMARKS:''});
	}
	setProperty($("#" + rowid + "_SUBMARKS"),"P");
}
//---end--------------------------------------------------------------
