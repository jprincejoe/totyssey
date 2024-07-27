import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";

type Props = {
  heroVisibility?: boolean;
  children: React.ReactNode;
};

const Layout = ({ heroVisibility = false, children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {heroVisibility && <Hero />}
      <div className="container mx-auto flex-1 py-10">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
