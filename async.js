const fs = require('fs')
const { resolve } = require('path')
/**
 * 以下是异步和回调的各项使用
 */
//callback方法的
// fs.readFile('./rosouse/a.text','utf-8',function(err,data){
//     console.log(data)
//     if(data){
//         fs.readFile('./rosouse/b.text','utf-8',function(err,data){
//             console.log(data)
//             if(data){
//                 fs.readFile('./rosouse/cc.text','utf-8',function(err,data){
//                     console.log(data)
//                     // if(err){
//                     //     throw err
//                     // }
//                 })
//             }
//         })
//     }
// })


//Promise方法的,1.自己封装一个回调函数，后续调用
// function readFile(...args){
//     return new Promise((resolve,reject) => {
//         fs.readFile(...args,(err,data) => {
//             if(err){
//                 return reject(err)
//             }
//             resolve(data)
//         })
//     })
// }

// readFile('./rosouse/a.text','utf-8')
//     .then(date => {
//         console.log(date)
//         return readFile('./rosouse/b.text','utf-8')
//     })
//     .then(date=> {
//         console.log(date)
//         return readFile('./rosouse/c.text','utf-8')
//     })
//     .then(date => {
//         console.log(date)
//     })



//在node中提供了一个工具函数，专门用来把一些callback形式的api自动包装成Promise方式；util.promisify()
//引包
const util = require('util')
//使用赋予callback
readFile_util = util.promisify(fs.readFile)

// //已经可以使用封装好的util的promise
// readFile_util('./rosouse/a.text','utf-8')
//     .then(date => {
//         console.log(date)
//         return readFile_util('./rosouse/b.text','utf-8')
//     })
//     .then(date => {
//         console.log(date)
//     })


//使用async 异步操作函数，简化了异步代码，使代码看起来更同步代码一样,
async function read(){
    console.log(1)
    //加入await 关键字使其成为异步执行（看似是同步代码），此时方法会等待，而程序是照样运行不等待
    let date_a = await readFile_util('./rosouse/a.text','utf-8')
    console.log(date_a)
    console.log(2)
}

read()
console.log(3)