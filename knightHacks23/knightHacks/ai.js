import express from 'express'
import dotEnv from "dotenv";
import OpenAI from "openai";
import apiai from "apiai";

dotEnv.config();

const ai = apiai(process.env.APIAI_KEY);
const openai = new OpenAI(process.env.OPENAI_KEY);

const app = express();

app.use(express.json());

app.post('/api/completion', async (req, res) => {
  const prompt = req.body.prompt;
  try {
    const response = await openai.completions.create({
      engine: 'davinci-codex',
      prompt: prompt,
      max_tokens: 60
    });
    res.send(response.data.choices[0].text);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('An error occurred while generating the completion.');
  }
});

app.listen(3000, () => console.log('Listening on port 3000'));