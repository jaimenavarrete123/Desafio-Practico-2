<?php

function retornarConexion() {
  // Para produccion
  // $con=mysqli_connect("localhost","id14835992_jaime","4+>Q67|COb&Wak?I","id14835992_producto");

  // Para servidor local
  $con=mysqli_connect("localhost","root","","id14835992_producto");
  return $con;
}
?>
