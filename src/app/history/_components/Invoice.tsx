"use client";
import {
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Button, buttonVariants } from "@/components/ui/button";
import { useReactToPrint } from "react-to-print";
import { formatPrice } from "@/lib/utils";
import { getConfigDetails } from "@/server-actions/configDetails";
import { BASE_PRICE, PRODUCT_PRICES } from "@/config/products";

const Invoice = ({
  isOpen,
  setIsOpen,
  order,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  order: any;
}) => {
  const componentRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<any>(false);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const Config = async () => {
    const res = await getConfigDetails(order?.configurationId);
    setData(res?.config);
  };

  const { color, model, finish, material } = data;

  useEffect(() => {
    Config();
  }, []);

  let totalPrice = BASE_PRICE;
  if (material === "polycarbonate") {
    totalPrice += PRODUCT_PRICES.material.polycarbonate;
  }
  if (finish === "textured") {
    totalPrice += PRODUCT_PRICES.finish.textured;
  }

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogContent className="absolute z-[9999999] max-h-[500px] max-w-[600px] overflow-y-auto">
        <DialogHeader>
          <div className="p-10" ref={componentRef}>
            <div className="relative mx-auto w-24 h-24 mb-2">
              <Image
                src="/snake-3.png"
                alt="snake image"
                className="object-contain"
                fill
              />
            </div>
            <DialogTitle className="text-3xl text-center font-bold tracking-tight text-gray-900">
              CaseCobra
            </DialogTitle>
            <DialogDescription className="text-base text-center py-2">
              <span className="font-medium text-zinc-900">Invoice</span>
              <div className="bg-white text-center">
                <div className="mx-auto mt-5">
                  <p className="text-base font-medium text-primary">
                    Thank you!
                  </p>
                  <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
                    Your case is on the way!
                  </h1>
                  <p className="mt-2 text-base text-zinc-500">
                    We've received your order and are now processing it.
                  </p>

                  <div className="mt-4 text-sm font-medium">
                    <p className="text-zinc-900">Order ID</p>
                    <p className="mt-2 text-zinc-500">{order?.id}</p>
                  </div>

                  <div className="flex flex-col p-10 gap-10 overflow-hidden mt-4 rounded-xl bg-gray-900/5 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl">
                    <div className="flex flex-col gap-3">
                      <h3 className="text-3xl font-bold tracking-tight text-gray-900">
                        Your {model} Case
                      </h3>

                      <h3 className="text-xl tracking-tight text-gray-900">
                        Case color: <span className="capitalize">{color}</span>
                      </h3>
                    </div>

                    <div className="bg-gray-50 p-10 sm:rounded-lg">
                      <div className="flow-root text-sm">
                        <div className="flex items-center justify-between py-1 mt-2">
                          <p className="text-gray-600">Base price</p>
                          <p className="font-medium text-gray-900">
                            {formatPrice(BASE_PRICE / 100)}
                          </p>
                        </div>

                        {finish === "textured" ? (
                          <div className="flex items-center justify-between py-1 mt-2">
                            <p className="text-gray-600">Textured finish</p>
                            <p className="font-medium text-gray-900">
                              {formatPrice(
                                PRODUCT_PRICES.finish.textured / 100
                              )}
                            </p>
                          </div>
                        ) : null}

                        {material === "polycarbonate" ? (
                          <div className="flex items-center justify-between py-1 mt-2">
                            <p className="text-gray-600">
                              Soft polycarbonate material
                            </p>
                            <p className="font-medium text-gray-900">
                              {formatPrice(
                                PRODUCT_PRICES.material.polycarbonate / 100
                              )}
                            </p>
                          </div>
                        ) : null}

                        <div className="my-2 h-px bg-gray-200" />

                        <div className="flex items-center justify-between py-2">
                          <p className="font-semibold text-gray-900">
                            Order total
                          </p>
                          <p className="font-semibold text-gray-900">
                            {formatPrice(totalPrice / 100)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="grid grid-cols-2 gap-x-6 py-10 text-sm">
                      <div>
                        <p className="font-medium text-gray-900">
                          Shipping address
                        </p>
                        <div className="mt-2 text-zinc-700">
                          <address className="not-italic">
                            <span className="block">
                              {order?.shippingAddress?.name}
                            </span>
                            <span className="block">
                              {order?.shippingAddress?.street}
                            </span>
                            <span className="block">
                              {order?.shippingAddress?.postalCode}{" "}
                              {order?.shippingAddress?.city}
                            </span>
                          </address>
                        </div>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          Billing address
                        </p>
                        <div className="mt-2 text-zinc-700">
                          <address className="not-italic">
                            <span className="block">
                              {order?.billingAddress?.name}
                            </span>
                            <span className="block">
                              {order?.billingAddress?.street}
                            </span>
                            <span className="block">
                              {order?.billingAddress?.postalCode}{" "}
                              {order?.billingAddress?.city}
                            </span>
                          </address>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-x-6 border-t border-zinc-200 py-10 text-sm">
                      <div>
                        <p className="font-medium text-zinc-900">
                          Payment status
                        </p>
                        <p className="mt-2 text-zinc-700">Paid</p>
                      </div>

                      <div>
                        <p className="font-medium text-zinc-900">
                          Shipping Method
                        </p>
                        <p className="mt-2 text-zinc-700">
                          DHL, takes up to 3 working days
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6 border-t border-zinc-200 pt-10 text-sm">
                    <div className="flex justify-between">
                      <p className="font-medium text-zinc-900">Subtotal</p>
                      <p className="text-zinc-700">
                        {formatPrice(order?.amount)}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p className="font-medium text-zinc-900">Shipping</p>
                      <p className="text-zinc-700">{formatPrice(0)}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="font-medium text-zinc-900">Total</p>
                      <p className="text-zinc-700">
                        {formatPrice(order?.amount)}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="mt-[200px]">
                    If you have any questions regarding your order, please feel free
                    to contact us with your order id and we're here to help.
                  </p>

                  <p className="mt-5">
                    © CaseCobra, Inc. All Rights Reserved.
                  </p>
                </div>
              </div>
            </DialogDescription>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1">
          <Button
            className={buttonVariants({ variant: "default" })}
            onClick={handlePrint}
          >
            Print
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Invoice;
