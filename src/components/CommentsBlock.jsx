import React from "react";
import { SideBlock } from "./SideBlock";

export const CommentsBlock = ({ children, isLoading = true }) => {
  return <SideBlock title="Коментарі">{children}</SideBlock>;
};
