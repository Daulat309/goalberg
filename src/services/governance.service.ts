import { createClient }
    from "@/lib/supabase/client";

const supabase =
    createClient();

export async function getGovernanceMetrics() {

    const {
        data: updates,
    } = await supabase
        .from("quarterly_updates")
        .select("*");

    const totalUpdates =
        updates?.length || 0;

    const completed =
        updates?.filter(
            (u) =>
                u.progress ===
                "completed"
        ).length || 0;

    const pending =
        totalUpdates - completed;

    return {
        totalUpdates,
        completed,
        pending,
        completionRate:
            totalUpdates > 0
                ? Math.round(
                    (completed /
                        totalUpdates) *
                    100
                )
                : 0,
    };
}