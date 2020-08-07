const axios = require("axios")
const validate = require('validate.js')

new Vue({
  el: "#app",

  data: {
    user:{
		username: "",
		password: "",
		email: ""
	}
  },
  methods: {
    postIt: function (event) {
      
      axios.post("/register",{
        username: this.user.username,
        email: this.user.email,
        password: this.user.password
      }).then(function ({data}) {
        console.log(data)
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  },
});
