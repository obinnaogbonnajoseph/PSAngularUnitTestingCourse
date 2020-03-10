import { TestBed, ComponentFixture, fakeAsync, tick, flush, async } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
// tslint:disable-next-line: import-blacklist
import { of } from 'rxjs';
import { HeroService } from '../hero.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { StrengthPipe } from '../strength/strength.pipe';


// test that it fetches heroes
// test that the heroes property is populated
// test the routerlink

describe('DashboardComponent', () => {
    let fixture: ComponentFixture<DashboardComponent>, mockHeroService, component;
    const mockHeroes = [
        {
            id: 1,
            name: 'SuperPants Man',
            strength: 25
        },
        {
            id: 2,
            name: 'Strongest Dude',
            strength: 100
        },
        {
            id: 3,
            name: 'Super Woman',
            strength: 20
        }
    ];

    beforeEach(() => {
        mockHeroService = jasmine.createSpyObj(['getHeroes']);

        TestBed.configureTestingModule({
            declarations: [DashboardComponent, StrengthPipe],
            providers: [{
                provide: HeroService, useValue: mockHeroService
            }],
            schemas: [NO_ERRORS_SCHEMA]
        });

        fixture = TestBed.createComponent(DashboardComponent);
        mockHeroService.getHeroes.and.returnValue(of(mockHeroes));
    });

    it('should call mockService.getHeroes when component.getHeroes() is called', fakeAsync(() => {
        component = fixture.componentInstance;

        component.getHeroes();
        flush();

        expect(mockHeroService.getHeroes).toHaveBeenCalled();
    }));

    it('should populate the heroes property when getHeroes is called', fakeAsync(() => {
        component = fixture.componentInstance;

        component.getHeroes();
        flush();

        expect(component.heroes).toEqual(mockHeroes.slice(1, 5));
    }));
});
