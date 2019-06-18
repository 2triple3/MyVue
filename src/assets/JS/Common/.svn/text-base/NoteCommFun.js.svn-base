$(function() {
	var turntoPageID = "DARS_NOTE"; 
	$('#__noteContent').attr("readonly",false);
	$('#__noteContent').val("");
	var transRef = $('#TRANS_REF').val();
	var transKey = $('#TRANS_KEY').val();
	var isHistory = $('#__HISTORY_DETAIL').val();
	if (transRef && transKey) {
		$.ajax( {
			url : '/UtanWeb/CommUtilServlet',
			dataType : 'json',
			type : 'POST',
			data : {
				OPERTYPE : 'NOTEINFO',
				TRANS_REF : transRef,
				TRANS_KEY : transKey,
				HISTORY : isHistory
			},
			async : true,
			error : function() {
				alert('GET NOTE INFORMATION ERROR!');
				return;
			},
			success : function(jsonData) {
				showErrorMessage(jsonData.ERROR);
				showNoteMessage(jsonData.NOTE);
				if (jsonData && jsonData.ERROR && jsonData.ERROR.rows && jsonData.ERROR.rows.length > 0 && INIT.autoSwitchNoteTab === true) {
					if (turntoPageID) switchTab(turntoPageID);
				}
			}
		});
	}
});


function showErrorMessage(jsonData) {
	if (jsonData.rows == null) return;
	$('#errorNoteContent').show();
	$('#__ERROR_EXIST__').val("Y");
	var msgCount = jsonData.rows.length;
	var tabStr = "<TR>" +
						"<TD><center><B>相关编号</B></center></TD>" +
						"<TD><center><B>接口类型</B></center></TD>" +
						"<TD><center><B>创建时间</B></center></TD>" +
						"<TD><center><B>异常 编号</B></center></TD>" +
						"<TD><center><B>异常描述</B></center></TD>" +
						"<TD></TD>" +
					  "</TR>";
	var rowData;
	for ( var i = 0; i < msgCount; i++) {
		var rowStr = "";
		rowData = jsonData.rows[i];
		rowStr = "<TR>" + "<TD style='width:150px;'>"
				+ rowData.RELATION_ID
				+ "</TD>"
				+ "<TD style='width:100px;'>"
				+ rowData.INTERFACE_TYPE
				+ "</TD>"
				+ "<TD style='width:120px;'>"
				+ rowData.ERRORHAPPENDTIME
				+ "</TD>"
				+ "<TD style='width:100px;'>"
				+ rowData.ERRORNO
				+ "</TD>"
				+ "<TD style='overflow:hidden;'>"
				+ "<div id = '" + i + "_DESCSTRING' style='overflow:auto;'>"
				+ rowData.DESCSTRING
				+ "</div>"
				+ "</TD>"
				+ "<TD style='width:30px;' valign='bottom'><img src='/UtanWeb/images/zoomPlus.png' onclick=\"showNoteDesc('"
				+ i + "_DESCSTRING','异常信息')\" /></TD>"
				+ "</TR>";
		tabStr += rowStr;
	}
	$('#ERROR_NOTES_MSG').html(tabStr);
}

function showNoteMessage(jsonData) {
	if (jsonData.rows == null) return;
	$('#historyNoteContent').show();
	var msgCount = jsonData.rows.length;
	var tabStr = "<TR>" +
						"<TD><center><B>交易流水</B></center></TD>" +
						"<TD><center><B>接口类型</B></center></TD>" +
						"<TD><center><B>相关编号</B></center></TD>" +
						"<TD><center><B>机构/柜员</B></center></TD>" +
						"<TD><center><B>创建时间</B></center></TD>" +
						"<TD><center><B>交易名称</B></center></TD>" +
						"<TD><center><B>交易备注</B></center></TD>" +
						"<TD></TD>" +
					  "</TR>";
	var rowData;
	for ( var i = 0; i < msgCount; i++) {
		var rowStr = "";
		rowData = jsonData.rows[i];
		rowStr = "<TR>" + "<TD style='width:100px;'>"
				+ rowData.TRANS_REF
				+ "</TD>"
				+ "<TD style='width:80px;'>"
				+ rowData.INTERFACE_TYPE
				+ "</TD>"
				+ "<TD style='width:150px;'>"
				+ rowData.RELATION_ID
				+ "</TD>"
				+ "<TD style='width:80px;'>"
				+ rowData.ORGID + "/" + rowData.USERID
				+ "</TD>"
				+ "<TD style='width:120px;'>"
				+ rowData.CREATE_TIME
				+ "</TD>"
				+ "<TD style='width:100px;'>"
				+ rowData.TASKDESC
				+ "</TD>"
				+ "<TD style='overflow:hidden;'>"
				+ "<div id = '" + i + "_NOTEDESC' style='height:20px;overflow:auto;'>"
				+ rowData.NOTE
				+ "</div>"
				+ "</TD>"
				+ "<TD style='width:30px;' valign='bottom'><img src='/UtanWeb/images/zoomPlus.png' onclick=\"showNoteDesc('"
				+ i + "_NOTEDESC','" + rowData.TASKDESC + "')\" /></TD>"
				+ "</TR>";
		tabStr += rowStr;
	}
	$('#HIS_NOTES_MSG').html(tabStr);
}

function showNoteDesc(id, desc) {
	if (dhxWins.isWindow("noteDesc")) {
		dhxWins.window("noteDesc").close();
	}
	$("body").append("<div id='noteDescDiv' style='height:300px;width:500px;padding:5px;overflow:auto;'>"+ $("#" + id).html() + "</div>");
	$obj = $("#noteDescDiv");
	var winT = dhxWins.createWindow("noteDesc", 300, 100, 600, 100);
	winT.setText(desc);
	var obj = document.getElementById("noteDescDiv");
	winT.attachObject(obj, true);
	winT.button("minmax1").hide();
	winT.center();
}
