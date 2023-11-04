import { Button, Divider } from "@tremor/react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";

import type { ReactNode } from "react";

export default function Modal({
  isOpen,
  title,
  text1,
  text2,
  text3,
  onCancel,
  onConfirm,
  confirmButtonText,
  cancelButtonText,
  children,
  confirmButtonLoading,
  small,
}: {
  isOpen: boolean;
  title: string;
  text1?: string | ReactNode;
  text2?: string | ReactNode;
  text3?: string | ReactNode;
  onCancel: Function;
  onConfirm: Function;
  confirmButtonText: string;
  cancelButtonText: string;
  children?: ReactNode;
  confirmButtonLoading?: boolean;
  small?: boolean;
}) {
  const [isModalOpen, setIsModalOpen] = useState(isOpen || false);

  useEffect(() => {
    setIsModalOpen(isOpen);
  }, [isOpen]);

  return (
    <Transition appear as={Fragment} show={isModalOpen}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setIsModalOpen(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={`w-full ${
                  small ? "max-w-md" : "max-w-3xl"
                } transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all`}
              >
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  {title}
                </Dialog.Title>
                {children ? (
                  children
                ) : (
                  <>
                    <div className="mt-2 max-w-400">
                      <p className="text-sm text-gray-500">{text1}</p>
                      {text2 && (
                        <p className="text-sm text-gray-500">{text2}</p>
                      )}
                      {text3 && (
                        <p className="text-sm text-gray-500">{text3}</p>
                      )}
                    </div>
                  </>
                )}

                <Divider />
                <div className="justify-end flex gap-4 mt-4">
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setIsModalOpen(false);
                      onCancel();
                    }}
                  >
                    {cancelButtonText || "Cancel"}
                  </Button>

                  <Button
                    onClick={() => {
                      onConfirm();
                    }}
                    loading={confirmButtonLoading}
                  >
                    {confirmButtonText || "Confirm"}
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
