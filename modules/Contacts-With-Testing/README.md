# Contacts With Testing


## Exercise

This benchmark builds on the [3-2-1-Contacts](../3-2-1-Contacts) benchmark that you may have completed earlier. In this benchmark you will be adding some additional functionality and tests to the code you have written earlier.

## Specs

- `addContact` function should check if the `firstName`, `lastName` & `email` addresses are strings
  - if either of those arguments are NOT strings, the function should throw an error
- `addContacts` function should catch errors thrown by `addContact` function, and continue processing the remaining contacts.
  - The function should maintain the list of contacts that failed to be loaded, and should print a warning to the console about the failed imports
- Test `addContact` and `addContacts` using `console.assert`

Modify the [file](../3-2-1-Contacts/contacts.js) so that all the specs are met.

Executing the file should print the following to the console:
```
$ node contacts-with-testing.js

|----------------------+--------------------------------|
| Full Name            | Email Address                  |
|----------------------+--------------------------------|
| Ambrose Scullard     | ascullard6@timesonline.co.uk   |
| Charil Clegg         | cclegge@weibo.com              |
| Conroy Honsch        | chonsch3@sohu.com              |
| Devon Bocking        | dbockingc@comcast.net          |
| Didi Grose           | dgroseh@google.com.hk          |
| Engracia Folger      | efolger2@epa.gov               |
| Karita Bough         | kbough9@angelfire.com          |
| Marguerite Lafayette | mlafayettea@bravesites.com     |
| Mateo Da Costa       | mdacosta5@about.com            |
| Mercy Browncey       | mbrownceyg@yelp.com            |
| Nessi Bywaters       | nbywatersf@shop-pro.jp         |
| Niccolo Spruce       | nsprucei@wordpress.com         |
| Northrop Bauchop     | nbauchopb@pagesperso-orange.fr |
| Pier Waine           | pwaine8@unc.edu                |
| Shaylah Fairney      | sfairney7@stumbleupon.com      |
| Tanny Vibert         | tvibert0@illinois.edu          |
| Winston Hixley       | whixleyj@homestead.com         |
|----------------------+--------------------------------|

Could not import 3 contacts.
First: 55 , Last: Myall, Email: tmyall1@instagram.com
First: Virgina , Last: Cankett , Email: true
First: Willdon , Last: 22, Email: whedleyd@purevolume.com

```
