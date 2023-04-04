import { ButtonHTMLAttributes } from "react";
import { IconKeys, Icons } from "./icons";
import "./iconButton.css";

export type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: IconKeys;
};

export const IconButton = ({ icon, className, ...props }: IconButtonProps) => {
  const Icon = Icons[icon];

  return (
    <button className={`iconButton ${className}`} {...props}>
      <Icon />
    </button>
  );
};
