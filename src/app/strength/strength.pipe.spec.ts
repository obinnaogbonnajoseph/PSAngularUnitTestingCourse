import { StrengthPipe } from './strength.pipe';

describe('StrengthPipe', () => {

    it('should display weak if value is 5', () => {
        let pipe = new StrengthPipe();

        expect(pipe.transform(5)).toEqual('5 (weak)');
    });

    it('should display strong if value is 14', () => {
        let pipe = new StrengthPipe();

        expect(pipe.transform(14)).toEqual('14 (strong)');
    });

    it('should display unbelievable if value is 30', () => {
        let pipe = new StrengthPipe();

        expect(pipe.transform(30)).toEqual('30 (unbelievable)');
    });
})