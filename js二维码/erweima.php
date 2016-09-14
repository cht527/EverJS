<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<title>测试程序</title>
<link rel="stylesheet" type="text/css" href="" />
<script type="text/javascript" src="jquery-1.11.1.min.js"></script>
<script type="text/javascript" src="jquery.qrcode.min.js"></script>
</head>
<style>

</style>
<body>

<input type="text" id="text" /> 
<input type="button" value="shengc" id="bt" /> 
<div id="div_div" style="width:400px;height:400px;border:1px solid #000;"></div> 
<div id="qrcode"></div>
<script type="text/javascript">
	//$('#qrcode').qrcode("曹海涛");
	  $(function () { 
            $("#bt").bind("click", function () { 
                text = $("#text").val(); 
                $("#div_div").qrcode(utf16to8(text)); 
   
            }) 
        }) 
	function utf16to8(str) { //转码 
            var out, i, len, c; 
            out = ""; 
            len = str.length; 
            for (i = 0; i < len; i++) { 
                c = str.charCodeAt(i); 
                if ((c >= 0x0001) && (c <= 0x007F)) { 
                    out += str.charAt(i); 
                } else if (c > 0x07FF) { 
                    out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F)); 
                    out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F)); 
                    out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F)); 
                } else { 
                    out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F)); 
                    out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F)); 
                } 
            } 
            return out; 
        }   
	//new QRCode(document.getElementById("qrcode"), "你好，极客标签");
	
</script>
</body>
</html>
