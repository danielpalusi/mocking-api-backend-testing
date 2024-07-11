describe("Mocking API", () => {
  it("Return APIs when hit endpoint using GET method request", () => {
    cy.request("/api/v1/mock").then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("mock");
      expect(response.body).to.have.property("page");
      expect(response.body).to.have.property("total_element");
    });
  });
});
