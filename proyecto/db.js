const neo4j = require('neo4j-driver')

const uri = "bolt://localhost:7687"
const user = 'neo4j'
const password = '12345678'

const driver = neo4j.driver(uri, neo4j.auth.basic(user, password))

module.exports = driver