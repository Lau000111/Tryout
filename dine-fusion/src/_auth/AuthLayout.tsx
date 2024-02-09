import { Redirect } from 'react-router-dom';
import React, { ReactNode } from 'react';
import { useUserContext } from "../contexts/AuthContext";

type AuthLayoutProps = {
  children: ReactNode;
};

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  const { isAuthenticated } = useUserContext();

  return (
    <>
      {isAuthenticated ? (
        <Redirect to="/" />
      ) : (
        <>
          <section className="flex flex-1 justify-center items-center flex-col">
            {children}
          </section>

          <img
            src="/assets/images/logo.png"
            alt="logo"
            className="hidden xl:block h-screen w-1/2 object-cover bg-no-repeat"
          />
        </>
      )}
    </>
  );
}

export default AuthLayout;