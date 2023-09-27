import { useState } from "react";
export default function Home() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [textContent, setTextContent] = useState("");
    const Text = ({ handleContentChange, textContent, setIsExpanded }: any) => (
        <div>
            <textarea
                key={"textarea1"}
                placeholder="What is happening?"
                className={`px-2 outline-none break-words max-h-full block`}
                onChange={handleContentChange}
                value={textContent}
                onFocus={() => setIsExpanded(true)}
            />
        </div>
    );

    const handleContentChange = (e: any) => {
        e.preventDefault();
        setTextContent(e.target.value);
    };

    console.log(textContent);

    return <Text handleContentChange={handleContentChange} textContent={textContent} setIsExpanded={setIsExpanded} />;
}
