import { FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import { FaXTwitter, FaBluesky } from "react-icons/fa6";

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
  {
    Icon: FaBluesky,
    url: "https://bsky.app/profile/cs2data.info",
  },
];

const SocialIcon: React.FC<SocialLink> = ({ Icon, url }) => (
  <a
    href={url}
    className="flex items-center justify-center text-indigo-600 duration-300 transform hover:scale-110 px-0.5"
  >
    <Icon size={20} />
  </a>
);

export default function Footer() {
  return (
    <>
      <div className="bg-black-400 py-6 px-2 md:px-16 text-white flex justify-between">
        <div className="flex flex-col justify-start items-start px-2">
          <div className="flex flex-col items-center px-4 md:items-start text-center md:text-left">
            <span className="font-bold text-2xl mb-2">
              CS2DATA
              <span className="text-lg font-medium text-indigo-600">.info</span>
            </span>
            <div className="flex mt-2 gap-2 justify-center">
              {socialLinks.map(({ Icon, url }, index) => (
                <SocialIcon key={index} Icon={Icon} url={url} />
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-row whitespace-nowrap justify-end px-4">
          <div className="text-center px-8 md:text-left">
            <div className="text-lg uppercase text-indigo-600 font-bold mb-2">
              <span>Last updates</span>
            </div>
            <div className="text-sm">
              <a
                className="block opacity-80 hover:opacity-100 py-0.5"
                href="/#"
              >
                Shanghai 2024 Champion Stickers
              </a>
              <a
                className="block opacity-80 hover:opacity-100 py-0.5"
                href="/#"
              >
                Shanghai 2024 Stickers
              </a>
              <a
                className="block opacity-80 hover:opacity-100 py-0.5"
                href="/#"
              >
                The Armory
              </a>
              <a
                className="block opacity-80 hover:opacity-100 py-0.5"
                href="/#"
              >
                Masterminds 2 Music Kits
              </a>
              <a
                className="block opacity-80 hover:opacity-100 py-0.5"
                href="/#"
              >
                Copenhagen 2024 Champion Stickers
              </a>
              <a
                className="block opacity-80 hover:opacity-100 py-0.5"
                href="/#"
              >
                Copenhagen 2024 Stickers
              </a>
            </div>
          </div>

          <div className="text-center px-8 md:text-left">
            <div className="text-lg uppercase text-indigo-600 font-bold mb-2">
              <span>Support</span>
            </div>
            <div className="text-sm">
              <a
                className="block opacity-80 hover:opacity-100 py-0.5"
                href="/#"
              >
                Contact Us
              </a>
              <a
                className="block opacity-80 hover:opacity-100 py-0.5"
                href="/#"
              >
                Feedback
              </a>
              <a
                className="block opacity-80 hover:opacity-100 py-0.5"
                href="/#"
              >
                Privacy Policy
              </a>
              <a
                className="block opacity-80 hover:opacity-100 py-0.5"
                href="/#"
              >
                Terms of Service
              </a>
              <a
                className="block opacity-80 hover:opacity-100 py-0.5"
                href="/#"
              >
                Cookie Policy
              </a>
              <a
                className="block opacity-80 hover:opacity-100 py-0.5"
                href="/#"
              >
                Donate
              </a>
            </div>
          </div>

          <div className="text-center px-8 md:text-left">
            <div className="text-lg uppercase text-indigo-600 font-bold mb-2">
              <span>Quick Links</span>
            </div>
            <div className="text-center md:text-left text-[17px] whitespace-nowrap">
              <div className="text-sm">
                <a
                  className="block opacity-80 hover:opacity-100 py-0.5"
                  href="/#"
                >
                  All Charms
                </a>
                <a
                  className="block opacity-80 hover:opacity-100 py-0.5"
                  href="/#"
                >
                  All Cases
                </a>
                <a
                  className="block opacity-80 hover:opacity-100 py-0.5"
                  href="/#"
                >
                  All Collections
                </a>
                <a
                  className="block opacity-80 hover:opacity-100 py-0.5"
                  href="/#"
                >
                  All Gloves
                </a>
                <a
                  className="block opacity-80 hover:opacity-100 py-0.5"
                  href="/#"
                >
                  All Knives
                </a>
                <a
                  className="block opacity-80 hover:opacity-100 py-0.5"
                  href="/#"
                >
                  All Souvenir
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-black-500">
        <div className="flex flex-col items-center p-2 text-slate-50 text-xs text-center m-auto">
          <div className="flex flex-col justify-center items-center text-center text-[9px]">
            <div>
              This site is not affiliated with Valve, Steam, or any of their
              partners.
            </div>
            <div className="mt-1">
              Copyright © 2024 - {new Date().getFullYear()} CS2Data.info.
              Powered by Steam.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
