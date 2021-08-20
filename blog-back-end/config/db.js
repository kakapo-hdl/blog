const sql = require('mssql');

const config = {
  user:'SA',
  password:"nM7894561230",
  server:"42.192.144.217",
  database:"mouseroomhouse",
  port:1433,
  stream: false,
  options: {
    trustedConnection: true,
    encrypt: false,
    enableArithAbort: true,
    trustServerCertificate: false,
  },
  pool:{
    min:0,
    max:10,
    idleTimeoutMillis: 30000
  }
}
const pool = new sql.ConnectionPool(config);
const poolConnect = pool.connect();

pool.on('error', err => {
  console.log(err);
})

async function messageHandler() {
  await poolConnect; // ensures that the pool has been created
  try {
      const request = pool.request(); // or: new sql.Request(pool1)
      const result = await request.query(`select * from brand`)
      return result;
  } catch (err) {
      console.error('SQL error', err);
  }
  
}

module.exports = messageHandler;