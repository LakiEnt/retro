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
          <v-window
            v-model="window"
          >

            <v-window-item>
              <v-card style="width: 600px; padding: 20px">
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
                  <v-row class="justify-center">
                    <v-col cols="4">
                      <v-btn
                        color="orange"
                        @click="dialog=false, userLogin()"
                      >
                        Авторизоваться
                      </v-btn>
                    </v-col>

                    <v-col cols="8" class="left-side align-center">
                      <div>
                        Хотите <a
                        style="  color: orange;text-decoration: underline;"
                        @click="window = 1"
                      >
                        создать аккаунт?
                      </a>
                      </div>
                    </v-col>
                  </v-row>



                </v-card-actions>

              </v-card>
            </v-window-item>

            <v-window-item>
              <v-card style="width: 600px; padding: 20px">
                <v-card-title>
                  Регистрация
                </v-card-title>

                <v-card-text>
                  <v-form>
                    <v-text-field
                      v-model="nickname"
                      :counter="25"
                      label="Придумайте никнейм"
                    ></v-text-field>

                    <v-text-field
                      v-model="password"
                      :counter="25"
                      label="Придумайте пароль"
                    >

                    </v-text-field>

                    <v-text-field
                      v-model="passwordConfirm"
                      :counter="25"
                      label="Повторите пароль"
                    >

                    </v-text-field>

                    <v-text-field
                      v-model="email"
                      :counter="25"
                      label="Введите свою почту"
                    >

                    </v-text-field>

                    <v-text-field
                      v-model="country"
                      :counter="25"
                      label="Введите свою страну"
                    >

                    </v-text-field>
                  </v-form>
                </v-card-text>

                <v-card-actions>
                  <v-row class="justify-center">
                    <v-col cols="4">
                      <v-btn
                        color="orange"
                        @click="dialog=false, window=0, userRegistration()"
                      >
                        Зарегестрироваться
                      </v-btn>
                    </v-col>
                  </v-row>



                </v-card-actions>

              </v-card>
            </v-window-item>
          </v-window>

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
      window:0,
      nickname:'',
      password:'',
      passwordConfirm:'',
      email:'',
      country:'',
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
    },
    async userRegistration(){
      const request = {
        userNickName:  this.nickname,
        userPassword:  this.password,
        userEmail:     this.email,
        userCountry:   this.country,
      }
      try {
        const response = await this.$axios.post('/api/auth/register', request);
        console.log(response)
      }
      catch(err) {
        console.error(err)
      }
    }
  },
  watch:{
    dialog:function(dialog, old){
      if(!this.dialog){
        this.window = 0
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
