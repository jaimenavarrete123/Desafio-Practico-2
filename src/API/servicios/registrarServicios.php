<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$json = file_get_contents('php://input');

$params = json_decode($json);

require("../conexion.php");

$con = retornarConexion();


mysqli_query($con, "
  INSERT INTO ticket (dui, vehiculo, servicio) VALUES ('$params->dui', '$params->vehiculo', '$params->servicio')
");


class Result {}

$response = new Result();
$response->resultado = 'OK';
$response->mensaje = 'Ticket agregado';

header('Content-Type: application/json');

echo json_encode($response);

?>
