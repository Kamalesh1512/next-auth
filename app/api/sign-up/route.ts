
import { SignUpSchema } from "@/schemas"
import { NextResponse } from "next/server"

// create account
export async function POST(req:Request){

    try {
        const {values} = await req.json()

        const validatedFields = SignUpSchema.safeParse(values);

        if (!validatedFields.success) {
            return NextResponse.json({message:"Invalid details"},{status:401})
        }
        console.log(validatedFields)

        return NextResponse.json({message:"Email Sent!"},{status:200})
        

    } catch (error) {
        console.error("Error [USER_CREATE_ACCOUNT]",error)
        return NextResponse.json({message:"User account creation Failed"},{status:400})
        
    }
}