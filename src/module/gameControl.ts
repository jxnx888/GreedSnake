import Food from './food';
import ScorePanel from "./scorePanel";
import Snake from "./snake";

export default class GameControl {
    snake: Snake;
    food: Food;
    scorePanel: ScorePanel;
    // 蛇的当前移动方向
    direction: number = 0;
    // 游戏结束
    gameOver: boolean = false;

    constructor() {
        this.snake = new Snake();
        this.food = new Food();
        this.scorePanel = new ScorePanel(10, 5);
        this.init();
    }

    // 初始化游戏
    init() {
        // 绑定键盘事件

        // keyDownHandler的this不是该处的this， 是document 因此我们要用bind重定向this
        document.addEventListener('keydown', this.keyDownHandler.bind(this))

        // 调用移动方法
        this.move();
    }

    // 键盘响应函数
    keyDownHandler(event: KeyboardEvent) {
        if (event.keyCode && (event.keyCode === 37 || event.keyCode === 38 || event.keyCode === 39 || event.keyCode === 40)) {
            this.direction = event.keyCode;
        }
    }

    // 蛇移动的方法
    /**
     * 根据direction来改变蛇的方向
     * 上 top 减小
     * 下 top 增加
     * 左 left 减小
     * 右 left 增加
     */
    move() {
        // 首先获取当前位置
        let X = this.snake.X;
        let Y = this.snake.Y;
        if (this.gameOver) {
            return
        }
        switch (this.direction) {
            case 37: // 左
                X -= 10;
                break;
            case 38: // 上
                Y -= 10;
                break;
            case 39: // 右
                X += 10;
                break;
            case 40: // 下
                Y += 10;
                break;
            default:
                break
        }

        //检测是否迟到食物
        this.eatFood(X, Y)

        try {
            // 计算完后,修改蛇的实际位置、
            this.snake.X = X;
            this.snake.Y = Y;
        } catch (e) {
            alert(e.message + " Game Over")
            this.gameOver = true;
        }
        // 如果撞墙，则停止游戏
        !this.gameOver && setTimeout(this.move.bind(this), 300 - (this.scorePanel.level - 1) * 50)
    }

    // 检测是否蛇与 食物坐标一致
    eatFood(X: number, Y: number) {
        if (X === this.food.X && Y === this.food.Y) {
            this.food.changeFoodPosition();
            // 分数增加
            this.scorePanel.addScore();
            // 蛇增加一节
            this.snake.addBody();
        }
    }
}
