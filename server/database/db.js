module.exports = {
  uri: process.env.DATABASE_URI,
  config: {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
};
