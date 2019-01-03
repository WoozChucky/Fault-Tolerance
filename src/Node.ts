import {Guid} from "./Guid";

export class Node {

    private Id : Guid;

    public constructor() {
        this.Id = Guid.create();
    }

    public async Watch() {

        for (let i = 0; i < 10; i++) {
            console.info(i);
        }

    }

}

// 18h16min25-27sec
