// const { Configuration, OpenAIApi } = import ('openai');
import { Configuration, OpenAIApi } from 'openai';

const vocabCompletion = async (req, res) => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const { subject, gradeLevel } = req.body;
  console.log('req param', req.body, subject, gradeLevel);
  const openai = new OpenAIApi(configuration);
  openai
    .createCompletion({
      model: 'text-davinci-003',
      prompt: `Class: 11th grade economics class \n\n Task: Generate 5 vocabulary words related to the concept of macroeconomics \n\n Define these 5 words, give two different detailed examples, with supporting facts and scenarios in the context of 11th grade economics. 5 Vocabulary Words: <word1>inflation<word1> <word2>deflation<word2> <word3>recession<word3> <word4>depression<word4> <word5>stagflation<word5> <definition1>Inflation is a sustained increase in the prices of goods and services in an economy over a period of time.<definition1> <example1>1. Inflation can cause a decrease in the purchasing power of consumers as prices of goods and services rise. This can be seen when a student wishes to buy 1 gallon of gas for $4, but the price of gas soda has increased since last week so the student has to settle for less. \n\n2. Inflation can also cause an increase in the cost of goods and services, which can lead to higher costs of production for businesses. For example, a manufacturer may find that their production costs have increased due to the rising costs of raw materials and labor. Which can lead to higher prices for consumers.<example1> <definition2>Deflation is a sustained decrease in the prices of goods and services in an economy over a period of time.<definition2> <example2>1. Deflation can cause an increase in the purchasing power of consumers as prices of goods and services decrease. This can be seen when a student is able to buy 2 gallons of gas for the same price as 1 gallon of gas last week. As a result, the student is able to get more for their money. \n\n2. Deflation can also cause a decrease in the cost of goods and services, which can lead to lower costs of production for businesses. For example, a manufacturer may find that their production costs have decreased due to the falling costs of raw materials and labor. Which can lead to lower prices for consumers.<example2> Recession <definition3>Recession is a period of economic decline which is characterized by a decrease in GDP, higher unemployment, and lower consumer spending.<definition3> <example3>1. During a recession, businesses may find that their sales have decreased due to fewer consumers spending their money. As a result, businesses may need to lay off employees or reduce the hours of their staff in order to save costs and remain profitable. This happened with the Great Recession of 2007-2009 which caused unemployment to reach as high as 10% during its peak. \n\n2. During a recession, the government may also implement expansionary fiscal policy in an attempt to stimulate the economy. This could take the form of tax cuts or increased government spending in order to spur economic activity and encourage consumer spending. An example of this is the 2009 Tax Relief Act, which included tax cuts and stimulus spending in an attempt to stabilize the economy.<example3>  <definition4>Depression is a severe and prolonged economic decline that is more severe than a recession, with a much longer duration and deeper impact on the economy.<definition4> <example4>1. During a depression, businesses may find that their sales have decreased even further than during a recession, with consumers not having the money to make purchases even on discounted items. As a result, businesses may need to lay off more employees or reduce their wages in order to stay afloat. This happened with the Great Depression of 1929-1933 which led to near-universal unemployment and poverty. \n\n2. During a depression, the government may also implement austerity measures in an attempt to reduce government spending and deficits. This could take the form of higher taxes or reduced social spending in order to reduce budget deficits. An example of this is the 1934 Tax Act, which raised income tax rates for all taxpayers in order to reduce the budget deficit. <example4> <definition5>Stagflation is a combination of high unemployment, slow economic growth, and high inflation.<definition5> <example5>1. Stagflation can cause an increase in the cost of living, as prices of goods and services increase while unemployment remains high. This can be seen when a student is laid off from work due to economic slowdowns but finds that prices of basic necessities have increased since they stopped working. \n\n2. Stagflation can also cause businesses to suffer, as higher costs of production due to inflation can make it difficult for them to remain profitable. For example, a manufacturer may find that their production costs have increased due to the rising costs of raw materials and labor, while their sales have decreased due to the recession. <example5> ### Class: ${gradeLevel} \n\n Task: Generate 10 vocabulary words related to the concept of ${subject} \n\n Define these 10 words, give two different detailed examples, with supporting facts and scenarios in the context of ${gradeLevel}. 10 Vocabulary Words:`,
      temperature: 0.8,
      max_tokens: 2700,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0.2,
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

export { vocabCompletion };
