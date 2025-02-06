"use client"

import React, { useState } from "react";
import { CardWrapper } from "./card-wrapper";
import { useForm } from "react-hook-form";
import { LoginSchema } from "@/schemas";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "../form-error";
import { FormSucess } from "../form-sucess";
import axios from "axios";

export const LoginForm = () => {

  const [isLoading,setIsLoading] = useState(false);
  const [error,setError] = useState("");
  const [success,setSuccess] = useState("");



  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver:zodResolver(LoginSchema),
    defaultValues:{
      email:"",
      password:""
    }
  })

  const onSubmit = async (values : z.infer<typeof LoginSchema>)=>{

    try {
      setError("")
      setSuccess("")
      setIsLoading(true)
      const response = await axios.post('/api/login',{
        values
      });
  
      if (response.status === 200) {
        console.log("Login sucessful")
        setSuccess(response.data.message)
      }else{
        console.log("Login Failed")
        setError(response.data.message)
      }
      
    } catch (error) {
      console.log("Login Failed [Client]",error)
      console.log("Login Failed")
    }
    finally{
      setIsLoading(false)
    }

  }

  return (
    <CardWrapper
      headerLabel="Welcome Back!"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/signup"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6">
            <div className="space-y-4">
              <FormField 
              control={form.control}
              name="email"
              render={({field}) =>(
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input 
                    {...field}
                    disabled={isLoading}
                    placeholder="john.doe@example.com"
                    type="email"/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}/>
                            <FormField 
              control={form.control}
              name="password"
              render={({field}) =>(
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input 
                    {...field}
                    disabled={isLoading}
                    placeholder="********"
                    type="password"/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}/>
            </div>
            <FormError message={error}/>
            <FormSucess message={success}/>

            <Button
            disabled={isLoading}
            type="submit"
            className="w-full">
              Login
            </Button>

        </form>
      </Form>
    </CardWrapper>
  );
};
