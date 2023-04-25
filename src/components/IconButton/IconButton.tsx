import { ButtonHTMLAttributes } from "react";
import classNames from "classnames";
import { IconKeys, Icons } from "./icons";
import "./icon-button.css";

export type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: IconKeys;
};

export const IconButton = ({ icon, className = "", ...props }: IconButtonProps) => {
  const Icon = Icons[icon];

  const btnClass = classNames("flex", "icon-button", {
    [className]: !!className,
  });

  return (
    <button className={btnClass} {...props}>
      <Icon className="svg-icon" />
    </button>
  );
};
