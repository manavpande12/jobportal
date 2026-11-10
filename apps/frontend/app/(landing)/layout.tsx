import Footer from "@/common/components/footer";
import NavBar from "@/common/components/navbar";

export default function LandingLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <NavBar />
      <main className="mt-21">{children}</main>
      <Footer />
    </>
  );
}
