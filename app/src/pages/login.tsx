import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

export default function Login() {
    return (
        <div className="min-h-screen flex flex-col bg-white">
            <header className="w-full flex justify-center py-20 ">
                <img
                    src="johnson-johnson-logo-png_seeklogo-500414-removebg-preview.png"
                    alt="logo header"
                    className="h-40 object-contain"
                />
            </header>
            <main className="flex flex-col items-center flex-1 -mt-20">
                <div className="p-6 w-full max-w-md">
                    <h2 className="text-center text-gray-900 font-semibold text-3xl">
                        Bem vindo!
                    </h2>
                    <h3 className="text-center text-gray-700 font-medium text-xl mb-10 ">Preencha seus dados para continuar</h3>

                    <div className="mb-10">
                        <div className="text-2xl mb-3 font-medium">Usuário</div>
                        <Input
                            placeholder="Insira seu usuário"
                            className="border-gray-500/50 h-[3.5rem]"
                        />
                    </div>

                    <div className="mb-10">
                        <div className="text-2xl mb-3 font-medium">Senha</div>
                        <Input
                            placeholder="Insira sua senha"
                            className="border-gray-500/50 h-[3.5rem]"
                        />
                    </div>

                    <Button className="bg-red-700 w-full h-[3.5rem] text-white text-2xl">
                        Entrar
                    </Button>
                </div>
            </main>
            <footer className="bg-red-700 w-full h-[5rem] mt-auto flex justify-center items-center">
                <div className="flex justify-center items-center gap-2 mt-6">
                    <h2 className="text-white text-center text-sm mb-5">Versão 12.12.2025</h2>
                </div>
            </footer>

        </div>
    );
}
