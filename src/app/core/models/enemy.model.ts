export interface Enemy {
    name: string,
    id: number,
}

export interface EnemyObject {
    [key: string]: Enemy[]
  }

export class People {
    name: string;
    id: number;
    homeworld: string;

    private getPeopleId(url:string):number {
        let arr = url.split("/");
        return +(arr.at(-2)!);
    }

    constructor(payload: any) {
        this.name = payload.name;
        this.id = this.getPeopleId(payload.url);
        this.homeworld = payload.homeworld;
    }
}

export interface PotentailEnemy {
    names: string[],
    volume: number
}