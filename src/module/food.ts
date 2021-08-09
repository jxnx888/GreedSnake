
// 定义类
export default class Food {
    // 定义属性 表示食物所对应的元素
    element: HTMLElement;


    constructor() {
        this.element = document.getElementById('food')!;
        this.changeFoodPosition()
    }


    // 获取食物 x,y轴坐标方法
    get X() {
        return this.element.offsetLeft;
    }

    get Y() {
        return this.element.offsetTop;
    }

    // 修改食物位置的方法
    changeFoodPosition() {
        /**
         *  生成随机位置
         *  食物位置最小是0， 最大是宽度减去10
         *  蛇移动一次是一格，就是10，所以要求食物的移动位置必须是10的倍数
         */
        let top = Math.round(Math.random() * 29) * 10;
        let left = Math.round(Math.random() * 29) * 10;
        this.element.style.left = left + 'px';
        this.element.style.top = top + 'px';
    }
}
