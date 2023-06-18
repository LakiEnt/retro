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
      <v-data-table
        :item="speedrun"
        :headers="headers"
        :items-per-page="25"
        fixed-header
        hide-default-footer
      >

      </v-data-table>
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
      speedrun:[],
      headers:[
        {
          align: 'start',
          key: 'name',
          sortable: false,
          title: 'Никнейм игрока',
        },
        {
          align: 'start',
          key: 'time',
          sortable: false,
          title: 'Время спидрана',
        },
        {
          align: 'start',
          key: 'date',
          sortable: false,
          title: 'Когда был опубликован',
        },
        {
          align: 'start',
          key: 'country',
          sortable: false,
          title: 'Страна',
        },
      ],
    }
  },
  methods:{
    async getGame(){
      const request = {
        "gameId": this.$route.params.id
      }
      const requestSpeedrun = {
        "gameId": this.$route.params.id,
        'page': 1
      }
      try {
        const response = await this.$axios.post('/api/games/showGame', request);
        const responseSpeedrun = await this.$axios.post('/api/speedrun/show', requestSpeedrun);

        this.speedrun = responseSpeedrun.data.message

        this.game = response.data.message
        this.gameDescription = this.game.gameDescription.slice(0,125)
        this.gameGenres = this.game.genres

        for(let genre in this.gameGenres) {
          this.gameGenres[genre] = this.gameGenres[genre] + ', '
        }
        // this.gameGenres.at(-1).slice(0,-2).concat('.') Добавить точку в конец
        console.log(response)
        console.log(responseSpeedrun)
      }
      catch(err) {
        console.error(err)
      }
    },

  },
  async created(){
    await this.getGame()
  }
}

</script>

<style scoped>

</style>
