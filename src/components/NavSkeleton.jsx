const NavSkeleton = () => (
  <div className="bg-white shadow-md">
    <div className="container mx-auto px-4 py-4">
      <div className="flex justify-center gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-8 w-20 bg-gray-200 rounded animate-pulse"
          ></div>
        ))}
      </div>
    </div>
  </div>
);

export default NavSkeleton;
