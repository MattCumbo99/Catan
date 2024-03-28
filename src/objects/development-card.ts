export class DevelopmentCard {
    cardType: DevCardEnum;

    constructor(cardType: DevCardEnum) {
        this.cardType = cardType;
    }

}

export enum DevCardEnum {
    VictoryPoint = "Victory Point", 
    Monopoly = "Monopoly", 
    Knight = "Knight", 
    RoadBuilder = "Road Builder", 
    YearOfPlenty = "Year of Plenty"
}