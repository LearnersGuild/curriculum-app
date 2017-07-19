process.env.NODE_ENV = process.env.NODE_ENV || 'development'

if (process.env.NODE_ENV === 'production'){
  require('newrelic')
}

if (process.env.NODE_ENV ==='development'){
  require('dotenv').load()
}
