<template>
  <div class="body">
    <div class="container"> 

        <div class="main-page"> 
            <div class="header"> 
              <div class="left-side"> 
                <div class="header-item">Главная</div>
                <div class="header-item">Игры</div>
                <div class="header-item">Новости</div>
                <button class="nes-btn is-primary" @click="getGames"> фетч</button>
              </div>
              <div class="right-side"> 
                <div class="header-item">Войти</div>
              </div>
            </div>

            <div class="list-games"> 

            </div>
        </div>
    </div>
  </div>
</template>

<script>
// import "nes.css/css/nes.min.css";

export default {
  name: 'IndexPage',
  data(){
    return{

    }
  },
  methods:{
      async getGames(){
        const request = {
           "page": 1
        }
        try {
          const response = await this.$axios.post('/api/games/', request);
          console.log(response)
        }
        catch(err) {
          console.error(err)
        }
      }
  }
}

</script>
<style lang="scss" scoped>

.body{
  margin: 0;
  height: 1145px;
    
  background: url("../static/main-wallpaper.png") no-repeat fixed;
  position: sticky;
}
.container{
  margin: 0 auto;
  
  max-width: 900px;
}
.main-page{
  position: relative;
  top:200px;

  width: 100%;
  height: 934px;
 
  background: rgba(167, 82, 3, 0.9);
}
.header{
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 80px;

  background: #1B1B1B;
}
.left-side{
  display: flex;
  justify-content: space-around;
}
.right-side{
  display: flex;
  justify-content: space-between;
}
.header-item{
  font-size: smaller;
  color: white;
  margin: 0 20px 0 20px;
}

</style>
