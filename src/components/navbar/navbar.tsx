import Image from "next/image";

export default function Navbar() {
  return (
    <div className="navbar shadow-lg">
      <div className="flex-1 p-2">
        <Image
          src="/core-logo-2.png"
          width={100}
          height={100}
          alt="Picture of the author"
        />
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a>Appliance Center</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
