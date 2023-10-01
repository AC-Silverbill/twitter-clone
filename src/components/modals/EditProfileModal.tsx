import React from "react";
import getLocals from "~/utils/getLocals";
import useUser from "~/hooks/useUser";
import useEditProfileModal from "~/hooks/useEditProfileModal";

import Modal from "./Modal";
import Button from "../Button";
import ProfilePicture from "../ProfilePicture";

const EditProfileModal = () => {
    const { twitterProfile } = useUser();
    const { isOpen, openEditProfileModal, closeEditProfileModal } = useEditProfileModal();
    const { COLOR_PRIMARY_DARKER } = getLocals("colors");
    return (
        <Modal
            closeButton
            isOpen={isOpen}
            onChange={() => closeEditProfileModal()}
            header={
                <>
                    <div className="font-bold justify-center items-center pl-4 text-lg">Edit profile</div>
                    <Button
                        className={`ml-auto bg-${COLOR_PRIMARY_DARKER} hover:bg-${COLOR_PRIMARY_DARKER}`}
                        onClick={() => {}}
                        buttonTemplate="PRIMARY_BG"
                    >
                        Save
                    </Button>
                </>
            }
        >
            <div className="flex flex-col">
                <div className="bg-gray-400 h-40"></div>
                <ProfilePicture twitterProfile={twitterProfile} size="LARGEST" className={`mt-[-15%] pl-2`} />
                <div className="flex flex-col gap-4">
                    <textarea placeholder="Name" maxLength={50} className="text-start border resize-none" />
                    <textarea placeholder="Bio" maxLength={160} className="text-start border resize-none" />
                    <textarea placeholder="Location" maxLength={30} className="text-start border resize-none" />
                    <textarea placeholder="Website" maxLength={100} className="text-start border resize-none" />
                </div>
            </div>
        </Modal>
    );
};

export default EditProfileModal;
