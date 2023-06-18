<template>
  <v-app >
    <v-main>
      <div class="body">
        <div class="container">
          <div class="main-page">
            <div class="header">
              <div class="left-side">
                <div class="nes-text header-item" @click="$router.push('/main')">Главная</div>
                <div class="header-item" @click="$router.push('/')">Игры</div>
                <div class="header-item" @click="$router.push('/news')">Новости</div>
              </div>
              <div class="right-side">
                <div class="header-item" @click="dialog = true">Войти</div>
              </div>
            </div>
            <Nuxt/>
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
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {
      dialog: false,
      nickname:'',
      password:'',
    }
  },
  methods:{
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
  }
}
</script>
<style lang="scss">
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
.header-item {
  font-size: smaller;
  color: white;
  margin: 0 20px 0 20px;

  &:hover {
    cursor: pointer;
  }
}


</style>
