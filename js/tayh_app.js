//日期格式化 (xxxx-xx-xx)
function formatDateA(date) {   
   var str = date;  
   return str.replace(/^(\d{4})(\d{2})(\d{2})$/, "$1-$2-$3");
}
//精确日期格式化 (xxxx-xx-xx)
function formatDateB(date) {   
   var str = date;  
   return str.replace(/^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/, "$1-$2-$3 $4:$5:$6");
}
//事件格式化(xx:xx：xx)
function formatTime(time){
	var str = time;  
   return str.replace(/^(\d{2})(\d{2})(\d{2})$/, "$1:$2:$3");
}
//日期格式化 (xxxx-xx)
function formatDate(date) {   
   var str = date;  
   return str.replace(/(.{4})/g,'$1-');   
}
//格式化数字钱数
function fmoney(s, n) {
   /* for(var i = 0; i<arguments.length; i++){
    	if(arguments[i] ==null ) return '';
    }*/
    n = n > 0 && n <= 20 ? n : 2;  
    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";  
    var l = s.split(".")[0].split("").reverse(), r = s.split(".")[1];  
    t = "";  
    for (i = 0; i < l.length; i++) {  
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");   
    }   
    return t.split("").reverse().join("") + "." + r;   
}
//取到后两位钱数  
function lastMoney(money){ 
 	var m=money;
 	var mArr=m.split(".");
 	return mArr;
}
//保留后四位，其余全为***,每隔四位加空格
function stayFourChangeStar(num){
 	var n=num.substring(0,num.length-4).replace(/\w/g, '*') + num.substring(num.length-4);   
	return n; 
}
//只保留后四位，其余的变为6个*
function fourNumSixstar(num){
	var n=num.substring(0,num.length-4).replace(/\w/g, '*') + num.substring(num.length-4);
	return n.substring(n.length-10);
}
//只保留后四位，其余的变为4个*
function fourNumFourstar(num){
	var n=num.substring(0,num.length-4).replace(/\w/g, '*') + num.substring(num.length-4);
 	return n.substring(n.length-8);
}
//4个星,4个数字,中间带空格,一共8位
function fourNumAndStarWithAir(num){
	var n=num.substring(0,num.length-4).replace(/\w/g, '*') + num.substring(num.length-4);
 	return n.substring(n.length-8).replace(/\s/g, '').replace(/(.{4})/g, "$1 "); 
}
//保留后四位，其余全为***,每隔四位加空格
function stayFourAllStar(num){
	var n=num.substring(0,num.length-4).replace(/\w/g, '*') + num.substring(num.length-4);
	return (n.replace(/s/g, '').replace(/(.{4})/g, "$1 ")); 
}
//最多两位小数
function twoSmallNum(a) {
            var b = a.indexOf('.');
            var c = '';
            if (b >= 0) {
                var d = a.split('.');
                if (d[1].length < 0) {
                    c = d[0] + '.0';
                } else if (d[1].length > 0 && d[1].length <= 2) {
                    c = d[0] + '.' + d[1].substr(0, d[1].length);
                } else {
                    c = d[0] + '.' + d[1].substr(0, 2);
                }
            } else {
                c = a;
            }
            return parseFloat(c);
}
//对输入金额的校验
function formatAmount(obj){
	var event = window.event || obj.event;
	if (event.keyCode == 37 | event.keyCode == 39) {
		return;
	}
	//先把非数字的都替换掉，除了数字和.   只允许一个小数点
	obj.value = obj.value.replace(/[^\d.]/g, "").replace(/^\./g, "").replace(/\.{2,}/g, ".").replace(".", "$#$").replace(/\./g, "").replace("$#$", ".").replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
}
//获取失去焦点事件
/*function loseFocus(){ 
	document.getElementById("tqjeInput").style.textAlign = 'right';
}
function addFocus(){
	document.getElementById("tqjeInput").style.textAlign = 'left';
}*/
//对输入金额的第二次校验
/*function formatAmountB(value){
	
}*/
//提前还款计算出结果，给提前还款办理传值（还贷1）
function forBftqhkConfirm(bfhkje){
    	mui.ajax(localStorage.getItem("interfaceUrl")+'tqhkedjs.app', {    
		  timeout: 30000,                       
		  dataType: 'json',    
		  type: 'post', 
		  data: {
		  qqData: encodeURI(JSON.stringify({"grdm": localStorage.getItem("grdm"),
		  	       "dkzh":  plus.webview.currentWebview().dkzh,
		  	       "sldm":  plus.webview.currentWebview().sldm,
		  	       "tqhklx": "2",
		  	       "hkbj": bfhkje
		  }))
		  },
		  success: function(data) {
		  	var hklx = data.data.hklx;
		  	var dqbj = data.data.dqbj;
		  	var dqlx = data.data.dqlx;
		  	var hkbj = data.data.hkbj;
		  	var hkhj = data.data.hkhj;
		  	if(data.jg == "0"){
		  		bftqhkConfirm(hklx,dqbj,dqlx,hkbj,hkhj);
		  	}else if(data.jg == '-98'){
		  		loginPlease();
		  	}else{
		  		plus.nativeUI.toast(data.cwms1,{'duration':'long'});
		  	}
		  },
		  error: function(data) {
		  	plus.nativeUI.toast("网络连接异常!",{'duration':'long'});
		  }  
	});
}
//提前还款最后确认提示效果(贷款类别检查)+办理（部分）（还贷1）
function bftqhkConfirm(hklx,dqbj,dqlx,hkbj,hkhj){
		//确定还款前的弹窗
		mui.ajax(localStorage.getItem("interfaceUrl")+'dklb.app', {     
		  timeout: 30000,                       
		  dataType: 'json',     
		  type: 'post',       
		  data: { 
		  	dkzh: plus.webview.currentWebview().dkzh                                       //贷款账号
		  },        
		  success: function(data) {
		    if(data.jg == "0"){
		    	var content = '';
		       if(data.dklb =='01'){
		          	var content = "<div>1.您正在办理的是“<span style='color:red;'>公积金贷款提前还款业务</span>”。</div><div>2、该业务办理成功后不能撤销。</div><div>3、请确认您的账户能够正常使用，并已将还款资金足额存入还款账户中。</div>";
		       }else{
		       	    var content = "<div>1.您正在偿还“<span style = 'color: red;'>公积金组合贷款中的公积金部分</span>”，而非商业银行按揭部分。如需偿还商业银行按揭部分请咨询贷款银行。</div><div>2、该业务办理成功后不能撤销。</div><div>3、请确认您的账户能够正常使用，并已将还款资金足额存入还款账户中。</div>"
		       }
		       var timer = null,time=5,rightBtn;
		       layerOpen({ 
						"title":"",
						"content": content,
						"btn":["取消","确定阅读"],
						"style":{
							"content":"background-color: #fffff;font-size: 16px; font-weight:700;color: #000000;padding: 18px 20px 18px 20px;border-radius: 8px 8px 0px 0px; z-index:9999",
						},
						"event":[function () {},function () {
							var rightBtn=document.querySelector(".layer_btn_right");
							if(time<0){
								var w = plus.nativeUI.showWaiting("正在办理...");
								mui.ajax(localStorage.getItem("interfaceUrl")+'ywbl.app', {    
											  timeout: 40000,                       
											  dataType: 'json',    
											  type: 'post', 
											  data: { 
												    ywlb: '301',
												    ywxl: '2',
												    sjyzm: document.getElementById("sjyzm").value,
												    ywmm: document.getElementById("ywblmm").value,
												    data: encodeURI(JSON.stringify({
												    	"grdm": localStorage.getItem("grdm"),
												    	"tqhklx": '2',
												    	"dkzh": plus.webview.currentWebview().dkzh,
												    	"sldm": plus.webview.currentWebview().sldm,
												    	"hkbj": hkbj,
												    	"hklx": hklx,
												    	"dqbj": dqbj,
												    	"dqlx": dqlx
												    }))
											  },
											  success: function(data) {
											  	    w.close();
											  	    if(data.jg == "0"){
													  	    mui.openWindow({
																id: 'resultHuandai',
																url: '../../view/resultHuandai.html',
																show: {aniShow: 'slide-in-right',duration:'200'},
																extras: {
																	ywlx: '301',
													                ywxl: '2',
													                bfhkje: hkhj,
													                sldm: plus.webview.currentWebview().sldm
																},
																waiting:{autoShow: true,title:'正在加载...'}
														    });
														    mui.fire(plus.webview.getWebviewById('mine/mine.html'), 'refreshBtn');
												  	    }else if(data.jg == "-99"){
											  	    	    jumpShouye(data.cwms1);
											  	        }else{
												  	    	datajgRespone({dataJg: data.jg, cwms: data.cwms1, ywlb: 1});
												  	    }
											  },      
											  error: function(data) {
											  	w.close();
											  	plus.webview.currentWebview().close();
											  	plus.nativeUI.toast("您的业务申请已提交，请于“我的办理”中查询业务受理结果，如有疑问请拨打12329咨询。",{'duration':'long'}); 
											  }     
										});
								return;
							}
							//如果定时器正在运行，则默认不做任何事		
							if(timer){return true;}
							//启动定时器
							rightBtn.innerHTML=time+'s';
							timer = setInterval(function(){
									time--;
									if(time<0){
										rightBtn.innerHTML = '确定'; 
										clearInterval(timer);
										timer = null;
										return;
									}
									rightBtn.innerHTML=time+'s';
								},1000); 
							return true;
						   }] 
					   });
	       }else{ datajgRespone({dataJg: data.jg, cwms: data.cwms1, ywlb: 0});}
		  },     
		  error: function(data) { plus.nativeUI.toast("网络连接异常!",{'duration':'long'}); } 
		});     /*弹窗方法结束*/
}

//提前还款最后确认提示效果+办理（结清）（还贷1）
function jqtqhkConfirm(hkhj){
		layerOpen({ 
		"title":"",
		"content":"<div>1、您正在办理的是“公积金组合贷款中<span style='color: #41AE32'>公积金部分的提前还款”</span>，而非“公积金组合贷款中<span style='color: #FF0000'>商业银行按揭部分</span>的提前还款”；</div><div>2、该业务办理成功后不能撤销；</div><div>3、请确认您的还款账户能够正常使用，并已将还款资金足额存入还款账户中。</div>",
		"btn":["取消","确定阅读"],
		"style":{
			"content":"background-color: #fffff;font-size: 16px; font-weight:700;color: #000000;padding: 18px 20px 18px 20px;border-radius: 8px 8px 0px 0px; z-index:9999",
		},
		"event":[function () {
		},function () {
			var rightBtn=document.querySelector(".layer_btn_right");
			var timer = 5;
			rightBtn.id='';
			rightBtn.innerHTML=timer+'s';
			setInterval(function(){
				if(timer > 0){
					timer=timer-1;
					rightBtn.innerHTML=timer+'s';
				}else{
					
					rightBtn.innerHTML='确定';
					rightBtn.addEventListener('tap',function(){
						mui.ajax(localStorage.getItem("interfaceUrl")+'ywbl.app', {    
								  timeout: 15000,                       
								  dataType: 'json',    
								  type: 'post', 
								  data: { 
								    ywlb: '205',
								    ywxl: '1',
								    sjyzm:  document.getElementById("sjyzm").value,
								    ywmm: document.getElementById("ywblmm").value,
								    data: encodeURI(JSON.stringify({
								    	"grdm": localStorage.getItem("grdm"),
								    	"tqhklx": '1',
								    	"dkzh": plus.webview.currentWebview().dkzh,
								    	"sldm": plus.webview.currentWebview().sldm,
								    	"hkbj": plus.webview.currentWebview().hkbj,
								    	"hklx": plus.webview.currentWebview().hklx,
								    	"dqbj": plus.webview.currentWebview().dqbj,
								    	"dqlx": plus.webview.currentWebview().dqlx
								    }))
								  },
								  success: function(data) {
								  	    if(data.jg=="0"){
									  	    mui.openWindow({
												id: 'tqhkResult',
												url: '../view/result.html',
												show: {aniShow: 'slide-in-right',duration:'200'},
												extras: {
													ywlx: '205',
									                ywxl: '1',
									                jqhkje: hkhj 
												},
												waiting:{autoShow: true,title:'正在加载...'}
										    });
								  	    }else if(data.jg == '-98'){
							  		            loginPlease();
									  	}else{
									  		    plus.nativeUI.toast(data.cwms1,{'duration':'long'});
									  	}
								  },      
								  error: function(data) {
								  	     plus.nativeUI.toast("网络连接异常!",{'duration':'long'});
								  }  
					    });
						layerClose();
					})
				}
			},1000);
			return true;
		}] 
	});
}
//余额还贷给最后办理传计算后的值（还贷2）
function forBfyehdConfirm(yehdValue){
		mui.ajax(localStorage.getItem("interfaceUrl")+'yehdedjs.app', {    
		  timeout: 30000,                       
		  dataType: 'json',    
		  type: 'post', 
		  data: {
		  qqData: encodeURI(JSON.stringify({"grdm": localStorage.getItem("grdm"),
		          "djbbh": plus.webview.currentWebview().djbbh,
		  	      "dkzh":  plus.webview.currentWebview().dkzh,
		  	      "sldm":  plus.webview.currentWebview().sldm,
		  	      "tqhklx": "01",
		  	      "hkbj": yehdValue
		  }))
		  },
		  success: function(data) {
		  	if(data.jg == '0'){
		  		var hklx = data.data.hklx;
			  	var dqbj = data.data.dqbj;
			  	var dqlx = data.data.dqlx;
			  	var tjgjj = data.data.tjgjj;
			  	var tjbc = data.data.tjbc;
			  	var tjay = data.data.tjay;
			  	var hkbj = data.data.hkbj;
			  	var hkhj = data.data.hkhj;
			  	bfyehdConfirm(hklx,dqbj,dqlx,tjgjj,tjbc,tjay,hkbj,hkhj);
		  	}else if(data.jg == '-98'){
		  		    loginPlease();
		  	}else{
		  		    plus.nativeUI.toast(data.cwms1,{'duration':'long'});
		  	}
		  },
		  error: function(data) {
		  	    plus.nativeUI.toast("网络连接异常!",{'duration':'long'});
		  }  
	});
}
//余额还贷最后确认提示效果+办理（部分）（还贷2）
function bfyehdConfirm(hklx,dqbj,dqlx,tjgjj,tjbc,tjay,hkbj,hkhj){
	    //确定还款前的弹窗
		mui.ajax(localStorage.getItem("interfaceUrl")+'dklb.app', {     
		  timeout: 15000,                       
		  dataType: 'json',     
		  type: 'post',       
		  data: { 
		  	dkzh: plus.webview.currentWebview().dkzh                                       //贷款账号
		  },        
		  success: function(data) { 
		    if(data.jg == "0"){
		       var content = '';
		       if(data.dklb =='01'){
		       	   var content = "<div>1.您正在办理的是“<span style='color:red;'>公积金贷款余额还贷业务</span>”。</div><div>2.该业务办理成功后不能撤销。</div>";
		       }else{
		       	   var content = "<div>1.您正在偿还“<span style='color:red;'>公积金组合贷款中的公积金部分</span>”，而非商业银行按揭部分。如需偿还商业银行按揭部分请咨询贷款银行。</div><div>2.该业务办理成功后不能撤销。</div>"
		       }
		       var timer = null,time=5,rightBtn;
		       layerOpen({ 
						"title":"",
						"content": content,
						"btn":["取消","确定阅读"],
						"style":{
							"content":"background-color: #fffff;font-size: 16px; font-weight:700;color: #000000;padding: 18px 20px 18px 20px;border-radius: 8px 8px 0px 0px; z-index:9999",
						},
						"event":[function () {},function () {
							var rightBtn=document.querySelector(".layer_btn_right");
							if(time<0){
								    var w = plus.nativeUI.showWaiting("正在办理...");
									mui.ajax(localStorage.getItem("interfaceUrl")+'ywbl.app', {    
											  timeout: 40000,                       
											  dataType: 'json',    
											  type: 'post', 
											  data: { 
											    ywlb: '302',
											    ywxl: '01',
											    sjyzm:  document.getElementById("sjyzm").value,
											    ywmm: document.getElementById("ywblmm").value,
											    data: encodeURI(JSON.stringify({
											    	"grdm": localStorage.getItem("grdm"),
											    	"tqhklx": '01',
											    	"dkzh": plus.webview.currentWebview().dkzh,
											    	"djbbh": plus.webview.currentWebview().djbbh,
											    	"sldm": plus.webview.currentWebview().sldm,
											    	"hkbj": hkbj,
											    	"hklx": hklx,
											    	"dqbj": dqbj,
											    	"dqlx": dqlx,
											    	"gjjje": tjgjj,
											    	"bcje": tjbc,
											    	"ayje": tjay
											    }))
											  },
											  success: function(data) {
											  	    w.close(); 
											  	    if(data.jg == "0"){
												  	    mui.openWindow({
															id: 'resultHuandai',
															url: '../../view/resultHuandai.html',
															show: {aniShow: 'slide-in-right',duration:'200'},
															extras: {
																ywlx: '302',
												                ywxl: '01',
												                bfhkje: hkhj,
												                sldm: plus.webview.currentWebview().sldm
															},
															waiting:{autoShow: true,title:'正在加载...'}
													    });
													    mui.fire(plus.webview.getWebviewById('mine/mine.html'), 'refreshBtn');
											  	    }else if(data.jg == "-99"){
										  	    	    jumpShouye(data.cwms1);
										  	       }else{ datajgRespone({dataJg: data.jg, cwms: data.cwms1, ywlb: 1, loginUrl: '../../login.html'});}
											  },      
											  error: function(data) {
											  	    w.close(); 
											  	    plus.webview.currentWebview().close();
											  	    plus.nativeUI.toast("您的业务申请已提交，请于“我的办理”中查询业务受理结果，如有疑问请拨打12329咨询。",{'duration':'long'});
											  }  
									});                                       //余额还贷结束
								return;
							}
							//如果定时器正在运行，则默认不做任何事		
							if(timer){return true;}
							//启动定时器
							rightBtn.innerHTML=time+'s';
							timer = setInterval(function(){
									time--;
									if(time<0){
										rightBtn.innerHTML = '确定'; 
										clearInterval(timer);
										timer = null;
										return;
									}
									rightBtn.innerHTML=time+'s';
								},1000); 
							return true;
						}] 
				});
	       }else{ datajgRespone( {dataJg: data.jg, cwms: data.cwms1, ywlb: 0}); }
		  },     
		  error: function(data) { plus.nativeUI.toast("网络连接异常!",{'duration':'long'}); } 
		});     /*弹窗方法结束*/
}	
//余额还贷最后确认提示效果（结清）（还贷1）
function jqyehdConfirm(hkhj){
	layerOpen({ 
		"title":"",
		"content":"<div>1、您正在办理的是<span style='color: #41AE32'>“结清组合贷款中的公积金贷款”</span>，而非“<span style='color: #FF0000'>结清组合贷款中的商业银行按揭贷款</span>”；</div><div>2、该业务办理成功后不能撤销；</div><div>3、请确认您的还款账户能够正常使用，并已将还款资金足额存入还款账户中。</div>",
		"btn":["取消","确定阅读"],
		"style":{
			"content":"background-color: #fffff;font-size: 16px; font-weight:700;color: #000000;padding: 18px 20px 18px 20px;border-radius: 8px 8px 0px 0px; z-index:9999",
		},
		"event":[function () { 
		},function () {
			var rightBtn=document.querySelector(".layer_btn_right");
			var timer=5;
			rightBtn.id='';
			rightBtn.innerHTML=timer+'s';
			setInterval(function(){
				if(timer > 0){
					timer=timer-1;
					rightBtn.innerHTML=timer+'s';
				}else{
					rightBtn.innerHTML='确定';
					rightBtn.addEventListener('tap',function(){
					mui.ajax(localStorage.getItem("interfaceUrl")+'ywbl.app', {    
							  timeout: 15000,                       
							  dataType: 'json',    
							  type: 'post', 
							  data: { 
							    ywlb: '208',
							    ywxl: '1',
							    sjyzm:  document.getElementById("sjyzm").value,
							    ywmm: document.getElementById("ywblmm").value,
							    data: encodeURI(JSON.stringify({
							    	"grdm": localStorage.getItem("grdm"),
							    	"tqhklx": '1',
							    	"dkzh": plus.webview.currentWebview().dkzh,
							    	"djbbh": plus.webview.currentWebview().djbbh,
							    	"sldm": plus.webview.currentWebview().sldm,
							    	"hkbj": plus.webview.currentWebview().hkbj,
							    	"hklx": plus.webview.currentWebview().hklx,
							    	"dqbj": plus.webview.currentWebview().dqbj,
							    	"dqlx": plus.webview.currentWebview().dqlx,
							    	"gjjje": plus.webview.currentWebview().gjjje,
							    	"bcje": plus.webview.currentWebview().bcje,
							    	"ayje": plus.webview.currentWebview().ayje
							    }))
							  },
							  success: function(data) {
							  	    if(data.jg == "0"){
							  	      mui.openWindow({
										id: 'tqhkResult',
										url: '../view/result.html',
										show: {aniShow: 'slide-in-right',duration:'200'},
										extras: {
												ywlx: '208',
								                ywxl: '1',
								                jqhkje: hkhj 
										},
										waiting: {autoShow: true,title:'正在加载...'}
								    });
							  	    }plus.nativeUI.toast(data.cwms1,{'duration':'long'});
							  },      
							  error: function(data) {
							  	    plus.nativeUI.toast("网络连接异常!",{'duration':'long'});  
							  }  
				    });
					layerClose();
					})
				}
			},1000);
			return true;
		}] 
	});
}
//办理销户提取业务（提取3+4）
function xhtqYwbl(valueSjyzm,valueYwblmm,ywlb,ywxl,yehj){
	layerOpen({ 
		"title":"",
		"content":"<div>确认提交后您的公积金账户将被<span style='color: #FF0000'>注销！</span></div>",
		"btn":["取消","确认"],
		"style":{
			"content":"background-color: #fffff;font-size: 16px; font-weight:700;color: #000000;padding: 18px 20px 18px 20px;border-radius: 8px 8px 0px 0px; z-index:9999",
		},
		"event":[function () {},function () {
			var w = plus.nativeUI.showWaiting("正在办理...");   //防止快速点击情况的发生
			mui.ajax(localStorage.getItem("interfaceUrl")+'ywbl.app', {    
							  timeout: 40000,                       
							  dataType: 'json',    
							  type: 'post', 
							  data: { 
							    ywlb: ywlb,
							    ywxl: ywxl,
							    sjyzm: valueSjyzm,
							    ywmm: valueYwblmm,
							    data: encodeURI(JSON.stringify({
							    	"grdm": localStorage.getItem("grdm"),
							    	"xhlx": ywxl,
							    	"sldm": plus.webview.currentWebview().sldm,
							    	"gjjje": plus.webview.currentWebview().gjjje,
							    	"gjjdqlx": plus.webview.currentWebview().gjjdqlx,
							    	"gjjhqlx": plus.webview.currentWebview().gjjhqlx,
							    	"bcje": plus.webview.currentWebview().bcje,
							    	"bcdqlx": plus.webview.currentWebview().bcdqlx,
							    	"bchqlx": plus.webview.currentWebview().bchqlx,
							    	"ayje": plus.webview.currentWebview().ayje,
							    	"aydqlx": plus.webview.currentWebview().aydqlx,
							    	"ayhqlx": plus.webview.currentWebview().ayhqlx
							    }))
							  },
							  success: function(data) {
                                w.close();
							  	var jg = data.jg;
							  	    if(jg == "0"){
								  	 mui.openWindow({
													id: 'resultTiqu',
													url: '../../view/resultTiqu.html',
													show: {aniShow: 'slide-in-right',duration:'200'},
													waiting: {autoShow: true,title:'正在加载...'},
													extras:{
														ywlx: ywlb,
														tqje: yehj,
														sldm: plus.webview.currentWebview().sldm
													}
											   });
											mui.fire(plus.webview.getWebviewById('mine/mine.html'), 'refreshBtn');
							  	    }else if(data.jg == "-99"){
						  	    	    jumpShouye(data.cwms1);
						  	        }else{ datajgRespone({dataJg: jg, cwms: data.cwms1, ywlb: 1}); }
							  },      
							  error: function(data) {
							  	    w.close();
							  	    plus.webview.currentWebview().close();
							  	    plus.nativeUI.toast("您的业务申请已提交，请于“我的办理”中查询业务受理结果，如有疑问请拨打12329咨询。",{'duration':'long'});
							  }  
				    });
					layerClose();
		}]
	});
}
//获取原手机号码
function getOldSjhm(){
mui.ajax(localStorage.getItem("interfaceUrl")+'ysjhm.app', {     
			  timeout: 15000,
			  dataType: 'json',  
			  type: 'post',
			  success: function(data) {
			  	    document.getElementById("sjhm").innerHTML+=data.ysjhm.replace(/^(\d{3})\d{4}(\d+)/,"$1****$2");
			  },
			  error: function(data) {
			  	        plus.nativeUI.toast("网络连接异常!",{'duration':'long'});   
			   } 
		});
}
//判断原手机号码
function hasOldSjhm(){
mui.ajax(localStorage.getItem("interfaceUrl")+'ysjhm.app', {     
			  timeout: 30000,
			  dataType: 'json',  
			  type: 'post',
			  success: function(data) {
			  	if(data.ysjhm == ''){
			  		plus.nativeUI.toast("您尚未绑定手机号码!",{'duration':'long'});
			  		return false;
			  	}else{
			  		mui.openWindow({
					                url: "../mine/changePhoneNum.html",   
					                id: "../mine/changePhoneNum.html",
					                show: {aniShow: 'slide-in-right',
										   duration: '350'
									},
									waiting:{
							           autoShow: true,
							           title:'正在加载...'
							       }
					               });
			  	}
			  },
			  error: function(data) {
			  	    plus.nativeUI.toast("网络连接异常!",{'duration':'long'});  
			   } 
		});
}
//获取新手机验证码
function getSjYzm(ywlb){
	mui.ajax(localStorage.getItem("interfaceUrl")+'fssjyzm.app', {     
			  timeout: 15000,
			  dataType: 'json',  
			  type: 'post',
			  data: {
			  	ywlb: ywlb
			  },
			  success: function(data) {
			  	if(data.jg == "0"){
			  		plus.nativeUI.toast("已发送至绑定手机,请注意查收！",{'duration':'long'});
			  	}else if(data.jg == '-98'){
			  		loginPlease();
			  	}else{
			  		plus.nativeUI.toast(data.cwms1,{'duration':'long'});
			  	}
			  },
			  error: function(data) {
			  	plus.nativeUI.toast("网络连接异常!",{'duration':'long'});   
			   } 
		});
}
//获取新手机验证码 办理
function getSjYzmBl(ywlb,sldm){
	mui.ajax(localStorage.getItem("interfaceUrl")+'fssjyzm.app', {     
			  timeout: 15000,
			  dataType: 'json',  
			  type: 'post',
			  data: {
			  	ywlb: ywlb,
			  	sldm: sldm
			  },
			  success: function(data) {
			  	if(data.jg == "0"){
			  		plus.nativeUI.toast("已发送至绑定手机,请注意查收！",{'duration':'long'});
			  	}else if(data.jg == '-98'){
			  		loginPlease();
			  	}else{
			  		plus.nativeUI.toast(data.cwms1,{'duration':'long'});
			  	}
			  },
			  error: function(data) {
			  	    plus.nativeUI.toast("网络连接异常!",{'duration':'long'});   
			   } 
		});
}
//获取新手机验证码
function getNewSjYzm(sjhm){
	mui.ajax(localStorage.getItem("interfaceUrl")+'fssjyzm.app', {     
			  timeout: 15000,
			  dataType: 'json',  
			  type: 'post',
			  data: {
			  	ywlb: '403',
			  	sjhm: sjhm
			  },
			  success: function(data) {
			  	if(data.jg == "0"){
			  		plus.nativeUI.toast("已发送至绑定手机,请注意查收！",{'duration':'long'});
			  	}else if(data.jg == '-98'){
			  		loginPlease();
			  	}else{
			  		plus.nativeUI.toast(data.cwms1,{'duration':'long'});
			  	}
			  },
			  error: function(data) {
			  	    plus.nativeUI.toast("网络连接异常!",{'duration':'long'});   
			   } 
		});
}
//渠道接入检查(还贷)
function hdqdjrjc(ywlb,url,id){
	var w = plus.nativeUI.showWaiting("正在加载...");   //防止快速点击情况的发生
	mui.ajax(localStorage.getItem("interfaceUrl")+'qdjrjc.app', {     
			  timeout: 15000,                       
			  dataType: 'json',     
			  type: 'post',       
			  data: {  
			  	ywlb: ywlb
			  },        
			  success: function(data) {
			  	w.close();
			  	var jg = data.jg;
			  	if(jg == "0"){
			  		mui.openWindow({
		                url: url,   
		                id: id,
		                show: {aniShow: 'slide-in-right',
							   duration: '350'
						},
						waiting:{
				           autoShow: true,
				           title:'正在加载...'
				        },
						extras:{ 
							ywlsh: data.ywlsh 
						}
		            });
			  	}else if(jg == "Q0000007"){
			  		        var cwms7 = data.cwms1;
	  		                plus.nativeUI.confirm( cwms7, function(e){
									if(e.index==0){}
									}, "", ["确定"] );
			  	}else if(jg == "Q0000008"){
			  		        var cwms8 = data.cwms1;
					  		plus.nativeUI.confirm( cwms8, function(e){
													if(e.index==1){
															mui.openWindow({
														                url: '../mine/setChannel.html',   
														                id: '../mine/setChannel.html',
														                show: {aniShow: 'slide-in-right',
																			   duration: '350'
																		},
																		waiting:{
																           autoShow: true,
																           title:'正在加载...'
																        },
																		extras:{ 
																			ywlsh: data.ywlsh 
																		}
														            });
															    }
													}, "", ["取消","变更签约渠道"] );
			  	}else{
			  	    datajgRespone({dataJg: jg, cwms: data.cwms1, ywlb: 0});   /*dataJg,cwms,ywlb,loginUrl,errorUrl*/
			  	}
			  },     
			  error: function(data) {
			  	w.close();
			  	plus.nativeUI.toast("网络连接异常!",{'duration':'long'});
			  } 
		});
	}
//渠道接入检查(销户)+销户前置检查(销户)
function xhqdjrjc(ywlb,ywxl,url,id){
	var w = plus.nativeUI.showWaiting("正在加载...");   //防止快速点击情况的发生
	mui.ajax(localStorage.getItem("interfaceUrl")+'qdjrjc.app', {     
		  timeout: 15000,                       
		  dataType: 'json',     
		  type: 'post',       
		  data: {  
		  	ywlb: ywlb
		  },        
		  success: function(data) { 
		  	if(data.jg == "0"){
		  		//销户前置检查
		  	    mui.ajax(localStorage.getItem("interfaceUrl")+'xhtqqzjc.app', {                         
					  dataType: 'json',     
					  type: 'post',       
					  data: {  
					  	ywlb: ywlb,
					  	ywxl: ywxl,
					  	ywlsh: data.ywlsh
					  },        
					  success: function(data) {
					  	w.close();
					  	if(data.jg == "0"){
					  	   mui.openWindow({
				                url: url,   
				                id: id,
				                show: {aniShow: 'slide-in-right',
									   duration: '350'
								},
								waiting:{
							           autoShow: true,
							           title:'正在加载...'
							    },
								extras:{
									ywlsh: data.ywlsh,
									yehj: data.response.yehj,
									sldm: data.response.sldm,
									gjjje: data.response.gjjzhye,
									gjjdqlx: data.response.gjjdqlx,
									gjjhqlx: data.response.gjjhqlx,
									bcje: data.response.bczhye,
									bcdqlx: data.response.bcdqlx,
									bchqlx: data.response.bchqlx,
									ayje: data.response.ayzhye,
									aydqlx: data.response.aydqlx,
									ayhqlx: data.response.ayhqlx
								}
				              }); 
					  	}else{
					  		//plus.nativeUI.toast(data.cwms1,{'duration':'long'});
					  		datajgRespone({dataJg: data.jg, cwms: data.cwms1, ywlb: 0}); 
					  	}
					  },     
					  error: function(data) {
					  	w.close();
					  	plus.nativeUI.toast("网络连接异常!",{'duration':'long'});
					   } 
					});
		  	}else if(data.jg == "Q0000007"){
			  		        var cwms7 = data.cwms1;
			  		        w.close();
	  		                plus.nativeUI.confirm( cwms7, function(e){
									if(e.index==0){}
									}, "", ["确定"] );
		  	}else if(data.jg == "Q0000008"){
		  		        var cwms8 = data.cwms1;
		  		        w.close();
				  		plus.nativeUI.confirm( cwms8, function(e){
												if(e.index==1){
														mui.openWindow({
													                url: '../mine/setChannel.html',   
													                id: '../mine/setChannel.html',
													                show: {aniShow: 'slide-in-right',
																		   duration: '350'
																	},
																	waiting:{
															           autoShow: true,
															           title:'正在加载...'
															        },
																	extras:{ 
																		ywlsh: data.ywlsh 
																	}
													            });
														    }
												}, "", ["取消","变更签约渠道"] );
		  	}else{
		  		//tiquServiceIsJrqd();     //弹出提示窗口
		  		w.close();
		  		datajgRespone({dataJg: data.jg, cwms: data.cwms1, ywlb: 0});
		  	}
		  },     
		  error: function(data) {
		  	w.close();
		  	plus.nativeUI.toast("网络连接异常!",{'duration':'long'});
		   } 
		});
}
//提取业务 已签约  检查是否授权渠道
function tiquServiceIsJrqd(){
	plus.nativeUI.confirm( "您尚未授权手机APP办理权限，请先完成授权后申请办理。", function(e){
		if(e.index==0){
			mui.openWindow({
							id: '../mine/setChannel.html',
							url: '../mine/setChannel.html', 
							show: {aniShow: 'slide-in-right',duration:'200'},
							waiting:{
							           autoShow: true,
							           title:'正在加载...'
							   }
						});
			          }else{
			           	}
	}, "", ["变更签约渠道","取消"] );
}

//委托代打渠道接入检查+前置检查
function wtddqzjc(dkzh,url){
	var w = plus.nativeUI.showWaiting();   //防止快速点击情况的发生
	mui.ajax(localStorage.getItem("interfaceUrl")+'qdjrjc.app', {     
						  timeout: 15000,                       
						  dataType: 'json',     
						  type: 'post',       
						  data: {  
						  	ywlb: "303"
						  },        
						  success: function(data) {
						  	w.close();
						  	if(data.jg == "0"){
						  		mui.ajax(localStorage.getItem("interfaceUrl")+'wtddqzjc.app', {     
									  timeout: 5000,                       
									  dataType: 'json',     
									  type: 'post',       
									  data: {  
									  	dkzh: dkzh,
									  	ywlsh: data.ywlsh
									  },        
									  success: function(data) {    
									  	if(data.jg == "0"){
									  		mui.openWindow({
												id: url,
												url: url, 
												show: {aniShow: 'slide-in-right',duration:'200'},
												waiting:{
												           autoShow: true,
												  },
												extras: {
													sfwt: data.response.sfwt,
													sldm: data.response.sldm,
													dkzh: dkzh
												}
											});
									  	}else if(data.jg == '-98'){
									  		loginPlease();
									  	}else{
									  		mui.openWindow({
												id: url,
												url: url, 
												show: {aniShow: 'slide-in-right',duration:'200'},
												waiting:{
												           autoShow: true,
												  },
												extras: {
													dkzh: dkzh
												}
											});									  		
									  	}
									  },     
									  error: function(data) {
									  	 plus.nativeUI.toast("网络连接异常!",{'duration':'long'});
									   } 
								});
						  	}else if(data.jg == '-98'){
						  		loginPlease();
						  	}else{
						  		mui.openWindow({
												id: url,
												url: url, 
												show: {aniShow: 'slide-in-right',duration:'200'},
												waiting:{
												           autoShow: true,
												  },
												extras: {
													dkzh: dkzh
												}
										});
						  	}  
						  },     
						  error: function(data) {
						  	w.close();
						  	plus.nativeUI.toast("网络连接异常!",{'duration':'long'});
						   } 
						});
}
//委托代打业务弹窗处理
function wtdayw(dkzh,sldm){
	var hideWindow = document.getElementById("rightWindow");
	    var timer = null,time=5,rightBtn;
		layerOpen({ 
		"title":"",
		"content":"<div>1、“委托代打业务”即授权单位经办人通过网缴系统或公积金柜台为您<span style='color: red'>打印还款凭证</span>或<span style='color: red'>还款计划</span>;</div><div>2、办理业务前，建议您向单位确认是否开设网缴业务；授权成功后，您应<span style='color: red'>及时告知单位经办人</span>;</div><div>3、该业务办理成功后不影响您在柜台或电子渠道自助打印功能。</div>",
		"btn":["取消","确定"],
		"style":{
			"content":"background-color: #fffff;font-size: 16px; font-weight:700;color: #000000;padding: 18px 20px 18px 20px;border-radius: 8px 8px 0px 0px; z-index:9999",
		},
		"event":[function () {
			hideWindow.style.display='none';
		},function () {
			var rightBtn=document.querySelector(".layer_btn_right");
			if(time<0){
					wtddBanli(dkzh,sldm,"0");
			        hideWindow.style.display='none';
			        return;
				}
			//如果定时器正在运行，则默认不做任何事		
			if(timer){return true;}
			//启动定时器
			rightBtn.innerHTML=time+'s';
			timer = setInterval(function(){
					time--;
					if(time<0){
						rightBtn.innerHTML = '确认办理'; 
						clearInterval(timer);
						timer = null;
						return;
					}
					rightBtn.innerHTML=time+'s';
				},1000); 
			return true;
		}] 
		//"shadeClose": false  
	});
}
//委托代打业务办理
function wtddBanli(dkzh,sldm,sfwt){
	mui.ajax(localStorage.getItem("interfaceUrl")+'ywbl.app', {    
							  timeout: 40000,                       
							  dataType: 'json',    
							  type: 'post', 
							  data: { 
							    ywlb: "303",
							    data: encodeURI(JSON.stringify({
							    	"grdm": localStorage.getItem("grdm"),
							    	"dkzh": dkzh,
							    	"sldm": sldm,
							    	"sfwt": sfwt
							    }))
							  },
							  success: function(data) {
							  	    if(data.jg == "0"){
							  	       mui.back();
							  	       plus.nativeUI.toast("已办理成功!",{'duration':'long'});
							  	    }else if(data.jg == '-98'){
							  		    loginPlease();
								  	}else{
								  		plus.nativeUI.toast(data.cwms1,{'duration':'long'});
								  	}
							  },      
							  error: function(data) {
							     	plus.nativeUI.toast("网络连接异常!",{'duration':'long'});
							  }  
				    });
 }
//是否登录(底部选项卡)
function isLogin(){
		if(localStorage.getItem("isLogin") == "true"){
			return;
		}else{
			mui.toast("请先登录！"); 
			mui.openWindow({
							   id: 'login',
							   url: 'login.html',
							   show: {aniShow: 'slide-in-right',duration:'200'},
							   waiting:{autoShow: true,title:'正在加载...'}
						    });
		}
}
//是否登录(menu)
function isLoginMenu(type){
	            var indexPage=null;
                if (!indexPage) { 
                    indexPage = plus.webview.getLaunchWebview();
                } 
				if(localStorage.getItem("isLogin") == "true"){
					//模拟触发选项卡自定义事件
					if(type == 1){   //已废弃
						mui.fire(indexPage, 'eventMyloan');
					}else if(type == 2){
						mui.fire(indexPage, 'eventTiqu');
					}else if(type == 3){
						mui.fire(indexPage, 'eventHuandai');
					}
				}else{
					mui.toast("请先登录！"); 
					mui.openWindow({
										id: 'login',
										url: '../login.html',
										show: {aniShow: 'slide-in-right',duration:'200'},
										waiting:{autoShow: true,title:'正在加载...'}
								    });
				}
		}
//这里是data.jg不等于0的处理方式
function datajgRespone(obj/*dataJg,cwms,ywlb,url*/){    /*参数：结果,错误描述,业务类别 - 0查询  1办理, 错误页面的地址,登录面地址*/
	        var allWebview = plus.webview.all();
			switch (obj.dataJg)
			{
			//渠道未启用	
			case "Q7010001":
			        jumpShouye(obj.cwms);
			        break;
			//超出渠道流量最大值
			case "Q7010002":
				    jumpShouye(obj.cwms);
			        break;
			//业务未启用
			/*case "Q7020001":
			        if(obj.ywlb == 0){
			        	//直接出错误页面
			        	cwymCommon(obj.cwms);
			        }else{
			        	//确定后进入我的我公积金
			            jumpMine(obj.cwms);
			        }
			        break;*/
			//超出业务服务时间
/*			case "Q7020002":
				    if(ywlb == 0){
				        cwymCommon(obj.cwms);
			        }else{
			            jumpMine(obj.cwms);
			        }
				    break;*/
			//超出业务办理次数，只有办理类业务有  
			case "Q7020003":
		            jumpMine(obj.cwms);
		            break;
			//超出业务限额 ，只有办理类业务有
			case "Q7020004":
				    cwymCommon(obj.cwms)/*,obj.errorUrl*/
				    break;
			//请登录
			case "-98":
			//进入登录页面
			        loginPlease();
				    break;
			default:
			        plus.nativeUI.toast(obj.cwms,{'duration':'long'});
			        break;
			}
}
//跳到首页
function jumpShouye(cwms){                
	        var allWebview = plus.webview.all();
			plus.nativeUI.confirm(cwms, function(e){
				    if(e.index==0){
				    	      mui.fire(plus.webview.getLaunchWebview(), 'eventMenu');
					          //回到我的公积金
					          for(var i=0; i<allWebview.length; i++){
				        			if(allWebview[i].id !== plus.runtime.appid && allWebview[i].id !=='view/menu.html' && allWebview[i].id !=='tiquService/getDemo.html' && allWebview[i].id !=='huandaiService/huanDai.html' && allWebview[i].id !=='mine/mine.html'){
				        				allWebview[i].close();
				        			}
				        		}
					        }
			        }, "", ["确定"]);
}
//跳到我的公积金页面
function jumpMine(cwms){ 
	        var allWebview = plus.webview.all();
			plus.nativeUI.confirm(cwms, function(e){
				    if(e.index==0){
				    	      mui.fire(plus.webview.getLaunchWebview(), 'eventMyloan');
					          //回到我的公积金
					          for(var i=0; i<allWebview.length; i++){
				        			if(allWebview[i].id !== plus.runtime.appid && allWebview[i].id !=='view/menu.html' && allWebview[i].id !=='tiquService/getDemo.html' && allWebview[i].id !=='huandaiService/huanDai.html' && allWebview[i].id !=='mine/mine.html'){
				        				allWebview[i].close();
				        			}
				        		}
					        }
			        }, "", ["确定"]);
}
//错误页面的通用写法
function cwymCommon(cwms){  /*url*/
	plus.nativeUI.toast(cwms,{'duration':'long'});
	/*plus.webview.currentWebview().close();   //关闭当前页面，打开错误页面
	mui.openWindow({
								id: 'errorPage',
								url: url,
								show: {aniShow: 'zoom-fade-out',duration:'200'},
								extras:{
									cwms: cwms
								},
								waiting:{autoShow: true,title:'正在加载...'}
						    });*/
}
//-98请登录
function loginPlease(){
                	plus.nativeUI.toast("请先登录!",{'duration':'long'});
	                localStorage.setItem('isLogin','');              //清除当前已登录的状态
	                var allWebview = plus.webview.all();             //获得所有的webview页面
				    for(var i=0; i<allWebview.length; i++){          //除了首页的全部关闭
				        			if(allWebview[i].id !== plus.runtime.appid && allWebview[i].id !=='view/menu.html' && allWebview[i].id !=='tiquService/getDemo.html' && allWebview[i].id !=='huandaiService/huanDai.html' && allWebview[i].id !=='mine/mine.html'){
				        				allWebview[i].close();
				        			}
				        	}
				    mui.fire(plus.webview.getLaunchWebview(), 'eventMenu');
				    mui.fire(plus.webview.getLaunchWebview(), 'openLogin');
}
//在线咨询
function onlineConsult(){
	var oOnlineZixun = document.getElementById("onlineZixun");
	oOnlineZixun.addEventListener('tap',function(){
		if(localStorage.getItem('onlineClicked') == 'true'){
			plus.webview.getWebviewById('rgfw').show("slide-in-right", 300);
		}else{
			localStorage.setItem('onlineClicked','true');
			 mui.fire(plus.webview.getWebviewById('view/menu.html'), 'createZxzx');
		}
		})		
}
//登录渠道判断
function dlqdName(qdlx){
	switch (qdlx)
			{
			case "01":
			        return 'IVR语音';
			case "02":
			        return '人工语音';
			case "10":
			        return '个人网厅';
			case "11":
			        return '手机APP';
			case "12":
			        return '微信';
			case "13":
			        return '门户网站';
			case "14":
			        return '短信平台';
			case "21":
			        return '网缴';
			case "22":
			        return '自助机具';
			case "23":
			        return '柜台';
			case "31":
			        return 'ATM';
			case "32":
			        return '网银';
            case "33":			        
                    return '银行电话';
            }
}
//账户设置渠道停起检查
function zhszjc(ywlb,callback){
	var w = plus.nativeUI.showWaiting();   
	mui.ajax(localStorage.getItem("interfaceUrl")+'zhszjc.app', {    
		  timeout: 15000,                       
		  dataType: 'json',    
		  type: 'post', 
		  data: {ywlb: ywlb},
		  success: function(data) {
		  	    w.close();
			  	if(data.jg == "0"){
			  		callback();
			  	}else{
			  	    mui.toast(data.cwms1);
			  	}
		  },
		  error: function(data) {
		  	w.close();
		  	mui.toast("网络连接异常!");
		  }  
	});
}
//判断配偶男女头像
function getXb(sfzh){
	    	if(sfzh.length == '15'){
	    		if('02468'.indexOf(sfzh.substring(14, 15)) > -1){
	    			return '0';
	    		}else{
	    			return '1';
	    		}
	    	}else{
	    		if('02468'.indexOf(sfzh.substring(16, 17)) > -1){
	    			return '0';
	    		}else{
	    			return '1';
	    		}
	    	}
	    }
