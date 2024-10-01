import { Link } from "react-router-dom"

const Logo = () => {
    return (

        <div className="flex items-center justify-center space-x-3">
            <Link href="/" className="h-10">
                <img src="/logo.svg" alt="logo" className="w-[35px]" />
            </Link>
            <span
                className="font-poppins font-bold text-[36px] leading-[120%] text-transparent bg-clip-text"
                style={{ backgroundImage: "var(--gradient)" }}
            >
                Pair Connect
            </span>
        </div>

    )
}
export default Logo