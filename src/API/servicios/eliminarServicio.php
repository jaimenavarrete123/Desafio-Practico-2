<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require("../conexion.php");

$con = retornarConexion();

mysqli_query($con, "
  DELETE FROM servicios WHERE codigoServicio=$_GET[codigoServicio]
");

class Result { }

$response = new Result();
$response -> resultado = 'OK';
$response -> mensaje = 'Servicio borrado correctamente';

header('Content-Type: application/json');

echo json_encode($response);

?>
