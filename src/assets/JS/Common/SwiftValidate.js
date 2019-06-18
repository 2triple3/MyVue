//-----------------C类规则--------------------
/**
 * 验证货币是否相同
 * @param {Object} c 
 * @return {TypeName} 
 */
function C02_submit(CurrencyArray)
{
	var t = true;	
	//判断货币种类数组中，货币种类是否相同
	for(var i = 0; i < CurrencyArray.length; i ++){
		var j = i + 1;
		if(j < CurrencyArray.length){
			if(CurrencyArray[i].length > 0){
				if(CurrencyArray[j].length > 0){
					//如果发现有不相等的币种，退出循环并进入报错
					if(CurrencyArray[i] != CurrencyArray[j]){
						t = false;
						break;
					}
				}else{
					CurrencyArray[j] = CurrencyArray[i];
				}
			}
		}
	}
	//弹出报错信息
	if(t == false){
		if(this.type == "MT_320"){
		//B区32B,32H,34E与 H区71F中货币币种必须相同
			alert("B区F32B,F32H,F34E,H区F71F中的货币种类必须相同!");
		}
		else if(this.type == "MT_103" || this.type == "MT_103_STP"){
			alert("[C02]:The currency code in the fields 71G and 32A must be the same.");
		}
		else if(this.type == "MT_104" || this.type == "MT_107"){
			
		}
		else{
			
		}
	}
	return t;
}
/**
 * 报文项中，必填项，M属性，必须验证
 * MTs 300, 303, 304, 305, 306, 320, 330, 340, 
 * 341, 350, 360, 361, 
 * 362, 364, 365, 600, 601, 620, and 643 
 * @param {Object} fields 需要验证的字段数组
 * @memberOf {TypeName} 
 * @return {TypeName} 
 */
function C32(fields)
{
	var success = true;
	$(fields).each(function(i,t){
		if($(t).val() == ""){
			alert("必填项不能为空!");
			setFocus($(t)[0]);
			success = false;
			return false;
		}
	});
	return success;
}

/**
 * 公共验证规则C81
 * 1.如果56a出现，57A必选
 * 2.如果56a不出现，57A可选
 * MTs 103, 103 REMIT, 103 STP, 202, 202 COV (sequence A), 203, 205, and 205 COV (sequence A)
 * @param {Object} fields 需要验证的字段数组
 */
function C81(objs)
{
	//如果56出现，57必选
	if($(objs.C56).val() != ""){
		setProperty_swift(objs.C57,"M");
	}
	else
	{
		setProperty_swift(objs.C57,"O");
	}
}

/**
 * 公共验证规则C90
 * 栏位42C和42a若出现则必须同时出现
 * 可以出现栏位42C+42a组合、单一42M、单一42P，不允许使用此三种方式之外的组合
 * MTs 700, 710, 720, and 740
 */
function C90_submit(objs)
{
	var C90_ERROR_1 = "[C90]:When used, fields 42C and 42a must both be present.";
	var C90_ERROR_2 = "[C90]:Either fields 42C and 42a together, or field 42M alone, or field 42P alone may be present. No other combination of these fields is allowed.";
	//C42 F42C F42M F42P
	var C42 = objs.C42.val();
	var F42C = objs.F42C.val();
	var F42M = objs.F42M.val();
	var F42P = objs.F42P.val();
	
	//栏位42C和42a区域不同时出现
	if((C42 != "" && F42C == "") || (C42 == "" && F42C != "")){
		alert(C90_ERROR_1);
		return false;
	}
	//如果C42与F42C不为空
	if(C42 != "" && F42C != ""){
		//如果F42M与F42P不为空
		if(F42M != "" || F42P !=""){
			alert(C90_ERROR_2);
			return false;
		}
	}
	else{
		//如果F42M不为空，F42P也不为空
		if(F42M != "" && F42P !=""){
			alert(C90_ERROR_2);
			return false;
		}
	}
	
	return true;
	
}

//-----------------D类规则--------------------

/**
 * 公共验证规则D50_submit
 * 栏位39A或39B中有且仅有一个栏位可以出现
 * MT 535
 * MTs 700, 705, 707, 710, 720, 740, and 747
 * objs
 */
function D05_submit(objs){
	var D05_ERROR = "[D05]:Either field 39A or field 39B, but not both, may be present.";
	//MTs 700, 705, 707, 710, 720, 740, and 747
	if(this.type != "MT_535"){
		//39A
		var F39A_01 = objs.F39A_01.val();
		var F39A_02 = objs.F39A_02.val();
		var F39B = objs.F39B.val();
		if(F39B == null){
			F39B = "";
		}
		//如果都存在
		if(F39A_01 != "" && F39A_02 != "" && F39B != ""){
			alert(D05_ERROR);
			return false;
		}
	}
	return true;
}

/**
 * 公共验证规则D06_submit
 * 栏位39A或39B中有且仅有一个栏位可以出现
 * MTs 700, 705, 707, 710, and 720
 */
function D06_submit(objs){
	var D06_ERROR = "[D06]:Either field 44C or 44D but not both, may be present.";
	if(objs.F44C.val() != "" && objs.F44D.val() != ""){
		alert(D06_ERROR);
		return false;
	}
	return true;
}



/**
 * 公用验证规则-D49_submit
 * MTs 103, 103 REMIT, and 103 STP 发报行与收报行编码控制33B字段
 * MTs 102 and 102 STP			   发报行与收报行编码控制33B字段
 * MT 504
 * MT 505
 * @param {Object} objs 
 * 如果不是MT504，MT505，objs对象是发报行(sender)、收报行对象(receiver)、33B 币种(cur),(amount)金额
 */
function D49_submit(objs)
{
	var retFlag = true;
	//国家编码
	var D49_CountryCode = ["AD","AT","BE","BG","BV","CH","CY","CZ","DE","DK","EE","ES","FI","FR",
							"GB","GF","GI","GP","GR","HU","IE","IS","IT","LI","LT","LU","LV","MC", 
							"MQ","MT","NL","NO","PL","PM","PT","RE","RO","SE","SI","SJ","SK","SM","TF","VA","MX"];	
    if(this.type !="MT_504" && this.type != "MT_505"){
    	//发送行国家编码
    	var sendCountryCode = $(objs.sender).val().substring(4,6);
    	//接受行国家编码
    	var recCountryCode = $(objs.receiver).val().substring(4,6);    	
    	//验证发送行国家编码是否存在数组之中
    	var ret1 = false;
    	for(var i = 0; i <D49_CountryCode.length; i++){
    		if(sendCountryCode == D49_CountryCode[i]){
    			ret1 = true;
    			break;
    		}
    	}    	
    	//验证接受行国家编码是否存在数组之中
    	var ret2 = false;
    	for(var i = 0; i <D49_CountryCode.length; i++){
    		if(recCountryCode == D49_CountryCode[i]){
    			ret2 = true;
    			break;
    		}
    	}
    	
    	//如果发送行与接受上的国家代码都在国家代码数组中
    	if(ret1 == true && ret2 == true)
    	{
	    	if(objs.cur.val() == "" || objs.amount.val() == "")
	    	{
	    		alert("[D49]:If the country codes of the Sender's and the Receiver's BICs are within the following " +
	    		"	list: AD, AT, BE, BG, BV, CH, CY, CZ, DE, DK, ES, EE, FI, FR, GB, GF, GI, GP, GR, HU, IE, IS, IT, " +
	    		"LI, LT, LU, LV, MC, MQ, MT, NL, NO, PL, PM, PT, RE, RO, SE, SI, SJ, SK, SM, TF and VA, then field 33B is mandatory," +
	    		" otherwise field 33B is optional ")
	    		retFlag = false;
	    	}
	    	
    	}
    	else{
    		setProperty_swift(objs.cur,"O");
	    	setProperty_swift(objs.amount,"O");
    	}
    }
    return retFlag;
}

/**
 * 公用验证规则-D50
 * MTs 102 and 102 STP  71A=SHA,71F可选，71G不允许
 * MTs 103, 103 REMIT, and 103 STP
 * MT 504
 * MT 505
 * @param {Object} objs
 */
function D50(objs){
	
	if(this.type != "MT_504" && this.type != "MT_505")
	{
		var F71A_VAL = objs.F71A.val();
		if(F71A_VAL == "SHA"){
			objs.Loop_Currency.each(function(i,t){
				setProperty_swift($(this),"O");
				setProperty_swift($(objs.Loop_Amount.get(i)),"O");
			});
			setProperty_swift(objs.F71G_Currency,"P");
			setProperty_swift(objs.F71G_Amount,"P");
		}
	}
	
}

/**
 * 公用验证规则-D51
 * 如果71F(至少出现一次)或71G栏出现,那么33B栏是必须出现,反之, 33B栏是可选的
 * MTs 102 and 102 STP
 * MTs 103, 103 REMIT, and 103 STP
 * @param {Object} objs
 */
function D51(objs){
	var flag = false;
	objs.Loop_Currency.each(function(i,t){
		//判断币种与金额都不等于空
		if($(objs.Loop_Amount.get(i)).val() != "" && $(this).val() != ""){
			flag = true;
			return false;
		}
	});
	//如果71G币种与金额字段都不为空
	if(objs.F71G_Currency.val() != "" && objs.F71G_Amount.val() != ""){
		//如果F71F币种与金额实现(不为空)
		if(flag == true){
			//F33B不可用
			objs.F33B_Currency.val("");
			objs.F33B_Amount.val("");
			setProperty_swift(objs.F33B_Currency ,"P");
			setProperty_swift(objs.F33B_Amount ,"P");			
		}
		//如果F71F币种与金额实现(为空)
		else{
			//F33B必须
			setProperty_swift(objs.F33B_Currency,"M");
			setProperty_swift(objs.F33B_Amount,"M");	
		}
	}
	//71G币种与金额字段都不空
	else{
		if(flag == true){
			//F33B必选
			setProperty_swift(objs.F33B_Currency,"M");
			setProperty_swift(objs.F33B_Amount,"M");			
		}
		//如果F71F币种与金额实现(为空)
		else{
			//F33B可选
			setProperty_swift(objs.F33B_Currency,"O");
			setProperty_swift(objs.F33B_Amount,"O");	
		}
	}
}

/**
 * 公用验证规则-D51_submit 提交时使用
 * 如果71F(至少出现一次)或71G栏出现,那么33B栏是必须出现,反之, 33B栏是可选的
 * MTs 102 and 102 STP
 * MTs 103, 103 REMIT, and 103 STP
 * @param {Object} objs
 */
function D51_submit(objs){
	var retFlag = true;
	var flag = false;
	objs.Loop_Currency.each(function(i,t){
		//判断币种与金额都不等于空
		if($(objs.Loop_Amount.get(i)).val() != "" && $(this).val() != ""){
			flag = true;
			return false;
		}
	});
	//如果71G币种与金额字段都不为空
	if(objs.F71G_Currency.val() != "" && objs.F71G_Amount.val() != ""){
		//如果F71F币种与金额实现(为空)
		if(flag == false){
			//F33B必须	
			if(objs.F33B_Currency.val() == "" || objs.F33B_Amount.val() == ""){
				alert("[D51]:If either field 71F (at least one occurrence) or field 71G is present, then field 33B is mandatory, otherwise field 33B is optional. ");
				retFlag = false;
			}
		}
	}
	//71G币种与金额字段都不空
	else{
		if(flag == true){
			//F33B必选
			//F33B必须	
			if(objs.F33B_Currency.val() == "" || objs.F33B_Amount.val() == ""){
				alert("[D51]:If either field 71F (at least one occurrence) or field 71G is present, then field 33B is mandatory, otherwise field 33B is optional. ");
				retFlag = false;
			}			
		}
	}
	return retFlag;
}



/**
 * 公用验证规则-D56
 * MT_320 A区22B控制B区域F32H、F30X
 * MT_330
 * MT_620
 * @param {Object} mtsType
 * @param {Object} fieldObjs
 */
function D56(objs)
{
	if($(objs.A_22B).val() == "CONF")
	{
	 	setProperty_swift(objs.B_32H_Sign,"P");
	 	setProperty_swift(objs.B_32H_Currency,"P");
	 	setProperty_swift(objs.B_32H_Amount,"P");
	 	switch (this.type)
	 	{
	 		case "MT_320":
	 			setProperty_swift(objs.B_30X,"M");
	 			break;
	 			
	 		case "MT_330":
	 			setProperty_swift(objs.B_30X,"P"); 			
	 			break;
	 			
	 		case "MT_620":
	 			setProperty_swift(objs.B_30X,"M");
	 			break;		 			
	 		default:
	 			break;
	 	}
	}
	
	if($(objs.A_22B).val() == "MATU" ){
		setProperty_swift(objs.B_32H_Sign,"M");
	 	setProperty_swift(objs.B_32H_Currency,"M");
	 	setProperty_swift(objs.B_32H_Amount,"M");
	 	setProperty_swift(objs.B_30X,"P");
	}
	
	//MT_330验证内容		
	if($(objs.A_22B).val() == "CHNG" || $(objs.A_22B).val() == "CINT"){
		setProperty_swift(objs.B_32B,"M");
		setProperty_swift(objs.B_32H_Sign,"M");
	 	setProperty_swift(objs.B_32H_Currency,"M");
	 	setProperty_swift(objs.B_32H_Amount,"M");
		setProperty_swift(objs.B_30X,"O");
	}
	
	if($(objs.A_22B).val() == "SETT" || $(objs.A_22B).val() == "ROLL"){
		//setProperty(objs.B_32B,"P");
		setProperty_swift(objs.B_32B,"P");
		setProperty_swift(objs.B_32H_Sign,"M");
	 	setProperty_swift(objs.B_32H_Currency,"M");
	 	setProperty_swift(objs.B_32H_Amount,"M");
		setProperty_swift(objs.B_30X,"M");
	}
}
/**
 * 公共验证规则D57
 * MTs 102, 102 STP, 104, and 107  C.71G  金额不为0
 * MTs 103, 103 REMIT, and 103 STP 71G    金额不为0
 * MT320,MT330,MT370,MT 620 详细见文档
 * @param {Object} objs
 * @memberOf {TypeName} 
 * @return {TypeName} 
 */
function D57_submit(objs)
{
	var ret = true;
	if(this.type == "MT_320" || this.type == "MT_330" || this.type == "MT_620")
	{		
		if(objs.Depend_FD_1.val() == "MATU" || objs.Depend_FD_1.val() == "SELL"){
			if(objs.Depend_FD_2.val() == "L"){
				if(objs.Sign.val() != "N" && objs.Amount.val() != 0){
					alert("32H字段必须为负数或者0！");
					ret = false;
				}
			}
			else{
				if(objs.Sign.val() == "N"){
					alert("32H字段必须为正数或者0！");
					ret = false;
				}
			}
		}
		
	}
	//暂时不实现
	else if(this.type == "MT_370"){
		
	}
	//MT103
	else
	{
		if(objs.Amount.val() !="" && objs.Amount.val() == "0.00"){				
			alert("[D57]:If field 71G is present, the amount must not equal '0' ");
			ret = false;
		}
	}
	return ret;
}
/**
 * 公用验证规则-D60
 * MT320,330,620
 * MT341
 * MT101
 * @param {Object} filedContent
*/
function D60(objs)
{
	if(this.type == "MT_320" || this.type == "MT_330" || this.type == "MT_620"){
		if($(objs.B_30F).val() != ""){
			setProperty_swift(objs.B_38J_Indicator,"M");
			setProperty_swift(objs.B_38J_Number,"M");				
			
		}else{
			setProperty_swift(objs.B_38J_Indicator,"P");
			setProperty_swift(objs.B_38J_Number,"P");
		}
	}
	if(this.type == "MT_341"){
		if($(objs.B_30V).val() != ""){
			setProperty_swift(objs.B_38D,"M");
		}else{
			setProperty_swift(objs.B_38D,"M");
		}
	}
	if(this.type == "MT_101"){
		if($(objs.B_33B).val() != "" && $(objs.B_3B).val() == 0){
			setProperty_swift(objs.B_36,"P");
		}
		else if($(objs.B_33B).val() != "" && $(objs.B_3B).val() != 0){
			setProperty_swift_swift(objs.B_36,"M");
		}
		if($(objs.B_33B).val() == ""){
			setProperty_swift(objs.B_36,"P");
		}
	}
}
/**
 * 公用验证规则-D69
 * MTs320 and 620
 * MT_330
 * MT_340
 * @param {Object} objs
 */
function D69(objs)
{
	if(this.type != "MT_340"){			
		if(objs.A_22B.val() == "MATU" || objs.A_22B.val() == "SETT"){
			setProperty_swift(objs.B_30F,"P");
		}else{
			setProperty_swift(objs.B_30F,"O"); 
		}
	}
	else{
		//暂不实现，未理解
	}
}

/**
 * 公用验证规则-D70
 * MT_300 A区域22A控制A区域21字段
 * MTs 320, 330, and 620
 * @param {Object} objs
*/
function D70(objs)
{
	if(this.type == "MT_300"){
		if($(objs.A_22A).val() == "AMND" || $(objs.A_22A).val() == "CANC"){
			setProperty_swift(objs.A_21,"M");
		}
		else{
			setProperty_swift(objs.A_21,"P");
		}
	}
	//MT320报文	
	else
	{
		if($(objs.A_22B).val() == "CONF"){
			if($(objs.A_22A).val() == "NEWT"){
				setProperty_swift(objs.A_21,"O");
			}
			else{
				if($(objs.A_22A).val() != "" && $(objs.A_22A).val() != "NEWT"){
					setProperty_swift(objs.A_21,"M");
				}
				else{
					setProperty_swift(objs.A_21,"O");
				}
			}
		}
		else{
			if($(objs.A_22B).val() != ""){
				setProperty_swift(objs.A_21,"M");
			}
			else
			{
				setProperty_swift(objs.A_21,"O");
			}
		}
	}
}



/**
 * 公用验证规则-D72
 * MT_300 A区域22A控制A区域21字段
 * MTs 320, 330, and 620
 * @param {Object} objs
*/
function D72(objs)
{
	if($(objs.A_94A).val() == "AGNT")
	{
		setProperty_swift(objs.A_21N,"M");
	}
	else{
		setProperty_swift(objs.A_21N,"O");
	}
}

/**
 * 公用验证规则-D74
 * MT300 A区94A控制，C区，C区88A,71F
 * MT306 A区94A控制，I区，I区88A,71F
 * MT320and620 A区94A控制，H区，H区88A,71F
 * MT340 A区94A控制，C区，C区88A,71F
 * MTs360and361 A区94A控制，N区，N区88A,71F
 * 
 * @param {Object} objs 	checkbox:H_CB,
							div:H_DIV,
							SEQ_94a:A_94A,
							SEQ_88A:H_C88ADJ,
							SEQ_71F_Currency:H_F71F_Currency,
							SEQ_71F_Amount:H_F71F_Amount	
 * @memberOf {TypeName} 
 */
function D74(objs)
{
	if($(objs.SEQ_94A).val() == ""){
		//$(objs.checkbox).removeAttr('checked');
		$(objs.checkbox).removeAttr("disabled");
		setProperty_swift(objs.SEQ_88A,"O");
		setProperty_swift(objs.SEQ_71F_Currency,"P");
		setProperty_swift(objs.SEQ_71F_Amount,"P");			 
	}
	else if($(objs.SEQ_94A).val() == "AGNT" || $(objs.SEQ_94A).val() == "BILA"){
		if(this.type == "MT_320" || this.type == "MT_620" || this.type == "MT_300" || this.type == "MT_360" || this.type == "MT_361"){
			//$(objs.checkbox).removeAttr('checked');
			$(objs.checkbox).removeAttr("disabled");
			setProperty_swift(objs.SEQ_88A,"O");
			setProperty_swift(objs.SEQ_71F_Currency,"P");
			setProperty_swift(objs.SEQ_71F_Amount,"P");	
		}
	}
	else if($(objs.SEQ_94A).val() == "BROK"){
		if(this.type == "MT_300" || this.type == "MT_306" || this.type == "MT_320" || this.type == "MT_620" || this.type == "MT_340" || this.type == "MT_360" || mtsType == "MT_361"){
			$(objs.checkbox).attr('checked',true);
			$(objs.checkbox).attr("disabled","disabled");
			//区域必须选
			$(objs.div).attr("class", "show");
			setProperty_swift(objs.SEQ_88A,"M");
			setProperty_swift(objs.SEQ_71F_Currency,"O");
			setProperty_swift(objs.SEQ_71F_Amount,"O");
		}
	}
	else if($(objs.SEQ_94A).val() != "BROK"){
		if(this.type == "MT_306" || this.type == "MT_340"){
			//$(objs.checkbox).removeAttr('checked');
			$(objs.checkbox).removeAttr("disabled");
			setProperty_swift(objs.SEQ_88A,"O");
			setProperty_swift(objs.SEQ_71F_Currency,"P");
			setProperty_swift(objs.SEQ_71F_Amount,"P");
		}
	}
}

/**
 * 两个金额编码是否相同，控制36字段是否必选和出现
 * 公用验证规则-D75
 * MTs 103, 103 REMIT, and 103 STP 控制33B，32A控制36出现
 * MTs 104 and 107 用于B区域33B,32B字段控制36 
 * @param {Object} cur_code1 币种1,cur_code2 币种,field 被控制字段
 * @memberOf {TypeName} 
 */
function D75(objs){
	
	var code1 = $(objs.cur_code1).val();
	var code2 = $(objs.cur_code2).val();
	//币种1不为空
	if(code1 != ""){
		//币种1不等于币种2
		if(code1 != code2){
			setProperty_swift(objs.field, 'M');			
		}
		else{
			setProperty_swift(objs.field, 'P');
			objs.field.val("");
		}
	}
	else{
		//币种2为空
		if(code2 == ""){
			setProperty_swift(objs.field, 'O');
		}
	}
}

/**
 * 公用验证规则-D81_submit
 * MTs 104, 107, 256, and 416
 * MT 306
 * MTs 700, 710, and 720
 * MT 760
 */
function D81_submit(objs){
	//如果不为OTHER
	if(objs.rules.val() != "OTHR"){
		//附加信息必须为空
		if(objs.Narrative.val() != ""){
			alert("[D81] :Subfield 2 of field 40E, that is, /35x, is only allowed when subfield 1 of this field consists of OTHR.");
			setFocus(objs.Narrative[0]);
			return false;
		}
	}
	return true;
}

/**
 * 公用验证规则-D97_submit 
 * MTs 103 and 103 REMIT 仅当指令代码包括以下代码:PHON, PHOB, PHOI, 
 * TELE, TELB, TELI, HOLD或REPA中的一个时,附加的信息才被允许.
 * MT 103 STP
 * @param {Object} objs
 */
function D97_submit(objs){
	var retFlag = true;
	objs.F23E_Instruction.each(function(i,t){
		var Information = $("#MT103_Loop2_LT"+ (i + 1) + "_F23E_AdditionalInformation").val();
		if($(t).val() == "PHON" 
			|| $(t).val() == "PHOB" 
			|| $(t).val() == "PHOI" 
			|| $(t).val() == "TELE" 
			|| $(t).val() == "TELI"
			|| $(t).val() == "TELB"
			|| $(t).val() == "HOLD"
			|| $(t).val() == "REPA"){
		}
		else{
			//不能填写
			if(Information != ""){
				alert("Additional Information is only allowed when Instruction Code consists of one of the following codes: PHON, PHOB, PHOI, TELE, TELB, TELI, HOLD or REPA ");
				setFocus($("#MT103_Loop2_LT"+ (i + 1) + "_F23E_AdditionalInformation")[0]);
				retFlag = false;
				return false;
			}
		}
	});
	return retFlag;
}

//-----------------E类规则--------------------

/**
 * 公用验证规则-E01
 * MTs 103 (not 103 STP) and 103 REMIT
 * MT 103 STP
 * MT 564
 * @param {Object} objs
 */
function E01(objs){
	if(this.type != "MT_564"){
		if(objs.F23B.val() == "SPRI")
		{
			//只包含SDVA,TELB,PHOB,INTC 
			objs.F23E_OPTIONS.remove(12);
			objs.F23E_OPTIONS.remove(11);
			objs.F23E_OPTIONS.remove(10);
			objs.F23E_OPTIONS.remove(9);
			objs.F23E_OPTIONS.remove(6);
			objs.F23E_OPTIONS.remove(5);
			objs.F23E_OPTIONS.remove(4);
			objs.F23E_OPTIONS.remove(3);
		}
	}
}

/**
 * 公用验证规则-E01_submit
 * MTs 103 (not 103 STP) and 103 REMIT
 * MT 103 STP
 * MT 564
 * @param {Object} objs
 */
function E01_submit(objs){
	if(this.type == "MT_103"){
		// F23E
		if(objs.F23B.val() == "SPRI"){
			if(objs.F23E.val() != ""){
				if(objs.F23E.val() != "SDVA" && 
					objs.F23E.val() != "TELB" && 
					objs.F23E.val() != "PHOB" && 
					objs.F23E.val() != "INTC"){
					alert("[E01]:If field 23B contains the code SPRI, field 23E may contain only the codes SDVA, TELB, PHOB, INTC.");
					return false;
				}
			}
		}
	}
	return true;
}

/**
 *
 * 公用验证规则-E02
 * MTs 103, 103 REMIT, and 103 STP
 * MT 564
 */
function E02(objs){
	
	if(this.type != "MT_564"){
		if(objs.F23B.val() == "SSTD" || objs.F23B.val() == "SPAY"){
			setProperty_swift(objs.F23E_SELECT,"P");
			setProperty_swift(objs.F23E_INPUT,"P");
		}
		else{
			setProperty_swift(objs.F23E_SELECT,"O");
			setProperty_swift(objs.F23E_INPUT,"O");
		}
	}
}

/**
 *
 * 公用验证规则-E03
 * 如果23B包含SPRI, SSTD或SPAY代码，53A栏只允许出现D选项
 * MTs 103 (not 103 STP) and 103 REMIT
 * MT 564
 */
function E03()
{
	//MT103验证
	if(this.type == "MT_103"){
		var f23B = $("#MT103_F23B").val();
		var f53ABD = $("#TAG_MT103_C53ABD").val();
		var bSele = document.getElementById("TAG_MT103_C53ABD");
	  	bSele.options.length = 0;
	  	bSele.options.add(new Option("",""));
	  	bSele.options.add(new Option("A - Sender's Correspondent - BIC","F53A"));
	  	bSele.options.add(new Option("B - Sender's Correspondent - Location","F53B"));
	  	bSele.options.add(new Option("D - Sender's Corr - Name & Address","F53D"));
  	 	if("SPRI"==f23B|| "SSTD" == f23B || "SPAY" == f23B){
	    	bSele.removeChild(bSele.options[3]);
	    }
  	 	if("F53D" == f53ABD){
  	 			$("#TAG_MT103_C53ABD").val("");
		}else{
 			$("#TAG_MT103_C53ABD").val(f53ABD);
		}
	}
}

/**
 * 公用验证规则-E04
 * 如果23B包SPRI, SSTD or SPAY，并且53a选项是B，53B栏的参与方标识符必须出现
 * @param {Object} objs
 */
function E04(objs){
	if(this.type == "MT_103"){
		var F23B = $(objs.F23B).val();
		var C53 = $(objs.C53).val();
		//如果C53字段选择B项，并且F23是包含SPRI，SSTD，SPAY
		if(C53 == "F53B" && ("SPRI" == F23B || "SSTD" == F23B || "SPAY" == F23B)){
			setProperty_swift($(objs.F53B_PartyIdentifier), 'M');
		}else{
			setProperty_swift($(objs.F53B_PartyIdentifier), 'O');
		}
	}
}

/**
 * 公用验证规则-E05
 * 如果23B栏包含以下代码:SPRI,SSTD或SPAY之一,54a只可以和选项A一起使用.
 * MTs 103 (not 103 STP) and 103 REMIT
 * @param {Object} objs
 */
function E05(objs){
	var f23B = $(objs.F23B).val();//$("#MT103_F23B").val();
	var f54ABD = $(objs.C54ABD).val();//$("#TAG_MT103_C54ABD").val(); 
	var bSele = $(objs.C54ABD)[0];//document.getElementById("TAG_MT103_C54ABD");
	bSele.options.length = 0;
	bSele.options.add(new Option("",""));
	bSele.options.add(new Option("A - Receiver's Correspondent - BIC","F54A"));
	bSele.options.add(new Option("B - Receiver's Correspondent -Location","F54B"));
	bSele.options.add(new Option("D - Receiver's Corr - Name & Address","F54D"));
  	if("SPRI"==f23B|| "SSTD" == f23B || "SPAY" == f23B){
        bSele.removeChild(bSele.options[3]);
     	bSele.removeChild(bSele.options[2]); 
    }
    if("" != f54ABD ||"F54A" != f54ABD){
		$(objs.C54ABD).val("");
	}else{
		 $(objs.C54ABD).val(f54ABD);
	}
}

/**
 * 公用验证规则-E06
 * MTs 103 (not 103 STP) and 103 REMIT
 * MT 103 STP
 * MT 564
 * MT 566
 * @param {Object} objs
 */
function E06(objs){
	if(this.type == "MT_564" || this.type == "MT_566"){
		
	}
	else
	{
		if(this.type == "MT_103_STP"){
			
		}
		else
		{
			//C55如果实现
			if($(objs.C55).val() != ""){				
				setProperty_swift($(objs.C53), 'M');
				setProperty_swift($(objs.C54), 'M');
			}else{
				setProperty_swift($(objs.C53), 'O');
				setProperty_swift($(objs.C54), 'O');
			}
		}
	}
}

/**
 * 公用验证规则-E07
 * MTs 103 (not 103 STP) and 103 REMIT
 */
function E07(){
	var f23B = $("#MT103_F23B").val();
	var f55ABD = $("#TAG_MT103_C55ABD").val();
	var bSele = document.getElementById("TAG_MT103_C55ABD");
	bSele.options.length = 0;
	bSele.options.add(new Option("",""));
	bSele.options.add(new Option("A - Third Reimbursement Inst - BIC","F55A"));
	bSele.options.add(new Option("B - Third Reimbursement Inst - Locn","F55B"));
	bSele.options.add(new Option("D - Third Reimbursmnt Inst-Name&Addr","F55D"));
  	if("SPRI"==f23B|| "SSTD" == f23B || "SPAY" == f23B){      
        bSele.removeChild(bSele.options[3]);
        bSele.removeChild(bSele.options[2]);
    }
    if("" != f55ABD ||"F55A" != f55ABD){
		$("#TAG_MT103_C55ABD").val("");
	}else{
		 $("#TAG_MT103_C55ABD").val(f55ABD);
	}
}

/**
 * 公用验证规则-E09
 * MTs 103 (not 103 STP) and 103 REMIT 
 * MT 564
 */
function E09(objs){
	if(this.type = "MT_103")
	{		
		var f23B = objs.MT103_F23B.val();		
		var f57ABCD = objs.MT103_C57.val();		
	  	if("SPRI"==f23B|| "SSTD" == f23B || "SPAY" == f23B)
	  	{
	  		//删除B项
	        objs.MT103_C57_OPTIONS.remove(2);      
	    }
	    if("" != f57ABCD ||"F57B" != f57ABCD)
	    {
			objs.MT103_C57.val("");
		}
	    else
	    {
			objs.MT103_C57.val(f57ABCD);
		}
	     //如果F23B选择SPRI,SSTD,SPAY并且f57ABCD等于F57D
	    if("SPRI"==f23B|| "SSTD" == f23B || "SPAY" == f23B && f57ABCD == "F57D"){
	    	//则选项D的第一子栏(参与方标识符)必须出现	    	
	    	setProperty_swift(objs.MT103_C57D_PartyIdentifier,"M")
	    }
	    else{
	    	setProperty_swift(objs.MT103_C57D_PartyIdentifier,"O");
	    }
	}
}

/**
 * 公用验证规则-E10
 * MTs 103 (not 103 STP) and 103 REMIT 
 * 如果23B栏包含以下代码:SPRI,SSTD或SPAY之一,那么59a栏受益客户的第一子栏(账户)必须出现
 * MTs 102 STP, 103 STP, 104, and 107
 * 59a栏受益客户的第一子栏(账户)必须出现
 */
function E10(objs){
	//这是C59字段为必填字段
	setProperty_swift(objs.F59A_Account,"M");
	//MT103特殊处理
	if(this.type == "MT_103"){
		var F23B_val = objs.MT103_F23B.val();
		//如果F23B不等于SPRI，SSTD，SPAY，C59A账户栏不是必须
		if(F23B_val != "SPRI" && F23B_val != "SSTD" && F23B_val != "SPAY"){
			setProperty_swift(objs.F59A_Account,"O");
		}
	}
}

/**
 * 公用验证规则-E13
 * 71A==OUR,71F不允许，71G可选
 * MTs 102 and 102 STP
 * MTs 103, 103 REMIT, and 103 STP
 * @param {Object} objs
 */
function E13(objs){
	var F71A_VAL = objs.F71A.val();
	if(F71A_VAL == "OUR"){
		objs.Loop_Currency.each(function(i,t){
			$(this).val("");
			$(objs.Loop_Amount.get(i)).val("");
			setProperty_swift($(this),"P");
			setProperty_swift($(objs.Loop_Amount.get(i)),"P");
		});
		setProperty_swift(objs.F71G_Currency,"O");
		setProperty_swift(objs.F71G_Amount,"O");
	}
}

/**
 * 公用验证规则-E15
 * 71A==BEN,B.71F必选，B.71G不允许
 * MTs 102 and 102 STP
 * MTs 103, 103 REMIT, and 103 STP
 * @param {Object} objs
 */
function E15(objs){
	var F71A_VAL = objs.F71A.val();
	if(F71A_VAL == "BEN"){
		objs.Loop_Currency.each(function(i,t){
			setProperty_swift($(this),"M");
			setProperty_swift($(objs.Loop_Amount.get(i)),"M");
		});
		setProperty_swift(objs.F71G_Currency,"P");
		setProperty_swift(objs.F71G_Amount,"P");
	}
}

/**
 * 公用验证规则-E15_submit
 * 71A==BEN,71F必须出现一次
 * MTs 102 and 102 STP
 * MTs 103, 103 REMIT, and 103 STP
 * @param {Object} objs
 */
function E15_submit(objs){
	var retFlag = true;
	var F71A_VAL = objs.F71A.val();
	if(F71A_VAL == "BEN"){
		if(objs.created.val() < 1){
			alert("If field 71A contains BEN, then at least one occurrence of field 71F is mandatory");
			retFlag = false;
		}
		else{
			objs.Loop_Currency.each(function(i,t){
				//判断币种与金额是否为空
				if($(this).val() == "" || $(objs.Loop_Amount.get(i)) == ""){
					alert("If field 71A contains BEN, then 71F is mandatory.");
					retFlag = false;
					return false;
				}
			});
		}
	}
	return retFlag;
}


/**
 * 公用验证规则-E16
 * 如果23B栏包含代码SPRI,那么56a栏不能出现
 * MTs 103, 103 REMIT, and 103 STP
 * @param {Object} objs JQUERY对象(F23B,C56A)
 */
function E16(objs){
	var F23B_Value = objs.F23B.val();
	var C56 = objs.C56;
	if(F23B_Value == "SPRI"){
		setProperty_swift(objs.C56, 'P');
	}
	else{
		setProperty_swift(objs.C56, 'O');
	}
}

/**
 * 公用验证规则-E17
 * 如果23B栏包含代码SSTD或SPAY中的一个,则56a栏只能和选项A或C一起使用.如果和选项C一起使用.,则选项C必须包含清算代码
 * MTs 103, 103 REMIT, and 103 STP
 */
function E17(){
	var f23B = $("#MT103_F23B").val();
	var f56ACD = $("#TAG_MT103_C56ACD").val();
	var bSele = document.getElementById("TAG_MT103_C56ACD");
	bSele.options.length = 0;
	bSele.options.add(new Option("",""));
	bSele.options.add(new Option("A - Intermediary Institution - BIC","F56A"));
	bSele.options.add(new Option("C - Intermediary Institution","F56C"));
	bSele.options.add(new Option("D - Intermediary Inst - Name & Addr","F56D"));
  	if("SSTD" == f23B || "SPAY" == f23B){
        bSele.removeChild(bSele.options[3]);
     }
    if("" != f56ACD ||"F56D" != f56ACD){
		$("#TAG_MT103_C56ACD").val("");
	}else{
		 $("#TAG_MT103_C56ACD").val(f56ACD);
	}  
}

/**
 * 公用验证规则-E18
 * 如果23E栏包含代码CHQB, 那么59a栏受益客户的第一子栏(账户)不允许出现.
 * MTs 103 (not 103 STP) and 103 REMIT
 */
function E18(objs)
{
	var f23E_val = objs.F23E.val();
	if(f23E_val == "CHQB"){
		setProperty_swift(objs.F59A_Account,"P");
		return false;
	}
	else{
		setProperty_swift(objs.F59A_Account,"O");
		return true;
	}
}

/**
 * 该验证可以在各报文C56A字段添加nChange事件
 * 公用验证规则-E35
 * MT_306 C,E,J
 * MT_320 C,D,E,F
 * MT_330 C,D,E,F
 * MT_340 C,D,F
 * C56A控制C86A字段
 * @param {Object} filed_C56A  主控字段
 * @param {Object} filed_C86A  被控字段
 */
function E35(SEQ_56A,SEQ_86A)
{
	if($(SEQ_56A).val() == ""){
		setProperty_swift($(SEQ_86A),"P");
		$(SEQ_86A).val("");
		getSwiftTagDIV(SEQ_86A);
	}else{
		setProperty_swift(SEQ_86A,"O");
	}
}

/**
 * 公用验证规则-E44
 * 如果56a栏不出现,则任何23E栏都不包含TELE或PHON.
 * MTs 103 (not 103 STP) and 103 REMIT
 */
function E44_submit(objs){
	var flag = true;
	if(objs.C56.val() == ""){
		objs.F23E_Loop.each(function(i,t){
			if($(this).val() == "TELI" || $(this).val() == "PHOI"){
				alert("[E44]:If field 56a is not present, no field 23E may contain TELI or PHO.");
				setFocus($(this)[0]);
				flag = false;
				return false;
			}
		});
	}
	return flag;
}

/**
 * 公用验证规则-E45_submit
 * 如果57a栏不出现,则任何23E栏都不包含TELE或PHON.
 * MTs 103 (not 103 STP) and 103 REMIT
 */
function E45_submit(objs){
	var flag = true;
	if(objs.C57.val() == ""){
		objs.F23E_Loop.each(function(i,t){
			if($(this).val() == "TELI" || $(this).val() == "PHOI"){
				alert("[E45]:If field 57a is not present, no field 23E may contain TELE or PHON.");
				setFocus($(this)[0]);
				flag = false;
				return false;
			}
		});
	}
	return flag;
}

/**
 * 公共验证规则-E46_submit
 * MTs 101 and 207
 * MTs 103, 103 REMIT, and 103 STP F23栏位如果重复出现,相同的代码只能出现一次
 */
function E46_submit(objs){
	var retValue = true;
	if(this.type == "MT_103"){
		var Instructions = objs.F23E_Instruction;
		for(var i = 0 ; i < Instructions.length; i ++){
			for(var j = 0 ; j < Instructions.length; j++){
				if(i != j){
					if($(Instructions[i]).val() == $(Instructions[j]).val())
					{
						alert("[D46]:If this field is repeated, the same code word must not be present more than once.");	
						setFocus(Instructions[i]);
						return false;
					}
				}
			}					
		}
	}
	return retValue;
}

//-----------------T类规则--------------------

/**
 * 验证当金额，数字为0时，不能出现负号
 * 公共验证规则T14
 * @param {Object} sign    符号对象  必须是JQUERY对象
 * @param {Object} amount  金额对象  必须是JQUERY对象
 */ 
function T14(sign,amount)
{
	var amounts = amount.val();	
	if(amounts != "" && amounts.length > 0){
		amounts = parseInt(amounts);
		if(sign.val() =="N" && amounts == 0){
			alert("当金额为0时，符号位不能出现！");
			setFocus(sign[0]);
			return false;
		}	
	}
}
/**
 * 验证输入内容，不能以"/"开头与结束，同时不能包含"//"
 * 公共验证规则T26	 
 * @param {Object} obj 该对像必须是HTML ELEMENT对象，不能使用JQUERY对象
 * @return {TypeName} 
*/
function T26(obj)
{
	var value = obj.value;
	if ("\/" == value.substring(0, 1) || "\/" == value.substring(value.length - 1) || value.indexOf("//") >= 0) {
    	setFocus(obj);
    	alert("[T26]:This field must not start or end with a slash '/' and must not contain two consecutive slashes '//'.");
    	return false;
	}else{
		return true;
	}
}

//新增校验
function T56(obj) {
	var fieldValue = obj.value;
	var tempVal = "";
	var errInfo = "";
	if (!(fieldValue == null || fieldValue == "")) {
		var lineValues = fieldValue.split("\n");
		var lineValue2 = false;
		var lineValue3 = false;
		var isFrstError = false;
		var isSecError = false;
		var isTrdError = false;
		var lineValue3Cty = "";
		var numTmp = 1;
		for ( var i = 0; i < lineValues.length; i++) {
			tempVal = lineValues[i];
			tempVal = tempVal.substring(0, 2);//前两位
			var lineNum = tempVal.substring(0, 1);//第一位
			var line2Value = tempVal.substring(1, 2);//第二位
			if (i == 0) {
				if (tempVal != "1/") {
					errInfo = errInfo + "第一行必须以1/开头!\n";
				}
			}
			if (line2Value != "/"){isFrstError = true;}
			if (lineNum < 1 || lineNum > 3){isSecError = true;}
			if(lineNum < numTmp){isTrdError = true;}
			if (lineNum == 2){lineValue2 = true;}
			if (lineNum == 3){
				lineValue3 = true;
				var index2 = lineValues[i].indexOf("/",2);
				if(index2>0){
					lineValue3Cty = lineValues[i].substring(2, index2);
				}
			}
			numTmp = lineNum;
		}
		if( isFrstError == true ){
			errInfo = errInfo + "每行第二位必须是/!\n";
		}
		if( isSecError == true ){
			errInfo = errInfo + "每行数字必须在1-3之间!\n";
		}
		if( isTrdError == true ){
			errInfo = errInfo + "每行开头的数字必须按照从上到下从小到大排列!\n";
		}
		if (lineValue2 == true && lineValue3 == false) {
			errInfo = errInfo + "填写了以2开头的地址信息，则必填以3开头的国家地区信息!\n";
		}
		if (lineValue3Cty != "") {
			var sql = "select * from jt_country where swiftctycode ='"
					+ lineValue3Cty + "'";
			var nCount1 = executeQuery("ADR1", sql, -1);
			if (nCount1 < 1) {
				errInfo = errInfo + "以3开头的国家或者地区"+lineValue3Cty+"必须在国际标准中存在!\n";
			}
		}
	}
	if (errInfo != "") {
		alert(errInfo);
		return false;
	} else {
		return true;
	}
}

var T78_ERR_MSG = "";
/**
 * T78内容验证
 * 1，特殊符号“/”开头
 * 2，CODE使用必须符合API提供的CODE
 * 3，文本内容必须符合API规定的输入格式与长度
 * @param {Object} filed 需要验证的字段对象
 * @param {Object} codes 可以使用的CODE集
 * @return {TypeName} 
 */
function T78_ContentValid(filed,codes){
	//获取文本域每行内容的数组
	var rows_content = $(field).val().split("/n");
	for(var i = 0; i <rows_content.length; i ++)
	{
		//行文本内容
		var row = rows_content[i];
		//验证文本域中，每一个行的内容必须只能使用两个"/",并且必须用"/"开头
		if(row.split("/") - 1 == 2 && row.indexOf("/") == 0){
			//截取CODE
			var code = row.substring(row.indexOf("/") + 1,row.lastIndexOf("/"));
			//验证CODE正确
			if(!T78_CODE_Valid(codes))
			{
				//CODE后的文本内容
				var content = row.substring(row.lastIndexOf("/") + 1,rows_content[i].length);
				return T78_STR_LEN(code,content);
			}
			else
			{
				return false;
			}
		}
		else{
			alert("第" + i + "行，必须使用只能使用两个'/',并且开头必须使用'/'");
			setFocus(filed[0]);
			return false;
		}
	}
	return true;
}

/**
 * 获得可以用的编码
 * @param {Object} rule
 * @return {TypeName} 
 */
function getCodes(rule)
{
	var rules = "";
	for(var i = 0; i <rule.length; i ++){
		rules += rule[i] + ",";
	}
	return rules.substring(0,rule.lastIndexOf(",") + 1);
}

/**
 * 验证code是否合法
 * @param {Object} cur_code  当前CODE
 * @param {Object} codes     可以使用的CODE
 * @return {TypeName} 
 */
function T78_CODE_Valid(cur_code,codes)
{
	T78_ERR_MSG = "第" + rowNum + "行，";
	if(cur_code != "" && cur_code){
		for(var i = 0; i <codes.length; i++)
		{
			//验证当前编码是否超出可使用范围
			if(cur_code != codes[i]){
				T78_ERR_MSG = cur_code + "错误\n" + "请使用【" + getCodes(codes) + "】";
				return false;
			}
		}
	}
	else
	{
		T78_ERR_MSG = "编码不能为空！";
		return false;
	}
}



function T78_STR_LEN(code,content)
{
	var ret = true;
	switch (code) 
	{
	   case "ABIC" :
		   var patt = T78_RULES.ABIC;
		   ret = T78_STR_LEN_Valid(content,patt);
		   break;
	   case "ACCT" :
		   //34x
		   var patt = T78_RULES.Nx.replace("N",34);
		   ret = T78_STR_LEN_Valid(content,patt);
	       break;
	   case "ADD1" :
		   //35x
		   var patt = T78_RULES.Nx.replace("N",35);
		   ret = T78_STR_LEN_Valid(content,patt);
	       break;
	   case "ADD2" :
		   //35x
		   var patt = T78_RULES.Nx.replace("N",35);
		   ret = T78_STR_LEN_Valid(content,patt);
	       break;
	   case "CITY" :
		   //35x
		   var patt = T78_RULES.Nx.replace("N",35);
		   ret = T78_STR_LEN_Valid(content,patt);
	       break;
	   case "CLRC" :
		   //35x
		   var patt = T78_RULES.Nx.replace("N",35);
		   ret = T78_STR_LEN_Valid(content,patt);
	       break;
	   case "GBSC" :
		   //6!n
		   var patt = T78_RULES.Nmn.replace("N",6);
		   ret = T78_STR_LEN_Valid(content,patt);
	       break;
	   case "LEIC" :
		   //LEIC
		   var patt = T78_RULES.LEIC;
		   ret = T78_STR_LEN_Valid(content,patt);
	       break;
	   case "NAME" :
		   //34x
		   var patt = T78_RULES.Nx.replace("N",34);
		   ret = T78_STR_LEN_Valid(content,patt);
	       break;
	   case "USCH" :
		   //6!n
		   var patt = T78_RULES.Nmn.replace("N",6);
		   ret = T78_STR_LEN_Valid(content,patt);
	       break;
	   case "USFW" :
	       //9!n
		   var patt = T78_RULES.Nmn.replace("N",9);
		   ret = T78_STR_LEN_Valid(content,patt);
	       break;
	   case "NETS" :
		   //5*34x
		   var patt = T78_RULES.NXNx;
		   ret = T78_STR_LEN_Valid(content,patt);
	       break;
	   case "SSIS" :
		   //5*34x
		   var patt = T78_RULES.NXNx;
		   ret = T78_STR_LEN_Valid(content,patt);
	       break;
	   default :
	       break;
	} 
}
function T78_STR_LEN_Valid(code,content,patt){
	var reg = new RegExp(patt);
	if(!reg.test(content)){
		T78_ERR_MSG = code + "，编码格式不正确";
		return false;
	}
}


var T78_RULES ={
	//4!a2!a2!c[3!c] or 4!a
    ABIC : "[A-Z]{4}[A-Z]{2}[0-9A-Z]{2}([0-9A-Z]{3})?",
    //32x,34x
	Nx: "[0-9a-zA-Z\-\?:\(\)\.,'\+ ]([0-9a-zA-Z/\-\?:\(\)\.,'\+ ]{1,N})?",
	//6!n
	Nmn :"[0-9]{N}",
	//18!c2!n
	LEIC : "([0-9A-Z]{3})[0-9]{2}",
	//5*34x
	NXNx : "[0-9a-zA-Z/\-\?:\(\)\.,'\+ ]{1,N}(&#13;&#10;[0-9a-zA-Z/\-\?\(\)\.,'\+ ][0-9a-zA-Z/\-\?:\(\)\.,'\+ ]{0,39}){0,N}"
}

/**
 * 验证文本域中，要求必须输入编码+信息
 * @param {Object} areaName    域名称
 * @param {Object} textAreaObj 文本域对象
 * @param {Object} codeArrays  代码数组
 * @param {Object} codeArrays  规则数组
 */
function TextArea_Validate(areaName,textAreaObj,codeArray,ruleArray){
	//获得文本内容
	var content = textAreaObj.val().split("\n");
	if(content != "" && content != null){
		//解析每一行内容
		for(var i = 0 ; i < content.length; i ++){
			var rowNum = i + 1;
			//获得每行文本内容
			var row_txt = content[i];
			//验证"/"是否正确
			if(!TextArea_Rows_Validate(areaName,rowNum,row_txt)){
				setFocus(textAreaObj[0]);
				return false;
			}
			//验证编码是否符合
			if(!TextArea_RowsCodes_Vaildate(areaName,rowNum,row_txt,codeArray)){
				setFocus(textAreaObj[0]);
				return false;
			}
		}
	}
	
	return true;
}

/**
 * 验证TextArea每行文本中包含的代码是否正确
 * @param {Object} rowsNum
 * @param {Object} rows_txt
 * modify by wulei at 20150724 MT103报文72场，第一行输入的内容是/8c/[附加信息] 第二行到第六行是[//附加信息续行] 或 [/8c/[附加信息]]
 */
function TextArea_RowsCodes_Vaildate(areaName,rowsNum,rows_txt,codeArray){
	var retFlag = false;
	var code = rows_txt.substring(rows_txt.indexOf("/") + 1,rows_txt.lastIndexOf("/"));
	//判读编码是否正确
	for(var i = 0 ; i < codeArray.length; i ++)
	{
		if(code == codeArray[i]){
			retFlag = true;
			break;
		}
	}
	
	if (rowsNum > 1) {
		if (rows_txt.substring(0, 2) == "//") retFlag = true;
	}
	
	if(!retFlag){
		alert(areaName + ":第" + rowsNum + "行，编码必须是" + codeArray.toString() + (rowsNum == 1 ? "" : "，或是以//开头."));
		retFlag = false;
	}	
	return retFlag;	
}

/**
 * 验证TextArea每行文本中包含"/"是否正确
 * @param {Object} rowsNum 	行号
 * @param {Object} rows_txt 行文本
 */
function TextArea_Rows_Validate(areaName,rowsNum,rows_txt){
	var retFlag = true;
	var error_message = "";
	if(rows_txt != ""){
		//判断文本中，只能必须出现2个/
		if(rows_txt.split("/").length - 1 == 2){
			if(rows_txt.indexOf("/") != 0){
				error_message = areaName + ":第" + rowsNum + "行中第一个字符必须是'/'";
				retFlag = false;
			}
		}
		else{
			error_message = areaName + ":第" + rowsNum  + "行必须并且只能出现两个'/'";
			retFlag = false;
		}
	}
	if(retFlag == false){
		alert(error_message);
	}
	return retFlag;
}
