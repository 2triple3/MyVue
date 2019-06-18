/**
 * 条款处理
 */
var ClauseList = {}; // [Bugfree_2205_温州银行,暂存，经办修改后，条款赋值问题]_E fanr 2014-01-09
var ClauseList2 = new Array();

function setClauseInfo(objId,clauseType,clauseName,flag)
{
	var $obj = $('#'+objId);
	$obj.attr('clauseType',clauseType);
	$obj.attr('clause',clauseName);
	
	$obj.each( dealClauseType );
	
	ClauseList[objId] = new Object();
	ClauseList[objId].name = clauseName;
	ClauseList[objId].type = clauseType;
	ClauseList[objId].relatedField = '';
	ClauseList[objId].content = '';		
	ClauseList[objId].state = false;		
	//doOneClause(objId,clauseType,clauseName,flag)	
}

function doOneClause(objId,clauseType,clauseName,flag)
{
	if(ClauseList[objId]==null || ClauseList[objId] == undefined) {
		setClauseInfo(objId,clauseType,clauseName,flag);
	}
	//if((clauseName!=null&&clauseName!='')&&(ClauseList[objId].name!=clauseName||ClauseList[objId].state==false))
	if(clauseName!=null&&clauseName!='')
	{
		$.ajax({
				url: '/UtanWeb/CommUtilServlet',
				dataType:'json',
				type:'POST',
				data:'OPERTYPE=CLAUSEINFO&&CLAUSEFIELD='+clauseName,
				async:false,
				error:function(){
					return ;
				},
				success: function(response){
					ClauseList[objId].name = clauseName;
					ClauseList[objId].type = clauseType;
					setClauseValue(objId,clauseType,clauseName,response);		
				}
			});
		return;
	}		
	//setClauseFldValue(objId);
}

function setClauseValue(objId,clauseType,clauseName,respData)
{
	var nameList = clauseName.split(',');
	var iLen = nameList.length;	
	if(respData==null)
	{
		//[Bugfree_1274_(温州)页面字段若配置条款且找不到相应名称的条款，系统弹出提示,建议去掉]_B fanr 2013-9-18
		//alert("Clause error field:" + objId + " clauseName:" + clauseName);
		//[Bugfree_1274_(温州)页面字段若配置条款且找不到相应名称的条款，系统弹出提示,建议去掉]_E fanr 2013-9-18
		return;
	}
	ClauseList[objId].content = '';		
	for(var ii=0; ii<iLen; ii++)
	{
		if(respData[nameList[ii]]==null)
		{
			//[Bugfree_1274_(温州)页面字段若配置条款且找不到相应名称的条款，系统弹出提示,建议去掉]_B fanr 2013-9-18
			//alert("Clause error field:" + objId + " clauseName:" + nameList[ii]);
			//[Bugfree_1274_(温州)页面字段若配置条款且找不到相应名称的条款，系统弹出提示,建议去掉]_E fanr 2013-9-18
			return;		
		}
		ClauseList[objId].content += respData[nameList[ii]].CLAUSE_STATE;			
	}
	ClauseList[objId].state = true;
	setClauseFldValue(objId);
}
//[FINWARE_V3.5_TFS_20131105 - 条款赋值自动触发后续赋值动作] wt 2013-11-14
function setClauseFldValue(objId)
{
	var content = ClauseList[objId].content;
	var clauseContent = formatContent(content, "CLAUSE");	
	//$('#'+objId).val(clauseContent);		//mark by wt 2013-11-14
	setFieldValueFire(objId,clauseContent);		//改成自动触发change事件
	var clauseFlag = false;
	var relatedField
	for(var i=0;i<ClauseList2.length;i++){
		if(ClauseList2[i].fieldId == objId)
		{
			relatedField = getClauseRelatedField(content);
			ClauseList2[i].relatedField = relatedField;		
			clauseFlag = true;
		}
	}
	if(!clauseFlag){
		var i_no = ClauseList2.length;
		ClauseList2[i_no] = new Object();
		ClauseList2[i_no].fieldId = objId;
		relatedField = getClauseRelatedField(content);
		ClauseList2[i_no].relatedField = relatedField;
	}
	// [Bugfree_2205_温州银行,暂存，经办修改后，条款赋值问题]_E fanr 2014-01-09
	// 之前的一堆注释代码被删了
}


function clauseCallback(objId,clauseName,clauseContent)
{	
	//alert(clauseContent);
	if(ClauseList[objId]==null) 
	ClauseList[objId] = new Object();
	ClauseList[objId].name = clauseName;
	ClauseList[objId].content = clauseContent;
	setClauseFldValue(objId);
}

function getClauseRelatedField(content){
	var fields = "";
	var arr = content.split('[');
	for(var i=0;i<arr.length;i++){
		var right = arr[i].indexOf(']');
		if(right>0){
			fields = fields + arr[i].substring(0,right) +",";
		}
	}
	if(fields!="")
		fields = fields.substring(0,fields.length-1);
	return fields;
}

function changeClauseInfo(obj)
{
	//alert(ClauseList2.length);
	for(var i=0; i<ClauseList2.length; i++){
	 	var fields = ClauseList2[i].relatedField;
	 	if(fields!=null&&fields!=""&&(fields.indexOf(obj.id)>=0)){
	 		var fieldId = ClauseList2[i].fieldId
	 		setClauseFldValue(fieldId);
	 	}
	 }
}
