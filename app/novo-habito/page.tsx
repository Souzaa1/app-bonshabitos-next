import { kv } from "@vercel/kv";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default function NovoHabito() {

    async function newHabit(formData: FormData) {
        "use server"
        const habit = formData.get("habit");
        await kv.hset("habits", { [ habit as string ]: {} });
        
        revalidatePath("/");
        redirect("/");
    };


    return (

        <main className="container relative flex flex-col gap-10 px-4 pt-16">
            <h1 className="text-4xl font-bold text-white font-display text-center mt-20">
                Novo Hábito
            </h1>
            <form action={newHabit} className="flex flex-col gap-4 mt-4">
                <span className="text-lg text-white font-sans">Nome do hábito</span>
                <input
                    type="text"
                    name="habit"
                    id="habit"
                    className="bg-neutral-500 rounded-md p-2 text-white text-lg font-sans"
                />

                <button
                    type="submit"
                    className="bg-[#45edad] font-display text-white font-regular text-2xl p-2 rounded-md mt-8"
                >
                    Adicionar
                </button>
                <button
                    className="bg-[#ed4569] font-display text-white font-regular text-2xl p-2 rounded-md mt-8">
                    Cancelar
                </button>
            </form>
        </main>
    );
}