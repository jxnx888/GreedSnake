// 记分牌
export default class ScorePanel {
    //  score和level用来记录分数和等级
    score: number = 0;
    level: number = 1;
    maxLevel: number;
    upScore: number;
    // 分数和等级所在元素， 在构造函数中初始化
    scoreEle: HTMLElement;
    scoreLevel: HTMLElement;

    constructor(maxLevel: number = 10, upScore: number = 10) {
        this.scoreEle = document.getElementById('score')!;
        this.scoreLevel = document.getElementById('level')!;
        this.maxLevel = maxLevel;
        this.upScore = upScore;
    }

    // 设置加分方法
    addScore() {
        this.score++;
        this.scoreEle.innerHTML = `${this.score}`;
        if (this.score % this.upScore === 0) {
            this.levelUp();
        }
    }

    // 提升等级
    levelUp() {
        if (this.level < this.maxLevel) {
            this.scoreLevel.innerHTML = `${++this.level}`
        }
    }
}
