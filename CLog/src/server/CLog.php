<?php
	header("Access-Control-Allow-Origin: *");
	ini_set('date.timezone','Asia/Shanghai'); 
	$today = date("Y-m-d");
	$log = $_GET["log"];
	$nickName = $_GET["nickName"];

	if($log && $nickName)
	{
		if(!file_exists("single"))
		{
			mkdir("log/single");
		}

		if(!file_exists("log/single/".$today))
		{
			mkdir("log/single/".$today);
		}
		
		$fileCommon = "log/common-".$today.".log";
		$fileSingle = "log/single/".$today."/".$nickName."-".$today.".log";
		$fpCommon = fopen($fileCommon, "a+");
		$fpSingle = fopen($fileSingle, "a+");
		fwrite($fpCommon, $log."\r\n");
		fwrite($fpSingle, $log."\r\n");
		echo "success!";
	}
	else
	{
		fwrite(fopen("error-".$today.".log", "a+"), $today);
		echo "error!";
	}
?>
