/* eslint-disable @typescript-eslint/no-unused-vars */
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUpSchema } from "@/common/schemas/signup";
import API from "@/config/apiConfig";
import Container from "@/components/app-ui/Container";
import { signupImage } from "@/assets";

export default function SignupPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      avatar: null,
    },
  });

  async function onSubmit(values: z.infer<typeof signUpSchema>) {
    setLoading(true);
    const formData = new FormData();

    formData.append("email", values.email);
    formData.append("password", values.password);
    if (values.avatar) formData.append("avatar", values.avatar);

    console.log(formData);
  }

  return (
    <Container className="flex justify-center">
      <div className="">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl w-full bg-white shadow-lg rounded-2xl overflow-hidden">
          {/* Left Side - Illustration */}
          <div className="hidden md:flex justify-center items-center bg-gray-100 p-8">
            <img
              src={signupImage}
              alt="Signup Illustration"
              className="max-w-xs"
              draggable="false"
            />
          </div>

          {/* Right Side - Sign Up Form */}
          <div className="flex flex-col justify-center items-center p-8">
            <h2 className="text-3xl font-semibold text-gray-800">Sign Up</h2>
            <p className="text-gray-500 mb-4 text-sm">
              Join us and get started!
            </p>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-4"
              >
                {/* Email Input */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          placeholder="Enter your email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password Input */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">
                        Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          placeholder="Enter your password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Avatar Upload */}
                <FormField
                  control={form.control}
                  name="avatar"
                  render={({ field: { value, onChange, ...fieldProps } }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">
                        Profile Picture
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...fieldProps}
                          type="file"
                          className="w-full px-4  border rounded-lg file:border-none focus:ring-2 focus:ring-neutral-500 focus:outline-none file:text-black"
                          accept="image/*"
                          onChange={(event) =>
                            onChange(
                              event.target.files ? event.target.files[0] : null
                            )
                          }
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <div>
                  <Button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-2 px-4 rounded-lg font-medium text-white focus:outline-none focus:ring-2 focus:ring-gray-600 transition ${
                      loading ? "cursor-not-allowed bg-blue-400" : ""
                    }`}
                  >
                    {loading ? "Processing..." : "Sign Up"}
                  </Button>
                </div>

                {/* Already have an account? */}
                <p className="text-sm text-gray-600 text-center mt-2">
                  Already have an account?{" "}
                  <a href="/login" className="text-blue-600 hover:underline">
                    Login
                  </a>
                </p>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </Container>
  );
}
