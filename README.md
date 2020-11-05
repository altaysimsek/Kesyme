
<p align="center">
  <a href="https://github.com/altaysimsek/shortcutIO">
    <img alt="blazingfastjs" src="./public/image/kesylogo.png" width="150" />
  </a>
</p>
<p align="center">It's a kesy url shortener</p>

---
## 🔱Purpose

I'm trying to improve my backend and also my javascript skills. Basically , i think making a project is the best way to learn something so used this tech;

**Express** on backend, 

- Understaning, creating APIs
- Routing
- How web works

are the best topic for this project


**CSS framework Bootstrap , little bit Vue** on frontend, i prepared the page from scratch, you can see vue on register and login page but it's on development mode 😅

---

It's not work stably because lots of the features are not developed yet.
If you tell me my mistakes and shortcoming, I'll be happy 😀
I have prepared a to-do list at the bottom so you can see what I'm trying to do.
  
**Stuck points**

- Keep secret informations about users (encrypting password with bcrypt package but i'm not sure).
- Creating same short code for different links with shordID package ?

**To-Do List**
    
Frontend :
- [x] Prepare cards which introduce the app.
- [x] Prepare login register modal.
- [x] Return short url to user/client.
  - [ ] Showing errors to users.
      - [x] Return of empty or bad url.
      - [ ] Sending error of invalid link. 
- [ ] Showing errors about register to user.
  - [x] If the forms completed empty or wrong , show error to user.
  - [ ] If there is a same username and email , show error to user.

Backend : 
- [ ] Shortening shortened links causes a loop situation.
- [ ] Blank or incorrect link sending situation.
- [ ] Prepare to login - register system 
  - [x] Enrypting the password.
    - [x] Encrypting the password while updating.
- [ ] I forgot my password ?
- [ ] Preparation of the middleware for token verification. 

## LICENSE

[MIT License](/LICENSE)
