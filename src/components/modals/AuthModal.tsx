import React, { Component, useState } from "react";
import useAuthModal, { authModalHeadersType } from "~/hooks/useAuthModal";
import { IconType } from "react-icons";
import getLocal from "~/utils/getLocal";
import Image from "next/image";

import Modal from "./Modal";
import Button from "../Button";
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

interface ProviderButtonProps {
    provider: string;
    onClick: () => void;
}

const AuthModal = () => {
    const { isOpen, headerType, openAuthModal, closeAuthModal } = useAuthModal();
    const [viewAuths, setViewAuths] = useState(false);
    const primaryColor = getLocal("colors", "COLOR_PRIMARY");
    const primaryHighlighted = getLocal("colors", "COLOR_PRIMARY_HIGHLIGHTED");
    const whiteHighlighted = getLocal("colors", "COLOR_WHITE_HIGHLIGHTED");

    const AuthModalHeader = ({ Icon, imageSrc, className, header, description }: ModalAuthHeaderProps) => {
        return (
            <div className="flex flex-col justify-center">
                <div className="p-8 flex justify-center items-center">
                    {Icon && <Icon className={className} color={primaryColor} size={35} fontWeight={"1000"} />}
                    {imageSrc && <Image src={imageSrc} width={50} height={50} alt="an image" />}
                </div>
                <h2 className="font-bold text-xl">{header}</h2>
                <p className="text-xs">{description}</p>
            </div>
        );
    };

    const headers: { [name in authModalHeadersType]: React.ReactNode } = {
        default: (
            <AuthModalHeader
                imageSrc="/images/logo.svg"
                header="Don’t miss what’s happening."
                description={`People on X are the first to know.`}
            />
        ),
        reply: (
            <AuthModalHeader
                Icon={FaMessage}
                header="Reply to join the conversation."
                description={`Once you join twitter, you can reply to ${"test"}'s post.`}
            />
        ),
        retweet: (
            <AuthModalHeader
                Icon={HiArrowPathRoundedSquare}
                header="Repost to spread the word."
                description={`When you join X, you can share ${"test"}'s post with your followers.`}
            />
        ),
        like: (
            <AuthModalHeader
                Icon={AiFillHeart}
                className="fill-pink-400"
                header="Like a post to share the love."
                description={`Join X now to let ${"test"} know you like their post.`}
            />
        ),
        follow: (
            <AuthModalHeader
                Icon={FiUserPlus}
                header={`Follow ${"test"} to see what they share on X.`}
                description="Sign up so you never miss their posts."
            />
        ),
    };

    const handleSignIn = () => {
        setViewAuths(true);
    };

    const ProviderButton = ({ onClick, provider }: ProviderButtonProps) => (
        <Button>
            <div className={`flex border w-[200px] p-2 gap-1 rounded-3xl hover:bg-${whiteHighlighted} transition`}>
                <div className="flex items-center justify-center">
                    <Image
                        className="object-contain"
                        src={`/images/${provider.toLowerCase()}.png`}
                        width={20}
                        height={20}
                        alt={`${provider} Logo`}
                    />
                </div>
                <span className="font-bold">{`Login with ${provider}`}</span>
            </div>
        </Button>
    );
    return (
        <Modal isOpen={isOpen} onChange={() => closeAuthModal()}>
            {viewAuths && (
                <div className="flex flex-col justify-center items-center p-2 gap-2">
                    <ProviderButton key={"Discord"} provider="Discord" onClick={() => {}} />
                    <ProviderButton key={"Github"} provider="Github" onClick={() => {}} />
                    <ProviderButton key={"Google"} provider="Google" onClick={() => {}} />
                </div>
            )}
            {!viewAuths && (
                <div className="flex flex-col justify-center items-center gap-2">
                    {headers[headerType]}
                    <Button
                        onClick={handleSignIn}
                        className={`w-[300px] p-3 border rounded-3xl font-bold bg-${primaryColor} text-white hover:bg-${primaryHighlighted} hover:scale-105 transition`}
                    >
                        Log in
                    </Button>
                    <Button
                        onClick={handleSignIn}
                        className={`w-[300px] p-3 border rounded-3xl font-bold bg-white text-${primaryColor} hover:bg-${whiteHighlighted} hover:scale-105 transition`}
                    >
                        Sign up
                    </Button>
                </div>
            )}
        </Modal>
    );
};

export default AuthModal;
