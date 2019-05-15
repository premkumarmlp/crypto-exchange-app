var apiRoutes = require("../exchange-rate-api");
const { AppSchema, validate } = require("../app.model");

//Unit Test for Valid URL of GetExchangeRecords REST API
describe("Get data for Get Rest API Test()", () => {
  it("returend object should match AppSchema object ", () => {
    apiRoutes.get("/api/currency-exchange/", () => {
      AppSchema.find()
        .then(data, () => {
          expect(date).toMatchObject(AppSchema);
        })
        .catch(err, () => {
          expect(err).toBeNull();
        });
    });
  });
});

//Unit Test for Invalid URL of GetExchangeRecords REST API
describe("Get null for Get Rest API Test()", () => {
  it("returend object should match AppSchema object and record length is 1 ", () => {
    apiRoutes.get("/api/currency-exchange/5cdc141794baae31cc492919", () => {
      AppSchema.find()
        .then(data, () => {
          expect(data).toMatchObject(AppSchema);
        })
        .catch(err, () => {});
    });
  });
});

//Unit Test for Invalid URL of GetExchangeRecords REST API
describe("Get null for Get Rest API Test()", () => {
  it("should return null records for invalid Get URL ", () => {
    apiRoutes.get("/api/", () => {
      AppSchema.find()
        .then(data, () => {})
        .catch(err, () => {
          expect(err).toBeNull();
        });
    });
  });
});
