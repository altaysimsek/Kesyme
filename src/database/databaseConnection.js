const mongoose = require("mongoose");



let connectionURL = process.env.MONGODB_URI || "mongodb://localhost:27017/kesyBase";



try {
  mongoose.connect(connectionURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
  console.log(`✅ - database bağlantısı başarılı.`);
} catch (error) {
  console.log("💢 - Veritabanına bağlanırken bir hata meydana geldi : "+error.message);
}
