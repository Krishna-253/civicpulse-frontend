export default function StatCard({ title, value, subtitle }) {
  return (
    <div className="bg-[#111827] rounded-xl p-6 border border-gray-800">
      <p className="text-gray-400 text-sm">{title}</p>
      <h2 className="text-3xl font-semibold mt-2">{value}</h2>
      <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
    </div>
  );
}
