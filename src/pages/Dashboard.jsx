import StatCard from "../components/StatCard";

export default function Dashboard() {
  return (
    <>
      <h1 className="text-2xl font-semibold mb-6">AI Civic Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Public Sentiment"
          value="72%"
          subtitle="Positive this week"
        />
        <StatCard
          title="Active Complaints"
          value="1,248"
          subtitle="Across all regions"
        />
        <StatCard
          title="AI Alerts"
          value="14"
          subtitle="High priority issues"
        />
      </div>
    </>
  );
}
