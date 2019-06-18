/**
 * 循环节点处理
 */
/*
 * last modify by fr 2011-9-9
 */
function autoSub(){
	_this = this;	//为避免和其他对象(譬如jquery)冲突,frru对象设为_this
	//创建对象初始化,顶级目录
	_this.create = function(menuId){
		var subId = $("#"+menuId).attr("subId");
		var subHTML = $("#"+subId).html();	
		var setting = $("#"+menuId).attr("setting");
		setting = setting.replace(/;/g,",");//转为对象字符串形式
		setting = setting.replace(/,$/g,"");//兼容html4.01
		setting = "({"+setting+"})";
		setting = eval(setting);//将setting转为对象
		
		_this[menuId]  = {
			subHTML:function(){
				return subHTML;
			},
			minOccurs:setting.minOccurs,//目前没用,所有需要此功能的均为0~N
			maxOccurs:setting.maxOccurs,
			created:0,
			
				setNodes:function(size) {
				if( $("#"+menuId+"_SHOW")[0].checked ){
					if( _this[menuId].created >= _this[menuId].maxOccurs){
						return false;
					}
					_this[menuId].created = size;
					$("#"+menuId+" span.created").html(_this[menuId].created);
					$("#"+subId+"_CREATED").val(_this[menuId].created);
					autoSubAddItems.top[menuId] = _this[menuId].created;//监测
					rcpItemsChange();//监测
					$("#"+subId).append($("#"+subId+" span.subButtonTop"));//解决IE6无法用absolute定位bottom(在父元素height为auto情况下)
				}
			},
			
			addOne:function(){
				if( $("#"+menuId+"_SHOW")[0].checked ){
					if( _this[menuId].created >= _this[menuId].maxOccurs){
						return false;
					}
					_this[menuId].created++;
					$("#"+subId).append( _this[menuId].subHTML().replace(/_LT/g,"_LT"+_this[menuId].created) );//添加一个子项成功,id为subId+"_LT"+_this[menuId].nowNum
					// $(":input", $("#"+subId+"_LT"+_this[menuId].created)[0] ).each(function(){
						//$(this).change(function(){
							//FIELD_onchange(this);
						//});
						
					//});
					
					context_onReady($("#"+subId+"_LT"+_this[menuId].created)[0]);
					$("#"+menuId+" span.created").html(_this[menuId].created);					
					$("#"+subId+"_CREATED").val(_this[menuId].created);
					autoSubAddItems.top[menuId] = _this[menuId].created;//监测
					rcpItemsChange();//监测
					$("#"+subId).append($("#"+subId+" span.subButtonTop"));//解决IE6无法用absolute定位bottom(在父元素height为auto情况下)
					//动态创建子项中的层级目录
					if( $("#"+subId+"_LT"+_this[menuId].created+" .autoSubLevel").attr("setting") ){
						$("#"+subId+"_LT"+_this[menuId].created+" .autoSubLevel").each(function(){
							utanAutoSub.createLevel( $(this).attr("id") );							
						});
					}
				}
			},
			
			deleteOne:function(){				
					$("#"+subId+"_LT"+_this[menuId].created).remove();
					if(_this[menuId].created>0)
						_this[menuId].created--;
						$("#"+menuId+" span.created").html(_this[menuId].created);
						$("#"+subId+"_CREATED").val(_this[menuId].created);
						autoSubAddItems.top[menuId] = _this[menuId].created;//监测
						rcpItemsChange();//监测
					if(_this[menuId].created==0){
						$("#"+menuId+"_SHOW")[0].checked = false;
						delete autoSubAddItems.top[menuId];//监测
						rcpItemsChange();//监测
						$("#"+subId).hide();
					}
			},
			
			showHide:function(){
				if( $("#"+menuId+"_SHOW")[0].checked ){
					if( _this[menuId].created==0 ){
						_this[menuId].addOne();
					}
					$("#"+subId).show();
					$("#"+menuId+" span.created").html(_this[menuId].created);					
					$("#"+subId+"_CREATED").val(_this[menuId].created);
					autoSubAddItems.top[menuId] = _this[menuId].created;//监测
					rcpItemsChange();//监测
				}else{
					var deleteTimes = _this[menuId].created;
					for(var i=0;i<deleteTimes;i++){
						_this[menuId].deleteOne();
					}
					delete autoSubAddItems.top[menuId];//监测
					rcpItemsChange();//监测
				}
			}
						
		}
		//添加样式,按钮
		$("#"+subId).addClass("subBoxTop");
		var tmpM = "";
		var tmpS = "<span class='subButtonTop'>";
		
		tmpM += "<input type='checkbox' id='"+menuId+"_SHOW' name='"+menuId+"_SHOW' onClick=\"utanAutoSub.menus('"+menuId+"').showHide();\">";
		//tmpM+="minOccurs:<span class='minOccurs'>"+setting.minOccurs+"</span>---maxOccurs:<span class='maxOccurs'>"+setting.maxOccurs+"</span>---created:<span class='created'></span>";
		//tmpM += "最小次数:<span class='minOccurs'>"+setting.minOccurs+"</span>";
		if(setting.maxOccurs == 1) {		//如果是65536次则无意义，不显示 ,目前只有最大1次后无限次区分
			tmpM += "---最大次数:<span class='maxOccurs'>"+setting.maxOccurs+"</span>";
		}
		tmpM += "---创建次数:<span class='created'></span>";
		
		
		tmpM += "<input type='hidden' value='"+setting.minOccurs+"' name='"+subId+"_minOccurs' id='"+subId+"_minOccurs'>";
		tmpM += "<input type='hidden' value='"+setting.maxOccurs+"' name='"+subId+"_maxOccurs' id='"+subId+"_maxOccurs'>";
		tmpM += "<input type='hidden' value='0' name='"+subId+"_CREATED' id='"+subId+"_CREATED'>";
		tmpS += "<input type='button' value='增加' onClick=\"utanAutoSub.menus('"+menuId+"').addOne();\">";
		tmpS += "<input type='button' value='减少' onClick=\"utanAutoSub.menus('"+menuId+"').deleteOne();\">";
		tmpS += "</span>";
		$("#"+menuId).append(tmpM);
		$("#"+subId).append(tmpS);
		$("#"+subId+"_LT").remove();//删除原有内容
		$("#"+subId).hide();
	}
	//取得某一对象
	this.menus = function(menuId){
		return this[menuId];
	} 
	
	//创建次级目录对象
	
		_this.createLevel = function(menuId){
		var subId = $("#"+menuId).attr("subId");
		var subHTML = $("#"+subId).html();		
		var setting = $("#"+menuId).attr("setting");
		setting = setting.replace(/;/g,",");//转为对象字符串形式
		setting = setting.replace(/,$/g,"");//兼容html4.01
		setting = "({"+setting+"})";
		setting = eval(setting);//将setting转为对象
		
		_this[menuId]  = {
			subHTML:function(){
				return subHTML;	
			},
			minOccurs:setting.minOccurs,//目前没用,所有需要此功能的均为0~N
			maxOccurs:setting.maxOccurs,
			created:0,
			
			setNodes:function(size) {
				if( $("#"+menuId+"_SHOW")[0].checked ){
					if( _this[menuId].created >= _this[menuId].maxOccurs){
						return false;
					}
					_this[menuId].created = size;
					$("#"+menuId+" span.created").html(_this[menuId].created);
					$("#"+subId+"_CREATED").val(_this[menuId].created);
					autoSubAddItems.level[menuId] = _this[menuId].created;//监测
					rcpItemsChange();//监测
					$("#"+subId).append($("#"+subId+" span.subButtonLevel"));//解决IE6无法用absolute定位bottom(在父元素height为auto情况下)
				}
			},
			
			addOne:function(){
				if( $("#"+menuId+"_SHOW")[0].checked ){
					if( _this[menuId].created >= _this[menuId].maxOccurs){
						return false;
					}
					_this[menuId].created++;
					$("#"+subId).append( _this[menuId].subHTML().replace(/_ST/g,"_ST"+_this[menuId].created) );
					context_onReady($("#"+subId+"_ST"+_this[menuId].created)[0]);
					
					$("#"+menuId+" span.created").html(_this[menuId].created);
					$("#"+subId+"_CREATED").val(_this[menuId].created);
					autoSubAddItems.level[menuId] = _this[menuId].created;//监测
					rcpItemsChange();//监测
					$("#"+subId).append($("#"+subId+" span.subButtonLevel"));//解决IE6无法用absolute定位bottom(在父元素height为auto情况下)
				}
			},
			
			deleteOne:function(){				
				$("#"+subId+"_ST"+_this[menuId].created).remove();
				if(_this[menuId].created>0)
					_this[menuId].created--;
					$("#"+menuId+" span.created").html(_this[menuId].created);
					$("#"+subId+"_CREATED").val(_this[menuId].created);
					autoSubAddItems.level[menuId] = _this[menuId].created;//监测
					rcpItemsChange();//监测
				if(_this[menuId].created==0){
					$("#"+menuId+"_SHOW")[0].checked = false;
					$("#"+subId).hide();
					delete autoSubAddItems.level[menuId];//监测
					rcpItemsChange();//监测
				}
			},
			
			showHide:function(){
				if( $("#"+menuId+"_SHOW")[0].checked ){
					if( _this[menuId].created==0 ){
						_this[menuId].addOne();
					}
					$("#"+subId).show();
					$("#"+menuId+" span.created").html(_this[menuId].created);					
					$("#"+subId+"_CREATED").val(_this[menuId].created);
					autoSubAddItems.level[menuId] = _this[menuId].created;//监测
					rcpItemsChange();//监测
				}else{
					var deleteTimes = _this[menuId].created;
					for(var i=0;i<deleteTimes;i++){
						_this[menuId].deleteOne();
					}
					delete autoSubAddItems.level[menuId];//监测
					rcpItemsChange();//监测
				}
			}
						
		}
		//添加样式,按钮
		$("#"+subId).addClass("subBoxLevel");
		var tmpM = "";
		var tmpS = "<span class='subButtonLevel'>";
		
		tmpM+="<input type='checkbox' id='"+menuId+"_SHOW' name='"+menuId+"_SHOW' onClick=\"utanAutoSub.menus('"+menuId+"').showHide();\">";
		//tmpM+="minOccurs:<span class='minOccurs'>"+setting.minOccurs+"</span>---maxOccurs:<span class='maxOccurs'>"+setting.maxOccurs+"</span>---created:<span class='created'></span>";
		//tmpM += "最小次数:<span class='minOccurs'>"+setting.minOccurs+"</span>";
		if(setting.maxOccurs == 1) {		//如果是65536次则无意义，不显示 ,目前只有最大1次后无限次区分
			tmpM += "---最大次数:<span class='maxOccurs'>"+setting.maxOccurs+"</span>";
		}
		tmpM += "---创建次数:<span class='created'></span>";
		
		tmpM += "<input type='hidden' value='"+setting.minOccurs+"' name='"+subId+"_minOccurs' id='"+subId+"_minOccurs'>";
		tmpM += "<input type='hidden' value='"+setting.maxOccurs+"' name='"+subId+"_maxOccurs' id='"+subId+"_maxOccurs'>";
		tmpM += "<input type='hidden' value='0' name='"+subId+"_CREATED' id='"+subId+"_CREATED'>";
		
		tmpS+="<input type='button' value='增加' onClick=\"utanAutoSub.menus('"+menuId+"').addOne();\">";
		tmpS+="<input type='button' value='减少' onClick=\"utanAutoSub.menus('"+menuId+"').deleteOne();\">";
		tmpS+="</span>";
		$("#"+menuId).append(tmpM);
		$("#"+subId).append(tmpS);
		$("#"+subId+"_ST").remove();//删除原有内容
		$("#"+subId).hide();
	}
}
function rcpItemsChange(){
		$("#autoSubAddItems").val($.toJSON(autoSubAddItems));
}
function parseAddItems(addItems){
	if(typeof(addItems)!= 'object'){
		//alert("parseAddItem()传入的参数内容不是对象,请检查是否为空,null,string");
		return false;
	}	
	if(isEmptyObject(addItems.top)){
		//alert("没有动态添加内容");
		return false;
	}else{
		for(var key in addItems.top){
			//utanAutoSub.create(key);
			$("#"+key+"_SHOW")[0].checked=true;
			for(var i=0;i<addItems.top[key];i++){
				utanAutoSub.menus(key).addOne();
				utanAutoSub.menus(key).showHide();
			}
		}
	}
	
	if(isEmptyObject(addItems.level)){
		//alert("没有动态添加二层循环内容");
		return false;
	}else{
		for(var key in addItems.level){
			//utanAutoSub.create(key);
			$("#"+key+"_SHOW")[0].checked=true;
			for(var i=0;i<addItems.level[key];i++){
				utanAutoSub.menus(key).addOne();
				utanAutoSub.menus(key).showHide();
			}
		}
	}
}
function isEmptyObject(obj){
	for ( var name in obj ) {
		return false;
	}
	return true;
}

/**
 * 储存自动循环域添加的项
 */
function saveAutoSubAddInputs(){
	showAddInputs();
}

function showAddInputs(){
	var endInputs = new Array();
	var addInputs = new Array();
	$(":input").each(function(){
		endInputs.push(this.id);
	});
	for(var i=0;i<endInputs.length;i++){
		if( $.inArray(endInputs[i],beginInputs) != -1 ){
			endInputs.splice(i,1,"");
		}
	}
	for(var i=0;i<endInputs.length;i++){
		if( endInputs[i] != "" && endInputs[i] != null){
			addInputs.push(endInputs[i]);
		}
	}
	$("#addInputs").val( addInputs.toString());
}
var utanAutoSub = new autoSub();
var autoSubAddItems = {top:{},level:{}};//创建监听动态对象
var beginInputs = new Array();//创建初始页面字段空数组
var hasAutoSub = false;
$(document).ready(function(){
	$(".autoSubTop").each(function(){
		if(!hasAutoSub) hasAutoSub = true; // 表示页面有循环域,此变量会在提交时候作循环域判断使用
		utanAutoSub.create($(this).attr("id"));
	});
		
	$(":input").each(function(){
		beginInputs.push(this.id);
	});
	// add by fanrui 20121008 如果已经有添加项，则处理这些添加项
	if((typeof autoSubToAddItems === "object") && !isEmptyObject(autoSubToAddItems)){ // 预处理添加项
		parseAddItems(autoSubToAddItems);
	}

	if(typeof autoSubToAddInputsFunction === "function" ){ // 为添加项赋值
		autoSubToAddInputsFunction(); // 添加项的赋值语句
	}
});