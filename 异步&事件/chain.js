
    var taskList = [];

    // 订阅
    function subscribe() {
        var param = {},
            args = Array.prototype.slice.call(arguments);

        if (args.length < 1) {
            throw new Error("subscribe 参数不能为空!");
        }

        param.msg = args[0]; // 消息名
        param.args = args.slice(1); // 参数列表

        if (param.msg == "sleepFirst") {
            taskList.unshift(param);
        } else {
            taskList.push(param);
        }
    }

    // 发布
    function publish() {
        if (taskList.length > 0) {
            run(taskList.shift());
        }
    }


function LazyMan(str) {
    subscribe("lazyMan", str);

    setTimeout(function () {
        publish();
    }, 0);

    return new Man();
};


function Man(){}

Man.prototype.eat = function (str) {
    subscribe("eat", str);
    return this;
};

Man.prototype.sleep = function (num) {
    subscribe("sleep", num);
    return this;
};

Man.prototype.sleepFirst = function (num) {
    subscribe("sleepFirst", num);
    return this;
};

// 输出文字
function lazyManLog(str) {
    console.log(str);
}

// 具体方法
function lazyMan(str) {
    lazyManLog("Hi!This is " + str + "!");

    publish();
}

function eat(str) {
    lazyManLog("Eat " + str + "~");
    publish();
}

function sleep(num) {
    setTimeout(function () {
        lazyManLog("Wake up after " + num);

        publish();
    }, num * 1000);

}

function sleepFirst(num) {
    setTimeout(function () {
        lazyManLog("Wake up after " + num);

        publish();
    }, num * 1000);
}

// 鸭子叫
function run(option) {
    var msg = option.msg,
        args = option.args;

    switch (msg) {
        case "lazyMan":
            lazyMan.apply(null, args);
            break;
        case "eat":
            eat.apply(null, args);
            break;
        case "sleep":
            sleep.apply(null, args);
            break;
        case "sleepFirst":
            sleepFirst.apply(null, args);
            break;
        default:
            ;
    }
}



LazyMan('jack').eat('fish').sleep(4).eat('apple')