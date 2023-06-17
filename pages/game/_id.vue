<template>
<div>
  <h1>ВООБЩЕ ДРУГАЯ СТРАНИЦА {{game.gameName}}</h1>
  {{game}}
</div>
</template>

<script>
export default {
  name: "_id",
  data(){
    return{
      game:{},
    }
  },
  methods:{
    async getGame(){
      const request = {
        "id": this.$route.params.id
      }
      try {
        const response = await this.$axios.post('/api/games/show', request);

        this.game = response.data.message.data
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
