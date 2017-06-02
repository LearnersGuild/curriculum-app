# Super Simple Testing


```js
const thing = function(){
  return 'this is the thing'
}

module.exports = thing

// if this was the main file executed run these tests
if (require.main === module) (function(){

  const assert = function(result, message){
    if (!result) throw new Error('TEST FAILED: '+message);
  }

  assert(typeof thing === 'function', 'thing is not a function')

})()

```


## Skills


- [ ] can write tiny tests at the bottom of a file
