import {getAccessToken, withApiAuthRequired} from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async function handler(req, res) {
  try {
    const {accessToken} = await getAccessToken(req, res, {
      audience: process.env.AUTH0_AUDIENCE,
      grant_type:"client_credentials"
    });
    res.status(200).json({accessToken});
  } catch (error) {
    console.log(error)
    res.status(error.status || 500).json({error: error.message});
  }
});