const Sequelize = require('sequelize');

const mysql = require('mysql2');

require('dotenv').config();
const env = process.env;

const OperacionModel = require('./models/operaciones');
const UsuarioModel = require('./models/usuario');


const sequelize = new Sequelize(env.DB_NAME,env.DB_USER,env.DB_PASSWORD,{ 
  host: env.DB_HOST,
  dialect :'mysql'});

const Operacion = OperacionModel(sequelize,Sequelize);
const Usuario = UsuarioModel(sequelize,Sequelize);

//ASOCIACIONES


//Usuario
Usuario.hasMany(Operacion);

//Operacion
Operacion.belongsTo(Usuario);
sequelize.sync({force: false})
  .then(
    ()=>{
      console.log('tablas sync');
    }
  )

  module.exports = {
    Operacion,
    Usuario
  }