import { Order } from "@/types";
import { Separator } from "./ui/separator";

type Props = {
  order: Order;
};

const OrderStatusDetail = ({ order }: Props) => {
  const calculateTotalAmount = () => {
    if (order.totalAmount) {
      return order.totalAmount;
    }
    
    // Calculate total from cart items and delivery price
    const itemsTotal = order.cartItems.reduce((total, item) => {
      const menuItem = order.restaurant.menuItems.find(
        (menuItem) => menuItem._id === item.menuItemId
      );
      return total + (menuItem?.price || 0) * parseInt(item.quantity);
    }, 0);
    
    return itemsTotal + order.restaurant.deliveryPrice;
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col">
        <span className="font-bold">Delivering to:</span>
        <span>{order.deliveryDetails.name}</span>
        <span>
          {order.deliveryDetails.addressLine1}, {order.deliveryDetails.city}
        </span>
      </div>
      <div className="flex flex-col">
        <span className="font-bold">Your Order</span>
        <ul>
          {order.cartItems.map((item, index) => (
            <li key={`${item.menuItemId}-${item.name}-${index}`}>
              {item.name} x {item.quantity}
            </li>
          ))}
        </ul>
      </div>
      <Separator />
      <div className="flex flex-col">
        <span className="font-bold">Total</span>
        <span>£{(calculateTotalAmount() / 100).toFixed(2)}</span>
      </div>
    </div>
  );
};

export default OrderStatusDetail;
