const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema(
  {
    title: { type: String, require: true },
  },
  { timestamps: true } //oluşturulduğu zamanı bilmek için
);

const Category = mongoose.model("categories", CategorySchema); //categories:veri  tabanı ismim alacağı yerde yukarıdaki CategorySchema kısmı
module.exports = Category;