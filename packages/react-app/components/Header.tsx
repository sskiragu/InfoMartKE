import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon, ShoppingCartIcon, QuestionMarkCircleIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useConnect } from "wagmi";
import { injected } from "wagmi/connectors";
import { useCart } from '../contexts/CartContext'; // Import useCart hook

export default function Header() {
  const [hideConnectBtn, setHideConnectBtn] = useState(false);
  const { connect } = useConnect();
  const { toggleCart } = useCart(); // Use the useCart hook

  useEffect(() => {
    if (window.ethereum && window.ethereum.isMiniPay) {
      setHideConnectBtn(true);
      connect({ connector: injected({ target: "metaMask" }) });
    }
  }, [connect]);

  return (
    <>
      {/* Top Banner */}
      <div className="bg-red-800 text-white py-2 text-center">
        <p className="text-sm sm:text-base">
          Welcome to InfoMartKE - Your destination for IT products and services!
        </p>
      </div>
      <Disclosure as="nav" className="bg-white border-b border-gray-300">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button */}
                  <DisclosureButton className="inline-flex items-center justify-center rounded-md p-2 text-gray-800 focus:outline-none focus:ring-1 focus:ring-inset focus:rounded-none focus:ring-gray-600">
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
                      className="inline-flex items-center border-b-2 border-gray-300 px-1 pt-1 text-sm font-medium text-gray-800"
                    >
                      Home
                    </a>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {!hideConnectBtn && (
                    <ConnectButton
                      accountStatus={{ smallScreen: "avatar", largeScreen: "full" }}
                      showBalance={{ smallScreen: false, largeScreen: true }}
                    />
                  )}
                  <button
                    type="button"
                    className="rounded-full bg-white p-1 text-gray-800 hover:text-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-600"
                  >
                    <span className="sr-only">View notifications</span>
                    <ShoppingCartIcon
                      className="h-6 w-6"
                      aria-hidden="true"
                      onClick={toggleCart} // Toggle cart visibility
                    />
                  </button>
                  <button
                    type="button"
                    className="rounded-full bg-white p-1 text-gray-800 hover:text-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-600"
                  >
                    <span className="sr-only">View help</span>
                    <QuestionMarkCircleIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    className="rounded-full bg-white p-1 text-gray-800 hover:text-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-600"
                  >
                    <span className="sr-only">Search</span>
                    <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
            <DisclosurePanel className="sm:hidden">
              <div className="space-y-1 pt-2 pb-3">
                <DisclosureButton
                  as="a"
                  href="#"
                  className="block border-l-4 border-gray-300 py-2 pl-3 pr-4 text-base font-medium text-gray-800"
                >
                  Home
                </DisclosureButton>
              </div>
            </DisclosurePanel>
          </>
        )}
      </Disclosure>
    </>
  );
}
