require('./environment')
// require('pg').defaults.ssl = process.env.NODE_ENV !== 'development'
const environments = 'development test staging production'.split(' ')
const config = {}

let databaseUrl
if(process.env.DATABASE_URL) {
  databaseUrl = process.env.DATABASE_URL + '?ssl=true'
} else {
  databaseUrl = process.env.DATABASE_URL
}

environments.forEach(env => {
  config[env] = {
    client: 'pg',
    connection: databaseUrl,
    migrations: {
      directory: __dirname + '/database/migrations',
      tableName: 'migrations'
    },
    seeds: {
      directory: __dirname + `/database/seeds/${env}`
    }
  }
})

module.exports = config
