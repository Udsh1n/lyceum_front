<template>
<div>
<!--  <div class="container test" v-if="infotest != ''" >-->
<!--    <div class="textwithquestion">-->
<!--      {{infotest[questionnumber].question}}?-->
<!--    </div>-->
<!--    <div class="quiestion">-->
<!--      <span>{{points}} очков</span>-->
<!--      <div class="variantscoose" v-for="n in infotest[questionnumber].variants_set" :key="n.id">-->
<!--        <input type="radio" class="cards"  name="card" v-bind:value="n">-->
<!--        <label>{{ n }}</label><br>-->
<!--      </div>-->
<!--    </div>-->
<!--    <div class="buttonsubmitask" v-on:click="checkquestion">-->
<!--      <div class="button">Подтвердить</div>-->
<!--    </div>-->

<!--  </div>-->
<!--  <div v-else class="loading">-->
<!--    Loading...-->
<!--  </div>-->

<!--  <div class="endtest" v-if="endblock">-->
<!--    <p>Тест окончен!</p>-->
<!--    <p>Ваш результат {{ points }}</p>-->
<!--  </div>-->
  <div class="map" v-if="hors">
        <maproad v-bind:testdata="infotest"/>
  </div>
</div>
</template>

<script>
// import axios from 'axios'
// import store from "@/store";
// import router from "@/routes";
import maproad from "../components/map";

export default {
name: "test",
  data(){
    return{
      infotest: '',
      questionnumber: 0,
      points: 0,
      endblock: false,
      hors: true
    }
  },
  methods:{
    // async checkquestion(){
    //   if (document.querySelector('.cards:checked') == null){
    //     alert('Сделайте выбор')
    //   }else{
    //     let truthvar = await axios.get( 'https://liceum1.herokuapp.com/liceum/truth', {params: {id: this.questionnumber+1}});
    //     console.log(document.querySelector('.cards:checked').value)
    //     console.log(truthvar.data.truthvariant)
    //     if (this.infotest[this.infotest.length-1].id-1 != this.questionnumber) {
    //       if (document.querySelector('.cards:checked').value == truthvar.data.truthvariant) {
    //         this.points +=15
    //         this.questionnumber += 1;
    //         document.querySelector('.cards').checked = false
    //       } else {
    //         this.questionnumber += 1;
    //       }
    //     }else{
    //       if (document.querySelector('.cards:checked').value == truthvar.data.truthvariant){this.points +=15}
    //       this.setscore()
    //       store.commit('changescore', {score: this.points})
    //       document.querySelector('.test').setAttribute('style', 'display: none')
    //       this.endblock = true
    //     }
    //   }
    //   // console.log(document.querySelector('input[name="card"]:checked').value)
    // },
    async gettestquestion(){
      this.infotest = await fetch('https://liceum1.herokuapp.com/liceum/testprocess').then(response => response.json())
    },
  },
  created() {
    this.gettestquestion()
  },
  components:{
    maproad,
  }
}
</script>

<style scoped>
.textwithquestion{
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 2em;
  margin-top: 40px;
}
.buttonsubmitask{
  width: 100%;
  display: flex;
  justify-content: center;
}
.buttonsubmitask .button{
  width: 50%;
  background-color: #1c1c1c;
  color: #C0C0C0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  border-radius: 10px;
  transition: .16s;
}
.buttonsubmitask .button:hover{
  cursor: pointer;
  border: 1px solid #1c1c1c;
  color: #1c1c1c;
  background-color: #fff;
  transition: .16s;
}
.loading{
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.5em;

}
</style>