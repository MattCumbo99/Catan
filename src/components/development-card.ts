export class DevelopmentCard {
    cardType: DevCardEnum;

    constructor(cardType: DevCardEnum) {
        this.cardType = cardType;
    }

}

export enum DevCardEnum {
    VictoryPoint, Monopoly, Knight, RoadBuilder, YearOfPlenty
}