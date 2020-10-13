<template>
<div>
  <div class="mapdiv">
    <iframe id="map" src="https://yandex.ru/map-widget/v1/?um=constructor%3A8e0fafd1dc609402912ff0a1c40baca83569141b92fd0d8a372aa66bb9923d43&amp;source=constructor" frameborder="0"></iframe>
  </div>
</div>
</template>

<script>
export default {
name: "MapBelarus",
  created(){

  },
  methods:{
    getsizemap(){
      document.getElementById('map').body.style.height = 200+'px'
      document.getElementById('map').body.style.width = 200+'px'
    }
  }

}
</script>

<style scoped>
.mapdiv{
  width: 90%;
  margin-left: 5%;
  display: flex;
  align-self: center;
  justify-content: center;
}
#map{
  width: 90%;
  margin-left: 5%;
  margin-top: 10vh;
  height: 89vh;
  position: absolute;
  top: 0;
  left: 0;
  box-shadow: 0 0 10px 2px black;
}
</style>