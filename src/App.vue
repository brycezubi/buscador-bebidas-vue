<script setup>
import { RouterView } from "vue-router";
import Header from "./components/Header.vue";
import Modal from "./components/UI/Modal.vue"
import Notificacion from "./components/UI/Notificacion.vue"
</script>

<template>
  <Header />
  <main class="contenedor my-10">
    <RouterView />
  </main>

  <Modal />
  <Notificacion />
</template>

<style>
.contenedor {
  @apply w-5/6 xl:w-full mx-auto container;
}
.titulo {
  @apply text-4xl text-center text-slate-900 font-bold;
}
.subtitulo {
  @apply text-3xl text-center text-red-500 font-bold;
}


.grilla{
  display: grid;
  grid-template-columns: repeat(auto-fit,minmax(350px , 1fr));
  gap: 1.5rem;
  justify-items: center;
}

.btn{
  @apply bg-orange-400 text-white font-medium w-[150px] py-2 rounded-lg hover:tracking-wider hover:bg-orange-400/90 transition-all 
}
</style>
