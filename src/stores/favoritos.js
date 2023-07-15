import { defineStore } from "pinia";
import { computed, onMounted, ref, watch } from "vue";
import { useRecetaStore } from "./recetas";
import { useModalStore } from "./modal";
import {useNoticiacionStore} from './notificacion'

export const useFavoritoStore = defineStore("favoritos", () => {
  const favoritos = ref([]);
  const receta = useRecetaStore();
  const modal = useModalStore();
  const notificacion = useNoticiacionStore();


  onMounted(() => {
    favoritos.value = JSON.parse(localStorage.getItem('favoritos')) ?? [];
  })

  watch(favoritos,()=>{
    favoritosLS()
  },{
    deep:true
  })


  function favoritosLS(){
    localStorage.setItem('favoritos', JSON.stringify(favoritos.value))
  }

  function isFavorite(id) {
    return favoritos.value.some(fav=>fav.idDrink === id)
  }

  function removeFavorite(id){
    favoritos.value = favoritos.value.filter(fav=> fav.idDrink !== id)
    notificacion.mensaje='Removido de favoritos'
    notificacion.error=true
    notificacion.mostrar = true

  }

  function addFavorite() {
    if (isFavorite(receta.receta.idDrink)) {
      removeFavorite(receta.receta.idDrink)
    } else {
      favoritos.value.push(receta.receta);
      notificacion.mensaje='Agregado a favoritos'
      notificacion.mostrar = true
    }
    setTimeout(() => {
      notificacion.$reset()
    }, 1500);
    modal.closeModal();
  }

  const hayFavoritos = computed(() => favoritos.value.length === 0);
  return {
    favoritos,
    addFavorite,
    hayFavoritos,
    isFavorite
  };
});
