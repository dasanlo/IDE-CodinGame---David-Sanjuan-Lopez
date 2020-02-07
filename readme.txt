A continuación se detalla información relativa a la prueba técnica


INSTALACION
-----------------------------

Para instalar la aplicación basta con descargar y extraer el proyecto




DESPLIEGUE
----------------------------

Para ejecutar la aplicación basta con desplegar la aplicación mediante el comando: 

"node server"

En el fichero "server.js" se puede cambiar las variables referentes al entorno de ejecución (puerto base de datos, etc.)

Una vez desplegado se puede acceder a la pagina princpal desde el enlace:

"http://localhost:8080/"


Nota: será necesario tener instalado MongoDB como base de datos. Ya que la persistencia se realiza en ese tipo de base de datos.




NOTAS DEL DESARROLLADOR
---------------------------

Para el tratamiento de las fotos, se pasará unicamente el path relativo de la imagen que se encuentra ubicado en directorio del proyecto (./input). Tal y como se indican en las peticiones GET y POST de prueba. El enunciado del problema solo indica que se recogerá la información de la petición y no indica la forma, por lo que he optado por la forma más simple. Una imagen solo podrá ser procesada una unica vez, de lo contrario se obtendrá el error: "Image processed"




PRUEBAS
----------------------------

A continuación se propone un conjunto de datos para comprobar las inserciones y las peticiones:

Insercion de una tarea:

Ejemplo 1:

[POST] http://localhost:8080/api/task

{
    "imageInputPath": "./input/0858020250_1_1_1.jpg"
}


Ejemplo 2: 

[POST] http://localhost:8080/api/task

{
    "imageInputPath": "./input/0858020504_1_1_1"
}



Obtener estado de una tarea:

[GET] http://localhost:8080/api/task/{taskId}





OTRAS PETICIONES
---------------------

Para visualizar la totalidad de las tareas peticionadas:

[GET] http://localhost:8080/api/task




EXPLICACIÓN
------------------------

Antes la falta de ciertos datos, se ha utilizado aquella estructura o forma mas sencilla de implementar. Se han utilizado diversas tecnologias que facilitan la implementacion (como express, mongoose, crypto, sharp, etc.). Ciertos aspectos son muy mejorables, pero para un caso básico es completamente funcional. Cualquier duda o problema con la implementacion o cualquier otro aspecto, no dudeis en preguntar.




DIRECTORIO GITHUB
----------------------

https://github.com/dasanlo/IDE-CodinGame---David-Sanjuan-Lopez