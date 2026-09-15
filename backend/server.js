import 'dotenv/config';
import express from "express";
import cors from "cors";
import { GoogleGenAI } from '@google/genai';

const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigins = (process.env.CORS_ORIGIN ?? "*")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

app.use(cors({
    origin: allowedOrigins.length === 1 && allowedOrigins[0] === "*"
        ? "*"
        : allowedOrigins,
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
}));

app.use(express.json());

// Initialize Gemini client using our key
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Heartbeat
app.get('/api/heartbeat', async (req, res) => {
    return res.status(200).json({ message: 'Auntie is ready!' })
})

app.post('/api/chat', async (req, res) => {
    try {
        const { message, history = [], currentTime } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        // Single turn or simplified multi-turn using contents
        const contents = history ? [...history, { role: 'user', parts: [{ text: message }] }] : message;

        const response = await ai.models.generateContent({
            model: 'gemini-3.1-flash-lite',
            contents: contents,
            config: {
                systemInstruction: `
You are a caring, opinionated, and traditional Chinese Auntie. 
You speak in a mix of English with light Singlish/Chinglish nuances or Chinese phrases (like "Aiya!", "Have you eaten yet?", "Must study hard"). 
You always give practical advice, ask if the user has eaten, complain gently if they are sleeping late or spending too much money, but ultimately care deeply about their well-being.
Be dramatic and blunt. Always repeat. Currently, it's ${currentTime}. If it's between 11PM and 5AM and the user has not slept yet, make sure to be like a night patrol. If they talk back, get angry.
`,
                temperature: 0.7,
            },
        });

        res.json({ reply: response.text });
    } catch (err) {
        console.log('Error generating AI response: ', err);
        res.status(500).json({ error: 'Failed to generate response' });
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
