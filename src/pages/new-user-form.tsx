import Button from "~/components/Button";
import getLocal from "~/utils/getLocal";
import { api } from "~/utils/api";

export default function NewUserForm() {
    const primaryColor = getLocal("colors", "COLOR_PRIMARY");
    const { mutate: finishSignUp } = api.user.finishSignUp.useMutation();
    return (
        <form className={`transition flex flex-col gap-1`}>
            <input className="border rounded-md border-gray-400 outline-none p-2" type="text" placeholder="name" />
            <input className="border rounded-md border-gray-400 outline-none p-2" type="text" placeholder="username" />
            {/*<input className="border rounded-md border-gray-400 outline-none p-2" type="password" placeholder="password" />*/}
            <Button
                onClick={() => {
                    finishSignUp({
                        id: "1",
                        name: "Kat",
                        username: "PrettyKat",
                    });
                }}
                className={`bg-[${primaryColor}] text-white p-2 rounded-2xl font-bold`}
            >
                Sign In
            </Button>
        </form>
    );
}
