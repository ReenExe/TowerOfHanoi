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
function animateTowerStateByHistory(moveHitsory, speed) {
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
    }, speed);
}

function getDiskTemplate(index) {
    return `<li class="disk disk-${index}"></li>`;
}
