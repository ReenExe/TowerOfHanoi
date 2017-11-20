$(document).ready(function () {
    const towerState = {
        1: [4, 5, 6, 7],
        2: [1],
        3: [2],
        4: [3]
    };

    renderTowerState(towerState);
});

function hanoi(n, from, to, via) {
    if (n === 0) return;

    hanoi(n - 1, from, via, to);

    moveDisk(from, to);

    hanoi(n - 1, via, to, from);
}

function renderTowerState(towerState) {
    for (let towerIndex in towerState) {
        if (towerState.hasOwnProperty(towerIndex)) {
            const $tower = $(`#tower-${towerIndex}`);

            $tower.html('');

            const disks = towerState[towerIndex];

            for (let diskIndex = 0; diskIndex < disks.length; ++diskIndex) {
                const disk = disks[diskIndex];

                $tower.prepend(getDisk(disk));
            }
        }
    }
}

function getDisk(index) {
    return `<li class="disk disk-${index}"></li>`;
}