/**
 * 归档处理
 * 交易归档入口:
 * @dataType 数据类型  COMMON：公共交易，TRANS:按交易类型
 * @inqWhere 查询条件
 * @busType  交易类型
 */

function doArchiveData(dataType, inqWhere, busType){
	if (!busType) {
		alert("交易类型不能为空！");
		return;
	}
	
	var counts = jQuery("#CURSETTING").jqGrid('getGridParam','records');
	if (counts == 0) {
		alert("没有需要归档的数据！请注意！");
		return;
	}
	
	var arFlag = confirm("是否确定要归档数据？共["+counts+"]条！")
	if (!arFlag) return;
	
	var args = {};
	setFunctionArgs(args , "DATATYPE" , dataType);
	setFunctionArgs(args , "AR_INQUIRE_WHERE" , inqWhere);
	setFunctionArgs(args , "ARCHIVE_TRANS_TYPE" , busType);
	callFunction("F_TRANS_ARCHIVE", args, "NONE");
	
	alert("已发起交易归档请求,请稍后通过归档记录查询归档状态。");
	var title = $('#CURRTITLE',window.parent.document).val();
	parent.closeTab(title);
}

/**
 * FINWARE_V3.5_TFS_2013120025
 * 交易归档恢复入口:
 * @inqWhere 查询条件
 * @busType  交易类型
 */
function doRecoverArchiveData(inqWhere, transType) {
	if (!transType) {
		alert("交易类型不能为空！");
		return;
	}
	
	var counts = jQuery("#CURSETTING").jqGrid('getGridParam','records');
	if (counts == 0) {
		alert("没有需要恢复的归档数据！请注意！");
		return;
	}
	
	var arFlag = confirm("是否确定要恢复当前所有的归档数据？共["+counts+"]条！")
	if (!arFlag) return;
	
	var args = {};
	setFunctionArgs(args , "AR_TRANS_TYPE" , transType);
	setFunctionArgs(args , "AR_INQUIRE_WHERE" , inqWhere);
	callFunction("F_RECOVER_ARCHIVE", args, "NONE");
	
	alert("已发起恢复归档数据请求,请稍后通过恢复归档数据记录查询恢复状态。");
	var title = $('#CURRTITLE',window.parent.document).val();
	parent.closeTab(title);
}

function turnToConditionPage(obj) {
	getTable('setting').select("conditionPage");
	if (obj) setFocus(obj);
}