(() => {
  console.group('---------- arguments -----------')
  
  function getArgs(...args) {
    console.log('...args', ...args)
  }

  function getArguments() {
    console.log('arguments', arguments)
  }

  getArgs(1, 2, 3);   // [1, 2, 3]

  getArguments(1, 2, 3);    //  Arguments(3) [0: 1, 1: 2, 2: 3] 

  
  console.groupEnd()
})()