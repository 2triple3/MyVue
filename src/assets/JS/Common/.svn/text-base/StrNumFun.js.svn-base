/**
 * 数字型操作
 */


var SYS_DECDOT = "."; 
var SYS_AMTSPLIT = ","; 
var SYS_BLANK = " ";
var SYS_SPLITLEN = 3;
var SYS_DECLEN = 2;
//******	去掉字串左右空格，传入字串，传出字串
function trimAll(str){
	var tmpStr="";
	if(str.length==0) return tmpStr;
	tmpStr = trimLeft(str);
	tmpStr = reverseStr(tmpStr);
	tmpStr = trimLeft(tmpStr);
	tmpStr = reverseStr(tmpStr);	
	return tmpStr;	
}
//******	去掉字串左空格，传入字串，传出字串
function trimLeft(str)
{
	var bBlack = true;
	var tmpStr="";
	if(str.length==0) return tmpStr;
	for(var i=0; i<str.length; i++)
	{
		if(str.charAt(i)==SYS_BLANK) continue;
		else
		{
			tmpStr = str.substring(i);
			break;
		} 
	}
	return tmpStr;	
}
//***** 字串反转，传入字串，传出反转字串
function reverseStr(str)
{
	var tmpStr = "";
	for(var i=str.length-1; i>=0; i--)
	{
		tmpStr += str.charAt(i);
	}
	return tmpStr;		
}
//******	检查字串是否为合法数字
function checkNum(str)
{
	return isNaN(parseFloat(str));
}
//*******  得到数字分隔符
function getAmtSplit()
{
	if(SYS_DECDOT==",") SYS_AMTSPLIT = ".";
	if(SYS_DECDOT==".") SYS_AMTSPLIT = ",";
	return SYS_AMTSPLIT;
}
//******** 得到数字小数长度
function getDecLength(ccyName)
{
	return SYS_DECLEN;
}
//******	数字格式化，传入数字，小数位长度，返回格式化字串
function Num2Str(num,decLen)
{
	if(isNaN(num)) return "";
	if(decLen==null) decLen = SYS_DECLEN;
	num = Number(num);
	var str = num.toFixed(decLen);
	if(SYS_DECDOT==",") str = str.replace(".",",");	
	return str;	
}
//*******	格式化字串转为数字，　传入字串，传出数字

function Str2Num(str)
{
	if(SYS_DECDOT==",") str = str.replace(",",".");
	return parseFloat(str);
}
//******	数字格式化，传入数字，小数位长度，返回格式化字串

function Amt2FormatStr(num,decLen)
{
	if(isNaN(num)) return "";
	var sNum = Num2Str(num,decLen);
	var docPos = sNum.indexOf(SYS_DECDOT);
	if(docPos<0) docPos = sNum.length;

	var splitPos = docPos - 3;
	var tmpstr = sNum;
	var min = 0;
	if((tmpstr.charAt(0)=="+") || (tmpstr.charAt(0)=="-")) min = 1;	
	while(splitPos>min)
	{
		tmpstr = tmpstr.slice(0,splitPos) +  SYS_AMTSPLIT + tmpstr.slice(splitPos);
		splitPos -= 3;
	}
	return tmpstr;
}

//******	格式化金额字串转为数字，　传入格式化字串，传出数字
function FormatStr2Amt(str)
{
	if( typeof str === "number") return str;
	if(str==null||str=="") return "";
	if(SYS_DECDOT==",") {
		str = str.replace(/./g,"");
		str = str.replace(",",".");	
	} else {
		str = str.replace(/,/g,"");
	}
	var ret = parseFloat(str);
	return ret;
}


//*********将金额字段转化为英文大写
function NumToEnglish(Currency,Money)
{   
	var    MoneyString=Money.toString();
	var    enSmallNumber = new Array ("","ONE","TWO","THREE","FOUR","FIVE","SIX","SEVEN","EIGHT","NINE","TEN","ELEVEN","TWELVE","THIRTEEN","FOURTEEN","FIFTEEN","SIXTEEN","SEVENTEEN","EIGHTEEN","NINETEEN");
  var    enLargeNumber = new Array ("TWENTY","THIRTY","FORTY","FIFTY","SIXTY","SEVENTY","EIGHTY","NINETY");
  var    enUnit        = new Array ("","THOUSAND","MILLION","BILLION","TRILLION");
	var    tmpString     = MoneyString.split('.');
	var    intString     = MoneyString;   
	var    decString     = "";            
	var    engCapital    = "";            
	var    strBuff1;
	var    strBuff2;
	var    strBuff3;
	var    curPoint;
	var    i1;
	var    i2;
	var    i3;
	var    k;
	var    n;
    var    upperCur=Currency.toUpperCase();

	if (tmpString.length >1)
	{
		intString = tmpString[0];             
		decString = tmpString[1];             
	}
	decString += "00";
	decString  = decString.substring (0,2);   
		curPoint = intString.length-1;
		if (curPoint>-1 && curPoint<15)
		{	
			k = 0;
			while(curPoint>=0)
			{
				strBuff1 = "";
				strBuff2 = "";
				strBuff3 = "";
				if (curPoint>=2)
				{   
					n=utanParseInt(intString.substring(curPoint-2,curPoint+1));
					//alert(intString.substring(curPoint-2,curPoint+1));
					//alert(n);
					if (n !=0)
					{
						i1 = utanParseInt(n/100);            
						i2 = utanParseInt((n-i1*100)/10);    
						i3 = utanParseInt(n-i1*100-i2*10);  
						if (i1 !=0)
						{
							strBuff1 = enSmallNumber[i1] + " HUNDRED ";
						}
						if (i2!=0)
						{
							if (i2==1)
							{
								strBuff2 = enSmallNumber[i2*10+i3] + " ";
								strBuff2 ="AND " + strBuff2;//LDH
							}
							else 
							{
								strBuff2 = enLargeNumber[i2-2] + " ";
								strBuff2 ="AND " + strBuff2;//
								if (i3 !=0)
								{
									strBuff3 = enSmallNumber[i3] + " ";
								}
							}
						}
						else
						{
							if (i3 !=0)
							{
								strBuff3 = enSmallNumber[i3] + " ";
								strBuff2 ="AND " + strBuff2;//LDH
							}
						}
						var sand="";
						//if( engCapital.length>0 )sand=" AND ";
						engCapital = strBuff1 + strBuff2 + strBuff3 + enUnit[k] + " " + sand +engCapital;   
					}

				}
				else
				{
					n = utanParseInt(intString.substring(0,curPoint+1));
					if (n !=0)
					{
						i2 = utanParseInt(n/10);      
						i3 = utanParseInt(n-i2*10); 
						if (i2!=0)
						{
							if (i2==1)
							{
								strBuff2 = enSmallNumber[i2*10+i3] + " ";
							}
							else 
							{
								strBuff2 = enLargeNumber[i2-2] + " ";
								if (i3 !=0)
								{
									strBuff3 = enSmallNumber[i3] + " ";
								}
							}
						}
						else
						{
							if (i3 !=0)
							{
								strBuff3 = enSmallNumber[i3] + " ";
							}
						}
						var sand="";
						//if( engCapital.length>0 )sand=" AND ";
						engCapital = strBuff2 + strBuff3 + enUnit[k] + " " + sand + engCapital;
					}
				}
 
				++k;
				curPoint -= 3;
			}
		}   
		strBuff2 = "";
		strBuff3 = "";
		n = utanParseInt(decString);
		if (n !=0)
		{
			i2 = utanParseInt(n/10);      
			i3 = utanParseInt(n-i2*10);   
			if (i2!=0)
			{
				if (i2==1)
				{
					strBuff2 = enSmallNumber[i2*10+i3] + " ";
				}
				else 
				{
					strBuff2 = enLargeNumber[i2-2] + " ";
					if (i3 !=0)
					{
						strBuff3 = enSmallNumber[i3] + " ";
					}
				}
			}
			else
			{
				if (i3 !=0)
				{
					strBuff3 = enSmallNumber[i3] + " ";
				}
			}
			
			if (engCapital.length>0)
			{
				var space="";
				if( engCapital.substring(engCapital.length-1,engCapital.length)!=" " )space=" ";
				engCapital = engCapital + space+"CENTS " + strBuff2+strBuff3+"ONLY";   
			}
			else
			{
				engCapital = "CENTS " + strBuff2 + strBuff3+"ONLY";   
			}
		}   
		else{
		    var space="";
			if( engCapital.substring(engCapital.length-1,engCapital.length)!=" " )space=" ";
			engCapital =engCapital +space+"ONLY";
		}
		     if(upperCur=="USD") upperCur="U.S. DOLLARS";
		else if(upperCur=="EUR") upperCur="EURO";
		else if(upperCur=="GBP") upperCur="POUND, STERLING";
		else if(upperCur=="JPY") upperCur="JAPANESE YEN";
		else if(upperCur=="HKD") upperCur="HONGKONG DOLLARS";
		else if(upperCur=="CAD") upperCur="CANADIAN DOLLARS";	
		else if(upperCur=="SGD") upperCur="SINGAPORE DOLLARS";
		else if(upperCur=="AUD") upperCur="AUSTRALIAN DOLLAR";
		engCapital="SAY"+" "+upperCur+" "+engCapital;
		return engCapital;
	
}


//*********将金额字段转化为中文大写
function NumToChinese(Currency,Money)
{
	var   chineseAmt="";   //返回的人民币金额大写
	var   MoneyString=Money.toString();
	var   decMoney=Money % 1;  //取小数值
	var   intMoney=Money-decMoney;  //取整数值
	var   decMoneyChinese="";
	var   intMoneyChinese="";
	
	var   enNumber = new Array ("零","壹","贰","叁","肆","伍","陆","柒","捌","玖");
  var   enNumberType = new Array ("","拾","佰","仟","萬","拾","佰","仟","亿","拾","佰","仟","萬","拾","佰","仟","亿");
  var   upperCur=Currency.toUpperCase();
  var   chCurTypr="";   //定义币种的中文名称
  var   chCurY    ="圆"; //定义币种的第一单位
  var   chCurJ    ="角"; //定义币种的第一单位
  var   chCurF    ="分"; //定义币种的第一单位
  if(upperCur=="CNY"){
			chCurTypr="人民币";
			chCurY   ="圆";
			chCurJ   ="角";
			chCurF   ="分";
	}else if(upperCur=="USD"){
			chCurTypr="美圆";
			chCurY   ="圆";
			chCurJ   ="拾";
			chCurF   ="分";
	}else if(upperCur=="EUR"){
			chCurTypr="欧元";
			chCurY   ="圆";
			chCurJ   ="拾";
			chCurF   ="分";
	}else if(upperCur=="GBP"){
			chCurTypr="英镑";
			chCurY   ="镑";
			chCurJ   ="拾";
			chCurF   ="分";
	}else if(upperCur=="JPY"){
			chCurTypr="日圆";
			chCurY   ="圆";
			chCurJ   ="角";
			chCurF   ="分";
	}else if(upperCur=="HKD"){
			chCurTypr="港币";
			chCurY   ="圆";
			chCurJ   ="角";
			chCurF   ="分";
	}else if(upperCur=="CAD"){
			chCurTypr="加圆";	
			chCurY   ="圆";
			chCurJ   ="拾";
			chCurF   ="分";
	}else if(upperCur=="SGD"){
			chCurTypr="新加坡圆";
			chCurY   ="圆";
			chCurJ   ="角";
			chCurF   ="分";
	}else if(upperCur=="AUD"){
			chCurTypr="澳元";
			chCurY   ="圆";
			chCurJ   ="拾";
			chCurF   ="分";
	}else if(upperCur=="CHF"){
			chCurTypr="瑞士法郎";
			chCurY   ="圆";
			chCurJ   ="拾";
			chCurF   ="便士";
	}

	
	
//********小数计算
	var decMoney=decMoney*100;  //小数扩大百位
	decMoney=decMoney-(decMoney % 1); //扩大百位后取整数位
	var dectenMoney = (decMoney-decMoney % 10)/10; //十分位值
	var dechundredMoney = decMoney % 10;  //百分位值  
	for(i=1;i<10;i++){

		if(dectenMoney==i){
		    decMoneyChinese+=enNumber[i]+chCurJ;

		}else{
		    decMoneyChinese+="";
		}
	}
	for(j=1;j<10;j++){
		if(dechundredMoney==j){
		    decMoneyChinese+=enNumber[j]+chCurF;
	    }else{
	    	decMoneyChinese+="";
	    }
    }
	decMoneyChinese.replace("角分","角");
	
	var intNumber ;
	
	var intString = intMoney.toString();
	var intLength=intString.length; 
	
	if(intMoney>0){
		for(m=0;m<intLength;m++){
			intNumber=intMoney % 10;
			intMoney = (intMoney-intNumber)/10;
			for(n=0;n<10;n++){
				if(intNumber==n){
					intMoneyChinese=enNumber[n]+enNumberType[m]+intMoneyChinese;
					var repnum="零"+enNumberType[m];
				}
			}
		}
	}else{
	}

	chineseAmt=chCurTypr+intMoneyChinese+chCurY+decMoneyChinese+"整";
    return chineseAmt;
}



