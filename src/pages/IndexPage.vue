<template>
  <q-page>
    <div class="q-gutter-y-md" style="max-width: 600px">
      <q-footer>
        <q-tabs
          indicator-color="blue"
          v-model="tab"
          narrow-indicator
          dense
          align="justify"
          style="background-color: #f5f5f5"
          @update:model-value="tabsChange"
        >
          <q-tab name="home" class="text-grey-14" icon="home" label="accueil " />
          <q-tab name="work"  class="text-grey-14" icon="grid_on" label="work" />
          <q-tab name="my" class="text-grey-14" icon="person" label="person" />         
          <q-tab name="pos" class="text-grey-14" icon="storefront" label="pos" />
          <q-tab name="tabs" class="text-grey-14" icon="storefront" label="tabs" />
        </q-tabs>
      </q-footer>
      <div class="tab_panels">
        <q-tab-panels v-model="tab" animated >
          <q-tab-panel name="home" class="q-pa-none a">
            <homePage></homePage>
          </q-tab-panel>
          <q-tab-panel name="work" class="q-pa-none" >
            <work></work>
          </q-tab-panel>
          <q-tab-panel name="my" class="q-pa-none a">
            <my></my>
          </q-tab-panel>
          <q-tab-panel name="pos" class="q-pa-none a">
            <pos></pos>
          </q-tab-panel>
          <q-tab-panel name="tabs" class="q-pa-none a">

          <tabs></tabs>
          </q-tab-panel>
       
        </q-tab-panels>
      </div>
    </div>
  </q-page>
</template>

<script setup name="indexaa">
import homePage from "src/pages/bottomBar/home/index.vue"
import work from "src/pages/bottomBar/work/index.vue"
import my from "src/pages/bottomBar/my/index.vue"
import pos from "src/pages/posofsales/index.vue"
import tabs from "src/pages/posofsales/tabs.vue"
import pageStore from "stores/modules/page";
import {ref} from "vue";

const usePage =pageStore();
const tab =ref("home")
function initBottom(){
  const bottomVal=usePage.bottomVal
  if (bottomVal!=""){
    tab.value=bottomVal;
  }
}
function tabsChange(val){
  console.log('val')
  usePage.setBootomVal(val);
}
initBottom()

</script>
<style>
.tabs_text{
  background-color: #2196F3;
}
.tab_panels{
  width: 100vw;height: 100vh

}
</style>
