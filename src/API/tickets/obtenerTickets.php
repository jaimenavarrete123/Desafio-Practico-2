<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require("../conexion.php");

$con = retornarConexion();

$registros=mysqli_query($con, "
  SELECT codigoTicket, dui, nombresCliente, apellidosCliente, vehiculo, servicio, nombreServicio, costoServicio FROM ticket
  INNER JOIN clientes ON ticket.dui=clientes.duiCliente
  INNER JOIN servicios ON ticket.servicio=servicios.codigoServicio
");

$vec=[];

while ($reg=mysqli_fetch_array($registros))
{
  $vec[] = $reg;
}

$cad = json_encode($vec);

echo $cad;

?>
