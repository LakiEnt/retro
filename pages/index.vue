<template>
  <div class="body">
    <div class="container">

        <div class="main-page">
            <div class="header">
              <div class="left-side">
                <div class="nes-text header-item">Главная</div>
                <div class="header-item">Игры</div>
                <div class="header-item">Новости</div>
              </div>
              <div class="right-side">
                <div class="header-item" @click="dialog = true">Войти</div>
              </div>
            </div>

            <div class="list-games">
              <div v-for="game in games" :key="game.id" class="game-container">

                <div @click="$router.push('game/'+game.gameId)">
                  <v-img
                    style="margin-left: 13px; margin-top: 5px"
                    :src="game.imageURL"
                    width="150"
                    height="150"
                  >

                  </v-img>
                  <div class="mt-3 mb-3 text-center">
                    {{ game.gameName }}
                  </div>
                </div>

              </div>
            </div>
        </div>
    </div>
    <v-dialog v-model="dialog" width="auto">

      <v-card style="width: 600px; height: 300px;">
        <v-card-title>
          Авторизация
        </v-card-title>

        <v-card-text>
          <v-form>
            <v-text-field
              v-model="nickname"
              :counter="25"
              label="Никнейм"
            ></v-text-field>

            <v-text-field
              v-model="password"
              :counter="25"
              label="Пароль"
            >

            </v-text-field>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-row>
            <v-col cols="3">
              <v-btn color="orange" block @click="dialog=false, userLogin()"> Авторизоваться</v-btn>
            </v-col>

          </v-row>

        </v-card-actions>

      </v-card>
    </v-dialog>
  </div>
</template>

<script>

export default {
  name: 'IndexPage',
  data(){
    return{
      games:[],
      dialog: false,
      nickname:'',
      password:'',
    }
  },
  methods:{
      async getGames(){
        const request = {
           "page": 1
        }
        try {
          const response = await this.$axios.post('/api/games/show', request);
          // const response = await this.$api.showGames(request)
          this.games= response.data.message.data
          console.log(response)
        }
        catch(err) {
          console.error(err)
        }
      },

    async userLogin(){
      const request = {
        nickName:this.nickname,
        password:this.password,
      }
      try {
        const response = await this.$axios.post('/api/auth/login', request);
        console.log(response)
      }
      catch(err) {
        console.error(err)
      }
    }
  },
  async created(){
     await this.getGames()
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

  max-width: 905px;
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
.list-games{
  display: flex;
  flex-wrap: wrap;
}
.game-container{

  width: 200px;
  height: 200px;

  padding: 10px;
  margin: 10px;
}
.game-container:hover{
  background-color: rgba(0, 0, 0, 0.25);
  cursor: pointer;
}
</style>
