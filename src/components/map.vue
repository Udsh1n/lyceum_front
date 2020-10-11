<template>
    <div>
        <div class="map">
          <p class="titlemap"><span>KAPTA </span></p>

          <div class="mapcontent">
            <div class="mapppoints">
            <div v-for="r in $attrs.testdata.length" :key="r.id" class="mappoint">
              <span v-if="currentquestion+1 == r" class="mappointborder">{{ r }}</span>
              <span v-else>{{ r}}</span>
            </div>
          </div>

          <div class="questionanswer">
            <p class="question">{{ $attrs.testdata[currentquestion].question }} <span v-if="question">?</span></p>
            <div class="questionvariatsanswer" v-if="question" >
              <div v-for="i in 4" :key="i.id" class="answerchoice" v-on:click="ChooseVariant(i-1)">{{ $attrs.testdata[currentquestion].variants_set[i-1] }}</div>
            </div>
            <div v-if="!question" class="answerimage" v-on:click="OpenGoogleMaps(truthVar.data.pointgooglemap)">
              {{ truthVar.data.truthvariant }}
            </div>
            <div v-if="!question" class="answer">
                <span v-if="ifright == true"><span class="uright truth animate__animated animate__shakeY" >&#10004;</span><span style="text-align: center; width: 100%; display: block">+15</span></span>
                <span v-if="ifright == false"><span   class="uright wrong animate__animated animate__shakeX">&#10008;</span><span style="text-align: center; width: 100%; display: block">+0</span></span>
            </div>
            <div class="nextbutton" v-if="!question" v-on:click="Nexta()">
              Next
            </div>
          </div>
          </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import store from "@/store";
    export default {
        name: "map",
      data(){
          return {
            question: true,
            ifright: false,
            currentquestion: 0,
            totalscore: 0,
            truthVar: '',
            answerhistory: []
          }
      },
      mounted() {
        this.calculatecssparms()
      },
      methods: {
          calculatecssparms(){
            let heightmap =  Math.floor((((document.documentElement.clientHeight / 10)*9)/10)*8/70)
            console.log(heightmap)
          },
          OpenGoogleMaps(link){
            window.open(link, '_blank');
          },
          async ChooseVariant(number){
            let truthvar = await axios.get( 'https://liceum1.herokuapp.com/liceum/truth', {params: {id: this.currentquestion+1}});
            let truthvariant = truthvar.data.truthvariant
            let choosevar = this.$attrs.testdata[this.currentquestion].variants_set[number]
            this.truthVar=truthvar
            // document.querySelector('.mappoint').classList.add('mappointborder')
            if (truthvariant == choosevar){
              console.log('Right')
              this.totalscore = this.totalscore+15
              this.question = false
              this.ifright = true
              this.answerhistory.push('truth')
              document.querySelectorAll('.mappoint')[this.currentquestion].setAttribute('style', 'background-color: green;')

            }else{
              this.question = false
              this.ifright = false
              this.answerhistory.push('mistake')
              document.querySelectorAll('.mappoint')[this.currentquestion].setAttribute('style', 'background-color: red;')
              console.log('Wrong')
            }

          },
          Nexta(){
            if (this.$attrs.testdata.length-1 == this.currentquestion){
              alert('End. Your score: '+store.state.score)
              store.commit('changescore', {score: this.totalscore})
              this.setscore()
            }else{
              this.currentquestion+=1
              this.question = true
            }
        }
      }
    }
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Caveat&display=swap');
.map{
  height: 88vh;
  margin-left: 5%;
  width: 90%;
  background-image: url("../assets/old-paper.jpg");
  font-family: 'Indie Flower', cursive;
  color: #3e2d19;
  box-shadow: 0 0 15px 5px #343434;
  margin-top: 15px;
}
.titlemap{
  text-align: center;
  height: 10%;
  margin-bottom: 0;
  font-size: 3em;
  display: flex;
  justify-content: flex-end;
}
.titlemap span{
  width: 90%;

}
.mapppoints{
  margin-left: 5%;
  width: 10%;
  height: 50%;
  display: flex;
  flex-direction: column;
}
.mappoint{
  width: 50px;
  height: 50px;
  background-color: #262626;
  border-radius: 50%;
  box-shadow: 0 0 15px 5px rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-content: center;
  margin-bottom: 20px;
  color: white;
}
.mappointborder{
  border: 2px solid white;
  border-radius: 50%;
}
/*.mappoint:nth-child(1){*/
/*  background-color: green;*/
/*}*/
/*.mappoint:nth-child(2){*/
/*  background-color: red;*/
/*}*/
/*.mappoint:nth-child(3){*/
/*  background-color: red;*/
/*}*/
/*.mappoint:nth-child(4){*/
/*  border: 2px solid white;*/
/*}*/
.mappoint span{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
}
.mapcontent{
  display: flex;
  height: 90%;
}
.question{
  text-align: center;
  font-size: 3vw;
  font-family: 'Caveat', cursive;;
}
.answerimage{
  width: 90%;
  height: 80%;
  background-image: url("../assets/minsk.jpg");
  background-position: top;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15vw;
  font-weight: 600;
  color: white;
  font-family: 'Caveat', cursive;
  box-shadow: 0 0 15px 5px rgba(0,0,0,0.5);
  text-shadow: 15px 15px 10px  black, 0 0 1em red;
}
.answerimage:hover{
  cursor: pointer
}
.questionanswer{
  width: 90%;
  height: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.uright{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 5px solid #1C1C1C;
  margin-top: 10px;
  font-size: 1.4em;
  color: #1C1C1C;
  transition: .16s;
}
.truth{
  background-color: green;
}
.wrong{
  background-color: red;
}
.uright:hover{
  font-size: 2.4em;
  cursor: pointer;
  transition: .16s;
}
.answer{
  display: flex;
  align-items: center;
  flex-direction: row;
}
.questionvariatsanswer{
  width: 90%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
}
.questionvariatsanswer:hover{
  cursor: pointer;
}
.answerchoice{
  width: 50%;
  height: 50%;

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 5vw;
}
.answerchoice:hover{
  text-decoration: underline;
  transition: .1s;
}
.answerchoice:nth-child(1){
    border-right: 2px solid grey;
    border-bottom: 2px solid grey;
}
.answerchoice:nth-child(2){
    border-bottom: 2px solid grey;
}
.answerchoice:nth-child(3){
    border-right: 2px solid grey;
}
.nextbutton{
  display: flex;
  width: 60%;
  border: 2px solid #3e2d19;
  border-radius: 20px;
  height: 10%;
  justify-content: center;
  align-items: center;
  font-size: 3vw;
  transition: .1s;
}
.nextbutton:hover{
  background-color: #3e2d19;
  cursor: pointer;
  color: white;
  opacity: .9;
  transition: .1s;
}
</style>