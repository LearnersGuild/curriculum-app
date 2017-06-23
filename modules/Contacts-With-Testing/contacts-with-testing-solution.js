let allContacts = []
let errorContacts = []

const addContact = function(firstName, lastName, email) {
  if (typeof firstName != "string" || typeof lastName != "string" || typeof email != "string"){
    throw new Error('First name, last name, and/or email are not strings.')
  }
  else {
    allContacts.push({fullName: firstName + " " + lastName, email: email})
  }
}

const addContacts = function(contactData) {
  for (var i=0; i<contactData.length; i++) {
    try {
      addContact(contactData[i].first_name, contactData[i].last_name, contactData[i].email)
    }
    catch(e) {
      errorContacts.push({firstName: contactData[i].first_name, lastName: contactData[i].last_name, email: contactData[i].email})
    }
  }
}

const printContacts= function(contacts) {
  console.log('|------------------------------------------------------|');
  console.log('| Full Name (Email Address)');
  console.log('|------------------------------------------------------|');
  contacts.sort(function(a, b) {
    if(a.fullName < b.fullName) return -1;
    if(a.fullName > b.fullName) return 1;
    return 0;
  })
  for (var i=0; i<contacts.length; i++) {
    console.log('| '+contacts[i].fullName+' ('+contacts[i].email+')');
  }
  console.log('|------------------------------------------------------|');

  if (errorContacts.length > 0) console.log('Could not import ' + errorContacts.length + ' contacts.');

  for (var i=0; i<errorContacts.length; i++) {
    console.log('First: ' + errorContacts[i].firstName + ', Last: ' + errorContacts[i].lastName + ', Email: '+ errorContacts[i].email);
  }
}

///////////////////////////////////////////////////////////////////////////

addContacts([{
  "first_name": "Tanny",
  "last_name": "Vibert",
  "email": "tvibert0@illinois.edu"
}, {
  "first_name": 55,
  "last_name": "Myall",
  "email": "tmyall1@instagram.com"
}, {
  "first_name": "Engracia",
  "last_name": "Folger",
  "email": "efolger2@epa.gov"
}, {
  "first_name": "Conroy",
  "last_name": "Honsch",
  "email": "chonsch3@sohu.com"
}, {
  "first_name": "Virgina",
  "last_name": "Cankett",
  "email": true
}, {
  "first_name": "Mateo",
  "last_name": "Da Costa",
  "email": "mdacosta5@about.com"
}, {
  "first_name": "Ambrose",
  "last_name": "Scullard",
  "email": "ascullard6@timesonline.co.uk"
}, {
  "first_name": "Shaylah",
  "last_name": "Fairney",
  "email": "sfairney7@stumbleupon.com"
}, {
  "first_name": "Pier",
  "last_name": "Waine",
  "email": "pwaine8@unc.edu"
}, {
  "first_name": "Karita",
  "last_name": "Bough",
  "email": "kbough9@angelfire.com"
}, {
  "first_name": "Marguerite",
  "last_name": "Lafayette",
  "email": "mlafayettea@bravesites.com"
}, {
  "first_name": "Northrop",
  "last_name": "Bauchop",
  "email": "nbauchopb@pagesperso-orange.fr"
}, {
  "first_name": "Devon",
  "last_name": "Bocking",
  "email": "dbockingc@comcast.net"
}, {
  "first_name": "Willdon",
  "last_name": 22,
  "email": "whedleyd@purevolume.com"
}, {
  "first_name": "Charil",
  "last_name": "Clegg",
  "email": "cclegge@weibo.com"
}, {
  "first_name": "Nessi",
  "last_name": "Bywaters",
  "email": "nbywatersf@shop-pro.jp"
}, {
  "first_name": "Mercy",
  "last_name": "Browncey",
  "email": "mbrownceyg@yelp.com"
}, {
  "first_name": "Didi",
  "last_name": "Grose",
  "email": "dgroseh@google.com.hk"
}, {
  "first_name": "Niccolo",
  "last_name": "Spruce",
  "email": "nsprucei@wordpress.com"
}, {
  "first_name": "Winston",
  "last_name": "Hixley",
  "email": "whixleyj@homestead.com"
}])
printContacts(allContacts)
