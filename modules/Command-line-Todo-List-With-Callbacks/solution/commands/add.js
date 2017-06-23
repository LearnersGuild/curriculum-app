var fs = require('fs');

function add(text){
  fs.readFile('./tasks.json', function(err, data){
    if (err) throw err;
    json = JSON.parse(data);
    var tasks = json.tasks
    var task = {id:tasks.length, name:text};
    tasks.push(task);
    writeTasks(tasks);
    console.log("Created task " + tasks.length + ".");
  })
}

function writeTasks(tasks){
  fs.writeFile("./tasks.json",'{ "tasks":' + JSON.stringify(tasks) + '}', function(err) {
    if (err) throw err;
  })
}

module.exports = add
