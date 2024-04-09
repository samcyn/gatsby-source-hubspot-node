import React from 'react';
import { Link } from 'gatsby';

import AppCard from '.';

type Props = {
  readonly id?: string;
  readonly properties: {
    readonly firstname: string;
    readonly email: string;
    readonly lastname: string;
    readonly hs_object_id: string;
  };
};
const AppCardWithContact = ({ properties: { firstname, lastname, email, hs_object_id } }: Props) => {
  return (
    <AppCard className="bg-[#663399]">
      <Link to="/" className="block w-full no-underline">
        <div className="relative overflow-hidden">
          <div className="relative p-4 md:p-6 z-1">
            <small className="text-white opacity-40">#{hs_object_id}</small>
            <p className="font-bold text-xl mb-2 text-white/90">Hubspot CMS Contact</p>
            <p className="text-white/90">
              {firstname || 'John'} {lastname || 'Doe'}
            </p>
            <p className="text-white/90">{email}</p>
          </div>
          <svg
            width="220"
            height="220"
            viewBox="0 0 220 220"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute right-0 top-1/2 -translate-y-1/2 opacity-50"
          >
            <g clip-path="url(#tutorial-cta-card-clip0)">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M128.157 179.614C128.157 185.414 123.455 190.116 117.656 190.116C111.856 190.116 107.154 185.414 107.154 179.614L107.154 137.454C107.154 131.655 111.856 126.953 117.656 126.953C123.455 126.953 128.157 131.655 128.157 137.454L128.157 179.614ZM117.656 188.953C122.813 188.953 126.994 184.772 126.994 179.614L126.994 137.454C126.994 132.297 122.813 128.116 117.656 128.116C112.498 128.116 108.317 132.297 108.317 137.454L108.317 179.614C108.317 184.772 112.498 188.953 117.656 188.953ZM118.276 85.3733C124.268 85.3733 129.126 90.231 129.126 96.2233C129.126 102.216 124.268 107.073 118.276 107.073C112.283 107.073 107.426 102.216 107.426 96.2233C107.426 90.231 112.283 85.3733 118.276 85.3733ZM117.656 234.175C123.134 234.175 127.576 229.733 127.576 224.255L127.576 209.375C127.576 203.896 123.134 199.455 117.656 199.455C112.177 199.455 107.736 203.896 107.736 209.375L107.736 224.255C107.736 229.733 112.177 234.175 117.656 234.175Z"
                fill="#B17ACC"
              ></path>
              <rect
                width="34.72"
                height="19.84"
                rx="9.92"
                transform="matrix(-1.04911e-07 -1 -1 9.44125e-08 23.415 224.835)"
                stroke="#542C85"
                strokeWidth="1.1625"
              ></rect>
              <rect
                width="19.84"
                height="19.84"
                rx="9.92"
                transform="matrix(-1.04911e-07 -1 -1 9.44125e-08 23.415 180.195)"
                stroke="#542C85"
                strokeWidth="1.1625"
              ></rect>
              <rect
                width="74.4"
                height="19.84"
                rx="9.92"
                transform="matrix(-1.04911e-07 -1 -1 9.44125e-08 92.8555 230.455)"
                stroke="#B17ACC"
                strokeWidth="1.1625"
              ></rect>
              <rect
                width="44.64"
                height="19.84"
                rx="9.92"
                transform="matrix(-1.04911e-07 -1 -1 9.44125e-08 92.8555 146.136)"
                stroke="#542C85"
                strokeWidth="1.1625"
              ></rect>
              <rect
                width="80.6"
                height="19.84"
                rx="9.92"
                transform="matrix(-1.04911e-07 -1 -1 9.44125e-08 58.1348 183.335)"
                stroke="#542C85"
                strokeWidth="1.1625"
              ></rect>
              <rect
                width="44.64"
                height="19.84"
                rx="9.92"
                transform="matrix(-1.04911e-07 -1 -1 9.44125e-08 58.7549 92.8154)"
                stroke="#542C85"
                strokeWidth="1.1625"
              ></rect>
              <path
                d="M167.237 101.477C167.237 101.477 154.792 81.2021 152.237 78.4164C149.7 75.5606 147.03 71.2434 145.226 72.936C143.422 74.6287 146.882 82.1591 146.882 82.1591"
                fill="white"
              ></path>
              <path
                d="M167.237 101.477C167.237 101.477 154.792 81.2021 152.237 78.4164C149.7 75.5606 147.03 71.2434 145.226 72.936C143.422 74.6287 146.882 82.1591 146.882 82.1591"
                stroke="white"
                strokeOpacity="0.2"
                strokeWidth="1.1625"
                strokeMiterlimit="10"
              ></path>
              <path
                d="M162.032 95.0449L144.162 79.7042C144.162 79.7042 134.624 71.8957 132.912 74.3635C131.27 76.8501 140.407 84.476 140.407 84.476"
                fill="white"
              ></path>
              <path
                d="M162.032 95.0449L144.162 79.7042C144.162 79.7042 134.624 71.8957 132.912 74.3635C131.27 76.8501 140.407 84.476 140.407 84.476"
                stroke="white"
                strokeOpacity="0.2"
                strokeWidth="1.1625"
                strokeMiterlimit="10"
              ></path>
              <mask
                id="tutorial-cta-card-mask0"
                mask-type="alpha"
                maskUnits="userSpaceOnUse"
                x="86"
                y="57"
                width="129"
                height="224"
              >
                <path
                  d="M135.284 162.431L135.314 162.496L135.319 162.567L139.583 225.561L161.909 280.373L213.448 280.417L213.639 57.9512L87.0665 57.8422L135.284 162.431Z"
                  fill="#48434F"
                  stroke="#F5F5F5"
                  strokeWidth="0.775"
                ></path>
              </mask>
              <g mask="url(#tutorial-cta-card-mask0)">
                <path
                  d="M154.207 253.932C154.207 253.932 176.482 242.492 191.776 205.019C197.599 190.751 199.174 177.744 198.726 166.446C198.738 156.608 197.323 145.074 192.562 133.194C191.834 131.376 191.07 129.644 190.286 127.978C190.175 127.596 185.802 118.356 181.973 113.76C173.908 102.51 166.273 96.7872 162.984 94.8779C159.694 92.9686 152.406 88.4473 144.03 85.5221C131.53 81.1568 126.388 80.5093 125.754 82.8763C125.376 84.2852 130.47 86.8411 135.598 89.2658C140.726 91.6904 153.058 95.2357 150.9 103.29C149.211 109.591 141.668 111.072 138.919 111.316C130.925 112.026 119.168 108.575 117.405 115.156C117.405 115.156 131.646 118.446 133.317 118.933C145.653 122.519 154.139 127.607 161.589 140.127C172.912 159.155 167.152 177.336 165.566 183.814C163.98 190.293 156.638 210.15 144.625 220.612"
                  fill="white"
                ></path>
                <path
                  d="M154.207 253.932C154.207 253.932 176.482 242.492 191.776 205.019C197.599 190.751 199.174 177.744 198.726 166.446C198.738 156.608 197.323 145.074 192.562 133.194C191.834 131.376 191.07 129.644 190.286 127.978C190.175 127.596 185.802 118.356 181.973 113.76C173.908 102.51 166.273 96.7872 162.984 94.8779C159.694 92.9686 152.406 88.4473 144.03 85.5221C131.53 81.1568 126.388 80.5093 125.754 82.8763C125.376 84.2852 130.47 86.8411 135.598 89.2658C140.726 91.6904 153.058 95.2357 150.9 103.29C149.211 109.591 141.668 111.072 138.919 111.316C130.925 112.026 119.168 108.575 117.405 115.156C117.405 115.156 131.646 118.446 133.317 118.933C145.653 122.519 154.139 127.607 161.589 140.127C172.912 159.155 167.152 177.336 165.566 183.814C163.98 190.293 156.638 210.15 144.625 220.612"
                  stroke="black"
                  strokeOpacity="0.1"
                  strokeWidth="1.1625"
                  strokeMiterlimit="10"
                ></path>
              </g>
            </g>
            <defs>
              <clipPath id="tutorial-cta-card-clip0">
                <rect width="220" height="220" fill="white" transform="translate(0 220) rotate(-90)"></rect>
              </clipPath>
            </defs>
          </svg>
        </div>
      </Link>
    </AppCard>
  );
};

export default AppCardWithContact;
