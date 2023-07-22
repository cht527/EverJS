
const axios = require('axios');
class ConcurrentFetch{
    constructor(urls=[],limit=1,callback=()=>{}){
        /* this.urlList=urls;
        this.limit=limit;
        this.callback=callback */
        [this.urlList,this.limit,this.callback]=[...arguments];
        this.urlListTemp =[]; // 临时存储当前的url
        this.urlListRest=this.urlList;
        this.lastIndex=0;
        this.overFlag=false;

    }
    async execTask(){
        let currentNum = Math.min(this.limit,this.urlListRest.length);
        this.urlListTemp = this.urlList.slice(this.lastIndex,this.lastIndex+currentNum);
        
        this.urlListRest = this.urlList.slice(this.lastIndex+currentNum);
        
        let currentPromiseList=this.createTask();

        console.log(currentPromiseList)
        for(let promiseItem of currentPromiseList){
            let res = await promiseItem;
            this.callback(res.data.data);
            if(this.urlListRest.length>0){
                this.lastIndex = this.lastIndex+currentNum;
                this.execTask();
            }
        }

        
    }
    createTask(){
        return this.urlListTemp.map((url)=>axios.get(url))
    }

}
var urlList=['https://www.apiopen.top/femaleNameApi',
'https://www.apiopen.top/femaleNameApi','https://www.apiopen.top/femaleNameApi'];

var serviceCall=function(data){
    console.log('------start-----')
    
}

var taskList = new ConcurrentFetch(urlList,2,serviceCall);

taskList.execTask()