export function validateGoalLimits(
    goals: any[]
) {
    if (goals.length > 8) {
        return {
            valid: false,
            message:
                "Maximum 8 goals allowed",
        };
    }

    const totalWeightage = goals.reduce(
        (sum, goal) =>
            sum + goal.weightage,
        0
    );

    if (totalWeightage !== 100) {
        return {
            valid: false,
            message:
                "Total weightage must equal 100%",
        };
    }

    return {
        valid: true,
        message: "",
    };
}