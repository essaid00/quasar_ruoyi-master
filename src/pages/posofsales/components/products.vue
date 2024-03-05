<template>
     <div class="row q-col-gutter-none">
                   
                  
                          <div class="col-4" v-for="(produit, index) in products" :key="produit.id">

                            <q-card>
                              <q-card-section style="min-width: 40px;">
                                <img @click="addProduct(produit.id)" style="width:  40px; height: 40px;"
                                  :src="produit.photopath" />

                                <span class="q-ml-md">{{ produit.libelet }}</span>
                              </q-card-section>

                              <q-card-actions>
                                <q-btn outline label="add" @click="addProduct(produit.id)" color="primary"
                                  v-close-popup />
                                <q-btn label="supprimer" color="primary" v-close-popup />
                              </q-card-actions>
                            </q-card>
                          </div>

                 
                    </div>
</template>

<script lang="ts" setup>



import {ref,defineProps,onMounted} from "vue"
const props = defineProps({
  tableData: {
    type: Array,
    default: null,
  },  
});


const products =ref([])
const addProduct = (idProduct) => {
    props.tableData.push({
    id: 9,
    libelet: 'capotshino',
    categorie: 'drink',
    sousCategorie: 'drink',
    prix: '10DH',
    photopath: 'src/assets/pos/1.png',
  })

};
onMounted(() => {
    console.log('onMounted')
    products.value=props.tableData
})
</script>
<script lang="ts" >
export default {
  name: 'products'
}
</script>