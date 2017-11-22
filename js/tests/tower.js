QUnit.test('Tower empty', function (assert) {
    const tower = new Tower([]);

    assert.ok(tower.isEmpty());
});

QUnit.test('Tower top one element', function (assert) {
    const tower = new Tower([1]);

    assert.ok(tower.getTop() === 1);
    assert.ok(tower.getTop() === 1);
});

QUnit.test('Tower top few elements', function (assert) {
    const tower = new Tower([1, 2, 3]);

    assert.ok(tower.getTop() === 3);
    assert.ok(tower.getTop() === 3);
});