import React, { useEffect } from "react";

export const Navigate = () => {
  useEffect(() => {
    const a = document.createElement("a");
    a.href = "http://upmines.upsdc.gov.in";
    a.click();
  });
  return <div></div>;
};
