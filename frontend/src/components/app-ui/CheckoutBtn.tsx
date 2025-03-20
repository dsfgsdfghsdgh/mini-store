import { ProductProps } from "@/common/types/types";
import { checkoutService } from "@/store/features/checkoutSlice";
import { useAppDispatch, useTypedSelector } from "@/store/store";
import toast from "react-hot-toast";

const CheckoutBtn = ({ items }: { items: ProductProps[] }) => {
  const { user } = useTypedSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const { error, isLoading } = useTypedSelector((state) => state.checkout);

  const handleCheckout = async () => {
    await dispatch(
      checkoutService({ email: user?.email as string, products: items })
    );
    if (error) {
      toast.error("Failed to checkout");
    }
    if (!error && !isLoading) {
      toast.success("Order checkout completed");
    }
  };

  return (
    <div className="mt-6">
      {user ? (
        <button
          onClick={handleCheckout}
          type="button"
          disabled={isLoading}
          className={`w-full rounded-md px-4 py-3 text-base font-medium text-white shadow-sm 
          duration-200 focus:outline-none focus:ring-2 focus:ring-skyText focus:ring-offset-2 
          focus:ring-offset-gray-50 ${
            isLoading
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-gray-800 hover:bg-black"
          }`}
        >
          {isLoading ? "Processing..." : "Checkout"}
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
