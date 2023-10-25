import React from "react";
import { BasicComponentWithChildren } from "~/types";
import { twMerge } from "tailwind-merge";
import getLocal from "~/utils/getLocal";
import getVH_Height from "~/utils/getVH_Height";
import useAuthModal from "~/hooks/useAuthModal";

import Icon from "../../Icon";
import { IoMdClose } from "react-icons/io";
import * as Dialog from "@radix-ui/react-dialog";

interface ModalProps extends BasicComponentWithChildren {
    isOpen: boolean;
    onChange: () => void;
    closeButton?: boolean;
    header?: React.ReactNode;
}

const MiniModal = ({ isOpen, onChange, children, header }: ModalProps) => {
    const handleInput = () => {};
    const COLOR_WHITE_HIGHLIGHTED = getLocal("colors", "COLOR_WHITE_HIGHLIGHTED");

    if (!isOpen) {
        return null;
    }

    return (
        <Dialog.Root open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-40" />
                <Dialog.Content
                    className={`bg-white flex flex-col p-2 fixed min-h-[300px] max-h-[90vh] md:w-[500px] sm:w-[400px] drop-shadow-sm rounded-xl top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 border overflow-y-auto z-50`}
                    onInput={handleInput}
                >
                    {header && <div className="flex items-center pb-2">{header}</div>}
                    {children}
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

export default MiniModal;
