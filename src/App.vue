import 'vuetify/styles'; // Vuetify styles


<script setup lang="ts">

</script>

<template>
    <div id="app">
       
    <img alt="Shop logo" class="logo" src="./assets/bag.png" width="125" height="125" />
    <h1><span>Atara</span> Fresh Stop</h1>
    <router-view/>
  </div>
  <header>
   
  </header>

  
</template>

<style scoped>
img{
 padding-left: 8px;
}
h1{
  text-align: center;
}
span{
color: rgb(58, 58, 254);
}
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
  

 
}
img{
  display: block;
  margin: auto;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
