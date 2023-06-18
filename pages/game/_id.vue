<template>
<div>
  <v-row style="margin-top:40px">

    <v-col style="margin-left: 40px">
      <div>
        <v-img :src="game.imageURL" width="300" height="300" style="border:3px solid #000"></v-img>
      </div>
      <div class="ma-1 mt-5">
        {{game.gameName}}
      </div>
    </v-col>

    <v-col>
      <div class="flex flex-column">
        <div class="pa-1 mt-3">
          <strong> Название: </strong> {{game.gameName}}
        </div>
        <div class="pa-1 mt-3">
          <strong> Дата выпуска: </strong>  {{game.gameDate}}
        </div>
        <div class="pa-1 mt-3">

          <div v-if="!gameDescriptionOpen">
            <strong> Описание: </strong>  {{gameDescription}}...
            <br/>
            <strong style="text-decoration: underline" @click="gameDescriptionOpen = true"> Нажмите чтобы раскрыть</strong>
          </div>

          <div v-else>
            <strong> Описание: </strong>  {{game.gameDescription}}
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
    </v-col>

  </v-row>

  <v-row class="pa-10">
    <v-col>
      <h1>Спидраны по игре:</h1>

      <v-pagination
        v-model="page"
        :length="5"
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
            @click="dialog = true,videoURL = speedrun.speedrunUrl"
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
        :length="5"
        @input="updatePage"
      >
      </v-pagination>
    </v-col>
  </v-row>
  <v-dialog v-model="dialog">
    <v-card>
      <div>
        <iframe width="560" height="315" :src=videoURL title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
      </div>
    </v-card>
  </v-dialog>
</div>
</template>

<script>
export default {
  name: "gameID",
  data(){
    return{
      game:{},
      gameDescription:'',
      gameDescriptionOpen: false,
      videoURL:'',
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

        console.log(response)
      }
      catch(err) {
        console.error(err)
      }
    },
    async updatePage(){
      await this.getGameSpeedrun()
    }

  },
  async created(){
    await this.getGame()
    await  this.getGameSpeedrun()
  }
}

</script>

<style scoped>

</style>
