/**
 * V1.5.1����
 * ��֤�������������������޸�ʱ�����ұ��벻����д�й��й�,
 * @param {Object} OperType		�������Ͷ��� 
 * @param {Object} countryCode	���Ҵ������
 */
function checkCounrtyCode(operType,countryCode,areaName){
	var ret = true;
	//�������Ͳ�Ϊɾ�����߳���
	if($(operType).val() != "3"){
		//������й�
		if($(countryCode).val() == "156"){
			alert("��������Ϊ���������޸�ʱ," + areaName +",�������й���");
			ret = false;
		}
	}
	return ret;
}

/**
 * V1.5.1����
 * ����������Ϊ���������޸�ʱ����֤������С��99999
 * @param {Object} OperType		�������Ͷ���
 * @param {Object} period		�����ڶ���
 */
function checkAccountPeriod(operType,period){
	var ret = true;
	//�������Ͳ�Ϊɾ�����߳���
	if($(operType).val() != "3"){
		if($(period).val() >= 99999){
			alert("��������Ϊ���������޸�ʱ�������ڱ���С��99999");
			setFocus($(period)[0]);
			ret = false;
		}
	}
	return ret;
}

/**
 * V1.5.1����	���ڸ�ʽ������ yyyy-mm-dd
 * ����������Ϊ���������޸�ʱ����֤����С�ڵ�ǰϵͳ����
 * @param {Object} OperType		�������Ͷ���
 * @param {Object} date			���ڶ���
 * RCP2101_PayeeDate
 */
function checkDateLessSysDate(operType,date){
		var ret = true;
	//�������Ͳ�Ϊɾ�����߳���
	if($(operType).val() != "3"){
		var t = new Date();
		var month=t.getMonth() + 1+"";
		var curdate=t.getDate()+"";
		if(month.length<2) month="0"+month;
		if(curdate.length<2) curdate="0"+curdate;
		var currentDate = t.getFullYear() + "-" + month + "-" + curdate;
		if($(date).val() > currentDate){
			// modified by Michael on 2014-05-10 �޸���ʾ��
			alert("��������Ϊ���������޸�ʱ�����ڲ��ô��ڵ�ǰϵͳ����");
			setFocus($(date)[0]);
			ret = false;
		}
	}
	return ret;
}

/**
 * v1.5.1����
 * ��ʼ���ڱ���С�ڽ������� ���ڸ�ʽ������yyyy-mm-dd
 * @param {Object} startDate ��ʼ���ڶ���
 * @param {Object} startTxt  ��ʼ��������
 * @param {Object} endDate   �������ڶ���
 * @param {Object} endStartTxt ������������
 */
function checkStartDateLessEndDate(startDate,startTxt,endDate,endStartTxt){
	if($(startDate).val() != "" && $(endDate).val() != ""){
		if($(startDate).val() > $(endDate).val()){
			alert(startTxt + " ����С�� " + endStartTxt);
			setFocus($(startDate)[0]);
			setFocus($(endDate)[0]);
			return false
		}
	}
	return true;
}