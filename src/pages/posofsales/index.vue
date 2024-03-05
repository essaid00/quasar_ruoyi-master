<template>


    <div class="column">
      <div class="col">
        <div class="example-column-horizontal-alignment">
          <div class="column items-left  ">


            <div class="row">
              <div class="col q-m-4">
                <q-tabs v-model="settingsTab" active-color="primary" active-bg-color="blue-1" class="text-grey-10"
                  >
                  <q-tab v-for="(categorie, index) in categories" :key="categorie.id" :name="categorie.libelet"
                    :label="categorie.libelet" style="justify-content: left" content-class="q-pl-md" />

                </q-tabs>
              </div>
              <div class="col">
                .colssssssssssssss
              </div>
            </div>


          </div>

        </div>
      </div>
      <div class="col-8">
        <div class="example-column-horizontal-alignment">

          <div class="column items-centre q-ma-md">
            <div class=" example-row-equal-width">

              <div class="row">
                <div class="col-7">


                  <div class="q-pa-md example-col-gutter-size">

                   <products :tableData="tableData"></products>
                  </div>
                  <div class="q-gutter-md">


                  </div>

                </div>

                <div class="col-4">
                  .colssssssssssssss
                </div>
                <div class="col-1">
                  <q-btn type="primary" color="primary" label="Button">Encaiser</q-btn>
                  <q-btn type="primary" @click="handleClick(2)">Encaiser</q-btn>
                  <q-btn type="primary" @click="handleClick2(2)">Fermer</q-btn>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="q-pa-md example-column-horizontal-alignment">

          <div class="column items-centre">
            <div class="row justify-evenly">
              <div class="col-4">
                <div class="row justify-between">
      <div class="col-2">
        <q-btn type="primary" color="primary">Encaiser</q-btn>
      </div>
      <div class="col-2">
        <q-btn type="primary" @click="handleClick2(2)">Fermer</q-btn>
      </div>
      <div class="col-2">
        <q-btn type="primary" @click="handleClick(2)">Encaiser</q-btn>
      </div>
    </div>
                
       
               
              </div>
              <div class="col-4">
                .colssssssssssssss
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>

</template>



<script setup>


import { ref,onMounted  } from "vue"
import categories from "./api/categories"
import productsTable from "./api/product.ts"
import tableData from "./api/tableData.ts"
import  products  from "./components/products.vue";
import useProductstore from 'stores/modules/product'
const addProduct = (idProduct) => {
  tableData.value.push({
    id: 9,
    libelet: 'capotshino',
    categorie: 'drink',
    sousCategorie: 'drink',
    prix: '10DH',
    photopath: 'src/assets/pos/1.png',
  })
  console.log(idProduct)
};
const settingsTab = ref('All');


const source2 = ref('');

///
source2.value = 'http://localhost:9080/static/sample.pdf'
const handleClick = (idProduct) => {

  console.log(idProduct)
  console.log(tableData.value)
  tableData.value = tableData.value.filter(item => {
    console.log(item.id)

    return item.id !== idProduct
  })
};

onMounted (() => {
    console.log('onMounted')
    useProductstore().getProducts().then((data) => {
      console.log(data)
    
    }).catch(error => {
      console.log("error"+error)
    })
})



</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.row>div {
  padding: 10px 15px;
  background: rgb(245, 245, 245);
  border: 1px solid rgba(86, 61, 124, .2)
}

;

.col{
  border: 1px solid rgba(86, 61, 124, .2)
}
</style>