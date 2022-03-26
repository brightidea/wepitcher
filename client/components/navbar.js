import Link from "next/link";
import Image from 'next/image'

function Navbar() {
  // const [{ data }] = useGetCurrentUserQuery();
  // const isAuthenticated = !!data?.currentUser;

  return (
    <nav className="flex items-center justify-between flex-wrap bg-transparent p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-20">
      <Link href="/">
        <a>
          <Image src="/wepitcher-logo.png" alt="WePitcher Logo" width={122} height={34} />
        </a>
      </Link>
      </div>
      <div className="block lg:hidden">
        <a className="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-500 hover:text-gray-300 hover:border-gray-300">
            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
        </a>
      </div>
      <div className="w-full flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow content-center	justify-center">
          {/* <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-2 text-black-200 hover:text-gray hover:underline mr-8">
            Explore Decks
          </a> */}
          {/* <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-2 text-black-200 hover:text-gray hover:underline mr-8">
            Examples
          </a>
          <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-2 text-black-200 hover:text-gray hover:underline">
            Blog
          </a> */}
        </div>
        <div className="hidden lg:inline-block">
          <Link href="/decks"><a className="uppercase inline-block text-sm px-4 py-2 leading-none text-black hover:text-gray-500 hover:underline mt-4 lg:mt-2 lg:mr-4">Explore Pitch Decks</a></Link>
          |
          <Link href="/login"><a className="uppercase inline-block text-sm px-4 py-2 leading-none border rounded text-black border-black hover:border-blue-500 hover:text-blue-500 hover:bg-white mt-4 lg:mt-2 md:ml-4 lg:ml-8">LOGIN</a></Link>
          <Link href="/register"><a href="#" className="uppercase inline-block text-sm px-4 py-2 leading-none border rounded text-black border-black hover:border-blue-500 hover:text-blue-500 hover:bg-white mt-4 md:ml-4 lg:mt-2 lg:ml-4">REGISTER</a></Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;


