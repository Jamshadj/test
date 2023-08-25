import { Button, Navbar } from 'flowbite-react';
import Logo from '../../../assets/logo/logo.png';
export default function NavbarWithCTAButton() {
  return (
    <Navbar fluid rounded className="bg-blue-500 m-0 ">
      <Navbar.Brand href="https://flowbite-react.com">
        <img
          alt=""
          className="mr-3 h-6 sm:h-9"
          src={Logo}
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold text-black">
         StaySpot
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Button className="bg-white text-black">
          Get started
        </Button>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active href="#">
          <p>
            Home
          </p>
        </Navbar.Link>
        <Navbar.Link href="#">
          About
        </Navbar.Link>
        <Navbar.Link href="#">
          Services
        </Navbar.Link>
        <Navbar.Link href="#">
          Pricing
        </Navbar.Link>
        <Navbar.Link href="#">
          Contact
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  )
}
