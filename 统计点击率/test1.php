<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN"> 
<HTML> 
<HEAD> 
<TITLE> Demo </TITLE> 
</HEAD> 
<BODY> 
<script src="jquery-1.11.1.min.js" type="text/javascript"></script> 
<script type="text/javascript"> 
function clickImg(){ 
$.ajax({ 
type:"post", //提交类型 
url:"mysql.php", //提交页面 
//data:"row="+row, 
success:function(msg) { 
$("#number").text(msg); 
} //成功则输出 
}); 
} 
</script> 
<span id="demo"><img src="apache_pb.png" id="img" name="img" onclick="clickImg()" /></span> 
<span id="number"></span> 
</BODY> 
</HTML>