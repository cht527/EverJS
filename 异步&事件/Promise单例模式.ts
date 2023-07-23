/**
 * 应用场景
 * 一次性懒惰初始化：数据库客户端在执行任何查询之前会根据需要初始化自身，并且只会执行一次
 * 通常适用于数据库客户端（Sequelize，Mongoose，TypeORM 等），或基于这些客户端的封装。
 * 懒惰：客户端将在执行第一个sql查询的时候自动连接。调用者不需要显式连接数据库客户端，因为客户端封装了连接状态。
 */

/**
 * 需求初步实现
 */

// 先实现一个简单的数据库客户端。

// 公开一个 getRecord() 方法，该方法在内部调用 .connect() 执行初始化的私有方法：

class DbClient {
  private isConnected: boolean;

  constructor() {
    this.isConnected = false;
  }

  private async connect() {
    if (this.isConnected) {
      return;
    }

    // await connectToDatabase(); // mock
    this.isConnected = true;
  }

  public async getRecord(recordId: string) {
    await this.connect();
    return; // getRecordFromDatabase(recordId); // mock
  }
}

// 分析以上代码实现：如果客户端还没连接，它将自动连接。这意味着使用者可以简单地执行查询而无需关心连接状态：
const dbClient1 = new DbClient();
const record =  dbClient1.getRecord("");

//再看一下这个 getRecord() 方法，看看是否可以发现并发竞争条件。

// #条件竞争
const db2 = new DbClient();
const exec = async ()=>{
  const [record1, record2] = await Promise.all([
    db2.getRecord("id1"),
    db2.getRecord("id2"),
  ]);

  return [record1, record2]
}


// 这可能会导致我们的数据库客户端连接两次！我们违反了“一次性”要求！
/**
 * 问题是这样的：
 * 因为我们的数据库客户端的 .connect() 方法是异步的，所以在 .getRecord() 执行第二个调用时不太可能已经完成。
 * this.isConnected 依然是 false。这个问题很可能会造成资源泄漏，最终导致服务器瘫痪
 * 
*/

/**
 * 解决方案：单例Promise
 */

/* 引入一个isConnectionInProgress 用于记录第一个  .connect() 调用的  Promise 的引用。
然后，我们可以保证在执行任何将来的查询之前，该 Promise 已得到解决：*/

class DbClientSingleton {
  private connectionPromise: Promise<void> | null;

  constructor() {
    this.connectionPromise = null;
  }

  private async connect() {
    if (!this.connectionPromise) {
      // this.connectionPromise =  connectToDatabase(); // mock
    }

    return this.connectionPromise;
  }

  public async getRecord(recordId: string) {
    await this.connect();
    // return getRecordFromDatabase(recordId); // mock
  }
}

/**
 * 由于变量 this.connectionPromise 是同步分配的，因此 .getRecord() 可以确保重复调用始终重用相同的 Promise 。
这意味着第二个 .getRecord() 调用将等到第一个调用 .connect()解决后再继续。
我们已经修复了该错误！通过以这种方式进行限制，我们可以防止并发初始化。
 *  
 */ 

