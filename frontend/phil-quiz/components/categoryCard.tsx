export default function CategoryCard({
  name,
  icon,
}: {
  name: string;
  icon: string;
}) {
  return (
    <section className="w-full">
      <div
        className="bg-linear-to-br from-pink-500 to-purple-600
                   rounded-2xl p-4 sm:p-5 md:p-6 lg:p-8
                   flex flex-col items-center justify-center
                   text-center cursor-pointer
                   hover:scale-105 hover:shadow-2xl
                   active:scale-95 transition duration-300
                   aspect-square
                   max-w-40 sm:max-w-50 md:max-w-60 lg:max-w-75
                   mx-auto"
      >
        <img
          src={icon}
          alt={name}
          className="w-12 h-12 sm:w-24 sm:h-16 md:w-24 md:h-24 lg:w-40 lg:h-40 object-contain mb-3"
        />

        {/* FIX: clamp text to prevent height differences */}
        <p className="font-semibold text-sm sm:text-base md:text-lg lg:text-xl text-white line-clamp-2">
          {name}
        </p>
      </div>
    </section>
  );
}
