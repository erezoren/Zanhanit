import {useUser} from "@auth0/nextjs-auth0";
import {Button} from "react-bootstrap";

export const Login = (props) => {
  const {user, error, isLoading} = useUser();

  return (
      <div>
        {!user && <h6 className="title">
          <Button variant="warning" href="/api/auth/login">Login</Button>
        </h6>}
        {user && <h6 className="title">
          <Button variant="warning" href="/api/auth/logout">Logout</Button>
        </h6>}
      </div>
  )
}