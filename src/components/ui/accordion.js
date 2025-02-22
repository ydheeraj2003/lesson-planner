import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";

const Accordion = ({ items }) => {
  return (
    <AccordionPrimitive.Root type="single" collapsible>
      {items.map(({ title, content }, index) => (
        <AccordionPrimitive.Item key={index} value={`item-${index}`}>
          <AccordionPrimitive.Header>
            <AccordionPrimitive.Trigger className="text-lg font-semibold border-b py-2">
              {title}
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>
          <AccordionPrimitive.Content className="p-2">{content}</AccordionPrimitive.Content>
        </AccordionPrimitive.Item>
      ))}
    </AccordionPrimitive.Root>
  );
};

export default Accordion;
