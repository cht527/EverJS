/* 
实现一个 函数，限制并发请求次数
*/

//控制并发请求数
function sendResquest(urls, max, callback) {
  let pending_count = 0, //并发数
    idx = 0; //当前请求的位置

  const _fetch = async (url) => {
    if (!url) return;
    pending_count++;
    // console.log(url + ':start','并发数: '+pending_count+',url:'+url);
    await fetch(url);
    pending_count--;
    // console.log(url + ':done','并发数: '+pending_count+',url:'+url);
    _fetch(urls[idx++]);
    if (pending_count == 0) {
      callback && callback();
    }
  };

  while (pending_count < max) {
    _fetch(urls[idx++]);
  }
}

//验证
let urls = Array.from({ length: 10 }, (v, k) => k);

let fetch = function (idx) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(idx);
    }, 2000);
  });
};

let max = 4;

let callback = () => {
  console.log("run callback");
};
//执行
// sendResquest(urls, max, callback);
// 方法二

class Scheduler {
  constructor(maxNum) {
    //等待执行的任务队列
    this.taskList = [];
    //当前任务数
    this.count = 0;
    //最大任务数
    this.maxNum = maxNum;
  }

  async add(promiseCreator) {
    //当当前任务数超出最大任务数就将其加入等待执行的任务队列
    if (this.count >= this.maxNum) {
      await new Promise((resolve) => {
        this.taskList.push(resolve);
      });
    }
    this.count++;
    const result = await promiseCreator();
    console.log(result, "result");
    this.count--;
    //当其它任务执行完任务队列中还有任务没执行就将其出队并执行
    if (this.taskList.length > 0) {
      this.taskList.shift()();
    }
    return result;
  }
}

const timeout = (time) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
};

const mockFetch = (url, wait, callback) =>
  timeout(wait).then(() => callback(url));

const scheduler = new Scheduler(2);

const callbackFunc = (value) => {
  console.log(value);
  return value;
};

const addTask = (wait, url) => {
  scheduler.add(() => mockFetch(url, wait, callbackFunc));
};

const main = () => {
  addTask(1000, "url1");
  addTask(500, "url2");
  addTask(300, "url3");
  addTask(400, "url4");
};

main();

//此处输出2 -> 3 ->1 -> 4
//一开始1、2两个任务进入队列
//500ms时，2完成，输出2，任务3进入队列
//800ms时，3完成，输出3，任务4进入队列
//1000ms时，1完成，输出1
//1200ms时，4完成，输出4
