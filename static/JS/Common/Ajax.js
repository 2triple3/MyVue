
/**
 * Ajax通讯
 * <p>Description: </p>
 * <p>Copyright: Copyright (c) xio.name 2006</p>
 * @author xio
 */
function Ajax() {
}
Ajax.prototype = new Object();
Ajax.prototype.loadXMLHttpRequest = function (url, method, params) {
    var httpRequest = Ajax.createHttpRequest();
    var ajax = this;
    httpRequest.onreadystatechange = function () {
        ajax.onReadyStateChange(httpRequest);
    };

    //
    method = method.toUpperCase();
    if (method == "GET") {
        httpRequest.open(method, url + "?" + params, true);
        httpRequest.setRequestHeader("Content-Type", "text/html;charset=utf-8");
        params = "";
    } else {
        httpRequest.open(method, url, true);
        httpRequest.setRequestHeader("Method", "POST " + url + " HTTP/1.1");
        httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    }

    //
    httpRequest.send(params);
};

Ajax.prototype.loadSyncXMLHttpRequest = function (url, method, params) {
	var httpRequest = Ajax.createHttpRequest();
    var ajax = this;
    httpRequest.onreadystatechange = function () {
        ajax.onReadyStateChange(httpRequest);
    };

    //
	method = method.toUpperCase();
    if (method == "GET") {
        httpRequest.open(method, url + "?" + params, false);
        httpRequest.setRequestHeader("Content-Type", "text/html;charset=utf-8");
        params = "";
    } else {
        httpRequest.open(method, url, false);
		httpRequest.setRequestHeader("Method", "POST " + url + " HTTP/1.1");
        httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    }

    //
    httpRequest.send(params);
    return httpRequest.responseText;
};

Ajax.prototype.onReadyStateChange = function (httpRequest) {
    if (httpRequest.readyState == 4) {
        if (httpRequest.status == 200) {
            this.processXMLHttpRequest(httpRequest);
            try{
	            if(loadData != null && loadData == 'true')
	            {
		            alert("" + httpRequest.responseText);
		            if(processBar!=undefined && processBar!=null) 
		            {  
		                 processBar.stop();
		    		}
	    		}
	    	}catch(e){}
	    	try{
    		    if(queryData != null && queryData == 'true')
	    		{	    		    	    		     
	    		      var resultObj = document.getElementById("RESULTDIV");
	    		    if(httpRequest.responseText.length > 10)
	    		       resultObj.innerHTML = httpRequest.responseText;
	    		    else
	    		    {
	    		       resultObj.innerHTML = "无数据!";
	    		       alert("无数据!");
	    		    }
	    		    if(processBar!=undefined && processBar!=null) 
		            {  
		                 processBar.stop();
		    		}

	    		}
    		}catch(e){}
        }
    }
};
Ajax.prototype.processXMLHttpRequest = function (httpRequest) {
};
Ajax.createHttpRequest = function () {
	 
    var httpRequest = false;
 
    if (window.XMLHttpRequest) {  
        httpRequest = new XMLHttpRequest();
        if (httpRequest.overrideMimeType) { 
            httpRequest.overrideMimeType("text/xml");
        }
    } else {
        if (window.ActiveXObject) {  
            try {
                httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
            }
            catch (e) {
                try {
                    httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
                }
                catch (e) {
                }
            }
        }
    }
    if (!httpRequest) {  
        window.alert(" ss");
        return false;
    }
    return httpRequest;
};

//
Ajax.READY_STATE_UNINITIALIZED = 0;
Ajax.READY_STATE_LOADING = 1;
Ajax.READY_STATE_LOADED = 2;
Ajax.READY_STATE_INTERACTIVE = 3;
Ajax.READY_STATE_COMPLETE = 4;

//c http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html
Ajax.HTTP_RESPONSE_STATUS_OK = 200;

