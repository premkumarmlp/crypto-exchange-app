const { MongoClient } = require("mongodb");

function random(low, high) {
  return Math.random() * (high - low) + low;
}

describe("insert", () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect("mongodb://localhost:27017", {
      useNewUrlParser: true
    });
    db = await connection.db("app-db");
  });

  afterAll(async () => {
    await connection.close();
    await db.close();
  });

  it("should insert a doc into collection", async () => {
    const appsdata = db.collection("appschemas");
    const id = random(255255, 355355);
    const mockData = {
      _id: id,
      currency: "LTC",
      date: "20180507",
      buyTime: "0930",
      sellTime: "1245",
      profit: "1.04"
    };
    await appsdata.insertOne(mockData);

    const insertedData = await appsdata.findOne({
      _id: id
    });
    expect(insertedData).toEqual(mockData);
  });
});
