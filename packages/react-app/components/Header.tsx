import { Disclosure } from "@headlessui/react";
import Image from "next/image";

export default function Header() {
  return (
    <>
      <Disclosure as="nav" className="bg-prosperity border-b border-black">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 justify-between">
                <div className="flex flex-1 items-center justify-center">
                  <div className="flex flex-shrink-0 items-center">
                    <Image
                      className="block h-8 w-auto sm:block lg:block"
                      src="/logo.svg"
                      width="24"
                      height="24"
                      alt="Celo Logo"
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </Disclosure>
    </>
  );
}
