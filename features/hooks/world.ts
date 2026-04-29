import { World, IWorldOptions, setWorldConstructor } from '@wdio/cucumber-framework';

export class BookingWorld extends World {
  capturedRoomName: string = '';

  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(BookingWorld);