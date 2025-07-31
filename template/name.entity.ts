export class NameEntity {
  constructor(
    public id: number,
    public title: string,
    public content: string,
    public authorId: number,
    public createdAt: Date = new Date()
  ) {}
}
