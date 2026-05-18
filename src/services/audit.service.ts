import { createClient }
    from "@/lib/supabase/client";

const supabase =
    createClient();

export async function createAuditLog(
    log: any
) {

    return await supabase
        .from("audit_logs")
        .insert([log]);
}

export async function getAuditLogs() {

    return await supabase
        .from("audit_logs")
        .select("*")
        .order("created_at", {
            ascending: false,
        });
}