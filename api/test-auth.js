export default function handler(req, res) {
  // Obtener secret de query params
  const url = new URL(req.url, 'https://vercel.app');
  const secret = url.searchParams.get('secret');
  const expected = process.env.API_SECRET;
  
  // Validar
  const match = secret === expected;
  
  return res.status(200).json({
    match: match,
    received: secret ? secret.substring(0, 10) + '...' : 'NOT_SENT',
    expected: expected ? expected.substring(0, 10) + '...' : 'NOT_CONFIGURED',
    lengths: { 
      received: secret ? secret.length : 0, 
      expected: expected ? expected.length : 0 
    }
  });
}