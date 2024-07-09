describe('Message Service API', () => {
  let authToken;
  const receiverId = '668d01cd93b88ac186be2d71'; // Receiver ID for testing

  before(() => {
    cy.request('POST', 'http://localhost:8090/api/auth/login/', {
      username: 'user-test',
      password: 'grupposad'
    }).then((response) => {
      expect(response.status).to.eq(200);
      authToken = response.body.token;
    });
  });

  it('Dovrebbe inviare un messaggio con successo', () => {
    cy.request({
      method: 'POST',
      url: `${Cypress.env('apiBaseUrl')}/${receiverId}`,
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      },
      body: {
        message: 'Test message from Cypress'
      }
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('_id');
      expect(response.body).to.have.property('senderId');
      expect(response.body).to.have.property('receiverId', receiverId);
      expect(response.body).to.have.property('message', 'Test message from Cypress');
    });
  });

  it('Dovrebbe ottenere i messaggi con successo', () => {
    cy.request({
      method: 'GET',
      url: `${Cypress.env('apiBaseUrl')}/${receiverId}`,
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array').that.is.not.empty;
      response.body.forEach((msg) => {
        expect(msg).to.have.property('_id');
        expect(msg).to.have.property('senderId');
        expect(msg).to.have.property('receiverId', receiverId);
      });
    });
  });
});
