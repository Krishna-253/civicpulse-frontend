import Navbar from "../components/Navbar";

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#0B0F19] text-gray-100">
      <Navbar />
      <main className="px-8 py-6">{children}</main>
    </div>
  );
}
