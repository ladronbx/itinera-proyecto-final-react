<h1 align="center"># README - Itinera ✈️ </h1>



<p align="center">Proyecto 7 - Frontend Itinera React + CSS</p>



<p align="center">Frontend de una Web App con temática de viajes, realizado por Bienve Ladrón.
<br>
Desarrollado como parte del Bootcamp de Full Stack Developer en Geekshubs Academy, Valencia.</p>

<p>
   <div align="center">
      <img src="img/geekhubs.png" style="max-width: 100%;" width="200">
   </div>    
</p>

<p>
   <div align="center">
      <em><b>Bienvenid@ a mi proyecto final</b></em>
   </div>   
<p align="center">_______________________________________________</p>


## Visualización Front-end y Back-end

El front-end ha sido deployado en AWS:
- Puedes acceder [aquí](https://main.d289g6zzo4cj9d.amplifyapp.com/)

El back-end aún no ha sido deployado, pero puedes explorar el código en el siguiente Repositorio GitHub [aquí](https://github.com/ladronbx/itinera-proyecto-final.git).



## ¿Qué es Itinera?
<p>
Esta aplicación web está pensada para ofrecer una solución cómoda a aquellos usuarios que quieren viajar y no tienen experiencia o tiempo para planificar sus viajes, brindándole una solución  predefinida, rápida y fácil. Para ello se tendrá en cuenta el destino y las fechas del viaje. Además también podrán modificar la agenda de viaje, en el caso de que la primera propuesta no fuese de su agrado, actuando así como una agenda de viaje totalmente personalizada.

<p>
   <div align="center">
      <img src="img/gif-marca.gif" style="max-width: 100%;" width="500">
   </div>    
</p>

El proyecto consiste en desarrollar una aplicación web llamada " Itinera”, que te sugerirá a partir de un destino y unas fechas seleccionadas previamente, un itinerario y unas actividades diarias. Además permitirá a los usuarios planificar, organizar y seguir sus viajes de manera personalizada. La aplicación se centrará en proporcionar una experiencia intuitiva y social, permitiendo a los usuarios explorar destinos, modificar su agenda de viaje y compartir experiencias.

---

## Tabla de Contenidos

<ol>
    <li>🚀 <a href="#introducción">Introducción</a></li>
    <li>🎯 <a href="#descripción-del-proyecto">Descripción del proyecto</a></li>
    <li>👀 <a href="#vistas">Vistas</a></li>
    <li>🔧 <a href="#tecnologías-utilizadas">Tecnologías utilizadas</a></li>
    <li>🚀 <a href="#deploy">Deploy</a></li>
    <li>🍃 <a href="#ramas-del-repositorio">Ramas del repositorio</a></li>
    <li>🚧 <a href="#problemas-y-soluciones">Problemas y soluciones</a></li>
    <li>📁<a href="#estructura-directorios">Estructura directorios</a></li>
    <li>📦 <a href="#instrucciones-dockerización">Instrucciones dockerización</a></li>
    <li>🌐 <a href="#enlaces-importantes">Enlaces importantes</a></li>
    <li>🤝 <a href="#cómo-contribuir">Como contribuir</a></li>
    <li>📧 <a href="#contacto">Contacto</a></li>
    <li>👏 <a href="#agradecimientos">Agradecimientos</a></li>
    
  </ol>

## Introducción

🚀 En este proyecto, he creado un Frontend completo con React y CSS para una aplicación web llamada "Itinera", centrada en la planificación de viajes. Como parte de mi formación en el Bootcamp de Full Stack Developer de Geekshubs Academy, he empleado tecnologías como PHP, Laravel, MySQL, GIT y GitHub en el desarrollo del servidor.

Este frontend proporciona una interfaz de usuario amigable y funcional para la aplicación web Itinera. A continuación, encontrarás información sobre la estructura del proyecto, su funcionalidad principal, y cómo puedes contribuir o realizar la configuración del entorno de desarrollo utilizando Docker.

## Descripción del Proyecto
🎯 Itinera es una aplicación web diseñada para facilitar la planificación de viajes. Dirigida a usuarios que desean una solución rápida y personalizada para organizar sus viajes, Itinera sugiere itinerarios y actividades diarias basándose en el destino y las fechas seleccionadas. Los usuarios tienen la flexibilidad de modificar la agenda propuesta según sus preferencias, convirtiendo así la aplicación en una herramienta de planificación de viajes totalmente personalizada.

## Vistas
👀 

### Vistas user

- Home:
<p>
   <div align="center">
      <img src="img/gif-home.gif" style="max-width: 100%;" width="">
   </div>    
</p>

- Register:
<p>
   <div align="center">
      <img src="img/register.png" style="max-width: 100%;" width="">
   </div>    
</p>


- Login:
<p>
   <div align="center">
      <img src="img/login.png" style="max-width: 100%;" width="">
   </div>    
</p>


- Profile:
<p>
   <div align="center">
      <img src="img/profile-smart.png" style="max-width: 100%;" width="200">
   </div>
      <div align="center">
      <img src="img/img-profile.png" style="max-width: 100%;" width="500">
   </div>    
</p>

- Selección destino:

<p>
   <div align="center">
      <img src="img/img-seleccion-destino.png" style="max-width: 100%;" width="500">
   </div>    
</p>

- Agregar actividades:
<p>
   <div align="center">
      <img src="img/agregar-img-actividades.png" style="max-width: 100%;" width="500">
   </div>    
</p>

<p>
   <div align="center">
      <img src="img/gif-agregar-actividades.gif" style="max-width: 100%;" width="">
   </div>    
</p>


- Mis viajes:
<p>
   <div align="center">
      <img src="img/img-mis-viajes.png" style="max-width: 100%;" width="500">
   </div>    
</p>

- Mi viaje en detalle:

<p>
   <div align="center">
      <img src="img/viaje-detalle-1.png" style="max-width: 100%;" width="300">
      <img src="img/img-calendario.png" style="max-width: 100%;" width="300">
      <img src="img/informacion-grupo.png" style="max-width: 100%;" width="300">
      <img src="img/agregar-actividades-detalles.png" style="max-width: 100%;" width="300">
   </div>  
</p>


### Vistas Super Admin

- Header dinámico
<p>
   <div align="center">
      <img src="img/header-super.png" style="max-width: 100%;" width="500">
   </div>    
</p>


- Gestión viajes
<p>
   <div align="center">
      <img src="img/gestion-viaje.png" style="max-width: 100%;" width="300">
   </div>    
</p>

- Gestión usuarios
<p>
   <div align="center">
      <img src="img/gestion-user.png" style="max-width: 100%;" width="300">
   </div>    
</p>

- Gestión actividades
<p>
   <div align="center">
      <img src="img/gestion-actividades-1.png" style="max-width: 100%;" width="300">
      <img src="img/gestion-actividades-2.png" style="max-width: 100%;" width="300">
   </div>    
</p>

- Gestión destinos
<p>
   <div align="center">
      <img src="img/gestion-destinos-1.png" style="max-width: 100%;" width="300">
      <img src="img/gestion-destinos-2.png" style="max-width: 100%;" width="300">
   </div>    
</p>




## Estructura directorios
<details>
<summary><h3>Resumen directorios</h3></summary>

<p>
   <div align="center">
      <img src="img/diectorio1.png" style="max-width: 100%;" width="300">
      <img src="img/directorio2.png" style="max-width: 100%;" width="300">
   </div>    
</p>
<p>
</details>

### Tecnologias

🔧 Tecnologías


El frontend ha sido desarrollado utilizando las siguientes tecnologías: React, Redux,  Javascript, HTML, Bootstrap, CSS, GIT y GitHub.
</br>
</br>
[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white&labelColor=101010)]()
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white&labelColor=101010)]()
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white&labelColor=101010)]()
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white&labelColor=101010)]()
[![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white&labelColor=101010)]()
</br>
</br>

## Deploy AWS

El proyecto ha sido deployado utilizando servicios de AWS.

🚀 Puedes acceder al sitio desplegado [aquí](https://main.d289g6zzo4cj9d.amplifyapp.com/)

## Ramas del repositorio

🍃 Este proyecto se ha desarrollado en las siguientes ramas:

Claro, aquí están las ramas numeradas y formateadas en Markdown:

1. **Master**: 
    - Considerada como la rama principal, en ella únicamente se ha iniciado y finalizado el proyecto para poder hacer el deploy.

2. **Dev**: 
    - Es la rama sobre la que pivotan todas las features.

3. **feature/activity-page**: 
   - Esta rama se centra en el desarrollo de la funcionalidad relacionada con la página de actividades.
   - Aquí se implementan y prueban nuevas características relacionadas con las actividades del itinerario.

4. **feature/dynamic-header**: 
   - En esta rama, se trabaja en la implementación de un encabezado dinámico que puede adaptarse según el contexto de la página.
   - Se busca mejorar la experiencia del usuario mediante la personalización del encabezado.

5. **feature/home-page**: 
   - Desarrollo específico de la página de inicio.
   - Aquí se trabajan los elementos y la lógica relacionada con la visualización y navegación en la página principal de la aplicación.

6. **feature/login-page**: 
   - Enfocada en el diseño y funcionalidad de la página de inicio de sesión.
   - Se implementan características relacionadas con la autenticación y la gestión de sesiones de usuario.

7. **feature/profile-page**: 
   - Desarrollo de la página de perfil de usuario.
   - Se implementan funciones para ver y editar la información del perfil de usuario.

8. **feature/register-page**: 
   - Rama destinada a la creación y mejora de la página de registro de nuevos usuarios.
   - Aquí se gestionan las funciones relacionadas con la creación de cuentas.

9. **feature/style**: 
   - En esta rama se realiza el trabajo dedicado a la mejora del estilo y la apariencia general de la aplicación.
   - Se implementan cambios de diseño y estilos visuales.

10. **feature/trip-page**: 
    - Desarrollo específico de la página de viajes.
    - Aquí se implementan y prueban las funciones relacionadas con la gestión de viajes y la visualización de itinerarios.

11. **fix/update-profile**: 
    - Rama dedicada a la corrección de errores específicos relacionados con la actualización del perfil de usuario.

## Problemas y Soluciones

### 1. Conexión Frontend con frontend React.

- **🚧Problema**: CORS.

   - **💡Solución**: 
   1. Instalar → `composer require fruitcake/laravel-cors` o `composer update`
   
   2. En app/Http/Kernel.php :
    
    ```bash
    protected $middleware = [
    // \App\Http\Middleware\TrustHosts::class,
    \App\Http\Middleware\TrustProxies::class,
    \Fruitcake\Cors\HandleCors::class, // Aquí es donde lo cambias
    \App\Http\Middleware\PreventRequestsDuringMaintenance::class,
    \Illuminate\Foundation\Http\Middleware\ValidatePostSize::class,
    \App\Http\Middleware\TrimStrings::class,
    \Illuminate\Foundation\Http\Middleware\ConvertEmptyStringsToNull::class,
    ];
    ```


### 2. Problema Redux persist - register2.

- **🚧Problema**: Redux persist.
   <div align="center">
      <img src="img/img-problema-persist.png" style="max-width: 100%;" width="">
   </div>   

   - **💡Solución**: 
    ```bash
   main.jsx:18 A non-serializable value was detected in an action, in the path: `register`. Value: ƒ register2(key) {
    _pStore.dispatch({
      type: REGISTER,
      key
    });
  }

    ```


   <div align="center">
      <img src="img/img-problema-persist-store.png" style="max-width: 100%;" width="">
   </div>   




### Instrucciones Dockerización

📦 Para facilitar la implementación y ejecución del proyecto, se proporcionan instrucciones de Dockerización:

1. **Clonar el Repositorio:**

    ```bash
    git clone https://github.com/ladronbx/itinera-proyecto-final-react.git
    ```

2. **Acceder al Directorio del Proyecto:**

    ```bash
    cd itinera-proyecto-final-react
    ```

3. **Configuración de Variables de Entorno:**

    - Crea un archivo `.env` basado en el ejemplo `.env.example` y configura las variables de entorno necesarias según las necesidades de tu aplicación.

4. **Construir y Levantar Contenedores:**

    ```bash
    # Construir la imagen de Docker
    docker build -t nombre-de-tu-imagen .

    # Ejecutar el contenedor
    docker run -p 3000:3000 -d nombre-de-tu-imagen
    ```

    Estos comandos construirán la imagen de Docker utilizando el Dockerfile proporcionado y ejecutarán un contenedor basado en esa imagen. El flag `-p 3000:3000` mapea el puerto 3000 del contenedor al puerto 3000 del host. Ajusta el nombre de la imagen según tu preferencia.

5. **Acceder a la Aplicación:**

    Una vez que el contenedor esté en ejecución, puedes acceder a tu aplicación ReactJS en el navegador utilizando la siguiente URL:

    ```
    http://localhost:3000
    ```

    ¡Tu aplicación ReactJS con Vite ahora está dockerizada y lista para ser utilizada en cualquier entorno compatible con Docker!

6. **Detener y Eliminar el Contenedor:**

    Si necesitas detener y eliminar el contenedor, puedes utilizar los siguientes comandos:

    ```bash
    # Listar contenedores en ejecución
    docker ps

    # Detener el contenedor (reemplaza CONTAINER_ID con el ID real de tu contenedor)
    docker stop CONTAINER_ID

    # Eliminar el contenedor (reemplaza CONTAINER_ID con el ID real de tu contenedor)
    docker rm CONTAINER_ID
    ```



## Enlaces Importantes

🌐 Puedes acceder a documentación importante a través de estos enlaces:

- **[Documentación de React](https://es.reactjs.org/docs/getting-started.html)**
- **[Redux Documentation](https://redux.js.org/)**
- **[React Router Documentation](https://reactrouter.com/)**
- **[Bootstrap Documentation](https://getbootstrap.com/docs/5.0/getting-started/introduction/)**
- **[GeeksHubs Academy](https://www.geekshubsacademy.com/)**


## Cómo Contribuir

🤝 Si deseas contribuir a este proyecto, puedes realizar un fork del repositorio en GitHub, hacer tus cambios y enviar una solicitud de extracción (pull request). Tu contribución será revisada y, si es apropiada, se fusionará con la rama principal.

1. Haz un fork de este repositorio.

2. Crea una nueva rama para tu contribución: `git checkout -b tu-nueva-caracteristica`.

3. Realiza tus cambios y commitea: `git commit -m "Añade una nueva característica"`.

4. Envía tus cambios al repositorio: `git push origin tu-nueva-caracteristica`.

5. Crea una solicitud de extracción en GitHub.

Espero que disfrutes explorando y utilizando este Frontend. Si tienes alguna pregunta o necesitas asistencia, no dudes en ponerte en contacto con nosotros a través de la información de contacto proporcionada.

## Contacto

📧 Para cualquier pregunta o comentario, no dudes en ponerte en contacto:

- **Bienve Ladrón**

<a href = "[mailto:ladronbravovlc@gmail.com](mailto:ladronbravovlc@gmail.com)"><img src="https://img.shields.io/badge/Gmail-C6362C?style=for-the-badge&logo=gmail&logoColor=white" target="_blank"></a>

<a href="https://github.com/ladronbx" target="_blank"><img src="https://img.shields.io/badge/github-24292F?style=for-the-badge&logo=github&logoColor=green" target="_blank"></a>

- *Fecha de Comienzo del Proyecto**: 11/11/2023

## Agradecimientos

👏 Agradecimentos a GeeksHubs Academy por los conocimientos que hemos podido adquirir a lo largo de todo el curso y que han hecho posible este proyecto, y a nuestros queridos profesores David Ochando y Dani Tarazona y su gran paciencia con nosotros.

<p>

   <div align="center">
    <img src="img/img-footer-geek.png" style="max-width: 100%;" width="250">
   </div>

</p>