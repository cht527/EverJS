// JavaScript Document
var XHR;	//定义一个全局对象
function createXHR(){  			//首先我们得创建一个XMLHttpRequest对象
	if(window.ActiveXObject){//IE的低版本系类
		XHR=new ActiveXObject('Microsoft.XMLHTTP');//之前IE垄断了整个浏览器市场，没遵循W3C标准，所以就有了这句代码。。。但IE6之后开始有所改观
	}else if(window.XMLHttpRequest){//非IE系列的浏览器，但包括IE7 IE8
		XHR=new XMLHttpRequest();
	}
}
function checkpasswd(){
	var passwd=document.myform.passwd.value;
	createXHR();	
	XHR.open("GET","checkpasswd.php?password="+passwd,true);//true:表示异步传输，而不等send()方法返回结果，这正是ajax的核心思想
	XHR.onreadystatechange=cht;//当状态改变时，调用cht这个方法，方法的内容我们另外定义
	XHR.send(null);//向服务器发送请求
	
}
function cht(){
	if(XHR.readyState == 4){//对象状态（integer）　 0=未初始化  1=读取中  2=已读取  3=交互中   4=完成 
	 if(XHR.status == 200){//服务器返回的状态码，如：404=“文件未找到”、200=“成功”
	      var textHTML=XHR.responseText;//服务器进程返回数据的文本版本			
			document.getElementById('checkbox').innerHTML=textHTML;
		}
	}
}
