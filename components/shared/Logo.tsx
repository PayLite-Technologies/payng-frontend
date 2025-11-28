import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex items-center gap-2 mb-4">
      <Image src="/logo.png" width={200} height={100} alt="Payng Logo" />
    </div>
  );
}
