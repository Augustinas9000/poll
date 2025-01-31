import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PollVotingComponent } from './poll-voting.component';

describe('PollVotingComponent', () => {
  let component: PollVotingComponent;
  let fixture: ComponentFixture<PollVotingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PollVotingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PollVotingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
