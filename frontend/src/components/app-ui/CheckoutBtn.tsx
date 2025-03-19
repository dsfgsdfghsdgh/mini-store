import { checkoutServiceRequest } from "@/common/lib/apiEndpoint";
import { ProductProps } from "@/common/types/types";
import API from "@/config/apiConfig";
import stripe from "@/config/stripe";
import { useTypedSelector } from "@/store/store";

const CheckoutBtn = ({ products }: { products: ProductProps[] }) => {
  const { user } = useTypedSelector((state) => state.auth);
  const handleCheckout = async () => {
    try {
      const respone = await API.post(checkoutServiceRequest, {
        products,
        email: user?.email,
      });
      const data = respone.data;
      const result = await stripe?.redirectToCheckout({
        sessionId: data.stripeSessionId,
      });
      if (result?.error) {
        console.log("Error:", result);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="mt-6">
      {user ? (
        <button
          onClick={handleCheckout}
          type="button"
          className="w-full rounded-md bg-gray-800 px-4 py-3 text-base font-medium text-white shadow-sm 
          hover:bg-black focus:outline-none focus:ring-2 focus:ring-skyText focus:ring-offset-2 
          focus:ring-offset-gray-50 duration-200"
        >
          Checkout
        </button>
      ) : (
        <>
          <button className="w-full text-base text-white text-center rounded-md bg-gray-500 px-4 py-3">
            Sign in to Checkout
          </button>
          <p className="mt-2 text-sm font-medium text-red-500 text-center">
            You need to sign in to proceed with checkout.
          </p>
        </>
      )}
    </div>
  );
};

export default CheckoutBtn;
