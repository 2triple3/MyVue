/**
 * 消息处理
 */

function msgshow(title,msg)
{
 alert("======msgshow=====");
      //var d_mask=document.getElementById('mask');
     // var d_dialog = document.getElementById('dialog');
    // var d_mask=$("#mask");
     //var d_dialog=#("#dialog");
     //var d_mask=$(window).width() ;
    
      // d_mask
      var w_width=$(window).width();
      var w_height=$(window).height();
      // $("#mask").css("width",'500px');
      //  $("#mask").css("height",'600px');
        alert(w_width+"=="+w_height);
     //var d_dialog=#("#dialog");
     // d_mask.style.width = document.body.clientWidth ;
     // d_mask.style.height=document.body.clientHeight;
       //alert("document.body.clientWidth="+document.body.clientWidth+"==document.body.clientHeight="+document.body.clientHeight);
       $("#dialog").css("top",w_width/2-60);
        $("#dialog").css("left",w_height/2-100);
     // d_dialog.style.top = document.body.clientHeight / 2 - 60;
      //d_dialog.style.left =document.body.clientWidth / 2 -100;
   
      var Inner = "<input type='button' value='Close' onclick='DialogClose()'/>"
       alert("==========beging=============");
      var info = "<table cellspacing='0' width='100%' height='100%'>"+
      "<tr class='dgtitle'><td><img src='info.gif'/>"
      +title
      +"</td><td align='right'><img    src='close1.gif' onclick='DialogClose()' onmouseover='Icon_Close_Over(this)' onmouseout='Icon_Close_Out(this)'/></td></tr>"
      +"<tr><td colspan='2'><img src='i.gif'/>"
      +msg
      +"</td></tr>"
      +"<tr class='dgfooter'><td></td><td>"
      +"<center><input type='button' value='Close' onclick='DialogClose()'class='formButton'/></center>"
      +"</td></tr>"
      +"</table>";
       alert("=======info="+info+"=========");
       $("#dialog").html(info);
     // d_dialog.innerHTML =info;
     
       disableSelect();
       $("#mask").css("display","block");
        $("#dialog").css("display","block");
     //d_mask.style.visibility='visible';
     // d_dialog.style.visibility='visible';
   
}

function Icon_Close_Over(obj)
{
      obj.src='close.gif';
}

function Icon_Close_Out(obj)
{
      obj.src='close1.gif'
}

function DialogClose()
{
      var d_mask=document.getElementById('mask');
      var d_dialog = document.getElementById('dialog');
    
   
      enableSelect()
      d_mask.style.visibility='hidden';
      d_dialog.style.visibility='hidden';
}

function disableSelect()
{      
          var elemtchildren=$("#t_issuemsg").find("[id]");
          alert(elemtchildren.size());
          for(i=0;i<elemtchildren.size();i++){
               var childelemt=elemtchildren[i];
               alert(childelemt.id);
               $("#"+childelemt.id).attr("disabled",true);
          }  
}

function enableSelect()
{
         var elemtchildren=$("#t_issuemsg").find("[id]");
          for(i=0;i<elemtchildren.size();i++){
               var childelemt=elemtchildren[i];
               $("#"+childelemt.id).attr("disabled",true);
          }  
}  

function divBlock_event_mousedown()
{
var e, obj, temp;
obj=document.getElementById('dialog');  
e=window.event?window.event:e;
obj.startX=e.clientX-obj.offsetLeft;  
obj.startY=e.clientY-obj.offsetTop;  
document.onmousemove=document_event_mousemove;  
temp=document.attachEvent?document.attachEvent('onmouseup',document_event_mouseup):document.addEventListener('mouseup',document_event_mouseup,'');
}
  
  
function document_event_mousemove(e)
{
var e, obj;  
obj=document.getElementById('dialog');
e=window.event?window.event:e;   
with(obj.style){  
      position='absolute';  
      left=e.clientX-obj.startX+'px';  
      top=e.clientY-obj.startY+'px';
      }
}

function document_event_mouseup(e)
{
var temp;
document.onmousemove='';
temp=document.detachEvent?document.detachEvent('onmouseup',document_event_mouseup):document.removeEventListener('mouseup',document_event_mouseup,'');
}


window.onresize = function()
{
      var d_mask=document.getElementById('mask');
      var d_dialog = document.getElementById('dialog');
    
   
      d_mask.style.width = document.body.clientWidth ;
      d_mask.style.height=document.body.clientHeight;
}


function showModel()
{
     divModalDialog.style.display = "block";
     resizeModal();
     window.onresize = resizeModal;
doSelect("hidden");
}
function closeModel()
{
     divModal.style.width = "0px";
     divModal.style.height = "0px";
     divModalDialog.style.display = "none";
     window.onresize = null;
doSelect("visible");
}
function doSelect(status)
{
var allObj=document.getElementsByTagName( "select"); 
for(i=0;i<allObj.length;i++){   
   if(allObj[i].getAttribute("hide")!="true"){   
    allObj[i].style.visibility=status;
   }
}
}
function resizeModal()
{
     divModal.style.width = document.body.scrollWidth;
     divModal.style.height = document.body.scrollHeight;
     divModalDialog.style.left = ((document.body.offsetWidth - divModalDialog.offsetWidth) / 2);
     divModalDialog.style.top = ((document.body.offsetHeight - divModalDialog.offsetHeight) / 2);
}
var mouseOffset = null;   
var iMouseDown = false; 
function mouseMove(ev){   
    ev = ev || window.event;   
    var mousePos = mouseCoords(ev);
    if(iMouseDown){
        divModalDialog.style.left = mousePos.x-mouseOffset.x;
        divModalDialog.style.top = mousePos.y-mouseOffset.y;
    }
}
function mouseUp(ev){     
iMouseDown = false;   
}   

function mouseDown(ev){ 
    ev = ev || window.event; 
    var target = ev.target || ev.srcElement;   
if(target.getAttribute("id") == "title"){   
    iMouseDown = true; 
    mouseOffset = getMouseOffset(target,ev);
}   
} 

function mouseCoords(ev) {   
if(ev.pageX || ev.pageY) {   
    return {x:ev.pageX, y:ev.pageY};   
}   
return {   
    x:ev.clientX + document.body.scrollLeft - document.body.clientLeft,   
    y:ev.clientY + document.body.scrollTop - document.body.clientTop   
};   
}

function getMouseOffset(target, ev) {   
ev = ev || window.event;   
var docPos = getPosition(target);   
var mousePos = mouseCoords(ev);   
return {x:mousePos.x - docPos.x, y:mousePos.y - docPos.y} ;   
} 

function getPosition(e) {   
   var left = 0;   
   var top = 0;   
   while (e.offsetParent) {   
     left += e.offsetLeft;   
     top += e.offsetTop;   
     e = e.offsetParent;   
}   
left += e.offsetLeft;   
top += e.offsetTop;   
return {x:left, y:top} ;   
} 

document.onmousemove = mouseMove;   
document.onmousedown = mouseDown;   
document.onmouseup = mouseUp; 

