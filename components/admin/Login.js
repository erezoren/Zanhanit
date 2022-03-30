import Link from 'next/link'
export const Login=(props)=>{
  return(
      <div>
        <h6 className="title">
          <Link href="/api/auth/login">
            <a>Login</a>
          </Link>
        </h6>
        <h6 className="title">
          <Link href="/api/auth/logout">
            <a>Logout</a>
          </Link>
        </h6>
      </div>
  )
}