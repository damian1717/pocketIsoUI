import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrganizationChartPersonInfo } from '../../../../administration-panel/models/organization-chart-person-info.model';
import { OrganizationChartService } from 'src/administration-panel/services/organization-chart.service';
import { DocumentService } from '../../../../common/services/document.service';
import { SaveAsService } from '../../../../common/services/save-as.service';
import { RaportService } from '../../../../common/services/raport.service';
import { DocumentInfo } from '../../../../common/models/documnet.model';
import { RaportCode } from '../../../../common/enums/raport-codes';
import { ChartOrgReport } from '../../../../common/models/chart-org-report.model';
import { Router } from '@angular/router';
import { CompanyService } from '../../../../administration-panel/services/company.service';

@Component({
    selector: 'app-chart-organization',
    templateUrl: './chart-organization.component.html',
    styleUrls: ['./chart-organization.component.scss']
})
export class ChartOrganizationComponent implements OnInit {

    selectedNodes!: TreeNode[];
    data: TreeNode[] = [];
    listOfPersons: OrganizationChartPersonInfo[] = [];
    documents: DocumentInfo[] = [];
    companyId = '';
    constructor(private organizationChartService: OrganizationChartService, private snackBar: MatSnackBar,
        private documentService: DocumentService, private saveAsService: SaveAsService, private raport: RaportService,
        private router: Router, private companyService: CompanyService) { }

    ngOnInit() {
        this.getCompanyId();
        this.buildChart();
        this.getDocuments();
    }

    getCompanyId() {
        this.companyService.getCurrentCompanyId().subscribe(x => {
            this.companyId = x;
        })
    }

    buildChart() {
        this.organizationChartService.getPersonsListOrganizationChart().subscribe(x => {
            this.listOfPersons = x;

            const mainPerson = this.listOfPersons.find(x => x.belowPersonName === '');
            if (mainPerson) {
                var chartData =
                    {
                        expanded: true,
                        type: 'person',
                        data: {
                            name: `${mainPerson.name} ${mainPerson.lastName}`,
                            title: mainPerson.position,
                            level: 1,
                            id: mainPerson.id,
                        },
                        children: []
                    } as TreeNode;

                const maxLevel = Math.max(...this.listOfPersons.map(o => o.level));

                if (maxLevel <= 1) {
                    this.data = [
                        chartData
                    ];
                }

                for (let i = 2; i <= maxLevel; i++) {

                    let personForLevels = this.listOfPersons.filter(x => x.level === i);
                    let children: TreeNode[] = [];
                    if (personForLevels && personForLevels.length > 0) {

                        for (let j = 0; j < personForLevels.length; j++) {
                            var child =
                                {
                                    expanded: true,
                                    type: 'person',
                                    data: {
                                        name: `${personForLevels[j].name} ${personForLevels[j].lastName}`,
                                        title: personForLevels[j].position,
                                        level: i,
                                        id: personForLevels[j].id,
                                        belowPersonId: personForLevels[j].belowPersonId
                                    },
                                    children: []
                                } as TreeNode;

                            children.push(child);
                        }
                    }

                    if (children && children.length > 0) {
                        for (let x = 0; x < children.length; x++) {

                            let node = this.getElementByLevelAndBelowPersonIdFromNode(chartData, i, children[x]?.data?.belowPersonId);

                            if (!node) {
                                continue;
                            }

                            if (node.children) {
                                node.children.push(children[x]);
                            } else {
                                node.children = [];
                                node.children.push(children[x]);
                            }

                        }
                    }
                }

                this.data = [
                    chartData
                ];
            }
        })
    }

    getElementByLevelAndBelowPersonIdFromNode(node: TreeNode<any>, level: number, belowPersonId: string) {

        if (!node) {
            return null;
        }

        if (node.data.id === belowPersonId) {
            return node;
        }

        if (!node?.children) {
            return null;
        }

        for (var i = 0; i < node.children.length; i++) {
            var child = node.children[i];

            if (!child) {
                continue;
            }

            if (child.data.level === level && child.data.id === belowPersonId) {
                return child;
            }

            child = this.getElementByLevelAndBelowPersonIdFromNode(child, level, belowPersonId)!;

            if (child !== null) {
                return child;
            }
        }
        return null;
    }

    displayMessage(message: string) {
        this.snackBar.open(message, '', { duration: 1500 });
    }

    private getDocuments() {
        this.documentService.getDocumentsByCode(RaportCode.OrganizationChart).subscribe(x => {
            this.documents = x;
        });
    }

    downloadDocumnet(id: string, name: string) {
        this.documentService.downloadFileById(id)
            .subscribe(
                resp => this.saveAsService.save(resp.body, name),
            );
    }

    generateReport() {
        let request = { chartNodes: this.data } as ChartOrgReport;
        this.raport.generateOrgChartRaportPdf(request)
            .subscribe(resp => {
                this.saveAsService.save(resp.body, resp.filename);
                this.getDocuments();
                this.displayMessage('Raport utworzony');
            })
    }

    redirectToRiskAnalysis() {
        this.router.navigateByUrl(`risk-analysis-list/company/${this.companyId}`);
    }
}
