import http from "../utils/myHttp"

const Qiniu = {
  // 获取上传证书秘钥
  getToken() {
    return new Promise((resolve, reject) => {
      http
        .get(`/qiniu/qiniutoken`)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err.data);
        });
    });
  },
  deleteFile(key: string) {
    return new Promise((resolve, reject) => {
      http
        .post(`/qiniu/delfile`,{
          key
        })
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err.data);
        });
    });
  }
};
export default Qiniu;
