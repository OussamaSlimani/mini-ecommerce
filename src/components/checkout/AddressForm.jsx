import { Input } from "./Input";

export const AddressForm = ({ data, onChange }) => (
  <div className="space-y-4">
    <select
      value={data.civility}
      onChange={(e) => onChange("civility", e)}
      className="w-full px-3 py-2 border border-gray-300 rounded-md"
      required
    >
      <option value="Mr">Mr</option>
      <option value="Mlle">Mlle</option>
      <option value="Mme">Mme</option>
    </select>

    <div className="grid grid-cols-2 gap-4">
      <Input
        label="First Name"
        required
        value={data.firstName}
        onChange={(e) => onChange("firstName", e)}
      />
      <Input
        label="Last Name"
        required
        value={data.lastName}
        onChange={(e) => onChange("lastName", e)}
      />
    </div>

    <Input
      label="Company"
      value={data.companyName}
      onChange={(e) => onChange("companyName", e)}
    />
    <Input
      label="Street"
      required
      value={data.street}
      onChange={(e) => onChange("street", e)}
    />
    <Input
      label="Apartment"
      value={data.apartment}
      onChange={(e) => onChange("apartment", e)}
    />
    <Input
      label="City"
      required
      value={data.city}
      onChange={(e) => onChange("city", e)}
    />

    <div className="grid grid-cols-2 gap-4">
      <Input
        label="County"
        value={data.county}
        onChange={(e) => onChange("county", e)}
      />
      <Input
        label="ZIP"
        required
        value={data.zipCode}
        onChange={(e) => onChange("zipCode", e)}
      />
    </div>

    <div className="grid grid-cols-2 gap-4">
      <Input
        label="Email"
        type="email"
        required
        value={data.email}
        onChange={(e) => onChange("email", e)}
      />
      <Input
        label="Phone"
        type="tel"
        required
        value={data.phone}
        onChange={(e) => onChange("phone", e)}
      />
    </div>
  </div>
);
