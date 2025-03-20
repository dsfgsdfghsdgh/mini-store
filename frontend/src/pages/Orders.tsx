// import { Accordion, AccordionItem } from "@/components/ui/accordion";
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Link } from "react-router-dom";
// import Container from "@/components/app-ui/Container";
// import FormattedPrice from "@/components/app-ui/FormattedPrice";

// const hardcodedOrders = [
//   {
//     paymentId: "PAY1234567890",
//     orderItems: [
//       {
//         _id: "1",
//         name: "Wireless Headphones",
//         description: "Noise-canceling Bluetooth headphones",
//         quantity: 2,
//         discountedPrice: 100,
//         images: ["/images/headphones.jpg"],
//       },
//       {
//         _id: "2",
//         name: "Smart Watch",
//         description: "Water-resistant with heart-rate monitoring",
//         quantity: 1,
//         discountedPrice: 150,
//         images: ["/images/smartwatch.jpg"],
//       },
//     ],
//   },
// ];

// const Orders = () => {
//   return (
//     <Container>
//       {hardcodedOrders.length > 0 ? (
//         <div className="max-w-5xl mx-auto">
//           <h2 className="text-2xl font-bold mt-1">Customer Order Details</h2>
//           <p className="text-gray-600">
//             Total Orders: {hardcodedOrders.length}
//           </p>

//           <div className="space-y-6 divide-y divide-gray-200">
//             <Accordion type="single" collapsible>
//               {hardcodedOrders.map((order) => {
//                 const totalAmt = order.orderItems.reduce(
//                   (acc, item) => acc + item.discountedPrice * item.quantity,
//                   0
//                 );

//                 return (
//                   <AccordionItem key={order.paymentId} value={order.paymentId}>
//                     <Card className="p-4">
//                       <h3 className="text-lg font-semibold">
//                         Tracking Number: {order.paymentId}
//                       </h3>
//                       <p>
//                         Order Amount: <FormattedPrice amount={totalAmt} />
//                       </p>
//                       <div className="mt-4">
//                         {order.orderItems.map((item) => (
//                           <div
//                             key={item._id}
//                             className="flex gap-4 border-b pb-3"
//                           >
//                             <img
//                               src={item.images[0]}
//                               alt={item.name}
//                               className="w-20 h-20 object-cover rounded-md"
//                             />
//                             <div>
//                               <h4 className="font-medium">{item.name}</h4>
//                               <p className="text-gray-600 text-sm">
//                                 {item.description}
//                               </p>
//                               <p>Quantity: {item.quantity}</p>
//                               <p className="font-bold">
//                                 Price:{" "}
//                                 <FormattedPrice amount={item.discountedPrice} />
//                               </p>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </Card>
//                   </AccordionItem>
//                 );
//               })}
//             </Accordion>
//           </div>
//         </div>
//       ) : (
//         <div className="flex flex-col items-center text-center">
//           <p className="text-2xl font-semibold">No orders yet</p>
//           <p>You haven't made any purchases yet.</p>
//           <Button asChild>
//             <Link to="/product">Go to Shopping</Link>
//           </Button>
//         </div>
//       )}
//     </Container>
//   );
// };

// export default Orders;


export default function Orders() {
  return (
    <div>
      
    </div>
  )
}
