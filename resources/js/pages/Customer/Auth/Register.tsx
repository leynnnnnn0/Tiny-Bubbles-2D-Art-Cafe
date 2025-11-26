import { FormEventHandler } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Store, Mail, Lock, User, AlertCircle, Building2 } from 'lucide-react';
import { toast } from 'sonner';
import LOGO from '../../../../images/mainLogo.png';

interface Business {
    id: number;
    name: string;
    logo?: string;
}

interface RegisterProps {
    businesses: Business[];
    selectedBusiness?: Business;
}

export default function Register({ businesses, selectedBusiness }: RegisterProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        business_id: selectedBusiness?.id?.toString() || '',
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/customer/register', {
            onSuccess: () => {
                toast.success('Registration successful! You can now start earning stamps.');
                reset('password', 'password_confirmation');
            },
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };


    return (
        <>
            <Head title="Customer Registration" />
            
            <div className="min-h-screen flex items-center justify-center p-4">
                <Card className="w-full max-w-md shadow-xl">
                    <CardHeader className="space-y-3">
                        <div className="flex items-center justify-center mb-2">
                            {selectedBusiness?.logo ? (
                                <img 
                                    src={selectedBusiness.logo} 
                                    alt={selectedBusiness.name}
                                    className="h-16 w-auto"
                                />
                            ) : (
                               <img src={LOGO} alt="business logo" className='w-32 h-12'/>
                            )}
                        </div>
                        <CardTitle className="text-2xl font-bold text-center">
                            Create Account
                        </CardTitle>
                        <CardDescription className="text-center text-base">
                            {selectedBusiness ? (
                                <span className="flex items-center justify-center gap-2">
                                    Registering for <span className="font-semibold text-foreground">{selectedBusiness.name}</span>
                                </span>
                            ) : (
                                'Sign up to get started'
                            )}
                        </CardDescription>
                    </CardHeader>

                    <form onSubmit={submit}>
                        <CardContent className="space-y-4">
                            {Object.keys(errors).length > 0 && (
                                <Alert variant="destructive">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertDescription>
                                        Please check the form for errors
                                    </AlertDescription>
                                </Alert>
                            )}


                            <div className="space-y-2">
                                <Label htmlFor="username" className="flex items-center gap-2">
                                    <User className="h-4 w-4" />
                                    Username
                                </Label>
                                <Input
                                    id="username"
                                    type="text"
                                    value={data.username}
                                    onChange={(e) => setData('username', e.target.value)}
                                    placeholder="johndoe"
                                    required
                                    autoFocus
                                    className="h-11"
                                />
                                {errors.username && (
                                    <p className="text-sm text-destructive">{errors.username}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email" className="flex items-center gap-2">
                                    <Mail className="h-4 w-4" />
                                    Email Address
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="customer@example.com"
                                    required
                                    className="h-11"
                                />
                                {errors.email && (
                                    <p className="text-sm text-destructive">{errors.email}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password" className="flex items-center gap-2">
                                    <Lock className="h-4 w-4" />
                                    Password
                                </Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    className="h-11"
                                />
                                {errors.password && (
                                    <p className="text-sm text-destructive">{errors.password}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password_confirmation" className="flex items-center gap-2">
                                    <Lock className="h-4 w-4" />
                                    Confirm Password
                                </Label>
                                <Input
                                    id="password_confirmation"
                                    type="password"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    className="h-11"
                                />
                            </div>
                        </CardContent>

                        <CardFooter className="flex flex-col space-y-4 mt-5">
                            <Button 
                                type="submit" 
                                className="w-full h-11 text-base"
                                disabled={processing}
                            >
                                {processing ? 'Creating account...' : 'Create Account'}
                            </Button>

                            <div className="text-center text-sm text-muted-foreground">
                                Already have an account?{' '}
                                <Link
                                    href={'/customer/login'}
                                    className="font-semibold text-primary hover:underline hover:text-accent/70"
                                >
                                    Sign in
                                </Link>
                            </div>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </>
    );
}