function round(value: number) {
  return Math.round(value * 100) / 100;
}

export function generateQuarterlyPlans(
  targetValue: number,
  uomType: string
) {

  switch (uomType) {

    case "percentage":

    case "numeric":

      return [
        {
          quarter: "Q1",
          planned_value: round(
            targetValue * 0.25
          ),
        },

        {
          quarter: "Q2",
          planned_value: round(
            targetValue * 0.5
          ),
        },

        {
          quarter: "Q3",
          planned_value: round(
            targetValue * 0.75
          ),
        },

        {
          quarter: "Q4",
          planned_value: round(
            targetValue
          ),
        },
      ];

    case "timeline":

      return [
        {
          quarter: "Q1",
          planned_value: targetValue,
        },

        {
          quarter: "Q2",
          planned_value: targetValue,
        },

        {
          quarter: "Q3",
          planned_value: targetValue,
        },

        {
          quarter: "Q4",
          planned_value: targetValue,
        },
      ];

    case "zero_based":

      return [
        {
          quarter: "Q1",
          planned_value: 0,
        },

        {
          quarter: "Q2",
          planned_value: 0,
        },

        {
          quarter: "Q3",
          planned_value: 1,
        },

        {
          quarter: "Q4",
          planned_value: 1,
        },
      ];

    default:

      return [];
  }
}