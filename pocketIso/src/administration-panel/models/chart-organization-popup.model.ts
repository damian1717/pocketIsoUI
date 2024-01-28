import { OrganizationChartPersonInfo } from "./organization-chart-person-info.model";
import { PersonBelow } from "./person-below.model";

export interface ChartOrganizationPopup {
    organizationChartPersonInfo: OrganizationChartPersonInfo;
    personsBelow: PersonBelow[];
    availableLevels: number[];
}
