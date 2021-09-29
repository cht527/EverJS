

function curry(func){
    const targetArgs=[];
    const cb = (...args)=>{
        if(args.length === 0){
            return func.apply(this,targetArgs)
        }
        targetArgs.push(...args);
        return cb
    }

    return cb

}