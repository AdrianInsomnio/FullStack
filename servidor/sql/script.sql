create database expenses;
use expenses;
create table operacion(
idoperacion int primary key auto_increment,
concepto varchar(100) ,
monto double default 0.0 ,
fecha datetime default  CURRENT_TIMESTAMP,
tipo char default 'I' -- I = ingresos E = egresos --
);