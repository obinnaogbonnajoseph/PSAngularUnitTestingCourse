import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroesComponent } from './heroes.component';
import { HeroService } from '../hero.service';
import { of } from 'rxjs';
import { Component, Input, NO_ERRORS_SCHEMA, DebugElement, Directive } from '@angular/core';
import { Hero } from '../hero';
import { By } from '@angular/platform-browser';
import { HeroComponent } from '../hero/hero.component';

@Directive({
    // tslint:disable-next-line: directive-selector
    selector: '[routerLink]',
    // tslint:disable-next-line: use-host-property-decorator
    host: { '(click)': 'onClick()'}
})
// tslint:disable-next-line: directive-class-suffix
export class RouterLinkDirectiveStub {
    @Input('routerLink') linkParams: any;
    navigatedTo: any = null;

    onClick() {
        this.navigatedTo = this.linkParams;
    }
}

describe('HeroesComponent (deep tests)', () => {
    let fixture: ComponentFixture<HeroesComponent>;
    let mockHeroService;
    let HEROES;
    let component: HeroesComponent;

    beforeEach(() => {
        HEROES = [
            { id: 1, name: 'SpiderDude', strength: 8},
            { id: 2, name: 'Wonderful Woman', strength: 24},
            { id: 3, name: 'SuperDude', strength: 55}
        ];
        mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);

        TestBed.configureTestingModule({
            declarations: [
                HeroesComponent,
                HeroComponent,
                RouterLinkDirectiveStub
            ],
            providers: [
                { provide: HeroService, useValue: mockHeroService }
            ],
            // schemas: [NO_ERRORS_SCHEMA]
        });
        fixture = TestBed.createComponent(HeroesComponent);

    });

    it('should render each hero as a HeroComponent', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));

        fixture.detectChanges();

        const heroComponentDEs: DebugElement[] = fixture.debugElement.queryAll(By.directive(HeroComponent));
        expect(heroComponentDEs.length).toEqual(3);
        for (let i = 0; i < heroComponentDEs.length; i++) {
            expect(heroComponentDEs[i].componentInstance.hero).toEqual(HEROES[i]);
        }
    });

    it(`should call heroService.deleteHero when the Hero Component's
        delete button is clicked`, () => {
            spyOn(fixture.componentInstance, 'delete');
            mockHeroService.getHeroes.and.returnValue(of(HEROES));

            fixture.detectChanges();

            const heroComponents: DebugElement[] = fixture.debugElement.queryAll(By.directive(HeroComponent));

            // one way to do this, trigger a click event on the button
            // heroComponents[0].query(By.css('button'))
            //     .triggerEventHandler('click', {stopPropagation: () => {}});

            // second way to do this, trigger the emitter
            (<HeroComponent>heroComponents[0].componentInstance).delete.emit(undefined);

            // third way to do this, trigger the delete event straight up
            // heroComponents[0].triggerEventHandler('delete', null);

            expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
    });

    it(`should add a new hero to the hero list when the add button is clicked`, () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();
        const name = 'Mr Ice';
        mockHeroService.addHero.and.returnValue(of({id: 5, name, strength: 4}));
        const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
        const addButton: DebugElement = fixture.debugElement.queryAll(By.css('button'))[0];

        // act
        inputElement.value = name;
        addButton.triggerEventHandler('click', null);
        fixture.detectChanges();

        // assert
        const heroText: string = fixture.debugElement.query(By.css('ul')).nativeElement.textContent;
        expect(heroText).toContain(name);
    });

    it('should have the correct route for the first hero', () => {
        // arrange
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();

        const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));

        const routerLink: RouterLinkDirectiveStub = heroComponents[0]
            .query(By.directive(RouterLinkDirectiveStub))
            .injector.get(RouterLinkDirectiveStub);

        // act
        heroComponents[0].query(By.css('a')).triggerEventHandler('click', null);

        // assert
        expect(routerLink.navigatedTo).toBe('/detail/1');
    })

})