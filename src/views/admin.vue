<template>
<div>
  <div v-if="!auth">
    <p class="authadmin">Login Admin Panel</p>
    <div class="inputs">
      <p>Login</p>
      <input type="text" id="login">
      <p>Password</p>
      <input type="password" id="password">
    </div>
    <div class="buttonlog" v-on:click="CheckLogInputs">
      <div class="btn-log">LogIn</div>
    </div>
  </div>
  <div v-else>
<table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Вопрос</th>
      <th scope="col">Ответ</th>
      <th scope="col">Ссылка на Google Maps(только для правильного ответа)</th>
      <th scope="col">Ссылка на изображение(только для правильного ответа)</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="n in infotest" :key="n.id">
      <th scope="row">{{ n.numonlist }}</th>

      <td class="questiontd">
        <span class="questionspan">{{n.question}}</span>
        <span class="edit" v-on:click="editquestion(n.id, n.numonlist, 'toedit')">
          <i v-if="!editquestionstatus" class="fas fa-pen-square"></i>
        </span>
      </td>

      <td>
        <p class="varianttruthanswers" v v-for="g in n.variants_set" :key="g.id" v-on:click="changetruthvariant(n.id, g)" >
          <span v-if="g == n.truth" style="color: red">{{ g }}</span>
          <span v-else>{{g}}</span>
        </p>
      </td>

      <td>
        <input class="mapslink" type="text" :value="n.linkongooglemaps" v-on:change="changelinkongooglemaps(n.id, n.numonlist)">
      </td>

      <td><input class="answerimagelink" type="text" :value="n.truthvariantimage" v-on:change="changelinkontruthvariantimage(n.id, n.numonlist)"></td>
      <td><i class="deleteicon fas fa-trash" v-on:click="deletequestion(n.id, n.numonlist)"></i></td>
    </tr>

  <tr v-if="adding">
      <th scope="row">N/A</th>
      <td>
        <input  id="addquestioninput" type="text" placeholder="Вопрос">
      </td>
      <td>
        <input  class="addvariantinput" type="text" placeholder="#1"><br/>
        <input  class="addvariantinput" type="text" placeholder="#2"><br/>
        <input  class="addvariantinput" type="text" placeholder="#3"><br/>
        <input  class="addvariantinput" type="text" placeholder="#4">
      </td>
    <td><input  id="addgooglemapslink" type="text" placeholder="Google maps"></td>
    <td><input  id="addimagelink" type="text" placeholder="Link on image"></td>
    </tr>

  </tbody>
</table>
      <hr/>
    <div class="addquestion" v-on:click="addquestion">
      {{ textaddbutton }}
    </div>
  </div>

  <div class="alertbox" v-if="alertseen">
    <div class="alert animate__animated animate__backInRight">
       {{alerttext}}
    </div>
  </div>

</div>
</template>

<script>
export default {
name: "admin",
  data(){
    return{
      auth: false,
      infotest: [],
      editquestionstatus: false,
      alerttext:'Обновлено',
      alertseen: false,
      adding: false,
      textaddbutton: 'ADD'
    }
  },
  created() {
    this.gettestquestion()
  },
  methods:{
    CheckLogInputs(){
      let login = document.getElementById('login').value.trim()
      let password = document.getElementById('password').value.trim()
      console.log(login)
      console.log(password)
      if (login == 'adminlyceum' && password == 'helloworld154'){
        this.auth = true
      }else{
        alert('Непрвильное сочетание логина и пароля')
      }
    },
    async gettestquestion(){
      this.infotest = await fetch('https://liceum1.herokuapp.com/liceum/testprocess').then(response => response.json())
    },
    async changelinkongooglemaps(id,number){
      console.log('Try change google maps link to '+number+' question', document.querySelectorAll('.mapslink')[number-1].value)
      await fetch('https://liceum1.herokuapp.com/liceum/changegooglemapslink/', {
        method: 'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'id': id,
          'link': document.querySelectorAll('.mapslink')[number-1].value,
        })
      })
      this.gettestquestion()
      this.alertfunc('Ссылка обновлена')
    },
    async changelinkontruthvariantimage(id,number){
      console.log('Try change truth answer link to '+number+' question', document.querySelectorAll('.mapslink')[number-1].value)
      await fetch('https://liceum1.herokuapp.com/liceum/changetruthanswerimaglink/', {
        method: 'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'id': id,
          'link': document.querySelectorAll('.answerimagelink')[number-1].value,
        })
      })
      this.gettestquestion()
      this.alertfunc('Ссылка обновлена')
    },
    async changetruthvariant(numquestion, strvar){
      await fetch('https://liceum1.herokuapp.com/liceum/changetruthvariant/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          questionnumber: numquestion,
          variantstring: strvar
        })
      })
      this.alertfunc('Сменено на '+ strvar)
      this.gettestquestion()
    },
    async editquestion(id, num, vars){
      console.log('Try change '+ num+' variants with id: '+id)
      if (vars == 'toedit'){
        let question = this.infotest[num-1].question
        document.querySelectorAll('.questionspan')[num-1].innerHTML = '<input class="changedinput" type="text" value="'+question+'">'
        let localThis = this
        document.querySelectorAll('.questionspan')[num-1].addEventListener("change", async function() {
          console.log(document.querySelectorAll('.changedinput')[0].value)
          let newquestion = document.querySelectorAll('.changedinput')[0].value
        await fetch('https://liceum1.herokuapp.com/liceum/changequestion/', {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: id,
            num: num,
            newquestion: newquestion
          })
        })
          localThis.alertfunc(newquestion)
          localThis.gettestquestion()
        })
      }
    },
    async deletequestion(id, num){
      const rawResponse = await fetch('https://liceum1.herokuapp.com/liceum/removequestion/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'id': id,
            'num': num,
        })
      });
      const content = await rawResponse.json();
      this.gettestquestion()
      if (content.code == 200){
        this.alertfunc('Успешно удалено')
      }else if (content.code == 0){
        this.alertfunc('Ошибка, возможно уже удалено')
      }else {
        this.alertfunc('Неизвестная ошибка')
      }
    },
    async addquestion(){
      if (this.adding == false){
        this.adding = true
        this.textaddbutton = 'Save'
      }else{
        // question
        let getquestiontext = document.getElementById('addquestioninput').value
        // Variants
        let listvariants = []
        let getquestionvariants = document.querySelectorAll('.addvariantinput')
        let i;
        for (i = 0; i < 4; i++){
          listvariants.push(getquestionvariants[i].value)
        }
      //  Link on Google maps
        let linkmaps = document.getElementById('addgooglemapslink').value
      //  link on image
        let linkimage = document.getElementById('addimagelink').value
      console.log(listvariants)
        console.log('try save', getquestiontext, getquestionvariants, linkmaps, linkimage)
        if (getquestiontext != '' && listvariants[0] !='' && listvariants[1] !='' && listvariants[2] != '' && listvariants[3] != '' && linkimage !=''){
          let body = JSON.stringify({
            questiontext: getquestiontext,
            variants: listvariants,
            linkongooglemaps: linkmaps,
            linkonimage: linkimage
          })
          //Request
        const rawResponse = await fetch('https://liceum1.herokuapp.com/liceum/addquestion/', {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
          body: body
        });
        const content = await rawResponse.json();
        this.adding = false
        this.textaddbutton = 'ADD'
        this.gettestquestion()
        this.alertfunc('Успешно создано')
        console.log(content)
        }else{
          this.alertfunc('Все поля обязательный кроме ссылки на Google maps')
        }
      }
    },
    alertfunc(mess){
      this.alerttext = mess
      this.alertseen = true
      setTimeout(this.hidealert, 4000)
    },
    hidealert(){
      let element = document.querySelector('.alert')
      element.classList.remove('animate__backInRight')
      element.classList.add('animate__backOutRight')
      this.alertseen = false
    }
  }
}
</script>

<style scoped>
.authadmin{
  display: flex;
  justify-content: center;
  width: 100%;
  font-size:3em;
}
.inputs{
  display: flex;
  align-items: center;
  flex-direction: column;
}
.buttonlog{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  color: white;
}
.btn-log{
  background-color: #1C1C1C;
  height: 70%;
  display: flex;
  width: 20%;
  justify-content: center;
  align-items: center;
  border-radius: 40px;
  transition: .1s;
}
.btn-log:hover{
  background-color: white;
  border: 2px solid #1C1C1C;
  color: #1C1C1C;
  cursor: pointer;
  transition: .1s;
}
.varianttruthanswers{
  cursor: pointer;
}
.edit{
  color: #1c1c1c;
}
.edit:hover{
  color: red;
  cursor: pointer;
}
.alertbox{
  position: fixed;
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
.alert{
  width: 20%;
  background-color: green;
  border: 2px solid #1c1c1c;
  color: white;
  font-size: 1.2vw;
  opacity: 0.8;
}
.deleteicon:hover{
  color: red;
  cursor: pointer;
}
.addquestion{
  width: 20%;
  margin-left: 5%;
  height: 80px;
  border: 2px solid #1c1c1c;
  color: #1c1c1c;
  transition: .16s;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.addquestion:hover{
  background-color: #1c1c1c;
  transition: .16s;
  color: white;
  cursor: pointer;
}
</style>