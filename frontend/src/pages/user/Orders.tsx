import Container from "@/components/app-ui/Container";
import Loading from "@/components/app-ui/Loading";
import { orderService } from "@/store/features/orderSlice";
import { useAppDispatch, useTypedSelector } from "@/store/store";
import { format } from "date-fns";
import { useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Badge from "@/components/app-ui/Badge";

const Order = () => {
  const {
    data: orders,
    isLoading,
    error,
  } = useTypedSelector((state) => state.order);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(orderService());
  }, [dispatch]);

  if (isLoading) {
    return (
      <Container className="flex justify-center items-center h-screen">
        <Loading />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="flex justify-center items-center h-screen text-red-500">
        {error}
      </Container>
    );
  }

  return (
    <Container className="py-10 px-4">
      <h2 className="text-2xl font-semibold py-5 text-center">
        🛒 Your Orders
      </h2>

      <div className="md:px-6">
        {orders && orders.length > 0 ? (
          <Accordion type="multiple" className="space-y-4">
            {orders.map((order) => (
              <AccordionItem
                key={order.id}
                value={order.id}
                className="border rounded-lg bg-white shadow-sm max-w-3xl mx-auto"
              >
                <AccordionTrigger className="px-4 flex justify-between items-center w-full hover:no-underline cursor-pointer">
                  <div>
                    <h3 className="text-lg font-semibold">Order #{order.id}</h3>
                    <p className="text-sm text-gray-500">
                      Placed on {format(new Date(order.createdAt), "PPP")}
                    </p>
                  </div>
                  <Badge
                    label={
                      order.status === "completed" ? "Completed" : "Pending"
                    }
                    className={
                      order.status === "completed"
                        ? "bg-green-500 text-white"
                        : "bg-yellow-500 text-black"
                    }
                  />
                </AccordionTrigger>

                <AccordionContent className="p-4 border-t">
                  <div className="space-y-4">
                    {order.orderItems.map((item) => (
                      <div
                        key={item._id}
                        className="flex flex-col sm:flex-row sm:items-center gap-4 border-b pb-3"
                      >
                        <img
                          draggable="false"
                          src={item.images?.[0]}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-md"
                        />
                        <div className="flex-1">
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-500">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <p className="font-semibold">₹{item.discountedPrice}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                    <p className="font-semibold text-lg">
                      Total: ₹{order.totalAmount}
                    </p>
                    <p className="text-sm text-gray-600">
                      Payment: {order.paymentMethod}
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <p className="text-center text-gray-500">No orders found.</p>
        )}
      </div>
    </Container>
  );
};

export default Order;
