
import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blurt-base p-4">
      <div className="text-center max-w-md animate-fade-in">
        <h1 className="text-6xl font-semibold mb-4 text-blurt-dark">404</h1>
        <p className="text-xl text-blurt-secondary mb-6">
          This page doesn't exist
        </p>
        <p className="text-blurt-secondary mb-8">
          The page you're looking for can't be found. It might have been moved or deleted.
        </p>
        <Link 
          to="/" 
          className="blurt-button inline-block"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
