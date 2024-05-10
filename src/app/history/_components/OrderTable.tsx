"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import { formatPrice } from "@/lib/utils";
import Invoice from "./Invoice";

const LABEL_MAP: Record<string, string> = {
  awaiting_shipment: "Awaiting Shipment",
  fulfilled: "Fulfilled",
  shipped: "Shipped",
};

function OrderTable({ orders }: { orders: any[] }) {

  const [selectedOrder, setSelectedOrder] = React.useState<any>(null);
  const [invoiceModalOpen, setInvoiceModalOpen] = React.useState(false);

  return (
    <>
      <Invoice
        isOpen={invoiceModalOpen}
        setIsOpen={setInvoiceModalOpen}
        order={selectedOrder}
      />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Shipping address</TableHead>
            <TableHead>Order ID</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="hidden sm:table-cell">
              Purchase date
            </TableHead>
            <TableHead>Amount</TableHead>
            <TableHead className="text-right">Invoice</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id} className="bg-accent">
              <TableCell>
                <div className="font-medium">
                  {order.shippingAddress?.city
                    ? `${order.shippingAddress.city}, `
                    : null}{" "}
                  {order.shippingAddress?.state
                    ? `${order.shippingAddress.state}`
                    : null}
                </div>
                <div className="hidden text-sm text-muted-foreground md:inline">
                  {order.user.email}
                </div>
              </TableCell>
              <TableCell>
                <div className="font-medium">{order.id}</div>
              </TableCell>
              <TableCell>{LABEL_MAP[order.status]}</TableCell>
              <TableCell className="hidden sm:table-cell">
                {order.createdAt.toLocaleDateString()}
              </TableCell>
              <TableCell>{formatPrice(order.amount)}</TableCell>
              <TableCell className="text-right cursor-pointer font-semibold text-green-600" onClick={() => {
                setSelectedOrder(order); 
                setInvoiceModalOpen(true);
              }}>
                Invoice
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export default OrderTable;
