import { Injectable } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
@Injectable({
  providedIn: 'root',
})
export default class AppUtils {
  public formatBytes(bytes: number, decimals?: number): string {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals! <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  public dateStructFormat(date: any): NgbDateStruct {
    date = new Date(date);
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    } as any;
  }

  public dateFormater(dt: any) {
    let date = '';
    if (dt) {
      //   date = new Date(`${dt.year}/${dt.month}/${dt.day}`).toLocaleDateString();
      date = `${dt.year}-${dt.month}-${dt.day}`.toString();
    }
    return date;
  }

  public reportViewer(url: string, reportTitle: string) {
    const myWindow = window.open(
      url,
      '_blank',
      `width=${window.screen.availWidth}, height=${window.screen.availHeight}`
    );
    const content = `		
						<!DOCTYPE html>
						<html lang="en"  width="100vw">
							<head>
								<title>${reportTitle}</title>
								<link rel="icon" type="image/x-icon" href="assets/images/favicon.ico">
								<style>
								body {height: 98vh;}
								.myIFrame {
								border: none;
								}
								</style>
							</head>
							<body>
								<iframe
								src="${url}"
								class="myIFrame justify-content-center"
								frameborder="5"
								width="100%"
								height="99%"
								referrerpolicy="no-referrer-when-downgrade"
								>
								</iframe>
							</body>
						</html>

		`;
    myWindow?.document.write(content);
  }
}
