<template>
<div>
  <div class="mapdiv">
    <div id="fline">
      <i  class=" mapmarker fas fa-map-marker" data-toggle="modal" data-target="#exampleModalLong"  v-on:click="clickonmarker"></i>
    </div>
  </div>
  <!-- Button trigger modal -->
<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalLong">
  Запустить модальное окно
</button>

<!-- Modal -->
<div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p id="bodytextmodal">...</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
</div>
</template>

<script>
export default {
name: "MapBelarus",
  mounted(){
    this.get_size_and_paddings_elements()
  },
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
    clickonmarker(){
      console.log('clicked')
      document.getElementById('#myModal').modal('show')
      document.getElementById('bodytextmodal').innerHTML = 'hello'
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
</style>