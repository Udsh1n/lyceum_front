<template>
<nav class="navbar navbar-expand-lg sticky-top navbar-light bg-light">
  <router-link class="navbar-brand" to="/"><img src="../assets/logo.png"><span class="LyceumNavbarText">Lyceum</span></router-link>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav" >

      <li class="nav-item" >
        <router-link class="nav-link" to="/singin"  v-if="!auth">Вход</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/singup"  v-if="!auth">Регистрация</router-link>
      </li>
      <li class="nav-item">
        <span class="nav-link"  v-if="auth">{{ name }}: </span>
      </li>
      <li class="nav-item">
        <span class="nav-link" v-if="auth">{{ score }}</span>
      </li>
      <li class="nav-item">
        <span  class="nav-link logout" v-on:click="logout" v-if="auth">Выход</span>
      </li>

    </ul>
  </div>
</nav>
</template>

<script>

import store from "@/store";

export default {
name: "navbar",
  computed: {
    auth() {
      return store.state.isAuth
    },
    name(){
      return store.state.nickname
    },
    score(){
      return store.state.score
    },
  },
  methods:{
  logout(){
    store.commit('logout')
  }
  }
}
</script>

<style scoped>
.navbar .navbar-brand img {
  height: 80%;
  padding-top: 15px;
  padding-bottom: 15px;
}
.navbar .LyceumNavbarText {
  font-size: 110%;
  padding-left: 10px;
  color: #01059D;
  font-family: "Lato", sans-serif;
}
.navbar #navbarNav {
  /*display: flex;*/
  justify-content: flex-end;
}
.logout{cursor: pointer}
</style>