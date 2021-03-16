import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Project } from 'src/app/Models/project-model';
import { EnrichServiceService } from 'src/app/Services/enrich-service.service';
import * as XLSX from 'xlsx';
type AOA = any[][];

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        transform: 'translateX(0%)'
      })),
      state('closed', style({
        transform: 'translateX(-110%)'
      })),
      transition('open => closed', [
        animate('0.3s')
      ]),
      transition('closed => open', [
        animate('0.3s')
      ]),
    ]),
    trigger('rotate', [
      // ...
      state('open', style({
        transform: 'rotate(-180deg)',
      })),
      state('closed', style({
        transform: 'rotate(0deg)'
      })),
      
    ]),
  ],
})
export class ProjectsComponent implements OnInit {
  ProjectList:Project[]=[];
  ProjectFormGroup:FormGroup;
  file:File;
  tl_state:boolean=true;
  ExcelData:AOA;
  selectedProject:Project;
  FileToUpload:File[]=[];
  isNewProject:boolean;
  isEdit:boolean=false;
  previousFile:string;

  constructor(
    private fb:FormBuilder,
    private service:EnrichServiceService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.InitializeProjectFormGroup();
    this.GetAllProjects();
  }

  InitializeProjectFormGroup(){
    this.ProjectFormGroup=this.fb.group({
      ProjectName:['',Validators.required],
      ProjectManager:['',Validators.required],
      ProjectDate:[null,Validators.required],
      Data:[null,Validators.required],
      Document:[null,Validators.required]
    });
  }

  GetAllProjects(){
    this.service.GetAllProjects().subscribe(data=>{
      this.ProjectList=<Project[]>data;
      //console.log("projects",data);
      if(this.ProjectList.length>0){
        this.SelectProject(this.ProjectList[0]);
      }
    });
  }

  timeline_toggle(){
    this.tl_state=!this.tl_state;
  }

  handleFileInput(evt): void {
    if (evt.target.files && evt.target.files.length > 0) {
      this.file = evt.target.files[0];
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        /* read workbook */
        const bstr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
  
        /* grab first sheet */
        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];
  
        /* save data */
        this.ExcelData = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
        this.ProjectFormGroup.get('Data').setValue(this.ExcelData.length-1);
        console.log(this.ExcelData);
      };
      reader.readAsBinaryString(this.file);
    }
  }

  NewClicked(){
    this.selectedProject=new Project();
    this.isNewProject=true;
    this.ResetProject();
  }

  ResetProject(){
    this.ProjectFormGroup.reset();
    this.file=null;
    this.FileToUpload=[];
  }

  SaveClicked(){
    console.log(this.ProjectFormGroup);
    this.FileToUpload.push(this.file);
    if(this.ProjectFormGroup.valid){
      if(this.isNewProject){
        var project=new Project();
        project.ProjectName=this.ProjectFormGroup.get('ProjectName').value;
        project.ProjectManager=this.ProjectFormGroup.get('ProjectManager').value;
        project.Date=this.ProjectFormGroup.get('ProjectDate').value;
        project.Data=this.ProjectFormGroup.get('Data').value;
        project.DocumentName=this.file.name;
        this.CreateProject(project);
      }
    }
    else{
      this.ShowValidationErrors();
    }
    if(!this.isNewProject){
      this.selectedProject.ProjectManager=this.ProjectFormGroup.get('ProjectManager').value;
      this.selectedProject.Date=this.ProjectFormGroup.get('ProjectDate').value;
      this.selectedProject.Data=this.ProjectFormGroup.get('Data').value;
      this.selectedProject.DocumentName=this.file.name;
      this.UpdateProject(this.selectedProject);
    }
  }

  ReleaseClicked(){
    this.router.navigate(['de']);
  }

  CreateProject(project:Project){
    this.service.CreateProject(project).subscribe(data=>{
      console.log("success",data);
      this.service.UploadAttachment(project.ProjectName,this.FileToUpload).subscribe(x=>{
        console.log("Attachment");
        this.isEdit=false;
      });
      this.GetAllProjects();
      this.ResetProject();
    });
  }

  UpdateProject(project:Project){
    this.service.UpdateProject(project).subscribe(data=>{
      console.log("success",data);
      this.service.UploadAttachment(project.ProjectName,this.FileToUpload,this.previousFile).subscribe(x=>{
        this.isEdit=false;
        console.log("Attachment");
      });
      this.GetAllProjects();
      this.ResetProject();
    });
  }

  SelectProject(project:Project){
    this.isNewProject=false;
    this.isEdit=false;
    this.selectedProject=project;
    // console.log(project);
    this.previousFile=project.DocumentName;
    this.service.DowloandAttachment(project.ProjectName,project.DocumentName).subscribe(doc=>{
      if(doc){
        let fileType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        const blob = new Blob([doc], { type: fileType });
        this.file=new File([blob],project.DocumentName);
      }
    });
    this.ProjectFormGroup.get('ProjectName').setValue(project.ProjectName);
    this.ProjectFormGroup.get('ProjectManager').setValue(project.ProjectManager);
    this.ProjectFormGroup.get('ProjectDate').setValue(project.Date);
    this.ProjectFormGroup.get('Data').setValue(project.Data);
    this.ProjectFormGroup.disable();
  }

  ShowValidationErrors(): void {
    Object.keys(this.ProjectFormGroup.controls).forEach(key => {
      this.ProjectFormGroup.get(key).markAsTouched();
      this.ProjectFormGroup.get(key).markAsDirty();
    });
  }

}
