var fs = require('fs');

function writeTasks(tasks){
  try{
    fs.writeFileSync("./tasks.json",'{ "tasks":' + JSON.stringify(tasks) + '}')
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

function done(num, tasks){
  if (tasks[num]) {
    tasks[num].status = "complete";
    writeTasks(tasks);
    console.log("Completed the task '" + tasks[num].name + "'");
  }
  else console.log("Task with id " + num + " doesn't exist.");
}

module.exports = done
