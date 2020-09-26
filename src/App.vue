<template>
  <div id="app">
    <Navbar/>
    <router-view class="routelink"></router-view>
    <Footer/>
  </div>
</template>

<script>

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default {
  name: 'App',
  components: {
    Footer,
    Navbar

  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.routelink{
  display: flex;
  min-height: 95vh;
  flex-direction: column;
}
</style>
