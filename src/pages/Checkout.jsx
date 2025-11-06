import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useCheckout } from '../hooks/useCheckout';
import { CreditCard, Building, Package, CheckCircle } from 'lucide-react';

const Checkout = () => {
    const { cart, isLoading: cartLoading } = useCart();
    const { placeOrder, isLoading, isSuccess, error } = useCheckout();

    const [shipToDifferent, setShipToDifferent] = useState(true);
    const [formData, setFormData] = useState({
        billing: {
            civility: 'Mr',
            firstName: '',
            lastName: '',
            companyName: '',
            street: '',
            zipCode: '',
            city: '',
            county: '',
            apartment: '',
            email: '',
            phone: '',
        },
        shipping: {
            civility: 'Mr',
            firstName: '',
            lastName: '',
            companyName: '',
            street: '',
            zipCode: '',
            city: '',
            county: '',
        },
        orderNotes: '',
        paymentMethod: 'bacs',
    });

    const handleInputChange = (section, field, e) => {
        const value = e.target.value;
        setFormData(prev => ({
            ...prev,
            [section]: { ...prev[section], [field]: value },
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await placeOrder(formData);
        } catch (err) {
            console.error(err);
        }
    };

    if (cartLoading) return <LoadingState />;
    if (isSuccess) return <SuccessState />;              
    if (!cart || cart.items.length === 0) return <EmptyCart />;

    return (
        <>
            <section className="bg-[#5a88ca] py-12">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-5xl font-bold text-white">Checkout</h1>
                </div>
            </section>

            <section className="py-12">
                <div className="container mx-auto px-4">
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="space-y-8">
                            <div className="bg-white p-6 rounded-lg shadow-sm">
                                <h2 className="text-2xl font-bold text-[#5a88ca] uppercase mb-6 tracking-wider">
                                    Billing Details
                                </h2>
                                <AddressForm
                                    prefix="billing"
                                    data={formData.billing}
                                    onChange={(field, e) => handleInputChange('billing', field, e)}
                                />
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-sm">
                                <label className="flex items-center gap-2 cursor-pointer select-none">
                                    <input
                                        type="checkbox"
                                        checked={shipToDifferent}
                                        onChange={(e) => setShipToDifferent(e.target.checked)}
                                        className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                                    />
                                    <span className="text-lg font-medium">Ship to a different address?</span>
                                </label>

                                {shipToDifferent && (
                                    <div className="mt-6">
                                        <AddressForm
                                            prefix="shipping"
                                            data={formData.shipping}
                                            onChange={(field, e) => handleInputChange('shipping', field, e)}
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-sm">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Order Notes (optional)
                                </label>
                                <textarea
                                    rows={3}
                                    value={formData.orderNotes}
                                    onChange={(e) => setFormData(prev => ({ ...prev, orderNotes: e.target.value }))}
                                    placeholder="Notes about your order, e.g. special notes for delivery."
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                />
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-white p-6 rounded-lg shadow-sm">
                                <h2 className="text-2xl font-bold text-[#5a88ca] uppercase mb-6 tracking-wider">
                                    Your Order
                                </h2>
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
                                                <td className="py-3">
                                                    {item.name}{' '}
                                                    <strong className="text-gray-500">× {item.qty}</strong>
                                                </td>
                                                <td className="text-right py-3">
                                                    €{(item.price * item.qty).toFixed(2)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot>
                                        <tr className="border-b">
                                            <th className="text-left py-2">Cart Subtotal</th>
                                            <td className="text-right py-2">€{cart.subTotal.toFixed(2)}</td>
                                        </tr>
                                        <tr className="border-b">
                                            <th className="text-left py-2">Tax (20%)</th>
                                            <td className="text-right py-2">€{cart.tax.toFixed(2)}</td>
                                        </tr>
                                        <tr>
                                            <th className="text-left py-2 text-lg">Order Total</th>
                                            <td className="text-right py-2 text-lg font-bold text-green-600">
                                                €{cart.total.toFixed(2)}
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-sm">

                                <h2 className="text-2xl font-bold text-[#5a88ca] uppercase mb-6 tracking-wider">
                                    Payment Method
                                </h2>
                                <div className="space-y-3">
                                    <PaymentOption
                                        id="bacs"
                                        label="Direct Bank Transfer"
                                        icon={<Building className="w-5 h-5" />}
                                        checked={formData.paymentMethod === 'bacs'}
                                        onChange={() => setFormData(prev => ({ ...prev, paymentMethod: 'bacs' }))}
                                        description="Make your payment directly into our bank account. Use your Order ID as reference."
                                    />
                                    <PaymentOption
                                        id="cheque"
                                        label="Cheque Payment"
                                        icon={<Package className="w-5 h-5" />}
                                        checked={formData.paymentMethod === 'cheque'}
                                        onChange={() => setFormData(prev => ({ ...prev, paymentMethod: 'cheque' }))}
                                        description="Send cheque to Store Name, Store Street, Store Town."
                                    />
                                    <PaymentOption
                                        id="paypal"
                                        label="PayPal"
                                        icon={<CreditCard className="w-5 h-5" />}
                                        checked={formData.paymentMethod === 'paypal'}
                                        onChange={() => setFormData(prev => ({ ...prev, paymentMethod: 'paypal' }))}
                                        description="Pay via PayPal; you can pay with your credit card if you don’t have a PayPal account."
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="bg-[#5a88ca] text-white p-3 disabled:opacity-50 transition-colors font-semibold text-lg flex items-center justify-center gap-2"
                            >
                                {isLoading ? (
                                    <>Placing Order...</>

                                ) : (
                                    <>
                                        <CheckCircle className="w-5 h-5" />
                                        Place Order
                                    </>
                                )}
                            </button>

                            {error && (
                                <p className="text-red-600 text-center bg-red-50 p-3 rounded">
                                    {error.message || 'Failed to place order. Please try again.'}
                                </p>
                            )}
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
};

const AddressForm = ({ prefix, data, onChange }) => (
    <div className="space-y-4">
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                Civility <span className="text-red-500">*</span>
            </label>
            <select
                value={data.civility}
                onChange={(e) => onChange('civility', e)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
                <option value="Mr">Mr</option>
                <option value="Mlle">Mlle</option>
                <option value="Mme">Mme</option>
            </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
            <Input label="First Name" required value={data.firstName} onChange={(e) => onChange('firstName', e)} />
            <Input label="Last Name" required value={data.lastName} onChange={(e) => onChange('lastName', e)} />
        </div>

        <Input label="Company Name" value={data.companyName} onChange={(e) => onChange('companyName', e)} />
        <Input label="Street Address" required value={data.street} onChange={(e) => onChange('street', e)} />
        <Input label="Apartment, suite, etc. (optional)" value={data.apartment} onChange={(e) => onChange('apartment', e)} />
        <Input label="Town / City" required value={data.city} onChange={(e) => onChange('city', e)} />

        <div className="grid grid-cols-2 gap-4">
            <Input label="County" value={data.county} onChange={(e) => onChange('county', e)} />
            <Input label="Postcode / ZIP" required value={data.zipCode} onChange={(e) => onChange('zipCode', e)} />
        </div>

        <div className="grid grid-cols-2 gap-4">
            <Input label="Email Address" type="email" required value={data.email} onChange={(e) => onChange('email', e)} />
            <Input label="Phone" type="tel" required value={data.phone} onChange={(e) => onChange('phone', e)} />
        </div>
    </div>
);

const Input = ({ label, type = 'text', required, ...props }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <input
            type={type}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required={required}
            {...props}
        />
    </div>
);

const PaymentOption = ({ id, label, icon, checked, onChange, description }) => (
    <label className="flex items-start gap-3 cursor-pointer p-3 rounded border hover:bg-gray-50 transition">
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


const LoadingState = () => (
    <div className="text-center py-40">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
        <p className="mt-4 text-gray-600 ">Loading checkout...</p>
    </div>
);

const EmptyCart = () => (
    <div className="text-center py-40">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <Link to="/" className="text-white bg-[#5a88ca] px-6 py-3">Continue Shopping</Link>
    </div>
);

const SuccessState = () => (
    <div className="text-center py-40">
        <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
        <h2 className="text-3xl font-bold mb-4">Order Placed Successfully!</h2>
        <p className="text-gray-600 mb-6">Thank you for your purchase. You will receive an email confirmation shortly.</p>
        <Link to="/" className="text-white bg-[#5a88ca] px-6 py-3">
            Continue Shopping
        </Link>
    </div>
);

export default Checkout;