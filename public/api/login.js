const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
  // Set the CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');

  // Wait for the request body stream to finish and parse it as JSON
  const body = await new Promise((resolve, reject) => {
    let bodyChunks = [];
    req.on('data', chunk => {
      bodyChunks.push(chunk);
    }).on('end', () => {
      const rawBody = Buffer.concat(bodyChunks).toString();
      try {
        const parsedBody = JSON.parse(rawBody);
        resolve(parsedBody);
      } catch (e) {
        reject(new Error('Invalid JSON'));
      }
    });
  });

  const { userId } = body;
  const secretKey = 'your_secret_key'; // Replace this with your actual secret key

  if (req.method === 'POST') {
    if (!userId) {
      return res.status(400).json({ error: 'Invalid request' });
    }
else if (req.method === 'GET') {


    const token = jwt.sign({ id: "example@google" }, secretKey, {
      expiresIn: '1h', // token will expire in 1 hour
    });
    return res.status(200).json({ token });
  }
    const token = jwt.sign({ id: userId }, secretKey, {
      expiresIn: '1h', // token will expire in 1 hour
    });


  // If we're here, then the method is not allowed.
  res.setHeader('Allow', 'POST, GET, OPTIONS');
  return res.status(405).end('Method Not Allowed');
};
