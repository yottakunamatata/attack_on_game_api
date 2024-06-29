import express, { Request, Response } from 'express';
import admin from '../services/firebase';
import multer, { FileFilterCallback } from 'multer';
import { file } from 'googleapis/build/src/apis/file';
import firebaseAdmin from '../services/firebase';

const bucket = firebaseAdmin.storage().bucket();

export const uploadPic = async (req: Request, res: Response) => {
  try {
    const file = req.file;
    if (!file) {
      return res
        .status(400)
        .send({ success: false, message: '沒有上傳的檔案' });
    }
    // check forderName validation
    const validcategory = ['player', 'store', 'event'];
    if (validcategory.includes(req.params.catagory)) {
      // generate related filename
      const originalname = file.originalname;
      const extension = originalname.split('.').pop() || 'jpg';
      const filename = `${req.params.id}.${extension}`;
      const blob = bucket.file(`${req.params.catagory}/${filename}`);
      const blobStream = blob.createWriteStream();

      blobStream.on('finish', () => {
        blob.getSignedUrl(
          {
            action: 'read', // 權限
            expires: '12-31-2500', // 網址的有效期限
          },
          (err, imgUrl) => {
            if (err) {
              return res
                .status(500)
                .send({ message: '取得檔案網址失敗', error: err.message });
            }
            res.send({
              success: true,
              message: '圖片上傳成功',
              imgURL: imgUrl,
            });
          },
        );
      });

      blobStream.on('error', (err) => {
        res.status(500).send({
          success: false,
          message: '圖片上傳失敗',
          error: err.message,
        });
      });
      blobStream.end(file.buffer);
    } else {
      return res.status(500).send({ message: 'Route輸入格式錯誤' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Error image uploading.', error: error });
  }
};

// 取得檔案夾內圖片
const validcategory = ['player', 'store', 'event'];
export const getPics = async (req: Request, res: Response) => {
  if (validcategory.includes(req.params.catagory)) {
    const folderPath = `${req.params.catagory}/`;
    bucket
      .getFiles({ prefix: folderPath })
      .then((data) => {
        return data[0];
      })
      .then(async (files) => {
        const fileList = [];
        for (const file of files) {
          // get file url
          const fileUrl = await file.getSignedUrl({
            action: 'read',
            expires: '12-31-2500',
          });
          fileList.push({
            fileName: file.name,
            imgUrl: fileUrl,
          });
        }
        res.send({ fileList });
      })
      .catch((err) => {
        res.status(500).send({ message: '取得圖片列表失敗' });
      });
  } else {
    return res.status(500).send({ message: 'Route輸入格式錯誤' });
  }
};
