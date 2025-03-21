import { payment } from "@/assets";
import Container from "./Container";
import FooterTop from "./FooterTop";

export default function Footer() {
  return (
    <div className="mt-10">
      <FooterTop />
      <Container className="flex flex-col md:flex-row items-center gap-4 justify-between md:px-4">
        <p>@2024 E-Commerce Solutions. All rights reserved.</p>
        <img draggable="false" src={payment} alt="payment-img"  className="object-cover"/>
      </Container>
    </div>
  )
}
