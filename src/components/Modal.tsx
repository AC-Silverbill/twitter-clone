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
                    <Dialog.Title className="text-xl text-center font-bold mb-4">{title}</Dialog.Title>
                    <Dialog.Description className="mb-5 text-sm leading-normal text-center">{description}</Dialog.Description>
                    <div>{children}</div>
                    <Dialog.Close asChild>
                        <button className="text-neutrl-400 hover:text-white absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:outline-none">
                            <IoMdClose />
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

export default Modal;
