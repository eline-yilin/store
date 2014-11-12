<?php
include 'PHPExcel.php';
include ("../wechat/hanyun_config.php");
include ("DB/connector.php");

function processRejection($filename, $config) {
	$end = '<br>';
	try {
		echo 'Processing..' . $end;
		$inputFileType = PHPExcel_IOFactory::identify ( $filename );
		
		$objReader = PHPExcel_IOFactory::createReader ( $inputFileType );
		
		$objReader->setReadDataOnly ( true );
		
		/**
		 * Load $inputFileName to a PHPExcel Object *
		 */
		$objPHPExcel = $objReader->load ( $filename );
		
		$total_sheets = $objPHPExcel->getSheetCount ();
		
		$objWorksheet = $objPHPExcel->setActiveSheetIndex ( 0 );
		$highestRow = $objWorksheet->getHighestRow ();
		$highestColumn = $objWorksheet->getHighestColumn ();
		$highestColumnIndex = PHPExcel_Cell::columnIndexFromString ( $highestColumn );
		$nids_to_reject = array ();
		$alias = array ();
		// header('Content-Type: text/plain');
		// header('');
		// header('Content-Disposition: attachment;filename='.$filename);
		// header('Cache-Control: max-age=0');
		$current = '';
		$posts = array ();
		$authors = array ();
		$db = new DBHelper ( $config );
		$db_instance = $db->getInstance ();
		for($row = 2; $row <= $highestRow; ++ $row) {
			$name = $objWorksheet->getCellByColumnAndRow ( 0, $row )->getValue ();
			// $name = iconv('UTF-8','GBK',$name);
			$author = $objWorksheet->getCellByColumnAndRow ( 1, $row )->getValue ();
			// $author = iconv('UTF-8','GBK',$author);
			$content = $objWorksheet->getCellByColumnAndRow ( 3, $row )->getValue ();
			if (! $name || ! $content)
				continue;
			
			echo 'processing ' . $name . ', ' . $author . $end;
			if (! in_array ( $author, $authors )) {
				$sql_author_id = "select id from author where name = '" . $author . "'";
				$sql_author_id_query = $db_instance->query ( $sql_author_id );
				var_dump ( $sql_author_id_query );
				if ($sql_author_id_query && $author_id_rst = $sql_author_id_query->fetch ()) {
					$aid = $author_id_rst ['id'];
					echo 'found ' . $aid;
				} 

				else {
					$sql_insert_author = "insert into author (name) values ('" . $author . "') ";
					echo $sql_insert_author;
					$db_instance->exec( $sql_insert_author );
					$aid = $db_instance->lastInsertId ();
					echo 'insert ' . $aid;
				}
				$authors [$aid] = $author;
			
			} else {
				$aid = array_search ( $author, $authors );
			}
			$posts [] = array ('title' => $name, 'content' => $content, 'authorid' => $aid );

			$current .= $name . '|' . $author . '|' . $content . '/n';
		
		}
		
		foreach ( $posts as $post ) {
			$sql_insert_post = "insert into post (title,content,authorid) values
			('" . $post ['title'] . "','" . $post ['content'] . "'," . $post ['authorid'] . ")";
			echo $sql_insert_post . $end;
			$db_instance->exec($sql_insert_post);
		}
		// $sql = 'show tables;';
		// var_dump($db_instance->query($sql));
		echo 'Finished..' . $end;
		$file = '../wechat/dict.txt';
		
		file_put_contents ( $file, $current );
	} catch ( Exception $e ) {
		var_dump ( $e );
	}
}
function processWord($filename) {
	$end = '<br>';
	$handle = fopen ( $filename, "r" );
	if ($handle) {
		while ( ($line = fgets ( $handle )) !== false && ! empty ( $line ) ) {
			echo $line . $end;
			if (strpos ( $line, '《' ) !== false && strpos ( $line, '》' ) !== false && strpos ( $line, '：' ) !== false) {
				echo 'haha ' . $line . $end;
			}
			// process the line read.
		}
	} else {
		// error opening the file.
	}
	fclose ( $handle );
}
?>
<html xmlns:o="urn:schemas-microsoft-com:office:office"
	xmlns:x="urn:schemas-microsoft-com:office:excel"
	xmlns="http://www.w3.org/TR/REC-html40">
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">


<html>
<head>
  <meta http-equiv="Content-type" content="text/html;charset=UTF-8" />
 </head>
 <body>
  <?php
		// $to_process = 'C:\Users\azheng\Downloads\ts300.txt';
		// processWord($to_process);
		processRejection ( 'dict.xlsx', $config );
		?></body>
</html>