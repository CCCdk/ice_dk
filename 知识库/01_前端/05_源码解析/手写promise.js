function Promise(executor){
    // 添加属性 
    this.PromiseState='pending'; 
    this.PromiseResult=null;
    // 声明一个属性
    this.callBacks=[];
    // 两个函数
    const resolve= data => {
        if(this.PromiseState !=='pending') return ;
        //修改对象的状态（promiseState）
        this.PromiseState='fulfilled'
        //设置对象的结果值(promiseResult)
        this.PromiseResult=data;
        // 调用成功的回调函数   
        this.callBacks.forEach(item =>{
            item.onResolved(data)
        })
        // if(this.callBack.onResolved){
        //     this.callBack.onResolved(data);
        // }
    }
    const reject=data=>{
        if(this.PromiseState !=='pending') return ;
        //修改对象的状态（promiseState）
        this.PromiseState='rejected'
        //设置对象的结果值(promiseResult)
        this.PromiseResult=data;
        // 调用成功的回调函数   
        this.callBacks.forEach(item =>{
            item.onRejected(data)
        })
        // if(this.callBack.onRejected){
        //     this.callBack.onRejected(data);
        // }
    }
    //同步调用【执行器函数】
    try{
        executor(resolve,reject);
    }catch(e){
        reject();
    }
}

// 添加then方法
Promise.prototype.then=function(onResolved,onRejected){
    return new Promise ((resolve,reject)=>{
    //调用回调函数
    if(this.PromiseState=='fulfilled'){
        try{
            let result=onResolved(this.PromiseResult);
            if(result instanceof Promise){
                result.then(v=>{
                    resolve(v);
                },r=>{ 
                    reject(r)
                })
            }else{
                resolve(result);
            }
        }catch(e){
            reject(e);
        }
    }
    if(this.PromiseState=='rejected'){
        onRejected(this.PromiseResult);
    }
    if(this.PromiseState=='pending'){
        //保存回调函数
        this.callBacks.push({
            onResolved:function(){
                console.log('success');
            },
            onRejected:function(){

            }
        })
    }
    })
}

let p =new Promise((resolve,reject) =>{
    resolve('OK');
    reject('no')
});
p.then(value=>{
    console.log(value);
},reason=>{
    console.warn(reason);
})