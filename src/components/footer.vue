<template>
<footer>
  <div class="learnsystem">
    <img src="@/assets/learnsystem.svg" alt="">
  </div>
  <div class="share">
    <div class="socialnetworks"><a target="_blank" href="https://www.instagram.com/lyceum1family/"><img src="@/assets/instagram.png" alt=""></a></div>
    <div class="socialnetworks"><a target="_blank" href="https://fb.com"><img src="@/assets/facebook.png" alt=""></a></div>
    <div class="socialnetworks"><a target="_blank" href="https://www.youtube.com/channel/UCd4xa-PxHks81ywlu7G9h8w"><img src="@/assets/youtube.png" alt=""></a></div>
  </div>
</footer>
</template>

<script>
export default {
name: "footer"
}
</script>

<style scoped>
footer {
  height: 100px;
  margin-top: 100px;
  background-color: #1C1C1C;
  display: flex;
  justify-content: space-between;
  position: static;
  bottom: 0;
  margin-bottom: 0;
  width: 100%;
}
footer .learnsystem {
  align-self: center;
  margin-left: 50px;
}
footer .share {
  margin-right: 50px;
  display: flex;
  height: 40%;
  align-items: center;
  align-self: center;
}
footer .share .socialnetworks {
  height: 100%;
  margin-left: 20px;
}
footer .share .socialnetworks img {
  height: 100%;
}
</style>