/**
 * ѭ���ڵ㴦��
 */
/*
 * last modify by fr 2011-9-9
 */
function autoSub(){
	_this = this;	//Ϊ�������������(Ʃ��jquery)��ͻ,frru������Ϊ_this
	//���������ʼ��,����Ŀ¼
	_this.create = function(menuId){
		var subId = $("#"+menuId).attr("subId");
		var subHTML = $("#"+subId).html();	
		var setting = $("#"+menuId).attr("setting");
		setting = setting.replace(/;/g,",");//תΪ�����ַ�����ʽ
		setting = setting.replace(/,$/g,"");//����html4.01
		setting = "({"+setting+"})";
		setting = eval(setting);//��settingתΪ����
		
		_this[menuId]  = {
			subHTML:function(){
				return subHTML;
			},
			minOccurs:setting.minOccurs,//Ŀǰû��,������Ҫ�˹��ܵľ�Ϊ0~N
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
					autoSubAddItems.top[menuId] = _this[menuId].created;//���
					rcpItemsChange();//���
					$("#"+subId).append($("#"+subId+" span.subButtonTop"));//���IE6�޷���absolute��λbottom(�ڸ�Ԫ��heightΪauto�����)
				}
			},
			
			addOne:function(){
				if( $("#"+menuId+"_SHOW")[0].checked ){
					if( _this[menuId].created >= _this[menuId].maxOccurs){
						return false;
					}
					_this[menuId].created++;
					$("#"+subId).append( _this[menuId].subHTML().replace(/_LT/g,"_LT"+_this[menuId].created) );//���һ������ɹ�,idΪsubId+"_LT"+_this[menuId].nowNum
					// $(":input", $("#"+subId+"_LT"+_this[menuId].created)[0] ).each(function(){
						//$(this).change(function(){
							//FIELD_onchange(this);
						//});
						
					//});
					
					context_onReady($("#"+subId+"_LT"+_this[menuId].created)[0]);
					$("#"+menuId+" span.created").html(_this[menuId].created);					
					$("#"+subId+"_CREATED").val(_this[menuId].created);
					autoSubAddItems.top[menuId] = _this[menuId].created;//���
					rcpItemsChange();//���
					$("#"+subId).append($("#"+subId+" span.subButtonTop"));//���IE6�޷���absolute��λbottom(�ڸ�Ԫ��heightΪauto�����)
					//��̬���������еĲ㼶Ŀ¼
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
						autoSubAddItems.top[menuId] = _this[menuId].created;//���
						rcpItemsChange();//���
					if(_this[menuId].created==0){
						$("#"+menuId+"_SHOW")[0].checked = false;
						delete autoSubAddItems.top[menuId];//���
						rcpItemsChange();//���
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
					autoSubAddItems.top[menuId] = _this[menuId].created;//���
					rcpItemsChange();//���
				}else{
					var deleteTimes = _this[menuId].created;
					for(var i=0;i<deleteTimes;i++){
						_this[menuId].deleteOne();
					}
					delete autoSubAddItems.top[menuId];//���
					rcpItemsChange();//���
				}
			}
						
		}
		//�����ʽ,��ť
		$("#"+subId).addClass("subBoxTop");
		var tmpM = "";
		var tmpS = "<span class='subButtonTop'>";
		
		tmpM += "<input type='checkbox' id='"+menuId+"_SHOW' name='"+menuId+"_SHOW' onClick=\"utanAutoSub.menus('"+menuId+"').showHide();\">";
		//tmpM+="minOccurs:<span class='minOccurs'>"+setting.minOccurs+"</span>---maxOccurs:<span class='maxOccurs'>"+setting.maxOccurs+"</span>---created:<span class='created'></span>";
		//tmpM += "��С����:<span class='minOccurs'>"+setting.minOccurs+"</span>";
		if(setting.maxOccurs == 1) {		//�����65536���������壬����ʾ ,Ŀǰֻ�����1�κ����޴�����
			tmpM += "---������:<span class='maxOccurs'>"+setting.maxOccurs+"</span>";
		}
		tmpM += "---��������:<span class='created'></span>";
		
		
		tmpM += "<input type='hidden' value='"+setting.minOccurs+"' name='"+subId+"_minOccurs' id='"+subId+"_minOccurs'>";
		tmpM += "<input type='hidden' value='"+setting.maxOccurs+"' name='"+subId+"_maxOccurs' id='"+subId+"_maxOccurs'>";
		tmpM += "<input type='hidden' value='0' name='"+subId+"_CREATED' id='"+subId+"_CREATED'>";
		tmpS += "<input type='button' value='����' onClick=\"utanAutoSub.menus('"+menuId+"').addOne();\">";
		tmpS += "<input type='button' value='����' onClick=\"utanAutoSub.menus('"+menuId+"').deleteOne();\">";
		tmpS += "</span>";
		$("#"+menuId).append(tmpM);
		$("#"+subId).append(tmpS);
		$("#"+subId+"_LT").remove();//ɾ��ԭ������
		$("#"+subId).hide();
	}
	//ȡ��ĳһ����
	this.menus = function(menuId){
		return this[menuId];
	} 
	
	//�����μ�Ŀ¼����
	
		_this.createLevel = function(menuId){
		var subId = $("#"+menuId).attr("subId");
		var subHTML = $("#"+subId).html();		
		var setting = $("#"+menuId).attr("setting");
		setting = setting.replace(/;/g,",");//תΪ�����ַ�����ʽ
		setting = setting.replace(/,$/g,"");//����html4.01
		setting = "({"+setting+"})";
		setting = eval(setting);//��settingתΪ����
		
		_this[menuId]  = {
			subHTML:function(){
				return subHTML;	
			},
			minOccurs:setting.minOccurs,//Ŀǰû��,������Ҫ�˹��ܵľ�Ϊ0~N
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
					autoSubAddItems.level[menuId] = _this[menuId].created;//���
					rcpItemsChange();//���
					$("#"+subId).append($("#"+subId+" span.subButtonLevel"));//���IE6�޷���absolute��λbottom(�ڸ�Ԫ��heightΪauto�����)
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
					autoSubAddItems.level[menuId] = _this[menuId].created;//���
					rcpItemsChange();//���
					$("#"+subId).append($("#"+subId+" span.subButtonLevel"));//���IE6�޷���absolute��λbottom(�ڸ�Ԫ��heightΪauto�����)
				}
			},
			
			deleteOne:function(){				
				$("#"+subId+"_ST"+_this[menuId].created).remove();
				if(_this[menuId].created>0)
					_this[menuId].created--;
					$("#"+menuId+" span.created").html(_this[menuId].created);
					$("#"+subId+"_CREATED").val(_this[menuId].created);
					autoSubAddItems.level[menuId] = _this[menuId].created;//���
					rcpItemsChange();//���
				if(_this[menuId].created==0){
					$("#"+menuId+"_SHOW")[0].checked = false;
					$("#"+subId).hide();
					delete autoSubAddItems.level[menuId];//���
					rcpItemsChange();//���
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
					autoSubAddItems.level[menuId] = _this[menuId].created;//���
					rcpItemsChange();//���
				}else{
					var deleteTimes = _this[menuId].created;
					for(var i=0;i<deleteTimes;i++){
						_this[menuId].deleteOne();
					}
					delete autoSubAddItems.level[menuId];//���
					rcpItemsChange();//���
				}
			}
						
		}
		//�����ʽ,��ť
		$("#"+subId).addClass("subBoxLevel");
		var tmpM = "";
		var tmpS = "<span class='subButtonLevel'>";
		
		tmpM+="<input type='checkbox' id='"+menuId+"_SHOW' name='"+menuId+"_SHOW' onClick=\"utanAutoSub.menus('"+menuId+"').showHide();\">";
		//tmpM+="minOccurs:<span class='minOccurs'>"+setting.minOccurs+"</span>---maxOccurs:<span class='maxOccurs'>"+setting.maxOccurs+"</span>---created:<span class='created'></span>";
		//tmpM += "��С����:<span class='minOccurs'>"+setting.minOccurs+"</span>";
		if(setting.maxOccurs == 1) {		//�����65536���������壬����ʾ ,Ŀǰֻ�����1�κ����޴�����
			tmpM += "---������:<span class='maxOccurs'>"+setting.maxOccurs+"</span>";
		}
		tmpM += "---��������:<span class='created'></span>";
		
		tmpM += "<input type='hidden' value='"+setting.minOccurs+"' name='"+subId+"_minOccurs' id='"+subId+"_minOccurs'>";
		tmpM += "<input type='hidden' value='"+setting.maxOccurs+"' name='"+subId+"_maxOccurs' id='"+subId+"_maxOccurs'>";
		tmpM += "<input type='hidden' value='0' name='"+subId+"_CREATED' id='"+subId+"_CREATED'>";
		
		tmpS+="<input type='button' value='����' onClick=\"utanAutoSub.menus('"+menuId+"').addOne();\">";
		tmpS+="<input type='button' value='����' onClick=\"utanAutoSub.menus('"+menuId+"').deleteOne();\">";
		tmpS+="</span>";
		$("#"+menuId).append(tmpM);
		$("#"+subId).append(tmpS);
		$("#"+subId+"_ST").remove();//ɾ��ԭ������
		$("#"+subId).hide();
	}
}
function rcpItemsChange(){
		$("#autoSubAddItems").val($.toJSON(autoSubAddItems));
}
function parseAddItems(addItems){
	if(typeof(addItems)!= 'object'){
		//alert("parseAddItem()����Ĳ������ݲ��Ƕ���,�����Ƿ�Ϊ��,null,string");
		return false;
	}	
	if(isEmptyObject(addItems.top)){
		//alert("û�ж�̬�������");
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
		//alert("û�ж�̬��Ӷ���ѭ������");
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
 * �����Զ�ѭ������ӵ���
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
var autoSubAddItems = {top:{},level:{}};//����������̬����
var beginInputs = new Array();//������ʼҳ���ֶο�����
var hasAutoSub = false;
$(document).ready(function(){
	$(".autoSubTop").each(function(){
		if(!hasAutoSub) hasAutoSub = true; // ��ʾҳ����ѭ����,�˱��������ύʱ����ѭ�����ж�ʹ��
		utanAutoSub.create($(this).attr("id"));
	});
		
	$(":input").each(function(){
		beginInputs.push(this.id);
	});
	// add by fanrui 20121008 ����Ѿ�������������Щ�����
	if((typeof autoSubToAddItems === "object") && !isEmptyObject(autoSubToAddItems)){ // Ԥ���������
		parseAddItems(autoSubToAddItems);
	}

	if(typeof autoSubToAddInputsFunction === "function" ){ // Ϊ����ֵ
		autoSubToAddInputsFunction(); // �����ĸ�ֵ���
	}
});