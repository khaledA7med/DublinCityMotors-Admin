import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { MessagesService } from '../../services/messages.service';

@Component({
  selector: 'app-dropzone',
  templateUrl: './dropzone.component.html',
  styleUrls: ['./dropzone.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropzoneComponent implements OnChanges, OnDestroy {
  documentsToUpload: File[] = [];
  documentsToDisplay: any[] = [];
  private subscriptions: Subscription[] = [];

  @Input() isBtn = false;
  @Input() btnEnd = false;
  @Input() existingFiles: string[] = []; // Array of existing file paths
  @Output() files = new EventEmitter<File[]>();

  constructor(
    private messageService: MessagesService,
    private cdr: ChangeDetectorRef
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.existingFiles);

    // Convert local file paths into accessible URLs
    this.existingFiles.forEach((path) => {
      this.documentsToDisplay.push({
        data: this.convertPathToURL(path),
        name: path.split('\\').pop(), // Use backslash for Windows paths
        type: 'image',
      });
    });
    console.log(this.documentsToDisplay);
  }

  // ngOnInit() {
  //   console.log(this.existingFiles);

  //   // Convert local file paths into accessible URLs
  //   this.existingFiles.forEach((path) => {
  //     this.documentsToDisplay.push({
  //       data: this.convertPathToURL(path),
  //       name: path.split('\\').pop(), // Use backslash for Windows paths
  //       type: 'image',
  //     });
  //   });
  //   console.log(this.documentsToDisplay);
  // }

  convertPathToURL(path: string): string {
    console.log(path);

    // Adjust this function based on your server configuration
    return path; // Modify accordingly
  }

  fileIcon(fileType: string): { cls: string; ico: string } {
    const iconMap: { [key: string]: { cls: string; ico: string } } = {
      'image/jpeg': { cls: 'text-danger', ico: 'ri-image-line' },
      'image/png': { cls: 'text-danger', ico: 'ri-image-line' },
      'image/gif': { cls: 'text-danger', ico: 'ri-image-line' },
      'application/pdf': { cls: 'text-info', ico: 'ri-file-pdf-line' },
      'application/msword': { cls: 'text-primary', ico: 'ri-file-word-line' },
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        { cls: 'text-primary', ico: 'ri-file-word-line' },
      'application/vnd.ms-excel': {
        cls: 'text-success',
        ico: 'ri-file-excel-line',
      },
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': {
        cls: 'text-success',
        ico: 'ri-file-excel-line',
      },
      'text/plain': { cls: 'text-secondary', ico: 'ri-file-text-line' },
      // Add more file types as needed
    };
    return iconMap[fileType] || { cls: 'text-secondary', ico: 'ri-file-line' };
  }

  onFileLoaded(file: File) {
    console.log(file);

    const reader = new FileReader();
    reader.onload = (event) => {
      this.documentsToDisplay.push({
        id: Date.now(),
        name: file.name,
        size: file.size,
        type: file.type,
        data: event.target?.result,
      });
      this.emitFiles();
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

  onSelectFiles(event: Event) {
    const files = (event.target as HTMLInputElement).files!;
    this.handleSelectedFiles(files);
  }

  onFileDropped(files: FileList) {
    this.handleSelectedFiles(files);
  }

  removeImage(item: any) {
    this.messageService
      .confirm(
        'Delete!',
        'Are you sure you want to delete it?',
        'danger',
        'question'
      )
      .then((res: any) => {
        if (res.isConfirmed) {
          this.documentsToDisplay = this.documentsToDisplay.filter(
            (doc) => doc !== item
          );
          this.documentsToUpload = this.documentsToUpload.filter(
            (doc) => doc.name !== item.name
          );
          this.emitFiles();
          this.cdr.detectChanges();
        }
      });
  }

  emitFiles() {
    this.files.emit(this.documentsToUpload);
  }

  errorImages(event: Event) {
    const elem = event.target as HTMLImageElement;
    // elem.src = './../../../../../assets/images/placeholder.jpg'; // Update this path
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
