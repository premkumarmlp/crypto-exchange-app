const exchangeRoutes = require("../exchange-routes");
const { AppSchema, validate } = require("../app.model");

//Test the Profit and Best Sell Price Service
describe("Get Profit and Sell Price ", () => {
  it("returend object should match AppSchema object ", () => {
    const result = exchangeRoutes.router.get(
      "/api/getRates/BTC/20180507/0915",
      (req, res) => {
        expect(result).toMatchObject(AppSchema);
      }
    );
  });
});

//Calcualte the Profit and Round off
describe("Get Profit and Sell Price ", () => {
  it("returend object should match the value ", () => {
    const profit = exchangeRoutes.getProfit(3.55, 1.11);
    console.log(profit);
    expect(profit).toEqual("2.44");
  });
});
