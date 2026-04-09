import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center section-padding">
      <div className="text-center">
        <h1 className="font-heading font-bold text-8xl sm:text-9xl gradient-text mb-4 animate-float">
          404
        </h1>
        <p className="font-body text-xl text-lumina-text-secondary mb-8">
          This page doesn't exist in this dimension.
        </p>
        <Link to="/" className="btn-primary inline-block">
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
