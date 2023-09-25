import React from "react";
import { twMerge } from "tailwind-merge";
import { BasicComponentWithChildren } from "~/types";
import useAuthModal from "~/hooks/useAuthModal";

import * as Dialog from "@radix-ui/react-dialog";
import { IoMdClose } from "react-icons/io";
import { c } from "vitest/dist/reporters-5f784f42";
interface ModalProps extends BasicComponentWithChildren {
    title: string;
    description: string;
    isOpen: boolean;
    onChange: () => void;
}

const Modal = ({ isOpen, onChange, title, description, children }: ModalProps) => {
    return (
        <Dialog.Root open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
            <Dialog.Portal>
                <Dialog.Overlay className="bg-white backdrop-blur-[1px] fixed inset-0" />
                <Dialog.Content className="fixed h-[300px] w-[500px] border top-[50%] left-[50%]">
                    <Dialog.Title className="">{title}</Dialog.Title>
                    <Dialog.Description className="">{description}</Dialog.Description>
                    <div>{children}</div>
                    <Dialog.Close asChild>
                        <button className="">
                            <IoMdClose />
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

export default Modal;
