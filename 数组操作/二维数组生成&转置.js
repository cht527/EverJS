// 生成

const produceMatrix = (m,n,isNoRepeat) => {
  const _matrix = [];let tempMax=0;
  for (let i = 0; i< m; i++) {
      const temp=[];
      for(let j=0;j < n;j++){
          temp.push(i+j+tempMax)
      }
      if(isNoRepeat){
       tempMax+=(n-1);
      }
      _matrix.push(temp)
  }
  return _matrix
}

// 转置
const testArray = [[1,2,3], [4,5,6], [7,8,9]];

function arrayTranspose(array){
  const rows=array.length;
  const target=[]
  for(let i=0;i < rows;i++){
    target[i]=[];
    for(var j=0;j < array[i].length;j++){
        target[i][j]=array[j][i];
    }
  }
  return target
}  