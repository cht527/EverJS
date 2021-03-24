class myFetch{
    async get(url){
       const res= await fetch(url);
       const data= await res.json()
       return data
    }

    async post(url,postData){
        const res= await fetch(url,{
            method:"POST",
            "headers":{
                "Content-Type":"application/json"
            },
            "body":JSON.stringify(postData)
        });
        const data=await res.json();
        return data
        
    }
}