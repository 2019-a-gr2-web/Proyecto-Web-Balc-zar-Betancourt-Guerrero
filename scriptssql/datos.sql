INSERT INTO libreria.categoria values(1,'Amor');
INSERT INTO libreria.categoria values(2,'Accion');
INSERT INTO libreria.categoria values(3,'Drama');
INSERT INTO libreria.categoria values(4,'Terror');
INSERT INTO libreria.categoria values(5,'Ciencia ficcion');

INSERT INTO libreria.libro values(1,'ISBN1','Titulo1','Autor1',1,'Editorial1',50.25,'Disponible');
INSERT INTO libreria.libro values(2,'ISBN2','Titulo2','Autor2',2,'Editorial2',30.25,'Disponible');
INSERT INTO libreria.libro values(3,'ISBN3','Titulo3','Autor3',3,'Editorial3',40,'Disponible');

INSERT INTO historialcategorialibro VALUES(1,1,1);
INSERT INTO historialcategorialibro VALUES(2,2,2);
INSERT INTO historialcategorialibro VALUES(3,3,1);
INSERT INTO historialcategorialibro VALUES(4,3,2);
INSERT INTO historialcategorialibro VALUES(5,3,3);

INSERT INTO libreria.tipousuario VALUES(1,'Administrador');
INSERT INTO libreria.tipousuario VALUES(2,'Usuario');

INSERT INTO libreria.usuario VALUES(1,'admin','admin','Cesar','Pazmino',1725054975,1);
INSERT INTO libreria.usuario VALUES(2,'user','123','Kelvin','Ortiz',174578981,2);


