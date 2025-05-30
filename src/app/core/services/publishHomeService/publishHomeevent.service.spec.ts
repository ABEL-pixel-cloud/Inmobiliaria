import { TestBed } from '@angular/core/testing';
import { PublishHomeEvent } from './PublishHomeEvent.service';

describe('PublishHomeEvent', () => {
  let service: PublishHomeEvent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PublishHomeEvent]
    });
    service = TestBed.inject(PublishHomeEvent);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should expose publishHomeCreated$ as an Observable', () => {
    expect(service.publishHomeCreated$).toBeDefined();
    expect(typeof service.publishHomeCreated$.subscribe).toBe('function');
  });

  it('should emit an event when notifyPublishHomeCreated is called', () => {
    const callback = jest.fn();
    service.publishHomeCreated$.subscribe(callback);

    service.notifyPublishHomeCreated();

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should emit multiple times if notifyPublishHomeCreated is called multiple times', () => {
    const callback = jest.fn();
    service.publishHomeCreated$.subscribe(callback);

    service.notifyPublishHomeCreated();
    service.notifyPublishHomeCreated();
    service.notifyPublishHomeCreated();

    expect(callback).toHaveBeenCalledTimes(3);
  });
});