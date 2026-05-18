export function computeKPIScore(
    actual: number,
    target: number,
    uomType: string
) {

    if (!target && uomType !== "zero_based") {
        return 0;
    }

    let score = 0;

    switch (uomType) {

        /**
         * Higher is better
         * Example:
         * Revenue
         * Sales
         * NPS
         */
        case "numeric":

            score =
                (actual / target) * 100;

            break;

        /**
         * Percentage KPI
         */
        case "percentage":

            score =
                (actual / target) * 100;

            break;

        /**
         * Lower is better
         * Example:
         * Resolution Time
         * Cost
         * Turnaround
         */
        case "timeline":

            score =
                (target / Math.max(actual, 1)) * 100;

            break;

        /**
         * Zero incidents = success
         */
        case "zero_based":

            score =
                actual === 0
                    ? 100
                    : 0;

            break;

        default:

            score = 0;
    }

    /**
     * Normalize:
     * max score = 150%
     */

    return Math.min(
        Math.round(score),
        150
    );
}