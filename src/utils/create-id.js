const USED_IDS = {};
const POOL = 'BCDFGHJKLMNPQRSTVWXYZ0123456789';

function createId(length = 3) {
    let id = 'liteId-';
    let poolDepth = POOL.length;
    let i, random;

    USED_IDS[length] = USED_IDS[length] || [];

    if (USED_IDS[length].length === Math.pow(poolDepth, length)) {
        return createId(length + 1);
    }

    for (i = 0; i < length; i++) {
        random = Math.floor(Math.random() * poolDepth);
        id += POOL.charAt(random);
    }

    if (USED_IDS[length].includes(id)) {
        return createId(length);
    }

    USED_IDS[length].push(id);
    return id;
}
