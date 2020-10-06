CREATE TABLE clientes (
  duiCliente varchar(20),
  nombresCliente varchar(100),
  apellidosCliente varchar(100),
  PRIMARY KEY (duiCliente)
);

CREATE TABLE servicios (
  codigoServicio int AUTO_INCREMENT,
  nombreServicio varchar(100),
  costoServicio decimal(10,2),
  PRIMARY KEY (codigoServicio)
);

CREATE TABLE ticket (
  codigoTicket int AUTO_INCREMENT,
  dui varchar(20) REFERENCES clientes(duiCliente),
  vehiculo varchar(100),
  servicio INT REFERENCES servicios(codigoServicios),
  PRIMARY KEY (codigoTicket)
);

INSERT INTO `clientes` (`duiCliente`, `nombresCliente`, `apellidosCliente`) VALUES
(123, 'Jaime', 'Navarrete');

INSERT INTO `servicios` (`codigoServicio`, `nombreServicio`, `costoServicio`) VALUES
(1, 'Cambio de aceite', 100.00);

INSERT INTO `ticket` (`codigoTicket`, `dui`, `vehiculo`, `servicio`) VALUES
(1, 123, 'Autobus', 1);
