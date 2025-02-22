import * as React from "react";

const Card = ({ children, className }) => (
  <div className={`bg-white p-6 rounded-lg shadow-md ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children }) => <div className="mb-4">{children}</div>;
const CardTitle = ({ children }) => <h2 className="text-xl font-bold">{children}</h2>;
const CardContent = ({ children }) => <div>{children}</div>;

export { Card, CardHeader, CardTitle, CardContent };
