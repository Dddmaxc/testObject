import React from "react";
import styles from "./CustomButton.module.css";

interface CustomButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
  icon?: React.ReactNode;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  onClick,
  variant = "primary",
  size = "medium",
  disabled = false,
  type = "button",
  className = "",
  icon,
}) => {
  const buttonClass = `${styles.customButton} ${
    styles[`customButton--${variant}`]
  } ${styles[`customButton--${size}`]} ${
    disabled ? styles["customButton--disabled"] : ""
  } ${className}`;

  return (
    <button
      type={type}
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span className={styles.customButton__icon}>{icon}</span>}
      {children}
    </button>
  );
};
