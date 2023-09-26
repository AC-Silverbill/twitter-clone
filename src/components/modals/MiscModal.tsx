import React, { Component, useState } from "react";
import useMiscModal, { miscModalHeadersType } from "~/hooks/useMiscModal";
import { IconType } from "react-icons";
import getLocal from "~/utils/getLocal";
import Image from "next/image";

import Modal from "./Modal";
import Button from "../Button";
import { AiFillHeart } from "react-icons/ai";
import { FaMessage } from "react-icons/fa6";
import { HiArrowPathRoundedSquare } from "react-icons/hi2";
import { FiUserPlus } from "react-icons/fi";

interface MiscModalHeaderProps {
    Icon?: IconType;
    imageSrc?: string;
    className?: string;
    header: string;
    description: string;
}

interface ProviderButtonProps {
    provider: string;
    onClick: () => void;
}

const MiscModal = () => {
    const { isOpen, headerType, openMiscModal, closeMiscModal } = useMiscModal();
    const primaryColor = getLocal("colors", "COLOR_PRIMARY");
    const primaryHighlighted = getLocal("colors", "COLOR_PRIMARY_HIGHLIGHTED");
    const whiteHighlighted = getLocal("colors", "COLOR_WHITE_HIGHLIGHTED");

    const MiscModalHeader = ({ Icon, imageSrc, className, header, description }: MiscModalHeaderProps) => {
        return (
            <div className="flex flex-col justify-center">
                <div className="p-8 flex justify-center items-center">
                    {Icon && <Icon className={className} color={primaryColor} size={35} fontWeight={"1000"} />}
                    {imageSrc && <Image src={imageSrc} width={50} height={50} alt="Twitter Clone Logo" />}
                </div>
                <h2 className="font-bold text-xl">{header}</h2>
                <p className="text-xs">{description}</p>
            </div>
        );
    };

    const headers: { [name in miscModalHeadersType]: React.ReactNode } = {
        default: <MiscModalHeader imageSrc="/images/logo.svg" header="hi" description={`nothing is here yet`} />,
        stats: (
            <MiscModalHeader
                header="Views"
                description={`View counts are not available for this post. To learn more, visit the Help Center.`}
            />
        ),
    };

    return (
        <Modal isOpen={isOpen} onChange={() => closeMiscModal()}>
            {<div className="flex flex-col justify-center items-center gap-2">{headers[headerType]}</div>}
        </Modal>
    );
};

export default MiscModal;
