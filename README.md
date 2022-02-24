# Instrucciones de uso

1. Clonar el repositorio

2. Instalar las dependencias con "npm install"

3. Usar el comando "npm run start" y entrar a localhost:3000

-Al cargar la web inicialmente, se autentica al usuario haciendo "Post" a http://localhost:8081/auth

-Al cargar la web inicialmente, la tabla aparece con los datos iniciales "Get" del API de http://localhost:8081/api/members

-Al dar clic en guardar, se guardan los datos en la tabla, haciendo "Post" a la ruta http://localhost:8081/api/members

-Para visualizar los datos de la tabla se debe refrescar la vista

-Cada campo debe tener más de 1 caracter para que esté validado

-Se han realizado las validaciones respectivas de la prueba, excepto la de desactivar el botón si no están validados los campos

-Cuando pasan dos minutos se resetean los campos. Se puede modificar el tiempo para probar en "FormCreateEmployee.jsx" en la línea 81, en "if (diff > 120)" modificar el 120 que son los segundos

-Se puede dar reset con el botón de "reset"

-Aparecen notificaciones informativas en el frontend si se agregó correctamente a un usuario, y de error si el SSN está duplicado, o si no tiene el formato correcto. Las validaciones vienen del API
