import * as React from "react";

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={`w-full p-2 border rounded-md ${className}`}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = "Input";
export default Input;
