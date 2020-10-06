<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require("../conexion.php");

$con = retornarConexion();

$registros = mysqli_query($con,"
  SELECT codigoServicio, nombreServicio, costoServicio FROM servicios WHERE codigoServicio=$_GET[codigoServicio]
");

if ($reg=mysqli_fetch_array($registros))
{
  $vec[]=$reg;
}

$cad=json_encode($vec);

echo $cad;

?>
