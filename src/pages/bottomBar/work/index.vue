<template>
  <div>
    <div class="q-pa-md">
      <q-carousel
        animated
        v-model="slide"
        arrows
        navigation
        :autoplay="autoplay"
        infinite
        style="height: 150px"
      >
        <q-carousel-slide :name="1" img-src="https://cdn.quasar.dev/img/mountains.jpg" />
        <q-carousel-slide :name="2" img-src="https://cdn.quasar.dev/img/parallax1.jpg" />
        <q-carousel-slide :name="3" img-src="https://cdn.quasar.dev/img/parallax2.jpg" />
        <q-carousel-slide :name="4" img-src="https://cdn.quasar.dev/img/quasar.jpg" />
      </q-carousel>
    </div>
    <q-splitter
      v-model="splitterModel"
      style="height: 250px"
    >

      <template v-slot:before>
        <q-tabs
          v-model="tab"
          vertical
          class="text-black"
          @update:model-value="tabsChange"
        >
          <q-tab name="system" icon="newspaper" label="系统管理"/>
          <q-tab name="monitor" icon="tv" label="系统监控"/>
          <q-tab name="util" icon="auto_fix_high" label="系统工具"/>
        </q-tabs>
      </template>

      <template v-slot:after>
        <q-tab-panels
          v-model="tab"
          animated
          swipeable
          vertical
          transition-prev="jump-up"
          transition-next="jump-up"
        >
          <q-tab-panel name="system">
            <div class="text-h4 q-mb-md">系统管理</div>
            <p>...</p>
            <p>...</p>
          </q-tab-panel>

          <q-tab-panel name="monitor">
            <div class="text-h4 q-mb-md">系统监控</div>
            <q-btn @click="toPage('2')">跳转two</q-btn>
            <p>...</p>
            <p>...</p>
          </q-tab-panel>

          <q-tab-panel name="util">
            <div class="text-h4 q-mb-md">系统工具</div>
            <q-btn @click="toPage('2')">跳转two</q-btn>
            <p>...</p>
            <p>...</p>
          </q-tab-panel>
        </q-tab-panels>
      </template>

    </q-splitter>
  </div>

</template>

<script setup name="work">
import pageStore from "stores/modules/page";
import {getCurrentInstance, ref,onActivated} from "vue";
const list = ref([]);
const autoplay= ref(true)
const  slide= ref(1)
const tab = ref('system');
const splitterModel = ref(20)
const usePage =pageStore();
const {proxy} = getCurrentInstance();
function tabsChange(val){
  usePage.setworkVal(val);
}
function toPage(val){

  if (val==1){
    proxy.$tab.pushRouter("/one")
  }else {
    proxy.$tab.pushRouter("/two")
  }
}
function initTabs(){
  const workVal=usePage.workVal
  if (workVal!=""){
    tab.value=workVal;
  }
}
initTabs();
</script>

<style scoped>
.container {
  column-count: 2;
  column-gap: 20px;
  padding: 10px;
}

.item {
  break-inside: avoid-column;
  margin-bottom: 20px;
  background-color: deepskyblue;
  height: 200px;
}
</style>
