
/* 
一、实现一个 函数，限制并发请求次数
*/   
 
//控制并发请求数
function sendResquest(urls, max, callback) { 
    let pending_count = 0, //并发数
    idx = 0;//当前请求的位置
   
    const _fetch = async (url)=>{ 
        if (!url) return; 
        pending_count++; 
        // console.log(url + ':start','并发数: '+pending_count+',url:'+url); 
        await fetch(url) 
        pending_count--; 
       // console.log(url + ':done','并发数: '+pending_count+',url:'+url); 
        _fetch(urls[idx++]); 
        if (pending_count ==0 ) {
        	callback && callback()
        }
         
    } 

    while (pending_count < max) { 
        _fetch(urls[idx++]);
    } 
 
}
 
 
 
//验证
let urls = Array.from({length: 10}, (v, k) => k);
 
let fetch = function (idx) {
    return new Promise(resolve => {
        let timeout = parseInt(Math.random() * 1e4);
        setTimeout(() => {
            resolve(idx)
        }, timeout)
    })
};
 
let max = 4;
 
let callback = () => {
    console.log('run callback');
};
//执行
sendResquest(urls, max, callback)
 



/* 
二、实现一个 batcher 函数，使用其对该同步函数包装后，实现每次调用依旧返回预期的二倍结果，
同时还需要保证 executeCount 执行次数为1
*/


let count = 0;

const fn = nums => {
    count++;
    return nums.map(x=>x*2)
}

const batcher = f => {
    // ----- 实现 ----------
    let nums = [];
    let p = Promise.resolve().then(_=>f(nums));

    return arr => {
        let L1 = nums.length;
        nums = nums.concat(arr);
        let L2 = nums.length;
        return p.then(res=>res.slice(L1,L2))
    }

}

const batcherFn = batcher(fn);

const main = async ()=>{
    const [r1,r2,r3] = await Promise.all([
        batcherFn([1,2,3]),
        batcherFn([4,5]),
        batcherFn([7,8,9])
    ]);
    console.log(count)
    console.log(r1,r2,r3)
}

main()

