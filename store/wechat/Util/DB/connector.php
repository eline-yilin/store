<?php
class DBHelper
{
	private $instance = NULL;
	function __construct($conig){
		$dsn = $conig['DB_DSN']; //'mysql:dbname=testdb;host=127.0.0.1';
		$user = $conig['DB_USER'];//'dbuser';
		$password = $conig['DB_PWD'];//'dbpass';
		
		try {
			$this->instance = new PDO($dsn, $user, $password);
			$this->instance->exec("SET NAMES 'utf8';");
		} catch (PDOException $e) {
			echo 'Connection failed: ' . $e->getMessage();
		}
	}
	
	public function getInstance(){
		return $this->instance;
	}
}
?>