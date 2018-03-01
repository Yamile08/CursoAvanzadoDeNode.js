'use strict'

const debug = require('debug')('platziverse:db:setup')
const inquirer = require('inquirer')
const chalk = require('chalk')
const db = require('./')

const prompt = inquirer.createPromptModule() //advertencia sobre el borrado de base de datos

async function setup () {
  const answer = await prompt([  //advertencia sobre el borrado de base de datos

    {
      type: 'confirm',
      name: 'setup',
      message: 'This will destroy your database, are you sure?' //advertencia sobre el borrado de base de datos
    }
  ])

  if (!answer.setup) {
    return console.log('Nothing happened :)')
  }

  const config = {
    database: process.env.DB_NAME || 'platziverse',
    username: process.env.DB_USER || 'platzi',
    password: process.env.DB_PASS || 'platzi',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    logging: s => debug(s),
    setup: true
  }

  await db(config).catch(handleFatalError)

  console.log('Success!')
  process.exit(0)
}

function handleFatalError (err) {
  console.error(`${chalk.red('[fatal error]')} ${err.message}`) //chalk.red('fata error') en caso de error nos muestra en la consola el mensaje en rojo
  console.error(err.stack)
  process.exit(1)
}

setup()
