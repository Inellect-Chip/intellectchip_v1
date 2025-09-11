import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center lg:flex-row">
            <Image 
                src={'/not_found.png'}
                width={1200}
                height={1200}
                alt="404 Not Found"
                className="w-[300px] h-auto object-contain mt-10"
            />
            <div className="flex flex-col items-center justify-center text-center p-6">
                <h1 className="text-5xl font-bold text-destructive mb-4">404</h1>
                <p className="text-xl mb-6 text-foreground">
                    Oops! The page you're looking for doesn't exist.
                </p>
                <Link href="/">
                    <span className="text-primary font-medium underline hover:opacity-80">
                        Go back to Home
                    </span>
                </Link>
            </div>
        </div>
    );
}
