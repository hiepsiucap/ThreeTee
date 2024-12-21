/** @format */

import PendingOrders from "../component/PendingOrders";

export default function OrderPending() {
  return (
    <div className="px-6 md:px-0 md:pl-72">
      <h1 className="text-2xl py-6">Đơn hàng chờ xác nhận</h1>
      <PendingOrders />
    </div>
  );
}
