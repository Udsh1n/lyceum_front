<template>
<div>

  <section class="main">
    <div class="container">
      <div class="col-md-6 leftside leftpoints">
        <img src="@/assets/leftpoints.svg" alt="">
      </div>
      <div class="col-md-6 leftside startButton">
        <div class="start" v-on:click="start">
          <span>Старт</span>
        </div>
      </div>
      <div class="col-md-6 rightside motivatetext">Пройди викторину на знание<br>культурных зданий Беларуси.<br/>Узнай что ты можешь нажав на<br>кнопку СТАРТ слева</div>
      <div class="col-md-6 rightside rightpoints" ><img src="@/assets/rightpoints.svg" alt=""></div>
    </div>
  </section>

  <!-- Top players -->
  <section>
    <div class="container">
      <div class="topplayers">
        <div class="topline">
        <img src="img/goldkorona.svg" alt=""><span>Top Players</span>
        </div>
        <div class="dashboard">
          <div class="block">
            <div class="place" style="border-top: 2px solid #A6A6A6; border-radius: 20px 20px 0 0;">
              <div class="imageplace">
                <img src="../assets/goldkorona.svg" class="korona" alt="">
              </div>
                <span class="nickname">{{ top.data.list[0] }}</span>
            </div>
            <div class="place">
              <div class="imageplace">
                <img src="../assets/silverkorona.svg" style="fill: #C0C0C0" class="korona" alt="">
              </div>
              <span class="nickname">{{ top.data.list[1] }}</span>
            </div>
            <div class="place">
              <div class="imageplace">
                <img src="../assets/bronzekorona.svg" class="korona" alt="">
              </div>
              <span class="nickname">{{ top.data.list[2] }}</span>
            </div>
            <div class="place"><div class="placenumber"><span class="number">#4</span></div><span class="nickname">{{ top.data.list[3] }}</span></div>
            <div class="place"><div class="placenumber"><span class="number">#5</span></div><span class="nickname">{{ top.data.list[4] }}</span></div>
            <div class="place"><div class="placenumber"><span class="number">#6</span></div><span class="nickname">{{ top.data.list[5] }}</span></div>
            <div class="place"><div class="placenumber"><span class="number">#7</span></div><span class="nickname">{{ top.data.list[6] }}</span></div>
            <div class="place"><div class="placenumber"><span class="number">#8</span></div><span class="nickname">{{ top.data.list[7] }}</span></div>
            <div class="place"><div class="placenumber"><span class="number">#9</span></div><span class="nickname">{{ top.data.list[8] }}</span></div>
            <div class="place"><div class="placenumber"><span class="number">#10</span></div><span class="nickname">{{ top.data.list[9] }}</span></div>


            <div class="place" style="border-radius: 0 0 20px 20px;"><div class="placenumber"><span class="number">#{{ top.data.list[10]+1 }}вы:</span></div><span class="nickname">{{ nick }}</span></div>
          </div>
        </div>
      </div>
    </div>
  </section>

</div>
</template>

<script>
// let truthvar = await axios.get( 'https://liceum1.herokuapp.com/liceum/truth', {params: {id: this.questionnumber+1}});
import router from "@/routes";
import store from "@/store";
import axios from 'axios'
export default {
name: "mainpage",
  data(){
    return{
      top: [],
      nick: store.state.nickname
    }
  },
  created(){
    this.topplayers()
  },
  methods:{
    start(){
      if (store.state.isAuth == true){
       router.push('/test')
      }else{
        if (confirm('Сначала нужно авторизоваться. Перейти на страницу входа?')){
          router.push('/singin')
        }
      }
    },
    async topplayers(){
      let topplayer = await axios.get( 'https://liceum1.herokuapp.com/liceum/getrating', {params: {'variant': 'all', 'nickname': 'Elisha'}});
      this.top = topplayer
      console.log(topplayer)
    }
  }
}
</script>

<style scoped>
.main {
  background-image: linear-gradient(to bottom right, #01059D, #134cb7);
  height: 70vh;
  display: flex;
}
.main .container {
  align-self: flex-end;
  height: 90%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
}
.main .leftside {
  height: 50%;
  width: 50%;
  display: flex;
}
.main .rightside {
  height: 50%;
  width: 50%;
  /*	align-content: flex-end;*/
}

.start {
  transition: 0.16s;
  display: flex;
  justify-content: center;
  align-self: center;
  width: 70%;
  background-color: #E0E0E0;
  height: 50%;
  color: #363636;
  border-radius: 20px;
  opacity: 0.7;
}
.start span {
  font-family: "Lato", sans-serif;
  font-size: 200%;
  align-self: center;
}
.start:hover {
  color: #2B2B2B;
  box-shadow: 10px 10px 15px 10px #888888;
  transition: 0.16s;
  cursor: pointer;
}

.leftpoints img {
  width: 70%;
  height: 50%;
}

.motivatetext {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #DDDDDD;
  font-size: 1.5em;
  font-weight: 200;
}

.rightside {
  display: flex;
}

.rightpoints img {
  width: 70%;
  height: 50%;
  align-self: center;
}

.topline {
  margin-top: 40px;
  justify-content: center;
  display: flex;
}
.topline span {
  align-self: center;
  font-family: "Lato", sans-serif;
  font-size: 2.5vw;
}

.dashboard {
  height: 700px;
  background-color: #242424;
  width: 70%;
  margin-top: 50px;
  margin-left: 15%;
  border-radius: 20px;
  box-shadow: 0px 0px 20px 10px #888888;
  display: flex;
}
.dashboard .block {
  width: 90%;
  height: 90%;
  margin-left: 5%;
  align-self: center;
}
.dashboard .place {
  height: 9.090909091%;
  display: flex;
  border-bottom: 2px solid #A6A6A6;
  border-right: 2px solid #A6A6A6;
  border-left: 2px solid #A6A6A6;
}
.dashboard .place .korona {
  height: 100%;
}
.dashboard .place .nickname {
  color: white;
  font-family: "Lato", sans-serif;
  font-size: 120%;
  align-self: center;
}
.dashboard .place .imageplace {
  display: flex;
  justify-content: center;
  width: 10%;
}
.dashboard .place .placenumber {
  display: flex;
  justify-content: center;
  align-self: center;
  width: 10%;
}
.dashboard .place .placenumber .number {
  color: white;
  font-size: 130%;
}

</style>