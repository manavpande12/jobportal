import Footer from "@/common/components/footer";
import NavBar from "@/common/components/navbar";

export default function PublicLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <NavBar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
