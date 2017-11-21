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
