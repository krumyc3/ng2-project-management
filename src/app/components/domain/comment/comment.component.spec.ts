import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentComponent } from './comment.component';
import { DebugElement } from '@angular/core/src/debug/debug_node';
import { By } from '@angular/platform-browser';
import { Comment } from '../../../models/comment';
import { User } from '../../../models/user';

describe('CommentComponent', () => {
  let component: CommentComponent;
  let fixture: ComponentFixture<CommentComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let expectedUser: User;
  let expectedComment: Comment;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    expectedUser = new User(null, 'some@email.com', 'Łukasz', 'Golec');
    expectedComment = new Comment('', expectedUser, '', '', 0, new Date());
    fixture = TestBed.createComponent(CommentComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('.comment'));
    el = de.nativeElement;
    component.comment.content = expectedComment.content;
    component.comment.author = expectedUser;
    fixture.detectChanges();
  });
  it('should display comment\'s author full name', () => {
    expect(el.querySelector('.comment-author').textContent).toContain(expectedUser.getFullName());
  });

  it('should display proper content', () => {
    expect(el.querySelector('.comment-content').textContent).toContain(expectedComment.content);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
