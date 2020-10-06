<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$json = file_get_contents('php://input');

$params = json_decode($json);

require("../conexion.php");

$con = retornarConexion();


mysqli_query($con,"
  UPDATE ticket SET dui='$params->dui',
                    vehiculo='$params->vehiculo',
                    servicio=$params->servicio
  WHERE codigoTicket=$params->codigoTicket
");


class Result {}

$response = new Result();
$response->resultado = 'OK';
$response->mensaje = 'Datos del ticket, modificados correctamente';

header('Content-Type: application/json');
echo json_encode($response);

?>
