const { Configuration, OpenAIApi } = require("openai");
const fs = require('fs');
const pdf = require('pdf-parse');

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);
function extract_dataFromPdf(fileurl){


  let dataBuffer = fs.readFileSync(fileurl);

  pdf(dataBuffer).then(function(data) {
      let stringo = ''
      // number of pages
      stringo = stringo + "number of pages: "+ data.numpage +" \n information about pdf: "+data.info + data.text
      

  });
  return stringo
}
async function ai_goodGrammer(inpt){
  const response = await openai.createCompletion({
    model: "text-ada-001",
    prompt: inpt,
    temperature: 0,
    max_tokens: 60,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  return response
}
async function ai_summary(inpt){
  const response = await openai.createCompletion({
    model: "text-ada-001",
    prompt: inpt,
    temperature: 0.7,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  return response
}
async function ai_qna(inpt){
  const response = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: inpt,
    temperature: 0,
    max_tokens: 100,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stop: ["\n"],
  });
  return response
}
async function ai_classifyTopic(inpt){
  const response = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: inpt,
    temperature: 0,
    max_tokens: 6,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stop: ["\n"],
  });
  return response
}
//in inpt add previous data for context
async function ai_chat_main(inpt){
  const response = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: inpt,
    temperature: 0.9,
    max_tokens: 150,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0.6,
    stop: [" Human:", " AI:"],
  });
  return response
}
function dta_go(){

}

export {dta_go,ai_chat_main}