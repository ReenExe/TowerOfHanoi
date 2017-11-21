QUnit.test( 'From `begin state` canMoveBetween & move & asset state', function( assert ) {
    const towerState = TowerState.getDefault();
    const moveHitsory = new MoveDiskHistory();

    const game = new Game(towerState, moveHitsory);

    assert.ok(game.canMoveBetween(TOWER.START, TOWER.RESULT));
    game.move(TOWER.START, TOWER.RESULT);
    assert.ok(game.canMoveBetween(TOWER.START, TOWER.VIA));
    game.move(TOWER.START, TOWER.VIA);

    assert.deepEqual(towerState[TOWER.START].disks, [3]);
    assert.deepEqual(towerState[TOWER.VIA].disks, [2]);
    assert.deepEqual(towerState[TOWER.RESULT].disks, [1]);
});