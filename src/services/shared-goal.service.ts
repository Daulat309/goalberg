import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export async function createSharedGoal(
    goal: any
) {

    return await supabase
        .from("shared_goals")
        .insert(goal)
        .select()
        .single();
}

export async function assignSharedGoal(
    assignments: any[]
) {

    return await supabase
        .from(
            "shared_goal_assignments"
        )
        .insert(assignments);
}

export async function getSharedGoals() {

    return await supabase
        .from("shared_goals")
        .select(`
      *,
      shared_goal_assignments(*)
    `);
}

export async function getEmployeeSharedGoals(
    employeeId: string
) {

    return await supabase
        .from(
            "shared_goal_assignments"
        )
        .select(`
      *,
      shared_goals(*)
    `)
        .eq("employee_id", employeeId);
}

export async function updateSharedGoalWeightage(
  assignmentId: string,
  weightage: number
) {

  return await supabase
    .from(
      "shared_goal_assignments"
    )
    .update({
      weightage,
    })
    .eq("id", assignmentId);
}