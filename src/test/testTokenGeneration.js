import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const testTokenGeneration = async () => {
  try {
    const credentials = Buffer.from(
      `${process.env.DIDIT_CLIENT_ID}:${process.env.DIDIT_CLIENT_SECRET}`
    ).toString('base64');

    console.log('Testing with credentials:', {
      clientId: process.env.DIDIT_CLIENT_ID,
      baseUrl: process.env.DIDIT_API_URL || 'https://apx.didit.me'
    });

    const response = await axios({
      method: 'post',
      url: `${process.env.DIDIT_API_URL || 'https://apx.didit.me'}/auth/v2/token`,
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      data: 'grant_type=client_credentials'
    });

    console.log('Token generation successful:', {
      statusCode: response.status,
      tokenType: response.data.token_type,
      expiresIn: response.data.expires_in,
      // No mostramos el token completo por seguridad
      tokenPreview: response.data.access_token.substring(0, 10) + '...'
    });

  } catch (error) {
    console.error('Token generation failed:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
  }
};

testTokenGeneration();