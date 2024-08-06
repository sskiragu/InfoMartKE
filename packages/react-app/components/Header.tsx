import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon, ShoppingCartIcon, QuestionMarkCircleIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useConnect } from "wagmi";
import { injected } from "wagmi/connectors";

export default function Header() {
  const [hideConnectBtn, setHideConnectBtn] = useState(false);
  const { connect } = useConnect();

  useEffect(() => {
    if (window.ethereum && window.ethereum.isMiniPay) {
      setHideConnectBtn(true);
      connect({ connector: injected({ target: "metaMask" }) });
    }
  }, [connect]);

  return (
    <>
      {/* Top Banner */}
      <div className="bg-gray-800 text-white py-2 text-center">
        <p className="text-sm sm:text-base">
          Welcome to InfoMartKE - Your destination for IT products and services!
        </p>
      </div>
      <Disclosure as="nav" className="bg-gray-900 border-b border-red-600">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button */}
                  <DisclosureButton className="inline-flex items-center justify-center rounded-md p-2 text-white focus:outline-none focus:ring-1 focus:ring-inset focus:rounded-none focus:ring-red-600">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </DisclosureButton>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center">
                    <Image
                      className="block h-8 w-auto sm:block lg:block"
                      src="/logo.svg"
                      width="24"
                      height="24"
                      alt="Celo Logo"
                    />
                  </div>
                  <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                    <a
                      href="#"
                      className="inline-flex items-center border-b-2 border-red-600 px-1 pt-1 text-sm font-medium text-white"
                    >
                      Home
                    </a>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {!hideConnectBtn && (
                    <ConnectButton
                      showBalance={{
                        smallScreen: true,
                        largeScreen: false,
                      }}
                    />
                  )}
                </div>
              </div>
            </div>

            <DisclosurePanel className="sm:hidden">
              <div className="space-y-1 pt-2 pb-4">
                <DisclosureButton
                  as="a"
                  href="#"
                  className="block border-l-4 border-red-600 py-2 pl-3 pr-4 text-base font-medium text-white"
                >
                  Home
                </DisclosureButton>
                {/* Add here your custom menu elements */}
              </div>
            </DisclosurePanel>
          </>
        )}
      </Disclosure>

      {/* Search, Help, and Cart Section */}
      <div className="bg-gray-800 py-2">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Search Bar */}
            <div className="flex items-center bg-gray-700 text-white rounded-md p-2">
              <MagnifyingGlassIcon className="h-5 w-5 mr-2" aria-hidden="true" />
              <input
                type="text"
                placeholder="Search"
                className="bg-gray-700 text-white focus:outline-none"
              />
            </div>
            {/* Help Icon */}
            <div className="flex items-center">
              <a href="#" className="text-white p-2">
                <QuestionMarkCircleIcon className="h-6 w-6" aria-hidden="true" />
                <span className="sr-only">Help</span>
              </a>
              {/* Cart Icon */}
              <a href="#" className="text-white p-2">
                <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
                <span className="sr-only">Cart</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
