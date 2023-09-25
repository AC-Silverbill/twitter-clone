import React, { Component } from "react";
import useAuthModal, { authModalHeadersType } from "~/hooks/useAuthModal";
import { IconType } from "react-icons";
import getLocal from "~/utils/getLocal";
import Image from "next/image";

import Modal from "./Modal";
import Button from "./Button";
import { AiFillHeart } from "react-icons/ai";
import { FaMessage } from "react-icons/fa6";
import { HiArrowPathRoundedSquare } from "react-icons/hi2";
import { FiUserPlus } from "react-icons/fi";

interface ModalAuthHeaderProps {
    Icon?: IconType;
    imageSrc?: string;
    className?: string;
    header: string;
    description: string;
}

const ModalAuth = () => {
    const { isOpen, headerType, openAuthModal, closeAuthModal } = useAuthModal();
    const primaryColor = getLocal("colors", "COLOR_PRIMARY");
    const primaryHighlighted = getLocal("colors", "COLOR_PRIMARY_HIGHLIGHTED");
    const whiteHighlighted = getLocal("colors", "COLOR_WHITE_HIGHLIGHTED");

    const ModalAuthHeader = ({ Icon, imageSrc, className, header, description }: ModalAuthHeaderProps) => {
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

    const headers: { [name in authModalHeadersType]: React.ReactNode } = {
        default: (
            <ModalAuthHeader
                imageSrc="/images/logo.svg"
                header="Don’t miss what’s happening."
                description={`People on X are the first to know.`}
            />
        ),
        reply: (
            <ModalAuthHeader
                Icon={FaMessage}
                header="Reply to join the conversation."
                description={`Once you join twitter, you can reply to ${"test"}'s post.`}
            />
        ),
        retweet: (
            <ModalAuthHeader
                Icon={HiArrowPathRoundedSquare}
                header="Repost to spread the word."
                description={`When you join X, you can share ${"test"}'s post with your followers.`}
            />
        ),
        like: (
            <ModalAuthHeader
                Icon={AiFillHeart}
                className="fill-pink-400"
                header="Like a post to share the love."
                description={`Join X now to let ${"test"} know you like their post.`}
            />
        ),
        follow: (
            <ModalAuthHeader
                Icon={FiUserPlus}
                header={`Follow ${"test"} to see what they share on X.`}
                description="Sign up so you never miss their posts."
            />
        ),
    };

    return (
        <Modal isOpen={isOpen} onChange={() => closeAuthModal()}>
            <div className="flex flex-col justify-center items-center gap-2">
                {headers[headerType]}
                <Button
                    className={`w-[300px] p-3 border rounded-3xl font-bold bg-[${primaryColor}] text-white hover:bg-[${primaryHighlighted}] hover:scale-105 transition`}
                >
                    Log in
                </Button>
                <Button
                    className={`w-[300px] p-3 border rounded-3xl font-bold bg-white text-[${primaryColor}] hover:bg-[${whiteHighlighted}] hover:scale-105 transition`}
                >
                    Sign up
                </Button>
            </div>
        </Modal>
    );
};

export default ModalAuth;
