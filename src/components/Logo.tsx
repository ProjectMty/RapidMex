import Image from "next/image";

export default function Logo() {
  return (
    <Image
      src="/img/logo.png" // ✅ empieza con "/img/", no "public"
      alt="RapidMex Logo"
      width={200}
      height={80}
    />
  );
}
