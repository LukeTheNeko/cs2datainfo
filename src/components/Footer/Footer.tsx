import { FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

interface SocialLink {
    Icon: React.FC<{ size?: number }>;
    url: string;
}

const socialLinks: SocialLink[] = [
    {
        Icon: FaXTwitter,
        url: "https://x.com/cs2datainfo",
    },
    {
        Icon: FaInstagram,
        url: "https://www.instagram.com/cs2datainfo/",
    },
    {
        Icon: FaYoutube,
        url: "https://www.youtube.com/@cs2datainfo",
    },
    {
        Icon: FaTiktok,
        url: "https://www.tiktok.com/@cs2datainfo",
    },
];

const SocialIcon: React.FC<SocialLink> = ({ Icon, url }) => (
    <a
        href={url}
        className="w-8 h-8 flex items-center justify-center bg-white rounded-full text-indigo-600 transition-all hover:shadow-[0_0_10px_rgba(99,102,241,0.7)]"
    >
        <Icon size={15} />
    </a>
);

export default function Footer() {
    return (
        <>
            <div className="bg-gradient-to-b from-black-450 to-black-400 py-8 px-4 md:px-8 text-white ">
                <div className="container mx-auto flex flex-col md:flex-row justify-between space-y-8 md:space-y-0 md:space-x-8">
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <span className="font-bold text-3xl mb-2">
                            logo
                            <span className="text-xl font-medium text-indigo-600">
                                .aqui
                            </span>
                        </span>
                        <div className="flex mt-2 gap-3 justify-center">
                            {socialLinks.map(({ Icon, url }, index) => (
                                <SocialIcon key={index} Icon={Icon} url={url} />
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col items-center md:items-start">
                        <div className="text-2xl uppercase text-indigo-600 font-bold mb-4">
                            CS2 Skins
                        </div>
                        <div className="grid grid-cols-2 gap-4 w-full">
                            <div>
                                <a
                                    className="my-2 block hover:underline"
                                    href="/#"
                                >
                                    All Agents
                                </a>
                                <a
                                    className="my-2 block hover:underline"
                                    href="/#"
                                >
                                    All Cases
                                </a>
                                <a
                                    className="my-2 block hover:underline"
                                    href="/#"
                                >
                                    All Collections
                                </a>
                                <a
                                    className="my-2 block hover:underline"
                                    href="/#"
                                >
                                    All Gloves
                                </a>
                                <a
                                    className="my-2 block hover:underline"
                                    href="/#"
                                >
                                    All Patches
                                </a>
                            </div>
                            <div>
                                <a
                                    className="my-2 block hover:underline"
                                    href="/#"
                                >
                                    All Pins
                                </a>
                                <a
                                    className="my-2 block hover:underline"
                                    href="/#"
                                >
                                    All Skins
                                </a>
                                <a
                                    className="my-2 block hover:underline"
                                    href="/#"
                                >
                                    All Souvenir Packages
                                </a>
                                <a
                                    className="my-2 block hover:underline"
                                    href="/#"
                                >
                                    All Stickers
                                </a>
                                <a
                                    className="my-2 block hover:underline"
                                    href="/#"
                                >
                                    All Weapons
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="w-full md:w-1/4 text-center md:text-left">
                        <div className="text-2xl uppercase text-indigo-600 font-bold mb-4">
                            Support
                        </div>
                        <a className="my-2 block hover:underline" href="/#">
                            Contact Us
                        </a>
                        <a className="my-2 block hover:underline" href="/#">
                            Privacy Policy
                        </a>
                        <a className="my-2 block hover:underline" href="/#">
                            Terms of Service
                        </a>
                        <a className="my-2 block hover:underline" href="/#">
                            FAQs
                        </a>
                        <a className="my-2 block hover:underline" href="/#">
                            Donate
                        </a>
                    </div>
                </div>
            </div>

            <div className="bg-black-500">
                <div className="flex flex-col items-center p-2 text-slate-50 text-sm text-center m-auto">
                    <div className="flex flex-col justify-center items-center text-center">
                        <div>
                            This site is not affiliated with Valve, Steam, or
                            any of their partners.
                        </div>
                        <div className="mt-2">
                            Copyright © {new Date().getFullYear()} CS2Data.info. Powered by Steam.
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
