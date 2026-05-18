import { createClient } from "@/lib/supabase/client";

import { GoalFormData } from "@/lib/validations/goal.schema";

import { generateQuarterlyPlans } from "@/lib/helpers/quarter-planner";


const supabase = createClient();

const EMPLOYEE_ID =
  "5d05e6b8-76a9-4a01-854e-93587cbeea4d";

export async function getQuarterlyUpdates(
  goalId?: string
) {

  let query =
    supabase
      .from("quarterly_updates")
      .select(`
        *,
        goals (
          id,
          title,
          thrust_area,
          uom_type,
          target_value
        )
      `);

  if (goalId) {

    query =
      query.eq(
        "goal_id",
        goalId
      );
  }

  return await query.order(
    "created_at",
    {
      ascending: false,
    }
  );
}

export async function addManagerComment(
  updateId: string,
  manager_comment: string
) {

  return await supabase
    .from("quarterly_updates")
    .update({
      manager_comment,
    })
    .eq("id", updateId);
}

export async function createGoal(
  data: GoalFormData
) {

  // Fetch existing goals
  const { data: existingGoals } =
    await supabase
      .from("goals")
      .select("*")
      .eq("employee_id", EMPLOYEE_ID);

  const goals = existingGoals || [];

  // RULE 1 → Max 8 goals
  if (goals.length >= 8) {
    return {
      error: {
        message:
          "Maximum 8 goals allowed",
      },
    };
  }

  // RULE 2 → Total weightage <= 100
  const currentWeightage =
    goals.reduce(
      (sum, goal) =>
        sum + goal.weightage,
      0
    );

  const newTotal =
    currentWeightage +
    data.weightage;

  if (newTotal > 100) {
    return {
      error: {
        message:
          `Total weightage exceeds 100%. Current total is ${currentWeightage}%`,
      },
    };
  }

  // Insert goal
  return await supabase
    .from("goals")
    .insert([
      {
        ...data,
        employee_id:
          EMPLOYEE_ID,

        manager_name:
          "Manager User",
      },
    ]);
}

export async function getGoals() {
  return await supabase
    .from("goals")
    .select("*")
    .eq("employee_id", EMPLOYEE_ID)
    .order("created_at", {
      ascending: false,
    });
}

export async function deleteGoal(
  id: string
) {
  return await supabase
    .from("goals")
    .delete()
    .eq("id", id);
}

export async function updateGoal(
  id: string,
  data: any
) {
  return await supabase
    .from("goals")
    .update(data)
    .eq("id", id);
}

export async function submitGoals(
  employeeId: string
) {
  return await supabase
    .from("goals")
    .update({
      status: "submitted",
    })
    .eq("employee_id", employeeId)
    .in("status", [
      "draft",
      "rejected",
    ]);
}

export async function getSubmittedGoals() {
  return await supabase
    .from("goals")
    .select("*")
    .eq("status", "submitted")
    .order("created_at", {
      ascending: false,
    });
}

export async function approveGoal(
  goal: any
) {

  const response =
    await supabase
      .from("goals")
      .update({
        status: "approved",
        is_locked: true,
      })
      .eq("id", goal.id);

  if (response.error) {
    return response;
  }

  const plans =
    generateQuarterlyPlans(
      goal.target_value,
      goal.uom_type
    );

  const formattedPlans =
    plans.map((plan) => ({
      goal_id: goal.id,

      quarter: plan.quarter,

      planned_value:
        plan.planned_value,
    }));

  await createQuarterlyPlans(
    formattedPlans
  );

  return response;
}

export async function rejectGoal(
  id: string,
  comment: string
) {
  return await supabase
    .from("goals")
    .update({
      status: "rejected",

      rejection_comment:
        comment,

      is_locked: false,
    })
    .eq("id", id);
}

export async function createQuarterlyPlans(
  plans: any[]
) {

  return await supabase
    .from("quarterly_plans")
    .upsert(
      plans,
      {
        onConflict:
          "goal_id,quarter",
      }
    );
}

export async function getQuarterlyPlans(
  goalId: string
) {
  return await supabase
    .from("quarterly_plans")
    .select("*")
    .eq("goal_id", goalId)
    .order("quarter");
}

export async function getQuarterPlan(
  goalId: string,
  quarter: string
) {
  return await supabase
    .from("quarterly_plans")
    .select("*")
    .eq("goal_id", goalId)
    .eq("quarter", quarter)
    .maybeSingle();
}

export async function createQuarterlyUpdate(
  data: any
) {
  return await supabase
    .from("quarterly_updates")
    .insert([data]);
}



export async function createCheckin(
  data: any
) {
  return await supabase
    .from("checkins")
    .insert([data]);
}

export async function getAnalyticsGoals() {
  return await supabase
    .from("goals")
    .select("*");
}

export async function getAllQuarterlyPlans() {
  return await supabase
    .from("quarterly_plans")
    .select("*");
}

export async function getAllQuarterlyUpdates() {
  return await supabase
    .from("quarterly_updates")
    .select("*");
}

export async function getAllCheckins() {
  return await supabase
    .from("checkins")
    .select("*");
}

export async function getQuarterlySubmission(
  goalId: string,
  quarter: string
) {

  return await supabase
    .from("quarterly_updates")
    .select("*")
    .eq("goal_id", goalId)
    .eq("quarter", quarter)
    .maybeSingle();
}


export async function updateGoalByManager(
  goal: any,
  updates: {
    target_value: number;
    weightage: number;
  }
) {

  const response =
    await supabase
      .from("goals")
      .update({
        target_value:
          updates.target_value,

        weightage:
          updates.weightage,
      })
      .eq("id", goal.id);

  if (response.error) {
    return response;
  }

  await supabase
    .from("quarterly_plans")
    .delete()
    .eq("goal_id", goal.id);

  const regeneratedPlans =
    generateQuarterlyPlans(
      updates.target_value,
      goal.uom_type
    );

  const formattedPlans =
    regeneratedPlans.map(
      (plan) => ({
        goal_id: goal.id,

        quarter:
          plan.quarter,

        planned_value:
          plan.planned_value,
      })
    );

  await createQuarterlyPlans(
    formattedPlans
  );

  return response;
}

export async function reopenGoal(
  goalId: string
) {

  return await supabase
    .from("goals")
    .update({
      status: "draft",

      is_locked: false,
    })
    .eq("id", goalId);
}

/*  "5d05e6b8-76a9-4a01-854e-93587cbeea4d" */ 