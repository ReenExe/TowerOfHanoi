QUnit.test( 'Test canMoveBetween', function( assert ) {
    const towerState = TowerState.getDefault();
    const moveHitsory = new MoveDiskHistory();

    const game = new Game(towerState, moveHitsory);

    assert.ok(game.canMoveBetween(TOWER.START, TOWER.RESULT));
    assert.ok(game.canMoveBetween(TOWER.START, TOWER.VIA));
});