export class NameCreatedEvent {
  constructor(public readonly nameId: number, public readonly title: string) {}
}
