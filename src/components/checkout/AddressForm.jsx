import { Input } from "./Input";

export const AddressForm = ({ prefix, register, errors = {} }) => {
  const field = (name) => `${prefix}.${name}`;

  return (
    <div className="space-y-4">
      <select
        {...register(field("civility"), { required: "Civility is required" })}
        className="w-full px-3 py-2 border border-gray-300 rounded-md"
      >
        <option value="Mr">Mr</option>
        <option value="Mlle">Mlle</option>
        <option value="Mme">Mme</option>
      </select>
      {errors.civility && (
        <p className="text-red-500 text-sm">{errors.civility.message}</p>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Input
            label="First Name"
            required
            {...register(field("firstName"), {
              required: "First name is required",
            })}
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm">{errors.firstName.message}</p>
          )}
        </div>

        <div>
          <Input
            label="Last Name"
            required
            {...register(field("lastName"), {
              required: "Last name is required",
            })}
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      <Input
        label="Company"
        {...register(field("companyName"))}
      />

      <div>
        <Input
          label="Street"
          required
          {...register(field("street"), {
            required: "Street is required",
          })}
        />
        {errors.street && (
          <p className="text-red-500 text-sm">{errors.street.message}</p>
        )}
      </div>

      <Input
        label="Apartment"
        {...register(field("apartment"))}
      />

      <div>
        <Input
          label="City"
          required
          {...register(field("city"), {
            required: "City is required",
          })}
        />
        {errors.city && (
          <p className="text-red-500 text-sm">{errors.city.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="County"
          {...register(field("county"))}
        />

        <div>
          <Input
            label="ZIP"
            required
            {...register(field("zipCode"), {
              required: "ZIP code is required",
              pattern: {
                value: /^\d{5}$/,
                message: "Invalid ZIP code",
              },
            })}
          />
          {errors.zipCode && (
            <p className="text-red-500 text-sm">{errors.zipCode.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Input
            label="Email"
            type="email"
            required
            {...register(field("email"), {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Input
            label="Phone"
            type="tel"
            required
            {...register(field("phone"), {
              required: "Phone is required",
              pattern: {
                value: /^[\d\s\-\+\(\)]{10,15}$/,
                message: "Invalid phone number",
              },
            })}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone.message}</p>
          )}
        </div>
      </div>
    </div>
  );
};