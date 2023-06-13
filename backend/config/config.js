module.exports = {
    jwtSecret: 'clave_secreta_del_jwt', // Clave secreta para firmar y verificar los tokens JWT
    database: {
      host: 'localhost', // Dirección del servidor de la base de datos
      port: 3306, // Puerto del servidor de la base de datos
      user: 'usuario_mysql', // Nombre de usuario de la base de datos
      password: 'contraseña_mysql', // Contraseña de la base de datos
      database: 'nombre_base_de_datos' // Nombre de la base de datos
    }
  };
  