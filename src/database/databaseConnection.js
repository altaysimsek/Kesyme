const mongoose = require("mongoose");

const config = {
  dbName: "twtClone",
};

const connectionURL = `mongodb://127.0.0.1:27017/${config.dbName}`;

try {
  mongoose.connect(connectionURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
  console.log(`✅ - ${config.dbName} database bağlantısı başarılı.`);
} catch (error) {
  console.log('💢Veritabanına bağlanırken bir hata meydana geldi.')
}
