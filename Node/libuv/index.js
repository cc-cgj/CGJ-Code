import fs from 'node:fs'

/**
 * 宏任务
 */
setTimeout(()=>{
  console.log(1);
},0)


fs.readFile('./index.js',()=>{
  console.log(2);
})

setImmediate(()=>{
  console.log(3);
})

/**
 * 微任务
 */

process.nextTick(()=>{
  console.log(5);
})

Promise.resolve().then(()=>{
  console.log(4);
})

