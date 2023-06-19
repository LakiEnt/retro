<template>
<div>

  <v-row style="margin-top:40px">

    <v-col cols="auto" style="padding-left: 40px">
      <div>
        <v-img :src="game.imageURL" width="300" height="300" style="border:3px solid #000"></v-img>
      </div>
      <div class="ma-1 mt-5">
        {{game.gameName}}
      </div>
    </v-col>

    <v-col v-if="isAutorise" cols="auto" class="addSpeedrun">
      <button type="button" class="nes-pointer nes-btn is-warning" @click="dialogAddGame = true">Добавить спидран + </button>
    </v-col>

    <v-row style="padding-left: 50px">
      <div class="flex flex-column">
        <div class="pa-1 mt-3">
          <strong> Название: </strong> {{game.gameName}}
        </div>
        <div class="pa-1 mt-3">
          <strong> Дата выпуска: </strong>  {{game.gameDate}}
        </div>
        <div class="mt-3" style=" padding-right: 40px; padding-left: 4px">

          <div v-if="!gameDescriptionOpen">
            <strong> Описание: </strong>  <span style="font-size: smaller;">{{gameDescription}}...</span>
            <br/>
            <strong style="text-decoration: underline" @click="gameDescriptionOpen = true"> Нажмите чтобы раскрыть</strong>
          </div>

          <div v-else>
            <strong> Описание: </strong> <span style="font-size: smaller;">{{game.gameDescription}}</span>
            <br/>
            <strong style="text-decoration: underline" @click="gameDescriptionOpen = false"> Нажмите чтобы скрыть</strong>
          </div>

        </div>
        <div class="pa-1 mt-3">
          <strong> Жанры: </strong>
          <span v-for="genre in gameGenres">
            {{genre}}
          </span>
        </div>
      </div>
    </v-row>

  </v-row>

  <v-row class="pa-10">
    <v-col>
      <h1>Спидраны по игре:</h1>

      <v-pagination
        v-model="page"
        :length="pagiLenght"
        @input="updatePage"
      >
      </v-pagination>

      <v-data-table
        :headers="headers"
        :items="speedruns"
        :items-per-page="20"
        hide-default-footer
        class="elevation-1"
      >
        <template
          v-slot:body="{ items }"
        >
          <tbody>
          <tr
            v-for="speedrun in items"
            :key="speedrun.speedrunId"
            @click="dialog = true,videoURL = speedrun.speedrunUrl,user= speedrun.userNickName, country = speedrun.userCountry, date = speedrun.speedrunDate, time = speedrun.speedrunTime"
          >
            <td>{{speedrun.userNickName}}</td>
            <td>{{speedrun.speedrunTime}}</td>
            <td>{{speedrun.speedrunDate}}</td>
            <td>{{speedrun.userCountry}}</td>

          </tr>
          </tbody>
        </template>
      </v-data-table>

      <v-pagination
        v-model="page"
        :length="pagiLenght"
        @input="updatePage"
      >
      </v-pagination>
    </v-col>
  </v-row>
  <v-dialog class="dialog" v-model="dialog" max-width='900'>
    <v-card class="pa-10">
      <v-row>
        <v-col cols="auto" >
          <div>
            <h2>Видео:</h2>
            <iframe width="300" height="300" :src=videoURL title="Speedrun"  frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
          </div>
        </v-col>

        <v-col class="ml-10 pl-10" cols="auto">
          <div>
            <h2>Информация о спидране:</h2>
            <v-row>

              <v-col>
                <div class="mt-3">Кто прошел: {{user}}</div>
                <div class="mt-3">Время прохождения: {{time}}</div>
                <div class="mt-3">Когда загружен: {{date}}</div>
                <div class="mt-3">Страна игрока: {{country}}</div>
              </v-col>
            </v-row>
          </div>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>


  <v-dialog class="dialog" v-model="dialogAddGame" max-width='900'>
    <v-card class="pa-10">
      <v-card-text>
        <h2 class="nes">Добавление спидрана</h2>

        <div class="nes-field">
          <label for="name_field" class="nes">Ссылка на ютуб:</label>
          <input type="text" id="name_field" class="nes-input" v-model="link">
        </div>

        <div class="nes-field">
          <label for="name_field" class="nes">Ваше время:</label>
          <input type="text" id="name_field" class="nes-input" v-model="timeUser">
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn :disabled="disableBtn"  class="nes nes-btn is-warning nes-pointer" @click="addSpeedrun()">Отправить на рассмотрение</v-btn>
      </v-card-actions>

    </v-card>
  </v-dialog>
</div>
</template>

<script>
export default {
  name: "gameID",
  data(){
    return{
      link:'',
      timeUser:'',
      dialogAddGame:false,
      isAutorise:false,
      game:{},
      gameDescription:'',
      gameDescriptionOpen: false,
      videoURL:'',
      user:'',
      time:'',
      date:'',
      country:'',
      dialog:false,
      gameGenres:[],
      page:1,
      speedruns:[],
      headers:[
        {
          text: 'Никнейм игрока',
          value: 'userNickName',
        },
        {
          text: 'Время прохождения',
          value: 'speedrunTime',
        },
        {
          text: 'Когда выложили спидран',
          value: 'speedrunDate',
        },
        {
          text: 'Страна',
          value: 'userCountry',
        },
      ],

      pageSize: 1,
      pageOverall:1,
      pagiLenght:1,

    }
  },
  methods:{
    async getGame(){
      const request = {
        "gameId": this.$route.params.id
      }
      try {
        const response = await this.$axios.post('/api/games/showGame', request);

        this.game = response.data.message
        this.gameDescription = this.game.gameDescription.slice(0,125)
        this.gameGenres = this.game.genres

        for(let genre in this.gameGenres) {
          this.gameGenres[genre] = this.gameGenres[genre] + ', '
        }
        // this.gameGenres.at(-1).slice(0,-2).concat('.') Добавить точку в конец
        console.log(response)
      }
      catch(err) {
        console.error(err)
      }
    },
    async getGameSpeedrun(){
      const request = {
        "gameId": this.$route.params.id,
        'page': this.page
      }
      try {

        const response = await this.$axios.post('/api/speedrun/show', request);

        this.speedruns = response.data.message

        this.pageSize = response.data.limit        //лимит
        this.pageOverall = response.data.rowCount  //всего страниц

        this.pagiLenght = Math.ceil(this.pageOverall/this.pageSize)

        console.log(response)
      }
      catch(err) {
        console.error(err)
      }
    },
    async updatePage(){
      await this.getGameSpeedrun()

    },
    async addSpeedrun(){
      const request = {
        "speedrunUser": 'LakiEnt',
        'speedrunGame': this.$route.params.id,
        'speedrunTime': this.timeUser,
        'speedrunUrl' : this.link,
      }
      try {

        const response = await this.$axios.post('/api/speedrun/addSpeedrun', request);
        if(response.data.statusCode == 200){
          alert('Ваш спидран отправлен на рассмотрение')
        }
        console.log(response)
      }
      catch(err) {
        console.error(err)
        alert('Произошла ошибка')
      }
    }

  },
  computed:{
    disableBtn(){
      return this.link.length > 0 && this.timeUser.length > 0 ? false : true
    },
  },
  watch:{
    dialog:function(dialog, old){
      if(!this.dialog){
        this.videoURL = '';
      }
    }
  },
  async created(){
    await this.getGame()
    await this.getGameSpeedrun()

    if(localStorage.getItem('isAutorise')!==null){
      this.isAutorise =  localStorage.getItem('isAutorise')
    }
    else{
      localStorage.setItem('isAutorise',false)
    }
  }
}

</script>

<style scoped>
.nes{
  font-family: 'Press Start 2P'!important;
}
.addSpeedrun{
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 40px;
  padding-bottom: 40px;

}
</style>
