function _$(id) {
	return document.getElementById(id);
}

function get_time() {
	return new Date().getTime().toString();
}
/**
 * 登录场景表单提交方法
 */
function formSubmit() {
	//判断密码长度
	if(passGuard1.getLength() == 0) {
		alert("密码不能为空！");
		return false;
	}
	$.ajax({
		url: localStorage.getItem("interfaceUrl") + "sendRandkey.app?" + get_time(),
		type: "GET",
		async: false,
		success: function(ranKey) {
			passGuard1.setRandKey(ranKey);
		}
	});
	//获取密文
	//_$("password").value = passGuard1.getOutput();

	_$("kb1").value = "";
	for(var i = 1; i <= Le; i++) {
		$("#kb" + i).attr('placeholder', arrPlace[i - 1])
	}
	return passGuard1.getOutput();
	//提交
	//document.forms[0].submit();
}

function myFormSubmit(str, mapArray) {
	//判断密码长度
	//	if(passGuard1.getLength()==0){
	//		alert("密码不能为空！");
	//		return false;
	//	}
	var myKey;
	$.ajax({
		url: localStorage.getItem("interfaceUrl") + "sendRandkey.app?" + get_time(),
		type: "GET",
		async: false,
		success: function(ranKey) {
			myKey = ranKey;
		}
	});
	//获取密文
	//_$("password").value = passGuard1.getOutput();

	//	_$("kb1").value = "";
	//	for(var i=1;i<=Le;i++){
	//		$("#kb"+i).attr('placeholder',arrPlace[i-1])
	//	}
	console.log('cja2y password : ' + getPasswordString(str, myKey, mapArray));
	return getPasswordString(str, myKey, mapArray);
}
/**
 * 修改密码场景表单提交方法
 */
function formSubmit2() {
	$.ajax({
		url: localStorage.getItem("interfaceUrl") + "sendRandkey.app?" + get_time(),
		type: "GET",
		async: false,
		success: function(ranKey) {
			passGuard1.setRandKey(ranKey);
			passGuard2.setRandKey(ranKey);
			passGuard3.setRandKey(ranKey);
		}
	});
	//获取密文
	_$("password").value = passGuard2.getOutput();
	_$("kb1").value = "";
	//提交
	document.forms[0].submit();
}

var tjGjjCardId;
var tjGjjPassword;
var tjGjjJobId;
var tjGjjGeneralData = {};
var tjGjjDetailData = [];
var tjGjjTotalJson = {};
var eventData = {};

function jsonToGjjJsonGeneral(jo) {
	if(jo) {
		if(jo.result && jo.result.detail) {
			var generalData = jo.result.detail;
			generalData = generalData[0];
			//tjGjjGeneralData.put('record_date',generalData.jzny);
			tjGjjGeneralData.record_date = getNewRecordDate(generalData.jzny);
			tjGjjGeneralData.name = jo.result.zgxm;
			tjGjjGeneralData.customer_id = jo.result.grdm;
			tjGjjGeneralData.company = jo.result.dwmc;
			tjGjjGeneralData.balance = generalData.zhye;
			tjGjjGeneralData.base = generalData.yjce;
			tjGjjGeneralData.state = khzt(generalData.zhzt);
			tjGjjGeneralData.initial_date = generalData.khrq;
			tjGjjGeneralData.deposite_base_guess = '';
			tjGjjGeneralData.ID = jo.result.sfzh;

			console.log('tjgjjgeneraldata：  ' + JSON.stringify(tjGjjGeneralData));
		}
	}

}

function jsonToGjjJsonDetail(jo) {
	if(jo&& jo.grmxzzd&&jo.grmxzzd.detail) {
		var detailArray = jo.grmxzzd.detail;
		console.log("cja2y detail into "+JSON.stringify(detailArray));
		var finalDetailArray;
		for(var i = 0; i < detailArray.length; i++) {
			var tempArray = [];
			
			tempArray[0] = '';
			tempArray[1] = detailArray[i].zjlx;
			tempArray[2] = detailArray[i].jzrq;
			tempArray[3] = detailArray[i].ywzy;
			tempArray[4] = '';
			tempArray[5] = detailArray[i].fsje;
			tempArray[6] = detailArray[i].zhye;
           // console.log("cja2y detailarraychild "+JSON.stringify(detailArray[i]));
            //console.log("cja2y temparray "+JSON.stringify(tempArray));
			tjGjjDetailData[i] = tempArray;
		}
		//console.log('tjgjjdetaildata：  ' + JSON.stringify(tjGjjDetailData));
	}
}

function getTotalJson() {
	if(tjGjjGeneralData) {
		tjGjjTotalJson = tjGjjGeneralData;
		if(tjGjjDetailData) {
			tjGjjTotalJson.details = tjGjjDetailData;
		}
		console.log("cja2y total " + JSON.stringify(tjGjjTotalJson));
		return true;
	} else {
		return false;
	}
	
	

}

function getNewRecordDate(myDate){
		var currentDate = "";
		if(myDate.length == 6){
			currentDate = myDate.substring(0,4)+"-"+myDate.substring(4,6)+"-"+"01";
		}
		return currentDate;
	}

function khzt(khzt){
    	var khzt=khzt;
    	if(khzt=="01"){
    		khzt="正常"; 
    	}else{
    		khzt="封存";
    	}
    	return khzt;
    }