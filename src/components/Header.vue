<script setup>
import { computed, reactive } from "vue";
import { RouterLink, useRoute } from "vue-router";
import Links from "./UI/Links.vue";
import useCategorias from "../composables/useCategorias";
import {useRecetaStore} from '../stores/recetas'
import {useNoticiacionStore} from '../stores/notificacion'

const routes = useRoute();
const { categorias } = useCategorias();
const recetas =  useRecetaStore()
const notificacion = useNoticiacionStore()

const busqueda = reactive({
  ingrediente: "",
  categoria: "",
});


const handleSubmit = () => {
  if(Object.values(busqueda).includes('')){
    notificacion.$patch({
      mensaje:'Todos los mensajes son Obligatorios',
      mostrar:true,
      error:true
    })

    setTimeout(() => {
      notificacion.$reset()
    }, 1500);

    return
  }
  recetas.obtenerRecetas(busqueda)

};

const isInicio = computed(() => routes.name === "inicio");
</script>
<template>
  <header
    :class="{ header: isInicio }"
    class="bg-slate-800"
  >
    <div class="contenedor py-10 flex justify-between items-center">
      <RouterLink :to="{ name: 'inicio' }">
        <img
          class="w-16"
          src="/img/logo.svg"
          alt="logo referecen api"
        />
      </RouterLink>
      <nav class="text-white flex gap-5">
        <Links to="inicio">Inicio</Links>
        <Links to="favoritos">Favoritos</Links>
      </nav>
    </div>

    <section
      :class="{ ocultar: !isInicio }"
      class="contenedor my-10 lg:grid lg:grid-cols-2"
    >
      <form
        @submit.prevent="handleSubmit"
        class="min-w-[350px] max-w-lg mx-auto bg-orange-400 p-5 rounded-md shadow-lg space-y-4"
      >
        <div class="flex flex-col gap-2">
          <label
            class="font-medium text-slate-800"
            for="ingrediente"
            >Ingrediente</label
          >
          <input
            type="text"
            placeholder="vodka , vino , pisco"
            id="ingrediente"
            class="py-2 rounded-lg px-5"
            v-model="busqueda.ingrediente"
          />
        </div>
        <div class="flex flex-col gap-2">
          <label
            class="text-slate-800 font-medium"
            for="categorias"
            >Categorias</label
          >
          <select
            name="categorias"
            id="categorias"
            class="py-2 rounded-lg text-clip text-black text-center font-medium"
            v-model="busqueda.categoria"
          >
            <option value="">--- Seleccione ---</option>
            <option
              v-for="categoria in categorias"
              :key="categoria.strCategory"
              :value="categoria.strCategory"
            >
              {{ categoria.strCategory }}
            </option>
          </select>
        </div>
        <div class="flex justify-center">
          <input
            type="submit"
            value="Buscar"
            class="bg-red-500 w-[150px] py-2 rounded-md text-white font-medium hover:bg-red-600 transition-colors cursor-pointer"
          />
        </div>
      </form>
    </section>
  </header>
</template>

<style scoped>
.header {
  min-height: 50vh;
  background-image: url("/img/bg.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.ocultar {
  display: none;
}
</style>
