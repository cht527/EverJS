<?php
header("content-type:text/html;charset=utf-8");
$db=mysql_connect("localhost","root","")or die("���ܽ������ӣ�".mysql_error());;
mysql_select_db("gbook",$db)or die("����ѡ�����ݿ�");;
mysql_query("SET NAMES 'utf8'");

$strlan = mysql_query("UPDATE vedio SET click = click +1 WHERE id='1'"); 
$str = mysql_query("select click from vedio WHERE id = '1'"); 
while($row = mysql_fetch_array($str)) 
{ 
echo $row['click']; 
} 





