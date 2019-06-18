/*!
 * Utan JavaScript Library v2.4
 * Date:2011-09-06
 * modify by fr 2011-09-08
 * modify by fr 2011-09-09f
 */
var 	SYS_DEBUG = true,
		SYS_SUBCHK = false,
		SYS_FLOATLEN = 4,
		SYS_AMTLEN = 2,
		SYS_RATELEN = 6,
		SYS_DATESPLIT = "-",
		// [Bugfree_2270_���ȿ���]_B fanr 2014-01-28
		SYS_AMTMAXLENG = 18,
		SYS_AMTMAXINTLENG = 15,
		SYS_AMTMAXSIZE = 23,
		SYS_RATEMAXLENG = 13,
		SYS_RATEMAXINTLENG = 6,
		SYS_RATEMAXSIZE = 14,
		// [Bugfree_2270_���ȿ���]_E fanr 2014-01-28
		SYS_DATEFORMAT = "YYYYMMDD",
		SYS_FORMATFLAG = true,
		SYS_CURTIME,
		SYS_HAVECHECK = true,
		SYS_EXECUTEQUERY_DATA = new Array(),
		SYS_SETSWIFTTAG =false,
		Mask = new Array(),
		MaxLen = new Array(),
		FIXED_COLOR = "#DDA0DD",
		FIXED_STYLE = "BACKGROUND",
//		SYS_NUM_ERR  =  " Input number error, Please check it!",
//		SYS_DATE_ERR =  " Input date error, Please check it!",
//		SYS_HOLIDAY_ERR =   " The date you use is holiday, Please check it!",
//		SYS_HOLIDAY_WARNING=" The date you use is holiday, Are you ignore?",
//		SYS_MUST_ERR =  " The field cann't be empty, please check it!", 
//		SYS_TOOLONG  =  " The field length is too long, please check it!",
//		SYS_ROWTOOLONG= " The field row is too long, please check it!",
//		SYS_TOOSHORT =  " The field length is too short, please check it!",
//		SYS_MAX_ERR  =  " The field length is too large, please check it!",
//		SYS_MIN_ERR  =  " The field length is too small, please check it!",
//		SYS_MASK_ERR =  " The filed value doesn't match its mask, please check it!",
//		SYS_SWIFT_ERR = " The filed value has some letter that SWIFT doesn't allow, please check it!",
//		SYS_TEXT_ERR  = " The input line is not correct, please check it!",
		
		//--mod by xh @20120806 for ��������ʾ��Ϣ����--begin--
		SYS_NUM_ERR  =  " �������������,��˲�!",
		SYS_DATE_ERR =  " �������������,��˲�!",
		SYS_HOLIDAY_ERR =   " ��ѡ����ǽڼ���, ��˲�!",
		SYS_HOLIDAY_WARNING=" ��ѡ����ǽڼ���, �Ƿ����?",
		SYS_MUST_ERR =  " ��λ����Ϊ��, ��˲�!", 
		SYS_TOOLONG  =  " ��λ���ȹ���, ��˲�!",
		SYS_ROWTOOLONG= " ��λ��������, ����!",
		SYS_TOOSHORT =  " ��λ���ȹ���, ��˲�!",
		SYS_MAX_ERR  =  " ��λ���ȹ���, ��˲�!",
		SYS_MIN_ERR  =  " ��λ���ȹ�С, ��˲�!",
		SYS_MASK_ERR =  " The filed value doesn't match its mask, please check it!", // �޵ط�����,���躺��
		SYS_SWIFT_ERR = " ��λ���в�����Swift�淶����ĸ, ��˲�!",
		SYS_TEXT_ERR  = " The input line is not correct, please check it!", // �޵ط�����,���躺��
		//--mod by xh @20120806 for ��������ʾ��Ϣ����--end--
		SYS_AMT_TOOLONG_ERR = "���������λ̫�� ", // [Bugfree_2270_���ȿ���] fanr 2014-01-28
		debugInformation = "",
		ErrorMsgList = new Array(),
		oldFieldValue =new Array(),
		FieldMidified = new Array(),
		LastFieldValue = new Array(),
		disableFiled = new Array(),
		CCY_FIELD = new Array(),
		SYS_SETSWIFTTAG =false,
		errorHash,
		remarksHash={},
		MOPS = ["M", "O", "P"],
		UTANTYPES = ["CHAR", "AMT", "RATE", "FLOAT", "INT", "DATE", "TEXT", "KEY"],
		__LOOKUP_CLEAR_FUN = {}//��̬��Ӵ洢����lookup����ֶεĺ�����
;
// Bugfree_2139_[��������]�����뱨�ֶ�P��� fanr 2013-12-17
var SYS_DEMERGEMSGFIELDS_PROTECT = true; // �Ƿ����ò��ֶα�������,Ĭ������

try {
  errorHash = new HashMap(); //add by lzy
}catch(e){}

function addDebugInformation(){
    
}

function setProtect(obj){
    setProperty(obj,"P");
}

function setProperty(obj,property){
	// ����ĸĶ���[Bugfree_1940_IE10�£���ѯ��ť�޷��ҵ�]�޹�,���ñ��
	if( !obj || !property) return;
	if(typeof obj === "string"){
    	obj = document.UTFORM[obj];
    	return arguments.callee(obj, property);
	}
	//FINWARE_WZCB_2013-10-18  ���ˡ���Ȩʱ������ΪM����ʹ����setPropertyҲ����Ч  begin wt
	var currInputType = __CURR_INPUT_TYPE;
	if( ("RELEASE" === currInputType ||  "AUTH" === currInputType)  && "M" === property   ){
		if( "OK" !== obj.getAttribute('doubleFlag') ){	//˫������Ҫִ�к�������
			return;
		}
	}
	//FINWARE_WZCB_2013-10-18  ���ˡ���Ȩʱ������ΪM����ʹ����setPropertyҲ����Ч  end wt
    var $obj = $(obj);
    property=property.toUpperCase();
    if( $.inArray(property, MOPS) === -1) return;
    $obj.removeClass(MOPS.join(" ")).addClass(property);
    var type = getType(obj);
    if(property=="P"){
        if( type=="textarea" || type=="text" || type=="hidden"){
            obj.readOnly=true;
        }else{
            obj.disabled=true;
        }
        deleteErrorMsg(obj);
        // �ɲ�ѯ�ֶκ�����Ӳ�ѯ��ť]_B yangcl 2015-1-6
        var SYS_SHOW_FIELD_LOOKUPBUTTON = $("#SHOW_FIELD_LOOKUPBUTTON").val();
        if(SYS_SHOW_FIELD_LOOKUPBUTTON=='Y'){
	        $("#" + obj.id + "_LOOKUPBUTTON").hide();
	        $("#" + obj.id + "_CLAUSEBUTTON").hide();
        }
        // �ɲ�ѯ�ֶκ�����Ӳ�ѯ��ť]_E yangcl 2015-1-6
    }else{
        if( type == "textarea" || type == "text" || type=="hidden"){
            obj.readOnly=false;                 
        }else{
            obj.disabled=false;
        }
         // [FRATHF_00007_�ɲ�ѯ�ֶκ�����Ӳ�ѯ��ť]_B yangcl 2015-1-6
        var SYS_SHOW_FIELD_LOOKUPBUTTON = $("#SHOW_FIELD_LOOKUPBUTTON").val();
        if(SYS_SHOW_FIELD_LOOKUPBUTTON=='Y'){
	        $("#" + obj.id + "_LOOKUPBUTTON").show();
	        $("#" + obj.id + "_CLAUSEBUTTON").show();
        }
        // [FRATHF_00007_�ɲ�ѯ�ֶκ�����Ӳ�ѯ��ť]_E yangcl 2015-1-6
    }

     // ��Է�����������⴦�� add by fanrui 20121019 ��ʼ
    
    if( obj.getAttribute && obj.getAttribute("selectToText") && obj.getAttribute("selectToText").substring(0,3)==="YES" ){
    	var tObj = $("#" + obj.id + "_selectToText")[0];
    	if(!tObj) return;
    	if(property==="P"){
    		$(obj).show();
    		$(tObj).hide();
    	} else {
    		$(obj).hide();
    		$(tObj).show();
    	}
    	setProperty(tObj, property); // [FRATHF_00002_��ɷ�������δ��ɵĹ���] fanr 2013-11-08
    }
    // ��Է�����������⴦�� add by fanrui 20121019 ����
}


function saveOldField(){
    var form=document.UTFORM;
    var length=form.elements.length;
    for( var i=0;i<length;i++){
        {
        	var el = form.elements[i];
            var value=el.value;
            var name=el.name;
            oldFieldValue[name]=getFieldValue(el);
        }
    }
}

function isSubmited(){
    if(document.UTFORM["SUBMIT_ALREADY"]==null) return false;
    var flag=getFieldValue(document.UTFORM.SUBMIT_ALREADY);
    if( flag=="YES" ) {Format(document.UTFORM);return true;}
    else return false; 
}


function chgErrorFlag(obj){
	if($('#'+obj.id).attr('special')=='true') return;
	if(!obj || !obj.id || !obj.name) return;
	var $obj = $(obj);
	var thisId = obj.id;
	if(getErrModifyStyle(obj, "EE") && !getErrModifyStyle(obj, "MM")) {
		setErrMoidfyStyle(obj, "EE", false);
		setErrMoidfyStyle(obj, "MM", false);
        if(obj.value=="") removeFixedFieldStyle(obj);
    }else{
        var txt = "";
        var value = ErrorMsgList[thisId] || "";
        txt = window.prompt("�������޸Ľ���!",value);
        if(txt){
        	setErrMoidfyStyle(obj, "MM", false);
        	setErrMoidfyStyle(obj, "EE", true);
        	if(obj.value=="") setFixedFieldStyle(obj);
        	ErrorMsgList[thisId] = txt;
        } else {
        	setErrMoidfyStyle(obj, "EE", false);
        	setErrMoidfyStyle(obj, "MM", false);
            if(obj.value=="") removeFixedFieldStyle(obj);
        }
    }
}

/**
 * ҳ���ʼ��֮�����
*/
function prepareObjProperty(){
    setCommentInfo();
    setFormDoubles();
    setClauseHistoryInfo(); // [Bugfree_2205_��������,�ݴ棬�����޸ĺ����ֵ����] fanr 2014-01-09
}

/**
 * ����ҳ��������ע
*/
function setCommentInfo(){
	var errorflds,errormsgs,fixedflds;
    if(document.UTFORM["ERRORMSGS"]!=null) errormsgs = document.UTFORM["ERRORMSGS"].value;
    if(document.UTFORM["ERRORFLDS"]!=null) errorflds = document.UTFORM["ERRORFLDS"].value;
    if(document.UTFORM["FIXEDFLDS"]!=null) fixedflds = document.UTFORM["FIXEDFLDS"].value;
    if(errormsgs==null) errormsgs = "";
    if(errorflds==null) errorflds = "";
    if(fixedflds==null) fixedflds = "";
    var errorfldlist = errorflds.split("|#");
    var msglist = errormsgs.split("|#");
    var fixedfldlist = fixedflds.split("|#");
    var sClass = "";
    if(errorfldlist.length>0) {
        for(var ii=0; ii<errorfldlist.length; ii++) {
            var objId = errorfldlist[ii];
            if(!objId) continue;
            var obj = document.UTFORM[objId];
            if(!obj) continue;
            setErrMoidfyStyle(obj, "EE", true);
            if(obj.value=="") setFixedFieldStyle(obj);
            obj.title = obj.title + "\r\n" + msglist[ii];
            ErrorMsgList[objId] = msglist[ii];
        }
        
    }
    if(fixedfldlist.length>0){
        for(var ii=0; ii<fixedfldlist.length; ii++){
            var objId = fixedfldlist[ii];
            if(!objId) continue;
            var obj = document.UTFORM[objId];
            if(!obj) continue;
            setErrMoidfyStyle(obj, "MM", true);
        }
    
    }
}
/*
 *  getFieldValue()
 */

function getFieldValue(obj){
	if(typeof obj === "string"){
    	obj = document.UTFORM[obj];
    	return arguments.callee(obj);
    }
    if(!obj) return "";
    if(obj.type==null) return "";
    
    var $obj = $(obj);
    if(obj.type.toUpperCase().substring(0,6)=="SELECT") return obj.value;
    if(obj.type.toUpperCase()=="CHECKBOX"){
        if(obj.checked){ 
        	return "YES";
        } else {
        	return "NO";
        }
    }
    
    if($obj.hasClass("AMT") || $obj.hasClass("RATE") || $obj.hasClass("FLOAT") || $obj.hasClass("INT")){
        return getAmtValue(obj);
    } else if ($obj.hasClass("DATE")) {
        return getDateValue(obj);
    } else {
    	return obj.value;
    }
} 

/*
 * getAmtValue()
 */

function getAmtValue(obj){
    var str = obj.value;
    if(!str) return 0;
    return FormatStr2Amt(str);
}
/*
 * getDateValue()
 */
function getDateValue(obj){
    var str = obj.value;
    return Str2Date(str);
    //return str;
}

/*
 * unFormat():
 */
function unFormat(tform){
    var form = document.UTFORM;
    if(document.UTFORM["SUBMIT_ALREADY"]!=null)
    document.UTFORM.SUBMIT_ALREADY.value="YES";
    addDebugInformation("--unFormat()-----" );
    var i=0;
    var sClass="";
    if(document.UTFORM["ERRORMSGS"]!=null) document.UTFORM["ERRORMSGS"].value="";
    if(document.UTFORM["ERRORFLDS"]!=null) document.UTFORM["ERRORFLDS"].value="";
    if(document.UTFORM["FIXEDFLDS"]!=null) document.UTFORM["FIXEDFLDS"].value="";
    var errormsg = "";
    var errorflds = "";
    var fixedflds= "";
    var s = '';
    var checkxmlvalue ="<?xml version=\"1.0\" encoding=\"GB2312\" standalone=\"yes\"?><root>";

    var taskInputType = "";
    try{
       taskInputType = $('#CURR_TASKTYPE').get(0).value;
    }catch(e){
        taskInputType = "";
    }
    disableFiled = new Array();   
    for(i=0;i<form.elements.length;i++){
        var obj = form.elements[i]; 
        var $obj = $(obj);
        if(obj.type==null) continue; 
        if(obj.disabled){
            if( obj.type==="button") continue;
            obj.disabled = false;
            var disableLen  = disableFiled.length;
            disableFiled[disableLen] = obj;
        }
        if(obj.type.toUpperCase()=="CHECKBOX"){
            if(obj.checked) checkxmlvalue += "<" + obj.name + ">YES</" + obj.name + ">";
            else checkxmlvalue += "<" + obj.name + ">NO</" + obj.name + ">";
            if(obj.checked)
                obj.value = 'YES';
            else obj.value = 'NO';
        }else if(obj.type.toUpperCase()=="RADIO"&& obj.disabled){
            if(obj.checked) checkxmlvalue += "<" + obj.name + ">" + obj.value + "</" + obj.name + ">";
        }else if(obj.type.substring(0,6).toUpperCase()=="SELECT"&& obj.disabled){
            checkxmlvalue += "<" + obj.name + ">" + obj.value + "</" + obj.name + ">";
        } 
        
        if($obj.hasClass("AMT") || $obj.hasClass("RATE") || $obj.hasClass("FLOAT")){
           unFormatAmt(form.elements[i]);
        }
        
        else if($obj.hasClass("DATE")) {
            unFormatDate(form.elements[i]);
        }
        if(getErrModifyStyle(obj, "EE")){
            errorflds = errorflds + "|#" + obj.name;
            if(ErrorMsgList[obj.name]==null) ErrorMsgList[obj.name] = "";
            errormsg = errormsg + "|#" + ErrorMsgList[obj.name];
        }
        if(getErrModifyStyle(obj, "MM")){
            fixedflds = fixedflds + "|#" + obj.name;
        }
    }
    if(document.UTFORM["ERRORMSGS"]!=null) document.UTFORM["ERRORMSGS"].value=encodeURI(errormsg);
    if(document.UTFORM["ERRORFLDS"]!=null) document.UTFORM["ERRORFLDS"].value=errorflds;
    if(document.UTFORM["FIXEDFLDS"]!=null) document.UTFORM["FIXEDFLDS"].value=fixedflds;
    SYS_CURTIME=new Date();
    return true;
}


/*
 * unFormatDate()
 */

function unFormatDate(obj){
    addDebugInformation("--unFormatDate()-----" + obj.name + "--  value:" + obj.value);
    var tmpStr=obj.value;
    if(tmpStr==null||tmpStr=="") return;
    var dVal = Str2Date(tmpStr);
    obj.value = Date2Str(dVal);
}

/*
 * unFormatAmt()
 */

function unFormatAmt(obj){
    var Declen = SYS_DECLEN;   
    var $obj = $(obj);
    if( getDecLen(obj) !== false ){
    	Declen = getDecLen(obj);
    } else {
	    var ccyFld = $(obj).attr("ccy");
	    if(ccyFld){
		    if( ccyFld.indexOf("@") == 0 ){
		        var ccyValue = ccyFld.substring(1);
		        Declen=DECIMALLEN[ccyValue.toUpperCase()];
		    } else {
		        var ccy = $('#'+ccyFld).get(0);
		        ccy && ( ccyValue = ccy.value ) && ( Declen = DECIMALLEN[ccyValue.toUpperCase()] );
		    }
		    
		 
	    }
    }
    if($obj.hasClass("RATE")){
	    Declen = getDecLen(obj) === false?SYS_RATELEN:getDecLen(obj);
    }
    if($obj.hasClass("FLOAT")){
	    Declen = getDecLen(obj) === false?SYS_FLOATLEN:getDecLen(obj);
    }
    
    var tmpStr=obj.value;
    if(tmpStr!='') {
        if(obj.getAttribute("bop") && obj.getAttribute("bop").toUpperCase()=='YES')
        	Declen = 0;
        if(obj.getAttribute("intamt") && obj.getAttribute("intamt").toUpperCase()=='YES')
            Declen = 0;
        tmpStr = FormatStr2Amt(tmpStr);
        tmpStr = Num2Str(tmpStr,Declen);
        obj.value = tmpStr;
    }
    
}

/*
 * Format()
 */
function setFormatFlag(bFlag) {
    SYS_FORMATFLAG = bFlag;
}

function Format(tform) {
    if(!SYS_FORMATFLAG) return ;
    var newTime = new Date();
    if(document.UTFORM["SUBMIT_ALREADY"]!=null)
    	document.UTFORM.SUBMIT_ALREADY.value="YES";
    addDebugInformation("--Format()-----");
    form = document.UTFORM;
    for(var i=0,length=form.elements.length; i<length; i++){
        var tmpobj = form.elements[i];
        FormatObj(tmpobj);
    }
}

// add by fr for check holidays

function checkIsHolidayForMy97(dp,P_SYSID){
	var holidaysJSON = UtanGlobalCache("holiday").get();
	//���û��ά���κνڼ�����Ϣ�����ccyû��ά������У���Ƿ�Ϊ�ڼ���    modify by wulei at 2012-01-11
	if (isEmptyObject(holidaysJSON) || isEmptyObject(holidaysJSON[P_SYSID])) return true;
	
    var tmpDateStr = dp.cal.getNewDateStr();
    var tmpTime = dateStr2time(tmpDateStr);
    var tmpDate = new Date(parseInt(tmpTime));
    if( tmpDate.getDay() == 0 || tmpDate.getDay() == 6){
        var weekend = holidaysJSON[P_SYSID].HOLIDAYSWEEKEND;  
        var weekendArr = weekend.split(",");
        if( $.inArray(""+tmpTime, weekendArr) == -1 ){
            if( !confirm("��ѡ����һ�����ڣ���ȷ����") ){
                return false;
            }
        }
        
    } else {
        var workday = holidaysJSON[P_SYSID].HOLIDAYSWORKDAY;
        var workdayArr = workday.split(",");
        if( $.inArray(""+tmpTime,workdayArr) > -1 ){
            if( !confirm("��ѡ����һ�����ڣ���ȷ����?") ){
                return false;
            }
        }
        
    }
    
    return true;
}

function reField_onReady(obj){
	var _$obj = $(obj).clone();
	field_onReady(_$obj[0]);
	$(obj).replaceWith(_$obj);
}

function clearEvent(obj){
	var _obj = obj.cloneNode(true);
	_obj.removeAttribute("onchange");
	$(obj).replaceWith(_obj);
	return _obj;
}

function context_onReady(context){
	var currTaskType = __CURR_TASK_TYPE;
	var currInputType = __CURR_INPUT_TYPE;
	
	if( currTaskType==="HISTORY" || currInputType==="INQUIRE" || currInputType==="EVENTVIEW" || currInputType==="DELETE"){
		arguments.callee = function(context){
			if(!context) return;
			var dealFun = function(){
				var obj = this;
				var $obj = $(this);
				if( !$obj.hasClass('linkbutton') && !$obj.hasClass('menubutton') ) setRorD(obj);
			};
			if(context===document){ // ������Ϊ���Ż��ٶ�
				$.each(document.UTFORM.elements, dealFun);
			} else {
				$(":input", context).each(dealFun);
			}
		};
	} else if(currInputType === "ADD" || currInputType === "FIXPENDING"){ // ��дADD��context_onReady,�ݴ�Ҳ���ڴ���
		arguments.callee = function(context){
			if(!context) return;
			var dealFun = function(){
				field_onReady(this);
			};
			if(context===document){ // ������Ϊ���Ż��ٶ�
				$.each(document.UTFORM.elements, dealFun);
			} else {
				$(":input", context).each(dealFun);
			}
		};
	} else if( currInputType === "RELEASE" || currInputType === "AUTH"){
		arguments.callee = function(context){
			if(!context) return;
			var dealFun = function(){
				var obj = this;
				var $obj = $(this);
				if(obj.getAttribute('doubleFlag') === 'YES'){
					field_onReady(this);
				} else {
					if( !$obj.hasClass('linkbutton') && !$obj.hasClass('menubutton') ) setRorD(obj);
				}
			};
			if(context===document){ // ������Ϊ���Ż��ٶ�
				$.each(document.UTFORM.elements, dealFun);
			} else {
				$(":input", context).each(dealFun);
			}
		};
	} else if( currInputType === "EDIT" ){
		arguments.callee = function(context){
			if(!context) return;
			var dealFun = function(){
				field_onReady(this);
			};
			if(context===document){ // ������Ϊ���Ż��ٶ�
				//add by xh for ҳ������protect���� ҳ���ʼ����ʱ���ж�ҳ���ֶ�PAGEPRIMARYKEY�Ƿ���ֵ
				// modify by fr ��pageViewBuilderǨ������
				var primaryKey = $("#__PAGEPRIMARYKEY").val();
				if(primaryKey){
					setProtect($("#"+primaryKey)[0]);
				}
				$.each(document.UTFORM.elements, dealFun);
			} else {
				$(":input", context).each(dealFun);
			}
		};
	} else {
		arguments.calle = function(){
			return;
		};
	}
	arguments.callee(context);
}

function field_onReady(obj) {
    if( !obj || !obj.id ) return;
    var $obj = $(obj);
    if($obj.hasClass("linkbutton") || $obj.hasClass("menubutton")){
        return;
    }

    
    if( obj.getAttribute("lookup") || obj.getAttribute("lookupFire") || obj.getAttribute("accInquire") ||  obj.getAttribute("custInquire") || obj.getAttribute("custInquireFire") ){
        if( $(obj).hasClass("P") ){
        } else {
        	// �ɲ�ѯ�ֶκ�����Ӳ�ѯ��ť]_B yangcl 2015-1-6
        	var SYS_SHOW_FIELD_LOOKUPBUTTON = $("#SHOW_FIELD_LOOKUPBUTTON").val();
        	if(SYS_SHOW_FIELD_LOOKUPBUTTON=='Y'){
	        	$obj.after("<button type='button' id='"+obj.id+"_LOOKUPBUTTON' onclick=\"$('#"+obj.id+"').focus();$('#LOOKUP').click();\">&nbsp;...&nbsp;</button>");
	        	if(getMOP(obj)==="P"){
	        		$("#" + obj.id + "_LOOKUPBUTTON").hidden();
	        	}
        	}
            // �ɲ�ѯ�ֶκ�����Ӳ�ѯ��ť]_E yangcl 2015-1-6
            $(obj).each(autoPopupWindow);
        }
    }
   // �ɲ�ѯ�ֶκ�����Ӳ�ѯ��ť]_B yangcl 2015-1-6
   if( obj.getAttribute("clauseType") ){
        if( $(obj).hasClass("P") ){
        } else {
        	var SYS_SHOW_FIELD_LOOKUPBUTTON = $("#SHOW_FIELD_LOOKUPBUTTON").val();
        	if(SYS_SHOW_FIELD_LOOKUPBUTTON=='Y'){
	        	$obj.after("<button type='button' id='"+obj.id+"_CLAUSEBUTTON' onclick=\"$('#"+obj.id+"').focus();$('#CLAUSE').click();\">&nbsp;...&nbsp;</button>");
	        	if(getMOP(obj)==="P"){
	        		$("#" + obj.id + "_CLAUSEBUTTON").hidden();
	        	}
        	}
            $(obj).each(autoPopupWindow);
        }
    }
    // �ɲ�ѯ�ֶκ�����Ӳ�ѯ��ť]_E yangcl 2015-1-6
   
    // for textarea magnify
//    if(obj.type === "textarea" && obj.getAttribute("magnify") === "yes" ){
//        $obj.after("<img src='/UtanWeb/images/zoomPlus.png' onclick=\"showMagnify('"+obj.id+"')\" />");
//    }
    
    // for upLowerLock
//    if( obj.getAttribute("letterCase") ){
//        $obj.each(function(){
//            upperLowerLock.on(this, $(this));
//        });
//    }

    if( obj.getAttribute("selectToText") && obj.getAttribute("selectToText").toUpperCase().substring(0,3) == 'YES' ){
        	parseSelectToText(obj);
    }
    
    if( $obj.hasClass("P") || $obj.attr("justLookup")==="YES"){ //[Bugfree_892_(���)(�Ż�)"����֤���"�����] fanr 2013-10-16
    	setRorD(obj);
    	// justLookupֵ�������_B add by fanr 2015-02-02
    	if($obj.attr("justLookup")==="YES"){
    		$obj.keyup(function(event){
    			if(event.keyCode==8 || event.keyCode==46){
    				setFieldValueFire(this, "");
    			}
    		});
    	}
    	// justLookupֵ�������_E add by fanr 2015-02-02
    }
    
    if( $obj.hasClass("DATE") ){
    	if( obj.getAttribute("nowDate") && obj.getAttribute("nowDate").toUpperCase() == 'YES'){
    		obj.value = curDateTime();
    	}
    }
    
    // [Bugfree_2270_���ȿ���]_B fanr 2014-01-28
    //add by wulei for fix amt length 15 Number can input [+-,.n]
//    if ($obj.hasClass("AMT") || $obj.hasClass("INT") ||$obj.hasClass("FLOAT")) {
//    	$obj.attr("maxlength",SYS_AMTMAXLENG);
//    	if ($obj.hasClass("AMT")) $obj.attr("size",SYS_AMTMAXSIZE);
//    	$obj.attr("charRule","n,[+],[-],[,],[.]");
//    }
//    
//    if ($obj.hasClass("RATE")) {
//    	$obj.attr("maxlength",SYS_RATEMAXLENG);
//    	$obj.attr("size",SYS_RATEMAXSIZE);
//    	$obj.attr("charRule","n,[.]");
//    }
    // [Bugfree_2270_���ȿ���]_E fanr 2014-01-28
}

function dealClauseType(){
    $(this).bind("focus", function(){
            $('#CLAUSETYPE').val(this.getAttribute("clauseType"));
            $('#CLAUSEFIELD').val(this.id);
            $('#CLAUSE').attr("disabled", false);
    });
    $(this).each(addSpecialCss);
}

function FormatObj(obj) {
    if(!SYS_FORMATFLAG) return;
    if(!obj.id) return;
    var $obj = $(obj);
    if(obj.value == null || obj.value.length==0) return;
    if(obj.type == null || obj.type=="") return; 
    if(obj.type === "radio") return;
    if(obj.type === "hidden") return;
    if(obj.type === "button") return; 
    if(obj.type.substring(0,6) ==="select") return;
    if(obj.type === "checkbox"){
        if(obj.checked)
            obj.value = 'YES';
        else obj.value = 'NO';
        return;
    }
    
    
    var taskInputType = $('#CURR_TASKTYPE').val();
    var sysTaskType = $('#SYS_TASK_TYPE').val();
    var sClass=obj.className;
    if(sClass.length>7){
        var pt = sClass.indexOf("__");
        sClass = sClass.substring(0,pt);
    }
    var oldValue = oldFieldValue[obj.name];
    var objValue = obj.value;

    if($obj.hasClass("AMT")){
        if(oldValue!=null && oldValue!=0 && trimAll(objValue).length==0)
        obj.value="0";
        FormatAmtByCur(obj);

    }else if($obj.hasClass("INT")){
        if(oldValue!=null && oldValue!=0 && trimAll(objValue).length==0)
        obj.value="0";
        FormatInt(obj);

    }else if($obj.hasClass("RATE")){
        if(oldValue!=null&&oldValue!=0&&objValue.length==0)
        obj.value="0";
        FormatRate(obj);            

    }else if($obj.hasClass("DATE")) {
        FormatDate(obj);   
    }else if($obj.hasClass("FLOAT")){
        FormatFloat(obj);     
    }
    // [Bugfree_892_(���)(�Ż�)����֤��������] ɾ����changeClauseInfo(obj)����,�������ﲻ����,
}

/*
 * FormatAmtByCur()
 */
function FormatAmtByCur(obj){
    if(!SYS_FORMATFLAG) return;
    var objval=Trim(obj.value);
    var flag = objval.charAt(0);
    var name = obj.name;
    var form = document.UTFORM;
    var nLen = form[name].length;
    if(flag=="+" || flag =="-") objval =  objval.substring(1);      
    else flag = "";
    if(objval.length==0){ obj.value = ""; return true;}    
    var Declen = SYS_DECLEN;
    if(getDecLen(obj) !== false){
    	Declen = getDecLen(obj);
    } else {
	   	var ccyFld = $(obj).attr("ccy");
	    if(ccyFld){
		    if( ccyFld.indexOf("@") == 0 ){
		        var ccyValue = ccyFld.substring(1);
		        Declen=DECIMALLEN[ccyValue.toUpperCase()];
		    } else {
		        var ccy = $('#'+ccyFld).get(0);
		        ccy && ( ccyValue = ccy.value ) && ( Declen=DECIMALLEN[ccyValue.toUpperCase()] );
		    }
	    }
    }
    if( !Declen === undefined ){
    	Declen = SYS_DECLEN;
    }
    if(obj.getAttribute("bop") && obj.getAttribute("bop").toUpperCase()=='YES')
    	Declen = 0;
   	if(obj.getAttribute("intamt") && obj.getAttribute("intamt").toUpperCase()=='YES')
        Declen = 0;
    objval = FormatStr2Amt(objval);
    objval = Amt2FormatStr(objval,Declen);
    obj.value = flag+ objval;   
    return true;
}

function FormatAmtByCCY(fAmt, sCCY){
    if(!SYS_FORMATFLAG) return ;
    var Declen = SYS_DECLEN;
    if(DECIMALLEN[sCCY]!=null) Declen =DECIMALLEN[sCCY];
    var ret = Amt2FormatStr(fAmt,Declen);
    return ret;
}

/*
 * FormatInt()
 */

function FormatInt(obj){
    if(!SYS_FORMATFLAG) return ;
    var objval=Trim(obj.value);
    var flag = objval.charAt(0);
    if(flag=="+" || flag =="-") objval =  objval.substring(1);      
    else flag = "";
    if(objval.length==0){ obj.value = ""; return true;}
    var iValue = parseInt(objval);
    
    obj.value = flag+ iValue.toString();
    return true;
}


/*
 * FormatRate()
 */

function FormatRate(obj){  
	var $obj = $(obj);
	if(!SYS_FORMATFLAG) return ;
	var objval=Trim(obj.value);
	var fValue = FormatStr2Amt(objval);
	var Declen ;
    Declen = getDecLen(obj) === false?SYS_RATELEN:getDecLen(obj);
	objval = Num2Str(fValue,Declen);
	obj.value = objval;
	return true;
}

function FormatFloat(obj){
    if(!SYS_FORMATFLAG) return ;
    var objval=Trim(obj.value);
    var fValue = FormatStr2Amt(objval);
    var Declen = getDecLen(obj) === false?SYS_FLOATLEN:getDecLen(obj);
    objval = Num2Str(fValue,Declen);
    obj.value = objval;
    return true;
}

/*
 * FormatDate()
 */

function FormatDate(obj){
    if(!SYS_FORMATFLAG) return ;
    addDebugInformation("--FormatDate()-----" + obj.name + "   value:" + obj.value);
    var tmpvalue=Trim(obj.value);
    
    if(tmpvalue.length==0)  return true;
    
    //add by tiger at 2009/1/14
    if(tmpvalue == 'null') 
        obj.value = '';
    var dateFormat = obj.getAttribute("DateFormat");
    if (dateFormat=="yyyyMM"){
    	obj.value = tmpvalue;
    }else{
    var dValue = Str2Date(tmpvalue);
    var sValue = Date2Str(dValue);
    obj.value = sValue?sValue:"";
    }
    return true;
}

function curDateTime(){
    return getSysDate();
}

/**
 * 
 * checkCharRule()
 */

function checkCharRule(obj){ // У��
	var fieldValue = obj.value;
	if(!fieldValue) return true;
	var ruleAttrs = obj.getAttribute("charrule");
	var ruleAttrArr = ruleAttrs.split(",");
	var patternStr = "";
	
	for(var i=0,length=ruleAttrArr.length; i<length; i++){
		var aRule = ruleAttrArr[i];
		aRule = $.trim(aRule);
		if(!aRule) continue;
		if(aRule.charAt(0)==="[" && aRule.charAt(aRule.length - 1)==="]"){
			// �������д���˳���ܵߵ�
			aRule = aRule.replace(/^\[/g, "").replace(/\]$/g, ""); // ȥ����ͷ�ͽ�β[]����
			aRule = aRule.replace(/\\/g,"\\\\"); // ת��ת���\
			aRule = aRule.replace(/]/g,"\\]"); // ��ֹ]���ƻ�ԭ�ӷ�
			patternStr += aRule;
		} else if( aRule in CHAR_RULES){
			patternStr += CHAR_RULES[aRule];
		} else {
			// do nothing	
		}
		
	}
	var reversePattern = new RegExp("[^"+patternStr+"]");
	var position = fieldValue.search(reversePattern);
	if(position !== -1){
		tmpChangeInfo.errorMsg += ("[" + obj.title + ":" + obj.name + "]" + "����λ����������ַ� [" + fieldValue.charAt(position) + "],λ��[" + position + "]!");
        setFocus(obj);
        setSelection(obj, position, position+1);
        return false;
	}
	return true;
}

//add by wt 2012-7-27 ����������ʽУ��
function checkRegex(obj){ // У��
	var fieldValue = obj.value;
	if(!fieldValue) return true;
	var regexRule = obj.getAttribute("regexRule");
 	
	var regex;
	if(regexRule in REGEX_RULES ){
		regex  = REGEX_RULES[regexRule];
	}else{
		regex = regexRule;		//��������ֱ��Ϊ������ʽ
	}
	
	var pattern = new RegExp("^"+regex+"$" , "g" );	//ȫ��ƥ��
	
	var result = fieldValue.match(pattern) ;
	if(result == null ){
		if(regexRule=="0.01-1.00"){
		tmpChangeInfo.errorMsg += ("[" + obj.title + ":" + obj.name + "]" + "ֵ������" + regexRule +"��ʽ��ע�Ᵽ����λС����");	
		}else{
		tmpChangeInfo.errorMsg += ("[" + obj.title + ":" + obj.name + "]" + "ֵ������" + regexRule +"��ʽ");
		}
        setFocus(obj);
		return false;
	}
	return true;
}

function checkCharBehindTrim(obj){
	//add by wulei  �����ֶβ���������
	if (obj.type && obj.type == "hidden") return true;
	
	var fieldValue = obj.value;
	if (!fieldValue) return true;
	
	var realValue = $.trim(fieldValue);
	if (obj.tagName ==="TEXTAREA" ) {
		if ("noteContent" == obj.id) {
			realValue = realValue.replace(/<br \/>/g,"");
			realValue = realValue.replace(/&nbsp;/g,"");
			realValue = realValue.replace(/<p>/g,"");
			realValue = realValue.replace(/<\/p>/g,"");
			realValue = realValue.replace(/\r\n/g,"");
			realValue = $.trim(realValue);
		}
		if (realValue.length === 0) {
			tmpChangeInfo.errorMsg += ("[" + obj.title + ":" + obj.name + "]" + "����λ������ֻ����հ׷�(����ֻ����ո�س���) !");
			setFocus(obj);
	        return false;
		}
	} else if (obj.tagName === "INPUT" && (obj.type==="text" || obj.type === "password")) {
		if (realValue.length != fieldValue.length) {
			tmpChangeInfo.errorMsg += ("[" + obj.title + ":" + obj.name + "]" + "����λǰ�����˽�ֹ����հ׷� !");
			setFocus(obj);
	        return false;
		}
	}
	return true;
}

function CheckAll(form) {
    if( !SYS_HAVECHECK )return true;
    window.tmpChangeInfo = {
        id:"",
        errorMsg:""
    };
    var i=0;
    var sClass=""; 
    var retValue;
    SYS_SUBCHK = true;
    for(i=0;i<form.elements.length;i++){
        retValue = CheckFld(form.elements[i]);
        if (!retValue) {
            setFocus(form.elements[i]);
            return false;
        }
    }
    SYS_SUBCHK = false;
    return true;
}

/*
 * CheckFld()
 */

function CheckFld(obj){
    if( !SYS_HAVECHECK ) return true;
    var $obj = $(obj);
    var thisType = getType(obj);
    if(!thisType){
    	return true;
    }
    addDebugInformation("--CheckFld()-----" + obj.name);
    if( obj.getAttribute("swift") ){
        if(!checkSwiftField(obj)){
            return false;
        }
    }
    
    //�ַ�����ͷ�ո�У��   �س�����У��
    if(!checkCharBehindTrim(obj)){
		return false;
	}

    //�����ַ�����У��
    if( obj.getAttribute("charRule") &&CHAR_RULES){
    	if(!checkCharRule(obj)){
    		return false;
    	}
    }
    
     //������ʽУ��
    if( obj.getAttribute("regexRule") ){
    	if(!checkRegex(obj)){
    		return false;
    	}
    }
        
    var sClass=obj.className;
    if(!sClass) return true;
    if(sClass.length>7){
        var pt = sClass.indexOf("__");
        sClass = sClass.substring(0,pt);
    }
    if( thisType === "checkbox") return true;
    

    if(($obj.hasClass("M")) && SYS_SUBCHK){
        var tmpval=obj.value;
        if(!tmpval){
            var defaultAlertStr = getFieldDescription(obj) + SYS_MUST_ERR; // [Bugfree_2268_��ʾ��ʾtitle] wulei 2014-02-10
            var mustSuggest = "";
            if(obj.getAttribute("mustSuggest")){
            	var mustSuggest = obj.getAttribute("mustSuggest");
            }
            alert(defaultAlertStr + "\n" + mustSuggest);
            setFocus(obj);
            SYS_SUBCHK = false;
            return false;
        }
    }
    
    if( thisType.substring(0, 6)  === "select") return true;
    if( !checkLength(obj) )     return false;
    if( !checkNumber(obj) )     return false;
    if( !checkDateFld(obj) )    return false;
    if( !checkMinMax(obj) ) return false;
    return true;

}

// [Bugfree_2268_��ʾ��ʾtitle]_B wulei 2014-02-10
function getFieldDescription(obj){
	var fieldName = $(obj).parent('td').prev('td').text();
  	fieldName = obj.title ? obj.title : (fieldName ? fieldName : obj.id);
    fieldName = fieldName.length > 30 ? fieldName.substring(0, 30) : fieldName;
	return '['+fieldName.replace(':', '').replace('��', '')+']';
}

// // [Bugfree_2268_��ʾ��ʾtitle]_E wulei 2014-02-10
/*
 * Check()
 */

function Check(obj) {
    if(!SYS_HAVECHECK ) return true;
    if(!CheckFld(obj)) return false;
    addModifyFlag(obj);
    return true;
}

/*
 * checkNumber()
 */

function checkNumber(obj) {
    if( !SYS_HAVECHECK )return true;
    var $obj = $(obj);
    var sClass=obj.className;
    if(sClass.length>7) {
        var pt = sClass.indexOf("__");
        sClass = sClass.substring(0,pt);
    }
    if($obj.hasClass("AMT") || $obj.hasClass("RATE") || $obj.hasClass("FLOAT")) {
        addDebugInformation("--CheckAmt()-----" + obj.name + "   ---"+obj.value);
        var tmpval=Trim(obj.value);
        if( tmpval.toUpperCase()=="NAN" ){obj.value="";return true;}
        if(tmpval.length<=0) return true;
        if(tmpval.length==1 && (tmpval =="-"||tmpval =="+")) return true;
        var fValue = FormatStr2Amt(tmpval);
        if(isNaN(fValue)) {
            // alert("["+obj.title+":"+obj.name+"]"+ SYS_NUM_ERR + " Value:" + tmpval );
            tmpChangeInfo.errorMsg += ( SYS_NUM_ERR + " ֵ:" + tmpval );
            while(tmpval.length>0&&isNaN(fValue)) {
                tmpval=tmpval.substring(1);
                fValue = FormatStr2Amt(tmpval);
            }
            obj.value=tmpval;
            // setFocus(obj);
            return false;
        // [Bugfree_2270_���ȿ���]_B fanr 2014-01-28
        } else {
        	//add by wulei at 2012-4-26 for check amount length
        	var strValue = fValue + "";
			if (strValue.indexOf(".") != -1) {
				strValue = strValue.substring(0,strValue.indexOf("."));
			}
			var strLen = strValue.length;
			
        	if ($obj.hasClass("AMT")) {
				if (strLen > SYS_AMTMAXINTLENG) {//�������������� Ϊ14
					tmpChangeInfo.errorMsg += ( SYS_AMT_TOOLONG_ERR + " ���ڳ��ȣ�[" + strLen + "],��󳤶ȣ�["+SYS_AMTMAXINTLENG+"]" );
					setFocus(obj);
	            	return false;
				}
        	} else if ($obj.hasClass("RATE")) {
        		if (strLen > SYS_RATEMAXINTLENG) {//��������������� Ϊ6
					tmpChangeInfo.errorMsg += ( SYS_AMT_TOOLONG_ERR + " ���ڳ��ȣ�[" + strLen + "],��󳤶ȣ�["+SYS_RATEMAXINTLENG+"]" );
					setFocus(obj);
	            	return false;
				}
        	}
        	//=====end====
        // [Bugfree_2270_���ȿ���]_E fanr 2014-01-28
        }
    }
    if( $obj.hasClass("INT") ) {
        var tmpval=Trim(obj.value);
        if(tmpval.length<=0) return true;
        if(tmpval.length==1 && (tmpval =="-"||tmpval =="+")) return true;
        var iVal = parseInt(tmpval);
        if(isNaN(iVal))
        {       
            // alert("["+obj.title+":"+obj.name+"]"+ SYS_NUM_ERR);
            tmpChangeInfo.errorMsg += (SYS_NUM_ERR);
            while(tmpval.length>0&&isNaN(iVal))
            {
                tmpval=tmpval.substring(1);
                iVal = parseInt(tmpval);
            }
            obj.value=tmpval;
            // setFocus(obj);
            return false;
        }
    }
    return true;
}

/*
 * checkMinMax()
 */
function checkMinMax(obj){
	if(!obj.value) return true;
	if(obj.getAttribute("maxValue")){
        var maxValue = obj.getAttribute("maxValue");
        var value = getFieldValue(obj);
        if( maxValue.indexOf('[') != -1){
            maxValue = maxValue.replace('[','');
            maxValue = maxValue.replace(']','');
            maxValue = getFieldValue($('#'+maxValue).get(0));
        }
        if( value > maxValue ){
            tmpChangeInfo.errorMsg += ( '����λ [name:'+obj.name+',ֵ:'+obj.value+'] ���ֵΪ ['+maxValue+'] !!');
            return false;
        }
        
    }
    
    //field minValue
    if(obj.getAttribute("minValue")){
        var minValue = obj.getAttribute("minValue");
        var value = getFieldValue(obj);
        if( minValue.indexOf('[') != -1){
            minValue = minValue.replace('[','');
            minValue = minValue.replace(']','');
            minValue = getFieldValue($('#'+minValue).get(0));
        }
        if( value < minValue ){
            tmpChangeInfo.errorMsg += ('����λ [name:'+obj.name+',ֵ:'+obj.value+'] ��СֵΪ ['+minValue+'] !!');
            return false;
        }
    }
    return true;
}

/*
 * CheckDateFld()
 */

function checkDateFld(obj) {
    if( !SYS_HAVECHECK )return true;
    var $obj = $(obj);
    var sClass = obj.className;
    if(sClass.length>7) {
        var pt = sClass.indexOf("__");
        sClass = sClass.substring(0,pt);
    }
    var ccy="",ccyfld=null;
    var ccyfldname = CCY_FIELD[obj.name];
    if(ccyfldname!=null) ccyfld=document.getElementById(ccyfldname);
    if(ccyfld!=null)ccy= ccyfld.value;

    if($obj.hasClass("DATE")) {
        addDebugInformation("--CheckDate()-----" + obj.name);
        //yyyyMM�������ͼ������޸�
        var tmpval=Trim(obj.value);
	    if(tmpval == 'null') obj.value = '';
    	var dateFormat = obj.getAttribute("DateFormat");
    	if(dateFormat == "yyyyMM"){
            var dV = StrSix2Date(tmpval);
            if(!dV || isNaN(dV)) {
                tmpChangeInfo.errorMsg += (getFieldDescription(obj)+ SYS_DATE_ERR);
                setFocus(obj);
                obj.value = "";
                return false;
            }        
    	}else{
	        if(tmpval.charAt(0)=='+' || tmpval.charAt(0)=='-') {
	            var curDate = new Date();
	            var nextDate;
	            var days = parseInt(tmpval);
	            if(isNaN(days)) days = 0;
	            if(ccy!=null&&ccy.length>0){
	                nextDate = getDateAfterNWorkDay(ccy,curDate,days);
	            } else { 
	                nextDate = getNextDate(curDate,days);
	            }
	            obj.value = Date2Str(nextDate);
	            return true;
	        }
	        if(tmpval.length>=4) {
	            var dV = Str2Date(tmpval);
	            if(dV==null) {
	                // alert("["+obj.title+":"+obj.name+"]"+ SYS_DATE_ERR);
	                tmpChangeInfo.errorMsg += (SYS_DATE_ERR);
	                // setFocus(obj);
	                obj.value = "";
	                return false;
	            }
	            if(ccy!=null&&ccy.length>0) {
	                if(isHoliday(ccy,dV)) {
	                    setFocus(obj);
	                     var ret=confirm(getFieldDescription(obj)+ SYS_HOLIDAY_WARNING,"false");//[Bugfree_2268_��ʾ��ʾtitle]_B wulei 2014-02-10
	                      if( !ret )return false;
	                }
	            }
	        }
        }
    }
    return true;
}


/*
 * CheckMask()
 */

function CheckMask(obj)
{
    if(Mask[obj.name]==null) return true;
    addDebugInformation("--CheckMask()-----" + obj.name);
    var str = obj.value;
    var sMask = Mask[obj.name];
    if(sMask==null||sMask=="") return true;
    if(str==null||str=="") return true; 
    var splitNo=sMask.indexOf("||||SWIFT");
    sMask = sMask.substring(0,splitNo);
    var keyArray = sMask.split(";");
    var sMust = keyArray[0];
    var bMust = false;  
    if(sMust=="N"&&str.charAt(0)=="/") bMust = true;
    if(sMust=="Y") bMust = true;
    if(!bMust) return true;
    var bResult = false;
    for(var ii = 1; ii< keyArray.length; ii++)
    {
        var sKey = keyArray[ii];
        var lenKey = sKey.length;
        if(sKey=="/x/"||sKey=="/X/")
        {
            if(str.length>=3)
            {
                if(str.charAt(2)=='/') return true;
            } 
        }
        
        var ss = str.slice(0,lenKey);
        if(ss==sKey) 
        {
            bResult = true;
            break;
        }
    }
    if(!bResult)
    {
        alert(getFieldDescription(obj)+SYS_MASK_ERR);//[Bugfree_2268_��ʾ��ʾtitle]_B wulei 2014-02-10
        focu(obj);
        setFocus(obj);
    }   
    return bResult;
}



/*
 * CheckMax()
 */

function CheckMax(obj) {
    if(Max[obj.name]==null) return true;
    addDebugInformation("--CheckMax()-----" + obj.name);
    var tmpval  = Str2Num(obj.value);
    if(tmpval > Max[obj.name]) {
        alert("["+obj.title+":"+obj.name+"]"+SYS_MAX_ERR);
        //obj.focus();
        setFocus(obj);
        return false;
    }
    return true;
}

/*
 * CheckMin()
 */

function CheckMin(obj)
{
    if(Min[obj.name]==null) return true;
    addDebugInformation("--CheckMin()-----" + obj.name);
    var tmpval=Str2Num(obj.value);
    if(tmpval<Min[obj.name])
    {
        alert("["+obj.title+":"+obj.name+"]" + SYS_MIN_ERR);
        //obj.focus();
        setFocus(obj);
        return false;
    }
    return true;
}

function Trim(str) {
    return trimAll(str);
}

 
function getSysDate(){
    try
    {
        var sysDate = $('#SYS_CURR_DATE').val();
        if( sysDate!=null && sysDate!="" ){
            return sysDate;
        }else{
            return ;
        }
    }catch(e)
    {
    }
}

/*
 * setFieldValue()
 */
function setFieldValue(resultObj,value, MOP){ // ����setFieldValue��MOP������У����� fanr 2015-03-26
    if(!resultObj) return;
    if(typeof resultObj === "string"){
    	resultObj = document.UTFORM[resultObj];
    	return arguments.callee(resultObj, value, MOP); // ����setFieldValue��MOP������У����� fanr 2015-03-26
    }
    var sClass = resultObj.className;
    if( sClass===undefined){
        var alertStr = "The Field " + resultObj +"[ID:"+resultObj.id+"/NAME:"+resultObj.name+"/VALUE:"+value+"] has no Class! Please Check!";
        if(resultObj[0] && resultObj[1] && resultObj[0].name === resultObj[1].name){
        	alertStr += "\n������ʾ:�����ظ��ֶ�name='"+resultObj[0].name+"'";
        }
        alert(alertStr);
        return;
    }
    var resultObjType = getType(resultObj);
    if(!resultObjType){
    	alert("�ֶ�" + resultObj +"[ID:"+resultObj.id+"/NAME:"+resultObj.name+"/VALUE:"+value+"]���Ǹ���Ԫ��!����!");
    	return;
    }
    var $resultObj = $(resultObj);

    if( sClass.indexOf("__") > 0 ){
        var pt = sClass.indexOf("__");
        sClass = sClass.substring(0,pt);
    }
    if(resultObjType == "checkbox"){
        if(value =="YES") {
            resultObj.checked = true;
        } else {
        	resultObj.checked = false;
        }
    }else if($resultObj.hasClass("DATE")){
        if( !value ){
        	resultObj.value = "";
        } else if( typeof value === "object"){
        	resultObj.value = Date2Str(value);
        } else {
        	resultObj.value = value;
        }
    }else if ( $resultObj.hasClass("AMT") || $resultObj.hasClass("RATE") || $resultObj.hasClass("FLOAT") ) {
    	if(value===""){ // [FRATHF_00008_setFieldValue���ý�����ֶ�,�������Ϊ��,��Ϊ��,��Ӧ�ø�ʽ��Ϊ0] fanr 2013-11-21
    		resultObj.value = "";
    	} else {
        	if(!value) value = "0";
        	if(isNaN(value)) value = "0";
        	resultObj.value = value;
        	FormatObj(resultObj);
        }
    }else if( $resultObj.hasClass("INT") ) {
    	if(value===""){ // [FRATHF_00008_setFieldValue���ý�����ֶ�,�������Ϊ��,��Ϊ��,��Ӧ�ø�ʽ��Ϊ0] fanr 2013-11-21
    		resultObj.value = "";
    	} else {
        	if(value==null) value = "0";
        	if(isNaN(value)) value = "0";
        	resultObj.value = value;
        }
    }else if(resultObjType.substring(0, 6) === "select"){ // �����select,û�д�valueѡ��,�Ͷ�̬����
    	resultObj.value = value;
    	if (value) {
    		var _value = resultObj.value;
    		if (!_value) {
    			resultObj.add(new Option(value, value));
    			resultObj.value = value;
    		}
    	}
    }else{   
        resultObj.value=value;
    }
    if(MOP){ // ����setFieldValue��MOP������У����� fanr 2015-03-26
    	setProperty(resultObj, MOP);
    }
}

/*
 * setFieldValueFire()
 * ����ֵ���Ҵ���change�¼�
 */
function setFieldValueFire(resultObj,value){
	if(!resultObj) return ;
    if(typeof resultObj === "string"){
    	resultObj = document.UTFORM[resultObj];
    	return arguments.callee(resultObj, value);
    }
	var oldValue = getFieldValue(resultObj);
	setFieldValue(resultObj,value);
	if( oldValue != value){
		// Bugfree_2138_[��������]���ӿڲ��˺�ʱ��Ҫ����ONCHANGE�¼� fanr 2013-12-17
		$(resultObj).change();
	}
}

/*
 * compare()
 */
function compare(firststr,secondstr){
    if(firststr>secondstr) return true;
    else return false;
}

/*
 * CheckForm()
 */
function CheckForm() {
    form = document.UTFORM;
    window.tmpChangeInfo = {
        id:"",
        errorMsg:""
    };
    if( form==null ) 
        return false;
    SYS_SUBCHK = true;
    var li=$("ul[id='TabPage'] li");
    for (var i=0;i<li.length;i++){
        var liObj = li[i];
        if (liObj.className!='dis'){
        var childObj = $('#'+liObj.id.substring(3)).find('[id]');
            for(var j=0;j<childObj.length;j++)
            {
                tmpChangeInfo.erroMsg = "";
                obj = childObj[j];
                 if(obj.id=="subTabPage"){
                      var li2=$("ul[id='TabPage2'] li");
                      for (var m=0;m<li2.length;m++){
                        tmpChangeInfo.erroMsg = "";
                        var liObj2 = li2[m];
                        if (liObj2.className!='dis'){
                             var childObj2 = $('#'+liObj2.id.substring(3)).find('[id]');
                             //[Bugfree_821_�ʽ��轻��MT320�������棬F30X��У�������]_B fanr 2013-9-22
                              for(var k=0;k<childObj2.length;k++){
                                  var obj2 = childObj2[k];
                                  if( !Check(obj2) ){
                                    if( tmpChangeInfo.errorMsg ){
                                    	//[Bugfree_2268_��ʾ��ʾtitle]_B wulei 2014-02-10
                                        alert(getFieldDescription(obj2)+":" + tmpChangeInfo.errorMsg );
                                        showErrorMsg(obj2, getFieldDescription(obj2)+":" +tmpChangeInfo.errorMsg);
                                        setFocus(obj2);
                                    }
                                    return false;
                                  }
                               }
                              //[Bugfree_821_�ʽ��轻��MT320�������棬F30X��У�������]_E fanr 2013-9-22
                              
                         }
                      }
                      break;
                  }
                if( !Check(obj) ){
                    if( tmpChangeInfo.errorMsg ){
                    	//[Bugfree_2268_��ʾ��ʾtitle]_B wulei 2014-02-10
                        alert( getFieldDescription(obj)+":" + tmpChangeInfo.errorMsg );
                        showErrorMsg(obj, getFieldDescription(obj)+":" +tmpChangeInfo.errorMsg);
                        setFocus(obj);
                    }
                    return false;
                }
            }
        }
    }
    SYS_SUBCHK = false;    
    return true;
}
/*
 * setFieldReadOnly():
 */
function setFieldReadOnly( form ) {
    
       for ( var i=0;i<form.elements.length;i++ ) {
       var sClass=form.elements[i].className;
    if(sClass.length>7)
    {
        var pt = sClass.indexOf("__");
        sClass = sClass.substring(0,pt);
    }

       if(sClass!=null&&(sClass.charAt(sClass.length-1)=="P")) 
          form.elements[i].readOnly=true;
    }
}

/*
 * Currency
 * Money
 */
//Fixed by wulei at 2013-05-20
function utanParseInt(str){
   if (!str) return 0;
   if (typeof str === 'number') {
	   return Math.floor(str);
	}
	return parseInt(str,10);
}

function NumberToEnglishMoneyString(Currency,Money)
{   
    var    MoneyString=Money.toString();
    var    enSmallNumber = new Array ("","ONE","TWO","THREE","FOUR","FIVE","SIX","SEVEN","EIGHT","NINE","TEN","ELEVEN","TWELVE","THIRTEEN","FOURTEEN","FIFTEEN","SIXTEEN","SEVENTEEN","EIGHTEEN","NINETEEN");
    var    enLargeNumber = new Array ("TWENTY","THIRTY","FORTY","FIFTY","SIXTY","SEVENTY","EIGHTY","NINETY");
    var    enUnit        = new Array ("","THOUSAND","MILLION","BILLION","TRILLION");
    var    tmpString     = MoneyString.split('.');
    var    intString     = MoneyString;   
    var    decString     = "";            
    var    engCapital    = "";            
    var    strBuff1;
    var    strBuff2;
    var    strBuff3;
    var    curPoint;
    var    i1;
    var    i2;
    var    i3;
    var    k;
    var    n;
    var    upperCur=Currency.toUpperCase();

    if (tmpString.length >1)
    {
        intString = tmpString[0];             
        decString = tmpString[1];             
    }
    decString += "00";
    decString  = decString.substring (0,2);   
        curPoint = intString.length-1;
        if (curPoint>-1 && curPoint<15)
        {   
            k = 0;
            while(curPoint>=0)
            {
                strBuff1 = "";
                strBuff2 = "";
                strBuff3 = "";
                if (curPoint>=2)
                {   
                    n=utanParseInt(intString.substring(curPoint-2,curPoint+1));
                    //alert(intString.substring(curPoint-2,curPoint+1));
                    //alert(n);
                    if (n !=0)
                    {
                        i1 = utanParseInt(n/100);            
                        i2 = utanParseInt((n-i1*100)/10);    
                        i3 = utanParseInt(n-i1*100-i2*10);  
                        if (i1 !=0)
                        {
                            strBuff1 = enSmallNumber[i1] + " HUNDRED ";
                        }
                        if (i2!=0)
                        {
                            if (i2==1)
                            {
                                strBuff2 = enSmallNumber[i2*10+i3] + " ";
                                strBuff2 ="AND " + strBuff2;//LDH
                            }
                            else 
                            {
                                strBuff2 = enLargeNumber[i2-2] + " ";
                                strBuff2 ="AND " + strBuff2;//
                                if (i3 !=0)
                                {
                                    strBuff3 = enSmallNumber[i3] + " ";
                                }
                            }
                        }
                        else
                        {
                            if (i3 !=0)
                            {
                                strBuff3 = enSmallNumber[i3] + " ";
                                strBuff2 ="AND " + strBuff2;//LDH
                            }
                        }
                        var sand="";
                        //if( engCapital.length>0 )sand=" AND ";
                        engCapital = strBuff1 + strBuff2 + strBuff3 + enUnit[k] + " " + sand +engCapital;   
                    }

                }
                else
                {
                    n = utanParseInt(intString.substring(0,curPoint+1));
                    if (n !=0)
                    {
                        i2 = utanParseInt(n/10);      
                        i3 = utanParseInt(n-i2*10); 
                        if (i2!=0)
                        {
                            if (i2==1)
                            {
                                strBuff2 = enSmallNumber[i2*10+i3] + " ";
                            }
                            else 
                            {
                                strBuff2 = enLargeNumber[i2-2] + " ";
                                if (i3 !=0)
                                {
                                    strBuff3 = enSmallNumber[i3] + " ";
                                }
                            }
                        }
                        else
                        {
                            if (i3 !=0)
                            {
                                strBuff3 = enSmallNumber[i3] + " ";
                            }
                        }
                        var sand="";
                        //if( engCapital.length>0 )sand=" AND ";
                        engCapital = strBuff2 + strBuff3 + enUnit[k] + " " + sand + engCapital;
                    }
                }
 
                ++k;
                curPoint -= 3;
            }
        }   
        strBuff2 = "";
        strBuff3 = "";
        n = utanParseInt(decString);
        if (n !=0)
        {
            i2 = utanParseInt(n/10);      
            i3 = utanParseInt(n-i2*10);   
            if (i2!=0)
            {
                if (i2==1)
                {
                    strBuff2 = enSmallNumber[i2*10+i3] + " ";
                }
                else 
                {
                    strBuff2 = enLargeNumber[i2-2] + " ";
                    if (i3 !=0)
                    {
                        strBuff3 = enSmallNumber[i3] + " ";
                    }
                }
            }
            else
            {
                if (i3 !=0)
                {
                    strBuff3 = enSmallNumber[i3] + " ";
                }
            }
            
            if (engCapital.length>0)
            {
                var space="";
                if( engCapital.substring(engCapital.length-1,engCapital.length)!=" " )space=" ";
                engCapital = engCapital + space+"CENTS " + strBuff2+strBuff3+"ONLY";   
            }
            else
            {
                engCapital = "CENTS " + strBuff2 + strBuff3+"ONLY";   
            }
        }   
        else{
            var space="";
            if( engCapital.substring(engCapital.length-1,engCapital.length)!=" " )space=" ";
            engCapital =engCapital +space+"ONLY";
        }
             if(upperCur=="USD") upperCur="U.S. DOLLARS";
        else if(upperCur=="EUR") upperCur="EURO";
        else if(upperCur=="GBP") upperCur="POUND, STERLING";
        else if(upperCur=="JPY") upperCur="JAPANESE YEN";
        else if(upperCur=="HKD") upperCur="HONGKONG DOLLARS";
        else if(upperCur=="CAD") upperCur="CANADIAN DOLLARS";   
        else if(upperCur=="SGD") upperCur="SINGAPORE DOLLARS";
        else if(upperCur=="AUD") upperCur="AUSTRALIAN DOLLAR";
        engCapital="SAY"+" "+upperCur+" "+engCapital;
        return engCapital;
    
}

function setRorD(obj){
    var $obj = $(obj);
    var type = obj.type; 
    if( !type ) return;
    var specialFlag = obj.getAttribute("special");
    if(specialFlag!="true") obj.readOnly = true;
    if( type=="radio" || type=="checkbox" || type.substring(0,6)=="select" || type=="button" ){	
    	if(specialFlag!="true") obj.disabled = true;
    }
}

/*
 * FIELD_onchange()
 */

function FIELD_onchange(obj){
    $(obj).css("border-color","");
    if( !obj.id || !obj.name ) return;
    // add by fanrui ie����checkbox��(����radioδ����)��Ԫ��onchange������bug,
    // bug����:���checkbox��,����Ƶ������ط����һ��,�Żᴥ��onchange�¼�
    // bug����:����onchange��׼�����й�:��Ԫ�ط���focus�¼�,��¼��ֵ,�ڷ���onblur�¼�ʱ,�¾�ֵ�Ա�,�����һ��,�򴥷�onchange�¼�;�ⶨ����bug������ͳһ��
    // Ԥ��:���checkbox����������onchange(chrome������¼������)
    // ���˼·:��checkbox��onchange�¼�������click�¼���(field_onReady����������);
    // ע1:ԭ׼��ֻ��ie������,�����������ϻ�������,������js�����¼�ʱ��,ieдfireEvent(obj, "click"),chromeдfireEvent(obj, "change"),��������ά��
    // ע2:jquery�߼��汾�޴�bug,��ie�������⴦��
//    if( obj.type==="checkbox" ) return; 
    var objType = getType(obj);
    if(objType && objType.substring(0,6)==="select"){
    	// ����ADDNEW,���������Ҫ����onchange,�����ѡ����Ӧ�ô���
    	if(obj.value==="ADDNEW"){
    		addNewOptChk(obj);
    		return;
    	}
    }
    deleteErrorMsg(obj);
    var fieldName = obj.name;
    window.tmpChangeInfo = {
        id:obj.id,
        errorMsg:""
    };
//    try{
        if(!Check(obj)){
            if( tmpChangeInfo.errorMsg ){
                showErrorMsg(obj, getFieldDescription(obj)+":" + tmpChangeInfo.errorMsg);//[Bugfree_2268_��ʾ��ʾtitle]_B wulei 2014-02-10
            }
            return false;
        } else {
            deleteErrorMsg(obj);
        }
        
        var ccyList = $("input[CCY="+obj.id+"]");
        for(var i=0 ; i< ccyList.length ; i++ ){
            var ccyObj = ccyList[i];
            FormatObj(ccyObj);
        }
        var taskInputType = $('#CURR_TASKTYPE').val();
        if(taskInputType=='RELEASE' || taskInputType=='AUTH'){ //[Bugfree_1770_��Ȩ˫���ֶε�����onchange�¼�] fanr 2013-9-23 
            FormatObj(obj);
        } else {
        	if(typeof window[fieldName+"_onChange"] === "function"){
    			window[fieldName+"_onChange"]();
        	}
            // [Bugfree_2205_��������,�ݴ棬�����޸ĺ����ֵ����]_B fanr 2014-01-09
            if( typeof onFieldChange === 'function'){
                onFieldChange(obj);
            }
            FormatObj(obj);
            changeClauseInfo(obj); // ��ʽ���ֶ�ֵ��ֵ����
            // [Bugfree_2205_��������,�ݴ棬�����޸ĺ����ֵ����]_E fanr 2014-01-09
        }
        return true;
//    }catch(e){
//        Format(document.UTFORM);
//    }
}

/*
 * switchTab()
 */
function switchTab(tabid){
    var oItem = document.getElementById('TabPage');   
    for(var i=0;i<oItem.children.length;i++){
        var x = oItem.children[i];  
        if($(x).hasClass('Selected')) {
        	$(x).removeClass('Selected');
        	if (!$(x).hasClass('shows')) {
        		$(x).addClass('shows');
        	}
        }
    }   
    if(document.getElementById('Tab'+tabid)){
    	$('#Tab'+tabid).removeClass('shows');
    	$('#Tab'+tabid).removeClass('dis');
    	$('#Tab'+tabid).addClass("Selected");
    }
    var dvs=document.getElementById("cnt").getElementsByTagName("div");
    for (var i=0;i<dvs.length;i++){
      
      if($(dvs[i]).hasClass('HackBox') && dvs[i].id.indexOf("Div_")!=0)
      {
          if (dvs[i].style.display=='block'){
            dvs[i].style.display='none';
          }
      }
    }
    if(document.getElementById(tabid)){
    	document.getElementById(tabid).style.display='block';
    }
    tabArr.now = tabArr[tabid];
}

/*
 * initTabArr()
 */
function initTabArr(){
	var oItem = document.getElementById('TabPage');
	if(!oItem) return;
    window.tabArr = [];
    for(var i=0;i<oItem.children.length;i++){
        var x = oItem.children[i];
        if( x.tagName==="LI" && x.getAttribute("id")){
        	tabArr.push( x.id.replace(/^Tab/,"") );
        }
    }
    for(var i=0; i < tabArr.length; i++){
        tabArr[ tabArr[i] ] = i;
    }
    tabArr.now = 0;
}
/*
 * switchNextTab()
 */
function switchNextTab(){
	if(!tabArr) return;
    if( tabArr.now >= (tabArr.length - 1) ){
        tabArr.now = -1;
        switchNextTab();
    } else {
        if( isViewTab(  tabArr[tabArr.now+1]  ) ){
            switchTab( tabArr[tabArr.now+1] );
        } else {
        	tabArr.now++;
            switchNextTab();
        }
        
    }
}

/*
 * switchPreviousTab()
 */
function switchPreviousTab(){
	if(!tabArr) return;
    if( tabArr.now <= 0 ){
        tabArr.now = tabArr.length;
        switchPreviousTab();
    } else{
        if( isViewTab(  tabArr[tabArr.now-1]  ) ){
            switchTab( tabArr[tabArr.now-1] );
        } else {
            tabArr.now--;
            switchPreviousTab();
        }
    }
}
/*
 * isViewTab()
 */
function isViewTab(tabid){
    if( document.getElementById("Tab"+tabid) && document.getElementById("Tab"+tabid).className === "dis" ){
        return false;
    } else {
        return true;
    }
}
/*
 * showTab()
 */
function showTab(fieldName){
    var tabArr = fieldName.split('+');
    for(var i = 0;i<tabArr.length;i++){
            var tabId = tabArr[i];
            if(tabId!=null && tabId!=''){
                // document.getElementById('Tab'+tabId).style.display='block';
            	if($("#Tab"+tabId).hasClass("Selected")) return; // // [Bugfree_2057_����᡿��ʹ��ϵͳ"ģ��"���ܴ���ҵ��ʱ������ñ�ҵ���ڷ��ͱ���]_B fanr 2013-11-30
                $("#Tab"+tabId).attr("class","shows");
            }
    }
}

/*
 * hideTab()
 */
function hideTab(fieldName){
    var tabArr = fieldName.split('+');
    for(var i = 0;i<tabArr.length;i++){
            var tabId = tabArr[i];
            if(tabId!=null && tabId!=''){
                //document.getElementById('Tab'+tabId).style.display='none';
                $("#Tab"+tabId).attr("class","dis");
            }
    }
}


/*
 * addBodyBlanket()
 */
function addBodyBlanket(){
    $('body').append("<div id='bodyBlanket' style='position:absolute;left:0;top:0;width:100%;height:100%;background:#666;opacity:0.3;filter:alpha(opacity=30);'></div>");
}

/*
 * addBodyBlanket()
 */
function removeBodyBlanket(){
    $('#bodyBlanket').remove();
}
/*
 * utanConfirm()
 */
function utanConfirm(title,msg,type,retValue,paramValue,desc){
    $('#BTN_RET_VALUE').val(retValue);
    if(msg!=""){
        //edit by fr
        addBodyBlanket();
//      if(r=confirm(msg)){
            if(type=='SUBMIT'){
                var noteContent = $('#noteContent').val();
				//[Bugfree_940_��ע��λ��С������ո���ύ�������غ�ɾ���ÿո񣬽����Ծ��б����޷��ύ]_B fanr 2013-09-05
                if(noteContent!=null){
                	deleteErrorMsg($('#noteContent')[0]);
                	var htmlStr = kEditor.html();
                	if(/^\s*<br \/>\s*$/.test(htmlStr) // �ȸ��������
                		|| 	/^<p>\s*&nbsp;\s*<\/p>$/.test(htmlStr) // IE�������
                	){ 
                		$('#noteContent').val("");
                	} else {
                    	$('#noteContent').val(kEditor.html());
                    }
                }
				//[Bugfree_940_��ע��λ��С������ո���ύ�������غ�ɾ���ÿո񣬽����Ծ��б����޷��ύ]_E fanr 2013-09-05
                //ģ����ݴ水ťͬʱ����ʱ���ж���ģ��������ݴ� add by hh 20130-12-3 
                if($("#IS_TEMP_SAVE").val() =="YES"&&retValue != "PAUSESAVE"){
                	retValue = "TEMPSAVE";
                }
                
                doSUBMIT(retValue,msg);
            }else if(type=='CANCEL' && (r=confirm(msg)) ){
                doCANCEL();
            }
//      }
        removeBodyBlanket();
    }else{
        //MARK_DIV.style.display = '';
        if(type=='HISTORY'){
        	//[FINWARE_V3.5_TFS_2013132002 - ����֤ռ�û���]_B wt 2013-9-22
        	var transKeys = "";
            var transKey = $('#TRANS_KEY').val();
            if(!transKey){
            	transKey = "";
            }
            transKeys = transKey + "#";
            if(paramValue){		//paramValueΪLC_NO,AB_NO��
	            var list = paramValue.split(',');
	            var value = '';
	            for(var i=0; i< list.length; i++) {
	            	var param = list[i];
	                var temp = $('#'+param).get(0);
	                if(temp==null){
	                	//alert(param+' is not exist');	//����Ҫ��ʾ�����ҳ��û�оͲ���
	                }else{
	                	if(temp.value!=''){
	                    	value = value  + temp.value + ',';
	                    }
	                }
	        	}
	            transKeys = transKeys + value.substring( 0, value.length-1);
            }
            doEventView(transKeys);
            //[FINWARE_V3.5_TFS_2013132002 - ����֤ռ�û���]_E wt 2013-9-22
        }else if(type=='PREVIEW'){
            doPREVIEW();
        }else if(type=='VIEW'){
            doReleaseView();
        }else if(type=='LOOKUP'){
            doLookUp();
        }else if(type=='CLAUSE'){
            doClause();
        }else if(type=='AMENDINQ'){
            doAmendInq(paramValue);
        }else if(type=='VIEWSWIFT'){
            doViewSwift();
        }else if(type=='EXRATEINFO'){
            doViewExRate();
        }else if(type=='FAV_EXRATE'){
            doViewFavExRate( $('#'+paramValue).val() );
        }else if(type=='FAV_CHARGE'){
            doViewFavCharge( $('#'+paramValue).val() );
        }else if(type=='HISTORYSWIFT'){
        	var transKeys = "";
            var transKey = $('#TRANS_KEY').val();
            if(!transKey){
            	transKey = "";
            }
            transKeys = transKey + "#";
            if(paramValue){		//paramValueΪLC_NO,AB_NO��
	            var list = paramValue.split(',');
	            var value = '';
	            for(var i=0; i< list.length; i++) {
	            	var param = list[i];
	                var temp = $('#'+param).get(0);
	                if(temp==null){
	                	//alert(param+' is not exist');	//����Ҫ��ʾ�����ҳ��û�оͲ���
	                }else{
	                	if(temp.value!=''){
	                    	value = value  + temp.value + ',';
	                    }
	                }
	        	}
	            transKeys = transKeys + value.substring( 0, value.length-1);
            }
            doHistorySwift(transKeys);
        }
        //���̹������pengc_B
        else if(type=='CURRHISTORYSWIFT'){
            doCurrHistorySwift(paramValue);
        }else if(type='FEM_HISTORY'){     //add by xujw 2015/9/1
        	doFemEventView(paramValue);
        }
        //���̹������pengc_E
    }
}

/*
 * utanPrompt()
 */
function utanPrompt(title,msg){
    
    $.messager.prompt(title,msg, function(r){
        if (r){
            alert('you type:'+r);
            
        }
    });

}

/*
 * formatContent()
 */
function formatContent(content, type){
    if (content == null || content == undefined || content.length < 1) return '';

    var sState = '';
    var LEFT = '[';
    var RIGHT = ']';
    var sField = '';
    var sExpress = content;
    var sValue ='';
    var nLeft;
    var nRight;
    nLeft = sExpress.indexOf(LEFT);
    // [Bugfree_2205_��������,�ݴ棬�����޸ĺ����ֵ����]_B fanr 2014-01-09
    while (nLeft >= 0) {
        sState = sState + sExpress.substring(0, nLeft);
        nRight = sExpress.indexOf(RIGHT, nLeft);
        sField = sExpress.substring(nLeft + 1, nRight);
        var $obj = $('#'+sField);
        var obj = $obj.get(0);
        if(obj){
        	sValue = obj.value;
        	if(!sValue && !$obj.hasClass("DATE") &&  // �ų������ֶ�,�����ֶ�Ϊ�յĻ�,getFieldValueȡ����Ϊnull
        			!(type=="CLAUSE" && $obj.hasClass("INT"))){ // �������INT���ͣ�һ�㶼������������Ҫ��ʾ��0 
            	sValue = getFieldValue(sField); // �ս���ֶλᱻ�����0
            }
            sState += sValue;
            sExpress = sExpress.substring(nRight + 1);
            nLeft = sExpress.indexOf(LEFT);
        } else {
			alert(content+'    '+ sField+' is not exist'   );
			return false;
        }
    }
    sState = sState + sExpress;
    return sState;
    // [Bugfree_2205_��������,�ݴ棬�����޸ĺ����ֵ����]_E fanr 2014-01-09
}

/*
 * checkMaxOrMinValue()
 */
function checkMaxOrMinValue(obj,maxValue,minValue){
    var thisValue = getFieldValue(obj);
    if( thisValue > maxValue ){
        alert('�ֶ�[name:'+obj.name+',ֵ:'+thisValue+']���ֵ��['+maxValue+'] !!');
        setFieldValue(obj,maxValue);
    }
    if( thisValue < minValue ){
        alert('�ֶ�[name:'+obj.name+',ֵ:'+thisValue+']��Сֵ��['+minValue+'] !!');
        setFieldValue(obj,minValue);
    }
}

/*
 * checkMinValue()
 */
function checkMinValue(obj,minValue){
    var thisValue = getFieldValue(obj);
    if( thisValue < minValue ){
        alert('�ֶ�[name:'+obj.name+',ֵ:'+thisValue+']��Сֵ��['+minValue+'] !!');
        setFieldValue(obj,minValue);
    }
}

/*
 * isShowPage()
 */
function isShowPage(id)
{
    if($("#Tab"+id).attr("class")=='dis')
        return false;
    else 
        return true;
}

/*
 * setFocus()
 */
function setFocus(obj)
{
    var li=$("ul[id='TabPage'] li");
    for (var i=0;i<li.length;i++){
        var liObj = li[i];
        var childObj = $('#'+liObj.id.substring(3)).find('[id]');
        var flag = false;
        for(var j=0;j<childObj.length;j++)
        {
            if(childObj[j].id==obj.id)
            {
                flag = true;
                break;
            }
        }
        if(flag)
        {
            switchTab(liObj.id.substring(3));
            //[Bugfree_821_�ʽ��轻��MT320�������棬F30X��У�������]_B fanr 2013-9-22
            if($("#subTabPage")[0]){
            	 var li2=$("ul[id='TabPage2'] li");
            	 for(var m=0; m<li2.length; m++){
            		 var liObj2 = li2[m];
            		 if($("#" + liObj2.id.substring(3) + " " + "#" + obj.id)[0]){
            			 swiftSeqLiClick(liObj2);
            			 break;
            		 }
            	 }
            }
            //[Bugfree_821_�ʽ��轻��MT320�������棬F30X��У�������]_E fanr 2013-9-22
            $("#"+obj.id).css("border-color","red");
            $("#"+obj.id).focus();
        }
    }
    //add by wulei at 20130527 �������setting������� û��TabPage 
    if (li.length == 0) {
    	$("#"+obj.id).css("border-color","red");
        $("#"+obj.id).focus();
    }
}

/*
 * setSelection()
 */
function setSelection(obj, start, end){
    if($.browser.msie){
        var range = obj.createTextRange();
        range.collapse(true);
        range.moveStart("character", start);
        range.moveEnd("character", end-start);
        range.select();
    } else {
        obj.setSelectionRange(start, end);
    }
}
/*
 * saveGrid()
 */
function saveGrid()
{
    if(hasAutoSub){
    	saveAutoSubAddInputs();                
    }
	
	var tabClass;
    var marginInfo = $('#MARGININFO').get(0);
    if(marginInfo!=null){
    	var class1 = $('#TabMARGINTRANSFERPAGE').attr('class');
    	var class2 = $('#TabMARGINPAY').attr('class');
    	var class3 = $('#TabMARGINPAGE').attr('class');
    	var class4 = $('#TabADDMARGINPAGE').attr('class');
    	var class5 = $('#TabDEDUCTMARGINPAGE').attr('class');
    	var class6 = $('#TabTRANSFERMARGIN').attr('class');//add by lgp at 20120625 for ��֤���ڲ�ת��
    	
    	if( ( class1 != undefined && class1 != 'dis' ) || 
	    	( class2 != undefined && class2 != 'dis' ) || 
	    	( class3 != undefined && class3 != 'dis' ) || 
	    	( class4 != undefined && class4 != 'dis' ) || 
	    	( class5 != undefined && class5 != 'dis' ) || 
	    	( class6 != undefined && class6 != 'dis' ) ){//modify by lgp at 20120625 for ��֤���ڲ�ת��
        	createMarginXMl();
        	createMarginHistoryInfo();
        	createGridSaveXml("CURRMARGIN","MARGIN_GRID_XML");
        }else{
        	$('#MARGININFO').val("");
        	$('#MARGININFO_ACCOUNT').val("");
        	$('#MARGININFO_DR_ACCOUNT').val("");
        	$('#MARGININFO_ACCOUNT_DR').val("");
        }
    }
    
    var bankInfos = $('#BANKINFOS').get(0);
    if(bankInfos!=null){
        createBankInfoXMl();
    }

    var customs = $("[name^='CUSTOMS_']");
    for(var i=0;i<customs.length;i++){
        var id = customs[i].id;
        var type = id.substring(id.indexOf('_')+1);
        createCustomXMl(type);
    }

	tabClass = $('#TabFEEPAGE').attr('class');
    if( typeof(formatFeeToJSON) == 'function' ){//for charge
    	var tabClass2 = $('#TabPATCH_FEE_SPAGE').attr('class');
    	if( (tabClass != 'dis' && tabClass != undefined ) || (tabClass2 != 'dis' && tabClass2 != undefined ) ){
    		formatFeeToJSON();
    	}else{
    		$('#__CHG_FEE_CURR_GRID_JSON').val("");
    		$('#__CHG_FEE_HIS_GRID_JSON').val("");
    	}
    }
    
    tabClass = $('#TabCR_CUSTACC').attr('class');
    if( typeof(formatCrXml) == 'function' ){
    	if( tabClass != 'dis' && tabClass != undefined ){
    		formatCrXml();//for cust cr acc
    	}else{
    		$('#CR_CUST_ACC_GRID_VOU').val("");
    		$('#CR_CUST_ACC_GRID').val("");
    	}
    } 
    
    tabClass = $('#TabDR_CUSTACC').attr('class');
    if( typeof(formatDrXml) == 'function' ){
    	var tabClass2 = $('#TabPAYFEE_INFO').attr('class');
    	if( (tabClass != 'dis' && tabClass != undefined ) || (tabClass2 != 'dis' && tabClass2 != undefined ) ){
        	formatDrXml();//for cust dr acc
    	}else{
    		$('#DR_CUST_ACC_GRID_VOU').val("");
    		$('#DR_CUST_ACC_GRID').val("");
    		$('#DR_CUST_FEE_GRID').val("");
    	}
    }
    
    tabClass = $('#TabREPAYPURCHASE').attr('class');
    if( typeof(formatFinToXML) == 'function' ){
    	if( tabClass != 'dis' && tabClass != undefined ){
        	formatFinToXML();//for repay finance
        }else{
    		$('#RET_FIN_DATA_GRID').val("");    		
    		//[Bugfree_1766_ϵͳ֧�ֱ�������ıұ�Ѻ�㣬���ǲ�֧�ֱ�������������ұ�Ѻ��] fanr 2013-11-1
    		$('#RET_FIN_DATA_VOU').val(""); // ��Ѻ���н��ۻ�
    	}
    }
    
    tabClass = $('#TabLOANPAY').attr('class');
    if( typeof(formatFinPayToXml) == 'function' ){//for finance pay
    	if( tabClass != 'dis' && tabClass != undefined ){
	    	formatFinPayToXml();
	    }else{
	    	$('#FIN_PAY_GRID').val("");
	    }
	}
  
    tabClass = $('#TabFINDEFERPAGE').attr('class');
    if( typeof(formatFinDeferToXml) == 'function' ){//Ѻ��չ��
    	if( tabClass != 'dis' && tabClass != undefined ){
	    	formatFinDeferToXml();
	    }else{
	    	$('#FIN_DEFER_GRID').val("");
	    }
	}
    
    if( typeof(getAllCheckRole) == 'function' ){//for add role task
        getAllCheckRole();
    }
    
    tabClass = $('#TabBPBILLLISTPAGE').attr('class');
    if( typeof(formatBpGridToXML) == 'function' ){//for add formatBpGridToXML
    	if( tabClass != 'dis' && tabClass != undefined ){
    		formatBpGridToXML();
    	}else{
    		$('#BP_BILL_GRIDXML').val("");
    	}
    }
    
    tabClass = $('#TabOUT_CHK_PAGE').attr('class');
    if( typeof(formatOutChkToXml) == 'function'  && tabClass != 'dis' && tabClass != undefined ){//for add formatBpGridToXML
        formatOutChkToXml();
    }
    
    if( typeof(formatDocListXml) == 'function' ){//for add formatDocListXml
        formatDocListXml();
    }
    
    //add by yangcl 2015-11-26 begin ���ط�����ϸxml����
    if( typeof(formatFeeDetailsXml) == 'function' ){//for add formatFeeDetailsXml
        formatFeeDetailsXml();
    }
    //add by yangcl 2015-11-26 end ���ط�����ϸxml����
    
    //add by yangcl 2015-11-27 begin ����������ϸxml����
    if( typeof(formatCrCustAccXml) == 'function' ){//for add formatCrCustAccXml
        formatCrCustAccXml();
    }
    //add by yangcl 2015-11-27 end ����������ϸxml����
    
    //add by yangcl 2015-11-27 begin ���ؿ�����ϸxml����
    if( typeof(formatDrCustAccXml) == 'function' ){//for add formatCrCustAccXml
        formatDrCustAccXml();
    }
    //add by yangcl 2015-11-27 end ���ؿ�����ϸxml����
    
    //add by yangcl 2015-11-27 begin ���ر�֤��xml����
    if( typeof(formatMarginDetailsXml) == 'function' ){//for add formatCrCustAccXml
        formatMarginDetailsXml();
    }
    //add by yangcl 2015-11-27 end ���ر�֤����ϸxml����
    
    if( typeof(formatSubDocListXml) == 'function' ){//for add formatSubDocListXml
        formatSubDocListXml();
    }
    
    if( typeof(formatDocSelectXml) == 'function' ){//for add formatDocSelectXml
        formatDocSelectXml();
    }
    
    tabClass = $('#TabEXNGMixedPayment').attr('class');
    var tabClass2 = $('#TabEXNGAMDMixedPayment').attr('class');
    if( typeof(formatMixedPaymentInfoXml) == 'function'  && (tabClass != 'dis' || tabClass2!='dis')&& (tabClass != undefined || tabClass2 != undefined)){//for add formatBpGridToXML
        formatMixedPaymentInfoXml();
    }
    
    tabClass = $('#TabLC_LIST').attr('class');
    if( typeof(formatLcGridToXML) == 'function' ){//for add formatDocSelectXml
    	if( tabClass != 'dis' && tabClass != undefined ){
        	formatLcGridToXML();
	    }else{
	    	$('#LC_LIST_GRIDXML').val("");
	    }
	}
 
}
//add by wulei for inqire account-----begin
/*
 * saveGrid()
 */
function inqireAccountNo(obj,accName,ccy,custId,transNo){
    $('#LOOKUP').removeAttr("disabled");//fr.linkbutton({disabled:false});
    $('#ACCOUNTNAME').val( accName );
    $('#ACCOUNTCCY').val( getCcyCode(ccy) );
    $('#ACCOUNTCUSTID').val(custId);
    if( transNo == null ) transNo = "";
    $('#ACCOUNTTRANSNO').val(transNo);
    $('#CURRACCOUNTFIELD').val(obj.id);
    $('#LOOKUPTYPE').val("AccountNo");
    //Ĭ��jqGrid�еĲ��˺Ŵ���onChange
    $("#LOOKUPFIRE").val("YES"); // Bugfree_2138_[��������]���ӿڲ��˺�ʱ��Ҫ����ONCHANGE�¼� fanr 2013-12-17
}

/*
 * cancleInqAccount()
 */
function cancleInqAccount(){
    $('#LOOKUPNAME').val('');
    $('#ACCOUNTNAME').val('');
    $('#ACCOUNTCCY').val('');
    $('#ACCOUNTCUSTID').val('');
    $('#ACCOUNTTRANSNO').val('');
    $('#CURRACCOUNTFIELD').val('');
    $('#LOOKUPTYPE').val("");
    $('#LOOKUP').attr("disabled",true);
}

function setAccountTransNo(accountField){
	if( accountField == null || accountField == undefined || accountField == "" ) return;
	var transNo = $('#'+accountField).val();
	$('#ACCOUNTTRANSNO_FIELD').val(transNo);
}

/*
 * parseAccParam()
 */
function parseAccParam(params,index){
    var paramArr = params.split(',');
    var param = formatContent(paramArr[index]);
    if( index == 0 && param ){
        param = getCcyCode(param);
    }
    return param;
}
//add by wulei for inqire account-----end

//[BugFree_2281]_B wulei 2014-02-17 ��չlookup֧�ֶ���������Դ
/**
 * ��ĳ����������£������У�ϵͳ��ʽ�����ǲ����������ģ�ⴥ��lookup����
 * @param {Object} obj
 * @param {String} lkName lookup����
 * @param {String} param	lookup��Ҫ�Ĳ�����Ϊ�ַ���,��ʽ���getExpressValue
 */
function lookupOnFocus(obj, lkName, param){
	$('#LOOKUPNAME').val(lkName);
	$('#LOOKUPTYPE').val("LookUp");
	$('#LOOKUP_BIND_FLD').val(obj.id);
	$('#LOOKUP_MULCHK').val(obj.getAttribute("multFlag"));
	$('#LOOKUP').attr("disabled", false);
	if(obj.getAttribute("lookupFire")) {
		$('#LOOKUPNAME').val(obj.getAttribute("lookupFire"));
		$("#LOOKUPFIRE").val("YES");
	}
	var k2p = obj.getAttribute("key2param");
	if (k2p) {
		if (k2p.indexOf("#_") > 0 && obj.id.indexOf("_") > 0) {
			var id = obj.id;
			id = id.substring(0, id.indexOf("_"));
			k2p = k2p.replace(/#/g, id);
		}
		$('#_LOOKUP_KEY2PARAM').val(k2p);
	}
	$('#_LOOKUP_PARAM_STRING').val("[" + getExpressValue(param) + "]");
}

/**
 * ģ�⵱lookupʧȥ����ʱ����
 */
function lookupOnBlur(){
    $('#LOOKUPNAME').val('');
    $('#LOOKUPTYPE').val("");
    $('#LOOKUPFIRE').val("NO");
    $("#LOOKUP").attr("disabled",true);
    $('#_LOOKUP_KEY2PARAM').val("");
    $('#_LOOKUP_PARAM_STRING').val("");
}
//[BugFree_2281]_E wulei 2014-02-17

//add by wulei for inquire data from db using js

/*
 * executeQuery()
 */
function executeQuery(arrName,sql,maxCount){
    if( sql == null || sql == '' ) return -1;
    if( maxCount == null ) maxCount = -1;
    arrName = arrName.toUpperCase();
    var count = -1;
    $.ajax({
        url: '/UtanWeb/CommUtilServlet',
        dataType:'json',
        type:'POST',
        data:{OPERTYPE:'executeQuery',EXECUTESQL:sql,MAXCOUNT:maxCount},
        async:false,
        error:function(){
            alert('ִ�����ͨ�Ŵ���!');
            return -1;
        },
        success: function(jsonData){
            SYS_EXECUTEQUERY_DATA[arrName] = jsonData;
            count = getDataSize(arrName);
        }
    });
    return count;
}

/*
 * getTableFieldValue()
 */
function getTableFieldValue(arrName,index,fieldName){
    index = index -1;
    fieldName = fieldName.toUpperCase();
    arrName = arrName.toUpperCase();
    var fieldValue = "";
    var size = getDataSize(arrName);
    if( size == 0 ){
        alert("���ֶ�["+fieldName+"]������!!");
        return;
    }
    if( index > size ){
        alert("["+index+"]��������["+arrName+"]��С["+size+"]!!");
        return;
    }
    
    fieldValue = SYS_EXECUTEQUERY_DATA[arrName]["rows"][index][fieldName];
    //mod by xh @20120912--undefined
    if(typeof fieldValue=="undefined"){
    	fieldValue = "";
    }
    //mod by xh @20120912--undefined
    return fieldValue;
}

/*
 * getDataSize()
 */
function getDataSize(arrName){
    arrName = arrName.toUpperCase();
    if( SYS_EXECUTEQUERY_DATA[arrName] == null || SYS_EXECUTEQUERY_DATA[arrName].rows == null ) return 0;
    return SYS_EXECUTEQUERY_DATA[arrName].rows.length;
}

/*
 * alertInfo()
 */
function alertInfo(msg){
    alert(msg);
}

/*
 * checkRow()
 */
function checkRow(rowid,num,msg){
    if( rowid == num ){
        alert(msg);
    }
}

/*
 * checkAccountNo
 */
function checkAccountNo(accountNo){
    var outAccNo = $('#CHK_OUT_ACCNO').val();
    if(outAccNo == accountNo){
    	$('#1_OUT_CR_ACCOUNT_NO').val("");
    	alert('ת���˺��������˺Ų���Ϊͬһ�˺ţ�');
    }
}

/*
 * utanShowError()
 */
function utanShowError(msg){
        if ( confirm(msg) ){
            var currSubPage= $('#CURR_SUBMIT_PAGE').val();
            goHome(currSubPage);
        }
}

/*
 * inquireInfo()
 */
function inquireInfo(transKey,transRef,type,param){
    if(type=='HISTORY'){
        doEventView(transKey);
    }
    if( type == "MORE" ) alert("MORE");
}

/*
 *  get data from grid 
 *  gridName -- gridname
 *  lineNum -- the number you want to get
 *  status -- all or selected
 *  fieldsName -- like 'aa'
 *  ***when lineNum == -1 the param 'status' is not used
 */
 
/*
 * getGridSize()
 */
function getGridSize(gridName){
    var allRows = jQuery("#"+gridName).jqGrid('getDataIDs');
    return allRows.length;
}

/*
 * getGridData()
 */
function getGridData(gridName,fieldsName,lineNum,status){
    fieldsName = trimAll( fieldsName.toUpperCase() );
    if( gridName == null || gridName == '' || fieldsName == null || fieldsName == '' ) return;
    var resultString = '';
    var rowData;
    
    if( lineNum == -1 ){
        if( status == 'all' ){
            var allRows = jQuery("#"+gridName).jqGrid('getDataIDs');
            $.each( allRows, function(j, n){
                rowData = jQuery('#'+gridName).jqGrid('getRowData',n);
                resultString += rowData[fieldsName];
                if( n != allRows.length ){
                    resultString += ',';
                }
            });
        }else if( status == 'selected' ){
            var selectedRows = jQuery("#"+gridName).jqGrid('getGridParam','selarrrow');
            $.each( selectedRows, function(j, n){
                rowData = jQuery('#'+gridName).jqGrid('getRowData',n);
                resultString += rowData[fieldsName];
                if( j != selectedRows.length - 1 ){
                    resultString += ',';
                }
            });
        } 
    }else{
// [Bugfree_2167_����ҳ��]_B fanr 2013-12-27    
    	var $obj = $('#'+lineNum+'_'+fieldsName);
    	if($obj[0]){
			return getFieldValue($obj[0]);
		} else {
	        jQuery('#'+gridName).jqGrid('saveRow',lineNum,null,'clientArray');
	        rowData = jQuery('#'+gridName).jqGrid('getRowData',lineNum);
	        resultString = rowData[fieldsName];
        }
    }
    return resultString;
}

/**
 * ���ֻ����һ��param����
 * @param {Object} param
 * param.gridName ����
 * param.rowId ��id(һ����1,2,3��)
 * param.fieldName �ֶ���
 * {"gridName":gridName,"rowId":rowId,"fieldName":fieldName}
 */

function getGridValue(rowData, rowid, name){
	if(arguments.length <= 1){ // ˵��������һ��param����
		var param = rowData;
		var onEditObj = $("#" + param.rowId + "_" + param.fieldName)[0];
		if(onEditObj){
			return onEditObj.value;
		} else {
			return $("#" + param.gridName).jqGrid("getCell", param.rowId, param.fieldName);
		}
	} else {
		var $obj = $('#'+rowid+'_'+name);
		if($obj[0]){
			return getFieldValue($obj[0]);
		} else {
			return rowData[name];
		}
	}
	
}

function setGridValue(param){
	var onEditObj = $("#" + param.rowId + "_" + param.fieldName)[0];
	if(onEditObj){
		onEditObj.value=param.value;
	} else {
		if(param.value===""){
			$("#" + param.gridName).jqGrid("setCell", param.rowId, param.fieldName, null); // jqGrid�����һ��bug,��ֵ"",����Ч��,��null��Ч
		} else {
			$("#" + param.gridName).jqGrid("setCell", param.rowId, param.fieldName, param.value);	
		}
		
	}
}

// [Bugfree_2167_����ҳ��]_E fanr 2013-12-27
/*
 * setGridData()
 */
function setGridData(gridName,fieldsName,currRowId,value){
    fieldsName = trimAll( fieldsName.toUpperCase() );
    if( gridName == null || gridName == '' || fieldsName == null || fieldsName == '' || currRowId == null || currRowId == '' || value == null ) return;
    
    eval("$('#'+gridName).jqGrid('setRowData',currRowId,{"+fieldsName+":value});");
    if( typeof(afterSetGridData) == 'function' ){
        afterSetGridData(gridName,fieldsName,currRowId,value);
    }
}

/*
 * setRptMethod()
 */
function setRptMethod(custCode){
    $.ajax({
        url: '/UtanWeb/CommUtilServlet',
        dataType:'',
        type:'POST',
        data:'OPERTYPE=RPTMETHOD&&CUSTCODE='+custCode,
        async:false,
        error:function(){
            return ;
        },
        success: function(response){
            var list = $("select[id^='RPTMETHOD_']");
            for(var i=0;i<list.length;i++){
                $('#'+list[i].id).val(response);
            }
        }
    });
}


/**************************
 Get account check code
***************************/

/*
 * �õ��˺�У����
 */
function getAccCheckCode(aAcc)
{
    var iLen = aAcc.length;
    var iDig;
    var iCurrentBit;/* current position */
    var i;
    
    iDig = 10;  
    sZHANGHchar = new Array();
    for(var j=0;j<iLen;j++){
        sZHANGHchar[j] = aAcc.charAt(j);
    }
    
    for (i = 0 ; i < iLen; i++){
        iCurrentBit = sZHANGHchar[i] - '0';
        iDig += iCurrentBit;
        iDig %= 10;

        if (iDig == 0){
            iDig = 10;
        }

        iDig *= 2;
        iDig %= 11;
    }

    if (iDig != 1){
        iDig = 11 - iDig;
    }else{
        iDig = 0;
    }
    var sZHANGHchar;
    var rtnValue;
    sZHANGHchar = iDig;
    return aAcc+sZHANGHchar;
}

/*
 * setNoteValue()
 */
function setNoteValue(value){
    var switchTabId = $('li').filter(".Selected")[0].id.substring(3);
    switchTab('NOTE');
    kEditor.html(value);
    if(switchTabId!='')
        switchTab(switchTabId);
}

function addNoteValue(value){
	var switchTabId = $('li').filter(".Selected")[0].id.substring(3);
    switchTab('NOTE');
    kEditor.appendHtml(value);
    if(switchTabId!=''){
        switchTab(switchTabId);
    }
}

/*
 * addNewOptChk()
 */
function addNewOptChk(obj){
   var selVal=$("#"+obj.id).val();
   var selectObj = obj;
   if(selVal=="ADDNEW"){
        if( $("#addNewItemWindow")[0] === undefined ){
            var addNewItemWindow =  "<div id='addNewItemWindow' style='display:none;' align='center'>" +
                                    "<table><tr>" +
                                    "<td align='right' width='30%'>��ѡ������</td>" +
                                    "<td><input type='text' id='NEWITEM_NAME' id='NEWITEM_NAME' size='60' class='CHAR O'  /> </td>" +
                                    "</tr><tr align='CENTER'><td colspan='2'>" +
                                    "<a href='javascript:void(0)' id='NISub' name='NISub' class='fr-linkbutton' icon='fr-icon-ok' >ȷ  ��</a>" +
                                    "<a href='javascript:void(0)' id='NICan' name='NICan' class='fr-linkbutton' icon='fr-icon-cancel' onClick=\"dhxWins.window('addNewItem').close()\">ȡ  ��</a>" + 
                                    "</td></tr></table>" +
                                    "</div>";
            $("body").append(addNewItemWindow);
            
            dealButtons($("#addNewItemWindow")[0]);
        }
       $("#NISub").unbind("click");
       $("#NISub").bind("click",function(){
          setNewItemValue(selectObj);
       });
       //   createWindow("addNewItem");
        
        var winT = dhxWins.createWindow("addNewItem",300,100,600,100);
        winT.progressOn();
        winT.setText("������ѡ��");
        var obj = document.getElementById('addNewItemWindow');
        winT.attachObject(obj);
        winT.button("park").hide();
        winT.attachEvent("onClose",function(win){
            win.hide();
        });
   }
}

/*
 * setNewItemValue()
 */
function setNewItemValue(obj){
      var inputVal=$("#NEWITEM_NAME").val();
      var toptions=obj.options;
      var e=toptions[toptions.length-1];
      obj.remove(toptions.length-1);
      obj.options.add(new Option(inputVal, inputVal)); 
      obj.options.add(new Option(e.text, e.value));
      obj.value = inputVal;
      $(obj).change();
     dhxWins.window('addNewItem').close();
     
}

/*
 * formatXMLStr()
 */
function  formatXMLStr( text ){
    if ( typeof( text ) != "string" ) text = text.toString() ;
    text = text.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;") ;
    return text ;
}

/*
 * checkDoubleClick()
 * modify by fanrui 20120921 ����˫�ñ���۽�
 */
function checkDoubleClick(){
    var doubleClickFld = $("[doubleFlag='OK']");
    var len = doubleClickFld.length;
    if( len == 0 ) return true;
    for( var i=0;i<len;i++ ){
        var id = doubleClickFld[i].id;
        var $obj = $('#'+id);
        var obj = $obj[0];
        var value = getFieldValue( obj);
        if($obj.hasClass("DATE")) value = $obj.val();
        if(value != $('#'+id).attr('doubleValue') ){
        	//--mod by xh @20120806 for ˫����ʾ�ĳ�����- begin--
        	var title = $('#'+id).attr('title');
        	if(title == null || title == ""){ // modify by liaorizhi 
        		title = "���׽��";
        	}
        	alert(getFieldDescription(obj) + "��λ�����뾭����Ա���벻һ��,��˲�!");//[Bugfree_2268_��ʾ��ʾtitle]_B wulei 2014-02-10
             //alert("The value of " + id + " is not correct!");
        	//--mod by xh @20120806 for ˫����ʾ�ĳ�����- end--
        	setFocus(obj);
             return false;
         }
    }
    return true;
}
// add by fr

/*
 * upperLowerLock Obj
 */
if($.browser.msie){
	var upperLowerLock = {
	    init:{
	        upper:true,
	        lower:true
	    },
	    on:function(obj, $obj){
	        if(!$obj) $obj = $("#"+obj.id);
	        if( upperLowerLock.init.upper && obj.getAttribute("letterCase") == "upper" ){
	            $obj.removeClass("lower").addClass("upper");
	            $obj.on("keypress",function(e){
	            	var witch = e.which;
	            	if(witch>=97 && witch<=132){
	            		witch = witch - 32;
	            	}
	            	window.event.keyCode = witch;
	            });
	           	$obj.on("keydown",function(e){
					if(e.ctrlKey && e.which==86){ // Ctrl+V
						var text = window.clipboardData.getData("Text");
						if(text){
							window.clipboardData.setData("Text", text.toUpperCase());
						}
					}
	            });
	        } else if( upperLowerLock.init.lower && obj.getAttribute("letterCase") == "lower" ){
	            $obj.removeClass("upper").addClass("lower");
	            $obj.on("keypress",function(e){
	            	var witch = e.which;
	            	if(witch>=65 && witch<=90){
	            		witch = witch + 32;
	            	}
	            	window.event.keyCode = witch;
	            });
	           	$obj.on("keydown",function(e){
					if(e.ctrlKey && e.which==86){ // Ctrl+V
						var text = window.clipboardData.getData("Text");
						if(text){
							window.clipboardData.setData("Text", text.toLowerCase());
						}
						
					}
	            });
	        }
	    },
	    off:function(obj, $obj){
	   		if(!$obj) $obj = $("#"+obj.id);
			$obj.removeClass("upper").removeClass("lower");
	    }
	};
}else{
	var upperLowerLock = {
		//[Bugfree_1747_��Сд�󶨹���BUG:chrome�°󶨴�Сд��,onchange�¼�������]_B fanr 2013-9-17
	    init:{
	        upper:true,
	        lower:true
	    },
	    on:function(obj, $obj){
	    	//[Bugfree_1891_��СдBUG,ֻ����ʾ�Ǵ�д,��ʵֵ���ǲ���]_B fanr 2013-10-23
	        if(!$obj) $obj = $("#"+obj.id);
	        if( upperLowerLock.init.upper && obj.getAttribute("letterCase") == "upper" ){
	            $obj.removeClass("lower").addClass("upper");
	            $obj.on("keyup",function(){
	            	var position = obj.selectionStart;
	            	this.value = this.value.toUpperCase();
	            	setSelection(this,position,position);
	            });
	        } else if( upperLowerLock.init.lower && obj.getAttribute("letterCase") == "lower" ){
	            $obj.removeClass("upper").addClass("lower");
	            $obj.on("keyup",function(){
	            	var position = obj.selectionStart;
	            	this.value = this.value.toLowerCase();
	            	setSelection(this,position,position);
	            });
	        }
	        $obj.on("focus", function(){
	        	$(this).data("oldValue", this.value);
	        });
	        $obj.on("blur", function(){
	        	var newValue = this.value;
	        	var oldValue = $(this).data("oldValue");
	        	if(newValue !== oldValue){
	        		$(this).change();
	        	}
	        });
	        //[Bugfree_1891_��СдBUG,ֻ����ʾ�Ǵ�д,��ʵֵ���ǲ���]_B fanr 2013-10-23
	    },
	    off:function(obj, $obj){
	        if(!$obj) $obj = $("#"+obj.id);
			$obj.removeClass("upper").removeClass("lower");
	    }
    //[Bugfree_1747_��Сд�󶨹���BUG:chrome�°󶨴�Сд��,onchange�¼�������]_E fanr 2013-9-17
	};
}
//-------------------------------------------------comment---------------------------------end----------------add by wulei----


/*
 * addModifyFlag()
 */
function addModifyFlag(obj){
	if( !obj || !obj.id  || !obj.name) return;
    var currInputTaskType = $('#CURR_TASKTYPE').val();
    if( currInputTaskType == null || currInputTaskType != "FIXPENDING" ) return;
    var $obj = $(obj);
    var objValue = getFieldValue(obj);
    var objName = obj.name;
    removeFixedFieldStyle(obj); // ȥ�����ֶε���ʾ����
    var bSame = true;
    if(oldFieldValue[objName]!=objValue)  bSame = false;
    if( $obj.hasClass("DATE") ){
        if(compareDate(oldFieldValue[objName],objValue)!=0) bSame = false;
        else bSame = true;
    }
    
    if(!bSame){
    	setErrMoidfyStyle(obj, "MM", true);
    }else{
    	setErrMoidfyStyle(obj, "MM", false);
    	if(obj.value=="" && getErrModifyStyle(obj, "EE")) setFixedFieldStyle(obj);
    }
    
}

/**
 * 
 * @param obj
 * @param MorE "MM","EE"
 * @param flag true,false
 * 
 * �������ֻΪ����ie6
 * ���׿�ie6,���ǿ�����ô���:
 * ����ʱ���Ƿ�����ע,��ô�Ƿ���EE�Ϳ�����
 * �޸�ʱ���Ƿ����޸�,��ô�Ƿ���MM�Ϳ�����
 * Ȼ��css��,.EE{��ɫ����},.MM{��ɫ����},.EE.MM{��ɫ}�������
 * ����IE6��ʶ��CSS��.EE.MM���ֱ�ʾ����EE����MM�ı��ʽ,����ֻ�ܻ���EEMM�������,�����������Ϊ�˴ﵽЧ�����ֲ��ƻ�����߼�����
 */
function setErrMoidfyStyle(obj, MorE, flag){
	var $obj = $(obj);
    var styles = {
    		"MM":false,
    		"EE":false
    };
    if($obj.hasClass("MM")){
    	styles.MM = true;
    } else if($obj.hasClass("EE")){
    	styles.EE = true;
    } else if($obj.hasClass("EEMM")){
    	styles.EE = true;
    	styles.MM = true;
    }
    styles[MorE] = flag;
    var style = "";
    if(styles.EE){
    	style += "EE";
    }
    if(styles.MM){
    	style += "MM";
    }
    $obj.removeClass("EE MM EEMM").addClass(style);
}

function getErrModifyStyle(obj, MorE){
	var $obj = $(obj);
    var styles = {
    		"MM":false,
    		"EE":false
    };
    if($obj.hasClass("MM")){
    	styles.MM = true;
    } else if($obj.hasClass("EE")){
    	styles.EE = true;
    } else if($obj.hasClass("EEMM")){
    	styles.EE = true;
    	styles.MM = true;
    }
    return styles[MorE];
}

function toggleErrModifyStyle(obj, MorE){
	var $obj = $(obj);
    var styles = {
    		"MM":false,
    		"EE":false
    };
    if($obj.hasClass("MM")){
    	styles.MM = true;
    } else if($obj.hasClass("EE")){
    	styles.EE = true;
    } else if($obj.hasClass("EEMM")){
    	styles.EE = true;
    	styles.MM = true;
    }
    setErrMoidfyStyle(obj, MorE, !styles[MorE]);
}

/*
 * getFirstClassName()
 */
function getFirstClassName(sClass){
    var sClassLen = sClass.indexOf(' ');
    if( sClassLen != -1 ){
        sClass = sClass.substring(0,sClassLen);
    }
    return sClass;
}

function getLastClassName(sClass){//if the className is mult.....  like  "CHAR_M bt_active"
    var classTmp = "";
    var sClassLen = sClass.indexOf(' ');
    if( sClassLen != -1 ){
        classTmp = sClass.substring(sClassLen);
    }
    return classTmp;
}
// add by fr for check is lookup,clause....
/*
 * addSpecialCss()
 */

function addSpecialCss(){           
    $(this).bind("focus",function(){
        $(this).css("border-color","orange");
    });
    $(this).bind("blur",function(){
        $(this).css("border-color","");
    });
}
/*
 * autoPopupWindow()
 */
function autoPopupWindow(){
    if(UtanGlobalCache("userConfig").get().autoPopupWindow.setting.toUpperCase() == "YES"){
    	// [FINWARE_V3.5_TFS_20131108_lookupfire��lookup�Զ������ᵼ��ҳ���������ס ]_B fanr 2013-11-10
    	$(this).bind("focus",function(){
			$(this).data("oldValue", this.value);
        });
        $(this).bind("blur",function(){
			if($(this).data("oldValue") !== this.value){
           	if (this.getAttribute("clauseType")) {
					$("#CLAUSE").click();
				} else {
					$("#LOOKUP").click();
				}
           }
        });
        // [FINWARE_V3.5_TFS_20131108_lookupfire��lookup�Զ������ᵼ��ҳ���������ס ]_E fanr 2013-11-10
    }else if(UtanGlobalCache("userConfig").get().autoPopupWindow.setting.toUpperCase() == "SHORTCUT"){
        // [FINWARE_V3.5_TFS_20131106_FR - ���ӿ�ݼ�]_B fanr 2013-11-06
        bindShortkey({
        	selector: this,
			shortcut: UtanGlobalCache("userConfig").get().autoPopupWindow.shortcut,
			callBack: function(obj){
				if (this.getAttribute("clauseType")) {
					$("#CLAUSE").click();
				} else {
					$("#LOOKUP").click();
				}
			}
        });
		// [FINWARE_V3.5_TFS_20131106_FR - ���ӿ�ݼ�]_E fanr 2013-11-06
    }else{
    
    }
}
/*
 * autoCompleteDate()
 */
function autoCompleteDate(event){

        // if(event.keyCode == 8 || event.keyCode == 46) return true;
        var key = event.which || event.keyCode;
        if( key<48 || key>57) return true;
        var oldDate = $(this).val();
        if( oldDate[0]=="+" || oldDate[0]=="-"){
            return true;
        }
        
        if( oldDate.search( REGEXPS["YYYY"] ) != -1 ){
            newDate = oldDate.replace(REGEXPS["YYYY"], "$1-");
            $(this).val(newDate);
            return true;
        }
        
        if( oldDate.search( REGEXPS["YYYY-m"] ) != -1 ){
            newDate = oldDate.replace(REGEXPS["YYYY-m"], "$10$2-");
            $(this).val(newDate);
            return true;
        }
        
        if( oldDate.search( REGEXPS["YYYY-mm"] ) != -1 ){
            newDate = oldDate.replace(REGEXPS["YYYY-mm"], "$1$2-");
            $(this).val(newDate);
            return true;
        }
}

/*
 * checkLength()
 */
function checkLength(obj){
    var $obj = $(obj);
    if( !$obj.attr("maxLen") && !$obj.attr("minLen") ){ 
        return true;
    }
    if(!obj.value) return true;
    if( getType(obj)==="textarea" && $obj.attr("maxLen").search(/\*/) != -1){ //[FINWARE_V3.5_TFS_2013100051]_B fanr 2013-9-11
        if( !checkTextareaRows(obj) ) return false;
    } else {
        var maxLength = $obj.attr("maxLen")?parseInt( $obj.attr("maxLen") ):99999;
        var minLength = $obj.attr("minLen")?parseInt( $obj.attr("minLen") ):0;
        var val = $obj.val();
        var _val = val.replace( /[\r\n]/g, "");
        
        var len = _val.length;
        if( len>maxLength ){
            tmpChangeInfo.errorMsg += ERRORMSG.tooLong + maxLength;
            return false;
        }
        if( len<minLength ){
            tmpChangeInfo.errorMsg += ERRORMSG.tooShort + minLength;
            return false;
        }
    }
    
    return true;
}

/*
 * checkTextareaRows()
 */
function checkTextareaRows(obj){
    var $obj = $(obj);
    var obj = $obj[0];
    var maxRows = parseInt( $obj.attr("maxLen").split("*")[0] );
    var lines = getTextareaRows(obj);
    if( lines>maxRows ){
        tmpChangeInfo.errorMsg += ERRORMSG.tooHigh+maxRows ;
        return false;
    }
    return true;
}

/**
 * getTextareaRows()
 * ��Ϊ�����ص�DIV��ȡ,������,��������ʱ����һ��textarea
 * ����߶�
 */
function getTextareaRows(obj){
	var lines = 0;
	$("body").append("<textarea id='tempTextareaForGetRows' rows='"+obj.rows+"' cols='"+obj.cols+"' class='"+obj.className+"'></textarea>");
	$("#tempTextareaForGetRows").val(obj.value);
	var _obj=$("#tempTextareaForGetRows")[0];
	if($.browser.msie){
        var range = _obj.createTextRange();
        lines = range.getClientRects().length;
    } else { // �����������и߲���,��CSS��ͳһ����,����ֻ��У�����м����ϵ�����(һ�������text���;Ϳ���)
        var textHeight = _obj.scrollHeight;
        var lineHeight = parseInt( $(obj).css("line-height") );
        if( isNaN(lineHeight) ){
        	return 0;
        }
        lines = Math.floor( textHeight/lineHeight );
    }
	$("#tempTextareaForGetRows").remove();
	return lines;
}

/*
 * showMagnify()
 */
function showMagnify(id){
    if(dhxWins.isWindow("magnify")){
        dhxWins.window("magnify").close();
    }
    var textareaId = id, magnifyId = id+"_magnify";
    var textareaTitle = "";
    if( document.getElementById(textareaId).getAttribute("title") ){
        textareaTitle = " :: " + document.getElementById(textareaId).getAttribute("title");
    }
    $("#"+textareaId).css("border-color","blue");
    $("body").append("<div id='magnifyDiv' style='display:inline-block;*display:inline;_display:inline;padding:5px;'><textarea id='"+magnifyId+"' cols='" + document.getElementById(textareaId).getAttribute("cols") + "' rows='25'></textarea><br /><input type='button' value=' OK ' onclick=\"setFromMgnify('"+ textareaId +"')\"></div>");
    $("#"+magnifyId).val( $("#"+textareaId).val() );
    $obj = $("#magnifyDiv");
    $obj.css({"hegiht":$obj.height()+15,"width":$obj.width()+15});
    var winT = dhxWins.createWindow("magnify",300,100,600,100);
    winT.setText(textareaId + textareaTitle);
    var obj = document.getElementById("magnifyDiv");
    winT.attachObject(obj,true);
    // winT.button("park").hide();
    winT.button("minmax1").hide();
    winT.center();
    winT.attachEvent("onClose",function(win){
        var text = win.getText();
        var id = "";
        var index = text.indexOf(" :: ");
        if(index == -1){
            id = text;
        } else {
            id = text.substring(0, index+1);
        }
        $("#"+id).css("border-color","");
        return true;
    });
}
function setFromMgnify(textareaId){
    var $obj = $("#"+textareaId);
    $obj.val( $("#"+textareaId+"_magnify").val() );
    dhxWins.window("magnify").close();
    $obj.css("border-color","");
    $obj.change();
}
/**
 *  user_config
 */

function objCover(objFrom,objTo){
    if( objFrom == null ){
        return;
    }
    
    for(var key in objFrom){
        if( typeof objFrom[key] === "object" && objFrom[key] !== null){
            if( !objTo[key] ){
                objTo[key] = objFrom[key];
            } else {
                arguments.callee(objFrom[key], objTo[key]);
            }
        } else {
            objTo[key] = objFrom[key];
        }
    }
    
}
/*
 * insertText()
 */
function insertText(obj,str) {
    if (document.selection) {
        var sel = document.selection.createRange();
        sel.text = str;
    } else if (typeof obj.selectionStart === 'number' && typeof obj.selectionEnd === 'number') {
        var startPos = obj.selectionStart,
            endPos = obj.selectionEnd,
            cursorPos = startPos,
            tmpStr = obj.value;
        obj.value = tmpStr.substring(0, startPos) + str + tmpStr.substring(endPos, tmpStr.length);
        cursorPos += str.length;
        obj.selectionStart = obj.selectionEnd = cursorPos;
    } else {
        obj.value += str;
    }
}

function clearJQGridData(gridName){
    var allRows = jQuery("#"+gridName).jqGrid('getDataIDs');
    $.each( allRows, function(i, n){    
        jQuery('#'+gridName).jqGrid('delRowData',n);
    });
}
/*
 * parseXML(xml)
 */
var Try = {
    these:function(){
        var returnValue;
        for(var i=0, length=arguments.length; i<length; i++){
            var lambda = arguments[i];
            try{
                returnValue = lambda();
                break;
            } catch(e) {}
        }
        return returnValue;
    }
};
function createDocument(){
    return Try.these(
        function(){return new ActiveXObject("MSXML2.DOMDocument.6.0");},
        function(){return new ActiveXObject("MSXML2.DOMDocument.5.0");},
        function(){return new ActiveXObject("MSXML2.DOMDocument.4.0");},
        function(){return new ActiveXObject("MSXML2.DOMDocument.3.0");},
        function(){return new ActiveXObject("MSXML2.DOMDocument");},
        function(){return new ActiveXObject("Microsoft.DOMDocument");}
    ) || false;
}
function parseXML(xml){
    var xmldom = null;
    if(typeof DOMParser != "undefined"){
        xmldom = (new DOMParser()).parseFromString(xml, "text/xml");
        var errors = xmldom.getElementsByTagName("parsererror");
        if(errors.length){
            throw new Error("XML parsing error:"+error[0].textContent);
        }
        
    } else if(document.implementation.hasFeature("LS", "3.0")){
        var implementation = document.implementation;
        var parser = implementation.createLSParser(implementation.MODE_SYNCHRONOUS, null);
        var input = implementation.createLSInput();
        input.stringData = xml;
        xmldom = parser.parse(input);
    } else if (typeof ActiveXObject != "undefined"){
        xmldom = createDocument();
        xmldom.loadXML(xml);
        if(xmldom.parseError !=0 ){
            throw new Error("XML parsing error:"+xmldom.parseError.reason);
        }
    } else {
        throw new Error("No XML parser avaliable");
    }
    return xmldom;
}

function showErrorMsg(obj, errorMsg){
    if( $(obj).nextAll(".lengthError")){
        $(obj).nextAll(".lengthError").remove();
    }
    $(obj).parent().append("<span class='lengthError' style='color:red;padding-left:20px;'>" + errorMsg + "</span>");
}
function deleteErrorMsg(obj){
    $(obj).nextAll(".lengthError").remove();
}
/*
 * getDecLen()
 * return number or false;
 */
function getDecLen(obj){
	var $obj = $(obj);
	var Declen;	
	if( $obj.attr("decLen") && !isNaN(parseInt($(obj).attr("decLen"))) ){
		Declen = parseInt( $obj.attr("decLen") );
		return Declen;
	} else {
		return false;
	}
}
/*
 * 
 * fireEvent()
 * �����ֶ��¼�
 */
function fireEvent(obj, eventType){
	eventType = eventType.toLowerCase();
    if($.browser.msie){
        obj.fireEvent("on"+eventType);
    } else {
        var e = document.createEvent("MouseEvent");
        e.initEvent(eventType);
        obj.dispatchEvent(e);
    }
}
/*
 * getByteLength()
 * ���ְ�˫�ֽ�,ȡ���ַ����ֽڳ���
 *  
 */
function getByteLength(str){
	var _str = str.replace(/\u4E00-\u9FA5/g,"**");
	return _str.length;
}
//ADD BY WULEI
function createGridSaveXml(GridName,saveField){
	var rowData;
	var formatXml = "<?xml version='1.0' encoding='GBK'?><root><rows>";
	var rowXml = '',hidFlag;
	var allRows = jQuery("#"+GridName).jqGrid('getDataIDs');
	var colArray = jQuery('#'+GridName).jqGrid('getGridParam','colModel');

	$.each( allRows, function(i, n){
		jQuery('#'+GridName).jqGrid('saveRow',n,null,'clientArray');
		
		rowData = jQuery('#'+GridName).jqGrid('getRowData',n);
		rowXml = '<row>';
		for(var j=1;j<colArray.length;j++){
			hidFlag = 'N';
			if( colArray[j].hidden ) hidFlag = 'Y';
			rowXml = rowXml + '<cell hidFlag = "'+hidFlag+'">'+rowData[colArray[j].name]+'</cell>';
		}
		rowXml = rowXml + '</row>';
		formatXml = formatXml + rowXml;
	});
	
	formatXml = formatXml + '</rows></root>';
	$('#'+saveField).val(formatXml);
}

function setFixedFieldStyle(obj){
	if( FIXED_STYLE == "BORDER" ) $("#"+obj.id).css("border-color",FIXED_COLOR);
	if( FIXED_STYLE == "BACKGROUND" ) obj.style.backgroundColor = FIXED_COLOR;
}
function removeFixedFieldStyle(obj){
	if( FIXED_STYLE == "BORDER" ) $("#"+obj.id).css("border-color","");
	if( FIXED_STYLE == "BACKGROUND" ) obj.style.backgroundColor = "";
}
function formToObject(coll){
	for(var i = 0, a = {}, len = coll.length; i < len; i++){
		var o = coll[i];
		a[o.name] = o;
	}
	return a;
}

//ǰ̨���ýӿ�
//modify by rabbit for �ṩ������Ľӿڵ���  2016-09-29
//transactionFlag  Y ���ʾ������������Ϊ�����ʾ������
function callInterface(interfaceName,args,transactionFlag){
	var argsStr = "";
	var obj = null;
	if(typeof args  === "object"){
		for(var key in args){
			argsStr += "&" + key + "=" + args[key];
		}
	} else if(typeof args === "string"){
		argsStr = args;
	}
	if(transactionFlag!=null&&transactionFlag!=""){
		argsStr = "&TRANSACTIONFLAG="+transactionFlag;
	}
	$.ajax({
	    url: '/UtanWeb/CommUtilServlet?OPERTYPE=CALLINTERFACE&INTERFACENAME='+interfaceName+argsStr,
		type:'POST',
		async:false,
		error:function(){
			alert("ͨѶʧ��!["+interfaceName+"]");
		    return ;
		},
		success: function(response){
			var jsObject = eval('('+response+')');

			obj = jsObject[0];
		}
	});
	return obj;
}



//���ӿڸ�ֵ
function setInterfaceArgs(args , key , value){
	if(typeof key === "object" ){
		var addArgs = key;
		for(var addKey in  addArgs){
			args[addKey] = addArgs[addKey];
		}
	} else if(typeof key === "string") {
		args[key] = value;
	}
}

/**
 * coupling() ����ͬʱ��ֵ �� ͬʱ��ֵ
 * ֧�����ֲ���
 * ����1: �����ַ��� coupling("idA", "idB", "idC" ...) ��ʾͬʱ��ֵ,�������ֵ,��ȫ������ΪO��
 * ����2: ������� coupling({"idA":"O", "idB":"P", "idC":"P" ...}) ��ʾͬʱ��ֵ,�������ֵ,A��������ΪO��,B��������ΪP��,��������
 * @param {Object} args
 * @return {TypeName} 
 */

function coupling(args){ 
	if(typeof args === "string"){
		var objs = {};
		for(var i=0; i<arguments.length; i++){
			objs[arguments[i]] = "O";
		}
		arguments.callee(objs);
		return;
	}
	
	var allM = false;
	var ids = [], propertys = [];
	for(var id in args){
		ids.push(id);
		propertys.push(args[id]);
	}
	for(var i=0; i<ids.length; i++){ // �ж���û��������
		var _id = ids[i];
		if(getFieldValue(document.getElementById(_id))) {
			allM=true;
			break;
		}
	}
	for(var i=0; i<ids.length; i++){
		var _id = ids[i];
		var _propery = allM?"M":propertys[i];
		setProperty(document.getElementById(_id), _propery);
	}
}

// ADD BY liaorizhi  
function controlAskNoProperty(){
	if($('#IS_FLOW_FLAG').get(0) ){		//�������
		var isFlowFlag = document.UTFORM.IS_FLOW_FLAG.value;
		var askPriceNoName = document.getElementsByName("ASKPRICE_NO");
		for(var i = 0; i < askPriceNoName.length; i++){
			if(isFlowFlag == "NO"){
				setProperty(askPriceNoName[0],"P");
			}
		}
	} 
}

function addRemarks(custId){
	if(!custId){
		return;
	}
	 $.ajax({
                url: '/UtanWeb/CommUtilServlet?OPERTYPE=GETREMARKS&CUST_ID='+custId,
                type:'POST',
                async:false,
                error:function(){
                    return ;
                },
                success: function(response){
                	if( document.getElementById("noteContent") ){
		                //��������һ������Ϣ,��chrome�����,��֮ǰ���alert�Ļ�  setNodeValue�Ͳ���Ч  small tiger
		                	addNoteValue(response);
		                }
                	}
            });
}

// add by fanrui ��selectת��Ϊ�ɲ�ѯɸѡ��TEXT��
function parseSelectToText(obj){

	var obj = obj;
	var objId = obj.id;
	
	//[FINWARE_V3.5_TFS_2013100005]_B wangtao 2013-5-16 ---------------
	//��ֹ�ظ�,����ϵͳ�������ѭ���ڵ㴦���ظ���,�Ժ���Ϊ׼
	if($("#"+objId+"_selectToText")[0]){
		$("#"+objId+"_selectToText").remove();
	}
	//[FINWARE_V3.5_TFS_2013100005]_E wangtao 2013-5-16 ---------------

	var options = obj.options;
	var lists = []; // ���������Ҫ��ʾֵ�ļ���
	var listObj = {}; // ��������ֵ����߼��ж�
	var innerHTMLListObj = {}; // key(option.value)��value(option.html) �ļ��ϣ� ���ڸ���ʼֵ
	var selectToTextAttr = obj.getAttribute("selectToText");
	for(var i=0;i<options.length;i++){
		var option = options[i];
		var list = {};
		list.text = option.innerHTML ;
		if(option.value && selectToTextAttr==="YES.VALUE") list.text += "(" + option.value + ")";
		list.value = option.value;
		lists.push(list);
		listObj[option.value] = option.value;
		listObj[option.innerHTML] = option.value;
		innerHTMLListObj[option.value] = option.innerHTML; 
	}
	var className = obj.className;
	var selectValue = obj.value;
	var textValue = innerHTMLListObj[selectValue]; // ��ʼֵ
	textValue = textValue?textValue:"";
	var selectToTextWidthAttr = obj.getAttribute("selectToTextWidth") || "";
	var selectToTextWidthArr = selectToTextWidthAttr.split(",");
	var textSize = selectToTextWidthArr[0]? "size='"+selectToTextWidthArr[0]+"'" : "";
	$(obj).after("<input type='text' id='"+objId+"_selectToText' name='"+objId+"_selectToText' " + textSize + "value='" + textValue + "' class='"+className+"' style='background-image:url(/UtanWeb/theme/images/sort-down.png);background-repeat:no-repeat;background-position:right 50%;'/>");
	$("#"+objId+"_selectToText").autocomplete(lists,{
		max: 200,   //�����ʾ����
     	minChars: 0,   //�ڴ���autoCompleteǰ�û�������Ҫ������ַ���
     	width: selectToTextWidthArr[1] || 200,     //ָ��������Ŀ��
     	autoFill: false, //�Զ����
	 	delay:30,//�ӳ�ʱ��
	 	matchCase:false,//��Сд����
		cacheLength:1,	//������
		matchContains:true,
		formatItem: function(item) { 
			return item.text; 
		}
	}).result(function(event,item) { 
		setFieldValueFire(objId, item.value); // selectToText�����Զ�����change�¼� modify by fanr 2015-02-02
	});
		
	$("#"+objId+"_selectToText").change(function(){
		
		// ������ֶ����룬�жϸ�ֵ�Ƿ������selectѡ�value����innerHTML����ʾֵ�����ɣ���
		// ������ڣ���Ӧ��ֵ
		// ��������ڣ�����ֵ�����û�п�ֵѡ��ǲ������ı�ģ���ע�⣡��������
		var _input = this.value;
		if(_input && _input in listObj){
			//setFieldValueFire(objId, _input);// selectToText�����Զ�����change�¼� modify by fanr 2015-02-02
			setFieldValueFire(objId, listObj[_input]);  //ͨ���ֹ������ֵ���ж��Ƿ������selectѡ�������ڣ��������������ȡselect����ʵֵ modify by wangl 2016-05-13
		} else {
			this.value = "";
			setFieldValueFire(objId, "");// selectToText�����Զ�����change�¼� modify by fanr 2015-02-02
		}
	});
	// [FRATHF_00002_��ɷ�������δ��ɵĹ���] fanr 2013-11-08
	setProperty(obj, getMOP(obj)); // �����Ϊ�˿�����ʾ����
}

/**
 * @param {form element} obj
 * @return {String} the type of an element or undefined
 * textara,select-one,select-multiple,button,submit,text,checkbox,radio,image,file,reset,password
 */
function getType(obj){
    if(!obj) return;
    var tagName = obj.tagName;
    if(!tagName) return;
    if(jQuery.browser.msie){
        if(tagName==="TEXTAREA"){
			return "textarea";
		}else if(tagName==="SELECT"){
			if(obj.getAttribute("multiple")){
				return "select-multiple";
			}else{
				return "select-one";
			}
		}else if(tagName==="INPUT" || tagName==="BUTTON"){
			return obj.type;
		}else{
			return undefined;
		}
    } else {
        return obj.type;
    }

}

/**
 * 
 * @param {Object} obj
 * @return ""����UTANTYPES��һ��
 */
function getBaseClass(obj){ // UTANTYPES = ["CHAR", "AMT", "RATE", "FLOAT", "INT", "DATE", "TEXT", "KEY"];
	if(!obj) return;
	var baseClass = "";
	var objClass = obj.className;
	var regStr = "(?:^|\\s)+(" + UTANTYPES.join("|") + ")(?:\\s|$)+"; 
	var reg = new RegExp(regStr);
	if(reg.test(objClass)){
		baseClass = RegExp.$1;
	}
	return baseClass;
}

function getMOP(obj){ // MOPS = ["M", "O", "P"],
	if(!obj) return;
	var mop = "";
	var objClass = obj.className;
	var regStr = "(?:^|\\s)+(" + MOPS.join("|") + ")(?:\\s|$)+"; 
	var reg = new RegExp(regStr);
	if(reg.test(objClass)){
		mop = RegExp.$1;
	}
	return mop;
}
function documentBind(){
	var currTaskType = __CURR_TASK_TYPE;
	var currInputType = __CURR_INPUT_TYPE;
	$(document).on("focus",":input:not(.P):not(.linkbutton):not(.menubutton)", bindLookupFocus);
	
	//��lookup��change�¼�
	$(document).on("change",":input[lookup]:not(.P), :input[lookupFire]:not(.P)", bindLookupChange);
		
	if(currInputType==="RELEASE" || currInputType==="AUTH"){
		$(document).on("click", ":input:not(.linkbutton):not(.menubutton)", function(){
			if(this.getAttribute("doubleFlag") !== "OK"){
				chgErrorFlag(this);
			}
		});
	}
	$(document).on("click", ":input.DATE", bindDateClick);
	$(document).on("keyup", ":input.DATE", autoCompleteDate);
	$(document).on("change", ":input", function(){
		FIELD_onchange(this);		
	});
	//[Bugfree_1774_����ֶβ����为����]_B fanr 2013-09-23
	// ��Ŀ���������Ҫ�⹦���뽫��δ���ע������_B fanr
	$(document).on("keypress", ":input.AMT, :input.FLOAT, :input.RATE", function(event){
		var code = event.charCode || event.keyCode;
		//���̲���Ҫ��ֵ
		if(! ((code >= 48 && code <= 57) || code===46 )){ // 48-56Ϊ����0-9,45Ϊ����,46ΪС����
		//if(! ((code >= 48 && code <= 57) || code===45 || code===46 )){ // 48-56Ϊ����0-9,45Ϊ����,46ΪС����
			return false;
		}
	});
	$(document).on("keypress", ":input.INT", function(event){
		var code = event.charCode || event.keyCode;
		if(! ((code >= 48 && code <= 57) || code===45) ){ // 48-56Ϊ����0-9
			return false;
		}
	});
	// ��Ŀ���������Ҫ�⹦���뽫��δ���ע������_E fanr
	//[Bugfree_1774_����ֶβ����为����]_E fanr 2013-09-23
	
	// �󶨴�Сд b
	if($.browser.msie){
		$(document).on("keypress", ":input[letterCase='upper']", bindLetterCaseUpperKeypress);
		$(document).on("keydown", ":input[letterCase='upper']", bindLetterCaseUpperKeydown);
		$(document).on("keypress", ":input[letterCase='lower']", bindLetterCaseLowerKeypress);
		$(document).on("keydown", ":input[letterCase='lower']", bindLetterCaseLowerKeydown);
	}else{
		$(document).on("keyup", ":input[letterCase='upper']", bindLetterCaseUpperKeyup);
		$(document).on("keyup", ":input[letterCase='lower']", bindLetterCaseLowerKeyup);
		$(document).on("focus", ":input[letterCase]", bindLetterCaseFocus);
		$(document).on("blur", ":input[letterCase]", bindLetterCaseBlur);
	}
	
	// �󶨴�Сд e
}

function bindLookupFocus(){
	var obj = this;
	var $obj = $(this);
	if((obj.readOnly || obj.disabled) && !$obj.attr("justLookup")==="YES") return; //[Bugfree_892_(���)(�Ż�)"����֤���"�����] fanr 2013-10-16
	if( obj.getAttribute("lookup") || obj.getAttribute("lookupFire")){
        $('#LOOKUPNAME').val(obj.getAttribute("lookup"));
        $('#LOOKUPTYPE').val("LookUp");
        $('#LOOKUP_BIND_FLD').val(obj.id);
        $('#LOOKUP_MULCHK').val(obj.getAttribute("multFlag"));
        $('#_LOOKUP_PARAM_STRING').val("[" + getExpressValue(obj.getAttribute("lookupParam")) + "]");
        if (obj.getAttribute("key2param")) $('#_LOOKUP_KEY2PARAM').val(obj.getAttribute("key2param"));
        $('#LOOKUP').attr("disabled", false);
        if(obj.getAttribute("lookupFire")) {
        	$('#LOOKUPNAME').val(obj.getAttribute("lookupFire"));
        	$("#LOOKUPFIRE").val("YES"); // ADD BY fanrui for lookup����change�¼�
        }
        $obj.each(addSpecialCss);
        // Bugfree_2138_[��������]���ӿڲ��˺�ʱ��Ҫ����ONCHANGE�¼�_B fanr 2013-12-17
    } else if ( obj.getAttribute("accInquire") || obj.getAttribute("accInquireFire") ){
        $('#ACCOUNTNAME').val(obj.getAttribute("accInquire") || obj.getAttribute("accInquireFire"));
        if( obj.getAttribute("accParam") != null && obj.getAttribute("accParam") != "" ){
            $('#ACCOUNTCCY').val( parseAccParam( obj.getAttribute("accParam"),0) );
            $('#ACCOUNTCUSTID').val( parseAccParam( obj.getAttribute("accParam"),1) );
            $('#ACCOUNTTRANSNO').val( parseAccParam( obj.getAttribute("accParam"),2) );
        }
        $('#CURRACCOUNTFIELD').val(obj.id);
        $('#LOOKUPTYPE').val("AccountNo");
        $('#LOOKUP').attr("disabled",false);
        if(obj.getAttribute("accInquireFire")) {
        	$("#LOOKUPFIRE").val("YES"); // ADD BY fanrui for lookup����change�¼�
        }
        // Bugfree_2138_[��������]���ӿڲ��˺�ʱ��Ҫ����ONCHANGE�¼�_E fanr 2013-12-17
        $obj.each(addSpecialCss);
    } else if ( obj.getAttribute("custInquire") ||  obj.getAttribute("custInquireFire")){
    	$('#HX_CUST_PARAM').val(obj.getAttribute("custInquire"));
    	$('#LOOKUPTYPE').val("CustInquire");
    	$('#LOOKUP').attr("disabled", false);
    	if(obj.getAttribute("custInquireFire")) {
        	$('#HX_CUST_PARAM').val(obj.getAttribute("custInquireFire"));
        	$("#LOOKUPFIRE").val("YES"); // ADD BY fanrui for lookup����change�¼�
        }
        $obj.each(addSpecialCss);
    } else {
        if( obj.id != 'lookup' ){
            $('#LOOKUPNAME').val('');
            $('#ACCOUNTNAME').val('');
            $('#ACCOUNTCCY').val('');
            $('#ACCOUNTTRANSNO').val('');
            $('#ACCOUNTCUSTID').val('');
            $('#CURRACCOUNTFIELD').val('');
            $('#LOOKUPTYPE').val("");
            $('#LOOKUPFIRE').val("NO"); // ADD BY fanrui for lookup����change�¼�
            $("#LOOKUP").attr("disabled",true);
            $('#_LOOKUP_KEY2PARAM').val("");
            $('#_LOOKUP_PARAM_STRING').val("");
        }
    }
	
    if( obj.getAttribute("clauseType") !== null){
            $('#CLAUSETYPE').val(this.getAttribute("clauseType"));
            $('#CLAUSEFIELD').val(this.id);
            $('#CLAUSE').attr("disabled", false);
            $obj.each(addSpecialCss);
    }else{
        if(obj.id!='clause'){
            $('#CLAUSETYPE').val('');
            $('#CLAUSEFIELD').val('');
            $("#CLAUSE").attr("disabled",true);
        }
    }
    
    if(obj.getAttribute("maxValue") || obj.getAttribute("minValue")){
    	var oldValue = getFieldValue(obj);
    	$obj.data("oldValue", oldValue);
    }
    
}

function bindDateClick(){
	var holidaysJSON = UtanGlobalCache("holiday").get();
	if(this.readOnly || this.disabled) return;
	if(!checkDateAttr(this)){
		return;
	}
	var ccy = "";
	if(this.getAttribute("ccy")){ // ���ýڼ��ձ���
		var ccyId = this.getAttribute("ccy");
		ccy = $("#"+ccyId).val();
	}
	//[FINWARE_V3.5_TFS_2013120020]_B ��ͬ�����ڼ��� fanr 2013-4-26 ---------------
	var SWIFTCTYCODE = "";
	if(this.getAttribute("swiftCtyCode")){
		var swiftCtyCodeId = this.getAttribute("swiftCtyCode");
		SWIFTCTYCODE = $("#"+swiftCtyCodeId).val();
	}
	
	SWIFTCTYCODE = SWIFTCTYCODE?SWIFTCTYCODE:"";
	var P_SYSID = SWIFTCTYCODE+ccy;
	if(!P_SYSID){
		//Bugfree_1728_�ڼ��յ�P_SYSID Ĭ���ж� ��cny��Ϊcncny_B fanr 2013-09-17
		P_SYSID = SYS_HOLIDAY_DEFAULT_P_SYSID;
		//Bugfree_1728_�ڼ��յ�P_SYSID Ĭ���ж� ��cny��Ϊcncny_E fanr 2013-09-17
	}
	//[FINWARE_V3.5_TFS_2013120020]_E fanr ��ͬ�����ڼ��� 2013-4-26 ---------------
	var holidaysSpecialForMy97 = "";
	var holidayScript = "";
	//���û��ά���κνڼ�����Ϣ�����ccyû��ά������У���Ƿ�Ϊ�ڼ���   modify by wulei at 2012-01-11
	if (!isEmptyObject(holidaysJSON) && !isEmptyObject(holidaysJSON[P_SYSID])) {
		holidaysSpecialForMy97 = holidaysJSON[P_SYSID].holidaysSpecialForMy97;
		holidayScript = eval("["+holidaysSpecialForMy97+"]");
	}
	var format = this.getAttribute("DateFormat");
	if(!format){
		format = 'yyyy-MM-dd';
	}
    WdatePicker({
        dateFmt:format,
        highLineWeekDay:true,
        specialDates:holidayScript,
        onpicking:function(dp){
            if(!checkIsHolidayForMy97(dp,P_SYSID)){
                return true;
            }
        },
        onpicked:function(dp){
        	//[Bugfree_1726_��������Ǹ�ʽ����ʽ�磨2013-9-13��Onchange()����������] fanr 2013-10-14
          // $(this).change();
        }
    });
}

/**
 * ��lookup�䶯��ʱ�򣬴���������ظ�ֵ�ֶ�
 * @memberOf {TypeName} 
 * @return {TypeName} 
 */
function bindLookupChange() {
	var obj = this;
	if (!obj.value || !($.trim(obj.value))) {
		var kp = obj.getAttribute("key2param");
		if (kp) {
			var kpObj = eval("([" + kp + "])");
			for (var ii = 0;ii < kpObj.length; ii ++ ) {
				setFieldValue(kpObj[ii].K, "");
			}
		}
		
		var fun = getLookupClearFun(obj.getAttribute("lookup"), obj.id);
		try{
			eval(fun);
		} catch(e){}
		
		return;
	}
}

/**
 * У��һ�������ֶε�ccy��swiftCtyCode���õ��ֶ��Ƿ���ֵ
 * Serial NO: FINWARE_V3.5_TFS_2013120020 ��ͬ�����ڼ���
 * Date 2013-4-26
 * 
 * @author fanr
 * @version 1.0
 * @param obj ��У����ֶ�
 */
function checkDateAttr(obj){
	var ccyId = obj.getAttribute("ccy");
	var swiftCtyCodeId = obj.getAttribute("swiftCtyCode");
	var errMsg = "";
	if(swiftCtyCodeId && !ccyId){
		errMsg += "�����ֶ������������������ֶ�,����Ҫ�����ұ��ֶ�,�������ֶν���������������ֶ�!\r\n";
	}
	if(ccyId){
		var ccyObj = document.getElementById(ccyId);
		if(!ccyObj.value){
			errMsg += "�����ڹ����ұ��ֶΣ�" + ccyObj.id + "��"+ccyObj.title+"����ֵ!\r\n";
		}
	}
	if(swiftCtyCodeId){
		var swiftCtyCodeObj = document.getElementById(swiftCtyCodeId);
		if(!swiftCtyCodeObj.value){
			errMsg += "�����ڹ�����������ֶΣ�" + swiftCtyCodeObj.id + "��" + swiftCtyCodeObj.title + "����ֵ!\r\n";
		}
	}
	if(errMsg){
		errMsg += "���޷�׼ȷ�жϽڼ��գ�����д������Ϣ";
		alert(errMsg);
		return false;
	}
	return true;
}

/**
 * ǰ̨���ú���
 * @param {Object} functionName		��������
 * @param {Object} args					��������
 * @param {Object} retFldName			��������ֵ���ŵ��ֶ�			�����������ķ���ֵ�洢������ֶ��У��ѱ�ȡ������
 * 																JSON_HM�����ݲ�ѯ������ѯ�����ݸ�ʽ����json
 * 																JSON���ӿڣ�����json��ʽ
 * 																NONE�����²������޷���ֵ�Ĳ���
 * @param {Boolean} asyncFlag		Ĭ��false-ͬ��/true-�첽
 * @param {Function}	successCallBackFuction	�ɹ��ص�����
 * @param {Function}	errorCallBackFunction	ʧ�ܻص�����
 * @return {TypeName} 					
 */
function callFunction(functionName, args, retFldName, asyncFlag, successCallBackFuction, errorCallBackFunction) {
	var retName = (retFldName == null ? "NONE" : retFldName);
	var argsStr = '{"OPERTYPE":"CALLFUNCTION","FUNCTIONNAME":"' + functionName + '","RETFLDNAME":"' + retName + '"';
	var af = asyncFlag ? true : false;
	
	var obj = null;
	if(typeof args  === "object"){//����
		for(var key in args){
			argsStr += ",\"" + key + "\":\"" + args[key] + "\"";
		}
	} else if(args && (typeof args === "string")){//�ַ���
		argsStr += "," + args;
	}
	argsStr += "}";
	
	$.ajax({
	    url: '/UtanWeb/CommUtilServlet',
		type:'POST',
		data:eval("(" + argsStr + ")"),
		async:af,
		error:function(){
			alert("ͨѶʧ��["+functionName+"]");
			if(errorCallBackFunction && typeof errorCallBackFunction === "function"){
				errorCallBackFunction();
			}
		    return ;
		},
		success: function(response){
			if (response && response.length >= 10) {
				if (response.substring(0,10) == "{STRING}||") {
					obj = response.substring(10);
				} else if (response.substring(0,10) == "{OBJECT}||") {
					obj = eval('('+response.substring(10)+')');
				}else {
					obj = eval('('+response+')');
				}
			}
			
			if(successCallBackFuction && typeof successCallBackFuction === "function"){
				successCallBackFuction();
			}
		}
	});
	return obj;
}

/**
 * ���ӿڸ�ֵ
 * @param {Object} args
 * @param {Object} key
 * @param {Object} value
 */
function setFunctionArgs(args , key , value){
	if(typeof key === "object" ){
		var addArgs = key;
		for(var addKey in  addArgs){
			args[addKey] = addArgs[addKey];
		}
	} else if(typeof key === "string") {
		args[key] = value;
	}
}

/**
 * ����֪ͨ����ҵ��ĵǼǻ���
 * ѡ��ͻ������ҿͻ�������ֵ���������������ͻ��д����������Ǽ�Ϊ�գ��������ÿͻ�ѡ��
 */
function dealRegOrgList( ){
	var args = {};
	setFunctionArgs(args , "TRANS_ORG_CODE" , getFieldValue("TRANS_ORG_CODE") );
	var orgList = callFunction("F_GET_REGORG",args,"ORG_LIST");
	if(!orgList){
		return ;
	}
	
	var regOrg = $('#REGISTER_ORG');
	
	regOrg.empty();		//��պ����orgList����ƴװ
	
	var list = orgList.split(",");
	if(list.length == 1){
		setProperty(regOrg.get(0) ,"P");
	}else{
		setProperty(regOrg.get(0) ,"M");
	}
	
	var value,text;
	for(var i=0 ; i < list.length ; i ++){
		var tmp = list[i].split(":");
		value = tmp[0];
		text = tmp[1];
		regOrg.append("<option value='" + value+"'>"+ text+"</option>")
	}
}

/**
 * �ж��Ƿ������׽ڵ�
 * @return {boolean} true|false
 */
function isFlowFirstTask(){
	var processId = getFieldValue("PROCESSID");
	var nodeId = getFieldValue("NODEID");
	if(!processId || !nodeId){
		return true;
	} else {
		return false;
	}
}

/**
 * ���ڲ�ѯ����ҳ����ȡsetting���ڻ������������
 */
function getSettingOrgWhere(where){
	if(where){		//���where�����and����andȥ��
		var tmp = Trim(where);
		tmp = tmp.toUpperCase();
		if(tmp.length == tmp.lastIndexOf("AND") + 3 ){			
			where = tmp.substring(0 , tmp.length - 3);
		}
	}
	var orgWhere = getFieldValue("__ORG_WHERE");
	if(orgWhere){		//��Ҫ���ӻ���ɸѡ
		if(!where){					//���whereΪ�գ���ֱ�ӷ���orgWhere
			return orgWhere;
		}
		where = where + " and " + orgWhere ;
	} 
	return where;
}

/**
 * ���ڲ�ѯ����ҳ����ȡsetting���ڻ������������
 */
function getSettingTransOrgWhere(where){
	if(where){		//���where�����and����andȥ��
		var tmp = Trim(where);
		tmp = tmp.toUpperCase();
		if(tmp.length == tmp.lastIndexOf("AND") + 3 ){			
			where = tmp.substring(0 , tmp.length - 3);
		}
	}
	var orgWhere = getFieldValue("__TRANSORG_WHERE");
	if(orgWhere){		//��Ҫ���ӻ���ɸѡ
		if(!where){					//���whereΪ�գ���ֱ�ӷ���orgWhere
			return orgWhere;
		}
		where = where + " and " + orgWhere ;
	} 
	return where;
}
/**
 * ���ڲ�ѯ����ҳ����ȡsetting���ڻ������������
 */
function getSettingOrgWhereBMS(){
	var orgWhere = getFieldValue("__ORG_WHERE_BMS");
	
	return orgWhere ? orgWhere : "";
}

//[FINWARE_V3.5_TFS_20131116 - ˫���ֶ�����п���ҳ����ʾ�ķ������򸴺�ҳ���޷���ȷ��ʾ] - B wangtao 2013-11-16
//[Bugfree_1772_�ṩ��̬˫�õĹ���]_B fanr 2013-9-23
/**
 * ���ڶ�̬���ֶα��˫���ֶ�,�ڸ��˻�����Ȩʱ����ò���Ч
 */
function setDouble(obj){
    if(!obj) return;
    if(typeof obj === "string"){
    	obj = document.UTFORM[obj];
    	return arguments.callee(obj);
    }
    obj.setAttribute("doubleFlag", "YES");
    var $obj = $(obj);
    var taskInputType = $('#CURR_TASKTYPE').val();
    var sysTaskType = $('#SYS_TASK_TYPE').val();
    
    if($obj.attr('doubleFlag')=='YES' && ( taskInputType=='RELEASE' || taskInputType=='AUTH') && sysTaskType != "HISTORY") {    	
        // obj = clearEvent(obj); // ����������,�������ԭ�ȵ�obj��DOM��ɾ����,pageViewBuilder�н��������ߵĴ�����Ҳ���obj��
    	obj.removeAttribute("onchange");
    	$obj.attr('doubleValue',obj.value);
        $obj.attr('doubleFlag','OK');
        //[FINWARE_V3.5_TFS_20131114 - DataList�޿�ѡ�˫��ʱ�޷���ʾ��ֵ]_B wt 2013-11-14
        if($obj.hasClass("AMT") ){	//���Ϊ������ͣ���ֱ�Ӹ��ƣ��������setFieldValue�����0.00
        	//BugFree_2316_����ֶ��ھ����ʱ��Ϊ0�������˵�ʱ��Ӧ���ٴ���˫��
        	if (obj.value - 0 != 0) {
        		setProperty(obj,"M");
        		$obj.val('');
        	}
        }else{
        	setFieldValue(obj,"");
        	setProperty(obj,"M");
        }
        //[FINWARE_V3.5_TFS_20131114 - DataList�޿�ѡ�˫��ʱ�޷���ʾ��ֵ]_B wt 2013-11-14
    }
}
//[Bugfree_1772_�ṩ��̬˫�õĹ���]_E fanr 2013-9-23

/**
 * ����˫�ô���
*/
function setFormDoubles(){
	var taskInputType = $('#CURR_TASKTYPE').val();
    var sysTaskType = $('#SYS_TASK_TYPE').val();
	if(( taskInputType=='RELEASE' || taskInputType=='AUTH') && sysTaskType != "HISTORY") {
		$(":input[doubleFlag='YES']").each(function(){
			setDouble(this);
		});
	}
}
//[FINWARE_V3.5_TFS_20131116 - ˫���ֶ�����п���ҳ����ʾ�ķ������򸴺�ҳ���޷���ȷ��ʾ] - E wangtao 2013-11-16

//[Bugfree_1272_�����鸶�ջ㣺JPY ת�õ���-�󵥼ĵ�-�鸶]_B fanr 2013-9-25
/**
 * ��jqGird����������ȡ����ѡ
 */
function unselectAllRow_jqGrid(gridId){
	var selectedRows = jQuery("#"+gridId).jqGrid('getGridParam','selarrrow');
	while(selectedRows && selectedRows.length>0){
		jQuery('#'+gridId).jqGrid('setSelection', selectedRows[0], true);
	}
	var selectAllCheckbox = $("#cb_" + gridId)[0]; // �����ȫѡ��,ȡ����ѡȫѡ��
	if(selectAllCheckbox && selectAllCheckbox.checked === true){
		selectAllCheckbox.checked = false;
	}
}
//[Bugfree_1272_�����鸶�ջ㣺JPY ת�õ���-�󵥼ĵ�-�鸶]_E fanr 2013-9-25

/**
 * FINWARE_V3.5_TFS_201341002 - JS������ֵ����
 * ����mapping��ϵ
 * argsΪ����
 * id1 ��ֵԭʼID
 * id2 ��ֵĿ��ID
 * setValue �Ƿ����̸�ֵ��Ĭ�ϸ�ֵ��ΪnotSetValue�򲻸�ֵ
 * property ����ֵ�ֶ����ԣ�M/O/P �ɲ�������ı�
 * fire �Ƿ���ø�ֵĿ���ֶε�change�¼���Ĭ�ϲ����ã�����Ҫ������д'fire'
 * 
*/
function setFieldMapping(id1 , id2 , setValue , property ,fire ){
	if("notSetValue" === setValue ){
		 //����ֵ
	}else{
		if("fire" === fire){
			setFieldValueFire(id2,  getFieldValue(id1) );
		}else{
			setFieldValue(id2,  getFieldValue(id1) );
		}
	}
	
	$('#'+id1).change( function(){
		var id1 = this.id;
		if("fire" === fire){
			setFieldValueFire(id2,  getFieldValue(id1) );
		}else{
			setFieldValue(id2,  getFieldValue(id1) );
		}
		if(property){
			setProperty(id2,property);
		}
	});
}


/**
 * ��ѡ���ĳ��
 * @param {String} gridId grid���ID
 * @param {num} rowNum ��ѡ�ڼ���, ��1��ʼ
 * @param {true|false} selected ��ѡ���ǲ���ѡ ����Ĭ�Ϲ�ѡ
 * @param {true|false} fire �Ƿ񴥷����ѡ�¼� ����Ĭ�ϴ���
 * 
 * �ڶ��ִ��η�ʽ,����,����
 * 	setGridSelected({
		"gridId" : "DOCSELECT_GRID", // �������
		"selected" : false, // ��ѡ���ǲ���ѡ
		"rowNum" : 1, // ����,��1��ʼ
		"fire" : true // �Ƿ񴥷����ѡ�¼�
	});
 */
function setGridSelected(gridId, rowNum, selected, fire){
	if(!gridId) return;
	if(typeof gridId === "string"){
		if(!rowNum) return;
		if(selected === "undefined") selected = true;
		if(fire === "undefined") fire = true;
		arguments.callee({
			"gridId" : gridId,
			"rowNum" : rowNum,
			"selected" : selected,
			"fire" : fire
		});
		return;
	}
	var defaultParam = {
		"selected" : true,
		"fire" : true
	};
	var param = $.extend(defaultParam, arguments[0]);
	var selectedRows = jQuery("#"+param.gridId).jqGrid('getGridParam','selarrrow');
	if( XOR(param.selected, $.inArray(param.rowNum+"", selectedRows)>-1)){
		jQuery('#'+param.gridId).jqGrid('setSelection', param.rowNum, param.fire);
	}
}


/**
 * ����ж�
 * a, b
 * 0 0 false
 * 0 1 true
 * 1 0 true
 * 1 1 false
 * @param {Object} bool1
 * @param {Object} bool2
 */
function XOR(a, b){
	if((!a && !b) || (a && b)){
		return false;
	} else {
		return true; 		
	}
}

// [Bugfree_2151_ȥ��CommonFun CalGridChange����] fanr 2013-12-20

// Bugfree_2139_[��������]�����뱨�ֶ�P���_B fanr 2013-12-17
/**
 * ʹ���Ĳ𱨴�������ֵ��Ϊ������
 */
function set_demergeMsgFields_P(){
	if(!SYS_DEMERGEMSGFIELDS_PROTECT) return;
	var demergeMsgFields = getFieldValue("SYS_demergeMsgFields");
	if(demergeMsgFields){
		var demergeMsgFieldsArr = demergeMsgFields.split(",");
		for(var i=0; i<demergeMsgFieldsArr.length; i++){
			setProtect(demergeMsgFieldsArr[i]);
		}
	}
}
// Bugfree_2139_[��������]�����뱨�ֶ�P���_E fanr 2013-12-17

/**
 * @param {String} express	�����ֶδ����ԡ������ָ�����ɹ���"�����ֶ���:ֵ��Դ��ҳ���ֶΡ��ڴ������������"
 * 	������
 * 1. ��ֵ��Դ��ҳ���ֶε�ʱ����
 * 		��FLD1:P_FLD1,FLD2:FLD2�� 
 *  	����FLD1,FLD2��ʾSQL�������ֶ�����ֵ��Դ��ҳ���ֶ�P_FLD1,FLD2;
 * 		���SQL�������ֶκ�ҳ���ֶ�һ�£�����ʡ�������ֶΣ���
 * 		��FLD1:P_FLD1,FLD2��
 * 
 * 2. ��ֵ��Դ���ڴ������ʱ����[]���ڴ�������������� 
 * 		��FLD3:[NC_FLD3],FLD4:[FLD4]��
 * 		����FLD3,FLD4ΪSQL�������ֶΣ�NC_FLD3,FLD4Ϊ�ڴ����
 * 		������ڴ�����ֶ�����SQL��ֵ��Դ�ֶ���һ�£�����ʡ�������ֶΣ���
 * 		��FLD3:[NC_FLD3],[FLD4]��
 * 
 * 3. ��ֵ��Դ�ڳ�����ʱ����{}��������������
 * 		��FLD5:{VALUE}��
 * 
 * 4. ���ָ�ֵ��ʽ���Բ��棬��
 * 		��FLD1:P_FLD1,FLD2,FLD3:[NC_FLD3],[FLD4],FLD5:{VALUE}��
 * @return {String[]} 
 */
function getExpressValue(express) {
	if (!express) return "";
	
	express = $.trim(express);
	var expresArrs = express.split(",");
	var expresArrsData = []; 
	
	var name,value;
	for (var i = 0; i < expresArrs.length; i ++) {
		name = expresArrs[i];
    	name = $.trim(name);
    	
    	if (name.indexOf(":") > 0) {
    		var nv = name.split(":");
    		name = nv[0];
    		value = nv[1];
    		//[BugFree_2344]_B QF.wulei 2014-3-11 lookup�ڵ��ýӿڵ�ʱ��֧�������ֶ�ֵ���ݡ�
    		if ("{#}" == value) {//FLD:{#} ��������
    			expresArrsData[i] = '{"id" : "'+(i + 1)+'", "name" : "'+ name +'", "value" : "'+ value +'"}';
    		} else if (value.indexOf("{") == 0 && value.indexOf("}") == (value.length - 1)) {//FLD5:{VALUE}
    			value = value.substring(1,value.length - 1);
    			expresArrsData[i] = '{"id" : "'+(i + 1)+'", "name" : "'+ name +'", "value" : "'+ encodeURI(value) +'"}';
    		} else if (value.indexOf("[") == 0 && value.indexOf("]") == (value.length - 1)) {//FLD3:[NC_FLD3]
    			expresArrsData[i] = '{"id" : "'+(i + 1)+'", "name" : "'+ name +'", "value" : "'+ encodeURI(value) +'"}';
    		} else {//FLD1:P_FLD1
    			expresArrsData[i] = '{"id" : "'+(i + 1)+'", "name" : "'+ name +'", "value" : "'+ encodeURI(getFieldValue(value)) +'"}';
    		}
    		
    	} else {
    		if (name.indexOf("[") == 0 && name.indexOf("]") == (name.length - 1)) {//[FLD4]
    			expresArrsData[i] = '{"id" : "'+(i + 1)+'", "name" : "'+ name.substring(1, name.length - 1) +'", "value" : "'+ encodeURI(name) +'"}';
    		} else {//FLD2
    			//expresArrsData[i] = '{"id" : "'+(i + 1)+'", "name" : "'+ name +'", "value" : "'+ encodeURI(getFieldValue(name)) +'"}';
    			expresArrsData[i] = '{"id" : "'+(i + 1)+'", "name" : "'+ name +'", "value" : "'+ encodeURI($('#'+name).val()) +'"}';
    		}
    	}
	}
	
	return expresArrsData;
}

/**
 * ǰ̨�滻��[]��Ϊ�ֶ�����{}Ϊ����
 * @param {Object} express
 * @param {Object} ch
 */
function getExpressValueJS(express) {
    if (!express) return '';

    var sState = "";
	var LEFT = '{' ,RIGHT = '}';
	var sField;
	var sExpress = express;
	var sValue;
	var nLeft;
	var nRight;
	nLeft = sExpress.indexOf(LEFT);
	
	while (nLeft >= 0) {
		sState = sState + sExpress.substring(0, nLeft);
		nRight = sExpress.indexOf(RIGHT, nLeft);
		sField = sExpress.substring(nLeft + 1, nRight);
		sState += sField;
		sExpress = sExpress.substring(nRight + 1);
		nLeft = sExpress.indexOf(LEFT);
	}
	sState = sState + sExpress;
	
	var sExpress = sState;
	sState = "";
	LEFT = '[' ,RIGHT = ']';
	nLeft = sExpress.indexOf(LEFT);
	while (nLeft >= 0) {
		sState = sState + sExpress.substring(0, nLeft);
		nRight = sExpress.indexOf(RIGHT, nLeft);
		sField = sExpress.substring(nLeft + 1, nRight);
		if ($('#'+sField).get(0)) {
			sValue = $('#'+sField).val();
		} else {
			showMsg("���ʽ���ֶ�["+sField+"]�����ڣ�");
			sValue = LEFT + sField + RIGHT;
			return sState += sValue;
		}
		sState += sValue;
		sExpress = sExpress.substring(nRight + 1);
		nLeft = sExpress.indexOf(LEFT);
	}
	sState = sState + sExpress;
	
    return sState;
}

function setLookupClearFun(lkName, fun, clearValueKey) {
	if(!__LOOKUP_CLEAR_FUN[lkName]){
		__LOOKUP_CLEAR_FUN[lkName] = {};
	}
	__LOOKUP_CLEAR_FUN[lkName][clearValueKey] = fun;
}

function getLookupClearFun(lkName, fieldName) {
	var funs = __LOOKUP_CLEAR_FUN[lkName];
	var fun;
	for(var key in funs){
		if(key.indexOf(fieldName) > -1){
			fun = funs[key];
			break;
		}
	}
	return fun;
}
/**
 * [Bugfree_2294_�����ύ��ˢ��ҳ�棬���ײο��ű仯��ϵͳ����ȡ��]_yangcl 2014-2-24
 * �Ƿ�ʹ��ˢ�¹���
 * @param isFlag �Ƿ�����
 */
function isJsRefresh(isFlag){
	if(isFlag == 'false'){
		return;
	}
	$('body').bind('contextmenu', function() {
	      return false;
	});
    $(document).keydown(function(event) {
       if(event.keyCode==116){
          return false;
        }
  });
}

function getDataListRealValue(text,listString) { 
	if (!listString || listString.indexOf(":") == -1) return text;
	listString = ";" + listString + ";";
	var ntext = ":" + text + ";";
	var c1,c2;
	if ((c2 = listString.indexOf(ntext)) == -1) {
		return text;
	} else {
		var tmp = listString.substring(0,c2);
		c1 = tmp.lastIndexOf(";") + 1;
		return tmp.substring(c1,c2);
	}
}

if($.browser.msie){
	function bindLetterCaseUpperKeypress(e){
		var witch = e.which;
    	if(witch>=97 && witch<=132){
    		witch = witch - 32;
    	}
    	window.event.keyCode = witch;
	}
	function bindLetterCaseUpperKeydown(e){
		if(e.ctrlKey && e.which==86){ // Ctrl+V
			var text = window.clipboardData.getData("Text");
			if(text){
				window.clipboardData.setData("Text", text.toUpperCase());
			}
		}
	}
	function bindLetterCaseLowerKeypress(e){
		var witch = e.which;
    	if(witch>=65 && witch<=90){
    		witch = witch + 32;
    	}
    	window.event.keyCode = witch;
	}
	function bindLetterCaseLowerKeydown(e){
		if(e.ctrlKey && e.which==86){ // Ctrl+V
			var text = window.clipboardData.getData("Text");
			if(text){
				window.clipboardData.setData("Text", text.toLowerCase());
			}
		}
	}
} else {
	function bindLetterCaseUpperKeyup(e){
		var position = this.selectionStart;
		this.value = this.value.toUpperCase();
		setSelection(this,position,position);
	}
	function bindLetterCaseLowerKeyup(e){
		var position = this.selectionStart;
    	this.value = this.value.toLowerCase();
    	setSelection(this,position,position);
	}
	function bindLetterCaseFocus(e){
		$(this).data("oldValue", this.value);
	}
	function bindLetterCaseBlur(e){
		var newValue = this.value;
    	var oldValue = $(this).data("oldValue");
    	if(newValue !== oldValue){
    		$(this).change();
    	}
	}
}
/**
 * ����key��ȡBankConfig.xml��SysConfig.xml�е�������Ϣ
 * @param {Object} key
 * @return {TypeName} 
 */
function getSysConfigValue(key) {
	var o = UtanGlobalCache("config").get();
	if (!o) return key;
	
	return o[key];
}


//add for BES*****************************************************BES*************************************************************BEGIN***
//add by wulei at 2013-02-27
function createOwnerList(obj) {
	var uc = UtanCache("allOwner") || UtanGlobalCache("allOwner");
	if (!uc) return obj;
	
	var ownerObj = uc.get();
	obj.add(new Option("",""));
	if (ownerObj) {
		for (var owner in ownerObj) {
			obj.add(new Option(ownerObj[owner].OWNER_DESC,owner));
		}
	}
}

function createOwnerNameList(obj,owner) {
	var nameObj = window.top.getAllOwnerNameData()[owner];
	obj.add(new Option("",""));
	if (nameObj) {
		for (var name in nameObj) {
			obj.add(new Option(nameObj[name].CFG_NAME_DESC,name));
		}
	}
}

String.prototype.replaceAll = function(reallyDo, replaceWith, ignoreCase) {  
    if (!RegExp.prototype.isPrototypeOf(reallyDo)) {  
        return this.replace(new RegExp(reallyDo, (ignoreCase ? "gi": "g")), replaceWith);  
    } else {  
        return this.replace(reallyDo, replaceWith);  
    }  
}  

function getCurrOwner() {
	return window.top.document.getElementById("OWNER").value;
}

function getCurrOrgId() {
	return window.top.document.getElementById("ORGID").value;
}
function getHeadOrgId() {
	return window.top.document.getElementById("HEADORGID").value;
}
var __BES = "BES";
function getBES() {
	return __BES;
}

function getOwnerDescByOwner(owner){
	var ownerDesc = "";
	var uc = UtanCache("allOwner") || UtanGlobalCache("allOwner");
	if (!uc) return owner;
	
	var ownerObj = uc.get();
	if(owner &&  ownerObj[owner]) {
		ownerDesc = ownerObj[owner].OWNER_DESC;
		if(!ownerDesc) ownerDesc = owner;
	}
	return ownerDesc;
}

function getEntityTypeDesc(value) {
	switch(value) {
		case "Person" :
			return "����";
		case "Entity" :
			return "��ҵ";
		case "Bank" :
			return "����";
		case "Ship" :
			return "����";
		case "Keys" :
			return "�ؼ���";
		case "PS" :
			return "����";
		case "Other" :
			return "����ʵ��";
		case "01" :
			return "����,����";
		case "02" :
			return "����";
		case "03" :
			return "����";
		case "04" :
			return "����";
		case "05" :
			return "����";
		case "06" :
			return "����";
		case "07" :
			return "��Ա";
		case "08" :
			return "��ҵ";
		case "09" :
			return "���λ��ڽ���֯";
		case "Individual" :
			return "����";
		case "Organization" :
			return "��֯";
		case "Vessel" :
			return "����";
		case "Country" :
			return "����";
		case "Bank" :
			return "����";
		case "City" :
			return "����";
		default:
			return value;
	}
}

function getRKindDesc(value) {
	switch(value) {
		case "B" :
			return "������";
		case "W" :
			return "������";
		case "K" :
			return "�ؼ���";
		default:
			return value;
	}
}

function getRLevelDesc(value) {
	return "H" == value ? "<span style='color:red;'>����</span>" : "ͨ��";
}

function showBESConfigInfo(jqid, id, type, title) {
	var data = $("#"+jqid).jqGrid('getRowData', id);
	var json = $.parseJSON(data[type].replaceAll('\\\\"','"'));
	
	var rs = "";
	for (var k in json) {
		if (typeof json[k] == "object") {
			rs += "["+k+"]:\r\n";
			for (var o in json[k]) {
				rs += "["+o+"] : " + json[k][o] + "\r\n";
			}
		} else {
			rs += "[" + k + "] : " + json[k] + "\r\n";
		}
	}
	if (!$('#'+type)[0]) {
		$("body").append('<div id="'+type+'Window" style="display: none;"><textarea rows="15" cols="109" id="'+type+'" name="'+type+'" readonly class="CHAR P" ></textarea></div>');
	}
	$('#'+type).val(rs);
	createWindowByWidthAndHeight(type+'Window', 800, 255, title);
}

function showBESTargetInfo(jqid, id, type, title) {
	var data = $("#"+jqid).jqGrid('getRowData', id);
	var json = $.parseJSON(data[type].replaceAll('\\\\"','"'));
	
	if (!$('#'+type)[0]) {
		$("body").append('<div id="'+type+'Window" style="display: none;"><table id="'+type+'" ></table></div>');
	}
	
	$('#'+type).GridUnload();
	
	$('#'+type).jqGrid({
        datatype:"local",
        rownumbers:true,
		width:780,
        height:180,
		altRows:true,
		altclass:'ui-priority-secondary',
        sortable:false, 	
        rowNum:-1,
		forceFit : true,
		colNames:['����Ŀ��','����','Ȩ��(%)','��ֵ(%)'],
        colModel:[
						{name:'TARGET',index:'TARGET',sortable:false},
						{name:'PROPERTY',index:'PROPERTY',sortable:false},
						{name:'WEIGHT',index:'WEIGHT',sortable:false},
						{name:'PERCENT',index:'PERCENT',sortable:false}
					]
    });
	
	var data = {TARGET:"",PROPERTY:"",WEIGHT:0,PERCENT:0};
	for (var k in json) {
		data.TARGET = getTargetDescByName(json[k]["TARGET"]);
		data.PROPERTY = getPropertyDescByName(json[k]["PROPERTY"]);
		data.WEIGHT = json[k]["WEIGHT"];
		data.PERCENT = json[k]["PERCENT"];
		
		var allRows = jQuery("#"+type).jqGrid('getDataIDs');
		var rowId = 1;
		if (allRows.length > 0) rowId = Math.max.apply({},allRows) + 1;
		jQuery("#"+type).jqGrid('addRowData',rowId,data,'last');
	}
	
	createWindowByWidthAndHeight(type+'Window', 800, 255, title);
}

function showBESDetail(id, rkind, rt) {
	var src = "/UtanWeb/SYS/sysPage/auto_submit.html?TASKNAME=BES_TA_DS_INQ_I&_T="+rkind;
	var title = "";
	rt = encodeURI(rt);
	
	switch(rkind) {
		case "B" :
			src += "&SINGLESELECT=ID,MODIFYTIME&ID="+id+"&MODIFYTIME="+rt;
			title = "��������ϸ��Ϣ";
			break;
		case "W" :
			src += "&SINGLESELECT=ID,MODIFYTIME&ID="+id+"&MODIFYTIME="+rt;
			title = "��������ϸ��Ϣ";
			break;
		case "K" :
			src += "&SINGLESELECT=ID,CREATE_TIME&ID="+id+"&CREATE_TIME="+rt;
			title = "�ؼ�����ϸ��Ϣ";
			break;
	}
	
	createWindow("besDetail", title, 1000, 440);
	document.getElementById("besDetailIFrame").src = src;
}

function showBESLogsDetail(id, t) {
	var src = "/UtanWeb/SYS/sysPage/auto_submit.html?TASKNAME=BES_TA_HIS_INQ_O&SINGLESELECT=BESKEY&BESKEY="+id;
	var title = "��������ϸ��Ϣ";
	
	var w = 900;
	var h = 440;
	if ("P" == t) {
		w = document.body.clientWidth - 50;
		h = document.body.clientHeight - 80;
	
		createWindow("besLogsDetail", title, w, h);
		document.getElementById("besLogsDetailIFrame").src = src;
	} else if ("I" == t) {
		w = parent.document.body.clientWidth - 50;
		h = parent.document.body.clientHeight - 80;
		
		parent.createWindow("besLogsDetail", title, w, h);
		parent.document.getElementById("besLogsDetailIFrame").src = src;
	}
}

function getValueTypeDescByType(type){
	var ugc = UtanCache("valuetype") || UtanGlobalCache("valuetype");
	if (!ugc) return type;
	
	var tObj = ugc.get();
	if(!type ||!tObj[type] ||!tObj[type].VALUE_TYPE_DESC){
		return type;
	}else{
		return tObj[type].VALUE_TYPE_DESC;
	}
}

function getTargetDescByName(name){
	var ugc = UtanCache("target") || UtanGlobalCache("target");
	if (!ugc) return name;
	
	var tObj = ugc.get();
	if(!name ||!tObj[name] ||!tObj[name].TARGET_DESC){
		return name;
	}else{
		return tObj[name].TARGET_DESC;
	}
}

function parseSanctionList(list) {
	if (!list) return "";
	
	if (list == "BMS") {
		return "[1]:�ֹ�ά������.";
	}
	
	var ss = "";
	var ls = list.split(",");
	for (var i = 1; i <= ls.length; i ++) {
		ss += "["+i+"]:" + getSanctionNameByCode(ls[i-1]);
		if (i != ls.length)ss += "<br />";
	}
	
	return ss;
}

function getSanctionNameByCode(code){
	var ugc = UtanCache("SANCTIONS") || UtanGlobalCache("SANCTIONS");
	if (!ugc) return code;
	
	var tObj = ugc.get();
	if(!code ||!tObj[code] ||!tObj[code].NAME){
		return code;
	}else{
		return tObj[code].NAME;
	}
}

var __BES_PROPERTY =  [{"NAME":"SHARE","DESC":"����"},{"NAME":"ONLY","DESC":"��ռ"},{"NAME":"FILTER","DESC":"����"},{"NAME":"KEYS","DESC":"�ؼ���"}];
function getPropertyDescByName(name) {
	if (!name) return "";
	for (var i = 0;i < __BES_PROPERTY.length;i++) {
		if (name == __BES_PROPERTY[i].NAME) {
			return __BES_PROPERTY[i].DESC;
		}
	}
	return name;
}

/**
 * ������ר��
 * ��ȡxmlObj�з��Ͻڵ���ΪcNode�ҽڵ�ֵΪcValue�Ķ�Ӧ���ڵ�pNode����
 * @param {Object} xmlObj	����
 * @param {String} pNode	���ڵ���
 * @param {String} cNode	�����ڵ���
 * @param {String} cValue	�����ڵ�ֵ
 */
function getXmlChildNode(xmlObj, pNode, cNode, cValue) {
	var nodes = xmlObj.getElementsByTagName(pNode);
	var node, tNode;
	for (var i = 0; i < nodes.length; i ++) {
		node = nodes[i];
		
		tNode = node.getElementsByTagName(cNode)[0];
		
		if (cValue == (tNode.textContent || tNode.text)) {
			return node.outerHTML || getXml(node);
		}
	}
	
	return null;
}

/**
 * ������ר��
 * ��ȡxmlObj�нڵ���ΪnName�Ľڵ��ֵ
 * @param {Object} xmlObj	����
 * @param {String} nName	�ڵ���
 */
function getXmlNodeValue(xmlObj, nName) {
	var nodes = xmlObj.getElementsByTagName(nName);
	if (!nodes || !nodes[0]) return null;
	
	return nodes[0].textContent || nodes[0].text;
}

/**
 * ������ר��
 * ��ȡxmlObj�з��Ͻڵ���ΪcNode�ҽڵ�ֵΪcValue�Ķ�Ӧ���ڵ�pNode�����нڵ���ΪgNode��Ӧ��ֵ
 * @param {Object} xmlObj	����
 * @param {String} pNode	���ڵ���
 * @param {String} cNode	�����ڵ���
 * @param {String} cValue	�����ڵ�ֵ
 * @param {String} gNode	Ҫ��ȡֵ�Ľڵ���
 */
function getXmlChildNodeValue(xmlObj, pNode, cNode, cValue, gNode) {
	var nodes = xmlObj.getElementsByTagName(pNode);
	var node, tNode;
	for (var i = 0; i < nodes.length; i ++) {
		node = nodes[i];
		
		tNode = node.getElementsByTagName(cNode)[0];
		
		if (cValue == (tNode.textContent || tNode.text)) {
			var ttn = node.getElementsByTagName(gNode)[0];
			return ttn.textContent || ttn.text;
		}
	}
	
	return null;
}

//����IE�����
function getXml(oNode) {
	if (oNode.xml) {//IE
		return oNode.xml;
	}
	var serializer =new XMLSerializer();
	return serializer.serializeToString(oNode);
}

function initEntityTypeList(fld) {
	var l = "BES_DL_ENTITYTYPE";
	var uc = UtanCache("config") || UtanGlobalCache("config");
	if (uc){
		var co = uc.get();
		if (co) {
			var ds = co["BES_BLACKLIST_SOURCE"];
			if ("dowjones" == ds) {
				l = "BES_DL_ENTITYTYPE";
			} else if ("accuity" == ds) {
				l = "BES_DL_ENTITYTYPE_A";
			} else if ("lexisnexis" == ds) {
				l = "BES_DL_ENTITYTYPE_L";
			}
		}
	}
	
	buildDataList(l, {}, $("#"+fld)[0]);
}

function getReasonDesc(value) {
	switch(value) {
		case "dowjones" :
			return "����˹";
		case "accuity" :
			return "���м����";
		case "common" :
			return "��������Դ";
		case "lexisnexis" :
			return "������Ѷ";
		case "keys" :
			return "�������ؼ���";
		case "white" :
			return "������";
		default:
			return value;
	}
}

function buildDataList(dlName, args, obj) {
	if (!dlName || !obj) return;
	
	setFunctionArgs(args , "DL_NAME" , dlName);
	var dls = callFunction("F_DATALIST", args, "DL_VALUES");
	if (!dls) return;
	
	obj.options.length = 0;  
	
	var dlls = dls.split(";");
	var dlv;
	for (var i = 0; i < dlls.length; i ++) {
		dlv = dlls[i].split(":");
		obj.add(new Option(dlv[1], dlv[0]));
	}
}

function showMoreDetail(jqid, id, _ps) {
	var da = $("#"+jqid).jqGrid('getRowData', id);
	var rvo = $.parseJSON(da.RVALUE.replaceAll('\\\\"','"'));
	var _sv = da.SVALUE;
	_sv = _sv.replaceAll('style="color:red;"', "style='color:red;'");
	var svo = $.parseJSON(_sv.replaceAll('\\\\"','"'));
	
	if (_ps) {
		for (var k in svo) {
			if (da.RBLID == k) {
				svo = svo[k];
			}
		}
	}
	
	if (!$('#_DETAIL_INFO')[0]) {
		$("body").append('<div id="_DETAIL_INFO_Window" style="display: none;"><table id="_DETAIL_INFO" ></table></div>');
	}
	
	$('#_DETAIL_INFO').GridUnload();
	
	$('#_DETAIL_INFO').jqGrid({
        datatype:"local",
        rownumbers:true,
		width:980,
        height:430,
		altRows:true,
		altclass:'ui-priority-secondary',
        sortable:false, 	
        rowNum:-1,
		forceFit : true,
		colNames:['����Ŀ��', '��������', '��������'],
        colModel:[
        	{name:"TARGET",index:"TARGET",align:"center",width:100},
    	   	{name:"S",index:"S",width:500,sortable:false},
    	   	{name:"T",index:"T",width:500,sortable:false}]
    });
	
	var data = {TARGET:"",S:"",T:0};
	var i = 0;
	if ("K" == da.RKIND) {
		for (var k in rvo) {
			data.TARGET = getValueTypeDescByType(k);
			data.S = svo[k] || svo["ALL"];
			data.T = "<B style='color:red;'>" + rvo[k] || rvo["ALL"] + "</B>";
			
			var allRows = jQuery("#_DETAIL_INFO").jqGrid('getDataIDs');
			jQuery("#_DETAIL_INFO").jqGrid('addRowData', (i+1), data, 'last');
		}
	} else {
		for (var k in svo) {
			data.TARGET = getTargetDescByName(k);
			data.S = svo[k];
			data.T = "W" == da.RKIND ? "<B style='color:red;'>" + rvo[k] + "</B>" : rvo[k];
			
			var allRows = jQuery("#_DETAIL_INFO").jqGrid('getDataIDs');
			jQuery("#_DETAIL_INFO").jqGrid('addRowData', (i+1), data, 'last');
		}
	}
	
	$("#_DETAIL_INFO tbody tr td[role='gridcell']").each(function(i){
		$(this).css("width", $(this).css("width") ? $(this).css("width") : "1px");
		$(this).css("word-wrap", "break-word");
	});
	
	createWindowByWidthAndHeight('_DETAIL_INFO_Window', 1000, 500, 'details info');
}

function showBESDetailC(id, rkind) {
	var src = "/UtanWeb/SYS/sysPage/auto_submit.html?TASKNAME=BES_TA_DS_INQ_O&_T="+rkind;
	var title = "";
	
	switch(rkind) {
		case "B" :
			src += "&SINGLESELECT=ID&ID="+id;
			title = "��������ϸ��Ϣ";
			break;
		case "W" :
			src += "&SINGLESELECT=ID&ID="+id;
			title = "��������ϸ��Ϣ";
			break;
		case "K" :
			src += "&SINGLESELECT=ID&ID="+id;
			title = "�ؼ�����ϸ��Ϣ";
			break;
	}
	
	createWindow("besDetail", title, 1000, 440);
	document.getElementById("besDetailIFrame").src = src;
}


function getCountryDescByCode4DS(code) {
	if (!code) return code;
	
	var ds = getDataSourceShorName();
	ds = ds.toUpperCase();
	
	var ugc = UtanCache("COUNTRY4" + ds) || UtanGlobalCache("COUNTRY4" + ds);
	if (!ugc) return code;
	
	var tObj = ugc.get();
	
	if(!code || !tObj[code] || !tObj[code].CN_NAME){
		return code;
	}else{
		return tObj[code].CN_NAME;
	}
}

function getCountryNameByCode4DS(code) {
	if (!code) return code;
	
	var ds = getDataSourceShorName();
	ds = ds.toUpperCase();
	
	var ugc = UtanCache("COUNTRY4" + ds) || UtanGlobalCache("COUNTRY4" + ds);
	if (!ugc) return code;
	
	var tObj = ugc.get();
	
	if(!code || !tObj[code] || !tObj[code].EN_NAME){
		return code;
	}else{
		return tObj[code].EN_NAME;
	}
}

function getCountryDescByCodes(codes) {
	if (!codes) return codes;
	
	var cds = codes.split(";");
	var cotys = "";
	for (var c in cds) {
		var coty = getCountryDescByCode(cds[c]);
//		if (cds[c] != coty) {
//			return coty;
//		}
		
		if (coty && cds[c] != coty) {
			cotys = cotys + "\r\n" + coty;
		}
	}
	
	return cotys ? cotys.substring(2) : cotys;
}

function getCountryDescByCode(code){
	if (!code) return code;
	
	var ugc = UtanCache("COUNTRY") || UtanGlobalCache("COUNTRY");
	if (!ugc) return code;
	
	var tObj = ugc.get();
	if(!code || !tObj[code] || !tObj[code].CN_NAME){
		return code;
	}else{
		return tObj[code].CN_NAME;
	}
}

/**
 * ��ȡ����Դ
 * @return {TypeName} 
 */
function getDataSource(){
	var uc = UtanCache("config") || UtanGlobalCache("config");
	if (uc){
		var co = uc.get();
		if (co) {
			return co["BES_BLACKLIST_SOURCE"];
		}
	}
	
	return "";
}

/**
 * ��ȡ����Դ��д
 * @return {TypeName} 
 */
function getDataSourceShorName(){
	var ds = getDataSource();
	switch (ds) {
		case "dowjones":
			return "d";
		case "accuity":
			return "a";
		case "lexisnexis":
			return "l";
		default:
			return "";
	}
}

/**
 * ��ȡ�Ʋ�����ͼ��
 * @param {Object} sanctionType
 * @return {TypeName} 
 */
function getSacntionTypeImgs(sanctionType) {
	if (!sanctionType) return "";
	
	var ds = getDataSourceShorName();
	if ("d" == ds) {//����˹
		var imgo = {img1:{}, img2:"", img3:""};
		var sts = sanctionType.split(";");
		for (var k in sts) {
			var d = sts[k];
			var img1 = ((_Description1List[d] && _Description1List[d].img) ? "<img src='/UtanWeb/images/bes/" + _Description1List[d].img + "' title='��1�ࣺ"+_Description1List[d].desc+"'>&nbsp;" : "");
			if (img1 && !imgo.img1[img1]) imgo.img1[img1] = img1;
			
			var img2 = ((_Description2List[d] && _Description2List[d].img) ? "<img src='/UtanWeb/images/bes/" + _Description2List[d].img + "' title='��2�ࣺ"+_Description2List[d].desc+"'>&nbsp;" : "");
			if (img2 && !imgo.img2) imgo.img2 = img2;
			
			var img3 = ((_Description3List[d] && _Description3List[d].img) ? "<img src='/UtanWeb/images/bes/" + _Description3List[d].img + "' title='��3�ࣺ"+_Description3List[d].desc+"'>" : "");
			if (img3 && !imgo.img3) imgo.img3 = img3;
		}
		
		var is = "";
		for (var i in imgo.img1) {
			is += imgo.img1[i];
		}
		return is + imgo.img2 + imgo.img3;
	} 
	
	else if ("a" == ds) {//���м����
		var imgo = _ListID[sanctionType];
		if (!imgo) return "";
		
		return "<img src='/UtanWeb/images/bes/" + imgo.img + "' title='"+imgo.desc+"'>&nbsp;";;
	} 
	
	else if ("l" == da) {//������Ѷ
		
	}
	
	return "";
}

function getSacntionTypeDesc(sanctionType) {
	if (!sanctionType) return "";
	
	var ds = getDataSourceShorName();
	if ("d" == ds) {//����˹
		var desc = "";
		var sts = sanctionType.split(";");
		for (var k in sts) {
			var d = sts[k];
			if (_Description1List[d]) desc += "; " + ((_Description1List[d] && _Description1List[d].desc) ? _Description1List[d].desc : "");
		}
		
		return desc.length > 0 ? desc.substring(2) : "";
	}
	
	else if ("a" == ds) {//���м����
		var imgo = _ListID[sanctionType];
		if (!imgo) return "";
		
		return imgo.desc;
	}
	
	else if ("l" == da) {//������Ѷ
		
	}
	
	return "";
}

/**
 * ��ȡƥ������
 * ������������ʾ���ƣ�û���������ʾһ��
 * @param {Object} sv
 */
function getChkValues(rv) {
	var rj = $.parseJSON(rv.replaceAll('\\\\"','"'));
	var o = {t:"", v:""};
	var t = "";
	for (var k in rj) {
		if (k.indexOf("P_") == 0) continue;
		if (k == "NAME") {
			t = k;
			break;
		} else {
			t = k;
		}
	}
	o.t = t;
	o.v = rj[t];
	
	return o;
}

/**
 * ��ȡƥ������
 * �������ؼ��֣�������
 * @param {Object} sv
 */
function getWKValues(rv) {
	var rj = $.parseJSON(rv.replaceAll('\\\\"','"'));
	var o = {t:"", v:""};
	for (var k in rj) {
		if (k.indexOf("P_") == 0) continue;
		
		o.t = k;
		o.v = rj[k];
		break;
	}
	
	return o;
}

/**
 * ��ȡƥ������
 * ���ԡ����Ƶ�ַ
 * @param {Object} sv
 */
function getPSValues(rv, id) {
	var rj = $.parseJSON(rv.replaceAll('\\\\"','"'));
	var o = {t:"", v:""};
	var p;
	for (var k in rj) {
		if (k.indexOf("P_") == 0) continue;
		
		if (k == id) {
			p = rj[k];
		}
	}
	
	if (p.NAME) {
		o.t = "NAME";
		o.v = p["NAME"];
	} else {
		for (var q in p) {
			if (q.indexOf("P_") == 0) continue;
			
			o.t = q;
			o.v = p[q];
		}
	}
	
	return o;
}

function createIDSValue(idFld) {
	var idsType = $("#IDSTYPE").val();
	var ids = $("#"+idFld+"_T").val();
	
	if (idsType && ids) {
		ids = idsType + "_" + ids;
	}
	
	$("#"+idFld).val(ids);
}

function initIDSValue(idFld) {
	var ids = $("#"+idFld).val();
	
	if (ids) {
		var p = ids.indexOf("_");
		if (p > 0) {
			$("#IDSTYPE").val(ids.substring(0, p));
			ids = ids.substring(p + 1);
		}
		$("#"+idFld+"_T").val(ids);
	}
}
//add for BES*****************************************************BES*************************************************************END***

function RN_formatter(cellvalue, options, rowObject){
	if (cellvalue) {
		return "<pre>"+cellvalue+"</pre>"
	} else {
		return cellvalue;
	}
}

function RN_unformat(cellvalue, options, rowObject){
	if (cellvalue) {
		return cellvalue.replace(/^<pre>/,"").replace(/<\/pre>$/,"");
	} else {
		return cellvalue;
	}
}

/**
 * 
 * У��grid�пͻ��˺���ͻ��Ƿ�ƥ��
 * У�������ˣ����ˣ��շѣ����˲�ת��4��ҳ��submitchk�н��С�
 * 
 * @custId       �ͻ���
 * @gridName     grID
 * @accFieldName �˺��ֶ�
 * @amtFieldName �˺Ŷ�Ӧ���
 * 
 **/
function submitChkAccNo(custId, gridName, accFieldName, amtFieldName){	
	var allRows = jQuery('#' + gridName).jqGrid('getDataIDs');
	var rtnInfo = "";  var args = {}; var rtnMsg = "" ; var rtnFlag = "";
	
    for (var i = 0; i < allRows.length; i++){	
    	data = jQuery('#' + gridName).jqGrid('getRowData',allRows[i]);
    	if( eval('data.' + amtFieldName) && FormatStr2Amt(eval('data.' + amtFieldName)) > 0 && eval('data.' + accFieldName)){
			setInterfaceArgs(args, {
				"SUBMIT_CHK_ACC_NO" : eval('data.' + accFieldName), //�˺�
				"SUBMIT_CHK_CUST_ID" : custId
				});
    		rtnInfo = callInterface("QureyBaseAccount", args);
    		
    		rtnMsg = rtnInfo.chkRtnMsg;
    		rtnFlag = rtnInfo.chkRtnFlag;
    		if(rtnFlag == "false") break;  //�����Ϳͻ���ƥ���ֹͣУ��
    	}
    }
    return rtnMsg;
}



/**
 * У�����ˣ����˽������շѵ��˺��Ƿ��뽻�׿ͻ�ƥ�䡣
 * 
 * @custId            �ͻ�ID
 * @feeAccFieldName   �շ��˺��ֶ�
 * 
 **/
function submitChkFeeAccNo (custId, feeAccFieldName){
	var feeAccNo = $('#' + feeAccFieldName).val();
	var rtnInfo = "";  var args = {}; var rtnMsg = "" ;
	
	if(feeAccNo){
		setInterfaceArgs(args, {
			"SUBMIT_CHK_ACC_NO" : feeAccNo, //�˺�
			"SUBMIT_CHK_CUST_ID" : custId
			});
    	rtnInfo = callInterface("QureyBaseAccount", args);
    	rtnMsg = rtnInfo.chkRtnMsg;
	}	
	
	return rtnMsg;
}


function getGridSelectFormatter(cellvalue, options, rowObject){
	var editoptionsValue = options.colModel.editoptions.value;
	if(typeof editoptionsValue==="function"){
		editoptionsValue = editoptionsValue();
	}
	var optionsObj = {}; // ����{1:"one",2:"two",3:"three"}
	if(typeof editoptionsValue==="string"){ // ���� "1:one;2:two;3:three"
		var optionsArray = editoptionsValue.split(";");
		for(var i=0; i <optionsArray.length; i++){
			var oneOptionStr = optionsArray[i];
			var oneOptionArr = oneOptionStr.split(":");
			optionsObj[oneOptionArr[0]] = oneOptionArr[1]; 
		}
	}else if(typeof editoptionsValue==="object"){
		optionsObj = editoptionsValue;
	}
	return optionsObj[cellvalue] || cellvalue;
}

function getGridSelectUnformat(cellvalue, options, rowObject){
	var editoptionsValue = options.colModel.editoptions.value;
	if(typeof editoptionsValue==="function"){
		editoptionsValue = editoptionsValue();
	}
	var optionsObjReverse = {}; // ����{"one":1,"two":2,"three":3}
	if(typeof editoptionsValue==="string"){ // ���� "1:one;2:two;3:three"
		var optionsArray = editoptionsValue.split(";");
		for(var i=0; i <optionsArray.length; i++){
			var oneOptionStr = optionsArray[i];
			var oneOptionArr = oneOptionStr.split(":");
			optionsObjReverse[oneOptionArr[1]] = oneOptionArr[0]; 
		}
	}else if(typeof editoptionsValue==="object"){
		for(var key in editoptionsValue){
			optionsObjReverse[editoptionsValue[key]] = key;
		}
	}
	return optionsObjReverse[cellvalue];
}

function checkOnJQGrid(gridName, rowId, triggerFlag){
	var allRows = jQuery("#"+gridName).jqGrid('getGridParam','selarrrow');
	if($.inArray(rowId,allRows)==-1){
		jQuery("#"+gridName).jqGrid("setSelection",rowId,triggerFlag);	
	}
}

function checkOffJQGrid(gridName, rowId, triggerFlag){
	var allRows = jQuery("#"+gridName).jqGrid('getGridParam','selarrrow');
	if($.inArray(rowId,allRows)>-1){
		jQuery("#"+gridName).jqGrid("setSelection",rowId,triggerFlag);	
	}
}

function enableJQGrid(gridName, rowId){
	$("#"+gridName+" #jqg_"+rowId).prop("disabled", false);
}

function disableJQGrid(gridName, rowId){
	$("#"+gridName+" #jqg_"+rowId).prop("disabled", true);
}

// add by fanr 2016-10-19 ���׿��ƿ����޸Ļ���  begin

var custRateEditEnable = true;
function setCustRateEditEnable(enableFlag){
	custRateEditEnable = enableFlag;
}

// add by fanr 2016-10-19 ���׿��ƿ����޸Ļ��� end

//����ҳ��������
function disableAllTabs(){
	for(var i=0;i<tabArr.length;i++){
		var tabld = tabArr[i];
		diableTab(tabld);
	}
}
function diableTab(tabld){
	$("#"+tabld+" :input").prop("disabled",true);
}

// add by wangbq 2017-02-15 �ж�sel�Ƿ�������arr��
function isContains(sel,arr){
	for(var i=0;i<=arr.length;i++){
		if(arr[i].indexOf(sel) > -1){
			return true;
		}
	}
	return false;
}

//add by yangcl for Ԥ������xml����Դ
function getRootXML(xml) {
	return xml.replace(/^<\?xml.*?>/,"");
}
var XML_DATA_DOCUMENT_DEFINE_JSON= null;
function summaryCommonJasperReport(summarXML) {
	$("#" + summarXML).val("");
	var xml = "<?xml version='1.0' encoding='UTF-8'?><root>";
	if(!XML_DATA_DOCUMENT_DEFINE_JSON){
		$.ajax( {
			url : '/UtanWeb/XML_DATA_DOCUMENT_DEFINE.json',
			dataType : "json",
			type : 'POST',
			async : false,
			error : function() {
				return;
			},
			success : function(data) {
				XML_DATA_DOCUMENT_DEFINE_JSON = data;
			}
		});
	}
	var count = 0;
	for ( var i = 0; i < XML_DATA_DOCUMENT_DEFINE_JSON.length; i++) {
		var xName = XML_DATA_DOCUMENT_DEFINE_JSON[i].name;
		var xId = XML_DATA_DOCUMENT_DEFINE_JSON[i].id;
		var xmlStr = $("#" + xName).val();
		if (xmlStr) {
			var rootXML = getRootXML(xmlStr);
			xml = xml + "<report name='" + xId + "'>" + rootXML + "</report>";
			count = count + 1;
		}
	}
	if (count < 1) {
		$("#" + summarXML).val("");
	} else {
		xml = xml + "</root>";
		$("#" + summarXML).val(xml);
	}
}

/***
 * //V1.5.4����
 * ����checkCustCode(unitCode)��creditCode(creditCode)��HashMap()��������
 */
function checkCustCode(unitCode){
	  var SerialNumber = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	  if (unitCode != null && unitCode!="") {
             if (unitCode.length == 9) {
                 var one = SerialNumber.indexOf(unitCode.substring(0, 1));
                 var two = SerialNumber.indexOf(unitCode.substring(1, 2));
                 var three = SerialNumber.indexOf(unitCode.substring(2, 3));
                 var four = SerialNumber.indexOf(unitCode.substring(3, 4));
                 var five = SerialNumber.indexOf(unitCode.substring(4, 5));
                 var six = SerialNumber.indexOf(unitCode.substring(5, 6));
                 var seven = SerialNumber.indexOf(unitCode.substring(6, 7));
                 var eight = SerialNumber.indexOf(unitCode.substring(7, 8));
                 var tag = 11 - (one * 3 + two * 7 + three * 9 + four * 10
                         + five * 5 + six * 8 + seven * 4 + eight * 2) % 11;
                 if ("X"==(unitCode.substring(8, 9)) && tag != 10) {
                     alert("��֯����[" + unitCode + "]���벻���Ϲ淶");
                     return true;
                 } else if (tag == 11 && !"0"==(unitCode.substring(8, 9))) {
                     alert("��֯����[" + unitCode + "]���벻���Ϲ淶");
                     return true;
                 } else if (!"X"==(unitCode.substring(8, 9)) && tag != 11) {
                     var nine = SerialNumber.indexOf(unitCode.substring(8, 9));
                     if (nine != tag) {
                         alert("��֯����[" + unitCode + "]���벻���Ϲ淶");
                         return true;
                     }
                 } 
             }else if(unitCode.length == 18){
             	   var message = creditCode(unitCode);
                 if("true"==(message)){
//                 	 logger.debug("�������У��ͨ����");
                 }else{
                 		alert("�������[" + unitCode + "]���벻���Ϲ淶!");
                 		return true;
                 }
             }else{
             	 	alert("��֯���������������[" + unitCode + "]���벻���Ϲ淶");
             	 	return true;
             }
         }
	  return false;
}


function creditCode(creditCode){
	var isCreditCode = "true";  
     var error_CreditCode = "������ô�������";  
     var error_CreditCode_min = "������ô��벻��18λ����˶Ժ����䣡";  
     var error_CreditCode_max = "������ô������18λ����˶Ժ����䣡";  
     var error_CreditCode_empty ="������ô��벻��Ϊ�գ�";  
    var datas = new HashMap();;  
     var pre17s;  
     var power = [1,3,9,27,19,26,16,17,20,29,25,13,8,24,10,30,28];
     var code = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','J','K','L','M','N','P','Q','R','T','U','W','X','Y'];  
    for(var i=0;i<code.length;i++){  
        datas.put(code[i]+"",i);  
    }  
    var pre17 = creditCode.substring(0,17);  
    pre17s = pre17.split("");  
    if(""==(creditCode)||" "==(creditCode)){  
        //System.out.println(error_CreditCode_empty);  
        return error_CreditCode_empty;  
    }else if(creditCode.length<18){  
        //System.out.println(error_CreditCode_min);  
        return  error_CreditCode_min;  
    }else if(creditCode.length>18){  
        System.out.println(error_CreditCode_max);  
        return  error_CreditCode_max;  
    }else{  
    	var sum = 0;  
        for(var i=0;i<pre17s.length;i++){  
            var code1 = datas.get(pre17s[i]+"");  
            sum+=power[i]*code1;  
        }  
        var temp = sum%31;  
        temp = temp==0?31:temp; 
        return creditCode.substring(17,18)==(code[31-temp]+"")?isCreditCode:error_CreditCode;  
    }  
}
function HashMap(){  
  //���峤��  
  var length = 0;  
  //����һ������  
  var obj = new Object();  
  /** 
  * �ж�Map�Ƿ�Ϊ�� 
  */  
  this.isEmpty = function(){  
      return length == 0;  
  };  
  /** 
  * �ж϶������Ƿ��������Key 
  */  
  this.containsKey=function(key){  
      return (key in obj);  
  };  

  /** 
  * �ж϶������Ƿ����������Value 
  */  
  this.containsValue=function(value){  
      for(var key in obj){  
          if(obj[key] == value){  
              return true;  
          }  
      }  
      return false;  
  };  
  /** 
  *��map��������� 
  */  
  this.put=function(key,value){  
      if(!this.containsKey(key)){  
          length++;  
      }  
      obj[key] = value;  
  };  

  /** 
  * ���ݸ�����Key���Value 
  */  
  this.get=function(key){  
      return this.containsKey(key)?obj[key]:null;  
  };  

  /** 
  * ���ݸ�����Keyɾ��һ��ֵ 
  */  
  this.remove=function(key){  
      if(this.containsKey(key)&&(delete obj[key])){  
          length--;  
      }  
  };  
  /** 
  * ���Map�е�����Value 
  */  
  this.values=function(){  
      var _values= new Array();  
      for(var key in obj){  
          _values.push(obj[key]);  
      }  
      return _values;  
  };  
  /** 
  * ���Map�е�����Key 
  */  
  this.keySet=function(){  
      var _keys = new Array();  
      for(var key in obj){  
          _keys.push(key);  
      }  
      return _keys;  
  };  
  /** 
  * ���Map�ĳ��� 
  */  
  this.size = function(){  
      return length;  
  };  
  /** 
  * ���Map 
  */  
  this.clear = function(){  
      length = 0;  
      obj = new Object();  
  };  
}
function getCustMgr(){
	var custIdKey = getContFldCUSTID();
	if(custIdKey == null || custIdKey == ""){
		return;
	}
	var custId = $('#'+custIdKey).val();
	if(custId == null || custId == ""){
		return;
	}
	var jsonData;
	$.ajax({
		url : '/UtanWeb/CommUtilServlet',
		dataType : 'json',
		type : 'POST',
		data : 'OPERTYPE=GETCUSTMGRLIST&&CUSTID=' + custId +"",
		async : false,
		error : function() {
			return;
		},
		success : function(jsonData) {
	            var sel = document.getElementById('CUST_MGR_ID');
	        	if (isEmptyObject(jsonData)) {
					sel.options.length = 1;
	        		return;
				} else {
					sel.options.length = 0;
					var array = jsonData.rows;
					if(jsonData.rows.length > 1){ //�������һ�����ݣ�Ĭ��Ϊ�գ���ҵ����Աѡ��
						sel.options.add(new Option("",""));
					}
					for (var i = 0;i < jsonData.rows.length; i++){
						sel.options.add(new Option(array[i].CUST_MGR_NAME,array[i].CUST_MGR_ID));
					}
				}
	        }
	});
}
function getContFldCUSTID(){
	var currTaskName = $('#CURR_TASKNAME').val();
	if(currTaskName == null || currTaskName == ""){
		return;
	}
	var jsonData = "";
	var custIdKey = "";
	$.ajax({
		url : '/UtanWeb/CommUtilServlet',
		dataType : 'json',
		type : 'POST',
		data : 'OPERTYPE=GETCONTFLDCUSTID&&CURRTASKNAME=' + currTaskName +"",
		async : false,
		error : function() {
			return;
		},
		success : function(response) {
			if(response != null){
				var length = response.rows.length;
				for(var i = 0;i < length;i++){
					jsonData = response.rows[i];
					custIdKey = jsonData.CUST_ID_KEY;
				}
			}
		}
	});
	return custIdKey;
}