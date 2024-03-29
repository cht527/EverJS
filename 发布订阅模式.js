
var eventEmiiter={
	list:{},
	on:function  (type,callback,once) {
		if (!this.list[type]) {
			this.list[type]=[]
		}
		this.list[type].push({
			callback,
			once
		})
	},
	emit:function(type){
		var args=[...arguments].slice(1);
		if (!this.list[type].length) {
			console.log('无订阅事件')
			return false
		}
		var fns=this.list[type];
		for(let i=0;i<fns.length;i++){
			let _fn = fns[i];
			if(_fn){
				_fn.callback.apply(this,args);
				if(_fn.once){
					this.off(type,_fn.callback)
				}
			}
		}

	},
	once: function(type,callback){
		this.on(type,callback,true)
	},
	off:function(type,fn){
		var fns=this.list[type];

		if (!fns) {
			return false
		}
		if (!fn) {
			fns.length=0
		}else{
			fns.forEach((item,i)=>{
				if (fn==item.callback) {
					fns.splice(i,1)
				};
			});
		}

	}

};
function cat(args){
	console.log(args[0]+' miaomiao '+args[1]+'次')
}
function dog(args){
	console.log(args[0]+' wangwang '+args[1]+'次')
}

eventEmiiter.on('cat',cat);
eventEmiiter.on('dog',dog);
eventEmiiter.emit('cat',['tom',3]);
eventEmiiter.emit('dog',['tony',4]);

// 
document.getElementById('delte').onclick=function(){
	eventEmiiter.off('dog',dog);
	eventEmiiter.emit('dog',dog)
};