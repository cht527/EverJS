class ajax{
    constructor(url,callback){
        this.xhr=new XMLHttpRequest()
    }
    get(url,callback){
        this.xhr.open('GET',url,true);
        this.xhr.onload=function(){
            if(this.xhr.status===200){
                callback(null,this.xhr.responseText)
            }
        }.bind(this);
        this.xhr.send(null)
       
    }
    
}
