'use strict'

const setupDatabase = require('./lib/db')
const setupAgentModel = require('./models/agent')
const setupMetricModel = require('./models/metric')

module.exports = async function (config) {
  const sequelize = setupDatabase(config)
  const AgentModel = setupAgentModel(config)
  const MetricModel = setupMetricModel(config)

  AgentModel.hasMany(MetricModel)
  MetricModel.belongsTo(AgentModel)

  await sequelize.authenticate()

  if (config.setup) {
    await sequelize.sync({ force: true }) //si no existen en la base de datos las tablas respectivas,
    								      // sequelize automaticamente los va a crear, y force: true lo que hace
  }										 // es que si esta creada la borra y la crea nuevamete para ella hay que tener miucho cuidado

  const Agent = {}
  const Metric = {}

  return {
    Agent,
    Metric
  }
}
