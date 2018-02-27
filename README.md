## Safe Navigation for es5 +

```javascript
const Safe = require('safe-nav')

content = {a: {tree: ()=>({of: function(){ return {values: 'the values'} } }) }}
Safe(content, (_)=>{
  return _.a.tree().of().values
})
```
