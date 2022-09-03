import { fileurl } from "../ser";
const fs = require('fs');
let dataBuffer = fs.readFileSync(fileurl);
const pdf = require('pdf-parse');
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: "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",
  });
const openai = new OpenAIApi(configuration);
pdf(dataBuffer).then(function (data) {
    let stringo = ''
    // number of pages
    stringo = stringo + "number of pages: " + data.numpage + " \n information about pdf: " + data.info + data.text
});
//good grammer
const response = await openai.createCompletion({
    model: "text-ada-001",
    prompt: stringo,
    temperature: 0,
    max_tokens: 60,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
//topic find
const response_topic =  await openai.createCompletion({
    model: "text-davinci-002",
    prompt: response,
    temperature: 0,
    max_tokens: 6,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stop: ["\n"],
  }); 
real_response = response + '\n topic of study:' + response_topic
export default real_response;