import request from "supertest";
import app from "../../src/server";

describe("GraphQL API", () => {
  it("returns products", async () => {
    const query = `query Product {
products {
  id
}

}`; // GraphQL query example
    const response = await request(app)
      .post("/graphql")
      .send({ query })
      .expect(200);
    expect(Array.isArray(response.body.data.products)).toBe(true);
    expect(response.body.data.products).toBeInstanceOf(Array);
  });
});
