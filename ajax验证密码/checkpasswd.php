<?php
	mysql_connect("localhost",'root','123456');
	mysql_select_db('ajax');
	$sql="select * from ajax where password='$_GET[password]'";
	$query=mysql_query($sql);
	if(is_array(mysql_fetch_array($query))){
		echo "<font color=green>密码正确</font>";
	}else{
		echo "<font color=red>密码错误</font>";
	}
?>
