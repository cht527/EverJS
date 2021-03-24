

function action(type,arg){
    switch(type){
        case 'lazyMan':
            console.log('This is'+arg);
        break;
        case 'eat':
            console.log('eat '+arg);
        break;
        case 'sleep':
            console.log('sleep'+arg+'s');
        break;
        default:
        return
    }
}

function syncPromise(type,arg){
    var creator=function(){
        var promiseObj = new Promise(function(resolve, reject){
            action(type,arg);
    
            resolve();
        })
    
        return promiseObj;
    }
    return creator;
}

function asyncPromise(type,time){
    var creator=function(){
        var promiseObj = new Promise(function(resolve, reject){
            setTimeout(function(){
                action(type,time);
                resolve();
            },1000*time)
        })
    
        return promiseObj;
    }
    return creator;

}

function subscribe(type,async,restArg){
    let newPromise;
    switch(async){
        case false:
            newPromise=syncPromise(type,restArg);
        break;
        case true:
            newPromise=asyncPromise(type,restArg);
        break;
        default:
        return;
    }
    return newPromise
}

function LazyMan(name){

    this.promiseGetters = [];

    let newPromise=subscribe('lazyMan',false,name);

    this.promiseGetters.push(newPromise)
    
    let sequence=Promise.resolve();

    let self=this;

    setTimeout(function(){
        for(let i=0,l=self.promiseGetters.length;i<l;i++){
            let nowPromise=self.promiseGetters[i];
            let thenableFunc=(function(nowPromise){
                return function(){
                    return nowPromise()
                }
            })(nowPromise);
            sequence=sequence.then(thenableFunc)
        }   
    },0);

    return this;
}

LazyMan.prototype.eat=function(food){
    let newPromise=subscribe('eat',false,food);

    this.promiseGetters.push(newPromise)

    return this;
}

LazyMan.prototype.sleep=function(time){
    let newPromise=subscribe('sleep',true,time);

    this.promiseGetters.push(newPromise)

    return this;
}

let lazyMan=function(name){
    return new LazyMan(name);
}

lazyMan('jack').eat('fish').sleep(4).eat('apple')
