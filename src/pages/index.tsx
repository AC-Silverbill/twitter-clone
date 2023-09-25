import react from "react";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { api } from "~/utils/api";
import getLocal from "~/utils/getLocal";
import useNavigation from "~/navigation";
import useUser from "~/hooks/useUser";

import Button from "~/components/Button";
import Footer from "~/components/Footer";
import Redirect from "~/components/Redirect";

export default function Home() {
    const { data: sessionData, update: updateSessionData, status } = useSession();
    const navigation = useNavigation();
    const [formVisibility, setFormVisibility] = useState(true);
    const { mutate: resetMutation } = api.user.resetDB.useMutation();
    const { mutate: createProfile } = api.user.createProfile.useMutation();
    const primaryColor = getLocal("colors", "COLOR_PRIMARY");
    const highlightedColor = getLocal("colors", "COLOR_HIGHLIGHTED");
    const YOUR_HOME_DIR = getLocal("routes", "YOUR_HOME");
    let isRedirected = true;

    if (sessionData && sessionData.user.isAuthenticated) {
        isRedirected = true;
        navigation.push(YOUR_HOME_DIR);
    } else {
        isRedirected = false;
    }

    // TODO: make the signin a popup modal similar to twitter itself
    const SignInComponent = () => (
        <form className={`transition flex flex-col gap-1 ${formVisibility ? "visible" : "invisible"}`}>
            <input className="border rounded-md border-gray-400 outline-none p-2" type="email" placeholder="email" />
            <input className="border rounded-md border-gray-400 outline-none p-2" type="text" placeholder="username" />
            <input className="border rounded-md border-gray-400 outline-none p-2" type="password" placeholder="password" />
            <Button
                onClick={() => {
                    createProfile({
                        name: "Kat",
                        username: "PrettyKat",
                    });

                    // TODO: this one needs the loading too
                    void updateSessionData();
                }}
                className={`bg-[${primaryColor}] text-white p-2 rounded-2xl font-bold`}
            >
                Sign In
            </Button>
        </form>
    );

    if (isRedirected) {
        return <Redirect />;
    } else {
        return (
            <div className="flex flex-col h-screen">
                <div className="flex-1 flex justify-center items-center">
                    <Image
                        src="images/logo.svg"
                        width={200}
                        height={200}
                        alt="Twitter Clone Logo Image"
                        className="hover:animate-[ping_0.4s_ease-in-out_1]"
                    />
                    <div className="flex flex-col justify-center p-4 h-full">
                        <div className="flex flex-col gap-2 items-center align-middle">
                            <div className="hover:animate-[spin_0.4s_ease-in-out_1]">
                                <h1 className="text-[80px] font-bold">Twitter Clone</h1>
                                <h2 className="text-[40px] font-bold">(wow!)</h2>
                            </div>
                            <Button
                                className="border-2 rounded-xl p-2 w-full"
                                onClick={() => {
                                    void signIn("discord");
                                }}
                            >
                                Sign in with Discord
                            </Button>
                            <Button
                                className="border-2 rounded-xl p-2 w-full"
                                onClick={() => {
                                    // todo: get google keys
                                    resetMutation();
                                }}
                            >
                                Sign up with Google (this resets the db for now lol)
                            </Button>
                            {/*<div>-----or-----</div>*/}
                            {/*<Button className={`border-[1px] rounded-xl p-2 w-full bg-[${primaryColor}] text-white font-extrabold`}>*/}
                            {/*    Create Account*/}
                            {/*</Button>*/}
                            {/*<span className="text-xs p-1 pb-16">*/}
                            {/*    By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use.*/}
                            {/*</span>*/}
                            {/*<h3 className="font-bold text-2xl self-start">Already have an account?</h3>*/}
                            {/*<Button*/}
                            {/*    className={`border-[1px] rounded-xl p-2 w-full text-[${primaryColor}] bg-white font-extrabold hover:bg-[${highlightedColor}] transition`}*/}
                            {/*    onClick={() => setFormVisibility(true)}*/}
                            {/*>*/}
                            {/*    Sign In*/}
                            {/*</Button>*/}
                        </div>
                    </div>
                    {formVisibility && <SignInComponent />}
                </div>
                <Footer />
            </div>
        );
    }
}
