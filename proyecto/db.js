const neo4j = require('neo4j-driver')
const Neode = require('neode')

const uri = process.env.URL_DB
const user = process.env.USER_DB
const password = process.env.PASSWORD_DB

const driver = neo4j.driver(uri, neo4j.auth.basic(user, password), {
    encrypted: 'ENCRYPTION_OFF'
})

const instance = new Neode(uri, user, password)

module.exports = {driver, instance}