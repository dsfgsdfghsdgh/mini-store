import { mergedefaultCss } from "@/common/lib/mergeCustomTailwindCss";

type BadgeProps = {
  label?: string;
  variant?: "success" | "warning" | "danger" | "info" | "default";
  className?: string;
};

export default function Badge({ label, variant = "default", className }: BadgeProps) {
  const variantClasses = {
    success: "bg-green-500 text-white",
    warning: "bg-yellow-500 text-black",
    danger: "bg-red-500 text-white",
    info: "bg-blue-500 text-white",
    default: "bg-gray-500 text-white",
  };

  return (
    <span
      className={mergedefaultCss(
        `px-2 py-1 text-xs font-medium rounded-full absolute top-6 right-10 ${variantClasses[variant]}`,
        className
      )}
      role="status"
    >
      {label}
    </span>
  );
}
