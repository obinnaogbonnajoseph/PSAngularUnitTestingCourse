import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HeroComponent } from './hero.component';
import { NO_ERRORS_SCHEMA, Component } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('HeroComponent (shallow tests)', () => {
    let fixture: ComponentFixture<HeroComponent>;
    let component: HeroComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [HeroComponent],
            schemas: [NO_ERRORS_SCHEMA]
        });
        fixture = TestBed.createComponent(HeroComponent);
        component = fixture.componentInstance;
    });

    it('should have the correct hero', () => {
        component.hero = { id: 1, name: 'SuperDude', strength: 3};

        expect(component.hero.name).toEqual('SuperDude');
    });

    it('should render the hero name in an anchor tag', () => {
        // arrange
        component.hero = { id: 1, name: 'SuperDude', strength: 3};

        // act
        fixture.detectChanges();

        // assert
        expect(fixture.nativeElement.querySelector('a').textContent).toContain('SuperDude');

        // assert using debugElement
        // let debugElement = fixture.debugElement.query(By.css('a'));
        // let nativeElement = debugElement.nativeElement;
        // expect(nativeElement.textContent).toContain('SuperDude');
    });

    it('should have a delete button', () => {
        expect(fixture.nativeElement.querySelector('button')).toBeDefined();
        expect(fixture.nativeElement.querySelector('.delete')).toBeDefined();
    });

    // todo: test the routerlink:::::
});
