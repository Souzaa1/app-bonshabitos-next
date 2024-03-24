import Image from "next/image";

export default function DayStates({ 
    day 
}: { day: boolean | undefined }) {

    let image: [string, string, number?] = ["/images/circle.svg", "Circle mark", 24];
    
    if (day === true) {
        image = ["/images/check.svg", "Check mark", 24];
    }
    if (day === false) {
        image = ["/images/xmark.svg", "X mark", 24];
    }

    const [src, alt, size] = image

    return (
        <div className="flex items-center justify-center h-9">

            <Image
                src={src}
                width={size}
                height={size}
                alt={alt}
            />

        </div>
    );
}