/**
 * ��֤����
 */
var marginGridId = 1;
var marginTrxkey = '';
var marginEditFlag = true;
var limitIsUsedFlag = false;

//���ñ�֤���б�ڶ���Ĭ��Ϊ���ױ���
function setMarginCcy(objId) {
	return;   //���� ��֤����Ϣ��ѺƷ��ȡ ����ҪĬ��Ϊ���ױ���
	var ccy = $('#' + objId).val();
	setFieldValue(document.UTFORM.MARG_CCY, ccy);
	$('#CURRMARGIN').jqGrid('setRowData', 2, {
		CUST_CCY : ccy,
		MARG_CCY_JQ : ccy
	});
}

function hiddenMarginHistroy() {
	$('#MARGIN_HISTORY').hide();
}

function showMarginHistroy() {
	$('#MARGIN_HISTORY').show();
}

//Ӧ�ɱ�֤������޸�
function MARG_PCT_onChange() {
	var marginPct = getFieldValue(document.UTFORM.MARG_PCT);
	if (marginPct == null || marginPct == "")
		marginPct = 0;
	var trxAmt = getFieldValue(document.UTFORM.MARG_TRXAMT);
	var marginAmt = getFieldValue(document.UTFORM.MARG_AMT);
	if (Number(marginPct) >= 0) {
		marginAmt = trxAmt * marginPct / 100;
		setFieldValue(document.UTFORM.MARG_AMT, marginAmt);
		//initMarginFirstRow();
	}
}

//Ӧ�ɱ�֤�����޸�
function onMarginAmtChange() {
	var marginAmt = getFieldValue(document.UTFORM.MARG_AMT);
	if (!marginAmt)
		marginAmt = 0;
	var trxAmt = getFieldValue(document.UTFORM.MARG_TRXAMT);
	var trxBalAmt = getFieldValue(document.UTFORM.BALBALAMT);
	if (Number(marginAmt) >= 0) {
		marginPct = marginAmt / trxBalAmt * 100;
//		marginPct = marginAmt / trxAmt * 100;
		setFieldValue(document.UTFORM.MARG_PCT, marginPct);
		//initMarginFirstRow(); //���� ��֤����Ϣ��ѺƷ��ȡ ����Ҫ��ʽ����һ������ 
	}
}

function initMarginFirstRow() {
	return;   //���� ��֤����Ϣ��ѺƷ��ȡ ����Ҫ��ʽ����һ������ ֱ���˳�
	var custid = $('#MARG_CUSTID').val();
	if (!custid)
		return;
	var marginAmt = getFieldValue(document.UTFORM.MARG_AMT);
	var marginCcy = getFieldValue(document.UTFORM.MARG_CCY);
	var data = $("#CURRMARGIN").jqGrid('getRowData', 1);
	var eqCcy = data.CUST_CCY;
	var custAmt = marginAmt;//.accMul(getExRateByType(marginCcy, eqCcy, 'SB'));

	custAmt = FormatAmtByCCY(custAmt, eqCcy);
	marginAmt = FormatAmtByCCY(marginAmt, marginCcy);
	$('#CURRMARGIN').jqGrid('setRowData', 1, {
//		CUST_AMT : custAmt,
		EQ_AMT : marginAmt
//		MARG_AMT : custAmt
	});

	//jQuery('#CURRMARGIN').jqGrid('editRow',1);  //mark by wt 
	calculation(1, 'EQ');
	//jQuery('#CURRMARGIN').jqGrid('saveRow',1,null,'clientArray');
}

function MarginAdd() {
	var custid = $('#MARG_CUSTID').val();
	// add by lrz 20120801 �޸Ŀͻ�ID ��Ҫ�ѱ�֤���˺Ÿ����
	if (!custid) return; // ����ҵ����Ҫ����֤��ҳ��������أ��ͻ�Id���ܲ����ڣ���������ڵ���setExRateCustid( custid )�ᱨ���Ӹ��ж�
	var oldCustId = $('#OLD_MARG_CUSTID').val();

	if (oldCustId != custid) {
		var length = jQuery("#CURRMARGIN").jqGrid('getDataIDs').length;

		for ( var i = 1; i <= length; i++) {
			$('#CURRMARGIN').jqGrid('setRowData', i, {
				//CUST_ACCT : "",
				//MARG_ACCT : ""
			});
		}
	}
	$('#OLD_MARG_CUSTID').val(custid);
	setExRateCustid(custid);
	setMarginHistroyInfo();
}

function setMarginInfo() {
	var transKey = $('#MARG_TRXKEY').val();
	if (transKey != '' && marginTrxkey == '') {
		$.ajax( {
			url : '/UtanWeb/CommUtilServlet',
			dataType : '',
			type : 'POST',
			data : 'OPERTYPE=MarginMaster&&PARAM=' + transKey,
			async : false,
			error : function() {
				return;
			},
			success : function(response) {
				if (response != null && response != "") {
					marginTrxkey = transKey;
					var paramList = response.split(',');
					setFieldValue(document.UTFORM.MARG_PCT, paramList[0]);
					setFieldValue(document.UTFORM.MARG_AMT, paramList[1]);
				}
			}
		});
	}
	setRealMarg();
}

//��ʼ����֤����Ϣ
function initMargin() {
	var marginXml = $('#MARGININFO').val();
	if (marginXml != null && marginXml != "") {
		//add by wt ���ݽ��ۻ�����Ƿ���ֵ�����Ʊ��䣬����
		var currType = $('#CURR_TASKTYPE').val();
		var currTaskType = $('#SYS_TASK_TYPE').val();
		if (currType == 'ADD' || currType == 'FIXPENDING') {
			var jshDm = $('#MARG_JSHDM').val();
			if (jshDm) {
				setProperty(document.UTFORM.MARG_JSHDM, "M");
			}
		}
		//end

		//add by wt 2012-7-11 �����޸��Զ��Ȳ���
		if (currType == 'FIXPENDING' || currTaskType == 'PAUSESAVE') {
			var myrow = {
				CUST_CCY : 'CNY',
				MARG_CCY_JQ : 'CNY'
			};
			jQuery("#CURRMARGIN").jqGrid('addRowData', marginGridId, myrow, 'last');
			marginGridId++;
			var eqCcy = $('#MARG_CCY').val();
			myrow = {
				CUST_CCY : eqCcy,
				MARG_CCY_JQ : eqCcy
			};
			jQuery("#CURRMARGIN").jqGrid('addRowData', marginGridId, myrow, 'last');
			marginGridId++;
			myrow = {
				CUST_CCY : 'USD',
				MARG_CCY_JQ : 'USD'
			};
			jQuery("#CURRMARGIN").jqGrid('addRowData', marginGridId, myrow, 'last');
			marginGridId++;
			marginGridId = 1;
		}
		//end
		var custid = $('#MARG_CUSTID').val();
		setExRateCustid(custid);
		var x = parseXML(marginXml);
		var node = x.getElementsByTagName("MARGIN");
		var eqCcy = $('#MARG_CCY').val();
		for ( var i = 0; i < node.length; i++) {
			var tdnode = node[i];
			var custCcy = tdnode.childNodes[0].textContent || tdnode.childNodes[0].text;
			var custAmt = tdnode.childNodes[1].textContent || tdnode.childNodes[1].text;
			custAmt = FormatAmtByCCY(custAmt, custCcy);
			var eqAmt = tdnode.childNodes[2].textContent || tdnode.childNodes[2].text;
			eqAmt = FormatAmtByCCY(eqAmt, eqCcy);
			var custAcct = tdnode.childNodes[3].textContent || tdnode.childNodes[3].text;
			var margCcy = tdnode.childNodes[4].textContent || tdnode.childNodes[4].text;
			var margAmt = tdnode.childNodes[5].textContent || tdnode.childNodes[5].text;
			margAmt = FormatAmtByCCY(margAmt, margCcy);
			var margAcct = tdnode.childNodes[6].textContent || tdnode.childNodes[6].text;

			//add by wt 2012-6-28  ��֤�����
			//var  = tdnode.childNodes[7].textContent || tdnode.childNodes[7].text;
			var margBuyRate = tdnode.childNodes[8].textContent || tdnode.childNodes[8].text;
			var margSellRate = tdnode.childNodes[9].textContent || tdnode.childNodes[9].text;
			//end
			// add by liaorizhi 20120925 start ��ʾƽ�̼�
			var buyPPRate = tdnode.childNodes[10].textContent || tdnode.childNodes[10].text;
			var selPPRate = tdnode.childNodes[11].textContent || tdnode.childNodes[11].text;
			// add by liaorizhi 20120925 end ��ʾƽ�̼�
			
			// add by gaof
			var bzjkyyeAmt = tdnode.childNodes[14].textContent || tdnode.childNodes[14].text;
			var bzjdjjeAmt = tdnode.childNodes[15].textContent || tdnode.childNodes[15].text;
			var ypNo = tdnode.childNodes[16].textContent || tdnode.childNodes[16].text;
			var djAmt= tdnode.childNodes[17].textContent || tdnode.childNodes[17].text;
			// add by gaof
			
			var myrow = {
				CUST_CCY : custCcy,
				CUST_AMT : custAmt,
				EQ_AMT : eqAmt,
				CUST_ACCT : custAcct,
				MARG_CCY_JQ : margCcy,
				MARG_AMT : margAmt,
				
				BZJKYYE_AMT:bzjkyyeAmt,
				BZJDJJE_AMT:bzjdjjeAmt,
				
				MARG_ACCT : margAcct,
				MARGIN_BUYRATE : margBuyRate,
				MARGIN_SELLRATE : margSellRate,
				D_PP_BUYRATE : buyPPRate,
				D_PP_SELRATE : selPPRate,
				YP_NO:ypNo,
				DJ_AMT:djAmt
			};

			if (currType == 'FIXPENDING' || currTaskType == 'PAUSESAVE') { //add by wt 2012-7-11  �����޸����⴦�� ,�ݴ洦���Ƚ϶��ģ���Ҳ����
				jQuery("#CURRMARGIN").jqGrid('setRowData', marginGridId, myrow);
			} else {
				jQuery("#CURRMARGIN").jqGrid('addRowData', marginGridId, myrow, 'last');
			}

			marginGridId++;
		}

	} else {
		var myrow = {
			CUST_CCY : 'CNY',
			MARG_CCY_JQ : 'CNY'
		};
		jQuery("#CURRMARGIN").jqGrid('addRowData', marginGridId, myrow, 'last');
		marginGridId++;
		var eqCcy = $('#MARG_CCY').val();
		myrow = {
			CUST_CCY : eqCcy,
			MARG_CCY_JQ : eqCcy
		};
		jQuery("#CURRMARGIN").jqGrid('addRowData', marginGridId, myrow, 'last');
		marginGridId++;
		myrow = {
			CUST_CCY : 'USD',
			MARG_CCY_JQ : 'USD'
		};
		jQuery("#CURRMARGIN").jqGrid('addRowData', marginGridId, myrow, 'last');
		marginGridId++;
	}
}

function createMarginXMl() {
	var str = "<?xml version='1.0' encoding='GB2312'?><ROOT><MARGINS>";
	var selRow = jQuery("#CURRMARGIN").jqGrid('getGridParam', 'reccount');
	var selectedRows = jQuery("#CURRMARGIN").jqGrid('getGridParam', 'selarrrow');
	var marginType = $("#MARGINTYPE").val();
	$('#MARGININFO_ACCOUNT').val("<?xml version='1.0' encoding='GBK'?><CUSTACC_VOU><ACCOUNTS></ACCOUNTS></CUSTACC_VOU>");
	$('#MARGININFO_DR_ACCOUNT').val("<?xml version='1.0' encoding='GBK'?><CUSTACC_VOU><ACCOUNTS></ACCOUNTS></CUSTACC_VOU>");
	$('#MARGININFO_ACCOUNT_DR').val("<?xml version='1.0' encoding='GBK'?><CUSTACC_VOU><ACCOUNTS></ACCOUNTS></CUSTACC_VOU>");

	for (i = 1; i <= selRow; i++) {
		jQuery('#CURRMARGIN').jqGrid('saveRow', i, null, 'clientArray');
		var data = $("#CURRMARGIN").jqGrid('getRowData', i);

		if (marginType == 'DEDUCTMARGIN' && data.ACCNO != null && data.CUST_CCY != null) {
			str = str + "<MARGIN>";
			str = str + "<ACCTYPE>" + data.ACCTYPE + "</ACCTYPE>";
			str = str + "<CCY>" + data.CCY + "</CCY>";
			//add by wt ����������ʡ��������ʡ����ױ��ֻ���
			str = str + "<MARGIN_BUYRATE>" + getCCYRateByType(data.CCY, "B") + "</MARGIN_BUYRATE>";
			str = str + "<MARGIN_SELLRATE>" + getCCYRateByType(data.CUST_CCY, "S") + "</MARGIN_SELLRATE>";
			str = str + "<ACCNO>" + data.ACCNO + "</ACCNO>";
			str = str + "<AMT>" + FormatStr2Amt(data.AMT) + "</AMT>";
			str = str + "<JD_AMT>" + FormatStr2Amt(data.JD_AMT) + "</JD_AMT>";
			str = str + "<EQ_AMT>" + FormatStr2Amt(data.EQ_AMT) + "</EQ_AMT>";
			//add by liaorizhi ��������ƽ�̻��ʡ�����ƽ�̻���
			str = str + "<D_PP_BUYRATE>" + getCCYRateByType(data.CUST_CCY, "PB") + "</D_PP_BUYRATE>";
			str = str + "<D_PP_SELLRATE>" + getCCYRateByType(data.CCY, "PS") + "</D_PP_SELLRATE>";
			str = str + "<CUST_CCY>" + data.CUST_CCY + "</CUST_CCY>";
			str = str + "<CUST_AMT>" + FormatStr2Amt(data.CUST_AMT) + "</CUST_AMT>";
			str = str + "<CUST_ACCT>" + data.CUST_ACCT + "</CUST_ACCT>";
			str = str + "<DJ_AMT>" + FormatStr2Amt(data.DJ_AMT) + "</DJ_AMT>";
			str = str + "<CUST_EQ_AMT>" + FormatStr2Amt(data.CUST_EQ_AMT) + "</CUST_EQ_AMT>";
			if (data.CUST_CCY == data.CCY)
				str = str + "<JSH_FLAG>NO</JSH_FLAG>";
			else
				str = str + "<JSH_FLAG>YES</JSH_FLAG>";
			
			str = str + "<EQ_RATE>" + getCCYRateByType($('#MARG_CCY').val(), "S") + "</EQ_RATE>";
			str = str + "<EQ_CCY>" + $('#MARG_CCY').val() + "</EQ_CCY>";
			
			//end

			str = str + "</MARGIN>";
			var vouFlag = $("#MARG_VOU_FLAG").val();
	
//			if (vouFlag != 'NO'){ // modify by liaorizhi ѡ�񲻳��˲�Ҫ����xml
//				createDeductMarginAccXml();
//			}
//		} else if (marginType == 'MARGINADD' && data.CUST_CCY != '' && data.CUST_AMT != '' && data.CUST_AMT != '0' && data.CUST_AMT != '0.00') {
		} else if (marginType == 'MARGINADD') {
			str = str + "<MARGIN>";
			str = str + "<CUST_CCY>" + data.CUST_CCY + "</CUST_CCY>";
			str = str + "<CUST_AMT>" + FormatStr2Amt(data.CUST_AMT) + "</CUST_AMT>";
			str = str + "<EQ_AMT>" + FormatStr2Amt(data.EQ_AMT) + "</EQ_AMT>";
			str = str + "<CUST_ACCT>" + data.CUST_ACCT + "</CUST_ACCT>";
			str = str + "<MARG_CCY>" + data.MARG_CCY_JQ + "</MARG_CCY>";
			str = str + "<MARG_AMT>" + FormatStr2Amt(data.MARG_AMT) + "</MARG_AMT>";
			
			str = str + "<MARG_ACCT>" + data.MARG_ACCT + "</MARG_ACCT>";
			if (data.CUST_CCY == data.MARG_CCY_JQ) {
				str = str + "<JSH_FLAG>NO</JSH_FLAG>";
			} else {
				str = str + "<JSH_FLAG>YES</JSH_FLAG>";
			}

			//add by wt ����������ʡ��������ʡ����ױ��ֻ���
			str = str + "<MARGIN_BUYRATE>" + getCCYRateByType(data.CUST_CCY, "B") + "</MARGIN_BUYRATE>";
			str = str + "<MARGIN_SELLRATE>" + getCCYRateByType(data.MARG_CCY_JQ, "S") + "</MARGIN_SELLRATE>";
			//add by liaorizhi ��������ƽ�̻��ʡ�����ƽ�̻��ʡ�
			str = str + "<D_PP_BUYRATE>" + getCCYRateByType(data.MARG_CCY_JQ, "PB") + "</D_PP_BUYRATE>";
			str = str + "<D_PP_SELLRATE>" + getCCYRateByType(data.CUST_CCY, "PS") + "</D_PP_SELLRATE>";
			str = str + "<EQ_RATE>" + getCCYRateByType($('#MARG_CCY').val(), "S") + "</EQ_RATE>";
			str = str + "<EQ_CCY>" + $('#MARG_CCY').val() + "</EQ_CCY>";
			
			//add by gaof begin
		    str = str + "<BZJKYYE_AMT>" + FormatStr2Amt(data.BZJKYYE_AMT) + "</BZJKYYE_AMT>";
			str = str + "<BZJDJJE_AMT>" + FormatStr2Amt(data.BZJDJJE_AMT) + "</BZJDJJE_AMT>";
			str = str + "<YP_NO>" + data.YP_NO + "</YP_NO>";
			str = str + "<DJ_AMT>" + FormatStr2Amt(data.DJ_AMT) + "</DJ_AMT>";
		    //add by gaof end	
			
			//add by mjl ���ӱ�֤���Ʒ���͡��˻���� TODO:
			str = str + "<PROD_TYPE>" + data.PROD_TYPE + "</PROD_TYPE>";
			str = str + "<SEQ_NO>" + data.SEQ_NO + "</SEQ_NO>";
			//add by mjl end
			//end
			str = str + "</MARGIN>";
			var vouFlag = $("#MARG_VOU_FLAG").val();
			if (vouFlag == 'YES'){
				createMarginAccXml();
			}

		} else if (marginType == 'MARGINDEDUCT') {
			str = str + "<MARGIN>";
			str = str + "<ACCTYPE>" + data.ACCTYPE + "</ACCTYPE>";
			str = str + "<CCY>" + data.CCY + "</CCY>";
			str = str + "<ACCNO>" + data.ACCNO + "</ACCNO>";
			str = str + "<AMT>" + FormatStr2Amt(data.AMT) + "</AMT>";
			str = str + "<EQ_AMT>" + FormatStr2Amt(data.EQ_AMT) + "</EQ_AMT>";
			str = str + "<DR_AMT>" + FormatStr2Amt(data.DR_AMT) + "</DR_AMT>";
			str = str + "<DR_EQ_AMT>" + FormatStr2Amt(data.DR_EQ_AMT) + "</DR_EQ_AMT>";
			// modify by liaorizhi ����������ƽ�̻���
			str = str + "<MARGIN_BUYRATE>" + data.MARGIN_BUYRATE + "</MARGIN_BUYRATE>";
			str = str + "<D_PP_SELLRATE>" + data.D_PP_SELLRATE + "</D_PP_SELLRATE>";
			str = str + "<MARGIN_SELLRATE>" + data.MARGIN_SELLRATE + "</MARGIN_SELLRATE>";
			str = str + "<D_PP_BUYRATE>" + data.D_PP_BUYRATE + "</D_PP_BUYRATE>";
			str = str + "<JSH_FLAG>NO</JSH_FLAG>";
			selectedRows = selectedRows + '';
			if (selectedRows.indexOf(i) > -1)
				str = str + "<JSSELECT>Y</JSSELECT>";
			else
				str = str + "<JSSELECT>N</JSSELECT>";
			
			str = str + "<BZJKYYE_AMT>" + data.BZJKYYE_AMT + "</BZJKYYE_AMT>";
			str = str + "<YP_NO>" + data.YP_NO + "</YP_NO>";
			str = str + "<DJ_AMT>" + FormatStr2Amt(data.DJ_AMT) + "</DJ_AMT>";
			str = str + "<DJ_NO>" + data.DJ_NO + "</DJ_NO>";
			str = str + "<KX_NO>" + data.KX_NO + "</KX_NO>";
			str = str + "<JD_FLAG>" + data.JD_FLAG + "</JD_FLAG>";
			str = str + "<SUBMARKS>" + data.SUBMARKS + "</SUBMARKS>";
			str = str + "</MARGIN>";
			createMarginDeductAccXml();
		} else if (marginType == 'MARGINTRANSFER') {
			str = str + "<MARGIN>";
			str = str + "<ACCTYPE>" + data.ACCTYPE + "</ACCTYPE>";
			str = str + "<CCY>" + data.CCY + "</CCY>";
			str = str + "<ACCNO>" + data.ACCNO + "</ACCNO>";
			str = str + "<AMT>" + FormatStr2Amt(data.AMT) + "</AMT>";
			str = str + "<EQ_AMT>" + FormatStr2Amt(data.EQ_AMT) + "</EQ_AMT>";
			str = str + "<DR_AMT>" + FormatStr2Amt(data.DR_AMT) + "</DR_AMT>";
			str = str + "<DR_EQ_AMT>" + FormatStr2Amt(data.DR_EQ_AMT) + "</DR_EQ_AMT>";
			str = str + "<JSH_FLAG>NO</JSH_FLAG>";
			str = str + "</MARGIN>";
		} else if (marginType == 'TRANSFERMARGIN' && data.AMT != '' && data.AMT != '0' && data.AMT != '0.00') {
			return;  //�������� ��֤���޸Ĳ�����
			str = str + "<MARGIN>";
			str = str + "<ACCTYPE>" + data.ACCTYPE + "</ACCTYPE>";
			str = str + "<CCY>" + data.CCY + "</CCY>";
			str = str + "<ACCNO>" + data.ACCNO + "</ACCNO>";
			str = str + "<AMT>" + FormatStr2Amt(data.AMT) + "</AMT>";
			str = str + "<EQ_AMT>" + FormatStr2Amt(data.EQ_AMT) + "</EQ_AMT>";
			str = str + "<CUST_CCY>" + data.CUST_CCY + "</CUST_CCY>";
			str = str + "<CUST_ACCT>" + data.CUST_ACCT + "</CUST_ACCT>";
			str = str + "<CUST_AMT>" + FormatStr2Amt(data.CUST_AMT) + "</CUST_AMT>";
			str = str + "<CUST_EQ_AMT>" + FormatStr2Amt(data.CUST_EQ_AMT) + "</CUST_EQ_AMT>";
			//add by liaorizhi �����������ʣ�����ƽ�̻��ʡ�
			str = str + "<MARGIN_BUYRATE>" + getCCYRateByType(data.CCY, "B") + "</MARGIN_BUYRATE>";
			str = str + "<MARGIN_SELLRATE>" + getCCYRateByType(data.CUST_CCY, "S") + "</MARGIN_SELLRATE>";
			str = str + "<D_PP_BUYRATE>" + getCCYRateByType(data.CUST_CCY, "PB") + "</D_PP_BUYRATE>";
			str = str + "<D_PP_SELRATE>" + getCCYRateByType(data.CCY, "PS") + "</D_PP_SELRATE>";
			if (data.CUST_CCY == data.CCY) {
				str = str + "<JSH_FLAG>NO</JSH_FLAG>";
			} else {
				str = str + "<JSH_FLAG>YES</JSH_FLAG>";
			}
			str = str + "</MARGIN>";
			createDeductMarginAccXml();
		}
		//add end
	}
	str = str + "</MARGINS></ROOT>";
	if(selRow < 1) {
		$('#MARGININFO').val(""); 
	}else{
		$('#MARGININFO').val(str);
	};
}

function createMarginAccXml() {
	var jshDM = $('#MARG_JSHDM').val();
	var jshDX = $('#MARG_JSHDX').val();
	if (jshDM == null)
		jshDM = "";
	if (jshDX == null)
		jshDX = "";
	var rowData;
	var custid = $('#MARG_CUSTID').val();
	var allRows = jQuery("#CURRMARGIN").jqGrid('getDataIDs');
	$.each(allRows, function(i, n) {
		jQuery('#CURRMARGIN').jqGrid('saveRow', n, null, 'clientArray');
	});

	var formatXml = '';
	formatXml = "<?xml version='1.0' encoding='GBK'?><CUSTACC_VOU><ACCOUNTS>";
	var buyRate, selRate, ppBuyRate, ppSelRate;
	if (allRows != null && allRows.length > 0) {
		$.each(allRows, function(i, n) {
			rowData = jQuery('#CURRMARGIN').jqGrid('getRowData', n);
			var rowXml = '';

			rowXml = rowXml + '<ACCOUNT>';
			rowXml = rowXml + '<ACC_DCFLAG>Dr</ACC_DCFLAG>';
			rowXml = rowXml + '<ACC_CUSTID>' + custid + '</ACC_CUSTID>';
			rowXml = rowXml + '<ACC_NO>' + rowData.CUST_ACCT + '</ACC_NO>';
			rowXml = rowXml + '<ACC_CCY>' + rowData.CUST_CCY + '</ACC_CCY>';
			rowXml = rowXml + '<ACC_AMT>' + FormatStr2Amt(rowData.CUST_AMT) + '</ACC_AMT>';
			//rowXml = rowXml + '<ACC_BUYRATE>'+rowData.D_BUYRATE+'</ACC_BUYRATE>';
				//rowXml = rowXml + '<ACC_SELRATE>'+rowData.D_SELRATE+'</ACC_SELRATE>';
				//rowXml = rowXml + '<ACC_PP_BUYRATE>'+rowData.D_PP_BUYRATE+'</ACC_PP_BUYRATE>';
				//rowXml = rowXml + '<ACC_PP_SELRATE>'+rowData.D_PP_SELRATE+'</ACC_PP_SELRATE>';
				//rowXml = rowXml + '<ACC_CNY>'+rowData.D_CNY+'</ACC_CNY>';
				//rowXml = rowXml + '<ACC_PP_CNY>'+rowData.D_PP_CNY+'</ACC_PP_CNY>';
				rowXml = rowXml + '<ACC_BUYRATE>' + getCCYRateByType(rowData.CUST_CCY, 'B') + '</ACC_BUYRATE>';
				rowXml = rowXml + '<ACC_SELRATE>' + getCCYRateByType(rowData.CUST_CCY, 'S') + '</ACC_SELRATE>';
				rowXml = rowXml + '<ACC_PP_BUYRATE>' + getCCYRateByType(rowData.CUST_CCY, 'PB') + '</ACC_PP_BUYRATE>';
				rowXml = rowXml + '<ACC_PP_SELRATE>' + getCCYRateByType(rowData.CUST_CCY, 'PS') + '</ACC_PP_SELRATE>';
				rowXml = rowXml + '<ACC_CNY>' + (FormatStr2Amt(rowData.CUST_AMT) * getExRateByType(rowData.CUST_CCY, 'CNY', 'BS')) + '</ACC_CNY>';
				rowXml = rowXml + '<ACC_PP_CNY>' + (FormatStr2Amt(rowData.CUST_AMT) * getExRateByType(rowData.CUST_CCY, 'CNY', 'PPBS')) + '</ACC_PP_CNY>';
				rowXml = rowXml + '<ACC_JSHDM>' + jshDM + '</ACC_JSHDM>';
				rowXml = rowXml + '<ACC_JSHDX>' + jshDX + '</ACC_JSHDX>';
				rowXml = rowXml + '<ACC_USD_BUYRATE>' + getCCYRateByType('USD', 'B') + '</ACC_USD_BUYRATE>';
				rowXml = rowXml + '<ACC_USD_SELRATE>' + getCCYRateByType('USD', 'S') + '</ACC_USD_SELRATE>';
				rowXml = rowXml + '<ACC_MIDRATE>' + getCCYRateByType(rowData.CUST_CCY, 'M') + '</ACC_MIDRATE>';
				rowXml = rowXml + '<ACC_VOUTYPE>MARGINGRID</ACC_VOUTYPE>';//������ʲô��
				rowXml = rowXml + '</ACCOUNT>';

				rowXml = rowXml + '<ACCOUNT>';
				rowXml = rowXml + '<ACC_DCFLAG>Cr</ACC_DCFLAG>';
				rowXml = rowXml + '<ACC_CUSTID>' + custid + '</ACC_CUSTID>';
				rowXml = rowXml + '<ACC_NO>' + rowData.MARG_ACCT + '</ACC_NO>';
				rowXml = rowXml + '<ACC_CCY>' + rowData.MARG_CCY_JQ + '</ACC_CCY>';
				rowXml = rowXml + '<ACC_AMT>' + FormatStr2Amt(rowData.MARG_AMT) + '</ACC_AMT>';
				//rowXml = rowXml + '<ACC_BUYRATE>'+rowData.C_BUYRATE+'</ACC_BUYRATE>';
				//rowXml = rowXml + '<ACC_SELRATE>'+rowData.C_SELRATE+'</ACC_SELRATE>';
				//rowXml = rowXml + '<ACC_PP_BUYRATE>'+rowData.C_PP_BUYRATE+'</ACC_PP_BUYRATE>';
				//rowXml = rowXml + '<ACC_PP_SELRATE>'+rowData.C_PP_SELRATE+'</ACC_PP_SELRATE>';
				//rowXml = rowXml + '<ACC_CNY>'+rowData.C_CNY+'</ACC_CNY>';
				//rowXml = rowXml + '<ACC_PP_CNY>'+rowData.C_PP_CNY+'</ACC_PP_CNY>';
				rowXml = rowXml + '<ACC_BUYRATE>' + getCCYRateByType(rowData.MARG_CCY_JQ, 'B') + '</ACC_BUYRATE>';
				rowXml = rowXml + '<ACC_SELRATE>' + getCCYRateByType(rowData.MARG_CCY_JQ, 'S') + '</ACC_SELRATE>';
				rowXml = rowXml + '<ACC_PP_BUYRATE>' + getCCYRateByType(rowData.MARG_CCY_JQ, 'PB') + '</ACC_PP_BUYRATE>';
				rowXml = rowXml + '<ACC_PP_SELRATE>' + getCCYRateByType(rowData.MARG_CCY_JQ, 'PS') + '</ACC_PP_SELRATE>';
				rowXml = rowXml + '<ACC_CNY>' + (FormatStr2Amt(rowData.MARG_AMT) * getExRateByType(rowData.MARG_CCY_JQ, 'CNY', 'BS')) + '</ACC_CNY>';
				rowXml = rowXml + '<ACC_PP_CNY>' + (FormatStr2Amt(rowData.MARG_AMT) * getExRateByType(rowData.MARG_CCY_JQ, 'CNY', 'PPBS')) + '</ACC_PP_CNY>';
				rowXml = rowXml + '<ACC_JSHDM>' + jshDM + '</ACC_JSHDM>';
				rowXml = rowXml + '<ACC_JSHDX>' + jshDX + '</ACC_JSHDX>';
				rowXml = rowXml + '<ACC_USD_BUYRATE>' + getCCYRateByType('USD', 'B') + '</ACC_USD_BUYRATE>';
				rowXml = rowXml + '<ACC_USD_SELRATE>' + getCCYRateByType('USD', 'S') + '</ACC_USD_SELRATE>';
				rowXml = rowXml + '<ACC_MIDRATE>' + getCCYRateByType(rowData.MARG_CCY_JQ, 'M') + '</ACC_MIDRATE>';
				rowXml = rowXml + '<ACC_VOUTYPE>MARGINGRID</ACC_VOUTYPE>';//������ʲô��
				rowXml = rowXml + '</ACCOUNT>';

				formatXml = formatXml + rowXml;
			});
	}
	formatXml = formatXml + '</ACCOUNTS></CUSTACC_VOU>';
	$('#MARGININFO_ACCOUNT').val(formatXml);
}

function createDeductMarginAccXml() {
	var jshDM = $('#MARG_JSHDM').val();
	var jshDX = $('#MARG_JSHDX').val();
	if (jshDM == null)
		jshDM = "";
	if (jshDX == null)
		jshDX = "";
	var rowData;
	var custid = $('#MARG_CUSTID').val();
	var allRows = jQuery("#CURRMARGIN").jqGrid('getDataIDs');
	$.each(allRows, function(i, n) {
		jQuery('#CURRMARGIN').jqGrid('saveRow', n, null, 'clientArray');
	});

	var formatXml = '';
	formatXml = "<?xml version='1.0' encoding='GBK'?><CUSTACC_VOU><ACCOUNTS>";
	var buyRate, selRate, ppBuyRate, ppSelRate;
	if (allRows != null && allRows.length > 0) {
		$.each(allRows, function(i, n) {
			rowData = jQuery('#CURRMARGIN').jqGrid('getRowData', n);
			var rowXml = '';

			rowXml = rowXml + '<ACCOUNT>';
			rowXml = rowXml + '<ACC_DCFLAG>Dr</ACC_DCFLAG>';
			rowXml = rowXml + '<ACC_CUSTID>' + custid + '</ACC_CUSTID>';
			rowXml = rowXml + '<ACC_NO>' + rowData.ACCNO + '</ACC_NO>';
			rowXml = rowXml + '<ACC_CCY>' + rowData.CCY + '</ACC_CCY>';
			rowXml = rowXml + '<ACC_AMT>' + FormatStr2Amt(rowData.AMT) + '</ACC_AMT>';
			rowXml = rowXml + '<ACC_BUYRATE>' + getCCYRateByType(rowData.CCY, 'B') + '</ACC_BUYRATE>';
			rowXml = rowXml + '<ACC_SELRATE>' + getCCYRateByType(rowData.CCY, 'S') + '</ACC_SELRATE>';
			rowXml = rowXml + '<ACC_PP_BUYRATE>' + getCCYRateByType(rowData.CCY, 'PB') + '</ACC_PP_BUYRATE>';
			rowXml = rowXml + '<ACC_PP_SELRATE>' + getCCYRateByType(rowData.CCY, 'PS') + '</ACC_PP_SELRATE>';
			rowXml = rowXml + '<ACC_CNY>' + (FormatStr2Amt(rowData.AMT) * getExRateByType(rowData.CCY, 'CNY', 'BS')) + '</ACC_CNY>';
			rowXml = rowXml + '<ACC_PP_CNY>' + (FormatStr2Amt(rowData.AMT) * getExRateByType(rowData.CCY, 'CNY', 'PPBS')) + '</ACC_PP_CNY>';
			rowXml = rowXml + '<ACC_JSHDM>' + jshDM + '</ACC_JSHDM>';
			rowXml = rowXml + '<ACC_JSHDX>' + jshDX + '</ACC_JSHDX>';
			rowXml = rowXml + '<ACC_USD_BUYRATE>' + getCCYRateByType('USD', 'B') + '</ACC_USD_BUYRATE>';
			rowXml = rowXml + '<ACC_USD_SELRATE>' + getCCYRateByType('USD', 'S') + '</ACC_USD_SELRATE>';
			rowXml = rowXml + '<ACC_MIDRATE>' + getCCYRateByType(rowData.CCY, 'M') + '</ACC_MIDRATE>';
			rowXml = rowXml + '<ACC_VOUTYPE>MARGINGRID</ACC_VOUTYPE>';//������ʲô��

				rowXml = rowXml + '</ACCOUNT>';

				rowXml = rowXml + '<ACCOUNT>';
				rowXml = rowXml + '<ACC_DCFLAG>Cr</ACC_DCFLAG>';
				rowXml = rowXml + '<ACC_CUSTID>' + custid + '</ACC_CUSTID>';
				rowXml = rowXml + '<ACC_NO>' + rowData.CUST_ACCT + '</ACC_NO>';
				rowXml = rowXml + '<ACC_CCY>' + rowData.CUST_CCY + '</ACC_CCY>';
				rowXml = rowXml + '<ACC_AMT>' + FormatStr2Amt(rowData.CUST_AMT) + '</ACC_AMT>';

				rowXml = rowXml + '<ACC_BUYRATE>' + getCCYRateByType(rowData.CUST_CCY, 'B') + '</ACC_BUYRATE>';
				rowXml = rowXml + '<ACC_SELRATE>' + getCCYRateByType(rowData.CUST_CCY, 'S') + '</ACC_SELRATE>';
				rowXml = rowXml + '<ACC_PP_BUYRATE>' + getCCYRateByType(rowData.CUST_CCY, 'PB') + '</ACC_PP_BUYRATE>';
				rowXml = rowXml + '<ACC_PP_SELRATE>' + getCCYRateByType(rowData.CUST_CCY, 'PS') + '</ACC_PP_SELRATE>';
				rowXml = rowXml + '<ACC_CNY>' + (FormatStr2Amt(rowData.CUST_AMT) * getExRateByType(rowData.CUST_CCY, 'CNY', 'BS')) + '</ACC_CNY>';
				rowXml = rowXml + '<ACC_PP_CNY>' + (FormatStr2Amt(rowData.AMT) * getExRateByType(rowData.CUST_CCY, 'CNY', 'PPBS')) + '</ACC_PP_CNY>';

				rowXml = rowXml + '<ACC_JSHDM>' + jshDM + '</ACC_JSHDM>';
				rowXml = rowXml + '<ACC_JSHDX>' + jshDX + '</ACC_JSHDX>';
				rowXml = rowXml + '<ACC_USD_BUYRATE>' + getCCYRateByType('USD', 'B') + '</ACC_USD_BUYRATE>';
				rowXml = rowXml + '<ACC_USD_SELRATE>' + getCCYRateByType('USD', 'S') + '</ACC_USD_SELRATE>';
				rowXml = rowXml + '<ACC_MIDRATE>' + getCCYRateByType(rowData.CUST_CCY, 'M') + '</ACC_MIDRATE>';
				rowXml = rowXml + '<ACC_VOUTYPE>MARGINGRID</ACC_VOUTYPE>';//������ʲô��
				rowXml = rowXml + '</ACCOUNT>';

				formatXml = formatXml + rowXml;
			});
	}
	formatXml = formatXml + '</ACCOUNTS></CUSTACC_VOU>';
	$('#MARGININFO_DR_ACCOUNT').val(formatXml);
}

function createMarginDeductAccXml() {
	var jshDM = $('#MARG_JSHDM').val();
	var jshDX = $('#MARG_JSHDX').val();
	if (jshDM == null)
		jshDM = "";
	if (jshDX == null)
		jshDX = "";
	var rowData;
	var custid = $('#MARG_CUSTID').val();
	var allRows = jQuery("#CURRMARGIN").jqGrid('getDataIDs');
	$.each(allRows, function(i, n) {
		jQuery('#CURRMARGIN').jqGrid('saveRow', n, null, 'clientArray');
	});
	var margJshFlag = $('#MARG_JSHFLAG').val();
	var formatXml = '';
	formatXml = "<?xml version='1.0' encoding='GBK'?><CUSTACC_VOU><ACCOUNTS>";
	var buyRate, selRate, ppBuyRate, ppSelRate;
	if (allRows != null && allRows.length > 0) {
		var sorCcy = $('#MARG_CCY').val();
		$.each(allRows, function(i, n) {
			rowData = jQuery('#CURRMARGIN').jqGrid('getRowData', n);
			var rowXml = '';
			var ccy = rowData.CCY;
			var trxCcy = rowData.MARGIN_TRX_CCY;
			var amt = FormatStr2Amt(rowData.DR_AMT);
			
			var jshFlag = "JH";
			var srcAmt = FormatStr2Amt(rowData.DR_EQ_AMT);
			var ppCnyAmt = srcAmt*1 * getExRateByType(ccy, 'CNY', 'PPBS');
			if(trxCcy!="CNY" &&ccy=="CNY"){
				jshFlag = "SH";
				ppCnyAmt = srcAmt *1* getExRateByType(trxCcy, 'CNY', 'PPSB');
			}
			

			rowXml = rowXml + '<ACCOUNT>';
			rowXml = rowXml + '<ACC_DCFLAG>Dr</ACC_DCFLAG>';
			rowXml = rowXml + '<ACC_CUSTID>' + custid + '</ACC_CUSTID>';
			rowXml = rowXml + '<ACC_NO>' + rowData.ACCNO + '</ACC_NO>';
			rowXml = rowXml + '<SUBMARKS>' + rowData.SUBMARKS + '</SUBMARKS>';
			rowXml = rowXml + '<ACC_CCY>' + ccy + '</ACC_CCY>';
			rowXml = rowXml + '<ACC_AMT>' + amt + '</ACC_AMT>';
			//rowXml = rowXml + '<ACC_BUYRATE>'+getCCYRateByType(ccy,'B')+'</ACC_BUYRATE>';
				//rowXml = rowXml + '<ACC_SELRATE>'+getCCYRateByType(ccy,'S')+'</ACC_SELRATE>';
				//rowXml = rowXml + '<ACC_PP_BUYRATE>'+getCCYRateByType(ccy,'PB')+'</ACC_PP_BUYRATE>';
				//rowXml = rowXml + '<ACC_PP_SELRATE>'+getCCYRateByType(ccy,'PS')+'</ACC_PP_SELRATE>';
				rowXml = rowXml + '<ACC_CNY>' + (amt * getExRateByType(ccy, 'CNY', 'BS')) + '</ACC_CNY>';
				rowXml = rowXml + '<ACC_PP_CNY>' + ppCnyAmt + '</ACC_PP_CNY>';
				rowXml = rowXml + '<ACC_SOR_AMT>' + FormatStr2Amt(rowData.DR_EQ_AMT) + '</ACC_SOR_AMT>';
				if (ccy == sorCcy || margJshFlag == 'NO') {
					rowXml = rowXml + '<ACC_SOR_CCY>' + ccy + '</ACC_SOR_CCY>';
					rowXml = rowXml + '<ACC_MIDRATE>' + getCCYRateByType(ccy, 'M') + '</ACC_MIDRATE>';
					rowXml = rowXml + '<ACC_BUYRATE>' + getCCYRateByType(ccy, 'B') + '</ACC_BUYRATE>';
					rowXml = rowXml + '<ACC_SELRATE>' + getCCYRateByType(ccy, 'S') + '</ACC_SELRATE>';
					rowXml = rowXml + '<ACC_PP_BUYRATE>' + getCCYRateByType(ccy, 'PB') + '</ACC_PP_BUYRATE>';
					rowXml = rowXml + '<ACC_PP_SELRATE>' + getCCYRateByType(ccy, 'PS') + '</ACC_PP_SELRATE>';
				} else {
					rowXml = rowXml + '<ACC_SOR_CCY>' + sorCcy + '</ACC_SOR_CCY>';
					rowXml = rowXml + '<ACC_MIDRATE>' + getCCYRateByType(sorCcy, 'M') + '</ACC_MIDRATE>';
					rowXml = rowXml + '<ACC_BUYRATE>' + getCCYRateByType(sorCcy, 'B') + '</ACC_BUYRATE>';
					rowXml = rowXml + '<ACC_SELRATE>' + getCCYRateByType(sorCcy, 'S') + '</ACC_SELRATE>';
					rowXml = rowXml + '<ACC_PP_BUYRATE>' + getCCYRateByType(sorCcy, 'PB') + '</ACC_PP_BUYRATE>';
					rowXml = rowXml + '<ACC_PP_SELRATE>' + getCCYRateByType(sorCcy, 'PS') + '</ACC_PP_SELRATE>';
				}

				rowXml = rowXml + '<ACC_JSHDM>' + jshDM + '</ACC_JSHDM>';
				rowXml = rowXml + '<ACC_JSHDX>' + jshDX + '</ACC_JSHDX>';
				rowXml = rowXml + '<ACC_USD_BUYRATE>' + getCCYRateByType('USD', 'B') + '</ACC_USD_BUYRATE>';
				rowXml = rowXml + '<ACC_USD_SELRATE>' + getCCYRateByType('USD', 'S') + '</ACC_USD_SELRATE>';
				rowXml = rowXml + '<ACC_VOUTYPE>MARGINGRID</ACC_VOUTYPE>';//������ʲô��

				rowXml = rowXml + '</ACCOUNT>';
				//alert('rowXml===='+rowXml);
				formatXml = formatXml + rowXml;
			});
	}
	formatXml = formatXml + '</ACCOUNTS></CUSTACC_VOU>';
	$('#MARGININFO_ACCOUNT_DR').val(formatXml);
}

var marginInqurireKey = '';
function MarginInquire() {
	var transKey = $('#MARG_TRXKEY').val();
	if (transKey != '' && marginInqurireKey == '') {
		$.post("/UtanWeb/CommUtilServlet?OPERTYPE=MarginMaster&PARAM=" + transKey, "", function(response) {
			if (response != null && response != "") {
				marginInqurireKey = transKey;
				var paramList = response.split(',');
				setFieldValue(document.UTFORM.MARG_PCT, paramList[0]);
				setFieldValue(document.UTFORM.MARG_AMT, paramList[1]);
			}
		});
	}
	setMarginHistroyInfo();
}

var marginDeductKey = '';
function MarginDeduct() {
	var transKey = $('#MARG_TRXKEY').val();
	var custid = $('#MARG_CUSTID').val();

	setExRateCustid(custid);
	if (transKey != '' && marginDeductKey == '') {
		$.ajax( {
			url : '/UtanWeb/CommUtilServlet',
			dataType : '',
			type : 'POST',
			data : 'OPERTYPE=MarginMaster&&PARAM=' + transKey,
			async : false,
			error : function() {
				return;
			},
			success : function(response) {
				if (response != null && response != "") {
					marginDeductKey = transKey;
					var paramList = response.split(',');
					setFieldValue(document.UTFORM.MARG_PCT, paramList[0]);
					setFieldValue(document.UTFORM.MARG_AMT, paramList[1]);
				}
			}
		});
		createMarginDudectGird();
		initDeductMargin();
	} else {
		setDeductEqAmt();
	}
	marginPayForJSH();
	isShowMarginPaymentPage();
}

// add by liaorizhi ���û�б�֤�𸶻㣬���ظ�ҳ��
function isShowMarginPaymentPage(){
	if($('#MARGINTYPE').val() != "MARGINDEDUCT") return;
	
	var len = jQuery("#CURRMARGIN").jqGrid('getDataIDs').length;
	if(len > 0){
		showTab("MARGINPAY");
	}else{
		hideTab("MARGINPAY");
	}
}

function initDeductMargin() {
	var marginXml = $('#MARGININFO').val();
	if (marginXml != null && marginXml != "") {
		var x = parseXML(marginXml);
		var node = x.getElementsByTagName("MARGIN");
		var eqCcy = $('#MARG_CCY').val();
		for ( var i = 0; i < node.length; i++) {
//			var buyRate = getCCYRateByType(ccy,"B");
//			var selPPRate = getCCYRateByType(ccy,"PS");
//			var selRate = getCCYRateByType(eqCcy,"S");
//			var buyPPRate = getCCYRateByType(eqCcy,"PB");
			var tdnode = node[i];
			var accType = tdnode.childNodes[0].textContent || tdnode.childNodes[0].text;
			var ccy = tdnode.childNodes[1].textContent || tdnode.childNodes[1].text;
			var accNo = tdnode.childNodes[2].textContent || tdnode.childNodes[2].text;
			var amt = tdnode.childNodes[3].textContent || tdnode.childNodes[3].text;
			amt = FormatAmtByCCY(amt, ccy);
			var eqAmt = tdnode.childNodes[4].textContent || tdnode.childNodes[4].text;
			eqAmt = FormatAmtByCCY(eqAmt, eqCcy);
			var drAmt = tdnode.childNodes[5].textContent || tdnode.childNodes[5].text;
			drAmt = FormatAmtByCCY(drAmt, ccy);
			var drEqAmt = tdnode.childNodes[6].textContent || tdnode.childNodes[6].text;
			drEqAmt = FormatAmtByCCY(drEqAmt, eqCcy);
			//drAmt=drEqAmt*getExRateByType(eqCcy,ccy, 'SB');
			//drAmt = FormatAmtByCCY(drAmt, ccy);
			//drEqAmt = FormatAmtByCCY(drEqAmt, eqCcy);
			
			// modify by liaorizhi 2012-11-15 ,�����޸ģ����˳�ʼ������ 
			var buyRate = tdnode.childNodes[7].textContent || tdnode.childNodes[7].text;
			var selPPRate = tdnode.childNodes[8].textContent || tdnode.childNodes[8].text;
			var selRate = tdnode.childNodes[9].textContent || tdnode.childNodes[9].text;
			var buyPPRate = tdnode.childNodes[10].textContent || tdnode.childNodes[10].text;
			
			var bzjkyyeAmt = tdnode.childNodes[13].textContent || tdnode.childNodes[13].text;
			
			var ypNo = tdnode.childNodes[14].textContent || tdnode.childNodes[14].text;
			var djAmt = tdnode.childNodes[15].textContent || tdnode.childNodes[15].text;
			djAmt = FormatAmtByCCY(djAmt, ccy);
			var djNo = tdnode.childNodes[16].textContent || tdnode.childNodes[16].text;

			var kxNo = tdnode.childNodes[17].textContent || tdnode.childNodes[17].text;
			var jfFlag = tdnode.childNodes[18].textContent || tdnode.childNodes[18].text;
			var submarks= tdnode.childNodes[19].textContent || tdnode.childNodes[19].text;
			var myrow = {
				ACCTYPE : accType,
				CCY : ccy,
				ACCNO : accNo,
				AMT : amt,
				EQ_AMT : eqAmt,
				DR_AMT : drAmt,
				DR_EQ_AMT : drEqAmt,
				MARGIN_BUYRATE : buyRate,
				D_PP_SELLRATE : selPPRate,
				MARGIN_SELLRATE : selRate,
				D_PP_BUYRATE : buyPPRate,
				MARGIN_TRX_CCY : eqCcy,
				BZJKYYE_AMT:bzjkyyeAmt,
				YP_NO:ypNo,
				DJ_AMT:djAmt,
				DJ_NO:djNo,
				KX_NO:kxNo,
				JD_FLAG:jfFlag,
				SUBMARKS:submarks
			};
			
				jQuery("#CURRMARGIN").jqGrid('addRowData', i + 1, myrow, 'last');
				//var isSelect = tdnode.childNodes[8].text;
				//if(isSelect=='Y')
				//	jQuery("#CURRMARGIN").jqGrid('setSelection',i+1,true);
	
				marginGridId++;
		}
		var margEditAble = getFieldValue(document.UTFORM.MARG_EDITABLE);
		if(margEditAble=="NO"){
			calMargBal();
			setDeductNeedAmt();
			calEQNum();
		}
	} else {
		var trxKey = $('#MARG_TRXKEY').val();
		var marginType = $('#MARGINTYPE').val();    
/*
		var taskName=getFieldValue("TASKNAME");
		var tableName="";
		if(taskName=="IMBLOUTPAY" ||taskName=="SGREPAY" || taskName=="IN_IMBLOUTPAY" ||taskName=="IGCLOUTPAY"||taskName=="ERPRepay"){
			tableName="creditdata_bw";
		}else{
			tableName="creditdata_bn";
		}
		var sql="select CR_CONTRCT_NO from "+tableName+" where cr_trans_key='"+trxKey+"'  and cr_status='2'";
		var value = executeQuery4Json("JSONINFO", sql, -1);
		var checkNo="";
//		alert(value.rows);
		if(value.rows){
			for(var i=0;i<value.rows.length;i++){
				 checkNo=checkNo+value.rows[i].CR_CONTRCT_NO+",";
			}
			var args={};
			if(checkNo!="" && checkNo!=null){
				checkNo=checkNo.substring(0,checkNo.length-1);			
				setInterfaceArgs(args,"CONTRACT_NO",checkNo);
				var result=callInterface("MarginInq",args);
//				var message = callFunction("MARGINPAGEVALUE",args,"message");
				var fundata=result.result;
				var message=result.message;
				if(message!=null && message!=""){
//					//alert(message);
				}else{
					var MarginData="";					
//					var fundata = callFunction("MARGINPAGEVALUE",args,"result");
					if(fundata!=null &&fundata!=""){
						var xdMargInfos=fundata.split("|");						
						for (var i=0;i<(xdMargInfos.length-1)/7;i++){
							MarginData={"CCY":xdMargInfos[i*7+1],"AMT":xdMargInfos[i*7+2],"ACCNO":xdMargInfos[i*7+0],"YP_NO":xdMargInfos[i*7+5],"DJ_AMT":xdMargInfos[i*7+3],"DJ_NO":xdMargInfos[i*7+4],"KX_NO":xdMargInfos[i*7+6],"JD_FLAG":"NO"};
//							//MarginData={"CCY":"CNY","ACCNO":"1020801021011280658","AMT":"1478750.00","CUSTID":"204251306","TRANS_REF":"LC1021716000290001","TRANS_KEY":"LC102171600029","SYSID":"ACC20160411111917ltEO"}
//							MarginData = response.rows[i];
							jQuery("#CURRMARGIN").jqGrid('addRowData', i + 1, MarginData, 'last');
							//jQuery('#CURRMARGIN').jqGrid('setSelection',i+1,true);
							marginGridId++;
						}
						setDeductMarginInfo();
					}
				}
			}
		}
*/
		
		$.ajax( {
			url : '/UtanWeb/CommUtilServlet',
			dataType : 'json',
			type : 'POST',
			data : 'OPERTYPE=ACCHISTROY&&TRANS_KEY=' + trxKey+'&&MARGINTYPE=' + marginType,
			async : false,
			error : function() {
				return;
			},
			success : function(response) {
				if (response.rows != null) {
					var MarginCount = response.rows.length;
					var MarginData;
					for ( var i = 0; i < MarginCount; i++) {
						MarginData = response.rows[i];
						jQuery("#CURRMARGIN").jqGrid('addRowData', i + 1, MarginData, 'last');
						//jQuery('#CURRMARGIN').jqGrid('setSelection',i+1,true);
						marginGridId++;
					}
					setDeductMarginInfo();
				}
			}
		});
	}

}
function executeQuery4Json(arrName,sql,maxCount){
    if( sql == null || sql == '' ) return -1;
    if( maxCount == null ) maxCount = -1;
    arrName = arrName.toUpperCase();
    var value = -1;
    $.ajax({
        url: '/UtanWeb/CommUtilServlet',
        dataType:'json',
        type:'POST',
        data:{OPERTYPE:'executeQuery',EXECUTESQL:sql,MAXCOUNT:maxCount},
        async:false,
        error:
			function (){
            alert('ִ�����ͨ�Ŵ���!');
            return -1;
        },
        success:
			function (jsonData){
            value=jsonData;
        }
    });
    return value;
}
function setDeductMarginInfo() {
	var eqCcy = $('#MARG_CCY').val();
	var eqAmtNum = 0;
	var selRow = jQuery("#CURRMARGIN").jqGrid('getGridParam', 'reccount');
	for ( var i = 1; i <= selRow; i++) {
		var accCcy = $("#CURRMARGIN").jqGrid('getCell', i, "CCY");
		var accAmt = $("#CURRMARGIN").jqGrid('getCell', i, "AMT");
		
		// modify by liaorizhi2012-11-15 �����ʼ������ --- start
		var buyRate = getCCYRateByType(accCcy,"B");
		var selPPRate = getCCYRateByType(accCcy,"PS");
		var selRate = getCCYRateByType(eqCcy,"S");
		var buyPPRate = getCCYRateByType(eqCcy,"PB");
		// modify by liaorizhi2012-11-15 �����ʼ������ --- end
		
		var eqAmt = accAmt * getExRateByType(accCcy, eqCcy, 'BS');
		eqAmtNum = eqAmtNum + eqAmt;
		eqAmt = FormatAmtByCCY(eqAmt, eqCcy);
		accAmt = FormatAmtByCCY(accAmt, accCcy);
		$('#CURRMARGIN').jqGrid('setRowData', i, {
			AMT : accAmt,
			EQ_AMT : eqAmt,
			MARGIN_BUYRATE : buyRate,
			D_PP_SELLRATE : selPPRate,
			MARGIN_SELLRATE : selRate,
			D_PP_BUYRATE : buyPPRate,
			MARGIN_TRX_CCY : eqCcy
		});
	}
	setFieldValue(document.UTFORM.MARG_BAL, eqAmtNum);
	setDeductNeedAmt();
//	setDeductEqAmt();
}

function calMargBal(){
	var eqAmtNum = 0;
	var selRow = jQuery("#CURRMARGIN").jqGrid('getGridParam', 'reccount');
	for ( var i = 1; i <= selRow; i++) {
		var eqAmt = $("#CURRMARGIN").jqGrid('getCell', i, "EQ_AMT");
		eqAmtNum = eqAmtNum + FormatStr2Amt(eqAmt);
	}
	setFieldValue(document.UTFORM.MARG_BAL, eqAmtNum);
}

function setDeductNeedAmt(){
	var margPayAmt = getFieldValue(document.UTFORM.MARG_PAY_AMT);//������
	var margTrxBal = getFieldValue(document.UTFORM.MARG_TRXBAL);//�������
	var margBal = getFieldValue(document.UTFORM.MARG_BAL);//��֤�������
	var margNeedAmt = margBal * ( margPayAmt / margTrxBal );
	if(margTrxBal>0){
		setFieldValue(document.UTFORM.MARG_NEED_PAY_AMT,margNeedAmt);
	}else{
		setFieldValue(document.UTFORM.MARG_NEED_PAY_AMT,margBal);//���οɽⶳ��֤����
	}
}

function setDeductEqAmt() {
	var trxAmt = getFieldValue(document.UTFORM.MARG_TRXAMT);//���׽��
	var trxBalAmt = getFieldValue(document.UTFORM.BALBALAMT);//����֤���
	var payAmt = getFieldValue(document.UTFORM.MARG_PAY_AMT);//������
	var ospayAmt = getFieldValue(document.UTFORM.OSPAY_AMT);//�������
	if(ospayAmt==null||ospayAmt==""){
		ospayAmt=0;
	}
	payAmt = payAmt +ospayAmt;
	var eqCcy = getFieldValue(document.UTFORM.MARG_CCY);
	var deductMargin = getAmtValue(document.UTFORM.NEED_PAY_AMT);
	//var margAmt  = getFieldValue(document.UTFORM.MARG_AMT);
	//var margAmt = getFieldValue(document.UTFORM.MARG_BAL);//modify by xlz //��֤���ܶ�
	var margAmt = getFieldValue(document.UTFORM.MARG_AMT);
	var pct = Number(payAmt / trxBalAmt);
//	var pct = Number(payAmt / trxAmt);
	var selRow = jQuery("#CURRMARGIN").jqGrid('getGridParam', 'reccount');
	var eqDeductAmtNum = 0;
	$('#MARG_NEED_PAY_AMT').val(''); // ��ʼ����֤�𸶿���
	var nextFlag = true;
	
	for ( var i = 1; i <= selRow; i++) {
		var accAmt = FormatStr2Amt($("#CURRMARGIN").jqGrid('getCell', i, "AMT"));
		var accEqAmt = FormatStr2Amt($("#CURRMARGIN").jqGrid('getCell', i, "EQ_AMT"));
		var accCcy = $("#CURRMARGIN").jqGrid('getCell', i, "CCY");
		var needPayMargin = getAmtValue(document.UTFORM.MARG_NEED_PAY_AMT);
		var drEqAmt = accEqAmt * payAmt / trxBalAmt;
		
		if (deductMargin > 0) { // modify by liaorizhi 20120210 �Ѿ�����ÿ۱�֤�������Ҫ��������ȡ��
			if (deductMargin > accEqAmt) {
				drEqAmt = accEqAmt;
				deductMargin = deductMargin - accEqAmt; // ������֤�𲻹���ȡ������ȡ������֤����
			} else {
				drEqAmt = deductMargin;
			}
		} else { //modify by xlz ÿ�ʱ�֤����۽����ڵ������ 
			var accEqAmt1 = accEqAmt;
			var drEqAmt1 = accEqAmt * payAmt / trxBalAmt;
			if (accEqAmt1 - drEqAmt1 < 0) drEqAmt = accEqAmt1;
			var newNeedPayMargin = needPayMargin + drEqAmt;
			if( newNeedPayMargin > payAmt){
				drEqAmt = payAmt - needPayMargin;
				nextFlag = false;
			}
		}
		
		
		setFieldValue(document.UTFORM.MARG_NEED_PAY_AMT, needPayMargin += drEqAmt); // �������calDeduct(i,'EQ')��������֤��У���ܹ�ͨ��
		if(deductMargin > 0){
			setFieldValue(document.UTFORM.MARG_PAY_AMT, needPayMargin);
		}
		drEqAmt = FormatAmtByCCY(drEqAmt, eqCcy);
		eqDeductAmtNum = eqDeductAmtNum + FormatStr2Amt(drEqAmt);
		//ֻ�����۽��ױұ��ֵ,��ȡ��֤����ͨ��calDeduct(i,'EQ')����
		//		    $('#CURRMARGIN').jqGrid('setRowData',i,{DR_AMT:drAmt,DR_EQ_AMT:drEqAmt,DR_EQ_AMT_BAK:drEqAmt});

		$('#CURRMARGIN').jqGrid('setRowData', i, {
			DR_EQ_AMT : drEqAmt,
			DR_EQ_AMT_BAK : drEqAmt
		});
		calDeduct(i, 'EQ');
		saveMargin();
		if(nextFlag){
			// doNothing
		} else {
			break;
		}
	}

	setFieldValue(document.UTFORM.MARG_CHANGE, eqDeductAmtNum);
	//setFieldValue(document.UTFORM.MARGIN_DR_AMT,eqDeductAmtNum);

	//modify by xlz �ܱ�֤����۽����ڱ�֤�����
	var margBal=getFieldValue(document.UTFORM.MARG_BAL);//��֤�����
	//var margNeedPayAmt = margBal * pct;
	var margBal=getFieldValue(document.UTFORM.MARG_BAL);//��֤�����
	var margNeedPayAmt = accEqAmt * payAmt / trxBalAmt;
//	var margNeedPayAmt = trxAmt * pct;
	
	if (margBal < margNeedPayAmt) {
		margNeedPayAmt = margBal;
	}
	if (deductMargin > 0) { // modify by liaorizhi 20120809 �Ѿ�����ÿ۱�֤�������Ҫ��������ȡ��
		margNeedPayAmt = getAmtValue(document.UTFORM.MARG_NEED_PAY_AMT);
	}
	setFieldValue(document.UTFORM.MARG_NEED_PAY_AMT, margNeedPayAmt);
}

function selectedDeduct() {

	var selRow = jQuery("#CURRMARGIN").jqGrid('getGridParam', 'reccount');
	var eqDeductAmtNum = 0;
	for ( var i = 1; i <= selRow; i++) {
		var drEqAmt = $("#CURRMARGIN").jqGrid('getCell', i, "DR_EQ_AMT");
		drEqAmt = FormatStr2Amt(drEqAmt);
		eqDeductAmtNum = eqDeductAmtNum + Number(drEqAmt);
	}
	setFieldValue(document.UTFORM.MARG_CHANGE, eqDeductAmtNum);
	setFieldValue(document.UTFORM.MARGIN_DR_AMT, eqDeductAmtNum);
	if (typeof (setCustAccDrPageInfo) == 'function')
		setCustAccDrPageInfo();

}

//add by wt 2012-6-28  Ϊ�����ı�֤��������ʣ��������ʸ�ֵ  ����չ��
// modify by liaorihzi 20120924 ������ʾ���롢����ƽ�̻���
function initMarginExrateInfo() {
	return;//
	saveMargin();
	var allRows = jQuery("#CURRMARGIN").jqGrid('getDataIDs');
	$.each(allRows, function(i, rowid) {
		rowData = jQuery('#CURRMARGIN').jqGrid('getRowData', rowid);
		var marginBuyRate = getCCYRateByType(rowData.CUST_CCY, 'B'); //�����
		var marginSellRate = getCCYRateByType(rowData.MARG_CCY_JQ, 'S'); //������
		var marginPPBuyRate = getCCYRateByType(rowData.MARG_CCY_JQ, 'PB');
		var marginPPSelRate = getCCYRateByType(rowData.CUST_CCY, 'PS');
		
			$('#CURRMARGIN').jqGrid('setRowData', rowid, {
				MARGIN_BUYRATE : marginBuyRate,
				MARGIN_SELLRATE : marginSellRate,
				D_PP_BUYRATE : marginPPBuyRate,
				D_PP_SELRATE : marginPPSelRate
			});
		});
}

//���㱣֤��ͻ��ʽ���֤���˺Ž��۽��ױ��ֽ��
function calculation(rowid, type) {

	initMarginExrateInfo();

	//  ��������ÿͻ����ֶ�Ӧ������۸�ֵ��  ���������ñ�֤����ֵ������۸�ֵ
	var rowData = jQuery('#CURRMARGIN').jqGrid('getRowData', rowid);
	var custCcy = rowData.CUST_CCY; //�ͻ�����
	var margCcy = rowData.MARG_CCY_JQ; //��֤�����
	var transCcy = $('#MARG_CCY').val(); //���ױ���

	var eqAmt; //�۽��ױ��ֽ��
	var custAmt;
	if (type == 'EQ') //��ʾ���۽��ױ�������
	{
		eqAmt = rowData.EQ_AMT; //�۽��ױ��ֽ��
		if (eqAmt == null || eqAmt == '') {
			eqAmt = 0;
		} else {
			eqAmt = FormatStr2Amt(eqAmt);
		}
		custAmt = eqAmt.accMul(getExRateByType(transCcy, custCcy, 'SB'));
	} else { //��ʾ�ÿͻ��ʽ������
		custAmt = rowData.CUST_AMT; //�ͻ��ʽ��
		if (custAmt == null || custAmt == '') {
			custAmt = 0;
		} else {
			custAmt = FormatStr2Amt(custAmt);
		}
		eqAmt = custAmt.accMul(getExRateByType(custCcy, transCcy, 'BS'));
	}

	var margAmt = custAmt.accMul(getExRateByType(custCcy, margCcy, 'BS'));

	eqAmt = FormatAmtByCCY(eqAmt, transCcy);
	custAmt = FormatAmtByCCY(custAmt, custCcy);
	margAmt = FormatAmtByCCY(margAmt, margCcy);
	$('#CURRMARGIN').jqGrid('setRowData', rowid, {
		//CUST_AMT : custAmt,
		EQ_AMT : eqAmt,
		//MARG_AMT : margAmt
	});
	jQuery('#CURRMARGIN').jqGrid('saveRow', rowid, null, 'clientArray');
	calEQAMT(rowid);
	changMarginCcyForJSH(rowid, "Cr");
}

function calculationMargAmt(rowid, MargCcy) {
	var eqCcy = $('#MARG_CCY').val();
	var custCcy = $('#' + rowid + '_CUST_CCY').val();
	var custAmt = $('#' + rowid + '_CUST_AMT').val();
	if (custAmt == null || custAmt == '')
		custAmt = 0;
	else
		custAmt = FormatStr2Amt(custAmt);

	var MargAmt = custAmt * getExRateByType(custCcy, MargCcy, 'BS');
	MargAmt = FormatAmtByCCY(MargAmt, MargCcy);
	$('#CURRMARGIN').jqGrid('setRowData', rowid, {
//		MARG_AMT : MargAmt
	});
	jQuery('#CURRMARGIN').jqGrid('saveRow', rowid, null, 'clientArray');

	changMarginCcyForJSH(rowid, "Cr");
}

//������ۻ����  modify by wt 2012-6-27 ͨ���˷������ƽ��ۻ�������
function changMarginCcyForJSH(rowid, status) {
	//for jsh dm
	var allRows = jQuery("#CURRMARGIN").jqGrid('getDataIDs');
	var jshNO = 0;
	var jshFlag;
	var rowData;
	var custCcy = "", marginCcy = "";
	$.each(allRows, function(i, n) {
		rowData = jQuery('#CURRMARGIN').jqGrid('getRowData', n);
		if (status == "Cr") {
			custCcy = rowData.CUST_CCY;
			marginCcy = rowData.MARG_CCY_JQ;
		} else if (status == "Dr") {
			custCcy = rowData.CUST_CCY;
			marginCcy = rowData.CCY;
		}
		if (custCcy != null && custCcy != "" && marginCcy != null && marginCcy != "") {
			if (custCcy != marginCcy) {
				jshNO += 1; //��֪����ʲô�ã�����ɾ���ɡ���
			if (custCcy == "CNY" || marginCcy == "CNY") { //�����������������һ��������ң�����ڽ��ۻ����
				jshFlag = "YES";
			}
		}
	}
}	);

	//add by wt 2012-6-27  ����jshFlag��JSHDM
	if (jshFlag == "YES") { //������ۻ㣬����ۻ���������
		setProperty(document.UTFORM.MARG_JSHDM, "O");
	} else {
		setProperty(document.UTFORM.MARG_JSHDM, "P"); //modify by wt ���ۻ������䣬�����
		setFieldValue(document.UTFORM.MARG_JSHDM, "");
	}
	//end
}

function calEQAMT(rowid) {
	setRealMarg();
}

//��ֵ��֤������ͽ��
function setRealMarg() {
	var SYS_TASK_TYPE = getFieldValue("SYS_TASK_TYPE");
	if(SYS_TASK_TYPE==="HISTORY") return;
	var balAmt;//�������
	if(document.UTFORM.BAL_BALAMT){ // ����н�������ֶ�,��ȡ�������,����ȡ���׽��
		balAmt = getFieldValue(document.UTFORM.BAL_BALAMT);
	} else {
		balAmt = getFieldValue(document.UTFORM.MARG_TRXAMT); // ���׽��
	}
	if(balAmt===0){
		setFieldValue("MARG_BAL", 0);
		setFieldValue("MARG_PCT1", 0);
		setFieldValue("MARG_TOTAMT", 0);
		setFieldValue("MARG_PCT2", 0);
		return;
	}
	var selRow = jQuery("#CURRMARGIN").jqGrid('getGridParam', 'reccount'); //��ǰ��֤���¼����
	var eqAmtNum = 0;
	for ( var i = 1; i <= selRow; i++) {
		var data = $("#CURRMARGIN").jqGrid('getRowData', i);
		if (data.EQ_AMT != null && data.EQ_AMT != "") {
			eqAmtNum = eqAmtNum + FormatStr2Amt(data.EQ_AMT); //�������۽��ױ��ֽ�����
		}
	}
	setFieldValue(document.UTFORM.MARG_CHANGE, eqAmtNum); //ʵ����֤�����/���
	setFieldValue(document.UTFORM.MARG_PCT3, eqAmtNum / balAmt * 100);

	var selRowHis = jQuery("#CURRMARGINHISTROY").jqGrid('getGridParam', 'reccount'); //��ʷ��֤���¼����
	var eqAmtNumHis = 0;
	for ( var i = 1; i <= selRowHis; i++) {
		var data = $("#CURRMARGINHISTROY").jqGrid('getRowData', i);
		if (data.EQ_AMT != null && data.EQ_AMT != "") {
			eqAmtNumHis = eqAmtNumHis + FormatStr2Amt(data.EQ_AMT); //��ʷ�۽��ױ��ֽ�����
		}
	}
	setFieldValue(document.UTFORM.MARG_BAL, eqAmtNumHis); //�ѽ���֤�����/���
	setFieldValue(document.UTFORM.MARG_PCT1, eqAmtNumHis / balAmt * 100);

	eqAmtNum = eqAmtNum + eqAmtNumHis;
	setFieldValue(document.UTFORM.MARG_TOTAMT, eqAmtNum); //Ŀǰ��֤�����/���	
	setFieldValue(document.UTFORM.MARG_PCT2, eqAmtNum / balAmt * 100);

}

function saveAllMargin() {
	var selRow = jQuery("#CURRMARGIN").jqGrid('getGridParam', 'reccount');
	for (i = 1; i <= selRow; i++) {
		jQuery('#CURRMARGIN').jqGrid('saveRow', i, null, 'clientArray');
	}
}

function delMargin() {
	if (margCurrRowId != null) {
		var isSure = confirm("��ȷ��ɾ������ [" + margCurrRowId + "] ??");
		if (isSure) {
			//[Bugfree_855_(����)��������֤��֤����֤����Ϣҳ�棬����һ�б�֤����Ϣ��ϵͳ���ñ༭Ҳ����ɾ��]_B fanr 2013-9-18
			/*
			if (margCurrRowId < 4) {
				alert("����ɾ������ [" + margCurrRowId + "]!");
				return;
			}
			*/
			//[Bugfree_855_(����)��������֤��֤����֤����Ϣҳ�棬����һ�б�֤����Ϣ��ϵͳ���ñ༭Ҳ����ɾ��]_E fanr 2013-9-18
			jQuery("#CURRMARGIN").jqGrid('delRowData', margCurrRowId);
			marginGridId--;
			calEQAMT();
		}
	} else {
		alert("��ѡ��һ��ɾ��!");
	}
}

function editMargin() {
	if (marginEditFlag)
		jQuery('#CURRMARGIN').jqGrid('editRow', margCurrRowId);
}

function saveMargin() {
	jQuery('#CURRMARGIN').jqGrid('saveRow', margCurrRowId, null, 'clientArray');
}

function cancleMargin() {
	jQuery('#CURRMARGIN').jqGrid('restoreRow', margCurrRowId);
}

//
function calDrEqInfo(rowid) {
	var custCcy = $('#' + rowid + '_CUST_CCY').val(); //ת����֤��Ŀ�����
	var ccy = $("#CURRMARGIN").jqGrid('getCell', rowid, "CCY");
	var amt = $('#' + rowid + '_AMT').val(); //��ת����֤����
	if (amt == null || amt == '') {
		amt = 0;
	} else {
		amt = FormatStr2Amt(amt);
	}
	var custAmt = amt * getExRateByType(ccy, custCcy, 'BS'); //ת����֤��Ŀ����
	custAmt = FormatAmtByCCY(custAmt, custCcy);
	$('#CURRMARGIN').jqGrid('setRowData', rowid, {
		MARGIN_SELLRATE : getCCYRateByType(custCcy,'S'), // modify by liaorizhi ��֤��ת��ѡ��ͬ���֣���ʾ��ͬ����
		D_PP_BUYRATE : getCCYRateByType(custCcy,'PB') // modify by liaorizhi ��֤��ת��ѡ��ͬ���֣���ʾ��ͬ��������
//		CUST_AMT : custAmt
	});
	jQuery('#CURRMARGIN').jqGrid('saveRow', rowid, null, 'clientArray');
	changMarginCcyForJSH(rowid, "Dr");
}

function calculationEQNum() {
	var selRow = jQuery("#CURRMARGIN").jqGrid('getGridParam', 'reccount');
	var eqAmtNum = 0;
	for (i = 1; i <= selRow; i++) {
		jQuery('#CURRMARGIN').jqGrid('saveRow', i, null, 'clientArray');
		var data = $("#CURRMARGIN").jqGrid('getRowData', i);
		var eqAmt = data.EQ_AMT;
		if (eqAmt == '')
			eqAmt = 0;
		else
			eqAmt = FormatStr2Amt(eqAmt)
		eqAmtNum = eqAmtNum + Number(eqAmt);
	}
	setFieldValue(document.UTFORM.MARG_CHANGE, eqAmtNum);
}
var count=0;
function calDeduct(rowid, type) {
	
	var change1=parseInt($('#1_DR_AMT').val());
	var change2=parseInt($('#1_DR_EQ_AMT').val());
	if(change1>0||change2>0){
			setProperty(document.UTFORM.GETAMTWAY, "M");
			setProperty(document.UTFORM.MAGRINNO, "M");
			count++;
	}else{	
			setProperty(document.UTFORM.GETAMTWAY, "P");
			setProperty(document.UTFORM.MAGRINNO, "P");
	}
	var data = $("#CURRMARGIN").jqGrid('getRowData', rowid);
	var eqCcy = $('#MARG_CCY').val();
	var custCcy = data.CCY;
	//alert(custCcy);
	var custCcy_bak = data.CCY_BAK;
	//alert(custCcy_bak); �������֣������ľ�Ȼ��<input>
	//$('#CCY_BAK').val(custCcy);
	//alert("!@#!@!@##"+ccy_bak);
	var drEqAmt;
	var drAmt;
	var trxAmt = getFieldValue(document.UTFORM.MARG_TRXAMT);
	var trxBalAmt = getFieldValue(document.UTFORM.BALBALAMT);
	var payAmt = getFieldValue(document.UTFORM.MARG_PAY_AMT);
	//var pct = Number(payAmt / trxAmt);
	var pct = Number(payAmt / trxBalAmt);

	if (type == 'EQ') {
		drEqAmt = $('#' + rowid + '_DR_EQ_AMT').val();

		if ((drEqAmt == null || drEqAmt == "")) { // modify by liaorizhi ���ⲿ��������
			drEqAmt = $("#CURRMARGIN").jqGrid('getCell', rowid, "DR_EQ_AMT");
		}
		if (drEqAmt == null || drEqAmt == '') {
			drEqAmt = 0;
		} else {
			drEqAmt = FormatStr2Amt(drEqAmt);
		}

		var amt2 = Number(drEqAmt - FormatStr2Amt(data.EQ_AMT));
		if (amt2 > 0) {
			alert("�ⶳ��֤������ڱ�֤�����");
			cancleMargin();
			return true;
		}
		drAmt = drEqAmt * getExRateByType(eqCcy, custCcy, 'SB');
		
		//������׻�����������ȡ��ҶԵĻ���(����۸�������)  shx ��ҶҼ���
		if(custCcy!= eqCcy && eqCcy!='CNY' && custCcy!='CNY'){
			var realaimCCY = custCcy+"/"+eqCcy;
			drAmt = getWBD_ACCAMT(realaimCCY,drEqAmt,'Dr');
		}
		//shx ��ҶҼ���
			
		//[Bugfree_2059_��֤��֤����ʱ�����������֣��Ƽ۷����䶯 ����]_B fanr 2013-12-4
		// ����ֻ��Ϊ�˷�ֹ����������������_B
		// ��Ϊ������ôһ�����
		// ����˳�� ��֤�����--(/��������)-->�۽��ױ�֤�����--(һϵ���жϺ����)-->���۽��ױұ���--(*��������)-->�۱�֤����
		// ������������û���,����"���տ۱�֤����"Ӧ�ú�"��֤�����"���,������Ϊһ��һ��,���������
		// ע:������������ʹ���,���������ױ�����,���Ե������˴���
		var amt = FormatStr2Amt($("#CURRMARGIN").jqGrid('getCell', rowid, "AMT")); // ��֤�����
		
		var eqAmt = FormatStr2Amt($("#CURRMARGIN").jqGrid('getCell', rowid, "EQ_AMT")); // �۽��ױұ����
		if(drEqAmt === eqAmt){ // [Bugfree_2155_���ڵ��������⸶�㣬��֤�𸶻㣬�۽��ױұ��������...] fanr 2013-12-25
			drAmt = amt;
		}
		// ����ֻ��Ϊ�˷�ֹ����������������_E
		//[Bugfree_2059_��֤��֤����ʱ�����������֣��Ƽ۷����䶯 ����]_E fanr 2013-12-4
		
	    //����ԭ�ҽ��У�� ����䶯EQ��EQ������ҲҪУ��ԭ�Ҳ�����
		var amt2 = Number(drAmt - FormatStr2Amt(data.AMT));
		
		if (amt2 > 0) {
			if(count<=0){
				setProperty(document.UTFORM.GETAMTWAY, "P");
				setProperty(document.UTFORM.MAGRINNO, "P");	
			}
			
			alert("�ⶳ��֤������ڱ�֤����ԭ��֤�����["+data.AMT+"]�ⶳ��֤����["+drAmt+"]");
			cancleMargin();
			return;
		}
	} else {
		drAmt = $('#' + rowid + '_DR_AMT').val();
		if (drAmt == null || drAmt == '') {
			drAmt = 0;
		} else {
			drAmt = FormatStr2Amt(drAmt);
		}

		var amt2 = Number(drAmt - FormatStr2Amt(data.AMT));
		if (amt2 > 0) {
			if(count<=0){
				setProperty(document.UTFORM.GETAMTWAY, "P");
				setProperty(document.UTFORM.MAGRINNO, "P");
			}
			
			alert("�ⶳ��֤������ڱ�֤����ԭ��֤�����["+data.AMT+"]�ⶳ��֤����["+drAmt+"]");
			cancleMargin();
			return;
		}
		drEqAmt = drAmt * getExRateByType(custCcy, eqCcy, 'BS');
		
		//������׻�����������ȡ��ҶԵĻ���(����۸�������)  shx ��ҶҼ���
		if(custCcy!= eqCcy && eqCcy!='CNY' && custCcy!='CNY'){
			var realaimCCY = custCcy+"/"+eqCcy;
			drEqAmt = getWBD_SRCAMT(realaimCCY,drAmt,'Dr');
		}
		//shx ��ҶҼ���
		
	}
	drEqAmt = FormatAmtByCCY(drEqAmt, eqCcy);
	drAmt = FormatAmtByCCY(drAmt, custCcy);
	var needpayAmt = getFieldValue(document.UTFORM.MARG_NEED_PAY_AMT);

	if (FormatStr2Amt(drEqAmt) > needpayAmt) {
		alert("��ע�⣺ʵ�ʽⶳ��֤����ڱ��οɽⶳ��֤��"); // [Bugfree_2167_����ҳ��] fanr 2013-12-27
		cancleMargin();
		//return ;
	}
	$('#CURRMARGIN').jqGrid('setRowData', rowid, {
		DR_EQ_AMT : drEqAmt,
		DR_AMT : drAmt,
		CCY_BAK:custCcy
	});
	calMargDjAmt(rowid);
	calEQNum();
}
//���㶳����
function calMargDjAmt(rowid){
	jQuery('#CURRMARGIN').jqGrid('saveRow',rowid,null,'clientArray');
	var rowData = jQuery('#CURRMARGIN').jqGrid('getRowData',rowid);
	var ccy = getGridValue(rowData, rowid, "CCY");//��֤��ұ�
	var amt = getGridValue(rowData, rowid, "AMT");//��֤�����
	var drAmt = getGridValue(rowData, rowid, "DR_AMT");//�ⶳ���
	var djAmt = Number(FormatStr2Amt(amt) - FormatStr2Amt(drAmt));
	djAmt = FormatAmtByCCY(djAmt, ccy);
	$('#CURRMARGIN').jqGrid('setRowData', rowid, {
		DJ_AMT : djAmt
	});
}

function calEQNum() {
	var selRow = jQuery("#CURRMARGIN").jqGrid('getGridParam', 'reccount');
	var eqDeductAmtNum = 0;
	for (i = 1; i <= selRow; i++) {
		jQuery('#CURRMARGIN').jqGrid('saveRow', i, null, 'clientArray');
		var data = $("#CURRMARGIN").jqGrid('getRowData', i);
		var drEqAmt = data.DR_EQ_AMT;
		if (drEqAmt == '')
			drEqAmt = 0;
		else
			drEqAmt = FormatStr2Amt(drEqAmt)
			eqDeductAmtNum = eqDeductAmtNum + Number(drEqAmt);
			//$('#CURRMARGIN').jqGrid('setRowData',rowid,{DR_EQ_AMT:drEqAmt,DR_AMT:drAmt});
	}
	setFieldValue(document.UTFORM.MARG_CHANGE, eqDeductAmtNum);
	setFieldValue(document.UTFORM.MARGIN_DR_AMT, eqDeductAmtNum);
	if (typeof (onMarginChange) == 'function')
		onMarginChange();
}

function addMargin() {
	var trxCcy = getFieldValue(document.UTFORM.LC_CCY);//����׷�ӱ�֤��ֻ�Ƕ��������񣬽�CUST_CCY�̶�Ϊ���ױұ�
	var myRow = {
		CUST_CCY : trxCcy,
		MARG_CCY_JQ : 'CNY'
	};
	jQuery("#CURRMARGIN").jqGrid('addRowData', marginGridId, myRow, 'last');
	marginGridId++;
}

function ccyChange(val, rowid) {
	$('#CURRMARGIN').jqGrid('setRowData', rowid, {
		MARG_CCY_JQ : val
	});
}

function getDrMarginData() {
	var data = $("#CURRMARGIN").jqGrid('getRowData', 1);
	return data;
}

function initMarginTransfer() {
	var custid = $('#MARG_CUSTID').val();
	setExRateCustid(custid);
	var marginXml = $('#MARGININFO').val();
	if (marginXml != null && marginXml != "") {
		var x = parseXML(marginXml);
		var node = x.getElementsByTagName("MARGIN");
		var eqCcy = $('#MARG_CCY').val();
		for ( var i = 0; i < node.length; i++) {
			var tdnode = node[i];
			var accType = tdnode.childNodes[0].textContent || tdnode.childNodes[0].text;
			var ccy = tdnode.childNodes[1].textContent || tdnode.childNodes[1].text;
			var accNo = tdnode.childNodes[2].textContent || tdnode.childNodes[2].text;
			var amt = tdnode.childNodes[3].textContent || tdnode.childNodes[3].text;
			amt = FormatAmtByCCY(amt, ccy);
			var eqAmt = tdnode.childNodes[4].textContent || tdnode.childNodes[4].text;
			eqAmt = FormatAmtByCCY(eqAmt, eqCcy);
			var drAmt = tdnode.childNodes[5].textContent || tdnode.childNodes[5].text;
			drAmt = FormatAmtByCCY(drAmt, ccy);
			var drEqAmt = tdnode.childNodes[6].textContent || tdnode.childNodes[6].text;
			drEqAmt = FormatAmtByCCY(drEqAmt, eqCcy);

			var myrow = {
				ACCTYPE : accType,
				CCY : ccy,
				ACCNO : accNo,
				AMT : amt,
				EQ_AMT : eqAmt,
				DR_AMT : drAmt,
				DR_EQ_AMT : drEqAmt
			};
			jQuery("#CURRMARGIN").jqGrid('addRowData', i + 1, myrow, 'last');

			marginGridId++;
		}
	} else {
		var trxKey = $('#MARG_TRXKEY').val();
		$.ajax( {
			url : '/UtanWeb/CommUtilServlet',
			dataType : 'json',
			type : 'POST',
			data : 'OPERTYPE=ACCHISTROY&&TRANS_KEY=' + trxKey,
			async : false,
			error : function() {
				return;
			},
			success : function(response) {
				if (response.rows != null) {
					var MarginCount = response.rows.length;
					var MarginData;
					for ( var i = 0; i < MarginCount; i++) {
						MarginData = response.rows[i];
						jQuery("#CURRMARGIN").jqGrid('addRowData', i + 1, MarginData, 'last');
						//jQuery('#CURRMARGIN').jqGrid('setSelection',i+1,true);
			marginGridId++;
		}
		setMarginTransferInfo();
	}
}
		});
	}

}

//��֤��ת��
function setMarginTransferInfo() {
	var eqCcy = $('#MARG_CCY').val();
	var eqAmtNum = 0;
	var selRow = jQuery("#CURRMARGIN").jqGrid('getGridParam', 'reccount');
	for ( var i = 1; i <= selRow; i++) {
		var accCcy = $("#CURRMARGIN").jqGrid('getCell', i, "CCY");
		var accAmt = $("#CURRMARGIN").jqGrid('getCell', i, "AMT");

		var eqAmt = accAmt * getExRateByType(accCcy, eqCcy, 'BS');
		eqAmtNum = eqAmtNum + eqAmt;
		eqAmt = FormatAmtByCCY(eqAmt, eqCcy);
		accAmt = FormatAmtByCCY(accAmt, accCcy);
		$('#CURRMARGIN').jqGrid('setRowData', i, {
			AMT : accAmt,
			EQ_AMT : eqAmt
		});
	}
	setFieldValue(document.UTFORM.MARG_BAL, eqAmtNum);
	setTransferEqAmt();
}
//add by lgp at 20120625 for ��֤���ڲ�ת������У��
// modify by liaorizhi 20120924 ����bool���������ֱ�ӷ�����Զ����true
function checkTransferAmt(rowid, nameFlag){
	var rowData = jQuery('#CURRMARGIN').jqGrid('getRowData',rowid);
	var amt = 0;
	if(nameFlag==="EQ_AMT"){
		
//		eqAmt = data.EQ_AMT; //$('#'+rowid+'_EQ_AMT').val();
		var eqAmt = getGridValue(rowData, rowid, "EQ_AMT");
		var eqCcy = $('#MARG_CCY').val();				//���ױ���
		var margCcy = rowData.CCY;						//��֤�����
		if(!eqAmt){
			eqAmt = 0;
		} else {
			eqAmt = FormatStr2Amt(eqAmt);
		}
		amt  = eqAmt*getExRateByType(eqCcy,margCcy,'SB');
		
	} else {
		amt = getGridValue(rowData, rowid, "AMT");
	}
	var acctNo = rowData.ACCNO;
	var allRows = jQuery("#CURRMARGINHISTROY").jqGrid('getDataIDs');
	var bool = true;
	
	$.each( allRows, function(i, n){	
		hisRowData = jQuery('#CURRMARGINHISTROY').jqGrid('getRowData',n);
//		$('#CURRMARGIN').jqGrid('saveRow',rowid,null,'clientArray');
		var ccy = hisRowData.CCY;
		if(hisRowData.ACCNO == acctNo){
			var amtHis = hisRowData.AMT;
			amt = FormatStr2Amt(amt);
			amtHis = FormatStr2Amt(amtHis);
			if(amt > amtHis){
				amtHis = FormatAmtByCCY(amtHis,ccy);
				alert(hisRowData.ACCNO + "�˺��µı�֤��ת�����ܳ���" + amtHis);
//				$('#CURRMARGIN').jqGrid('setRowData',rowid,{AMT:amtHis} );
				bool =  false;
			}
			
		}
	});
	return bool;
}
// �����getGridValue������Ų��CommonFun.js���� [Bugfree_2167_����ҳ��]_B fanr 2013-12-27
// add by liaorizhi 20120925 ���㵥��ת����ı�֤����
function calTransferMarginAmt(rowid){
	jQuery('#CURRMARGIN').jqGrid('saveRow',rowid,null,'clientArray');
	
	var rowData = jQuery('#CURRMARGIN').jqGrid('getRowData',rowid);
	var marginCcy = rowData.CCY;
	var custCcy = rowData.CUST_CCY;
	var amt = FormatStr2Amt(rowData.AMT);
	var transCcy = $('#MARG_CCY').val();
	var transferCustAmt = amt * getExRateByType(marginCcy,custCcy,"BS");
	var transferTransAmt = amt * getExRateByType(marginCcy,transCcy,"BS");

	$('#CURRMARGIN').jqGrid('setRowData',rowid,{
		AMT:FormatAmtByCCY(amt,marginCcy), // ��ʽ��������
		CUST_AMT:FormatAmtByCCY(transferCustAmt,custCcy),
		EQ_AMT:FormatAmtByCCY(transferTransAmt,transCcy)  
	});	
	calculationEQNum(); //���ӹ黹��֤�����뱾�ι黹��֤���������   add by wangl 20131024 
}
function setTransferEqAmt() {
	var  trxAmt= getFieldValue(document.UTFORM.MARG_TRXAMT);
	var trxBalAmt = getFieldValue(document.UTFORM.BALBALAMT);
	var payAmt = getFieldValue(document.UTFORM.MARG_PAY_AMT);
	var eqCcy = getFieldValue(document.UTFORM.MARG_CCY);
	var pct = Number(payAmt / trxBalAmt);
	//var pct = Number(payAmt / trxAmt);

	var selRow = jQuery("#CURRMARGIN").jqGrid('getGridParam', 'reccount');
	var eqDeductAmtNum = 0;
	for ( var i = 1; i <= selRow; i++) {
		var accAmt = $("#CURRMARGIN").jqGrid('getCell', i, "AMT");
		var accEqAmt = $("#CURRMARGIN").jqGrid('getCell', i, "EQ_AMT");
		var accCcy = $("#CURRMARGIN").jqGrid('getCell', i, "CCY");
		var drAmt = FormatStr2Amt(accAmt) * payAmt / trxBalAmt;
		//var drEqAmt = FormatStr2Amt(accEqAmt)*pct;
		var drEqAmt = drAmt * getExRateByType(accCcy, eqCcy, 'BS');
		drAmt = FormatAmtByCCY(drAmt, accCcy);

		drEqAmt = FormatAmtByCCY(drEqAmt, eqCcy);
		eqDeductAmtNum = eqDeductAmtNum + FormatStr2Amt(drEqAmt);
		$('#CURRMARGIN').jqGrid('setRowData', i, {
			DR_AMT : drAmt,
			DR_EQ_AMT : drEqAmt,
			DR_EQ_AMT_BAK : drEqAmt
		});
	}

	setFieldValue(document.UTFORM.MARG_CHANGE, eqDeductAmtNum);
	setFieldValue(document.UTFORM.MARGIN_DR_AMT, eqDeductAmtNum);
	setFieldValue(document.UTFORM.MARG_NEED_PAY_AMT, eqDeductAmtNum);
}

function setMarginDeduct0info() {
	var selRow = jQuery("#CURRMARGIN").jqGrid('getGridParam', 'reccount');
	for ( var i = 1; i <= selRow; i++)
		$('#CURRMARGIN').jqGrid('setRowData', i, {
			DR_EQ_AMT : '0.00',
			DR_AMT : '0.00'
		});
	calEQNum();
}

function returnSetMarginDeduct0info() {
	var selRow = jQuery("#CURRMARGIN").jqGrid('getGridParam', 'reccount');
	for ( var i = 1; i <= selRow; i++) {
		var data = $("#CURRMARGIN").jqGrid('getRowData', i);
		$('#CURRMARGIN').jqGrid('setRowData', i, {
			DR_EQ_AMT : data.EQ_AMT,
			DR_AMT : data.AMT
		});
	}
	calEQNum();
}

function setMarginEditFalse() {
	marginEditFlag = false;
}

function removeStyle(obj) {
	$("#" + obj.id).css("border-color", "");
}

function clearMarginGrid() {
	var allRows = jQuery("#CURRMARGIN").jqGrid('getDataIDs');
	$.each(allRows, function(i, n) {
		jQuery('#CURRMARGIN').jqGrid('delRowData', n);
	});
	setFieldValue($('#MARG_CHANGE').get(0), 0);
}

function checkPayAmt() {
	var needpayAmt = getFieldValue(document.UTFORM.MARG_NEED_PAY_AMT);
	var payAmt = getFieldValue(document.UTFORM.MARG_CHANGE);
	if (payAmt > needpayAmt) {
		alert('ʵ�۱�֤�������۱�֤��!');
		return false;
	}
	return true;
}

//add by xlz ��֤�𸶻�ҳ����ۻ����
function marginPayForJSH() {
	var allRows = jQuery("#CURRMARGIN").jqGrid('getDataIDs');
	var jshNO = 0;
	var jshFlag;
	var rowData;
	var transCcy = $('#MARG_CCY').val();
	var marginCcy = "";
	var drAmt = "";
	$.each(allRows, function(i, n) {
		rowData = jQuery('#CURRMARGIN').jqGrid('getRowData', n);
		marginCcy = rowData.CCY;
		drAmt = rowData.DR_AMT;
		drAmt = FormatStr2Amt(drAmt);
		if (transCcy != null && transCcy != "" && marginCcy != null && marginCcy != "" && drAmt > 0) {
			if (transCcy != marginCcy) {
				jshNO += 1;
			//	if (transCcy == "CNY" || marginCcy == "CNY") {
				if (transCcy != marginCcy ) {
					jshFlag = "YES";
				}
			}
		}
	});
	if (jshFlag == "YES") {
		//setProperty(document.UTFORM.MARG_JSHDM, "O");
		setProperty(document.UTFORM.MARG_JSHDM, "M");
	} else {
		setProperty(document.UTFORM.MARG_JSHDM, "P");
		setFieldValue(document.UTFORM.MARG_JSHDM, "");
	}
}


// add by liaorizhi 20120924 start ����֤��׷�ӱ�֤��
function changeMarginTransRate(rowDataArr){
	if(!rowDataArr || rowDataArr.length != 1 ) return; // ֻ����ѡһ��ѯ�۱��
	
	var allRows = jQuery("#CURRMARGIN").jqGrid('getDataIDs');
	var obj = rowDataArr[0];
	var askType = obj.TRANS_TYPE;
	var selCcy = obj.SEL_CCY;
	var buyCcy = obj.BUY_CCY;

	$.each( allRows, function(i, n){
			jQuery('#CURRMARGIN').jqGrid('saveRow',n,null,'clientArray');
			rowData = jQuery('#CURRMARGIN').jqGrid('getRowData',n);
			
			if (buyCcy == rowData.CUST_CCY && "JH" == askType) {
				$('#CURRMARGIN').jqGrid('setRowData',n,{MARGIN_BUYRATE:obj.BUYRATE});
				$('#CURRMARGIN').jqGrid('setRowData',n,{D_PP_SELRATE:obj.PPSELRATE});
			} else if (selCcy == rowData.MARG_CCY_JQ && "SH" == askType) {
				$('#CURRMARGIN').jqGrid('setRowData',n,{MARGIN_SELLRATE:obj.SELRATE});
				$('#CURRMARGIN').jqGrid('setRowData',n,{D_PP_BUYRATE:obj.PPBUYRATE});
			}else if ("TH" == askType) {
				if (buyCcy == rowData.CUST_CCY) {
					$('#CURRMARGIN').jqGrid('setRowData',n,{MARGIN_BUYRATE:obj.BUYRATE});
					$('#CURRMARGIN').jqGrid('setRowData',n,{D_PP_SELRATE:obj.PPSELRATE});
				} 
				if (selCcy == rowData.MARG_CCY_JQ) {
					$('#CURRMARGIN').jqGrid('setRowData',n,{MARGIN_SELLRATE:obj.SELRATE});
					$('#CURRMARGIN').jqGrid('setRowData',n,{D_PP_BUYRATE:obj.PPBUYRATE});
				}
			}
			calculation(n, 'EQ');
		});
		$('#ASKPRICE_NO').val(obj.ASKPRICE_NO);
}

// add by liaorizhi 20120924 ��ѡ���ѯ�۱��У�� ������֤��׷�ӱ�֤��
function chooseAskNoCheckMargin(rowDataArr){
	var allRows = jQuery("#CURRMARGIN").jqGrid('getDataIDs');
	var obj = rowDataArr[0]; // һ��ֻ��ѡ��һ��ѯ�۱��
	var askType =  obj.TRANS_TYPE;
	var bool = false;
	
	$.each( allRows, function(i, n){
		jQuery('#CURRMARGIN').jqGrid('saveRow',n,null,'clientArray');
		rowData = jQuery('#CURRMARGIN').jqGrid('getRowData',n);
		
		var custCcy = rowData.CUST_CCY;
		var marginCcy  = rowData.MARG_CCY_JQ;
		var custAmt = FormatStr2Amt(rowData.CUST_AMT);
		
		if(custCcy != marginCcy && custAmt > 0){
			if(custCcy == "CNY" && askType == "SH"){
				return bool = true;
			}else if(marginCcy == "CNY" && askType == "JH"){
				return bool = true;
			}else if(askType == "TH" && custCcy != "CNY" && marginCcy!= "CNY"){
				return bool = true;
			}
		}
	});
	if(!bool){
		alert("������ʾ���ñ�ѯ�۱������["+askType+"]�����飡");
		$('#ASKPRICE_NO').val('');
	}

	return bool;
}

function lookupOnChangeSYS(lookupName,rowDataArr) {
	if (lookupName == "ASKPRICELK" && rowDataArr.length > 0) {
		if(!chooseAskNoCheckMargin(rowDataArr)) return;
		updateSysExrateByASK(rowDataArr);
		changeMarginTransRate(rowDataArr);
	}
}

function createMarginHistoryInfo(){
//	CURRMARGINHISTROY_GRID_JSON
	var jsonData = $("#CURRMARGINHISTROY").jqGrid('getRowData');
	var jsonDataStr = $.toJSON(jsonData, function(key, value){
		if(key==="AMT" || key==="EQ_AMT"){
			return FormatStr2Amt(value);
		}
		return value;
	});
	$("#CURRMARGINHISTROY_GRID_JSON").val(jsonDataStr);
}

function setBAL_AMT(){
	var MARG_TRXKEY = getFieldValue("MARG_TRXKEY");
	// BAL_TYPE='LC_MAXBAL';     ����֤
	// BAL_TYPE='SG_BAL';        �������
	// BAL_TYPE='LGISS_BAL';     ����
	// BAL_TYPE='YQJSH_BAL';     Զ���ۻ�
	// BAL_TYPE='YQJSH_BAL';     Զ�ڽ��
	var sql = "select * from BAL_MASTER where OWN_TRANS_KEY='" + MARG_TRXKEY + "' and (BAL_TYPE='LC_MAXBAL' or BAL_TYPE='SG_BAL' or BAL_TYPE='LGISS_BAL' or BAL_TYPE='YQJSH_BAL' or BAL_TYPE='YQJSH_BAL')";
	executeQuery("BAL_BALAMTData", sql);
	var BAL_BALAMT = 0;
	var size = getDataSize("BAL_BALAMTData");
	if(size === 0){ // �������û�����Ϣ,ȡ���׽��
		BAL_BALAMT = getFieldValue("MARG_TRXAMT");
	} else if(size === 1){
		BAL_BALAMT = getTableFieldValue("BAL_BALAMTData", 1, "BAL_BALAMT");
	} else {
		alert("��������,��������ȡ���˶�������!�޷��жϽ������,������ֵΪ0");
	}
	setFieldValue("BAL_BALAMT", BAL_BALAMT);
}

function BAL_AMT_onChange(){
	var BAL_BALAMT = getFieldValue("BAL_BALAMT");
	var MARG_PCT = getFieldValue("MARG_PCT");
	var MARG_AMT = BAL_BALAMT*MARG_PCT/100;
	setFieldValue("MARG_AMT", MARG_AMT);
}

//add by wangbq for �������п�֤�ȱ�֤��ҳ�渳Grid
function initMarginBase(){
	var marginXml = $('#MARGININFO').val();
//	marginXml ="";
	var custid = $('#MARG_CUSTID').val();
		setExRateCustid(custid);
	if (marginXml != null && marginXml != "") {
		clearMarginGrid();//ADD FOR 20170607����֤��gridǰ�����gird
		var x = parseXML(marginXml);
		var node = x.getElementsByTagName("MARGIN");
		var eqCcy = $('#MARG_CCY').val();
		for ( var i = 0; i < node.length; i++) {
			var tdnode = node[i];
			var custCcy = tdnode.childNodes[0].textContent || tdnode.childNodes[0].text;
			var custAmt = tdnode.childNodes[1].textContent || tdnode.childNodes[1].text;
			custAmt = FormatAmtByCCY(custAmt, custCcy);
			var eqAmt = tdnode.childNodes[2].textContent || tdnode.childNodes[2].text;
			eqAmt = FormatAmtByCCY(eqAmt, eqCcy);
			var custAcct = tdnode.childNodes[3].textContent || tdnode.childNodes[3].text;
			var margCcy = tdnode.childNodes[4].textContent || tdnode.childNodes[4].text;
			var margAmt = tdnode.childNodes[5].textContent || tdnode.childNodes[5].text;
			margAmt = FormatAmtByCCY(margAmt, margCcy);
			var margAcct = tdnode.childNodes[6].textContent || tdnode.childNodes[6].text;

			//add by wt 2012-6-28  ��֤�����
			//var  = tdnode.childNodes[7].textContent || tdnode.childNodes[7].text;
			var margBuyRate = tdnode.childNodes[8].textContent || tdnode.childNodes[8].text;
			var margSellRate = tdnode.childNodes[9].textContent || tdnode.childNodes[9].text;
			//end
			// add by liaorizhi 20120925 start ��ʾƽ�̼�
			var buyPPRate = tdnode.childNodes[10].textContent || tdnode.childNodes[10].text;
			var selPPRate = tdnode.childNodes[11].textContent || tdnode.childNodes[11].text;
			// add by liaorizhi 20120925 end ��ʾƽ�̼�
			
			// add by gaof
			var bzjkyyeAmt = tdnode.childNodes[14].textContent || tdnode.childNodes[14].text;
			var bzjdjjeAmt = tdnode.childNodes[15].textContent || tdnode.childNodes[15].text;
			var ypNo = tdnode.childNodes[16].textContent || tdnode.childNodes[16].text;
			var djAmt= tdnode.childNodes[17].textContent || tdnode.childNodes[17].text;
			djAmt = FormatAmtByCCY(djAmt, margCcy);
			// add by gaof
			var prodType ="";
			var acctSeqno ="";
			if(tdnode.childNodes.length>=20){
			 prodType= tdnode.childNodes[18].textContent || tdnode.childNodes[18].text;
			 acctSeqno= tdnode.childNodes[19].textContent || tdnode.childNodes[19].text;
			}
			// add by mjl start :���ӱ�֤���Ʒ���͡��˻����
			// add by mjl end
			var myrow = {
				CUST_CCY : custCcy,
				CUST_AMT : custAmt,
				EQ_AMT : eqAmt,
				CUST_ACCT : custAcct,
				MARG_CCY_JQ : margCcy,
				MARG_AMT : margAmt,
				
				BZJKYYE_AMT:bzjkyyeAmt,
				BZJDJJE_AMT:bzjdjjeAmt,
				
				MARG_ACCT : margAcct,
				MARGIN_BUYRATE : margBuyRate,
				MARGIN_SELLRATE : margSellRate,
				D_PP_BUYRATE : buyPPRate,
				D_PP_SELRATE : selPPRate,
				YP_NO:ypNo,
				DJ_AMT:djAmt,
				PROD_TYPE : prodType,
				SEQ_NO : acctSeqno
				
			};

//			var currType = $('#CURR_TASKTYPE').val();
//			var currTaskType = $('#SYS_TASK_TYPE').val();
//			if (currType == 'FIXPENDING' || currTaskType == 'PAUSESAVE') { //add by wt 2012-7-11  �����޸����⴦�� ,�ݴ洦���Ƚ϶��ģ���Ҳ����
//				jQuery("#CURRMARGIN").jqGrid('setRowData', marginGridId, myrow);
//			} else {
				jQuery("#CURRMARGIN").jqGrid('addRowData', marginGridId, myrow, 'last');
//			}

			marginGridId++;
		}
	}else{
		var margTrxKey = getFieldValue(document.UTFORM.MARG_TRXKEY);
		var margTrxType = getFieldValue(document.UTFORM.MARG_TRXTYPE);
		jQuery('#CURRMARGIN').jqGrid('setGridParam',{url:'/UtanWeb/CommUtilServlet?OPERTYPE=MARGBASEINFO',datatype:'json',postData:{"MARG_TRXKEY":margTrxKey,"MARG_TRXTYPE":margTrxType}}).trigger('reloadGrid');
		
		setMargPct();//�Ŵ���֤�����
	}
}

//add by yangcl for ����ƴװ��֤��xml��ϸ����
function formatMarginDetailsXml(){
	try {
		$("#marginDetailsXml").val("");
		var formatMarginDetailsXml = "<?xml version='1.0' encoding='UTF-8'?><marginDetailsXml>";
		var isFlag = false;
		if ($('#CURRMARGIN').get(0) != null) {
			var rowData;
			var allRows = jQuery("#CURRMARGIN").jqGrid('getDataIDs');
			$.each(allRows, function(i, n) {
				jQuery('#CURRMARGIN').jqGrid('saveRow', n, null, 'clientArray');
			});
			if (allRows != null && allRows.length > 0) {
				isFlag = true;
				var margCcy = '', margAmt = '', margAccount = '';
				$.each(allRows,
					function(i, n) {
						rowData = jQuery('#CURRMARGIN').jqGrid('getRowData', n);
						margCcy = rowData.MARG_CCY_JQ;
						margAmt = FormatStr2Amt(rowData.MARG_AMT);
					    margAccount = rowData.MARG_ACCT;
						if (margAmt != 0 && "" != margAccount) {
							formatMarginDetailsXml = formatMarginDetailsXml + "<marginDetail margAccount=\"" + margAccount + "\" margAmt=\"" + margAmt + "\"  margCcy=\"" + margCcy + "\" />";
                        }
					 }
				);
			}
		}
		if ($('#CURRMARGINHISTROY').get(0) != null) {
			var rowData;
			var allRows = jQuery("#CURRMARGINHISTROY").jqGrid('getDataIDs');
			$.each(allRows, function(i, n) {
				jQuery('#CURRMARGINHISTROY').jqGrid('saveRow', n, null, 'clientArray');
			});
			if (allRows != null && allRows.length > 0) {
				isFlag = true;
				var margCcy = '', margAmt = '', margAccount = '';
				$.each(allRows,
					function(i, n) {
						rowData = jQuery('#CURRMARGINHISTROY').jqGrid('getRowData', n);
						margCcy = rowData.CCY;
						margAmt = FormatStr2Amt(rowData.AMT);
					    margAccount = rowData.MACCNO;
						if (margAmt != 0 && "" != margAccount) {
							formatMarginDetailsXml = formatMarginDetailsXml + "<marginDetail margAccount=\"" + margAccount + "\" margAmt=\"" + margAmt + "\"  margCcy=\"" + margCcy + "\" />";
                        }
					 }
				);
			}
		}
		if (isFlag) {
			formatMarginDetailsXml = formatMarginDetailsXml + "</marginDetailsXml>";
			$('#marginDetailsXml').val(formatMarginDetailsXml);
		}
	} catch (e) {
         $("#marginDetailsXml").val(""); 
	}
}
//���㱣֤��ͻ��ʽ���֤���˺Ž��۽��ױ��ֽ��
function calculationCQ(rowid, type) {

	initMarginExrateInfoCQ();
  
	//  ����׷�ӱ�֤����������ñ�֤����ֶ�Ӧ������۸�ֵ��  ���������ÿͻ����ֵ������۸�ֵ
	var rowData = jQuery('#CURRMARGIN').jqGrid('getRowData', rowid);
	var custCcy = rowData.CUST_CCY; //�ͻ�����
	var margCcy = rowData.MARG_CCY_JQ; //��֤�����
	var transCcy = $('#MARG_CCY').val(); //���ױ���

	var eqAmt; //�۽��ױ��ֽ��
	var custAmt;
	if (type == 'EQ') //��ʾ���۽��ױ�������
	{
		eqAmt = rowData.EQ_AMT; //�۽��ױ��ֽ��
		if (eqAmt == null || eqAmt == '') {
			eqAmt = 0;
		} else {
			eqAmt = FormatStr2Amt(eqAmt);
		}
		custAmt = eqAmt.accMul(getExRateByType(transCcy, custCcy, 'SB'));
	} else { //��ʾ�ñ�֤��������
		margAmt = rowData.MARG_AMT; //��֤����
		if (margAmt == null || margAmt == '') {
			margAmt = 0;
		} else {
			margAmt = FormatStr2Amt(margAmt);
		}
		eqAmt = margAmt.accMul(getExRateByType(margCcy, transCcy, 'BS'));
	}
    var eqCcy = $('#MARG_CCY').val();
	$('#MARG_CHANGE_CCY').val(eqCcy);
	$('#MARG_ADD_CCY').val(eqCcy);
	setFieldValue(document.UTFORM.MARG_CHANGE,eqAmt);
	setFieldValue(document.UTFORM.MARG_ADD_AMT,eqAmt);
	//var margAmt = custAmt.accMul(getExRateByType(custCcy, margCcy, 'BS'));

	eqAmt = FormatAmtByCCY(eqAmt, transCcy);
	//custAmt = FormatAmtByCCY(custAmt, custCcy);
	//margAmt = FormatAmtByCCY(margAmt, margCcy);
	$('#CURRMARGIN').jqGrid('setRowData', rowid, {
		//CUST_AMT : custAmt,
		EQ_AMT : eqAmt,
		//MARG_AMT : margAmt
	});
	jQuery('#CURRMARGIN').jqGrid('saveRow', rowid, null, 'clientArray');
	calEQAMT(rowid);
	changMarginCcyForJSH(rowid, "Cr");
}
function initMarginExrateInfoCQ() {
	//return;//
	saveMargin();
	var allRows = jQuery("#CURRMARGIN").jqGrid('getDataIDs');
	$.each(allRows, function(i, rowid) {
		rowData = jQuery('#CURRMARGIN').jqGrid('getRowData', rowid);
		var marginBuyRate = getCCYRateByType(rowData.MARG_CCY_JQ, 'B'); //�����
		var marginSellRate = getCCYRateByType(rowData.CUST_CCY, 'S'); //������
		var marginPPBuyRate = getCCYRateByType(rowData.CUST_CCY, 'PB');
		var marginPPSelRate = getCCYRateByType(rowData.MARG_CCY_JQ, 'PS');
		
			$('#CURRMARGIN').jqGrid('setRowData', rowid, {
				MARGIN_BUYRATE : marginBuyRate,
				MARGIN_SELLRATE : marginSellRate,
				D_PP_BUYRATE : marginPPBuyRate,
				D_PP_SELRATE : marginPPSelRate
			});
		});
}