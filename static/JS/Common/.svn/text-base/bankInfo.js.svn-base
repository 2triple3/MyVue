/**
 * 金宏单位基本情况表处理
 */

var bop_BRANCHCODE = "金融机构标识码";
var bop_CONTACT = "单位联系人";
var bop_TEL = "单位联系电话";
var bop_FAX = "单位传真";
	var scrWidth = (document.body.clientWidth) - 35;
	var bankInfoGridId = 1;
	var currRowIdBK ;
	var currColId ;
	var currRowData;

	function createBankInfoTable(editableFlag)
		{
			if(editableFlag!==false) {
				editableFlag = true; // 默认true
			}
			jQuery("#CURRBANKINFO").jqGrid({
				datatype: "local",
				rownumbers:true,
				width:scrWidth,
		    //height:110,
				altclass:'ui-priority-secondary',
				sortable:false,
				pager: '#BANKINFOTOOLBAR',
				pgbuttons:false,
				pginput:false,
				editable:editableFlag,
				viewrecords: true,
				forceFit : true,
		   		colNames:[bop_BRANCHCODE,bop_CONTACT, bop_TEL, bop_FAX],
		   		colModel:[
			   		{name:'BRANCHCODE',index:'BRANCHCODE',editable:editableFlag},
			   		{name:'CONTACT',index:'CONTACT',editable:editableFlag},
			   		{name:'TEL',index:'TEL',editable:editableFlag},
			   		{name:'FAX',index:'FAX',editable:editableFlag}	
		   		],
				onSelectRow: function(rowId,status){
					if(rowId && status){
						currRowData = jQuery('#CURRBANKINFO').jqGrid('getRowData',rowId);
						currRowIdBK = rowId;
						currColId = 1;
						saveAllBankInfo();
						editBankInfo();
					}
				}
				}).navGrid('#BANKINFOTOOLBAR',{edit:false,add:false,del:false,view:false,search:false,refresh:false});
				jQuery('#CURRBANKINFO')
						.jqGrid('navButtonAdd','#BANKINFOTOOLBAR',{
						    caption: '',
						    title: 'Add BankInfo Info',
							buttonicon:'ui-icon-plus',
							clickEnable:editableFlag,
						    onClickButton :function(){
								addBankInfo();
					    	}})
						.jqGrid('navButtonAdd','#BANKINFOTOOLBAR',{
							caption:'',
							title:'Del BankInfo Info',
							buttonicon:'ui-icon-minus',
							clickEnable:editableFlag,
							onClickButton : function (){
								delBankInfo();
					    	}})
						.jqGrid('navButtonAdd','#BANKINFOTOOLBAR',{
							caption:'',
							title:'Edit Row',
							buttonicon:'ui-icon-pencil',
							clickEnable:editableFlag,
							onClickButton : function (){
								editBankInfo();
					    	}})
						.jqGrid('navButtonAdd','#BANKINFOTOOLBAR',{
							caption:'',
							title:'Save Row',
							buttonicon:'ui-icon-disk',
							clickEnable:editableFlag,
							onClickButton : function (){
								saveBankInfo();
					    	}})
						.jqGrid('navButtonAdd','#BANKINFOTOOLBAR',{
							caption:'',
							title:'Cancle Save Row',
							buttonicon:'ui-icon-cancel',
							clickEnable:editableFlag,
							onClickButton : function (){
								cancleBankInfo();
					    	}});
			initBankInfo();
		}
		
	function initBankInfo()
		{
			var custCode = $('#CUSTCODE').val();
			$.post('/UtanWeb/CommUtilServlet?OPERTYPE=BANKINFOS&&CUSTCODE='+custCode,"",function(response){
					if(response.rows!=null)
					{
						var bankInfoCount = response.rows.length;
						var bankInfoData;
						for(var i = 0;i<bankInfoCount;i++){
							bankInfoData = response.rows[i];
							jQuery("#CURRBANKINFO").jqGrid('addRowData',i+1,bankInfoData,'last');
							bankInfoGridId++;
						}
					}
					
			},"json");
		}
		
		function addBankInfo()
		{
			var myrow = { BRANCHCODE:"", CONTACT:"", TEL:"", FAX:""};
			jQuery("#CURRBANKINFO").jqGrid('addRowData',bankInfoGridId,myrow,'last');
			bankInfoGridId++;
		}
		function delBankInfo()
		{
			jQuery("#CURRBANKINFO").jqGrid('delRowData',currRowIdBK);
		}
		function editBankInfo()
		{
			jQuery("#CURRBANKINFO").jqGrid('editRow',currRowIdBK);
		}
	
		function saveBankInfo()
		{
			jQuery("#CURRBANKINFO").jqGrid('saveRow',currRowIdBK,null,'clientArray');
		}
	
		function cancleBankInfo()
		{
			jQuery("#CURRBANKINFO").jqGrid('restoreRow',currRowIdBK);
		}

		function saveAllBankInfo()
		{	
			var selRow = jQuery("#CURRBANKINFO").jqGrid('getGridParam','reccount');
			for(var i=1;i<=selRow;i++)
				jQuery("#CURRBANKINFO").jqGrid('saveRow',i,null,'clientArray');
		}

	function createBankInfoXMl(){
		var str = "";
		for(i=1;i<bankInfoGridId;i++){
			jQuery('#CURRBANKINFO').jqGrid('saveRow',i,null,'clientArray');
			var data = $("#CURRBANKINFO").jqGrid('getRowData',i);
			if(data.BRANCHCODE!=null){
				str = str+ "<BANKINFO>";
				str = str+ "<BRANCHCODE>"+data.BRANCHCODE+"</BRANCHCODE>";
				str = str+ "<CONTACT>"+data.CONTACT+"</CONTACT>";
				str = str+ "<TEL>"+data.TEL+"</TEL>";
				str = str+ "<FAX>"+data.FAX+"</FAX>";
				str = str+ "</BANKINFO>";
			}
		}
		if(str!=null&&str!='') str = "<BANKINFOS>" + str + "</BANKINFOS>";
		$('#BANKINFOS').val(str);
	}
		
		
		
