<p align="center">
  <a href="https://github.com/altaysimsek/shortcutIO">
    <img alt="blazingfastjs" src="./public/image/kesylogo.png" width="150" />
  </a>
</p>
<p align="center">It's a kesy url shortener</p>

---

Stabil olarak çalışmasada şuan kullanilabilir durumda.

Hata ve eksiklerimi bana söylerseniz çok mutlu olurum 😀

Alt tarafta bir to-do listesi hazırladım böylece yapmaya uğraştığım işleri görebilirsiniz 
  
```
  Ufak bir not ücretsiz olarak 500 mb 'lik mongodb kullanmaktayım fazla kayıt eklendiğinde sistem kitlenebilir.
```
  


**Takıldığım Noktalar**
- Kullanıcı bilgilerini gizli tutabilmek (bcrypt paketi ile parolaları şifleriyorum fakat yinede emin değilim.)
- shortID paketinin farklı linkler için aynı kodu üretmesi

**To-Do List**
    
Frontend :
- [x] Siteyi tanıtan cardların hazırlanması.
- [x] Login register modallerinin hazırlanması.
- [x] Kullanıcıya kısa url'nin geri dönmesi.
  - [ ] Kullanıcaya hataların gösterilmesi
      - [x] Boş veya hatalı bağlantının hatasının gönderilmesi.
      - [ ] Geçersiz bağlantının hatasının gönderilmesi. 
- [ ] Register bölümünde hataların kullanıcıya gösterilmesi
  - [x] Formu boş bırakma veya hatalı doldurma 
  - [ ] Benzer kullanıcı adı veya email olması halinde hatanın gösterilmesi
Backend : 

- [ ] Kısaltılan linkleri kısaltıp loop etme durumunun düzeltilmesi.
- [ ] Boş veya yanlış link gönderilmesi durumu.
- [ ] Login register sisteminin hazırlanması 
  - [x] parolanın şifrelenmesi
    - [x] parolanın değiştiğinde şifrelenmesi
- [ ] Şifremi unuttum ?
- [ ] /dashboard sayfalarında token doğrulaması için middleware hazırlanması

