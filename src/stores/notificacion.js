import {defineStore} from 'pinia'
import { ref } from 'vue'

export const useNoticiacionStore = defineStore('notificaciones',()=>{

  const mostrar =  ref(false)
  const mensaje =  ref('')
  const error=ref(false)

  function $reset(){
    mostrar.value=false
    mensaje.value=''
    error.value=false
  }

  return{
    mostrar,
    mensaje,
    error,
    $reset

  }
})