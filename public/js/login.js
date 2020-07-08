var app = new Vue({
    el: "#app",
    delimiters:["%{","}"],
	data: {
        user : {
            username:"",
            password:"",
        }
    },
    methods: {
        selectLogin: function(){
            this.login = !this.login;
        },
        printData: function(){
            console.log(this.username + this.password)
        }
    }
});

