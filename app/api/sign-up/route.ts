
import { SignUpSchema } from "@/schemas"
import { NextResponse } from "next/server"
import bcrypt from "bcrypt";
import { addUser, getUserByEmail } from "@/db/queries";

// create account
export async function POST(req:Request){

    try {
        const {values} = await req.json()

        const validatedFields = SignUpSchema.safeParse(values);

        if (!validatedFields.success) {
            return NextResponse.json({message:"Invalid details"},{status:401})
        }
        // 
        const { email, name, password } = validatedFields.data
        const hashedPassword = await bcrypt.hash(password,10)

        const existingUser = await getUserByEmail(email);


        if (existingUser) {
            // console.log(existingUser)
            return NextResponse.json({message:"Email already in user!"},{status:201})
        }
        //add new user
        await addUser(email,name,hashedPassword)

        //TODO: send verification email

        return NextResponse.json({message:"User account created"},{status:200})
        

    } catch (error) {
        console.error("Error [USER_CREATE_ACCOUNT]",error)
        return NextResponse.json({message:"User account creation Failed"},{status:400})
        
    }
}