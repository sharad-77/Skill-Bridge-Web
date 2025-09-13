import React from "react";
import { cn } from "../../lib/utils.js";

export default function Button({
  children,
  className,
  variant = "default",
  size = "md",
  leftIcon,
  rightIcon,
  asChild = false,
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center flex-row gap-2 rounded-xl font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer";

  const variantStyles = {
    default:
      "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700",
    success: "bg-green-600 text-white hover:bg-green-700",
    danger: "bg-red-500 text-white hover:bg-red-700",
    outline:
      "border border-gray-300 text-gray-700 hover:border-purple-400 hover:text-purple-600",
  };

  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-2.5 text-lg",
    xl: "px-6 py-3 text-xl",
  };

  const mergedClassName = cn(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      className: cn(mergedClassName, children.props.className),
      ...props,
    });
  }

  return (
    <button className={mergedClassName} {...props}>
      {leftIcon && leftIcon}
      {children}
      {rightIcon && rightIcon}
    </button>
  );
}
