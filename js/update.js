// 下载wgt文件
// 实际项目中需要更换为自己服务器的地址
var wgtUrl="https://test.zfgjj.cn:82/dzyw-app/app/clsj.wgtu";
function downWgt(){
    plus.downloader.createDownload( wgtUrl, {filename:"_doc/update/"}, function(d,status){
        if ( status == 200 ) { 
            		installWgt(d.filename); // 安装wgt包      
        }
    }).start();
}
// 更新应用资源
function installWgt(path){
	plus.nativeUI.showWaiting("正在更新...");
    plus.runtime.install(path,{},function(){
    	plus.nativeUI.closeWaiting();
        plus.nativeUI.alert("应用资源更新完成!\n点击确定按钮重启完成升级",function(){
            plus.runtime.restart();
        });
    },function(e){
    	plus.nativeUI.closeWaiting();
        plus.nativeUI.alert("安装wgt文件失败["+e.code+"]："+e.message);
        console.log("安装wgt文件失败["+e.code+"]："+e.message);
        plus.nativeUI.alert("更新失败！");
    });
}
/*
 * 差异化升级流程：
 * 1.启动app后在plusReady里面首先获取app版本
 * 2.检查服务器版本
 * 3.服务器版本大于本地app版本下载升级包，提示安装和升级
 * 4.服务器版本小于等于本地版本时，不做任何操作
 */