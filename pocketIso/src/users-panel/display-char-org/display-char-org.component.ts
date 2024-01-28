import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TreeNode } from 'primeng/api';
import { OrganizationChartPersonInfo } from '../../administration-panel/models/organization-chart-person-info.model';
import { OrganizationChartService } from '../../administration-panel/services/organization-chart.service';
import { DocumentInfo } from '../../common/models/documnet.model';
import { DocumentService } from '../../common/services/document.service';
import { SaveAsService } from '../../common/services/save-as.service';
import { RaportCode } from '../../common/enums/raport-codes';

@Component({
  selector: 'app-display-char-org',
  templateUrl: './display-char-org.component.html',
  styleUrls: ['./display-char-org.component.scss']
})
export class DisplayCharOrgComponent implements OnInit {

  selectedNodes!: TreeNode[];
    data: TreeNode[] = [];
    listOfPersons: OrganizationChartPersonInfo[] = [];
    document: DocumentInfo = {
        id: '',
        code: '',
        name: '',
        insertedDate: undefined!
    };

    constructor(private organizationChartService: OrganizationChartService, private snackBar: MatSnackBar,
        private documentService: DocumentService, private saveAsService: SaveAsService) { }

    ngOnInit() {
        this.buildChart();
        this.getDocuments();
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
            if (x && x.length > 0) {
              this.document = x[0];
            }
        });
    }

    downloadDocumnet(id: string, name: string) {
      this.documentService.downloadFileById(id)
          .subscribe(

              resp => this.saveAsService.save(resp.body, name),
          );
  }
}
