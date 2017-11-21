$(document).ready(function () {
    const towerState = TowerState.getDefault();

    renderTowerState(towerState);

    const moveHitsory = new MoveDiskHistory();
    const game = new Game(towerState, moveHitsory);

    game.solve(TOWER.START, TOWER.RESULT, [TOWER.VIA]);

    animateTowerStateByHistory(moveHitsory);
});
