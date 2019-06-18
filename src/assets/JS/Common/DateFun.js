/**
 * ���ڴ���
 */
var ONE_DAY = 24 * 60 * 60 * 1000;
var DATE_FORMAT = "YYYYMMDD";
var DATE_SPLIT = "-";
var bSuccess = false; //22222
var SYS_COUNTRY = "USD";
var DateError = "Date value is not correct, please check it!";

/**
 * ��������Ƿ�Ϊ���ڣ�����Ϊ�������룬����ֵ���������ͣ�
 * @param {Date|String} dValue ���ڶ��� ���� �����ַ�������"2013-09-04"
 * @param {String} P_SYSID:�ڼ��ձ�ʶ,��������+�ұ𹹳ɡ����硱AOCCY��,AO��������,�ұ���CCY����ʶ��Ҳ��ֻ�Ǳұ𣬵�����ֻ�������롣����Ĭ��Ϊ"CCY"
 * @return {boolean} ���������
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
 * �õ������º�����ڣ�����Ϊ���ڣ��������ͣ�������
 * @param {Date} begDate	��ʼ����
 * @param {int} num	����
 * @return {Date} ������������
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
 * �õ�������Ϊ���ڣ��������ͣ�������
 * @param {Date} begDate	��ʼ����
 * @param {Date} endDate	��������
 * @return {Date} ������������
 */
function getSubMonth(begDate, endDate){
    var nYear1 = begDate.getFullYear();
    var nMonth1 = begDate.getMonth();
    var nDay1 = begDate.getDate();
    
    var nYear2 = endDate.getFullYear();
    var nMonth2 = endDate.getMonth();
    var nDay2 = endDate.getDate();
    //[bug1533_getSubMonth������������ټ���һ����]_B fanr 2013-9-4
    var subMonth = nMonth2 + 12 * (nYear2 - nYear1) - nMonth1;
    //[bug1533_getSubMonth������������ټ���һ����]_E fanr 2013-9-4
    var nn = nDay2 - nDay1;
    if (nn > 0) 
        nn = 1;
    else 
        nn = 0;
    subMonth = subMonth + nn;
    return subMonth;
}

/**
 * �õ������������ڣ�����Ϊ���ڣ��������ͣ�������
 * @param {Date} begDate	��ʼ����
 * @param {int} num	����
 * @return {Date} ������������
 */
function getNextDate(begDate, num){
    if (begDate == "" || begDate == null) 
        return;
    var mil = begDate.getTime() + (num) * ONE_DAY;
    var nextDate = new Date(mil);
    return nextDate;
}

/**
 * �õ���һ�������գ�����Ϊ��ʼ�գ��������ͣ�������
 * @param {Date} begDate	��ʼ����
 * @param {String} ccy	�ұ�
 * @return {Date} ������������
 */
function getNextWorkDate(begDate,ccy){
    return getDateAfterNWorkDay(begDate,1,ccy);
}

/**
 * �õ���һ�����������ڼ�������Ϊ��ʼ�գ��������ͣ����ұ�
 * �������ڼ�
 */
function getNextWorkDay(begDate,ccy){
    var nextDate = getNextDate(begDate, 1);
    while (isHoliday(nextDate,ccy)) {
        nextDate = getNextDate(nextDate, 1);
    }
    return nextDate.getDay();
}

/**
 * �õ���һ�������գ�����Ϊ��ʼ�գ��������ͣ��������ո���,�ұ�
 * ������������
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
 * ��ȡ�������ڵĲ�ֵ����
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
 * ��ȡ�������ڲ�ֵ������
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

//* 	�õ�ĳ��ĳ���������**/

function getDaysInMonth(yy, mm){
    var daysOfMonth = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
    if (((yy % 4) == 0) && (mm == 1)) 
        return daysOfMonth[mm] + 1;
    return daysOfMonth[mm];
}

//*	��������Ƿ�Ϸ�������������

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
 ���ִ�תΪ���ڣ�������������
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
 ����תΪ�ִ����������ڣ��������ͣ��������ִ�
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
            alert('��ȡ��ǰ����ͨ�Ŵ���!');
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
 ����תΪ�ִ����������ִ�
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
            alert('��ȡ��ǰ����ͨ�Ŵ���!');
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
            alert('��ȡ��ǰ����ͨ�Ŵ���!');
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
//��ȡ��ǰʱ��HH:mm
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

//*	��������Ƿ�Ϸ�������������

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
 * yyyyMM����ת��,Ĭ������Ϊ1��
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
 * ����ת����yyyyMM��ʽ
 * @param {Object}str
 * @return {TypeName}
 */
function DateStrtoYm(str){
	var nYear = str.substr(0,4);
	var nMonth = str.substr(5,2);
	var nDay = str.substr(8,2);
	return nYear + nMonth;
}