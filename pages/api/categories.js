import axios from 'axios';
import auth0 from '@/lib/auth0';

export default auth0.requireAuthentication(async (req, res) => {
  const tokenCache = auth0.tokenCache(req, res);
  const { accessToken } = await tokenCache.getAccessToken();

  const { data } = await axios.get('http://localhost:4000/categories', {
    params: req.query,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return res.status(200).json({
    categories: data.categories,
    number: data.number,
    limit: data.limit,
  });
});