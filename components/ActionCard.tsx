"use client";
import Image from "next/image";

interface Props {
  title: string;
  image: string;
}

export default function ActionCard({ title, image }: Props) {
  return (
    <div className="group bg-white border border-gray-200 rounded-2xl p-5 flex flex-col items-center justify-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
      <div className="relative w-16 h-16 mb-4 bg-blue-50 rounded-xl group-hover:bg-blue-100 transition">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 300px"
          className="object-contain p-3"
        />
      </div>

      <span className="text-sm font-semibold text-gray-800 text-center">
        {title}
      </span>
    </div>
  );
}
