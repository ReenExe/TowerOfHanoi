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

    const game = new Game();

    game.moveList(towerState[TOWER.MAIN], [towerState[TOWER.VIA], towerState[TOWER.RESULT]]);

    renderTowerState(towerState);
});

/**
 *
 * @param disks {Array}
 * @constructor
 */
function Tower(disks) {
    this.disks = disks;
}

/**
 *
 * @param from {Tower}
 * @returns {boolean}
 */
Tower.prototype.canMoveFrom = function (from) {
    return this.disks.length === 0 || this.getTop() > from.getTop();
};

Tower.prototype.getTop = function () {
    return this.disks[length - 1];
};

function Game() {

}

/**
 *
 * @param fromTower {Tower}
 * @param toTower {Tower}
 */
Game.prototype.move = function (fromTower, toTower) {
    toTower.disks.push(fromTower.disks.pop());
};

/**
 *
 * @param fromTower {Tower}
 * @param toTowers {Tower[]}
 */
Game.prototype.moveList = function (fromTower, toTowers) {
    for (let towerIndex = 0; towerIndex < toTowers.length; ++towerIndex) {
        if (toTowers.hasOwnProperty(towerIndex)) {
            const toTower = toTowers[towerIndex];

            if (toTower.canMoveFrom(fromTower)) {
                this.move(fromTower, toTower)
            }
        }
    }
};

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