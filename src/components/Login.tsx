'use client'
import React, { useState } from 'react';
import Link from "next/link";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';

const Login: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState('null');
    const [pending, setPending] = useState(false);
    console.log(pending)
    const { status } = useSession();
    console.log(status)
    const router = useRouter();
    const formSubmitted = async (event: any) => {
        event.preventDefault();
        setPending(true);

        try {
            event.preventDefault()
            const res = await signIn('credentials', {
                redirect: false,
                email,
                password,
            });
            console.log(res, 'fffffffffffffffffffffff')
            if (res?.error) {
                console.log('res error :::: ', res)
                setErrorMessage(res.error);
                setPending(false);
            } else {
                setPending(false);
                // Handle successful login here (e.g., redirect or store user data)
                router.push("/dashboard");

            }
        } catch (error) {
            console.error("Login error:", error);
            setErrorMessage("An error occurred during login");
            setPending(false);
        }
    };


    return (
        <div className="w-full lg:grid lg:min-h-[100vh] lg:grid-cols-2 xl:min-h-[100vh]">
            <div className="flex items-center justify-center py-12 bg-secondary-600">
                <div className="mx-auto grid max-w-6xl gap-12">
                    <div className="grid gap-2 text-center">
                        <h1 className="text-3xl font-bold">Inatale Admin Login</h1>
                        <p className="text-balance text-muted-foreground">
                            Enter your official username below to login to your account
                        </p>
                    </div>
                    <form onSubmit={formSubmitted} className="grid gap-4">
                        <div className="grid gap-2">
                            <label htmlFor="email">Email</label>
                            <input
                                id="email"
                                type="email"
                                placeholder="email"
                                required
                                className="bg-secondary-100 border-secondary-900"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <label htmlFor="password">Password</label>
                            </div>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                required
                                className="bg-secondary-100 border-secondary-900"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <LoginButton />
                        <div
                            className="flex h-8 items-end space-x-1"
                            aria-live="polite"
                            aria-atomic="true"
                        >
                            {errorMessage && (
                                <>
                                    <p className="text-sm text-red-500">{errorMessage}</p>
                                </>
                            )}
                        </div>
                    </form>
                    <div className="mt-4 text-center text-sm">
                        Forgot Password?{" "}
                        <Link href="#" className="underline">
                            Contact Admin
                        </Link>
                    </div>
                </div>
            </div>
            <div
                className=" bg-primary-600 flex flex-1 items-center justify-center"
            >
                <div className="flex flex-col items-center text-center">
                    <Link href="#" className="mt-4 text-muted-foreground underline">
                        Go to Website
                    </Link>
                </div>
            </div>
        </div>
    );
}

function LoginButton() {
    return (
        <button className="mt-4 w-full bg-primary-600 text-secondary-50" >
            Log in
        </button>
    );
}

export default Login;