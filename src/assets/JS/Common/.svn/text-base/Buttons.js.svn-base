/**
 * 按钮处理
 */
var hasMarkDiv = false;

function doSUBMIT(retValue, msg)
{	
	if(retValue=='PAUSESAVE' || retValue=='DELETE' || retValue=='RETURN' || retValue=='REJECT' || retValue=="TEMPSAVE" ){
	
	}else if( !CheckForm() || !checkDoubleClick() ||!SubmitCheckGroup() || !SubmitCheck() ) {
		return false;
	}
	
	if( retValue!='ACCEPT' && retValue!="REJECT" && retValue!="AUTH" && retValue!="FINAAUTH" && retValue!="RETURN" && retValue!='CONFIRM'){
		
		//FINWARE_V3.5_TFS_2013131020 - B 平台融合JqGrid处理  2013-8-21 wt
	    if( typeof(createJqGridXml) === 'function' ){
	    	if( !createJqGridXml() ){
	    		return false;
	    	}
	    } 
	    //FINWARE_V3.5_TFS_2013131020 - E 平台融合JqGrid处理  2013-8-21 wt
    
		saveData();
	}
	
	if(!(r=confirm(msg))) return;
	
	if(retValue=='REJECT' ) {	//如果拒绝，则将双敲复核字段赋原值，避免交易队列显示金额等错误
		rejectDoubleClick();
	}
	
	unFormat(document.UTFORM);
	if( $('#SETTINGCANCLE',window.parent.document).get(0) != null && $('#SETTINGCANCLE',window.parent.document).val() == 'SETTING' ){//setting
		window.top.showMainProcessBar();
	}else{
   		showProcessBar();
   	}
   	$('#TASKTYPE').get(0).value = 'DO_TASK';
   	
   	// 判断是模板
	if(retValue=="TEMPSAVE"){
		$("#BTN_RET_VALUE").val("TEMPSAVE");
		$("#OPERTYPE").val("saveTemplate");
	}
	
   	createWindow("submit","提交");
   	moveOpenWindow("submit");
   	dhxWins.window("submit").button("close").hide();
   	summaryCommonJasperReport("COMMON_JASPERREPORT_XML"); // 处理XML源的报表
  	document.UTFORM.submit();
  	createMarkDiv();
	
	for(var i=0;i<disableFiled.length;i++){
		disableFiled[i].disabled = true;
	}
}

function doCANCEL()
{	
	if( $('#SETTINGCANCLE',window.parent.document).get(0) != null && $('#SETTINGCANCLE',window.parent.document).val() == 'SETTING' ){
		window.parent.getTable("setting").closeCurrTab(); // [Bugfree_2073_【温州银行】机构信息维护-选择一个机构然后点击‘编辑’，后点击‘取消’，系统卡住了，取消不掉！] fanr 2013-12-17
	}else{
		$('#TASKTYPE').get(0).value = "DO_CANCEL";
		document.UTFORM.target = "_self";
	    document.UTFORM.submit();

	    if( $('#CURR_SUBMIT_PAGE').val() == "doTaskMain.jsp"){
	    	this.parent.isMainFlag = true;
	    }
	    closeMarkDiv();
	}
}

function goHome(resultPage){
	var FRAMENAMES = {
	"doTaskMain.jsp":"IFRAME_MAIN_TASK",
	"doTaskList.html":"IFRAME_TASK_LIST",
	"doSwiftList.html":"IFRAME_SWIFT_LIST",
	"doTempSaveList.html":"IFRAME_TEMP_LIST",
	"doFixpendingList.html":"IFRAME_FIX_LIST",
	"doQuickInqList.html":"IFRAME_QUICK_LIST",
	"doHintMsgList.html":"HINT_MSG_LIST",
	"doPrintList.html":"PRINT_LIST",
	"doBOPList.html":"IFRAME_BOP_LIST",
	"doWarnList.html":"WARN_LIST",
	"doBlackList.html":"IFRAME_BLACKLIST_LIST"
	};
	
	if( $('#SETTINGCANCLE',window.parent.parent.document).get(0) != null && $('#SETTINGCANCLE',window.parent.parent.document).val() == 'SETTING' ){
		window.parent.parent.getTable("setting").closeCurrTab(); // [Bugfree_2073_【温州银行】机构信息维护-选择一个机构然后点击‘编辑’，后点击‘取消’，系统卡住了，取消不掉！] fanr 2013-12-17
	}else if( $('#SETTINGCANCLE',window.parent.document).get(0) != null && $('#SETTINGCANCLE',window.parent.document).val() == 'SETTING' ){
		window.parent.getTable("setting").closeCurrTab(); // [Bugfree_2073_【温州银行】机构信息维护-选择一个机构然后点击‘编辑’，后点击‘取消’，系统卡住了，取消不掉！] fanr 2013-12-17
	}else{
		var currPage = $('#CURR_SUBMIT_PAGE').val();
		window.top.frames["IFRAME_CENTER"].frames[ FRAMENAMES[resultPage] ].location = "SYS/sysPage/"+resultPage;
		if( currPage == "doTaskMain.jsp"){
		   window.top.frames["IFRAME_CENTER"].isMainFlag = true;
		}
		
		closeMarkDiv();
	}
}

function doContinue(resultPage,taskName){
	goHome(resultPage);
	this.parent.parent.doInitTask(taskName,'');
}

function doPREVIEW(){
	showProcessBar();
	saveData();
	unFormat(document.UTFORM);	
	createWindow("preview", "预览");
	moveOpenWindow("preview");
	$('#TASKTYPE').val('DO_PREVIEW');
	summaryCommonJasperReport("COMMON_JASPERREPORT_XML"); // 处理XML源的报表
	document.UTFORM.submit();
	
	for(var i=0;i<disableFiled.length;i++)
	{
		disableFiled[i].disabled = true;
	}
}

function doReleaseView(){
	showProcessBar();
	unFormat(document.UTFORM);
	createWindow('view', "浏览");
	moveOpenWindow('view');
	$('#TASKTYPE').get(0).value = 'DO_RELEASEVIEW';
	summaryCommonJasperReport("COMMON_JASPERREPORT_XML"); // 处理XML源的报表
	document.UTFORM.submit();
	
	for(var i=0;i<disableFiled.length;i++)
	{
		disableFiled[i].disabled = true;
	}
}

function doHelp(fileName){
	//var url = '/UtanWeb/HELP/IMPORT/IMLC/IMLCIssuancePage_Help.html'; 
	var url = 'CommUtilServlet?OPERTYPE=DOHELP&FILENAME='+fileName; 
  	var o = window.open( url ,"Help","left=100,top=100,width=900,height=600,resizable=yes,scrollbars=yes"); 
	
}

function doHistoryView(){
	showProcessBar();
	unFormat(document.UTFORM);
	
	createWindow('historyView', "查看输出");
	moveOpenWindow('historyView');
	
	$('#TASKTYPE').get(0).value = 'DO_VIEW';
	$('#OPERTYPE').val('SHOW_VIEW');
	summaryCommonJasperReport("COMMON_JASPERREPORT_XML"); // 处理XML源的报表
	document.UTFORM.submit();
	
	for(var i=0;i<disableFiled.length;i++)
	{
		disableFiled[i].disabled = true;
	}
}


function doLookUp(){
	showProcessBar();
	unFormat(document.UTFORM);
	
	createWindow('lookup',"查询");
	moveOpenWindow('lookup');
	//dhxWins.window('lookup').hide();
	$('#TASKTYPE').val('DO_LOOKUP');
	
	//[BugFree_2277]_B QF.wulei 2014-2-12 根据客户号查询账号接口，支持用账号进行模糊查询
    var lkType = $('#LOOKUPTYPE').val();
    if ("AccountNo" == lkType) {
    	var accFld = $('#CURRACCOUNTFIELD').val();
    	if (accFld && $('#'+accFld)[0]) {
    		$('#CURRACCOUNTNO').val($('#'+accFld).val());
    	}
    }
    
    //[BugFree_2344]_B QF.wulei 2014-3-11 lookup在调用接口的时候支持自身字段值传递。
    if ($('#_LOOKUP_PARAM_STRING').val()) {
    	var p = $('#_LOOKUP_PARAM_STRING').val();
    	var lb = $('#'+$('#LOOKUP_BIND_FLD').val()).val();
    	$('#_LOOKUP_PARAM_STRING').val(p.replace("{#}", lb));
    }
    //[BugFree_2277]_E QF.wulei 2014-2-12
	
	document.UTFORM.submit();
	
	for(var i=0;i<disableFiled.length;i++){
		disableFiled[i].disabled = true;
	}
}

function doClause(){
	createWindow('clause', "条款");
	$('#TASKTYPE').val('DO_CLAUSE');
	document.UTFORM.submit();
}

function doTempAction()
{
	createWindow('temp', "模板");	
	$('#TASKTYPE').val('DO_TEMPDATA');
	document.UTFORM.submit();
}

function doSwfTempAction(){
	createWindow('temp',"模板");	
	$('#TASKTYPE').val('DO_SWFTEMPDATA');
	$('#OPERTYPE').val("");
	document.UTFORM.submit();
}

function doTempSave()
{  
	$('#TASKTYPE').val('DO_TEMPSAVE');
	document.UTFORM.submit();
}

function doEventView(paramValue){
	createWindow('history', "历史");
	$('#TASKTYPE').val('SYS_EVENTVIEW');
	summaryCommonJasperReport("COMMON_JASPERREPORT_XML"); // 处理XML源的报表
	$('#HISTORYPARAMVALUE').val(paramValue);
	document.UTFORM.submit();
}

//add by wulei for amend inquire
function doAmendInq(paramValue){
	$('#AmendInqWindow').window('open');
	$('#TASKTYPE').val('DO_AMENDINQ');
	$('#AMENDINQUIRETEXT').val(paramValue);
	document.UTFORM.target = 'AmendInqIFrame';
	document.UTFORM.submit();
}

//modify by wt 2010-10-15
function doViewInSwift(paramValue,msgId)
{	
	//var msgId = document.UTFORM.DEMERGE_MSGID.value;		//mark by wt 2012-7-9
	if(msgId==""){
		alert("没有报文信息");
		return ;
	}
	var msgtype ="";
	if(typeof(DEMERGE_MSGTYPE)=="undefined"){
	}else{
	 msgtype=document.UTFORM.DEMERGE_MSGTYPE.value;
	}
	var compname="";
	var trxno="";
	if(paramValue!=null && paramValue!=""){
	   var pVals=paramValue.split(",");
	   compname=$("#"+pVals[0]).val();
	   trxno=$("#"+pVals[1]).val();
	}
	/*
	$('#swiftInfoWindow').window('open');
	$('#TASKTYPE').val('DO_VIEW');
	$('#OPERTYPE').val('VIEW_IN_SWIFT');
	$('#SWIFT_VIEW_PARAM').val(paramValue);
	$('#reportlet').val('basic/printSwift.cpt');
	document.UTFORM.target = 'swiftInfoIFrame';
	document.UTFORM.submit();
	*/
	
	var url="/UtanWeb/DoView?OPERTYPE=viewSwiftmsg&msgid="+msgId+"&compname="+compname+"&trxno="+trxno+"&msgtype="+msgtype;
	var childWin=window.open(url,'printSwift',"width=800,height=450,left=100,top=100,scrollbars=yes,titlebar=yes,toolbar=yes,menubar=yes,resizable");	
	childWin.focus();
}



function submitReport(obj){	
	parent.unFormat(parent.document.UTFORM);
	parent.document.UTFORM.TASKTYPE.value='DO_VIEW';
	// FINWARE_V3.5_TFS_2013131007 - 报表研究和整合  begin wj 2013-7-23
 	//parent.document.UTFORM.REPORT_FILE_TYPE.value=obj.getAttribute("reportFileType");
	parent.document.UTFORM.REPORT_URL.value=obj.getAttribute("reportUrl")
 	// FINWARE_V3.5_TFS_2013131007 - 报表研究和整合  end wj 2013-7-23
 	if(obj.getAttribute("reportType")=='PreviewSwift'){
		parent.document.UTFORM.OPERTYPE.value='PREVIEW_SWIFT';
		parent.document.UTFORM.MERGE_SWIFT_PARAM.value=obj.getAttribute("param");
 	}else if(obj.getAttribute("reportType")=='ViewOutSwift'){
 	 	parent.document.UTFORM.OPERTYPE.value='VIEW_OUT_SWIFT';
		parent.document.UTFORM.MERGE_SWIFT_PARAM.value=obj.getAttribute("param");
		// FINWARE_V3.5_TFS_2013120016  begin wj 2013-5-21
 		parent.document.UTFORM.PRT_REF.value=obj.getAttribute("prtRef");
 		// FINWARE_V3.5_TFS_2013120016  end wj 2013-5-21
 	}else if(obj.getAttribute("reportType")=='PreviewDocument'){//add by yangcl 2015-11-26 用于区分是预览方式
 		parent.document.UTFORM.OPERTYPE.value='PREVIEW_DOCUMENT';
 	}else if(obj.getAttribute("reportType")=='Document'){
 		parent.document.UTFORM.OPERTYPE.value='VIEW_DOCUMENT';
 	}else if(obj.getAttribute("reportType")=='PreviewVoucher'){
 		parent.document.UTFORM.voucherInfoXml.value= $('#voucherInfoXml').val();
 		parent.document.UTFORM.VOUCHER_BALANCE.value= $('#VOUCHER_BALANCE').val();
 		parent.document.UTFORM.OPERTYPE.value='PREVIEW_VOUCHER';
 		parent.document.UTFORM.MERGE_VOUCHER_PARAM.value=obj.getAttribute("param");
 		parent.summaryCommonJasperReport("COMMON_JASPERREPORT_XML"); // 对voucherInfoXml赋值，需要重新处理下XML源的报表
 	}else if(obj.getAttribute("reportType")=='ViewVoucher'){
 		parent.document.UTFORM.OPERTYPE.value='VIEW_VOUCHER';
 		parent.document.UTFORM.MERGE_VOUCHER_PARAM.value=obj.getAttribute("param");
 		// FINWARE_V3.5_TFS_2013120016  begin wj 2013-5-21
 		parent.document.UTFORM.PRT_REF.value=obj.getAttribute("prtRef");
 		// FINWARE_V3.5_TFS_2013120016  end wj 2013-5-21
 	}
	parent.document.UTFORM.reportlet.value = obj.getAttribute("path");
	parent.document.UTFORM.target = obj.id;
	
	// 获取报表的title，added by pengxp on 2014-05-04 start
	parent.document.UTFORM.thisReportName.value = obj.getAttribute("title");
	// 获取报表的title，added by pengxp on 2014-05-04 end
	
	//value2reportValue();
	parent.document.UTFORM.submit();
	//reportValue2value();
	for(var i=0;i<parent.disableFiled.length;i++)
	{
		parent.disableFiled[i].disabled = true;
	}
}

function viewReport(obj){ 
	var tt = obj.title; 
	//修改tab的id为obj.id
	var tabId = obj.id;
	var tabs = getTable("viewTabs");
	var tab = tabs.get(tabId);
	//对账单制作时，分多个报文，这里id一样，缓存会有导致问题 hh
	if(tab){
//		tabs.select(tabId);
		tabs.del(tabId);
	}
	
//	else {
		tabs.add(tabId,{
			title:tt,
			content:"<iframe name="+obj.id+" scrolling='yes' frameborder='0'  style='width:100%;height:100%;'></iframe>",
			closeable:true,
			cache:false
		});
		submitReport(obj);
//	}
}

function viewDocument(obj){
	
	var tt = obj.title; 
	//修改tab的id为obj.id
	var tabId = obj.id;
	var tabs = getTable("viewTabs");
	var tab = tabs.get(tabId);
	if(tab){
		tabs.select(tabId);
	} else {
		tabs.add(tabId,{
			title:tt,
			// FINWARE_V3.5_TFS_2013131007 - 报表研究和整合  begin wj 2013-7-23
			content:"<iframe name="+obj.id+" id="+obj.id+" src='" + obj.getAttribute("reportUrl")+
							"/ReportLog?reportlet=com.utan.report.rpt.FinRpt" +
							// FINWARE_V3.5_TFS_2013120016  begin wj 2013-5-21
							"&TRANS_REF="+obj.getAttribute("param")+
							"&PRT_REF="+obj.getAttribute("prtRef")+
							"&REPRT_AUTH="+obj.getAttribute("REPRT_AUTH")+
							"&REPORT_URL="+obj.getAttribute("reportUrl")+
							"&REVIEW_AUTH="+obj.getAttribute("REVIEW_AUTH")+
							"&USER_USERID="+obj.getAttribute("userId")+
							"&USER_ORGID="+obj.getAttribute("orgId")+
							"&RPTPATH="+obj.getAttribute("path")+
							// 获取报表的title，added by pengxp on 2014-05-04 start
							"&thisReportName="+obj.getAttribute("title")+"'" +
							// 获取报表的title，added by pengxp on 2014-05-04 end
							
							// FINWARE_V3.5_TFS_2013120016  end wj 2013-5-21
							" scrolling='yes' frameborder='0'  style='width:100%;height:100%;'></iframe>", 
			closeable:true,
			cache:true
			// FINWARE_V3.5_TFS_2013131007 - 报表研究和整合  end wj 2013-7-23
		});
	}
}

function viewSelectedReport(){ 
	var list = $(':checkbox'); 
	for(var i =0;i<list.length;i++){; 
		if(list[i].checked){ 
			var relationId = $('#'+list[i].id).attr('relationId'); 
			var obj = document.getElementById(relationId); 
			viewReport(obj);
		} 
	} 
}
function viewAllReport(){
	$("span.singleReport").each(function(){
		fireEvent(this,"click");
		// viewReport(this); // // [Bugfree_806_汇出汇款提交成果结果页，点击“查看全部”，面涵重复显示] modify by fanr 2015-04-28
	});
}

function doLog(doType){
  var url = "DoLog?actionType=" + doType;
  
  var path = $('#LOG_FILEPATH');
  if(path){
	  url = url + "&logPath=" + path.val() + "";
  }
  window.open(url,"VIEWLOG","left=100,top=100,width=900,height=600,resizable=yes,scrollbars=no"); 
}
//end by wt


function doViewExRate(){	
	createWindow('ExRate', "汇率");
	$('#TASKTYPE').val('COMMUTILSERVLET');
	$('#OPERTYPE').val('VIEW_EXRATE_INFO');
	document.UTFORM.submit();
}

function closeWindow(win){	
	if (!win || typeof(dhxWins) == "undefined" || !dhxWins.isWindow(win)) return;
	
	if( typeOfWin(win) == "html" ){
		dhxWins.window(win).hide();
	}else{
		dhxWins.window(win).close();
	}
	if( hasMarkDiv ){
		closeMarkDiv();
	}
}

function closeMulWindow(wins){	
	if (!wins) return;
	var winArr = wins.split(",");
	for (var i = 0; i < winArr.length; i++){
		closeWindow(winArr[i]);
	}
}

function saveData(){
	saveLoopInfo();
	saveGrid();
	savePageInfo(); // // [Bugfree_2057_【恒丰】在使用系统"模板"功能带出业务时，如果该笔业务在发送报文]_B fanr 2013-11-30
	// [Bugfree_2205_温州银行,暂存，经办修改后，条款赋值问题]_B fanr 2014-01-09
	saveClauseList();
	if(typeof saveMIXED_PAYMENT_GRID_JSONSTR=="function") saveMIXED_PAYMENT_GRID_JSONSTR();
}

function saveClauseList(){
	var ClauseObj = {};
	if(typeof ClauseList !== "undefined"){
		ClauseObj.ClauseList  = ClauseList;
	}
	if(typeof ClauseList2 !== "undefined"){
		ClauseObj.ClauseList2  = ClauseList2;
	}
	var ClauseObjStr = $.toJSON(ClauseObj);
	setFieldValue("ClauseList_JSON", ClauseObjStr);
}

function setClauseHistoryInfo(){
	var ClauseObjStr = $("#ClauseList_JSON").val();
	if(ClauseObjStr){
		var ClauseObj = $.evalJSON(ClauseObjStr);
		if(ClauseObj.ClauseList){
			ClauseList = ClauseObj.ClauseList;
		}
		if(ClauseObj.ClauseList2){
			ClauseList2 = ClauseObj.ClauseList2;
		}
	}
}
// [Bugfree_2205_温州银行,暂存，经办修改后，条款赋值问题]_E fanr 2014-01-09
/*
*待改写*
*/
 var __arr = new Array();
 function createMarkDiv(){
 	hasMarkDiv = true;
	var allButtons = $(".linkbutton");
	var allButton = $(".menubutton");
	for( var i=0;i<allButtons.length;i++){
		__arr[i] = allButtons[i].disabled;
		allButtons[i].disabled = true;		
	}
	if( allButton != null && allButton.length != 0 ){
		__arr[allButtons.length] = allButton[0].disabled;
	}
}

function closeMarkDiv(){
	/*if( document.getElementById("MARK_DIV") != null )
		document.getElementById("MARK_DIV").style.display = "none"; */
	var allButtons = $(".linkbutton");
	var allButton = $(".menubutton");
	if(allButtons.length===0) return;
	for( var i=0;i<allButtons.length;i++ ){
		allButtons[i].disabled = __arr[i];
	}
	if( allButton == null  ) return;
	if( allButton != null && allButton.length != 0 ){
		allButton[0].disabled = __arr[allButtons.length];
	}
}

function doImage(OldType,TrxKey,ImageDesc,halfFlag){
	//[FINWARE_V3.5_TFS_2013120019]_B 影像双屏显示 fanr 2013-5-29 ---------------
	if((typeof imageWindow !== 'undefined') && !imageWindow.closed){
		restoreImageToHalfScreen();
		return;
	}
	//[FINWARE_V3.5_TFS_2013120019]_E 影像双屏显示 fanr 2013-5-29 ---------------
	var sURL= "../../UtanWeb/ImageCenter?TYPE=INIT";
	
	if(document.UTFORM[TrxKey]!=null)
	{
		var value = document.UTFORM[TrxKey].value;
		sURL = sURL + "&TRXKEY=" + value;
	}
		else
	{
		sURL = sURL + "&TRXKEY=NULL";
	}
	if(document.UTFORM[OldType]!=null)
	{
		var value = document.UTFORM[OldType].value;
		sURL = sURL + "&OLDTYPE=" + value;
	}
	else
	{
		sURL = sURL + "&OLDTYPE="+ OldType;
	}

	sURL = sURL + "&IMAGETYPE=" + ImageDesc;
	//[FINWARE_V3.5_TFS_2013120019]_B 影像双屏显示 fanr 2013-5-29 ---------------
	createImageWindow(sURL, halfFlag);
	//[FINWARE_V3.5_TFS_2013120019]_E 影像双屏显示 fanr 2013-5-29 --------------- 
}

function value2reportValue(){ 
	var form=parent.document.UTFORM; 
	for( var i=0;i<form.elements.length;i++){ 
		var temp = form.elements[i]; 
		temp.setAttribute("repValue",temp.value);
		temp.value = cjkEncode(temp.value); 
	} 
}

function reportValue2value(){ 
	var form=parent.document.UTFORM; 
	for( var i=0;i<form.elements.length;i++){ 
		var temp = form.elements[i]; 
		temp.value = temp.getAttribute("repValue");
	} 
}

function cjkEncode(text){
	if(text == null) return ''; 
	var newText ='';
	for (var i = 0; i < text.length; i++) { 
		var code = text.charCodeAt(i); 
		if (code >= 128 || code == 91 || code == 93)
			newText += "[" + code.toString(16) + "]"; 
		else
			newText += text.charAt(i); 
	} 
	return newText; 
}

function moveOpenWindow(winName){
	dhxWins.window(winName).setPosition(3999,3999);
}

function openWindow(winName){
	 var pbar = getProcess(); 
	 if( pbar != null && pbar != undefined ){
	 	pbar.stop();
	 }
	if( dhxWins.isWindow(winName) ){
		dhxWins.window(winName).show();
		if( dhxWins.window(winName).getPosition()[0] = 3999 ){
			dhxWins.window(winName).center();
		}
	} else {
		// alert( "window("+winName+") is not exist!Please check it.  如果不影响业务如果不影响业务.");
	}
} 

function closeProcessBar(){
	var pbar = getProcess(); 
	 if( pbar != null && pbar != undefined ){
	 	pbar.stop();
	 }
}

function showProcessBar(){
     try{
         if(typeof(getProcess)=='function'){
		    var pbar = getProcess(); 
		    if(pbar != null) {
		        pbar.setMsg(parent.getProcessBarMsg());
		        pbar.start();
		    }
       }  
     }catch(e){}
}

function createTempWin(){
	if( !dhxWins.isWindow("tempName") ){
		var winT = dhxWins.createWindow("tempName",300,100,600,100);
		winT.setText("模板");
		
		var obj = document.getElementById('tempNameWindow');
		winT.attachObject(obj);
		winT.button("park").hide();
		winT.button("minmax1").hide();
		winT.button("close").hide();
		winT.denyResize();
		/*winT.attachEvent("onClose",function(win){
			win.hide();
		});*/
	} else {
		dhxWins.window("tempName").show();
		dhxWins.window("tempName").bringToTop();
	}
}

function setTempNameValue(){
	var tempName = $('#TEMP_NAME').val();
	if(tempName==null||tempName==""){
		alert("模板名称不能为空!");
		return;
	}
	$('#ISTEMPSAVE').val(tempName);
	dhxWins.window('tempName').hide();
}

function createWindow(win, title, w, h){
	w = w ? w : 900;
	h = h ? h : 440;
	if( !dhxWins.isWindow(win) ){
			winT = dhxWins.createWindow(win, 20, 30, w, h);
			winT.progressOn();
			//mod by xh @20120806 for 将弹出窗口所有的title改成中文--begin--
			winT.setText("Do "+win); // 必须有个值，否则窗口不能拖动（插件bug）	
			if(title && typeof title==="string"){
				winT.setText(title);	
			}
			//mod by xh @20120806 for 将弹出窗口所有的title改成中文--end--
			if (win == "history") w = 1000;
			$("body").append('<iframe name="'+win+'IFrame" id="'+win+'IFrame" style="padding:5px;background: #fafafa;width:'+w+'px;height:'+h+'px;"></iframe>');
			
			document.UTFORM.target = win+'IFrame';
			
			var obj = document.getElementById(win+'IFrame');
			winT.attachObject(obj,true);
			winT.center();
			winT.button("park").hide();
			winT.button("minmax1").hide();
	
	}else{
		dhxWins.window(win).show();
		dhxWins.window(win).bringToTop();
	}
}
// for create window without document.UTFORM.target = ........;can set width and height
function createSingleWindow(win,width,height,title){
	var winT;
	if( !dhxWins.isWindow(win) ){
	
			winT = dhxWins.createWindow(win,20,30,600,300);// ???????,???????,???????????
			winT.progressOn();
			winT.setText("Do "+win);
			if( title != "" && title !=null ){
				winT.setText(title);
			}		
			$("body").append('<iframe name="'+win+'IFrame" id="'+win+'IFrame" style="padding:5px;background: #fafafa;width:' + width + 'px;height:'+height+'px;"></iframe>');
			
			var obj = document.getElementById(win+'IFrame');
			winT.attachObject(obj,true);
			winT.center();
			winT.button("park").hide();
			winT.button("minmax1").hide();
	
	}else{
		dhxWins.window(win).show();
		dhxWins.window(win).bringToTop();
	}
}

function hideWindow(win){
	if( !dhxWins.isWindow(win) ) return;
	if( win == "submit" ) {
		if( hasMarkDiv ){
			closeMarkDiv();
		}
	}
	dhxWins.window(win).hide();
}
var dhxIni = {
	html:new Array("tempName","temp","addNewItem"),// this should always exist in the dcoument(can be hidden)
	iframe:new Array("submit","lookup","preview","clause","history","historyjoin","historyInfo","ExRate","view","historyView","addFee","viewFee","swiftTurn","ExRate","im","hxAccount","printView","temp2","import","updatePwd","assocSwift","voucherSwift","printSwift")// this can be removed from the document
};
function typeOfWin(win)
{
	for(var i=0; i<dhxIni.html.length; i++){
		if( win == dhxIni.html[i] ) return "html";
	}
	for(var i=0; i<dhxIni.iframe.length; i++){
		if( win == dhxIni.iframe[i] ) return "iframe";
	}
	alert("此窗口类型没有定义,请检查文件Button.js的dhxIni变量,设置前窗口类型将默认为'iframe';");
	return "iframe";
}

function doViewFavExRate(custId){
	createWindow('FavExRate');
	$('#FAV_EXRATE_CUSTID').val(custId);
	$("#FavExRateIFrame").get(0).src = "/UtanWeb/SYS/sysPage/FavExrate.html";
}

function doViewFavCharge(custId){
	createWindow('FavCharge');
	$('#FAV_CHARGE_CUSTID').val(custId);
	$("#FavChargeIFrame").get(0).src = "/UtanWeb/SYS/sysPage/FavCharge.html";
}

function doHistorySwift(paramValue){
	createWindow('historySwift');
	$('#TASKTYPE').val('SYS_HISTORYSWIFT');
	$('#HISTORYSWIFT_TRANSKEY').val(paramValue);
	document.UTFORM.submit();				
}

//徽商国结改造pengc_B
function doCurrHistorySwift(paramValue){
	if(''==paramValue){
	   alert("没有交易主键!");
	   return ;
	}else{
		var transKey = $('#'+paramValue).val();
		if(typeof(transKey) == 'undefined'){
			return;
		}else{
			createWindow('historySwift');
			$('#TASKTYPE').val('SYS_CURRHISTORYSWIFT');
			$('#HISTORYSWIFT_TRANSKEY').val(transKey);
			document.UTFORM.submit();
				
		}
	}
}
//徽商国结改造pengc_E

/*
 *	add by wt 2012-8-2 复核拒绝时，对双敲字段赋原值 
 * rejectDoubleClick()
 */
function rejectDoubleClick(){
    var doubleClickFld = $("[doubleFlag='OK']");
    var len = doubleClickFld.length;
    if( len == 0 ) return ;
    for( var i=0;i<len;i++ ){
        var id = doubleClickFld[i].id;
        $('#'+id).val( $('#'+id).attr('doubleValue') );
    }
}

/*
 * 打开重庆影像窗口 
 */
function createCQImageWindow(imageURL){
	window.open(imageURL,"Image","width=800,height=560,left=100,top=100,scrollbars=no,menubar=yes,resizable");
}

//接受影像窗口传输回来的相关信息-废弃
function setCQImageInfo(imageType,imagePath,imageNo){
	if(imagePath!=null&&imagePath!=""){
		$('#IMAGENO').val(imagePath);
	}
}

/*
UTAN-FINWARE_V3.5_TFS_2013120019
樊瑞   2013-5-31
函数介绍：打开影像窗口
输入参数：影像URL ，是否分屏标示
*/
function createImageWindow(imageURL, halfFlag){
	if(halfFlag){
		createImageToHalfScreen(imageURL);
	} else {
		window.open(imageURL,"Image","width=800,height=460,left=100,top=100,scrollbars=yes,menubar=yes,resizable");
	}
}

/*
UTAN-FINWARE_V3.5_TFS_2013120019
樊瑞   2013-5-31
函数介绍：分屏打开影像窗口
输入参数：影像url
*/
function createImageToHalfScreen(imageURL){
	var height = window.top.screen.availHeight;
	var width = window.top.screen.availWidth;
	var bodyHeight = window.top.document.documentElement.clientHeight;
	var halfWidth = width/2;
	//[BUGFREE587影像双屏显示，业务和影像两个页面有重叠]_B fanr 2013-6-13 ---------------
	if($.browser.msie && $.browser.version == 6){
		// halfWidth = 
	} else if($.browser.msie && $.browser.version == 7){
		// halfWidth =
	} else if($.browser.msie && $.browser.version == 8){
		// halfWidth =
	}
	//[BUGFREE587影像双屏显示，业务和影像两个页面有重叠]_E fanr 2013-6-13 ---------------
	// window.open(sURL,\"Image\",\"width=800,height=460,left=100,top=100,scrollbars=yes,menubar=yes,resizable\");"
	window.top.moveTo(0, 0);
	window.top.resizeTo(halfWidth, height);
	window.imageWindow = window.open("", "Image", "left=" + halfWidth + ",top=0,scrollbars=yes,menubar=yes,resizable"); // 初始化弹出窗口位置
	imageWindow.resizeTo(halfWidth, height); // 设置弹出窗口大小,如果在这之前传入url,会导致禁止调整大小
	window.open(imageURL, "Image"); // 将影像链接塞进去 注:此三步才弹出完美一半窗口
}

/*
UTAN-FINWARE_V3.5_TFS_2013120019
樊瑞   2013-5-31
函数介绍：关闭影像窗口，同时恢复原来交易窗口尺寸
*/
function restoreImageToHalfScreen(){
	imageWindow.close();
	window.top.moveTo(0, 0);
	window.top.resizeTo(window.top.screen.availWidth, window.top.screen.availHeight);
}
//[Bugfree_2057_【恒丰】在使用系统"模板"功能带出业务时，如果该笔业务在发送报文]_B fanr 2013-11-30

/**
 * 储存各子页面显示隐藏信息,供模版使用
 */
function savePageInfo(){
	var pageTabLiClassInfo = {};
	$("#TabPage li").each(function(){
		var tabLiId = this.id;
		var tabLiClassName = this.className;
		pageTabLiClassInfo[tabLiId] = tabLiClassName;
	});
	$("#pageTabLiClassInfo_JSON").val($.toJSON(pageTabLiClassInfo));
}
/**
 * 设置页面显示隐藏,供模板使用
 */
function setPageInfo(){
	/** 这一段注起来暂时不用
	var pageTabLiClassInfo_JSON = $("#pageTabLiClassInfo_JSON").val();
	if(pageTabLiClassInfo_JSON){
		var jsonObj = $.evalJSON(pageTabLiClassInfo_JSON);
		for(var tabLiID in jsonObj){
			var className = jsonObj[tabLiID];
			$("#" + tabLiID)[0].className = className;
			if($("#" + tabLiID).hasClass("Selected")){
				switchTab(tabLiID.substring(3));
			}
		}
	} else 
	**/	
	if(typeof onFieldChange === "function"){
		onFieldChange();
	}
	if(typeof showPage === "function"){
		showPage();
	}
	if(typeof onTempChange === "function"){
		onTempChange();
	}
}
//[Bugfree_2057_【恒丰】在使用系统"模板"功能带出业务时，如果该笔业务在发送报文]_E fanr 2013-11-30

function disableMenuButton(id){
	var button = $("#" + id)[0];
	if(button){
		button.disabled = true;
		$(button).find("img").css("visibility", "hidden");
	}
	
}

function undisableMenuButton(id){
	var button = $("#" + id)[0];
	if(button){
		button.disabled = false;
		$(button).find("img").css("visibility", "visible");
	}
}

function createWindowByWidthAndHeight(win,width,height,title){
	if( !dhxWins.isWindow(win) ){
	var winT = dhxWins.createWindow(win,500,100,width,height);
	winT.setText(title);
	
	var obj = document.getElementById(win);
	winT.attachObject(obj,false); // 自动调节至适合内容大小
	winT.attachEvent("onClose",
	function (win){
				win.hide();
			});
	winT.center();
	winT.setPosition(30,winT.getPosition()[1]);
	winT.denyResize();
	} else {
		dhxWins.window(win).show();
		dhxWins.window(win).bringToTop();
	}
}
//add by xujw 2015/9/1
function doFemEventView(paramValue){
	createWindow('history');
	$('#TASKTYPE').val('FEM_EVENTVIEW');
	document.UTFORM.submit();
}