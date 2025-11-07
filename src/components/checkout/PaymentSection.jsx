import { CreditCard, Building, Package } from 'lucide-react';

export const PaymentSection = ({ method, onChange }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm">
    <h2 className="text-2xl font-bold text-[#5a88ca] uppercase mb-6">Payment Method</h2>
    <div className="space-y-3">
      {[
        { id: 'bacs', label: 'Direct Bank Transfer', icon: Building, desc: 'Bank account transfer' },
        { id: 'cheque', label: 'Cheque Payment', icon: Package, desc: 'Send cheque by mail' },
        { id: 'paypal', label: 'PayPal', icon: CreditCard, desc: 'PayPal or credit card' },
      ].map(({ id, label, icon: Icon, desc }) => (
        <label key={id} className="flex items-start gap-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
          <input type="radio" name="payment" value={id} checked={method === id} onChange={(e) => onChange(e.target.value)} />
          <div>
            <div className="flex items-center gap-2 font-medium">
              <Icon className="w-5 h-5" />
              {label}
            </div>
            <p className="text-sm text-gray-600 mt-1">{desc}</p>
          </div>
        </label>
      ))}
    </div>
  </div>
);
