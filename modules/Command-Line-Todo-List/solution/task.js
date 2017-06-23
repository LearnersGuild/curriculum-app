var fs = require('fs');

var list = require('./commands/list');
var add = require('./commands/add');
var done = require('./commands/done')


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
      list(tasks);
  }
}

var todoArgs = Array.prototype.slice.call(process.argv, 2);
parseArgs(todoArgs);
