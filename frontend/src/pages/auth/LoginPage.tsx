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
import { useNavigate } from "react-router-dom";
import { loginSchema } from "@/common/schemas/auth";
import Container from "@/components/app-ui/Container";
import { signupImage } from "@/assets";
import { useAppDispatch, useTypedSelector } from "@/store/store";
import { loginUser, registerUser } from "@/store/auth/authSlice";

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLoading = useTypedSelector(state => state.auth.isLoading)
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    const response = await dispatch(
      loginUser({
        email: values.email,
        password: values.password,
      })
    );
    if (registerUser.fulfilled.match(response)) {
      navigate("/");
    } else if (registerUser.rejected.match(response)) {
      alert("Failed to register. Please try again later.");
    }
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
            <h2 className="text-3xl font-semibold text-gray-800">Login</h2>
            <p className="text-gray-500 mb-4 text-sm">
              Join us and get started!
            </p>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className=" w-full space-y-4 "
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
                          autoComplete="Email"
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
                          autoComplete="current-password"
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

                {/* Submit Button */}
                <div>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-2 px-4 rounded-lg font-medium text-white focus:outline-none focus:ring-2 focus:ring-gray-600 transition ${
                      isLoading ? "cursor-not-allowed bg-blue-400" : ""
                    }`}
                  >
                    {isLoading ? "Processing..." : "Login"}
                  </Button>
                </div>

                {/* Already have an account? */}
                <p className="text-sm text-gray-600 text-center mt-2">
                  Don't have account ?{" "}
                  <a href="/sign-up" className="text-blue-600 hover:underline">
                    Sign Up
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
