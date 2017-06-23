var fs = require('fs');

function writeTasks(tasks){
  fs.writeFile("./tasks.json",'{ "tasks":' + JSON.stringify(tasks) + '}', function(err) {
    if (err) throw err;
  })
}

function done(num){
  fs.readFile('./tasks.json', function(err, data){
    if (err) throw err;
    json = JSON.parse(data);
    var tasks = json.tasks
    if (tasks[num]) {
      tasks[num].status = "complete";
      writeTasks(tasks);
      console.log("Completed the task '" + tasks[num].name + "'");
    }
    else console.log("Task with id " + num + " doesn't exist.");
  })
}

module.exports = done
