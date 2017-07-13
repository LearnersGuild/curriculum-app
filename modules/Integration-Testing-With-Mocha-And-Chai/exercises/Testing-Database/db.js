// To use this example code, you'll need to set up your own database
// and install the pg-promise package

const pgp = require('pg-promise')()

const db = pgp({
  host: 'localhost',
  port: 5432,
  database: 'address_book',
})

function allContacts() {
  return db.any("SELECT * FROM contacts;")
}

function contactsWithName(name) {
  return db.any(`
    SELECT * FROM contacts
    WHERE name = $1;
  `, name)
}

function allGroups() {
  return db.any("SELECT * FROM groups;")
}

function membersOfGroup(groupName) {
  return db.any(`
    SELECT * FROM contacts
    INNER JOIN group_members
    ON contacts.id = group_members.contact_id
    INNER JOIN groups
    ON group_members.group_id = groups.id
    WHERE groups.name = $1;
  `, groupName)
}

function allGroupsWithMembers() {
  return db.any(`
    SELECT groups.name AS group,
           contacts.id AS contact_id,
           contacts.name AS name
    FROM contacts
    INNER JOIN group_members
    ON contacts.id = group_members.contact_id
    INNER JOIN groups
    ON group_members.group_id = groups.id
    ORDER BY groups.name;
  `)
}

module.exports = {
  allContacts,
  contactsWithName,
  allGroups,
  membersOfGroup,
  allGroupsWithMembers
}
