<template>
<div>
<div class="container">
  <div class="text">Регистрация</div>
  <div class="formlogin">
    <input type="text" placeholder="Логин" id="nickname">
    <input type="email" placeholder="E-mail" id="email">
    <input type="password" placeholder="Пароль" id="firstpassword">
    <input type="password" placeholder="Повторите пароль" id="secondpassword">
    <div class="buttonlogin" v-on:click="singup">Зарегирироваться</div>

  </div>
</div>
</div>
</template>

<script>
import router from "@/routes";
import store from "@/store";

export default {
name: "SingUp",
  created() {
  },
  methods:{
    singup(){
      if (document.getElementById('nickname').value!=null&&document.getElementById('email').value!=null&&document.getElementById('firstpassword').value!=null&&document.getElementById('secondpassword').value!=null){
        if (document.getElementById('firstpassword').value == document.getElementById('secondpassword').value){
          if(document.getElementById('firstpassword').value.length >= 6){
              (async () => {
              const rawResponse = await fetch('https://liceum1.herokuapp.com/liceum/signup/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'login': document.getElementById('nickname').value,
                    'email': document.getElementById('email').value,
                    'password': document.getElementById('firstpassword').value,
                })
              });
              const content = await rawResponse.json();

              console.log(content.code);
              if (content.code == 304){
                store.commit('auth', {name: content.username, score: content.score})
                router.push('/')
              }else if (content.code == 0){
                let r = window.confirm('Пользователь с таким именем уже существет. Может вы хотели войти?')
                if (r == true) {
                  router.push('/singin')
                } else {
                  document.getElementById('nickname').value = ''
                }
              }
            })();
          }else {alert('Количество символов должно быть минимум 6')}
        }else{alert('Пароли не совпадают')}
      }else{alert('Заполните все строки')}
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