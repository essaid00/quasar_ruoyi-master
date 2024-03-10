<template>
     <div class="row q-col-gutter-none">


                          <div class="col-4" v-for="(produit, index) in products" :key="produit.pid">

                            <q-card>
                              <q-card-section style="min-width: 40px;">
                                <img @click="addProduct(produit.pid)" style="width:  40px; height: 40px;"
                                  :src="produit.image" />

                                <span class="q-ml-md">{{ produit.pname }}</span>
                                <span class="q-ml-md">{{ produit.shopPrice }}</span>
                              </q-card-section>

                              <q-card-actions>
                                <q-btn outline label="add" @click="addProduct(produit.pid)" color="primary"
                                  v-close-popup />
                                <q-btn label="supprimer" color="primary" v-close-popup />
                              </q-card-actions>
                            </q-card>
                          </div>


                    </div>
</template>

<script lang="ts" setup>



import {ref,onMounted,toRefs} from "vue"
const props = defineProps({
  tableData: {
    type: Array,
    default: null,
  },
});


const products =ref(props.tableData)
const addProduct = (idProduct) => {

};
onMounted(() => {

})
</script>
<script lang="ts" >
export default {
  name: 'products'
}
</script>
