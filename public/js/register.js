const validate = require('validate.js')

var app = new Vue({
    el: "#app",
    delimiters:["%{","}"],
	data: {
        user : {
            username:"",
            email:"",
            password:"",
            confirmPassword:""
        }
    },
    methods: {
        selectLogin: function(){
            this.login = !this.login;
        },
        printData: function(){
            console.log(this.username + this.password)
        },
        beforePostData: function(){
            if (validate.isEmpty(this.username)) {
               alert('BOS')
               return false;
            }
            alert('DEGİL')
            return false;
            
        }
    }
});

