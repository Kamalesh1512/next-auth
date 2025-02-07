import { db } from "@/db/index";
import { users } from "./schema";
import { eq } from "drizzle-orm";



//add new user
export async function addUser(email: string, name: string , password :string) {
  try {
    await db.insert(users).values({
      email: email,
      name: name,
      password:password,
    });
  } catch (error) {
    console.error("Database query error at [USER_TABLE]:", error);
    throw new Error("Failed to add new User");
  }
}

//get existing user by Email
export async function getUserByEmail(email: string) {
  try {
    const user = await db.select()
                         .from(users)
                         .where(eq(users.email,email))
    return user[0]

  } catch (error) {
    console.error("Database query error at [USER_TABLE]:", error);
    throw new Error("Failed to add new User");
  }
}

//get existing user by Email
export async function getUserById(id: string) {
  try {
    const user = await db.select()
                         .from(users)
                         .where(eq(users.id,id))
    return user[0]

  } catch (error) {
    console.error("Database query error at [USER_TABLE]:", error);
    throw new Error("Failed to add new User");
  }
}
