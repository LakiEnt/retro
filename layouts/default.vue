<template>
  <v-app >
    <v-main>
      <div class="body">
        <div class="container">
          <div class="main-page">
            <div class="header">
              <div class="left-side">
                <div>
                  <div class="logo nes-text pl-10"><span class="logo-inner">Retro</span> <br/>  Speedrun</div>
                </div>
              </div>
              <div class="right-side">
                <div class="nes-pointer is-warning  nes-btn" @click="$router.push('/main')">Главная</div>
                <div class="nes-pointer is-warning  nes-btn" @click="$router.push('/')">Игры</div>



                <div v-if="!isAutorise" class="nes-pointer is-warning nes-btn" style="margin-right:40px" @click="dialog = true">Войти</div>

                <div v-if="isAutorise" class="header-item">
                  <img src="~static/jokerge.webp" width="60" height="60" class="pb-4">
                  <div class="nes-pointer is-warning nes-btn" style="height: 40px; position: relative;top: -4px;" @click="userExit(),$router.go()">Выйти</div>
                </div>

              </div>
            </div>

            <Nuxt/>

            <div class="footer">
                <div class="mx-15 logo"><span class="logo-inner">Retro</span> <br/>  Speedrun</div>
                <div class="mx-15" @click="$router.push('/main')">Главная</div>
                <div class="mx-15" @click="$router.push('/')">Игры</div>
            </div>

          </div>
        </div>
        <v-dialog v-model="dialog" width="auto">
          <v-window
            v-model="window"
          >

            <v-window-item>
              <v-card style="width: 600px; padding: 20px">
                <v-card-title>
                  <div class="nes">
                    Авторизация
                  </div>
                </v-card-title>

                <v-card-text>
                  <v-form v-model="validAuto">
                    <v-text-field
                      v-model="nickname"
                      :counter="25"
                      label="Никнейм"
                    ></v-text-field>

                    <v-text-field
                      v-model="password"
                      :counter="25"
                      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="show1 ? 'text1' : 'password'"
                      @click:append="show1 = !show1"
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
                        @click="dialog=false, userLogin(), nickname='', password=''"
                        :disabled="validAuto"
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
                  <div class="nes">
                    Регистрация
                  </div>
                </v-card-title>

                <v-card-text>
                  <v-form>
                    <v-text-field
                      class="nes-input"
                      v-model="nicknameNew"
                      :counter="25"
                      :rules="[rules.required]"
                      label="Придумайте никнейм"
                    ></v-text-field>

                    <v-text-field
                      class="nes-input"
                      v-model="passwordNew"
                      :counter="25"
                      :rules="[rules.required]"

                      :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="show2 ? 'text2' : 'password'"
                      @click:append="show2 = !show2"

                      label="Придумайте пароль"
                    >

                    </v-text-field>

                    <v-text-field
                      class="nes-input"
                      v-model="passwordConfirm"
                      :counter="25"
                      :rules="[rules.required,rules.passwordConfirm]"

                      :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="show3 ? 'text3' : 'password'"
                      @click:append="show3 = !show3"

                      label="Повторите пароль"
                    >

                    </v-text-field>

                    <v-text-field
                      class="nes-input"
                      v-model="email"
                      :counter="25"
                      :rules="[rules.required, rules.email]"
                      label="Введите свою почту"
                    >

                    </v-text-field>

                    <v-select
                      class="nes-input"
                      v-model="country"
                      :items="countrySelect"
                      :rules="[rules.required]"
                      item-text="countryText"
                      item-value="countryValue"
                      label="Введите свою страну"
                    >

                    </v-select>
                  </v-form>

                </v-card-text>

                <v-card-actions>
                  <v-row class="justify-center">
                    <v-col cols="auto">
                      <v-btn
                        color="orange"
                        :disabled="validReg"
                        @click="window=0, userRegistration(),$router.go()"
                      >
                        <div class="nes">
                          Зарегестрироваться
                        </div>
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
      isAutorise: false,
      dialog: false,
      window:0,

      nickname:'',
      password:'',

      nicknameNew:'',

      passwordNew:'',
      passwordConfirm:'',

      email:'',
      country:'',

      countrySelect:[
        {
          countryText:'Россия', countryValue:'Russia'
        },
        {
          countryText:'США', countryValue:'USA'
        },
        {
          countryText:'Китай', countryValue:'China'
        },
        {
          countryText:'Асгардия', countryValue:'Asgardia'
        },
      ],
      rules: {
        passwordConfirm: value => value == this.passwordNew || 'Пароли не совпадают',
        required: value => !!value || 'Поле обязательно.',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Неверный адрес электронной почты.'
        },
      },
      show1: false,
      show2: false,
      show3: false,
    }
  },
  methods:{
    userExit(){
      this.isAutorise = false
      localStorage.setItem('isAutorise', false);
    },
    async userLogin(){
      const request = {
        nickName:this.nickname,
        password:this.password,
      }
      try {
        const response = await this.$axios.post('/api/auth/login', request);
        if(response.data.statusCode == 200){
          this.isAutorise = true
          localStorage.setItem('isAutorise', true);
        }
        console.log(response)
      }
      catch(err) {
        console.error(err)
      }
    },
    async userRegistration(){
      const request = {
        userNickName:  this.nicknameNew,
        userPassword:  this.passwordNew,
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
  computed:{
    validAuto(){
      return this.nickname.length > 0 && this.password.length > 0 ? false : true
    },
    validReg(){
      return (this.passwordNew == this.passwordConfirm) && (this.nicknameNew.length > 0 && this.passwordNew.length > 0 && this.email.length > 0 && this.country.length > 0) && (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.email)) ? false : true
    }
  },
  watch:{
    dialog:function(dialog, old){
      if(!this.dialog){
        this.window = 0
      }
    }
  },
  async created() {
    if(localStorage.getItem('isAutorise') !== null){
      this.isAutorise =  localStorage.getItem('isAutorise')
    }
    else{
      localStorage.setItem('isAutorise',false)
    }

  }
}
</script>
<style lang="scss">
.body{
  margin: 0;
  background: url("../static/main-wallpaper.png") no-repeat fixed;
  background-size:cover;
  position: sticky;

  font-family: 'Press Start 2P'!important;
}
.container{
  margin: 0 auto;

  max-width: 905px;
  min-height: 2385px;
}
.main-page{
  position: relative;
  top:200px;

  width: 100%;
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
  max-height: 40px;
  font-size: smaller;
  color: white;
  margin: 0 20px 0 20px;

  &:hover {
    cursor: pointer;
  }
}
.logo{
  padding: 0px 20px 0 20px;
}
.logo-inner{
  color: red
}
.nes{
  font-family: 'Press Start 2P'!important;
}
.footer{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;

  font-size: smaller;

  margin-top: 100px;
  padding: 20px;

  background: #1B1B1B;
}

</style>
