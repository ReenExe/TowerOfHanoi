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

    const moveHitsory = new MoveDiskHistory();
    const game = new Game(towerState, moveHitsory);

    game.solve(TOWER.MAIN, TOWER.RESULT, [TOWER.VIA]);

    animateTowerStateByHistory(moveHitsory);
});

class MoveDist
{
    /**
     *
     * @param {number} from
     * @param {number} to
     * @param {number} value
     */
    constructor(from, to, value) {
        this.from = from;
        this.to = to;
        this.value = value;
    }

    /**
     *
     * @returns {number}
     */
    getFrom() {
        return this.from;
    }

    /**
     *
     * @returns {number}
     */
    getTo() {
        return this.to;
    }

    /**
     *
     * @returns {number}
     */
    getValue() {
        return this.value;
    }
}

class MoveDiskHistory
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
        this.list.push(new MoveDist(fromIndex, toIndex, dist));
    }

    getStored() {
        return this.list;
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

/**
 *
 * @param index
 * @returns {jQuery}
 */
function findTower(index) {
    return $(`#tower-${index}`);
}

/**
 *
 * @param index
 * @returns {jQuery}
 */
function findDisk(index) {
    return $(`.disk-${index}`);
}

function renderTowerState(towerState) {
    for (let towerIndex in towerState) {
        if (towerState.hasOwnProperty(towerIndex)) {
            const $tower = findTower(towerIndex);

            $tower.html('');

            const disks = towerState[towerIndex].disks;

            for (let diskIndex = 0; diskIndex < disks.length; ++diskIndex) {
                const disk = disks[diskIndex];

                $tower.append(getDiskTemplate(disk));
            }
        }
    }
}

/**
 *
 * @param {MoveDist} moveDist
 */
function getMoveDiskFrames(moveDist) {
    const $disk = findDisk(moveDist.getValue());

    return [
        function () {
            $disk.addClass('hold');
        },
        function () {
            const $tower = findTower(moveDist.getTo());
            $tower.append($disk);
        },
        function () {
            $disk.removeClass('hold');
        }
    ];
}

/**
 *
 * @param {MoveDiskHistory} moveHitsory
 */
function animateTowerStateByHistory(moveHitsory) {
    const list = moveHitsory.getStored();
    const frames = [];
    for (let index = 0; index < list.length; ++index) {
        frames.push(...getMoveDiskFrames(list[index]));
    }
    let frameIndex = 0;

    const interval = setInterval(function () {
        if (frameIndex < frames.length) {
            const frame = frames[frameIndex];
            frame();

            ++frameIndex;
        } else {
            clearInterval(interval);
        }
    }, 250);
}

function getDiskTemplate(index) {
    return `<li class="disk disk-${index}"></li>`;
}
