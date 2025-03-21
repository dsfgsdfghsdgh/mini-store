import { IoHome } from "react-icons/io5";
import { RiShoppingBag4Fill } from "react-icons/ri";
import { FiShoppingCart } from "react-icons/fi";
import { FaBoxes } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
export const bottomNavigation = [
  { title: "Home", link: "/", icon: IoHome },
  { title: "Shop", link: "/product", icon: RiShoppingBag4Fill },
  { title: "Cart", link: "/cart", icon: FiShoppingCart },
  { title: "Orders", link: "/orders", icon: FaBoxes },
  { title: "My Account", link: "/user", icon: FaUser },
];
