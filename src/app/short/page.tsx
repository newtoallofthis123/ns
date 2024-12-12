"use client"

import NavBar from "@/components/custom/nav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { addUrl } from "../actions";

export default function Short() {
    const formSchema = z.object({
        url: z.string().nonempty().url({ message: "Invalid URL" }),
        hash: z.string().min(3, { message: "Minimum 3 characters" }).max(24, { message: "Maximum of 24 characters" }).optional()
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            url: "",
            hash: ""
        }
    })

    const [result, setResult] = useState<string>("");

    function generateHash() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let hash = '';
        for (let i = 0; i < 8; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            hash += characters[randomIndex];
        }
        return hash;
    }

    async function onSubmit(data: z.infer<typeof formSchema>) {
        let hash = data.hash as string;
        if (data.hash === "") {
            hash = generateHash();
        }
        if (!data.hash || !data.url) {
            setResult("Please fill in all fields");
        }
        const res = await addUrl(data.url, hash);
        if (res) {
            setResult(`https://u.noobscience.in/${hash}`);
        } else {
            setResult("An error occurred" + res);
        }
    }

    return (
        <div>
            <NavBar title="NoobShort" options={["Home", "Paste", "Github"]} />
            <div className={"flex flex-row justify-center items-center ${}"}>
                <Card className="md:w-3/5 w-full md:mx-0 mx-5 md:my-10 border-2 border-gray-800">
                    <CardHeader>
                        <CardTitle className="text-3xl">NoobShort</CardTitle>
                        <CardDescription className="text-xl pt-2">The Premium Shortener</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
                                <FormField control={form.control} name="url" render={({ field }) => (
                                    <FormItem>
                                        <FormControl >
                                            <Input placeholder="URL" {...field} />
                                        </FormControl>
                                        <FormDescription className="text-red-500">
                                            {form.formState.errors.url?.message}
                                        </FormDescription>
                                    </FormItem>
                                )} />
                                <FormField control={form.control} name="hash" render={({ field }) => (
                                    <FormItem>
                                        <FormControl >
                                            <Input placeholder="Slug" {...field} />
                                        </FormControl>
                                        <FormDescription className="text-red-500">
                                            {form.formState.errors.hash?.message}
                                        </FormDescription>
                                    </FormItem>
                                )} />
                                <Button type="submit">Shorten</Button>
                            </form>
                        </Form>
                    </CardContent>
                    <CardFooter>
                        <p id="result">
                            {result && <a href={result}>{result}</a>}
                            {!result && "Your shortened URL will appear here"}
                        </p>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}
