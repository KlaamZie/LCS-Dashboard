import axios from 'axios';
import auth0 from '@/lib/auth0';

export default auth0.requireAuthentication(async (req, res) => {
  const tokenCache = auth0.tokenCache(req, res);
  const { accessToken } = await tokenCache.getAccessToken();

  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
    params: req.query,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return res.status(200).json({
    products: data.products,
    number: data.number,
    limit: data.limit,
  });
});
