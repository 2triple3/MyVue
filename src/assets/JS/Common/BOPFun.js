/**
 * ��괦��
 */

function BOP_DWFK_CHECK(){

     if ($('#CURR_TASKTYPE').val() == 'DELETE') {
        return true;
    }
    var errmsg = "";
    //2012-03-21 clm
    errmsg += DWFK_custypeChcek() + 
    oppuserCheck("DWFK") +
    checkBillNo($("#REGNO_DWFK").val(), $("#TXCODE_DWFK").val(), $("#TXCODE2_DWFK").val()) + 
    DWFK_txamtCheck() +
    DWFK_lcyamtCheck() +
    DWFK_lcyaccCheck() +
    DWDK_fcyamtCheck() +
    DWFK_fcyaccCheck() +
    DWFK_othamtCheck() +
    DWFK_othaccCheck() +
    DWFK_actuamtCheck() +
    DWFK_outchargeamtCheck() +
    DWFK_tenorCheck() +
    DWFK_tc1amtCheck() +
    DWFK_tc2amtCheck() +
    DWFK_contamtCheck()+
    PAYTYPECheck('DWFK')+
	txamtCheck('DWFK') +
	ISREFCheck('DWFK') +
	CUSTYPECheck('DWFK');
    if (errmsg!=null&&errmsg != "") {
        alert(errmsg);
        return false;
    }
    return true;
}

function BOP_JNFK_CHECK(){
     if ($('#CURR_TASKTYPE').val() == 'DELETE') {
        return true;
    }
    var errmsg = "";
    errmsg += JNFK_txamtCheck() +
    JNFK_lcyamtCheck() +
    JNFK_lcyaccCheck() +
    JNFK_fcyamtCheck() +
    JNFK_fcyaccCheck() +
    JNFK_othamtCheck() +
    JNFK_othaccCheck() +
    JNFK_actuamtCheck() +
    JNFK_outchargeamtCheck() +
    JNFK_tenorCheck() +
    JNFK_tc1amtCheck() +
    JNFK_tc2amtCheck() +
    JNFK_contamtCheck() +
	txamtCheck('JNFK') +
	ISREFCheck('JNFK') +
PAYTYPECheck('JNFK')+
	CUSTYPECheck('JNFK');

    if (errmsg!=null&&errmsg != "") {
        alert(errmsg);
        return false;
    }
	return true;
}

function BOP_JNHK_CHECK(){
     if ($('#CURR_TASKTYPE').val() == 'DELETE') {
        return true;
    }
    var errmsg = "";
    errmsg += JNHK_txamtCheck() +
    JNHK_lcyamtCheck() +
    JNHK_lcyaccCheck() +
    JNHK_fcyamtCheck() +
    JNHK_fcyaccCheck() +
    JNHK_othamtCheck() +
    JNHK_othaccCheck() +
    JNHK_CUSTOMSCheck() +
    JNHK_tc1amtCheck() +
    JNHK_tc2amtCheck() +
    JNHK_countryCheck()+
	txamtCheck('JNHK') +
	customsCheck('JNHK') +
	ISREFCheck('JNHK') +
	PAYTYPECheck('JNHK') +
	CUSTYPECheck('JNHK');
    if (errmsg!=null&&errmsg != ""&&errmsg!=undefined) {
        alert(errmsg);
        return false;
    }
	return true;
}

function BOP_JNSR_CHECK(){
     if ($('#CURR_TASKTYPE').val() == 'DELETE') {
        return true;
    }
    var errmsg = "";
    errmsg += JNSR_txamtCheck() +
    JNSR_lcyamtCheck() +
    JNSR_lcyaccCheck() +
    JNSR_fcyamtCheck() +
    JNSR_fcyaccCheck() +
    JNSR_othamtCheck() +
    JNSR_othaccCheck() +
    JNSR_actuamtCheck() +
    JNSR_inchargeamtCheck() +
    JNSR_REFNOCheck() +
    JNSR_tc1amtCheck() +
    JNSR_tc2amtCheck() +
    JNSR_chkamtCheck() +
    PAYTYPECheck('JNSR')+
	txamtCheck('JNSR') +
	ISREFCheck('JNSR') +
	CUSTYPECheck('JNSR');
    if (errmsg!=null&&errmsg != "") {
        alert(errmsg);
        return false;
    }
	return true;
}
/*
 * ����oppuser,checkBillNoУ��
 * @return {TypeName} 
 */
function BOP_SWSR_CHECK(){
     if ($('#CURR_TASKTYPE').val() == 'DELETE') {
        return true;
    }
    var errmsg = "";
    //clm2012-03-21
    errmsg = oppuserCheck('SWSR') +
    checkBillNo($("#BILLNO_SWSR").val(), $("#TXCODE_SWSR").val(), $("#TXCODE2_SWSR").val()) +
    SWSR_txamtCheck() +
    SWSR_lcyamtCheck() +
    SWSR_lcyaccCheck() +
    SWSR_fcyamtCheck() +
    SWSR_fcyaccCheck() +
    SWSR_othamtCheck() +
    SWSR_othaccCheck() +
    SWSR_inchargeamtCheck() +
    SWSR_outchargeamtCheck() +
    SWSR_REFNOCheck() +
    SWSR_tc1amtCheck() +
    SWSR_tc2amtCheck() +
    SWSR_osamtCheck() +
    SWSR_chkamtCheck() +
    PAYTYPECheck('SWSR')+
	txamtCheck('SWSR') +
	ISREFCheck('SWSR') +
	CUSTYPECheck('SWSR');
    if (errmsg!=null&&errmsg != "") {
        alert(errmsg);
        return false;
    }
	return true;
}

function BOP_JWHK_CHECK(){
     if ($('#CURR_TASKTYPE').val() == 'DELETE') {
        return true;
    }
    var errmsg = "";
    //2012-03-21 clm
    errmsg += JWHK_custypeChcek() +
    oppuserCheck('JWHK') +
    checkBillNo($("#REGNO_JWHK").val(), $("#TXCODE_JWHK").val(), $("#TXCODE2_JWHK").val()) +
    JWHK_txamtCheck() + 
    JWHK_lcyamtCheck() + 
    JWHK_lcyaccCheck() + 
    JWHK_fcyamtCheck() +
    JWHK_fcyaccCheck() +
    JWHK_othamtCheck() +
    JWHK_othaccCheck() +
    JWHK_CUSTOMSCheck() +
    JWHK_tc1amtCheck() +
    JWHK_tc2amtCheck() +
	txamtCheck('JWHK') +
	customsCheck('JWHK') +
	ISREFCheck('JWHK') +
	PAYTYPECheck('JWHK') +
	CUSTYPECheck('JWHK');
    if (errmsg != "") {
        alert(errmsg);
        return false;
    }
    return true;
}

function JWHK_custypeChcek(){
    var cvalue = $("#CUSTYPE_JWHK").val();
    var rptno = $("#RPTNO_JWHK").val();
    var rptnont = "ABCD";
    var rptnouw = "JK";
	if(rptno.length==0)
		return "";
	else if(rptno.length==22)
	{
		var str19 = rptno.substring(18, 19);
		if (cvalue == "C") {
			if (rptno != "" && rptnont.indexOf(str19) < 0) {
				return "�տ������������걨�����е�19 λ��ĸ�������ĺ���һ��;\r\n";
			}
		}
		else if (cvalue == "D" || cvalue == "F") {
			if (rptno != "" && rptnouw.indexOf(str19) < 0) {
				return "�տ������������걨�����е�19 λ��ĸ�������ĺ���һ��;\r\n";
			}
		}
		return "";
	}
	else return "�걨�ű���Ϊ22λ��";
    
    
    
}

function JWHK_txamtCheck(){
    var txamt = $("#TXAMT_JWHK").val();
    if (txamt >= "0" && txamt.indexOf(".") < 0) {
        return "";
    }
    else {
        return "����������� 0,��С��λ;\r\n";
    }
    
}

function JWHK_lcyamtChange(){
    var lcyamt = $("#LCYAMT_JWHK").val();
    var exrate = document.getElementById("EXRATE_JWHK");
    var lcyacc = document.getElementById("LCYACC_JWHK");
    if (lcyamt > "0") {
        setProperty(exrate, "M");
        setProperty(lcyacc, "M");
    }
    else {
        setProperty(exrate, "O");
        setProperty(lcyacc, "O");
    }
}

function JWHK_lcyamtCheck(){
    var lcyamt = $("#LCYAMT_JWHK").val();
    var lcyacc = $("#LCYACC_JWHK").val();
    if (lcyamt != "" && lcyamt < "0" || lcyamt.indexOf(".") > -1) {
        return "�������С�� 0,����С��λ;\r\n";
    }
    if (lcyacc != "" && lcyamt < "0") {
        return "�˺Ų�Ϊ�����Ӧ��������>0;\r\n";
    }
    return "";
}

function JWHK_lcyaccCheck(){
    var exrate = $("#EXRATE_JWHK").val();
    var lcyamt = $("#LCYAMT_JWHK").val();
    var lcyacc = $("#LCYACC_JWHK").val();
    if ((exrate == ""||Number(exrate)==0) && (lcyamt == ""||Number(lcyamt)==0) && lcyacc == "") {
        return "";
    }
    if (exrate != "" && lcyamt != "" && lcyacc != "") {
        return "";
    }
    return "�����������ʡ������ʺ��п���  ������ͬʱ�ջ�ͬʱ��ֵ;\r\n";
}

function JWHK_fcyamtChange(){
    var fcyamt = $("#FCYAMT_JWHK").val();
    var fcyacc = document.getElementById("FCYACC_JWHK");
    if (fcyamt > "0") {
        setProperty(fcyacc, "M");
    }
    else {
        setProperty(fcyacc, "O");
    }
}

function JWHK_fcyamtCheck(){
    var fcyamt = $("#FCYAMT_JWHK").val();
    var fcyacc = $("#FCYACC_JWHK").val();
    if (fcyamt != "" && fcyamt < "0" || fcyamt.indexOf(".") > -1) {
        return "�ֻ����С�� 0,����С��λ;\r\n";
    }
    if (fcyacc != "" && fcyamt <= "0") {
        return "�˺Ų�Ϊ�����Ӧ�ֻ������>0;\r\n";
    }
    return "";
}

function JWHK_fcyaccCheck(){
    var fcyamt = $("#FCYAMT_JWHK").val();
    var fcyacc = $("#FCYACC_JWHK").val();
if ((fcyamt == ""||Number(fcyamt)==0) && fcyacc == "") {
        return "";
    }
    if (fcyamt != "" && fcyacc != "") {
        return "";
    }
    return "�ֻ���ֻ��ʺŻ�ͬʱ�գ���ͬʱ��ֵ;\r\n";
}

function JWHK_othamtChange(){
    var othamt = $("#OTHAMT_JWHK").val();
    var othacc = document.getElementById("OTHACC_JWHK");
    if (othamt > "0") {
        if (othamt == "0") {
            setProperty(othacc, "P");
        }
        else {
            setProperty(othacc, "M");
        }
    }
    else {
        setProperty(othacc, "O");
    }
}

function JWHK_othamtCheck(){
	/*
    var othamt = $("#OTHAMT_JWHK").val();
    var lcyamt = $("#LCYAMT_JWHK").val();
    var fcyamt = $("#FCYAMT_JWHK").val();
    var txamt = $("#TXAMT_JWHK").val();
    var othacc = $("#OTHACC_JWHK").val();
	*/
	var othamt = getFieldValue(document.UTFORM.OTHAMT_JWHK);
	var lcyamt = getFieldValue(document.UTFORM.LCYAMT_JWHK);	
	var fcyamt = getFieldValue(document.UTFORM.FCYAMT_JWHK);
	var txamt = getFieldValue(document.UTFORM.TXAMT_JWHK);
	var othacc = getFieldValue(document.UTFORM.OTHACC_JWHK);
	
	
	
    if (othamt != "" && othamt < "0" ) {
        return "��������С�� 0,����С��λ;\r\n";
    }
    if (othacc != "" && othamt < "0") {
        return "�����˺Ų�Ϊ�����Ӧ����������>0;\r\n";
    }
    if (lcyamt == "" && fcyamt == "" && othamt == "") {
        return "������ֻ�����������������һ��;\r\n";
    }
    var s = Number(lcyamt) + Number(fcyamt) + Number(othamt) - Number(txamt);
    if (s > 0) {
        return "������ֻ���������֮�Ͳ��ܴ����������;\r\n";
    }
    return "";
}

function JWHK_othaccCheck(){
    var othamt = $("#OTHAMT_JWHK").val();
    var othacc = $("#OTHACC_JWHK").val();
    if (othamt == "" && othacc == "") {
        return "";
    }
    if (othamt == "0" && othacc != "") {
        return "�������Ϊ 0�������ʺ�ӦΪ��;\r\n";
    }
    if (othamt != "" && othacc != "") {
        return "";
    }
    if (othamt == "0" && othacc == "") {
        return "";
    }
    return "�������,�����ʺŻ�ͬʱ�գ���ͬʱ��ֵ;\r\n";
}

function JWHK_CUSTOMSCheck(){
	//2012-03-21 clm 
	/*
	var sendFlagObj = document.getElementById("SEND_HXXX");
	if(sendFlagObj!=null&&!sendFlagObj.checked) return "";
	
	var data;
	var allRows = jQuery("#CURRCUSTOM_JWHK").jqGrid('getDataIDs');
	
  	for(var m=0;m<allRows.length;m++){
  		jQuery('#CURRCUSTOM_JWHK').jqGrid('saveRow', allRows[m], null, 'clientArray');
    	var dataM = $("#CURRCUSTOM_JWHK").jqGrid('getRowData', allRows[m]);	
    	if (dataM.CUSTOMN != null) {
            if (dataM.CUSTOMN != '' && (dataM.CUSTCCY == '' || dataM.CUSTAMT == '' || dataM.OFFAMT == '')) {
                return "���ص��Ų�Ϊ��ʱ���ص����֣����ؽ����κ�ע����������!";
            }

    		for(var n=allRows.length-1;n>m;n--){
	    	jQuery('#CURRCUSTOM_JWHK').jqGrid('saveRow', allRows[n], null, 'clientArray');
	    		var dataN = $("#CURRCUSTOM_JWHK").jqGrid('getRowData', allRows[n]);
	    		if(dataM.CUSTOMN!=''&&dataN.CUSTOMN!=''&&dataM.CUSTOMN==dataN.CUSTOMN){
	    			return "���ص��Ų����ظ�!";
	    		}
	    	}
    	}
    }
    **/
    return "";
}

function JWHK_tc1amtCheck(){
    var tc1amt = $("#TC1AMT_JWHK").val();
    if (tc1amt != "" && tc1amt <= 0 || tc1amt.indexOf(".") > -1) {
        return "��Ӧ���1�������0,����С��λ";
    }
    return "";
}

function JWHK_tc2amtCheck(){
    var tc2amt = $("#TC1AMT_JWHK").val();
    if (tc2amt != "" && tc2amt <= 0 || tc2amt.indexOf(".") > -1) {
        return "��Ӧ���2�������0,����С��λ";
    }
    return "";
}

function SWSR_custypeChcek(){
    var cvalue = $("#CUSTYPE_SWSR").val();
    var rptno = $("#RPTNO_SWSR").val();
    var rptnont = "NPQRST";
    var rptnouw = "UVW";
	if(rptno.length==0)
		return "";
	else if(rptno.length==22)
	{
		 var str19 = rptno.substring(18, 19);
		if (cvalue == "C") {
			if (rptno != "" && rptnont.indexOf(str19) < 0) {
				return "�տ������������걨�����е�19 λ��ĸ�������ĺ���һ��;\r\n";
			}
		}
		else if (cvalue == "D" || cvalue == "F") {
			if (rptno != "" && rptnouw.indexOf(str19) < 0) {
				return "�տ������������걨�����е�19 λ��ĸ�������ĺ���һ��;\r\n";
			}
		}
		return "";
	}else return "�걨�ű���Ϊ22λ";
    
}



function SWSR_txamtCheck(){
    var txamt = $("#TXAMT_SWSR").val();
    if (txamt >= "0" && txamt.indexOf(".") < 0) {
        return "";
    }
    else {
        return "������������� 0,��С��λ;\r\n";
    }
    
}

function SWSR_lcyamtChange(){
    var lcyamt = $("#LCYAMT_SWSR").val();
    var exrate = document.getElementById("EXRATE_SWSR");
    var lcyacc = document.getElementById("LCYACC_SWSR");
    if (lcyamt > "0") {
        setProperty(exrate, "M");
        setProperty(lcyacc, "M");
    }
    else {
        setProperty(exrate, "O");
        setProperty(lcyacc, "O");
    }
}

function SWSR_lcyamtCheck(){
    var lcyamt = $("#LCYAMT_SWSR").val();
    var lcyacc = $("#LCYACC_SWSR").val();
    if (lcyamt != "" && lcyamt < "0" || lcyamt.indexOf(".") > -1) {
        return "������С�� 0,������С��λ;\r\n";
    }
    if (lcyacc != "" && lcyamt < "0") {
        return "�˺Ų�Ϊ�����Ӧ��������>0;\r\n";
    }
    return "";
}

function SWSR_lcyaccCheck(){
    var exrate = $("#EXRATE_SWSR").val();
    var lcyamt = getFieldValue(document.UTFORM.LCYAMT_SWSR);
    var lcyacc = $("#LCYACC_SWSR").val();
   if ((exrate == ""||Number(exrate)==0) && (lcyamt == ""||Number(lcyamt)==0) && lcyacc == "") {
        return "";
    }
    if (Number(exrate) >0 && Number(lcyamt) >0 && lcyacc != "") {
        return "";
    }
    return "���������ʡ�����ʺ��п���  ������ͬʱ�ջ�ͬʱ��ֵ;\r\n";
}

function SWSR_fcyamtChange(){
    var fcyamt = $("#FCYAMT_SWSR").val();
    var fcyacc = document.getElementById("FCYACC_SWSR");
    if (fcyamt > "0") {
        setProperty(fcyacc, "M");
    }
    else {
        setProperty(fcyacc, "O");
    }
}

function SWSR_fcyamtCheck(){
    var fcyamt = $("#FCYAMT_SWSR").val();
    var fcyacc = $("#FCYACC_SWSR").val();
    if (fcyamt != "" && fcyamt < "0" || fcyamt.indexOf(".") > -1) {
        return "�ֻ����С�� 0,��С��λ;\r\n";
    }
    if (fcyacc != "" && fcyamt < "0") {
        return "�˺Ų�Ϊ�����Ӧ�ֻ������>0;\r\n";
    }
    return "";
}

function SWSR_fcyaccCheck(){
    var fcyamt = $("#FCYAMT_SWSR").val();
    var fcyacc = $("#FCYACC_SWSR").val();
if ((fcyamt == ""||Number(fcyamt)==0) && fcyacc == "") {
        return "";
    }
    if (fcyamt != "" && fcyacc != "" && fcyamt > "0") {
        return "";
    }
    return "�ֻ���ֻ��ʺŻ�ͬʱ�գ���ͬʱ��ֵ;\r\n";
}

function SWSR_othamtChange(){
    var othamt = $("#OTHAMT_SWSR").val();
    var othacc = document.getElementById("OTHACC_SWSR");
    if (othamt > "0") {
        if (othamt == "0") {
            setProperty(othacc, "P");
        }
        else {
            setProperty(othacc, "M");
        }
    }
    else {
        setProperty(othacc, "O");
    }
}

function SWSR_othamtCheck(){
	/*
    var othamt = $("#OTHAMT_SWSR").val();
    var lcyamt = $("#LCYAMT_SWSR").val();
    var fcyamt = $("#FCYAMT_SWSR").val();
    var txamt = $("#TXAMT_SWSR").val();
    var othacc = $("#OTHACC_SWSR").val();
	*/
	var othamt = getFieldValue(document.UTFORM.OTHAMT_SWSR);
	var lcyamt = getFieldValue(document.UTFORM.LCYAMT_SWSR);	
	var fcyamt = getFieldValue(document.UTFORM.FCYAMT_SWSR);
	var txamt = getFieldValue(document.UTFORM.TXAMT_SWSR);
	var othacc = getFieldValue(document.UTFORM.OTHACC_SWSR);
	
    if (othamt != "" && othamt < "0" ) {
        return "��������С�� 0,��С��λ;\r\n";
    }
    if (othacc != "" && othamt < "0") {
        return "�����˺Ų�Ϊ�����Ӧ����������>0;\r\n";
    }
    if (lcyamt == "" && fcyamt == "" && othamt == "") {
        return "�����ֻ�����������������һ��;\r\n";
    }
    var s = Number(lcyamt) + Number(fcyamt) + Number(othamt) - Number(txamt);
    if (s > 0) {
        return "�����ֻ���������֮�Ͳ��ܴ����������;\r\n";
    }
    return "";
}

function SWSR_othaccCheck(){
    var othamt = $("#OTHAMT_SWSR").val();
    var othacc = $("#OTHACC_SWSR").val();
    if (othamt == "" && othacc == "") {
        return "";
    }
    if (othamt == "0" && othacc != "") {
    		return "�������Ϊ 0�������ʺ�ӦΪ��;\r\n";
    }
    if (othamt != "" && othacc != "") {
        return "";
    }
    if (othamt == "0" && othacc == "") {
        return "";
    }
    return "�������,�����ʺŻ�ͬʱ�գ���ͬʱ��ֵ;\r\n";
}

function SWSR_inchargeChange(){
    //var icamt = $("#INCHARGEAMT_SWSR").val();
    var icamt = getFieldValue(document.UTFORM.INCHARGEAMT_SWSR);
    var icacc = getFieldValue(document.UTFORM.INCHARGECCY_SWSR);
    var icaccObj = document.getElementById("INCHARGECCY_SWSR");
    var icamtObj = document.getElementById("INCHARGEAMT_SWSR");
    if (icamt > "0" || icacc!='') {
        setProperty(icaccObj, "M");
        setProperty(icamtObj, "M");
    }
    else {
        setProperty(icaccObj, "O");
        setProperty(icamtObj, "O");
    }
}

function SWSR_outchargeChange(){
    var icamt = getFieldValue(document.UTFORM.OUTCHARGEAMT_SWSR);
    var icacc = getFieldValue(document.UTFORM.OUTCHARGECCY_SWSR);
    var icaccObj = document.getElementById("OUTCHARGECCY_SWSR");
    var icamtObj = document.getElementById("OUTCHARGEAMT_SWSR");
    if (icamt > "0") {
        setProperty(icaccObj, "M");
        setProperty(icamtObj, "M");
    }
    else {
        setProperty(icaccObj, "O");
        setProperty(icamtObj, "O");
    }
}



function SWSR_inchargeamtCheck(){
    var icamt = getFieldValue(document.UTFORM.INCHARGEAMT_SWSR);
    var icccy = getFieldValue(document.UTFORM.INCHARGECCY_SWSR);
    if ((icamt == 0 && icccy == "") || (icamt > 0 && icccy != "")) {
        return "";
    }else{
    	return "���ڿ۷ѱ��֡�������ͬʱ����;\r\n";
    }   
}

function SWSR_outchargeamtCheck(){
    var icamt = getFieldValue(document.UTFORM.OUTCHARGEAMT_SWSR);
    var icccy = getFieldValue(document.UTFORM.OUTCHARGECCY_SWSR);
    if ((icamt == 0 && icccy == "") || (icamt > 0 && icccy != "")) {
        return "";
    }else{
    	return "����۷ѱ��֡�������ͬʱ����;\r\n";
    } 
}

function SWSR_REFNOCheck(){
	//2012-03-21 clm
	/*
	var sendFlagObj = document.getElementById("SEND_HXXX");
if(sendFlagObj!=null&&!sendFlagObj.checked) return "";
    var REFNO = $("#REFNO_SWSR").val();
    var list = REFNO.split(';');
    var str = ";"
    for (var i = 0; i < list.length; i++) {
        if (str.indexOf(";" + list[i] + ";") == -1) 
            str += list[i] + ";"
    }
    str = str.substring(1, str.length - 1);
    var strList = str.split(';');
    if (list.length != strList.length) 
        return "�����ջ���������벻���ظ�.";
  **/
    return "";
    
}

function SWSR_tc1amtCheck(){
    var tc1amt = $("#TC1AMT_SWSR").val();
    if (tc1amt != "" && tc1amt <= 0 || tc1amt.indexOf(".") > -1) {
        return "��Ӧ���1�������0,����С��λ";
    }
    return "";
}

function SWSR_tc2amtCheck(){
    var tc2amt = $("#TC1AMT_SWSR").val();
    if (tc2amt != "" && tc2amt <= 0 || tc2amt.indexOf(".") > -1) {
        return "��Ӧ���2�������0,����С��λ";
    }
    return "";
}

function SWSR_osamtCheck(){
	/*
    var osamt = $("#OSAMT_SWSR").val();
    if (osamt != "" && osamt <= 0 || osamt.indexOf(".") > -1) {
        return "�����������0,����С��λ";
    }
    return "";
	*/
	return "";
}

function SWSR_chkamtCheck(){
	/*
	var sendFlagObj = document.getElementById("SEND_HXXX");
	if(sendFlagObj!=null){
	
	}
	var chkamt = getFieldValue(document.UTFORM.CHKAMT_SWSR);
	var refNoObj = document.getElementById("REFNO_SWSR");
	var sendFlag = $('#SEND_HXXX').val();
	var isRef = $('#ISREF_SWSR').val();
	if(sendFlag=='YES'&&isRef=='Y'){
		if(Number(chkamt)==0)
		    setProperty(refNoObj, "O");
		else if(Number(chkamt)>0)
			setProperty(refNoObj, "M");
	}else{
		setProperty(refNoObj, "O");
	}
	*/
    return "";
}

/*
 * modify by lgp at 20120109 for     
 * �������룺�ջ��ܽ�������ڳ��ں����Ľ�� �ͳ����ջ�����������ֶ�ɾ��
 * �������룺�ջ��ܽ�������ڳ��ں����Ľ�� �ͳ����ջ����������ǿ��Ϊ��
 * ��������ص���Ӫ��λ��������װ������ǿ��Ϊ��
 * ���ڻ����ص���Ӫ��λ��������װ������ǿ��Ϊ��
 * ���⸶����װ������ǿ��Ϊ��
 */ 
//edit by ldd �걨��Ϣ����ѡʱ��ǰ���Ϊ���������Ϊ������
function sbxxCheck(){
	var sendFlagObj = document.getElementById("SEND_SBXX");
    if(sendFlagObj == null) return "";
    var BOPFLAG_SWSR = $("#BOPFLAG_SWSR").val();
    var BOPFLAG_DWFK = $("#BOPFLAG_DWFK").val();
    var BOPFLAG_JWHK = $("#BOPFLAG_JWHK").val();
	var type = $("#RPTMETHOD_SWSR").val();
    if(BOPFLAG_SWSR!=null&&BOPFLAG_SWSR=='YES'){
    	var txCodeObj = document.getElementById("TXCODE_SWSR");
		var txAmtObj = document.getElementById("TC1AMT_SWSR");
		var txRemObj = document.getElementById("TXREM_SWSR");
		var countryObj = document.getElementById("COUNTRY_SWSR");ISREF_SWSR
		var crtuserObj = document.getElementById("CRTUSER_SWSR");
		var inpTelcObj = document.getElementById("INPTELC_SWSR");
		var isrefObj = document.getElementById("ISREF_SWSR");
		var rptdateObj = document.getElementById("RPTDATE_SWSR");
	    if(sendFlagObj.checked){
  			setProperty(txCodeObj, "M");
  			setProperty(txAmtObj, "M");
  			setProperty(txRemObj, "M");
  			setProperty(countryObj, "M");
  			setProperty(crtuserObj, "M");
  			setProperty(inpTelcObj, "M");
  			setProperty(isrefObj, "M");
  			setProperty(rptdateObj, "M");
	    }else{
	    	setProperty(txCodeObj, "O");
  			setProperty(txAmtObj, "O");
  			setProperty(txRemObj, "O");
  			setProperty(countryObj, "O");
  			setProperty(crtuserObj, "O");
  			setProperty(inpTelcObj, "O");
  			setProperty(isrefObj, "O");
  			setProperty(rptdateObj, "O");
	    }
    }else if(BOPFLAG_DWFK!=null&&BOPFLAG_DWFK=='YES'){
    	var txCodeObj = document.getElementById("TXCODE_DWFK");
		var txAmtObj = document.getElementById("TC1AMT_DWFK");
		var txRemObj = document.getElementById("TXREM_DWFK");
		var countryObj = document.getElementById("COUNTRY_DWFK");
		var crtuserObj = document.getElementById("CRTUSER_DWFK");
		var inpTelcObj = document.getElementById("INPTELC_DWFK");
		var isrefObj = document.getElementById("ISREF_DWFK");
	    if(sendFlagObj.checked){
  			setProperty(txCodeObj, "M");
  			setProperty(txAmtObj, "M");
  			setProperty(txRemObj, "M");
  			setProperty(countryObj, "M");
  			setProperty(crtuserObj, "M");
  			setProperty(inpTelcObj, "M");
  			setProperty(isrefObj, "M");
	    }else{
	    	setProperty(txCodeObj, "O");
  			setProperty(txAmtObj, "O");
  			setProperty(txRemObj, "O");
  			setProperty(countryObj, "O");
  			setProperty(crtuserObj, "O");
  			setProperty(inpTelcObj, "O");
  			setProperty(isrefObj, "O");
	    }
    }else if(BOPFLAG_JWHK!=null&&BOPFLAG_JWHK=='YES'){
    	var txCodeObj = document.getElementById("TXCODE_JWHK");
		var txAmtObj = document.getElementById("TC1AMT_JWHK");
		var txRemObj = document.getElementById("TXREM_JWHK");
		var countryObj = document.getElementById("COUNTRY_JWHK");
		var crtuserObj = document.getElementById("CRTUSER_JWHK");
		var inpTelcObj = document.getElementById("INPTELC_JWHK");
		var paytypeObj = document.getElementById("PAYTYPE_JWHK");
		var isrefObj = document.getElementById("ISREF_JWHK");
		var rptdateObj = document.getElementById("RPTDATE_JWHK");
	    if(sendFlagObj.checked){
  			setProperty(txCodeObj, "M");
  			setProperty(txAmtObj, "M");
  			setProperty(txRemObj, "M");
  			setProperty(countryObj, "M");
  			setProperty(crtuserObj, "M");
  			setProperty(inpTelcObj, "M");
  			setProperty(paytypeObj, "M");
  			setProperty(isrefObj, "M");
  			setProperty(rptdateObj, "M");
	    }else{
	    	setProperty(txCodeObj, "O");
  			setProperty(txAmtObj, "O");
  			setProperty(txRemObj, "O");
  			setProperty(countryObj, "O");
  			setProperty(crtuserObj, "O");
  			setProperty(inpTelcObj, "O");
  			setProperty(paytypeObj, "O");
  			setProperty(isrefObj, "O");
  			setProperty(rptdateObj, "O");
	    }
    }
    
}
function hxxxCheck(){
		
    var sendFlagObj = document.getElementById("SEND_HXXX");
    if(sendFlagObj == null) return "";
    var BOPFLAG_SWSR = $("#BOPFLAG_SWSR").val();
    var BOPFLAG_JNSR = $("#BOPFLAG_JNSR").val();
    var BOPFLAG_DWFK = $("#BOPFLAG_DWFK").val();
    var BOPFLAG_JNFK = $("#BOPFLAG_JNFK").val();
    var BOPFLAG_JNHK = $("#BOPFLAG_JNHK").val();
    var BOPFLAG_JWHK = $("#BOPFLAG_JWHK").val();
    //2012-03-21 clm
    /*
    if(BOPFLAG_SWSR!=null&&BOPFLAG_SWSR=='YES'){
    	var chkamtObj = document.getElementById("CHKAMT_SWSR");
		  var refNoObj = document.getElementById("REFNO_SWSR");
	    if(sendFlagObj.checked){
  			setProperty(refNoObj, "M");
  			setProperty(chkamtObj, "M");
	    }else{
	    	setProperty(refNoObj, "O");
	    	setProperty(chkamtObj, "O");
	    }
    }else 
    */
    if(BOPFLAG_JNSR!=null&&BOPFLAG_JNSR=='YES'){
		  var txCodeObj = document.getElementById("TXCODE_JNSR");
		  var txAmtObj = document.getElementById("TC1AMT_JNSR");
		  var txRemObj = document.getElementById("TXREM_JNSR");
		  var crtUserObj = document.getElementById("CRTUSER_JNSR");
		  var inpTelcObj = document.getElementById("INPTELC_JNSR");
		  var payattrObj = document.getElementById("PAYATTR_JNSR");
		  var paytypeObj = document.getElementById("PAYTYPE_JNSR");
		  var isrefObj = document.getElementById("ISREF_JNSR");
	    if(sendFlagObj.checked){
	 	    setProperty(txCodeObj, "M");
	    	setProperty(txAmtObj, "M"); 
	    	setProperty(txRemObj, "M");
	    	setProperty(crtUserObj, "M");
	    	setProperty(inpTelcObj, "M");
	    	setProperty(payattrObj, "M");
	    	setProperty(paytypeObj, "M");
	    	setProperty(isrefObj, "M");
	    	/*  	
	    	if($("#CHKAMT_JNSR").val()!=''||$("#CHKAMT_JNSR").val()!=''){
	    			setProperty(refNoObj, "M");
	    			setProperty(chkamtObj, "M");
	    	}else{
		    	setProperty(refNoObj, "O");
		    	setProperty(chkamtObj, "O");
	    	}
	    	*/
	    }else{
	      setProperty(txCodeObj, "O");
	    	setProperty(txAmtObj, "O"); 
	    	setProperty(txRemObj, "O");
	    	setProperty(crtUserObj, "O");
	    	setProperty(inpTelcObj, "O");
	    	setProperty(payattrObj, "O");
	    	setProperty(paytypeObj, "O");
	    	setProperty(isrefObj, "O");
	   // 	setProperty(refNoObj, "O");
	   // 	setProperty(chkamtObj, "O");
	    }
    }else if(BOPFLAG_JWHK!=null&&BOPFLAG_JWHK=='YES'){
		  var CONTRNOObj = document.getElementById("CONTRNO_JWHK");
		  var INVOINOObj = document.getElementById("INVOINO_JWHK");
		//  var CUSMNOObj = document.getElementById("CUSMNO_JWHK");
		//  var IMPDATEObj = document.getElementById("IMPDATE_JWHK");

	    if(sendFlagObj.checked){
	 	    setProperty(CONTRNOObj, "M");
	    	setProperty(INVOINOObj, "M"); 
	    /*	  	
	    	if($("#PAYTYPE_JWHK").val()=='A'){
	    			setProperty(IMPDATEObj, "M");
	    			setProperty(CUSMNOObj, "O");
	    	}else if($("#PAYTYPE_JWHK").val()=='P'){
	    			setProperty(CUSMNOObj, "M");
	    			setProperty(IMPDATEObj, "O");
	    	}else{
		    	setProperty(CUSMNOObj, "O");
		    	setProperty(IMPDATEObj, "O");
	    	}
	    	*/
	    }else{
	      setProperty(CONTRNOObj, "O");
	    	setProperty(INVOINOObj, "O");
	   // 	setProperty(CUSMNOObj, "O");
	   // 	setProperty(IMPDATEObj, "O");
	    }
    }else if(BOPFLAG_JNHK!=null&&BOPFLAG_JNHK=='YES'){
		  var CONTRNOObj = document.getElementById("CONTRNO_JNHK");
		  var INVOINOObj = document.getElementById("INVOINO_JNHK");
		//  var CUSMNOObj = document.getElementById("CUSMNO_JNHK");
		  var crtUserObj = document.getElementById("CRTUSER_JNHK");
		  var inpTelcObj = document.getElementById("INPTELC_JNHK");
		  var RPTDATEObj = document.getElementById("RPTDATE_JNHK");
		//  var IMPDATEObj = document.getElementById("IMPDATE_JNHK");
		  
		  var contrnoObj = document.getElementById("COUNTRY_JNHK");
		  var txcodeObj = document.getElementById("TXCODE_JNHK");
		  var tc1amt = document.getElementById("TC1AMT_JNHK");
		  var txrem = document.getElementById("TXREM_JNHK");
          var isrefObj = document.getElementById("ISREF_JNHK");
	    if(sendFlagObj.checked){
	 	    setProperty(CONTRNOObj, "M");
	    	setProperty(INVOINOObj, "M"); 
	    	setProperty(crtUserObj, "M");
	    	setProperty(inpTelcObj, "M");
	    	setProperty(RPTDATEObj, "M");
			
			setProperty(contrnoObj, "M");
			setProperty(txcodeObj, "M");
			setProperty(tc1amt, "M");
			setProperty(txrem, "M");
			setProperty(isrefObj, "M");
	    /*	  	
	    	if($("#PAYTYPE_JWHK").val()=='P'){
	    			setProperty(CUSMNOObj, "M");
	    			setProperty(IMPDATEObj, "O");
	    	}else{
		    	setProperty(CUSMNOObj, "O");
		    	setProperty(IMPDATEObj, "O");
	    	}
	    	*/
	    }else{
	      setProperty(CONTRNOObj, "O");
	    	setProperty(INVOINOObj, "O"); 
	    //	setProperty(CUSMNOObj, "O");
	    	setProperty(crtUserObj, "O");
	    	setProperty(inpTelcObj, "O"); 
	    	setProperty(RPTDATEObj, "O");
	    //	setProperty(IMPDATEObj, "O");
	    	
	    	setProperty(contrnoObj, "O");
			setProperty(txcodeObj, "O");
			setProperty(tc1amt, "O");
			setProperty(txrem, "O");
			setProperty(isrefObj, "O");
	    }
    }else if(BOPFLAG_DWFK!=null&&BOPFLAG_DWFK=='YES'){
		  var CONTRNOObj = document.getElementById("CONTRNO_DWFK");
		  var INVOINOObj = document.getElementById("INVOINO_DWFK");
		  var crtUserObj = document.getElementById("CRTUSER_DWFK");
		  var inpTelcObj = document.getElementById("INPTELC_DWFK");
		  var RPTDATEObj = document.getElementById("RPTDATE_DWFK");
		  
		 // var IMPDATEObj = document.getElementById("IMPDATE_DWFK");

	    if(sendFlagObj.checked){
	 	    setProperty(CONTRNOObj, "M");
	    	setProperty(INVOINOObj, "M"); 
	    	setProperty(crtUserObj, "M");
	    	setProperty(inpTelcObj, "M");
	    	setProperty(RPTDATEObj, "M");
	    	
	    }else{
	      setProperty(CONTRNOObj, "O");
	    	setProperty(INVOINOObj, "O"); 
	    	setProperty(crtUserObj, "O");
	    	setProperty(inpTelcObj, "O"); 
	    	setProperty(RPTDATEObj, "O");
	    	
	    }
    }else if(BOPFLAG_JNFK!=null&&BOPFLAG_JNFK=='YES'){
		  var CONTRNOObj = document.getElementById("CONTRNO_JNFK");
		  var INVOINOObj = document.getElementById("INVOINO_JNFK");
		  var crtUserObj = document.getElementById("CRTUSER_JNFK");
		  var inpTelcObj = document.getElementById("INPTELC_JNFK");
		  var RPTDATEObj = document.getElementById("RPTDATE_JNFK");
		  var COUNTRYObj = document.getElementById("COUNTRY_JNFK");
		  var TXCODEObj = document.getElementById("TXCODE_JNFK");
		  var TC1AMTObj = document.getElementById("TC1AMT_JNFK");
		  var isrefObj = document.getElementById("ISREF_JNFK");
		 // var IMPDATEObj = document.getElementById("IMPDATE_JNFK");

	    if(sendFlagObj.checked){
	 	    setProperty(CONTRNOObj, "M");
	    	setProperty(INVOINOObj, "M"); 
	    	setProperty(crtUserObj, "M");
	    	setProperty(inpTelcObj, "M");
	    	setProperty(RPTDATEObj, "M");
	    	setProperty(COUNTRYObj, "M");
	    	setProperty(TXCODEObj, "M");
	    	setProperty(TC1AMTObj, "M");
	    	setProperty(isrefObj, "M");
	   // 	setProperty(IMPDATEObj, "M");
	    }else{
	      setProperty(CONTRNOObj, "O");
	    	setProperty(INVOINOObj, "O"); 
	    	setProperty(crtUserObj, "O");
	    	setProperty(inpTelcObj, "O"); 
	    	setProperty(RPTDATEObj, "O");
	    	setProperty(COUNTRYObj, "O");
	    	setProperty(TXCODEObj, "O");
	    	setProperty(TC1AMTObj, "O");
	    	setProperty(isrefObj, "O");
	   // 	setProperty(IMPDATEObj, "O");
	    }
    }
}


function JNSR_txamtCheck(){
	/*
    var txamt = $("#TXAMT_JNSR").val();
    if (txamt >= "0" && txamt.indexOf(".") < 0) {
        return "";
    }
    else {
        return "������������� 0������;\r\n";
    }
	*/
	return "";
    
}

function JNSR_lcyamtChange(){
    var lcyamt = $("#LCYAMT_JNSR").val();
    var exrate = document.getElementById("EXRATE_JNSR");
    var lcyacc = document.getElementById("LCYACC_JNSR");
    if (lcyamt > "0") {
        setProperty(exrate, "M");
        setProperty(lcyacc, "M");
    }
    else {
        setProperty(exrate, "O");
        setProperty(lcyacc, "O");
    }
}

function JNSR_lcyamtCheck(){
    var lcyamt = $("#LCYAMT_JNSR").val();
    var lcyacc = $("#LCYACC_JNSR").val();
    if (lcyamt != "" && lcyamt < "0" || lcyamt.indexOf(".") > -1) {
        return "������С�� 0,����С��λ;\r\n";
    }
    if (lcyacc != "" && lcyamt < "0") {
        return "�˺Ų�Ϊ�����Ӧ��������>0;\r\n";
    }
    return "";
}

function JNSR_lcyaccCheck(){
    var exrate = $("#EXRATE_JNSR").val();
    //var lcyamt = $("#LCYAMT_JNSR").val();
    var lcyamt = getFieldValue(document.UTFORM.LCYAMT_JNSR);
    var lcyacc = $("#LCYACC_JNSR").val();
   if ((exrate == ""||Number(exrate)==0) && (lcyamt == ""||Number(lcyamt)==0) && lcyacc == "") {
        return "";
    }
   if (Number(exrate) >0 && Number(lcyamt) >0 && lcyacc != "") {
        return "";
    }
    return "���������ʡ�����ʺ��п���  ������ͬʱ�ջ�ͬʱ��ֵ;\r\n";
}

function JNSR_fcyamtChange(){
    var fcyamt = $("#FCYAMT_JNSR").val();
    var fcyacc = document.getElementById("FCYACC_JNSR");
    if (fcyamt > "0") {
        setProperty(fcyacc, "M");
    }
    else {
        setProperty(fcyacc, "O");
    }
}

function JNSR_fcyamtCheck(){
    var fcyamt = $("#FCYAMT_JNSR").val();
    var fcyacc = $("#FCYACC_JNSR").val();
    if (fcyamt != "" && fcyamt < "0" || fcyamt.indexOf(".") > -1) {
        return "�ֻ����С�� 0,����С��λ;\r\n";
    }
    if (fcyacc != "" && fcyamt < "0") {
        return "�˺Ų�Ϊ�����Ӧ�ֻ������>0;\r\n";
    }
    return "";
}

function JNSR_fcyaccCheck(){
    var fcyamt = $("#FCYAMT_JNSR").val();
    var fcyacc = $("#FCYACC_JNSR").val();
if ((fcyamt == ""||Number(fcyamt)==0) && fcyacc == "") {
        return "";
    }
    if (fcyamt != "" && fcyacc != "") {
        return "";
    }
    return "�ֻ���ֻ��ʺŻ�ͬʱ�գ���ͬʱ��ֵ;\r\n";
}

function JNSR_othamtChange(){
    var othamt = $("#OTHAMT_JNSR").val();
    var othacc = document.getElementById("OTHACC_JNSR");
    if (othamt > "0") {
        if (othamt == "0") {
            setProperty(othacc, "P");
        }
        else {
            setProperty(othacc, "M");
        }
    }
    else {
        setProperty(othacc, "O");
    }
}

function JNSR_othamtCheck(){
	/*
    var othamt = $("#OTHAMT_JNSR").val();
    var lcyamt = $("#LCYAMT_JNSR").val();
    var fcyamt = $("#FCYAMT_JNSR").val();
    var txamt = $("#TXAMT_JNSR").val();
    var othacc = $("#OTHACC_JNSR").val();
	*/
	var othamt = getFieldValue(document.UTFORM.OTHAMT_JNSR);
	var lcyamt = getFieldValue(document.UTFORM.LCYAMT_JNSR);	
	var fcyamt = getFieldValue(document.UTFORM.FCYAMT_JNSR);
	var txamt = getFieldValue(document.UTFORM.TXAMT_JNSR);
	var othacc = getFieldValue(document.UTFORM.OTHACC_JNSR);
	
    if (othamt != "" && othamt < "0" ) {
        return "��������С�� 0,����С��λ;\r\n";
    }
    if (othacc != "" && othamt <= "0") {
        return "�����˺Ų�Ϊ�����Ӧ����������>0;\r\n";
    }
    if (lcyamt == "" && fcyamt == "" && othamt == "") {
        return "�����ֻ�����������������һ��;\r\n";
    }
    //����У�飺���+�ֻ�+����+���ڿ۷� = ������
    //var s = Number(lcyamt) + Number(fcyamt) + Number(othamt);
    //var st = Number(txamt);
    //if (s != st) {
        //return "�����ֻ���������֮��Ӧ���ڻ����;\r\n";
    //}
    return "";
}

function JNSR_othaccCheck(){
    var othamt = $("#OTHAMT_JNSR").val();
    var othacc = $("#OTHACC_JNSR").val();
    var err = "";
    if (othamt == "" && othacc == "") {
        return "";
    }
    if (othamt == "0" && othacc != "") {
       			return "�������Ϊ 0�������ʺ�ӦΪ��;\r\n";
    }
    if (othamt != "" && othacc != "") {
        return "";
    }
    if (othamt == "0" && othacc == "") {
        return "";
    }
    return "�������,�����ʺŻ�ͬʱ�գ���ͬʱ��ֵ;\r\n";
}

function JNSR_inchargeamtCheck(){
    var icamt = getFieldValue(document.UTFORM.INCHARGEAMT_JNSR);
    var icccy = getFieldValue(document.UTFORM.INCHARGECCY_JNSR);
    if ((icamt == 0 && icccy == "") || (icamt > 0 && icccy != "")) {
        return "";
    }else{
    	return "���ڿ۷ѱ��֡�������ͬʱ����;\r\n";
    }  
}

function JNSR_REFNOCheck(){
	/*
	var sendFlagObj = document.getElementById("SEND_HXXX");
if(sendFlagObj!=null&&!sendFlagObj.checked) return "";
    var REFNO = $("#REFNO_JNSR").val();
    var list = REFNO.split(';');
    var str = ";"
    for (var i = 0; i < list.length; i++) {
        if (str.indexOf(";" + list[i] + ";") == -1) 
            str += list[i] + ";"
    }
    str = str.substring(1, str.length - 1);
    var strList = str.split(';');
    if (list.length != strList.length) 
        return "�����ջ���������벻���ظ�.";
        */
    return "";
}

function JNSR_tc1amtCheck(){
    var tc1amt = $("#TC1AMT_JNSR").val();
    if (tc1amt != "" && tc1amt <= 0 || tc1amt.indexOf(".") > -1) {
        return "��Ӧ���1�������0,����С��λ";
    }
    return "";
}

function JNSR_tc2amtCheck(){
    var tc2amt = $("#TC1AMT_JNSR").val();
    if (tc2amt != "" && tc2amt <= 0 || tc2amt.indexOf(".") > -1) {
        return "��Ӧ���2�������0,����С��λ";
    }
    return "";
}

function JNSR_chkamtCheck(){
	/*
	var chkamt = getFieldValue(document.UTFORM.CHKAMT_JNSR);
	var refNoObj = document.getElementById("REFNO_JNSR");
	var sendFlag = $('#SEND_HXXX').val();
	var isRef = $('#ISREF_JNSR').val();
	if(sendFlag=='YES'&&isRef=='Y'){
		if(Number(chkamt)==0)
		    setProperty(refNoObj, "O");
		else if(Number(chkamt)>0)
			setProperty(refNoObj, "M");
	}else{
		setProperty(refNoObj, "O");
	}
	*/
    return "";
}

function JNHK_txamtCheck(){
	/*
    var txamt = $("#TXAMT_JNHK").val();
    if (txamt >= "0" && txamt.indexOf(".") < 0) {
        return "";
    }
    else {
        return "������������� 0������;\r\n";
    }
	*/
	return "";
    
}

function JNHK_lcyamtChange(){
    var lcyamt = $("#LCYAMT_JNHK").val();
    var exrate = document.getElementById("EXRATE_JNHK");
    var lcyacc = document.getElementById("LCYACC_JNHK");
    if (lcyamt > "0") {
        setProperty(exrate, "M");
        setProperty(lcyacc, "M");
    }
    else {
        setProperty(exrate, "O");
        setProperty(lcyacc, "O");
    }
}

function JNHK_lcyamtCheck(){
    var lcyamt = $("#LCYAMT_JNHK").val();
    var lcyacc = $("#LCYACC_JNHK").val();
    if (lcyamt != "" && lcyamt < "0" || lcyamt.indexOf(".") > -1) {
        return "�������С�� 0,����С��λ;\r\n";
    }
    if (lcyacc != "" && lcyamt < "0") {
        return "�˺Ų�Ϊ�����Ӧ���������>0;\r\n";
    }
    return "";
}

function JNHK_lcyaccCheck(){
    var exrate = $("#EXRATE_JNHK").val();
    var lcyamt = $("#LCYAMT_JNHK").val();
    var lcyacc = $("#LCYACC_JNHK").val();
   if ((exrate == ""||Number(exrate)==0) && (lcyamt == ""||Number(lcyamt)==0) && lcyacc == "") {
        return "";
    }
    if (exrate != "" && lcyamt != "" && lcyacc != "") {
        return "";
    }
    return "�����������ʡ������ʺ��п���  ������ͬʱ�ջ�ͬʱ��ֵ;\r\n";
}

function JNHK_fcyamtChange(){
    var fcyamt = $("#FCYAMT_JNHK").val();
    var fcyacc = document.getElementById("FCYACC_JNHK");
    if (fcyamt > "0") {
        setProperty(fcyacc, "M");
    }
    else {
        setProperty(fcyacc, "O");
    }
}

function JNHK_fcyamtCheck(){
    var fcyamt = $("#FCYAMT_JNHK").val();
    var fcyacc = $("#FCYACC_JNHK").val();
    if (fcyamt != "" && fcyamt < "0" || fcyamt.indexOf(".") > -1) {
        return "�ֻ����С�� 0,����С��λ;\r\n";
    }
    if (fcyacc != "" && fcyamt < "0") {
        return "�˺Ų�Ϊ�����Ӧ�ֻ������>0;\r\n";
    }
    return "";
}

function JNHK_fcyaccCheck(){
    var fcyamt = $("#FCYAMT_JNHK").val();
    var fcyacc = $("#FCYACC_JNHK").val();
if ((fcyamt == ""||Number(fcyamt)==0) && fcyacc == "") {
        return "";
    }
    if (fcyamt != "" && fcyacc != "") {
        return "";
    }
    return "�ֻ���ֻ��ʺŻ�ͬʱ�գ���ͬʱ��ֵ;\r\n";
}

function JNHK_othamtChange(){
    var othamt = $("#OTHAMT_JNHK").val();
    var othacc = document.getElementById("OTHACC_JNHK");
    if (othamt > "0") {
        if (othamt == "0") {
            setProperty(othacc, "P");
        }
        else {
            setProperty(othacc, "M");
        }
    }
    else {
        setProperty(othacc, "O");
    }
}

function JNHK_othamtCheck(){
	/*
    var othamt = $("#OTHAMT_JNHK").val();
    var lcyamt = $("#LCYAMT_JNHK").val();
    var fcyamt = $("#FCYAMT_JNHK").val();
    var txamt = $("#TXAMT_JNHK").val();
    var othacc = $("#OTHACC_JNHK").val();
	*/
	var othamt = getFieldValue(document.UTFORM.OTHAMT_JNHK);
	var lcyamt = getFieldValue(document.UTFORM.LCYAMT_JNHK);	
	var fcyamt = getFieldValue(document.UTFORM.FCYAMT_JNHK);
	var txamt = getFieldValue(document.UTFORM.TXAMT_JNHK);
	var othacc = getFieldValue(document.UTFORM.OTHACC_JNHK);
	
    if (othamt != "" && othamt < "0" ) {
        return "��������С�� 0������С��λ;\r\n";
    }
    if (othacc != "" && othamt < "0") {
        return "�����˺Ų�Ϊ�����Ӧ����������>0;\r\n";
    }
    if (lcyamt == "" && fcyamt == "" && othamt == "") {
        return "������ֻ�����������������һ��;\r\n";
    }
    var s = Number(lcyamt) + Number(fcyamt) + Number(othamt) - Number(txamt);
    if (s > 0) {
        return "������ֻ���������֮�Ͳ��ܴ����������;\r\n";
    }
    return "";
}

function JNHK_othaccCheck(){
    var othamt = $("#OTHAMT_JNHK").val();
    var othacc = $("#OTHACC_JNHK").val();
    if (othamt == "" && othacc == "") {
        return "";
    }
    if (othamt == "0" && othacc != "") {
       			return "�������Ϊ 0�������ʺ�ӦΪ��;\r\n";
    }
    if (othamt != "" && othacc != "") {
        return "";
    }
    if (othamt == "0" && othacc == "") {
        return "";
    }
    return "�������,�����ʺŻ�ͬʱ�գ���ͬʱ��ֵ;\r\n";
}

function JNHK_CUSTOMSCheck(){
	/*
	var sendFlagObj = document.getElementById("SEND_HXXX");
	if(sendFlagObj!=null&&!sendFlagObj.checked) return "";
	
	var allRows = jQuery("#CURRCUSTOM_JNHK").jqGrid('getDataIDs');	
	
	 for(var m=0;m<allRows.length;m++){
	  jQuery('#CURRCUSTOM_JNHK').jqGrid('saveRow', allRows[m], null, 'clientArray');
    	var dataM = $("#CURRCUSTOM_JNHK").jqGrid('getRowData', allRows[m]);
    	
    	if (dataM.CUSTOMN != null) {
            if (dataM.CUSTOMN != '' && (dataM.CUSTCCY == '' || dataM.CUSTAMT == '' || dataM.OFFAMT == '')) {
                return "���ص��Ų�Ϊ��ʱ���ص����֣����ؽ����κ�ע����������.";
            }
             if(dataM.CUSTOMN!='' && dataM.CUSTOMN.length!=9){
            	return "���ص��Ÿ�ʽ����,����!";
            }
	    	for(var n=allRows.length-1;n>m;n--){
	    		jQuery('#CURRCUSTOM_JNHK').jqGrid('saveRow', allRows[n], null, 'clientArray');
	    		var dataN = $("#CURRCUSTOM_JNHK").jqGrid('getRowData', allRows[n]);
	    		if(dataM.CUSTOMN!=''&&dataN.CUSTOMN!=''&&dataM.CUSTOMN==dataN.CUSTOMN){
	    			return "���ص��Ų����ظ�!";
	    		}
	    	}
    	}
    }
    */
    return "";
}

function JNHK_tc1amtCheck(){
    var tc1amt = $("#TC1AMT_JNHK").val();
    if (tc1amt != "" && tc1amt <= 0 || tc1amt.indexOf(".") > -1) {
        return "��Ӧ���1�������0,����С��λ";
    }
    return "";
}

function JNHK_tc2amtCheck(){
    var tc2amt = $("#TC1AMT_JNHK").val();
    if (tc2amt != "" && tc2amt <= 0 || tc2amt.indexOf(".") > -1) {
        return "��Ӧ���2�������0,����С��λ";
    }
    return "";
}

function JNHK_countryCheck(){
    var jnhkcountry = $("#COUNTRY_JNHK").val();
    if (jnhkcountry != "" && jnhkcountry !="CHN") {
        return "���ڻ���������Ϊ���й�����˶�ȷ��";
    }
    return "";
}


function JNFK_txamtCheck(){
	/*
    var txamt = $("#TXAMT_JNFK").val();
    if (txamt >= "0" && txamt.indexOf(".") < 0) {
        return "";
    }
    else {
        return "������������� 0������;\r\n";
    }
	*/
	return "";
    
}

function JNFK_lcyamtChange(){
    var lcyamt = $("#LCYAMT_JNFK").val();
    var exrate = document.getElementById("EXRATE_JNFK");
    var lcyacc = document.getElementById("LCYACC_JNFK");
    if (lcyamt > "0") {
        setProperty(exrate, "M");
        setProperty(lcyacc, "M");
    }
    else {
        setProperty(exrate, "O");
        setProperty(lcyacc, "O");
    }
}

function JNFK_lcyamtCheck(){
    var lcyamt = $("#LCYAMT_JNFK").val();
    var lcyacc = $("#LCYACC_JNFK").val();
    if (lcyamt != "" && lcyamt < "0" || lcyamt.indexOf(".") > -1) {
        return "�������С�� 0,��С�� λ;\r\n";
    }
    if (lcyacc != "" && lcyamt < "0") {
        return "�˺Ų�Ϊ�����Ӧ���������>0;\r\n";
    }
    return "";
}

function JNFK_lcyaccCheck(){
    var exrate = $("#EXRATE_JNFK").val();
    var lcyamt = $("#LCYAMT_JNFK").val();
    var lcyacc = $("#LCYACC_JNFK").val();
   if ((exrate == ""||Number(exrate)==0) && (lcyamt == ""||Number(lcyamt)==0) && lcyacc == "") {
        return "";
    }
    if (exrate != "" && lcyamt != "" && lcyacc != "") {
        return "";
    }
    return "�����������ʡ������ʺ��п���  ������ͬʱ�ջ�ͬʱ��ֵ;\r\n";
}

function JNFK_fcyamtChange(){
    var fcyamt = $("#FCYAMT_JNFK").val();
    var fcyacc = document.getElementById("FCYACC_JNFK");
    if (fcyamt > "0") {
        setProperty(fcyacc, "M");
    }
    else {
        setProperty(fcyacc, "O");
    }
}

function JNFK_fcyamtCheck(){
    var fcyamt = $("#FCYAMT_JNFK").val();
    var fcyacc = $("#FCYACC_JNFK").val();
    if (fcyamt != "" && fcyamt < "0" || fcyamt.indexOf(".") > -1) {
        return "�ֻ����С�� 0,��С��λ;\r\n";
    }
    if (fcyacc != "" && fcyamt < "0") {
        return "�˺Ų�Ϊ�����Ӧ�ֻ������>0;\r\n";
    }
    return "";
}

function JNFK_fcyaccCheck(){
    var fcyamt = $("#FCYAMT_JNFK").val();
    var fcyacc = $("#FCYACC_JNFK").val();
if ((fcyamt == ""||Number(fcyamt)==0) && fcyacc == "") {
        return "";
    }
    if (fcyamt != "" && fcyacc != "" && fcyamt > "0") {
        return "";
    }
    return "�ֻ���ֻ��ʺŻ�ͬʱ�գ���ͬʱ��ֵ;\r\n";
}

function JNFK_othamtChange(){
    var othamt = $("#OTHAMT_JNFK").val();
    var othacc = document.getElementById("OTHACC_JNFK");
    if (othamt > "0") {
        if (othamt == "0") {
            setProperty(othacc, "P");
        }
        else {
            setProperty(othacc, "M");
        }
    }
    else {
        setProperty(othacc, "O");
    }
}

function JNFK_othamtCheck(){
	/*
    var othamt = $("#OTHAMT_JNFK").val();
    var lcyamt = $("#LCYAMT_JNFK").val();
    var fcyamt = $("#FCYAMT_JNFK").val();
    var txamt = $("#TXAMT_JNFK").val();
    var othacc = $("#OTHACC_JNFK").val();
	*/
	var othamt = getFieldValue(document.UTFORM.OTHAMT_JNFK);
	var lcyamt = getFieldValue(document.UTFORM.LCYAMT_JNFK);
	var fcyamt = getFieldValue(document.UTFORM.FCYAMT_JNFK);
	var txamt = getFieldValue(document.UTFORM.TXAMT_JNFK);
	var othacc = getFieldValue(document.UTFORM.OTHACC_JNFK);
	
    //if (othamt != "" && othamt < "0" || othamt.indexOf(".") > -1) {
	if (othamt != "" && othamt < "0" ) {		
        return "��������С�� 0,����С��λ;\r\n";
    }
    if (othacc != "" && othamt < "0") {
        return "�����˺Ų�Ϊ�����Ӧ����������>0;\r\n";
    }
    if (lcyamt == "" && fcyamt == "" && othamt == "") {
        return "������ֻ�����������������һ��;\r\n";
    }
    var s = Number(lcyamt) + Number(fcyamt) + Number(othamt);
    var st = Number(txamt);
    if (s != st) {
        return "������ֻ���������֮��Ӧ���ڻ����;\r\n";
    }
    return "";
}

function JNFK_othaccCheck(){
    var othamt = $("#OTHAMT_JNFK").val();
    var othacc = $("#OTHACC_JNFK").val();
    if (othamt == "" && othacc == "") {
        return "";
    }
    if (othamt == "0" && othacc != "") {
       			return "�������Ϊ 0�������ʺ�ӦΪ��;\r\n";
    }
    if (othamt != "" && othacc != "") {
        return "";
    }
    if (othamt == "0" && othacc == "") {
        return "";
    }
    return "�������,�����ʺŻ�ͬʱ�գ���ͬʱ��ֵ;\r\n";
}

function JNFK_actuamtCheck(){
	/*
    var actuamt = $("#ACTUAMT_JNFK").val();
    if (actuamt >= "0" && actuamt.indexOf(".") < 0) {
        return "";
    }
    else {
        return "������������� 0������;\r\n";
    }
	*/
	return "";
}

function JNFK_outchargeamtCheck(){
	  var icamt = getFieldValue(document.UTFORM.OUTCHARGEAMT_JNFK);
    var icccy = getFieldValue(document.UTFORM.OUTCHARGECCY_JNFK);
    if ((icamt == 0 && icccy == "") || (icamt > 0 && icccy != "")) {
        return "";
    }else{
    	return "�۷ѱ��֡�������ͬʱ����;\r\n";
    }  
}

function JNFK_issdateChange(){
    var issdate = $("#ISSDATE_JNFK").val();
    var tenor = $("#TENOR_JNFK").val();
    var lcbgno = document.getElementById("LCBGNO_JNFK");
    var lcbgno2 = $("#LCBGNO_JNFK").val();
    var issdate2 = document.getElementById("ISSDATE_JNFK");
    if (issdate != "" || tenor != "") {
        setProperty(lcbgno, "M");
    }
    else {
        setProperty(lcbgno, "O");
    }
    if (lcbgno2 != "") {
        setProperty(issdate2, "M");
    }
    else {
        setProperty(issdate2, "O");
    }
}

function JNFK_tenorCheck(){
	
    var lcbgno = $("#LCBGNO_JNFK").val();
    var issdate = $("#ISSDATE_JNFK").val();
  	if (lcbgno != "" && issdate == "") {
        return "������֤/�������ʱ��֤���ڱ���;\r\n";
    }
  
    return "";
}

function JNFK_tc1amtCheck(){
    var tc1amt = $("#TC1AMT_JNFK").val();
    if (tc1amt != "" && tc1amt <= 0 || tc1amt.indexOf(".") > -1) {
        return "��Ӧ���1�������0,����С��λ";
    }
    return "";
}

function JNFK_tc2amtCheck(){
    var tc2amt = $("#TC1AMT_JNFK").val();
    if (tc2amt != "" && tc2amt <= 0 || tc2amt.indexOf(".") > -1) {
        return "��Ӧ���2�������0,����С��λ";
    }
    return "";
}

function JNFK_contamtCheck(){
    var contamt = $("#CONTAMT_JNFK").val();
    if (contamt != "" && contamt <= 0 || contamt.indexOf(".") > -1) {
        return "��ͬ���������0,����С��λ";
    }
    return "";
}

function DWFK_custypeChcek(){
    var cvalue = $("#CUSTYPE_DWFK").val();
    var rptno = $("#RPTNO_DWFK").val();
    var rptnont = "EFGH";
    var rptnouw = "LM";
    var str19 = rptno.substring(18, 19);
	if(rptno.length==0)
		return "";
	else if(rptno.length==22)
	{
		if (cvalue == "C") {
			if (rptno != "" && rptnont.indexOf(str19) < 0) {
				return "�տ������������걨�����е�19 λ��ĸ�������ĺ���һ��;\r\n";
			}
		}
		else if (cvalue == "D" || cvalue == "F") {
			if (rptno != "" && rptnouw.indexOf(str19) < 0) {
				return "�տ������������걨�����е�19 λ��ĸ�������ĺ���һ��;\r\n";
			}
		}
		return "";	
	}
	else return "�걨�ű���Ϊ22λ";
}

function DWFK_txamtCheck(){
    var txamt = $("#TXAMT_DWFK").val();
    if (txamt >= "0" && txamt.indexOf(".") < 0) {
        return "";
    }
    else {
        return "������������ 0,��С��λ;\r\n";
    }
}

function DWFK_lcyamtChange(){
    var lcyamt = $("#LCYAMT_DWFK").val();
    var exrate = document.getElementById("EXRATE_DWFK");
    var lcyacc = document.getElementById("LCYACC_DWFK");
    if (lcyamt > "0") {
        setProperty(exrate, "M");
        setProperty(lcyacc, "M");
    }
    else {
        setProperty(exrate, "O");
        setProperty(lcyacc, "O");
    }
}

function DWFK_lcyamtCheck(){
    var lcyamt = $("#LCYAMT_DWFK").val();
    var lcyacc = $("#LCYACC_DWFK").val();
    if (lcyamt != "" && lcyamt < "0" || lcyamt.indexOf(".") > -1) {
        return "�������С�� 0,����С��λ;\r\n";
    }
    if (lcyacc != "" && lcyamt <= "0") {
        return "�˺Ų�Ϊ�����Ӧ���������>0;\r\n";
    }
    return "";
}

function DWFK_lcyaccCheck(){
    var exrate = $("#EXRATE_DWFK").val();
    var lcyamt = $("#LCYAMT_DWFK").val();
    var lcyacc = $("#LCYACC_DWFK").val();
   if ((exrate == ""||Number(exrate)==0) && (lcyamt == ""||Number(lcyamt)==0) && lcyacc == "") {
        return "";
    }
    if (exrate != "" && lcyamt != "" && lcyacc != "") {
        return "";
    }
    return "�����������ʡ������ʺ��п���  ������ͬʱ�ջ�ͬʱ��ֵ;\r\n";
}

function DWFK_fcyamtChange(){
    var fcyamt = $("#FCYAMT_DWFK").val();
    var fcyacc = document.getElementById("FCYACC_DWFK");
    if (fcyamt > "0") {
        setProperty(fcyacc, "M");
    }
    else {
        setProperty(fcyacc, "O");
    }
}

function DWDK_fcyamtCheck(){
    var fcyamt = $("#FCYAMT_DWFK").val();
    var fcyacc = $("#FCYACC_DWFK").val();
    if (fcyamt != "" && fcyamt < "0" || fcyamt.indexOf(".") > -1) {
        return "�ֻ����С�� 0,����С��λ;\r\n";
    }
    if (fcyacc != "" && fcyamt <= "0") {
        return "�˺Ų�Ϊ�����Ӧ�ֻ������>0;\r\n";
    }
    return "";
}

function DWFK_fcyaccCheck(){
    var fcyamt = $("#FCYAMT_DWFK").val();
    var fcyacc = $("#FCYACC_DWFK").val();
    if ((fcyamt == ""||Number(fcyamt)==0) && fcyacc == "") {
        return "";
    }
    if (fcyamt != "" && fcyacc != "") {
        return "";
    }
    return "�ֻ���ֻ��ʺŻ�ͬʱ�գ���ͬʱ��ֵ;\r\n";
}

function DWFK_othamtChange(){
    var othamt = $("#OTHAMT_DWFK").val();
    var othacc = document.getElementById("OTHACC_DWFK");
    if (othamt > "0") {
        if (othamt == "0") {
            setProperty(othacc, "P");
        }
        else {
            setProperty(othacc, "M");
        }
    }
    else {
        setProperty(othacc, "O");
    }
}

function DWFK_othamtCheck(){
	/*
    var othamt = $("#OTHAMT_DWFK").val();
    var lcyamt = $("#LCYAMT_DWFK").val();
    var fcyamt = $("#FCYAMT_DWFK").val();
    var txamt = $("#TXAMT_DWFK").val();
    var othacc = $("#OTHACC_DWFK").val();
	*/
	var othamt = getFieldValue(document.UTFORM.OTHAMT_DWFK);
	var lcyamt = getFieldValue(document.UTFORM.LCYAMT_DWFK);	
	var fcyamt = getFieldValue(document.UTFORM.FCYAMT_DWFK);
	var txamt = getFieldValue(document.UTFORM.TXAMT_DWFK);
	var othacc = getFieldValue(document.UTFORM.OTHACC_DWFK);
	
    if (othamt != "" && othamt < "0" ) {
        return "��������С�� 0,����С��λ;\r\n";
    }
    if (othacc != "" && othamt <= "0") {
        return "�����˺Ų�Ϊ�����Ӧ����������>0;\r\n";
    }
    if (lcyamt == "" && fcyamt == "" && othamt == "") {
        return "������ֻ�����������������һ��;\r\n";
    }
    var s = Number(lcyamt) + Number(fcyamt) + Number(othamt) - Number(txamt);
    if (s != 0) {
        return "������ֻ���������֮��Ӧ���ڸ�����;\r\n";
    }
    return "";
}

function DWFK_othaccCheck(){
    var othamt = $("#OTHAMT_DWFK").val();
    var othacc = $("#OTHACC_DWFK").val();
    if (othamt == "" && othacc == "") {
        return "";
    }
    if (othamt == "0" && othacc != "") {
        return "�������Ϊ 0�������ʺ�ӦΪ��;\r\n";
    }
    if (othamt != "" && othacc != "") {
        return "";
    }
    if (othamt == "0" && othacc == "") {
        return "";
    }
    return "�������,�����ʺŻ�ͬʱ�գ���ͬʱ��ֵ;\r\n";
}

function DWFK_actuamtCheck(){
    var txamt = $("#ACTUAMT_DWFK").val();
    if (txamt >= "0" && txamt.indexOf(".") < 0) {
        return "";
    }
    else {
        return "ʵ�ʸ����������� 0,��С��λ;\r\n";
    }
}

function DWFK_outchargeamtCheck(){
	  var icamt = getFieldValue(document.UTFORM.OUTCHARGEAMT_DWFK);
    var icccy = getFieldValue(document.UTFORM.OUTCHARGECCY_DWFK);
    if ((icamt == 0 && icccy == "") || (icamt > 0 && icccy != "")) {
        return "";
    }else{
    	return "�۷ѱ��֡�������ͬʱ����;\r\n";
    }  
}

function DWFK_issdateChange(){
    var issdate = $("#ISSDATE_DWFK").val();
    var tenor = $("#TENOR_DWFK").val();
    var lcbgno = document.getElementById("LCBGNO_DWFK");
    var lcbgno2 = $("#LCBGNO_DWFK").val();
    var issdate2 = document.getElementById("ISSDATE_DWFK");
    if (issdate != "" || tenor != "") {
        setProperty(lcbgno, "M");
    }
    else {
        setProperty(lcbgno, "O");
    }
    if (lcbgno2 != "") {
        setProperty(issdate2, "M");
    }
    else {
        setProperty(issdate2, "O");
    }
}

function JNSR_actuamtCheck(){
	/*
    var actuamt = $("#ACTUAMT_JNFK").val();
    if (actuamt >= "0" && actuamt.indexOf(".") < 0) {
        return "";
    }
    else {
        return "������������� 0������;\r\n";
    }
	*/
	return "";
}

function DWFK_tenorCheck(){
	/*
    var lcbgno = $("#LCBGNO_DWFK").val();
    var issdate = $("#ISSDATE_DWFK").val();
  	if (lcbgno != "" && issdate == "") {
        return "������֤/�������ʱ��֤���ڱ���;\r\n";
    }
    */
    return "";
}

function DWFK_tc1amtCheck(){
	/*
    var tc1amt = $("#TC1AMT_DWFK").val();
    if (tc1amt != "" && tc1amt <= 0 || tc1amt.indexOf(".") > -1) {
        return "��Ӧ���1�������0,����С��λ";
    }
    */
    return "";
}

function DWFK_tc2amtCheck(){
    var tc2amt = $("#TC1AMT_DWFK").val();
    if (tc2amt != "" && tc2amt <= 0 || tc2amt.indexOf(".") > -1) {
        return "��Ӧ���2�������0,����С��λ";
    }
    return "";
}

function DWFK_contamtCheck(){
	/*
    var contamt = $("#CONTAMT_DWFK").val();
    if (contamt != "" && contamt <= 0 || contamt.indexOf(".") > -1) {
        return "��ͬ���������0,����С��λ";
    }
    */
    return "";
}


//---------------the follow add by dwj 20100827---------------------
function ISREF_JNHKCheck(){
    var isref = $("#ISREF_JNHK").val();
    if (isref == "N") {
    	  var COUNTRY_JNHK = document.getElementById("COUNTRY_JNHK");
        setProperty(COUNTRY_JNHK, "O");
        var TXCODE_JNHK = document.getElementById("TXCODE_JNHK");
        setProperty(TXCODE_JNHK, "O");
        var TXREM_JNHK = document.getElementById("TXREM_JNHK");
        setProperty(TXREM_JNHK, "O");
        var TC1AMT_JNHK = document.getElementById("TC1AMT_JNHK");
        setProperty(TC1AMT_JNHK, "O");
        var CONTRNO_JNHK = document.getElementById("CONTRNO_JNHK");
        setProperty(CONTRNO_JNHK, "O");
        var INVOINO_JNHK = document.getElementById("INVOINO_JNHK");
        setProperty(INVOINO_JNHK, "O");
        var RPTDATE_JNHK = document.getElementById("RPTDATE_JNHK");
        setProperty(RPTDATE_JNHK, "O");
        var CRTUSER_JNHK = document.getElementById("CRTUSER_JNHK");
        setProperty(CRTUSER_JNHK, "O");
        var INPTELC_JNHK = document.getElementById("INPTELC_JNHK");
        setProperty(INPTELC_JNHK, "O");
    }
}


function BOPWSSBCHECK(type){
	/*
	var rptmethod=$("#RPTMETHOD_"+type).val();
	var isRef = $("#ISREF_"+type).val();
	if(rptmethod==2){
		var refno = $("#REFNO_"+type).val();
		if(refno!=null && refno!=""&&isRef=='Y'){
			$("#SEND_SBXX").attr("checked",true);
			$("#SEND_SBXX").val("YES");
			$("#SEND_HXXX").attr("checked",true);
			$("#SEND_HXXX").val("YES");
		}else{
		    $("#SEND_SBXX").attr("checked",false);
			$("#SEND_SBXX").val("NO");
			$("#SEND_HXXX").attr("checked",false);
			$("#SEND_HXXX").val("NO");
		}
	}else if(rptmethod==1){
		$("#SEND_SBXX").attr("checked",true);
		$("#SEND_SBXX").val("YES");
		if(isRef=='Y'){
			$("#SEND_HXXX").attr("checked",true);
			$("#SEND_HXXX").val("YES");
		}else{
			$("#SEND_HXXX").attr("checked",false);
			$("#SEND_HXXX").val("NO");
		}
	}
	*/
}


function lookupOnChange(lookupName){
	if(lookupName=='bopcust_SWSR'){
		var custCode = $('#CUSTCOD_SWSR').val();
		if(custCode!=null&&custCode!='')
			setRptMethod(custCode);
		BOPWSSBCHECK("SWSR");
	}else if(lookupName=='bopcust_JNSR'){
		var custCode = $('#CUSTCOD_JNSR').val();
		if(custCode!=null&&custCode!='')
			setRptMethod(custCode);
		BOPWSSBCHECK("JNSR");	
	}
}

function txamtCheck(type){
	var txamt = FormatStr2Amt($('#TXAMT_'+type).val());
	if(txamt==null||txamt=='')
		txamt = 0;
	var tc1amt = FormatStr2Amt($('#TC1AMT_'+type).val());
	if(tc1amt==null||tc1amt=='')
		tc1amt = 0;
	var tc2amt = FormatStr2Amt($('#TC2AMT_'+type).val());
	if(tc2amt==null||tc2amt=='')
		tc2amt = 0;
	if(txamt!=(tc1amt+tc2amt))
		return "��Ӧ���1����Ӧ���2֮��Ӧ�����գ���������";
	return "";
}

/*
 * modify by lgp at 20120129 for �����ص���Ϣ���������ʹ�ã����գ�ָ����ֵ��������������
 * @return {TypeName} 
 */
function customsCheck(bopType){
	/*
	var sendFlagObj = document.getElementById("SEND_HXXX");
if(sendFlagObj!=null&&!sendFlagObj.checked) return "";
	var selRow = $("#CURRCUSTOM_"+bopType).jqGrid('getGridParam','reccount');
	var sum = 0;
	//var txAmt = getFieldValue(document.UTFORM.TXAMT_SWSR);
	var txAmt = $('#TXAMT_'+bopType).val();
	txAmt = FormatStr2Amt(txAmt);
	for (var i=1 ; i<=selRow ; i++ ){
		$("#CURRCUSTOM_"+bopType).jqGrid('saveRow',i,null,'clientArray');
		var data = $("#CURRCUSTOM_"+bopType).jqGrid('getRowData',i);
		var bop_CUSTAMT = data.CUSTAMT;
		var bop_OFFAMT = data.OFFAMT;
		if(Number(bop_CUSTAMT)<=0)
			return '���ص���'+data.CUSTOMN+'�µı��ؽ��Ӧ����0\r\n';
		if(Number(bop_OFFAMT)<=0)
			return '���ص���'+data.CUSTOMN+'�µı��κ�ע���Ӧ����0\r\n';
		if(Number(bop_CUSTAMT)<Number(bop_OFFAMT))
			return '���ص���'+data.CUSTOMN+'�µı��κ�ע���ӦС�ڵ��ڱ��ؽ��\r\n';
		sum = sum + Number(bop_OFFAMT);
	}
	/*
	if(sum>0&&sum!=txAmt)
		return '���ص���Ϣ�ı��κ�ע���֮��Ӧ���ڻ����';
		*/
  var selRow = $("#CURRCUSTOM_"+bopType).jqGrid('getGridParam','reccount');
	for (var i=1 ; i<=selRow ; i++ ){
		$("#CURRCUSTOM_"+bopType).jqGrid('saveRow',i,null,'clientArray');
		var data = $("#CURRCUSTOM_"+bopType).jqGrid('getRowData',i);
		var bop_CUSTAMT = data.CUSTAMT;
		var bop_OFFAMT = data.OFFAMT;
		if(Number(bop_CUSTAMT)>0 || Number(bop_OFFAMT)>0 || data.CUSTOMN !='')
			return "���ص���ϢӦΪ��";
	}
	return '';
}
/*
 * ���װ����ǿ��Ϊ�գ�ȥ����ؿ���
 * @param {Object} bopType
 */
function payTypeChange(bopType){
	/*
	var val = $('#PAYTYPE_'+bopType).val();
	//var obj = eval("document.UTFORM.IMPDATE_"+bopType);
	var obj = document.getElementById("SEND_HXXX");
	if(obj = null ) return "";
	if(val=='A'||val=='P'){
		if(val=='A') setProperty(obj, "O");
		setProperty(obj, "M");
		$("#ISREF_"+bopType).val('Y');
		if(obj!=null){
			document.getElementById("SEND_HXXX").checked  = true;
	       }
		}else{
		setProperty(obj, "O");
		$("#ISREF_"+bopType).val('N');
		var obj = document.getElementById("SEND_HXXX");
		if(obj!=null){
			document.getElementById("SEND_HXXX").checked = false;
		}
	}
	* */
	hxxxCheck();
}
function ISREFCheck(type){
	/*
	var isRef = $('#ISREF_'+type).val();
	var sendFlagObj = document.getElementById("SEND_HXXX");
	if(sendFlagObj == null ) return "";
	if(isRef=='N'&&sendFlagObj.checked)
		return "�Ƿ���ں�������Ϊ��ʱ��ֹ���ͺ�����Ϣ\r\n";
		* */
	return "";
}

function PAYTYPECheck(type){
	/*
	var PAYTYPE = $('#PAYTYPE_'+type).val();
	var ISREF = $('#ISREF_'+type).val();
	//var CUSMNO = $('#CUSMNO_'+type).val();  //2012-03-21 clm
	//var CUSTOMS = $('#CUSTOMS_'+type).val();
	var allRows = jQuery('#CURRCUSTOM_'+type).jqGrid('getDataIDs');
	
	var sendFlag = $('#SEND_HXXX').val();
	if((PAYTYPE=='P'||PAYTYPE=='A')&&ISREF=='N')
		return "���ʽΪԤ��������������ʱ���Ƿ�˰���������ջ����Ϊ��\r\n";	
	var sendFlagObj = document.getElementById("SEND_HXXX");
	if(sendFlagObj!=null&&!sendFlagObj.checked) 
		return "";
		
	if(PAYTYPE=='P'&&sendFlag=='YES'&& allRows.length == 0 ){
		return "���ʽΪ����������ص���Ϣ�ͱ��ص���Ӫ��λ�����������\r\n";	
	}
	*/
	return "";
}

function CUSTYPECheck(type){
	var CUSTYPE = $('#CUSTYPE_'+type).val();
	var IDCODE = $('#IDCODE_'+type).val();
	var CUSTCOD = $('#CUSTCOD_'+type).val();
	if(CUSTYPE=='C'){
		if(CUSTCOD==null||CUSTCOD=='')
			return "�Թ�ʱ����֯�������벻��Ϊ��";
		if(IDCODE!=null&&IDCODE!='')
			return "�Թ�ʱ���������֤��ӦΪ��";
	}else{
		if(CUSTCOD!=null&&CUSTCOD!='')
			return "��˽ʱ����֯��������ӦΪ��";
		if(IDCODE==null||IDCODE=='')
			return "��˽ʱ���������֤������Ϊ��";
	}
	return "";
}


function RPTDATECheck(type){
	
	var RPTDATE = $('#RPTDATE_'+type).val();
	var transDate = getCurrDateRemote();
//	if(RPTDATE!=''&& RPTDATE<transDate){
//		return "�걨����Ӧ�������걨�����е�����";
//	}
	setFieldValue("RPTDATE_"+type,transDate);
	return "";
}


/*
 * add by lgp at 20120109 for  �����Դ�дӢ���ַ� ����JW�����򡰣�JN������ͷ
 * @param {Object} type
 * @return {TypeName} 
 */
function oppuserCheck(type){
	if(type == 'SWSR' || type == 'DWFK' || type == 'JWHK'){
		var oppuser = $("#OPPUSER_" + type).val();
		if(oppuser.indexOf('(JW)')!= -1 || oppuser.indexOf('(JN)')!=-1 ) return "";
		else return $("#OPPUSER_" + type).attr("title") + "������ (JW)��(JN)��ͷ\r\n";
	}
	return "";
}



/*
 * add by lgp at 20120129 for �����װ�����ڡ��������ʹ�ã����գ�ָ����ֵ��������������
 * @param {Object} type
 * @return {TypeName} 
 */
function impdateCheck(type)
{
	var impdate = $("#IMPDATE_" + type).val();
	if(impdate != null || impdate !='')
		return "���װ������ӦΪ�ա�\r\n";
	return "";
}
/*
 * add by lgp at 20120129 for �����ص���Ӫ��λ���롱�������ʹ�ã����գ�ָ����ֵ��������������
 * @param {Object} type
 * @return {TypeName} 
 */
function cusmnoCheck(type)
{
	var cusmno = $("#CUSMNO_" + type).val();
	if(cusmno != null || cusmno !='')
		return "���ص���Ӫ��λ����ӦΪ�ա�\r\n";
	return "";
}
/*
 * add by lgp at 20120129 for �������ջ���������롱�������ʹ�ã����գ�ָ����ֵ��������������
 * @param {Object} type
 * @return {TypeName} 
 */
function refnoCheck(type)
{
	var refno = $("#REFNO_" + type).val();
	if(refno != null || refno !='')
		return "�����ջ����������ӦΪ�ա�\r\n";
	return "";
}
/*
 * add by lgp at 20120129 for ���ջ��ܽ�������ڳ��ں����Ľ��������ʹ�ã����գ�ָ����ֵ��������������
 * @param {Object} type
 * @return {TypeName} 
 */

function chkamtCheck(type)
{
	var chkamt = $("#CHKAMT_" + type).val();
	if(chkamt != null || chkamt !='')
		return "�ջ��ܽ�������ڳ��ں����Ľ��ӦΪ�ա�\r\n";
	return "";
}
/*
 * add by lgp at 20120202 for "���ױ����ԡ�5������6������7������8���Ͳ��֡�9����ͷ������������/�������/ҵ���ű�������"
 * @param {Object} billNoValue
 * @param {Object} txcode1
 * @param {Object} txcode2
 * @return {TypeName} 
 */
function checkBillNo(billNoValue,txcode1,txcode2)
{
	var sendFlagObj = document.getElementById("SEND_SBXX");
	if(sendFlagObj!=null&&!sendFlagObj.checked) return "";
	if(billNoValue == null || billNoValue == '')
	{
		if(txcode1 != null && txcode1 != ''){
			var str = txcode1.substring(0,1);
			if(Number(str)>=5)
				return "���ױ����ԡ�5������6������7������8���Ͳ��֡�9����ͷ������������/�������/ҵ���ű�������!\r\n";
		}
		
		if(txcode2 != null && txcode2 != ''){
			var str = txcode2.substring(0,1);
			if(Number(str)>=5)
				return "���ױ����ԡ�5������6������7������8���Ͳ��֡�9����ͷ������������/�������/ҵ���ű�������!\r\n";
		}
	}
	return "";
}

/*
 * add by lgp at 20120206
 * @param {Object} txcode1
 * @param {Object} txcode2
 * @param {Object} objField
 * @return {TypeName} 
 */
function txcodeOnchange(txcode1, txcode2, objField)
{
	var specialNum = ["901010","901020","903010","903020","903090","904010","904020","904030","904090","909110","909130","909020"]; // ע��,�����������֧��9��ͷ��Ҫ���⴦��ļ���,����ֿ�����,����ֻ��֧�����˸�"909020",����֧�����ױ��벢��909020,�ʿ��Ժϲ�����
	var obj = document.getElementById(objField)
	if(obj == null) return ;
	setProperty(obj, "O");
	if(txcode1 != null && txcode1 != ''){
		var str = txcode1.substring(0,1);
		if( (Number(str)>=5 && Number(str)<=8) || $.inArray(txcode1,specialNum) !== -1)
			setProperty(obj, "M");
	}
	
	if(txcode2 != null && txcode2 != ''){
		var str = txcode2.substring(0,1);
		if( (Number(str)>=5 && Number(str)<=8) || $.inArray(txcode2,specialNum) !== -1)
			setProperty(obj, "M");
	}
}

//���ƻ�����Ϣ  modify by  wt  2012-10-19
function setBopAttr(type){
	var jcxxStatus = $("#BOPSTATUS_JCXX").val();
	if(jcxxStatus == null ){
		return ;
	}
	
	//δ��¼ ��  �Ѳ�¼  ����������Ϣ   
    if( jcxxStatus == 'UNDEAL'  ||  jcxxStatus == 'DEALOK'  ||  jcxxStatus == 'REPLYOK') {
    	setBaseInfoProperty();
    }

     //�ɹ������Ľ����Ϣ�л�����Ϣ�г����ո���������֮�����λ��������ֹ�޸�  add by wt 2012-10-19
      if(jcxxStatus == 'REPLYOK' ){
    	  var custnm = "setProperty(document.UTFORM.CUSTNM_" + type + ",'M')"  ;  
    	  var oppuser = "setProperty(document.UTFORM.OPPUSER_" + type + ",'M')"  ;  
	  	  eval( custnm  );
    	  eval( oppuser  );
      }
}

//  add by lrz
function calBOPJSHAmt(bopType,custFlag){
	
	if(!bopType || !custFlag || $("#BOPFLAG_"+bopType).val() != "YES"){  //edit by wangx 20130606 
		return;
	}else{
		bopType = bopType.toUpperCase();
		custFlag = custFlag.toUpperCase();
	}
	var transCnyAmt = 0,transyAmt = 0,cnyAccNo = "",rate = "";
	var magrCount = jQuery("#CURRMARGIN").jqGrid('getDataIDs').length;
	var count = jQuery("#"+custFlag+"CUSTACC_GRID").jqGrid('getDataIDs').length;
	var transAccNo =""// document.getElementById("FCYACC_"+bopType).value;
	var bopTransAmt = getFieldValue(document.getElementById("TXAMT_"+bopType));
	var charge = getFieldValue(document.getElementById("INCHARGEAMT_"+bopType));
	/* modify for CQBANK ��������û�б�֤��ֱ�Ӹ���
	if(magrCount > 0){
		for(var j = 1; j <= count; j++){
			var marginTransAmt = FormatStr2Amt(getGridData("CURRMARGIN","DR_EQ_AMT",j));

			if(marginTransAmt > 0){
				var marginAccNo = getGridData("CURRMARGIN","ACCNO",j);
				var marginCcy = getGridData("CURRMARGIN","CCY",j);

				if(marginCcy == "CNY"){
					transCnyAmt += marginTransAmt;
					cnyAccNo = marginAccNo;
					rate = getGridData("CURRMARGIN","MARGIN_SELLRATE",j);
				}else{
					transyAmt += marginTransAmt;
					transAccNo = marginAccNo;
				}
			}
		}
	}
	*/
	if(count > 0){
		for(var i = 1; i <= count; i++){
			var amt = FormatStr2Amt(getGridData(custFlag+"CUSTACC_GRID",custFlag+"_SOURCE_AMT",i));
	
			if(amt > 0){
				var ccy = getGridData(custFlag+"CUSTACC_GRID",custFlag+"_ACCOUNT_CCY",i);
				var accNo = getGridData(custFlag+"CUSTACC_GRID",custFlag+"_ACCOUNT_NO",i);
	
				if(ccy == "CNY"){
					transCnyAmt += amt;
					cnyAccNo = accNo;
					if(custFlag == "DR"){
						rate = getGridData("DRCUSTACC_GRID","DR_SELL_RATE",i);
					}else{
						rate = getGridData("CRCUSTACC_GRID","CR_BUY_RATE",i);
					}
				}else{
					transyAmt += amt;
					transAccNo = accNo;
				}
			}
		}
	}
	var k = 1;
	var transCcy = getGridData(custFlag+"CUSTACC_GRID",custFlag+"_ACCOUNT_CCY",k);
	var nracode = getFieldValue(document.UTFORM.NRA_CODE);
  
	if(transCcy=="CNY"){
		if(cnyAccNo!=""&&cnyAccNo!=null){
			var isNRA = cnyAccNo.substring(0,3);
			if(isNRA=="NRA"){
				nracode = "";
			}
	    }
		setFieldValue(document.getElementById("OTHAMT_" + bopType), bopTransAmt - charge);
		setFieldValue(document.getElementById("OTHACC_" + bopType), nracode+cnyAccNo);
		setFieldValue(document.getElementById("FCYAMT_"+bopType),"");
		setFieldValue(document.getElementById("FCYACC_"+bopType),"");
		setFieldValue(document.getElementById("LCYAMT_"+bopType),"");
		setFieldValue(document.getElementById("EXRATE_"+bopType),"");
		setFieldValue(document.getElementById("LCYACC_"+bopType),"");
	}else{
		if(transAccNo!=""&&transAccNo!=null){
			var isNRA = transAccNo.substring(0,3);
			if(isNRA=="NRA"){
				nracode = "";
			}
	    }
		if(cnyAccNo==""&&transAccNo!=""){
		setFieldValue(document.getElementById("FCYAMT_"+bopType),bopTransAmt - transCnyAmt - charge);
		setFieldValue(document.getElementById("FCYACC_"+bopType),nracode+transAccNo);
		setFieldValue(document.getElementById("LCYAMT_"+bopType),transCnyAmt);
		setFieldValue(document.getElementById("EXRATE_"+bopType),rate);
		setFieldValue(document.getElementById("LCYACC_"+bopType),cnyAccNo);
		setFieldValue(document.getElementById("OTHAMT_" + bopType), "");
		setFieldValue(document.getElementById("OTHACC_" + bopType), "");
		}else if(cnyAccNo!=""&&transAccNo==""){
		if(cnyAccNo!=""&&cnyAccNo!=null){
			var isNRA = cnyAccNo.substring(0,3);
			if(isNRA=="NRA"){
				nracode = "";
			}
	    }
		setFieldValue(document.getElementById("FCYAMT_"+bopType),bopTransAmt - transCnyAmt - charge);
		setFieldValue(document.getElementById("FCYACC_"+bopType),transAccNo);
		setFieldValue(document.getElementById("LCYAMT_"+bopType),transCnyAmt);
		setFieldValue(document.getElementById("EXRATE_"+bopType),rate);
		setFieldValue(document.getElementById("LCYACC_"+bopType),nracode+cnyAccNo);
		setFieldValue(document.getElementById("OTHAMT_" + bopType), "");
		setFieldValue(document.getElementById("OTHACC_" + bopType), "");
		}else if(cnyAccNo!=""&&transAccNo!=""){
		setFieldValue(document.getElementById("FCYAMT_"+bopType),bopTransAmt - transCnyAmt - charge);
		if(cnyAccNo!=""&&cnyAccNo!=null){
			var isNRA = cnyAccNo.substring(0,3);
			if(isNRA=="NRA"){
			 setFieldValue(document.getElementById("FCYACC_"+bopType),transAccNo);	
			}else{
			 setFieldValue(document.getElementById("FCYACC_"+bopType),nracode+transAccNo);	
			}
	    }
		setFieldValue(document.getElementById("LCYAMT_"+bopType),transCnyAmt);
		setFieldValue(document.getElementById("EXRATE_"+bopType),rate);
		if(cnyAccNo!=""&&cnyAccNo!=null){
			var isNRA = cnyAccNo.substring(0,3);
			if(isNRA=="NRA"){
			 setFieldValue(document.getElementById("LCYACC_"+bopType),cnyAccNo);
			}else{
			 setFieldValue(document.getElementById("LCYACC_"+bopType),nracode+cnyAccNo);	
			}
	    }
		setFieldValue(document.getElementById("OTHAMT_" + bopType), "");
		setFieldValue(document.getElementById("OTHACC_" + bopType), "");
		}	
	}
}
function BOP_SWSR_JCXX_CHECK(){
	var str = "";
	str = oppuserCheck('SWSR') +
    checkBillNo($("#BILLNO_SWSR").val(), $("#TXCODE_SWSR").val(), $("#TXCODE2_SWSR").val()) +
    SWSR_txamtCheck() +
    SWSR_lcyamtCheck() +
    SWSR_lcyaccCheck() +
    SWSR_fcyamtCheck() +
    SWSR_fcyaccCheck() +
    SWSR_othamtCheck() +
    SWSR_othaccCheck() +
    SWSR_inchargeamtCheck() +
    SWSR_outchargeamtCheck();
	return str;
}

function BOP_JNSR_JCXX_CHECK(){
	var str = "";
	str = JNSR_txamtCheck() +
    JNSR_lcyamtCheck() +
    JNSR_lcyaccCheck() +
    JNSR_fcyamtCheck() +
    JNSR_fcyaccCheck() +
    JNSR_othamtCheck() +
    JNSR_othaccCheck() +
    JNSR_actuamtCheck() +
    JNSR_inchargeamtCheck();
	return str;
}
/*
* add by lgp at 20120419 for �ѳɹ�ɾ�����걨���ݲ��ü�������
*/

function bopDelCheck(){
	var type  = "";
	if($("#BOPFLAG_JNSR").val() == "YES")
		type = "JNSR";
	else if($("#BOPFLAG_SWSR").val() == "YES")
		type = "SWSR";
	else if($("#BOPFLAG_JNFK").val() == "YES")
		type = "JNFK";
	else if($("#BOPFLAG_DWFK").val() == "YES")
		type = "DWFK";
	else if($("#BOPFLAG_JNHK").val() == "YES")
		type = "JNHK";
	else if($("#BOPFLAG_JWHK").val() == "YES")
		type = "JWHK";
	var rptNo = $("#RPTNO_" + type).val();
	if(rptNo!= null && rptNo != ''){
		var actionType ;
		var bopStatus ;
		var sendFlag ;
		var sSQL1= "  select ACTIONTYPE_JCXX,BOPSTATUS_JCXX,SEND_JCXX from BOP_CONTROL where RPTNO = '" + rptNo + "'";
		var nCount1= executeQuery("BOPDATA",sSQL1,1);
	    if(nCount1>0){
	    	var actionType = getTableFieldValue("BOPDATA",1,"ACTIONTYPE_JCXX");
    	    var bopStatus = getTableFieldValue("BOPDATA",1,"BOPSTATUS_JCXX");
	        var sendFlag = getTableFieldValue("BOPDATA",1,"SEND_JCXX");
	        if(actionType == 'D' && bopStatus == 'REPLYOK' && sendFlag == 'YES' ){
	        	alert("�ñ��걨��ɾ�����ѳɹ����������ü�������!");
   				return false;
	        }
	        else
	        	return true;
	    }else {
	    	alert("�ñ��걨�����ڣ���˲�!"); 
   			return false; 
	    }
	}
	else
		return true;
}

function setBopFieldProperty(type){
	if(type=="SWSR"){
		setProperty(document.UTFORM.COUNTRY_SWSR,"O");
//	    setProperty(document.UTFORM.TXCODE_SWSR,"O");
//	    setProperty(document.UTFORM.TXREM_SWSR,"O");
	    setProperty(document.UTFORM.TC1AMT_SWSR,"O");
//	    setProperty(document.UTFORM.INPTELC_SWSR,"O");
	    setProperty(document.UTFORM.RPTDATE_SWSR,"O");   
//	    setProperty(document.UTFORM.CRTUSER_SWSR,"O");
	    setProperty(document.UTFORM.BUSCODE_SWSR,"P");
	}else if(type=="JNSR"){
		setProperty(document.UTFORM.PAYATTR_JNSR,"O");
//	    setProperty(document.UTFORM.TXCODE_JNSR,"O");
//	    setProperty(document.UTFORM.TXREM_JNSR,"O");
	    setProperty(document.UTFORM.PAYTYPE_JNSR,"O");
	    setProperty(document.UTFORM.TC1AMT_JNSR,"O");
//	    setProperty(document.UTFORM.CRTUSER_JNSR,"O");   
//	    setProperty(document.UTFORM.INPTELC_JNSR,"O");  
	    setProperty(document.UTFORM.ISREF_JNSR,"O");
	    setProperty(document.UTFORM.BUSCODE_JNSR,"P");
	}else if(type=="JWHK"){
		setProperty(document.UTFORM.COUNTRY_JWHK,"M");
//	    setProperty(document.UTFORM.TXCODE_JWHK,"O");
//	    setProperty(document.UTFORM.TXREM_JWHK,"O");
	    setProperty(document.UTFORM.PAYTYPE_JWHK,"M");
//	    setProperty(document.UTFORM.ISREF_JWHK,"O");
	    setProperty(document.UTFORM.TC1AMT_JWHK,"O");   
	    //setProperty(document.UTFORM.CRTUSER_JWHK,"O");  
	    //setProperty(document.UTFORM.INPTELC_JWHK,"O");
	    setProperty(document.UTFORM.RPTDATE_JWHK,"O");   
	    //setProperty(document.UTFORM.INVOINO_JWHK,"O");  
	    //setProperty(document.UTFORM.CONTRNO_JWHK,"O");
	}else if(type=="JNHK"){
		setProperty(document.UTFORM.COUNTRY_JNHK,"M");
//	    setProperty(document.UTFORM.TXCODE_JNHK,"O");
	    //setProperty(document.UTFORM.INVOINO_JNHK,"O");
	    //setProperty(document.UTFORM.CONTRNO_JNHK,"O");
	    setProperty(document.UTFORM.RPTDATE_JNHK,"O");
	    //setProperty(document.UTFORM.CRTUSER_JNHK,"O");   
	    //setProperty(document.UTFORM.INPTELC_JNHK,"O");  
	}else if(type=="DWFK"){
		setProperty(document.UTFORM.COUNTRY_DWFK,"O");
//	    setProperty(document.UTFORM.TXCODE_DWFK,"O");
//	    setProperty(document.UTFORM.TXREM_DWFK,"O");
	    setProperty(document.UTFORM.TC1AMT_DWFK,"O");
//	    setProperty(document.UTFORM.CRTUSER_DWFK,"O");
//	    setProperty(document.UTFORM.INPTELC_DWFK,"O");
	    setProperty(document.UTFORM.RPTDATE_DWFK,"O");   
	    setProperty(document.UTFORM.CONTRNO_DWFK,"O");  
	    setProperty(document.UTFORM.INVOINO_DWFK,"O");
	}else if(type=="JNFK"){
		setProperty(document.UTFORM.COUNTRY_JNFK,"O");
	    setProperty(document.UTFORM.BILLNO_JNFK,"O");
//	    setProperty(document.UTFORM.TXCODE_JNFK,"O");
	    
	    var taskname = getFieldValue("TASKNAME");
		if(taskname=="IMCLOutPayment"){
			setProperty(document.UTFORM.LCBGNO_JNFK,"M");
		}
	    
	    //
	    setProperty(document.UTFORM.TC1AMT_JNFK,"O");
	    setProperty(document.UTFORM.INVOINO_JNFK,"O");
	    setProperty(document.UTFORM.CONTRNO_JNFK,"O");   
//	    setProperty(document.UTFORM.CRTUSER_JNFK,"O");  
//	    setProperty(document.UTFORM.INPTELC_JNFK,"O");
	 }
}
//�����걨����
function setBopDate(type){
	var date = getDateValue(document.getElementById("RPTDATE_"+type));
	
	if(!date){
		setFieldValue(document.getElementById("RPTDATE_"+type),getSysDate());
	}
}
// ��������Ϣ�������� by fanrui
function setBaseInfoProperty(){ 
	var table = $("table[id^='BOP_BASE_TABLE']")[0];
	$(":input", table).each(function(){
		setProtect(this);
	});
}
// ���걨��Ϣ�������� by fanrui
function setSbInfoProperty(){ 
	var table = $("table[id^='BOP_SB_TABLE']")[0];
	$(":input", table).each(function(){
		setProtect(this);
	});
}
// ��������Ϣ�������� by fanrui
function setGlInfoProperty(){ 
	var table = $("table[id^='BOP_GL_TABLE']")[0];
	$(":input", table).each(function(){
		setProtect(this);
	});
}
// ����ҳ״̬�Ͳ������͵Ŀ��Ʒ��� by fanrui
function BOPSTATUSOnChange(statusObj, actionObj){
	var actionVal = getFieldValue(actionObj);
	var val = getFieldValue(statusObj);
	if(actionObj.getAttribute("originalOptions")){ // ��ԭʼoptions��������,���"״̬"�ǲ��ɸı��,�򲻱ػ���,ֱ�Ӵ���
		$(actionObj).html(actionObj.getAttribute("originalOptions"));
	} else {
		var originalOptions = $(actionObj).html();
		actionObj.setAttribute("originalOptions", originalOptions);
	}
	if(val==="UNDEAL" || val==="DEALOK"){
		$("option[value!='A']", actionObj).remove();
	} else if(val==="REPLYOK" || val==="SENDOK"){
		$("option", actionObj).each(function(){
			if(this.value!=="C" && this.value!=="D"){
				$(this).remove();
			}
		});
	} else {
		$(actionObj).html(actionObj.getAttribute("originalOptions"));
	}
	if($("option[value='"+actionVal+"']", actionObj)[0]){ // ���ж����ѡ����ڲ�����
		setFieldValue(actionObj, actionVal);
	}
	var newActionVal = getFieldValue(actionObj);
	if(actionVal !== newActionVal) fireEvent(actionObj, "change");
}
//�걨��ʼĬ�Ϸ��ͱ�־��
function sendInfo(){  
	$("#SWSR_SEND_SBXX").attr("checked","checked");
	$("#DWFK_SEND_SBXX").attr("checked","checked");
	$("#JWHK_SEND_SBXX").attr("checked","checked");
	
	$("#SWSR_SEND_HXXX").attr("checked","checked");
	$("#JNSR_SEND_HXXX").attr("checked","checked");
	$("#DWFK_SEND_HXXX").attr("checked","checked");
	$("#JNFK_SEND_HXXX").attr("checked","checked");
	$("#JNHK_SEND_HXXX").attr("checked","checked");
	$("#JWHK_SEND_HXXX").attr("checked","checked");
} 
function BOP_hxxxCheck(){
		
    var swsr_sendFlagObj = document.getElementById("SWSR_SEND_HXXX");
    var jnsr_sendFlagObj = document.getElementById("JNSR_SEND_HXXX");
    var dwfk_sendFlagObj = document.getElementById("DWFK_SEND_HXXX");
    var jnfk_sendFlagObj = document.getElementById("JNFK_SEND_HXXX");
    var jnhk_sendFlagObj = document.getElementById("JNHK_SEND_HXXX");
    var jwhk_sendFlagObj = document.getElementById("JWHK_SEND_HXXX");

    //if(sendFlagObj == null) return "";
    var BOPFLAG_SWSR = $("#BOPFLAG_SWSR").val();
    var BOPFLAG_JNSR = $("#BOPFLAG_JNSR").val();
    var BOPFLAG_DWFK = $("#BOPFLAG_DWFK").val();
    var BOPFLAG_JNFK = $("#BOPFLAG_JNFK").val();
    var BOPFLAG_JNHK = $("#BOPFLAG_JNHK").val();
    var BOPFLAG_JWHK = $("#BOPFLAG_JWHK").val();
  
    if(BOPFLAG_JNSR!=null&&BOPFLAG_JNSR=='YES'){
		  var txCodeObj = document.getElementById("TXCODE_JNSR");
		  var txAmtObj = document.getElementById("TC1AMT_JNSR");
		  var txRemObj = document.getElementById("TXREM_JNSR");
		  var crtUserObj = document.getElementById("CRTUSER_JNSR");
		  var inpTelcObj = document.getElementById("INPTELC_JNSR");
		  var payattrObj = document.getElementById("PAYATTR_JNSR");
		  var paytypeObj = document.getElementById("PAYTYPE_JNSR");
		  var isrefObj = document.getElementById("ISREF_JNSR");
	    if(jnsr_sendFlagObj.checked){
	 	    setProperty(txCodeObj, "M");
	    	setProperty(txAmtObj, "M"); 
	    	setProperty(txRemObj, "M");
	    	setProperty(crtUserObj, "M");
	    	setProperty(inpTelcObj, "M");
	    	setProperty(payattrObj, "M");
	    	setProperty(paytypeObj, "M");
	    	setProperty(isrefObj, "M");
	    }else{
	      setProperty(txCodeObj, "O");
	    	setProperty(txAmtObj, "O"); 
	    	setProperty(txRemObj, "O");
	    	setProperty(crtUserObj, "O");
	    	setProperty(inpTelcObj, "O");
	    	setProperty(payattrObj, "O");
	    	setProperty(paytypeObj, "O");
	    	setProperty(isrefObj, "O");
	   // 	setProperty(refNoObj, "O");
	   // 	setProperty(chkamtObj, "O");
	    }
    }else if(BOPFLAG_JWHK!=null&&BOPFLAG_JWHK=='YES'){
		  var CONTRNOObj = document.getElementById("CONTRNO_JWHK");
		  var INVOINOObj = document.getElementById("INVOINO_JWHK");
		//  var CUSMNOObj = document.getElementById("CUSMNO_JWHK");
		//  var IMPDATEObj = document.getElementById("IMPDATE_JWHK");
          var paytypeObj = document.getElementById("PAYTYPE_JWHK");
	    if(jwhk_sendFlagObj.checked){
	 	    setProperty(CONTRNOObj, "M");
	    	setProperty(INVOINOObj, "M");
	    	setProperty(paytypeObj, "M");
	    }else{
	        setProperty(CONTRNOObj, "O");
	    	setProperty(INVOINOObj, "O");
	    	setProperty(paytypeObj, "O");
	   // 	setProperty(CUSMNOObj, "O");
	   // 	setProperty(IMPDATEObj, "O");
	    }
    }else if(BOPFLAG_JNHK!=null&&BOPFLAG_JNHK=='YES'){
		  var CONTRNOObj = document.getElementById("CONTRNO_JNHK");
		  var INVOINOObj = document.getElementById("INVOINO_JNHK");
		//  var CUSMNOObj = document.getElementById("CUSMNO_JNHK");
		  var crtUserObj = document.getElementById("CRTUSER_JNHK");
		  var inpTelcObj = document.getElementById("INPTELC_JNHK");
		  var RPTDATEObj = document.getElementById("RPTDATE_JNHK");
		//  var IMPDATEObj = document.getElementById("IMPDATE_JNHK");
		  
		  var contrnoObj = document.getElementById("COUNTRY_JNHK");
		  var txcodeObj = document.getElementById("TXCODE_JNHK");
		  var tc1amt = document.getElementById("TC1AMT_JNHK");
		  var txrem = document.getElementById("TXREM_JNHK");
          var isrefObj = document.getElementById("ISREF_JNHK");
          var paytypeObj = document.getElementById("PAYTYPE_JNHK");
	    if(jnhk_sendFlagObj.checked){
	 	    setProperty(CONTRNOObj, "M");
	    	setProperty(INVOINOObj, "M"); 
	    	setProperty(crtUserObj, "M");
	    	setProperty(inpTelcObj, "M");
	    	setProperty(RPTDATEObj, "M");
			setProperty(contrnoObj, "M");
			setProperty(txcodeObj, "M");
			setProperty(tc1amt, "M");
			setProperty(txrem, "M");
			setProperty(isrefObj, "M");
			setProperty(paytypeObj, "M");
	    }else{
	      setProperty(CONTRNOObj, "O");
	    	setProperty(INVOINOObj, "O"); 
	    //	setProperty(CUSMNOObj, "O");
	    	setProperty(crtUserObj, "O");
	    	setProperty(inpTelcObj, "O"); 
	    	setProperty(RPTDATEObj, "O");
	    //	setProperty(IMPDATEObj, "O");
	    	
	    	setProperty(contrnoObj, "O");
			setProperty(txcodeObj, "O");
			setProperty(tc1amt, "O");
			setProperty(txrem, "O");
			setProperty(isrefObj, "O");
			setProperty(paytypeObj, "O");
	    }
    }else if(BOPFLAG_DWFK!=null&&BOPFLAG_DWFK=='YES'){
		  var CONTRNOObj = document.getElementById("CONTRNO_DWFK");
		  var INVOINOObj = document.getElementById("INVOINO_DWFK");
		  var crtUserObj = document.getElementById("CRTUSER_DWFK");
		  var inpTelcObj = document.getElementById("INPTELC_DWFK");
		  var RPTDATEObj = document.getElementById("RPTDATE_DWFK");
		  
		 // var IMPDATEObj = document.getElementById("IMPDATE_DWFK");

	    if(dwfk_sendFlagObj.checked){
	 	    setProperty(CONTRNOObj, "M");
	    	setProperty(INVOINOObj, "M"); 
	    	setProperty(crtUserObj, "M");
	    	setProperty(inpTelcObj, "M");
	    	setProperty(RPTDATEObj, "M");
	    	
	    }else{
	      setProperty(CONTRNOObj, "O");
	    	setProperty(INVOINOObj, "O"); 
	    	setProperty(crtUserObj, "O");
	    	setProperty(inpTelcObj, "O"); 
	    	setProperty(RPTDATEObj, "O");
	    	
	    }
    }else if(BOPFLAG_JNFK!=null&&BOPFLAG_JNFK=='YES'){
		  var CONTRNOObj = document.getElementById("CONTRNO_JNFK");
		  var INVOINOObj = document.getElementById("INVOINO_JNFK");
		  var crtUserObj = document.getElementById("CRTUSER_JNFK");
		  var inpTelcObj = document.getElementById("INPTELC_JNFK");
		  var RPTDATEObj = document.getElementById("RPTDATE_JNFK");
		  var COUNTRYObj = document.getElementById("COUNTRY_JNFK");
		  var TXCODEObj = document.getElementById("TXCODE_JNFK");
		  var TC1AMTObj = document.getElementById("TC1AMT_JNFK");
		  var isrefObj = document.getElementById("ISREF_JNFK");
		 // var IMPDATEObj = document.getElementById("IMPDATE_JNFK");

	    if(jnfk_sendFlagObj.checked){
	 	    setProperty(CONTRNOObj, "M");
	    	setProperty(INVOINOObj, "M"); 
	    	setProperty(crtUserObj, "M");
	    	setProperty(inpTelcObj, "M");
	    	setProperty(RPTDATEObj, "M");
	    	setProperty(COUNTRYObj, "M");
	    	setProperty(TXCODEObj, "M");
	    	setProperty(TC1AMTObj, "M");
	    	setProperty(isrefObj, "M");
	   // 	setProperty(IMPDATEObj, "M");
	    }else{
	      setProperty(CONTRNOObj, "O");
	    	setProperty(INVOINOObj, "O"); 
	    	setProperty(crtUserObj, "O");
	    	setProperty(inpTelcObj, "O"); 
	    	setProperty(RPTDATEObj, "O");
	    	setProperty(COUNTRYObj, "O");
	    	setProperty(TXCODEObj, "O");
	    	setProperty(TC1AMTObj, "O");
	    	setProperty(isrefObj, "O");
	   // 	setProperty(IMPDATEObj, "O");
	    }
    }
}
function BOP_sbxxCheck(){
	var swsr_sendFlagObj = document.getElementById("SWSR_SEND_SBXX");
	var dwfk_sendFlagObj = document.getElementById("DWFK_SEND_SBXX");
	var jwhk_sendFlagObj = document.getElementById("JWHK_SEND_SBXX");
    
    var BOPFLAG_SWSR = $("#BOPFLAG_SWSR").val();
    var BOPFLAG_DWFK = $("#BOPFLAG_DWFK").val();
    var BOPFLAG_JWHK = $("#BOPFLAG_JWHK").val();
	var type = $("#RPTMETHOD_SWSR").val();
    if(BOPFLAG_SWSR!=null&&BOPFLAG_SWSR=='YES'){
    	var txCodeObj = document.getElementById("TXCODE_SWSR");
		var txAmtObj = document.getElementById("TC1AMT_SWSR");
		var txRemObj = document.getElementById("TXREM_SWSR");
		var countryObj = document.getElementById("COUNTRY_SWSR");
		var crtuserObj = document.getElementById("CRTUSER_SWSR");
		var inpTelcObj = document.getElementById("INPTELC_SWSR");
		var isrefObj = document.getElementById("ISREF_SWSR");
		var rptdateObj = document.getElementById("RPTDATE_SWSR");
	    if(swsr_sendFlagObj.checked){
  			setProperty(txCodeObj, "M");
  			setProperty(txAmtObj, "M");
  			setProperty(txRemObj, "M");
  			setProperty(countryObj, "M");
  			setProperty(crtuserObj, "M");
  			setProperty(inpTelcObj, "M");
  			setProperty(isrefObj, "M");
  			setProperty(rptdateObj, "M");
	    }else{
	    	setProperty(txCodeObj, "O");
  			setProperty(txAmtObj, "O");
  			setProperty(txRemObj, "O");
  			setProperty(countryObj, "O");
  			setProperty(crtuserObj, "O");
  			setProperty(inpTelcObj, "O");
  			setProperty(isrefObj, "O");
  			setProperty(rptdateObj, "O");
	    }
    }else if(BOPFLAG_DWFK!=null&&BOPFLAG_DWFK=='YES'){
    	var txCodeObj = document.getElementById("TXCODE_DWFK");
		var txAmtObj = document.getElementById("TC1AMT_DWFK");
		var txRemObj = document.getElementById("TXREM_DWFK");
		var countryObj = document.getElementById("COUNTRY_DWFK");
		var crtuserObj = document.getElementById("CRTUSER_DWFK");
		var inpTelcObj = document.getElementById("INPTELC_DWFK");
		var isrefObj = document.getElementById("ISREF_DWFK");
	    if(dwfk_sendFlagObj.checked){
  			setProperty(txCodeObj, "M");
  			setProperty(txAmtObj, "M");
  			setProperty(txRemObj, "M");
  			setProperty(countryObj, "M");
  			setProperty(crtuserObj, "M");
  			setProperty(inpTelcObj, "M");
  			setProperty(isrefObj, "M");
	    }else{
	    	setProperty(txCodeObj, "O");
  			setProperty(txAmtObj, "O");
  			setProperty(txRemObj, "O");
  			setProperty(countryObj, "O");
  			setProperty(crtuserObj, "O");
  			setProperty(inpTelcObj, "O");
  			setProperty(isrefObj, "O");
	    }
    }else if(BOPFLAG_JWHK!=null&&BOPFLAG_JWHK=='YES'){
    	var txCodeObj = document.getElementById("TXCODE_JWHK");
		var txAmtObj = document.getElementById("TC1AMT_JWHK");
		var txRemObj = document.getElementById("TXREM_JWHK");
		var countryObj = document.getElementById("COUNTRY_JWHK");
		var crtuserObj = document.getElementById("CRTUSER_JWHK");
		var inpTelcObj = document.getElementById("INPTELC_JWHK");
		var paytypeObj = document.getElementById("PAYTYPE_JWHK");
		var isrefObj = document.getElementById("ISREF_JWHK");
		var rptdateObj = document.getElementById("RPTDATE_JWHK");
	    if(jwhk_sendFlagObj.checked){
  			setProperty(txCodeObj, "M");
  			setProperty(txAmtObj, "M");
  			setProperty(txRemObj, "M");
  			setProperty(countryObj, "M");
  			setProperty(crtuserObj, "M");
  			setProperty(inpTelcObj, "M");
  			setProperty(paytypeObj, "M");
  			setProperty(isrefObj, "M");
  			setProperty(rptdateObj, "M");
	    }else{
	    	setProperty(txCodeObj, "O");
  			setProperty(txAmtObj, "O");
  			setProperty(txRemObj, "O");
  			setProperty(countryObj, "O");
  			setProperty(crtuserObj, "O");
  			setProperty(inpTelcObj, "O");
  			setProperty(paytypeObj, "O");
  			setProperty(isrefObj, "O");
  			setProperty(rptdateObj, "O");
	    }
    }
    
}