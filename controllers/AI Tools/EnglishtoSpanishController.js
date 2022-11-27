// const { Configuration, OpenAIApi } = import ('openai');
import { Configuration, OpenAIApi } from 'openai';

const englishToSpanishCompletion = async (req, res) => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const { subject, gradeLevel } = req.body;
  console.log('req param', req.body, subject);
  const openai = new OpenAIApi(configuration);
  openai
    .createCompletion({
      model: 'text-davinci-002',
      prompt: `Subject: English Learners (Native Spanish Speakers)<br/><br/> Task: Generate 10 vocabulary words in English and Spanish related to real estate<br/><br/>1. El apartamento / apartment<br/>2. El condominio / condo<br/>3. La casa / house<br/>4. La mansión / mansion<br/>5. El terreno / land<br/>6. El piso / floor<br/>7. La cocina / kitchen<br/>8. El cuarto de baño / bathroom<br/>9. La sala / living room<br/>10. El dormitorio / bedroom<br/><br/>Define these words, give two different examples of them being used in the context of real estate in Spanish<br/><br/>1. Apartment / El apartamento<br/><br/>Definition: A type of housing that consists of several units in one building / Un tipo de vivienda que consiste de varias unidades en un edificio<br/><br/>Example 1: I'm looking for an apartment to rent. / Estoy buscando un apartamento para alquilar.<br/><br/>Example 2: The apartment complex has a gym, a pool, and a playground. / El complejo de apartamentos tiene un gimnasio, una piscina, y un parque infantil.<br/><br/>2. Condo / El condominio<br/><br/>Definition: A type of housing that consists of several units in one building, where each unit is owned by a different person / Un tipo de vivienda que consiste de varias unidades en un edificio, donde cada unidad es propiedad de una persona diferente<br/><br/>Example 1: I'm looking for a condo to buy. / Estoy buscando un condominio para comprar.<br/><br/>Example 2: The condo complex has a gym, a pool, and a playground. / El complejo de condominios tiene un gimnasio, una piscina, y un parque infantil.<br/><br/>3. House / La casa<br/><br/>Definition: A type of housing that is a standalone unit / Un tipo de vivienda que es una unidad independiente<br/><br/>Example 1: I'm looking for a house to rent. / Estoy buscando una casa para alquilar.<br/><br/>Example 2: The house has a garage, a backyard, and a front yard. / La casa tiene un garaje, un patio trasero, y un patio frontal.<br/><br/>4. Mansion / La mansión<br/><br/>Definition: A large and luxurious house / Una casa grande y lujosa<br/><br/>Example 1: I'm looking for a mansion to buy. / Estoy buscando una mansión para comprar.<br/><br/>Example 2: The mansion has a garage, a backyard, and a front yard. / La mansión tiene un garaje, un patio trasero, y un patio frontal.<br/><br/>5. Land / El terreno<br/><br/>Definition: A piece of property that can be developed / Un pedazo de propiedad que puede ser desarrollado<br/><br/>Example 1: I'm looking for land to build a house on. / Estoy buscando terreno para construir una casa.<br/><br/>Example 2: The land is zoned for residential use. / El terreno está zonificado para uso residencial.<br/><br/>6. Floor / El piso<br/><br/>Definition: The level of a building that a unit is on / El nivel de un edificio en el que está una unidad<br/><br/>Example 1: I'm looking for an apartment on the first floor. / Estoy buscando un apartamento en el primer piso.<br/><br/>Example 2: The apartment is on the third floor of the building. / El apartamento está en el tercer piso del edificio.<br/><br/>7. Kitchen / La cocina<br/><br/>Definition: The room in a house or apartment where food is prepared / La habitación en una casa o apartamento donde se prepara la comida<br/><br/>Example 1: I'm looking for a house with a large kitchen. / Estoy buscando una casa con una cocina grande.<br/><br/>Example 2: The kitchen has a stove, a fridge, and a dishwasher. / La cocina tiene una estufa, un refrigerador, y un lavavajillas.<br/><br/>8. Bathroom / El cuarto de baño<br/><br/>Definition: The room in a house or apartment where people bathe and use the toilet / La habitación en una casa o apartamento donde la gente se baña y usa el inodoro<br/><br/>Example 1: I'm looking for a house with two bathrooms. / Estoy buscando una casa con dos baños.<br/><br/>Example 2: The bathroom has a shower, a sink, and a toilet. / El baño tiene una ducha, un lavabo, y un inodoro.<br/><br/>9. Living room / La sala<br/><br/>Definition: The room in a house or apartment where people relax and entertain guests / La habitación en una casa o apartamento donde la gente se relaja y entretiene a los invitados<br/><br/>Example 1: I'm looking for a house with a large living room. / Estoy buscando una casa con una sala grande.<br/><br/>Example 2: The living room has a TV, a couch, and a coffee table. / La sala tiene un televisor, un sofá, y una mesa de café.<br/><br/>10. Bedroom / El dormitorio<br/><br/>Definition: The room in a house or apartment where people sleep / La habitación en una casa o apartamento donde la gente duerme<br/><br/>Example 1: I'm looking for a house with three bedrooms. / Estoy buscando una casa con tres dormitorios.<br/><br/>Example 2: The bedroom has a bed, a dresser, and a nightstand. / El dormitorio tiene una cama, una cómoda, y una mesilla de noche. ### Subject: English Learners (Native Spanish Speakers)<br/><br/>Task: Generate 10 vocabulary words in English and Spanish related to ${subject}.`,
      temperature: 0.75,
      max_tokens: 2000,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0,
      stop: [' ###'],
    })

    .then(response => {
      console.log('openai res ===', response.data);
      res.send(response.data);
    })

    .catch(err => {
      console.log('openai res err ===', err);
      return err;
    });
};

export { englishToSpanishCompletion };
