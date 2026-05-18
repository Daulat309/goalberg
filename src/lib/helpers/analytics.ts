export function getStatusDistribution(
  goals: any[]
) {
  const distribution = {
    draft: 0,
    submitted: 0,
    approved: 0,
    rejected: 0,
  };

  goals.forEach((goal) => {
    distribution[
      goal.status as keyof typeof distribution
    ]++;
  });

  return Object.entries(
    distribution
  ).map(([name, value]) => ({
    name,
    value,
  }));
}

export function getThrustDistribution(
  goals: any[]
) {
  const map: Record<
    string,
    number
  > = {};

  goals.forEach((goal) => {
    map[goal.thrust_area] =
      (map[goal.thrust_area] || 0) +
      1;
  });

  return Object.entries(map).map(
    ([name, value]) => ({
      name,
      value,
    })
  );
}

export function getQuarterlyTrend(
  updates: any[]
) {

  const quarters = {
    Q1: 0,
    Q2: 0,
    Q3: 0,
    Q4: 0,
  };

  updates.forEach((update) => {

    quarters[
      update.quarter as keyof typeof quarters
    ] += update.actual_value || 0;

  });

  return Object.entries(
    quarters
  ).map(([quarter, value]) => ({
    quarter,
    value,
  }));
}

export function getPlannedVsActual(
  plans: any[],
  updates: any[]
) {

  const quarters = {
    Q1: {
      planned: 0,
      actual: 0,
    },

    Q2: {
      planned: 0,
      actual: 0,
    },

    Q3: {
      planned: 0,
      actual: 0,
    },

    Q4: {
      planned: 0,
      actual: 0,
    },
  };

  plans.forEach((plan) => {

    quarters[
      plan.quarter as keyof typeof quarters
    ].planned +=
      plan.planned_value || 0;

  });

  updates.forEach((update) => {

    quarters[
      update.quarter as keyof typeof quarters
    ].actual +=
      update.actual_value || 0;

  });

  return Object.entries(
    quarters
  ).map(([quarter, values]) => ({
    quarter,

    planned: values.planned,

    actual: values.actual,
  }));
}

export function getCompletionRate(
  goals: any[]
) {

  if (!goals.length) return 0;

  const completed =
    goals.filter(
      (goal) =>
        goal.status === "approved"
    ).length;

  return Math.round(
    (completed / goals.length) * 100
  );
}

export function getManagerEffectiveness(
  checkins: any[]
) {

  const managers: Record<
    string,
    number
  > = {};

  checkins.forEach((checkin) => {

    managers[
      checkin.manager_id
    ] =
      (managers[
        checkin.manager_id
      ] || 0) + 1;

  });

  return Object.entries(
    managers
  ).map(([manager, total]) => ({
    manager,
    total,
  }));
}

export function getCompletionDashboard(
  plans: any[],
  updates: any[]
) {

  const completed =
    updates.filter(
      (u) =>
        u.progress === "completed"
    ).length;

  const total =
    plans.length;

  const completionRate =
    total === 0
      ? 0
      : Math.round(
        (completed / total) * 100
      );

  return {
    completed,
    total,
    completionRate,
  };
}

export function getManagerCheckinStats(
  checkins: any[]
) {

  const stats: Record<
    string,
    number
  > = {};

  checkins.forEach((checkin) => {

    const managerName =
      "Manager User";

    stats[managerName] =
      (stats[managerName] || 0) + 1;

  });

  return Object.entries(
    stats
  ).map(([manager, total]) => ({
    manager,
    total,
  }));
}

export function getOrganizationScore(
  plans: any[],
  updates: any[]
) {

  const totalPlanned =
    plans.reduce(
      (sum, p) =>
        sum + p.planned_value,
      0
    );

  const totalActual =
    updates.reduce(
      (sum, u) =>
        sum + u.actual_value,
      0
    );

  if (!totalPlanned)
    return 0;

  return Math.round(
    (totalActual / totalPlanned) *
    100
  );
}