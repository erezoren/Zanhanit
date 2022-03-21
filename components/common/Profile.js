import React from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import {Image} from "react-bootstrap";

export default function Profile() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
      user && (
          <div dir={"ltr"}>
            <Image fluid={true} roundedCircle={true}
                   src={user.picture}
                   alt={user.name}
                   title={user.name}
                   width={"60px"}
            />
          </div>
      )
  );
}
