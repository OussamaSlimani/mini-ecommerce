export const PaymentOption = ({ id, label, icon, checked, onChange, description }) => (
  <label className="flex items-start gap-3 cursor-pointer p-4 rounded-lg border hover:bg-gray-50 transition">
    <input
      type="radio"
      name="payment_method"
      value={id}
      checked={checked}
      onChange={onChange}
      className="mt-1"
    />
    <div className="flex-1">
      <div className="flex items-center gap-2 font-medium">
        {icon}
        <span>{label}</span>
      </div>
      <p className="text-sm text-gray-600 mt-1">{description}</p>
    </div>
  </label>
);
