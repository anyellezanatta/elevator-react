import { ButtonHTMLAttributes } from "react";
import { IconKeys, Icons } from "./icons";
import "./iconButton.css";
import classNames from "classnames";

export type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: IconKeys;
};

export const IconButton = ({
  icon,
  className = "",
  ...props
}: IconButtonProps) => {
  const Icon = Icons[icon];

  const btnClass = classNames("icon-button", {
    [className]: !!className,
  });

  return (
    <button className={btnClass} {...props}>
      <Icon className="svg-icon" fill="black" />
    </button>
  );
};
