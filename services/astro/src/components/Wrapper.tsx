import { Button } from "@comp/shadui/ui/button";
import React from "react";

// Define the component using a functional approach
export const Wrapper: React.FC = () => (
  <div>
    <Button onClick={() => console.log("hello world")}>Hello world</Button>
  </div>
);
