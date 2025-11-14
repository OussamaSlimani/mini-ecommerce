export const PaymentSection = ({ value, onChange }) => {
  const paymentMethods = [
    { id: "bacs", label: "Direct Bank Transfer", desc: "Bank account transfer" },
    { id: "cheque", label: "Cheque Payment", desc: "Send cheque by mail" },
    { id: "paypal", label: "PayPal", desc: "PayPal or credit card" },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold text-[#5a88ca] uppercase mb-6">
        Payment Method
      </h2>
      <div className="space-y-3">
        {paymentMethods.map(({ id, label, desc }) => (
          <label
            key={id}
            className={`flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition-colors ${
              value === id ? "border-[#5a88ca] bg-gray-50" : "hover:bg-gray-50"
            }`}
          >
            <input
              type="radio"
              name="payment"
              value={id}
              checked={value === id}
              onChange={() => onChange(id)}
              className="mt-1"
            />
            <div>
              <div className="font-medium">{label}</div>
              <p className="text-sm text-gray-600 mt-1">{desc}</p>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default PaymentSection;