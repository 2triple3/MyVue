/**
 * 系统进度栏
 * 作者:fr 2011-05-25
 */

function ProcessBar(name){
	this.message = "";
	this.type = "";
	this.createProcessBar = function(){
		
		$('body').append("<div id='processBgBody'></div>");
		$("#processBgBody").append("<div id='processBody'></div>");
		$("#processBody").append("<img src='/UtanWeb/images/loading.gif'><br />");
		var marginTopBody = parseInt( ( document.documentElement.clientHeight - parseInt($("#processBody").css("height")) )/2 );
		$("#processBody").css("margin-top",marginTopBody+"px");
		
		$('body').append("<div id='processBgNormal'></div>");
		$("#processBgNormal").append("<div id='processNormal'></div>");
		$("#processNormal").append("<img src='/UtanWeb/images/loading2.gif'><br />");
		var marginTopNormal = parseInt( ( document.documentElement.clientHeight - parseInt($("#processNormal").css("height")) )/2 );
		$("#processNormal").css("margin-top",marginTopNormal+"px");
	}
	this.setMsg = function(msg){
		this.message = msg;
	}
	this.setType = function(type){
		this.type = type;
	}
	this.start  = function(){
		if(this.type == "body"){
			$("#processMessageBody").remove();
			$("#processBody").append("<span id='processMessageBody'>" + this.message + "</span>");
			$("#processBgBody").show();
		} else {
			$("#processMessageNormal").remove();
			$("#processNormal").append("<span id='processMessageNormal'>" + this.message + "</span>");
			$("#processBgNormal").show();
		}
	}
	this.stop   = function(){
		$("#processBgBody").hide();
		$("#processBgNormal").hide();
	}
	
	this.createProcessBar();
}

var processBar;

function initProcess(){
    processBar = new ProcessBar("MainFrame");
}
function getProcess(){
	return processBar;
}