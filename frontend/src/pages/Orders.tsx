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

      {orders && orders.length > 0 ? (
        <Accordion type="multiple" className="space-y-4 ">
          {orders.map((order) => (
            <AccordionItem
              key={order.id}
              value={order.id}
              className="border rounded-lg bg-white shadow-sm relative"
            >
              <AccordionTrigger className="px-4 flex justify-between items-center w-full hover:no-underline cursor-pointer ">
                <div>
                  <h3 className="text-lg font-semibold">Order #{order.id}</h3>
                  <p className="text-sm text-gray-500">
                    Placed on {format(new Date(order.createdAt), "PPP")}
                  </p>
                </div>
                <Badge
                  label="Completed"
                  variant="success"
                />
              </AccordionTrigger>

              <AccordionContent className="p-4 border-t">
                <div className="space-y-3">
                  {order.orderItems.map((item) => (
                    <div
                      key={item._id}
                      className="flex flex-col md:flex-row md:items-center gap-4 border-b pb-3"
                    >
                      <img
                        src={item.images?.[0]}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md"
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

                <div className="mt-4 flex flex-col md:flex-row md:justify-between md:items-center gap-2">
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
    </Container>
  );
};

export default Order;
