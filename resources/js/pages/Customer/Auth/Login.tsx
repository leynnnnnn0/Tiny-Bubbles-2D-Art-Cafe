import { FormEventHandler, useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Store, Mail, Lock, AlertCircle } from 'lucide-react';
import LOGO from '../../../../images/mainLogo.png';
interface LoginProps {
    business?: {
        id: number;
        name: string;
        logo?: string;
    };
    status?: string;
    isDemo: boolean
}

export default function Login({ business, status, isDemo }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: isDemo ? 'customer@gmail.com' : '',
        password: isDemo ? 'password' : '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/customer/login', {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Customer Login" />

            <div className="flex min-h-screen items-center justify-center p-4">
                <Card className="w-full max-w-md shadow-xl">
                    <CardHeader className="space-y-3">
                        <div className="mb-2 flex items-center justify-center">
                            {business?.logo ? (
                                <img
                                    src={business.logo}
                                    alt={business.name}
                                    className="h-16 w-auto"
                                />
                            ) : (
                                <a href="/">
                                    <img
                                        src={LOGO}
                                        alt="business logo"
                                        className="h-12 w-32"
                                    />
                                </a>
                            )}
                        </div>
                        <CardTitle className="text-center text-2xl font-bold">
                            Welcome Back
                        </CardTitle>
                        <CardDescription className="text-center text-base">
                            {business ? (
                                <span className="flex items-center justify-center gap-2">
                                    Logging in to{' '}
                                    <span className="font-semibold text-foreground">
                                        {business.name}
                                    </span>
                                </span>
                            ) : (
                                'Sign in to your customer account'
                            )}
                        </CardDescription>
                    </CardHeader>

                    <form onSubmit={submit}>
                        <CardContent className="space-y-4">
                            {status && (
                                <Alert>
                                    <AlertDescription>
                                        {status}
                                    </AlertDescription>
                                </Alert>
                            )}

                            {errors.email && (
                                <Alert variant="destructive">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertDescription>
                                        {errors.email}
                                    </AlertDescription>
                                </Alert>
                            )}

                            <div className="space-y-2">
                                <Label
                                    htmlFor="email"
                                    className="flex items-center gap-2"
                                >
                                    <Mail className="h-4 w-4" />
                                    Email Address
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData('email', e.target.value)
                                    }
                                    placeholder="customer@example.com"
                                    required
                                    autoFocus
                                    className="h-11"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label
                                    htmlFor="password"
                                    className="flex items-center gap-2"
                                >
                                    <Lock className="h-4 w-4" />
                                    Password
                                </Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={data.password}
                                    onChange={(e) =>
                                        setData('password', e.target.value)
                                    }
                                    placeholder="••••••••"
                                    required
                                    className="h-11"
                                />
                            </div>

                            <div className="flex items-center space-x-2">
                                <input
                                    id="remember"
                                    type="checkbox"
                                    checked={data.remember}
                                    onChange={(e) =>
                                        setData('remember', e.target.checked)
                                    }
                                    className="h-4 w-4 rounded border-gray-300 bg-white text-blue-600 focus:ring-blue-500"
                                />
                                <Label
                                    htmlFor="remember"
                                    className="cursor-pointer text-sm font-normal"
                                >
                                    Remember me
                                </Label>
                            </div>
                        </CardContent>

                        <CardFooter className="mt-5 flex flex-col space-y-4">
                            <Button
                                type="submit"
                                className="h-11 w-full bg-accent text-base hover:bg-accent/70"
                                disabled={processing}
                            >
                                {processing ? 'Signing in...' : 'Sign In'}
                            </Button>

                            <span className="text-xs text-black">
                                Don't have an acccount?{' '}
                                <a
                                    className="underline"
                                    href="/customer/register?business=rAnsAxjUmHVWbNjGkPzeT2HHW6dLL2Lr"
                                >
                                    Register Here
                                </a>
                            </span>
                            <Link
                                href="/customer/forgot-password"
                                className="text-sm text-primary hover:underline"
                            >
                                Forgot your password?
                            </Link>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </>
    );
}