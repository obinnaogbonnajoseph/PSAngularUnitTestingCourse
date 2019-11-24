import { MessageService } from './message.service';

describe('MessageService', () => {
    let messageService: MessageService;

    beforeEach(() => {
        // arrange and act
        messageService = new MessageService();
    });

    it('should have no messages in array', () => {
        // assert
        expect(messageService.messages.length).toEqual(0);
    })

    it('should add to messages array', () => {
        // arrange
        let message = 'Hello World!';

        // act
        messageService.add(message);

        // assert
        expect(messageService.messages.length).toBeGreaterThan(0);
    });

    it('should clear messages array', () => {
        // arrange
        let message = 'Hello Africa!';
        messageService.add(message);

        // act
        messageService.clear();

        // assert
        expect(messageService.messages.length).toEqual(0);
    })
})