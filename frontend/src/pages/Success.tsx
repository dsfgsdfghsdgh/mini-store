import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Container from "@/components/app-ui/Container";
import Loading from "@/components/app-ui/Loading";
import { useAppDispatch, useTypedSelector } from "@/store/store";
import API from "@/config/apiConfig";
import { newOrderRequest } from "@/common/lib/apiEndpoint";
import { resetCart } from "@/store/features/cartSlice";

const Success = () => {
  const cartProduct = useTypedSelector((state) => state.cart.cartProducts);
  const location = useLocation();
  const sessionId = new URLSearchParams(location.search).get("session_id");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const totalAmount = cartProduct.reduce(
    (acc, curr) => acc + curr.discountedPrice * curr.quantity,
    0
  );

  useEffect(() => {
    // if (!sessionId) {
    //   navigate("/");
    //   return;
    // }
    console.log("session_id is " + sessionId);

    if (cartProduct.length === 0) return; // Prevent API call if no products

    const saveOrder = async () => {
      try {
        setLoading(true);
        const response = await API.post(newOrderRequest, {
          paymentId: sessionId,
          orderItems: cartProduct,
          totalAmount: String(totalAmount),
          paymentMethod: "stripe",
        });

        if (!response?.data) throw new Error("Order failed to save");

        dispatch(resetCart());
        toast.success("Payment accepted successfully & order saved!");
      } catch (error) {
        toast.error("Error saving order data");
        console.error("Error saving order data:", error);
      } finally {
        setLoading(false);
      }
    };

    saveOrder();
  }, [sessionId, cartProduct, totalAmount, dispatch, navigate]);

  return (
    <Container>
      {loading && <Loading />}
      <div className="min-h-[400px] flex flex-col items-center justify-center gap-y-5">
        <h2 className="text-2xl md:text-4xl font-bold text-center">
          {loading
            ? "Your order payment is processing"
            : "Your Payment is Accepted!"}
        </h2>
        <p>
          {loading
            ? "Please wait..."
            : "You can now view your orders or continue shopping."}
        </p>
        <div className="flex items-center gap-x-5">
          <Link to={"/orders"}>
            <button className="bg-black text-white w-52 h-12 rounded-full font-semibold hover:bg-primeColor transition duration-300">
              View Orders
            </button>
          </Link>
          <Link to={"/"}>
            <button className="bg-black text-white w-52 h-12 rounded-full font-semibold hover:bg-primeColor transition duration-300">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default Success;
