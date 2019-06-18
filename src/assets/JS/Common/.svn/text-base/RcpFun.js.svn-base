/**
 * V1.5.1升级
 * 验证当操作类型是新增与修改时，国家编码不能填写中国中国,
 * @param {Object} OperType		操作类型对象 
 * @param {Object} countryCode	国家代码对象
 */
function checkCounrtyCode(operType,countryCode,areaName){
	var ret = true;
	//操作类型不为删除或者撤销
	if($(operType).val() != "3"){
		//如果是中国
		if($(countryCode).val() == "156"){
			alert("操作类型为新增或者修改时," + areaName +",不能是中国！");
			ret = false;
		}
	}
	return ret;
}

/**
 * V1.5.1升级
 * 当操作类型为新增或者修改时候，验证结账期小于99999
 * @param {Object} OperType		操作类型对象
 * @param {Object} period		结账期对象
 */
function checkAccountPeriod(operType,period){
	var ret = true;
	//操作类型不为删除或者撤销
	if($(operType).val() != "3"){
		if($(period).val() >= 99999){
			alert("操作类型为新增或者修改时，结账期必须小于99999");
			setFocus($(period)[0]);
			ret = false;
		}
	}
	return ret;
}

/**
 * V1.5.1升级	日期格式必须是 yyyy-mm-dd
 * 当操作类型为新增或者修改时，验证日期小于当前系统日期
 * @param {Object} OperType		操作类型对象
 * @param {Object} date			日期对象
 * RCP2101_PayeeDate
 */
function checkDateLessSysDate(operType,date){
		var ret = true;
	//操作类型不为删除或者撤销
	if($(operType).val() != "3"){
		var t = new Date();
		var month=t.getMonth() + 1+"";
		var curdate=t.getDate()+"";
		if(month.length<2) month="0"+month;
		if(curdate.length<2) curdate="0"+curdate;
		var currentDate = t.getFullYear() + "-" + month + "-" + curdate;
		if($(date).val() > currentDate){
			// modified by Michael on 2014-05-10 修改提示语
			alert("操作类型为新增或者修改时，日期不得大于当前系统日期");
			setFocus($(date)[0]);
			ret = false;
		}
	}
	return ret;
}

/**
 * v1.5.1升级
 * 开始日期必须小于结束日期 日期格式必须是yyyy-mm-dd
 * @param {Object} startDate 开始日期对象
 * @param {Object} startTxt  开始日期描述
 * @param {Object} endDate   结束日期对象
 * @param {Object} endStartTxt 结束日期描述
 */
function checkStartDateLessEndDate(startDate,startTxt,endDate,endStartTxt){
	if($(startDate).val() != "" && $(endDate).val() != ""){
		if($(startDate).val() > $(endDate).val()){
			alert(startTxt + " 必须小于 " + endStartTxt);
			setFocus($(startDate)[0]);
			setFocus($(endDate)[0]);
			return false
		}
	}
	return true;
}