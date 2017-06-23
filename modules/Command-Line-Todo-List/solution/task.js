var fs = require('fs');

var list = require('./commands/list');
var add = require('./commands/add');
var done = require('./commands/done')

// check if the json file exists, if not, create file and initilize with tasks object
if (!fs.existsSync("./tasks.json")) {
  fs.openSync("./tasks.json", 'w');
  fs.writeFileSync("./tasks.json",'{ "tasks": []}')
}

var taskjson = JSON.parse(fs.readFileSync("./tasks.json"))
var tasks = taskjson.tasks;

// parse args
function parseArgs(args){
  switch(args[0]){
    case "list":
      list(tasks);
      break;
    case "add":
      if(args.length > 1)
        add(args[1], tasks);
      break;
    case "done":
      if(args.length > 0)
        done(args[1], tasks);
      break;
    default:
      console.log("Enter a command. Commands are: list, add, and done.");;
  }
}

parseArgs(process.argv.slice(2));
