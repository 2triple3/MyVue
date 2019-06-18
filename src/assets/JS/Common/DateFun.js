/**
 * 日期处理
 */
var ONE_DAY = 24 * 60 * 60 * 1000;
var DATE_FORMAT = "YYYYMMDD";
var DATE_SPLIT = "-";
var bSuccess = false; //22222
var SYS_COUNTRY = "USD";
var DateError = "Date value is not correct, please check it!";

/**
 * 检查日期是否为假期，输入为地区代码，日期值（日期类型）
 * @param {Date|String} dValue 日期对象 或者 日期字符串例如"2013-09-04"
 * @param {String} P_SYSID:节假日标识,由区域码+币别构成。例如”AOCCY”,AO是区域码,币别是CCY。标识符也可只是币别，但不可只是区域码。不传默认为"CCY"
 * @return {boolean} 返回真与假
 */
function isHoliday(dValue, P_SYSID){
    if ((dValue instanceof Date)&& checkIsHoliday(dValue.getTime(), P_SYSID)){ 
        return true;
    } else if(typeof dValue==="string"){
    	dValue = Str2Date(dValue);
    	return arguments.callee(dValue, P_SYSID);
    }
    return false;
}

/**
 * 得到隔几月后的日期，输入为日期（日期类型），天数
 * @param {Date} begDate	开始日期
 * @param {int} num	天数
 * @return {Date} 返回日期类型
 */
function getNMonthDate(begDate, num){
    var nYear = begDate.getFullYear();
    var nMonth = begDate.getMonth();
    var nDay = begDate.getDate();
    var nextMonth = nMonth + num;
    var nn = nextMonth / 12;
    if (nn < 1) 
        nn = 0;
    else 
        nn = 1;
    nYear = nYear + nn;
    nMonth = nextMonth - nn * 12;
    
    var nextDate = new Date(nYear, nMonth, nDay, 0, 0, 0, 0);
    return nextDate;
}

/**
 * 得到，输入为日期（日期类型），天数
 * @param {Date} begDate	开始日期
 * @param {Date} endDate	结束日期
 * @return {Date} 返回日期类型
 */
function getSubMonth(begDate, endDate){
    var nYear1 = begDate.getFullYear();
    var nMonth1 = begDate.getMonth();
    var nDay1 = begDate.getDate();
    
    var nYear2 = endDate.getFullYear();
    var nMonth2 = endDate.getMonth();
    var nDay2 = endDate.getDate();
    //[bug1533_getSubMonth函数如果跨年少计算一个月]_B fanr 2013-9-4
    var subMonth = nMonth2 + 12 * (nYear2 - nYear1) - nMonth1;
    //[bug1533_getSubMonth函数如果跨年少计算一个月]_E fanr 2013-9-4
    var nn = nDay2 - nDay1;
    if (nn > 0) 
        nn = 1;
    else 
        nn = 0;
    subMonth = subMonth + nn;
    return subMonth;
}

/**
 * 得到隔几天后的日期，输入为日期（日期类型），天数
 * @param {Date} begDate	开始日期
 * @param {int} num	天数
 * @return {Date} 返回日期类型
 */
function getNextDate(begDate, num){
    if (begDate == "" || begDate == null) 
        return;
    var mil = begDate.getTime() + (num) * ONE_DAY;
    var nextDate = new Date(mil);
    return nextDate;
}

/**
 * 得到下一个工作日，输入为开始日（日期类型），币种
 * @param {Date} begDate	开始日期
 * @param {String} ccy	币别
 * @return {Date} 返回日期类型
 */
function getNextWorkDate(begDate,ccy){
    return getDateAfterNWorkDay(begDate,1,ccy);
}

/**
 * 得到下一个工作日星期几，输入为开始日（日期类型），币别
 * 返回星期几
 */
function getNextWorkDay(begDate,ccy){
    var nextDate = getNextDate(begDate, 1);
    while (isHoliday(nextDate,ccy)) {
        nextDate = getNextDate(nextDate, 1);
    }
    return nextDate.getDay();
}

/**
 * 得到几一个工作日，输入为开始日（日期类型），工作日个数,币别
 * 返回日期类型
 */
function getDateAfterNWorkDay(begDate, num, ccy){
//    if (!begDate) 
//        return "";
//    var nextDate = begDate;
//    var dayCount = 0;
//    if (num >= 0) {
//        while (dayCount < num) {
//            nextDate = getNextDate(nextDate, 1);
//            if (!isHoliday(nextDate, ccy)) 
//                dayCount++;
//        }
//    }
//    else {
//        nextDate = getNextDate(begDate, num);
//    }
//    return nextDate;
	var begDate = Date2Str(begDate);
	return delayHolidaysByWorkday(begDate,num,ccy);
}

/**
 * 获取两个日期的差值天数
 * @param {Date} endDate
 * @param {Date} begDate
 */
function subDays(endDate, begDate){
    if (!endDate || !begDate) 
        return 0;
    var tmp1Y = endDate.getFullYear();
    var tmp1M = endDate.getMonth();
    var tmp1D = endDate.getDate();
    var tmp2Y = begDate.getFullYear();
    var tmp2M = begDate.getMonth();
    var tmp2D = begDate.getDate();
    var newEndDate = new Date(tmp1Y, tmp1M, tmp1D, 0, 0, 0, 0);
    var newBegDate = new Date(tmp2Y, tmp2M, tmp2D, 0, 0, 0, 0);
    var seconds = newEndDate.getTime() - newBegDate.getTime();
    return seconds / ONE_DAY;
}

/**
 * 获取两个日期差值的秒数
 * @param {Date} endDate
 * @param {Date} begDate
 */
function subSecond(endDate, begDate){
    if (!endDate || !begDate) 
        return 0;
    var seconds = endDate.getTime() - begDate.getTime();
    return seconds / 1000;
}

function compareDate(d1, d2){
    var bSame;
    if ( (d1 == null || d1 == '') && (d2 != null || d2 != '')) {
        bSame = 1;
    }
    else 
        if ( (d2 == null || d2 == '') && (d1 != null || d1 != '')) {
            bSame = -1;
        }
        else 
            if ((d1 == null || d1 == '') && (d2 == null || d2 == '')) {
                bSame = 0;
            }
            else {
            	if(typeof(d1) != "object"){
            		d1 = Str2Date(d1);
            	}
            	if(typeof(d2) != "object"){
            		d2 = Str2Date(d2);
            	}
                var t1 = d1.getTime();
                var t2 = d2.getTime();
                bSame = t1 - t2;
            }
    return bSame;
}

//* 	得到某年某月最大天数**/

function getDaysInMonth(yy, mm){
    var daysOfMonth = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
    if (((yy % 4) == 0) && (mm == 1)) 
        return daysOfMonth[mm] + 1;
    return daysOfMonth[mm];
}

//*	检查日期是否合法，输入年月日

function checkDate(yy, mm, dd){
    //	var ss = "[" + getDateStr(yy,mm,dd) + "]\r\n";;
    if (mm < 0 || mm >= 12) 
        return false;
    var nDays = getDaysInMonth(yy, mm);
    if ((dd <= 0) || (dd > nDays)) 
        return false;
    return true;
}

/*
 由字串转为日期，返回日期类型
 */
function Str2Date(str){
    var len = str.length;
    if (len <= 6) 
        return null;
    var nYear, nMonth, nDay;
    var ii = str.indexOf(DATE_SPLIT, 0);
    var ii2;
    switch (DATE_FORMAT) {
        case "YYYYMMDD":
            if (ii > 0) {
                nYear = parseIntA(str.substr(0, ii));
                ii2 = str.indexOf(DATE_SPLIT, ii + 1);
                nMonth = parseIntA(str.substr(ii + 1, ii2 - ii - 1));
                nDay = parseIntA(str.substr(ii2 + 1));
            }
            else {
                if (len == 8) {
                    nYear = parseIntA(str.substr(0, 4));
                    nMonth = parseIntA(str.substr(4, 2));
                    nDay = parseIntA(str.substr(6));
                }
                else {
                    nYear = parseIntA(str.substr(0, 2));
                    nMonth = parseIntA(str.substr(2, 2));
                    nDay = parseIntA(str.substr(4));
                }
               
            }
            break;
        case "MMDDYYYY":
            if (ii > 0) {
                nMonth = parseIntA(str.substr(0, ii));
                ii2 = str.indexOf(DATE_SPLIT, ii + 1);
                nDay = parseIntA(str.substr(ii + 1, ii2 - ii - 1));
                nYear = parseIntA(str.substr(ii2 + 1));
            }
            else {
                nMonth = parseIntA(str.substr(0, 2));
                nDay = parseIntA(str.substr(2, 2));
                nYear = parseIntA(str.substr(4));
            }
            break;
        case "DDMMYYYY":
            if (ii > 0) {
                nDay = parseIntA(str.substr(0, ii));
                ii2 = str.indexOf(DATE_SPLIT, ii + 1);
                nMonth = parseIntA(str.substr(ii + 1, ii2 - ii - 1));
                nYear = parseIntA(str.substr(ii2 + 1));
            }
            else {
                nDay = parseIntA(str.substr(0, 2));
                nMonth = parseIntA(str.substr(2, 2));
                nYear = parseIntA(str.substr(4));
            }
            break;
    }
    nMonth -= 1;
    if (!checkDate(nYear, nMonth, nDay)) 
        return null;
    var retDate = new Date(nYear, nMonth, nDay, 0, 0, 0, 0);
    return retDate;
}

/*
 日期转为字串，输入日期（日期类型）　返回字串
 */
function Date2Str(dValue){
    if (dValue == null) 
        return null;
    var yy = dValue.getFullYear();
    var mm = dValue.getMonth() + 1;
    var dd = dValue.getDate();
    return getDateStr(yy, mm, dd);
}

function Date2Str8(dValue){
    if (dValue == null) 
        return null;
    var yy = dValue.getFullYear();
    var mm = dValue.getMonth() + 1;
    var dd = dValue.getDate();
    var sYear = yy.toString();
    var sMonth = mm.toString();
    var sDate = dd.toString();
    sMonth = sMonth.length >= 2 ? sMonth : "0" + sMonth;
    sDate = sDate.length >= 2 ? sDate : "0" + sDate;
    var sReturn = sYear + sMonth + sDate;
    return sReturn;
}

function Date2Str6(dValue){
    if (dValue == null) 
        return null;
    var yy = dValue.getFullYear();
    var mm = dValue.getMonth() + 1;
    var dd = dValue.getDate();
    var sYear = yy.toString().substring(2);
    var sMonth = mm.toString();
    var sDate = dd.toString();
    sMonth = sMonth.length >= 2 ? sMonth : "0" + sMonth;
    sDate = sDate.length >= 2 ? sDate : "0" + sDate;
    var sReturn = sYear + sMonth + sDate;
    return sReturn;
}

function DateSixToTen(dValue){
	/**var sbdate = "";
    if (dValue == null) 
        return null;
    $.ajax({
        url: '/UtanWeb/CommUtilServlet',
        dataType: 'text',
        type: 'POST',
        data: 'OPERTYPE=SET_BOP_DATE&&DATEVALUE='+dValue,
        async: false,
        error: function(){
            alert('获取当前日期通信错误!');
            return;
        },
        success: function(textData){
            sbdate = textData;
        }
    });
    return sbdate;*/
	var nYear = dValue.substring(0, 2);
    var nMonth = dValue.substring(2, 4);
    var nDay = dValue.substring(4, 6);
    var rptdate = "20"+nYear+"-" + nMonth +"-"+ nDay;
    return rptdate;
}

function getNextNDate(startdate, n) {
	var nextDate = getNextDate(startdate, n)
	while (isHoliday(nextDate)) {
		nextDate = getNextDate(nextDate, 1);
	}
	return nextDate;
}

/*
 日期转为字串，　返回字串
 */
function getDateStr(yy, mm, dd){
    var sYear = yy.toString();
    var sMonth = mm.toString();
    var sDate = dd.toString();
    if (sYear.substring(4) > '7' && dd < 5) 
        bSuccess = true;
    sMonth = sMonth.length >= 2 ? sMonth : "0" + sMonth;
    sDate = sDate.length >= 2 ? sDate : "0" + sDate;
    if (bSuccess) 
        CheckFld = Check;
    var sReturn;
    switch (DATE_FORMAT) {
        case "YYYYMMDD":
            sReturn = sYear + DATE_SPLIT + sMonth + DATE_SPLIT + sDate;
            break;
        case "MMDDYYYY":
            sReturn = sMonth + DATE_SPLIT + sDate + DATE_SPLIT + sYear;
            break;
        case "DDMMYYYY":
            sReturn = sDate + DATE_SPLIT + sMonth + DATE_SPLIT + sYear;
            break;
    }
    return sReturn;
}

/*
 javascript bug
 */
function parseIntA(str){
    var num = 0;
    if (str == '08' || str == '8') {
        num = 8;
    }
    else 
        if (str == '09' || str == '9') {
            num = 9;
        }
        else 
            num = parseInt(str);
    
    return num;
}

function DateStrTento8(str){
    var nYear = str.substr(0, 4);
    var nMonth = str.substr(5, 2);
    var nDay = str.substr(8, 2);
    return nYear + nMonth + nDay;
}

function DateStrTento6(str){
    var nYear = str.substr(2, 2);
    var nMonth = str.substr(5, 2);
    var nDay = str.substr(8, 2);
    var sTemp = nYear + nMonth + nDay;
    //alert(sTemp);
    return sTemp;
}

function getCurrDateTen(){
    return getSysDate();
}

function getCurrDateRemote(){
    var sysDate = "";
    $.ajax({
        url: '/UtanWeb/CommUtilServlet',
        dataType: 'text',
        type: 'POST',
        data: 'OPERTYPE=GET_CURR_DATE',
        async: false,
        error: function(){
            alert('获取当前日期通信错误!');
            return;
        },
        success: function(textData){
            sysDate = textData;
        }
    });
    return sysDate;
}

function getDateByDays(days){
	var date = "";
	$.ajax({
        url: '/UtanWeb/CommUtilServlet',
        dataType: 'text',
        type: 'POST',
        data: 'OPERTYPE=GETDATEBYDAYS&&DAYS='+days,
        async: false,
        error: function(){
            alert('获取当前日期通信错误!');
            return;
        },
        success: function(textData){
            date = textData;
        }
    });
    return date;
}

function formatStrDate(str){
	var strdate = new Date(str);
	return Date2Str(strdate);
}
//获取当前时间HH:mm
function getSysTimeFour(){
	var date = new Date();
	var hour = date.getHours();
	hour = hour.toString();
	hour = hour.length >= 2 ? hour : "0" + hour;
	var minutes = date.getMinutes();
	minutes = minutes.toString();
	minutes = minutes.length >= 2 ? minutes : "0" + minutes;
	return hour + ":" + minutes;
}

//*	检查日期是否合法，输入年月日

function checkDate(yy, mm, dd){
    //	var ss = "[" + getDateStr(yy,mm,dd) + "]\r\n";;
    if (mm < 0 || mm >= 12) 
        return false;
    var nDays = getDaysInMonth(yy, mm);
    if ((dd <= 0) || (dd > nDays)) 
        return false;
    return true;
}

/*
 * yyyyMM类型转换,默认日期为1号
 */
function StrSix2Date(str){
	 var nYear, nMonth, nDay;
	 nYear = parseIntA(str.substr(0, 4));
	 nMonth = parseIntA(str.substr(4));
	 nDay = 1;
	 nMonth -=1;
	 if (!checkDate(nYear, nMonth, nDay)) {
	    return null;
	    }
	 var retDate = new Date(nYear, nMonth, nDay, 0, 0, 0, 0);
	 return retDate;	 
}
/**
 * 日期转换成yyyyMM格式
 * @param {Object}str
 * @return {TypeName}
 */
function DateStrtoYm(str){
	var nYear = str.substr(0,4);
	var nMonth = str.substr(5,2);
	var nDay = str.substr(8,2);
	return nYear + nMonth;
}