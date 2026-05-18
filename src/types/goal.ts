export type GoalStatus =
    | "draft"
    | "submitted"
    | "approved"
    | "rejected";

export type UOMType =
    | "numeric"
    | "percentage"
    | "timeline"
    | "zero_based";

export interface Goal {
    id: string;

    title: string;

    description?: string;

    thrust_area: string;

    uom_type: UOMType;

    target_value: number;

    weightage: number;

    status: GoalStatus;

    is_locked: boolean;
}