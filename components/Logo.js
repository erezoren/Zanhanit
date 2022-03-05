import Image from "next/image";
import logo from "../images/לוגו.png";

export const Logo = (props)=>{

  return(
      <a href={"/"}> <Image
          src={logo}
          width={50}
          height={50}
      /></a>
  )
}