const Safe = require('./index')

value = {a: {tree: ()=>({of: function(){ return {values: 'the values'} } }) }}



let testName;
testName = "You should be able to traverse the tree and get value"
const expected1 = Safe(value, (_)=>{ 
  return _.a.tree().of().values
})
if(expected1 !== "the values"){
  throw `${testName} - failed!`
}else{
  console.log(`${testName} - passed!`)
}


testName = "You should be able to run it with an abnormal function"
const expected2 = Safe(value, (_)=>( 
  _.a.tree().of().values
))
if(expected2 !== "the values"){
  throw `${testName} - failed!`
}else{
  console.log(`${testName} - passed!`)
}



testName = "You should be able to retraverse the tree and get value without running eval"
const expected3 = Safe(value, (_)=>{ 
  return _.a.tree().of().values
})
if(expected3 !== "the values"){
  throw `${testName} - failed!`
}else{
  console.log(`${testName} - passed!`)
}