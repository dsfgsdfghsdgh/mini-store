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
import { loginUser } from "@/store/auth/authSlice";
import toast from "react-hot-toast";

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading } = useTypedSelector((state) => state.auth);

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

    if (loginUser.fulfilled.match(response)) {
      toast.success("Login successful!");
      setTimeout(() => navigate("/"), 1500);
    } else if (loginUser.rejected.match(response)) {
      toast.error("Login failed. Please check your credentials and try again.");
    }
  }

  return (
    <Container className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl w-full bg-white shadow-xl rounded-2xl overflow-hidden">
        {/* Left Side - Illustration */}
        <div className="hidden md:flex justify-center items-center bg-gray-100 p-8">
          <img
          
            src={signupImage}
            alt="Signup Illustration"
            className="max-w-xs"
            draggable="false"
          />
        </div>

        {/* Right Side - Login Form */}
        <div className="flex flex-col justify-center items-center p-10 w-full">
          <h2 className="text-3xl font-semibold text-gray-800">Login</h2>
          <p className="text-gray-500 mb-6 text-sm">
            Welcome back! Please enter your details.
          </p>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-5"
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
                        autoComplete="email"
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
              <Button
                type="submit"
                disabled={isLoading}
                className={`w-full py-2 px-4 rounded-lg font-medium text-white transition focus:outline-none focus:ring-2 focus:ring-blue-600 
                  ${
                    isLoading
                      ? "cursor-not-allowed bg-blue-400"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
              >
                {isLoading ? "Processing..." : "Login"}
              </Button>

              {/* Redirect to Sign Up */}
              <p className="text-sm text-gray-600 text-center mt-4">
                Don't have an account?
                <a
                  href="/sign-up"
                  className="text-blue-600 hover:underline ml-1"
                >
                  Sign Up
                </a>
              </p>
            </form>
          </Form>
        </div>
      </div>
    </Container>
  );
}
