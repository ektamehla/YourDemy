import React from "react";
import { ProgressSpinner } from 'primereact/progressspinner';

const Loading = () => {
  return (
    <div className="overlay">
    <ProgressSpinner style={{width: '50px', height: '50px'}} strokeWidth="8" animationDuration=".5s" />
    </div>
  );
};

export default Loading;
