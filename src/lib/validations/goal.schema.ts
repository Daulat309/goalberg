import { z } from "zod";

export const goalSchema = z.object({
    title: z.string().min(3, {
        message:
            "Title must contain at least 3 characters",
    }),

    description: z.string().optional(),

    thrust_area: z.string().min(1, {
        message:
            "Please select a thrust area",
    }),

    uom_type: z.enum([
        "numeric",
        "percentage",
        "timeline",
        "zero_based",
    ]),

    target_value: z.coerce.number().min(1),

    weightage: z.coerce
        .number()
        .min(10, {
            message:
                "Weightage should be at least 10%",
        })
        .max(100, {
            message:
                "Weightage cannot exceed 100%",
        }),
});

export type GoalFormData = z.infer<typeof goalSchema>;
