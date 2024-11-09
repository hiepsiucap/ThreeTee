/** @format */

import PendingOrders from "../component/PendingOrders";

export default function OrderPending() {
  return (
    <div className="pl-72">
      <h1 className="text-2xl py-6">Đơn hàng chờ xác nhận</h1>
      <PendingOrders />
    </div>
  );
}
