"use server"

import { db } from '@/db'
import { OrderStatus } from '@prisma/client'
import {Resend} from "resend"
import OrderStatusEmail from '@/components/OrderStatusEmail'

const resend = new Resend(process.env.RESEND_API_KEY!);

export const changeOrderStatus = async ({id,newStatus}: {
  id: string
  newStatus: OrderStatus
}) => {
  const updatedOrder = await db.order.update({
    where: { id },
    data: { status: newStatus },
    include: { 
      shippingAddress: true,
      user: true,
    },
  })

  await resend.emails.send({
    from: 'CaseCobra <no-reply@heapoverflow.tech>',
    to: updatedOrder.user.email,
    subject: 'Your order status has been changed!',
    react: OrderStatusEmail({
      orderId: id,
      orderDate: updatedOrder.createdAt.toLocaleDateString(),
      newStatus: updatedOrder.status.toLocaleUpperCase(),
      // @ts-ignore
      shippingAddress: {
        name: updatedOrder.shippingAddress!.name,
        street: updatedOrder.shippingAddress!.street,
        city: updatedOrder.shippingAddress!.city,
        state: updatedOrder.shippingAddress!.state,
        postalCode: updatedOrder.shippingAddress!.postalCode,
        country: updatedOrder.shippingAddress!.country,
      },
    })
  });
}