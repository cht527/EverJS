String.prototype.randomStr = function (len) {
  //[0,5] -->~~(Math.random()*(5+1))   ~~[0,6)
  //[1,5] -->~~(Math.random()*5+1) ~~[1,6)
  var randomL = ~~(Math.random() * len + 1);
  return this.substring(0, randomL - 1);
};

class AsyncFactory {
  produceName(familayName, l) {
    let generateTimes = 1;
    const p = new Promise(function (resolve, reject) {
      const getName = setInterval(function () {
        console.log(`稍等，正在进行第${generateTimes}次处理`);
        const nameTemplate = "haitaohaitaohaitaohaitaohaitaohaitao";
        const firstName = nameTemplate.randomStr(l);
        if (firstName.length <= 2) {
          clearInterval(getName);
          resolve(
            `通过第${generateTimes}次处理，成功取名：${familayName} ${firstName}`
          );
        } else {
          generateTimes++;
          if (generateTimes > 5) {
            clearInterval(getName);
            reject("次数过多");
          }
        }
      }, 1000);
    });

    return p;
  }

  *generatorName(familayName, l) {
    console.log("名字生成中...");
    const fullNameGen = yield this.produceName(familayName, l);
    return fullNameGen;
  }

  async asyncGetFullName(familayName, l) {
    console.log("名字生成中...");
    var fullName = await this.produceName(familayName, l);
    return fullName;
  }
}

const familayName = "cao";

const asyncFactoryInstance = new AsyncFactory();

// test Promise
asyncFactoryInstance
  .produceName(familayName,15)
  .then(function (data) {
    console.log("test Promise", data);
  })
  .catch(function (error) {
    console.log("test Promise", error);
  });

// test yield/generator
const getNameGen = asyncFactoryInstance.generatorName(familayName, 15);

getNameGen
  .next()
  .value.then(function (data) {
    console.log("test yield/generator", data);
  })
  .catch(function (err) {
    console.log("test yield/generator", err);
  });

// test async/await

asyncFactoryInstance
  .asyncGetFullName(familayName, 15)
  .then(function (data) {
    console.log("test async/await", data);
  })
  .catch(function (err) {
    console.log("test  async/await", err);
  });
