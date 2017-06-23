var fs = require('fs');

function add(text, tasks){
  var task = {id:tasks.length, name:text};
  tasks.push(task);
  writeTasks(tasks);
  console.log("Created task " + tasks.length + ".");
}

function writeTasks(tasks){
  try{
    fs.writeFileSync("./tasks.json",'{ "tasks":' + JSON.stringify(tasks) + '}')
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

module.exports = add
