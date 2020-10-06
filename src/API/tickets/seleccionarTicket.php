<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require("../conexion.php");

$con = retornarConexion();

$registros=mysqli_query($con,"SELECT codigoTicket, dui, vehiculo, servicio FROM ticket WHERE codigoTicket=$_GET[codigoTicket]");

if ($reg=mysqli_fetch_array($registros))
{
  $vec[]=$reg;
}

$cad=json_encode($vec);

echo $cad;

?>
