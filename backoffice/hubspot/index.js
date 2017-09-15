const HubspotClient = require('hubspot');
const hubspot = new HubspotClient();
const userProperties = require('./userProperties')

const enabled = !!process.env.HUBSPOT_API_KEY

if (enabled){
  hubspot.useKey(process.env.HUBSPOT_API_KEY, (error) => {
    if (error) throw error
  });
}

const getAllContacts = (options={}) => {
  return new Promise((resolve, reject) => {
    options.count = options.count || 99999
    options.property = options.property || Object.keys(userProperties)
    hubspot.contacts.get(options, (error, response) => {
      error ? reject(error) : resolve(response.contacts)
    })
  })
}

const getContactByEmail = (email) => {
  return new Promise((resolve, reject) => {
    hubspot.contacts.getByEmail(email, (error, response) => {
      if (error) return reject(error)
      if (response.status === 'error') return reject(new Error(response.message))
      const contact = processContact(response)
      contact.vid = response.vid
      resolve(contact)
    })
  })
}

const getContactsByEmail = emails => {
  return new Promise((resolve, reject) => {
    hubspot.contacts.getByEmailBatch(emails, (error, response) => {
      if (error) return reject(error)
      if (response.status === 'error') return reject(new Error(response.message))
      const contacts = Object.values(response).map(processContact)
      resolve(contacts)
    })
  })
}


const processContact = function(_contact){
  const contact = {}
  contact.vid = _contact.vid
  contact.url = `https://app.hubspot.com/contacts/2144508/contact/${contact.vid}/`
  Object.entries(userProperties).forEach(([propName, propType]) => {
    const prop = _contact.properties[propName]
    if (!prop) {
      contact[propName] = null
      return
    }
    let value = prop.value

    if (propType === 'String' && typeof value !== 'string')
      value = String(value)

    if (propType === 'Number' && typeof value !== 'number')
      value = Number(value)

    if (propType === 'Boolean' && typeof value === 'string')
      value = value === 'true' ? true : value === 'false' ? false : null

    if (propType === 'Date' && !(value instanceof Date))
      value = parseDate(value)

    if (propType === 'Phase' && typeof value !== 'number')
      value = Number.parseInt(value.replace('Phase ',''))

    contact[propName] = value
  })
  return contact
}

const parseDate = input => {
  let date
  if (input.toString().match(/^\d+$/)){
    date = new Date(0)
    date.setUTCSeconds(Number.parseInt(input) / 1000)
    return date
  }
  // throw new TypeError(`bad date: ${input}`)
}



module.exports = {
  getAllContacts,
  getContactByEmail,
  getContactsByEmail
}
