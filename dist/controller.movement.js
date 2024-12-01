'use strict';

function getX(objectWithRoomPosition) {
    if ('pos' in objectWithRoomPosition)
        return objectWithRoomPosition.pos.x

    else if ('x' in objectWithRoomPosition)
        return objectWithRoomPosition.x

    else
        throw new Error('对象没有roomPosition属性')


}

function getY(objectWithRoomPosition) {
    if ('pos' in objectWithRoomPosition)
        return objectWithRoomPosition.pos.y

    else if ('y' in objectWithRoomPosition)
        return objectWithRoomPosition.y

    else
        throw new Error('对象没有roomPosition属性')

}

function getRoomName(objectWithRoomPosition) {
    if ('pos' in objectWithRoomPosition)
        return objectWithRoomPosition.pos.roomName

    else if ('roomName' in objectWithRoomPosition)
        return objectWithRoomPosition.roomName

    else
        throw new Error('对象没有roomPosition属性')

}


var controllerMovement = {
    // 重写roomPosition中与移动有关的算法，以减少CPU占用
    getDirectionTo: function (objectA, objectB) {
        if (!(getRoomName(objectA) === getRoomName(objectB)))
            throw new Error('对象不在同一房间内无法比较')

        var horizontal_distance = Math.abs(getX(objectA) - getX(objectB))
        var vertical_distance = Math.abs(getY(objectA) - getY(objectB))
        return Math.max(horizontal_distance, vertical_distance)
    },

    findClosestByRange: function (objectA, anotherObjectList) {
        // 检查对象列表是否为空或未定义
        if (!anotherObjectList || anotherObjectList.length === 0) {
            throw new Error('对象列表为空或未定义，无法找到最近的对象');
        }
        var closest = null;
        var closestDistance = Infinity;

        // 使用 for...of 循环遍历对象列表
        for (var objectB of anotherObjectList) {
            var distance = this.getDirectionTo(objectA, objectB);

            // 如果找到更近的对象，更新最近对象和距离
            if (distance < closestDistance) {
                closest = objectB;
                closestDistance = distance;
            }
        }
        return closest;
    },

    isEqualTo: function (objectA, objectB) {
        if (!(getRoomName(objectA) === getRoomName(objectB)))
            return false

        var distance = this.getDirectionTo(objectA, objectB);

        if (distance === 0)
            return true
        else
            return false
    },

    isNearTo: function (objectA, objectB) {
        var distance = this.getDirectionTo(objectA, objectB);
        if (distance <= 1)
            return true
        else
            return false
    },
};

module.exports = controllerMovement;