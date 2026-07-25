import Footer from "@/common/components/footer";
import NavBar from "@/common/components/navbar";

export default function JobsLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <>
            <NavBar />
            <main className="mt-21 sm:mt-0">{children}</main>
            <Footer />
        </>
    );
}