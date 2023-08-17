/**
 * 在请求发起之前增加一个控制器，
 * 在请求回来时，如果控制器为暂停状态则不处理数据，等待控制器恢复后再进行处理，是不是也能到达到目的？
 * 实现：
 * 假如我们使用 fetch 来请求。我们可以设计一个控制器 Promise 和请求放在一起用 Promise.all 包裹，
 * 当 fetch 完成时判断这个控制器的暂停状态，如果没有被暂停，则控制器也直接 resolve，
 * 同时整个 Promise.all 也 resolve 抛出。
 */

function mock_request() {
  return new Promise<string>((resolve) =>
    setTimeout(() => {
      console.log("resolved request after timeout 3s");
      resolve("response result");
    }, 3000)
  );
}

// 原本想使用 class extends Promise 来实现
// 结果一直出现这个问题 https://github.com/nodejs/node/issues/13678
function createPauseControllerPromise() {
  const result = {
    isPause: false,
    resolveWhenResume: false,
    resolve(value?: any) {},
    pause() {
      this.isPause = true;
    },
    resume() {
      if (!this.isPause) return;
      this.isPause = false;
      if (this.resolveWhenResume) {
        this.resolve();
      }
    },
    promise: Promise.resolve(),
  };
  const promise = new Promise<void>((res) => {
    result.resolve = res;
  });
  result.promise = promise;

  return result;
}

function requestWithPauseControl<T extends () => Promise<any>>(request: T) {
  const controller = createPauseControllerPromise();

  const controlRequest = request()
    .then((data) => {
      if (!controller.isPause) controller.resolve();
      return data;
    })
    .finally(() => {
      controller.resolveWhenResume = true;
    });

  const result = Promise.all([controlRequest, controller.promise]).then(
    (data) => {
      controller.resolve();
      return data[0];
    }
  );

  (result as any).pause = controller.pause.bind(controller);
  (result as any).resume = controller.resume.bind(controller);

  return result as ReturnType<T> & { pause: () => void; resume: () => void };
}


/** 用法
我们可以通过调用 requestWithPauseControl(_request) 来替代调用 _request 使用，通过返回的 pause 和 resume 方法控制暂停和继续。
*/
const result = requestWithPauseControl(mock_request);

result.then((data) => {
    console.log(data);
  });
  
  if (Math.random() > 0.5) {
    console.log("paused");
    result.pause();
  
    setTimeout(() => {
      result.resume();
      console.log("resumed");
    }, 4000);
  }