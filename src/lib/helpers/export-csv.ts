import Papa from "papaparse";

export function exportGoalsCSV(
  goals: any[]
) {
  const csv =
    Papa.unparse(goals);

  const blob = new Blob([csv], {
    type: "text/csv",
  });

  const url =
    window.URL.createObjectURL(blob);

  const a =
    document.createElement("a");

  a.href = url;

  a.download = "goalberg-report.csv";

  a.click();
}