
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: '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',
  dangerouslyAllowBrowser: true
   // This is also the default, can be omitted
});



export async function sendMsgToOpenAiI(message){
    const res = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{"role": "user", "content": message}],
        max_tokens: 100,
      });
      return res.choices[0].message
}