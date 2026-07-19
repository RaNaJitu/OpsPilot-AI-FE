import IncidentCard from "./IncidentCard";

/** History list reuses the rich incident card without destructive actions. */
export default function HistoryIncidentRow({ incident }) {
  return <IncidentCard incident={incident} showDelete={false} />;
}
