import { checkoutServiceRequest } from "@/common/lib/apiEndpoint";
import { ProductProps } from "@/common/types/types";
import API from "@/config/apiConfig";
import stripe from "@/config/stripe";
import { resetCart } from "@/store/features/cartSlice";
import { useAppDispatch, useTypedSelector } from "@/store/store";
import { useState } from "react";

const CheckoutBtn = ({ products }: { products: ProductProps[] }) => {
  const { user } = useTypedSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (loading) return; // Prevent multiple clicks
    setLoading(true);

    try {
      const response = await API.post(checkoutServiceRequest, {
        products,
        email: user?.email,
      });

      const sessionId = response.data?.data?.stripeSessionId;

      if (!sessionId) throw new Error("Invalid session ID");

      const result = await stripe?.redirectToCheckout({ sessionId });

      if (result?.error) {
        console.error("Stripe Error:", result.error.message);
      } else {
        dispatch(resetCart());
      }
    } catch (error) {
      console.error("Checkout Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6">
      {user ? (
        <button
          onClick={handleCheckout}
          type="button"
          disabled={loading}
          className={`w-full rounded-md px-4 py-3 text-base font-medium text-white shadow-sm 
          duration-200 focus:outline-none focus:ring-2 focus:ring-skyText focus:ring-offset-2 
          focus:ring-offset-gray-50 ${
            loading
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-gray-800 hover:bg-black"
          }`}
        >
          {loading ? "Processing..." : "Checkout"}
        </button>
      ) : (
        <>
          <button
            disabled
            className="w-full text-base text-white text-center rounded-md bg-gray-500 px-4 py-3 cursor-not-allowed"
          >
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
