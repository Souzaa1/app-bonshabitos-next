"use client"

import  { deleteHabit }  from "@/app/actions";
import Image from "next/image";


export default function DeleteButton({
    habit
}: {
    habit: string
}) {
    return (
        <button
            onClick={() => deleteHabit(habit)}>
            <Image
                src="/images/trash.svg"
                width={20}
                height={20}
                alt="icon of trash red" />
        </button>
    )
}