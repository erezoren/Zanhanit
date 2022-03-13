import Image from "next/image";
import logo from "../../images/logo.png";

export const Logo = (props)=>{

  return(
      <a href={"/"}> <Image
          src={logo}
          width={60}
          height={60}
      /></a>
  )
}