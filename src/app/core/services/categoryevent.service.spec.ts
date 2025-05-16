import { CategoryEventService } from './categoryevent.service';

describe('CategoryEventService', () => {
  let service: CategoryEventService;

  beforeEach(() => {
    service = new CategoryEventService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit event when notifyCategoryCreated is called', (done) => {
    service.categoryCreated$.subscribe(() => {
      expect(true).toBe(true);
      done();
    });

    service.notifyCategoryCreated();
  });
});