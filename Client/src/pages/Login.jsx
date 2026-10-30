import React, { useState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
const Login = () => {
  const [loginINput, setLoginInput] = useState({ email: "", password: "" });
  const [signupINput, setSignupInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  const changeInput = (e, type) => {
    const { name, value } = e.target;
    if (type === "signup") {
      setSignupInput({ ...signupINput, [name]: value });
    } else {
      setLoginInput({ ...loginINput, [name]: value });
    }
  };
  const handleRegistration = (type) => {
    if (type === "signup") console.log(signupINput);
    else console.log(loginINput);
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted">
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Signup</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>login</CardTitle>
              <CardDescription>Login to your existing account</CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      value={loginINput.email}
                      placeholder="m@example.com"
                      onChange={(e) => changeInput(e, "login")}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                      <a
                        href="#"
                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                      >
                        Forgot your password?
                        
                      </a>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      onChange={(e) => changeInput(e, "login")}
                      name="password"
                      value={loginINput.password}
                      required
                    />
                    <Button
                      className="w-full"
                      onClick={() => handleRegistration("login")}
                    >
                      Login
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Create an account</CardTitle>
              <CardDescription>
                Enter your details to create your account.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form>
                <div className="flex flex-col gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Ex: Harish"
                      name="name"
                      value={signupINput.name}
                      onChange={(e) => changeInput(e, "signup")}
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="m@example.com"
                      name="email"
                      value={signupINput.email}
                      onChange={(e) => changeInput(e, "signup")}
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      name="password"
                      value={signupINput.password}
                      onChange={(e) => changeInput(e, "signup")}
                      placeholder="Create a password"
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="Confirm your password"
                      required
                    />
                  </div>

                  <Button
                    className="w-full"
                    onClick={() => handleRegistration("signup")}
                  >
                    Create Account
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Login;
