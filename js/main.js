$(document).ready(function () {
    const towerState = TowerState.getBySize(7);

    renderTowerState(towerState);

    const moveHitsory = new MoveDiskHistory();
    const game = new Game(towerState, moveHitsory);

    game.solve(TOWER.START, TOWER.RESULT, TOWER.VIA);

    animateTowerStateByHistory(moveHitsory, 100);

    console.log(JSON.stringify(moveHitsory.getStored()));
});
