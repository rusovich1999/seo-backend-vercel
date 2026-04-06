export default async function handler(req, res) {
  return res.status(200).json({
    API_SECRET_SET: !!process.env.API_SECRET,
    API_SECRET_LENGTH: process.env.API_SECRET?.length,
    DEFAULT_PHONE: process.env.DEFAULT_PHONE,
    NODE_ENV: process.env.NODE_ENV
  });
}