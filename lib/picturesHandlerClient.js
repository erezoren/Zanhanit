import {getDownloadURL, listAll, ref} from "firebase/storage";
import {storage} from "../firebase/clientApp";


export const listAllPictures = async () => {
  console.log("List all pics.....")
  const listRef = ref(storage, 'images/');
  let all = await listAll(listRef);
  return all.items.map(async (item) => {
    const du =  await getDownloadURL(item);
    console.log(du)
    return du;
  })
}


