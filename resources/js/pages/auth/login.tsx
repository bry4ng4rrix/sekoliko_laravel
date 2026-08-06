import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import type { FormEventHandler } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { login, register } from '@/routes';

export default function Login() {
    const { registrationEnabled } = usePage().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(login.url(), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Connexion" />
            <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
                <Card className="w-full max-w-sm">
                    <CardHeader>
                        <CardTitle>Sekoliko</CardTitle>
                        <CardDescription>Accédez à votre espace de gestion scolaire.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    autoFocus
                                    autoComplete="username"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                />
                                {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Mot de passe</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    autoComplete="current-password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                                {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
                            </div>
                            <Button type="submit" className="w-full" disabled={processing}>
                                {processing && <LoaderCircle className="size-4 animate-spin" />}
                                Se connecter
                            </Button>
                        </form>
                        {registrationEnabled && (
                            <p className="mt-4 text-center text-sm text-muted-foreground">
                                Pas de compte ?{' '}
                                <Link href={register.url()} className="underline underline-offset-4">
                                    Créer un compte
                                </Link>
                            </p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
