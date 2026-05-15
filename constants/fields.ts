export const fields = [
   {
    name: "email",
    label: "Email Address",
    placeholder: "Email",
    required: true,
    type: "email",
  },
  {
    name: "firstName",
    label: "First Name",
    placeholder: "First name",
    required: true,
    type: "text",
  },
    {
    name: "password",
    label: "Password",
    placeholder: "Password",
    required: true,
    type: "password",
  },
  {
    name: "lastName",
    label: "Last Name",
    placeholder: "Last name",
    required: true,
    type: "text",
  },
   {
    name: "confirmPassword",
    label: "Confirm Password",
    placeholder: "Confirm Password",
    required: true,
    type: "password",
  },
  {
    name: "organization",
    label: "Organization",
    placeholder: "Organization",
    required: true,
    type: "text",
  },

  {
    name: "phone",
    label: "Phone Number",
    placeholder: "Phone Number with country code",
    required: true,
    type: "tel",
  },
  {
    name: "position",
    label: "Position",
    placeholder: "Position",
    required: false,
    type: "text",
  },
  
 
] as const;