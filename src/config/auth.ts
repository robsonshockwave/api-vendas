export default {
  jwt: {
    secret: process.env.APP_SECRET || 'SecretParaTesteNoJest',
    expiresIn: '1d',
  },
};
