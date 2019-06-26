<template>

  <div class="ui-layout-west" >

		<ul class='TabBarLevel1' id='TaskListMenu'>
			<li id='task_use' class='shows'><a v-on:click="switchTab('task_use','commonTask')" style='cursor:hand;' >常用</a></li>
			<li id='task_all' class='Selected'><a v-on:click="switchTab('task_all','startTask')" style='cursor:hand;' >开始</a></li>
		</ul>

		<div id="rightmenu" style = "width:100%;overflow: auto;white-space: nowrap"  align="left"  >
			<div class="tabcon" id = "commonTask" style="display:none">

			</div>
			<div class="tabcon" id = "startTask" style='display:block'>

			</div>
		</div>

		<input type="hidden" name="startTaskisLoad"  id="startTaskisLoad"/>
		<input type="hidden" name="commonTaskisLoad"  id="commonTaskisLoad"/>

  </div>
</template>


<script>
//import {dTree,ddd} from './../assets/JS/Common/dtree.js'
//export let d = new dTree('d');
//export let commonDtree = new dTree('commonDtree');

export default {

  name: 'main-left',

  created:function(){
      //alert(window.location.href);
   	  //let ckeditor = document.createElement('script');    
      //ckeditor.setAttribute('type',"text/javascript");
      //ckeditor.setAttribute('src',"../../static/dtreet.js");
	  //document.head.appendChild(ckeditor);
  },

  data(){
  		var d1 = new dTree('d');
  		var commonDtree1 = new dTree('commonDtree');
		return{
            d:d1,
			commonDtree:commonDtree1
		}
  },

  mounted(){
	  $(function () {  
	    console.log("测试jquery引入成功");
	  }); 
      //ddd();
      this.setMenuTree('startTask');
	  this.setMenuTree('commonTask');
  },

  components: {
   'remote-js': {
	    render(createElement) {
	      return createElement('script', { attrs: { type: 'text/javascript', src: this.src }});
	    },
	    props: {
	      src: { type: String, required: true },
	    },
  	},
  },

  methods:{

  		setMenuTree(type){
  		    
			if(type=='commonTask'){
				var ss = [ {TASKNAME:"11",PARAMCHDESC:"吃饭",TASKTYPE:"33"},{TASKNAME:"11",PARAMCHDESC:"睡觉",TASKTYPE:"33"},{TASKNAME:"11",PARAMCHDESC:"打豆豆",TASKTYPE:"33"} ];
				var taskName = "", taskDesc="", taskType="";
	             commonDtree.add(0,-1,'我的常用任务');
	             for(var i=0;i<20;i++){
	            	var hmVal = ss[i];
	            	if(typeof hmVal=="undefined"){
	            		break;
	            	}
	            	taskName = hmVal.TASKNAME;
	                taskDesc = hmVal.PARAMCHDESC;
	                taskType = hmVal.TASKTYPE;
	                commonDtree.add(i+1,0, taskDesc,"doInitTask('" + taskName + "','" + taskType + "')");
	            }				
				document.getElementById("commonTaskisLoad").value="YES";
				document.getElementById(type).innerHTML=(commonDtree.toString());
			}else if(type=='startTask'){
                d.add(0,-1,'我的开始任务');
				var trxName = "", trxDesc = "", grpName = "", grpDesc = "", taskName = "", taskDesc = "", taskType = "";
	            var trxTemp = "", grpTemp = "";
	            var m = 1, n = 0, p = 1;
				var ss = [ 
				{TRXNAME:"A",TRXCHDESC:"a",GRPNAME:"AA",GRPCHDESC:"aa",TASKNAME:"AAA",TASKDESC:"aaa",TASKTYPE:"33"},
				{TRXNAME:"B",TRXCHDESC:"b",GRPNAME:"BB",GRPCHDESC:"bb",TASKNAME:"BBB",TASKDESC:"bbb",TASKTYPE:"33"},
				{TRXNAME:"C",TRXCHDESC:"b",GRPNAME:"CC",GRPCHDESC:"cc",TASKNAME:"CCC",TASKDESC:"ccc",TASKTYPE:"33"} 
				];
				for(var i=0;i<ss.length;i++){
					   var hm_val = ss[i];					
					   trxName = hm_val.TRXNAME;
	                   trxDesc = hm_val.TRXCHDESC;
	                   grpName = hm_val.GRPNAME;
	                   grpDesc = hm_val.GRPCHDESC;
	                   taskName = hm_val.TASKNAME;
	                   taskDesc = hm_val.TASKDESC
	                   taskType = hm_val.TASKTYPE;
	                   if (trxTemp!=trxName) {
	                       d.add( p ,0, trxDesc );
	                       trxTemp = trxName;
	                       m = p;
	                       p++;
	                   }
	                   if (trxTemp==trxName && grpTemp!=grpName) {
	                   	   d.add( p , m ,grpDesc );
	                       grpTemp = grpName;
	                       n = p;
	                       p++;
	                   }
	                   if (trxTemp==trxName && grpTemp==grpName) { 

	                   	   d.add( p , n, taskDesc ,"doInitTask('" + taskName + "','" + taskType + "')");
	                       p++;
	                       //console.log("p==="+p+"===n==="+n+"===taskDesc==="+taskDesc+"======");
	                   }
				}
				//console.log(d.toString());
				document.getElementById("startTaskisLoad").value="YES";
				document.getElementById(type).innerHTML=(d.toString());
			}

		},

		switchTab(tabid,divId){
				var oItem = document.getElementById('TaskListMenu');
				for(var i=0;i<oItem.children.length;i++){
					var x = oItem.children[i];	
					if(x.className=='Selected')
						x.className = "";
					try{
						var y = x.getElementsByTagName('a');
					}catch(error){}			
				}	
				document.getElementById(tabid).className = "Selected";
				
				if( divId == "startTask" ){
					document.getElementById('startTask').style.display='block';
					document.getElementById('commonTask').style.display='none';
				}else if( divId == "commonTask" ){
					document.getElementById('startTask').style.display='none';
					document.getElementById('commonTask').style.display='block';
				}
		}

  },

}
</script>
<style scoped>

  @import url('../../assets/css/dhtmlxtree_std.css');
  @import url('../../assets/css/utanstyle.css');


</style>