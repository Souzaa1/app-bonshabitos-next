import Image from "next/image";
import DayStates from "../.next/components/Date_State";
import Link from "next/link";

export default function Home() {

  const habits = {
    "Beber agua": {
      "2023-07-18": true,
      "2023-07-19": false,
      "2023-07-20": true,
    },
    "Correr": {
      "2023-07-18": false,
      "2023-07-19": true,
      "2023-07-20": true,
    },
    "Ler": {
      "2023-07-18": false,
      "2023-07-19": true,
      "2023-07-20": true,
    },
  };

  const today = new Date();
  const todayWeekDay = today.getDay();
  const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];

  const sortedWeekDays = weekDays.slice(todayWeekDay + 1).concat(weekDays.slice(0, todayWeekDay + 1));


  return (
    <main className="container relative flex flex-col gap-10 px-4 pt-16">
      {habits === null || Object.keys(habits).length === 0 && (
        <h1 className="mt-20 text-4xl font-light text-black font-display text-center">
          Você não tem nenhum hábito cadastrado ainda.
          Adicione um hábito.
        </h1>
      )}
      {
        habits !== null &&
        Object.entries(habits).map(([habit, habitsStreak]) => (
          <div key={habit} className="flex flex-col gap-2">
            <div className="flex justify-between items-center">

              <span className="text-xl text-white font-bold font-sans">
                {habit}
              </span>
              <button>
                <Image src="/images/trash.svg" width={20} height={20} alt="icon of trash red" />
              </button>

            </div>
            <section className="grid grid-cols-7 bg-neutral-500 rounded-md p-2">
              {sortedWeekDays.map((day) => (
                <div key={day} className="flex flex-col last:font-bold">
                  <span className="font-sans text-sx text-white text-center">
                    {day}
                  </span>
                  <DayStates day={undefined} />
                </div>
              ))}
              <Link href="novo-habito" className="fixed text-center bottom-10 w-2/3 left-1/2 -translate-x-1/2 text-neutral-900 bg-[#45edad] font-display font-regular text-2xl p-2 rounded-md">Novo Habito</Link>
            </section>
          </div>
        )
        )}
    </main>
  );
}
