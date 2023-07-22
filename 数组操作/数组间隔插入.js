
var a =[        
			{        			
				"convert_from":0,
           
            },
            {
                "convert_from":1,
                
            },
            {
                "convert_from":2,
               
            }
        ];

var b =[        
			{        			
				"convert_from":3,
              
            },
            {
                "convert_from":4,
                
            },
            {
                "convert_from":5,
               
            }
        ];
var c=[];

// 往后插入
var c=a.reduce((prev,next,index,arr)=>{
	return prev.concat(next).concat(b[index])
},[]);

// 往前插入

var d=a.reduce((prev,next,index,arr)=>{
	return prev.concat(b[index]).concat(next)
},[])

console.log(c)

console.log(d)