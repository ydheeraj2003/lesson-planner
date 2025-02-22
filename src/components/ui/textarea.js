import * as React from "react";

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      className={`w-full p-2 border rounded-md ${className}`}
      ref={ref}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";
export default Textarea;
