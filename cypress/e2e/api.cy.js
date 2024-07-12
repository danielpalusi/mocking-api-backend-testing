describe("Mocking API", () => {
  let name = "Automation with Cypress";
  const method = "GET";
  const path = "/automation";
  const responseCode = 200;
  const request = { request: "request" };
  const response = { response: "response" };

  const requestBody = {
    name,
    method,
    path,
    request,
    response,
    response_code: responseCode,
  };

  it("Return APIs when hit endpoint using GET method request", () => {
    const properties = ["mock", "page", "total_element"];

    cy.request({
      method: "GET",
      url: "/api/v1/mock",
    }).then((response) => {
      expect(response.status).to.eq(200);
      properties.forEach((prop) => {
        expect(response.body).to.have.property(prop);
      });
    });
  });

  it("Return APIs when hit endpoint using GET method request with page and limit params", () => {
    const limit = 5;
    const page = 0;
    cy.request({
      method: "GET",
      url: `/api/v1/mock?page=${page}&limit=${limit}`,
    }).then((response) => {
      const { mock } = response.body;

      expect(mock.length).to.eq(limit);
      expect(response.status).to.eq(200);
    });
  });

  it("Able to add API when using POST method", () => {
    cy.request({
      method: "POST",
      url: `/api/v1/mock`,
      body: JSON.stringify(requestBody),
    }).then((response) => {
      const { message } = response.body;

      expect(response.status).to.eq(200);
      expect(message).to.equal("ok");
    });
  });

  it("Able to edit API when using PUT method", () => {
    cy.request({
      method: "GET",
      url: `/api/v1/mock?name=${name}`,
    }).then((response) => {
      const { id } = response.body.mock[0];
      name = "Automation with Cypress - Edit";
      const updateBody = {
        ...requestBody,
        id,
        name,
      };

      cy.request({
        method: "PUT",
        url: `/api/v1/mock`,
        body: JSON.stringify(updateBody),
      }).then((response) => {
        const { message } = response.body;

        expect(response.status).to.eq(200);
        expect(message).to.equal("ok");
      });
    });
  });

  it("Able to delete API when using DELETE method", () => {
    cy.request({
      method: "GET",
      url: `/api/v1/mock?name=${name}`,
    }).then((response) => {
      const { id } = response.body.mock[0];

      cy.request({
        method: "DELETE",
        url: `/api/v1/mock?id=${id}`,
      }).then((response) => {
        const { message } = response.body;

        expect(response.status).to.eq(200);
        expect(message).to.equal("success");
        expect();
      });
    });
  });
});
