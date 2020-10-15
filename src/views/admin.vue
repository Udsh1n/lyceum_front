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
      <td class="questiontd">{{n.question}}</td>
      <td><p class="varianttruthanswers" v v-for="g in n.variants_set" :key="g.id" v-on:click="changetruthvariant(n.id, g)" ><span v-if="g == n.truth" style="color: red">{{ g }}</span><span v-else>{{g}}</span></p></td>
      <td><input class="mapslink" type="text" :value="n.linkongooglemaps" v-on:change="changelinkongooglemaps(n.id)"></td>
      <td>{{ n.truthvariantimage }}</td>
    </tr>

  </tbody>
</table>
  </div>
</div>
</template>

<script>
export default {
name: "admin",
  data(){
    return{
      auth: true,
      infotest: []
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
    async changelinkongooglemaps(id){
      // console.log('Try change google maps link to '+id+' question', document.querySelectorAll('.mapslink')[id-1].value)
      await fetch('https://liceum1.herokuapp.com/liceum/changegooglemapslink/', {
        method: 'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'id': id,
          'link': document.querySelectorAll('.mapslink')[id-1].value,
        })
      })
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

      this.gettestquestion()
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
</style>