/**
 * 汇率修改处理
 */
//Function For Exrate Modfiy By WL 20110510

var currRowIdEM = -1;
var currRowData = null;
function modfiyExrate(flag,rowId,iRow,iCol){
	if( !flag ) return;
	currRowIdEM = rowId;
	editExrateData();
}

function createExratePageButton(clickEnable){
	clickEnable = true;
	if( clickEnable == "false" ) clickEnable = false;
	jQuery('#TRANS_EXRATE_EDIT_GRID')
		.jqGrid('navButtonAdd','#TRANS_EXRATE_EDIT_BAR',{
			caption:'',
			title:'Edit Row',
			buttonicon:'ui-icon-pencil',
			clickEnable:clickEnable,
			onClickButton : function (){
				editExrateData();
	    	}})
		.jqGrid('navButtonAdd','#TRANS_EXRATE_EDIT_BAR',{
			caption:'',
			title:'Save Row',
			buttonicon:'ui-icon-disk',
			clickEnable:clickEnable,
			onClickButton : function (){
				saveExrateData();
	    	}})
		.jqGrid('navButtonAdd','#TRANS_EXRATE_EDIT_BAR',{
			caption:'',
			title:'Cancle Save Row',
			buttonicon:'ui-icon-cancel',
			clickEnable:clickEnable,
			onClickButton : function (){
				cancleExrateData();
	    	}});
}		

function saveExrateData(){
	var allRows = jQuery("#TRANS_EXRATE_EDIT_GRID").jqGrid('getDataIDs');
	$.each( allRows, function(i, n){	
		jQuery('#TRANS_EXRATE_EDIT_GRID').jqGrid('saveRow',n,null,'clientArray');
	});
}
function cancleExrateData(){
	var allRows = jQuery("#TRANS_EXRATE_EDIT_GRID").jqGrid('getDataIDs');
	$.each( allRows, function(i, n){	
		jQuery('#TRANS_EXRATE_EDIT_GRID').jqGrid('restoreRow',n);
	});
}
function editExrateData(){
	saveExrateData();
	jQuery('#TRANS_EXRATE_EDIT_GRID').jqGrid('editRow',currRowIdEM);
}

function updateSysExrate(){
	saveExrateData();
	var parentExrateData = parent.__ExRateData;
	if( parentExrateData == null ){
		closeExrateWin();
		return;
	}
	var transExrate = new Array(),transExrateE = new Array(),ccyArray = new Array(),lineNoArray = new Array();
	var rowData1,rowData2;
	var editMsg = "",isModFlag = true,transJsonString = "",authMsg = "";
	var allRows = jQuery("#TRANS_EXRATE_EDIT_GRID").jqGrid('getDataIDs');
	$.each( allRows, function(i, n){	
		rowData1 = jQuery('#TRANS_EXRATE_GRID').jqGrid('getRowData',n);
		rowData2 = jQuery('#TRANS_EXRATE_EDIT_GRID').jqGrid('getRowData',n);
		ccyArray[i] = rowData1.CCY;
		lineNoArray[i] = n;
		transExrate[rowData1.CCY] = rowData1;
		transExrateE[rowData2.CCY] = rowData2;
	});
	
	$.each( ccyArray, function(j,m){	
		var ccy = ccyArray[j];
		var rowNo = lineNoArray[j];
		if( transExrate[ccy].BUYRATE != transExrateE[ccy].BUYRATE ) editMsg = editMsg + "\r\n" + " (" + ccy + "/BUYRATE) : " + transExrate[ccy].BUYRATE + "-->" + transExrateE[ccy].BUYRATE + " ";
		if( transExrate[ccy].SELRATE != transExrateE[ccy].SELRATE )   editMsg = editMsg + "\r\n" + " (" + ccy + "/BUYRATE) : " + transExrate[ccy].SELRATE + "-->" + transExrateE[ccy].SELRATE + " ";
	});
	
	if( editMsg != "" ){
		authMsg = editMsg;
		editMsg = "确定更改汇率 ??" + editMsg + "";
	}else{
		editMsg = "没有汇率更改!";
		isModFlag = false;
	}
	var isSure=confirm( editMsg );
	if(isSure && isModFlag){
		$.each( ccyArray, function(j,m){
			var ccy = ccyArray[j];
			parentExrateData[ccy] = transExrateE[ccy];
			parent.__ExRateData = parentExrateData;
		});
		
		parent.setExrateModfiyFlag("YES",authMsg);
		parent.saveCurrTransExRateE( transExrateE,ccyArray,$('#CURR_TRANS_EXRATE_CUST').val() );
		transJsonString = $('#CURR_TRANS_EXRATE_JSON',window.parent.document).val();
		$('#TRANS_EXRATE_GRID').GridUnload();
		createTransRateGrid(transJsonString,'TRANS_EXRATE_GRID','TRANS_EXRATE_BAR',310,false);
		
		if( typeof(parent.onTransExrateChange) == 'function' ){
			parent.onTransExrateChange();
		}
		closeExrateWin();
	}else{
		parent.saveCurrTransExRateE( transExrate,ccyArray,$('#CURR_TRANS_EXRATE_CUST').val() );
		transJsonString = $('#CURR_TRANS_EXRATE_JSON',window.parent.document).val();
		$('#TRANS_EXRATE_EDIT_GRID').GridUnload();
		createTransRateGrid(transJsonString,'TRANS_EXRATE_EDIT_GRID','TRANS_EXRATE_EDIT_BAR',280,true);
	}
}

function closeExrateWin(){
	parent.closeWindow("ExRate");
}
