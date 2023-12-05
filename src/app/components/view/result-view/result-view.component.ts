import { Component, Input, OnInit } from '@angular/core';
import { Result, getEmptyResult } from 'src/app/interfaces/result';
import { ResultApiService } from 'src/app/services/api/result-api.service';
import { FileService } from 'src/app/services/common/file.service';
import { ModalService } from 'src/app/services/common/modal.service';
import { ResultDataService } from 'src/app/services/data/result-data.service';
import { BaseViewComponent } from '../base-view/base-view.component';
@Component({
  selector: 'app-result-view',
  templateUrl: './result-view.component.html',
  styleUrls: [
    '../../../shared/scss/buttons.scss',
    './result-view.component.scss',
  ],
})
export class ResultViewComponent extends BaseViewComponent implements OnInit {
  @Input() result: Result = getEmptyResult();

  constructor(
    protected resultApiService: ResultApiService,
    protected resultDataService: ResultDataService,
    protected modalService: ModalService,
    private fileService: FileService,
  ) {
    super(resultApiService, resultDataService, modalService);
  }

  ngOnInit(): void {}

  downloadLog(): void {
    if (this.result.log) {
      const filename = `vantage6_logs_result_${this.result.id}.txt`;
      this.fileService.downloadTxtFile(this.result.log, filename);
    } else {
      this.modalService.openMessageModal([
        'Sorry, the log is empty, nothing to download!',
      ]);
    }
  }

  getResultDisplay(): string {
    let MAX_DISPLAY_LEN = 2000;
    if (!this.result.decrypted_result) {
      return '';
    } else if (this.result.decrypted_result?.length < MAX_DISPLAY_LEN) {
      return this.result.decrypted_result;
    } else {
      let len_not_shown = this.result.decrypted_result.length - MAX_DISPLAY_LEN;
      return (
        this.result.decrypted_result.slice(0, MAX_DISPLAY_LEN) +
        ` (${len_not_shown} characters shown)...`
      );
    }
  }

  getResults(): any {
    if (this.result.result) {
      if (this.result.decrypted_result) {
        return this.result.decrypted_result;
      } else {
        return this.result.result;
      }
    } else {
      return null;
    }
  }

  downloadResult(): void {
    const result = this.getResults();
    if (result) {
      const filename = `vantage6_results_${this.result.id}.txt`;
      this.fileService.downloadTxtFile(result, filename);
      this.modalService.openMessageModal([
        'We could not decode your results here. Please execute the two steps' +
          ' below to decode them yourself',
        'First, the results are b64 encoded. Decode them.',
        'Finally, the results are serialized at the end of the algorithm' +
          ' you used, so you should deserialize them. Hint: many Python-based ' +
          'algorithms use Pickle serialization. Then, do `pickle.loads(result)`.',
      ]);
    } else {
      this.modalService.openMessageModal([
        'Sorry, the results are empty, nothing to download!',
      ]);
    }
  }
}
