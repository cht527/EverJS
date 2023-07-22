window.onload=function() {
    //检测某网站的链接速度
    var linkSpeedTime=0,linkSpeedInter=-1,linkSpeedE=null,linkSpeedURL="";
    var getLinkSpeed=function(){
        linkSpeedE.value=(linkSpeedTime/10)+"秒";
        window.clearInterval(linkSpeedInter);//关闭线程
    };
    var linkSpeed=function(e,t){
        linkSpeedTime=1;
        window.clearInterval(linkSpeedInter);//关闭线程
        linkSpeedInter=setInterval(function(){
            linkSpeedTime++;
            console.log(linkSpeedTime);
        },100)
        linkSpeedURL=e.value;
        linkSpeedE=t;
        //创建image对象，创建一个img请求连接，实现图片预下载
        var img=new Image();
        img.src=linkSpeedURL+"/"+Math.random();
        //检测测试结果，图片下载完毕时异步调用到callback函数
        img.onerror=function(call){
            
            console.log(call);
            if (linkSpeedURL) {
                getLinkSpeed()
            };
        }
    };
    document.getElementById('linkSpeed').onclick=function(){
        linkSpeed(document.getElementById('linkSpeedWeb'),document.getElementById("linkSpeedTime"));
    }

}