//���ݳ����ǣ��޸�ԭʼ���ڵ�״̬
function CDFlagChange(obj, OrgTranDateId) {
	if ($(obj).val() == '3' || $(obj).val() == '4') {
		setProperty($("#" + OrgTranDateId)[0], "M");
	} else {
		setProperty($("#" + OrgTranDateId)[0], "O");
	}
}

//���ݳ����ǣ��޸�ԭʼ����/�Է��˺�״̬
function CDFlagChange3(obj, OrgTranDateId, OppAccountId, OppNameId,
		OppBankCodeId) {
	if ($(obj).val() == '3' || $(obj).val() == '4') {
		setProperty($("#" + OrgTranDateId)[0], "M");
		setProperty($("#" + OppAccountId)[0], "O");
		setProperty($("#" + OppNameId)[0], "O");
		setProperty($("#" + OppBankCodeId)[0], "O");
	} else if (($(obj).val() == '1' || $(obj).val() == '2')) {
		setProperty($("#" + OrgTranDateId)[0], "O");
		setProperty($("#" + OppAccountId)[0], "M");
		setProperty($("#" + OppNameId)[0], "M");
		setProperty($("#" + OppBankCodeId)[0], "M");
	} else {
		setProperty($("#" + OrgTranDateId)[0], "O");
		setProperty($("#" + OppAccountId)[0], "O");
		setProperty($("#" + OppNameId)[0], "O");
		setProperty($("#" + OppBankCodeId)[0], "O");

	}
}

//���ݳ����ǣ��޸�ԭʼ����/�Է��˺�״̬
function CDFlagChange2(obj, OrgTranDateId, OppAccountId, OppNameId) {
	if ($(obj).val() == '3' || $(obj).val() == '4') {
		setProperty($("#" + OrgTranDateId)[0], "M");
		setProperty($("#" + OppAccountId)[0], "O");
		setProperty($("#" + OppNameId)[0], "O");
	} else if (($(obj).val() == '1' || $(obj).val() == '2')) {
		setProperty($("#" + OrgTranDateId)[0], "O");
		setProperty($("#" + OppAccountId)[0], "M");
		setProperty($("#" + OppNameId)[0], "M");
	} else {
		setProperty($("#" + OrgTranDateId)[0], "O");
		setProperty($("#" + OppAccountId)[0], "O");
		setProperty($("#" + OppNameId)[0], "O");

	}
}

//���ݳ�/���˱�־���ı�ԭʼ��������״̬
function checkOrgTranDate(msgno) {
	if ($("select[id^='FTZ" + msgno + "_CDFlag_']").length > 0) {
		$("select[id^='FTZ" + msgno + "_CDFlag_']").each(function(i, t) {
			//�����/���˱�־��3����4
				if ($(this).val() == '3' || $(this).val() == '4') {
					setProperty(
							$("#FTZ" + msgno + "_OrgTranDate_LT" + (i + 1))[0],
							"M");
				}
			});
	}
}

//У����ϸ������
function checkListCount(msgno) {
	var flag = true;
	if ($("#FTZ" + msgno + "_TRANLIST_CREATED").val() == "0") {
		return false;
	}
	return flag;
}

//��֤ԭʼ�����������������
function checkOrgTranDate_Submit(msgno){
	var flag = true;
	if($("select[id^='FTZ"+msgno+"_CDFlag_']").length > 0){		
		
		$("select[id^='FTZ"+msgno+"_CDFlag_']").each(function(i,t){			
			//�����/���˱�־��3����4
			if($(this).val() == '3' || $(this).val() == '4'){
				flag = false;
				//�ж�ԭʼ��������
				if($("#FTZ"+msgno+"_OrgTranDate_LT"+(i+1)).val() != ""){
					//���ڼ�������
					if($("#FTZ"+msgno+"_OrgTranDate_LT"+(i+1)).val() <= $("#FTZ"+msgno+"_TranDate_LT"+(i+1)).val()){
						flag = true;
					}
				}
			}
			if( $(this).val() == '1' || $(this).val() == '2'){
				flag = false;
				//�ж�ԭʼ��������
				if($("#FTZ"+msgno+"_OrgTranDate_LT"+(i+1)).val() == ""){
						flag = true;
				}else{
					//���ڼ�������
					if($("#FTZ"+msgno+"_OrgTranDate_LT"+(i+1)).val() <= $("#FTZ"+msgno+"_TranDate_LT"+(i+1)).val()){
						flag = true;
					}
				}
			}
			if(!flag){
				alert("[ԭʼ��������]ֵӦС�ڵ���[��������]");
				setFocus($("#FTZ"+msgno+"_OrgTranDate_LT"+(i+1))[0]);
				return false;
			}
		});
	}
	return flag;
}

//������
function AddSeqNo(msgNo)
{
	//�ܼ�¼����ֵ
	$("#FTZ"+msgNo+"_TotalCount").val($("#FTZ"+msgNo+"_TRANLIST_CREATED").val());	
	//��ϸ�Ÿ�ֵ
	var total = $("#FTZ"+msgNo+"_TRANLIST_CREATED").val();
	if(total > 0){
	$("input[name^=FTZ"+msgNo+"_SeqNo_LT]").each(
		function (i,t){
			var mode = "000000";
			var row = i + 1
			var tmp = mode.substr(0,mode.length - row.toString().length);
			$(this).val(tmp + row);
		})
	}
}

/**
 * ѭ���У��жϿ�ʼ���ڱ���С�ڵ�����
 * @param {Object} starTimeId ѭ����ID��ͷ
 * @param {Object} msgNo ���ı��
 * @memberOf {TypeName} 
 * @return {TypeName} 
 */
function checkLoopDate(starTimeId,msgNo){
	var flag = true;
	//ѡȡһ�����ڶ���
	$("input[name^='"+starTimeId+"']").each(function(i,t){
		var expireDate = $("#FTZ" + msgNo + "_ExpireDate_LT" + (i + 1));
		flag = compareDate($(this).val(),$(expireDate).val());
		if(!flag){
			setFocus($(this)[0]);
			return false;
		}
	})
	return flag;
}
//У����������Ƿ񰴹�ʽ����
function checkFtzAmount(msgNo)
{
	var flag = true;
	var sumAmount=checkFtzAmountLt(msgNo);
	var preamount=checkFtzPreAmount(msgNo);
	var ftzbalance=parseFloat(getFieldValue("FTZ"+msgNo+"_Balance"));
	 if(preamount=="") {
		  preamount=0;
		  alert("�������:"+parseFloat(preamount));
		 }
	 var Amount=parseFloat(sumAmount)+parseFloat(preamount);
	 if(ftzbalance!=Amount){
		 
	     alert("�������:"+parseFloat(preamount)+"\n�밴:T�գ�ҵ�����գ����=(T-1)�����+T������+T�ճ��˳���-T�ճ���-T���˳�������!")
	     flag = false;
	 }
	 return flag
}
//��ѯ�걨����ǰһ��Ľ��
function checkFtzPreAmount(msgNo){
	 var args = {};
	 var preamount=0;
	 var ftzdate=document.getElementById("FTZ"+msgNo+"_SubmitDate").value;
	 var arry = ftzdate.split("-");
	 var  today=new  Date(arry[0],arry[1]-1,arry[2]); 
	 today.setDate(today.getDate()-1);
	 var mounth=today.getMonth()+1;
	 var year=today.getFullYear();
	 var date=today.getDate();
	  mounth = mounth.length >= 2 ? mounth : "0" + mounth;
      date = date.length >= 2 ? date : "0" + date;
      //�걨���ڵ�ǰһ������
	 var predate=year+"-"+mounth+"-"+date;
	 var accountNo=getFieldValue("FTZ"+msgNo+"_AccountNo");
	 setFunctionArgs(args, "ACCOUNT", accountNo);
	 setFunctionArgs(args, "FTZDATE", predate);
	 setFunctionArgs(args, "MSGNO", msgNo);
	 //�걨���ڵ�ǰһ�����ڵĽ��
	 preamount = callFunction("FTZ_BALANCE",args,"FTZ_AMOUNT");
	 return preamount;
}
//ҳ����ϸ������
function checkFtzAmountLt(msgNo){
	var amount1 = [];
	var amount2 = [];
	var amount3 = [];
	var amount4 = [];
	var sumAmount = 0;
	$("input[name^='FTZ"+msgNo+"_Amount_LT']").each(function(i,t){
		var name=this.id.indexOf("_LT");
		var index=this.id.substring(name+3);
		var str=getFieldValue("FTZ"+msgNo+"_CDFlag_LT" + index);
		var amount  =getFieldValue(this.id);
		if(str=="1"){
		    amount1.push(amount);
		}else if(str =="2"){
			amount2.push(amount);
		}else if(str=="3"){
			amount3.push(amount);
		}else if(str=="4"){
			amount3.push(amount);
		}
	})
	 sumAmount-=doLoop(amount1);
	 sumAmount+=doLoop(amount2);
	 sumAmount-=doLoop(amount3);
	 sumAmount+=doLoop(amount4);
	 return sumAmount;
}


function doLoop(arr){
	var result = 0;
	if(arr.length > 0 ){
		for(var i = 0;i < arr.length;i++ ){
			result+=arr[i];
		}
	}
	return result;
}
//��ϸ�������ѡ���й�ʱ���ڵ�����Ϊ������
function checkCountryCode(obj)
{
	$(document).on("change", "input[name^='FTZ"+obj+"_CountryCode_LT']", function(){
			var ccy = this.value;
			var name = this.id.indexOf("_LT")
			var index=this.name.substring(name+3);
		    var str  = document.getElementById("FTZ"+obj+"_DistrictCode_LT" + index);
			if(ccy == "CHN" ){
				setProperty(str, "M");
			}else{
				setProperty(str, "O");
			}
	});
}
//û����ϸ�������ѡ���й�ʱ���ڵ�����Ϊ������
function checkCountryCodePage(obj)
{
	$(document).ready(function(){
		$("#FTZ"+obj+"_CountryCode").on('change',function(){
			if(this.value == 'CHN'){
				setProperty($("#FTZ"+obj+"_DistrictCode"), "M");
			}else{
				setProperty($("#FTZ"+obj+"_DistrictCode"), "O");
			}
		});
	});
}



/**
 * ���ݿ�ʼ���ڡ����޵�λ�����޳��ȼ��㵽���� add by zp
 * @param {string} startDate ��ʼ�����ַ���
 * @param {string} unit  ���޵�λ���ꡢ�¡��գ���Ӧ��ֵΪ��1��2��3��
 * @param {string} num   ���޳���
 * @return {string} result ���������ַ���
 */
function getEndDate(startDate,unit,num)
{
	if(startDate == '' || startDate == undefined  
	   || unit == ''   ||  unit == undefined || 
	   num == '' || num == undefined){
		return;
	}
	if(isNaN(num)){
		alert("����ȷ�������޳���");
		return false;
	}
	var arr=startDate.split("-");
	var startTime=new Date(arr[0],arr[1]-1,arr[2]);
	var result ='';
	//�������޵�λ�����ͣ��ꡢ�¡��գ����в���
	if(unit == '1'){
		startTime.setFullYear(startTime.getFullYear()+ Number(num));
	}else if(unit == '2'){
		startTime.setMonth(startTime.getMonth()+ Number(num));
	}else if(unit == '3'){
		startTime.setDate(startTime.getDate() + Number(num));
	}
	//ƴ�ӵ������ַ���������
	var year = startTime.getFullYear();
	var month = startTime.getMonth()+1;
	var day = startTime.getDate();
	result = year+"-"+month+"-"+day;
	return result;
	
}


/**
 * �����ռ���
 * @param {string} startName ��ʼ�����������
 * @param {string} lengthName ���޳������������
 * @param {string} unitName ���޵�λ�������
 * @param {string} endName �����������������
 * @return
 */
function getEndDateForAll(startName,lengthName,unitName,endName){
	$(document).on("change","input[name^='"+startName+"'],input[name^='"+lengthName+"'],select[name^='"+unitName+"']",function(){
		var index=''; 
		if(this.name.indexOf("_LT") >= 0){
			index = this.name.substring(this.name.indexOf("_LT")+3);
		}
		var startDate = $("input[name='"+startName+index+"']").val();
		var unit = $("select[name='"+unitName+index+"']").val();
		var num = $("input[name='"+lengthName+index+"']").val();
		$("input[name='"+endName+index+"']").val(getEndDate(startDate,unit,num));
	});
}