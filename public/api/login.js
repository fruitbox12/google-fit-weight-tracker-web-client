const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
  // Set the CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');


   let userId;

  if (req.method === 'POST') {
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
          res.status(200).end();
        } catch (e) {
          reject(new Error('Invalid JSON'));
        }
      });
    });

    userId = body.userId;
  } else if (req.method === 'GET') {
    // Get userId from query parameters for GET requests
    userId = "app";
    res.status(200).end();
  }

  const secretKey = 'your_secret_key'; // Replace this with your actual secret key



  const token = jwt.sign({ id: userId }, secretKey, {
    expiresIn: '1h' // token will expire in 1 hour
  });

  // If we're here, then the method is not allowed.
  res.setHeader('Allow', 'POST, GET, OPTIONS');
  return res.redirect(200, 'https://www.your-website.com/new-url');

};
