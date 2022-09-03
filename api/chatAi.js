const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);
 export async function chat(dta){
     const response =  await openai.createCompletion({
    model: "text-davinci-002",
    //dta mei purana text data ke sath jo pdf se jo data extracted wala function hai wo dal denge with latest question
    prompt: dta,
    temperature: 0.9,
    max_tokens: 150,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0.6,
    stop: [" Human:", " AI:"],
    });
    return response
}