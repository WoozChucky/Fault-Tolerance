import { Guid } from "./Guid";
export class Node {
    constructor() {
        this.Id = Guid.create();
    }
    async Watch() {
        for (let i = 0; i < 10; i++) {
            console.info(i);
        }
    }
}
// 18h16min25-27sec
//# sourceMappingURL=Node.js.map