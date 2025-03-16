import { mergedefaultCss } from "@/common/lib/mergeCustomTailwindCss";
import { Link } from "react-router-dom";

type LinkProps = {
  to?: string;
  children?: React.ReactNode;
  className?: string;
};

export default function LinkButton({ children, className, to }: LinkProps) {
  return (
    <Link
      replace
      to={to ? to : "/"}
      className={mergedefaultCss(
        " bg-darkText/80 hover:bg-darkText text-whiteText py-2.5 px-6 rounded-full flex items-center text-center gap-2 duration-200",
        className
      )}
    >
      {children ? children : "Shopping"}
    </Link>
  );
}
