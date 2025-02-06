import * as z from "zod";


const allowedDomains = ["gmail.com", "outlook.com", "yahoo.com", "icloud.com", "hotmail.com"];
export const LoginSchema =z.object({
    email: z.string()
            .email()
            .refine((email) => {
                const domain = email.split("@")[1]; // Extract domain
                return allowedDomains.includes(domain);
              }, { 
                message: "Invalid email Address" 
              }),
    password:z.string().min(1,{
        message: "Password is required"
    })
})

export const SignUpSchema =z.object({
  email: z.string()
          .email()
          .refine((email) => {
              const domain = email.split("@")[1]; // Extract domain
              return allowedDomains.includes(domain);
            }, { 
              message: "Invalid email Address" 
            }),
  password:z.string().min(6,{
      message: "Password must be atleast 6 characters"
  }),
  name:z.string().min(1,{
    message:'Name is required'
  })
})

