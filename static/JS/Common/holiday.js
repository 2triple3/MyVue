/**
 * 节假日处理
 */
//[FINWARE_V3.5_TFS_2013120020]_B fanr 2013-4-26 ---------------

var holidaysWorkday="",holidaysWeekend="",holidaysCcy="CNY";
var SYS_HOLIDAY_DEFAULT_P_SYSID = "CNY";

function dateStr2time(dateStr){
	var dateArr = dateStr.split("-");
	var tmpDate = new Date(dateArr[0],  dateArr[1]-1,  dateArr[2], 0, 0, 0, 0);
	return tmpDate.getTime();
}
function time2dateStr(time){
	var tmpDate = new Date(parseInt(time));
	var year = tmpDate.getFullYear();
	var month = tmpDate.getMonth()<9 ? "0"+(tmpDate.getMonth()+1) : tmpDate.getMonth()+1;
	var date = tmpDate.getDate()<10 ? "0"+tmpDate.getDate() : tmpDate.getDate();
	return (year+"-"+month+"-"+date);
}


/**
 * 校验是否节假日
 */

function checkIsHoliday(time, P_SYSID){
	
	var holidaysJSON = UtanGlobalCache("holiday").get();
	if (isEmptyObject(holidaysJSON)) {
		return false;
	}
	if (!P_SYSID) {
		P_SYSID = SYS_HOLIDAY_DEFAULT_P_SYSID;
	}
	if (isEmptyObject(holidaysJSON[P_SYSID])) {
		return false;
	}
	var tmpDate = new Date(parseInt(time));
	if( tmpDate.getDay() == 0 || tmpDate.getDay() == 6){
		var weekend = holidaysJSON[P_SYSID].HOLIDAYSWEEKEND;
		var weekendArr = weekend.split(",");
		if( $.inArray(""+time, weekendArr) > -1 ){
			return false;
		}
		return true;
		
	} else {
		var workday = holidaysJSON[P_SYSID].HOLIDAYSWORKDAY;
		var workdayArr = workday.split(",");
		if( $.inArray(""+time,workdayArr) > -1 ){
				return true;
		}
		return false;
		
	}
}

/**
 * 如果是节假日,顺延至非节假日
 * @param {Object} endTime 格林威治时间
 * @param {Object} P_SYSID 标识
 * @param {Object} flag 传入负数往前顺延,否则往后顺延
 * @return {TypeName} 
 */
function delayEndTime(endTime,P_SYSID, flag){
	if(!P_SYSID) P_SYSID = SYS_HOLIDAY_DEFAULT_P_SYSID;
	//[bug619_delayHolidays方法BUG]_B fanr 2013-6-13 ---------------
	var unit = 1;
	if(flag && flag < 0){
		unit = -1;
	}
	if(UtanGlobalCache("userConfig").get().holidays.delayMethod == "deleteLastHoliday"){
		while( checkIsHoliday(endTime,P_SYSID) ){
			endTime += unit*24*3600*1000;
		}
		return endTime;
	}
	//[bug619_delayHolidays方法BUG]_E fanr 2013-6-13 ---------------
}


/*
 * delayHolidays()
 * dateBegin:"YYYY-mm-dd";days:0-n
 * method 1:delayHolidays("2011-06-06",20) means from 2011-06-06 20 days later
 * method 2:delayHolidays(20) means from today 20 days later
 */

function delayHolidays(dateBegin,days,P_SYSID){
	if(!P_SYSID) P_SYSID=SYS_HOLIDAY_DEFAULT_P_SYSID;
	if( arguments.length == 1 ) {
		var today = getCurrDateRemote();
		var days = arguments[0];
		return arguments.callee.call( this, today, days );
	}
	var dateBegin = dateStr2time( dateBegin );
	var days = parseInt(days);
	var endTime = dateBegin + days*24*3600*1000;
	//[bug619_delayHolidays方法BUG]_B fanr 2013-6-13 ---------------
	if(days>=0){
		endTime = delayEndTime(endTime, P_SYSID, 1);
	} else {
		endTime = delayEndTime(endTime, P_SYSID, -1);
	}
	//[bug619_delayHolidays方法BUG]_E fanr 2013-6-13 ---------------
	
	endTime = time2dateStr( endTime );
	return endTime;
}
/*
 * delayHolidaysByWorkday()
 * dateBegin:"YYYY-mm-dd";days:+-n;P_SYSID:区域+币别,例如"AOUSD",AO代表区域,USD代表币别
 * method 1:delayHolidays("2011-06-06",20,"CNY") means from 2011-06-06 20 workdays later
 * method 2:delayHolidays(20,"CNY") means from today 20 workdays later
 * method 3:delayHolidays(20) same as delayHolidays(20,"CNY") means from today 20 workdays later
 * days:can be negative number
 * P_SYSID:区域+币别,例如"AOUSD",AO代表区域,USD代表币别,如果不传,默认CNY
 */
function delayHolidaysByWorkday(dateBegin,days,P_SYSID){
	if( arguments.length == 1 ) {
		var today = getCurrDateRemote();
		var days = arguments[0];
		return arguments.callee.call( this, today, days, SYS_HOLIDAY_DEFAULT_P_SYSID);
	}
	if( arguments.length == 2 ) {
		var today = getCurrDateRemote();
		var days = arguments[0];
		var P_SYSID = arguments[1];
		return arguments.callee.call( this, today, days, P_SYSID);
	}
	var dateBegin = dateStr2time( dateBegin );
	var days = parseInt(days);
	if( days >= 0 ){
		var count = 0;
		var endTime = dateBegin;
		while( count<days ){
			endTime = endTime + 24*3600*1000;
			if( !checkIsHoliday(endTime,P_SYSID) ){
				count++;
			}
		}
		endTime = time2dateStr( endTime );
		return endTime;
	} else {
		days = -days;
		var count = 0;
		var endTime = dateBegin;
		while( count<days ){
			endTime = endTime - 24*3600*1000;
			if( !checkIsHoliday(endTime,P_SYSID) ){
				count++;
			}
		}
		endTime = time2dateStr( endTime );
		return endTime;
	}
}
/**
 * countWorkdays()
 * dateBegin:"YYYY-mm-dd";
 * dateEnd:"YYYY-mm-dd";
 * P_SYSID:区域+币别,例如"AOUSD",AO代表区域,USD代表币别
 * isCountBegin:true|false
 * countWorkdays("2011-08-23", "2011-08-25", "CNY"):return the count of workdays in "2011-08-23","2011-08-24","2011-08-25"
 * countWorkdays("2011-08-23", "2011-08-25", "CNY", false):return the count of workdays in "2011-08-24","2011-08-25"
 * if return -1,only in one condition:countWorkdays("2011-08-23", "2011-08-23", "CNY", false): beginTime == endTime,and needn't count the beginTime
 */
function countWorkdays(dateBegin, dateEnd, P_SYSID, isCountBegin){
	if(!P_SYSID) P_SYSID=SYS_HOLIDAY_DEFAULT_P_SYSID;
	var beginTime = dateStr2time( dateBegin );
	var endTime = dateStr2time( dateEnd );
	if( beginTime > endTime ){
		var tmpBeginTime = beginTime;
		beginTime = endTime;
		endTime = tmpBeginTime;
	}
	if( isCountBegin === false ){
		if( beginTime == endTime ) return -1;
		beginTime = beginTime + 24*3600*1000;
	}
	var workdays = 0;
	var holidays = 0;
	var tmpTime = beginTime;
	while( tmpTime<=endTime ){
		if( checkIsHoliday(tmpTime,P_SYSID) ){
			holidays++;
		} else {
			workdays++;
		}
		tmpTime +=  24*3600*1000;
	}
	
	return workdays;
}

//[FINWARE_V3.5_TFS_2013120020]_E fanr 2013-4-26 ---------------
