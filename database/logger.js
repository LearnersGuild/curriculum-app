const chalk = require('chalk')

module.exports = knex => {
  knex.client.on('start', builder => {

    const startTime = process.hrtime()

    const queries = []

    builder.on('query', function(query) {
      queries.push(query)
    })

    builder.on('end', function() {
      const timeDelta = process.hrtime(startTime)
      const duration = (timeDelta[0] * 1e3 + timeDelta[1] * 1e-6).toFixed(3)
      queries.forEach(query => {
        const sql = knex.raw(query.sql, query.bindings).toString()
        console.log('%s %s %s',
          chalk.gray('SQL'),
          chalk.magenta(duration + 'ms'),
          chalk.cyan(sql)
        )
      })
    })
  })
}
