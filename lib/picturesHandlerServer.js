import admin from "../firebase/nodeApp";

const NodeCache = require("node-cache");
const picturesCache = new NodeCache();
const _ = require('lodash/core');

export const getAndCachePictures = async () => {
  try {
    console.log("picturesCache: " + picturesCache.get("images"))
    if (!picturesCache.has("images")) {
      let storage = admin.storage;
      const [files] = await storage().bucket(
          process.env.storageBucket).getFiles({directory: 'images'});
      console.log('Fetching Images:');
      let allFiles = Promise.all(await files.map(async (file) => {
        await file.makePublic();
        return file.publicUrl();
      }));
      picturesCache.set("images", allFiles);
    }
    return picturesCache.get("images");
  } catch (e) {
    console.error(e);
    return [];
  }

}

