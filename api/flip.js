export default async function handler(req, res) {
  const { belief } = req.body;
  const apiKey = process.env.OPENAI_API_KEY;

  const response = await fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt: `Rewrite this limiting belief: "${belief}"\n\nRespond with:\nReframe: ...\nAffirmation: ...`,
      max_tokens: 100,
      temperature: 0.7
    })
  });

  const data = await response.json();
  res.status(200).json({ result: data.choices[0].text.trim() });
}
// redeploy test
