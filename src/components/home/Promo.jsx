import { RefreshCw, Truck, Lock, Gift } from 'lucide-react';

export default function Promo() {
  return (
    <div className="py-8">
      <div className="zigzag-bottom"></div>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="single-promo promo1 bg-blue-600 text-white hover:bg-black p-6  flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
            <RefreshCw className="w-10 h-20 mb-3" />
            <p className="text-lg font-semibold">30 Days return</p>
          </div>

          <div className="single-promo promo2 bg-yellow-500 text-white hover:bg-black p-6  flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
            <Truck className="w-10 h-20 mb-3" />
            <p className="text-lg font-semibold">Free shipping</p>
          </div>

          <div className="single-promo promo3 bg-red-500 text-white hover:bg-black p-6  flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
            <Lock className="w-10 h-20 mb-3" />
            <p className="text-lg font-semibold">Secure payments</p>
          </div>

          <div className="single-promo promo4 bg-teal-500 text-white hover:bg-black p-6  flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
            <Gift className="w-10 h-20 mb-3" />
            <p className="text-lg font-semibold">New products</p>
          </div>
        </div>
      </div>
    </div>
  );
}