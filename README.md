# EventWizard

## Docker compose y dockerfiles presentes

La dockerización de este proyecto consiste en dos dockerfiles y un archivo docker compose. Cada uno de los dockerfiles se encargará del setup del backend y el frontend, y el archivo docker compose se encargará de la instalación de la base de datos y del despliegue del backend y el frontend

Para utilizar este proyecto, simplemente habrá que situarse en la carpeta raíz y ejecutar el siguiente comando

```docker compose up -d```

Si el proceso de construcción de las imágenes se quedase atascado, ejecutar los dos siguientes comandos

```docker builder prune```
```sudo systemctl restart docker.service```

Y volver a ejecutar el comando de docker compose

## Descripción

La aplicación que he desarrollado para este proyecto es una página web para buscar eventos de todo tipo, pudiendo filtrar según una variedad de criterios, como por ejemplo, por tipo de evento (concierto, teatro...), por ubicación, etc...

## Tecnologías a utilizar

### Frameworks

+ Vue: Será el framework utilizado para el frontend de la página web

+ Laravel: La página cuenta con una API creada en Laravel para la gestión de usuarios, comentarios y eventos guardados

+ MySQL: Todos los datos necesarios están guardados en una base de datos MySQL, usada mediante la API mencionada anteriormente

### Librerías

+ Vue Use & Universal Cookies: Usadas para poder usar cookies de forma reactiva, de forma que cuando se realicen cambios en las mismas, el contenido de la página cambie

+ Vue Router: Necesaria para el enrutamiento de la página

### APIs

+ TicketMaster: Para poder proporcionar información sobre los eventos, será necesario utilizar la API de ticketmaster

+ API personalizada: Adicionalmente, para usar el sistema de registro y poder acceder a los datos de los usuarios, es necesario instalar una API personalizada y desplegarla en localhost

## Funcionalidades clave

+ Búsqueda de eventos: Será posible buscar eventos, filtrando por campos como la ubicación, tipo de evento, artistas, y mucho más
+ Registro e inicio de sesión: La página permitirá que los usuarios se registren en la página, para poder utilizar funcionalidades adicionales
+ Guardado de eventos: Tener un usuario creado permitirá el guardado de eventos en una página aparte, donde podrá ser consultado de forma rápida y cómoda
+ Comentarios: Si el usuario está autenticado, podrá dejar comentarios en eventos, los cuales podrán ser vistos por cualquiera, estén registrados o no
+ Recomendaciones de eventos: La página usará la ubicación seleccionada por el usuario para recomendar eventos en la página principal. Además, si decide buscar por categoría desde la página principal, también se tendrá en cuenta la ubicación
+ Formulario de soporte: Los usuarios, registrados o no, podrán enviar tickets de soporte a la página para informar de cualquier problema
+ Panel de administración: Usuarios con permisos administrativos tendrán acceso a un panel donde podrán ver todos los reportes realizados por usuarios a través del formulario de soporte

## Capturas de pantalla

Página de inicio

![Pagina de inicio](/public/images/home.png)

Página de búsqueda

![Pagina de busqueda](/public/images/advancedsearch.png)

Pagina de resultados

![Pagina de resultados](/public/images/searchresults.png)

Pagina de detalles de evento

![Pagina de detalles de evento](/public/images/eventdetails.png)

## Uso de la aplicación

La página consta de 10 páginas distintas, además de la página de error 404

+ Home: Página inicial. Aquí puedes buscar por categoría o, si estás autenticado, consultar eventos próximos en tu ubicación
+ Búsqueda avanzada: En esta página puedes realizar una búsqueda detallada de eventos. Podrás introducir nombre de evento, pais, tipo de evento y la fecha desde la que quieres buscar. Todos estos parámetros son opcionales, de forma que si no introduces nada, se buscará cualquier evento, en cualquier lugar, de cualquier tipo, desde el inicio del año
    + Adicionalmente, hay una barra de búsqueda rápida en la navbar. Esto permitirá buscar rápidamente, pero solo por nombre de evento, sin configurar el resto de parámetros
+ Resultados: Cuando realices una búsqueda, se redireccionará a una búsqueda con los resultados. Esta página contendrá hasta 20 resultados distintos, ordenados por fecha más próxima. Desde aquí, podrás hacer click en cualquier tarjeta de evento para ver sus detalles
+ Detalles de evento: Si haces click en una tarjeta de evento, podrás ver los detalles del mismo. Además, podrás acceder a un enlace externo para comprar entradas para el evento, o darle a un botón para guardar tu evento en la página de guardados. También podrás ver los comentarios que hayan dejado los usuarios en el evento, y si estás autenticado, podrás enviar tus propios comentarios
+ Eventos guardados: En esta página podrás consultar todos tus eventos guardados. Podrás borrarlos, o ver sus detalles haciendo click en la tarjeta de evento
+ Soporte: Aquí puedes enviar formularios de soporte para que los usuarios administradores los puedan ver. El uso es fácil, rellena el formulario y envía
+ Perfil: Solamente disponible y visible si estás autenticado. Te proporcionará información sobre tu nombre de usuario, email y ubicación seleccionada
+ Inicio de sesión y registro: Estas páginas solo están visibles si no estás autenticado. Aquí podras iniciar sesión, o si no tienes cuenta, registrarte
+ Administración: Solo disponible para usuarios administradores. Contiene una lista de tickets de soporte enviados

## Enlace de despliegue

Será necesario tener el backend desplegado en localhost para el uso de la página, incluso desde el enlace de despliegue

[https://eventwizard-vue.netlify.app/](https://eventwizard-vue.netlify.app/)