<template>
    <el-upload
    class="upload-demo"
    drag
    multiple
    :data="httpContent"
    :action="state.domain"
    :on-success="handleAvatarSuccess"
  >
    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
    <div class="el-upload__text">
      Drop file here or <em>click to upload</em>
    </div>  
    <template #tip>
      <div class="el-upload__tip">
        jpg/png files with a size less than 500kb
      </div>
    </template>
  </el-upload>
  <button type="button" @click="delate">delete</button>
</template>

<script setup lang='ts'>
import { reactive, onBeforeMount} from 'vue'
import { UploadFilled } from '@element-plus/icons-vue'
import qiniuAPI from '../api/qiniu.js'
import axios from 'axios'

// :http-request="upqiniu"
const httpContent = reactive({
  token: '',
})

const state = reactive({
  domain: 'http://upload-z2.qiniup.com',
  key: "zf" + Math.floor(Math.random() * 100),
})
let currentData = reactive({
})
onBeforeMount(() => {
  qiniuAPI.getToken().then((res) => {
    httpContent.token = res.data
  })
}) 

const handleAvatarSuccess = (response, uploadFile, uploadFiles) =>{
  currentData = response
  // console.log(currentData)
}

const delate = () => {
  qiniuAPI.deleteFile( currentData.key ).then((res) => {
    console.log(res)
  }).catch((err) => {
    console.log(err)
  })
}

const upqiniu = (req) =>{
  console.log(req);
  var that = this;
  const config = {
    headers: { "Content-Type": "multipart/form-data" },
  };
  let filetype = "";
  if (req.file.type === "image/png") {
    filetype = "png";
  } else {
    filetype = "jpg";
  }

  const keyname =
  "lytton" +
  new Date() +
  Math.floor(Math.random() * 100) +
  "." +
  filetype;

  qiniuAPI.getToken().then((res) => {
    const formdata = new FormData();
    formdata.append("file", req);
    formdata.append("token", res.data);
    formdata.append("key", keyname);
    axios
      .post(state.domain, formdata, config)
      .then((res) => {
        console.log(res)
        // console.log(that.form)
        // that.imageUrl = "http://" + this.qiniuaddr + "/" + res.data.key;
        // that.$message({
        //   message: "上传成功",
        //   type: "success",
        // });
      })
      .catch((err) => {
        console.log(err);
      });
  }).catch((err) => {
      console.log(err);
  });

}
</script>

<style scoped lang="less">
</style>
