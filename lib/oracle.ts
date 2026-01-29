import oracledb from "oracledb";

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

let pool: oracledb.Pool;

export async function getConnection() {
  if (!pool) {
    pool = await oracledb.createPool({
      user: "portfolio",
      password: "portfolio123",
      connectString: "localhost:1521/XEPDB1",
      poolMin: 1,
      poolMax: 5,
      poolIncrement: 1,
    });
  }
  return pool.getConnection();
}