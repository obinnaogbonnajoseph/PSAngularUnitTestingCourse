import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroesComponent } from './heroes.component';
import { HeroService } from '../hero.service';
import { of } from 'rxjs';
import { Component, Input } from '@angular/core';
import { Hero } from '../hero';
import { By } from '@angular/platform-browser';

describe('HeroesComponent (shallow tests)', () => {
    let fixture: ComponentFixture<HeroesComponent>;
    let mockHeroService;
    let HEROES;
    let component: HeroesComponent;

    @Component({
        selector: 'app-hero',
        template: '<div></div>'
      })
      class FakeHeroComponent {
        @Input() hero: Hero;
        // @Output() delete = new EventEmitter();
      }

    beforeEach(() => {
        HEROES = [
            { id: 1, name: 'SpiderDude', strength: 8},
            { id: 2, name: 'Wonderful Woman', strength: 24},
            { id: 3, name: 'SuperDude', strength: 55}
        ]
        mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);

        TestBed.configureTestingModule({
            declarations: [
                HeroesComponent,
                FakeHeroComponent
            ],
            providers: [
                { provide: HeroService, useValue: mockHeroService }
            ]
        })
        fixture = TestBed.createComponent(HeroesComponent);
        component = fixture.componentInstance;
    })

    it('should set heroes correctly from the service', () => {
        // arrange
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        
        // act
        fixture.detectChanges();

        // assert
        expect(component.heroes.length).toBe(3);
    })

    it('should create one li for each hero', () => {
        // arrange
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        
        // act
        fixture.detectChanges();

        // assert
        expect(fixture.debugElement.queryAll(By.css('li')).length).toBe(3);
    })
})