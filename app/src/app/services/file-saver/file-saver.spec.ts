import { TestBed } from '@angular/core/testing';

import { FileSaver } from './file-saver';

describe('FileSaver', () => {
  let service: FileSaver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileSaver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
