import {getAndCachePictures} from "../../lib/picturesHandlerServer";


export default async function handler(req, res) {
  let andCachePictures = await getAndCachePictures();
  res.status(200).json(andCachePictures)
}
