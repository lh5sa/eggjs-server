'use strict';

const fs = require('fs');
const path = require('path');
const { Controller } = require('egg');

class UploadController extends Controller {
  /**
   * 上传头像
   */
  async avatar() {
    const stream = await this.ctx.getFileStream();
    const res = await this.uploadFile(stream, 'avatar');
    this.ctx.success(res);
  }

  /**
   * 上传文件(生成随机文件名, 根据时间插件目录并分类)
   * @param {*} stream 文件流
   * @param {*} category 上传文件分类
   */
  uploadFile(stream, category) {
    if (typeof category !== 'string' || category.length === 0) {
      throw new TypeError('未知的文件分类');
    }
    return new Promise((resolve, reject) => {
      const date = new Date();
      const y = date.getFullYear(),
        m = date.getMonth() + 1,
        d = date.getDate(),
        h = date.getHours(),
        i = date.getMinutes();
      const randomStr = Math.random().toString(16).substr(2);
      const fileExt = path.extname(stream.filename);
      const filename = `${y}${m}${d}${h}${i}${randomStr}${fileExt}`;
      const uploadPath = `/public/uploads/${category}/${y}${m}`;
      const fullSavePath = path.join('app', uploadPath);
      if (!fs.existsSync(fullSavePath)) {
        fs.mkdirSync(fullSavePath, { recursive: true }); // 目录不存在就创建目录
      }
      const filepath = path.join(fullSavePath, filename); // 文件保存路径: app/public/uploads/xxx/xxx.jpg
      let url = path.join(uploadPath, filename); // 文件访问路径: public/uploads/xxx/xxx.jpg
      url = url.replace(/\\/g, '/');
      url = this.ctx.request.origin + url; // 完整访问路径: http://xxx.com/public/uploads/xxx/xxx.jpg
      const writeStream = fs.createWriteStream(filepath);
      stream.pipe(writeStream);
      writeStream.on('finish', () => resolve({ url }));
      writeStream.on('error', (e) => reject(e.message));
    });
  }
}

module.exports = UploadController;
