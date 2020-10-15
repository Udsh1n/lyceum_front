<template>
<div>
  <div class="mapdiv">
    <div id="fline">
      <i v-for="n in infotest" :key="n.id" class="mapmarker fas fa-map-marker"   v-on:click="clickonmarker(n.id-1)"></i>
    </div>
    <div class="info" v-if="seen">
      {{ textinfo }}
    </div>
  </div>
</div>
</template>
<script>
export default {
name: "MapBelarus",
  data(){
    return{
      infotest: [],
      seen: false,
      textinfo: '',
      currentnum: null
    }
  },
  mounted(){
    this.startgetsizefunc(),
    this.gettestquestion()
  },
  // updated() {
  //   this.get_size_and_paddings_elements()
  // },
  methods:{
    get_size_and_paddings_elements(){
      let intElemOffsetHeight = document.getElementById('fline');
      let markers = document.querySelectorAll('.mapmarker')
      let idmarker = 0
      while (idmarker < markers.length){
        let paddingtop = Math.floor(Math.random() * (Math.round(intElemOffsetHeight.clientHeight / 4) * 3 - Math.round(intElemOffsetHeight.clientHeight / 4) + 1) + Math.round(intElemOffsetHeight.clientHeight / 4));
        markers[idmarker].setAttribute('style', 'padding-bottom: '+ paddingtop+'px; width:'+intElemOffsetHeight.clientWidth/markers.length+'px')
        idmarker +=1
      }
    },
    startgetsizefunc(){
      setTimeout(() => {  this.get_size_and_paddings_elements() }, 1000);
    },
    async gettestquestion(){
      this.infotest = await fetch('https://liceum1.herokuapp.com/liceum/testprocess').then(response => response.json())
    },

    clickonmarker(num){
      if(this.currentnum == num){
        this.seen =!this.seen
      }else{
        this.currentnum = num
        this.seen = true
      }
      this.infotest[num].question
      this.textinfo = this.infotest[num].question
      console.log(num)
    },
  }

}
</script>

<style scoped>
.mapdiv{
  width: 90%;
  height: 88vh;
  margin-left: 5%;
  display: flex;
  align-self: center;
  justify-content: center;
  background-image: url("../assets/old-paper.jpg");
  box-shadow: 0 0 15px 5px #343434;
  margin-top: 15px;
}
.mapmarker{
  color: grey;
  font-size: 1.5em;
  display: flex;
  justify-content: center;
  transition: .1s;
  /*top: 0;*/
  /*left: 0;*/
  /*right: 0;*/
  /*left: 0;*/
}
.mapmarker:hover{
  color: #ff3b3b;
  font-size: 3em;
  cursor: pointer;
  transition: .1s;

}
#fline{
  width: 90%;
  margin-left: 5%;
  height: 45%;
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
}
.info{
  display: flex;
  position: absolute;
  background-color: white;
  border: 1px solid #1c1c1c;
  border-radius: 5px;
  padding: 10px;
  margin-top: 45vh;
}

</style>