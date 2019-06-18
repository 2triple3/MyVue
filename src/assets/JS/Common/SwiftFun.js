/**
 * Swift报文处理
 */

var SYS_ISCTC = false;
var showContinueFlag = false;
var __CONTINUESTR = '/CONTINUED/';
var swiftPrivateObj = {
	swiftTypes:[],
	swiftDivs:[]
};
function swiftFuns() {
	// 获取该交易所有报文类型("MT101"等等)
	$("#TabPage li").each(function(){
		if(/^Tab((MT|FMT).*)_PAGE/.test(this.id)){
			//[Bugfree_776_国内证 >> 国内福费廷 >> 非自营国内福费廷转卖  MT799_FRFT页面的F79域NEW按钮无效] modify by fanr 2015-04-22
			var myType=RegExp.$1 + "@" + this.id.replace(/^Tab/, ""); // 因为还有MT799_PAGE_M2这种设定
			if($.inArray(myType, swiftPrivateObj.swiftTypes)==-1){
				swiftPrivateObj.swiftTypes.push(myType);
				swiftPrivateObj.swiftDivs.push(document.getElementById(myType+"_PAGE"));
			}
		}
	});
	$("#CB_Seq :checkbox[name*='Seq']").bind('click', function() {swiftSeqChkClick(this)});
	$("#CB_Seq :checkbox[name*='Seq']").each(function() {swiftSeqChkClick(this)}); // 解决复核时候Seq域出不来的问题
	$("body").on("click",":checkbox[id*='SSEQ']", function(){swiftSubSeqChkClick(this)});
    $("body").on("click","#subTabPage li[id*='Seq']", function(){swiftSeqLiClick(this)});
    $("body").on("click","input[id*='ADD_LOOP']", function(){addSubLoop(this);});
	//getSwiftTagDIVs();
	swiftSubSeqMOPInit();
	comFieldInit();
	loopInit();
	sseqLoopInit();
	swiftHideDivCheck();
	$("select[name^='TAG_']").change(function() {getSwiftTagDIV(this);});
}

function sseqLoopInit() {
	var ssloopdiv = $("div[id^='DIV_'][id*='SLOOP_SSEQ']");
	if (ssloopdiv.size() > 0) {
		sloopinit();
	}
	for(var q=0; q<ssloopdiv.size(); q++) {
		var sldchild = ssloopdiv[q];
		var createid = sldchild.id.replace("DIV_", "");
		var createNum = $("#" + createid).val();
		var p = 2;
		if (createid.indexOf("OSLOOP_") > -1) {
			p = 1;
		}
		for (p; p <= createNum; p++) {
			var slshowdivname = createid + "_SLT" + p;
			divShow(slshowdivname, true);
		}
		var taskInputType = $('#CURR_TASKTYPE').val();
		if (taskInputType == "RELEASE") {
			$("input[id^='DEL_'][id*='SLOOP_']").attr("disabled", true);
		}
		if (taskInputType == 'FIXPENDING' || taskInputType == 'ADD') {
			$("input[id^='DEL_'][id*='SLOOP_']").attr("disabled", true);
			var slmop = createid.indexOf("MSLOOP_");
			if (createNum == 1 && slmop < 0) {
				var lastdelid = "DEL_" + createid + "_SLT1";
				$("#" + lastdelid).attr("disabled", false);
			} else if (createNum > 1) {
				var lastdelid = "DEL_" + createid + "_SLT" + createNum;
				$("#" + lastdelid).attr("disabled", false);
			}
		}
	}
	getSubSeqChk();
}

function swiftSeqChkClick(obj) {
	var chkBox = $("input[type=checkbox]");
	var chkBoxSel = $("#" + obj.id).attr("checked");
	var seqs = $("#subTabPage li");
	if (chkBoxSel) {
		$("#" + obj.id).val(obj.id);
		for ( var j = 0; j < seqs.length; j++) {
			var tagId = seqs[j].id;
			var subBoxValue = obj.id;
			if (tagId.indexOf(subBoxValue) != -1) {
				$("#" + seqs[j].id).attr("class", "show");
			}
		}
	} else {
		$("#" + obj.id).val("");
		for ( var j = 0; j < seqs.length; j++) {
			var tagId = seqs[j].id;
			var subBoxValue = obj.id;
			if (tagId.indexOf(subBoxValue) != -1) {
				$("#" + seqs[j].id).attr("class", "dis");
			}
		}
		$("#" + seqs[0].id).attr("class", "Selected");
		var divId = seqs[0].id.substring(3);
		$("#" + "Div_" + obj.id).css("display", "none");
		$("#" + divId).css("display", "block");
	}
}

function swiftSeqLiClick(obj) {
	var seqs = $("#subTabPage li");
	for ( var i = 0; i < seqs.length; i++) {
		if ($("#" + seqs[i].id).attr("class") == "show"
				|| $("#" + seqs[i].id).attr("class") == "Selected") {
			$("#" + seqs[i].id).attr("class", "show");
		}
	}
	var subDivId = obj.id.substring(3, 16);
	var divshow = $("div[id^='" + subDivId + "']");
	var p = -1;
	for ( var j = 0; j < divshow.length; j++) {
		var tagId = obj.id;
		var divId = divshow[j].id;
		if (divId != "" && divId != null) {
			var divClass = $("#" + divshow[j].id).attr("class");
			if (divClass == "HackBox") {
				$("#" + divshow[j].id).css("display", "none");
				if (tagId.indexOf(divId) != -1) {
					p = j;
				}
			}
		}
	}
	$("#" + obj.id).attr("class", "Selected");
	if (p != -1) {
		$("#" + divshow[p].id).css("display", 'block');
	}
}

function swiftSubSeqMOPInit() {
	var seqs = $("#subTabPage li");
	if (seqs.size() == 0) {
		return;
	}
	for ( var i = 0; i < seqs.length; i++) {
		if ($("#" + seqs[i].id).attr("class") == "show"
				|| $("#" + seqs[i].id).attr("class") == "Selected") {
			if ($("div[id^='SSEQ']").size() > 0) {
				var objchild = $("div[id^='SSEQ']").find("[id]");
				for ( var j = 0; j < objchild.size(); j++) {
					var childClass = $("#" + objchild[j].id).attr("class");
					var mop = $("#" + objchild[j].id).attr("mop");
					if (childClass && mop == "M") {
						setProperty($("#" + objchild[j].id)[0], "O");
					}
				}
			}
			if ($("div[id^='MSLOOP_SSEQ']").size() > 0
					|| $("div[id^='OSLOOP_SSEQ']").size() > 0) {
				var sloopobj = $("div[id*='MSLOOP_SSEQ']");
				for ( var k = 0; k < sloopobj.size(); k++) {
					var sloopchild = sloopobj[k];
					var slcdisply = $("#" + sloopchild.id).css("display");
					if (slcdisply == "none") {
						divShow(sloopchild.id, false);
					}
				}
			}
		}
	}
}

function swiftSubSeqChkClick(obj) {
	var chkBoxSel = $("#" + obj.id).attr("checked");
	var objchild = $("#DIV_" + obj.id).find("[id]");
	var pMop = "M";
	if (chkBoxSel) {
		$("#DIV_" + obj.id).css("display", 'block');
		for ( var i = 0; i < objchild.size(); i++) {
			var childClass = $("#" + objchild[i].id).attr("class");
			var mop = $("#" + objchild[i].id).attr("mop");
			var pid = "COM_"
					+ objchild[i].id.substring(0, objchild[i].id
							.lastIndexOf("_"));
			if (typeof ($("#" + pid).attr("class")) != "undefined") {
				pMop = getMOP($("#" + pid)[0]);
			} else {
				pMop = "M";
			}
			var pid = "DIV_"
					+ objchild[i].id.substring(0, objchild[i].id
							.lastIndexOf("_"));
			if (typeof ($("#" + pid).css("display")) != "undefined") {
				if ($("#" + pid).css("display") == "none") {
					pMop = "O";
				}

			}

			if (childClass && mop == "M" && pMop == "M") {
				setProperty($("#" + objchild[i].id)[0], "M");
			}
		}
	} else {
		$("#DIV_" + obj.id).css("display", 'none');
		for ( var i = 0; i < objchild.size(); i++) {
			var childClass = $("#" + objchild[i].id).attr("class");
			var mop = $("#" + objchild[i].id).attr("mop");
			if (childClass != null && childClass != "" && mop == "M") {
				setProperty($("#" + objchild[i].id)[0], "O");
			}
		}
	}
}

function getSwiftTagDIV(obj){
    var DivName = obj.name.replace("TAG", "DIV");
    var divField, divFieldName;
    var objOptions = obj.options;
    var len = objOptions.length;
    for (var i = 0; i < len; i++) {
        var value = objOptions[i].value;
        if (value == "") 
            continue;
        if (obj.value == value) {
            var divname = DivName + "_" + value.substring(0);
            var $divname = $("#" + divname); 
            $divname[0].style.display = "";
            var objchild = $divname.find("[id]");
            for (var j = 0; j < objchild.size(); j++) {
            	var _objchild = objchild[j];
                var childClass = _objchild.className;
                var mop = _objchild.getAttribute("mop");
                var fieldMOP = getMOP(_objchild);
                if (childClass && mop == "M" && fieldMOP!="P") { // 字段当前状态是P的话，说明是交易设置的，无需再改动
                    setProperty(_objchild, "M");
                }
            }
        } else {
            var divname = DivName + "_" + value.substring(0);
            $("#" + divname).css("display", 'none');
            var $divname = $("#" + divname); 
            $divname[0].style.display = "none";
            var objchild = $divname.find("[id]");
            for (var j = 0; j < objchild.size(); j++) {
                var _objchild = objchild[j];
                var childClass = _objchild.className;
                var mop = _objchild.getAttribute("mop");
                 var fieldMOP = getMOP(_objchild);
                if (childClass && mop == "M" && fieldMOP!="P") { // 字段当前状态是P的话，说明是交易设置的，无需再改动
                    setProperty(_objchild, "O")
                }
            }
        }
    }
}

function setSwiftTagDivEmpty(fieldName) {
	var obj = $("#" + fieldName)[0];
	getSwiftTagDIV(obj)

}

function getSwiftTagDIVs() {
	var temp = $("select[name^='TAG_']");
	for ( var i = 0; i < temp.length; i++) {
		// if (temp[i].value != '') {
		getSwiftTagDIV(temp[i]);
		// }
		//else{
		// divShow(temp[i].id,false);
		// }
	}
}

function loopInit(){
	//utanTimeLog("loopInit开始");
    var loops = $("div[id*='LOOP']");
    if (loops.size() == 0) {
        return;
    }
    var mttypes = swiftPrivateObj.swiftTypes;
    //utanTimeLog("loopInit外循环 开始");
    for (var m = 0; m < mttypes.length; m++) {
    	//utanTimeLog("外循环头");
        //[Bugfree_776_国内证 >> 国内福费廷 >> 非自营国内福费廷转卖  MT799_FRFT页面的F79域NEW按钮无效]_B modify by fanr 2015-04-22
    	var mttypeArr = mttypes[m].split("@");
        var mttype = mttypeArr[0];
        var mtPageDiv = $("#"+mttypeArr[1])[0];
        //[Bugfree_776_国内证 >> 国内福费廷 >> 非自营国内福费廷转卖  MT799_FRFT页面的F79域NEW按钮无效]_E modify by fanr 2015-04-22
        var LoopItemNum = $("div[id$='_DEFAULT'][id*='" + mttype + "']", mtPageDiv);
        var loopInfoXml = $("input[id$='_loopInfo'][id*='" + mttype + "']", mtPageDiv).val();
        //utanTimeLog("外循环查找元素结束");
        if(loopInfoXml){
            for (var i = 1; i <= LoopItemNum.size(); i++) {
            	var _LoopItemNum = LoopItemNum[i-1];
              	var idInfo=_LoopItemNum.id.replace("_DEFAULT","");
                idInfo=idInfo.replace("LOOP_","");
                //var minOccurs = $("input[id$='_minOccurs'][id*='" + mttype + "'][id*='"+idInfo+"']", mtPageDiv).val();
                var minOccursId = "LOOP_" + idInfo + "_minOccurs";
                var minOccurs = $("#" + minOccursId, mtPageDiv).val();
                
                
//                var t = "div[id$='_DEFAULT'][id*='" + mttype + "'][id*='"+idInfo+"']";
//                var loopcontent = $(t, mtPageDiv).html();
//                
//                console.log(mttype+":"+idInfo);
//                console.log($(t)[0].id);
                
              	
                
                //$("input[id$='_loopContent'][id*='" + mttype + "'][id*='"+idInfo+"']",mtPageDiv).val(loopcontent);
                var loopcontentId = "LOOP_" + idInfo + "_loopContent";
                var loopcontent_default = $("#" + loopcontentId, mtPageDiv).val();
                if(!loopcontent_default){
                	var DEFAULTid = "LOOP_" + idInfo + "_DEFAULT";
             		var $DEFAULT = $("#" + DEFAULTid);
             		loopcontent_default = $DEFAULT.html();
             		$("#" + loopcontentId, mtPageDiv).val(loopcontent_default);
                }
                
                
                var sc = _LoopItemNum.id.replace("_DEFAULT", "");
                var created = $("#" + sc).val();
                if(created==0){
                     continue;
                }else if(created==1){
                   //$(_LoopItemNum).css("display","block");
                   _LoopItemNum.style.display = "";
                   continue;
                }
                //$(_LoopItemNum).css("display","block");
                _LoopItemNum.style.display = "";
                for (var j = 2; j <= created; j++) {
                    var findstr = "_LT1";
                    var replacestr = "_LT" + j;
                    var loopcontent = loopcontent_default.replace(new RegExp(findstr, "gm"), replacestr);
                    var othid = _LoopItemNum.id.replace("DEFAULT", "OTHERS");
                    var $oth = $("#"+othid, mtPageDiv);
                    var othHtml=$oth.html();
                    if(othHtml.indexOf(replacestr)<0){
	                    $oth.append(loopcontent);
                    }
                }
            }
            $("select[name^='TAG_']").change(function(){
                var tagMun = $("select[name^='TAG_'][id*='" + mttype + "']");
                for (var m = 0; m < tagMun.size(); m++) {
                    if (tagMun[m].id == this.id) {
                        getSwiftTagDIV(this);
                    }
                }
            });
        }else{
            for (var i = 1; i <= LoopItemNum.size(); i++) {
            	//utanTimeLog("内循环头");
                var idInfo=LoopItemNum[i-1].id.replace("_DEFAULT","");
                idInfo=idInfo.replace("LOOP_","");
                if (LoopItemNum[i - 1] != null){
                	//var minOccurs = $("input[id$='_minOccurs'][id*='" + mttype + "'][id*='"+idInfo+"']", mtPageDiv).val();
                	var minOccursId = "LOOP_" + idInfo + "_minOccurs";
                	var minOccurs = $("#" + minOccursId, mtPageDiv).val();
                }
             	var DEFAULTid = "LOOP_" + idInfo + "_DEFAULT";
             	var $DEFAULT = $("#" + DEFAULTid);
                if (minOccurs > 0) {
                    //$("div[id$='_DEFAULT'][id*='" + mttype + "'][id*='"+idInfo+"']", mtPageDiv).css("display", "block");
                    $DEFAULT.css("display", "block");
                    $("input[id^='DEL_LOOP'][id*='" + mttype + "'][id*='"+idInfo+"']", mtPageDiv).bind("click", function(){
                        delSubLoop(this);
                    }).prop("disabled", true); // 这句不能优化,可能有多个
                }
                if (minOccurs == 0) {
                    //$("div[id$='_DEFAULT'][id*='" + mttype + "'][id*='"+idInfo+"']", mtPageDiv).css("display", "none");
                    $DEFAULT.css("display", "none");
                    $("input[id^='DEL_LOOP'][id*='" + mttype + "'][id*='"+idInfo+"']", mtPageDiv).bind("click", function(){
                        delSubLoop(this);
                    }).prop("disabled", false);;
                }
                
                var loopcontentId = "LOOP_" + idInfo + "_loopContent";
                var loopcontent = $("#" + loopcontentId, mtPageDiv).val();
                if(!loopcontent){
                	loopcontent = $DEFAULT.html();
                	$("#" + loopcontentId, mtPageDiv).val(loopcontent);
                }
                //$("input[id$='_loopContent'][id*='" + mttype + "'][id*='"+idInfo+"']", mtPageDiv).val(loopcontent);
                
				if (minOccurs == 1) {
                    $("input[id^='DEL_LOOP'][id*='" + mttype + "'][id*='"+idInfo+"']", mtPageDiv).attr("disabled", true);
                }
                var sc = LoopItemNum[i - 1].id.replace("_DEFAULT", "");
                var created = $("#" + sc, mtPageDiv).val();
                for (var j = 2; j <= minOccurs; j++) {
                    var findstr = "_LT1";
                    var replacestr = "_LT" + j;
                    loopcontent = loopcontent.replace(new RegExp(findstr, "gm"), replacestr);
                    var othid = LoopItemNum[i - 1].id.replace("DEFAULT", "OTHERS");
                    $("#" + othid, mtPageDiv).append(loopcontent);
                }
                //utanTimeLog("内循环尾");
            }
            //utanTimeLog("select[name^='TAG_'][id*=' 开始");
            $("select[name^='TAG_'][id*='" + mttype + "']").change(function(){
                var tagMun = $("select[name^='TAG_'][id*='" + mttype + "']");
                for (var m = 0; m < tagMun.size(); m++) {
                    if (tagMun[m].id == this.id) {
                        getSwiftTagDIV(this);
                    }
                }
            });
            //utanTimeLog("select[name^='TAG_'][id*=' 结束");
        }
        if (loopInfoXml) {
            var x = parseXML(loopInfoXml);
			var node = x.getElementsByTagName("LOOP");
            for (var i = 0; i < node.length; i++) {
                var snode = node[i];
                var cNode = snode.childNodes;
                for (var j = 0; j < cNode.length; j++) {
                    var fieldId = cNode[j].getAttribute("name");
                    var fieldValue = cNode[j].textContent || cNode[j].text;
                    $("#" + fieldId, mtPageDiv).val(fieldValue);
                }
            }
            var taskInputType = $('#CURR_TASKTYPE').val();
             if (taskInputType == 'FIXPENDING' || taskInputType == 'ADD') {
                $("input[id^='DEL_'][id*='" + mttype + "'][id*='_LT']", mtPageDiv).unbind("click");
                $("input[id^='DEL_'][id*='" + mttype + "'][id*='_LT']", mtPageDiv).bind("click",function(){
                     delSubLoop(this);
                });
                $("input[id^='DEL_'][id*='" + mttype + "'][id*='_LT']", mtPageDiv).attr("disabled", true);
                var minoccurs=$("input[id$='_minOccurs']", mtPageDiv);
                for(var i=0;i<minoccurs.size();i++){
                   var minoccrid=minoccurs[i];
                   var minoccrVal=$("#"+minoccrid.id, mtPageDiv).val();
                   var createdId=minoccrid.id.replace("_minOccurs","");
                   var createdVal=$("#"+createdId, mtPageDiv).val();
                   if(createdVal==1 && minoccrVal==0){
                       var lastdelid="DEL_"+minoccrid.id.replace("_minOccurs","_LT1");
                       $("#"+lastdelid, mtPageDiv).attr("disabled",false);
                   }else if(createdVal>1){
	                   var lastdelid="DEL_"+minoccrid.id.replace("_minOccurs","_LT"+createdVal);
	                    $("#"+lastdelid, mtPageDiv).attr("disabled",false);
                   }
                   
                }
             }
            if (taskInputType == 'RELEASE') {
                $("input[id^='ADD_'][id*='" + mttype + "']", mtPageDiv).attr("disabled", true);
                $("input[id^='DEL_'][id*='" + mttype + "'][id*='_LT']", mtPageDiv).attr("disabled", true);
                $(":checkbox[id^='SSEQ_']", mtPageDiv).attr("disabled", true);
                $("select", mtPageDiv).filter(function(index){
                    if (this.doubleFlag) 
                        return false;
                    else 
                        return true;
                });
                $("select", mtPageDiv).filter(function(index){
                    if (this.doubleFlag) 
                        return false;
                    else 
                        return true;
                });
                $("select", mtPageDiv).filter(function(index){
                    if (this.doubleFlag) 
                        return false;
                    else 
                        return true;
                }).attr('readonly', 'true');
            }
        }
        //utanTimeLog("外循环尾");
    }
    //utanTimeLog("loopInit结束");
}

function loopReleaseInfo() {
}

function addSubLoop(obj) 
{
	var t = obj.id.substring(obj.id.lastIndexOf("_"));//_Loop1
	var temp;
	if (obj.id.indexOf("FMT") != -1) {
		temp = obj.id.substring(obj.id.indexOf("FMT"));//FMT101_Loop1
	} else {
		temp = obj.id.substring(obj.id.indexOf("MT"));//MT101_Loop1
	}
	var mttype = temp.substring(0, temp.lastIndexOf("_")); //MT101
	var prestr = obj.id.replace("ADD_", ""); //LOOP_FMT101_Loop1
	var minOccurs = $("input[id*='" + prestr + "_minOccurs'][id*='" + mttype + "']").val(); //最小值
	var maxOccurs = $("input[id*='" + prestr + "_maxOccurs'][id*='" + mttype + "']").val();
	var cid = obj.id.replace("ADD_", ""); //LOOP_FMT101_Loop1
	var created = $("#" + cid).val();
	if (minOccurs == 0 && created == 0) {
		$("div[id*='" + prestr + "_DEFAULT'][id*='" + mttype + "']").css("display", "block"); //LOOP_FMT101_Loop1_DEFAULT
		var hideDiv = $("div[id*='" + prestr + "_DEFAULT'][id*='" + mttype+ "']")[0].id; //LOOP_FMT101_Loop1_DEFAULT
		divShow(hideDiv, true);
		$("#" + cid).val(++created);
		var delbtn = "DEL_" + hideDiv.replace("_DEFAULT", "_LT1"); //DEL_LOOP_FMT101_Loop1_LT1
		$("#" + delbtn).attr("disabled", false);
		$("#" + delbtn).bind("click",function(){
			if ($(
					"div[id*='" + prestr + "_DEFAULT'][id*='" + mttype+ "']").css("display") == "block") {
				delSubLoop(this);
			}
		});
		return;
	}
	if (maxOccurs - created > 0) {
		var loopcontent = $(
				"input[id*='" + prestr + "_loopContent'][id*='" + mttype + "']")
				.val();
		$("#" + cid).val(++created);
		var findstr = "_LT1";
		var replacestr = "_LT" + created;
		loopcontent = loopcontent
				.replace(new RegExp(findstr, "gm"), replacestr);
		$("div[id*='" + prestr + "_OTHERS'][id*='" + mttype + "']").append(
				loopcontent);
		var delinp = obj.id.replace("ADD", "DEL");
		var preDelButt = created - 1;
		$("input[id*='" + delinp + "_LT" + created + "'][id*='" + mttype + "']")
				.attr("disabled", false);
		$(
				"input[id*='" + delinp + "_LT" + preDelButt + "'][id*='"
						+ mttype + "']").attr("disabled", true);
		$("input[id*='" + delinp + "_LT" + created + "'][id*='" + mttype + "']")
				.bind("click", function() {
					delSubLoop(this);
				});
		$("select[name^='TAG_'][id*='" + mttype + "']").change(function() {
			var tagMun = $("select[name^='TAG_'][id*='" + mttype + "']");
			for ( var m = 0; m < tagMun.size(); m++) {
				if (tagMun[m].id == this.id) {
					getSwiftTagDIV(this);
				}
			}
		});
	}
	if (created == maxOccurs) {
		$("#" + obj.id).attr("disabled", true);
	} else {
		$("#" + obj.id).attr("disabled", false);
	}
	var othFieldId = $("div[id*='" + prestr + "_OTHERS'][id*='" + mttype + "']")[0];
	var createdIndex = replacestr;
	addsubFieldInit(othFieldId, replacestr);
	// mod by xh for 自动触发循环域--begin--
	var callBackFuntion = obj.getAttribute("callBackFunction");
	if (callBackFuntion) {
		window[callBackFuntion](temp);
	}
	// mod by xh for 自动触发循环域--end--
	//ADD_LOOP_MT103_Loop2
	if (addSubLoop.afterList) {
		var i = 0, len = addSubLoop.afterList.length;
		for (; i < len; i++) {
			addSubLoop.afterList[i](temp);
		}
	}
}

function delSubLoop(obj) {
	//DEL_LOOP_FMT101_Loop1_LT1
	var temp;
	if (obj.id.indexOf("FMT") != -1) {
		temp = obj.id.substring(obj.id.indexOf("FMT")); //MT101_Loop1_LT1
	} else {
		temp = obj.id.substring(obj.id.indexOf("MT")); //MT101_Loop1_LT1
	}
	var mttype = temp.substring(0, temp.lastIndexOf("_")); //MT101_Loop1
	var p = obj.id.substring(obj.id.indexOf("Loop"), obj.id.indexOf("_LT")); //Loop1
	var prestr = obj.id.replace("DEL_", "");
	prestr = prestr.substring(0, prestr.indexOf("_LT"));
	var minOccurs = $(
			"input[id*='" + prestr + "_minOccurs'][id*='" + mttype + "']")
			.val();
	var maxOccurs = $(
			"input[id*='" + prestr + "_maxOccurs'][id*='" + mttype + "']")
			.val();
	var scid = obj.id.replace("DEL_", "");
	var cid = scid.substring(0, scid.lastIndexOf("_"));
	var created = $("#" + cid).val();
	if (minOccurs == 0 && created == 1) {
		$("div[id*='" + p + "_DEFAULT'][id*='" + mttype + "']").css("display",
				"none");
		var hideDiv = $("div[id*='" + prestr + "_DEFAULT'][id*='" + mttype
				+ "']")[0].id;
		divShow(hideDiv, false);
		$("#" + cid).val(--created);
	}
	if (created <= minOccurs) {

		return;
	}
	var delId = obj.id.replace("DEL_", "");
	$("#" + delId).remove();
	var s = obj.id.replace("ADD", "DEL");

	var delinp = s.substring(0, s.lastIndexOf("_"));
	var preDelButt = created - 1;
	if (preDelButt > minOccurs) {
		$(
				"input[id*='" + delinp + "_LT" + preDelButt + "'][id*='"
						+ mttype + "']").attr("disabled", false);
	}
	$("#" + cid).val(--created);
	if (created <= minOccurs) {
		var temp = obj.id.substring(0, obj.id.lastIndexOf("_")).replace("DEL",
				"ADD");
		$("input[id$='" + temp + "'][id*='" + mttype + "']").attr("disabled",
				false);
		return;
	}
	if (created < maxOccurs) {
		var temp = obj.id.substring(0, obj.id.lastIndexOf("_")).replace("DEL",
				"ADD");
		$("input[id$='" + temp + "'][id*='" + mttype + "']").attr("disabled",
				false);
	}

	var hidediv = obj.id.replace("DEL_", "");
	divShow(hidediv, false);
}

function loopchkclick(obj) {
	var ischecked = $("#" + obj.id).attr("checked");
	var divName = obj.id.replace("CHK", "DEFAULT");
	if (ischecked) {
		divShow(divName, true);
	} else {
		divShow(divName, false);
	}
}

function saveLoopInfo(){
    var mttabs = $("li[id^='TabMT'][id$='_PAGE']");
    var msgkind = "MT";
    if(mttabs.size()==0){
    	msgkind = "FMT";
    	mttabs = $("li[id^='TabFMT'][id$='_PAGE']");
    }
    for (var m = 0; m < mttabs.size(); m++) {
        var loops = $("div[id*='LOOP']");
        if (loops.size() == 0) {
            continue;
        }
        var mttabId = mttabs[m].id;
        var mttype = mttabId.substring(mttabId.indexOf(msgkind), mttabId.indexOf("_PAGE"));
        if(mttype.indexOf("SMP")>-1){
          mttype=mttype.replace("SMP","");
        }
        var loops = $("div[id*='LOOP'][id*='" + mttype + "']");
        if (loops.size() == 0) {
            continue;
        }
       
        var loopInfo = $("input[id$='_loopInfo'][id*='" + mttype + "']");
        if (loopInfo.size() == 0) {
             continue;
        }
        createLoopXML(mttype);
    }
}


function createLoopXML(mttype) {
	var str = "<?xml version='1.0' encoding='GB2312'?><ROOT><LOOPINFOS>";
	var p = $("div[id$='_OTHERS'][id*='" + mttype + "']");
	for ( var i = 0; i < p.size(); i++) {
		if ($("#" + p[i].id).html() != null && $("#" + p[i].id).html() != "") {
			str += "<LOOP>";
			var loopchild = $("#" + p[i].id).find("[id]");
			for ( var j = 0; j < loopchild.length; j++) {
				var fieldKey = loopchild[j].id;
				var fieldValue = $("#" + fieldKey).val();
				if (fieldValue == "") {
					continue;
				}
				str += "<" + fieldKey + " name='" + fieldKey + "' >"
						+ fieldValue + "</" + fieldKey + ">";
			}
			str += "</LOOP>";
		}
	}
	str = str + "</LOOPINFOS></ROOT>";
	$("input[id$='_loopInfo'][id*='" + mttype + "']").val(str);
}

function divShow(div, isshow){
	if(typeof div==="string"){
		div = $("#" + div)[0];
	}
	if(!div) return;
    if (isshow) {
        var objchild = $(div).find("[id]");
//        $(div).show();
        div.style.display = "";
        for (var j = 0; j < objchild.size(); j++) {
            var childClass = $("#" + objchild[j].id).attr("class");
            var mop = $("#" + objchild[j].id).attr("mop");
            var pMop="M";
            var haspid=false;
             var pid="COM_"+objchild[j].id.substring(0,objchild[j].id.lastIndexOf("_"));
                if(typeof($("#"+pid).attr("class"))!="undefined"){
                  pMop = getMOP($("#"+pid)[0]);
                  haspid="true";
                }
                  var dpid="DIV_"+objchild[j].id.substring(0,objchild[j].id.lastIndexOf("_"));
                  
                  if(typeof($("#"+dpid).css("display"))!="undefined"){
                    if($("#"+dpid).css("display")=="none"){
                      pMop="O";
                       if(haspid){
	                       setProperty($("#" + pid)[0], "O");
                       }
                    }
                 }
                 var tempid=objchild[j].id.substring(0,objchild[j].id.lastIndexOf("_"));
                 var tempid2=tempid.substring(0,tempid.lastIndexOf("_"));
                 var tmpendstr=tempid.substring(tempid.lastIndexOf("_"));
                 var cpid="DIV_"+tempid2+"_C";
                 var tempcpid=$("div[id^='"+cpid+"'][id$='"+tmpendstr+"']");
                  if(tempcpid.size()>0){
                  
                    if($("#"+tempcpid[0].id).css("display")=="none"){
                       pMop="O";
                       if(haspid){
	                  	   setProperty($("#" + pid)[0], "O");
                       }
                    }
                 }
            if (childClass != null && childClass != "" && mop == "M" && pMop=='M') {
                setProperty($("#" + objchild[j].id)[0], "M");
            }
        }
    } else {
       	//$("#" + divname).hide();
    	//$("#" + divname).css("display", "none");
    	div.style.display="none";
        var objchild = $(div).find("[id]");
        for (var j = 0; j < objchild.size(); j++) {
        	var child=objchild[j];
           // var childClass = $child.attr("class");
            var childClass = child.className;
            //var mop = $child.attr("mop");
            var mop = child.getAttribute("mop");
            if (childClass && mop == "M") {
                setProperty(child, "O");
                if(child.id.indexOf("COM_")==0){
                  child.value="";
                }
            }
        }
    }
}

function swiftHideDivCheck(){
    var HideDivs = $("div[id^='DIV_']");
    // seqchkboxs=$(swiftPrivateObj.swiftDivs)
    var size=HideDivs.size();
    //alert(size);
    if (size <= 0) {
        return;
    }
    for (var i = 0; i < size; i++) {
    	var div = HideDivs[i];
        var divId = div.id;
        if (divId) {
           //var divdis = $(div).css("display");
          	var divdis = div.style.display;
            if (divdis == "none") {
                divShow(div, false);
            }
            if (divId.indexOf("_LOOP_") > 0) {
                var minstr = divId.replace("DIV_", "") + "_minOccurs";
                var minOccurs = $("#" + minstr).val();
                var created = $("#" + divId.replace("DIV_", "")).val();
                if (minOccurs == "0" && created == 0) {
                    var hideDiv = divId.replace("DIV_", "") + "_DEFAULT";
                    divShow(hideDiv, false);
                }
            }
        }
    }
    
}

function showLoopDefault(obj) {
	var strloop = obj.substring(obj.lastIndexOf("_"));
	var comfields = $("div[id*='DIV_COM_'][id*='" + strloop + "']");
	if (comfields.size() == 0 && $("#" + obj).val() == 0) {
		if ($("#" + obj + "_DEFAULT").css("display") == "none") {
			divShow(obj + "_DEFAULT", true);
			$("#" + obj).val("1");
		}
		return;
	}
	for ( var k = 0; k < comfields.size(); k++) {
		var comfield = $("#" + comfields[k].id).find("[id]");
		var cvalue = "";
		for ( var i = 1; i < comfield.size(); i++) {
			cvalue += $("#" + comfield[i].id).val();
		}
		/*comfield.bind("change", function(){
			for (var i = 1; i < comfield.size(); i++) {
				cvalue += $("#" + comfield[i].id).val();
			}
		 });*/
		if (cvalue != "" && $("#" + obj).val() == 0) {
			if ($("#" + obj + "_DEFAULT").css("display") == "none") {
				divShow(obj + "_DEFAULT", true);
				$("#" + obj).val("1");
			}
			setProperty($("#" + comfield[0].id)[0], "M");
		} else if (cvalue == "" && $("#" + obj).val() == 1) {
			if ($("#" + obj + "_DEFAULT").css("display") == "block") {
				divShow(obj + "_DEFAULT", false);
				$("#" + obj).val("0");
			}
			setProperty($("#" + comfield[0].id)[0], "O");
		}

	}
}

function checkSwiftField(obj) {
	var letter;
	var resultFlag = false;
	var fieldValue = $("#" + obj.id).val();
	if (fieldValue == null || fieldValue.length <= 0) {
		return true;
	}
	letter = fieldValue.charAt(0);
	var rows = $("#" + obj.id).attr("rows");
	var cols = $("#" + obj.id).attr("cols");
	var istextarea = "";
	var istext = "";
	if (typeof (rows) != "undefined" && typeof (cols) != "undefined") {
		istextarea = "Y";
	}
	if (letter == ' ') {
		alert("[" + obj.title + ":" + obj.name + "]"
				+ " SWIFT field doesn't allow this first word [whitespace]!");
		setFocus(obj);
		return false;
	}
	var chkType = $("#" + obj.id).attr("swift");
	var chkRule = $("#" + obj.id).attr("swiftchkRule");
	var cttcflag = $("#TRAN_INLAND_FLAG").val();
	if (typeof (cttcflag) != "undefined") {
		if (cttcflag == "INLAND") {
			SYS_ISCTC = true;
		} else {
			SYS_ISCTC = false;
		}
	}
	if (SYS_ISCTC == false && chkType == "x") {
		var patrnx = /[0-9a-zA-Z\/\-\?:\(\)\.,'\+\r\n ]+/;
		for ( var i = 0; i < fieldValue.length; i++) {
			letter = fieldValue.charAt(i);
			if (!patrnx.exec(letter)) {
				if (obj.id.indexOf("F20") > -1
						&& fieldValue.substring(0, 1) == "["
						&& fieldValue.substring(fieldValue.length - 1,
								fieldValue.length) == "]") {
					return true;
				}
				//alert("[" + obj.title + ":" + obj.name + "]"
						//+ " SWIFT field doesn't allow this word [" + letter
						//+ "],location[" + i + "]!");
				alert("[" + obj.title + ":" + obj.name + "]"
						+ " SWIFT不能包含字符 [" + letter
						+ "]!");
				setFocus(obj);
				setSelection(obj, i, i + 1);
				return false;
			}
		}
	}
	if (chkRule == "" || typeof (chkRule) == "undefined") {
		return true;
	}
	//规则校验
	var rules = chkRule.split(",");
	var validate = new swift("");
	for ( var i = 0; i < rules.length; i++) {
		var rule = rules[i];
		if (!validate.rule(window[rule], obj)) {
			return false;
		}
	}
	return true;
}

function comFieldInit()
{
    var comDivs = $("div[id^='DIV_COM_']");
    if (comDivs.size() <= 0)
    {
        return;
    }
    
    for (var i = 0; i < comDivs.size(); i++) {
        var comId = comDivs[i].id.replace("DIV_", ""); // 是否显示标识
        var $subcom = $("#" + comId);
        
        if(comId.indexOf("Loop")>-1 && $subcom.hasClass("M")){
          var  temploopdiv=comId.replace("COM_","");
           temploopdiv=temploopdiv.substring(0,temploopdiv.lastIndexOf("_"));
            var ldClass="";
          if(comId.indexOf("_SLT")>-1){
             ldClass=$("div[id*='SLOOP_SSEQ'][id*='"+temploopdiv+"']").css("display");
          }else{
               ldClass=$("div[id*='LOOP_"+temploopdiv+"']").css("display");
          }
         
          if(ldClass=="none"){
               $subcom.val("");
               setProperty($subcom[0], "O");
               
          }else if(ldClass=="block"){
               $subcom.val("YES");
               setProperty($subcom[0], "M");
          }
         
        }
        if (comId.indexOf("Loop")<0 && $subcom.hasClass("M")) {
            $subcom.val("YES");
            setProperty($subcom[0], "M");
        }
        if($subcom.hasClass("O")){
            var comchild=$("#" + comDivs[i].id).find("[id]");
            for(var m=0;m<comchild.size();m++){
                var subId = comchild[m].id;
                var childClass = $("#" + subId).attr("class");
                var mop = $("#" + subId).attr("mop");
                if (childClass && mop == "M" ) {
                    setProperty($("#" + subId)[0], "O");
                }
            }
        }
        var childcom = $("#" + comDivs[i].id).find("[id]");
        $(childcom).bind("change", function(){
        	swiftComField(this);
        });
    }
}



function getSwiftComField(){
    var comdivs = $("div[id*='DIV_COM']");
    if (comdivs.size() == 0) 
        return;
    for (var i = 0; i < comdivs.size(); i++) {
        var comDiv = comdivs[i];
        var objchild = $("#" + comDiv.id).find("[id]");
        var str = "";
       
        for (var j = 1; j < objchild.size(); j++) {
            var comField = objchild[j];
            var comFieldValue = $("#" + comField.id).val();
            str += comFieldValue;
            if (str != "") 
                break;
        }
        if (str != "") {
            swiftComFieldShow(objchild[1], true);
        }
        else if (str=="" && ($("#"+objchild[0].id).attr("mop")=="O" || $("#"+objchild[0].id).attr("mop")=="")){
        //else if (str=="" && $("#"+objchild[0].id).val()!="YES"){
            swiftComFieldShow(objchild[1], false);
       }
    }
}

function swiftComFieldShow(obj, hasValue){
    if (hasValue) {
        var comDiv = "DIV_COM_" + obj.id.substring(0, obj.id.lastIndexOf("_"));
        var objchild = $("#" + comDiv).find("[id]");
        $("#" + objchild[0].id).val("YES");
        setProperty($("#" + objchild[0].id)[0], "M");
        for (var j = 1; j < objchild.size(); j++) {
        	var child = objchild[j];
            var childClass = $(child).attr("class");
            var mop = $(child).attr("mop");
            var fieldMOP = getMOP(child);
            if (childClass != null && childClass != "" && mop == "M" && fieldMOP != "P") { // 字段当前状态是P的话，说明是交易设置的，无需再改动
                setProperty(child, "M");
            }
        }
    } else {
        var comDiv = "DIV_COM_" + obj.id.substring(0, obj.id.lastIndexOf("_"));
        var objchild = $("#" + comDiv).find("[id]");
        $("#" + objchild[0].id).val("");
        setProperty($("#" + objchild[0].id)[0], "O");
        for (var j = 1; j < objchild.size(); j++) {
        	var child = objchild[j];
            var childClass = $(child).attr("class");
            var mop = $(child).attr("mop");
            var fieldMOP = getMOP(child);
            if (childClass && mop == "M" && fieldMOP != "P") { // 字段当前状态是P的话，说明是交易设置的，无需再改动
                setProperty(child, "O");
            }
        }
    }
}

function swiftComField(obj){
//[Bugfree_645_MT100中的F50K_1]_B fanr 2015-04-08
    var fieldValue = $("#" + obj.id).val();
    if (fieldValue != "") {
        var comDiv = "DIV_COM_" + obj.id.substring(0, obj.id.lastIndexOf("_"));
        var objchild = $("#" + comDiv).find("[id]");
        var firstChild = objchild[0];
        $(firstChild).val("YES");
        var fieldMOP = getMOP(firstChild);
        if(fieldMOP !== "P") setProperty(firstChild, "M");
        for (var j = 1; j < objchild.size(); j++) {
        	var _child = objchild[j];
            var childClass = $(_child).attr("class");
            var mop = $(_child).attr("mop");
            var _fieldMOP = getMOP(_child);
            if (childClass && mop == "M" && _fieldMOP !== "P") {
                setProperty(_child, "M");
            }
        }
        return;
    }
    var comDiv = "DIV_COM_" + obj.id.substring(0, obj.id.lastIndexOf("_"));
    var objchild = $("#" + comDiv).find("[id]");
    if(!objchild[0]){
    	return;
    }
    var firstChild = objchild[0];
    $(firstChild).val("YES");
    setProperty(firstChild, "O");
    for (var j = 1; j < objchild.size(); j++) {
        var fvalue = $("#" + objchild[j].id).val();
        fieldValue += fvalue;
    }
    if (fieldValue == "") {
        var comDiv = "DIV_COM_" + obj.id.substring(0, obj.id.lastIndexOf("_"));
        var objchild = $("#" + comDiv).find("[id]");
        var firstChild = objchild[0];
        $(firstChild).val("");
        var fieldMOP = getMOP(firstChild);
        if(fieldMOP!=="P") setProperty(firstChild, "O");
        for (var j = 1; j < objchild.size(); j++) {
        	var _child = objchild[j];
            var childClass = $(_child).attr("class");
            var mop = $(_child).attr("mop");
            var _fieldMOP = getMOP(_child);
            if (childClass && mop == "M" && _fieldMOP!=="P") {
                setProperty(_child, "O");
            }
        }
    }
//[Bugfree_645_MT100中的F50K_1]_E fanr 2015-04-08
}

function MT_Text(mtname){
    var mt = $("div[id='" + mtname + "']").find("[id]");
    var mtText = "";
    for (var i = 0; i < mt.size(); i++) {
        mtText += $("#" + mt[i].id).val() + "      ";
    }
    return mtText;
}

function setLoopFieldValue(fieldName, fieldValue,rows,cols){
        var formatVal=fieldValue.split("\n");
        var tempVal="";
        for(var i=0;i<formatVal.length;i++){
          while(formatVal[i].indexOf(" ")==0){
			 formatVal[i]=formatVal[i].replace(" ","");
		  }
		  formatVal[i]=formatVal[i].replace(/^\r/, "");
          formatVal[i]=formatVal[i].replace(/^\n/, "");
          formatVal[i]=formatVal[i].replace(/^\r\n/, "");
          if(formatVal[i].length<=cols && formatVal[i]!="" && formatVal[i]!=" " && formatVal[i]!="\n"){
             tempVal+=formatVal[i]+"\n";
          }else if(formatVal[i].length>cols && formatVal[i]!=" " && formatVal[i]!="\n"){
            var statrIndex=0;
            var endIndex=0;
            var sumstr="";
            var tempstr=formatVal[i];
            while(tempstr.length>cols){
               endIndex=cols;
               var tmpVal = tempstr.substr(0,endIndex);
               //alert("tmpVal---|"+tmpVal+"|==endIndex==|"+endIndex+"|===tmpVal.length==|"+tmpVal.length);
               var lastTmlstr = tmpVal.substring(tmpVal.length-1);
               //alert("lastTmlstr---|"+lastTmlstr+"|==endIndex==|"+endIndex);
               if(lastTmlstr!=" "){
                  if(tmpVal.lastIndexOf(" ")>-1){
                     endIndex = tmpVal.lastIndexOf(" ");
                  }
               }
               sumstr += tempstr.substr(0,endIndex) + "\n";
               //alert("sumstr---|"+sumstr+"|==endIndex==|"+endIndex);
               tempstr = trimAll( tempstr.substring(endIndex) );
               //alert("tempstr---|"+tempstr+"|==endIndex==|"+endIndex);
            }
            tempVal += sumstr;
            //alert("tempVal-1--|"+tempVal);
            if( tempVal.lastIndexOf("\n") == ( tempVal.length - 1 ) )  tempVal = tempVal.substring(0,tempVal.length - 1);
            //alert("tempVal-2--|"+tempVal);
            if( tempstr != "" && tempstr.length > 0 ) tempVal = tempVal + "\n" + tempstr;
            //alert("tempVal-3--|"+tempVal);
          }
          //alert("tempVal-4--|"+tempVal+"|===");
          if( tempVal.lastIndexOf("\n") == ( tempVal.length - 1 ) )  tempVal = tempVal.substring(0,tempVal.length - 1);
          //alert("tempVal-5--|"+tempVal+"|===");
        }
        fieldValue=tempVal;
        var createFid = "LOOP_" + fieldName.substring(0, fieldName.indexOf("_LT"));
        var crtVal = $("#" + createFid).val();
        for (var k = crtVal; k >= 1; k--) {
            var delObj = "DEL_" + createFid + "_LT" + k;
            delSubLoop($("#" + delObj)[0]);
            $("#" + fieldName).val("");
        }
    
    if(rows==null || rows==""){
        rows=$("#" + fieldName).attr("rows");
    }
     if(cols==null || cols==""){
        cols=$("#" + fieldName).attr("rows");
    }
    var frows=fieldValue.split("\n");
    for(var i=0;i<frows.length;i++){
        while(frows[i].indexOf(" ")==0){
			frows[i]=frows[i].replace(" ","");
		}
    }
    rows=parseInt(rows);
    cols=parseInt(cols);
    var totalLen = rows * cols;
    if (frows.length<=rows && totalLen >= fieldValue.length){
       var str="";
	   for(var i=0;i<frows.length;i++){
	       str+=frows[i];
	       if( i != frows.length - 1 ) str += "\n";
	   }
	   $("#"+fieldName).val(str);
		return;
	 } 
 
var index=1;
var startIndex=0;
var endIndex=0;
var rowscout=0;
var tempstr="";
var substr = "";
for(var i=0;i<frows.length;){
  tempstr=substr;
  substr+=frows[i]+"\n";
  if(rowscout==0){
  //alert("tempstr=="+tempstr+"   substr="+substr+"  i="+i);
  }
  rowscout++;
  i++;
  if(substr.length<totalLen && rowscout<rows){
    //i++;
  }else if(substr.length==totalLen && rowscout<=rows){
   substr=substr.substring(0,substr.length-1)
    if(index==1){
      while(substr.indexOf(" ")==0){
					substr=substr.replace(" ","");
				}
            $("#" + fieldName).val(substr);
    }else if(substr != null && substr != "") {
        while(substr.indexOf(" ")==0){
					substr=substr.replace(" ","");
				}
          var newbtnid = "ADD_LOOP_" + fieldName.substring(0, fieldName.lastIndexOf("_"));
          newbtnid = newbtnid.replace("_LT1", "");
          addSubLoop($("#" + newbtnid)[0]);
          var newloopfieldId = fieldName.replace("LT1", "LT" + index);
          $("#" + newloopfieldId).val(substr);
    }
   // i++;
    index++;
    rowscout=0;
    substr="";
  }else if(substr.length>totalLen || rowscout>rows){
    substr=tempstr;
    substr=substr.substring(0,substr.length-1)
     if(index==1){
      while(substr.indexOf(" ")==0){
					substr=substr.replace(" ","");
				}
            $("#" + fieldName).val(substr);
    }else if(substr != null && substr != "") {
        while(substr.indexOf(" ")==0){
					substr=substr.replace(" ","");
				}
          var newbtnid = "ADD_LOOP_" + fieldName.substring(0, fieldName.lastIndexOf("_"));
          newbtnid = newbtnid.replace("_LT1", "");
          addSubLoop($("#" + newbtnid)[0]);
          var newloopfieldId = fieldName.replace("LT1", "LT" + index);
          $("#" + newloopfieldId).val(substr);
    }
     i--;
     index++;
    rowscout=0;
    substr="";
  }
}
 if (substr.length != 0 && substr!=" " && substr!="\n") {
       // index++;
        substr=substr.substring(0,substr.length-1)
        var newbtnid = "ADD_LOOP_" + fieldName.substring(0, fieldName.lastIndexOf("_"));
        newbtnid = newbtnid.replace("_LT1", "");
        addSubLoop($("#" + newbtnid)[0]);
        var newloopfieldId = fieldName.replace("LT1", "LT" + index);
        while(substr.indexOf(" ")==0){
		   substr=substr.replace(" ","");
		}
        $("#" + newloopfieldId).val(substr);
    }
}


function dftAtDetail(){
	var val=$("#DRAFTS_AT").val();
    if (val == null || val == "") {
        return;
    }
    
    var days = val.substring(0, val.indexOf(" "));
    if ((/^[0-9]{1,2}/).exec(days)) {
			var opts=$("#TENOR_TYPE"+" option");
			for(var j=0;j<opts.size();j++){
				var optVal=opts[j].value;
				if(val.indexOf(optVal)>-1){
					$("#TENOR_TYPE").val(optVal);
				}
			}
			$("#TENOR_DAYS").val(days);
        }
}
//???????
function sloopinit(){
   $("input[id^='ADD_MSLOOP']").unbind("click");
   $("input[id^='ADD_OSLOOP']").unbind("click");
   $("input[id^='DEL_MSLOOP']").unbind("click");
   $("input[id^='DEL_OSLOOP']").unbind("click");   
   $("input[id^='DEL_MSLOOP'][id$='SLT1']").attr("disabled",true);   
   $("input[id^='ADD_MSLOOP']").bind("click",function(){
      var sloopCreate=this.id.replace("ADD_","");
      var createNum=$("#"+sloopCreate).val();
      var newsloop=parseInt(createNum)+1;
      var showdivid=sloopCreate+"_SLT"+newsloop;
      if(typeof($("#"+showdivid)[0])=="undefined"){
        return;
      }
      divShow(showdivid,true);
      var delbtn=this.id.replace("ADD_","DEL_")+"_SLT"+createNum;
      $("#"+delbtn).attr("disabled",true);
      var newdelbtn=this.id.replace("ADD_","DEL_")+"_SLT"+newsloop;
      $("#"+newdelbtn).attr("disabled",false);
      $("#"+sloopCreate).val(newsloop+"");
   });
    $("input[id^='ADD_OSLOOP']").bind("click",function(){
       var sloopCreate=this.id.replace("ADD_","");
      var createNum=$("#"+sloopCreate).val();
      var newsloop=parseInt(createNum)+1;
      var showdivid=sloopCreate+"_SLT"+newsloop;
      if(typeof($("#"+showdivid)[0])=="undefined"){
        return;
      }
      var showdivid=sloopCreate+"_SLT"+newsloop;
      
      divShow(showdivid,true);
      var delbtn=this.id.replace("ADD_","DEL_")+"_SLT"+createNum;
      $("#"+delbtn).attr("disabled",true);
      var newdelbtn=this.id.replace("ADD_","DEL_")+"_SLT"+newsloop;
      $("#"+newdelbtn).attr("disabled",false);
      $("#"+sloopCreate).val(newsloop+"");
   });
   $("input[id^='DEL_MSLOOP']").bind("click",function(){
      var sloopCreate=this.id.replace("DEL_","");
      sloopCreate=sloopCreate.substring(0,sloopCreate.lastIndexOf("_"));
      var createNum=$("#"+sloopCreate).val();
      var newsloop=parseInt(createNum)-1;
      var minoccursid=sloopCreate+"_minOccurs";
      var minoccurs=$("#"+minoccursid).val();
      if(newsloop<parseInt(minoccurs)){
         return;
      }
      var showdivid=sloopCreate+"_SLT"+createNum;
      divShow(showdivid,false);
      $("#"+sloopCreate).val(newsloop+"");
       if(newsloop==parseInt(minoccurs)){
         return;
      }
      var currbtn=this.id.substring(0,this.id.lastIndexOf("_"))+"_SLT"+newsloop;
      $("#"+currbtn).attr("disabled",false);
   });
    $("input[id^='DEL_OSLOOP']").bind("click",function(){
      var sloopCreate=this.id.replace("DEL_","");
      sloopCreate=sloopCreate.substring(0,sloopCreate.lastIndexOf("_"));
      var createNum=$("#"+sloopCreate).val();
      var newsloop=parseInt(createNum)-1;
      var minoccursid=sloopCreate+"_minOccurs";
      var minoccurs=$("#"+minoccursid).val();
      if(newsloop<parseInt(minoccurs)){
         return;
      }
      var showdivid=sloopCreate+"_SLT"+createNum;
      divShow(showdivid,false);
      $("#"+sloopCreate).val(newsloop+"");
      if(newsloop==parseInt(minoccurs)){
         return;
      }
      var currbtn=this.id.substring(0,this.id.lastIndexOf("_"))+"_SLT"+newsloop;
      $("#"+currbtn).attr("disabled",false);
   });
   
   
}

//22C域拼写排序_b  modify by fanrui 2015-04-01
function CalCommRef(senderId, reciverId, exrateId){
	var commref="";
	var sender=$("#" + senderId).val();
    var reciver=$("#" + reciverId).val();
	var exrate="0000"+$("#" + exrateId).val();
	exrate=exrate.replace(new RegExp(",","gm"),"");
	exrate=exrate.replace(new RegExp("\\.","gm"),"");
	var temprate="";
	for(i=exrate.length;i>0;i--){
	   if(exrate.charAt(i)!=0){
	     temprate=exrate.substring(0,i+1);
	     break;
	   }
	}
	exrate=temprate.substring(temprate.length-4,temprate.length);
	var tempsnd=sender.substring(0,4)+sender.substring(6,8);
	var temprcv=reciver.substring(0,4)+reciver.substring(6,8);
	var before = tempsnd;
	var end = temprcv;
	if(tempsnd>temprcv){
		before = temprcv;
		end = tempsnd;
	}
	commref=before+exrate+end;
	$("input[id^='MT'][id$='_F22C']").val(commref);
}
//22C域拼写排序_e  modify by fanrui 2015-04-01


////????????? 
 function strTrim(str){
    var len = str.length;
    var st = 0;
    var off = len-1;
    var tmpst = str.charAt(st);
    var tmpoff = str.charAt(off);
    while (st < len && tmpst == " ") {
        st++;
        tmpst = str.charAt(st);
    }
    while (off < len && tmpoff == " ") {
        off--;
        tmpoff = str.charAt(off);
    }
    if (st > 0 || off < len) {
        str = str.substring(st, off);
    }
    return str;
}

//??????"\n"??
function strTrimn(tVal){
  var len=tVal.length;
	var off=len;
	var num=0;
	var tmpoff = tVal.charAt(off-1);
	 while (off <= len && tmpoff == "\n") {
	    off--;
		num++;
	    tmpoff = tVal.charAt(off-1);
	 }
	if(num>=1){
		tVal=tVal.substring(0,len-num-1);
	}
	return tVal;
}


function addsubFieldInit(othField,createdIndex){
   var newDiv=$("#"+othField.id).find("[id*='"+createdIndex+"']");
   for(var i=0;i<newDiv.size();i++){
      var divId=$("div[id='"+newDiv[i].id+"']")[0];
      if(typeof(divId)!="undefined"){
         divId=divId.id;
          var disply=$("#"+divId).css("display");
         if(disply=="none"){
          divSubFieldShow(divId, false);
         }
      }
      
      if(newDiv[i].id.indexOf("TAG_")==0){
           if (newDiv[i].value != '') {
            getSwiftTagDIV(newDiv[i]);
         }
      }
   }
   var objcomFields=$("div[id^='DIV_COM'][id*='"+createdIndex+"']");
   for(var m=0;m<objcomFields.size();m++){
      var comFields=$("#"+objcomFields[m].id) .find("[id]");
        var str = "";
        for (var j = 1; j < comFields.size(); j++) {
            var comField = comFields[j];
            var comFieldValue = $("#" + comField.id).val();
            str += comFieldValue;
            if (str != "") 
                break;
        }
        if (str != "" ) {
            swiftComFieldShow(comFields[1], true);
        }
       else if (str=="" && ($("#"+comFields[0].id).attr("mop")=="O" || $("#"+comFields[0].id).attr("mop")=="")){
            swiftComFieldShow(comFields[1], false);
        }
	   comFields.bind("change",function(){
	        swiftComField(this);
	   });
   
      }
}


function divSubFieldShow(divname, isshow){
    if (isshow) {
        var objchild = $("#" + divname).find("[id]");
        var pMop="M";
        for (var j = 0; j < objchild.size(); j++) {
            var childClass = $("#" + objchild[j].id).attr("class");
            var mop = $("#" + objchild[j].id).attr("mop");
            
             var pid="COM_"+objchild[j].id.substring(0,objchild[j].id.lastIndexOf("_"));
                if(typeof($("#"+pid).attr("class"))!="undefined"){
                  pMop = getMOP($("#"+pid)[0]);
                 }else{
                   pMop="M";
                   $("#"+pid).val("YES");
                    $("#" + pid).attr("class","CHAR M");
                 }
                  var pid="DIV_"+objchild[j].id.substring(0,objchild[j].id.lastIndexOf("_"));
                  if(typeof($("#"+pid).css("display"))!="undefined"){
                    if($("#"+pid).css("display")=="none"){
                      pMop="O";
                    }else{
                       // if($("input[id='"+pid+"']"))
                    }
                  
                 }
            if (childClass && mop == "M" && pMop=='M') {
                setProperty($("#" + objchild[j].id)[0], "M")
            }
        }
    }
    else {
    
        var objchild = $("#" + divname).find("[id]");
        for (var j = 0; j < objchild.size(); j++) {
            var mop = getMOP($("#" + objchild[j].id)[0]);
            if (childClass && mop == "M") {
                setProperty($("#" + objchild[j].id)[0], "O");
                if(objchild[j].id.indexOf("COM_")==0){
                  $("#"+objchild[j].id).val("");
                }
            }
        }
    }
}


function getSubSeqChk(){
  var seqchkboxs=$(swiftPrivateObj.swiftDivs).find("input:checkbox[id^='SSEQ_MT']");
  for(var i=0;i<seqchkboxs.size();i++){
     var seqchkbox=seqchkboxs[i].id;
     var ischked=$("#"+seqchkbox).attr("checked");
     if(ischked){
        var showdivid="DIV_"+seqchkbox;
        divShow(showdivid,true);
     }
  }
}

//将swiftField数组中 栏位赋为保护项，如果有值
function setSwiftFieldProtect(swiftField){
 	var dMsgId = $('#DEMERGE_MSGID')[0] ;
 	if(dMsgId){
 		for(var i=0 ; i < swiftField.length ; i++ ){
 			var sfv = $('#'+swiftField[i]).val() ;
 			if(sfv)
 				setProtect( $('#'+swiftField[i])[0] );
 		}
 	}
}

/*
UTAN-FINWARE_V3.5_TFS_2013120008
xuh 2013.05.20
函数介绍：对总共出现的循环域中内容进行重新计算，重新分配
输入参数： MT报文类型,例如:799; 循环域字段,例如:79; 循环域最大文本行数,如:35
输出参数： 无
返回值 ： 无
*/
function doCircle(mttype,fieldname,rounum,collength){
	//取出所有循环域的值,拼在一起
	var max = document.getElementById("LOOP_MT"+mttype+"_Loop1").value;
	var value = '';
	for(var k=1;k<=max;k++){
		  var f79 = document.getElementById("MT"+mttype+"_Loop1_LT"+k+"_"+fieldname);
		  if(f79!=null &&f79.value){
			  var f79value = f79.value;
			  f79value = f79value.replace(/[\r\n]+$/, "");  //去掉最后的回车换行,IE7,IE8必须要去掉
			  
			  if(k!=max){
				 value += f79value+'\n';
			  }else{
				  value += f79value;
			  }
			  document.getElementById("MT"+mttype+"_Loop1_LT"+k+"_"+fieldname).value="";
		 }
	}
	if(value){  //如果总的值超过最大行数,需要自动触发新增循环域
		 //如果是手工输入，没有回车换行符，强制将字符串转成带\n的
		 value = strToStrwithEnter(value,collength);
		 var length = value.split("\n").length;
		 //alert('原始行数'+length);
		 //如果是第一行，并且数据超过1行，要在第一行最后增加/CONTINUE/
		 //如果是最后一行，并且数据超过1行，要在最后一行前增加/CONTINUE/
		 // if(length >rounum){
		 var floor = Math.floor(length/rounum)+1;  //取到总共需要出现的循环域个数
		 
		 var realFloor;
		 var realLength;
		 if(floor==1){
			 realLength = length;
			 realFloor = 1;
		 }else if(floor==2){
			 realLength = length+2;
			 realFloor = Math.floor(realLength/rounum)+1
		 }else if(floor>=3){
			 realLength = (floor-2)*2+2+length;
			 if((length-rounum+1)%(rounum-2)==0){
				 realFloor = 1+Math.floor((length-rounum+1)/(rounum-2));
			 }else{
				 realFloor = 1+Math.floor((length-rounum+1)/(rounum-2))+1;
			 }
			 
		 }
//		 alert('总共'+length+'行');
//		 alert('总共应该出现'+realFloor+'个循环域');
		 
		 if(floor-max>0){
			 for(var mm=max*1+1;mm<=realFloor;mm++){
				  addSubLoop(document.getElementById("ADD_LOOP_MT"+mttype+"_Loop1"));
			 }
		 }
		
		 //alert('总共'+realFloor+'个循环域');
		 if(realFloor==1){
			 var oneValue  = getSerRowData(value,0,rounum-1);
			 $("#MT"+mttype+"_Loop1_LT1_"+fieldname).val(oneValue);
		 }else if(realFloor>=2){
			 for(var i=1;i<=realFloor;i++){
				 var oneValue  = '';
				 if(showContinueFlag){
					 if(i==1){
						 oneValue = getSerRowData(value,0,rounum-1-1)+'\n'+__CONTINUESTR;
					 }else if(i==realFloor){
						 var begin = rounum-1 + (realFloor-2)*(rounum-2);
						 var end  = rounum-1 + (realFloor-2)*(rounum-2)+ rounum-1;
						 oneValue = __CONTINUESTR+'\n'+getSerRowData(value,begin,end);
					 }else{
						 var begin = rounum-1-1+1 + (i-2)*(rounum-2);
						 var end  = rounum-1-1 + (i-1)*(rounum-2);
						 //alert('开始'+begin+' 结束'+end+'  总共'+length);
						  oneValue = __CONTINUESTR+'\n'+getSerRowData(value,begin,end)+'\n'+__CONTINUESTR;
					 }
				 }else{
					 oneValue = getSerRowData(value,(i-1)*rounum,i*rounum-1);
				 }
				 $("#MT"+mttype+"_Loop1_LT"+i+"_"+fieldname).val(oneValue);
		 	}
		 }
		 
		 
		 //}
	}
	 //检查是否有空循环域，有则删除  MT799_Loop1_LT2_F79   MT799_Loop1_LT3_F79 delSubLoop  DEL_LOOP_MT799_Loop1_LT2
	delNonfiled(mttype,fieldname);
}
/*
UTAN-FINWARE_V3.5_TFS_2013120008
xuh 2013.05.20
函数介绍：取得一个包含换行字符串的第beginrow行到endrow行的数据
输入参数： value:字符串, beginrow:起始行, endrow:结束行
输出参数： 无
返回值 ： 字符串
*/
function getSerRowData(value,beginrow,endrow){
	var returnValue = "";
	if(value!="" && value.indexOf("\n")!=-1){
		var split = value.split("\n");
		var end = endrow-(split.length-1)>0?split.length-1:endrow;
		for(var i=beginrow;i<=end ;i++){
			if(i==end){
				returnValue += split[i];
			}else{
				returnValue += split[i]+"\n";
			}
		}
	}else if(value!="" && value.indexOf("\n")==-1){
		returnValue = value;
	}
	return returnValue;
}

/*
UTAN-FINWARE_V3.5_TFS_2013120008
xuh 2013.05.20
函数介绍：删除一个页面上没有任何内容的循环域
输入参数： mttype:报文类型,  fieldname:循环域字段名称
输出参数： 无
返回值 ： 无
*/
function delNonfiled(mttype,fieldname){
	 var m = document.getElementById("LOOP_MT"+mttype+"_Loop1").value;
	 for(var k=m;k>1;k--){
		  var f79 = document.getElementById("MT"+mttype+"_Loop1_LT"+k+"_"+fieldname);
		   if(f79!=null && !f79.value){
			 delSubLoop(document.getElementById("DEL_LOOP_MT"+mttype+"_Loop1_LT"+k));
		 }
	 }
}

/*
UTAN-FINWARE_V3.5_TFS_2013120008
xuh 2013.05.20
函数介绍：清空页面上除第一个循环域之外的循环域（业务页面给报文页面赋值的时候只默认给第一个循环域赋值）
输入参数： mttype:报文类型,  fieldname:循环域字段名称
输出参数： 无
返回值 ： 无
*/
function emptyCirclefield(mttype,fieldname){
	if(typeof $("#LOOP_MT"+mttype+"_Loop1").attr("class")=="undefined"){
		return;
	}
	var m = document.getElementById("LOOP_MT"+mttype+"_Loop1").value;
	 for(var k=2;k<=m;k++){
		  var f79 = document.getElementById("MT"+mttype+"_Loop1_LT"+k+"_"+fieldname);
		  $("#MT"+mttype+"_Loop1_LT"+k+"_"+fieldname).val('');
	 }
}


/*
xuh 2013.05.20
函数介绍：境内外币报文校验
输入参数： fmttype:报文类型
输出参数： 无
返回值 ： 无
*/
function checkDependFiled( msgtype){
	var FMT_F33B_1 = $('#FMT'+msgtype+'_F33B_1').val();
	if(FMT_F33B_1!=null&&FMT_F33B_1!=''){
		var FMT_F33B_2= $('#FMT'+msgtype+'_F33B_2').val();
		if(FMT_F33B_2==null||FMT_F33B_2==''){
			alert('F33B域的金额必须输入!');
			return false;
		}
	}
	var FMT_F71G_1 = $('#FMT'+msgtype+'_F71G_1').val();
	if(FMT_F71G_1!=null&&FMT_F71G_1!=''){
		var FMT_F71G_2= $('#FMT'+msgtype+'_F71G_2').val();
		if(FMT_F71G_2==null||FMT_F71G_2==''){
			alert('F71G域的金额必须输入!');
			return false;
		}
	}
	return true;
}

/*
UTAN-FINWARE_V3.5_TFS_2013120008
xuh 2013.07.24
函数介绍：对输入循环域的内容进行处理，按照每行的最大长度进行分行
输入参数： value：输入内容，collength:每行最大长度
输出参数： 无
返回值 ： 无
*/
function strToStrwithEnter(value,collength){
	var newValue = "";
	if(value.length>collength){
		while(true){
			var reg=/^\n/;  
			if(reg.test(value)){
				value = value.replace(/^[\r\n]+/, "");
			}
			var onerow = value.substring(0,collength);
//			if(onerow.length==collength){
//				onerow = 
//			}
			if(onerow.indexOf("\n")!=-1){
				onerow = value.substring(0,value.indexOf("\n"));
			}
			
			var nextStr = value.substring(collength);
			//判断最后一个字符是否是字母或者金额，如果是字母，且另一行开头也是字母
			var reg = /^[a-zA-Z0-9\.\,\-]$/;
			if(onerow.length==collength && reg.test(onerow.charAt(onerow.length-1)) && reg.test(nextStr.charAt(0)) &&onerow.indexOf(" ")!=-1){
				onerow = onerow.substring(0,onerow.lastIndexOf(" "));
			}
			
			var reg2 = /^[\r\n]$/;
			if(onerow!="" && !reg2.test(onerow)){
				//去掉所有的/CONTINUE/
				if(onerow.indexOf(__CONTINUESTR)!=-1 || onerow=='\r\n' ||onerow=='\n'){
					//
				}else{
					var regHG = /^[\-]*$/;
					if(regHG.test(onerow)){ //如果一行全部是- 前面加空格
						newValue += " "+onerow+"\n";
					}else{
						newValue += onerow+"\n";
					}
				}
			}
			value = value.substring(onerow.length,value.length);
			value = value.replace(/^\s*/, "");   //把每行开头的空格去掉
			//value = $.trim(value);
			if(value.length<=collength && value.indexOf("\n")==-1){
				newValue += value;
				break;
			}
		}
		newValue = newValue.replace(/[\r\n]+$/, "");
	}else{
		newValue = value;
	}
	return newValue;
}

//**************************************************升级新加部分*************************************************//

/**
 * 页面中循环域，新增按钮事件
 * @param {Object} fn
 */
addSubLoop.afterList = [];
addSubLoop.after = function(fn)
{
	addSubLoop.afterList.push(fn);
}

/**
 * 设置属性，该方法将JQUERY对象转换成HTML对象后再进行属性设置
 * @param {Object} obj 必须是JQUERY对象
 * @param {Object} property M|O|P
 */
function setProperty_swift(obj,property)
{
	if(property != "" && property == "P"){
		obj.val("");
	}
	setProperty(obj[0],property);
}

/**
 * 校验规则类
 * @param {Object} mtName 报文名称
 * @memberOf {TypeName}   
 * @return {TypeName} 
 */
function swift(mtName) 
{
   this.type = mtName;
   var out = this;
   var ret;
   this.rule = function(funName) 
   {
	  ret = funName.apply(out,Array.prototype.slice.call(arguments, 1));
	  return ret;
   }
}

/**
 * 该方法用于MTs 540, 541, 544, and 545报文中E区E1，C95字段中Qualifier的值 
 * @param {Object} divs 由于该处下比较特殊，需要传递该处所有子项的DIV，具体可以参考MT540
 * @return {TypeName} 返回数组
 */
function getMT540sC95_Qualifier(divs)
{
	var num = 0;
	var arrays = new Array();
	//遍历DIV
	$(divs).each(function(i,t){
		//判断当前选中的DIV
		if($(this).css("display") == "block"){
			arrays[num] = $(this).children().get(0).value;
			num ++;
		}
	});
	
	return arrays;
}


function viewAssocMsgInfo(){
		var msgId = document.UTFORM.ASSOC_MSGID.value ;
		if(!msgId){
			alert("没有关联的报文!");
			return;
		}
		var singleSelect = "MSGID='"+msgId+"'";
		var sURL = "/UtanWeb/MainServlet?TASKNAME=INQUIRE_MSG&TASKTYPE=DO_BEGIN&SINGLESELECT="+singleSelect ;
		window.open(sURL,"WIN_"+msgId,"width=600,height=400,left=100,top=100,scrollbars=yes,titlebar=yes,toolbar=yes,menubar=yes");	
		
}
