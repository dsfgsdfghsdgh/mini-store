import { ProductType } from "../../common/types/product";
import { stripe } from "../../config/stripe";
import { CLIENT_URI } from "../../constants/getEnv";
import { INTERNAL_SERVER_ERROR } from "../../constants/httpCode";
import appAssert from "../../middlewares/appAssert.middleware";

type checkoutServiceProps = {
  products: ProductType[];
  email: string;
};

export const checkoutService = async (data: checkoutServiceProps) => {
  const extractData = data.products.map((p) => ({
    quantity: p.quantity,
    price_data: {
      currency: "USD",
      unit_price: p.discountedPrice * 100,
      product_data: {
        name: p.name,
        variant_id: p._id,
        images: p.images,
        description: p.description,
      },
    },
  }));

  const stripeSession = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: extractData,
    mode: "payment",
    success_url: `${CLIENT_URI}/success?session_id ={CHECKOUT_ID}`,
    cancel_url: `${CLIENT_URI}/cancel`,
    customer_email: data.email,
    metadata: {
      email: data.email,
    },
  });

  appAssert(stripeSession, INTERNAL_SERVER_ERROR, "Error in Stripe session");

  return {
    stripeSessionId: stripeSession.id,
  };
};
