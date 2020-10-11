<template>
<div>
<div class="container">
  <div class="text">Авторизация</div>
  <div class="formlogin">
    <input type="text" placeholder="Логин" id="loginvalue">
    <input type="password" placeholder="Пароль" id="passwordvalue">
    <div class="buttonlogin" v-on:click="login">Войти</div>

  </div>
</div>
</div>
</template>

<script>
import router from "@/routes";
import store from "@/store";

export default {
name: "SingIn",

  created() {

  },
  components:{

  },
  methods:{
   async login(){
     if (document.getElementById('loginvalue').value.trim() != '' && document.getElementById('passwordvalue').value.trim() != ''){
     (async () => {
      const rawResponse = await fetch('https://liceum1.herokuapp.com/liceum/login/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'login': document.getElementById('loginvalue').value.trim(),
            'password': document.getElementById('passwordvalue').value.trim(),
        })
      });
      const content = await rawResponse.json();
      if (content.code == 200){
        store.commit('auth', {name: content.name, score: content.score})
        console.log(store.state.nickname)
        router.push('/')
      }else if (content.code == 404){
        alert(content.message)
        document.getElementById('passwordvalue').value = ''
      }else if (content.code == 1){
        alert(content.message)
        document.getElementById('passwordvalue').value = ''
        document.getElementById('loginvalue').value = ''
      }
      console.log(content);
    })();
   }else{
       alert('Заполните все поля')
     }
   }
  }
}
</script>

<style scoped>
.text{
  font-size: 2em;
  width: 100%;
  text-align: center;
  margin-top: 5%;
  margin-bottom: 50px;
}
.formlogin{
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;

}
.formlogin input{
  margin-bottom: 20px;
  width: 50%;
  height: 40px;
}
.buttonlogin{
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #A6A6A6;
  border-radius: 5px;
  height: 40px;
  transition: .16s;

}
.buttonlogin:hover{
  background-color: #1317a5;
  color: #A6A6A6;
  transition: .16s;
  cursor: pointer;
}
</style>