import { useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { FiCheckCircle } from "react-icons/fi";
import Container from "@/components/app-ui/Container";
import { useAppDispatch } from "@/store/store";
import { resetCart } from "@/store/features/cartSlice";

const Success = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const sessionId = new URLSearchParams(location.search).get("session_id");
  const exp = new URLSearchParams(location.search).get("exp");
  const dispatch = useAppDispatch();

  const isValid = Date.now() <= Number(exp || "0");

  useEffect(() => {
    if (!sessionId || !isValid) {
      navigate("/", { replace: true });
    }
    dispatch(resetCart());
  }, [sessionId, navigate, isValid, dispatch]);

  return (
    <Container className="justify-center flex">
      <div className="bg-gray-900 shadow-lg rounded-lg p-8 text-center w-[90%] max-w-md">
        <FiCheckCircle className="text-green-400 text-6xl mx-auto" />
        <h2 className="text-2xl md:text-3xl font-bold mt-4 text-white">
          Payment Successful!
        </h2>
        <p className="text-gray-400 mt-2">
          Your order has been placed successfully.
        </p>

        <div className="flex gap-4 mt-6">
          <Link to="/orders" replace>
            <button className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition duration-300">
              View Orders
            </button>
          </Link>
          <Link to="/" replace>
            <button className="bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition duration-300">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default Success;
