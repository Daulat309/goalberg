export function computeProgress(
    actual: number,
    target: number,
    uomType: string
) {

    switch (uomType) {

        /**
         * Zero incidents KPI
         */
        case "zero_based":

            return actual === 0
                ? "completed"
                : "on_track";

        /**
         * Timeline / lower better KPI
         */
        case "timeline":

            if (actual <= 0) {
                return "not_started";
            }

            return actual <= target
                ? "completed"
                : "on_track";

        /**
         * Higher better KPIs
         */
        default:

            if (actual <= 0) {
                return "not_started";
            }

            return actual >= target
                ? "completed"
                : "on_track";
    }
}