/**
 * 菜单栏处理
 * (代替老的easyui菜单栏)
 */

(function(){
	var tabContainers = {};
	var UTAN_TABS = function(tabContainerId){
		return tabContainers[tabContainerId];
	};
	var TabContainer = function(tabContainerId, cotainerParam){
		var defaultParam = {
				closeable:false,
				isHtml:false,
				onSelect:undefined
		};
		$.extend(defaultParam,cotainerParam);
		cotainerParam = defaultParam;
		var thisContainerObj = this;
		var container = document.getElementById(tabContainerId);
		var $container = $(container);
		var menuId = "utantab_menu_" + tabContainerId;
		var menuStr = "<ul id='" + menuId + "' class='TabBarLevel1'></ul>";
		$container.before(menuStr);
		var containerHeight = $(container).css("height"); // 是否设置了高度
		if(containerHeight){
			var newHeight = parseInt(containerHeight);
			$container.height(newHeight-29);
		}
		var $menu = $("#" + menuId);

		var tabs = {};
		this.id = tabContainerId;
		this.menuId = menuId;
		
		var Tab = function(tabId, paramSet){
			var param = {
				id:tabId,
				title:"",
				content:"",
				href:"",
				closeable:false,
				isHtml:false,
				onSelect:undefined,
				onClose:undefined,
				cache:false
			};
			$.extend(param, cotainerParam);
			$.extend(param, paramSet);
			
			param.containerId = tabContainerId;
			this.getParam = function(key){
				return param[key];
			};
			var liId = "utantab_menuli_" + tabContainerId + "_" + tabId;
			var closeStr = "";
			var title = param.title;
			if(param.closeable){
				closeStr = "<a class='tabs-close' onclick=\"UTAN_TABS('" + tabContainerId + "').del('" + tabId + "');\">&nbsp;</a>";
				title += "&nbsp;"; // 控制样式用
			}
			var liStr = "<li id='" + liId + "' class='shows'><a onclick=\"UTAN_TABS('" + tabContainerId + "').select('" + tabId + "');\">" + title + "</a>"+closeStr+"</li>";
			
			$menu.append(liStr);
			var $tab = this.$tab = $("#"+liId);
			var contentId;
			
			if(param.inHtml){
				// donothing
				contentId = tabId;
			} else if(param.content){
				contentId = "utantab_content_" + tabContainerId + "_" + tabId;
				var contentStr = "<div id='" + contentId + "' style='height:100%'>" + param.content + "</div>";
				$container.append(contentStr);
			} else if(param.href){
				contentId = "utantab_content_" + tabContainerId + "_" + tabId;
				var contentStr = "<div id='" + contentId + "' style='height:100%'>" + "<iframe name="+param.id+" scrolling='yes' frameborder='0'  style='width:100%;height:100%;' src='"+param.href+"'></iframe>" + "</div>";
				$container.append(contentStr);
			}
			var $content = this.$content = $("#"+contentId);
			this.show = function(){
				if($tab.hasClass("Selected")){
					// do nothing	
				} else {
					$tab.removeClass("dis").addClass("shows");	
				}
			};
			this.select = function(){
				$tab.removeClass("shows dis").addClass("Selected");
				$content.show();
				if(typeof cotainerParam.onSelect === "function"){
					cotainerParam.onSelect(param);
				}
				if(typeof param.onSelect === "function"){
					param.onSelect(param);
				}
			};
			this.hide = function(){
				$tab.removeClass("Selected shows").addClass("dis");
				$content.hide();
			};
			this.back = function(){
				if($tab.hasClass("dis")){
					// do nothing
				} else {
					$tab.removeClass("Selected").addClass("shows");
					$content.hide();
				}
			};
			this.setParam = function(paramAdd){
				$.extend(param, paramAdd);
			};
			this.getParam = function(){
				return param;
			}
		};
		var atuoChangeTab = function(tabId, action){ // 在删除或者隐藏的时候自动切换窗口
			var cId = tabs.currentTabId;
			var pId = tabs.previousTabId;
			if(!cId){
				if(pId){
					thisContainerObj.select(pId);
				} else {
					for (var id in tabs){
						if(id==="currentTabId" || id==="previousTabId"){
							continue;
						}
						if(!tabs[id].$tab.hasClass("dis")){
							thisContainerObj.select(id);
							break;
						}
					}
				}
			}
		}
		
		this.add = function(tabId, param){
			tabs[tabId] = new Tab(tabId, param);
			thisContainerObj.select(tabId);
			tabs.currentTabId = tabId;
			return tabs[tabId];
		};
		
		this.del = function(tabId){
			var thisParam = tabs[tabId].getParam();
			var callBack = thisParam.onClose; 
			if(typeof  callBack === 'function'){
				callBack(thisParam);
			};
			if(thisParam.cache){
				thisContainerObj.hide(tabId);
				return;
			}
			tabs[tabId].$tab.remove();
			tabs[tabId].$content.remove();
			delete tabs[tabId];
			if(tabId === tabs.currentTabId) tabs.currentTabId = "";
			if(tabId === tabs.previousTabId) tabs.previousTabId = "";
			atuoChangeTab();

		};
		
		this.hide = function(tabId){
			tabs[tabId].hide();
			if(tabId === tabs.currentTabId) tabs.currentTabId = "";
			if(tabId === tabs.previousTabId) tabs.previousTabId = "";
			atuoChangeTab();
			return tabs[tabId];
		};
		
		this.select = function(tabId){
			var oldCId = tabs.currentTabId;
			var oldPId = tabs.previousTabId;
			tabs[tabId].select();
			for(var id in tabs){
				if(id==="previousTabId" || id==="currentTabId") continue;
				if(id !== tabId){
					tabs[id].back();
				}
			}
			tabs.currentTabId = tabId;
			if(tabId !== oldCId ){
				tabs.previousTabId = oldCId;
			}
		};
		
		this.show = function(tabId){
			tabs[tabId].show();
			return tabs[tabId];
		};
		
		this.get = function(tabId){
			return tabs[tabId];
		};
		// [Bugfree_2073_【温州银行】机构信息维护-选择一个机构然后点击‘编辑’，后点击‘取消’，系统卡住了，取消不掉！]_B fanr 2013-12-17
		var _this = this;
		this.closeCurrTab = function(){
			_this.del(tabs.currentTabId);
		};
		// [Bugfree_2073_【温州银行】机构信息维护-选择一个机构然后点击‘编辑’，后点击‘取消’，系统卡住了，取消不掉！]_E fanr 2013-12-17
		this.setParam = function(paramAdd){
			$.extend(cotainerParam, paramAdd);
		};
	};
	
	UTAN_TABS.createTabs = function(tabContainerId, param){
		tabContainers[tabContainerId] = new TabContainer(tabContainerId, param);
		return tabContainers[tabContainerId];
	}
	UTAN_TABS.getTabs = function(tabContainerId){
		return tabContainers[tabContainerId];
	}
	window.UTAN_TABS = UTAN_TABS;
})();
$(document).ready(function(){
	$("div.utan-tabs").each(function(){
		var containerId = this.id;
		var tabs = UTAN_TABS.createTabs(containerId);
		var container = this;
		var firstTabId = "";
		$(this).children("div").each(function(index){
			var tabId = this.id;
			var tabTitle = this.title;
			var tab = tabs.add(tabId, {
				title: tabTitle,
				inHtml: true
			});
			if(index===0){
				firstTabId = tabId;
			}
		});
		if(firstTabId){
			tabs.select(firstTabId);
		}
	});
});
function getTable(boxId){
	return UTAN_TABS(boxId);
}
