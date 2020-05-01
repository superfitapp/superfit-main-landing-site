import { IPlanPublicInfo, Level, PlanType } from "@superfitapp/superfitjs"

export default class TemplateUtils {

  static trainingPlanTemplateTotalWeeks(planInfo: IPlanPublicInfo): number {
    return planInfo.phases.map(x => x.numberOfWeeks).reduce((a, b) => a + b)
  }

  static planBadge(planInfo: IPlanPublicInfo): PlanTypeBadge {
    let planType = planInfo.planType
    let weeks = TemplateUtils.trainingPlanTemplateTotalWeeks(planInfo)

    let badgeInfo: PlanTypeBadge = {
      color: planType == PlanType.Plan ? "#007C70" : "#F2EFE7",
      textColor: planType == PlanType.Plan ? "white" : "#303030",
      title: planType == PlanType.Plan ? `${weeks} Week Plan` : "Class"
    }

    return badgeInfo
  }
}

export interface PlanTypeBadge {
  color: string
  textColor: string
  title: string
}