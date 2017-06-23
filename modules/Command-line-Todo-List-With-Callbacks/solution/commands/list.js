var fs = require('fs');

var list = function(){
  fs.readFile('./tasks.json', function(err, data){
    if (err) throw err;
    json = JSON.parse(data);
    var tasks = json.tasks
    console.log('\nID Description');
    console.log('-- -----------');
    var numUncompletedTasks = 0
    tasks.forEach(function(item,num){
      if (item.status !== "complete") {
        numUncompletedTasks++
        console.log(num+"  "+item.name);
      }
    });
    console.log("\n" + numUncompletedTasks + " tasks.");
  })
}

module.exports = list
