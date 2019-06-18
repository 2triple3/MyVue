/**
 * �鵵����
 * ���׹鵵���:
 * @dataType ��������  COMMON���������ף�TRANS:����������
 * @inqWhere ��ѯ����
 * @busType  ��������
 */

function doArchiveData(dataType, inqWhere, busType){
	if (!busType) {
		alert("�������Ͳ���Ϊ�գ�");
		return;
	}
	
	var counts = jQuery("#CURSETTING").jqGrid('getGridParam','records');
	if (counts == 0) {
		alert("û����Ҫ�鵵�����ݣ���ע�⣡");
		return;
	}
	
	var arFlag = confirm("�Ƿ�ȷ��Ҫ�鵵���ݣ���["+counts+"]����")
	if (!arFlag) return;
	
	var args = {};
	setFunctionArgs(args , "DATATYPE" , dataType);
	setFunctionArgs(args , "AR_INQUIRE_WHERE" , inqWhere);
	setFunctionArgs(args , "ARCHIVE_TRANS_TYPE" , busType);
	callFunction("F_TRANS_ARCHIVE", args, "NONE");
	
	alert("�ѷ����׹鵵����,���Ժ�ͨ���鵵��¼��ѯ�鵵״̬��");
	var title = $('#CURRTITLE',window.parent.document).val();
	parent.closeTab(title);
}

/**
 * FINWARE_V3.5_TFS_2013120025
 * ���׹鵵�ָ����:
 * @inqWhere ��ѯ����
 * @busType  ��������
 */
function doRecoverArchiveData(inqWhere, transType) {
	if (!transType) {
		alert("�������Ͳ���Ϊ�գ�");
		return;
	}
	
	var counts = jQuery("#CURSETTING").jqGrid('getGridParam','records');
	if (counts == 0) {
		alert("û����Ҫ�ָ��Ĺ鵵���ݣ���ע�⣡");
		return;
	}
	
	var arFlag = confirm("�Ƿ�ȷ��Ҫ�ָ���ǰ���еĹ鵵���ݣ���["+counts+"]����")
	if (!arFlag) return;
	
	var args = {};
	setFunctionArgs(args , "AR_TRANS_TYPE" , transType);
	setFunctionArgs(args , "AR_INQUIRE_WHERE" , inqWhere);
	callFunction("F_RECOVER_ARCHIVE", args, "NONE");
	
	alert("�ѷ���ָ��鵵��������,���Ժ�ͨ���ָ��鵵���ݼ�¼��ѯ�ָ�״̬��");
	var title = $('#CURRTITLE',window.parent.document).val();
	parent.closeTab(title);
}

function turnToConditionPage(obj) {
	getTable('setting').select("conditionPage");
	if (obj) setFocus(obj);
}