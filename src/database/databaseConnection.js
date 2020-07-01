const mongoose = require("mongoose");
const config = require('./config')


let connectionURL = "";
if(config.local){
  connectionURL = `mongodb://${config.dbUri}:${config.dbPort}/${config.dbName}`;
}else{
  connectionURL = `mongodb://${config.dbUser}:${config.dbPass}@${config.dbUri}:${config.dbPort}/${config.dbName}`;
}


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
