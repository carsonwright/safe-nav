
module.exports = (function(){
  const handlers = {}
  return function(_internals, handler){
    handler = handler.toString()
      
    if(!handlers[handler]){
      const key = handler.slice(handler.indexOf('(') + 1, handler.indexOf(')'))
      
      const start = handler.indexOf(`${key}.`) - key.length
      outerL = handler.slice(0, start + key.length)

      if(handler[handler.length - 1] === "}"){
        outerR = "}"
      }else{
        outerR = ""
        handler = handler + " "
      }

      inner = handler.slice(start + key.length, handler.length - 1)

      let sections = inner.split(".")
      const fn = function(){}
      sections = sections.map(function(section, i){
        if(i === 0){
          return section
        }


        if(section.includes(")")){
          const _key = section.slice(0, section.indexOf('(')).replace(/\n/g, "")
          
          return  `|| {${_key}: ${fn}}).${section}`
        }else{
          const _key = section.replace(/\n/g, "")
          return  `|| {${_key}:{}}).${section}`
        }
      })
      
      let i = sections.length - 1

      while(i !== 0){
        sections.unshift("(")
        i--
      }


      handlers[handler] = eval(outerL + sections.join("") + outerR)
    }

    return handlers[handler](_internals)
  }
})()