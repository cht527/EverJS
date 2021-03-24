
String.prototype.randomStr=function(len){
    //[0,5] -->~~(Math.random()*(5+1))   ~~[0,6)
    //[1,5] -->~~(Math.random()*5+1) ~~[1,6)
    var randomL=~~(Math.random()*len+1);
    return this.substring(0,randomL-1)
}
var getName=function(familayName,l){
    var p=new Promise(function(resolve,reject){
        console.log('名字生成中...');
        var generateTimes=1;
        var generatorName=setInterval(function(){
            console.log(`稍等，正在进行第${generateTimes}次处理`);
            var nameTemplate='haitaohaitaohaitaohaitaohaitaohaitao';
            var firstName=nameTemplate.randomStr(15);
            if(firstName.length<=2){
                clearInterval(generatorName)
                resolve(`通过第${generateTimes}次处理，成功取名：${familayName} ${firstName}`);
            }else{
                generateTimes++;
                if(generateTimes>5){
                    clearInterval(generatorName);
                    reject('次数过多');
                }
                
            }
            
        },1000)
    });

    return p
}
var familayName='cao';
getName(familayName).then(function(data){
    console.log(data);
}).catch(function(error){
    console.log(error);
})



