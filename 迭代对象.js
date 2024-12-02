/**
 * 让以下解构成立
 * const [a,b] = {a:1, b:2}
 */

// 增加迭代器属性

const obj = {
    a:1,
    b:2,
    [Symbol.iterator](){
        const keys = Object.keys(this);
        let i = 0;
        return {
            next() {
                if(i<keys.length){
                    return {
                        value: obj[keys[i++]],
                        done: false
                    }
                } 
    
                return {
                    value: undefined,
                    done: true
                }
            }
        }
        
    }
}

const [a,b] = obj

console.log(a,b)

for (const element of obj) {
    console.log(`ele:${element}`)

}