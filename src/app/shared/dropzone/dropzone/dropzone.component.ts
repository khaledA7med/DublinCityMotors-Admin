import { Subscription } from 'rxjs';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { MessagesService } from '../../services/messages.service';

@Component({
  selector: 'app-dropzone',
  templateUrl: './dropzone.component.html',
  styleUrls: ['./dropzone.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropzoneComponent implements OnDestroy {
  documentsToUpload: any[] = [];
  documentsToDisplay: any[] = [];
  subscribes: Subscription[] = [];
  @Input() isBtn: boolean = false;
  @Input() btnEnd: boolean = false;
  @Input() UploadedFiles: any[] = [];

  @Output() files: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private message: MessagesService,
    private cdr: ChangeDetectorRef
  ) {}

  onFileLoaded(file: File) {
    const reader = new FileReader();
    reader.onload = (event) => {
      this.documentsToDisplay.push({
        id: Date.now(),
        name: file.name,
        size: file.size,
        type: file.type,
        data: event.target?.result,
      });
      this.emitingFiles();
      this.cdr.detectChanges();
    };
    reader.readAsDataURL(file);
  }

  handleSelectedFiles(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      this.documentsToUpload.push(files[i]);
      this.onFileLoaded(files[i]);
    }
  }

  onSelectFiles(e: Event) {
    const elem = e.target as HTMLInputElement;
    const files = elem.files!;
    this.handleSelectedFiles(files);
  }

  onFileDropped(e: FileList) {
    this.handleSelectedFiles(e);
  }

  removeImage(item: any, isServer?: boolean) {
    this.message
      .confirm(
        'Delete!',
        'Are you sure you want to delete it?',
        'danger',
        'question'
      )
      .then((res: any) => {
        if (res.isConfirmed) {
          this.documentsToDisplay = this.documentsToDisplay.filter(
            (doc) => doc.name !== item.name
          );
          this.documentsToUpload = this.documentsToUpload.filter(
            (doc) => doc.name !== item.name
          );
          this.emitingFiles();
        }
      });
  }

  clearImages() {
    this.UploadedFiles = [];
    this.documentsToDisplay = [];
    this.documentsToUpload = [];
    this.emitingFiles();
  }

  fileIcon(type: string): { cls: string; ico: string; file: string } {
    let cls = '',
      ico = '',
      file = '';
    switch (type) {
      case 'msword':
      case 'doc':
      case 'docx':
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        cls = 'bg-soft-secondary text-secondary';
        ico = 'ri-file-word-2-fill';
        file = 'docx';
        break;
      case 'vnd.ms-powerpoint':
      case 'ppt':
      case 'pptx':
      case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
        cls = 'bg-soft-danger text-danger';
        ico = 'ri-file-ppt-fill';
        file = 'pptx';
        break;
      case 'text':
      case 'txt':
        cls = 'bg-soft-dark text-muted';
        ico = 'ri-file-text-fill';
        file = 'txt';
        break;
      case 'pdf':
        cls = 'bg-soft-danger text-danger';
        ico = 'ri-file-pdf-fill';
        file = 'pdf';
        break;
      case 'zip':
        cls = 'bg-soft-info text-info';
        ico = 'ri-file-zip-fill';
        file = 'zip';
        break;
      case 'vnd.ms-excel':
      case 'xls':
      case 'xlsx':
      case 'csv':
      case 'text/csv':
      case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
        cls = 'bg-soft-success text-success';
        ico = 'ri-file-excel-2-fill';
        file = 'xlsx';
        break;
      default:
        cls = 'bg-soft-success text-success';
        ico = 'ri-error-warning-fill';
        break;
    }
    return { cls: cls, ico: ico, file };
  }

  errorImages(event: Event) {
    let elem = event.target as HTMLImageElement;
    elem.src = './../../../../../assets/images/placeholder.jpg';
  }
  emitingFiles() {
    this.cdr.detectChanges();
    this.files.emit(this.documentsToUpload);
  }
  ngOnDestroy() {
    this.subscribes && this.subscribes.forEach((s) => s.unsubscribe());
  }
}
