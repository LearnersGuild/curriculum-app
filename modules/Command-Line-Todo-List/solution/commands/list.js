var list = function(tasks){
  console.log('\nID Description');
  console.log('-- -----------');
  var numUncompletedTasks = 0
  tasks.forEach(function(item,num){
    if (item.status !== "complete") {
      numUncompletedTasks++
      console.log(num+1+"  "+item.name);
    }
  });
  console.log("\n" + numUncompletedTasks + " tasks.");
}

module.exports = list
