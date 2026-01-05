

const { payloadCompleto } = require('../fixtures/bookingPayloads');
const { gerarPayloadCompleto } = require('../fixtures/bookingPayloads');
describe('Booking API - Criação de Agendamento', () => {

  it('deve criar agendamento com sucesso (payload completo)', () => {
    const payload = gerarPayloadCompleto();
    cy.criarAgendamento(payload).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('bookingid');
      expect(response.body).to.have.property('booking');
      expect(response.body.booking).to.include({
        firstname: payloadCompleto.firstname,
        lastname: payloadCompleto.lastname,
        totalprice: payloadCompleto.totalprice,
        depositpaid: payloadCompleto.depositpaid,
        additionalneeds: payloadCompleto.additionalneeds,
      });
      expect(response.body.booking.bookingdates).to.deep.equal(payloadCompleto.bookingdates);
    });
  });

  it('deve criar agendamento sem additionalneeds (campo opcional)', () => {
    const payload = { ...payloadCompleto };
    delete payload.additionalneeds;
    cy.criarAgendamento(payload).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.booking).to.include({
        firstname: payload.firstname,
        lastname: payload.lastname,
        totalprice: payload.totalprice,
        depositpaid: payload.depositpaid,
      });
      expect(response.body.booking.bookingdates).to.deep.equal(payload.bookingdates);
      expect(response.body.booking).to.not.have.property('additionalneeds');
    });
  });

  it('deve retornar erro ao omitir firstname', () => {
    const payload = { ...payloadCompleto };
    delete payload.firstname;
    cy.criarAgendamento(payload, { failOnStatusCode: false }).then((response) => {
      expect(response.status).to.be.oneOf([400, 500]);
    });
  });

  it('deve retornar erro ao omitir lastname', () => {
    const payload = { ...payloadCompleto };
    delete payload.lastname;
    cy.criarAgendamento(payload, { failOnStatusCode: false }).then((response) => {
      expect(response.status).to.be.oneOf([400, 500]);
    });
  });

  it('deve retornar erro ao omitir totalprice', () => {
    const payload = { ...payloadCompleto };
    delete payload.totalprice;
    cy.criarAgendamento(payload, { failOnStatusCode: false }).then((response) => {
      expect(response.status).to.be.oneOf([400, 500]);
    });
  });

  it('deve retornar erro ao omitir depositpaid', () => {
    const payload = { ...payloadCompleto };
    delete payload.depositpaid;
    cy.criarAgendamento(payload, { failOnStatusCode: false }).then((response) => {
      expect(response.status).to.be.oneOf([400, 500]);
    });
  });

  it('deve retornar erro ao omitir bookingdates', () => {
    const payload = { ...payloadCompleto };
    delete payload.bookingdates;
    cy.criarAgendamento(payload, { failOnStatusCode: false }).then((response) => {
      expect(response.status).to.be.oneOf([400, 500]);
    });
  });

  it('deve retornar erro ao enviar totalprice como string', () => {
    const payload = { ...payloadCompleto, totalprice: 'cento e onze' };
    cy.criarAgendamento(payload, { failOnStatusCode: false }).then((response) => {
      expect(response.status).to.be.oneOf([400, 500]);
    });
  });

  it('deve retornar erro ao enviar depositpaid como string', () => {
    const payload = { ...payloadCompleto, depositpaid: 'true' };
    cy.criarAgendamento(payload, { failOnStatusCode: false }).then((response) => {
      expect(response.status).to.be.oneOf([400, 500]);
    });
  });

  it('deve retornar erro ao enviar datas inválidas', () => {
    const payload = {
      ...payloadCompleto,
      bookingdates: { checkin: 'data-invalida', checkout: 'outra-invalida' },
    };
    cy.criarAgendamento(payload, { failOnStatusCode: false }).then((response) => {
      expect(response.status).to.be.oneOf([400, 500]);
    });
  });

  it('deve criar agendamento com additionalneeds vazio', () => {
    const payload = { ...payloadCompleto, additionalneeds: '' };
    
    cy.criarAgendamento(payload).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.booking.additionalneeds).to.eq('');
    });
  });
});
