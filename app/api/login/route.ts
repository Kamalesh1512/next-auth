
import { LoginSchema } from "@/schemas"
import { NextResponse } from "next/server"


export async function POST(req:Request){

    try {
        const {values} = await req.json()

        const validatedFields = LoginSchema.safeParse(values);

        if (!validatedFields.success) {
            return NextResponse.json({message:"Invalid Login details"},{status:401})
        }
        // console.log(validatedFields)

        return NextResponse.json({message:"Email Sent!"},{status:200})
        

    } catch (error) {
        console.error("Error [USER_LOGIN]",error)
        return NextResponse.json({message:"User Login Failed"},{status:400})
        
    }
}