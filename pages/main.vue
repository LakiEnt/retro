<template>
<div style="padding: 40px">

  <div class="mb-12">
    <p>Добро пожаловать на наш сайт, посвященный скоростным прохождениям ретро игр! Мы создали этот ресурс для любителей старых игровых шедевров, которые стремятся преодолеть их на максимальной скорости.</p>
    <p>Здесь вы найдете подробные руководства, техники и секреты, помогающие достичь невероятных результатов в ретро играх.</p>
    <p>Бросьте вызов собственным рекордам и сравнитесь с другими игроками по всему миру. Подготовьтесь к волнующему погружению в прошлое и ощутите адреналин быстрых прохождений ретро игр нашего времени.</p>
    <p>Присоединяйтесь к нашему сообществу и станьте частью этой захватывающей скоростной игровой культуры!</p>
  </div>

  <div class="sonic mb-12">

    <div class="message-sonic nes-balloon from-left is-dark rounded" style="width: 400px">
      "Скорость возвращается: пролети через классику ретро игр!"
    </div>

    <div class="img-sonic" style="width: 463px; height: 607px">
      <img src="~static/sonic.png" style="border: 2px" >
    </div>
  </div>

  <div class="mb-12">
    Количество доступных игр на сайте: {{gamesCount}}
  </div>

  <div class="mb-12 text-decoration-underline">
    Игра дня: {{gameOfDay}}
  </div>

  <div class="mb-12">
    Последний загруженный спидран:
    <div>
      <iframe width="500" height="300" :src=lastSpeedrun title="Speedrun"  frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    </div>
  </div>



</div>
</template>

<script>
export default {
  name: "mainPage",
  data(){
    return{
      lastSpeedrun:'',
      gamesCount:'',
      gameOfDay:'',
    }
  },
  methods:{
    async getMain(){
      try {
        const response = await this.$axios.get('/api/landing/show');
        const data = response.data.message

        this.lastSpeedrun = data.lastSpeedRun.speedrunUrl
        this.gamesCount = data.allGamesCount
        this.gameOfDay = data.gameOfDay.gameName

        console.log(data)
      }
      catch(err) {
        console.error(err)
      }
    },
  },
  async created(){
    await this.getMain()
  }
}
</script>

<style scoped>
.sonic{
  position: relative;
  top:-150px;
}
.img-sonic{

}
.message-sonic{
  position: relative;top: 180px; left: 385px;
}
</style>
