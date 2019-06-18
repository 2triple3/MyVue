$(document).ready(function(){
	if(typeof dhtmlXWindows === "function"){
		window.dhxWins = new dhtmlXWindows();
		dhxWins.setImagePath("/UtanWeb/theme/dhtmlxWindows/imgs/");	
	}
	dealButtons();
	escapeBackspace();
	bindShortKeys(); //[FINWARE_V3.5_TFS_20131106_FR - 增加快捷键] fanr 2013-11-06
});
function dealButtons(namespace){
		if(namespace === undefined) namespace = document;
		$(".fr-linkbutton",namespace).each(function(){
			var icon = "";
			var html = $(this).html();
			if( $(this).attr("icon") ){ icon=" fr-icon-"+$(this).attr("icon"); }
			$(this).html("");
			$(this).append("<span class='fr-link-left'><span class='fr-link-text"+icon+ "'>"+html+"</span></span>");
		});
		
		$("a.fr-menubutton",namespace).each(function(){
			var icon = "";
			var html = $(this).html();
			if( $(this).attr("icon") ){ icon=" fr-icon-" +$(this).attr("icon"); }
			$(this).html("");
			$(this).append("<span class='fr-menu-left'><span class='fr-menu-text"+icon+"'>"+html+"<span class='fr-menu-downarrow'></span></span></span>");
		});
		
		$("a.fr-linkbutton",namespace).hover(
			function(){
				$(this).addClass("fr-link-hover");
				$(this).children(".fr-link-left").addClass("fr-link-left-hover");
			},
			function(){
				$(this).removeClass("fr-link-hover");
				$(this).children(".fr-link-left").removeClass("fr-link-left-hover");
			}
		);	
		
		//
		$("a.fr-menubutton",namespace).hover(
			function(){
				$(this).addClass("fr-menu-hover");
				$(this).children(".fr-menu-left").addClass("fr-menu-left-hover");
			},
			function(){
				$(this).removeClass("fr-menu-hover");
				$(this).children(".fr-menu-left").removeClass("fr-menu-left-hover");
			}
		);
		
		$(".fr-menu-subs",namespace).hide();
		$(".fr-menu-list",namespace).mouseover(function(){
			$(this).css("padding","0px");
			$(this).children().show();
			$(this).children(".fr-menu-subs").css({left:"0px",top:$(this).height()});
		});
		$(".fr-menu-list",namespace).mouseout(function(){
			$(this).children(".fr-menu-subs").hide();
		});
		//
		$(".fr-menu-sub",namespace).hover(
			function(){
				$(this).addClass("fr-menu-sub-hover");
			},
			function(){
				$(this).removeClass("fr-menu-sub-hover");
			}
		);	
}
// [FRATHF_00001_增加提交快捷键]_B fanr 2013-11-06
function bindShortKeys(){
	if(typeof initTabArr === 'function'){
		initTabArr(); // tab页信息统计
		$('body').keyup(function(event){
		if(event.ctrlKey && event.keyCode===37){ // 左方向键
			switchPreviousTab();
		} else if(event.ctrlKey && event.keyCode===39){ // 右方向键
			switchNextTab();
		}
		});
	}
	
	//提交
	bindShortkey({
		selector: "body",
		shortcut: "Ctrl+Y",
		callBack: function(){
			$("#SUBMIT").click();
		}
	});
	// 授权
	bindShortkey({
		selector: "body",
		shortcut: "Ctrl+Y",
		callBack: function(){
			$("#AUTH").click();
		}
	});
	//同意
	bindShortkey({
		selector: "body",
		shortcut: "Ctrl+Y",
		callBack: function(){
			$("#ACCEPT").click();
		}
	});
	
	//确认
	bindShortkey({
		selector: "body",
		shortcut: "Ctrl+Y",
		callBack: function(){
			$("#CONFIRM").click();
		}
	});
	
	//取消
	bindShortkey({
		selector: "body",
		shortcut: "Ctrl+Q",
		callBack: function(){
			$("#CANCEL").click();
		}
	});
	
	
	//影像
	bindShortkey({
		selector: "body",
		shortcut: "Ctrl+I" ,
		callBack: function(){
			$("#IMAGEBTN").click();
		}
	});
     
	//预览
	bindShortkey({
		selector: "body",
		shortcut: "Ctrl+E" ,
		callBack: function(){
			$("#PREVIEW").click();
		}
	});
	
	//浏览
	bindShortkey({
		selector: "body",
		shortcut: "Ctrl+E" ,
		callBack: function(){
			$("#VIEW").click();
		}
	});
	//拒绝
	bindShortkey({
		selector: "body",
		shortcut: "Ctrl+J" ,
		callBack: function(){
			$("#REJECT").click();
		}
	});
	
	//历史
	bindShortkey({
		selector: "body",
		shortcut: "Ctrl+H" ,
		callBack: function(){
			$("#HISTORY").click();
		}
	});
	
	//模板
	bindShortkey({
		selector: "body",
		shortcut: "Ctrl+M" ,
		callBack: function(){
			$("#mb1").click();
		}
	});
	
	//暂存
	bindShortkey({
		selector: "body",
		shortcut: "Ctrl+S" ,
		callBack: function(){
			$("#PAUSESAVE").click();
		}
	});
	//条款
	bindShortkey({
		selector: "body",
		shortcut: "Ctrl+G" ,
		callBack: function(){
			$("#CLAUSE").click();
		}
	});
	
	//删除
	bindShortkey({
		selector: "body",
		shortcut: "Ctrl+D" ,
		callBack: function(){
			$("#DELETE").click();
		}
	});
	
	//退回收单行
	bindShortkey({
		selector: "body",
		shortcut: "Ctrl+R" ,
		callBack: function(){
			$("#RETURN").click();
		}
	});
}
// [FRATHF_00001_增加提交快捷键]_E fanr 2013-11-06


function escapeBackspace(){
	$('body').keydown(function(event){
		if(event.keyCode===8){
			var obj = event.target || event.srcElement;
			if(obj.tagName==="TEXTAREA" || (obj.tagName==="INPUT" && obj.type==="text") || (obj.tagName==="INPUT" && obj.type==="password")){
				if(obj.disabled || obj.readOnly){
					return false;
				}
			} else {
				return false;
			}
		}
	});
}

// [FINWARE_V3.5_TFS_20131106_FR - 增加快捷键]_B fanr 2013-11-06
/**
 * 绑定快捷键,请传入对象
 * 譬如{
 * 		selector:"body",
 * 		shortcut:"Ctrl+A",
 * 		callBack:function(){alert(123)}
 * }
 * param.selector
 * param.shortcut
 * param.callBack
 * @param {Object} param
 */
function bindShortkey(param){
	var shortcut = param.shortcut;
	var shortcutArr = shortcut.split("+");
	for(var i=0,len=shortcutArr.length; i<len; i++){
		shortcutArr[i] = shortcutArr[i].toUpperCase();
	}
	var hasCtrl =false, hasALt = false, hasShift = false;
	var letter = shortcutArr[shortcutArr.length -1];
	if($.inArray("CTRL", shortcutArr) > -1){
		hasCtrl = true;
	};
	if($.inArray("ALT", shortcutArr) > -1){
		hasALt = true;
	};
	if($.inArray("SHIFT", shortcutArr) > -1){
		hasShift = true;
	};
	
	$(param.selector).keydown(function(event){
		// FRATHF_00004_交易队列，按ctrl键拷贝交易参考号，JS报错 fanr 2013-11-14
		if( (hasCtrl?event.ctrlKey:true) && (hasALt?event.altKey:true) && (hasShift?event.shiftKey:true) && (typeof KEYCODE === "object") && event.keyCode==KEYCODE[letter]){
            param.callBack.call(this);
            event.preventDefault();
            event.returnValue = false;
        }
	});
}
// [FINWARE_V3.5_TFS_20131106_FR - 增加快捷键]_E fanr 2013-11-06

