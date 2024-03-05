<template>
  <q-dialog v-model="dialog" @before-hide="dialogHide" position="bottom">
    <q-card class="mycard">

      <q-toolbar>
        <q-toolbar-title> 编辑头像</q-toolbar-title>
        <q-btn flat round dense icon="close" v-close-popup/>
      </q-toolbar>
      <div v-if="avatarUrl" class="img">
        <img :src="avatarUrl" class="profile-pic" @click.native="chooseFile">
      </div>
      <q-list bordered>
        <q-item v-ripple>

          <q-item-section avatar>
            <q-icon color="primary" name="image"/>
          </q-item-section>
          <q-item-section @click.native="chooseFile">选择图片</q-item-section>
          <q-item-section side>
            <q-btn color="primary" label=" 提交 " rounded @click.native="upload" style="width:100px"/>
          </q-item-section>
        </q-item>
      </q-list>

      <q-uploader
        style="display: none"
        ref="uploader"
        @uploaded="uploaded"
        accept=".jpg, .png"
        @factory-failed="factoryFailed"
        @added="beforeUpload"
        @finish="finshUpload"
        @failed="failed"
        :factory="customFactory"
      />
    </q-card>
  </q-dialog>
</template>

<script setup name="editAvatr">import config from "src/config/index"
import useUserStore from "stores/modules/user";
import {ref, defineProps, getCurrentInstance} from "vue";
import {getToken} from "src/utils/auth";
const prop = defineProps({
  userAvatar: {type: String, default: ""}
})
const {proxy} = getCurrentInstance();
const dialog = ref(true);
const uploader = ref(null)
const avatarUrl = ref(null)
const avatarImgFile = ref(null)
const emit = defineEmits({
  close: false, // 表示 myEvent 事件必须传递参数
});
const uploadUrl = config.baseUrl + config.avatarUploadsURL
avatarUrl.value = prop.userAvatar;
const userStroe = useUserStore();

//选择图片
function chooseFile() {
  proxy.$refs.uploader.reset();
  setTimeout(() => {
    //打开选择器
    proxy.$refs.uploader.pickFiles();
  }, 100)
}
function dialogHide() {
  emit("close")
}
//处理
function beforeUpload(event) {
  let item = event[0];
  avatarImgFile.value = item
  avatarUrl.value = item.__img.src;
}

function uploaded(info) {
  if (info.xhr && info.xhr.status === 200) {
    const response = JSON.parse(info.xhr.response)
    if (response && response.code ==200) {
      userStroe.avatar=config.baseUrl + response.imgUrl;
      proxy.$modal.msgSuccess("修改成功!")
    }else {
      console.log(response)
      proxy.$modal.msgError(response.msg?response.msg:"出错了!")
    }
  }else {
    proxy.$modal.msgError("出错了！")
  }
}

//失败
function failed(info) {
  console.log("failed", info)
  proxy.$modal.closeLoading();
}

function customFactory(file) {
  let token='Bearer ' + getToken();
  let configs = {
    fieldName: "avatarfile",
    url: uploadUrl,
    method: 'POST',
    headers:[
      {name: 'Authorization', value: token}

    ]
  }
  return configs;
}

function factoryFailed(info) {
  console.log("factorFailed", info)
  proxy.$modal.msgError("出错了！")
}

//上传头像
function upload() {
  if (avatarImgFile.value==null){
    return proxy.$modal.msgError("请选择图片!")
  }
  console.log(avatarImgFile)
  proxy.$refs.uploader.upload();
}
function finshUpload(info) {
  dialogHide();
}
</script>

<style scoped>
.img {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 10px;
}

.profile-pic {
  width: 150px;
  height: 150px;
  overflow: hidden;
  border-radius: 50%;
}

.mycard {
  width: 100%;
}
</style>
