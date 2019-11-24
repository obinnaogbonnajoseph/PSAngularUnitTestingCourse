import { HeroesComponent } from "./heroes.component"
import { of } from "rxjs";
import { Hero } from "../hero";

describe('HeroesComponent', () => {
    let component: HeroesComponent;
    let HEROES;
    let mockHeroService;

    beforeEach(() => {
        HEROES = [
            {id:1, name: 'SpiderDude', strength: 8},
            {id:2, name: 'Wonderful Woman', strength: 24},
            {id:3, name: 'SuperDude', strenght: 55}
        ];

        mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);

        component = new HeroesComponent(mockHeroService);
    })

    describe('delete', () => {
        
        it('should remove the indicated hero from the heroes list', () => {
            // arrange
            mockHeroService.deleteHero.and.returnValue(of(true));
            component.heroes = HEROES;

            // act
            component.delete(HEROES[2]);

            // assert
            expect(component.heroes[2]).toBeUndefined();
            expect(component.heroes[0].name).toEqual('SpiderDude');
        })

        it('should call deleteHero with the correct parameter', () => {
            // arrange
            mockHeroService.deleteHero.and.returnValue(of(true));
            component.heroes = HEROES;

            // act
            component.delete(HEROES[2]);

            // assert
            expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[2]);
        })
    });

    describe('getHeroes', () => {

        it('should fetch the heroes from the heroes service', () => {
            // arrange
            mockHeroService.getHeroes.and.returnValue(of(HEROES));

            // act
            component.getHeroes();

            // assert
            expect(component.heroes.length).toEqual(3);
            expect(component.heroes[0].name).toEqual('SpiderDude');
        })
    });

    describe('addHero', () => {

        it('should return', () => {
            // arrange
            component.heroes = HEROES;

            // act
            component.add('');

            // assert
            expect(component.heroes.length).toEqual(3);
        });

        it('should add hero', () => {
            // arrange
            let hero: Hero = {id: 4, name: 'Black Panther', strength: 25};
            component.heroes = HEROES;
            mockHeroService.addHero.and.returnValue(of(hero));
 
            // act
            component.add(hero.name);

            // assert
            expect(component.heroes.length).toEqual(4);
            expect(component.heroes[3].name).toEqual('Black Panther');
        })
    })
})