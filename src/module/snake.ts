export default class Snake {
    // 蛇头元素
    head: HTMLElement;
    // 蛇身体，包括头
    bodies: HTMLCollection;
    // 获取蛇容器
    snakeEle: HTMLElement;

    constructor() {
        this.snakeEle = document.getElementById('snake')!;
        this.head = document.querySelector('#snake div') as HTMLElement;
        this.bodies = this.snakeEle.getElementsByTagName('div');
    }

    // 获取蛇的坐标（蛇头）
    get X() {
        return this.head.offsetLeft;
    }

    get Y() {
        return this.head.offsetTop;
    }

    set X(val) {
        // 如果新值和旧值一致，则不进行操作修改
        if (this.X === val) {
            return
        }
        if (val < 0 || val > 290) {
            throw new Error("蛇撞墙了")
        }
        // 修改Y时，是在修改水平坐标，蛇在上下移动，蛇在向上移动时，不能向下掉头，反之亦然
        // 我们需要检测 蛇头是否和第二节身体坐标一致,一致说明掉头了
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === val) {
            // console.log('水平方向发生了掉头');
            // 如果发生了掉头，让蛇向方向继续移动
            if (val > this.X) {
                // 如果新值value大于旧值X， 则说明蛇在向右走，此时发生掉头，应该使蛇继续向左走
                val = this.X - 10;
            }else {
                // 向左走
                val = this.X + 10;
            }
        }

        // 移动身体
        this.moveBody();
        this.head.style.left = `${val}px`;
        // 检查有没有撞自己
        this.checkHeadBody();
    }

    set Y(val) {
        // 如果新值和旧值一致，则不进行操作修改
        if (this.Y === val) {
            return
        }
        if (val < 0 || val > 290) {
            throw new Error("蛇撞墙了")
        }
        // 修改Y时，是在修改水平坐标，蛇在上下移动，蛇在向上移动时，不能向下掉头，反之亦然
        // 我们需要检测 蛇头是否和第二节身体坐标一致,一致说明掉头了
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === val) {
            // console.log('垂直方向发生了掉头');
            // 如果发生了掉头，让蛇向方向继续移动
            if (val > this.Y) {
                // 如果新值value大于旧值Y， 则说明蛇在向下走，此时发生掉头，应该使蛇继续向上走
                val = this.Y - 10;
            }else {
                // 向上走
                val = this.Y + 10;
            }
        }
        // 移动身体
        this.moveBody();
        this.head.style.top = `${val}px`;
        // 检查有没有撞自己
        this.checkHeadBody();
    }

    addBody() {
        // 向snake中加div
        this.snakeEle.insertAdjacentHTML('beforeend', '<div></div>')
    }

    // 增加蛇的身体移动方式， 除去该方法，仅蛇头在移动
    moveBody() {
        /**
         *  蛇身体，每一节去前一节的位置
         *  要从后往前改，因为先改前面，后一个会找不到前一个位置
         *      例如： 第3节 = 第2节位置
         *            第2节 = 第1节位置
         */
        for (let i = this.bodies.length - 1; i > 0; i--) {  // i 不能== 0 ， 因为0 是蛇头位置，蛇头之前已经处理
            // 获取前边身体位置
            // if(this.bodies[i - 1]) {
                let X = (this.bodies[i - 1] as HTMLElement).offsetLeft;
                let Y = (this.bodies[i - 1] as HTMLElement).offsetTop;

                // 将前一个的值赋值到当前身体上
                (this.bodies[i] as HTMLElement).style.left = `${X}px`;
                (this.bodies[i] as HTMLElement).style.top = `${Y}px`;
            // }
        }
    }

    // 检查蛇头是否撞到身体的方法
    checkHeadBody(){
        // 获取所有的身体，检查是否和蛇头的坐标发生重叠
        for (let i = 1; i < this.bodies.length; i++) {
            let bd = this.bodies[i] as HTMLElement;
            if (this.X === bd.offsetLeft && this.Y === bd.offsetTop) {
                // 进入判断说明蛇头撞到了身体，游戏结束
                throw new Error("撞到自己了~~");
            }
        }
    }
}
