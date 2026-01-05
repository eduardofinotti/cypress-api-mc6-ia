const { faker } = require('@faker-js/faker');

function gerarPayloadCompleto() {
  const checkin = faker.date.between({ from: '2024-01-01', to: '2024-12-31' });
  const checkout = faker.date.soon({ days: 7, refDate: checkin });
  return {
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    totalprice: faker.number.int({ min: 50, max: 1000 }),
    depositpaid: faker.datatype.boolean(),
    bookingdates: {
      checkin: checkin.toISOString().split('T')[0],
      checkout: checkout.toISOString().split('T')[0],
    },
    additionalneeds: faker.helpers.arrayElement(['Breakfast', 'Lunch', 'Dinner', 'None']),
  };
}

module.exports = {
  payloadCompleto: gerarPayloadCompleto(),
  gerarPayloadCompleto,
};
