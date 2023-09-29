import React from "react";
import { twMerge } from "tailwind-merge";
import { BasicComponentWithChildren } from "~/types";
import useAuthModal from "~/hooks/useAuthModal";

import * as Dialog from "@radix-ui/react-dialog";
import { IoMdClose } from "react-icons/io";

interface ModalProps extends BasicComponentWithChildren {
    title?: string;
    description?: string;
    isOpen: boolean;
    onChange: () => void;
    closeButton?: boolean;
}

const Modal = ({ isOpen, onChange, title, description, children, closeButton }: ModalProps) => {
    return (
        <Dialog.Root open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
            <Dialog.Portal>
                <Dialog.Overlay className="backdrop-blur-[2px] fixed inset-0 bg-[rgb(0,0,0)]/50" />
                <Dialog.Content className="bg-white flex flex-col fixed min-h-[300px] w-[500px] drop-shadow-sm rounded-xl top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 border">
                    <Dialog.Title className="">{title}</Dialog.Title>
                    <Dialog.Description className="">{description}</Dialog.Description>
                    {children}
                    <Dialog.Close asChild>
                        {closeButton && (
                            <button className="">
                                <IoMdClose />
                            </button>
                        )}
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

export default Modal;
