import React from "react";
import { FaFacebook } from "react-icons/fa6";
import { RiInstagramFill, RiTwitterXFill } from "react-icons/ri";
import { Link } from "react-scroll";

const Footer = () => {
  return (
    <footer className="bg-PrimaryColor text-ExtraDarkColor z-50 rounded-t-3xl mt-8 md:mt-0 ">
      <div className="flex flex-col md:flex-row justify-between p-8 md:px-32 px-5">
        <div>
          <h1 className="font-semibold text-3xl pb-4">GiftsGarden</h1>
          <div className="flex gap-5 ml-3">
            <FaFacebook
              size={32}
              className="hover:scale-110 cursor-pointer transition duration-300 ease-in-out"
            />
            <RiInstagramFill
              size={32}
              className="hover:scale-110 cursor-pointer transition duration-300 ease-in-out"
            />
            <RiTwitterXFill
              size={32}
              className="hover:scale-110 cursor-pointer transition duration-300 ease-in-out"
            />
          </div>
        </div>
        <div>
          <h1 className="font-medium text-lg pb-4 pt-5 md:pt-0">Shop</h1>
          <div className="flex flex-col gap-2">
            <Link
              to="/"
              spy={true}
              smooth={true}
              duration={500}
              className="hover:scale-105 cursor-pointer transition duration-300 ease-in-out"
            >
              Products
            </Link>
            <Link
              to="/"
              spy={true}
              smooth={true}
              duration={500}
              className="hover:scale-105 cursor-pointer transition duration-300 ease-in-out"
            >
              Overview
            </Link>
            <Link
              to="/"
              spy={true}
              smooth={true}
              duration={500}
              className="hover:scale-105 cursor-pointer transition duration-300 ease-in-out"
            >
              Pricing
            </Link>
          </div>
        </div>
        <div>
          <div>
            <h1 className="font-medium text-lg pb-4 pt-5 md:pt-0">Company</h1>
            <div className="flex flex-col gap-2">
              <Link
                to="/"
                spy={true}
                smooth={true}
                duration={500}
                className="hover:scale-105 cursor-pointer transition duration-300 ease-in-out"
              >
                About us
              </Link>
              <Link
                to="/"
                spy={true}
                smooth={true}
                duration={500}
                className="hover:scale-105 cursor-pointer transition duration-300 ease-in-out"
              >
                Contact
              </Link>
              <Link
                to="/"
                spy={true}
                smooth={true}
                duration={500}
                className="hover:scale-105 cursor-pointer transition duration-300 ease-in-out"
              >
                News
              </Link>
              <Link
                to="/"
                spy={true}
                smooth={true}
                duration={500}
                className="hover:scale-105 cursor-pointer transition duration-300 ease-in-out"
              >
                Support
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/4">
          <h1 className="font-medium text-lg pb-4 pt-5 md:pt-0">Contact us</h1>
          <div className="flex flex-col gap-2">
            <Link to="/" spy={true} smooth={true} duration={500}>
              GhantaGhar, Link Road, Birgunj, Parsa, Nepal
            </Link>
            <Link to="/" spy={true} smooth={true} duration={500}>
              giftsgarden@lennobyte.com
            </Link>
            <Link to="/" spy={true} smooth={true} duration={500}>
              +977 980-111-1234
            </Link>
          </div>
        </div>
      </div>
      <div>
        <p className="text-center py-4">
          developed by
          <span className="text-black"> LennoByte Solutions </span>
          {"\u00A9"} | All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
