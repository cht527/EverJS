<?php 
	$a=$_GET['a'];
	$callback=$_GET['callback'];
	$b=array("Garha","sitamarhi","canada",$a);
       
	echo $callback."(".json_encode($b).")";
	
?>