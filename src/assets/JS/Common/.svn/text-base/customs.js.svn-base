/**
 * 金宏单位基本情况表处理
 */
var scrWidth = (document.body.clientWidth) - 35;
	var currRowIdCUT ;
	function createCustomTable(type){
		
		var currType = $('#CURR_TASKTYPE').val();
		var currTaskType = $('#SYS_TASK_TYPE').val();
		var editAble = true;
		if( currTaskType == "HISTORY" ){//历史
			editAble = false;
		}else if( currTaskType == "PAUSESAVE" && currType == "ADD"){//暂存
			editAble = true;
		}else if( currType == "ADD" ){//经办
			editAble = true;
		}else if( currType == "FIXPENDING" ){//经办修改
			editAble = true;
		}else if( currType == "RELEASE" || currType == "AUTH" ){//复核 授权
			editAble = false;
		}
		
		jQuery("#CURRCUSTOM_"+type).jqGrid({
			datatype: "jsonstring",
			rowNum:-1,
			rownumbers:true,
			width:scrWidth, 
	    	//height:110,
			altclass:'ui-priority-secondary',
			sortable:false,
			pager: '#CUSTOMTOOLBAR_'+type,
			pgbuttons:false,
			pginput:false,
			viewrecords: true,
			forceFit : true,
		   	colNames:[bop_CUSTOMN,bop_CUSTCCY,bop_CUSTAMT,bop_OFFAMT],
		   	colModel:[
		   		{name:'CUSTOMN',index:'CUSTOMN',editable:editAble,edittype:'text',
		   			editoptions:{
						dataEvents:[{type:'change',fn:function(e){checkBopChange(this.value,type);}}]
					}
				},
		   		{name:'CUSTCCY',index:'CUSTCCY',editable:editAble,edittype:'select',editoptions:{value:UtanGlobalCache("ccy").get().ccyString,style:'width:100%;'}},
		   		{name:'CUSTAMT',index:'CUSTAMT',editable:editAble,align:"right" },
		   		{name:'OFFAMT',index:'OFFAMT',editable:editAble,align:"right" }	
		   	],
			onSelectRow: function(rowId,status){
				var CUSMNO = $('#CUSMNO_'+type).val();
				if(CUSMNO==null||CUSMNO==''){
				  	alert('输报关单信息前请先输入报关单经营单位代码');	
				  	return;
				}
				if( !saveAllCustom(type) ) return;
				currRowIdCUT = rowId;
				editCustom(type);
			}
			}).navGrid('#CUSTOMTOOLBAR_'+type,{edit:false,add:false,del:false,view:false,search:false,refresh:false});
		/*	
		 * modify by lgp 20120109   报关单信息强制为空
			jQuery('#CURRCUSTOM_'+type)
					.jqGrid('navButtonAdd','#CUSTOMTOOLBAR_'+type,{
					    caption: '',
					    title: 'Add Custom Info',
						buttonicon:'ui-icon-plus',
						clickEnable:editAble,
					    onClickButton :function(){
							addCustom(type);
				    	}})
					.jqGrid('navButtonAdd','#CUSTOMTOOLBAR_'+type,{
						caption:'',
						title:'Del Custom Info',
						buttonicon:'ui-icon-minus',
						clickEnable:editAble,
						onClickButton : function (){
							delCustom(type);
				    	}})
					.jqGrid('navButtonAdd','#CUSTOMTOOLBAR_'+type,{
						caption:'',
						title:'Edit Row',
						buttonicon:'ui-icon-pencil',
						clickEnable:editAble,
						onClickButton : function (){
							editCustom(type);
				    	}})
					.jqGrid('navButtonAdd','#CUSTOMTOOLBAR_'+type,{
						caption:'',
						title:'Save Row',
						buttonicon:'ui-icon-disk',
						clickEnable:editAble,
						onClickButton : function (){
							saveCustom(type);
				    	}})
					.jqGrid('navButtonAdd','#CUSTOMTOOLBAR_'+type,{
						caption:'',
						title:'Cancle Save Row',
						buttonicon:'ui-icon-cancel',
						clickEnable:editAble,
						onClickButton : function (){
							cancleCustom(type);
				    	}});
		*/
		initCustom(type);
	}
	
	function checkBopChange(value,type){
		if(isExist(value,type)){
			alert("报关单号不能重复!");
		}
	}
	
	function checkBopLen(type,rowid){
		var currType = $('#CURR_TASKTYPE').val();
		var currTaskType = $('#SYS_TASK_TYPE').val();
		var editAble = true;
		if( currTaskType == "HISTORY" || currType == "RELEASE" || currType == "AUTH" ) return;
		
		jQuery("#CURRCUSTOM_"+type).jqGrid('saveRow',rowid,null,'clientArray');
		var rowData = $("#CURRCUSTOM_"+type).jqGrid('getRowData',rowid);
		jQuery("#CURRCUSTOM_"+type).jqGrid('editRow',rowid);
		var value = rowData.CUSTOMN;
		if(isExist(value,type)){
			alert("报关单号不能重复!");
			return false;
		}
		jQuery("#CURRCUSTOM_"+type).jqGrid('saveRow',rowid,null,'clientArray');
		return true;
	}
	
	function isExist(value,type){
		var allRows = jQuery("#CURRCUSTOM_"+type).jqGrid('getDataIDs');
		var rowData;
		for( var i = 0;i<allRows.length;i++ ){
			rowData = $("#CURRCUSTOM_"+type).jqGrid('getRowData',allRows[i]);
			if( rowData.CUSTOMN && value == rowData.CUSTOMN ){
				return true;
			}
		}
		return false;
	}	
	
	function initCustom(type){
		var x;
		var customXml = $('#CUSTOMS_'+type).val();
		if(customXml!=null&&customXml!="") {
			var node ;
			if(customXml.indexOf('<CUSTOMS>')==0) {
				x = parseXML(customXml);
				node=x.getElementsByTagName("CUSTOM");
			}else{
				customXml = "<ROOT>"+customXml+"</ROOT>";
				x = parseXML(customXml);
				node=x.getElementsByTagName("CUSTOM");
			}
			for(var i=0;i<node.length;i++){
				var tdnode = node[i];
				var myrow = { 
							 CUSTOMN:tdnode.childNodes[0].textContent || tdnode.childNodes[0].text,
							 CUSTCCY:tdnode.childNodes[1].textContent || tdnode.childNodes[1].text, 
							 CUSTAMT:tdnode.childNodes[2].textContent || tdnode.childNodes[2].text, 
							 OFFAMT: tdnode.childNodes[3].textContent || tdnode.childNodes[3].text
							 };
				jQuery("#CURRCUSTOM_"+type).jqGrid('addRowData',(i + 1),myrow,'last');
			}
		}
	}

	function addCustom(type){
		var rowId = 1;
		var CUSMNO = $('#CUSMNO_'+type).val();
		if(CUSMNO==null||CUSMNO==''){
			alert('输报关单信息前请先输入报关单经营单位代码');	
			return;
		}
		if( !saveAllCustom(type) ) return;
		var rowData = jQuery("#CURRCUSTOM_"+type).jqGrid('getRowData',1);
		var ccy = '';
		if(rowData.CUSTCCY!=null&&rowData.CUSTCCY!='') ccy = rowData.CUSTCCY+'';
		var myrow = { CUSTOMN:"", CUSTCCY:ccy, CUSTAMT:"", OFFAMT:""};
		var allRows = jQuery("#CURRCUSTOM_"+type).jqGrid('getDataIDs');
		if( allRows.length > 0 ) rowId = parseInt(Math.max.apply({},allRows) ) + 1;
		jQuery("#CURRCUSTOM_"+type).jqGrid('addRowData',rowId,myrow,'last');
		
		currRowIdCUT = rowId;
		jQuery("#CURRCUSTOM_"+type).jqGrid('setSelection',rowId,false);
		jQuery("#CURRCUSTOM_"+type).jqGrid('editRow',rowId);
	}
		
	function delCustom(type){
		var isSure=confirm("Please Make Sure to Delete Rows ["+currRowIdCUT+"] ??");
		if(isSure){
			jQuery("#CURRCUSTOM_"+type).jqGrid('delRowData',currRowIdCUT);
			currRowIdCUT = -1;
		}
	}
	
	function editCustom(type){
		jQuery("#CURRCUSTOM_"+type).jqGrid('editRow',currRowIdCUT);
	}

	function saveCustom(type){
		jQuery("#CURRCUSTOM_"+type).jqGrid('saveRow',currRowIdCUT,null,'clientArray');
		return checkBopLen(type,currRowIdCUT);
	}

	function cancleCustom(type){
		jQuery("#CURRCUSTOM_"+type).jqGrid('restoreRow',currRowIdCUT);
		checkBopLen(type,currRowIdCUT);
	}

	function saveAllCustom(type){
		var saveFlag = true;
		var allRows = jQuery("#CURRCUSTOM_"+type).jqGrid('getDataIDs');
		for( var i = 0;i<allRows.length;i++ ){
			if( !checkBopLen(type,allRows[i]) ){
				saveFlag = false;
				jQuery("#CURRCUSTOM_"+type).jqGrid('setSelection',allRows[i],false);
				currRowIdCUT = allRows[i];
				break;
			}
		}
		
		return saveFlag;
	}

	function createCustomXMl(type){
		var str = "";
		var allRows = jQuery("#CURRCUSTOM_"+type).jqGrid('getDataIDs');
		if( allRows.length == 0 ) return;
		$.each( allRows, function(i, n){
			jQuery('#CURRCUSTOM_'+type).jqGrid('saveRow',n,null,'clientArray');
			var data = $("#CURRCUSTOM_"+type).jqGrid('getRowData',n);
			if(data.CUSTOMN!=null){
				str = str+ "<CUSTOM>";
				str = str+ "<CUSTOMN>"+data.CUSTOMN+"</CUSTOMN>";
				str = str+ "<CUSTCCY>"+data.CUSTCCY+"</CUSTCCY>";
				str = str+ "<CUSTAMT>"+data.CUSTAMT+"</CUSTAMT>";
				str = str+ "<OFFAMT>"+data.OFFAMT+"</OFFAMT>";
				str = str+ "</CUSTOM>";
			}
		});
	
		$('#CUSTOMS_'+type).val(str);
	}
