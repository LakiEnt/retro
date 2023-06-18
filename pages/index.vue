<template>
  <div>
    <h2 class="text-center ma-6">Игры</h2>

    <div class="mt-5">
      <v-pagination
        v-model="page"
        :length="5"
        @input="updatePage"
      >

      </v-pagination>
    </div>

    <div class="list-games">
      <div v-for="game in games" :key="game.gameId" class="game-container">

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


</template>

<script>

export default {
  name: 'IndexPage',
  data(){
    return{
      games:[],
      page:1,
      pageSize: 16,
    }
  },
  methods:{
    async getGames(){
        const request = {
           "page": this.page
        }
        try {
          const response = await this.$axios.post('/api/games/show', request);
          // const response = await this.$api.showGames(request)
          this.games = response.data.message
          console.log(response.data.message)
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
    },

    async updatePage(){
      await this.getGames()
    }
  },
  async created(){
     await this.getGames()
  }
}

</script>
<style lang="scss" scoped>
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
