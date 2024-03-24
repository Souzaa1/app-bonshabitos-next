import ArrowIcon from "@/components/Arrow_Icon";
import Calendar from "@/components/Calendar";
import { kv } from "@vercel/kv";
import Link from "next/link";


export default async function Habit({ params: { habit } }: { params: { habit: string } }) {

    const decodedHabit = decodeURIComponent(habit);
    const habitStreak: Record<string, boolean> | null= await kv.hget("habits", decodedHabit);

    return (
        <main className="container relative flex flex-col gap-8 px-12 pt-16">
            <h1 className="text-2xl font-bold text-center text-white font-display">
                {decodedHabit}
            </h1>

            <Link href="/" className="flex items-center font-sans text-xs text-neutral-300 gap-2">
                <ArrowIcon className="" width={20} height={20} /> Voltar
            </Link>
            <Calendar habit={decodedHabit} habitStreak={habitStreak} />
        </main>
    )
}