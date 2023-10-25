import React from "react";
import getLocals from "~/utils/getLocals";
import useUser from "~/hooks/useUser";
import useEditProfileModal from "~/hooks/useEditProfileModal";
import { api } from "~/utils/api";

import Modal from "./Modal";
import Button from "../Button";
import ProfilePicture from "../ProfilePicture";
import ProfileEditArea from "../ProfileEditArea";

const EditProfileModal = () => {
    const { twitterProfile } = useUser();
    const { isOpen, openEditProfileModal, closeEditProfileModal } = useEditProfileModal();
    const { COLOR_PRIMARY_DARKER } = getLocals("colors");

    const saveProfile = () => {};
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
                        onClick={saveProfile}
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
                <div className="flex flex-col gap-4 pt-4">
                    <ProfileEditArea placeholder="Name" maxLength={50} height="SHORT" value={twitterProfile.nickname} />
                    <ProfileEditArea placeholder="Bio" maxLength={160} height="MEDIUM" value={twitterProfile.bio} />
                    <ProfileEditArea placeholder="Location" maxLength={30} height="SHORT" />
                    <ProfileEditArea placeholder="Website" maxLength={100} height="SHORT" />
                </div>
            </div>
        </Modal>
    );
};

export default EditProfileModal;
