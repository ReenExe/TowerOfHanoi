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

    game.moveList(TOWER.MAIN, [TOWER.VIA, TOWER.RESULT]);

    renderTowerState(towerState);

    console.log(moveHitsory);
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
     * @param {Tower} from
     * @returns {boolean}
     */
    canMoveFrom(from) {
        return this.disks.length === 0 || this.getTop() > from.getTop();
    }

    /**
     *
     * @returns {number}
     */
    getTop() {
        return this.disks[length - 1];
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
     */
    move(fromTowerIndex, toTowerIndex) {
        const disk = this.towerState[fromTowerIndex].disks.pop();
        this.towerState[toTowerIndex].disks.push(disk);
        this.history.log(fromTowerIndex, toTowerIndex, disk);
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
                const toTower = this.towerState[toTowerIndex];

                if (toTower.canMoveFrom(toTower)) {
                    this.move(fromTowerIndex, toTowerIndex)
                }
            }
        }
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