$(document).ready(function () {
    const TOWER = {
        MAIN: 1,
        VIA: 2,
        RESULT: 3
    };

    const towerState = {
        [TOWER.MAIN]: new Tower([3, 2, 1]),
        [TOWER.VIA]: new Tower([]),
        [TOWER.RESULT]: new Tower([])
    };

    renderTowerState(towerState);

    const moveHitsory = new MoveDistHistory();
    const game = new Game(towerState, moveHitsory);

    game.solve(TOWER.MAIN, TOWER.RESULT, [TOWER.VIA]);

    renderTowerState(towerState);
});

class MoveDistHistory
{
    constructor() {
        this.list = []
    }

    /**
     *
     * @param {number} fromIndex
     * @param {number} toIndex
     * @param {number} dist
     */
    log(fromIndex, toIndex, dist) {
        this.list.push([fromIndex, toIndex, dist]);
    }
}

class Tower
{
    /**
     *
     * @param {number[]} disks
     */
    constructor(disks) {
        this.disks = disks;
    }

    /**
     *
     * @returns {number}
     */
    getTop() {
        return this.disks[this.disks.length - 1];
    }

    /**
     *
     * @returns {boolean}
     */
    isEmpty() {
        return this.disks.length === 0;
    }
}

class Game
{
    /**
     *
     * @param {Tower[]} towerState
     * @param history
     */
    constructor(towerState, history) {
        this.towerState = towerState;
        this.history = history;
    }

    /**
     *
     * @param {number} fromTowerIndex
     * @param {number} toTowerIndex
     * @param {number[]} viaTowerIndexes
     */
    solve(fromTowerIndex, toTowerIndex, viaTowerIndexes)
    {
        this.moveList(
            fromTowerIndex,
            viaTowerIndexes.concat([toTowerIndex])
        );

        const viaTowerIndexesCopy = viaTowerIndexes.slice();

        this.moveList(
            viaTowerIndexesCopy.shift(),
            viaTowerIndexesCopy.concat([toTowerIndex, fromTowerIndex])
        );
    }

    /**
     *
     * @param {number} fromTowerIndex
     * @param {number[]} toTowerIndexes
     */
    moveList(fromTowerIndex, toTowerIndexes) {
        for (let index = 0; index < toTowerIndexes.length; ++index) {
            if (toTowerIndexes.hasOwnProperty(index)) {
                const toTowerIndex = toTowerIndexes[index];

                if (this.canMoveBetween(fromTowerIndex, toTowerIndex)) {
                    this.move(fromTowerIndex, toTowerIndex)
                }
            }
        }
    }

    /**
     *
     * @param {number} fromTowerIndex
     * @param {number} toTowerIndex
     */
    move(fromTowerIndex, toTowerIndex) {
        const disk = this.towerState[fromTowerIndex].disks.pop();
        this.towerState[toTowerIndex].disks.push(disk);
        this.history.log(fromTowerIndex, toTowerIndex, disk);
    }

    /**
     *
     * @param {number} fromTowerIndex
     * @param {number} toTowerIndex
     * @returns {boolean}
     */
    canMoveBetween(fromTowerIndex, toTowerIndex) {
        const toTower = this.towerState[toTowerIndex];
        const fromTower = this.towerState[fromTowerIndex];
        return toTower.isEmpty() || toTower.getTop() > fromTower.getTop();
    }

}

function renderTowerState(towerState) {
    for (let towerIndex in towerState) {
        if (towerState.hasOwnProperty(towerIndex)) {
            const $tower = $(`#tower-${towerIndex}`);

            $tower.html('');

            const disks = towerState[towerIndex].disks;

            for (let diskIndex = 0; diskIndex < disks.length; ++diskIndex) {
                const disk = disks[diskIndex];

                $tower.append(getDisk(disk));
            }
        }
    }
}

function getDisk(index) {
    return `<li class="disk disk-${index}"></li>`;
}