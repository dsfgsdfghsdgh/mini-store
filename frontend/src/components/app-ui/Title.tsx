import { mergedefaultCss } from "@/lib/mergeCustomTailwindCss";
interface Props {
  text: string;
  className?: string;
}
const Title = ({ text, className }: Props) => {
  return <h2 className={mergedefaultCss("text-4xl font-bold", className)}>{text}</h2>;
};

export default Title;