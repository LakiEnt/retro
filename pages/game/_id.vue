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
      <v-table

      >
        <thead>
        <tr>
          <th class="text-center mr-5">
            Никнейм игрока
          </th>
          <th class="text-center mr-5">
            Время спидрана
          </th>
          <th class="text-center mr-5">
            Когда был опубликован спидран
          </th>
          <th class="text-center mr-5">
            Страна
          </th>
        </tr>
        </thead>
        <tbody>
        <tr
          v-for="speedrun in speedruns"
          :key="speedrun.name"
        >
          <td>{{ speedrun.userNickName }}</td>
          <td>{{ speedrun.speedrunTime }}</td>
          <td>{{ speedrun.speedrunDate }}</td>
          <td>{{ speedrun.userCountry }}</td>

        </tr>
        </tbody>

      </v-table>
    </v-col>
  </v-row>
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
      gameGenres:[],
      page:1,
      speedruns:[],
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
        'page': 1
      }
      try {

        const response = await this.$axios.post('/api/speedrun/show', request);

        this.speedruns = response.data.message

        console.log(response)
        console.log(this.speedrun)
      }
      catch(err) {
        console.error(err)
      }
    },

  },
  async created(){
    await this.getGame()
    await  this.getGameSpeedrun()
  }
}

</script>

<style scoped>

</style>
