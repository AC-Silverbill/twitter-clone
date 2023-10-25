import React from "react";

const Footer = () => {
    const FooterItem = ({ text }: { text: string }) => <span className="text-xs cursor-pointer">{text}</span>;
    return (
        <footer className="flex p-8 justify-between">
            <FooterItem text="About" />
            <FooterItem text="Help Center" />
            <FooterItem text="Terms of Service" />
            <FooterItem text="Privacy Policy" />
            <FooterItem text="Cookie Policy" />
            <FooterItem text="Accessibility" />
            <FooterItem text="Ads Info" />
            <FooterItem text="Blog" />
            <FooterItem text="Status" />
            <FooterItem text="Careers" />
            <FooterItem text="Developers" />
        </footer>
    );
};

export default Footer;
