import {getAndCachePictures} from "../../lib/picturesHandlerServer";


export default async function handler(req, res) {
  getAndCachePictures().then(pics=>{
    res.status(200).json(pics)
  })

}
