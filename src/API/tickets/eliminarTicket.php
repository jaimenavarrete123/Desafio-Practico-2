<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require("../conexion.php");

$con = retornarConexion();

mysqli_query($con, "DELETE FROM ticket WHERE codigoTicket=$_GET[codigoTicket]");

class Result { }

$response = new Result();
$response -> resultado = 'OK';
$response -> mensaje = 'Ticket borrado exitosamente';

header('Content-Type: application/json');

echo json_encode($response);

?>
