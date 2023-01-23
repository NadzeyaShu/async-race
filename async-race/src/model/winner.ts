export type Winner = {
    wins: number;
    time: number;
    id: number;
    name: string;
    color: string;
};

export class WinnersWrapper {
    totalWinners: number;
    winners: Winner[];

    constructor(totalWinners: number, winners: Winner[]) {
        this.totalWinners = totalWinners;
        this.winners = winners;
    }
}
