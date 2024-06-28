export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  sga: {
    username: process.env.SGA_USERNAME,
    password: process.env.SGA_PASSWORD,
  },
});
