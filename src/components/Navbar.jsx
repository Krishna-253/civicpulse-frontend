export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-[#0B0F19] border-b border-gray-800">
      <h1 className="text-xl font-semibold tracking-wide">
        Civic<span className="text-blue-500">Pulse</span>
      </h1>

      <div className="space-x-6 text-sm text-gray-400">
        <span className="hover:text-white cursor-pointer">Dashboard</span>
        <span className="hover:text-white cursor-pointer">Insights</span>
        <span className="hover:text-white cursor-pointer">Reports</span>
      </div>
    </nav>
  );
}
