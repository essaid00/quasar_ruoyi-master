import {Notify,Loading} from 'quasar'


export default {
  // 消息提示
  msg(content) {
    Notify.create({
      message: content,
      position: "center"
    })
  },
  // 错误消息
  msgError(content) {
    Notify.create({
      message: content,
      type: "negative",
      position: "center"
    })
  },
  // 成功消息
  msgSuccess(content) {
    Notify.create({
      message: content,
      type: "positive",
      position: "center"
    })
  },
  // 警告消息
  msgWarning(content) {
    Notify.create({
      message: content,
      type: "warning",
      position: "center"
    })
  },

  // 打开遮罩层
  loading(content) {
    if (!content){
      content="正在加载..."
    }
    Loading.show({
      message: content,
      boxClass: 'bg-grey-2 text-grey-9',
      spinnerColor: 'primary'
    })
  },
  // 关闭遮罩层
  closeLoading() {
    Loading.hide();
  }
}
