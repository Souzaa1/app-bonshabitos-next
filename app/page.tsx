import DayStates from "../components/Date_State";
import DeleteButton from "@/components/Delete_Button";
import Link from "next/link";
import { kv } from "@vercel/kv";
import { deleteHabit } from "@/app/actions";

export type Habits = {
  [habit: string]: Record<string, boolean>;
} | null;

export default async function Home() {

  const habits: Habits = await kv.hgetall("habits");

  const today = new Date();
  const todayWeekDay = today.getDay();
  const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];

  const sortedWeekDays = weekDays.slice(todayWeekDay + 1).concat(weekDays.slice(0, todayWeekDay + 1));

  const lastSevenDays = weekDays.map((_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - index);

    return date.toISOString().slice(0, 10);
  }).reverse();


  return (

    <main className="container relative flex flex-col gap-10 px-4 pt-16">
      {habits === null ||
        (Object.keys(habits).length === 0 && (
          <h1 className="mt-20 text-4xl font-light text-white font-display text-center">
            Você não tem nenhum hábito cadastrado ainda.
            Adicione um hábito.
          </h1>
        ))}
      {
        habits !== null &&
        Object.entries(habits).map(([habit, habitStreak]) => (
          <div key={habit} className="flex flex-col gap-2">
            <div className="flex justify-between items-center">

              <span className="text-xl text-white font-bold font-sans">
                {habit}
              </span>

              <DeleteButton
                habit={habit}
              />

            </div>

            <Link href={`habito/${habit}`}>
              <section className="grid grid-cols-7 bg-neutral-700 rounded-md p-2">
                {sortedWeekDays.map((day, index) => (
                  <div key={day} className="flex flex-col last:font-bold">
                    <span className="font-sans text-sx text-white text-center">
                      {day}
                    </span>
                    <DayStates day={habitStreak[lastSevenDays[index]]} />

                  </div>

                ))}
              </section>
            </Link>
          </div>
        ))}
      <Link href="novo-habito"
        className="fixed text-center bottom-10 w-2/3 left-1/2 -translate-x-1/2 text-neutral-900 bg-[#45edad] font-display font-regular text-2xl p-2 rounded-md">
        Novo Hábito
      </Link>
    </main>
  );
}
