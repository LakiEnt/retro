<template>
<div>
  <h1>ВООБЩЕ ДРУГАЯ СТРАНИЦА {{game.gameName}}</h1>
  {{game}}
</div>
</template>

<script>
export default {
  name: "gameID",
  data(){
    return{
      game:{},
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
        console.log(response)
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
