const mongoose = require("mongoose");



let connectionURL = process.env.MONGOLAB_URI;



try {
  mongoose.connect(connectionURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
  console.log(`✅ - ${config.dbName} database bağlantısı başarılı.`);
} catch (error) {
  console.log("💢 - Veritabanına bağlanırken bir hata meydana geldi.");
}
