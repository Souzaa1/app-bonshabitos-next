"use client";

import { useEffect, useState } from "react";
import ArrowIcon from "./Arrow_Icon";
import DayStates from "./Date_State";
import { toggleHabit } from "@/app/actions";

function getDaysInMonth(month: number, year: number) {

    const date = new Date(year, month, 1);
    const fisrtDayWeekDay = date.getDay();
    const numberOfEmptyDays = Array(fisrtDayWeekDay).fill(null);
    const days = [...numberOfEmptyDays];
    while (date.getMonth() === month) {
        days.push(new Date(date));
        date.setDate(date.getDate() + 1);
    }

    return days;
}

const currentDate = new Date();
const currentMonth = currentDate.getMonth();
const currentYear = currentDate.getFullYear();


const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];


export default function Calendar({
    habit,
    habitStreak
}: {
    habit: string;
    habitStreak: Record<string, boolean> | null
}) {

    const [month, setMonth] = useState(currentMonth);
    const [year, setYear] = useState(currentYear);
    const [daysInMonth, setDaysInMonth] = useState(getDaysInMonth(currentMonth, currentYear));
    const [selectedDate, setSelectedDate] = useState(new Date());


    useEffect(() => {
        setDaysInMonth(getDaysInMonth(month, year));
        setSelectedDate(new Date(year, month, 1))
    }, [month, year]);


    function prevMonth() {
        if (month === 0) {
            setYear(year - 1);
            setMonth(11);
        } else {
            setMonth(month - 1);
        }
    }

    function nextMonth() {
        if (month === 11) {
            setYear(year + 1);
            setMonth(0);
        } else {
            setMonth(month + 1);
        }
    }

    function getFullDateString() {
        const monthName = selectedDate.toLocaleString('pt-BR', { month: 'long' });
        const upperCaseMonthName = monthName.charAt(0).toUpperCase() + monthName.slice(1);
        return `${upperCaseMonthName} de ${selectedDate.getFullYear()}`;
    }

    function getDayString(day: Date) {
        return `${year.toString()}-${(month + 1).toString().padStart(2, "0")}-${day.getDate().toString().padStart(2, "0")}`
    }

    return (
        <section className="w-full my-2 rounded-md bg-neutral-700">
            <div className="flex justify-between mx-2 my-4 font-sans text-neutral-400">
                <button onClick={prevMonth}>
                    <ArrowIcon width={20} height={20} />
                </button>

                <span className="text-white font-light font-display"> {getFullDateString()} </span>

                <button onClick={nextMonth}>
                    <ArrowIcon className="rotate-180" width={20} height={20} />
                </button>
            </div>
            <div className="grid w-full grid-cols-7 mt-2">
                {weekDays.map((day) => (
                    <div key={day} className="flex felx-col justify-center items-center p-2">
                        <span className="font-sans text-xs font-light text-neutral-200">
                            {day}
                        </span>
                    </div>
                ))}
                {daysInMonth.map((day, index) => (
                    <div key={index} className="flex flex-col items-center p-2" onClick={() => toggleHabit({
                        habit, 
                        habitStreak,
                        date: getDayString(day),
                        done: habitStreak ? habitStreak[getDayString(day)] : true
                    })}>
                        <span className="font-sans text-xs font-light text-neutral-200">
                            {day?.getDate()}
                        </span>
                        {day && (
                            <DayStates day={habitStreak ? habitStreak[getDayString(day)] : undefined}
                            />
                        )}
                    </div>
                ))}
            </div>
        </section>
    )
}