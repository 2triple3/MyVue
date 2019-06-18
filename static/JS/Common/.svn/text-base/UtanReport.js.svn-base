/**
 * 报表处理
 */

function readXMLURL(){

if(typeof UTANREPORT_URL=="undefined"){
 $.ajax({
                url: '/UtanWeb/CommUtilServlet?OPERTYPE=UTANREPORTURL',
                type:'POST',
                async:false,
                error:function(){
                    return ;
                },
                success: function(response){
                   UTANREPORT_URL = response;
                   // 历史信息查看输出面函访问不了问题修复 hh
					var orgid = window.top.document.getElementById("ORGID");
					if (!orgid) {
						orgid = "";
					} else {
						orgid = orgid.value;
					}
					var userid = window.top.document.getElementById("USERID");
					if (!userid) {
						userid = "";
					} else {
						userid = userid.value;
					}
					// 历史信息查看输出面函访问不了问题修复 hh
                   UTANREPORT_URL += "/ReportLog?USER_ORGID="+orgid+"&USER_USERID="+userid;
                }
            });
}
    return UTANREPORT_URL;
}

function getXMLUploadPath(uploadType){

if(typeof upload_Path=="undefined"){
 $.ajax({
                url: '/UtanWeb/CommUtilServlet?OPERTYPE=UPLOADPATH&UPLOADTYPE='+uploadType,
                type:'POST',
                async:false,
                error:function(){
                    return ;
                },
                success: function(response){
                   upload_Path = response;
                }
            });
}
    return upload_Path;
}
// 此处为复制CommonFun.js中的fireEvent方法,供报表"查看全部"调用
// 合理方法为,在每个查看报表的地方引入CommonFun.js文件,但是这样改动较大,且不利于换版,故先如此处理
function fireEvent(obj, eventType){
	eventType = eventType.toLowerCase();
    if($.browser.msie){
        obj.fireEvent("on"+eventType);
    } else {
        var e = document.createEvent("MouseEvent");
        e.initEvent(eventType);
        obj.dispatchEvent(e);
    }
}