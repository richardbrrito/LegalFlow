import express from 'express'
import dotEnv from "dotenv";
import OpenAI from "openai";
import apiai from "apiai";

dotEnv.config();


const ai = apiai(process.env.apiKey);
const openai = new OpenAI(process.env.apiKey);

const app = express();



app.use(express.json());

app.post('/api/completion', async (req, res) => {
  const prompt = req.body.prompt;
  const response = await openai.completions.create({
    engine: 'davinci-codex',
    prompt: prompt,
    max_tokens: 60
  });
  res.send(response.data.choices[0].text);
});



app.listen(3000, () => console.log('Listening on port 3000'));