import { Dashboard } from "../Dashboard/dashboard.model";
import { DataSet } from "../DataSet/data-set.model";
import { Report } from "../Report/report.model";

export class TenantDetails {
    Reports:Report[];
    Dashboards:Dashboard[];
    Datasets:DataSet[]
}

