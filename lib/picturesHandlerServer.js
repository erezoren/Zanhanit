import admin from "../firebase/nodeApp";

const NodeCache = require("node-cache");
const picturesCache = new NodeCache();
const _ = require('lodash/core');

const imagesKey = "images";
export const getAndCachePictures = async () => {
  try {
    console.log("picturesCache: " + picturesCache.get(imagesKey))
    if (!picturesCache.has(imagesKey)) {
      let storage = admin.storage;
      const [files] = await storage().bucket(
          process.env.storageBucket).getFiles({directory: imagesKey});
      console.log('Fetching Images:');
      let allFiles = Promise.all(await files.map(async (file) => {
        await file.makePublic();
        return file.publicUrl();
      }));
      picturesCache.set(imagesKey, allFiles);
    }
    return picturesCache.get(imagesKey);
  } catch (e) {
    console.error(e);
    return [];
  }

}

