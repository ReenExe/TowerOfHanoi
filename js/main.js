$(document).ready(function () {
    const towerState = {
        1: [1, 2, 3],
        2: [],
        3: [],
        4: []
    };

    renderTowerState(towerState);

    function moveDisk(from, to) {
        towerState[to].push(towerState[from].shift());

        console.log(JSON.stringify(towerState));

        renderTowerState(towerState);
    }

    function hanoi(n, from, to, via) {
        if (n === 0) return;

        hanoi(n - 1, from, via, to);

        moveDisk(from, to);

        hanoi(n - 1, via, to, from);
    }

    hanoi(towerState[1].length, 1, 2, 3);
});

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