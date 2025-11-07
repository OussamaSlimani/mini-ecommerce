export const OrderSummary = ({ cart }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm">
    <h2 className="text-2xl font-bold text-[#5a88ca] uppercase mb-6">Your Order</h2>
    <table className="w-full text-sm">
      <thead className="border-b">
        <tr>
          <th className="text-left py-2">Product</th>
          <th className="text-right py-2">Total</th>
        </tr>
      </thead>
      <tbody>
        {cart.items.map((item) => (
          <tr key={item.id} className="border-b">
            <td className="py-3">{item.name} <span className="text-gray-500">× {item.qty}</span></td>
            <td className="text-right py-3">€{(item.price * item.qty).toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr className="border-b"><td className="py-2">Subtotal</td><td className="text-right">€{cart.subTotal.toFixed(2)}</td></tr>
        <tr className="border-b"><td className="py-2">Tax (20%)</td><td className="text-right">€{cart.tax.toFixed(2)}</td></tr>
        <tr><td className="py-2 font-bold">Total</td><td className="text-right font-bold text-green-600">€{cart.total.toFixed(2)}</td></tr>
      </tfoot>
    </table>
  </div>
);