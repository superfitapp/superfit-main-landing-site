import { IPlanPublicInfo, Level } from 'superfitjs'

export default class TemplateUtils {
  static experienceLevelText(planInfo: IPlanPublicInfo): string {
    switch (planInfo.level.toLowerCase()) {
      case Level.Beginner:
        return "Perfect for all fitness levels"
      case Level.Intermediate:
        return "Some training experience preferred"
      case Level.Advanced:
        return "Advanced fitness experience preferred"
      case Level.Pro:
        return "Advanced movement and strength experience required"
      default:
        return "Some training experience preferred"
    }
  }

  static trainingPlanTemplateTotalWeeks(planInfo: IPlanPublicInfo): number {
    return planInfo.phases.map(x => x.numberOfWeeks).reduce((a, b) => a + b)
  }
}