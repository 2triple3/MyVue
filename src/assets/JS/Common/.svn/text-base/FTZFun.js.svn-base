//根据出入标记，修改原始日期的状态
function CDFlagChange(obj, OrgTranDateId) {
	if ($(obj).val() == '3' || $(obj).val() == '4') {
		setProperty($("#" + OrgTranDateId)[0], "M");
	} else {
		setProperty($("#" + OrgTranDateId)[0], "O");
	}
}

//根据出入标记，修改原始日期/对方账号状态
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

//根据出入标记，修改原始日期/对方账号状态
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

//根据出/入账标志，改变原始交易日期状态
function checkOrgTranDate(msgno) {
	if ($("select[id^='FTZ" + msgno + "_CDFlag_']").length > 0) {
		$("select[id^='FTZ" + msgno + "_CDFlag_']").each(function(i, t) {
			//如果出/入账标志是3或者4
				if ($(this).val() == '3' || $(this).val() == '4') {
					setProperty(
							$("#FTZ" + msgno + "_OrgTranDate_LT" + (i + 1))[0],
							"M");
				}
			});
	}
}

//校验明细总条数
function checkListCount(msgno) {
	var flag = true;
	if ($("#FTZ" + msgno + "_TRANLIST_CREATED").val() == "0") {
		return false;
	}
	return flag;
}

//验证原始交易日期与记账日期
function checkOrgTranDate_Submit(msgno){
	var flag = true;
	if($("select[id^='FTZ"+msgno+"_CDFlag_']").length > 0){		
		
		$("select[id^='FTZ"+msgno+"_CDFlag_']").each(function(i,t){			
			//如果出/入账标志是3或者4
			if($(this).val() == '3' || $(this).val() == '4'){
				flag = false;
				//判断原始交易日期
				if($("#FTZ"+msgno+"_OrgTranDate_LT"+(i+1)).val() != ""){
					//大于记账日期
					if($("#FTZ"+msgno+"_OrgTranDate_LT"+(i+1)).val() <= $("#FTZ"+msgno+"_TranDate_LT"+(i+1)).val()){
						flag = true;
					}
				}
			}
			if( $(this).val() == '1' || $(this).val() == '2'){
				flag = false;
				//判断原始交易日期
				if($("#FTZ"+msgno+"_OrgTranDate_LT"+(i+1)).val() == ""){
						flag = true;
				}else{
					//大于记账日期
					if($("#FTZ"+msgno+"_OrgTranDate_LT"+(i+1)).val() <= $("#FTZ"+msgno+"_TranDate_LT"+(i+1)).val()){
						flag = true;
					}
				}
			}
			if(!flag){
				alert("[原始交易日期]值应小于等于[记账日期]");
				setFocus($("#FTZ"+msgno+"_OrgTranDate_LT"+(i+1))[0]);
				return false;
			}
		});
	}
	return flag;
}

//添加序号
function AddSeqNo(msgNo)
{
	//总记录数赋值
	$("#FTZ"+msgNo+"_TotalCount").val($("#FTZ"+msgNo+"_TRANLIST_CREATED").val());	
	//明细号赋值
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
 * 循环中，判断开始日期必须小于到期日
 * @param {Object} starTimeId 循环中ID的头
 * @param {Object} msgNo 报文编号
 * @memberOf {TypeName} 
 * @return {TypeName} 
 */
function checkLoopDate(starTimeId,msgNo){
	var flag = true;
	//选取一组日期对象
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
//校验日终余额是否按公式计算
function checkFtzAmount(msgNo)
{
	var flag = true;
	var sumAmount=checkFtzAmountLt(msgNo);
	var preamount=checkFtzPreAmount(msgNo);
	var ftzbalance=parseFloat(getFieldValue("FTZ"+msgNo+"_Balance"));
	 if(preamount=="") {
		  preamount=0;
		  alert("昨日余额:"+parseFloat(preamount));
		 }
	 var Amount=parseFloat(sumAmount)+parseFloat(preamount);
	 if(ftzbalance!=Amount){
		 
	     alert("昨日余额:"+parseFloat(preamount)+"\n请按:T日（业务发生日）余额=(T-1)日余额+T日入账+T日出账冲正-T日出账-T入账冲正计算!")
	     flag = false;
	 }
	 return flag
}
//查询申报日期前一天的金额
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
      //申报日期的前一天日期
	 var predate=year+"-"+mounth+"-"+date;
	 var accountNo=getFieldValue("FTZ"+msgNo+"_AccountNo");
	 setFunctionArgs(args, "ACCOUNT", accountNo);
	 setFunctionArgs(args, "FTZDATE", predate);
	 setFunctionArgs(args, "MSGNO", msgNo);
	 //申报日期的前一天日期的金额
	 preamount = callFunction("FTZ_BALANCE",args,"FTZ_AMOUNT");
	 return preamount;
}
//页面明细金额汇总
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
//明细国别代码选择中国时国内地区码为必填项
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
//没有明细国别代码选择中国时国内地区码为必填项
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
 * 根据开始日期、期限单位、期限长度计算到期日 add by zp
 * @param {string} startDate 开始日期字符串
 * @param {string} unit  期限单位（年、月、日）对应的值为（1、2、3）
 * @param {string} num   期限长度
 * @return {string} result 结束日期字符串
 */
function getEndDate(startDate,unit,num)
{
	if(startDate == '' || startDate == undefined  
	   || unit == ''   ||  unit == undefined || 
	   num == '' || num == undefined){
		return;
	}
	if(isNaN(num)){
		alert("请正确输入期限长度");
		return false;
	}
	var arr=startDate.split("-");
	var startTime=new Date(arr[0],arr[1]-1,arr[2]);
	var result ='';
	//根据期限单位的类型（年、月、日）进行操作
	if(unit == '1'){
		startTime.setFullYear(startTime.getFullYear()+ Number(num));
	}else if(unit == '2'){
		startTime.setMonth(startTime.getMonth()+ Number(num));
	}else if(unit == '3'){
		startTime.setDate(startTime.getDate() + Number(num));
	}
	//拼接到期日字符串并返回
	var year = startTime.getFullYear();
	var month = startTime.getMonth()+1;
	var day = startTime.getDate();
	result = year+"-"+month+"-"+day;
	return result;
	
}


/**
 * 到期日计算
 * @param {string} startName 开始日输入框名称
 * @param {string} lengthName 期限长度输入框名称
 * @param {string} unitName 期限单位类别名称
 * @param {string} endName 结束日期输入框名称
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