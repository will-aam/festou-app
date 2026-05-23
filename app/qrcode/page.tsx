import Image from "next/image";

export default function QrCodePage() {
  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center p-4">
      <div className="w-full h-full flex items-center justify-center">
        <div className="relative w-full max-w-[560px] aspect-square">
          <Image
            src="/qr-code.png"
            alt="QR Code Festou"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 560px"
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}
