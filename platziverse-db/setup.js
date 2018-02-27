'use strict'

const debug = require('debug')('platziverse:db:setup')
const db = require('./')

async function setup () {
  const config = {
    database: process.env.DB_NAME || 'platziverse', 
    username: process.env.DB_USER || 'platzi', //le puedo pasar un usuario como variable de entorno o platzi que fue el usuario que creamos
    password: process.env.DB_PASS || 'platzi',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres', //dialecto de base de datos es postgres, si el dia de mañana se emigra a otra base de datos es solo cambiar el dialect y sequalize lo entendera
    logging: s => debug(s),
    setup: true
  }

  await db(config).catch(handleFatalError) //En caso de error, nos mostrara el error

  console.log('Success!')
  process.exit(0)
}

function handleFatalError (err) { //En caso de error, nos mostrara el error
  console.error(err.message)
  console.error(err.stack)
  process.exit(1)
}

setup()
