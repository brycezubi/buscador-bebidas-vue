<script setup>
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";

import { useModalStore } from "../../stores/modal";
import { useRecetaStore } from "../../stores/recetas";
import { useFavoritoStore } from "../../stores/favoritos";

const modal = useModalStore();
const receta = useRecetaStore();
const favoritos = useFavoritoStore();

const ingredientesCantidades = () => {
  const contenedor = document.createElement("div");

  for (let index = 1; index <= 15; index++) {
    if (receta.receta[`strIngredient${index}`]) {
      const ingrediente = receta.receta[`strIngredient${index}`];
      const cantidad = receta.receta[`strMeasure${index}`];

      const ingredientes = document.createElement("p");
      ingredientes.classList.add("text-lg", "text-center");
      ingredientes.innerHTML = `${ingrediente} - ${cantidad}`;

      contenedor.appendChild(ingredientes);
    }
  }

  return contenedor;
};
</script>

<template>
  <TransitionRoot
    appear
    :show="modal.isOpen"
    as="template"
  >
    <Dialog
      as="div"
      @close="modal.closeModal"
      class="relative z-10"
    >
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md space-y-4 transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="text-2xl truncate font-medium leading-6 text-gray-900 text-center"
              >
                {{ receta.receta.strDrink }}
              </DialogTitle>
              <img
                class="rounded-lg max-w-xs mx-auto"
                :src="receta.receta.strDrinkThumb"
                :alt="'bebida-' + receta.receta.strDrink"
              />
              <div class="flex justify-end">
                <span
                  class="px-3 bg-blue-200 rounded-lg text-blue-500 font-medium lowercase"
                  >{{ receta.receta.strCategory }}</span
                >
              </div>
              <DialogTitle
                as="h3"
                class="text-xl underline font-medium leading-6 text-gray-900 text-center"
              >
                Instrucciones
              </DialogTitle>

              <p class="text-center text-lg">
                {{ receta.receta.strInstructions }}
              </p>

              <DialogTitle
                as="h3"
                class="text-xl font-medium leading-6 text-gray-900 text-center"
              >
                Ingredientes y Cantidades
              </DialogTitle>

              <div v-html="ingredientesCantidades().outerHTML"></div>

              <div class="flex justify-around">
                <button
                  @click="favoritos.addFavorite"
                  class="fav"
                  :class="[favoritos.isFavorite(receta.receta.idDrink) ? 'bg-yellow-300 text-red-600':'bg-yellow-200 text-yellow-400']"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                    />
                  </svg>
                </button>
                <button
                  class="close"
                  @click="modal.closeModal()"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<style scoped>
.close {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: red;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.fav {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
