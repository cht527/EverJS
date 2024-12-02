const dealyTime = (timer) => new Promise(resolve=>{
    setTimeout(()=>{
        resolve()
    },timer)
});

const asyncTask = (delay,number)=> dealyTime(delay).then(()=>{
    console.log(number);
    return number
})


const mergePromsie = (promiseList) => {
    let result = [];
    let promise = Promise.resolve()
    promiseList.forEach(p => {
        promise = promise.then(p).then(data=>{
            result.push(data);
            return result
        })
    });

    return promise
}

/**
 * 实现 mergePromsie逻辑,使得以下代码执行后分别输出
 * 1
 * 2
 * 3
 * done
 * [1,2,3]
 */
mergePromsie([()=>asyncTask(1000,1),()=>asyncTask(2000,2),()=>asyncTask(3000,3)]).then(data=>{
    console.log('done')
    console.log(data)
});

